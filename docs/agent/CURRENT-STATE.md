# Current state

**Last updated:** 2026-08-07 (7th turn: **DEPLOYED TO PRODUCTION**)
**Branch:** `seo/homepage-product-authority` merged to `main` (merge commit
`feaac91`), pushed to `origin/main`, and deployed live to
**https://aipremiumshop.com** via `vercel --prod`. 19 commits total shipped.

## Production deployment — verified live, 2026-08-07

```
✓ vercel --prod --yes  →  ▲ Aliased  https://aipremiumshop.com
✓ Homepage <head> states real product count (197) and entry price (299)
✓ No phantom stale claims (118+, ৳350)
✓ /api/concierge healthy: {"ok":true,"products":197,"keyConfigured":true}
✓ Key routes 200: / /products /pricing /blog /claude-pro-bangladesh
✓ Unknown URL → real HTTP 404 (was 200-homepage before this session — F1)
✓ /best-ai-for-job-seekers → correct H1 (was Students' H1 — F4)
✓ Zero Binance mentions anywhere
✓ Zero fabricated-testimonial content
✓ hreflang correct + reciprocal on a real paired page
```

Everything this whole session found and fixed is now live for real
customers. Pre-deploy gate caught one issue: `validate-catalog.mjs`
reported `public/llms.txt` out of sync — regenerated via
`node scripts/generate-llms-txt.mjs`, turned out to be a no-op (content was
already correct, `git add` found nothing to stage) but worth having caught
it rather than assumed.

**Not yet done post-deploy:** the reminder `deploy-live.sh` itself prints —
"HTTP 200 does not prove this SPA rendered... for a full check of
rendered text/console errors, run the headless crawl." No headless
browser check was run against the live production site this turn (curl-
based checks only). Low risk given the extensive local+preview
verification already done throughout this session, but worth noting the
gap explicitly rather than silently.

---

**Prior state (pre-deploy), for reference:**

Read this file and `NEXT-TASK.md` first. `SITE-CONTEXT.md` and
`ARCHITECTURE.md` are the "understand the system" references. `WORKLOG.md`
is the full session-by-session log — long at this point, read the most
recent entries first.

## What's on the branch, not yet live — grouped by theme

**Routing/rendering (F1-F5):** real 404.html, source-code-leak regex fix,
`/pricing`/`/about`/`/faq` metadata fix, job-seekers prerender-collision
fix, homepage solution-cards prerendering.

**Compliance:** Binance removed sitewide (12+ files incl. the live AI
concierge's system prompt); vendor-compliance matrix skeleton (37 vendors,
all unverified by construction); Higgsfield offer verified against the
vendor's actual current terms (found the account-ownership model is
*required* by ToS, not just cautious; found a real unit-economics red flag
in the proposed BDT 1,199 price); payment-method compliance docs (found the
current logos are hand-drawn approximations, not real assets).

**Content integrity:** unsupported outcome claims removed from the 6
solution cards; 3 Bangla FAQ business-fact conflicts fixed; 9+ "#1"/
superlative claims fixed (cross-checked against arena.ai's live leaderboard,
not just assumed); 7 bare savings-percentage claims fixed (one confirmed
actively wrong via real math, not just unverified); **fabricated
testimonials removed from all 5 guide pages** — fake named individuals with
invented grades/earnings/follower-counts/cost-savings, the most severe
finding this whole project has produced.

**Technical SEO:** catalogue shared-vs-personal price sanity check (found a
real Midjourney anomaly, owner review pending); **hreflang fixed sitewide**
— every one of 272 pages was asserting the homepage's Bangla pair
regardless of whether it had one; now correct reciprocal pairs (or none)
in the actual static HTML, not just client-side.

**Infrastructure:** stray duplicate Vercel deployment found, root-caused,
and documented with exact remediation commands (not executed — owner
action); 2-hop `www` redirect documented.

