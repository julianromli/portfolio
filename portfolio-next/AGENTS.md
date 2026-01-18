# AGENTS.md - Portfolio Next.js

## Project Overview
Personal portfolio built with Next.js 16 App Router.

**Tech Stack:** Next.js 16.1.3 (App Router, Turbopack), React 19.2.3, TypeScript 5 (strict), Tailwind CSS v4, @base-ui/react, Lucide React, Poppins font

---

## Commands
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check (not in scripts)
```

**Testing:** No test framework configured.
**ESLint:** Flat config (v9) extending `next/core-web-vitals` and `next/typescript`.

---

## Project Structure
```
portfolio-next/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (Poppins font)
│   ├── globals.css           # Tailwind + CSS custom properties
│   ├── page.tsx              # Home/About page
│   ├── resume/page.tsx
│   ├── portfolio/page.tsx
│   ├── blog/page.tsx
│   └── contact/
│       ├── page.tsx
│       └── actions.ts        # Server Actions (co-located)
├── components/layout/        # Navigation.tsx, Sidebar.tsx
├── lib/utils.ts              # cn() utility
└── public/images/            # Static assets
```

---

## Code Style

### Imports
Order: 1) Framework (React, Next.js) 2) Third-party 3) Local (`@/` alias)

```typescript
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
```

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Navigation`, `Sidebar` |
| Functions | camelCase | `submitContact`, `setIsExpanded` |
| Interfaces | PascalCase + Props | `TimelineProps`, `ContactFormState` |
| Page folders | kebab-case | `app/contact/` |
| Component files | PascalCase.tsx | `Navigation.tsx` |

### Exports
- **Pages:** `export default function PageName()`
- **Shared components:** Named exports `export function Component()`
- **Server Actions:** Named async `export async function action()`

### Types
Use `interface` over `type`. Define co-located with component:
```typescript
interface TimelineProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: Array<{ title: string; period: string; description: string }>;
}
```

---

## Component Patterns
```typescript
'use client';                                    // 1. Client directive (if needed)
import { useState } from 'react';                // 2. Imports
import { cn } from '@/lib/utils';

const items = [{ id: 1, name: 'Item' }];         // 3. Static data (outside component)

interface Props { title: string; }               // 4. Types/interfaces

function HelperComponent({ title }: Props) {}   // 5. Helper components

export default function PageComponent() {}       // 6. Main component
```

**Hooks:** `useState` (local state), `useActionState` (forms), `usePathname` (routing)

**Client Directive:** Add `'use client'` only for hooks, browser APIs, or event handlers.

---

## Styling

### Tailwind CSS v4
Uses CSS-first config in `globals.css` with `@theme inline` directive.

### Theme Colors
| Token | Usage |
|-------|-------|
| `background`, `background-card`, `background-border` | Backgrounds/borders |
| `foreground`, `foreground-muted`, `foreground-subtle` | Text hierarchy |
| `accent` | Gold highlight |
| `surface-1`, `surface-2` | Elevated surfaces |

### cn() Utility
```typescript
<div className={cn('base', condition && 'conditional', isActive ? 'active' : 'inactive')} />
```

---

## Error Handling
Return field-level errors from Server Actions:
```typescript
interface FormState {
  success?: boolean;
  error?: string;
  fieldErrors?: { name?: string[]; email?: string[] };
}

{state.fieldErrors?.name && (
  <p className="mt-1 text-sm text-red-400">{state.fieldErrors.name[0]}</p>
)}
```

---

## Best Practices
1. **No JSDoc** - Code should be self-documenting
2. **JSX section comments** - Use `{/* Section Name */}` for visual separation
3. **Server Actions** - Co-locate in route folder (`contact/actions.ts`)
4. **Images** - Use `next/image` with explicit width/height
5. **Links** - Use `next/link` for internal navigation
6. **External links** - Add `target="_blank" rel="noopener noreferrer"`
7. **Icons** - Import individually from lucide-react
8. **Responsive** - Mobile-first with `lg:` breakpoint for desktop
