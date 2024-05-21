import { Hono } from 'hono'
import { db } from '@/db/drizzle'

const app = new Hono()
  .get('/', (c) => {
    return c.json({ message: 'Hello' })
  })
  .get('/:id', (c) => {
    return c.json({ message: `Hello` })
  })

export default app
