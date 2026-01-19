import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Logic to determine SSL mode
// - Default to 'prefer' to avoid ECONNRESET on some providers (tries SSL first, falls back)
// - Disable for localhost
// - Allow overrides via DB_SSL=false
const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
const shouldDisableSsl = process.env.DB_SSL === 'false' || isLocal;

const client = postgres(connectionString, { 
  prepare: false,
  ssl: shouldDisableSsl ? false : 'prefer',
});

export const db = drizzle(client, { schema });
