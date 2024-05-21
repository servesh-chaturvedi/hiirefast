import {
  pgEnum,
  varchar,
  pgTable,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

export const job_status_enum = pgEnum('job_status', ['open', 'closed'])

export const jobs = pgTable('jobs', {
  id: text('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  userId: text('user_id').notNull(),
  introUrl: text('intro_video_url'),
  tags: text('tags'),
  liveUntil: timestamp('live_until', { withTimezone: true }),
  status: job_status_enum('status').default('open'),
  deleted: boolean('deleted').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})
