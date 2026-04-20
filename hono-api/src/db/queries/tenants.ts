/**
 * Tenant query helpers — reads from SQLite via Drizzle
 */

import { db } from '../index'
import { tenants, users } from '../schema'
import { eq } from 'drizzle-orm'

// ─── Base queries ─────────────────────────────────────────────────────────────

export function listTenants() {
  return db.select().from(tenants).all()
}

export function getTenantById(id: string) {
  return db.select().from(tenants).where(eq(tenants.id, id)).get() ?? null
}

// ─── With relations ──────────────────────────────────────────────────────────

export function getTenantWithOwner(id: string) {
  const result = db
    .select({
      tenant: tenants,
      owner: users,
    })
    .from(tenants)
    .leftJoin(users, eq(tenants.ownerId, users.id))
    .where(eq(tenants.id, id))
    .get()

  if (!result) return null
  return { ...result.tenant, owner: result.owner }
}

export function getTenantFull(id: string) {
  return (
    db.query.tenants.findFirst({
      where: (tenant, { eq }) => eq(tenant.id, id),
      with: {
        owner: true,
        members: true,
      },
    }) ?? null
  )
}
