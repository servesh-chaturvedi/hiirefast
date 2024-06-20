import {
  pgEnum,
  varchar,
  pgTable,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const job_status_enum = pgEnum('job_status', ['open', 'closed'])

export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  introUrl: text('intro_video_url'),
  tags: text('tags'),
  isPublished: boolean('is_published').default(false),
  deleted: boolean('deleted').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  introUrl: true,
  tags: true,
  isPublished: true,
})
