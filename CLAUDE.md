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

## Session 4 (2026-08-02, Fable 5) — full-universe coverage closed to 84%

PR #4 merged to main: (1) measurement pass over the 467-tool universe — sellable
coverage was 232/356 = 65%, 129 missing, evidence in `data/coverage/`; (2) batch
3 of 68 request-price additions (CEO option B — no prices published, ever).
Catalog is now **185 distinct products / 227 records**; sitemap 259 URLs.
Coverage: **300/356 = 84%**. The 61 exclusions are documented with reasons in
`data/coverage/triage-2026-08-02.md` — the remaining real gaps are blocked on
CEO decisions: 12 ATLAS bundles need composition+pricing, Turnitin needs a
licensing call. v0.dev Pro was a coverage-matcher miss (already sold at ৳999);
the add-script's duplicate guard caught it. Adobe Creative Cloud / Express are
admitted via a narrow exact-name allowlist over the brand-prefix guard.

## Session 4b (2026-08-02) — bundles live, /product routes prerendered

CEO directives executed: 12 ATLAS entries added (9 AIPS bundles with their
compositions + BuddyPro/ChatAid/HelloFrank), all request-price since every
ATLAS price observation is UNVERIFIED — confirming a price later is a
one-field change. **Turnitin permanently declined by CEO — do not re-propose.**
Catalog: **197 products / 239 records**, sitemap 271 URLs. Fixed two hard
validator failures that piped exit codes had masked: stale index.html head
(117→197 tools, 3,000+→10,000+ customers) and out-of-sync llms.txt.

**SEO: the "no SSR" blocker is now half-solved.** `pnpm run build` runs
`scripts/prerender-products.mjs`, which writes real static HTML (title, meta,
canonical, BreadcrumbList/FAQPage JSON-LD, readable body) for all 157
`/product/<slug>` routes into dist; Vercel serves files before the SPA
rewrite, createRoot hydration replaces them for users. Verified live:
raw HTML contains content, hydration clean, no console errors. Head format
mirrors ProductPage.tsx's seo block — keep them in sync. Brand/category/guide
routes are still empty shells — extending prerender to them is the next lever.

## Session 4c (2026-08-02) — /products master list upgraded

Audit grounded in Notion (SYS — Problem Library: scam fear, activation delays,
plan confusion, payment friction; SEO & AIO Keyword Universe: BN/Banglish/EN
clusters by intent — token in ~/.cortex-sync.env). Shipped and verified live:
search (?q=), persona quick-filters (?for= — students/freelancers/developers/
marketers/creators/teachers/business, matched on capabilities+category so new
products join automatically, each linking to its guide), and real crawlable
links from cards to product pages via productPath() — the master list went
from ~5 to 799 product anchors. catalog-pages.json now carries capabilities.
KNOWN NIT: the h1 doesn't yet reflect persona/search filters (only
category/access) — fix with the next deploy, don't spend a slot on it alone.

## Session 5 (2026-08-02, Claude Code) — Full prerender complete + aips-website deprecated

