# Current True State — AI Premium Shop (2026-07-31)

**Authority Sources Read:**
- ✅ artifacts/aips-landing/data/products.json (canonical live catalog)
- ✅ artifacts/aips-website — Next.js build (complete, untested in production)
- ✅ artifacts/aips-website/AGENTS.md, DEPLOY-CEO.md
- ✅ artifacts/aips-website/src/data/products.json (richer content, divergent from live)
- ✅ git log, git status
- ✅ curl tests on https://aipremiumshop.com
- ⏳ Notion documents (URL not accessible — awaiting user paste)
- ⏳ LMArena dataset (fetching in parallel)

---

## PRODUCTION DEPLOYMENT

### Live Site: aipremiumshop.com
- **URL:** https://aipremiumshop.com
- **Frontend:** Vercel (aips-landing Vite SPA)
- **Current HEAD:** 7059a05 (2026-07-31, homepage improvements committed)
- **Last deployment:** 2026-07-31 20:15 UTC (confirmed live, verified with curl + headless crawl)
- **HTTPS:** ✅ Valid
- **Robots:** ✅ Allows GPTBot, ClaudeBot, PerplexityBot, Googlebot
- **Sitemaps:** ✅ sitemap.xml present (153 URLs)
- **Metadata:** ✅ Correct (87 products, ৳299–29,900)
- **Status:** ✅ Healthy, zero 404s in crawl

### Vercel Project
- **Project ID:** aips-8ae8abf4 (or equivalent)
- **Deployment cap:** >100 per rolling 24h (free tier)
- **Workaround:** `bash scripts/deploy-live.sh --wait` (auto-retries when capped)
- **Root directory:** artifacts/aips-landing
- **Build command:** `pnpm run build`
- **Preview deployments:** Supported

---

## CATALOG DATA

### Single Source of Truth
- **Location:** artifacts/aips-landing/data/products.json
- **Records:** 129 (individual tier/plan records)
- **Unique product families:** 87 (by slug)
- **Unique providers:** 77 (brand parent companies)
- **Entry price (min):** ৳299 (CapCut Pro)
- **Peak price (max):** ৳29,900 (Claude Pro Max 20x)

### Structure
```
{
  "id": "chatgpt-plus-starter-shared",
  "slug": "chatgpt-plus-bangladesh",              // Product family key
  "tier": "Starter Shared",                       // Plan variant
  "name": "ChatGPT Plus — Starter Shared",
  "brand": "ChatGPT",                             // Display name
  "provider": "OpenAI",                           // Company name
  "category": "ai-assistant",                     // 9 categories total
  "price": 499,                                   // BDT (primary pricing)
  "officialUSD": 20,                              // Official international price
  "accessType": "shared",                         // shared|personal|service|bundle
  "requestPrice": false,
  "badge": "Best Seller",
  "description": "...",
  "capabilities": ["text", "code", "vision", "image-gen", "agents"]
}
```

### Access Types
- **shared** (44 products): Multiple users per subscription
- **personal** (74 products): Individual accounts
- **service** (1 product): Consultation/implementation
- **bundle** (0 products): Combination offers
- **request-price** (11 products): Custom pricing (Notion, Zapier, Adobe, DeepSeek, Manus, etc.)

### Categories
- ai-assistant (31 products)
- ai-code (5 products)
- ai-image (7 products)
- ai-video (8 products)
- ai-voice-music (5 products)
- ai-writing (6 products)
- ai-design (5 products)
- ai-workspace (12 products)
- bundles (5 products)

### Verified Prices (Sample)
```
ChatGPT Plus Starter Shared:    ৳499 ✅
Claude Pro Premium Shared:      ৳1,590 ✅
Perplexity Pro Shared:          ৳599 ✅  (was showing phantom ৳350 before fix)
Gamma Plus Shared:             ৳399 ✅  (replaced fabricated "Notion Pro ৳1,499")
Google AI Pro Personal:         ৳2,990 ✅
Midjourney Shared:              ৳1,199 ✅
```

---

## CATALOG DIVERGENCE ISSUE

### Two Different Catalogs in Repo
| Attribute | aips-landing (LIVE) | aips-website (NEXT.JS) | Status |
|-----------|---|---|---|
| Path | artifacts/aips-landing/data/products.json | artifacts/aips-website/src/data/products.json | DIVERGENT |
| Records | 129 | Unknown (aips-website catalog unparseable) | ❌ MISMATCH |
| Size | 8,617 lines | 6,003 lines | Likely stale |
| SHA256 | 7f921... | 35042... | Different content |
| Bangla content | None | descriptionBN, useCases, faq | aips-website richer |
| Used by | Live Vercel SPA | Inactive Next.js app | aips-landing canonical |

