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

### AIPS - AI Premium Shop (`artifacts/aips-landing`) — PHASE 1 COMPLETE

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

### Known Phase 2 Work

- Bundles / Pricing / Support pages (currently `href="#"`)
- Mega menu for Products dropdown
- SSR / SSG (currently client-side SPA — page source shows React root only)
- Full product catalog page with `data/products.json` integration
- Individual product pages
- WhatsApp pre-filled messages per product
