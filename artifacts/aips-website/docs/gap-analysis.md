# AI Premium Shop (Phoenix) — Comprehensive SEO Gap Analysis

**Date:** 2026-05-20  
**Project:** `/c/Users/emonh/AI Premium Shop/01-phoenix-website/`  
**Framework:** Next.js 16.2.4 (Static Export)  
**Audit Dimensions:** Tech SEO, Structured Data, On-Page SEO, Content, CWV/Performance, Localization

---

## Executive Summary

The Phoenix rebuild demonstrates strong foundational SEO architecture: comprehensive schema markup, clean static export, AI-bot-friendly `robots.ts`, and keyword-rich metadata. However, **critical gaps exist** that will materially impact crawlability, trust signals, and local search performance in Bangladesh.

**Overall Health Score: 72 / 100**

| Dimension | Score | Status |
|-----------|-------|--------|
| Tech SEO | 78 | ⚠️ Good with critical issues |
| Structured Data | 85 | ✅ Strong |
| On-Page SEO | 82 | ✅ Good |
| Content Gaps | 58 | ⚠️ Major gaps |
| CWV / Performance | 65 | ⚠️ Anti-patterns present |
| Localization | 45 | 🔴 Weak |

---

## 1. TECH SEO

### 1.1 robots.ts
**File:** `src/app/robots.ts`

| Check | Status | Detail |
|-------|--------|--------|
| GPTBot allowed | ✅ Pass | `Allow: /` explicit rule |
| ClaudeBot allowed | ✅ Pass | `Allow: /` explicit rule |
| PerplexityBot allowed | ✅ Pass | `Allow: /` explicit rule |
| Google-Extended allowed | ✅ Pass | `Allow: /` explicit rule |
| OAI-SearchBot allowed | ✅ Pass | `Allow: /` explicit rule |
| Applebot-Extended allowed | ✅ Pass | `Allow: /` explicit rule |
| AhrefsBot throttled | ✅ Pass | `crawlDelay: 10` |
| Bad bots blocked | ✅ Pass | MJ12bot, DotBot disallowed |
| Sitemap referenced | ✅ Pass | `Sitemap: https://aipremiumshop.com/sitemap.xml` |
| Host directive | ✅ Pass | `Host: https://aipremiumshop.com` |

**Finding:** Well-executed. The explicit AI-bot allow rules are future-proofed for LLM-driven search.

### 1.2 sitemap.ts
**File:** `src/app/sitemap.ts`

| Check | Status | Detail |
|-------|--------|--------|
| All static pages | ✅ Pass | 8 core pages included |
| All product pages | ✅ Pass | 29 product groups mapped |
| All comparison pages | ✅ Pass | 4 pages included |
| All blog posts | ✅ Pass | 3 posts included |
| hreflang (xhtml:link) | ✅ Pass | `en-BD`, `bn-BD`, `x-default` on core pages |
| lastmod | ✅ Pass | Set to build-time `new Date()` |
| changeFrequency | ✅ Pass | Appropriate per page type |
| priority | ✅ Pass | Hierarchical (1.0 → 0.3) |

**Gap:** `/privacy` and `/terms` are listed in the sitemap but **no source pages exist** — these are 404 links that will be crawled and indexed as errors.

### 1.3 next.config.ts
**File:** `next/config.ts`

| Check | Status | Detail |
|-------|--------|--------|
| `output: "export"` | ✅ Pass | Static export enabled |
| `distDir: "dist"` | ✅ Pass | Custom output dir |
| `poweredByHeader: false` | ✅ Pass | Security hygiene |
| Image formats | ✅ Pass | avif, webp configured |
| deviceSizes | ✅ Pass | 640–1920 |
| Redirects (legacy paths) | ⚠️ Gap | `/chatgpt` → `/products/chatgpt-plus` etc. |
| Redirects (www→non-www) | ⚠️ Gap | Configured but **ignored in static export** |
| Security headers | ⚠️ Gap | 7 headers configured but **ignored in static export** |
| Cache headers | ⚠️ Gap | Configured but **ignored in static export** |

**Critical Finding:** `async headers()` and `async redirects()` are **Next.js server runtime APIs**. In `output: "export"` mode, these are **silently ignored** at build time. The deployed static files will have **no HSTS, no CSP, no X-Frame-Options, no cache headers, and no www→non-www redirect**. This must be handled at the CDN/host level (Cloudflare, Vercel, nginx) or the build must be changed to SSR/ISR.

---

## 2. STRUCTURED DATA

### 2.1 Schema Coverage
**File:** `src/components/seo/json-ld.tsx`

