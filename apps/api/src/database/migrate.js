import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './pool.js';

const directory = fileURLToPath(new URL('../../../../database/migrations/', import.meta.url));
await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
await pool.query('CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
for (const file of (await fs.readdir(directory)).filter((name) => name.endsWith('.sql')).sort()) {
  const done = await pool.query('SELECT 1 FROM schema_migrations WHERE name = $1', [file]);
  if (done.rowCount) continue;
  const sql = await fs.readFile(path.join(directory, file), 'utf8');
  const client = await pool.connect();
  try { await client.query('BEGIN'); await client.query(sql); await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]); await client.query('COMMIT'); console.log(`Applied ${file}`); }
  catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
}
await pool.end();
