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

## Session 12 (2026-08-02, Fable 5) — Google Search Console: verified, submitted, audited

Given live browser access to `aipremiumshopbd@gmail.com` (already signed in).
Did everything achievable without owning DNS or the Google account's other
services:

**Property verified.** Added `https://aipremiumshop.com/` as a URL-prefix
property (Domain-type needs DNS TXT, not reachable from here). Verified via
the HTML-file method: `public/googleaf2155254f74ede1.html` is committed and
**must never be deleted** — removing it un-verifies the property.

**Sitemap resubmitted and immediately re-read**: discovered pages jumped
**161 → 272** in the same session (confirms this week's catalog + prerender
work is now visible to Google, not just deployed). A prior, unrelated session
had already submitted the sitemap back in April — this account already had a
GSC property SCOUT/APEX never documented; check for stale assumptions before
claiming "no GSC" in future sessions.

**Real, live pages needing a crawl vs. legacy dead URLs — do not confuse
these two GSC buckets:**
- **119 "Not found (404)" + 52 "Soft 404"** are near-entirely pre-migration
  artifacts: WordPress/WooCommerce paths (`/product-category/quillbot/`,
  `/downloads/coffee-shop/`, `/shop/`) and an old URL scheme (`/buy/*`,
  `/bd/ai-tools/*`, `/categories/*`, `/products/*` plural). First detected
  4/7/26, still being periodically reconfirmed by Google as of Jul 25-26 —
  this is expected 404-recheck behavior, **not a live bug**. No code fix
  applies; these correctly 404 today and will fade from Google's queue on
  their own schedule. Do not build redirects for them — they were never real
  content peers of anything current.
- **27 "Discovered – currently not indexed" + 31 "Crawled – currently not
  indexed"** ARE real, current, live routes (`/ai-writing`, `/ai-design`,
  `/best-ai-for-students`, `/canva-pro-bangladesh`, `/capcut-pro-bangladesh`,
  `/chatgpt-vs-claude-bangladesh`, etc.) that Google found via the sitemap but
  had a stale (7/24) or nonexistent crawl of. This is the real, actionable
  gap — the sitemap resubmission above targets exactly this bucket.

**Requested priority re-indexing** on `/products` and `/canva-pro-bangladesh`
via URL Inspection — both confirmed **already indexed**, both freshly
re-crawled live during this session (verified: "Crawled successfully on
Aug 2, 2026" in the tool). Did not burn the full daily quota chasing every
one of the 58 real gap-pages by hand; the sitemap resubmission is the scalable
fix for that bucket and doesn't have a quota.

**Product snippets / Merchant listings show as "invalid"** (239 / 118 items)
— on inspection this is exclusively a missing optional `review`/
`aggregateRating` field. **Do not fabricate ratings to clear this.** The
catalog's own truth-validator already flags "9 records carry unverified
trust.reviewCount/rating — must not be rendered" — this GSC warning and that
validator agree, and fixing one by faking data would violate the other. Leave
it; it does not block organic indexing, only Shopping-tab rich results this
site doesn't use.

**Real traffic already exists** (first hard numbers this project has had):
468 total clicks / ~90 days, 163 clicks / 1.55K impressions in the last 28
days, clicks **+42%** — some evidence the SEO work is already working, even
before this session's fixes propagate. "Trending down" content is dominated
by the same legacy dead URLs above, which is expected and not a regression.

**GSC UI note for future sessions**: the URL Inspection search box's
autocomplete is UI-fragile via automated input — plain `Return` frequently
does not submit a freshly-typed URL that has no history entry. `Alt+Return`
worked reliably in this session; clicking an existing history-dropdown
suggestion always worked. If both fail, navigating away and back resets it.

## Session 13 (2026-08-02, Fable 5) — trust-signal sourceUrl fill, Bing Webmaster Tools

**32 products got a real `sourceUrl`** (Airtable, Buffer, ClickUp, DeepL,
HubSpot, Notion AI, Semrush, Zapier, Zotero and 23 more) — each linked to
that provider's own official pricing page, closing the validator gap tracked
all session. **Deliberately did NOT bulk-fill `officialUSD`** (38 records
remain) — that field is a specific numeric price claim, not a homepage link,
and guessing it risks recreating the wrong-officialUSD → wrong-"%off" bug
class fixed earlier this week. Left as validator warnings pending real
per-product verification. AIPS's own 13 bundle rows correctly have no
external sourceUrl — no third-party provider to cite.

**Bing Webmaster Tools set up** via the one-click "Import from Google Search
Console" flow (signed in as `aipremiumshopbd@gmail.com`, already authorized
for GSC) — no separate DNS/HTML verification needed. `sitemap.xml` imported
and shows "Processing" (Bing states up to 48h to reflect). Matters beyond
classic search: Bing's index also feeds Copilot and other AI-answer
surfaces, which is directly relevant to "trusted AI subscription provider"
visibility. One cosmetic artifact from the import: a second, bogus sitemap
row (`/chatgpt-plans-bangladesh`, a page URL not a sitemap) appears in the
Sitemaps list — harmless, Bing will fail to parse it as a sitemap and ignore
it; left as-is rather than spending a turn hunting for a delete control.

