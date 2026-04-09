# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### AIPS - AI Premium Shop (`artifacts/aips-landing`) — PHASE 3 COMPLETE

- **Type**: React + Vite (marketing landing page, SPA)
- **Preview Path**: `/`
- **Description**: Bangladesh's #1 premium AI subscription shop landing page
- **Tech**: React, Vite, Framer Motion, TailwindCSS, wouter, shadcn/ui, react-icons

### Brand System (Phase 1)

- **Background**: navy-900 `#0a0e27`, navy-800 `#151b3d`
- **Gold accent**: `#f4b942` (H3 subheadings, icons, highlights)
- **CTA gradient**: `linear-gradient(135deg, #ec4899, #f97316)` (pink → orange)
- **Order Now button**: WhatsApp green `#25d366`
- **Muted text**: `#c9ceda`
- **Font**: Inter only (400, 500, 600, 700)
- **Logo**: PNG at `/public/images/brand/aips-logo.png` (500×500), via `PrimaryBrandLogo` component

### Navigation (Phase 1)

- **Desktop**: Logo | Products dropdown (6 categories, 49 total) | Bundles | Pricing | Support | Green "Order Now"
- **Mobile**: Logo | Search icon | WhatsApp icon | Hamburger → drawer with all categories
- Products dropdown uses hover + AnimatePresence (Phase 2: mega menu)
- Bundles / Pricing / Support link to `#` — pages to be built in Phase 2

### 10 Homepage Sections

1. **HeroSection** — Animated rotating text (6 pain points, 3s cycle), dual CTA, trust bar, payment badges
2. **PainPointSection** — 6 segment cards (Students, Freelancers, Creators, Business, Job Seekers, Devs)
3. **AIAgentsSection** — 4 use-case cards, Upwork stat banner, coaching CTA
4. **OffersSection** — 2 special offer cards + 6 best-seller product cards
5. **CategorySection** — 7 cards from `data/categories.json`
6. **WhyUsSection** — Comparison table (Direct vs AIPS prices), 4 value pillars, differentiator quote
7. **HowItWorksSection** — 4 numbered steps
8. **TestimonialsSection** — 3 star-rated customer quotes
9. **FAQSection** — 8 accordion questions with JSON-LD schema markup
10. **FinalCTASection** — CTA banner + 4-column footer + payment badges + social links

### Floating / Persistent UI

- `FloatingWhatsApp` — Green pulsing button (bottom-right, z-50, always visible)
- `StickyMobileBar` — Appears after hero on mobile: "From BDT 350/mo" + green "Order Now"

### Data Files

- `data/brand.json` — Owner, contacts, WhatsApp, Facebook, payment link, theme tokens, trust badges
- `data/products.json` — 30+ products with BDT prices, categories, badges
- `data/categories.json` — 7 categories with icon, from-price, count

### Components (`src/components/`)

- `PrimaryBrandLogo.tsx` — Logo component (horizontal/vertical, size variants)
- `PaymentBadges.tsx` — bKash, Nagad, Rocket, Bank Transfer, Binance badges
- `FAQSection.tsx` — Accordion FAQ with JSON-LD schema, receives `items` + `title` props
- `FloatingWhatsApp.tsx` — Pulsing WhatsApp button
- `StickyMobileBar.tsx` — Mobile sticky bar (shows after hero leaves viewport)
- `TrustBadges.tsx` — Trust badges row (1,200+ customers, Since 2022, 30-Day, <5 Min)

### Sections (`src/sections/`)

All sections are isolated components for clarity and performance.

### SEO (index.html)

- `<title>`: "AI Premium Shop — Premium AI Tools Bangladesh | ChatGPT, Claude, Midjourney from BDT 350"
- `<meta name="description">`: 1,200+ customers, BDT prices, bKash/Nagad payment
- `<link rel="canonical">`: https://aipremiumshop.com/
- Open Graph: og:title, og:description, og:type, og:url, og:site_name, og:image
- Twitter Card: summary_large_image

### WhatsApp

- All CTAs link to: `https://wa.me/8801865385348`
- No fake numbers: "1,200+" customers (not 10,000+), no "4.9/5" rating

### Phase 3 Inner Pages (All Live)

**Routing**: wouter SPA routing. All 14 routes registered in `src/App.tsx`.

| URL | Page | Component |
|-----|------|-----------|
| `/products` | All Products (filtered, sorted) | `ProductsPage.tsx` |
| `/ai-assistant` | AI Assistant & Chat | `CategoryPage.tsx` |
| `/ai-image` | AI Image & Design | `CategoryPage.tsx` |
| `/ai-video` | AI Video | `CategoryPage.tsx` |
| `/ai-voice-music` | AI Voice & Music | `CategoryPage.tsx` |
| `/ai-code` | AI Code & Dev Tools | `CategoryPage.tsx` |
| `/ai-workspace` | AI Workspace | `CategoryPage.tsx` |
| `/bundles` | Bundles & Packages | `CategoryPage.tsx` |
| `/about` | About | `AboutPage.tsx` |
| `/contact` | Contact | `ContactPage.tsx` |
| `/faq` | FAQ (12 questions) | `FAQPage.tsx` |
| `/pricing` | Pricing table (sortable, filterable) | `PricingPage.tsx` |
| `/refund-policy` | Refund & Replacement Policy | `RefundPolicyPage.tsx` |
| `/terms` | Terms of Service | `TermsPage.tsx` |

