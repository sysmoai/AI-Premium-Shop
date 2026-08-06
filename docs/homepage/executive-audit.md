# Executive audit — evidence collection session

**Date:** 2026-08-07
**Scope:** Evidence collection only. No application code touched. Verified
against a fresh `pnpm install --filter ./artifacts/aips-landing --no-frozen-lockfile`
+ `pnpm run build` + `pnpm run seo:check` (all green) and against live
`https://aipremiumshop.com` by curl, at commit `1e147bb`.

This session was triggered by an external "master execution prompt" listing
a long set of hypothesised problems (soft-404 routing, Binance compliance,
broken price interpolation, Job Seeker/Student content overlap, business-fact
conflicts, homepage section not server-rendered, etc.). Rather than assume
the prompt's snapshot was current, every claim was re-verified against this
repo and production today. Findings below are split into **confirmed and
still live**, **already fixed** (prompt was stale), and **newly discovered**
(not in the prompt, found while checking it).

## Confirmed live, not yet tracked anywhere in `docs/agent/`

### F1 — Every unknown URL returns HTTP 200 serving the homepage (HIGH, sitewide SEO)

```
curl -sI https://aipremiumshop.com/this-route-definitely-does-not-exist-xyz123
→ HTTP/1.1 200 OK, Server: Vercel, X-Vercel-Cache: HIT
```

Same result for `/products/otter-ai-bangladesh` (note: plural `/products/`,
not this app's real `/product/:slug` pattern — Otter.ai is not in the
catalog at all under either path). This is not route-specific; it is Vercel's
SPA rewrite serving `index.html` for anything unmatched, with **no 404
status**. Every soft-404 on the site is currently indexable as if it were the
homepage. `docs/agent/BLOCKERS.md`/`BACKLOG.md` have no entry for this.

**Likely fix location:** `vercel.json` rewrite rule (`artifacts/aips-landing/vercel.json`)
needs a catch-all that still serves the SPA shell for real client routes but
lets genuinely unmatched paths 404, or a build-time list of valid paths
checked before the rewrite. Needs investigation, not a blind rewrite change —
this app's routing is client-side (wouter, per `App.tsx`), so a naive "just
404 unknown paths" would break deep-linking into real routes if the valid-path
list is incomplete. Scope this deliberately next session.

### F2 — Binance is live as an accepted payment method sitewide (HIGH, compliance)

```
curl -s https://aipremiumshop.com/ | grep -o '.\{120\}[Bb]inance.\{120\}'
→ "bKash, Nagad, Rocket, Bank Transfer, and Binance (crypto). No international
   credit card needed." — present both in visible FAQ text and FAQPage JSON-LD.
```

Bangladesh Bank's 2022 circular restricts virtual-asset transactions; this repo
has no `docs/compliance/payment-methods.md` and no written legal sign-off on
file for crypto payment. Not referenced in `BLOCKERS.md`. This is a direct hit
on the master prompt's "BINANCE RULE" and it is real, current, and sitewide
(homepage FAQ text + JSON-LD at minimum — a full sweep of product pages,
`/how-to-order`, and Bangla pages was not done this session).

### F3 — `/pricing` meta description has two empty interpolations (MEDIUM, SEO)

```
grep -oE ".{40}tools from BDT[^<]{0,40}" dist/public/pricing/index.html
→ "...Bangladesh. tools from BDT . bKash/Nagad payment. AI Premium Shop..."
```

Source: `src/pages/PricingPage.tsx:62`
```ts
description={`Compare all AI subscription prices in Bangladesh. ${TOTAL_PRODUCTS} tools from BDT ${MIN_PRICE}. bKash/Nagad payment. AI Premium Shop 2026.`}
```
Both `TOTAL_PRODUCTS` and `MIN_PRICE` (imported from `@/lib/catalogStats`)
render empty in the **prerendered/static** output — reproduced in a fresh
local build, so this is a current code bug, not stale cache. Appears 3× per
page (title, meta description, OG description likely). This is the exact
"tools from BDT ." defect the master prompt quoted — it is real today, not a
stale claim. The repo's own `resolveGuidePrice()` helper in
`scripts/prerender-products.mjs` exists precisely because plain Node prerender
scripts can't import the TS `catalogStats.ts` module used at runtime — the
`/pricing` route's meta description was evidently never routed through an
equivalent extraction step. One-file fix once scoped.

