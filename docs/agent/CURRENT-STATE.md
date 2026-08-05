# Current state

**Last updated:** 2026-08-05 (session 16, Opus 5)
**Branch:** main
**Deployed:** yes — merge commit `65eba1e` + follow-up, live on aipremiumshop.com

Read this file and `NEXT-SESSION.md` first. The root `CLAUDE.md` remains the
long-form session log; this is the short "where things stand" view.

## What is live and verified

| Thing | State | Evidence |
|---|---|---|
| `/product/higgsfield-ai-bangladesh` | Live, enquiry-only, 8,702 static chars (was 1,536) | curl'd after deploy; 1 h1, 9 h2, no Offer node, disclaimer present |
| Higgsfield compliance | Category F, CTA disabled | `docs/compliance/higgsfield-offer-review.md`, gated by `validate-higgsfield-offer.mjs` |
| Page-load white flash | Fixed | inline critical CSS in `index.html`; `docs/performance/page-load-flash.md` |
| `/ai-video` decision hub | Live, 3,770 static chars (was 1,112) | `src/sections/AIVideoHub.tsx` + prerender extraction |
| Homepage AI Video module | Live, 4,517 static chars (was 3,489) | `src/sections/AIVideoFeatureSection.tsx` |
| `/privacy` duplicate canonical | Fixed | both `/privacy` and `/privacy-policy` now canonicalise to `/privacy-policy` |
| `seo:check` | Passes clean (0 errors, 160 warnings) | `pnpm run seo:check` |

## Gates that now run

- `pnpm run build` → blog-price gate → **Higgsfield compliance gate** → vite build
  → prerender → prerender audit.
- `pnpm run seo:check` → 273 built pages: duplicate/missing titles and
  descriptions, H1 count, canonical host, soft-404 and placeholder text, leaked
  JS values, unsupported "official"/unscoped "unlimited", expired offer dates,
  malformed WhatsApp CTAs, `<img>` alt and dimensions, JSON-LD parse + fake
  rating + Offer-vs-compliance-state contradiction.
- `.github/workflows/seo-quality.yml` — on push/PR to the app, plus weekly so
  time-based expiry fails on its own.
- `.github/workflows/live-site-monitor.yml` — daily 08:30 Dhaka, content-based
  (not status-code-based) checks against production; opens a labelled issue on
  failure.

## Known-good numbers (do not retype these — derive them)

Catalog: 239 records, 157 distinct product slugs, 40 brand-page slugs, 272
sitemap routes, 273 built pages. All prices come from `data/products.json` via
`catalogStats.ts` / `tierPrice()` / `cheapestPriceFor()`.

## Pre-existing failures (NOT caused by session 16)

- `pnpm run typecheck` fails: `lib/api-client-react/dist` is not built, so 14
  TS6305/TS7006 errors in `AddToCartButton`, `CartButton`, `api-config` and
  `pages/admin/*`. `build` does not run typecheck, so this does not block deploy.
- `pnpm install --frozen-lockfile` fails at the workspace root: the lockfile's
  `overrides` do not match `figma-make-v2`'s. Use
  `pnpm install --filter ./artifacts/aips-landing --no-frozen-lockfile`.
- `validate-truth.mjs` reports ~127 unverified claims across the catalog. Real,
  and the biggest item is in BLOCKERS.md.
