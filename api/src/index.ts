import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for frontend
app.use('/*', cors())

app.get('/teste', (c) => {
  return c.json({
    message: 'uno-challenge',
    timestamp: new Date().toISOString(),
    status: 'success'
  })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

export default app