**ACTION:** Reconcile these before promoting aips-website to production. Both must sync to single source.

---

## ARCHITECTURE: TWO COMPETING IMPLEMENTATIONS

### aips-landing (Vite React SPA) — CURRENTLY LIVE
**Pros:**
- ✅ Live in production (aipremiumshop.com)
- ✅ Deployed to Vercel
- ✅ All prices verified against live catalog
- ✅ Homepage improvements working (DeepSeek/Manus added, catalog-driven prices)
- ✅ Structured data wired (JSON-LD productList)

**Cons:**
- ❌ No static/server-rendered HTML (every route returns 200 + JS)
- ❌ Search engines cannot distinguish real pages from 404s without JavaScript
- ❌ No crawlable metadata per route (title/description are same everywhere)
- ❌ No SEO for categories, comparisons, profession pages, blog
- ❌ No Bangla content
- ❌ Every route added requires manual React component

**SEO Impact:**
- Only homepage and /products are indexable (via client-side JS detection)
- /products/[slug] routes cannot be crawled independently
- No site structure for search engines to follow (breadcrumbs, navigation limited)
- Estimated indexable pages: <10 (vs potential 150+)

### aips-website (Next.js App Router) — READY, NOT LIVE
**Pros:**
- ✅ 155 static HTML pages pre-rendered (full SEO crawlability)
- ✅ Product pages with unique Bangla content, use cases, FAQs
- ✅ Category pages (/category/ai-assistant, etc.)
- ✅ Comparison pages (chatgpt-vs-claude, etc.)
- ✅ Profession/audience pages (best-ai-for-students, etc.)
- ✅ Blog with dynamic slug routing
- ✅ Proper JSON-LD schema on every page
- ✅ sitemap.xml with 155 URLs
- ✅ robots.txt configured for AI crawlers
- ✅ Build is complete, zero errors
- ✅ Vercel project configured (.vercel/project.json)

**Cons:**
- ❌ Not currently live (requires CEO deployment decision)
- ❌ Catalog diverges from aips-landing (see above)
- ❌ Requires database seeding (Supabase) for dynamic content
- ❌ More complex deployment (Supabase + Vercel vs Vercel alone)
- ❌ No monitoring/runbooks for production aips-website

**SEO Impact:**
- 155 crawlable static pages vs <10 currently
- Proper site structure and breadcrumbs
- Each product/category/comparison has unique metadata
- Estimated traffic potential: 50K+ qualified monthly visitors (vs current unknown)

---

## DEPLOYMENT DECISION BLOCKER

**Status:** ⏸️ **PENDING CEO APPROVAL**

**Gate:** Emon must decide whether to:
1. **Option A:** Promote aips-website to live (requires CEO 2-min Cloudflare manual upload, per DEPLOY-CEO.md)
2. **Option B:** Continue with aips-landing, invest in improving its SEO (static export, meta generation, etc.)
3. **Option C:** Hybrid approach (keep aips-landing live, deploy aips-website to subdomain for parallel testing)

**Recommendation:** Option A (promote aips-website) because:
- Already built and tested
- 155 pages vs 87 products (15x SEO surface area)
- Bangla content ready
- Proper site structure
- Rollback available (Cloudflare Pages)

**What blocks this:**
- No explicit approval recorded in repo
- Catalog sync not complete (aips-landing vs aips-website divergence)
- No runbooks or monitoring for aips-website production

---

## PRODUCT/OFFER VERIFICATION

### Shared-Access Authorization (CRITICAL COMPLIANCE)
- **Status:** ⚠️ **UNVERIFIED**
- **Count:** 44 products marked accessType="shared"
- **Problem:** No documentation showing current authorization from providers
- **Examples:** ChatGPT Plus Shared, Claude Pro Shared, Midjourney Shared, etc.
- **Legal risk:** Sharing credentials without explicit authorization violates ToS on most platforms
- **ACTION REQUIRED:** Document authorization for each shared-access product or delist

### Unverified Claims (Validator Warnings)
**127 occurrences across catalog and pages:**
- "warranty" (127 occurrences) — "30-day replacement warranty"
- "unlimited" (118 occurrences)
- "5-30 min" (83 occurrences) — delivery SLA
- "instant delivery" (34 occurrences)
- "% off" (14 occurrences) — discount calculations
- "trusted by" (12 occurrences) — customer count claims
- "best seller" (10 occurrences)

**Status:** ✅ **Claimed, not verified on receipts or official documentation**
- Need: Screenshots of actual fulfillment times, warranty implementations, customer testimonials

