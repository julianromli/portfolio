# Database Connection Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix `ECONNRESET` database connection errors by making SSL configurable and verifying the correct settings.

**Architecture:** 
1. Create a diagnostic script to empirically test connection settings.
2. Update the main database client to dynamically configure SSL based on environment (local vs prod) or explicit configuration.
3. Verify the fix using the diagnostic script and application startup.

**Tech Stack:** TypeScript, `postgres` (driver), `tsx` (execution)

---

### Task 1: Create Diagnostic Script

**Files:**
- Create: `scripts/test-db-connection.ts`

**Step 1: Write diagnostic script**
Create a script that attempts connections with different SSL configurations.

```typescript
// scripts/test-db-connection.ts
import postgres from 'postgres';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

async function testConnection(name: string, options: any) {
  console.log(`\nTesting: ${name}`);
  const sql = postgres(connectionString!, options);
  try {
    const result = await sql`SELECT 1 as result`;
    console.log(`✅ Success: ${name}`);
    console.log('Result:', result);
    await sql.end();
    return true;
  } catch (error: any) {
    console.log(`❌ Failed: ${name}`);
    console.log('Error:', error.message);
    if (error.code) console.log('Code:', error.code);
    await sql.end();
    return false;
  }
}

async function run() {
  console.log('Starting DB Connection Diagnostics...');
  
  // Test 1: SSL Required (Current)
  await testConnection('SSL Required', { ssl: 'require' });

  // Test 2: SSL Disabled (Likely fix for local/docker)
  await testConnection('SSL Disabled', { ssl: false });

  // Test 3: SSL Allow (Negotiate)
  await testConnection('SSL Allow', { ssl: 'allow' });
  
  // Test 4: SSL Prefer (Negotiate)
  await testConnection('SSL Prefer', { ssl: 'prefer' });

  // Test 5: SSL Reject Unauthorized False (Self-signed fix)
  await testConnection('SSL No Verify', { ssl: { rejectUnauthorized: false } });
}

run().catch(console.error);
```

**Step 2: Run diagnostic script**
Run: `npx tsx scripts/test-db-connection.ts`
Expected: See which connection method succeeds.

**Step 3: Commit**
```bash
git add scripts/test-db-connection.ts
git commit -m "chore: add db connection diagnostic script"
```

---

### Task 2: Implement Fix in DB Client

**Files:**
- Modify: `lib/db/index.ts`

**Step 1: Modify client initialization**
Update the client to use conditional SSL logic.

```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Determine SSL setting
// 1. Explicit env var override (DB_SSL=false/true/require/allow/prefer)
// 2. Localhost detection (disable SSL for local/docker)
// 3. Default to 'require' for security
const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');

let sslConfig: boolean | string | object = 'require';

if (process.env.DB_SSL) {
    if (process.env.DB_SSL === 'false') sslConfig = false;
    else if (process.env.DB_SSL === 'true') sslConfig = true;
    else sslConfig = process.env.DB_SSL;
} else if (isLocal) {
    sslConfig = false;
}

const client = postgres(connectionString, { 
  prepare: false,
  ssl: sslConfig,
});

export const db = drizzle(client, { schema });
```

**Step 2: Verify with diagnostic logic (manual)**
Re-run the script or start the app.
Run: `npm run dev`
Expected: App starts without `ECONNRESET`.

**Step 3: Commit**
```bash
git add lib/db/index.ts
git commit -m "fix(db): make ssl connection configurable and auto-disable for localhost"
```
