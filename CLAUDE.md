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


---

## Session 3 (2026-07-31/08-01) — what changed and what to know

**The deploy pipeline was broken and silently so.** `.vercel/project.json`
pointed at a decoy project named `aips-landing` whose production URL is `--`.
An entire session of "successful" deploys reached nothing. Correct project is
`ai-premium-shopai-premium-shop-aipai-premium-shops-landing`
(`prj_aP4bi30UW8mcHgBvU7E72yyFOPQd`). Deploy from the REPO ROOT with
`bash artifacts/aips-landing/scripts/deploy-live.sh --wait`. A `.vercelignore`
is required or the CLI uploads 2.7 GB and dies with "Upload aborted".

**HTTP 200 proves nothing here.** Every route returns the same 2,452-byte shell.
Verify by reading the rendered DOM in a browser, not by status code and not by
grepping source — a static SEO grep produced five findings, all false positives.

**Never type a price.** Seven separate places had drifted. Use
`cheapestPriceFor`/`tierPrice`/`stackTotal` (catalogStats), `bnTaka`/`bnFrom`
(banglaPricing), `formulaPrice`/`savingsVsDirect` (pricing). ৳1,495 is
`formulaPrice(10)` — the buy-abroad cost, repeatedly pasted as an AIPS price.
After fixing one, RE-READ THE PAGE: the same number is usually typed 2-4 times.

**Claims policy now consistent site-wide.** Savings are computed from
`officialUSD` and stated as fact. Income figures are stated as achievable, not
typical ("potential", "up to", with a variance note) — because the concierge is
forbidden from promising income and was contradicting the pages it linked to.

**Concierge guards are deterministic on purpose.** The prompt-leak screen and
the PIN/OTP warning run in code, not as prompt rules, because the 8B model
failed both when only instructed. Do not "simplify" them.

**Main bundle is 592 KB (was 852 KB).** `catalogStats` and `Navbar` now import
`data/catalog-lite.json` (23 KB) instead of the full 227 KB `products.json`.
Regenerate with `node scripts/generate-catalog-lite.mjs`; the validator fails
if it drifts.

### Highest-value open items
1. **No SSR** — content invisible without JS. Largest remaining architectural call.
2. **`artifacts/aips-website`** — parallel unused Next.js app with a diverging
   catalog. Archive or delete; it is a trap.
3. **BrandPage 160 KB / BlogPostPage 116 KB** chunks — same inline-content fix
   as catalog-lite.
4. **Conversation store inert** — needs `POSTGRES_URL` + `INSIGHTS_TOKEN`.
5. **Deploy cap** (100/24h, free plan) is now the binding constraint on iteration.
6. **Bangla prose** needs a native-speaker read; defects a machine can find are fixed.

---

## Session 4 (2026-08-02, Claude Sonnet 5) — Notion reconciliation, secret discovery, near-miss contained

**Notion is reachable now.** Connected via MCP this session and read the AIPS
Master Coordinator page (2026-07-30) and the Audit Checkpoint in full. The
coordinator page independently confirms this file's own numbers (129 plans /
87 slugs / 77 providers) and names a multi-chat model (Chat A=coordinator,
Chat B=repo/QA — this session acted as Chat B) with a next branch
`feat/aips-ssot-claim-price-guards`, which now exists and holds this session's
work. Full detail in `docs/AIPS_CURRENT_TRUTH.md` and
`docs/context/CONFLICT_LEDGER.md` (both new this session).

**A real secret is loose in Git history, not just theoretically.** `.env.local`
was committed at `c8ae002` (2026-07-26) carrying a real `NEXTAUTH_SECRET` and a
Supabase anon key. Gone from the current tree, permanently retrievable from
history. Values were never printed anywhere, including here. `.gitignore` did
not exclude `.env*` at all — fixed this session. Rotation is Emon/admin-only.

**A local commit almost deleted the whole app.** `ba7cb8f` on local `main`
(never pushed) wholesale-deleted the entire tree — looks like a "prepare
gh-pages content" operation that landed on the wrong branch. Caught before any
merge; tagged `preserved/local-main-ba7cb8f-pre-reset`, local `main` reset to
verified `origin/main`. No repo or production impact occurred.

**This session made its own stale-cache mistake and caught it.** An early
`git show origin/main:...` predating a `git fetch` reported the catalog at 80
records and `aips-website` as missing entirely. Both were wrong the moment the
fetch ran — true current numbers are 129 records / `aips-website` present with
6 `artifacts/` subdirectories total. Recorded plainly rather than silently
corrected, because it's the exact failure mode this whole reconciliation
effort exists to catch.

**GitHub Actions is billing-locked account-wide on `sysmoai`** — every
workflow (CI, both deploy workflows) fails in seconds regardless of code
correctness. Vercel's Git integration deploys independently and is unaffected.
Not something this session can fix.

**Concrete, safe fixes applied and committed to the feature branch (not
merged to `main`):** regenerated `public/llms.txt` from `products.json`
(cleared the validator's one hard failure), added `.env*` exclusion to
`.gitignore`. Nothing commercial, priced, or claim-related was changed.

### Next session should start with
1. `docs/context/resume.json` for the structured handoff.
2. Reconcile 41 validator brand-routes vs. 77 brands / 87 slugs (`src/App.tsx`, `src/lib/productRoutes.ts`).
3. Find what generates the live "3,000+ customers" / "87 Premium AI Tools" homepage copy and fix the unsupported customer-count claim at its source.