| Schema Type | Component | Status |
|-------------|-----------|--------|
| Organization | `OrganizationJsonLd` | ✅ Implemented |
| WebSite (SearchAction) | `WebsiteJsonLd` | ✅ Implemented |
| BreadcrumbList | `BreadcrumbJsonLd` | ✅ Implemented |
| Product + Offer | `ProductJsonLd` | ✅ Implemented |
| FAQPage | `FAQPageJsonLd` | ✅ Implemented |
| Article (BlogPost) | `ArticleJsonLd` | ✅ Implemented |
| HowTo | `HowToJsonLd` | ✅ Implemented |

### 2.2 Schema Injection by Page Type

| Page | Schemas Injected | Status |
|------|------------------|--------|
| Homepage | Organization, WebSite, Breadcrumb, HowTo, FAQPage | ✅ Complete |
| Product Detail | Product, Breadcrumb, FAQPage, HowTo | ✅ Complete |
| Blog Post | Article, Breadcrumb, HowTo (ChatGPT guide) | ✅ Complete |
| Blog Index | Breadcrumb only | ⚠️ Thin |
| chatgpt-vs-claude | Breadcrumb, FAQPage | ⚠️ Missing Article/HowTo |
| chatgpt-vs-gemini | Breadcrumb only | 🔴 Missing FAQPage/Article/HowTo |
| copilot-vs-cursor | Breadcrumb only | 🔴 Missing FAQPage/Article/HowTo |
| midjourney-vs-ideogram | Breadcrumb, FAQPage | ⚠️ Missing Article/HowTo |
| About | Organization, Breadcrumb | ✅ Good |
| Contact | Breadcrumb only | ⚠️ Missing Organization |
| FAQ | FAQPage, Breadcrumb | ✅ Complete |

**Finding:** Comparison pages are under-schematized. `chatgpt-vs-gemini` and `copilot-vs-cursor` are long-form editorial content that should carry `Article` schema and `FAQPage` schema (they currently have neither). This is low-effort, high-impact.

### 2.3 Schema Quality Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| AggregateRating is hardcoded | Medium | `ratingValue: 4.8`, `reviewCount: 124` on all products. Could trigger Google manual review if flagged as fake reviews. |
| sameAs empty array | Low | `OrganizationJsonLd.sameAs` is empty (no social profiles). Minor trust signal gap. |
| SearchAction target 404 | Medium | `WebSite` schema points to `/search?q={search_term_string}` but **no search page exists**. |
| Product image fallback | Low | All products fallback to `/og/default.png` which **does not exist**. |

---

## 3. ON-PAGE SEO

### 3.1 Title & Meta Description

| Page | Title | Description | Status |
|------|-------|-------------|--------|
| Homepage | `Premium AI Subscriptions in Bangladesh \| AI Premium Shop` | Unique, keyword-rich | ✅ |
| Products | `All Products — 56 AI Subscriptions & Premium Tools in Bangladesh \| AI Premium Shop` | Unique, includes count | ✅ |
| Product (ChatGPT) | `ChatGPT in Bangladesh — Buy at Best Price \| AI Premium Shop \| AI Premium Shop` | **Double site name** (`\| AI Premium Shop` ×2) | ⚠️ |
| Blog Index | `Blog — AI Tools, Subscriptions & Tech Tips for Bangladesh \| AI Premium Shop` | Unique | ✅ |
| Blog Post (Best AI) | `Best AI Tools in Bangladesh (2026) — Complete Buying Guide \| AI Premium Shop` | Unique | ✅ |
| chatgpt-vs-claude | `ChatGPT vs Claude in Bangladesh (2026) — Which AI Should You Buy? \| AI Premium Shop` | Unique | ✅ |
| chatgpt-vs-gemini | `ChatGPT vs Gemini Advanced in Bangladesh (2026) — Best Google AI? \| AI Premium Shop` | Unique | ✅ |
| About | `About Us — AI Premium Shop Bangladesh \| AI Premium Shop` | Unique | ✅ |
| Contact | `Contact — AI Premium Shop Bangladesh \| AI Premium Shop` | Unique | ✅ |
| FAQ | `FAQ — AI Premium Shop Bangladesh \| AI Premium Shop` | Unique | ✅ |

**Finding:** Product pages have a title-duplication bug: `buildProductMetadata` appends `\| AI Premium Shop`, but `buildMetadata` also appends `\| AI Premium Shop`, resulting in `ChatGPT in Bangladesh — Buy at Best Price | AI Premium Shop | AI Premium Shop`.

### 3.2 Canonical URLs