Full evidence: `docs/homepage/executive-audit.md` (F1-F5),
`docs/higgsfield/offer-evidence.md` + `unit-economics.md`,
`docs/compliance/` (vendor-review.md, payment-methods.md),
`docs/agent/OWNER-ACTIONS.md`, `docs/agent/RESEARCH-CACHE.md`.

## Verified, this session (every commit individually, not batched)

- `pnpm run build` — clean, 272/272 sitemap routes, 0 errors, every commit.
- `pnpm run seo:check` — 0 errors throughout.
- `pnpm run typecheck` — 15 pre-existing errors, unchanged, confirmed no
  new ones after every content/component change.
- `node scripts/validate-catalog.mjs` — 0 hard failures.
- `node scripts/validate-higgsfield-offer.mjs` — OK.
- **Two fresh Vercel previews deployed and checked against real
  infrastructure** (not just local build output): confirmed 404 behavior,
  job-seekers H1, pricing/about meta descriptions, homepage solution cards,
  zero Binance mentions, the Higgsfield "What we have verified" section,
  zero superlative claims, **correct hreflang tags on a real paired page**,
  and **zero fabricated-testimonial content** — all checked live via
  `vercel curl`, not assumed from local output.

## Open owner-decision items (nothing below blocks further safe work)

- **B11** (stray deployment) / **B12** (2-hop redirect) — exact commands in
  `OWNER-ACTIONS.md`.
- **BACKLOG #18** — Midjourney "Pro Shared" priced above its own personal
  tiers.
- **BACKLOG #20** — is "Claude Opus 4.6" still the current model?
- **BACKLOG #21** — payment logos are unofficial; supply real assets or
  approve the text-only interim fallback.
- **`docs/higgsfield/unit-economics.md`** — needs real vendor-cost numbers
  before the BDT 1,199 offer can be considered launch-ready.
- B1 (10,000+ customers), B2 (warranty policy), B5 (44 shared-access
  products, matrix skeleton exists, no vendor terms actually checked yet).

## Known-good numbers (do not retype — derive them)

Catalog: 239 records, 197 distinct product slugs, 272 sitemap routes, 273
built pages. Formulas live in `catalogStats.ts` (components) and a parallel
`CATALOG_STATS` object in `scripts/prerender-products.mjs` (prerender) —
see `ARCHITECTURE.md` for why these are two separate implementations and
why that split is the recurring source of drift bugs found this session.

## Pre-existing failures (not caused by any session)

- `pnpm run typecheck`: 15 TS6305/TS7006 errors, unbuilt
  `lib/api-client-react`. `build` doesn't run typecheck, doesn't block
  deploy.
- `pnpm install --frozen-lockfile` fails at the workspace root (lockfile
  `overrides` mismatch). Use
  `pnpm install --filter ./artifacts/aips-landing --no-frozen-lockfile`.
- `validate-truth.mjs` / `validate-catalog.mjs` warn-level unverified-claim
  counts (warranty, unlimited, delivery-time terms) — long-standing
  compliance debt, tracked, not new.

## Not done, and why

- Not pushed/deployed — this branch is now a substantial 16 commits of real
  fixes. Recommend push/PR for review rather than continuing to grow it
  further — see `NEXT-TASK.md`.
- Owner-decision items above — genuinely not mine to resolve.
- **Playwright/browser smoke tests (B9)** — still not started. The single
  biggest remaining gap: nothing in any gate actually executes the built
  app in a browser.
- **Full individual audience-page audit** — the testimonial-fabrication
  sweep touched all 5 guide pages but was scoped to that one issue; the
  master prompt's full per-page checklist (unique intent, ethical
  limitations, internal links, etc.) hasn't been run against any of them.
- `docs/seo/` structured-data and full technical-SEO audit beyond hreflang
  — hreflang specifically was audited and fixed; canonical/schema/sitemap
  were spot-checked in earlier turns, not exhaustively re-verified this
  turn.
