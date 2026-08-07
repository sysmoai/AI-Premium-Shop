# Next task — start here

**Written:** 2026-08-07. This file is stale below this point (last real
rewrite was turn 6) — trust `CURRENT-STATE.md`'s top entries and `git log`
over the rest of this file.

## Three open draft PRs from the same day, none merged yet

- **PR #5** `agent/homepage-solution-section-fixes` — Find Your Solution:
  2 fabricated claims removed from the SVG illustrations, section-scoped
  reduced-motion support.
- **PR #6** `agent/reduced-motion-global` — site-wide
  `MotionConfig(reducedMotion="user")`, plus (added after #6 was opened,
  same branch) a real bug fix: `/pricing`'s product table was rendering
  `"$undefined/mo"` and a blank delivery column for real customers (wrong
  field names — `deliveryMinutes` vs. the real `deliverySLA`, and a
  `=== null` check that missed `undefined`). Regression-tested in
  `tests/e2e/pricing.spec.ts`, verified against the real bug the same way
  B9's smoke suite was (stash the fix, confirm the test fails, restore).
  None of these three touch the same files, so no merge conflicts expected
  between them — the only doc-file overlap is in `CURRENT-STATE.md`/
  `BACKLOG.md`, resolvable by keeping both sides' entries.

## Well-specified next step: the actual `/pricing` SEO gap

`docs/seo/GAP-CHECKLIST.md`'s P0 item for `/pricing` is still open: the
static prerendered body has the intro prose (790 chars) but not the product
table itself (~13k chars rendered by React). Needs a dedicated prerender
extractor in `scripts/prerender-products.mjs`, same technique as the
`ComparisonPage.tsx` one added this same day (a hand-written literal
reader) — NOT the generic prose extractor already running on this route,
which by design can't capture a `.map()`-rendered data table. Read
`data/products.json` directly (it's already loaded as `products` near the
top of the script), replicate `PricingPage.tsx`'s default filter/sort
(`price != null`, sorted ascending, no category/access filter), emit a real
`<table>`, and append it into `/pricing`'s existing `<main>` — same
insertion pattern the generic enrichment loop already uses, but run AFTER
that loop so the existing prose enrichment isn't skipped by an early
800-char threshold trip.

## Do this first (2 minutes)

```bash
git log --oneline -17                   # confirm seo/homepage-product-authority,
                                         # 16 commits ahead of main, unpushed
cd artifacts/aips-landing
pnpm run build && pnpm run seo:check && node scripts/validate-catalog.mjs \
  && node scripts/validate-higgsfield-offer.mjs
# expect: all clean, matching CURRENT-STATE.md's "Verified" section
```

Then read `CURRENT-STATE.md` in full.

## Strong recommendation: push / open a PR before adding more

16 commits, 6 turns, all local. Every commit was individually build+seo:check
verified, two fresh previews were deployed and checked against real
infrastructure this session — this is a reviewable, coherent unit of work,
not a pile of unverified changes. The fixes range from routing/rendering
bugs to a genuinely serious content-integrity finding (fabricated
testimonials across 5 pages). Continuing to stack more commits without a
review checkpoint increases risk for no clear benefit at this point.

If you want to keep going regardless, the two large unstarted items are
below — but pushing first, or at minimum getting a human to skim the diff,
is the higher-value next action.

## Waiting on you (independent of push/PR — proceed on these separately)

1. **OWNER-ACTIONS.md OA1/OA2** — stray deployment, 2-hop redirect.
2. **BACKLOG #18** — Midjourney Pro Shared pricing anomaly.
3. **BACKLOG #20** — is "Claude Opus 4.6" still current?
4. **BACKLOG #21** — payment logos: supply real assets, or approve the
   text-only interim swap specified in `docs/brand/payment-assets.md`.
5. **`docs/higgsfield/unit-economics.md`** — real cost inputs needed.
6. Push / PR / deploy decision.

## The two large unstarted P0 items, if you want them next

**Playwright smoke tests (B9).** The single biggest remaining test-suite
gap — nothing in any existing gate executes the built app in a real
browser; a hook-order bug once blanked every page in production and passed
every check. Two journeys already specified: Homepage→Find Your
Solution→Audience page→Category→Product→Policy→WhatsApp, and
Homepage→AI Video→Higgsfield→Credits→Unlimited→Service
opportunities→WhatsApp. Real scoping work, a new dependency — worth its
own session, not a bolt-on.

**Full individual audience-page audit.** This session's testimonial sweep
touched all 5 guide pages but only for one issue class. The master prompt's
full per-page checklist (unique search intent, real workflows, ethical
limitations, Bangladesh context, distinct FAQ, internal links, named
author/reviewer/last-tested-date) hasn't been run against any of them.
Given what the testimonial sweep just found, this audit deserves real time,
not a rushed pass — recommend scoping one page at a time rather than
all six in one sitting.

## Lower priority, still open

- Systematic business-facts sweep beyond pages touched incidentally.
- Structured-data audit beyond what's already gated by `seo-check.mjs`.
- `docs/compliance/vendor-matrix.csv`'s 37 vendors are still all
  "Unverified" — OpenAI (5 records) is the highest-value one to actually
  check first.