| Page | Canonical | Status |
|------|-----------|--------|
| Homepage | `https://aipremiumshop.com` | ✅ |
| Products | `https://aipremiumshop.com/products` | ✅ |
| Product | `https://aipremiumshop.com/products/{slug}` | ✅ |
| Blog | `https://aipremiumshop.com/blog` | ✅ |
| Blog Post | `https://aipremiumshop.com/blog/{slug}` | ✅ |
| Comparison | `https://aipremiumshop.com/{slug}` | ✅ |

### 3.3 H1 Tags

| Page | H1 Text | Status |
|------|---------|--------|
| Homepage | `Buy Premium AI Subscriptions in Bangladesh — ChatGPT Plus, Claude Pro & More` | ✅ Excellent |
| Products | `56 premium subscriptions in Bangladesh` | ✅ Good |
| Product | `{brand} in Bangladesh` | ⚠️ Generic — could be richer (e.g., "Buy ChatGPT Plus in Bangladesh — Plans from ৳350") |
| Blog Post | Matches title | ✅ Good |
| Comparison | `{Topic} in Bangladesh (2026)` | ✅ Good |

### 3.4 OpenGraph & Twitter Cards

| Check | Status | Detail |
|-------|--------|--------|
| og:title | ✅ Present | All pages |
| og:description | ✅ Present | All pages |
| og:url | ✅ Present | All pages |
| og:site_name | ✅ Present | All pages |
| og:locale | ✅ Present | `en_BD` with `bn_BD` alternate |
| og:image | ⚠️ Broken | Points to `/og/default.png` — **file does not exist** |
| twitter:card | ✅ Present | `summary_large_image` |
| twitter:title | ✅ Present | All pages |
| twitter:image | ⚠️ Broken | Same missing OG image |

---

## 4. CONTENT GAPS

### 4.1 Product Pages

| Check | Status | Detail |
|-------|--------|--------|
| Variant tables | ✅ Present | All products show plan variants |
| Price range | ✅ Present | Min/max shown |
| Capabilities | ✅ Present | Feature chips displayed |
| Long-form content | ⚠️ Templated | Every product uses identical paragraph templates with `{group.brand}` swapped. ~300–400 words per page. |
| Unique images | 🔴 Missing | No product photos, screenshots, or hero images. Only colored `<div>` placeholders. |
| FAQ section | ✅ Present | 5 generic FAQs per product (delivery, shared vs personal, payment, refund, warranty) |
| HowTo section | ✅ Present | 4-step purchase guide per product |
| Real user reviews | 🔴 Missing | AggregateRating is hardcoded; no actual review content. |

**Finding:** The long-form content block on every product page is essentially a Mad Libs template:
> "{group.brand} is one of the most sought-after premium subscriptions among Bangladeshi freelancers..."

Google's helpful content system may flag this as low-quality or duplicate-like content across 29 product pages.

### 4.2 Blog Posts

| Post | Word Count | Article Schema | Status |
|------|-----------|----------------|--------|
| best-ai-tools-bangladesh-2026 | ~1,200 | ✅ Yes | ✅ Strong |
| how-to-get-chatgpt-plus-bangladesh | ~1,000 | ✅ Yes | ✅ Strong |
| pay-ai-tools-bkash-bangladesh | ~1,100 | ✅ Yes | ✅ Strong |

**Gap:** Blog index queries `db.select().from(blogPosts)` at build time. In static export, this silently fails (no DB connection) and renders an empty "Articles coming soon" state. The 3 static posts exist as hardcoded routes but are **not discoverable from the blog index** unless manually navigated.

### 4.3 Comparison Pages

| Page | Word Count | FAQ Schema | Status |
|------|-----------|------------|--------|
| chatgpt-vs-claude | ~1,500 | ✅ Yes | ✅ Strong |
| chatgpt-vs-gemini | ~300 | 🔴 No | ⚠️ Thin |
| copilot-vs-cursor | ~300 | 🔴 No | ⚠️ Thin |
| midjourney-vs-ideogram | ~600 | ✅ Yes | ⚠️ Moderate |

### 4.4 Missing Pages

| Page | In Sitemap? | Source Exists? | Impact |
|------|-------------|----------------|--------|
| `/privacy` | ✅ Yes | 🔴 No | **High** — Legal requirement, trust signal |
| `/terms` | ✅ Yes | 🔴 No | **High** — Legal requirement, trust signal |
| `/search` | 🔴 No | 🔴 No | Medium — Referenced in WebSite schema SearchAction |
| `/bn` (Bangla) | In hreflang | 🔴 No | **High** — Broken hreflang, localization gap |

