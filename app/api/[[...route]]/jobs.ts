import { Hono } from 'hono'
import { db } from '@/db/drizzle'
import { zValidator } from '@hono/zod-validator'
import { insertJobSchema, jobs } from '@/db/schema'
import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'
import * as z from 'zod'

const app = new Hono()
  .get('/', async (c) => {
    const jobList = await db
      .select({
        id: jobs.id,
        userId: jobs.userId,
        title: jobs.title,
        introUrl: jobs.introUrl,
        tags: jobs.tags,
        isPublished: jobs.isPublished,
      })
      .from(jobs)
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
  .patch(
    '/:jobId',
    zValidator(
      'json',
      z.object({ ...insertJobSchema.shape, title: z.string().optional() })
    ),
    async (c) => {
      const values = c.req.valid('json')
      const [data] = await db
        .update(jobs)
        .set(values)
        .where(eq(jobs.id, c.req.param('jobId')))
        .returning()

      return c.json({ data })
    }
  )

export default app
