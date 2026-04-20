/**
 * Drizzle SQLite client — bun:sqlite sync & async APIs
 *
 * Uses the native bun:sqlite driver for maximum performance.
 * Both sync and async interfaces are available:
 *   Sync:  db.select().from(users).all()   (blocking)
 *   Async: await db.select().from(users)    (non-blocking)
 */

import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import * as schema from './schema'

const DB_PATH = './sqlite.db'

// ─── Singleton client ─────────────────────────────────────────────────────────

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDb() {
  if (!_db) {
    const sqlite = new Database(DB_PATH)
    _db = drizzle({ client: sqlite, schema })
  }
  return _db
}

// ─── Named export ─────────────────────────────────────────────────────────────

export const db = getDb()

export { schema }
