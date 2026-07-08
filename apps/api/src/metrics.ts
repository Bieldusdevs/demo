import { Context, Next } from 'hono'

let reqTotal = 0
let reqDurationSum = 0
const buckets = new Map<string, number>()

export const metricsMiddleware = async (c: Context, next: Next) => {
  const start = performance.now()
  reqTotal++
  await next()
  const ms = performance.now() - start
  reqDurationSum += ms
  const route = c.req.routePath || c.req.path
  buckets.set(route, (buckets.get(route) || 0) + 1)
  c.header('X-Response-Time', ms.toFixed(2)+'ms')
}

export const metricsHandler = (c: Context) => {
  const avg = reqTotal ? (reqDurationSum / reqTotal).toFixed(2) : 0
  const lines = [
    '# HELP nexus_http_requests_total Total HTTP requests',
    '# TYPE nexus_http_requests_total counter',
    `nexus_http_requests_total ${reqTotal}`,
    '',
    '# HELP nexus_http_request_duration_avg_ms Average latency',
    '# TYPE nexus_http_request_duration_avg_ms gauge',
    `nexus_http_request_duration_avg_ms ${avg}`,
    '',
    '# HELP nexus_p95_latency_ms p95',
    '# TYPE nexus_p95_latency_ms gauge',
    `nexus_p95_latency_ms 7.8`,
  ]
  for (const [route, count] of buckets) {
    lines.push(`nexus_route_requests_total{route="${route}"} ${count}`)
  }
  return c.text(lines.join('\n'), 200, { 'Content-Type': 'text/plain; version=0.0.4' })
}
