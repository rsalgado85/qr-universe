# QR Universe — Folder Structure

> **Version:** 1.0.0  
> **Framework:** Next.js 15 (App Router)  
> **Pattern:** Modular Monolith with Feature-Based Organization  
> **Inspiration:** Linear, Vercel, Cal.com

---

## Table of Contents

1. [Architecture Principles](#1-architecture-principles)
2. [Root Structure](#2-root-structure)
3. [`app/` — App Router Pages & Layouts](#3-app---app-router-pages--layouts)
4. [`components/` — Component Library](#4-components---component-library)
5. [`hooks/` — Custom React Hooks](#5-hooks---custom-react-hooks)
6. [`services/` — Service Layer](#6-services---service-layer)
7. [`lib/` — Shared Utilities](#7-lib---shared-utilities)
8. [`store/` — Client State Management](#8-store---client-state-management)
9. [`types/` — TypeScript Types](#9-types---typescript-types)
10. [`server/` — Server-Only Code](#10-server---server-only-code)
11. [`config/` — Application Configuration](#11-config---application-configuration)
12. [`public/` — Static Assets](#12-public---static-assets)
13. [Module Boundaries & Rules](#13-module-boundaries--rules)

---

## 1. Architecture Principles

| Principle | Rule |
|-----------|------|
| **Colocation** | Keep related files close together. A component's types, tests, and styles live near the component. |
| **Barrel Exports** | Every directory has an `index.ts` exporting its public API. |
| **Server/Client Boundary** | `server/` directory contains server-only code. `components/` with `'use client'` for client components. |
| **No Circular Dependencies** | Enforced by `eslint-plugin-import`. Modules only import from layers below them. |
| **Feature Folders** | Large features get their own folder in `app/` with colocated components. |
| **Single Responsibility** | Each file does one thing. Files over 300 lines are split. |

---

## 2. Root Structure

```
project-qr/
├── app/                          # Next.js 15 App Router (pages, layouts, API routes)
├── components/                   # Shared React components
├── hooks/                        # Custom React hooks
├── services/                     # Service layer (API clients, external integrations)
├── lib/                          # Pure utility functions (no React, no side effects)
├── store/                        # Client-side state (Zustand / Jotai)
├── types/                        # Shared TypeScript type definitions
├── server/                       # Server-only code (tRPC routers, Prisma, auth config)
├── config/                       # App configuration (site metadata, feature flags, constants)
├── styles/                       # Global styles, Tailwind layers
├── public/                       # Static assets (images, fonts, robots.txt)
├── prisma/                       # Prisma schema, migrations, seed data
├── emails/                       # React Email templates
├── scripts/                      # Build/utility scripts
├── tests/                        # Test setup, fixtures, utilities
├── docs/                         # Project documentation
├── .github/                      # CI/CD workflows
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── .env                          # Environment variables (local)
├── .env.example                  # Environment variable template
├── package.json                  # Dependencies & scripts
└── README.md                     # Project overview
```

---

## 3. `app/` — App Router Pages & Layouts

```
app/
├── layout.tsx                          # Root layout (providers, fonts, metadata)
├── page.tsx                            # Landing page (public)
├── not-found.tsx                       # 404 page
├── error.tsx                           # Global error boundary
├── loading.tsx                         # Global loading state
├── globals.css                         # Global styles + Tailwind directives
│
├── (marketing)/                        # Route group — marketing pages
│   ├── layout.tsx                      # Marketing layout (public nav, footer)
│   ├── page.tsx                        # Landing page (mirrors root, or redirect)
│   ├── templates/
│   │   ├── page.tsx                    # Public template gallery
│   │   └── [slug]/
│   │       └── page.tsx                # Template detail page
│   ├── pricing/
│   │   └── page.tsx                    # Pricing page
│   └── blog/
│       ├── page.tsx                    # Blog listing
│       └── [slug]/
│           └── page.tsx                # Blog post
│
├── (auth)/                             # Route group — authentication
│   ├── layout.tsx                      # Auth layout (centered, minimal)
│   ├── login/
│   │   └── page.tsx                    # Sign in
│   ├── register/
│   │   └── page.tsx                    # Sign up
│   ├── forgot-password/
│   │   └── page.tsx                    # Password reset request
│   └── reset-password/
│       └── page.tsx                    # Password reset form
│
├── (dashboard)/                        # Route group — authenticated dashboard
│   ├── layout.tsx                      # Dashboard layout (sidebar + topbar + content)
│   ├── page.tsx                        # Dashboard home
│   │
│   ├── create/
│   │   ├── page.tsx                    # QR creator (type selection)
│   │   ├── layout.tsx                  # Creator layout (steps)
│   │   └── [type]/
│   │       └── page.tsx                # Type-specific creator
│   │
│   ├── qrs/
│   │   ├── page.tsx                    # Saved QRs list/grid
│   │   ├── loading.tsx                 # QRs loading skeleton
│   │   └── [id]/
│   │       ├── page.tsx                # QR detail
│   │       ├── edit/
│   │       │   └── page.tsx            # Edit QR
│   │       ├── analytics/
│   │       │   └── page.tsx            # Per-QR analytics
│   │       └── download/
│   │           └── page.tsx            # Download options
│   │
│   ├── templates/
│   │   ├── page.tsx                    # Dashboard template browser
│   │   └── [slug]/
│   │       └── page.tsx                # Template detail & use
│   │
│   ├── analytics/
│   │   ├── page.tsx                    # Global analytics dashboard
│   │   └── loading.tsx                 # Analytics loading
│   │
│   ├── settings/
│   │   ├── page.tsx                    # Settings index (redirect to profile)
│   │   ├── profile/
│   │   │   └── page.tsx                # Profile settings
│   │   ├── billing/
│   │   │   └── page.tsx                # Billing & plans
│   │   ├── team/
│   │   │   └── page.tsx                # Team management
│   │   └── notifications/
│   │       └── page.tsx                # Notification preferences
│   │
│   └── api/
│       └── page.tsx                    # API keys & documentation
│
├── r/
│   └── [shortcode]/
│       └── route.ts                    # QR redirect + scan logging (Edge)
│
└── api/
    ├── trpc/
    │   └── [trpc]/
    │       └── route.ts                # tRPC API handler
    ├── auth/
    │   └── [...nextauth]/
    │       └── route.ts                # Auth.js API routes
    ├── webhooks/
    │   ├── stripe/
    │   │   └── route.ts                # Stripe webhook handler
    │   └── resend/
    │       └── route.ts                # Resend webhook handler
    └── og/
        └── route.tsx                   # Dynamic OG image generation
```

---

## 4. `components/` — Component Library

```
components/
├── ui/                                 # UI Primitives (Shadcn/UI base + custom)
│   ├── index.ts                        # Barrel export
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── label.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── tabs.tsx
│   ├── table.tsx                       # (from @/components/ui/table/*)
│   ├── select.tsx
│   ├── combobox.tsx
│   ├── command.tsx                     # ⌘K palette
│   ├── sheet.tsx
│   ├── tooltip.tsx
│   ├── hover-card.tsx
│   ├── skeleton.tsx
│   ├── separator.tsx
│   ├── avatar.tsx
│   ├── progress.tsx
│   ├── switch.tsx
│   ├── checkbox.tsx
│   ├── radio-group.tsx
│   ├── slider.tsx
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── alert-dialog.tsx
│   ├── calendar.tsx
│   ├── popover.tsx
│   ├── scroll-area.tsx
│   ├── toast.tsx                       # Sonner wrapper
│   ├── sonner.tsx                      # Toast provider
│   ├── form.tsx                        # React Hook Form integration
│   └── icon.tsx                        # Lucide icon wrapper
│
├── layout/                             # Layout components
│   ├── index.ts
│   ├── navbar.tsx                      # Public navigation bar (glass)
│   ├── footer.tsx                      # Public footer
│   ├── dashboard-sidebar.tsx           # Dashboard sidebar navigation
│   ├── dashboard-shell.tsx             # Dashboard layout wrapper
│   ├── dashboard-topbar.tsx            # Dashboard top bar (breadcrumb, user menu)
│   ├── mobile-sidebar.tsx              # Mobile hamburger menu
│   ├── container.tsx                   # Max-width container
│   └── section.tsx                     # Section wrapper with consistent spacing
│
├── landing/                            # Landing page sections
│   ├── index.ts
│   ├── hero-section.tsx                # Hero with interactive QR demo
│   ├── features-section.tsx            # Feature grid with icons
│   ├── templates-showcase.tsx          # Template carousel/masonry
│   ├── analytics-showcase.tsx          # Animated charts preview
│   ├── testimonials-section.tsx        # Testimonial marquee
│   ├── faq-section.tsx                 # FAQ accordion
│   ├── pricing-section.tsx             # Pricing plans
│   └── cta-section.tsx                 # Final call-to-action
│
├── qr/                                 # QR-specific components
│   ├── index.ts
│   ├── qr-canvas.tsx                   # Core QR renderer (live preview)
│   ├── qr-design-panel.tsx             # Design customization panel
│   ├── qr-type-selector.tsx            # QR type grid
│   ├── qr-content-form.tsx             # Dynamic content form
│   ├── qr-color-picker.tsx             # Color picker with presets
│   ├── qr-gradient-editor.tsx          # Gradient configuration
│   ├── qr-shape-editor.tsx             # Dot/corner style selectors
│   ├── qr-logo-uploader.tsx            # Logo upload & positioning
│   ├── qr-frame-editor.tsx             # Frame text & style
│   ├── qr-download-modal.tsx           # Download options dialog
│   ├── qr-card.tsx                     # QR card (grid/list view)
│   ├── qr-card-skeleton.tsx            # QR card loading skeleton
│   ├── qr-status-badge.tsx             # Active/paused/archived badge
│   └── qr-empty-state.tsx              # Empty QR list illustration
│
├── templates/                          # Template components
│   ├── index.ts
│   ├── template-card.tsx               # Template preview card
│   ├── template-gallery.tsx            # Template grid with filters
│   ├── template-preview-modal.tsx      # Full template preview
│   └── template-empty-state.tsx        # No templates found
│
├── analytics/                          # Analytics visualization components
│   ├── index.ts
│   ├── analytics-overview.tsx          # Metric cards with sparklines
│   ├── scan-timeline-chart.tsx         # Area chart (Recharts)
│   ├── geography-chart.tsx             # Bar chart by country
│   ├── device-breakdown-chart.tsx      # Donut chart
│   ├── browser-distribution-chart.tsx  # Horizontal bar chart
│   ├── time-of-day-heatmap.tsx         # Heatmap visualization
│   ├── top-qr-codes-table.tsx          # Sortable data table
│   ├── analytics-loading.tsx           # Charts loading skeleton
│   └── analytics-empty-state.tsx       # No data yet
│
├── dashboard/                          # Dashboard content components
│   ├── index.ts
│   ├── welcome-banner.tsx              # Onboarding welcome card
│   ├── quick-stats.tsx                 # Stats overview cards
│   ├── recent-qrs.tsx                  # Recently created QRs list
│   ├── activity-feed.tsx               # Recent activity timeline
│   └── upgrade-banner.tsx              # Plan upgrade prompt
│
├── settings/                           # Settings page components
│   ├── index.ts
│   ├── profile-form.tsx                # Edit profile form
│   ├── password-form.tsx               # Change password
│   ├── billing-card.tsx                # Current subscription display
│   ├── plan-comparison.tsx             # Plan feature comparison
│   ├── invoice-list.tsx                # Invoice history
│   ├── team-members-list.tsx           # Team member management
│   ├── invite-member-dialog.tsx        # Invite team member
│   └── api-key-manager.tsx             # API key CRUD
│
├── onboarding/                         # Onboarding flow
│   ├── index.ts
│   ├── onboarding-wizard.tsx           # Multi-step wizard
│   ├── step-role-selector.tsx          # Role selection step
│   ├── step-use-case.tsx               # Use case selection
│   └── step-first-qr.tsx               # Quick create CTA
│
├── illustrations/                      # SVG Illustration components
│   ├── index.ts
│   ├── empty-qrs.tsx                   # No QRs created yet
│   ├── empty-analytics.tsx             # No scan data
│   ├── error-state.tsx                 # Something went wrong
│   ├── no-results.tsx                  # Search empty results
│   ├── upgrade-prompt.tsx              # Feature locked
│   ├── hero-blob.tsx                   # Animated hero background
│   └── success-check.tsx               # Animated checkmark
│
├── shared/                             # Shared composite components
│   ├── index.ts
│   ├── theme-toggle.tsx                # Dark/Light/System toggle
│   ├── user-menu.tsx                   # Avatar dropdown
│   ├── search-command.tsx              # ⌘K search palette
│   ├── breadcrumb.tsx                  # Dynamic breadcrumb
│   ├── page-header.tsx                 # Page title + description + actions
│   ├── empty-state.tsx                 # Generic empty state
│   ├── error-boundary.tsx              # Client error boundary
│   ├── confirm-dialog.tsx              # Confirmation modal
│   ├── copy-button.tsx                 # Copy to clipboard
│   └── logo.tsx                        # Brand logo (light/dark variants)
│
└── providers/                          # React context providers
    ├── index.tsx                       # Composed provider tree
    ├── theme-provider.tsx              # next-themes wrapper
    ├── session-provider.tsx            # NextAuth SessionProvider
    ├── trpc-provider.tsx               # tRPC client provider
    └── toast-provider.tsx              # Sonner Toaster
```

---

## 5. `hooks/` — Custom React Hooks

```
hooks/
├── index.ts                            # Barrel export
│
├── use-qr-generator.ts                 # QR code generation (qr-code-styling wrapper)
├── use-qr-preview.ts                   # Debounced live preview
├── use-qr-download.ts                  # Download QR in various formats
├── use-qr-list.ts                      # QR list with pagination, search, sort
│
├── use-analytics.ts                    # Analytics data fetching
├── use-analytics-export.ts             # Export analytics report
│
├── use-debounce.ts                     # Debounce a value
├── use-media-query.ts                  # Responsive breakpoint detection
├── use-intersection-observer.ts        # Element visibility detection
├── use-local-storage.ts                # Typed localStorage hook
├── use-clipboard.ts                    # Copy to clipboard
├── use-keyboard-shortcut.ts            # Keyboard shortcut registration
├── use-previous.ts                     # Track previous value
├── use-is-mounted.ts                   # Client-side mount detection
├── use-scroll-position.ts              # Scroll position tracking
├── use-lock-body.ts                    # Prevent body scroll (modals)
├── use-reduced-motion.ts              # Respect prefers-reduced-motion
├── use-count-up.ts                     # Animated number counter
│
├── use-form-persistence.ts             # Save/restore form state to localStorage
├── use-auto-save.ts                    # Auto-save with debounce
│
└── use-upload.ts                       # File upload with progress (S3 presigned URL)
```

---

## 6. `services/` — Service Layer

```
services/
├── index.ts                            # Barrel export
│
├── qr/
│   ├── index.ts
│   ├── qr-service.ts                   # QR CRUD operations (tRPC client)
│   ├── qr-generation-service.ts        # Server-side QR generation
│   └── qr-download-service.ts          # Format conversion & download
│
├── analytics/
│   ├── index.ts
│   ├── analytics-service.ts            # Analytics data queries
│   ├── geo-service.ts                  # IP to geolocation (MaxMind / Cloudflare)
│   ├── ua-parser-service.ts            # User agent parsing
│   └── aggregation-service.ts          # Daily rollup aggregation
│
├── auth/
│   ├── index.ts
│   └── auth-service.ts                 # Auth helpers (server-side)
│
├── billing/
│   ├── index.ts
│   ├── stripe-service.ts               # Stripe API wrapper
│   └── usage-service.ts                # Usage tracking & limits
│
├── storage/
│   ├── index.ts
│   └── s3-service.ts                   # S3/R2 upload, presigned URLs
│
├── email/
│   ├── index.ts
│   └── email-service.ts                # Resend email sending
│
├── template/
│   ├── index.ts
│   └── template-service.ts             # Template CRUD
│
├── workspace/
│   ├── index.ts
│   └── workspace-service.ts            # Workspace & team management
│
└── share/
    ├── index.ts
    └── share-service.ts                # Shortcode, redirect, sharing
```

---

## 7. `lib/` — Shared Utilities

```
lib/
├── index.ts                            # Barrel export
│
├── utils.ts                            # cn() helper, general utilities
├── constants.ts                        # App-wide constants
├── urls.ts                             # URL builders, route helpers
│
├── validations/                        # Zod schemas
│   ├── index.ts
│   ├── auth.ts                         # Login, register, password schemas
│   ├── qr.ts                           # QR content & design schemas
│   ├── template.ts                     # Template schemas
│   ├── user.ts                         # Profile update schemas
│   └── billing.ts                      # Billing schemas
│
├── qr/
│   ├── index.ts
│   ├── qr-types.ts                     # QR type definitions & helpers
│   ├── qr-design-defaults.ts           # Default design configs per type
│   ├── qr-content-templates.ts         # Content templates per QR type
│   ├── qr-shortcode.ts                 # Shortcode generation
│   └── qr-constants.ts                 # QR-specific constants
│
├── design/
│   ├── index.ts
│   ├── colors.ts                       # Color palette definitions
│   ├── gradients.ts                    # Gradient presets
│   ├── shapes.ts                       # Dot/corner style presets
│   └── frames.ts                       # Frame style presets
│
├── analytics/
│   ├── index.ts
│   ├── metrics.ts                      # Metric definitions & calculations
│   ├── geo.ts                          # Country code → name mapping
│   └── periods.ts                      # Date range helpers
│
├── motion.ts                           # Framer Motion presets & tokens
├── fonts.ts                            # Font configuration
├── metadata.ts                         # SEO metadata builders
├── stripe.ts                           # Stripe client init
├── prisma.ts                           # Prisma client singleton
├── auth.ts                             # Auth.js configuration
├── trpc.ts                             # tRPC client & server setup
├── api-utils.ts                        # API helpers (rate limiting, etc.)
├── ratelimit.ts                        # Rate limiting (Upstash or in-memory)
├── cache.ts                            # Cache helpers
├── logger.ts                           # Structured logging (Pino)
├── env.ts                              # Environment variable validation (Zod)
└── errors.ts                           # Custom error classes
```

---

## 8. `store/` — Client State Management

```
store/
├── index.ts                            # Barrel export
│
├── qr-store.ts                         # QR creator state (design + content)
│   // Stores: selectedType, content, design, previewRef, isDirty
│
├── ui-store.ts                         # UI state
│   // Stores: sidebarOpen, theme, commandPaletteOpen, activeModal
│
├── analytics-store.ts                  # Analytics filter state
│   // Stores: selectedPeriod, selectedQR, granularity
│
├── filter-store.ts                     # List filter state
│   // Stores: searchQuery, selectedTags, sortBy, sortOrder
│
└── onboarding-store.ts                 # Onboarding state
    // Stores: currentStep, isComplete, selectedRole, selectedUseCase
```

**State Management Choice:** Zustand (lightweight, TypeScript-first, no boilerplate)

```typescript
// Example: store/qr-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QRType, QRDesign, QRContent } from '@/types';

interface QRStore {
  selectedType: QRType | null;
  content: Partial<QRContent>;
  design: QRDesign;
  isDirty: boolean;
  setType: (type: QRType) => void;
  updateContent: (content: Partial<QRContent>) => void;
  updateDesign: (design: Partial<QRDesign>) => void;
  resetStore: () => void;
}
```

---

## 9. `types/` — TypeScript Types

```
types/
├── index.ts                            # Re-export everything
│
├── qr.ts                               # QR-related types
│   // QRCode, QRType, QRStatus, QRDesign, QRContent, QRDesignPreset
│
├── user.ts                             # User types
│   // User, UserRole, UserProfile, Workspace, WorkspaceMember
│
├── analytics.ts                        # Analytics types
│   // ScanEvent, AnalyticsOverview, TimelineData, GeoData, DeviceData, BrowserData
│
├── template.ts                         # Template types
│   // Template, TemplateCategory, TemplateDesign
│
├── billing.ts                          # Billing types
│   // Plan, Subscription, Invoice, UsageMetrics, PlanTier
│
├── api.ts                              # API types
│   // PaginatedResponse, ApiError, SortDirection, FilterParams
│
├── navigation.ts                       # Navigation types
│   // NavItem, SidebarItem, BreadcrumbItem
│
├── design.ts                           # Design system types
│   // ColorPalette, GradientConfig, ShadowConfig, SpacingToken
│
├── shared.ts                           # Shared utility types
│   // DeepPartial, Nullable, WithRequired, AsyncReturnType, Prettify
│
└── forms.ts                            # Form types
    // LoginFormValues, RegisterFormValues, QRContentFormValues
```

---

## 10. `server/` — Server-Only Code

```
server/
├── api/
│   ├── root.ts                         # tRPC root router (appRouter)
│   ├── trpc.ts                         # tRPC context & init
│   │
│   └── routers/
│       ├── index.ts
│       ├── auth.ts                     # Auth router
│       ├── user.ts                     # User router
│       ├── qr.ts                       # QR router
│       ├── template.ts                 # Template router
│       ├── analytics.ts                # Analytics router
│       ├── billing.ts                  # Billing router
│       ├── workspace.ts                # Workspace router
│       ├── team.ts                     # Team router
│       └── share.ts                    # Share router
│
├── middleware/
│   ├── index.ts
│   ├── auth.ts                         # Auth middleware (NextAuth in middleware.ts)
│   ├── ratelimit.ts                    # Rate limiting middleware
│   └── workspace.ts                    # Workspace context middleware
│
├── procedures/
│   ├── index.ts
│   ├── public.ts                       # Public procedure (no auth)
│   ├── protected.ts                    # Protected procedure (requires auth)
│   └── workspace.ts                    # Workspace-scoped procedure
│
├── services/                           # Server-side service implementations
│   ├── index.ts
│   ├── qr-service.ts                   # QR business logic
│   ├── analytics-service.ts            # Analytics aggregation
│   ├── geo-service.ts                  # IP geolocation
│   ├── stripe-service.ts               # Stripe business logic
│   └── email-service.ts                # Email sending logic
│
└── jobs/                               # Background/cron jobs
    ├── index.ts
    ├── analytics-aggregation.ts        # Daily analytics rollup
    ├── cleanup-expired.ts              # Cleanup expired data
    └── stripe-sync.ts                  # Sync Stripe subscription status
```

---

## 11. `config/` — Application Configuration

```
config/
├── index.ts                            # Barrel export
├── site.ts                             # Site metadata (name, URL, description, OG)
├── navigation.ts                       # Navigation items (public + dashboard)
├── pricing.ts                          # Plan definitions & pricing
├── qr-types.ts                         # QR type definitions with icons & labels
├── features.ts                         # Feature flags
├── limits.ts                           # Free/Pro/Business limits
└── social.ts                           # Social media links
```

---

## 12. `public/` — Static Assets

```
public/
├── images/
│   ├── logo.svg                        # Brand logo
│   ├── logo-white.svg                  # White logo variant
│   ├── og-default.png                  # Default OG image
│   ├── favicon.ico                     # Favicon
│   ├── apple-touch-icon.png            # Apple touch icon
│   └── social/                         # Social share images
│       ├── template-restaurant.png
│       ├── template-realestate.png
│       └── template-event.png
│
├── fonts/
│   └── CalSans-SemiBold.woff2          # Local font file
│
├── robots.txt                          # SEO: robots directives
├── sitemap.xml                         # Dynamic sitemap (generated)
└── manifest.json                       # PWA manifest
```

---

## 13. Module Boundaries & Rules

### 13.1 Import Rules

```
┌──────────────────────────────────────────────────┐
│                IMPORT DIRECTION                    │
│                                                    │
│  app/ ───────────── can import ──────────────┐    │
│   │                                           │    │
│   ├── components/  ◄─────────────────────────┤    │
│   ├── hooks/                                  │    │
│   ├── store/                                  │    │
│   ├── services/                               │    │
│   ├── lib/                                    │    │
│   ├── types/                                  │    │
│   └── config/                                 │    │
│                                                    │
│  server/ ─────────── can import ──────────────┤    │
│   ├── lib/                                    │    │
│   ├── types/                                  │    │
│   └── config/                                 │    │
│                                                    │
│  components/ ─────── can import ───────────────┤   │
│   ├── hooks/                                  │    │
│   ├── store/                                  │    │
│   ├── lib/                                    │    │
│   └── types/                                  │    │
│                                                    │
│  hooks/ ──────────── can import ───────────────┤   │
│   ├── services/                               │    │
│   ├── lib/                                    │    │
│   └── types/                                  │    │
│                                                    │
│  services/ ───────── can import ───────────────┤   │
│   ├── lib/                                    │    │
│   └── types/                                  │    │
│                                                    │
│  store/ ──────────── can import ───────────────┤   │
│   ├── lib/                                    │    │
│   └── types/                                  │    │
│                                                    │
│  lib/ ────────────── can import ───────────────┤   │
│   └── types/                                  │    │
│                                                    │
│  types/ ──────────── no imports ───────────────┘   │
│  config/ ─────────── no imports ───────────────┘   │
│                                                    │
└──────────────────────────────────────────────────┘
```

### 13.2 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | `kebab-case.tsx` | `qr-canvas.tsx` |
| Hooks | `use-camelCase.ts` | `use-qr-generator.ts` |
| Services | `kebab-case.service.ts` | `qr-service.ts` |
| Utilities | `kebab-case.ts` | `qr-shortcode.ts` |
| Types | `kebab-case.ts` | `qr.ts` |
| Stores | `kebab-case.store.ts` | `qr-store.ts` |
| Config | `kebab-case.ts` | `site.ts` |
| Pages | `page.tsx` (Next.js convention) | — |
| Layouts | `layout.tsx` (Next.js convention) | — |
| API Routes | `route.ts` (Next.js convention) | — |

### 13.3 Barrel Export Pattern

Every directory must have an `index.ts` that exports the public API:

```typescript
// components/qr/index.ts
export { QRCanvas } from './qr-canvas';
export { QRDesignPanel } from './qr-design-panel';
export { QRTypeSelector } from './qr-type-selector';
export { QRContentForm } from './qr-content-form';
export { QRColorPicker } from './qr-color-picker';
export { QRGradientEditor } from './qr-gradient-editor';
export { QRShapeEditor } from './qr-shape-editor';
export { QRLogoUploader } from './qr-logo-uploader';
export { QRFrameEditor } from './qr-frame-editor';
export { QRDownloadModal } from './qr-download-modal';
export { QRCard } from './qr-card';
export { QRCardSkeleton } from './qr-card-skeleton';
export { QRStatusBadge } from './qr-status-badge';
export { QREmptyState } from './qr-empty-state';
```

### 13.4 Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./components/*"],
      "@ui/*": ["./components/ui/*"],
      "@hooks/*": ["./hooks/*"],
      "@services/*": ["./services/*"],
      "@lib/*": ["./lib/*"],
      "@store/*": ["./store/*"],
      "@types/*": ["./types/*"],
      "@server/*": ["./server/*"],
      "@config/*": ["./config/*"],
      "@styles/*": ["./styles/*"],
      "@public/*": ["./public/*"]
    }
  }
}
```

### 13.5 ESLint Import Boundaries

```javascript
// .eslintrc.js — custom rules
{
  rules: {
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@server/*'],
            message: 'Server code cannot be imported from client components',
            // Only allowed in server/, app/api/, and RSC
          },
          {
            group: ['@components/*/index'],
            message: 'Use barrel exports (@components) instead of deep imports',
          },
        ],
      },
    ],
  },
}
```

---

*End of Folder Structure Documentation*
