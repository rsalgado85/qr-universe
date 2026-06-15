# QR Universe — Architecture Documentation

> **Version:** 1.0.0  
> **Last Updated:** June 2026  
> **Stack:** Next.js 15 · React 19 · TypeScript · TailwindCSS · Shadcn/UI · Framer Motion  
> **Quality Bar:** Stripe / Linear / Vercel / Notion

---

## Table of Contents

1. [Product Architecture](#1-product-architecture)
2. [Information Architecture](#2-information-architecture)
3. [UX Flows](#3-ux-flows)
4. [API Design](#4-api-design)
5. [Database Design](#5-database-design)
6. [Analytics Design](#6-analytics-design)
7. [Complete Implementation Plan](#7-complete-implementation-plan)

---

## 1. Product Architecture

### 1.1 High-Level System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        QR UNIVERSE                              │
│                    SaaS Platform (Monolith)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Landing  │  │   Auth   │  │Dashboard │  │  QR Generator │  │
│  │  Page    │  │  System  │  │  (App)   │  │    Engine     │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       │              │             │                 │          │
│  ┌────┴──────────────┴─────────────┴─────────────────┴──────┐  │
│  │                    API Layer (tRPC)                       │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                     │
│  ┌────────────────────────┴─────────────────────────────────┐  │
│  │              Data Layer (Prisma + PostgreSQL)             │  │
│  └────────────────────────┬─────────────────────────────────┘  │
│                           │                                     │
│  ┌────────────────────────┴─────────────────────────────────┐  │
│  │        External Services (S3, Resend, Stripe, etc.)       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Monolith with Clear Boundaries

QR Universe follows a **modular monolith** architecture — a single Next.js application with well-defined internal boundaries:

| Module | Responsibility | Key Dependencies |
|--------|---------------|------------------|
| `@/modules/landing` | Landing pages, public templates, SEO | `framer-motion`, `@/components/ui` |
| `@/modules/auth` | Authentication, sessions, OAuth | `next-auth`, `@/lib/auth` |
| `@/modules/dashboard` | User dashboard, analytics views | `recharts`, `@/components/ui` |
| `@/modules/qr-engine` | QR generation, customization, rendering | `qr-code-styling`, `canvas` |
| `@/modules/templates` | Template system, presets, gallery | `@/modules/qr-engine` |
| `@/modules/billing` | Stripe integration, plans, invoices | `stripe`, `@/modules/auth` |
| `@/modules/analytics` | Scan tracking, geo, devices, charts | `@/lib/analytics` |

### 1.3 Technology Stack & Justification

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 15 (App Router) | RSC, streaming, ISR, SEO, file-based routing |
| **Language** | TypeScript 5.x (strict) | Type safety, DX, maintainability |
| **Styling** | TailwindCSS 4 + Shadcn/UI | Utility-first, design tokens, accessible components |
| **Animation** | Framer Motion 11 | Declarative, performant, SSR-compatible |
| **API** | tRPC + React Server Components | End-to-end type safety, no codegen |
| **ORM** | Prisma 6 | Type-safe queries, migrations, studio |
| **Database** | PostgreSQL 16 (Supabase) | Relational, scalable, real-time, RLS |
| **Auth** | NextAuth.js v5 (Auth.js) | Flexible, OAuth, credentials, session management |
| **Storage** | AWS S3 / Cloudflare R2 | QR image storage, CDN delivery |
| **Payments** | Stripe | Market leader, great DX, webhooks |
| **Email** | Resend + React Email | Modern email DX, React components |
| **QR Engine** | qr-code-styling (custom fork) | Canvas/SVG rendering, extensive customization |
| **Charts** | Recharts | React-native, composable, beautiful |
| **Forms** | React Hook Form + Zod | Performant, type-safe validation |
| **Icons** | Lucide React | Consistent, tree-shakeable, beautiful |
| **Analytics** | PostHog (self-hosted) + custom | Product analytics, feature flags, session recordings |
| **Monitoring** | Sentry | Error tracking, performance monitoring |
| **Hosting** | Vercel | Edge functions, ISR, analytics, preview deployments |

### 1.4 Rendering Strategy

| Page Type | Strategy | Rationale |
|-----------|----------|-----------|
| Landing pages | SSG + ISR (revalidate: 3600) | SEO-critical, fast LCP, cacheable |
| Public templates | SSG + ISR | Pre-rendered for speed |
| Dashboard (auth) | RSC + Client Islands | Data freshness, interactivity where needed |
| QR Generator | Client Component (fully interactive) | Real-time preview, canvas manipulation |
| Analytics | RSC shell + Client charts | SEO not needed, chart interactivity |
| API routes | Edge Runtime (where possible) | Low latency, global distribution |

---

## 2. Information Architecture

### 2.1 Site Map

```
QR Universe (qr-universe.com)
│
├── /                                    → Landing Page (public)
│   ├── #hero                            → Hero with interactive QR builder
│   ├── #features                        → Feature showcase
│   ├── #templates                       → Template gallery
│   ├── #analytics-showcase              → Analytics preview
│   ├── #testimonials                    → Social proof
│   ├── #faq                             → FAQ accordion
│   ├── #pricing                        → Pricing plans
│   └── #cta                            → Final CTA
│
├── /templates                           → Public template gallery
│   └── /templates/[slug]               → Template detail & preview
│
├── /pricing                             → Dedicated pricing page
│
├── /blog                                → Blog (content marketing)
│   └── /blog/[slug]                    → Blog post
│
├── /login                               → Sign in
├── /register                            → Sign up
├── /forgot-password                     → Password reset
│
├── /dashboard                           → Dashboard home (auth required)
│   ├── /dashboard/create               → QR Code creator
│   │   └── /dashboard/create/[type]    → Type-specific creator
│   ├── /dashboard/qrs                   → Saved QR codes (list/grid)
│   │   └── /dashboard/qrs/[id]         → QR detail & edit
│   │       ├── /dashboard/qrs/[id]/edit       → Edit QR
│   │       ├── /dashboard/qrs/[id]/analytics  → QR-specific analytics
│   │       └── /dashboard/qrs/[id]/download   → Download options
│   ├── /dashboard/templates            → Template browser
│   ├── /dashboard/analytics            → Global analytics
│   ├── /dashboard/settings             → Account settings
│   │   ├── /dashboard/settings/profile → Profile
│   │   ├── /dashboard/settings/billing → Billing & plans
│   │   └── /dashboard/settings/team    → Team management (Pro+)
│   └── /dashboard/api                  → API keys & docs
│
├── /api/trpc/[router]                  → tRPC API handler
├── /api/auth/[...nextauth]             → Auth.js handler
├── /api/webhooks/stripe                → Stripe webhooks
├── /api/webhooks/resend                → Email webhooks
├── /api/og                             → OpenGraph image generation
│
└── /r/[shortcode]                      → QR redirect handler
```

### 2.2 Navigation Structure

**Public Navigation (Top Bar):**
```
[Logo]  Products ▾  Templates  Pricing  Blog  [Sign In]  [Get Started →]
```

**Dashboard Navigation (Sidebar):**
```
┌─────────────────────┐
│  🔷 QR Universe      │
│─────────────────────│
│  📊 Home             │
│  ✨ Create QR        │
│  📋 Saved QRs        │
│  🎨 Templates        │
│  📈 Analytics        │
│─────────────────────│
│  ⚙️  Settings        │
│  🔑 API              │
│─────────────────────│
│  ❓ Help & Docs      │
│  💬 Feedback         │
│─────────────────────│
│  👤 User Menu        │
│  [Upgrade to Pro →]  │
└─────────────────────┘
```

### 2.3 Content Hierarchy

```
Level 0: Brand (QR Universe)
  └── Level 1: Sections (Landing, Dashboard, etc.)
       └── Level 2: Pages (within each section)
            └── Level 3: Components (reusable UI pieces)
                 └── Level 4: Elements (atoms — buttons, inputs, icons)
```

---

## 3. UX Flows

### 3.1 Primary Flow: Create a QR Code (First-Time User)

```
Landing Page
    │
    ├─→ [Hero "Try it free" CTA] ──→ Register Flow
    │       │
    │       ├─ Email + Password (or OAuth: Google, GitHub)
    │       ├─ Email verification
    │       └─ Onboarding wizard (3 steps, skippable):
    │           ├─ Step 1: "What do you do?" (role selector)
    │           ├─ Step 2: "What will you create?" (use case selector)
    │           └─ Step 3: "Your first QR code" (quick-create CTA)
    │
    └─→ Dashboard Home
          │
          └─→ [Create QR] button → Creator Page
                │
                ├─ Step 1: Choose QR Type
                │   ├─ Social (WhatsApp, Instagram, FB, LinkedIn, TikTok, X, YouTube, Telegram)
                │   ├─ Business (Card, Profile, Catalog, Landing Page)
                │   ├─ Utility (URL, Email, Phone, SMS, WiFi, Maps)
                │   ├─ Restaurant (Menu, Ordering)
                │   └─ Event (Invitation, RSVP, Ticket)
                │
                ├─ Step 2: Enter Content
                │   └─ Dynamic form based on QR type
                │       (React Hook Form + Zod validation, type-specific fields)
                │
                ├─ Step 3: Customize Design
                │   ├─ Color: primary, background (preset palettes + custom)
                │   ├─ Gradient: type, angle, stops
                │   ├─ Logo: upload, position, size
                │   ├─ Shape: dots style, corners style, corners dot style
                │   ├─ Frame: text, style, color
                │   ├─ Border: width, color, radius
                │   └─ Live preview updates in real-time
                │
                ├─ Step 4: Preview & Save
                │   ├─ Full-size preview with scan simulation
                │   ├─ Name your QR
                │   ├─ Add tags/folder
                │   └─ Save
                │
                └─ Step 5: Download / Share
                    ├─ Format: PNG, SVG, PDF
                    ├─ Resolution: Standard (1024px), High (2048px), Print (4096px)
                    ├─ With/without margin
                    └─ Copy embed code / share link
```

### 3.2 Secondary Flow: Use a Template

```
Dashboard → Templates
    │
    ├─ Browse by category (Restaurant, Real Estate, Events, Personal, Corporate, Influencer)
    ├─ Filter by use case, style, popularity
    │
    └─ Click template → Preview modal
          │
          ├─ "Use this template" → Pre-fills creator with template settings
          │   └─ User can customize further before saving
          │
          └─ "Customize" → Opens full creator with template presets
```

### 3.3 Tertiary Flow: Analytics Deep-Dive

```
Dashboard → Analytics
    │
    ├─ Overview cards: Total scans, Today, This week, This month
    ├─ Scan timeline chart (daily/weekly/monthly toggle)
    │
    └─ Drill down:
        ├─ By QR code (filter)
        ├─ By geography (map + table)
        ├─ By device (pie chart: mobile/desktop/tablet)
        ├─ By browser (bar chart)
        ├─ By time of day (heatmap)
        └─ Export report (CSV, PDF)
```

### 3.4 Error & Edge Case Flows

| Scenario | UX Response |
|----------|-------------|
| Invalid URL input | Inline validation, red border, helper text |
| QR scan from outdated OS | Graceful fallback page with manual link |
| Uploaded logo too large | Client-side resize to max 500×500px, 500KB |
| Network error during save | Toast error, retry button, optimistic UI rollback |
| Rate limit exceeded | Toast, cooldown timer display |
| Session expired | Preserve form state in localStorage, redirect to login with return URL |
| Concurrent edit conflict | Last-write-wins, toast warning |
| QR deleted but still scanned | Custom 404 page with branding, "This QR is no longer active" |

---

## 4. API Design

### 4.1 API Architecture

QR Universe uses **tRPC** for all internal API communication, providing end-to-end type safety between server and client. External integrations use REST endpoints.

```
┌──────────────────────────────────────────┐
│              API LAYER                    │
├──────────────┬───────────────────────────┤
│   Internal   │        External            │
│   (tRPC)     │    (REST + Webhooks)       │
├──────────────┼───────────────────────────┤
│ • auth       │  POST /api/webhooks/stripe │
│ • qr         │  POST /api/webhooks/resend │
│ • template   │  GET  /api/og              │
│ • analytics  │  GET  /r/[shortcode]       │
│ • user       │  GET  /api/public/qr/:id   │
│ • billing    │                            │
│ • team       │                            │
│ • workspace  │                            │
└──────────────┴───────────────────────────┘
```

### 4.2 tRPC Router Structure

```typescript
// server/api/root.ts
export const appRouter = router({
  auth: authRouter,           // login, register, logout, session, verifyEmail
  user: userRouter,            // profile, update, delete, avatar
  qr: qrRouter,               // CRUD, generate, download, duplicate
  template: templateRouter,   // list, get, create, update, delete
  analytics: analyticsRouter, // overview, timeline, geo, devices, export
  billing: billingRouter,     // plans, subscribe, cancel, invoices, portal
  workspace: workspaceRouter, // settings, members, branding
  team: teamRouter,           // invite, remove, roles
  share: shareRouter,         // create link, revoke, track
});

export type AppRouter = typeof appRouter;
```

### 4.3 Key API Endpoints (tRPC Procedures)

#### Auth Router

```typescript
auth.register          — input: { email, password, name }        → session + user
auth.login             — input: { email, password }              → session + user
auth.logout            — void                                     → void
auth.verifyEmail       — input: { token }                        → void
auth.resetPassword     — input: { email }                        → void (sends email)
auth.updatePassword    — input: { token, newPassword }            → void
auth.session           — void                                     → session | null
auth.linkOAuth         — input: { provider }                     → void
```

#### QR Router

```typescript
qr.list                — input: { page?, limit?, search?, tags?, type?, sort? } → paginated list
qr.get                 — input: { id }                                          → QR detail
qr.create              — input: { type, content, design, name, tags? }         → QR
qr.update              — input: { id, ...partialFields }                       → QR
qr.delete              — input: { id }                                          → void
qr.duplicate           — input: { id }                                          → QR
qr.generate            — input: { id, format, resolution, margin? }            → download URL
qr.preview             — input: { design, content }                            → temporary preview
qr.bulkCreate          — input: { items: [...] }                               → QR[] (Pro+)
qr.getByShortcode      — input: { shortcode }                                  → public QR data
```

#### Template Router

```typescript
template.list          — input: { category?, page?, limit?, sort? }            → paginated list
template.get           — input: { slug }                                        → template detail
template.create        — input: { name, design, category, previewImage }       → template
template.update        — input: { id, ...partialFields }                       → template
template.delete        — input: { id }                                          → void
template.useCount      — input: { id }                                          → number
```

#### Analytics Router

```typescript
analytics.overview     — input: { workspaceId, period? }           → { totalScans, todayScans, ... }
analytics.timeline     — input: { workspaceId, period, granularity } → { date, scans }[]
analytics.byQR         — input: { workspaceId, qrId?, period? }   → { qrName, scans }[]
analytics.geo          — input: { workspaceId, qrId?, period? }   → { country, scans }[]
analytics.devices      — input: { workspaceId, qrId?, period? }   → { device, percentage }[]
analytics.browsers     — input: { workspaceId, qrId?, period? }   → { browser, percentage }[]
analytics.timeOfDay    — input: { workspaceId, qrId?, period? }   → { hour, scans }[]
analytics.export       — input: { workspaceId, qrId, period, format } → download URL
```

#### Billing Router

```typescript
billing.plans          — void                                              → Plan[]
billing.currentPlan    — void                                              → subscription | null
billing.subscribe      — input: { planId, billingCycle }                  → Stripe checkout URL
billing.cancel         — input: { subscriptionId }                        → void
billing.resume         — input: { subscriptionId }                        → void
billing.portal         — void                                              → Stripe portal URL
billing.invoices       — input: { page?, limit? }                         → Invoice[]
billing.usage          — void                                              → { qrsUsed, qrsLimit, scansUsed, scansLimit }
```

### 4.4 REST Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `GET` | `/r/[shortcode]` | QR redirect (302) + log scan | Public |
| `GET` | `/api/public/qr/[id]` | Public QR metadata | Public |
| `POST` | `/api/webhooks/stripe` | Stripe events | Stripe signature |
| `POST` | `/api/webhooks/resend` | Email events | Resend signature |
| `GET` | `/api/og` | Dynamic OG images | Public |
| `GET` | `/api/health` | Health check | None |

### 4.5 Error Response Format

```typescript
// All errors follow this structure
interface ApiError {
  code: string;           // e.g., "UNAUTHORIZED", "NOT_FOUND", "VALIDATION_ERROR"
  message: string;        // Human-readable error
  details?: unknown;      // Validation errors, etc.
  traceId?: string;       // For debugging (Sentry)
}
```

### 4.6 Rate Limiting

| Tier | Requests/min | Concurrent QR generations |
|------|-------------|---------------------------|
| Free | 60 | 1 |
| Pro | 300 | 3 |
| Business | 1000 | 10 |
| Enterprise | Custom | Custom |

---

## 5. Database Design

### 5.1 Entity Relationship Diagram (Conceptual)

```
User ──1:N──→ Workspace
Workspace ──1:N──→ QRCode
Workspace ──1:N──→ Template (custom)
Workspace ──1:N──→ ScanEvent
QRCode ──1:N──→ ScanEvent
QRCode ──1:N──→ DownloadEvent
User ──1:1──→ Subscription
Subscription ──N:1──→ Plan
Workspace ──1:N──→ WorkspaceMember
WorkspaceMember ──N:1──→ User
Workspace ──1:N──→ ApiKey
Template ──N:M──→ Category
```

### 5.2 Prisma Schema (Key Models)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  avatarUrl     String?
  passwordHash  String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  workspaces    WorkspaceMember[]
  subscription  Subscription?
}

model Workspace {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  logoUrl     String?
  plan        PlanTier  @default(FREE)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  members     WorkspaceMember[]
  qrCodes     QRCode[]
  templates   Template[]
  scanEvents  ScanEvent[]
  apiKeys     ApiKey[]
  settings    WorkspaceSettings?
}

model WorkspaceMember {
  id          String        @id @default(cuid())
  workspaceId String
  userId      String
  role        MemberRole    @default(MEMBER)
  joinedAt    DateTime      @default(now())

  workspace   Workspace     @relation(fields: [workspaceId], references: [id])
  user        User          @relation(fields: [userId], references: [id])

  @@unique([workspaceId, userId])
}

model QRCode {
  id            String    @id @default(cuid())
  workspaceId   String
  name          String
  type          QRType
  content       Json                    // Type-specific content data
  design        Json                    // Full design configuration
  shortcode     String    @unique      // 8-char unique identifier
  status        QRStatus  @default(ACTIVE)
  tags          String[]               // For organization
  folder        String?                // Optional folder path
  scanCount     Int       @default(0)
  lastScannedAt DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  workspace     Workspace       @relation(fields: [workspaceId], references: [id])
  scanEvents    ScanEvent[]
  downloadEvents DownloadEvent[]

  @@index([workspaceId, status])
  @@index([shortcode])
}

model ScanEvent {
  id          String    @id @default(cuid())
  qrCodeId    String
  workspaceId String
  timestamp   DateTime  @default(now())
  ipHash      String?                 // Hashed for privacy
  country     String?
  city        String?
  region      String?
  deviceType  DeviceType?
  browser     String?
  os          String?
  referrer    String?
  userAgent   String?

  qrCode      QRCode    @relation(fields: [qrCodeId], references: [id])
  workspace   Workspace @relation(fields: [workspaceId], references: [id])

  @@index([qrCodeId, timestamp])
  @@index([workspaceId, timestamp])
}

model Template {
  id           String     @id @default(cuid())
  workspaceId  String?
  name         String
  description  String?
  slug         String     @unique
  category     String
  previewImage String     // S3 URL
  design       Json       // Default QR design config
  content      Json       // Default content template
  isPublic     Boolean    @default(false)
  useCount     Int        @default(0)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  workspace    Workspace? @relation(fields: [workspaceId], references: [id])
  categories   Category[]
}

model Category {
  id    String     @id @default(cuid())
  name  String     @unique
  slug  String     @unique
  icon  String?

  templates Template[]
}

model Subscription {
  id                 String         @id @default(cuid())
  userId             String         @unique
  stripeCustomerId   String         @unique
  stripeSubscriptionId String?
  planTier           PlanTier       @default(FREE)
  status             SubStatus      @default(ACTIVE)
  currentPeriodStart DateTime?
  currentPeriodEnd   DateTime?
  cancelAtPeriodEnd  Boolean        @default(false)
  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @updatedAt

  user               User           @relation(fields: [userId], references: [id])
}

model DownloadEvent {
  id        String   @id @default(cuid())
  qrCodeId  String
  format    String   // PNG, SVG, PDF
  resolution String  // standard, high, print
  timestamp DateTime @default(now())

  qrCode    QRCode   @relation(fields: [qrCodeId], references: [id])
}

model ApiKey {
  id          String    @id @default(cuid())
  workspaceId String
  name        String
  key         String    @unique
  lastUsedAt  DateTime?
  expiresAt   DateTime?
  createdAt   DateTime  @default(now())

  workspace   Workspace @relation(fields: [workspaceId], references: [id])

  @@index([key])
}

// Enums
enum Role { USER, ADMIN }
enum PlanTier { FREE, PRO, BUSINESS, ENTERPRISE }
enum MemberRole { OWNER, ADMIN, MEMBER, VIEWER }
enum QRType { URL, EMAIL, PHONE, SMS, WIFI, MAPS, WHATSAPP, INSTAGRAM, FACEBOOK, LINKEDIN, TIKTOK, X, YOUTUBE, TELEGRAM, VCARD, RESTAURANT_MENU, EVENT_INVITATION, CUSTOM }
enum QRStatus { ACTIVE, PAUSED, ARCHIVED }
enum DeviceType { MOBILE, DESKTOP, TABLET, OTHER }
enum SubStatus { ACTIVE, PAST_DUE, CANCELED, TRIALING, INCOMPLETE }
```

### 5.3 Data Access Patterns

| Query Pattern | Optimization |
|---------------|-------------|
| "Get all QRs for workspace" | Index on `(workspaceId, status)` |
| "QR redirect by shortcode" | Unique index on `shortcode` |
| "Analytics: scans by QR for date range" | Composite index on `(qrCodeId, timestamp)` |
| "Analytics: workspace overview" | Composite index on `(workspaceId, timestamp)` |
| "Template search by category" | Index on `category`, full-text search for `name` |

### 5.4 JSON Column Schemas

```typescript
// QRCode.content — varies by QRType
type QRContent =
  | { type: "URL"; url: string }
  | { type: "EMAIL"; to: string; subject?: string; body?: string }
  | { type: "PHONE"; number: string }
  | { type: "WHATSAPP"; number: string; message?: string }
  | { type: "WIFI"; ssid: string; password: string; encryption: "WPA" | "WEP" | "nopass" }
  | { type: "VCARD"; firstName: string; lastName: string; company?: string; title?: string; phone?: string; email?: string; website?: string; address?: string }
  | { type: "RESTAURANT_MENU"; restaurantName: string; menuUrl: string; location?: string }
  | { type: "EVENT_INVITATION"; eventName: string; date: string; location: string; description?: string; rsvpUrl?: string }
  // ... all other types

// QRCode.design — full qr-code-styling config
interface QRDesign {
  width: number;                      // Default: 300
  height: number;                     // Default: 300
  margin: number;                     // Default: 10
  type: "canvas" | "svg";
  // Colors
  dotsOptions: {
    color: string;                    // e.g., "#14B8A6"
    gradient?: {
      type: "linear" | "radial";
      rotation: number;               // degrees
      colorStops: { offset: number; color: string }[];
    };
    type: "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded";
  };
  cornersSquareOptions: {
    color: string;
    type: "square" | "dot" | "extra-rounded";
  };
  cornersDotOptions: {
    color: string;
    type: "dot" | "square";
  };
  backgroundOptions: {
    color: string;                    // e.g., "#060B15"
    gradient?: { ... };
  };
  // Image/Logo
  imageOptions: {
    image: string;                    // base64 or URL
    crossOrigin?: string;
    margin: number;
    imageSize: number;                // 0-1 ratio
    hideBackgroundDots: boolean;
  };
  // QR Options
  qrOptions: {
    typeNumber: number;               // 0-40
    mode: "Numeric" | "Alphanumeric" | "Byte";
    errorCorrectionLevel: "L" | "M" | "Q" | "H";
  };
  // Frame
  frameOptions?: {
    text: string;
    style: "top" | "bottom";
    color: string;
    fontFamily?: string;
    fontSize?: number;
  };
}
```

---

## 6. Analytics Design

### 6.1 Analytics Architecture

```
                        ScanEvent
                            │
                            ▼
┌───────────────────────────────────────────────────────┐
│                Analytics Pipeline                      │
├──────────────┬──────────────┬─────────────────────────┤
│  Collection  │  Processing  │     Presentation         │
├──────────────┼──────────────┼─────────────────────────┤
│ • QR redirect│ • Aggregate  │ • Overview dashboard     │
│   handler    │   hourly     │ • Timeline charts        │
│ • IP → geo   │ • Rollups    │ • Geo map                │
│ • UA parsing │ • Precompute │ • Device/browser pie     │
│ • Timestamp  │   daily sums │ • Time-of-day heatmap    │
│              │              │ • Per-QR drill-down      │
└──────────────┴──────────────┴─────────────────────────┘
```

### 6.2 Metrics Tracked

| Metric | Source | Granularity |
|--------|--------|-------------|
| Total scans per QR | `ScanEvent.count` | Real-time |
| Scans per day/week/month | `ScanEvent` aggregation | Precomputed hourly |
| Unique scans (by IP hash) | `ScanEvent.ipHash` distinct count | Daily |
| Geographic distribution | `ScanEvent.country`, `city` | Real-time |
| Device type breakdown | `ScanEvent.deviceType` | Real-time |
| Browser distribution | `ScanEvent.browser` | Real-time |
| OS distribution | `ScanEvent.os` | Real-time |
| Referrer sources | `ScanEvent.referrer` | Real-time |
| Time-of-day heatmap | `ScanEvent.timestamp` (hour) | Real-time |
| Downloads by format | `DownloadEvent.format` | Real-time |
| Conversion rate | Scans → Downloads | Daily |

### 6.3 Aggregation Strategy

```sql
-- Materialized daily rollup (materialized view or cron job)
CREATE TABLE analytics_daily (
  id          SERIAL PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  qr_code_id  TEXT NOT NULL,
  date        DATE NOT NULL,
  total_scans INTEGER DEFAULT 0,
  unique_scans INTEGER DEFAULT 0,
  mobile_scans INTEGER DEFAULT 0,
  desktop_scans INTEGER DEFAULT 0,
  tablet_scans INTEGER DEFAULT 0,
  countries   JSONB DEFAULT '{}',  -- { "US": 150, "GB": 45 }
  browsers    JSONB DEFAULT '{}',  -- { "Chrome": 200, "Safari": 100 }
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, qr_code_id, date)
);

-- Refresh hourly via pg_cron or application-level cron
```

### 6.4 Dashboard Visualizations

```
┌─────────────────────────────────────────────────────────────┐
│  ANALYTICS DASHBOARD                                         │
├─────────────────────┬─────────────────────┬─────────────────┤
│  Total Scans        │  Today              │  This Month      │
│  124,583 ↑12%      │  847 ↑8%           │  12,482 ↑22%     │
│  (Metric Card)      │  (Metric Card)      │  (Metric Card)   │
├─────────────────────┴─────────────────────┴─────────────────┤
│                                                              │
│  📈 Scan Timeline (Area Chart)                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  ▁▂▃▅▆▇█▇▆▅▄▃▂▁▂▃▅▆█▇▆▅▄▃▂▁  (Daily/Weekly/Monthly) ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
├────────────────────────────┬─────────────────────────────────┤
│  🌍 Scans by Country       │  📱 Device Breakdown            │
│  (Choropleth / Bar)        │  (Donut Chart)                  │
│  ┌────────────────────────┐│  ┌─────────────────────────────┐│
│  │ US ████████████ 45%    ││  │  ◉ Mobile    68%            ││
│  │ GB ██████ 15%          ││  │  ◉ Desktop   22%            ││
│  │ DE ████ 10%            ││  │  ◉ Tablet    10%            ││
│  │ IN ███ 7%              ││  └─────────────────────────────┘│
│  └────────────────────────┘│                                 │
├────────────────────────────┴─────────────────────────────────┤
│  🌐 Browser Distribution (Horizontal Bar)                     │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Chrome  ████████████████████████ 52%                     ││
│  │ Safari  ██████████████ 30%                               ││
│  │ Firefox ████ 8%                                          ││
│  │ Edge    ███ 6%                                           ││
│  │ Other   ██ 4%                                            ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  ⏰ Time of Day Heatmap                                       │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  Mon  ░░██▓▓████▓▓██░░                                   ││
│  │  Tue  ░░██▓▓████▓▓██░░                                   ││
│  │  Wed  ░░██▓▓████▓▓██░░                                   ││
│  │  ...                                                      ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  📋 Top QR Codes (Table)                                     │
│  ┌──────┬────────────────────┬───────┬────────┬──────────┐  │
│  │ Rank │ QR Name            │ Scans │ Unique │ Trend    │  │
│  ├──────┼────────────────────┼───────┼────────┼──────────┤  │
│  │  1   │ Restaurant Menu    │ 8,421 │ 6,203  │ ↑ 12%   │  │
│  │  2   │ Event RSVP         │ 5,312 │ 4,891  │ ↑ 23%   │  │
│  │  3   │ WiFi Guest Access  │ 4,201 │ 3,102  │ ↓ 5%    │  │
│  └──────┴────────────────────┴───────┴────────┴──────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### 6.5 Privacy & Compliance

- IP addresses are **hashed (SHA-256)** before storage — never stored in plaintext
- Geographic data stored at **city/region level** only (no precise coordinates)
- User agent parsing is done **server-side**, raw UA string discarded after parsing
- Data retention: Raw `ScanEvent` rows → 90 days. Aggregated analytics → indefinite
- GDPR: All analytics are **anonymized** by design. No PII stored
- Users can **delete all analytics data** for their workspace at any time

---

## 7. Complete Implementation Plan

### Phase 0: Foundation (Week 1–2)

**Goal:** Project scaffold, CI/CD, design system, core infrastructure.

| # | Task | Priority | Est. |
|---|------|----------|------|
| 0.1 | Initialize Next.js 15 project with TypeScript strict mode | P0 | 2h |
| 0.2 | Configure TailwindCSS 4, Shadcn/UI, design tokens | P0 | 4h |
| 0.3 | Set up Prisma with PostgreSQL (Supabase local + cloud) | P0 | 3h |
| 0.4 | Configure NextAuth.js v5 with credentials + OAuth (Google, GitHub) | P0 | 4h |
| 0.5 | Set up tRPC with React Server Components integration | P0 | 4h |
| 0.6 | Configure ESLint, Prettier, Husky, commitlint | P0 | 2h |
| 0.7 | Set up Vercel deployment with preview environments | P0 | 2h |
| 0.8 | Set up Sentry for error tracking | P1 | 2h |
| 0.9 | Build design system foundation (colors, typography, spacing in Tailwind config) | P0 | 3h |
| 0.10 | Create base UI components (Button, Input, Card, Dialog, etc.) | P0 | 6h |
| 0.11 | Set up folder structure per FOLDER_STRUCTURE.md | P0 | 2h |
| 0.12 | Create dark/light mode provider + toggle | P0 | 2h |

**Deliverable:** Running app with auth, UI library, and CI/CD pipeline.

---

### Phase 1: QR Engine Core (Week 3–4)

**Goal:** The QR generation engine with full customization and live preview.

| # | Task | Priority | Est. |
|---|------|----------|------|
| 1.1 | Integrate `qr-code-styling` library, create wrapper with React hooks | P0 | 6h |
| 1.2 | Build `QRCanvas` component (live preview, Web Worker for generation) | P0 | 8h |
| 1.3 | Build `QRTypeSelector` component (grid of QR types with icons) | P0 | 4h |
| 1.4 | Build dynamic form system for all QR types (React Hook Form + Zod schemas) | P0 | 12h |
| 1.5 | Build `QRDesignPanel` — color pickers, gradient editor | P0 | 8h |
| 1.6 | Build `QRShapeEditor` — dots, corners, corner-dots style selectors | P0 | 6h |
| 1.7 | Build `QRLogoUploader` — upload, crop, position, size controls | P0 | 6h |
| 1.8 | Build `QRFrameEditor` — text frame with font/color/size controls | P1 | 4h |
| 1.9 | Build `QRDownloadModal` — format picker, resolution, margin options | P0 | 4h |
| 1.10 | Server-side QR generation endpoint (SVG/PNG/PDF export) | P0 | 6h |
| 1.11 | S3/R2 upload service for generated QR images | P0 | 3h |
| 1.12 | Shortcode generation & redirect handler (`/r/[shortcode]`) | P0 | 4h |

**Deliverable:** Fully functional QR creator with live preview and download.

---

### Phase 2: Landing Page & Public Surface (Week 5–6)

**Goal:** High-converting, stunning landing page that looks Series-A funded.

| # | Task | Priority | Est. |
|---|------|----------|------|
| 2.1 | Build landing page shell (layout, nav, footer) | P0 | 4h |
| 2.2 | Hero section with interactive QR builder demo (animated) | P0 | 12h |
| 2.3 | Features section (grid with icons, animations, hover effects) | P0 | 6h |
| 2.4 | Template showcase (carousel/masonry with filter tabs) | P0 | 8h |
| 2.5 | Analytics preview section (animated charts) | P1 | 6h |
| 2.6 | Testimonials section (marquee / carousel) | P1 | 4h |
| 2.7 | FAQ accordion section | P0 | 3h |
| 2.8 | Pricing section (3 tiers: Free, Pro, Business) | P0 | 6h |
| 2.9 | Final CTA section with animated background | P0 | 4h |
| 2.10 | Blog pages (listing + detail, MDX) | P2 | 6h |
| 2.11 | Template gallery public page | P1 | 6h |
| 2.12 | SEO metadata, sitemap, robots.txt, OG images | P0 | 4h |
| 2.13 | Page transitions and scroll animations (Framer Motion) | P0 | 6h |
| 2.14 | Accessibility audit & fixes (axe-core, screen reader testing) | P0 | 4h |

**Deliverable:** Polished public-facing site with 95+ Lighthouse scores.

---

### Phase 3: Dashboard & User Experience (Week 7–8)

**Goal:** Full dashboard for managing QRs and account.

| # | Task | Priority | Est. |
|---|------|----------|------|
| 3.1 | Dashboard layout (sidebar, topbar, content area) | P0 | 6h |
| 3.2 | Dashboard home page (quick stats, recent QRs, activity feed) | P0 | 6h |
| 3.3 | QR list/grid view with search, filter, sort, pagination | P0 | 8h |
| 3.4 | QR detail page (stats, design preview, actions) | P0 | 6h |
| 3.5 | QR edit flow (re-entry into creator with pre-filled state) | P0 | 4h |
| 3.6 | Bulk QR operations (delete, tag, move to folder) | P1 | 4h |
| 3.7 | Folder system for QR organization | P1 | 4h |
| 3.8 | Template browser within dashboard (save custom templates) | P1 | 6h |
| 3.9 | User settings pages (profile, password, notifications) | P0 | 6h |
| 3.10 | Onboarding wizard (3-step, skippable, with progress) | P1 | 6h |
| 3.11 | Empty states, loading skeletons, error states for all views | P0 | 6h |
| 3.12 | Toast notification system (Sonner) | P0 | 2h |

**Deliverable:** Complete dashboard experience ready for real users.

---

### Phase 4: Analytics Engine (Week 9–10)

**Goal:** Beautiful, real-time analytics for QR scans.

| # | Task | Priority | Est. |
|---|------|----------|------|
| 4.1 | Scan event capture in redirect handler (IP hash, geo, UA parsing) | P0 | 6h |
| 4.2 | Geolocation service (IP → country/city via MaxMind GeoLite2 or Cloudflare) | P0 | 4h |
| 4.3 | User agent parser (device type, browser, OS extraction) | P0 | 3h |
| 4.4 | Analytics overview API (tRPC procedure + database queries) | P0 | 6h |
| 4.5 | Overview dashboard page (metric cards + sparklines) | P0 | 8h |
| 4.6 | Scan timeline chart (Recharts area chart with range selector) | P0 | 6h |
| 4.7 | Geographic distribution (choropleth map or bar chart) | P0 | 8h |
| 4.8 | Device/Browser/OS breakdown (donut + horizontal bar charts) | P0 | 6h |
| 4.9 | Time-of-day heatmap chart | P1 | 6h |
| 4.10 | Per-QR analytics drill-down page | P0 | 6h |
| 4.11 | Analytics export (CSV, PDF report) | P1 | 6h |
| 4.12 | Materialized daily aggregation (cron job) | P1 | 4h |
| 4.13 | Real-time scan counter (WebSocket or SSE for "live" feel) | P2 | 4h |

**Deliverable:** Full analytics suite with beautiful dashboards.

---

### Phase 5: Payments & Monetization (Week 11–12)

**Goal:** Stripe integration for subscription management.

| # | Task | Priority | Est. |
|---|------|----------|------|
| 5.1 | Stripe product/price setup (Free, Pro $19/mo, Business $49/mo) | P0 | 3h |
| 5.2 | Stripe Checkout integration (subscribe, upgrade, downgrade) | P0 | 8h |
| 5.3 | Stripe Customer Portal for billing management | P0 | 4h |
| 5.4 | Stripe webhook handler (subscription lifecycle events) | P0 | 6h |
| 5.5 | Usage tracking & limits (QR count, scan volume per plan) | P0 | 4h |
| 5.6 | Billing settings page (current plan, invoices, usage) | P0 | 6h |
| 5.7 | Upgrade prompts & paywalls (contextual nudges in dashboard) | P1 | 4h |
| 5.8 | Invoice history page | P1 | 3h |
| 5.9 | Free trial flow (14-day Pro trial) | P1 | 3h |
| 5.10 | Cancel flow with exit survey | P2 | 3h |

**Deliverable:** Full monetization with Stripe subscription lifecycle.

---

### Phase 6: Polish & Launch (Week 13–14)

**Goal:** Performance optimization, testing, and launch readiness.

| # | Task | Priority | Est. |
|---|------|----------|------|
| 6.1 | Lighthouse optimization (aim: 95+ Performance, 100 SEO, 100 Accessibility) | P0 | 8h |
| 6.2 | Image optimization (next/image, blur placeholders, WebP/AVIF) | P0 | 4h |
| 6.3 | Font loading optimization (next/font, subsetting, display swap) | P0 | 2h |
| 6.4 | Bundle size audit & code splitting (dynamic imports, lazy loading) | P0 | 6h |
| 6.5 | Caching strategy (ISR, SWR on client, Redis for API) | P1 | 4h |
| 6.6 | End-to-end tests (Playwright — critical paths) | P0 | 12h |
| 6.7 | Unit tests (Vitest — core logic, QR generation, validation) | P0 | 8h |
| 6.8 | Integration tests (API routes, database operations) | P1 | 6h |
| 6.9 | Accessibility audit & remediation (WCAG 2.1 AA) | P0 | 6h |
| 6.10 | Cross-browser testing (Chrome, Safari, Firefox, Edge) | P0 | 4h |
| 6.11 | Mobile responsive audit (all pages, all breakpoints) | P0 | 6h |
| 6.12 | Security audit (OWASP top 10, dependency scan, CSP headers) | P0 | 6h |
| 6.13 | Error pages (404, 500, rate-limit, maintenance) | P1 | 3h |
| 6.14 | Documentation (README, API docs, user guide) | P1 | 8h |
| 6.15 | Launch checklist & go/no-go | P0 | 2h |

**Deliverable:** Production-ready application ready for public launch.

---

### Phase 7: Post-Launch (Week 15+)

| # | Task | Priority |
|---|------|----------|
| 7.1 | Team/workspace collaboration features | P2 |
| 7.2 | Dynamic QR codes (editable destination after printing) | P2 |
| 7.3 | QR code A/B testing | P2 |
| 7.4 | API for programmatic QR generation | P2 |
| 7.5 | White-label / custom domain for landing pages | P3 |
| 7.6 | Integrations (Zapier, Make, Slack, Notion) | P3 |
| 7.7 | Mobile app (React Native) | P3 |
| 7.8 | Multi-language support (i18n) | P3 |

---

### Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| `qr-code-styling` library limitations | Medium | High | Fork early, contribute upstream |
| Canvas rendering performance with large QRs | Low | Medium | Web Worker offloading, debounced preview |
| Stripe webhook reliability | Low | High | Idempotency keys, retry logic, reconciliation cron |
| Analytics data volume growth | Medium | Medium | Aggregation rollups, retention policies, partition pruning |
| Vercel cold starts affecting QR redirect | Low | Medium | Edge runtime for redirect handler, keep-warm cron |
| Browser compatibility for canvas operations | Low | Low | SVG fallback, feature detection, polyfills |

---

### Key Architecture Decisions (ADRs)

**ADR-001: Monolith over Microservices**
- **Decision:** Start with a well-structured Next.js monolith
- **Rationale:** Team size (small), development velocity, deployment simplicity, tRPC end-to-end types
- **Revisit when:** 50K+ users, multiple teams, independent scaling needs

**ADR-002: tRPC over REST/GraphQL**
- **Decision:** tRPC for all internal API communication
- **Rationale:** End-to-end type safety without codegen, excellent DX, RSC compatibility
- **Trade-off:** Only works with TypeScript clients (acceptable for our use case)

**ADR-003: PostgreSQL over NoSQL**
- **Decision:** PostgreSQL (Supabase) as primary database
- **Rationale:** Relational data model fits our domain perfectly, JSONB for flexible design configs, strong ecosystem
- **Trade-off:** Requires schema migrations (managed via Prisma)

**ADR-004: qr-code-styling over custom QR engine**
- **Decision:** Use and potentially fork `qr-code-styling`
- **Rationale:** Battle-tested, extensive customization API, SVG + Canvas support
- **Trade-off:** Bundle size (~50KB gzipped), need to monitor for breaking changes

**ADR-005: Server-side analytics aggregation**
- **Decision:** Precompute analytics aggregates via database queries + materialized views
- **Rationale:** Avoids expensive real-time aggregations on large datasets, simpler than streaming/event-sourcing
- **Trade-off:** Slight delay in analytics freshness (hourly refresh)

---

*End of Architecture Documentation*