### Shared Infrastructure (Phase 3)

- `Navbar.tsx` — Shared navbar for inner pages (always solid, Products dropdown with real links)
- `PageFooter.tsx` — Standalone footer with real navigation links
- `PageLayout.tsx` — Wraps `Navbar + children + PageFooter + FloatingWhatsApp`
- `SEOHead.tsx` — useEffect-based per-page title/meta updater

### Data (Updated Phase 3)

- `products.json` — 31 products, category IDs remapped to match page slugs:
  - `image-generation`, `design` → `ai-image`
  - `developer-tools` → `ai-code`
  - `productivity`, `writing` → `ai-workspace`
  - `audio-generation` → `ai-voice-music`
  - `video-generation` → `ai-video`
  - `ai-search` → `ai-assistant`
- `categories.json` — Updated with accurate product counts

### Navigation (Phase 3)

- **Desktop**: Logo | Products dropdown → real category pages | Pricing | About | FAQ | Green "Order Now"
- **Mobile drawer**: All category pages, Bundles, Pricing, About, FAQ — all client-side navigate
- **Footer (homepage)**: All links updated to real pages (no more `href="#"`)

### Phase 4 SEO Pages (All Live)

**12 new pages + technical SEO — all complete.**

#### Guide Pages (6)
| URL | Audience |
|-----|----------|
| `/best-ai-for-students` | Students |
| `/best-ai-for-freelancers` | Freelancers |
| `/best-ai-for-creators` | Content Creators |
| `/best-ai-for-business` | Business Owners |
| `/best-ai-for-developers` | Developers |
| `/best-ai-for-job-seekers` | Job Seekers |

Template: Hero → Why AI → Recommended Tools (ranked) → Start Here → 4 FAQs → CTA

#### Comparison Pages (3)
| URL | Products Compared |
|-----|-------------------|
| `/chatgpt-vs-claude` | ChatGPT vs Claude |
| `/chatgpt-vs-gemini` | ChatGPT vs Google AI Pro |
| `/copilot-vs-cursor` | GitHub Copilot vs Cursor |

Template: Side-by-side table with ✓/✗ + text → Verdict → Order CTAs

#### Budget Pages (3)
| URL | Price Filter |
|-----|-------------|
| `/ai-under-500` | Products ≤ BDT 500 (8 tools) |
| `/ai-under-1000` | Products ≤ BDT 1,000 (25 tools) |
| `/ai-under-3000` | Products ≤ BDT 3,000 (31 tools) |

Template: Stats → Filtered product grid → Next tier link → CTA

#### Technical SEO
- `public/robots.txt` — Allow all, points to sitemap
- `public/sitemap.xml` — All 31 URLs, priorities 1.0→0.4, lastmod 2026-04-09
- Organization JSON-LD schema on homepage (injected via useEffect)
- FAQPage JSON-LD schema on /faq page (12 questions, injected via useEffect)

#### New Components
- `GuidePage.tsx` — Config-driven guide page (6 guides share one component)
- `ComparisonPage.tsx` — Config-driven comparison page (3 comparisons share one component)
- `BudgetPage.tsx` — Price-filtered product listing page

### Phase 6 — Product Catalogue Rebuild & Content Accuracy (COMPLETE)

**49 products total** across 7 categories. `products.json` is the single source of truth for ProductsPage and PricingPage.

#### Product Category Counts (updated)
| Category | Count |
|----------|-------|
| AI Assistant & Chat | 15 |
| AI Image & Design | 7 |
| AI Video | 3 |
| AI Voice & Music | 6 |
| AI Code & Dev Tools | 6 |
| AI Workspace | 5 |
| Bundles | 7 |

#### Removed Brands (8)
Canva Pro, Krea AI, Adobe Firefly, Windsurf, Bolt.new, Lovable, Pika, Grammarly Pro

#### Added Products (26 new)
Includes bundles, HeyGen, Udio, v0.dev, Replit, Tabnine, Gamma, Otter.ai, Writesonic, and expanded ChatGPT/Claude/Copilot/Midjourney tiers

#### Content Updated
- `CategoryPage.tsx`: All 6 categories updated — subtitles, descriptions, FAQs, metaDescriptions use only current products
- `GuidePage.tsx` (developers): Windsurf → Tabnine Pro at BDT 600
- `ComparisonPage.tsx`: "Claude 3.5" → "Claude Opus 4.6"
- `Home.tsx`: PRODUCT_CATEGORIES counts match new totals

#### Visual Upgrades
- `HeroSection.tsx`: Animated dot-grid background (Framer Motion, scrolls upward at 4s/cycle, mask-faded at top & bottom)
- All section cards already have hover lift via whileHover
- All sections use whileInView scroll-triggered fade-ins

### Known Future Work
- SSR / SSG (currently client-side SPA)
- Individual product pages with dedicated URLs
- Search functionality