### 4.5 Streaming Services Gap

Metadata and copy mention **Netflix Premium** and **YouTube Premium**, but these products **do not exist** in `products.json` and have no product pages. This is either stale copy or a missing content category.

---

## 5. CWV / PERFORMANCE

### 5.1 Image Optimization

| Check | Status | Detail |
|-------|--------|--------|
| next/image usage | 🔴 None | Zero usage of `<Image>` from `next/image` |
| Plain `<img>` tags | ⚠️ Present | Blog index uses `<img loading="lazy">` but no srcset, no modern formats, no responsive sizing |
| next.config image settings | ✅ Configured | avif/webp, deviceSizes, cacheTTL — but largely irrelevant for static export without `<Image>` |
| OG images | 🔴 Missing | `/og/default.png` referenced but not present |
| Product hero images | 🔴 Missing | Colored CSS `<div>` placeholders instead of actual images |

**Impact:** LCP (Largest Contentful Paint) will suffer on product pages because the "hero image" is actually a CSS-colored div with text — not a real image that the browser can optimize. However, this avoids image download latency. The bigger issue is blog images: no responsive srcset means mobile users download desktop-sized cover images.

### 5.2 Font Loading

| Check | Status | Detail |
|-------|--------|--------|
| Font source | `next/font/google` (Inter) | ✅ Self-hosted subset |
| font-display | Implicit via Next.js | ✅ `swap` is injected automatically |
| Preconnect | `https://aipremiumshop.com` | ✅ Present |
| DNS-prefetch | `https://aipremiumshop.com` | ✅ Present |
| Bangla font support | Noto Sans Bengali missing | 🔴 No Bangla script support |

### 5.3 Performance Anti-Patterns

| Anti-Pattern | Severity | Detail |
|--------------|----------|--------|
| Database queries at build time | Medium | `blog/page.tsx` and `faq/page.tsx` query PostgreSQL/Supabase during `next build`. In static export, these fail silently and return empty arrays. Wastes build time and produces empty fallback states. |
| No code splitting indicators | Low | No `dynamic()` imports. All pages are fully server-rendered at build time, which is fine for static export. |
| Large CSS bundle | Low | Tailwind v4 with `@import "tailwindcss"`. The full utility CSS is generated; no PurgeCSS needed in v4, but bundle size depends on actual class usage. |

---

## 6. LOCALIZATION

### 6.1 hreflang Implementation

| Check | Status | Detail |
|-------|--------|--------|
| HTML `<link rel="alternate">` | ✅ Present | `en-BD`, `bn-BD` (?lang=bn), `x-default` |
| Sitemap `xhtml:link` | ✅ Present | Correctly formatted per URL |
| `bn-BD` route exists | 🔴 No | Points to `/?lang=bn` — query param only, no actual page |
| `/bn/products` route exists | 🔴 No | Sitemap references it, but no source file |
| `/bn/blog` route exists | 🔴 No | Sitemap references it, but no source file |

**Finding:** The hreflang implementation is **technically correct but functionally broken**. Google will crawl the `bn-BD` URLs, receive identical English content, and may demote the site's localization signals. For a Bangladesh market where ~60% of searches are in Bangla, this is a significant missed opportunity.

### 6.2 Bangla Content Presence

| Check | Status | Detail |
|-------|--------|--------|
| Bangla (বাংলা) text on any page | 🔴 Zero | 100% English content |
| Bangla keywords in meta | 🔴 No | Meta tags are English-only |
| Bangla schema (`inLanguage`) | ⚠️ Partial | Schema marks `availableLanguage: ["English", "Bengali"]` but content is English-only |
| Bangla support mentioned | ✅ Yes | Copy mentions "Bangla language support" for ChatGPT |

### 6.3 BD-Specific Signals

| Signal | Status | Detail |
|--------|--------|--------|
| bKash | ✅ Prominent | Mentioned on every page, in schema, in FAQs |
| Nagad | ✅ Prominent | Mentioned on every page, in schema, in FAQs |
| Rocket | ✅ Prominent | Mentioned on every page, in schema |
| BDT pricing (৳) | ✅ Prominent | All prices in Taka |
| Dhaka address | ✅ Present | Organization schema: `addressLocality: "Dhaka"` |
| +880 phone | ✅ Present | `+880-1865-385348` |
| WhatsApp support | ✅ Prominent | CTA on every page |
| Bangladeshi freelancer context | ✅ Present | Copy references Upwork, Fiverr, IELTS, local universities |
| Local bank cards | ✅ Present | Visa/Mastercard from DBBL, BRAC, etc. mentioned |