### F4 — `/best-ai-for-job-seekers` serves the Students page's H1/content in its prerendered HTML (HIGH, content integrity)

Root-caused, not just observed:

```
curl -s https://aipremiumshop.com/best-ai-for-job-seekers | grep -oE "<h1[^>]*>[^<]*</h1>"
→ <h1>Best AI Tools for Students in Bangladesh 2026</h1>
```
Reproduced in a fresh local build (`dist/public/best-ai-for-job-seekers/index.html`)
— not a stale-cache issue. Title tag and canonical are correct
(`Best AI for Job Seekers Bangladesh 2026` / self-referencing), only the H1
and body content are wrong.

**Root cause:** `scripts/prerender-products.mjs:488-495`, function `guideBlock(key)`:
```js
let start = guideSrc.indexOf(`  ${key}: {`);
if (start < 0) start = guideSrc.indexOf(`  "${key}": {`);
```
`GuidePage.tsx` has **two** places matching `  "job-seekers": {` — the
`GUIDE_ICONS` lookup map at line 24 (`"job-seekers": { Icon: Search, color:
"#6366f1" },`), and the real content block at line 286
(`"job-seekers": { slug: ..., h1: "Best AI Tools for Job Seekers...", ... }`).
`indexOf` returns the **first** match (the icon map, line 24) because
`"job-seekers"` — unlike `students`, `freelancers`, `designers`, etc. — must
be quoted in *both* places (it's not a valid bare JS identifier), so it's the
only `GUIDE_META` key that collides with the icon map's quoted-key pattern.
The mis-bounded block then runs to the next `\n  },`, which lands deep inside
`GUIDES.students`, and `blk.match(/h1:\s*"([^"]+)"/)` picks up that block's
h1. Confirmed by direct reproduction:
```js
node -e '...guideBlock("job-seekers")...'
→ start matches line 24 (icon map); block length 6589 chars; h1 match =
  "Best AI Tools for Students in Bangladesh 2026"
```
The live interactive React app (post-hydration) reads `GUIDES[guideKey]`
directly and would show the correct content — this bug is specific to the
prerendered/pre-hydration paint, but that is exactly what crawlers and the
anti-flash shell show first. Precise, well-scoped fix: make the `guideBlock`
lookup key on the object's actual field content (e.g. anchor on `slug:
"best-ai-for-job-seekers"` inside the block) instead of a bare substring
search that can hit an unrelated earlier object.

### F5 — Homepage's "Find Your Solution" section is not in the prerendered static HTML (MEDIUM, SEO/architecture)

```
grep -c "Find Your Solution" dist/public/index.html   → 0
grep -c "Find Your Solution" <(curl -s https://aipremiumshop.com/) → 0
```
The section is real and well-built — `src/sections/PainPointSection.tsx`,
eyebrow "Find Your Solution", H2 "Every Problem Has an AI Solution", six
audience cards (students/freelancers/creators/business/job-seekers/developers)
each with headline, problem bullets, solution copy, and a "See X Solutions"
CTA. It renders correctly for real users after hydration. It is simply absent
from the static/prerendered homepage body that `scripts/prerender-products.mjs`
writes (build log: `prerender: homepage written (8 FAQs, 9 featured brands)` —
no mention of this section). Every other major section on this site gets this
treatment (guides, brand pages, FAQs); this one was missed. This matches the
master prompt's "HOMEPAGE SERVER RENDERING" concern precisely.

## Already fixed — master prompt's snapshot was stale here

- **Higgsfield broken template strings** ("Delivery in Confirmed on WhatsApp") —
  fixed in session 16 (2026-08-05), verified: 0 matches live today. See
  `docs/agent/WORKLOG.md` session 16 entry.
- **About page "Founded in 2024" vs homepage "since 2022"** — both surfaces
  now say "since 2022" consistently. No conflict found today.
- **About page "3,000+ customers" vs homepage "10,000+"** — both surfaces now
  say **10,000+** consistently (not 3,000+ anywhere checked). The real,
  still-open issue is that 10,000+ has no evidence on file — already tracked
  as `BLOCKERS.md` **B1**, unchanged status. The master prompt's specific
  numbers were a stale audit snapshot; the underlying trust problem it was
  pointing at is real and already correctly identified by this repo's own
  process.

## Verified healthy

- `pnpm run build` — clean, 0 errors, prerender wrote 272/272 sitemap routes.
- `pnpm run seo:check` — 0 errors, ~160 warnings (mostly unscoped "unlimited"
  claims and thin legacy pages — already triaged per `CURRENT-STATE.md`, not
  re-litigated this session).
- Production is on `main`'s current HEAD (`1e147bb`) — the repo's own
  drift-check (`curl .../product/higgsfield-ai-bangladesh | grep -c "What we
  have not verified"` → `1`) passes.
- Catalog numbers (239 plans, 197 tools) are still derived from
  `data/products.json` via `catalogStats.ts`, not hardcoded, on the pages
  checked.

## Not checked this session (scope was evidence collection, time-boxed)

Binance sweep beyond the homepage (product pages, `/how-to-order`, `/bn`),
full six-page content-quality scorecard for the `best-ai-for-*` pages beyond
the H1 check, payment-logo asset audit, Bangla homepage completeness
(session 17 already substantially rebuilt this — see `NEXT-SESSION.md`, which
is stale and should be re-read against actual `/bn` state before assuming
its "still outstanding" list is current), accessibility pass, animation/motion
audit, Core Web Vitals measurement.

## Recommended next bounded session

F1 (soft-404) and F2 (Binance) are the two highest-severity items and are
both independent, scoped, one-topic changes — see updated `BACKLOG.md`. F3 and
F4 are small, well-diagnosed one-file fixes if a session has room after F1/F2.

---

# Implementation session — 2026-08-07 (same day, follow-up)

**Branch:** `seo/homepage-product-authority` (local only — not pushed, not
deployed). Triggered by a second, more detailed master prompt from the owner
explicitly asking for P0/P1 implementation, not just audit. All five findings
above (F1-F5) were fixed, plus a full Binance-removal sweep and a set of
unsupported-claim removals the second prompt asked for directly.

## What changed (3 commits on the branch)

1. **`fix(prerender,seo): stop soft-404s, source leaks, and broken
   metadata`** — F1, F3, F4, F5, plus two more hardcoded Binance strings and
   an unscoped "50% faster" claim found while editing these files.
2. **`fix(content): remove unsupported outcome claims from solution cards`**
   — the six "Find Your Solution" cards' `solution:` copy (30-minutes-flat
   assignments, 50%-faster delivery, zero-copyright-issues music,
   zero-burnout automation, AI-built CVs, every-language-supported coding).
3. **`fix(payments,compliance): remove Binance sitewide; fix Bangla FAQ
   conflicts`** — every Binance mention found in a full-repo case-insensitive
   grep (12 source files + `data/products.json`'s 70 near-identical FAQ
   answers + `public/llms.txt`), including the **live AI concierge chatbot's
   system prompt and objection-handling knowledge base**, which were
   actively instructing the model to tell customers Binance was accepted —
   arguably the highest-impact single fix in this session, since it's
   dynamic behavior no static content audit would have caught. Also fixed
   three Bangla FAQ answers carrying numbers that conflicted with the rest
   of the site (founding year, tool count, a stale ChatGPT Plus price, a
   "#১" superlative claim) and one unsupported safety-by-customer-count
   clause.

## New findings during implementation (not in the original F1-F5 list)

- **Confirmed the "pricing page source leak" P0 hypothesis** from the second
  master prompt — reproduced, root-caused to a regex quote-pairing bug (see
  commit 1), fixed generally (not patched for this one page), and gated by a
  new `SOURCE_LEAK` check in `seo-check.mjs` per that prompt's explicit
  "add a regression test" instruction.
- **`/ai-video`'s "Payment" paragraph had its own independent hardcoded
  Binance mention** in `scripts/prerender-products.mjs`, separate from the
  `AIVideoHub.tsx` component text — a real duplicate-source-of-truth drift
  instance, exactly the pattern both master prompts warn about.
- **`data/brand.json` and `scripts/generate-llms-txt.mjs` each carry their
  own independent, duplicate payment-methods list** — a fourth and fifth
  copy beyond the ones already fixed. `generate-llms-txt.mjs` additionally
  hardcoded `founded: 2024`, conflicting with the site's established "since
  2022" used everywhere else. Both fixed; the deeper "payment methods have
  no single source of truth" architecture problem is now `BACKLOG.md` #15
  (not solved this session — a real refactor, correctly out of scope for a
  bounded session).
- **Catalogue-plan-mismatch hypothesis (Midjourney Mega / Runway Unlimited /
  Perplexity Max) checked and NOT reproducible** — all three price/tier
  correctly on both the raw catalog and live rendered pages, consistent with
  prior fix commits already in git history (`fc38e57`, `d38e494`). The
  master prompt's hypothesis here was stale.
- **9 pre-existing "#1"/unverified-superlative claims** flagged by
  `validate:truth` in files not touched this session
  (`BestAISubscriptionPage.tsx`, `BrandPage.tsx` ×4, `CategoryPage.tsx`,
  `ComparisonPage.tsx` ×2) — real, not fixed here, added to `BACKLOG.md`.

## Verification

- `pnpm run build` — clean, 272/272 sitemap routes, 0 errors.
- `pnpm run seo:check` — 0 errors, 140 warnings (down from 160 baseline;
  same pre-existing categories, none new).
- `pnpm run typecheck` — same 14 pre-existing errors as documented in
  `CURRENT-STATE.md` (unbuilt `lib/api-client-react`), zero new ones.
- `pnpm run validate:truth` — "canonical facts intact (since 2022, 10,000+
  customers, no banned self-claims)"; the 9 superlative warnings above are
  pre-existing, not introduced.
- `pnpm run validate` (catalog) — same warning categories/counts as before
  (warranty, unlimited, delivery-time, `commercialStatus`/`verificationDate`
  gaps) — all pre-existing per `BLOCKERS.md`/`CURRENT-STATE.md`, not
  reopened or worsened by this session.
- Manually verified in the built `dist/public` output: job-seekers H1,
  pricing/about/faq meta descriptions, absence of the source-code leak,
  presence of the six solution cards in the homepage's static HTML, 404.html
  content and `noindex`, and a full case-insensitive `Binance` grep across
  `dist/public` returning zero matches.

## Explicitly not done this session

- **Not pushed, not merged, not deployed.** Production deployment needs a
  preview + explicit owner go-ahead per both master prompts' deployment-gate
  requirements — see `docs/homepage/deployment-readiness.md`.
- F1's `vercel.json` rewrite removal is the one change with residual
  deployment risk that can't be fully verified from a local build — it
  depends on Vercel's documented "serve root 404.html for unmatched paths"
  behavior for a `framework: null` static deployment. Flagged for explicit
  attention in the preview-verification step.
- Did not touch: `BLOCKERS.md` B1 (10,000+ customers evidence), B2 (30-day
  warranty written policy), B5 (44 shared-access products' authorization),
  B9 (no Playwright/browser smoke test — still the only gap that would have
  caught a render-breaking bug), the 9 new superlative-claim warnings, or
  the payment-methods single-source-of-truth refactor. All added to
  `BACKLOG.md` in priority order.
