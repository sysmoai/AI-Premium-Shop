# Next task — start here

**Written:** 2026-08-07, end of the host/version-consistency task group.
Supersedes `NEXT-SESSION.md` (kept for its own historical record; this file
is now canonical going forward per the credit-efficient operating mode).

## Do this first (2 minutes)

```bash
git log --oneline -6                    # confirm you're still on
                                         # seo/homepage-product-authority,
                                         # 5 commits ahead of main
cd artifacts/aips-landing
pnpm run build && pnpm run seo:check    # expect: clean, 0 errors
```

Then read `CURRENT-STATE.md` (what's on the branch, what's verified) and
`BLOCKERS.md` B11/B12 (new this session, need your decision — see below)
before starting new work.

## Next P0 task group: catalogue price and plan integrity (Hypothesis 3 / master-prompt section 7-8)

Not yet done as a *systematic* pass — this session only spot-checked the
three named examples (Midjourney Mega, Runway Unlimited, Perplexity Max —
all clean, not reproducible, see `docs/homepage/executive-audit.md`). The
master prompt asks for something stronger: **repair the data model so this
class of bug can't recur**, not spot-check more examples by hand.

Concretely:

1. Read `scripts/validate-catalog.mjs` — it already exists and already
   catches some of this (`data/products.json: 239 records...` warnings).
   Extend it, don't rebuild it. Add checks for the specific failure modes
   section 7 of the master prompt lists that aren't covered yet:
   - a plan's displayed name doesn't match the tier its price belongs to
   - a "personal" `accessType` record priced the same as a "shared" one for
     the same product (or vice versa) — likely a copy-paste error if so
   - a product's homepage/brand-page "from" price isn't actually its
     cheapest *tier* (this exact bug class was already fixed in prior
     sessions per git history `fc38e57`/`d38e494` — add a regression check
     so it can't come back silently)
2. Run it against all 239 records, not a sample. It's a data-file scan, not
   per-page rendering — cheap, no reason to spot-check.
3. Anything the script flags as an actual mismatch (not just a warning-level
   "unverified claim"): fix in `data/products.json` directly, one commit,
   with the specific record(s) named in the commit message.
4. If the script finds zero real mismatches (plausible, given the 3 spot
   checks were clean and prior sessions already hunted this bug class hard),
   say so plainly rather than manufacturing work — commit the script
   extension alone as "closes the gap so this can't recur," and move to the
   next task group.

## Also waiting on you (not blocking the task above)

- **B11** — a decommissioned Next.js app's last deployment is still live and
  publicly crawlable with stale facts (`aips-website-two.vercel.app`).
  Needs your OK to delete/unalias it via Vercel — I won't do that
  unilaterally. See `BLOCKERS.md` B11 for the exact options.
- **B12** — `http://www.aipremiumshop.com` is a 2-hop redirect. Low severity,
  5-minute fix in Vercel's dashboard if you want it flattened.
- Whether to push this branch / open a PR / deploy the preview to
  production — still sitting on the branch, untouched, per the last report.

## After catalogue integrity: the rest of the P0 order (master-prompt section 36)

4. Shared-account compliance (B5 — 44 products, needs your vendor-by-vendor
   read, not mine to make).
5. Conflicting business facts — largely addressed (Bangla FAQ fixes this
   session), but no *systematic* sweep of every page has been done, only the
   pages this session happened to touch.
6. Remaining audience pages — job-seekers fixed; students/freelancers/
   creators/business/developers not individually re-audited this session.
7. Higgsfield offer verification — needs external web research against
   `higgsfield.ai`'s actual current terms/pricing; see `RESEARCH-CACHE.md`
   for the exact open questions. Do this in its own bounded session — it's
   real external research, not repo work.
8. Homepage/AI Video conversion improvements beyond what's done.
9. Remaining technical SEO (hreflang, structured data audit per section 24).
10. Content expansion — explicitly last; master prompt says don't polish
    content while P0 defects remain, and several still do (above).
