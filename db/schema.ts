import {
  pgEnum,
  varchar,
  pgTable,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

import { createInsertSchema } from 'drizzle-zod'

export const job_status_enum = pgEnum('job_status', ['open', 'closed'])

export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  userId: text('user_id').notNull(),
  introUrl: text('intro_video_url').notNull(),
  tags: text('tags'),
  liveUntil: timestamp('live_until', { withTimezone: true }).notNull(),
  status: job_status_enum('status').default('open'),
  deleted: boolean('deleted').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const insertJobSchema = createInsertSchema(jobs)
