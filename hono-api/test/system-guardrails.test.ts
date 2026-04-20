import { describe, expect, test } from 'bun:test'
import app from '../src/index'

describe('system guardrails', () => {
  test('keeps the root response available', async () => {
    const res = await app.request('http://localhost/')
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.message).toBe('Hello Hono!')
    expect(body.endpoints).toBeDefined()
  })

  test('keeps the users collection readable', async () => {
    const res = await app.request('http://localhost/users')
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(body.data)).toBe(true)
    expect(body.data.length).toBeGreaterThan(0)
  })

  test('keeps a complete user view available', async () => {
    const res = await app.request('http://localhost/users/usr_001/full')
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.data.id).toBe('usr_001')
    expect(body.data.tenant).toBeDefined()
    expect(body.data.profile).toBeDefined()
  })

  test('preserves nullable related data in user responses', async () => {
    const res = await app.request('http://localhost/users/usr_005/full')
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.data.id).toBe('usr_005')
    expect(body.data.profile).toBeNull()
  })
})
