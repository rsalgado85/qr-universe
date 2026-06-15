# QR Universe — Component Tree

> **Version:** 1.0.0  
> **Pattern:** Hierarchical component composition with atomic organization  
> **Rendering:** RSC (React Server Components) by default, Client Components marked with `'use client'`

---

## Table of Contents

1. [Landing Page Component Tree](#1-landing-page-component-tree)
2. [Dashboard Component Tree](#2-dashboard-component-tree)
3. [QR Creator Component Tree](#3-qr-creator-component-tree)
4. [Analytics Component Tree](#4-analytics-component-tree)
5. [Auth Pages Component Tree](#5-auth-pages-component-tree)
6. [Settings Page Component Tree](#6-settings-page-component-tree)
7. [Shared Layout Components](#7-shared-layout-components)
8. [Legend](#8-legend)

---

## 1. Landing Page Component Tree

```
RootLayout (server)
├── Providers (client)
│   ├── ThemeProvider (next-themes)
│   ├── SessionProvider (NextAuth)
│   └── ToastProvider (Sonner)
│
└── LandingPage (server)
    ├── Navbar (client)
    │   ├── Logo
    │   │   └── Link
    │   ├── DesktopNav
    │   │   ├── NavLink × 5 (Products▾, Templates, Pricing, Blog, Sign In)
    │   │   └── Button ("Get Started" — accent/gold)
    │   ├── MobileMenuButton (client)
    │   └── MobileNav (client) — Sheet
    │       ├── NavLink × 5
    │       ├── Button ("Sign In")
    │       └── Button ("Get Started")
    │
    ├── HeroSection (client)
    │   ├── HeroBlob (animated background SVG)
    │   ├── HeroContent
    │   │   ├── Badge ("✨ Now in public beta")
    │   │   ├── Heading (h1, Cal Sans — "QR Codes That Actually Look Beautiful")
    │   │   ├── Paragraph (subtitle)
    │   │   ├── HeroCTA
    │   │   │   ├── Button ("Start Free — No Credit Card" — accent, xl)
    │   │   │   └── Button ("See Templates" — outline, xl)
    │   │   └── SocialProof
    │   │       └── AvatarGroup × 4 + Text ("Join 10,000+ creators")
    │   └── HeroQRDemo (client) — glass card with interactive preview
    │       ├── QRCanvas (live preview, animated)
    │       ├── QRColorPicker (simplified — preset color dots)
    │       └── QRShapeSelector (simplified — dot style toggle)
    │
    ├── FeaturesSection (client) — scroll animations
    │   ├── SectionHeader
    │   │   ├── Badge ("Features")
    │   │   ├── Heading (h2)
    │   │   └── Paragraph (description)
    │   └── FeatureGrid
    │       └── FeatureCard × 8 (animated stagger)
    │           ├── Icon (Lucide, size 2xl, in primary color)
    │           ├── Heading (h3)
    │           ├── Paragraph
    │           └── optional: FeatureIllustration
    │
    ├── TemplatesShowcase (client)
    │   ├── SectionHeader
    │   ├── TemplateFilterTabs
    │   │   └── Tab × 6 (All, Restaurant, Real Estate, Events, Personal, Corporate)
    │   └── TemplateGrid (masonry layout, animated)
    │       └── TemplateCard × N (stagger children)
    │           ├── TemplatePreview (image + QR overlay)
    │           ├── Badge (category)
    │           ├── Heading (template name)
    │           └── HoverCard (preview on hover)
    │
    ├── AnalyticsShowcase (client)
    │   ├── SectionHeader
    │   ├── AnalyticsPreviewCard (glass)
    │   │   ├── MetricCard × 4 (animated counters)
    │   │   │   ├── Icon
    │   │   │   ├── Label
    │   │   │   └── CountUp (animated number)
    │   │   └── ScanTimelineChart (animated area chart — Recharts)
    │   └── DeviceBreakdownChart (donut chart — Recharts)
    │
    ├── TestimonialsSection (client)
    │   ├── SectionHeader
    │   └── TestimonialMarquee (horizontal scroll, auto)
    │       └── TestimonialCard × N
    │           ├── Avatar
    │           ├── Quote (italic)
    │           ├── Author name
    │           ├── Author role + company
    │           └── Stars (5 gold accents)
    │
    ├── FAQSection (client)
    │   └── Accordion (single-open)
    │       └── AccordionItem × 8
    │           ├── AccordionTrigger (question)
    │           └── AccordionContent (answer — rich text)
    │
    ├── PricingSection (client)
    │   ├── SectionHeader
    │   ├── PricingToggle (Monthly / Annual)
    │   └── PricingGrid
    │       └── PricingCard × 3 (Free, Pro, Business)
    │           ├── Badge (plan name)
    │           ├── Price (with /mo, annual discount)
    │           ├── FeatureList
    │           │   └── FeatureItem (check icon + text) × N
    │           └── Button ("Get Started" / "Upgrade")
    │
    ├── CTASection (client)
    │   ├── GradientBackground (animated)
    │   ├── Heading (h2, Cal Sans)
    │   ├── Paragraph
    │   ├── Button ("Start Creating Free" — accent, xl)
    │   └── Text ("No credit card required · Free forever plan")
    │
    └── Footer (server)
        ├── FooterGrid
        │   ├── FooterColumn × 4
        │   │   ├── Heading (h3)
        │   │   └── FooterLink × N
        │   └── FooterBrand
        │       ├── Logo
        │       ├── Paragraph (tagline)
        │       └── SocialLinks (icons)
        ├── Separator (gradient)
        └── FooterBottom
            ├── Copyright
            └── LegalLinks
```

---

## 2. Dashboard Component Tree

```
DashboardLayout (server)
├── Providers (client)
│   ├── ThemeProvider
│   ├── SessionProvider
│   └── ToastProvider
│
├── DashboardShell (client)
│   ├── DashboardSidebar (client)
│   │   ├── SidebarBrand
│   │   │   ├── Logo
│   │   │   └── Text ("QR Universe")
│   │   ├── SidebarNav
│   │   │   ├── SidebarSection ("Main")
│   │   │   │   ├── SidebarItem ("Home" · LayoutDashboard)
│   │   │   │   ├── SidebarItem ("Create QR" · Plus · accent-highlighted)
│   │   │   │   ├── SidebarItem ("Saved QRs" · Bookmark)
│   │   │   │   ├── SidebarItem ("Templates" · Palette)
│   │   │   │   └── SidebarItem ("Analytics" · BarChart3)
│   │   │   ├── SidebarSeparator
│   │   │   ├── SidebarSection ("Settings")
│   │   │   │   ├── SidebarItem ("Settings" · Settings)
│   │   │   │   └── SidebarItem ("API" · Key)
│   │   │   └── SidebarSeparator
│   │   ├── SidebarFooter
│   │   │   ├── SidebarItem ("Help & Docs" · HelpCircle)
│   │   │   └── SidebarItem ("Feedback" · MessageSquare)
│   │   ├── SidebarCollapseButton (ChevronLeft/Right)
│   │   └── UpgradeBanner (collapsed: icon only, expanded: full CTA)
│   │       ├── Icon (Sparkles)
│   │       ├── Text ("Upgrade to Pro")
│   │       └── Progress (usage bar)
│   │
│   ├── DashboardTopbar (client)
│   │   ├── MobileMenuButton (hamburger, md:hidden)
│   │   ├── Breadcrumb (dynamic, auto-generated)
│   │   │   └── BreadcrumbItem × N
│   │   ├── SearchCommand (⌘K trigger)
│   │   │   └── Button ("Search... ⌘K")
│   │   ├── ThemeToggle (Sun/Moon/Laptop icons)
│   │   ├── NotificationBell (optional, future)
│   │   └── UserMenu
│   │       ├── Avatar (with fallback)
│   │       ├── DropdownMenu
│   │       │   ├── DropdownMenuItem ("Profile")
│   │       │   ├── DropdownMenuItem ("Billing")
│   │       │   ├── DropdownMenuItem ("Settings")
│   │       │   ├── DropdownMenuSeparator
│   │       │   └── DropdownMenuItem ("Sign Out" · destructive)
│   │
│   └── DashboardContent (main)
│       └── {page content}
│
└── CommandPalette (client) — global ⌘K
    ├── CommandInput (search)
    ├── CommandList
    │   ├── CommandGroup ("Pages")
    │   │   └── CommandItem × N
    │   ├── CommandGroup ("QR Codes")
    │   │   └── CommandItem × N (recent QRs)
    │   └── CommandGroup ("Actions")
    │       └── CommandItem ("Create new QR", "Switch theme", etc.)
    └── CommandEmpty ("No results found")
```

### 2.1 Dashboard Home Page

```
DashboardHomePage (server)
├── WelcomeBanner (client) — shown for new users
│   ├── Icon (PartyPopper)
│   ├── Heading ("Welcome to QR Universe! 👋")
│   ├── Paragraph
│   ├── Button ("Create Your First QR Code" · accent)
│   └── DismissButton
│
├── QuickStats (client)
│   └── StatsGrid
│       ├── StatCard ("Total QRs" · QrCode · count)
│       ├── StatCard ("Total Scans" · Scan · count · +%trend)
│       ├── StatCard ("This Month" · Calendar · count · +%trend)
│       └── StatCard ("Templates Used" · Palette · count)
│
├── RecentQRs (client)
│   ├── SectionHeader ("Recent QR Codes")
│   │   └── Button ("View All" — ghost)
│   └── QRCardList → QRCard × 5 (horizontal scroll on mobile)
│       ├── QRPreview (thumbnail)
│       ├── QRName
│       ├── QRType (badge)
│       ├── ScanCount
│       ├── QRStatusBadge
│       └── ContextMenu (···)
│           ├── "Edit"
│           ├── "Duplicate"
│           ├── "Download"
│           └── "Delete" (destructive)
│
├── ActivityFeed (client)
│   ├── SectionHeader ("Recent Activity")
│   └── ActivityList
│       └── ActivityItem × N
│           ├── Icon (activity type)
│           ├── Text (description + time ago)
│           └── Link (to relevant QR)
│
└── QuickActions (client)
    └── ActionGrid
        ├── ActionCard ("Create QR" · Plus · accent)
        ├── ActionCard ("Browse Templates" · Palette)
        ├── ActionCard ("View Analytics" · BarChart3)
        └── ActionCard ("API Docs" · Key)
```

### 2.2 Saved QRs Page

```
SavedQRsPage (client)
├── PageHeader
│   ├── Heading ("Saved QR Codes")
│   ├── Paragraph
│   └── Button ("Create New QR" · accent)
│
├── QRToolbar (client)
│   ├── SearchInput (with debounce)
│   ├── FilterDropdown (by type, status, tags)
│   ├── SortDropdown (date, name, scans)
│   └── ViewToggle (grid / list)
│
├── QRTags (horizontal scroll)
│   └── Badge × N ("All", "Restaurant", "Events", "Social", ...)
│
├── QRList (client)
│   ├── QRCard × N (grid or list layout)
│   │   ├── QRPreview (thumbnail canvas)
│   │   ├── QRName (editable on double-click)
│   │   ├── QRType (badge)
│   │   ├── ScanCount (with trend arrow)
│   │   ├── QRStatusBadge
│   │   ├── LastScanned (relative time)
│   │   └── CardActions (hover reveal)
│   │       ├── Button ("Edit")
│   │       ├── Button ("Download")
│   │       ├── Button ("Analytics")
│   │       └── DropdownMenu (Duplicate, Archive, Delete)
│   │
│   └── EmptyState (conditional)
│       └── EmptyQRs (illustration)
│       └── Button ("Create Your First QR")
│
└── Pagination (or infinite scroll)
    ├── Text ("Showing X of Y")
    ├── Button ("Previous")
    ├── PageNumbers
    └── Button ("Next")
```

### 2.3 QR Detail Page

```
QRDetailPage (server shell)
├── PageHeader
│   ├── Breadcrumb (Dashboard > Saved QRs > {QR Name})
│   ├── QRName (h1)
│   ├── QRStatusBadge
│   └── ActionButtons
│       ├── Button ("Edit")
│       ├── Button ("Download")
│       ├── Button ("Duplicate")
│       └── DropdownMenu (Archive, Delete)
│
├── QRDetailGrid (2 columns)
│   ├── QRDetailPreview (left column)
│   │   ├── QRCanvas (large preview, glass card)
│   │   ├── Button ("Download" · multiple formats)
│   │   └── Button ("Share" · copy link)
│   │
│   └── QRDetailInfo (right column)
│       ├── Card ("QR Details")
│       │   ├── DetailRow ("Type", QRType badge)
│       │   ├── DetailRow ("Created", date)
│       │   ├── DetailRow ("Last Modified", date)
│       │   ├── DetailRow ("Shortcode", copyable)
│       │   ├── DetailRow ("Tags", tag badges)
│       │   └── DetailRow ("Folder", folder path)
│       │
│       ├── Card ("Content")
│       │   └── ContentPreview (type-specific, e.g., URL preview, vCard details)
│       │
│       └── Card ("Design")
│           └── DesignPreview (color swatches, shape icons)
│
└── QRCodeAnalytics (mini — link to full analytics)
    ├── SectionHeader
    │   └── Link ("View Full Analytics →")
    └── StatCard × 3 (Total scans, This month, Today)
```

---

## 3. QR Creator Component Tree

```
QRCreatePage (client — fully interactive)
├── CreatorShell
│   ├── CreatorStepper (top bar)
│   │   ├── Step × 4
│   │   │   ├── StepIndicator (number + check)
│   │   │   ├── StepLabel ("Type", "Content", "Customize", "Save")
│   │   │   └── StepConnector (line)
│   │   └── Button ("Back") + Button ("Next" / "Save")
│   │
│   └── CreatorContent
│
│   ┌─ STEP 1: Choose Type ─────────────────────────────┐
│   │                                                    │
│   │  QRTypeSelector                                    │
│   │  ├── SearchInput (filter types)                    │
│   │  ├── CategoryGroup × 5                             │
│   │  │   ├── CategoryHeader ("Social", "Business",     │
│   │  │   │   "Utility", "Restaurant", "Event")         │
│   │  │   └── QRTypeCard × N                            │
│   │  │       ├── Icon (type-specific, large)           │
│   │  │       ├── Label (type name)                     │
│   │  │       ├── Description (short)                   │
│   │  │       └── SelectionIndicator (ring on selected) │
│   │  └── SelectionSummary (footer)                     │
│   │      └── Text ("Selected: WhatsApp")               │
│   │                                                    │
│   └────────────────────────────────────────────────────┘
│
│   ┌─ STEP 2: Enter Content ───────────────────────────┐
│   │                                                    │
│   │  QRContentForm (dynamic — changes per QR type)      │
│   │  ├── Form (React Hook Form + Zod)                   │
│   │  │   ├── TypeSpecificFields × N                     │
│   │  │   │   // e.g., WhatsApp: phone + message         │
│   │  │   │   // e.g., URL: URL input + preview          │
│   │  │   │   // e.g., vCard: name, phone, email, etc.   │
│   │  │   │   ├── FormField                              │
│   │  │   │   │   ├── Label                              │
│   │  │   │   │   ├── Input / Textarea / Select          │
│   │  │   │   │   └── FormMessage (validation error)     │
│   │  │   │   └── ...                                    │
│   │  │   └── FormSubmit (hidden, triggered by Next)     │
│   │  └── ContentPreview (right sidebar)                 │
│   │      └── Text ("This will be encoded in the QR")    │
│   │                                                    │
│   └────────────────────────────────────────────────────┘
│
│   ┌─ STEP 3: Customize Design ────────────────────────┐
│   │                                                    │
│   │  CreatorDesignLayout (2 columns)                    │
│   │                                                    │
│   │  ├─ LEFT: Design Panel ─────────────────           │
│   │  │  QRDesignPanel                                  │
│   │  │  ├── Tabs ("Colors", "Shapes", "Logo", "Frame") │
│   │  │  │                                              │
│   │  │  ├── Tab: Colors                                │
│   │  │  │  ├── PresetPalettes (color dots grid)         │
│   │  │  │  │   └── PaletteDot × 12 ("Neon", "Ocean",   │
│   │  │  │  │       "Sunset", "Forest", "Midnight"...)   │
│   │  │  │  ├── QRColorPicker                           │
│   │  │  │  │   ├── Label ("Foreground Color")           │
│   │  │  │  │   ├── ColorInput (popover picker)         │
│   │  │  │  │   └── HexInput                            │
│   │  │  │  ├── QRColorPicker ("Background Color")       │
│   │  │  │  └── QRGradientEditor (collapsible)          │
│   │  │  │      ├── Switch ("Use Gradient")              │
│   │  │  │      ├── GradientType (Linear / Radial)       │
│   │  │  │      ├── AngleSlider                          │
│   │  │  │      └── ColorStopEditor × N                  │
│   │  │  │          ├── ColorInput                       │
│   │  │  │          └── OffsetSlider                     │
│   │  │  │                                              │
│   │  │  ├── Tab: Shapes                                │
│   │  │  │  ├── QRShapeEditor ("Dots Style")             │
│   │  │  │  │   └── ShapeOption × 6 (grid of icons)      │
│   │  │  │  │       ("Square", "Dots", "Rounded",        │
│   │  │  │  │        "Classy", "Classy Rounded", "Extra")│
│   │  │  │  ├── QRShapeEditor ("Corners Square")         │
│   │  │  │  │   └── ShapeOption × 3                      │
│   │  │  │  └── QRShapeEditor ("Corners Dot")            │
│   │  │  │      └── ShapeOption × 2                      │
│   │  │  │                                              │
│   │  │  ├── Tab: Logo                                  │
│   │  │  │  └── QRLogoUploader                           │
│   │  │  │      ├── UploadZone (drag & drop)             │
│   │  │  │      │   ├── Icon (Upload)                    │
│   │  │  │      │   └── Text ("Drop logo or click")      │
│   │  │  │      ├── LogoPreview (once uploaded)          │
│   │  │  │      ├── SizeSlider (0.2 — 0.5)              │
│   │  │  │      ├── MarginSlider                         │
│   │  │  │      └── Switch ("Hide background dots")      │
│   │  │  │                                              │
│   │  │  └── Tab: Frame                                 │
│   │  │     └── QRFrameEditor                            │
│   │  │         ├── Switch ("Add Frame")                  │
│   │  │         ├── Input ("Frame Text")                 │
│   │  │         ├── StyleSelector ("Top" / "Bottom")     │
│   │  │         ├── QRColorPicker ("Frame Color")        │
│   │  │         └── FontSizeSlider                       │
│   │  │                                                 │
│   │  └───────────────────────────────────────────────── │
│   │                                                    │
│   │  └─ RIGHT: Live Preview ───────────────            │
│   │     QRPreviewCard (glass, sticky)                    │
│   │     ├── QRCanvas (live-updating, debounced)          │
│   │     │   // Re-renders on every design change         │
│   │     ├── ScanSimulation (animated scan line overlay)  │
│   │     └── PreviewActions                               │
│   │         ├── Button ("Reset Defaults")                │
│   │         └── Button ("Randomize" · fun/delight)       │
│   │                                                    │
│   └────────────────────────────────────────────────────┘
│
│   ┌─ STEP 4: Save & Download ─────────────────────────┐
│   │                                                    │
│   │  SaveQRPanel                                        │
│   │  ├── QRPreview (large final preview)                │
│   │  ├── Form                                           │
│   │  │   ├── Input ("QR Name" · required)               │
│   │  │   ├── TagInput ("Tags" · comma-separated)        │
│   │  │   └── Select ("Folder" · optional)               │
│   │  ├── Button ("Save QR Code" · accent, xl)           │
│   │  └── DownloadSection                                │
│   │      ├── Heading ("Download")                       │
│   │      └── QRDownloadOptions                          │
│   │          ├── FormatSelector (PNG / SVG / PDF)        │
│   │          ├── ResolutionSelector                       │
│   │          │   (Standard 1024px / High 2048px /        │
│   │          │    Print 4096px)                          │
│   │          ├── Switch ("Include margin")               │
│   │          └── Button ("Download" · per format)        │
│   │                                                    │
│   └────────────────────────────────────────────────────┘
```

---

## 4. Analytics Component Tree

```
AnalyticsPage (server shell + client charts)
├── PageHeader
│   ├── Heading ("Analytics")
│   ├── Paragraph
│   └── DateRangePicker (7d, 30d, 90d, Custom)
│
├── AnalyticsOverview (client)
│   └── MetricGrid
│       ├── MetricCard ("Total Scans" · ScanLine · count · +12%↑)
│       │   └── Sparkline (mini area chart)
│       ├── MetricCard ("Today" · Calendar · count · +8%↑)
│       │   └── Sparkline
│       ├── MetricCard ("This Week" · CalendarDays · count · +15%↑)
│       │   └── Sparkline
│       └── MetricCard ("This Month" · CalendarRange · count · +22%↑)
│           └── Sparkline
│
├── ScanTimelineChart (client) — full-width
│   ├── Card
│   │   ├── CardHeader
│   │   │   ├── Heading ("Scan Timeline")
│   │   │   └── GranularityToggle (Daily / Weekly / Monthly)
│   │   └── CardContent
│   │       └── AreaChart (Recharts)
│   │           ├── XAxis (date)
│   │           ├── YAxis (scan count)
│   │           ├── Area (gradient fill — primary to transparent)
│   │           ├── Tooltip (custom — glass design)
│   │           └── ResponsiveContainer
│
├── AnalyticsGrid (2 columns)
│   ├── GeographyChart (client)
│   │   ├── Card
│   │   │   ├── CardHeader ("Scans by Country")
│   │   │   └── CardContent
│   │   │       └── BarChart (horizontal)
│   │   │           ├── Bar × N (country name, flag, count, percentage)
│   │   │           └── "View All" expand
│   │
│   ├── DeviceBreakdownChart (client)
│   │   ├── Card
│   │   │   ├── CardHeader ("Device Breakdown")
│   │   │   └── CardContent
│   │   │       └── DonutChart (Recharts)
│   │   │           ├── Pie (Mobile 68%, Desktop 22%, Tablet 10%)
│   │   │           ├── CustomLabel
│   │   │           └── Legend
│   │
│   ├── BrowserDistribution (client)
│   │   ├── Card
│   │   │   ├── CardHeader ("Browser Distribution")
│   │   │   └── CardContent
│   │   │       └── HorizontalBarChart
│   │   │           └── Bar × N (browser icon + name + %)
│   │
│   └── TimeOfDayHeatmap (client)
│       ├── Card
│       │   ├── CardHeader ("Scan Activity by Time")
│       │   └── CardContent
│       │       └── HeatmapGrid
│       │           ├── Row (day) × 7
│       │           └── Cell (hour) × 24
│       │               └── Color intensity based on scan count
│
├── TopQRCodesTable (client) — full-width
│   ├── Card
│   │   ├── CardHeader
│   │   │   ├── Heading ("Top Performing QR Codes")
│   │   │   └── Link ("View All →")
│   │   └── CardContent
│   │       └── Table
│   │           ├── TableHeader
│   │           │   ├── "#" (rank)
│   │           │   ├── "QR Code" (sortable)
│   │           │   ├── "Type"
│   │           │   ├── "Scans" (sortable)
│   │           │   ├── "Unique Scans"
│   │           │   └── "Trend"
│   │           └── TableBody
│   │               └── TableRow × N
│   │                   ├── TableCell (rank)
│   │                   ├── TableCell (QR name + thumbnail)
│   │                   ├── TableCell (type badge)
│   │                   ├── TableCell (scan count)
│   │                   ├── TableCell (unique count)
│   │                   └── TableCell (trend arrow + %)
│
└── ExportButton (floating)
    └── DropdownMenu
        ├── "Export CSV"
        └── "Export PDF Report"
```

---

## 5. Auth Pages Component Tree

```
AuthLayout (centered, minimal)
├── AuthCard (glass, centered)
│   ├── Logo (centered)
│   │
│   ├── [LoginPage / RegisterPage / ForgotPasswordPage / ResetPasswordPage]
│   │   ├── Heading (h1)
│   │   ├── Paragraph (subtitle)
│   │   │
│   │   ├── OAuthButtons
│   │   │   ├── OAuthButton ("Continue with Google" · Google icon)
│   │   │   └── OAuthButton ("Continue with GitHub" · GitHub icon)
│   │   │
│   │   ├── Divider ("or continue with email")
│   │   │
│   │   └── AuthForm
│   │       ├── Form (React Hook Form + Zod)
│   │       │   ├── FormField × N
│   │       │   │   ├── Label
│   │       │   │   ├── Input (with icon)
│   │       │   │   └── FormMessage (error)
│   │       │   └── Button ("Sign In" / "Create Account" · accent, full-width)
│   │       │
│   │       └── AuthFooter
│   │           ├── Link ("Forgot password?")
│   │           └── Text ("Don't have an account?") + Link ("Sign up")
│   │
│   └── AuthIllustration (decorative, side on desktop)
│       └── Gradient abstract shapes
│
└── Footer (minimal — copyright only)
```

---

## 6. Settings Page Component Tree

```
SettingsLayout
├── SettingsSidebar (tab navigation)
│   ├── SettingsTab ("Profile" · User)
│   ├── SettingsTab ("Password" · Lock)
│   ├── SettingsTab ("Billing" · CreditCard)
│   ├── SettingsTab ("Team" · Users · Pro+ only)
│   └── SettingsTab ("Notifications" · Bell)
│
└── SettingsContent
    │
    ├── [ProfileSettings]
    │   └── ProfileForm
    │       ├── AvatarUploader
    │       │   ├── Avatar (preview)
    │       │   └── Button ("Change Avatar")
    │       ├── FormField ("Name" · Input)
    │       ├── FormField ("Email" · Input · disabled)
    │       └── Button ("Save Changes")
    │
    ├── [PasswordSettings]
    │   └── PasswordForm
    │       ├── FormField ("Current Password" · Input · password)
    │       ├── FormField ("New Password" · Input · password)
    │       ├── FormField ("Confirm Password" · Input · password)
    │       └── Button ("Update Password")
    │
    ├── [BillingSettings]
    │   ├── BillingCard (current plan)
    │   │   ├── PlanName + Badge
    │   │   ├── Price
    │   │   ├── UsageBar (QRs used / limit)
    │   │   ├── UsageBar (Scans used / limit)
    │   │   └── BillingActions
    │   │       ├── Button ("Manage Billing" — Stripe Portal)
    │   │       └── Button ("Cancel Plan" · ghost, destructive)
    │   │
    │   ├── PlanComparison (upgrade/downgrade)
    │   │   └── PricingCard × 3 (Free, Pro, Business)
    │   │       ├── CurrentPlanBadge
    │   │       ├── PlanFeatures
    │   │       └── Button ("Upgrade" / "Current Plan")
    │   │
    │   └── InvoiceList
    │       ├── Heading ("Invoice History")
    │       └── Table
    │           └── TableRow × N
    │               ├── Date
    │               ├── Amount
    │               ├── Status
    │               └── DownloadButton
    │
    ├── [TeamSettings] (Pro+)
    │   ├── TeamMembersList
    │   │   └── TeamMemberRow × N
    │   │       ├── Avatar + Name + Email
    │   │       ├── Role (badge)
    │   │       └── Actions (Change role, Remove)
    │   ├── Button ("Invite Member")
    │   └── InviteMemberDialog
    │       └── Form
    │           ├── Input ("Email")
    │           ├── Select ("Role")
    │           └── Button ("Send Invite")
    │
    └── [NotificationsSettings] (future)
        └── ToggleGroup
            └── Switch × N per notification type
```

---

## 7. Shared Layout Components

```
RootLayout (server)
├── <html> with theme class, font variables
├── <body>
│   ├── ThemeProvider (client)
│   │   ├── SessionProvider (client)
│   │   │   ├── TRPCProvider (client)
│   │   │   │   ├── {children} (page content)
│   │   │   │   └── Toaster (Sonner, client)
│   │   │   │       └── Toast × N (position: bottom-right)
│   │   │   └── CommandPalette (client)

DashboardShell (client)
├── Sidebar (fixed left)
│   └── (see DashboardSidebar tree above)
├── Topbar (fixed top, right of sidebar)
│   └── (see DashboardTopbar tree above)
└── Main Content Area (scrollable)
    └── {children}

MarketingLayout (server)
├── Navbar (fixed top, glass)
└── {children}
└── Footer
```

---

## 8. Legend

| Symbol | Meaning |
|--------|---------|
| `(server)` | React Server Component (default) |
| `(client)` | Client Component (`'use client'` directive) |
| `├──` | Child component |
| `└──` | Last child component |
| `× N` | Repeated N times |
| `→` | Navigates to / renders as |
| `·` | Descriptive annotation |
| `[Square]` | Conditional / variant |
| `{variable}` | Dynamic content |

### Component Type Distribution

| Page/Feature | Server Components | Client Components |
|-------------|-------------------|-------------------|
| Landing Page | Layout, Footer, SEO | Navbar, Hero, Features, Templates, AnalyticsPreview, Testimonials, FAQ, Pricing, CTA |
| Dashboard Shell | Layout | Sidebar, Topbar, UserMenu, SearchCommand |
| Dashboard Home | Page shell | WelcomeBanner, QuickStats, RecentQRs, ActivityFeed |
| QR Creator | — (fully client) | Entire page (live preview requires client) |
| QR List | Page shell | Search, filters, cards, pagination |
| QR Detail | Page shell, metadata | Preview canvas, actions |
| Analytics | Page shell, metadata | All charts, filters, date picker |
| Auth Pages | Layout | Forms (interactive) |
| Settings | Layout, metadata | Forms, billing card |

### Performance Notes

- **QR Creator** is fully client-side (no server round-trips during design editing)
- **Analytics** pages use RSC for initial data fetch, hydrated with client chart components
- **Landing page** uses RSC for SEO-critical content, client islands for animations
- **QR redirect** (`/r/[shortcode]`) runs at the Edge for minimum latency
- All images use `next/image` with lazy loading
- Charts are dynamically imported (`next/dynamic`) with loading skeletons
- QR canvas rendering is debounced (150ms) and offloaded to Web Worker when available

---

*End of Component Tree Documentation*