---

## Top 10 Highest-Impact Gaps

Scoring formula: **Impact (1–10) × Confidence (1–10) ÷ Effort (1–10)** = Priority Score

| Rank | Gap | Impact | Confidence | Effort | Score | Category |
|------|-----|--------|------------|--------|-------|----------|
| 1 | **Missing Privacy & Terms pages (404s in sitemap)** | 9 | 10 | 3 | **30.0** | Tech SEO / Trust |
| 2 | **Comparison pages lack FAQ/Article schema** | 6 | 10 | 2 | **30.0** | Structured Data |
| 3 | **Thin comparison pages (gemini, copilot)** | 7 | 10 | 3 | **23.3** | Content |
| 4 | **Headers/Redirects silently ignored in static export** | 8 | 10 | 4 | **20.0** | Tech SEO |
| 5 | **DB-dependent pages fail silently at build time** | 6 | 9 | 3 | **18.0** | CWV / Build |
| 6 | **No next/image usage (plain img tags only)** | 6 | 10 | 4 | **15.0** | Performance |
| 7 | **OG image `/og/default.png` does not exist** | 7 | 10 | 5 | **14.0** | On-Page SEO |
| 8 | **Product pages use templated duplicate-like content** | 7 | 10 | 6 | **11.7** | Content |
| 9 | **Zero Bangla content / broken bn-BD hreflang** | 9 | 10 | 8 | **11.25** | Localization |
| 10 | **Product title tag duplicates site name** | 5 | 10 | 1 | **50.0*** | On-Page SEO |

*Note: #10 has an outsized score because it's a 1-line fix with 100% confidence. It is included as a "quick win" despite lower absolute impact.*

If we exclude the trivial 1-line fix from the Top 10, the next highest scorer is:

| 10 (alt) | **Missing streaming services pages** (Netflix, YouTube Premium mentioned but not built) | 6 | 8 | 5 | **9.6** | Content |

---

## Quick-Win Action Plan

### This Sprint (1–2 days)
1. **Fix product title duplication** — remove the extra `\| AI Premium Shop` append in `buildProductMetadata` or `buildMetadata`.
2. **Add FAQPageJsonLd + HowToJsonLd** to `chatgpt-vs-gemini` and `copilot-vs-cursor` pages.
3. **Expand thin comparison pages** to 800+ words with feature tables and use-case sections.
4. **Create `/privacy` and `/terms` pages** — even basic policy text is better than a 404.
5. **Remove `/privacy` and `/terms` from sitemap** if pages cannot be built immediately (temporary mitigation).

### Next Sprint (1–2 weeks)
6. **Generate OG images** — create `/public/og/default.png` (1200×630) and product-specific OG images.
7. **Replace plain `<img>` with `<Image>`** from `next/image` on blog index and any future image assets.
8. **Diversify product page long-form content** — add unique use-case paragraphs per category (AI assistants vs design tools vs streaming).
9. **Fix DB-dependent static export** — either mock static data for blog/FAQ or switch to ISR for those routes.
10. **Document CDN header requirements** — translate `next.config.ts` headers into Cloudflare/nginx rules since static export ignores them.

### Backlog (1–2 months)
11. **Bangla localization** — create `/bn` route subtree with translated core pages and product summaries.
12. **Add real review system** or remove hardcoded `AggregateRating` to avoid Google penalty risk.
13. **Build missing streaming services** product pages (Netflix, YouTube Premium, Spotify, etc.).
14. **Create search page** or remove `SearchAction` from `WebSite` schema to avoid 404 reference.
15. **Add social profile URLs** to `OrganizationJsonLd.sameAs` (Facebook, WhatsApp Business, LinkedIn).

---

## Appendix: File Inventory

| File | Lines | SEO Role |
|------|-------|----------|
| `src/app/robots.ts` | 68 | Crawler directives |
| `src/app/sitemap.ts` | 108 | URL discovery + hreflang |
| `src/lib/seo/metadata.ts` | 179 | Meta tag factory |
| `src/components/seo/json-ld.tsx` | 355 | Structured data components |
| `src/app/layout.tsx` | 39 | Root layout + global schema |
| `src/app/page.tsx` | 399 | Homepage + FAQ/HowTo schema |
| `src/app/products/[slug]/page.tsx` | 325 | Product detail + 4 schema types |
| `src/app/products/page.tsx` | 100 | Product listing + Breadcrumb |
| `src/data/products.json` | 1,390 | 56 product variants, 29 groups |

---

*Report generated by Kimi Code CLI — 2026-05-20*
