import { Hono } from 'hono'
import {
  listUsers,
  getUserById,
  getUserWithTenant,
  getUserWithProfile,
  getUserFull,
  getProfileByUserId,
  listProfiles,
} from '../db/queries/users'

const app = new Hono()

// GET /users              → list all users
app.get('/', (c) => {
  return c.json({ data: listUsers() })
})

// GET /users/:id          → user by id (base)
app.get('/:id', (c) => {
  const user = getUserById(c.req.param('id'))
  if (!user) return c.json({ error: 'User not found' }, 404)
  return c.json({ data: user })
})

// GET /users/:id/tenant   → 1:1 tenant of a user
app.get('/:id/tenant', (c) => {
  const user = getUserWithTenant(c.req.param('id'))
  if (!user) return c.json({ error: 'User not found' }, 404)
  return c.json({ data: { tenant: user.tenant } })
})

// GET /users/:id/profile  → 1:1 profile of a user
app.get('/:id/profile', (c) => {
  const profile = getProfileByUserId(c.req.param('id'))
  if (!profile) return c.json({ error: 'Profile not found' }, 404)
  return c.json({ data: profile })
})

// GET /users/:id/full     → user + tenant + profile
app.get('/:id/full', (c) => {
  const user = getUserFull(c.req.param('id'))
  if (!user) return c.json({ error: 'User not found' }, 404)
  return c.json({ data: user })
})

// GET /users/profiles      → all profiles
app.get('/profiles/all', (c) => {
  return c.json({ data: listProfiles() })
})

export default app
