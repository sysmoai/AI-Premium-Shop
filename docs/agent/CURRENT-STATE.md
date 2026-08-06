# Current state

**Last updated:** 2026-08-07 (same-day session: evidence collection →
implementation → host/version consistency → catalogue integrity → vendor
compliance mechanics → Higgsfield verification → superlative-claims cleanup)
**Branch:** `seo/homepage-product-authority` — **10 commits, NOT pushed, NOT
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
| `94632bc` | `artifacts/aips-website/src/app/robots.ts` hardened to disallow-all (defense-in-depth for an archived app); `BLOCKERS.md` B11/B12 opened |
| `6c4673e` | `validate-catalog.mjs` shared-vs-personal price sanity check (found a real Midjourney anomaly, BACKLOG.md #18); `docs/agent/OWNER-ACTIONS.md` with exact Vercel evidence/commands; B11's root-cause corrected |
| `3571606` | Docs checkpoint |
| `f807fb5` | `docs/compliance/vendor-matrix.csv` skeleton (37 vendors); flagged (not rewritten) generic shared-account-safety language per B5 |
| `e500209` | Higgsfield offer verified against the vendor's actual current terms + 2 blog posts; found a real unit-economics red flag; wired new verified facts into the live page (not just docs) |
| `f54b472` | All 9+ unverified "#1"/superlative claims fixed across 4 files, cross-checked against arena.ai's live leaderboard rather than assumed |

Full evidence for the first 4 commits: `docs/homepage/executive-audit.md`.
For Higgsfield: `docs/higgsfield/offer-evidence.md` +
`docs/agent/RESEARCH-CACHE.md`. For vendor compliance:
`docs/compliance/vendor-review.md`.

## Verified, this session

- `pnpm run build` — clean, 272/272 sitemap routes, 0 errors (checked after
  every commit above, not just once).
- `pnpm run seo:check` — 0 errors throughout.
- `pnpm run typecheck` — 15 pre-existing errors, unchanged (corrected from
  an earlier "14" — that was an off-by-one miscount in an earlier turn's
  summary, not a real change; confirmed no Higgsfield/superlative-fix files
  appear in the error list).
- `pnpm run validate:truth` — canonical facts intact; superlative warnings
  now 0 (was 9).
- `node scripts/validate-catalog.mjs` — 0 hard failures, 17 warnings.
- `node scripts/validate-higgsfield-offer.mjs` — still OK, 6 pending claims
  (contents refined, not just count-preserved).
- A Vercel preview was deployed and checked against real routing in an
  earlier turn — not re-deployed since (only doc/script/data changes since
  then that don't need a fresh preview to reason about, except the
  Higgsfield page changes, which build cleanly but haven't been checked on
  a live preview specifically — worth a fresh preview before production).

## Open owner-decision items (nothing below is blocking further safe work)

- **B11** — stray live duplicate deployment (`aips-website-two.vercel.app`).
  Exact commands: `OWNER-ACTIONS.md` OA1.
- **B12** — 2-hop `www` redirect, low priority. `OWNER-ACTIONS.md` OA2.
- **BACKLOG #18** — Midjourney "Pro Shared" priced above its own personal
  tiers — confirm error or intentional.
- **BACKLOG #20** — is "Claude Opus 4.6" still the model Anthropic's Claude
  Pro consumer plan actually gives access to? Removed the false "#1 ranking"
  claim attached to it; the model-version question itself is separate and
  unresolved.
- **docs/higgsfield/unit-economics.md** — the proposed BDT 1,199/~1,200-
  credit Higgsfield offer's margin doesn't obviously reconcile with the one
  vendor price found ($49/mo). Needs owner-supplied real cost inputs before
  this offer can be considered launch-ready — table of exactly what's needed
  is in that doc.
- B1 (10,000+ customers), B2 (30-day warranty policy), B5 (44 shared-access
  products, now has a matrix skeleton — `docs/compliance/vendor-matrix.csv`
  — but every vendor's actual terms are still "Unverified") — unchanged.

## Known-good numbers (do not retype these — derive them)

Catalog: 239 records, 197 distinct product slugs (157 `/product/<slug>` +
40 brand-page `/​<slug>`), 272 sitemap routes, 273 built pages. All prices
from `data/products.json` via `catalogStats.ts` / `tierPrice()` /
`cheapestPriceFor()` (components) or the parallel `CATALOG_STATS` object in
`scripts/prerender-products.mjs` (prerender — see `ARCHITECTURE.md`).

## Pre-existing failures (not caused by any session)

- `pnpm run typecheck` fails: `lib/api-client-react/dist` is not built → 15
  TS6305/TS7006 errors in `AddToCartButton`, `CartButton`, `api-config`,
  `pages/admin/*`. `build` doesn't run typecheck, doesn't block deploy.
- `pnpm install --frozen-lockfile` fails at the workspace root (lockfile
  `overrides` mismatch with `figma-make-v2`). Use
  `pnpm install --filter ./artifacts/aips-landing --no-frozen-lockfile`.
- `validate-truth.mjs` / `validate-catalog.mjs` report warn-level unverified
  claims (127 "warranty", 122 "unlimited", 118 "5-30 min", etc.) — long-
  standing compliance debt, not new.

## Not done, and why

- Not pushed/deployed — needs your explicit go-ahead.
- Owner-decision items above — genuinely not mine to resolve unilaterally.
- Systematic full-site sweep of conflicting business facts — only pages
  this session happened to touch got checked; no exhaustive pass.
- Audience pages beyond job-seekers (fixed) and content-claims cleanup
  (this session, incidentally, touched several) — no dedicated re-audit of
  students/freelancers/creators/business/developers pages individually.
- No Playwright/browser smoke test exists (B9) — still the single biggest
  gap in the test suite; still not started.
- `docs/compliance/payment-methods.md` (bKash/Nagad/Rocket merchant-status
  documentation) — not created; `RESEARCH-CACHE.md` has the source URLs.
- The branch is now 10 commits and hasn't been pushed, previewed as a
  whole, or reviewed end-to-end since commit 6 — worth a fresh preview
  deploy + full-branch visual/functional pass before considering production.