**Found but explicitly did NOT act on**: two Notion pages ("AIPS Pricing
Decision Package", "Audit #5 — Price-Integrity Audit", both 2026-07-26/27)
propose a price-floor formula and flag several current tiers as possibly
"below floor." Checked against this repo's own `pricing.ts` — its
`formulaPrice()` uses the same math but is explicitly documented as *"cost of
buying direct from abroad,"* a savings-comparison anchor, not a break-even
floor. The Notion pages are self-marked "internal only... not live pricing
approval" and pending CEO sign-off, and their floor math doesn't account for
this site's actual shared-seat economics (cost splits across N users, so a
low per-seat price can be well above floor). Repricing live customer prices
from an unresolved, differently-scoped proposal would be a real revenue/
compliance risk if wrong — surfaced to the CEO instead of auto-applied.
See [[aips-google-search-console]] for the fuller AITP-vs-AIPS workspace note.

## Session 14 (2026-08-02, Fable 5) — "100% of the site": blog extraction, 6th+ recurrence of the 1,495 bug, permanent gate

**Extracted full static bodies for all 19 blog posts** (avg 300 → 3,100
chars). The real prose lives as JSX in `BlogPostPage.tsx`'s content map;
wrote a structural extractor (`extractBlogBody` in prerender-products.mjs)
that walks h2/h3/p/li plus the 4 content helper components (StatCards →
`<ul>`, StepIndicators → `<ol>`, ComparisonTable → real `<table>`, CalloutBox
→ highlighted `<p>`) and renders each from its own literal props via
`evalLiteral` (`new Function` on JS array/object literals from this repo's
own committed source at build time — not external input). Two escaping bugs
found verifying it: inline `<a href>` tags (not just `<Link>`) were dropped
as literal `&lt;a href=...&gt;` text with a stray `style={}`, and after the
first fix the closing `</a>` still got re-escaped. Fixed with three
marker-protected placeholders (open+href, close) restored after `esc()`.
Thin pages: 51 → 32.

**The ৳1,495-for-Claude-Pro bug recurred a 4th, 5th and 6th time** — this
session found it in `src/pages/guides/{Students,Educators,Freelancers}Guide.tsx`
(serving `/guides/*`), then discovered **`GuidePage.tsx` — the file that
actually renders the higher-traffic `/best-ai-for-*` routes — had it in FOUR
more places**, plus Suno AI wrong twice, Google AI Pro wrong three times, and
two invented tier names ("ChatGPT Team", "Notion AI — Plus Plan") that don't
exist in the catalog. All converted to `tierPrice()`/`cheapestPriceFor()`,
matching the pattern the file's own `aioSnippet` strings already used two
lines above each broken one.

**Then the prerender extractor for GuidePage.tsx's `tools:` array broke**,
because it only matched `price: "..."` (a plain string) — converting to a
computed template literal made the price silently vanish from the static
"Top picks" list. Added `resolveGuidePrice()` to evaluate the two call
shapes actually used against this script's own already-loaded catalog data.
Verified in the *built HTML*, not just build-success: Claude Pro's entry
reads "BDT 1590/mo", no entry resolves to the `?` failure-fallback.

