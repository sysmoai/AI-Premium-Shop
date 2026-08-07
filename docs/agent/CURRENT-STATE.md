# Current state

**Last updated:** 2026-08-07 (parallel session — owner asked for a CEO-level
pass: multi-agent market/customer/SEO research, plus the `/pricing` static
extractor and a cherry-picked copy of the pricing render-bug fix from
PR #6. Not yet merged; see PR note below.)

## This turn (parallel session): market/customer/SEO research (3 parallel agents) + `/pricing` static extractor + carried-over bug fix

**What this was NOT**, to be explicit: the owner's request was framed as
"make sure all done" for the full "Find Your Solution 2.0" master prompt
(38 sections — homepage rebuild, full audience-page audits, structured-data
audit, deployment). That is not something one session can honestly claim
complete — it needs real design iteration, several owner decisions (B1-B13
all still open), and production-deployment approval this session doesn't
have. What follows is real, verified, scoped progress toward it, not a
claim that it's finished.

**Research (3 parallel background agents, read-only, nothing published
automatically):** competitor landscape, customer pain-points/trust
barriers, and SEO search-intent gaps. Full findings with sources:
`RESEARCH-CACHE.md`'s new "Bangladesh AI-subscription market..." section.
Highlights: real, cited friction points for why a reseller is needed at all
(Bangladesh Bank: ~2.9M credit-card holders nationwide; PayPal cannot be
opened from Bangladesh; OpenAI's ~89-country support vs. Stripe's
164-country coverage can decline a working card) — general market facts,
safe to reference in copy, distinct from AIPS-specific claims like the
already-flagged-unverified "10,000+ customers" (B1). 8 competitor/seller
models profiled with real trust-signal and red-flag patterns. 6 concrete
SEO content-gap opportunities, all scoped as additions to *existing* pages
(FAQ entries, guide subsections) — none need a new route, per this
project's own "don't create hundreds of SEO pages" rule. Logged as
`BACKLOG.md` #35-#37 rather than acted on immediately — copy changes,
especially bilingual ones, deserve their own careful pass, not a rush
alongside code changes in the same turn.

**`/pricing` static content gap closed (the actual GAP-CHECKLIST.md P0 item
queued from last turn).** The product-price table React renders was
entirely absent from static HTML (790 chars static vs. ~13k rendered) —
the generic prose-enrichment pass can't capture it because it's `.map()`-ed
from imported JSON, not string literals. Added a dedicated extractor to
`scripts/prerender-products.mjs` (same technique as the `ComparisonPage.tsx`
one from earlier the same day): reads `products.json` directly (already
loaded at the top of the script), mirrors `PricingPage.tsx`'s *default*
view exactly (no filters, sorted price-ascending — what a real first visit
or non-JS crawler actually sees), and appends a real `<table>` into the
existing `<main>`. Runs after the generic enrichment loop on purpose, so
that loop's own prose append for this route isn't skipped by an early
800-char threshold trip. Result: 790 → 14,750 static chars, all 118 priced
products with real names/prices/categories/delivery times, verified via a
real DOM read (not just a byte-count).

**Carried over from PR #6 (cherry-picked onto this branch, not duplicated
work):** while building the extractor, needed the exact real field names
`PricingPage.tsx` uses — which is how the render bug from last turn
(`deliveryMinutes` vs. the real `deliverySLA`, `officialUSD === null`
missing `undefined`) was originally found. That fix already lives on PR #6;
cherry-picked here too (`git cherry-pick`, one docs-only conflict resolved)
so *this* branch's own live rendering is also correct and the static table
this turn added doesn't visually contradict what real visitors see once
both PRs land — no functional overlap, since PR #6 never touches
`prerender-products.mjs`.

Verified: typecheck clean, build clean (275/275 routes), seo:check (0
errors — one new pre-existing-severity "unlimited" warning on `/pricing`,
which is a vendor's own real plan name — "Runway Unlimited" — newly
surfaced in one more location, not a new claim; the catalog-wide count
didn't change), validate:all (same 17 warnings as before, zero new),
13/13 Playwright tests pass. Screenshotted both the real (JS-on) visitor
view and the no-JS crawler view of `/pricing` — confirmed the fix is
visible in both, and that the prerendered table stays correctly hidden
from JS-executing browsers (`#prerender-shell`'s existing
`html.js #prerender-shell { display: none }` rule, unchanged).

Branch: `agent/pricing-static-extractor`, based on latest `origin/main`
(separate from PR #5 and PR #6 — this is the third same-day parallel
branch; no file overlap with either of the other two except the
already-resolved docs conflict from the cherry-pick).

**Owner-facing summary of what's actually shippable vs. still open** is in
this turn's chat response, not duplicated here — see it for the honest
"done / queued / needs your decision" breakdown.

## This turn (new session): comparison pages fixed+expanded, concierge instrumented+tested

- Fixed the 4 comparison pages' static HTML (was a 3-line stub, 16-53x
  smaller than what React renders) with a dependency-free JS-literal
  parser reading `ComparisonPage.tsx`'s `COMPARISONS` config directly —
  no hand-duplicated content to drift.
