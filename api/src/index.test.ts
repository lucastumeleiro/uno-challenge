import { describe, it, expect } from 'vitest'
import app from './index'

describe('API Tests', () => {
  it('should return uno-challenge message from /teste endpoint', async () => {
    const res = await app.request('/teste')
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data).toHaveProperty('message', 'uno-challenge')
    expect(data).toHaveProperty('status', 'success')
    expect(data).toHaveProperty('timestamp')
  })

  it('vitest is working correctly', () => {
    expect(1 + 1).toBe(2)
    expect(true).toBe(true)
  })
})
