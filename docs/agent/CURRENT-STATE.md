# Current state

**Last updated:** 2026-08-07 (9th turn — B13 resolved by owner, real
typecheck/CI build-order bug found and fixed)

## This turn (9th): GitHub Actions billing unlocked; real CI bug found on its first-ever run

Owner resolved B13 (GitHub Actions billing lock) directly on GitHub.
Confirmed by re-running a recent failed run (`gh run rerun`) — it now
actually executes instead of failing before starting.

That was **the first time any CI job in this repo's history has run on a
truly clean checkout.** It immediately caught a real bug the previous
turn's local verification had missed: `artifacts/aips-landing` (the live
site) failed typecheck with TS6305 "output file has not been built",
because its `tsconfig.json` references `lib/api-client-react` and neither
`ci.yml` nor the pre-push hook (added last turn) ever built that
project-reference lib first. The previous turn's BACKLOG entry claiming
"#13/#14 resolved, cause unclear" was **wrong** — it passed locally only
because of a stale `dist/`+`.tsbuildinfo` left on disk from that turn's
own debugging, not a real fix. Corrected in `BACKLOG.md` with the full
story. Real fix: added a `pnpm run typecheck:libs` step before the
recursive typecheck in both `ci.yml` and `.husky/pre-push`, verified from
a genuinely clean local state (deleted every lib's `dist/`+`.tsbuildinfo`
and rebuilt from zero) this time. The 7 `TS7006` implicit-any errors
reported alongside it were cascading symptoms of the same missing build,
not separate bugs — confirmed by rebuilding and rechecking; zero manual
type annotations were needed.

Also confirmed while investigating: the code that reference
triggered this (`AddToCartButton.tsx`, `CartButton.tsx`,
`src/pages/admin/*`) is dead — unreferenced by `App.tsx`/`main.tsx` or
anything else reachable, from the same abandoned 2026-05-03 commit as
`artifacts/api-server`. Left in place rather than deleted (Vite already
excludes it from the real bundle; deleting live-site source files
unilaterally is a bigger call than a type-safety fix) — logged under the
existing BACKLOG #29 rather than as a new item.

**Previous turn's other work (payment logos #21, Opus 5 #20) already
verified live and unaffected by this — that content shipped correctly;
this turn's bug was specifically about the typecheck gate's build order,
not the live site's rendered output.**

---

**Prior state (8th turn, "full permission" — payment-logo fix
**DEPLOYED TO PRODUCTION**):**
**Branch:** `main` (direct commit `5ddea78` on top of the merged
`seo/homepage-product-authority` work), pushed to `origin/main`, deployed
live to **https://aipremiumshop.com** via `vercel --prod --yes`. Confirmed
via exact JS bundle hash match (`index-DC2vV1vm.js`, identical to local
build output) plus the standard `deploy-live.sh --verify` pass (product
count/price in `<head>`, no phantom claims, concierge healthy, key routes
200).

## This turn (8th): payment-logo text-only fallback — BACKLOG #21 done

`PaymentMethodsSection.tsx`'s hand-drawn SVG letter-marks (colored
rectangle + single bold letter approximating bKash/Nagad/Rocket's real
logos) replaced with a plain colored accent bar + the existing bold-text
name — the master prompt's own sanctioned fallback for "no authorized
logo file available." `PaymentBadges.tsx`/`PageFooter.tsx` confirmed
already text-only, no change needed. Docs updated
(`docs/compliance/payment-methods.md`, `docs/brand/payment-assets.md`,
`BACKLOG.md`). Gates run clean: build, seo:check, validate-catalog,
validate-truth, validate-higgsfield-offer — no new warnings, diff scoped
to 1 component file + 3 docs.

**Task #14** (remove stray Vercel deployment aliases, B11) remains
blocked — not by missing info, but by Claude Code's own auto-mode safety
classifier, which explicitly declined the `vercel alias rm` mutation and
instructed not to attempt a workaround. Exact commands are in
`docs/agent/OWNER-ACTIONS.md` OA1 for the owner to run directly, or the
owner can adjust Bash permission settings to unblock it for a future
session.

## This turn (8th, continued): Claude Opus 4.6 -> Opus 5 — BACKLOG #20 done

Verified via Anthropic's own July 24, 2026 announcement
(anthropic.com/news/claude-opus-5) that Opus 5 now supersedes Opus 4.6 on
the Claude Pro subscription. Fixed every live-relevant reference:
`data/products.json` (source), regenerated `catalog-pages.json`/
`catalog-lite.json`/`llms.txt`/`api/_catalog.json` (only catalog-pages.json
actually changed content), and hardcoded mentions in `BlogPostPage.tsx`,
`BrandPage.tsx`, `CategoryPage.tsx`, `ComparisonPage.tsx`. Left two
confirmed-dead files untouched (`data/products-completed.json`,
`public/data/featured-products.json` — grepped, neither is referenced
anywhere). Left "GPT-5.4" mentions untouched — not verified either way.

While editing, found and removed two adjacent fabricated claims in
`BrandPage.tsx` that the earlier superlative/testimonial sweeps had
missed (different phrasing, didn't match those sweeps' patterns): a
"scored highest on SWE-bench, GPQA, and Chatbot Arena... objectively the
smartest AI" claim (checked — Opus 5 is actually #3 on Chatbot Arena as of
Aug 2026, so this would have stayed false even with the model name fixed),
and a "3x more content / 60% faster delivery / 44% avg income increase"
stats block with no source anywhere in the repo. Logged as BACKLOG #28 —
the sweep pattern (regex/keyword-based) has a real blind spot for
differently-phrased fabricated claims.

Deployed live, verified: exact JS bundle content check on
`/claude-pro-bangladesh` shows `Opus 5`, zero remaining `4.6` occurrences.

**Next up:** Task #17 (attempt `lib/api-client-react` typecheck fix —
BACKLOG #14). BACKLOG #28 (broader superlative/fabricated-claim sweep
beyond guide pages) is a good candidate for a future dedicated pass.

---

**Prior state, for reference (7th turn — full homepage/trust/SEO/chatbot
remediation deploy):**

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

- `validate-truth.mjs` / `validate-catalog.mjs` warn-level unverified-claim
  counts (warranty, unlimited, delivery-time terms) — long-standing
  compliance debt, tracked, not new.
- **No longer reproducing, 2026-08-07 (8th turn):** the documented
  `pnpm run typecheck` 15-error failure and the root
  `pnpm install --frozen-lockfile` lockfile-overrides failure. Ran both
  exact commands, both now exit 0 clean. No lockfile/config was edited to
  cause this (`git status` clean throughout) — `lib/api-client-react`'s
  own `node_modules` just wasn't populated in this checkout; a scoped
  `pnpm install --filter @workspace/api-client-react` fixed it, and the
  root install then also succeeded. See BACKLOG.md's done section for the
  full honest writeup — cause not fully explained, don't assume this can
  never fail again without re-checking.

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