- Added 3 new comparison pages from a real competitor-search gap check:
  `/chatgpt-vs-perplexity`, `/claude-vs-gemini`, `/canva-vs-adobe-express`.
  Skipped `chatgpt-vs-deepseek` — DeepSeek is only a dev API setup
  service in the catalog, not a consumer subscription; forcing the
  template would misrepresent both products.
- Concierge (`api/concierge.js` / `ConciergeWidget.tsx`) had zero
  analytics events and zero E2E coverage despite being otherwise mature
  (see eighth-turn entry below). Added 5 gtag events (no PII/message
  content) and `tests/e2e/concierge.spec.ts` (dialog a11y, focus
  management, graceful degradation on backend failure — costs zero
  NVIDIA/Anthropic quota since `vite preview` serves no `/api/*` routes).
- Nearly duplicated/clobbered 40 commits of prior work from a stale local
  checkout before catching it via `git fetch`. See `WORKLOG.md` for the
  full story and the generalized lesson.
- `docs/seo/GAP-CHECKLIST.md` exists locally, untracked — a prior
  session's real P0-P6 audit. Worth `git add`ing or reconciling into
  `BACKLOG.md` next session rather than leaving it invisible to `git
  status` forever.

## This turn (9th, part 5): sweep finished, found a real price-contradiction bug

Owner said "make sure you did all... find all and complete all" —
delegated full re-reads of `BrandPage.tsx` (2320 lines) and
`data/products.json` (239 records' prose) to agents instead of assuming
the earlier sweeps were exhaustive. Real finding: the "Google AI Pro —
Personal" catalog record had the Shared tier's promo copy copy-pasted
onto it, asserting three different prices (৳599 / ৳499 / its own real
2990) in three fields of the same record — fixed to correctly describe
a full-price dedicated account. Also found a second, independently-
spread fabricated customer-count claim ("3,000+ since 2024", ~40
records) and 6 Claude Pro records still quoting the exact stale "৳350"
price this session's own live-check script asserts should never appear
anywhere (it wasn't on the homepage, but was live in per-product SEO
meta descriptions). Plus a dozen more superlative/unverified claims
across both files, and one more chatbot gap (claimed "no negative
reviews" as fact). All fixed, all edits to the JSON done via literal
string replacement (not parse-reserialize) to protect the file's CRLF
line endings — verified 100% CRLF before and after. Full writeup:
`BACKLOG.md` #31 done-entry, new #33 for the one remaining known gap
(Bangla `useCases` prose quality — needs a native speaker).

## This turn (9th, part 4): visual QA pass — found what the text sweep couldn't

Owner correctly caught that the payment-badge "fix" needed an actual look,
not just a diff read. Applied that lesson broadly: screenshotted 18
pages/sections the earlier fabricated-claims sweep had touched. Found:
a genuine pre-existing duplicate-content bug (two identical "FOMO Banner"
blocks on every guide page), a second independent copy of already-fixed
fabricated stats on `chatgpt-plans-bangladesh`, and two more live,
homepage-reachable fabrication instances (`AIAgentsSection.tsx`,
`TestimonialsSection.tsx`) the grep-based sweep's patterns never matched.
Also discovered, as a side note worth recording honestly: the
`SegmentHeroContent.tsx` fake-testimonial fix from earlier today turned
out to be for genuinely unreachable dead code (`showSegmentSelector` is
never set `true` anywhere) — still correctly fixed, just not previously
live-facing. Full writeup: `BACKLOG.md` #32. Deployed, verified live via
bundle-content check (zero matches for every removed string) and the
standard `deploy-live.sh --verify` pass.

## This turn (9th, part 3): repo-wide fabricated-claims sweep — BACKLOG #28 done

Full read of ~28 files flagged by pattern search for superlatives/stats.
Worst finding: `src/sections/SegmentHeroContent.tsx` (homepage's
interactive segment-picker result) had the exact same fake named-person
testimonial pattern already removed from the 5 guide pages, untouched
because it isn't a guide page. Fixed across 13 files total — full detail
in `BACKLOG.md`'s #28 done-entry and the commit message
(`88d11fb`). Verified live: fetched the deployed JS bundle, confirmed
zero matches for the removed fabricated strings. Full gate chain clean
(typecheck, build, seo:check, validate-catalog, validate-truth,
Playwright) both before and after deploy.

## This turn (9th, part 2): B9 closed — Playwright smoke suite, verified against the real historical bug

Added `artifacts/aips-landing/tests/e2e/smoke.spec.ts`: runs the actual
built app in real Chromium across 8 routes, asserting `#root` mounted,
real visible text exists, and zero console/page errors. Wired into
`seo-quality.yml` (after build) and `.husky/pre-push`.

**Verified it actually works**, not just that it runs: reproduced the
exact 2026-08-06 CookieBanner hook-order bug that caused a real full-site
outage (moved `useT()` below its early `return null` again), rebuilt, ran
the suite — all 8 routes failed with the identical "#root has no
children" signature. Reverted immediately, confirmed via `git diff`
(empty) that the component is back to its original state.

Confirmed on real GitHub Actions (not just locally): pushed, watched
`SEO quality` run the Playwright step on GitHub's own infrastructure —
"8 passed (8.2s)" — and `CI` pass alongside it. Full detail:
`docs/agent/BLOCKERS.md` B9 (now marked resolved).

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