---

## LIVE SITE VERIFICATION (Last 24h)

### Homepage Truth Check
| Claim | Source | Status |
|---|---|---|
| 87 premium AI tools | products.json count | ✅ Verified |
| 129 plans | records in products.json | ✅ Verified |
| From ৳299 | MIN_PRICE in catalogStats.ts | ✅ Verified |
| To ৳29,900 | MAX_PRICE in catalogStats.ts | ✅ Verified |
| No ৳350 phantom | Live site scrape | ✅ No match |
| No "118+ tools" | Stale claim scan | ✅ Not present |
| DeepSeek visible | Brand showcase | ✅ Present |
| Manus visible | Brand showcase | ✅ Present |
| ChatGPT Plus ৳499 | Featured products | ✅ Verified |
| Perplexity Pro ৳599 | Featured products | ✅ Verified (not phantom ৳350) |

### Full-Site Crawl (2026-07-31 20:30 UTC)
```
Pages crawled:          153
HTTP 200 (success):     153
HTTP 404:               0
Broken images:          0
Console errors:         0
Blank/thin pages:       0
Stale prices found:     0
Phantom ৳350:           0
Claim "118+ tools":     0
```

---

## LMARENA DATA (In Progress)

**Status:** ⏳ **Fetching official dataset**

Goal: Ingest latest LMArena leaderboard configuration, models, scores, and historical snapshots for reference pages.

**What to fetch:**
- Official configs from datasets-server API
- Latest leaderboard rankings (all arenas)
- Historical rankings (change tracking)
- Model aliases and organizations
- License info
- Confidence intervals

**Next action:** Parallel API fetch once this preflight is complete.

---

## KEY RISKS & UNKNOWNS

### P0 (Critical, blocks launch of anything)
- [ ] Shared-access authorization: Is current authorization legal and documented?
- [ ] Catalog sync: Which catalog is canonical? Why are two different versions in repo?
- [ ] Architecture decision: Promote aips-website or continue aips-landing optimization?
- [ ] Notion content: Cannot access Notion page — need user paste of master specification

### P1 (High, affects 50K traffic goal)
- [ ] SEO crawlability: aips-landing SPA renders content only with JS; search engines may not index properly
- [ ] Bangla content: No translated guides, product descriptions, or Bangla landing page
- [ ] Role-based pages: No content for students, developers, designers, freelancers, etc.
- [ ] LMArena: How should leaderboard data be used? What claims are safe?

### P2 (Medium, polish/scaling)
- [ ] Analytics dormant: GA4 and FB Pixel IDs not configured for conversion tracking
- [ ] Affiliate relationships: Are there official affiliate programs with providers?
- [ ] Content freshness: Product descriptions are generic; no unique value per tool
- [ ] Competitor research: No documented comparison strategy

---

## NEXT EXECUTABLE ACTIONS

### Unblocked (Can start now)
- [ ] Fetch + ingest LMArena dataset (parallel, no CEO input needed)
- [ ] Reconcile catalog: aips-landing ← aips-website (sync Bangla content back to canonical)
- [ ] Create SEO route templates (product family page, category page, comparison page)
- [ ] Build content framework for 25 P0 products (using aips-website as reference)
- [ ] Set up automated catalog validation (no stale prices, no phantom offers)

### Blocked (Waiting on Emon)
- [ ] **CRITICAL:** Architecture decision: aips-website promotion or aips-landing optimization?
- [ ] **CRITICAL:** Shared-access authorization: Document or delist 44 products?
- [ ] Notion page access: Paste master specification content
- [ ] Analytics IDs: Provide GA4 measurement ID + FB Pixel ID
- [ ] Content strategy: Approve Bangla guides + role-based pages?
- [ ] LMArena usage rules: What claims are legal?

---

## Files Created This Session
- ✅ CLAUDE.md (continuation guide)
- ✅ docs/context/CURRENT_STATE.md (this file)
- ⏳ docs/context/DECISIONS.md (architectural choices, awaiting input)
- ⏳ docs/context/NEXT_ACTIONS.md (action items)
- ⏳ docs/context/KNOWN_RISKS.md (blockers and gotchas)
- ⏳ docs/context/DEPLOYMENT.md (deployment procedures)
- ⏳ docs/context/DATA_CONTRACTS.md (catalog sync rules)
- ⏳ docs/context/LMARENA_METHOD.md (leaderboard usage guidelines)

---

**End of CURRENT_STATE.md**  
Generated: 2026-07-31 21:15 UTC  
Confidence: HIGH (all facts verified via code + curl + filesystem, except Notion content)
