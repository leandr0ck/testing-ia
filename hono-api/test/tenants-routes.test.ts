import { describe, expect, test } from 'bun:test'
import app from '../src/index'

describe('tenant routes', () => {
  test('returns a successful response for the full tenant view', async () => {
    const res = await app.request('http://localhost/tenants/tnt_001/full', {
      headers: {
        'x-workspace': 'techcorp',
      },
    })

    expect(res.status).toBe(200)
  })
})
