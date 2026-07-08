import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import aiRoutes from './routes/ai'
import vectorRoutes from './routes/vectors'
import { metricsMiddleware, metricsHandler } from './metrics'

const app = new Hono()

app.use('*', cors({ origin: '*', allowMethods: ['GET','POST','OPTIONS'] }))
app.use('*', logger(), prettyJSON())
app.use('*', metricsMiddleware)

app.get('/', c => c.json({ 
  name: 'Nexus AI API',
  runtime: 'Bun ' + Bun.version,
  stack: ['Hono','Bun','Postgres','Drizzle','Redis','OpenAI','LangChain','Qdrant','Prometheus']
}))
app.get('/health', c => c.json({ ok: true, ts: Date.now() }))
app.get('/metrics', metricsHandler)

app.route('/ai', aiRoutes)
app.route('/vectors', vectorRoutes)

const port = Number(process.env.PORT || 8787)
console.log(`⚡ Nexus Hono API running on http://localhost:${port} — Bun ${Bun.version}`)

export default {
  port,
  fetch: app.fetch
}
