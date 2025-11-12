import { createHash } from 'crypto';
import { query } from '../../config/db.js';

/**
 * Ensure db_migrations table exists (must be created first)
 */
export async function ensureDbTweaksTable() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS db_migrations (
        id SERIAL PRIMARY KEY,
        hashes VARCHAR(32) NOT NULL,
        applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        error TEXT,
        query TEXT,
        UNIQUE(hashes)
      );
    `);
    
    await query(`
      CREATE INDEX IF NOT EXISTS idx_db_migrations_hashes ON db_migrations(hashes);
    `);
    
    console.log('db_migrations table ready');
  } catch (error) {
    console.error('Error creating db_migrations table:', error.message);
    throw error;
  }
}

/**
 * Generate MD5 hash of a SQL query
 */
export function generateQueryHash(query) {
  return createHash('md5').update(query.trim()).digest('hex');
}

/**
 * Check if a query hash already exists in db_migrations
 */
export async function checkQueryHashExists(hash) {
  const result = await query(
    'SELECT id FROM db_migrations WHERE hashes = $1',
    [hash]
  );
  return result.rows.length > 0;
}

/**
 * Store query hash in db_migrations table
 */
export async function saveQueryHash(sqlQuery, hash, error = null) {
  try {
    await query(
      `INSERT INTO db_migrations (hashes, query, error, applied)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
        ON CONFLICT (hashes) DO UPDATE SET
          error = EXCLUDED.error,
          applied = CURRENT_TIMESTAMP`,
      [hash, sqlQuery, error]
    );
  } catch (err) {
    console.error('Error storing query hash:', err.message);
  }
}