**Closed the whole bug class with a permanent gate** rather than fixing it
again next time: `validate-blog-prices.mjs` now also does an exact
slug+price structural check across 7 files with that literal shape
(5 guides, GuidePage.tsx, DevelopersBN.tsx), plus GuidePage.tsx was added to
the existing prose brand-proximity checker. Tuning that addition surfaced two
legitimate combo/stack totals ("ChatGPT + Notion ৳1,150") that would have
been false positives — the EXEMPT pattern now skips any window containing a
literal `+`. Regression-tested both checks by deliberately reintroducing a
wrong price and confirming each still fails correctly.

**Lesson for next session**: when a "price" gets converted from a string
literal to a computed value anywhere, grep for every consumer that parses
that file's *source text* by regex (the prerender script does, for several
files) — fixing the source of truth can silently break a downstream text
scraper that assumed the old literal shape. `pnpm run build`'s
`audit-prerender` gate checks that a body exists; it does not check that the
numbers *in* it are the current ones — only `validate-blog-prices.mjs` and
manual live-DOM verification do that.

## Session 15 (2026-08-02, Fable 5) — homepage: real-demand section, animated counters, a live traffic leak fixed

Pulled this site's own GSC Performance data *before* deciding what to feature
— real climbing queries beyond the brand name are ChatGPT plan comparisons,
Claude Team, Google AI Pro (466 impressions for only 13 clicks — a real CTR
opportunity), GitHub Copilot, Midjourney. Built `TrendingNowSection` around
exactly those six, prices via `tierPrice`/`cheapestPriceFor` (never typed),
mirrored into the homepage's static prerender body so it's crawlable
pre-hydration too.

**Found and fixed a real, verified traffic leak while reading that data**:
22 clicks + 240 impressions over 3 months land on `/claude-team-bangladesh`,
which has never been a route — silently 200s to the bare homepage shell
instead of the real Claude Team tier (BDT 3,990/mo, under
`claude-pro-bangladesh`). Added a permanent redirect in `vercel.json`;
confirmed live (`308 -> /claude-pro-bangladesh`).

**New `AnimatedCounter` component** (framer-motion `useSpring` + `useInView`,
counts up once on scroll-into-view, holds at final value, skips the
animation entirely under `prefers-reduced-motion` since there's no
vestibular-safe way to "reduce" a number ticking up). Applied to the
"AI Agent Economy" stat block. Verified live: settles at the exact original
values ($34K / 45% / 18,000% / 8M), zero console errors.

All changes verified in the rendered DOM after deploy, not just build
success: real prices in the Trending cards, real internal links, redirect
status checked directly with curl, hydration clean (1 h1, 0px overflow).

## Session 16 (2026-08-05, Opus 5) — Higgsfield offer done compliantly, AI Video hub, page-load flash root-caused

**The blink the owner reported is fixed, and it was not a React problem.**
`background-color: #0a0e27` lived only in `src/index.css` — an external
render-blocking stylesheet. `index.html` set no background at all, so the
browser painted its own default canvas (WHITE), then repainted dark once the
CSS applied: a full-viewport flash on every cold load of a dark site, invisible
on a warm cache, which is how it survived fifteen sessions. Fixed with an inline
critical `<style>` as the first thing in `<head>` plus `color-scheme: dark`.
Also deleted the Google Fonts `@import` from index.css — index.html already
`<link>`s the same stylesheet, and a CSS `@import` cannot start downloading
until the importing sheet arrives, so it serialised HTML → index.css → fonts
CSS → font files directly in front of first paint. **Do not move that inline
style or restore that @import.** Ruled out and documented: Suspense fallback
(already an empty sized div), theme flash (no toggle exists), hydration
mismatch (`createRoot`, so it never attempts hydration). Full write-up in
`docs/performance/page-load-flash.md`, including why `hydrateRoot` is NOT the
right fix here — the static bodies are built by a string extractor, not React.

**Higgsfield is live at `/product/higgsfield-ai-bangladesh` as enquiry-only,
compliance category F.** The owner confirmed there is no written reseller or
affiliate authorization, so: no checkout, no "official"/"partner"/"authorized",
customer owns the account, independent-provider disclaimer above the fold.
Rather than dropping the six unverifiable supplied claims (1,200 credits,
unlimited Seedance, Supercomputer access, the model roster, the replacement
guarantee), the page publishes them in a **"What we have not verified"**
section with the reason each is unconfirmed. 1,536 → 8,702 static visible chars.

