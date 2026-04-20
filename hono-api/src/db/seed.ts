/**
 * Seed script — populates SQLite with the original static data
 *
 * Run with: bun run src/db/seed.ts
 */

import { db } from './index'
import { users, tenants, profiles } from './schema'
import { eq } from 'drizzle-orm'

async function seed() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  db.delete(profiles).run()
  db.delete(users).run()
  db.delete(tenants).run()

  // ─── Tenants ───────────────────────────────────────────────────────────────

  db.insert(tenants)
    .values([
      {
        id: 'tnt_001',
        name: 'TechCorp',
        slug: 'techcorp',
        plan: 'enterprise',
        maxMembers: 500,
        createdAt: '2024-01-15T09:00:00Z',
      },
      {
        id: 'tnt_002',
        name: 'StartupXYZ',
        slug: 'startupxyz',
        plan: 'pro',
        maxMembers: 50,
        createdAt: '2024-02-20T14:30:00Z',
      },
      {
        id: 'tnt_003',
        name: 'DesignStudio',
        slug: 'designstudio',
        plan: 'pro',
        maxMembers: 25,
        createdAt: '2024-03-05T11:15:00Z',
      },
      {
        id: 'tnt_004',
        name: 'CloudNine',
        slug: 'cloudnine',
        plan: 'free',
        maxMembers: 5,
        createdAt: '2024-04-12T08:45:00Z',
      },
      {
        id: 'tnt_005',
        name: 'DataFlow Inc',
        slug: 'dataflow',
        plan: 'enterprise',
        maxMembers: 1000,
        createdAt: '2024-06-18T10:20:00Z',
      },
    ])
    .run()

  // ─── Users ─────────────────────────────────────────────────────────────────

  db.insert(users)
    .values([
      {
        id: 'usr_001',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'admin',
        tenantId: 'tnt_001',
        createdAt: '2024-01-15T09:00:00Z',
      },
      {
        id: 'usr_002',
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'member',
        tenantId: 'tnt_002',
        createdAt: '2024-02-20T14:30:00Z',
      },
      {
        id: 'usr_003',
        name: 'Carol Davis',
        email: 'carol@example.com',
        role: 'admin',
        tenantId: 'tnt_003',
        createdAt: '2024-03-05T11:15:00Z',
      },
      {
        id: 'usr_004',
        name: 'David Lee',
        email: 'david@example.com',
        role: 'member',
        tenantId: 'tnt_004',
        createdAt: '2024-04-12T08:45:00Z',
      },
      {
        id: 'usr_005',
        name: 'Eva Martinez',
        email: 'eva@example.com',
        role: 'viewer',
        tenantId: 'tnt_001',
        createdAt: '2024-05-01T16:00:00Z',
      },
      {
        id: 'usr_006',
        name: 'Frank Wilson',
        email: 'frank@example.com',
        role: 'member',
        tenantId: 'tnt_005',
        createdAt: '2024-06-18T10:20:00Z',
      },
    ])
    .run()

  // Update tenant owners
  db.update(tenants).set({ ownerId: 'usr_001' }).where(eq(tenants.id, 'tnt_001')).run()
  db.update(tenants).set({ ownerId: 'usr_002' }).where(eq(tenants.id, 'tnt_002')).run()
  db.update(tenants).set({ ownerId: 'usr_003' }).where(eq(tenants.id, 'tnt_003')).run()
  db.update(tenants).set({ ownerId: 'usr_004' }).where(eq(tenants.id, 'tnt_004')).run()
  db.update(tenants).set({ ownerId: 'usr_006' }).where(eq(tenants.id, 'tnt_005')).run()

  // ─── Profiles ───────────────────────────────────────────────────────────────

  db.insert(profiles)
    .values([
      {
        id: 'prf_001',
        userId: 'usr_001',
        bio: 'CTO at TechCorp. Passionate about scalable systems.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
        location: 'San Francisco, CA',
      },
      {
        id: 'prf_002',
        userId: 'usr_002',
        bio: 'Full-stack developer and open-source contributor.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
        location: 'Austin, TX',
      },
      {
        id: 'prf_002b',
        userId: 'usr_002',
        bio: 'Full-stack developer and open-source contributor.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob-alt',
        location: 'Austin, TX',
      },
      {
        id: 'prf_003',
        userId: 'usr_003',
        bio: 'Product lead focused on user-centric design.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
        location: 'New York, NY',
      },
      {
        id: 'prf_004',
        userId: 'usr_004',
        bio: 'DevOps engineer automating everything.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        location: 'Seattle, WA',
      },
      {
        id: 'prf_006',
        userId: 'usr_006',
        bio: 'Backend engineer with a love for distributed systems.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
        location: 'Denver, CO',
      },
    ])
    .run()

  console.log('✅ Database seeded successfully!')
  console.log(`   Tenants: 5 | Users: 6 | Profiles: ${db.select().from(profiles).all().length}`)
}

seed()
