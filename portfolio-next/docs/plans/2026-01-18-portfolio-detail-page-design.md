# Portfolio Detail Page Design

**Date:** 2026-01-18  
**Status:** Ready for Implementation

## Overview

Dynamic detail page for individual portfolio projects at `/portfolio/[slug]`. Uses editorial stack layout with comprehensive project information, horizontal screenshot carousel, and database-ready data structure.

## Data Structure

```typescript
interface Project {
  slug: string;          // URL-safe identifier: "finance"
  title: string;         // "Finance"
  category: string;      // "Web development"
  description: string;   // Full project description (2-3 paragraphs)
  image: string;         // Hero/cover image
  techStack: string[];   // ["Next.js", "TypeScript", "Tailwind"]
  screenshots: string[]; // ["/images/project-1-ss1.jpg", ...]
  liveUrl?: string;      // Optional demo link
  githubUrl?: string;    // Optional repo link
  year: number;          // 2024
}
```

Mock data initially, will integrate with Drizzle ORM + PostgreSQL (Zeabur) later.

## Page Layout (Top to Bottom)

### 1. Back Navigation
- Subtle "← Portfolio" link at top
- Uses `next/link` to `/portfolio`

### 2. Hero Section
- Full-width hero image (aspect-ratio 16:9)
- Rounded corners matching design system
- Project title (serif heading, h2 style)
- Category badge + Year displayed below title

### 3. Project Info
- Description paragraphs (matches About page text style)
- Tech stack as inline pill badges
- Pill style: `bg-surface-1 text-foreground-subtle text-sm px-3 py-1 rounded-full`

### 4. External Links
- Primary button: "View Live Demo" (if liveUrl exists)
- Secondary button: "View on GitHub" (if githubUrl exists)
- Primary: `bg-accent text-white`
- Secondary: border style

### 5. Screenshots Gallery
- Horizontal snap-scroll carousel
- Same pattern as testimonials carousel (snap-x, has-scrollbar)
- Clickable images (future: lightbox support)

## File Structure

```
app/portfolio/
├── page.tsx               # MODIFY: Add Link to detail, add slug to projects
├── [slug]/
│   └── page.tsx           # NEW: Detail page (Server Component)
lib/
└── data/
    └── projects.ts        # NEW: Centralized project data
```

## Technical Requirements

- **Server Component** — No `'use client'` directive needed
- **Static generation** — Implement `generateStaticParams()` for SSG
- **Dynamic metadata** — Set title/description per project for SEO
- **404 handling** — Call `notFound()` if slug doesn't match any project
- **Shared data** — Both pages import from `lib/data/projects.ts`

## Styling Tokens

Uses existing CSS variables:
- `bg-background-card`, `border-background-border` — Card container
- `text-foreground`, `text-foreground-muted`, `text-foreground-subtle` — Text hierarchy
- `bg-surface-1`, `bg-surface-2` — Surface colors
- `bg-accent`, `text-accent` — Accent color
- Serif headings via `var(--font-serif)` (Libre Baskerville)

## Implementation Checklist

- [ ] Create `lib/data/projects.ts` with expanded project data
- [ ] Create `app/portfolio/[slug]/page.tsx` with layout sections
- [ ] Implement `generateStaticParams()` for static generation
- [ ] Implement `generateMetadata()` for SEO
- [ ] Add back navigation link
- [ ] Add hero image section
- [ ] Add title, category, year display
- [ ] Add description section
- [ ] Add tech stack pills
- [ ] Add external link buttons (conditional)
- [ ] Add screenshots carousel
- [ ] Update `app/portfolio/page.tsx` to link to detail pages
- [ ] Test 404 behavior for invalid slugs
- [ ] Verify responsive layout (mobile/desktop)
