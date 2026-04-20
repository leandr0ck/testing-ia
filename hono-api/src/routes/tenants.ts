import { Hono } from 'hono'
import {
  listTenants,
  getTenantById,
  getTenantWithOwner,
  getTenantFull,
} from '../db/queries/tenants'

const app = new Hono()

// GET /tenants              → list all tenants
app.get('/', (c) => {
  return c.json({ data: listTenants() })
})

// GET /tenants/:id          → tenant by id (base)
app.get('/:id', (c) => {
  const tenant = getTenantById(c.req.param('id'))
  if (!tenant) return c.json({ error: 'Tenant not found' }, 404)
  return c.json({ data: tenant })
})

// GET /tenants/:id/owner    → 1:1 owner user of a tenant
app.get('/:id/owner', (c) => {
  const tenant = getTenantWithOwner(c.req.param('id'))
  if (!tenant) return c.json({ error: 'Tenant not found' }, 404)
  return c.json({ data: { owner: tenant.owner } })
})

app.get('/:id/full', (c) => {
  const tenant = getTenantFull(c.req.param('id'))
  if (!tenant) return c.json({ error: 'Tenant not found' }, 404)
  return c.json({ data: tenant })
})

export default app
