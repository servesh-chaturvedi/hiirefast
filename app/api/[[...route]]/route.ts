import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import jobs from './jobs'
export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app.route('/jobs', jobs)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes
