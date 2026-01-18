import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

const dbUrl = process.env.DATABASE_URL;
const urlWithSsl = dbUrl?.includes('?') 
  ? `${dbUrl}&sslmode=require` 
  : `${dbUrl}?sslmode=require`;

export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: urlWithSsl!,
  },
  verbose: true,
  strict: true,
});
