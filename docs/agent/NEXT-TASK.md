# Next task — start here

**Written:** 2026-08-07, end of the 6th turn of this same-day session.

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
