import { Hono } from 'hono'
import { db } from '@/db/drizzle'
import { jobs } from '@/db/schema'

const app = new Hono()
  .get('/', async (c) => {
    const jobList = await db.select().from(jobs)
    return c.json({ data: jobList })
  })
  .get('/:id', (c) => {
    return c.json({ message: `Hello ${c.req.param('id')}` })
  })

export default app
