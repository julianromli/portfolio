# Database Integration Design: Drizzle ORM + PostgreSQL + UploadThing

**Date:** 2026-01-18  
**Status:** Ready for Implementation

## Overview

Migrate portfolio from static data to PostgreSQL database with Drizzle ORM, UploadThing for image uploads, and a custom admin interface for CRUD operations.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
├─────────────────────────────────────────────────────────────┤
│  /portfolio          → List projects (SSR from DB)          │
│  /portfolio/[slug]   → Project detail (SSR from DB)         │
│  /admin              → Password gate                         │
│  /admin/projects     → CRUD projects                         │
│  /admin/projects/new → Create project + upload images        │
│  /admin/projects/[id]→ Edit project                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
├─────────────────────────────────────────────────────────────┤
│  lib/db/index.ts     → Drizzle client (postgres-js driver)  │
│  lib/db/schema.ts    → Projects table schema                 │
│  app/api/uploadthing → UploadThing file routes               │
│  Server Actions      → CRUD operations for admin             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     External Services                        │
├─────────────────────────────────────────────────────────────┤
│  Zeabur PostgreSQL   → Database hosting                      │
│  UploadThing         → Image upload & CDN                    │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

```typescript
// lib/db/schema.ts
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),           // UploadThing URL
  techStack: text('tech_stack').array(),    // PostgreSQL text[]
  screenshots: text('screenshots').array(), // PostgreSQL text[]
  liveUrl: text('live_url'),
  githubUrl: text('github_url'),
  year: integer('year').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

## Dependencies

```json
{
  "dependencies": {
    "drizzle-orm": "^0.44.0",
    "postgres": "^3.4.5",
    "uploadthing": "^7.6.0",
    "@uploadthing/react": "^7.3.0",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "drizzle-kit": "^0.31.0"
  }
}
```

## File Structure

```
lib/
├── db/
│   ├── index.ts              # Drizzle client + connection
│   ├── schema.ts             # Table definitions
│   └── queries.ts            # Reusable query functions
├── uploadthing.ts            # UploadThing client utils

app/
├── api/
│   └── uploadthing/
│       ├── core.ts           # FileRouter definition
│       └── route.ts          # API route handler
├── admin/
│   ├── layout.tsx            # Admin layout (password gate)
│   ├── page.tsx              # Admin dashboard
│   └── projects/
│       ├── page.tsx          # Projects list
│       ├── new/
│       │   └── page.tsx      # Create project form
│       ├── [id]/
│       │   └── page.tsx      # Edit project form
│       └── actions.ts        # Server Actions for CRUD

drizzle/                      # Generated migrations
drizzle.config.ts             # Drizzle Kit config
.env.local                    # DATABASE_URL, UPLOADTHING_TOKEN, ADMIN_PASSWORD
```

## Environment Variables

```bash
# .env.local
DATABASE_URL=postgresql://user:password@host:port/dbname
UPLOADTHING_TOKEN=your_uploadthing_token
ADMIN_PASSWORD=your_secure_admin_password
```

## Implementation Phases

### Phase 1: Database Foundation (COMPLETE)
- [x] Install Drizzle ORM + postgres driver
- [x] Create schema, config, and DB client
- [x] Create seed script with existing 9 projects
- [x] Update portfolio pages to query from DB (SSR)
- [x] Add npm scripts: db:push, db:studio, db:generate, db:seed

**Next steps to activate:**
1. Create PostgreSQL database on Zeabur
2. Add DATABASE_URL to .env.local
3. Run `npm run db:push` to create table
4. Run `npm run db:seed` to populate data

### Phase 2: UploadThing Integration
- [ ] Install UploadThing packages
- [ ] Create FileRouter for image uploads
- [ ] Create upload components/utilities
- [ ] Test: can upload images and get URLs

### Phase 3: Admin Interface
- [ ] Create password-protected admin layout
- [ ] Build projects list page
- [ ] Build create project form with image upload
- [ ] Build edit project form
- [ ] Add delete functionality
- [ ] Test: full CRUD workflow

## Admin Authentication

Simple password-only protection:
- Password stored in `ADMIN_PASSWORD` env variable
- Cookie-based session after successful login
- No user table needed

## Data Fetching Strategy

- **SSR (Dynamic)** for all portfolio pages
- Fresh data on every request
- No `generateStaticParams` (removed)
- Consider ISR later if needed for performance

## Image Handling

- UploadThing for all image uploads
- Images stored on UploadThing CDN
- URLs stored in database
- Existing `/public/images` can be migrated or kept as fallback
