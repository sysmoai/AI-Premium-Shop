# Next task — start here

**Written:** 2026-08-07, end of the catalogue-integrity task group (4th
turn of this same-day session).

## Do this first (2 minutes)

```bash
git log --oneline -7                    # confirm seo/homepage-product-authority,
                                         # 6 commits ahead of main, unpushed
cd artifacts/aips-landing
pnpm run build && pnpm run seo:check && node scripts/validate-catalog.mjs
# expect: build clean 272/272, seo:check 0 errors, validate-catalog 0 hard
# failures / 17 warnings (2 new: the Midjourney Pro Shared anomaly)
```

Then read `CURRENT-STATE.md` in full — it's current as of this write.

## Waiting on you (nothing below is blocked on these — proceed independently)

1. **OWNER-ACTIONS.md OA1** — stale duplicate Vercel deployment
   (`aips-website-two.vercel.app`) still live, stale catalog numbers public.
   Recommended: `vercel alias rm` the three aliases listed there (reversible,
   one command each).
2. **OWNER-ACTIONS.md OA2** — `http://www` 2-hop redirect, 5-min dashboard
   fix, low priority.
3. **BACKLOG.md #18** — confirm whether Midjourney's "Pro Shared" tier
   (৳4,788, more than both its Personal tiers) is a pricing error or
   intentional.
4. Whether to push the branch / open a PR / deploy to production.

## Next P0 task group: your call between two independent options

**Option A — Shared-account and vendor compliance (master-prompt section 8 /
BLOCKERS.md B5).** Large, but partially unblocked: you don't need to wait for
per-vendor legal review to do the mechanical part —
1. Build `docs/compliance/vendor-matrix.csv` skeleton from what's already in
   `data/products.json` (44 records with `accessType: "shared"`, grouped by
   vendor/brand) — this is a repo-only task, no research needed.
2. Flag (don't yet remove) every place `src/pages/GuidePage.tsx`,
   `FAQPage.tsx`, or product pages describe shared accounts as "similar to
   family sharing" or unconditionally "safe" — a repo grep, not new writing.
   Do not rewrite this copy without your sign-off; B5 says explicitly this
   isn't a decision to make unilaterally per-vendor.

**Option B — Higgsfield offer verification (master-prompt sections 10-11 /
RESEARCH-CACHE.md).** Needs real external web research against
`higgsfield.ai/pricing`, `/terms-of-use-agreement`, and the two blog posts
listed in `RESEARCH-CACHE.md`. This is genuinely new work (not re-research —
nothing has been checked yet), best done as its own focused session since
it's a different mode of work (external fetch + read + record) than the
repo-mechanical work this session has been doing. Record findings in
`RESEARCH-CACHE.md`'s table before touching any code, per the credit-
efficient operating mode's "record research once" rule.

Recommend **A first** — it's unblocked, mechanical, and directly de-risks
the largest remaining compliance exposure (44 products); B needs you to
decide whether the proposed BDT 1,199/1,200-credit offer is still the one to
verify, since three master prompts in a row have called it "proposed, not
verified" without changing.

## After A or B: remaining P0 order (unchanged from last write)

- Conflicting business facts — largely addressed; no systematic full-site
  sweep has been done, only pages this session happened to touch.
- Remaining audience pages — job-seekers fixed; students/freelancers/
  creators/business/developers not individually re-audited.
- Homepage/AI Video conversion improvements beyond what's done.
- Remaining technical SEO (hreflang, structured-data audit).
- Content expansion — explicitly last.