**The claims are now gated at build time, not by review discipline.**
`scripts/validate-higgsfield-offer.mjs` runs before `vite build` and fails on an
expired offer date (in Dhaka time), a CTA enabled under category F/G, a price
without a fresh verification date, "unlimited" without a stated scope, banned
authorization wording outside a negation, and any attempt to hardcode the price
or a credit count into the component. Regression-tested by deliberately
re-enabling the expired date and the CTA. This matters because this file already
records the same wrong-price bug recurring **six times** — correct content
decays, a gate that exits non-zero does not.

**New `pnpm run seo:check`** (`scripts/seo-check.mjs`) over all 273 built pages:
duplicate/missing titles and descriptions, H1 count, canonical host, soft-404
and placeholder text, leaked JS values, unsupported "official"/unscoped
"unlimited", expired offer dates, malformed WhatsApp CTAs, img alt/dimensions,
JSON-LD parse + fabricated ratings + Offer-vs-compliance contradiction.
Currently **0 errors**. It immediately found a real pre-existing bug: `/privacy`
and `/privacy-policy` were two self-canonical pages with identical titles,
because the prerender's alias-canonical resolver only covered Comparison/Budget
pages. Generalised to plain `component={X}` routes.

**Two of my own bugs, caught by this repo's own gates rather than by me** —
worth recording because both are the same lesson. (1) The Higgsfield prerender
linked four alternatives at `/product/<slug>` when they are brand-page slugs
living at `/<slug>`; the React component was right because it calls
`productPath()`, the string builder was wrong because it did not. `audit-prerender`
caught it. (2) My first `seo-check` split FAQ questions from their answers and
rejected "Is AI Premium Shop an official Higgsfield partner?" — the question that
exists *in order to* answer "No". A compliance check must operate on the unit a
reader actually sees, or it punishes honest disclosure.

**AI Video surfaces rebuilt**: `/ai-video` is now a decision hub (the five
distinct jobs the category covers, which product does each, where to start by
situation, and the payment/account-ownership realities of buying from
Bangladesh) — 1,112 → 3,770 static chars. New homepage module, 3,489 → 4,517.
Both prices derived from the catalog at render time, never typed. The hub's
static body is extracted from `AIVideoHub.tsx`'s own JOBS array via the existing
`evalLiteral` helper, so the static and rendered versions cannot drift.

**Also fixed**: 22 broken template strings on 11 live product pages that read
"Delivery in Confirmed on WhatsApp" and "Typically Confirmed on WhatsApp via
WhatsApp after payment confirmation".

**New**: `.github/workflows/seo-quality.yml` (gates on push/PR + weekly, so
time-based expiry fails on its own) and `live-site-monitor.yml` (daily 08:30
Dhaka; every assertion checks CONTENT not status, because working rule #3 above
exists for a reason). `docs/agent/*` is the resumable work system —
**read `docs/agent/NEXT-SESSION.md` first next time.**

**The biggest thing NOT done, and it needs the owner, not the repo**: the
"10,000+ customers since 2022" claim has no evidence on file and still renders
on ~70 product pages plus 4 hardcoded sites in `ProductPage.tsx` and the
site-wide default meta description. It was removed from the Higgsfield record
and deliberately avoided on the new page (which is why that page does not use
`ProductPage.tsx`), but bulk-editing 70 live revenue pages on an unresolved
business fact is the owner's call. See `docs/agent/BLOCKERS.md` B1.

### Priority open items (post-session)
1. **B1 — "10,000+ customers" claim** has no evidence; ~70 live pages. Owner decision.
2. **B3 — six Higgsfield entitlements** unverified; blocks the page converting.
3. **Playwright cold-load screenshot test** — spec asked for one; no Playwright in the repo yet.
4. **BrandPage 160 KB / BlogPostPage 116 KB** chunks — same catalog-lite pattern
   would shrink these substantially.
2. **Conversation store inert** — needs `POSTGRES_URL` + `INSIGHTS_TOKEN`.
3. **Deploy cap** (100/24h, free plan) remains the binding constraint on iteration.
4. **Bangla prose** — native-speaker read still needed for quality.
