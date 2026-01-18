# Manus Design System

> Comprehensive design system documentation for [Manus](https://manus.im) - "The Action Engine that goes beyond answers to execute tasks, automate workflows, and extend your human reach."

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [UI Components](#ui-components)
6. [Shadows & Elevation](#shadows--elevation)
7. [Animations & Transitions](#animations--transitions)
8. [Icons & Imagery](#icons--imagery)
9. [Responsive Design](#responsive-design)

---

## Design Philosophy

Manus employs a **"Modern Elegance"** aesthetic characterized by:

- **High-contrast typography** - Serif headings paired with sans-serif body text
- **Generous whitespace** - Clean, breathable layouts
- **Subtle depth** - Soft shadows and light-colored layers
- **Minimalist approach** - Clean-tech aesthetic with focus on content
- **Subtle glassmorphism** - Especially in sidebars and overlays
- **Accessibility focus** - High legibility and clear visual hierarchy

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Clarity** | Content-first approach with minimal visual noise |
| **Warmth** | Earthy neutrals over cold grays for approachable feel |
| **Sophistication** | Serif + Sans-serif pairing for editorial elegance |
| **Responsiveness** | Smooth transitions and immediate feedback |

---

## Color Palette

### Brand Colors

```css
/* Primary Brand Colors */
--primary-accent: #0081f2;        /* Manus Blue - Primary actions */
--primary-accent-hover: #0073d6;  /* Hover state */
--primary-accent-light: #e6f3ff;  /* Light accent backgrounds */
```

### Text Colors

```css
/* Text Hierarchy */
--text-primary: #34322d;      /* Deep Charcoal - Headings, main content */
--text-secondary: #5e5e5b;    /* Medium Gray - Descriptions */
--text-tertiary: #858481;     /* Light Gray - Secondary info */
--text-disabled: #b9b9b7;     /* Disabled/Placeholder text */
--text-white: #ffffff;        /* White text on dark backgrounds */
--text-white-tsp: rgba(255, 255, 255, 0.8); /* Transparent white */
```

### Background Colors

```css
/* Backgrounds */
--bg-main: #ffffff;           /* Main app background */
--bg-secondary: #f8f8f7;      /* Light warm gray */
--bg-tertiary: #fafafa;       /* Cards/Containers */
--bg-sidebar: #ebebeb;        /* Sidebar/Navigation */
--bg-input: #f4f4f4;          /* Input backgrounds */
--bg-gradient: linear-gradient(180deg, #ffffff 0%, #f8f8f7 100%);

/* Accent Backgrounds */
--bg-accent-light: #a8b2fc;   /* Lavender accent (sidebar) */
--bg-accent-gradient: linear-gradient(135deg, #b8c4fc 0%, #a8b2fc 100%);
```

### Border Colors

```css
/* Borders */
--border-default: rgba(0, 0, 0, 0.06);  /* #0000000f - Subtle borders */
--border-hover: rgba(0, 0, 0, 0.12);    /* Hover state */
--border-focus: #0000004d;               /* Input focus rings */
--border-divider: #e5e5e5;               /* Section dividers */
```

### Fill Colors (Transparency)

```css
/* Transparent Fills */
--fill-tsp-black-main: rgba(55, 53, 47, 0.04);   /* #37352f0a */
--fill-tsp-black-hover: rgba(55, 53, 47, 0.08);  /* #37352f14 */
--fill-tsp-white-main: rgba(255, 255, 255, 0.6); /* Light overlay */
```

### Semantic Colors

```css
/* Status Colors */
--color-success: #10b981;     /* Green - Success states */
--color-warning: #f59e0b;     /* Amber - Warnings */
--color-error: #ef4444;       /* Red - Errors */
--color-info: #3b82f6;        /* Blue - Information */
```

### Color Palette Visual

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| 🔵 | Manus Blue | `#0081f2` | Primary buttons, active states, links |
| ⬛ | Deep Charcoal | `#34322d` | Primary text, headings |
| 🔘 | Medium Gray | `#5e5e5b` | Secondary text, descriptions |
| ⚪ | Light Gray | `#858481` | Tertiary text, placeholders |
| 🟦 | Lavender | `#a8b2fc` | Accent backgrounds, sidebar |
| ⬜ | Off-White | `#f8f8f7` | Background gradient end |
| ◻️ | Card Gray | `#fafafa` | Card backgrounds |
| 🔲 | Sidebar Gray | `#ebebeb` | Navigation backgrounds |

---

## Typography

### Font Families

```css
/* Primary Font Stack - Body/UI */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", 
             "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, 
             "Segoe UI Emoji", "Segoe UI Symbol";

/* Heading Font Stack - Display/Titles */
--font-serif: LibreBaskerville, Georgia, Cambria, ui-serif, 
              "Times New Roman", Times, serif;
```

### Font Sizes

```css
/* Typography Scale */
--text-xs: 11px;      /* Fine print, labels */
--text-sm: 13px;      /* Secondary content */
--text-base: 15px;    /* Body text, buttons */
--text-md: 16px;      /* Standard content */
--text-lg: 18px;      /* Subheadings */
--text-xl: 20px;      /* Section titles */
--text-2xl: 24px;     /* Page titles */
--text-3xl: 30px;     /* Hero subheadings */
--text-4xl: 36px;     /* Hero headings */
--text-5xl: 48px;     /* Large display text */
```

### Line Heights

```css
/* Line Heights */
--leading-tight: 1.2;     /* Headings */
--leading-snug: 1.4;      /* Compact text */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.6;   /* Extended reading */
--leading-loose: 1.8;     /* Spacious text */
```

### Font Weights

```css
/* Font Weights */
--font-normal: 400;       /* Regular body text */
--font-medium: 500;       /* Emphasized text, buttons */
--font-semibold: 600;     /* Subheadings */
--font-bold: 700;         /* Headings, strong emphasis */
```

### Typography Usage

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Hero Heading | LibreBaskerville | 36px | 400 | 1.2 |
| Section Title | LibreBaskerville | 24px | 400 | 1.3 |
| Subheading | System Sans | 18px | 600 | 1.4 |
| Body Text | System Sans | 15px | 400 | 1.5 |
| Button Text | System Sans | 15px | 500 | 1 |
| Caption | System Sans | 13px | 400 | 1.4 |
| Small/Label | System Sans | 11px | 400 | 1.3 |

---

## Spacing & Layout

### Spacing Scale

```css
/* Spacing Values */
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  Fixed Header (64px height)                         │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│  Sidebar │    Main Content Area                     │
│  (240px) │    (Centered, max-width: 800px)          │
│          │                                          │
│          ├──────────────────────────────────────────┤
│          │    Bottom Action Bar (Fixed)             │
└──────────┴──────────────────────────────────────────┘
```

### Container Widths

```css
/* Containers */
--container-xs: 320px;    /* Mobile */
--container-sm: 480px;    /* Small cards */
--container-md: 640px;    /* Forms, dialogs */
--container-lg: 800px;    /* Main content */
--container-xl: 1024px;   /* Wide content */
--container-2xl: 1280px;  /* Full layouts */
```

### Gap & Padding Patterns

```css
/* Common Gaps */
--gap-sm: 8px;      /* Tight groupings */
--gap-md: 16px;     /* Standard spacing */
--gap-lg: 24px;     /* Section separation */
--gap-xl: 32px;     /* Major sections */

/* Padding Patterns */
--padding-button: 8px 16px;        /* Standard button */
--padding-button-lg: 12px 24px;    /* Large button */
--padding-card: 16px;              /* Card content */
--padding-section: 24px;           /* Section padding */
--padding-page: 32px 24px;         /* Page padding */
```

---

## UI Components

### Buttons

#### Primary Button

```css
.button-primary {
  background: #0081f2;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 9999px;       /* Pill shape */
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
}

.button-primary:hover {
  background: #0073d6;
  transform: translateY(-1px);
}

.button-primary:active {
  opacity: 0.8;
  transform: translateY(0);
}
```

#### Secondary Button

```css
.button-secondary {
  background: rgba(55, 53, 47, 0.04);
  color: #34322d;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 150ms ease;
}

.button-secondary:hover {
  background: rgba(55, 53, 47, 0.08);
  border-color: rgba(0, 0, 0, 0.12);
}
```

#### Icon Button

```css
.button-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 8px;
  border: none;
  color: #34322d;
  cursor: pointer;
  transition: background 150ms ease;
}

.button-icon:hover {
  background: rgba(55, 53, 47, 0.08);
}
```

### Input Fields

#### Text Input

```css
.input-text {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  line-height: 24px;
  color: #34322d;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  outline: none;
  transition: all 150ms ease;
}

.input-text::placeholder {
  color: #b9b9b7;
}

.input-text:focus {
  border-color: #0081f2;
  box-shadow: 0 0 0 3px rgba(0, 129, 242, 0.1);
}
```

#### Search/Task Input (Hero Style)

```css
.input-hero {
  width: 100%;
  max-width: 680px;
  padding: 16px 20px;
  font-size: 15px;
  line-height: 24px;
  color: #34322d;
  background: #ffffff;
  border: none;
  border-radius: 16px;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.08);
  outline: none;
}

.input-hero:focus {
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 12px 24px rgba(0, 0, 0, 0.12);
}
```

### Cards

#### Standard Card

```css
.card {
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 16px;
  transition: all 200ms ease;
}

.card:hover {
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

#### Feature Card (with Image)

```css
.card-feature {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: all 300ms ease;
}

.card-feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.card-feature-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.card-feature-content {
  padding: 20px;
}
```

### Navigation

#### Sidebar

```css
.sidebar {
  width: 240px;
  height: 100vh;
  background: #ebebeb;
  padding: 16px;
  overflow-y: auto;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #5e5e5b;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.6);
  color: #34322d;
}

.sidebar-item.active {
  background: rgba(255, 255, 255, 0.8);
  color: #34322d;
  font-weight: 500;
}
```

#### Header Navigation

```css
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: transparent;
}

.nav-link {
  font-size: 14px;
  color: #5e5e5b;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 150ms ease;
}

.nav-link:hover {
  color: #34322d;
  background: rgba(55, 53, 47, 0.04);
}
```

### Pills & Tags

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #5e5e5b;
  background: rgba(55, 53, 47, 0.04);
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.pill.active {
  color: #0081f2;
  background: rgba(0, 129, 242, 0.08);
  border-color: rgba(0, 129, 242, 0.2);
}
```

### Progress Indicators

```css
.progress-bar {
  height: 4px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0081f2;
  border-radius: 2px;
  transition: width 400ms ease;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 129, 242, 0.2);
  border-top-color: #0081f2;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Shadows & Elevation

### Shadow Scale

```css
/* Shadow Levels */
--shadow-none: none;

--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);

--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);

--shadow-md: 
  0 4px 8px rgba(0, 0, 0, 0.04),
  0 2px 4px rgba(0, 0, 0, 0.08);

--shadow-lg: 
  0 8px 16px rgba(0, 0, 0, 0.08),
  0 4px 8px rgba(0, 0, 0, 0.04);

--shadow-xl: 
  0 12px 32px rgba(0, 0, 0, 0.12),
  0 4px 8px rgba(0, 0, 0, 0.08);

--shadow-2xl: 
  0 20px 40px rgba(0, 0, 0, 0.16),
  0 8px 16px rgba(0, 0, 0, 0.08);
```

### Elevation Usage

| Level | Shadow | Use Case |
|-------|--------|----------|
| 0 | None | Flat elements, disabled states |
| 1 | XS | Subtle lift, default cards |
| 2 | SM | Hovered elements |
| 3 | MD | Active cards, dropdowns |
| 4 | LG | Modals, floating elements |
| 5 | XL | Popovers, complex overlays |
| 6 | 2XL | Hero input, prominent elements |

### Glassmorphism Effect

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Animations & Transitions

### Transition Presets

```css
/* Timing Functions */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Duration */
--duration-fast: 100ms;
--duration-normal: 150ms;
--duration-slow: 300ms;
--duration-slower: 400ms;
```

### Common Transitions

```css
/* Hover Transitions */
.transition-colors {
  transition: color 150ms ease, background-color 150ms ease, 
              border-color 150ms ease;
}

.transition-transform {
  transition: transform 200ms ease;
}

.transition-all {
  transition: all 200ms ease;
}

/* Micro-interactions */
.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale:hover {
  transform: scale(1.02);
}

.active-press:active {
  transform: scale(0.98);
  opacity: 0.9;
}
```

### Keyframe Animations

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Shimmer (Loading) */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## Icons & Imagery

### Icon Style

- **Style**: Outline/Stroke icons (not filled)
- **Stroke Width**: 1.5px - 2px
- **Size**: 16px, 20px, 24px (most common)
- **Color**: Uses `--text-primary` (#34322d) or `--text-secondary` (#5e5e5b)

### Icon Sizes

```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### Icon Usage

```css
.icon {
  width: 20px;
  height: 20px;
  color: #34322d;
  stroke-width: 1.5;
}

.icon-muted {
  color: #858481;
}

.icon-action {
  color: #0081f2;
}
```

### Image Treatments

```css
/* Card Images */
.image-card {
  border-radius: 8px;
  object-fit: cover;
}

/* Avatar */
.avatar {
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Hero Images */
.image-hero {
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

---

## Responsive Design

### Breakpoints

```css
/* Breakpoint Values */
--breakpoint-xs: 375px;   /* Small phones */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Media Query Usage

```css
/* Mobile First Approach */
@media (min-width: 640px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
  .sidebar { display: block; }
}

@media (max-width: 639px) {
  /* Mobile-only styles */
  .sidebar { display: none; }
}
```

### Responsive Patterns

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Sidebar | Hidden (hamburger) | Hidden | Visible (240px) |
| Main Content | Full width | Centered (90%) | Centered (max 800px) |
| Cards | Stack (1 col) | Grid (2 col) | Grid (3 col) |
| Typography | -2px from base | Base | Base |
| Spacing | 75% of base | Base | Base |

---

## Z-Index Scale

```css
/* Z-Index Layers */
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
--z-toast: 1080;
```

---

## Quick Reference Cheatsheet

### Colors at a Glance

```css
/* Primary */ #0081f2
/* Text Primary */ #34322d
/* Text Secondary */ #5e5e5b
/* Background */ #f8f8f7
/* Border */ rgba(0,0,0,0.06)
/* Accent Background */ #a8b2fc
```

### Typography at a Glance

```css
/* Headings */ LibreBaskerville, serif
/* Body */ -apple-system, sans-serif
/* Size Base */ 15px
/* Line Height */ 1.5
```

### Component Patterns

```css
/* Border Radius */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;  /* Pill buttons */
```

---

## Implementation Notes

### Framework Recommendations

- **React/Next.js**: Use CSS Modules or styled-components
- **CSS-in-JS**: Emotion or Styled Components work well
- **Utility CSS**: Tailwind can be configured to match this system
- **Design Tools**: Figma tokens can be exported from these values

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Variables (Custom Properties) required
- Backdrop-filter for glassmorphism (Safari prefix needed)

---

*Last Updated: January 2026*
*Source: [manus.im](https://manus.im)*
