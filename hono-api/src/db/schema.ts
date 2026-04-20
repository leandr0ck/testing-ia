/**
 * Drizzle ORM Schema — SQLite via bun:sqlite
 *
 * Tables:
 *   users       — app users, optionally owned by a tenant
 *   tenants     — organizations / workspaces
 *   profiles    — user profile metadata (1:1 → users)
 *
 * Relationships:
 *   user.tenantId  → tenants.id   (user belongs to a tenant, nullable)
 *   tenant.ownerId  → users.id     (tenant has one owner, 1:1)
 *   profile.userId  → users.id      (profile belongs to one user, 1:1)
 */

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

// ─── Tables ───────────────────────────────────────────────────────────────────

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role', { enum: ['admin', 'member', 'viewer'] }).notNull().default('member'),
  tenantId: text('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
})

export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  plan: text('plan', { enum: ['free', 'pro', 'enterprise'] }).notNull().default('free'),
  ownerId: text('owner_id').references(() => users.id, { onDelete: 'set null' }),
  maxMembers: integer('max_members').notNull().default(5),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
})

export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio').notNull().default(''),
  avatar: text('avatar').notNull().default(''),
  location: text('location').notNull().default(''),
})

// ─── Relations ───────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one }) => ({
  tenant: one(tenants, {
    fields: [users.tenantId],
    references: [tenants.id],
  }),
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  ownedTenant: one(tenants, {
    fields: [users.id],
    references: [tenants.ownerId],
    relationName: 'owner',
  }),
}))

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
  owner: one(users, {
    fields: [tenants.ownerId],
    references: [users.id],
    relationName: 'owner',
  }),
  members: one(users, {
    fields: [tenants.id],
    references: [users.tenantId],
  }),
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}))

// ─── Type exports ─────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Tenant = typeof tenants.$inferSelect
export type NewTenant = typeof tenants.$inferInsert
export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
