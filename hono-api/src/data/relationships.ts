/**
 * 1:1 Relationships between entities
 *
 * Schema:
 *   User (1) ←→ (1) Tenant  — each tenant has one owner, each user owns at most one tenant
 *   User (1) ←→ (1) Profile — each user has one profile
 */

import { users, profiles, type User, type Profile } from './users'
import { tenants, type Tenant } from './tenants'

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id)
}

export function getProfileByUserId(userId: string): Profile | undefined {
  return profiles.find((p) => p.userId === userId)
}

// ─── 1:1 Relationships ───────────────────────────────────────────────────────

/**
 * User ↔ Tenant  (1:1)
 *   tenant.ownerId  → user.id  (a tenant belongs to exactly one owner user)
 *   user.tenantId   → tenant.id (a user may own zero or one tenant)
 *
 *  - tnt_001 owner: usr_001  (Alice)
 *  - tnt_002 owner: usr_002  (Bob)
 *  - tnt_003 owner: usr_003  (Carol)
 *  - tnt_004 owner: usr_004  (David)
 *  - tnt_005 owner: usr_006  (Frank)
 *  - usr_005 has no tenant
 */
export function getTenantForUser(userId: string): Tenant | null {
  const user = getUserById(userId)
  if (!user?.tenantId) return null
  return getTenantById(user.tenantId) ?? null
}

export function getOwnerForTenant(tenantId: string): User | null {
  const tenant = getTenantById(tenantId)
  if (!tenant) return null
  return getUserById(tenant.ownerId) ?? null
}

/**
 * User ↔ Profile  (1:1)
 *   profile.userId → user.id  (every profile belongs to exactly one user)
 *
 *  - usr_001 ↔ prf_001
 *  - usr_002 ↔ prf_002
 *  - usr_003 ↔ prf_003
 *  - usr_004 ↔ prf_004
 *  - usr_005 ↔ prf_005
 *  - usr_006 ↔ prf_006
 */
export function getProfileForUser(userId: string): Profile | null {
  return getProfileByUserId(userId) ?? null
}

// ─── Envelope types (full entity with relations) ─────────────────────────────

export interface UserWithTenant extends User {
  tenant: Tenant | null
}

export interface UserWithProfile extends User {
  profile: Profile | null
}

export interface UserFull extends User {
  tenant: Tenant | null
  profile: Profile | null
}

export interface TenantWithOwner extends Tenant {
  owner: User | null
}

// ─── View builders ─────────────────────────────────────────────────────────────

export function buildUserWithTenant(userId: string): UserWithTenant | null {
  const user = getUserById(userId)
  if (!user) return null
  return { ...user, tenant: getTenantForUser(userId) }
}

export function buildUserWithProfile(userId: string): UserWithProfile | null {
  const user = getUserById(userId)
  if (!user) return null
  return { ...user, profile: getProfileForUser(userId) }
}

export function buildUserFull(userId: string): UserFull | null {
  const user = getUserById(userId)
  if (!user) return null
  return {
    ...user,
    tenant: getTenantForUser(userId),
    profile: getProfileForUser(userId),
  }
}

export function buildTenantWithOwner(tenantId: string): TenantWithOwner | null {
  const tenant = getTenantById(tenantId)
  if (!tenant) return null
  return { ...tenant, owner: getOwnerForTenant(tenantId) }
}

export { users, profiles, tenants }