**Prerender extended to ALL routes — 269 static HTML pages.** Previously only
/product/*, brand pages, and categories had prerendered content. Now covers:
best-ai-for-* (9), guides/* (6), comparisons (5), budget (4), Bangla (7),
info pages (12), and blog posts (18). All ~43 previously-blank routes now serve
real static titles, meta descriptions, canonical links, and readable body
content BEFORE hydration. The `writeRoute()` helper was reused consistently.

**`artifacts/aips-website` flagged as DEPRECATED** with a marker file. Its Git
link was already removed 2026-07-30; the marker just prevents future sessions
from trying to deploy it. The canonical app is `artifacts/aips-landing`.

**Blog posts hardcoded** in the prerender script (18 posts matched to
BlogPage.tsx). If new posts are added to BlogPage.tsx, add their slug/title to
the BLOG_POSTS array in `scripts/prerender-products.mjs`.

## Session 6 (2026-08-02, Fable 5) — verified session 5's claim, fixed blog-slug drift

Session 5's "269 pages" was measured against the sitemap: 18 URLs were NOT
covered. The hardcoded BLOG_POSTS array used invented slugs — 14 static pages
shipped at non-routes (soft-404 on hydration with self-canonicals) while the
14 real post URLs stayed blank. Fixed by parsing slugs/titles/excerpts from
BlogPostPage.tsx's ALL_POSTS_META at build time (parse, never retype). Added a
sitemap-driven fallback sweep so any uncovered sitemap URL gets a safe generic
page — caught /chatgpt-plans-bangladesh, /chatgpt-plans-comparison-bangladesh,
/google-ai-pro-bangladesh. Build now asserts **271/271 sitemap coverage**.
Verified live: real blog slugs serve real titles, wrong slugs serve only the
shell.

## Session 7 (2026-08-02, Fable 5) — blog taxonomy, nav/footer overhaul, homepage ticker

Full-site pass per CEO directive: audited for stale info (none found — all
counts already catalog-derived), then shipped:
- `src/lib/blogTaxonomy.ts` — 10 blog categories, single source read by
  BlogPage's new URL-synced filter (`?category=`), Navbar's new Blog
  mega-menu (desktop) + accordion (mobile), and PageFooter's new Blog &
  Guides column (6-col grid now, was 5). This is the scaffold
  `docs/BLOG_365_ROADMAP.md` grows into for the 365+ blog plan — every new
  post just needs a `categoryKey`, no UI work.
- `src/lib/topBrands.ts` — brand/href/price computation shared between
  Navbar's Popular Brands and the Hero's ticker (previously Navbar computed
  it privately, Hero had a separate plain-text, price-less, link-less brand
  list). Hero now shows a "🔥 MOST WANTED this week" marquee of real
  BrandIcon + name + live catalog price chips, pauses on hover.
- `.btn-cta` (used site-wide) gained a one-shot shine sweep on hover; Navbar's
  Order Now switched from a duplicated inline gradient to this shared class.
- `docs/BLOG_365_ROADMAP.md` — category quotas from the Notion Keyword
  Universe, Q1 topic bank (~90 posts), per-post checklist, explicit warning
  against mass template-generated thin content.

All verified live (not just build-clean): ticker prices confirmed against
catalog, `/blog?category=strategy` returns correct filtered title/h1/cards,
footer Blog column renders, zero console errors. **Local dev preview
(`preview_start` on `aips-landing`) was unreachable from this environment's
Bash tool** (connection refused on the same port the Browser pane reported
started) — verification was done against the live deploy instead, as in
every other cycle this session.

## Session 8 (2026-08-02, Fable 5) — homepage prerender, canonical fix, audit gate

Three defects found by reading the *built HTML* — none were type, catalog or
build errors, so every existing gate passed them:

1. **The homepage was the only route still serving an empty `<div id="root">`.**
   The fallback sweep skips `/` by design and no section covered it, so the
   single most important URL was invisible without JS while 271 others had
   content. Now prerenders 4.3 KB: hero headline, catalog-derived counts and
   entry prices, real category list with live counts, six persona guides, and
   the 8 FAQs parsed out of Home.tsx, plus FAQPage JSON-LD.
2. **Alias routes self-canonicalised.** `/chatgpt-vs-claude-bangladesh` and
   `/best-ai-budget-bangladesh` render the same component+key as their
   primary route and the components declare one shared canonical; the
   prerenderer ignored that, creating competing self-canonical pages with
   identical titles. Canonicals are now parsed from ComparisonPage/BudgetPage
   and matched to routes parsed from App.tsx.
3. **framer-motion was inlined into every route chunk** that used it. Hoisted
   to a `motion` manualChunk: entry chunk 176 KB → 137 KB gzipped, and ~39 KB
   no longer re-downloads on each navigation.

**`scripts/audit-prerender.mjs` now gates `pnpm run build`** (so it gates
production deploys). It reads built HTML and hard-fails on missing static
files, empty root divs, missing title/canonical/description, conflicting
canonicals, and duplicate titles with competing canonicals. All three bugs
above were this shape. 271/271 pass.

**NOTE for the next session:** the prerender script's homepage block
overwrites `dist/public/index.html`, which is also the template it reads at
the top. Running `node scripts/prerender-products.mjs` standalone twice bails
with a clear message — always use `pnpm run build`.

**Assessed and deliberately NOT done:** splitting `BRAND_META` (171 KB of
source in BrandPage.tsx, 41 brands × ~4 KB) into per-brand dynamic imports.
It has a single consumption point so the refactor is easy, but it trades one
38 KB chunk for a smaller chunk *plus a serial round trip* — likely net-worse
on the high-latency mobile connections this audience uses, and it adds a
loading flash to the 40 highest-converting pages. Revisit only with real
field data (needs GA4, which the CEO has deferred).

## Session 9 (2026-08-02, Fable 5) — the ৳1,495 bug again, on seven surfaces

**Claude Pro was quoted at BDT 1,495 across the blog** — ProductBox card, an
h2, two comparison tables, the meta description, Bangla body copy, and the
excerpt duplicated in BOTH BlogPage.tsx and BlogPostPage.tsx. Claude's real
tiers are 599 / 1,590 / 2,990 / 3,990 / 14,950 / 29,900. The site was
overstating its own entry price by 2.5×. **1,495 IS a real price — GitHub
Copilot Pro — which is why it survived review and kept being re-pasted.**
Also fixed "ElevenLabs Creator — BDT 748" on three posts (748 is Starter;
Creator is 3,490).

Structural fixes so this class cannot recur:
- **`ProductBox` no longer accepts a price string.** It takes a slug (+
  optional tier) and reads from `tierPrice`/`cheapestPriceFor`. All 23 call
  sites migrated; a hand-typed price is now a compile error.
- **`scripts/validate-blog-prices.mjs` gates the build** for prose, which
  can't be catalog-derived. It flags a BDT figure whose nearest preceding
  brand lacks that price. Attribution is deliberately conservative — skips
  ranges, savings, totals, official/abroad costs, quoted scam prices, and any
  figure with another figure between it and the brand. It went 24 findings →
  3 → 0 during tuning; every one of the 21 dropped was a false positive. A
  noisy gate gets muted, and a muted gate catches nothing.

Also fixed this session:
- **Empty blog categories rendered an unrelated post as "featured"** — my own
  `?? POSTS[0]` fallback from session 7. "Voice & Music AI" (0 posts) showed
  an "AI Video" post under its heading. Now a real empty state.
- **`/guides/educators` linked to `/best-ai-for-educators`**, which has never
  been a route. The guide→picks mapping now validates against routes parsed
  from App.tsx. `audit-prerender` now fails on ANY broken internal link
  (regression-tested by breaking one deliberately).
- **First Voice & Music post written**, filling the last empty category.

## Session 10 (2026-08-02, Fable 5) — real device bugs, found by measuring

Every one of these was invisible in the source and only showed up by
measuring rendered geometry at real viewport widths. **Read the class list and
you would call all three correct.**

1. **The mobile menu button was clipped off-screen at 375px.** The header row
   needed 406px of a 375px screen: px-4 + a `flex-shrink-0` 234px wordmark +
   gap-6 + the 116px button group + px-4. The group ran x=274→390, so the
   hamburger — the only route into navigation on mobile — was partly
   unreachable. Fixed: small wordmark below `lg`, `gap-2 lg:gap-6`.
   Now ends at x=359.
2. **Tablet pushed the document 32px wider than the viewport.** At 768px the
   testimonial carousel becomes `md:grid md:grid-cols-3` (232px tracks) but
   every card had `style={{ minWidth: 280 }}` — an **inline style, which no
   `md:` class can override**. Now `min-w-[280px] md:min-w-0`.
3. **The new NeuralDivider cropped every node out of frame.** A square
   `0 0 100 100` viewBox with `slice` in a 1440×72 band scales 14.4× and shows
   a ~5%-tall sliver — only stray lines, no nodes. viewBox is now `0 0 200 10`
   to match the band's own ~20:1 ratio.

**Tap targets:** the three mobile header controls were 36×36 (below every
guideline, and below the 44px this codebase already commits to elsewhere) —
now 44×44. Same for "Browse This Tier" (×5), Offers "Order" (×6), ProductBox
"Order" (16px tall) and breadcrumbs (20px), all now 44px on mobile.

**Verified after deploy at 375 / 768 / 1440:** 0px overflow on all three, on
`/` and `/products`. Remaining sub-40px elements are the decorative
`aria-hidden` ticker chips and card-title links inside fully clickable cards —
not real targets.

**`NeuralDivider`** is the site's AI motif in one reusable component: inline
SVG (no request, crisp at any DPI, inherits brand colours), percentage
geometry so it needs no breakpoints, opacity-only animation, fully disabled
under `prefers-reduced-motion`. Placed at two homepage seams only — a repeated
ornament stops reading as an accent.

## Session 11 (2026-08-02, Fable 5) — thin-page sweep: 102 → 51

The audit's "short static content" list was dominated by the highest-value
URLs. Fixed by deriving bodies from data that already exists:
- **40 brand pages**: BN description, tier prices, USPs, use cases, merged
  deduped FAQs + FAQPage JSON-LD, all from products.json (~2 sentences → ~2 KB).
- **4 budget pages**: now list every product whose cheapest tier is under the
  threshold parsed from their own slug (21 under ৳500) — regenerates each build.
- **9 best-ai-for-\* pages**: real h1, "why" prose, ranked picks with reasons,
  FAQs + JSON-LD, parsed from GuidePage.tsx's GUIDES config. NOTE: three keys
  there are quoted ("designers") and six are bare (students) — parse both.

Remaining 51 short pages are older blog posts/info pages with hand-written JSX
bodies a regex cannot safely lift — heads/excerpts correct, hydration carries
full text. Verified live: all three classes serve rich static HTML, hydration
clean (1 h1, no leftover), 0px overflow, no console errors.

### Priority open items (post-session)
1. **BrandPage 160 KB / BlogPostPage 116 KB** chunks — same catalog-lite pattern
   would shrink these substantially.
2. **Conversation store inert** — needs `POSTGRES_URL` + `INSIGHTS_TOKEN`.
3. **Deploy cap** (100/24h, free plan) remains the binding constraint on iteration.
4. **Bangla prose** — native-speaker read still needed for quality.
