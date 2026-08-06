# Current state

**Last updated:** 2026-08-07 (same-day session: evidence collection →
implementation → host/version consistency)
**Branch:** `seo/homepage-product-authority` — **5 commits, NOT pushed, NOT
merged, NOT deployed.** `main` is unchanged from commit `1e147bb`.

Read this file and `NEXT-TASK.md` first. `SITE-CONTEXT.md` and
`ARCHITECTURE.md` are the "understand the system" references — read those
once, not every session. `WORKLOG.md` is the full session-by-session log.

## What's on the branch, not yet live

| Commit | What |
|---|---|
| `6df67ed` | 404.html + `vercel.json` rewrite removal (soft-404 fix); prerender source-leak regex fix + `SOURCE_LEAK` seo-check gate; `/pricing`/`/about`/`/faq` metadata interpolation fix; `/best-ai-for-job-seekers` prerender collision fix; homepage solution-cards prerendering |
| `6bf90f2` | Unsupported outcome claims removed from the 6 solution cards |
| `60ad59d` | Binance removed sitewide (12+ files incl. the live AI concierge's own system prompt); 3 Bangla FAQ business-fact conflicts fixed |
| `115bc9b` | Docs for the above |
| (this session) | `artifacts/aips-website/src/app/robots.ts` hardened to disallow-all (defense-in-depth for an archived app); `BLOCKERS.md` B11/B12 |

Full evidence for every fix: `docs/homepage/executive-audit.md`.

## Verified, this session

- `pnpm run build` (in `artifacts/aips-landing`) — clean, 272/272 sitemap
  routes, 0 errors.
- `pnpm run seo:check` — 0 errors, 140 warnings (pre-existing categories,
  none new).
- `pnpm run typecheck` — same 14 pre-existing errors as always (unbuilt
  `lib/api-client-react`), zero new.
- `pnpm run validate:truth` — canonical facts intact.
- **Deployed a Vercel preview** (not production) and confirmed against real
  routing: unknown URLs now 404 (`Content-Disposition: filename="404.html"`),
  `/best-ai-for-job-seekers` has its own correct H1, `/pricing`/`/about` meta
  descriptions correct, homepage has all 6 solution cards, no Binance
  anywhere. Preview URL was in a session's earlier turn — re-deploy fresh
  before relying on it, preview URLs aren't durable.

## New finding this session: B11 (HIGH, open)

A decommissioned Next.js rebuild (`artifacts/aips-website`, archived
2026-07-30) has a **still-live, publicly crawlable deployment**
(`aips-website-two.vercel.app`) with no canonical tag, a permissive
`robots.txt`, and a stale catalog ("118+ tools", "3,000+ customers"). This is
the actual live source of the "conflicting indexed versions" pattern named in
every recent audit prompt. Fixing it requires a Vercel infrastructure action
(delete/unalias the project or deployment) that needs owner approval — not
resolved this session. See `BLOCKERS.md` B11 for full detail and options.

## Known-good numbers (do not retype these — derive them)

Catalog: 239 records, 197 distinct product slugs (157 `/product/<slug>` +
40 brand-page `/​<slug>`), 272 sitemap routes, 273 built pages. All prices
from `data/products.json` via `catalogStats.ts` / `tierPrice()` /
`cheapestPriceFor()` (components) or the parallel `CATALOG_STATS` object in
`scripts/prerender-products.mjs` (prerender — see `ARCHITECTURE.md` for why
these are two separate implementations of the same formulas, and why that's
the recurring source of drift bugs).

## Pre-existing failures (not caused by any session)

- `pnpm run typecheck` fails: `lib/api-client-react/dist` is not built → 14
  TS6305/TS7006 errors in `AddToCartButton`, `CartButton`, `api-config`,
  `pages/admin/*`. `build` doesn't run typecheck, doesn't block deploy.
- `pnpm install --frozen-lockfile` fails at the workspace root (lockfile
  `overrides` mismatch with `figma-make-v2`). Use
  `pnpm install --filter ./artifacts/aips-landing --no-frozen-lockfile`.
- `validate-truth.mjs` / `validate-catalog.mjs` report warn-level unverified
  claims (127 "warranty", 122 "unlimited", 118 "5-30 min", etc. — see
  `BACKLOG.md` #16 for the newest addition, 9 "#1"-type superlatives).

## Not done, and why

- Not pushed/deployed — needs your explicit go-ahead (see `NEXT-TASK.md`).
- B11 (stray live deployment) — infrastructure action, needs your approval.
- B1 (10,000+ customers), B2 (30-day warranty policy), B5 (44 shared-access
  products) — all owner decisions, unchanged.
- Higgsfield offer (BDT 1,199/~1,200 credits) — still unverified against the
  vendor; see `RESEARCH-CACHE.md` for exactly what needs checking before any
  of that work proceeds.
- No Playwright/browser smoke test exists (B9) — still the single biggest
  gap in the test suite.
