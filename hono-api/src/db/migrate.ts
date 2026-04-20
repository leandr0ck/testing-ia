/**
 * Migration runner — creates all tables in the correct dependency order.
 * Uses bun:sqlite directly for maximum reliability.
 *
 * Run with: bun run src/db/migrate.ts
 */

import { Database } from 'bun:sqlite'

const DB_PATH = './sqlite.db'

// ─── SQL statements (order matters: tables without FKs first) ─────────────────

const MIGRATIONS = [
  // 1. users (no FK deps)
  `CREATE TABLE IF NOT EXISTS users (
    id         text PRIMARY KEY NOT NULL,
    name       text NOT NULL,
    email      text NOT NULL UNIQUE,
    role       text NOT NULL DEFAULT 'member',
    tenant_id  text,
    created_at text NOT NULL DEFAULT (datetime('now'))
  )`,

  // 2. tenants (no FK deps — owner set after users exist)
  `CREATE TABLE IF NOT EXISTS tenants (
    id          text PRIMARY KEY NOT NULL,
    name        text NOT NULL,
    slug        text NOT NULL UNIQUE,
    plan        text NOT NULL DEFAULT 'free',
    owner_id    text,
    max_members integer NOT NULL DEFAULT 5,
    created_at  text NOT NULL DEFAULT (datetime('now'))
  )`,

  // 3. profiles (FK → users)
  `CREATE TABLE IF NOT EXISTS profiles (
    id       text PRIMARY KEY NOT NULL,
    user_id  text NOT NULL,
    bio      text NOT NULL DEFAULT '',
    avatar   text NOT NULL DEFAULT '',
    location text NOT NULL DEFAULT '',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`,

  // 4. Add FK users.tenant_id → tenants.id (was deferred)
  //    Run only if column exists but constraint is missing
  `CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id)`,
  `CREATE INDEX IF NOT EXISTS idx_tenants_owner_id ON tenants(owner_id)`,
]

async function migrate() {
  const db = new Database(DB_PATH)

  console.log(`🔧 Running migrations on ${DB_PATH}...`)

  for (const sql of MIGRATIONS) {
    try {
      db.exec(sql)
      console.log(`   ✅ ${sql.slice(0, 60).trim()}...`)
    } catch (err: any) {
      if (err.message?.includes('already exists') || err.message?.includes('duplicate')) {
        console.log(`   ⏭️  Skipped (already exists): ${sql.slice(0, 50).trim()}...`)
      } else {
        throw err
      }
    }
  }

  db.close()
  console.log('✅ Migrations complete!')
}

migrate()
