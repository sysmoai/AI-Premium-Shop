# Claude Code Continuation Guide — AI Premium Shop

**Last Updated:** 2026-07-31  
**Author:** Claude (Haiku 4.5)  
**Current Branch:** main  
**Current HEAD:** 7059a05  
**Live Deployment:** aipremiumshop.com  

---

## Purpose

This file preserves context for future Claude Code sessions so work can continue without losing decisions, blockers, or architectural choices.

**Update this file after every session. Never let context drift from reality.**

---

## Current State (as of 2026-07-31)

### Repository
- **Canonical app:** `artifacts/aips-landing` (Vite + React SPA)
- **Inactive app:** `artifacts/aips-website` (Next.js, not live)
- **Branch:** main (production-ready)
- **Live URL:** https://aipremiumshop.com
- **Last commit:** 7059a05 (homepage improvements: catalog-driven featured products, DeepSeek/Manus added, structured data wired)

### Product Data
- **Total products:** 87 distinct
- **Total tiers/plans:** 129
- **Price range:** BDT ৳299–29,900
- **Access models:** shared (44 records), personal, request-price (11 products)
- **Catalog location:** `data/products.json`
- **Source of truth:** catalogStats.ts (all prices/counts derived from products.json, never hardcoded)

### Known Issues from Previous Work
1. **SPA SEO limitation:** Every unmatched route returns HTTP 200 and renders client-side. Search engines cannot distinguish real pages from 404s without client-side JS.
2. **LMArena sync:** Not yet implemented. Leaderboard data must be fetched via official datasets-server API.
3. **Content coverage:** Generic descriptions across products. No Bangladesh-specific guides. No role-based recommendation pages.
4. **Shared-access authorization:** 44 products marked "shared" but authorization evidence not documented.
5. **Compliance debt:** 127 unverified claims ("warranty", "instant delivery", "trusted by") flagged by validator.

### Deployment Constraints
- **Vercel plan:** Free tier. Deploy cap: >100 deployments per rolling 24h, shared by CLI and Git integration.
- **Solution:** Use `bash scripts/deploy-live.sh --wait` to auto-retry when capped.

### Working Rules (Non-Negotiable)
1. **Never hardcode catalog numbers.** Every price/count must come from `catalogStats.ts`.
2. **Verify on live domain**, not locally. CSP headers and other Vercel-specific behavior are invisible in dev.
3. **HTTP 200 ≠ rendered.** Blank `/pricing` shipped to production because HTTP 200 was the only signal.
4. **Measure before claiming.** If you state a number, price, or "it's fixed," prove it with screenshots/curl.
5. **After editing products.json:** Run `node scripts/generate-concierge-catalog.mjs` and commit `api/_catalog.json`.
6. **Deploy with gates:** `bash scripts/deploy-live.sh` runs validator → typecheck → build before spending a deploy slot.

---

## Next Executable Actions

### Immediate (Session 2)
- [ ] Stage 0 Preflight: Truth and architecture gates
  - [ ] Verify all 87 products in catalog match live site
  - [ ] Verify all prices on live site match products.json
  - [ ] Check if aips-website (Next.js) is reachable; document its state
  - [ ] Assess SPA crawlability for SEO routes
  - [ ] Fetch LMArena dataset via official API; ingest latest + historical

### Unblocked (No CEO Decision Needed)
- [ ] Create SEO route architecture for products, categories, comparisons
- [ ] Build automated LMArena sync pipeline
- [ ] Create content template for product families (with Bangladesh context)
- [ ] Implement AI tool selector (quiz-based recommendation)
- [ ] Set up Preview deployment for feature branches

### Blocked (Waiting on CEO/Ops)
- [ ] Shared-access authorization: which 44 products have current legal authorization?
- [ ] LMArena usage: what claims can we make about leaderboard data?
- [ ] Content strategy: role-based pages (students, developers, designers, etc.)?
- [ ] Analytics setup: GA4 and FB Pixel IDs for conversion tracking?
- [ ] Next.js vs Vite: promote aips-website as canonical frontend?

---

## Key Contacts & Resources

- **Emon Hossain (CEO/Founder)**
  - Email: tarique.hassan777@gmail.com
  - WhatsApp: +8801865385348
  - Decisions needed: shared-access auth, content strategy, Next.js promotion, analytics IDs

- **GitHub:** github.com/sysmoai/AI-Premium-Shop (private repo, user: emonhossain)
- **Vercel:** aips-landing project, aipremiumshop.com domain
- **Notion:** (URL not accessible to Claude in CLI; user must provide page content)

---

## Session History

### Session 1 (2026-07-30, Fable 5 + Desktop Claude)
- Fixed 30+ stale prices/counts across 6 sections
- Removed phantom "৳350" entry price, fabricated "Notion Pro ৳1,499" product
- Added DeepSeek (#4 globally) and Manus (agentic AI) to showcase
- Wired structured data to featured products array for SEO consistency
- Deployed live to aipremiumshop.com; verified with headless crawl (153 pages, 0 errors)

### Session 2 (2026-07-31, Current)
- Committed homepage improvements (7059a05)
- Beginning Stage 0 Preflight: truth, compliance, architecture gates
- Creating documentation framework for continuity

---

## How to Resume

1. Read this file (CLAUDE.md)
2. Read `docs/context/CURRENT_STATE.md` (live facts)
3. Read `docs/context/DECISIONS.md` (architectural choices)
4. Read `docs/context/KNOWN_RISKS.md` (blockers and gotchas)
5. Run `git status` and `git fetch` (check for parallel work)
6. Check `docs/context/NEXT_ACTIONS.md` for what's unblocked

**Never assume memory is correct. Always verify facts with `git log`, `curl`, and actual file reads.**
