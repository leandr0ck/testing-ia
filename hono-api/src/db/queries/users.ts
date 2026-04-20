/**
 * User query helpers — reads from SQLite via Drizzle
 */

import { db } from '../index'
import { users, tenants, profiles } from '../schema'
import { eq, isNull } from 'drizzle-orm'

// ─── Base queries ─────────────────────────────────────────────────────────────

export function listUsers() {
  return db.select().from(users).all()
}

export function getUserById(id: string) {
  return db.select().from(users).where(eq(users.id, id)).get() ?? null
}

// ─── With relations ──────────────────────────────────────────────────────────

export function getUserWithTenant(id: string) {
  const result = db
    .select({
      user: users,
      tenant: tenants,
    })
    .from(users)
    .leftJoin(tenants, eq(users.tenantId, tenants.id))
    .where(eq(users.id, id))
    .get()

  if (!result) return null
  return { ...result.user, tenant: result.tenant }
}

export function getUserWithProfile(id: string) {
  const result = db
    .select({
      user: users,
      profile: profiles,
    })
    .from(users)
    .leftJoin(profiles, eq(users.id, profiles.userId))
    .where(eq(users.id, id))
    .get()

  if (!result) return null
  return { ...result.user, profile: result.profile }
}

export function getUserFull(id: string) {
  const result = db
    .select({
      user: users,
      tenant: tenants,
      profile: profiles,
    })
    .from(users)
    .leftJoin(tenants, eq(users.tenantId, tenants.id))
    .leftJoin(profiles, eq(users.id, profiles.userId))
    .where(eq(users.id, id))
    .get()

  if (!result) return null
  return { ...result.user, tenant: result.tenant, profile: result.profile }
}

// ─── Profile helpers ─────────────────────────────────────────────────────────

export function getProfileByUserId(userId: string) {
  return db.select().from(profiles).where(eq(profiles.userId, userId)).get() ?? null
}

export function listProfiles() {
  return db.select().from(profiles).all()
}
