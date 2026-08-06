# Next task — start here

**Written:** 2026-08-07, end of the 5th turn of this same-day session
(vendor compliance + Higgsfield verification + superlative-claims cleanup).

## Do this first (2 minutes)

```bash
git log --oneline -11                   # confirm seo/homepage-product-authority,
                                         # 10 commits ahead of main, unpushed
cd artifacts/aips-landing
pnpm run build && pnpm run seo:check && node scripts/validate-catalog.mjs \
  && node scripts/validate-higgsfield-offer.mjs
# expect: all clean/passing, matching CURRENT-STATE.md's "Verified" section
```

Then read `CURRENT-STATE.md` in full.

## The branch is getting large — recommend a checkpoint before more feature work

10 commits, 5 sessions, all local. Before adding more:

1. **Deploy a fresh preview** (the last one was checked several commits ago
   and predates the Higgsfield page changes) and do one visual/functional
   pass, especially `/product/higgsfield-ai-bangladesh`'s new "What we have
   verified" section and the superlative-claim pages
   (`/chatgpt-vs-claude`, `/claude-pro-bangladesh`, `/best-ai-subscription-2026`).
2. Consider whether this is a good point to push the branch / open a PR for
   review, rather than continuing to grow it further first — 10 commits of
   real fixes is already a substantial, reviewable unit of work.

## Waiting on you (independent of the above — proceed on other things regardless)

1. **OWNER-ACTIONS.md OA1/OA2** — stray deployment, 2-hop redirect.
2. **BACKLOG #18** — Midjourney Pro Shared pricing anomaly.
3. **BACKLOG #20** — is "Claude Opus 4.6" still current?
4. **`docs/higgsfield/unit-economics.md`** — needs your real cost numbers
   before the Higgsfield offer can move past enquiry-only.
5. Push / PR / deploy decision.

## Next task groups (your call, all independently safe to start)

**Conflicting business facts — systematic sweep.** This session fixed
business facts on pages it happened to touch (Bangla FAQ, Higgsfield offer)
but never did an exhaustive pass. `validate-truth.mjs` already checks
founding year and customer count canonically sitewide — extend it to scan
for the OTHER numbers this session found drifting in different sessions
(delivery time: BACKLOG #17; tool/plan counts — already gated by
`validate-catalog.mjs`'s "no hand-written catalog numbers" check). Mostly a
"does the existing gate already cover this" audit, not new gate-writing.

**Audience pages re-audit.** Job-seekers was fixed for the prerender-
collision bug (F4) but never re-read end to end for content quality/
duplication against the master prompt's own required-sections list
(CV structure, ATS limitations, interview practice, etc. — master-prompt
section 16). Students/freelancers/creators/business/developers pages
haven't been individually re-checked this whole session.

**`docs/compliance/payment-methods.md`** — not created. Source URLs already
in `RESEARCH-CACHE.md` (bKash/Nagad/Rocket merchant pages) — same shape of
work as the Higgsfield verification just done, smaller scope.

**Extend `validate-truth.mjs`'s claim patterns** — BACKLOG #19 ("savings vs
official" percentages) is the same class of gap that let the extra "#1"
instances slip through this session; worth closing generally rather than
finding one category at a time.

## Explicitly not next

Content expansion / new pages (master-prompt section 21) — the master
prompt's own instruction: "Do not spend time polishing content while P0
data or compliance defects remain." Several still do (above).
