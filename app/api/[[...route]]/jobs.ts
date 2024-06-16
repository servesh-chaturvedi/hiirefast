import { Hono } from 'hono'
import { db } from '@/db/drizzle'
import { zValidator } from '@hono/zod-validator'
import { insertJobSchema, jobs } from '@/db/schema'
import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'

const app = new Hono()
  .get('/', async (c) => {
    const jobList = await db.select().from(jobs)
    return c.json({ data: jobList })
  })
  .get('/:jobId', async (c) => {
    const [jobById] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, c.req.param('jobId')))

    if (!jobById) {
      return c.json({ error: 'Job not found' }, 404)
    }
    return c.json({ data: jobById })
  })
  .post(
    '/',
    zValidator(
      'json',
      insertJobSchema.pick({
        title: true,
      })
    ),
    async (c) => {
      const values = c.req.valid('json')

      const [data] = await db
        .insert(jobs)
        .values({
          id: createId(),
          userId: createId(),
          ...values,
        })
        .returning()

      return c.json({ data })
    }
  )

export default app
