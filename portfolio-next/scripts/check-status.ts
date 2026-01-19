
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { projects } from '../lib/db/schema';
import { sql } from 'drizzle-orm';

config({ path: '.env.local' });

async function checkStatus() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  // Use the same SSL logic as lib/db/index.ts for consistency
  const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
  const shouldDisableSsl = process.env.DB_SSL === 'false' || isLocal;

  console.log('Connecting to database...');
  const client = postgres(connectionString, { 
    prepare: false, 
    ssl: shouldDisableSsl ? false : 'prefer' 
  });
  const db = drizzle(client);

  try {
    // Check if table exists by trying to count rows
    // using raw SQL for table existence check is safer but count is also fine
    // if table doesn't exist, this will throw
    const countResult = await db.select({ count: sql<number>`count(*)` }).from(projects);
    const count = Number(countResult[0].count);
    
    console.log(`Table 'projects' exists.`);
    console.log(`Row count: ${count}`);
    
    // Check strict match for seed data count (9 items in seed.ts)
    if (count === 0) {
      console.log('STATUS: EMPTY');
    } else if (count < 9) {
      console.log('STATUS: PARTIAL');
    } else {
      console.log('STATUS: OK');
    }

  } catch (error: any) {
    if (error.code === '42P01') { // undefined_table
      console.log(`Table 'projects' does not exist.`);
      console.log('STATUS: MISSING_TABLE');
    } else {
      console.error('Error checking status:', error);
      console.log('STATUS: ERROR');
    }
  } finally {
    await client.end();
  }
}

checkStatus().catch((error) => {
  console.error('Check failed:', error);
  process.exit(1);
});
