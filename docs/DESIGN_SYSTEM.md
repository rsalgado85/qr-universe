# QR Universe — Design System

> **Version:** 1.0.0  
> **Quality Bar:** Stripe / Linear / Vercel / Notion  
> **Reference:** See design tokens in `tailwind.config.ts` and `app/globals.css`

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Typography](#2-typography)
3. [Color Palette](#3-color-palette)
4. [Spacing](#4-spacing)
5. [Shadows](#5-shadows)
6. [Border Radius](#6-border-radius)
7. [Borders](#7-borders)
8. [Glassmorphism](#8-glassmorphism)
9. [Components Catalog](#9-components-catalog)
10. [Motion Guidelines](#10-motion-guidelines)
11. [Iconography](#11-iconography)
12. [Illustrations](#12-illustrations)

---

## 1. Design Principles

| Principle | Description |
|-----------|-------------|
| **Premium Minimalism** | Generous whitespace, intentional restraint, every element has purpose |
| **Depth Through Layering** | Subtle shadows, glass effects, overlapping elements create 3D feel |
| **Joyful Micro-interactions** | Delightful, fast animations that guide without distracting |
| **Dark-First Excellence** | Designed for dark mode first; light mode is equally polished |
| **Accessibility as Aesthetic** | WCAG AA+ contrast ratios, clear focus states, readable typography |
| **Performance as Luxury** | Instant transitions, no jank, 60fps animations — speed feels premium |

---

## 2. Typography

### 2.1 Font Stack

```
Primary:       Inter (variable) — UI, body, navigation
Display:       Cal Sans (variable) — hero headlines, large numbers, brand moments
Monospace:     JetBrains Mono — code, API keys, shortcodes, data
```

### 2.2 Google Fonts / next/font Import

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const calSans = localFont({
  src: './fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

### 2.3 Typography Scale

```
┌─────────────┬──────────┬─────────────┬────────────────────────────────────┐
│   Token      │  Size    │  Line       │  Usage                              │
│             │         │  Height     │                                    │
├─────────────┼──────────┼─────────────┼────────────────────────────────────┤
│  text-xs     │  0.75rem │  1rem       │  Badges, captions, legal text      │
│  text-sm     │  0.875rem│  1.25rem    │  Body small, labels, meta          │
│  text-base   │  1rem    │  1.5rem     │  Body default, inputs, paragraphs  │
│  text-lg     │  1.125rem│  1.75rem    │  Body large, card descriptions     │
│  text-xl     │  1.25rem │  1.75rem    │  Section subtitles, feature intros │
│  text-2xl    │  1.5rem  │  2rem       │  Card titles, modal headings       │
│  text-3xl    │  1.875rem│  2.25rem    │  Section headings                  │
│  text-4xl    │  2.25rem │  2.5rem (0) │  Page titles, hero subheads       │
│  text-5xl    │  3rem    │  1           │  Hero headlines (Cal Sans)        │
│  text-6xl    │  3.75rem │  1           │  Mega headlines (Cal Sans)        │
│  text-7xl    │  4.5rem  │  1           │  Landing hero (Cal Sans)          │
│  text-8xl    │  6rem    │  1           │  Brand moments (Cal Sans)         │
└─────────────┴──────────┴─────────────┴────────────────────────────────────┘

Note: Cal Sans is intentionally set with line-height: 1 (tight) for display usage.
```

### 2.4 Font Weights

```
Inter:      400 (regular), 500 (medium), 600 (semibold), 700 (bold)
Cal Sans:   600 (semibold) — only weight available, perfect for display
JetBrains:  400 (regular), 500 (medium)
```

### 2.5 Typography Tokens (Tailwind Config)

```typescript
// tailwind.config.ts
fontSize: {
  'xs':   ['0.75rem',  { lineHeight: '1rem',      letterSpacing: '0.01em' }],
  'sm':   ['0.875rem', { lineHeight: '1.25rem',   letterSpacing: '0' }],
  'base': ['1rem',     { lineHeight: '1.5rem',    letterSpacing: '-0.01em' }],
  'lg':   ['1.125rem', { lineHeight: '1.75rem',   letterSpacing: '-0.01em' }],
  'xl':   ['1.25rem',  { lineHeight: '1.75rem',   letterSpacing: '-0.02em' }],
  '2xl':  ['1.5rem',   { lineHeight: '2rem',      letterSpacing: '-0.02em' }],
  '3xl':  ['1.875rem', { lineHeight: '2.25rem',   letterSpacing: '-0.02em' }],
  '4xl':  ['2.25rem',  { lineHeight: '2.5rem',    letterSpacing: '-0.03em' }],
  '5xl':  ['3rem',     { lineHeight: '1',         letterSpacing: '-0.04em' }],
  '6xl':  ['3.75rem',  { lineHeight: '1',         letterSpacing: '-0.04em' }],
  '7xl':  ['4.5rem',   { lineHeight: '1',         letterSpacing: '-0.05em' }],
  '8xl':  ['6rem',     { lineHeight: '1',         letterSpacing: '-0.05em' }],
},
```

### 2.6 Rich Text Styles

```css
/* Prose overrides for blog/markdown content */
.prose {
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  max-width: 72ch;
}
```

---

## 3. Color Palette

### 3.1 Theme Philosophy

QR Universe uses a **dark-first** color system with CSS custom properties, enabling seamless dark/light mode switching. The palette draws from premium fintech/SaaS aesthetics — deep navies, vibrant teal/cyan primaries, and warm gold accents that signal quality.

### 3.2 Dark Mode (Default)

```
┌────────────────────────────────────────────────────────────────┐
│                    DARK MODE PALETTE                            │
├──────────────┬──────────┬──────────────────────────────────────┤
│   Token      │   Hex    │  Usage                                │
├──────────────┼──────────┼──────────────────────────────────────┤
│ background   │ #060B15  │  Page background — deep navy       │
│ foreground   │ #F8FAFC  │  Primary text — near-white         │
│ card         │ #0B1221  │  Card/surface — slightly elevated  │
│ card-hover   │ #0F1729  │  Card hover state                  │
│ popover      │ #0B1221  │  Dropdowns, tooltips               │
│ muted        │ #1E293B  │  Muted surface (inputs, tabs)     │
│ muted-fg     │ #94A3B8  │  Muted text (descriptions, meta)  │
│ border       │ #1E293B  │  Subtle borders                    │
│ border-hover │ #334155  │  Border hover state                │
│ ring         │ #14B8A6  │  Focus rings                       │
├──────────────┼──────────┼──────────────────────────────────────┤
│ primary      │ #14B8A6  │  Primary actions, links, accents   │
│ primary-fg   │ #042F2E  │  Text on primary backgrounds       │
│ primary-hover│ #0D9488  │  Primary hover state               │
│ primary-100  │ #CCFBF1  │  Primary tint (10%)               │
│ primary-200  │ #99F6E4  │  Primary tint (20%)               │
│ primary-800  │ #115E59  │  Primary — dark variant            │
│ primary-900  │ #134E4A  │  Primary — darkest variant         │
├──────────────┼──────────┼──────────────────────────────────────┤
│ secondary    │ #6366F1  │  Secondary actions, charts         │
│ secondary-fg │ #EEF2FF  │  Text on secondary                 │
├──────────────┼──────────┼──────────────────────────────────────┤
│ accent       │ #F5A623  │  Gold accent — CTAs, badges, stars │
│ accent-fg    │ #1A0E00  │  Text on gold                     │
│ accent-hover │ #D4901C  │  Gold hover state                  │
├──────────────┼──────────┼──────────────────────────────────────┤
│ success      │ #22C55E  │  Success states, positive trends   │
│ warning      │ #F59E0B  │  Warnings, medium severity         │
│ destructive  │ #EF4444  │  Delete, errors, danger actions    │
│ info         │ #3B82F6  │  Informational elements            │
├──────────────┼──────────┼──────────────────────────────────────┤
│ chart-1      │ #14B8A6  │  Chart series 1 (teal)            │
│ chart-2      │ #6366F1  │  Chart series 2 (indigo)          │
│ chart-3      │ #F5A623  │  Chart series 3 (gold)            │
│ chart-4      │ #EC4899  │  Chart series 4 (pink)            │
│ chart-5      │ #8B5CF6  │  Chart series 5 (violet)          │
│ chart-6      │ #22C55E  │  Chart series 6 (green)           │
└──────────────┴──────────┴──────────────────────────────────────┘
```

### 3.3 Light Mode

```
┌────────────────────────────────────────────────────────────────┐
│                    LIGHT MODE PALETTE                           │
├──────────────┬──────────┬──────────────────────────────────────┤
│   Token      │   Hex    │  Usage                                │
├──────────────┼──────────┼──────────────────────────────────────┤
│ background   │ #FFFFFF  │  Page background — pure white       │
│ foreground   │ #0A0F1D  │  Primary text — near-black          │
│ card         │ #FFFFFF  │  Card — white with shadow           │
│ card-hover   │ #F8FAFC  │  Card hover state                  │
│ popover      │ #FFFFFF  │  Dropdowns, tooltips               │
│ muted        │ #F1F5F9  │  Muted surface                     │
│ muted-fg     │ #64748B  │  Muted text                        │
│ border       │ #E2E8F0  │  Subtle borders                    │
│ border-hover │ #CBD5E1  │  Border hover state                │
│ ring         │ #14B8A6  │  Focus rings                       │
├──────────────┼──────────┼──────────────────────────────────────┤
│ primary      │ #0D9488  │  Primary — darker for light bg      │
│ primary-fg   │ #FFFFFF  │  Text on primary (white)            │
│ primary-hover│ #0F766E  │  Primary hover state               │
├──────────────┼──────────┼──────────────────────────────────────┤
│ accent       │ #D4901C  │  Gold — slightly darker for light   │
│ accent-fg    │ #FFFFFF  │  Text on gold                       │
└──────────────┴──────────┴──────────────────────────────────────┘
```

### 3.4 Gradient Palette

```css
/* Brand Gradients */
--gradient-primary: linear-gradient(135deg, #14B8A6 0%, #6366F1 100%);
--gradient-accent:  linear-gradient(135deg, #F5A623 0%, #14B8A6 100%);
--gradient-hero:    linear-gradient(180deg, #060B15 0%, #0B1221 50%, #0F1729 100%);
--gradient-card:    linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%);
--gradient-glow:    radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 70%);

/* Glass Effect Gradients */
--glass-bg:         linear-gradient(135deg, rgba(11, 18, 33, 0.8), rgba(11, 18, 33, 0.6));
--glass-border:     linear-gradient(135deg, rgba(20, 184, 166, 0.3), rgba(99, 102, 241, 0.1));
```

### 3.5 Semantic Color Usage

| Color | Use For |
|-------|---------|
| **Teal (#14B8A6)** | Primary buttons, links, active states, brand accents, QR dots default |
| **Indigo (#6366F1)** | Secondary buttons, chart series, hover secondary |
| **Gold (#F5A623)** | Premium badges, star ratings, featured labels, CTA glow |
| **Navy (#060B15)** | Backgrounds, deep surfaces |
| **Slate (#1E293B)** | Borders, muted surfaces, input backgrounds |
| **Green (#22C55E)** | Success toasts, positive trends, active status |
| **Red (#EF4444)** | Errors, destructive actions, danger zones |
| **Amber (#F59E0B)** | Warnings, pending status, attention |

### 3.6 CSS Custom Properties (globals.css)

```css
@layer base {
  :root {
    /* Dark mode (default) */
    --background: 222 47% 5%;        /* #060B15 */
    --foreground: 210 40% 98%;       /* #F8FAFC */
    --card: 222 47% 7%;              /* #0B1221 */
    --card-hover: 222 47% 9%;        /* #0F1729 */
    --popover: 222 47% 7%;
    --muted: 217 33% 17%;            /* #1E293B */
    --muted-foreground: 215 20% 65%; /* #94A3B8 */
    --border: 217 33% 17%;
    --border-hover: 217 33% 25%;
    --ring: 173 80% 40%;             /* #14B8A6 */

    --primary: 173 80% 40%;          /* #14B8A6 */
    --primary-foreground: 177 90% 10%;
    --primary-hover: 173 80% 32%;

    --secondary: 239 84% 67%;        /* #6366F1 */
    --secondary-foreground: 210 40% 98%;

    --accent: 38 92% 55%;            /* #F5A623 */
    --accent-foreground: 38 100% 5%;

    --success: 142 71% 45%;
    --warning: 38 92% 50%;
    --destructive: 0 84% 60%;
    --info: 217 91% 60%;

    --chart-1: 173 80% 40%;
    --chart-2: 239 84% 67%;
    --chart-3: 38 92% 55%;
    --chart-4: 336 80% 58%;
    --chart-5: 262 83% 66%;
    --chart-6: 142 71% 45%;

    --radius: 0.75rem;
    --radius-sm: 0.5rem;
    --radius-lg: 1rem;
    --radius-xl: 1.5rem;
  }

  .light {
    --background: 0 0% 100%;         /* #FFFFFF */
    --foreground: 222 47% 9%;        /* #0A0F1D */
    --card: 0 0% 100%;
    --card-hover: 210 40% 96%;
    --popover: 0 0% 100%;
    --muted: 210 40% 96%;            /* #F1F5F9 */
    --muted-foreground: 215 16% 47%; /* #64748B */
    --border: 214 32% 91%;           /* #E2E8F0 */
    --border-hover: 214 32% 84%;
    --ring: 175 70% 41%;

    --primary: 175 70% 41%;          /* #0D9488 */
    --primary-foreground: 0 0% 100%;
    --primary-hover: 175 70% 35%;

    --secondary: 239 84% 67%;
    --secondary-foreground: 0 0% 100%;

    --accent: 38 92% 50%;            /* #D4901C */
    --accent-foreground: 0 0% 100%;
  }
}
```

---

## 4. Spacing

### 4.1 Spatial System

QR Universe uses a **4px base grid** (Tailwind default). Generous spacing is a hallmark of premium design.

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Tight icon gaps |
| `2` | 8px | Inline spacing, small gaps |
| `3` | 12px | Compact padding |
| `4` | 16px | Standard padding, card body |
| `5` | 20px | Comfortable padding |
| `6` | 24px | Card padding, section gaps |
| `8` | 32px | Large gaps, section padding |
| `10` | 40px | Section margins |
| `12` | 48px | Hero section padding |
| `16` | 64px | Major section spacing |
| `20` | 80px | Page-level spacing |
| `24` | 96px | Hero vertical padding |
| `32` | 128px | Full-screen section spacing |

### 4.2 Container Widths

```typescript
// tailwind.config.ts
container: {
  center: true,
  padding: '2rem',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',        // Standard max-width
    '2xl': '1400px',     // Wide content (landing)
  },
},
```

### 4.3 Section Spacing Pattern

```tsx
// Standard section layout
<section className="py-24 md:py-32 lg:py-40">
  <div className="container max-w-7xl mx-auto">
    {/* content */}
  </div>
</section>
```

---

## 5. Shadows

### 5.1 Shadow Scale

QR Universe uses **layered, colored shadows** for a premium 3D feel rather than flat gray shadows.

```
┌──────────┬──────────────────────────────────────────────────────────────────┐
│  Token   │  CSS Value                                                        │
├──────────┼──────────────────────────────────────────────────────────────────┤
│ shadow-xs│  0 1px 2px 0 rgb(0 0 0 / 0.05)                                   │
│ shadow-sm│  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)  │
│ shadow-md│  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)│
│ shadow-lg│  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)│
│ shadow-xl│  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)│
│ shadow-2xl│ 0 25px 50px -12px rgb(0 0 0 / 0.25)                             │
└──────────┴──────────────────────────────────────────────────────────────────┘
```

### 5.2 Branded Shadows (Colored Glows)

```css
/* Premium colored shadows — Tailwind arbitrary values */
.shadow-primary-glow {
  box-shadow: 0 0 40px -10px rgba(20, 184, 166, 0.3),
              0 0 80px -20px rgba(20, 184, 166, 0.15);
}

.shadow-accent-glow {
  box-shadow: 0 0 40px -10px rgba(245, 166, 35, 0.3),
              0 0 80px -20px rgba(245, 166, 35, 0.15);
}

.shadow-primary-sm {
  box-shadow: 0 4px 14px 0 rgba(20, 184, 166, 0.2);
}

.shadow-card-hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12),
              0 0 0 1px rgba(20, 184, 166, 0.1);
}

/* In Tailwind classes: shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)] */
```

### 5.3 Usage Guidelines

| Element | Shadow | Purpose |
|---------|--------|---------|
| Cards (resting) | `shadow-sm` or none + `border` | Subtle definition |
| Cards (hover) | `shadow-card-hover` | Lift on interaction |
| Modals / Dialogs | `shadow-2xl` | Strong elevation |
| Primary CTA buttons | `shadow-primary-sm` | Call attention |
| Dropdowns / Popovers | `shadow-lg` + `border` | Float above content |
| Navbar (scrolled) | `shadow-sm` | Separate from page |
| QR Preview | `shadow-primary-glow` | Premium, magical glow |

---

## 6. Border Radius

### 6.1 Radius Scale

```
┌──────────┬──────────┬────────────────────────────────────┐
│  Token   │  Value   │  Usage                              │
├──────────┼──────────┼────────────────────────────────────┤
│ radius   │  0.75rem │  Default — cards, buttons, inputs  │
│ radius-sm│  0.5rem  │  Compact — badges, tags, chips    │
│ radius-md│  0.375rem│  Sharp — tabs, segmented controls │
│ radius-lg│  1rem    │  Soft — modals, large cards       │
│ radius-xl│  1.5rem  │  Round — hero cards, feature cards │
│ radius-2xl│ 2rem    │  Pill shapes, special CTAs         │
│ radius-full│ 9999px │  Circles, avatars, toggles         │
└──────────┴──────────┴────────────────────────────────────┘
```

### 6.2 Application Rules

- **Cards:** `rounded-xl` (1rem default, 1.5rem for feature/hero cards)
- **Buttons:** `rounded-xl` (1rem, pill for CTAs)
- **Inputs:** `rounded-xl` (1rem)
- **Modals:** `rounded-2xl` (2rem)
- **Avatars:** `rounded-full`
- **Badges:** `rounded-full` (pill)
- **Tabs:** `rounded-lg` (1rem)
- **Dropdowns:** `rounded-xl` (1rem)

---

## 7. Borders

### 7.1 Border Widths

| Token | Value | Usage |
|-------|-------|-------|
| `border` | 1px | Default borders |
| `border-2` | 2px | Active states, focus rings |
| `border-4` | 4px | Heavy emphasis |

### 7.2 Border Styles

```css
/* Subtle border — default */
border-subtle: 1px solid hsl(var(--border));

/* Hover border — interactive elements */
border-hover: 1px solid hsl(var(--border-hover));

/* Glowing border — featured cards, QR preview */
border-glow: 1px solid rgba(20, 184, 166, 0.3);

/* Dashed border — upload zones, empty states */
border-dashed: 1px dashed hsl(var(--border));
```

### 7.3 Divider Pattern

```tsx
// Horizontal divider
<div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

// Vertical divider
<div className="w-px h-6 bg-border" />
```

---

## 8. Glassmorphism

### 8.1 Glass Styles

QR Universe uses glassmorphism for elevated surfaces, navbars, and special cards — inspired by Stripe and Linear.

```css
/* Base Glass */
.glass {
  background: rgba(11, 18, 33, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Strong Glass (more opaque, less blur) */
.glass-strong {
  background: rgba(11, 18, 33, 0.85);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Subtle Glass (light overlay) */
.glass-subtle {
  background: rgba(11, 18, 33, 0.4);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Colored Glass — teal tint */
.glass-primary {
  background: rgba(20, 184, 166, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(20, 184, 166, 0.15);
}
```

### 8.2 Glass Tailwind Plugin Classes

```typescript
// tailwind.config.ts — custom utilities
{
  '.glass': {
    '@apply bg-background/70 backdrop-blur-xl backdrop-saturate-150 border border-white/[0.08]': {},
  },
  '.glass-strong': {
    '@apply bg-background/85 backdrop-blur-md backdrop-saturate-150 border border-white/[0.06]': {},
  },
  '.glass-subtle': {
    '@apply bg-background/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.05]': {},
  },
  '.glass-primary': {
    '@apply bg-primary/10 backdrop-blur-xl backdrop-saturate-150 border border-primary/15': {},
  },
}
```

### 8.3 Usage

| Element | Glass Variant |
|---------|---------------|
| Fixed navbar | `glass-strong` |
| Hero overlays | `glass-subtle` |
| Feature cards | `glass` |
| QR preview container | `glass-primary` |
| Modal backdrops | `glass-strong` (backdrop) |

---

## 9. Components Catalog

### 9.1 UI Primitives (Shadcn/UI Base + Custom)

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMPONENT CATALOG                             │
├──────────────┬────────────────────────────────────────────────────┤
│  Component   │  Description & Variants                            │
├──────────────┼────────────────────────────────────────────────────┤
│ Button       │  Primary, Secondary, Outline, Ghost, Destructive,  │
│              │  Link, Accent (gold CTA). Sizes: sm, default, lg,  │
│              │  xl. With loading spinner. Icon + text variants.   │
├──────────────┼────────────────────────────────────────────────────┤
│ Input        │  Default, with icon, with clear button, error,     │
│              │  disabled, with prefix/suffix, textarea variant.   │
├──────────────┼────────────────────────────────────────────────────┤
│ Card         │  Default, glass, gradient, interactive (hover),    │
│              │  featured (with glow border). Header, content,      │
│              │  footer slots.                                      │
├──────────────┼────────────────────────────────────────────────────┤
│ Badge        │  Default, secondary, outline, success, warning,    │
│              │  destructive, accent. Sizes: sm, default.          │
├──────────────┼────────────────────────────────────────────────────┤
│ Dialog/Modal │  With overlay blur, slide-up animation, sizes:      │
│              │  sm, default, lg, xl, fullscreen.                  │
├──────────────┼────────────────────────────────────────────────────┤
│ DropdownMenu │  With icons, shortcuts, separators, submenus,      │
│              │  checkboxes, radio groups.                         │
├──────────────┼────────────────────────────────────────────────────┤
│ Tabs         │  Default (underline), pills, segmented. Animated   │
│              │  active indicator.                                  │
├──────────────┼────────────────────────────────────────────────────┤
│ Table        │  With sorting, selection, pagination, sticky        │
│              │  header, loading skeleton.                         │
├──────────────┼────────────────────────────────────────────────────┤
│ Select       │  Native & custom (Radix). With search, multi.       │
├──────────────┼────────────────────────────────────────────────────┤
│ Combobox     │  Searchable select with keyboard nav.              │
├──────────────┼────────────────────────────────────────────────────┤
│ Command      │  ⌘K-style command palette.                         │
├──────────────┼────────────────────────────────────────────────────┤
│ Sheet        │  Slide-in panel (left, right, top, bottom).         │
├──────────────┼────────────────────────────────────────────────────┤
│ Tooltip      │  Rich tooltips with keyboard shortcut hints.        │
├──────────────┼────────────────────────────────────────────────────┤
│ HoverCard    │  Preview cards on hover.                           │
├──────────────┼────────────────────────────────────────────────────┤
│ Skeleton     │  Loading placeholders matching component shapes.    │
├──────────────┼────────────────────────────────────────────────────┤
│ Separator    │  Horizontal & vertical dividers. Gradient variant.  │
├──────────────┼────────────────────────────────────────────────────┤
│ Avatar       │  With fallback initials, status indicator.          │
├──────────────┼────────────────────────────────────────────────────┤
│ Progress     │  Linear & circular. With label, animated.          │
├──────────────┼────────────────────────────────────────────────────┤
│ Switch       │  Toggle with animation.                            │
├──────────────┼────────────────────────────────────────────────────┤
│ Checkbox     │  With indeterminate state.                         │
├──────────────┼────────────────────────────────────────────────────┤
│ RadioGroup   │  Card-style and default variants.                  │
├──────────────┼────────────────────────────────────────────────────┤
│ Slider       │  Range and single value.                            │
├──────────────┼────────────────────────────────────────────────────┤
│ Toast        │  Sonner-based. Success, error, warning, info,       │
│              │  loading, promise. Rich content support.           │
├──────────────┼────────────────────────────────────────────────────┤
│ Accordion    │  FAQ-style, single & multiple open. Animated.       │
├──────────────┼────────────────────────────────────────────────────┤
│ Alert        │  Default, info, success, warning, destructive.     │
├──────────────┼────────────────────────────────────────────────────┤
│ Calendar     │  Date picker with range selection.                 │
├──────────────┼────────────────────────────────────────────────────┤
│ Popover      │  Rich content popovers.                            │
└──────────────┴────────────────────────────────────────────────────┘
```

### 9.2 Domain Components

```
┌──────────────────────────────────────────────────────────────────┐
│                  DOMAIN COMPONENT CATALOG                          │
├───────────────────────┬───────────────────────────────────────────┤
│  Component            │  Description                              │
├───────────────────────┼───────────────────────────────────────────┤
│ QRCanvas              │  Core QR renderer — live preview canvas   │
│ QRDesignPanel         │  Full design customization controls       │
│ QRTypeSelector        │  Grid of QR type cards with icons         │
│ QRContentForm         │  Dynamic form based on selected QR type   │
│ QRColorPicker         │  Color picker with preset palettes        │
│ QRGradientEditor      │  Gradient type, angle, color stops        │
│ QRShapeEditor         │  Dots, corners, corner-dots styles        │
│ QRLogoUploader        │  Logo upload, position, size controls     │
│ QRFrameEditor         │  Text frame configuration                 │
│ QRDownloadModal       │  Format, resolution, margin options       │
│ QRCard                │  QR preview card (grid/list views)        │
│ QRTemplateCard        │  Template preview with hover effects      │
│ TemplateGallery       │  Masonry/Grid template browser            │
│ AnalyticsOverview     │  Metric cards with sparklines             │
│ ScanTimelineChart     │  Interactive area chart (Recharts)        │
│ GeographyChart        │  Choropleth or bar chart                  │
│ DeviceBreakdownChart  │  Donut chart                              │
│ BrowserDistribution   │  Horizontal bar chart                     │
│ TimeOfDayHeatmap      │  Heatmap visualization                    │
│ TopQRCodesTable       │  Sortable data table                      │
│ PricingCard           │  Plan comparison card                     │
│ TestimonialCard       │  Customer quote with avatar               │
│ FeatureCard           │  Icon + title + description               │
│ HeroSection           │  Landing hero with interactive demo       │
│ Navbar                │  Glass navbar with mobile menu             │
│ Footer                │  Multi-column footer with gradients       │
│ DashboardSidebar      │  Collapsible sidebar navigation           │
│ DashboardShell        │  Sidebar + topbar + content layout        │
│ OnboardingWizard      │  Multi-step onboarding flow               │
│ EmptyState            │  Illustrated empty states                 │
│ ThemeToggle           │  Dark/Light/System mode switch            │
│ UserMenu              │  Avatar dropdown with actions             │
└───────────────────────┴───────────────────────────────────────────┘
```

### 9.3 Component States

Every interactive component must handle:

| State | Implementation |
|-------|---------------|
| **Default** | Base styling |
| **Hover** | `hover:` variants, subtle scale or color shift |
| **Focus** | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| **Active** | `active:scale-[0.98]` for buttons |
| **Disabled** | `opacity-50 pointer-events-none cursor-not-allowed` |
| **Loading** | Skeleton or spinner placeholder |
| **Error** | Red border, error message below |
| **Empty** | Illustrated empty state component |
| **Success** | Green check animation |

---

## 10. Motion Guidelines

### 10.1 Philosophy

Animations in QR Universe serve three purposes:
1. **Guide attention** — direct users to important actions
2. **Provide feedback** — confirm interactions happened
3. **Delight** — create moments of joy that make the product feel premium

All animations must:
- Be **60fps** (use `transform` and `opacity` only — no layout thrashing)
- Respect **prefers-reduced-motion** (disable animations for accessibility)
- Be **fast** — 150–400ms (never block the user)
- Use **spring physics** for natural feel (Framer Motion spring)

### 10.2 Duration & Easing Tokens

```typescript
// lib/motion.ts
export const durations = {
  instant: 0.1,
  fast: 0.15,      // Micro-interactions (hover, focus)
  normal: 0.25,    // Standard transitions (toggle, switch)
  slow: 0.4,       // Page transitions, reveals
  slower: 0.6,     // Hero animations, large reveals
  slowest: 0.8,    // Entrance animations, storytelling
} as const;

export const easings = {
  // CSS cubic-bezier
  easeOut: [0, 0, 0.2, 1],          // Standard ease-out (Material)
  easeIn: [0.4, 0, 1, 1],           // Standard ease-in
  easeInOut: [0.4, 0, 0.2, 1],      // Standard ease-in-out
  // Custom
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  springGentle: { type: 'spring', stiffness: 150, damping: 20 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 15 },
  springSnappy: { type: 'spring', stiffness: 500, damping: 35 },
} as const;
```

### 10.3 Animation Patterns

#### Page Transitions

```tsx
// Fade + slight slide up on page mount
const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: easings.easeOut },
};
```

#### Stagger Children (Lists, Grids)

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,    // 50ms between each child
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
```

#### Hover Scale (Cards, Buttons)

```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
>
```

#### Fade In on Scroll (Features, Sections)

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: easings.easeOut }}
>
```

#### Number Counter (Analytics, Stats)

```tsx
<motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {count}
</motion.span>
// Use useMotionValue + useSpring + useTransform for smooth counting
```

#### Skeleton Shimmer

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 0%,
    hsl(var(--muted) / 0.5) 50%,
    hsl(var(--muted)) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 10.4 Accessibility: Reduced Motion

```tsx
// hooks/use-reduced-motion.ts
import { useReducedMotion } from 'framer-motion';

export function useRespectMotion() {
  const prefersReduced = useReducedMotion();

  const getTransition = (config: Transition) =>
    prefersReduced ? { duration: 0 } : config;

  const getVariants = (variants: Variants) =>
    prefersReduced
      ? { initial: {}, animate: {}, exit: {} }
      : variants;

  return { prefersReduced, getTransition, getVariants };
}
```

### 10.5 Animation Presets

```typescript
// lib/animations.ts
export const presets = {
  // Elements
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },

  // Lists
  staggerFast: {
    staggerChildren: 0.03,
    delayChildren: 0.05,
  },
  staggerNormal: {
    staggerChildren: 0.07,
    delayChildren: 0.1,
  },
  staggerSlow: {
    staggerChildren: 0.12,
    delayChildren: 0.15,
  },

  // Layout
  layoutSpring: {
    type: 'spring',
    stiffness: 350,
    damping: 30,
  } as const,

  // Interactions
  hoverLift: {
    whileHover: { y: -4, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  hoverGlow: {
    whileHover: {
      boxShadow: '0 0 40px -10px rgba(20, 184, 166, 0.2)',
    },
    transition: { duration: 0.3 },
  },
};
```

### 10.6 Animation Do's and Don'ts

| ✅ Do | ❌ Don't |
|------|---------|
| Use `transform` and `opacity` | Animate `width`, `height`, `top`, `left` |
| Keep durations 150–400ms | Use animations longer than 600ms for UI |
| Use spring for natural feel | Use linear easing (robotic) |
| Respect `prefers-reduced-motion` | Ignore accessibility preferences |
| Animate one thing at a time (or stagger) | Animate everything simultaneously |
| Use `will-change` sparingly | Apply `will-change` to everything |
| Test on low-end devices | Only test on M3 Max MacBooks |
| Use `whileInView` with `once: true` | Re-trigger scroll animations repeatedly |

---

## 11. Iconography

### 11.1 Icon Library

**Lucide React** — consistently styled, tree-shakeable, MIT licensed.

### 11.2 Icon Sizes

| Size | Class | Usage |
|------|-------|-------|
| 14px | `size-3.5` | Inline with text, badges |
| 16px | `size-4` | Default: buttons, inputs, menu items |
| 20px | `size-5` | Card headers, section icons |
| 24px | `size-6` | Feature icons, large buttons |
| 32px | `size-8` | Hero feature icons |
| 48px | `size-12` | Empty states, landing features |

### 11.3 Icon Component Wrapper

```tsx
// components/ui/icon.tsx
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
}

const sizeMap = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
  xl: 'size-6',
  '2xl': 'size-8',
  '3xl': 'size-12',
};

export function Icon({ icon: LucideComponent, size = 'md', className }: IconProps) {
  return <LucideComponent className={cn(sizeMap[size], className)} />;
}
```

### 11.4 Icon Usage by Context

| Context | Icons |
|---------|-------|
| Navigation | `LayoutDashboard`, `Plus`, `Bookmark`, `Palette`, `BarChart3`, `Settings`, `Key`, `HelpCircle`, `MessageSquare` |
| QR Types | `Link`, `Mail`, `Phone`, `MessageSquare`, `Wifi`, `MapPin`, `User`, `Utensils`, `Calendar` |
| Social | Specific brand icons (`Instagram`, `Facebook`, `Linkedin`, etc.) |
| Actions | `Plus`, `Pencil`, `Trash2`, `Copy`, `Download`, `Share2`, `MoreHorizontal`, `ArrowRight`, `ArrowLeft` |
| Status | `CheckCircle2`, `AlertCircle`, `XCircle`, `Info`, `Loader2` (spinner) |
| UI | `Search`, `ChevronDown`, `ChevronRight`, `X`, `Menu`, `Sun`, `Moon`, `Laptop` |

---

## 12. Illustrations

### 12.1 Illustration Style

- **Style:** Abstract, geometric, gradient-based
- **Mood:** Modern, premium, tech-forward
- **Colors:** Primary teal + indigo + gold accents
- **Format:** SVG (inline or component)
- **Usage:** Empty states, onboarding, hero backgrounds

### 12.2 Illustration Components

```tsx
// components/illustrations/
├── EmptyQRs.tsx           // Empty saved QRs state
├── EmptyAnalytics.tsx     // No scan data yet
├── ErrorState.tsx         // Something went wrong
├── NoResults.tsx          // Search returned nothing
├── UpgradePrompt.tsx      // Feature locked behind plan
├── HeroBlob.tsx           // Animated hero background shapes
├── QRBuilderHero.tsx      // Hero section illustration
└── SuccessCheck.tsx       // Animated success checkmark
```

---

*End of Design System Documentation*
