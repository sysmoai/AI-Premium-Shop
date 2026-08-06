# Higgsfield offer — evidence report

**Date:** 2026-08-07. Full source quotes and confidence levels:
`docs/agent/RESEARCH-CACHE.md`. This doc is the summary; that one is the
record.

## What was checked

`higgsfield.ai/terms-of-use-agreement`, `higgsfield.ai/blog/new-unlimited-
more-models`, `higgsfield.ai/blog/higgsfield-supercomputer-guide` — all
server-rendered, fetched and quoted directly. `higgsfield.ai/pricing` is a
client-rendered app shell; three fetch attempts returned no prices, plan
names, or credit figures. **Current plan names and prices remain
unverified** — needs a real browser or a human visiting the page.

## Compliance — confirmed, not just cautious

The existing implementation's customer-owned-account model
(`data/higgsfield-offer.json`, category F, no checkout) is not merely the
conservative choice — it's the *only* choice consistent with Higgsfield's
own terms:

- §2.4: credential/login sharing is expressly prohibited.
- §2.4: creating an account for another individual is prohibited except for
  an entity the creator is authorized to represent (AIPS has no such
  authorization — `BLOCKERS.md` B4).
- §5.2(i), §1.2, §2.5: resale, transfer, and seat-transfer are all
  prohibited; the license is explicitly non-transferable.
- §4.4: commercial use of *generated outputs* is unrestricted — relevant to
  the "service opportunities" content (freelancers/agencies reselling their
  work, not the subscription itself), which this clause supports.

This has been added to the offer's data (`platformVerifiedFacts`) and now
renders on `/product/higgsfield-ai-bangladesh` as a "What we have verified"
section, plus a new FAQ entry explaining the account model with this
citation. `scripts/prerender-products.mjs`'s static body was updated in the
same commit so the pre-hydration paint carries the same section — the
pattern this whole session has been enforcing for every other drift bug.

## "Unlimited" scope — now defined

Previously an open question (`pendingVerification`). Now known generally:

- Not a plan — a toggle: 1-day free trial, 7-day window bundled with
  Plus/Max/Ultra, or a separate paid "Unlimited Models Marketplace" bundle.
- Covers all 11 image, 7 video, 5 audio models across all three paths.
- **Never** covers MCP, CLI, Canvas, Supercomputer, Marketing Studio, or
  Shorts Studio — those spend credits regardless.
- Runs on a relaxed queue: one generation at a time, not parallel. Credit
  spend uses a separate priority queue.
- 4K output limited to Max-annual/Ultra-annual; other tiers cap at 1080p.

**Still unknown:** whether the specific plan AIPS proposes to sell (BDT
1,199, ~1,200 credits) includes the unlimited toggle at all, and if so via
which of the three paths.

## The "six video and eight image parallel generations" claim

Named in the current master prompt as part of the proposed offer. No
supporting figure found in either blog post — the only concurrency figure
found ("Ultra supports 10 active chats at once") is about parallel
*projects* on the Ultra tier for agencies, not simultaneous renders, and
doesn't match. **Not proven false — the pricing page wasn't fetchable — but
currently unverified and should not be published.** The current
implementation already correctly excludes it from the shipped page; this is
confirmation that's the right call, not a reason to relax it.

## Unit economics — see `unit-economics.md`

The one concrete price found ($49/mo, Plus plan) and the only credit-cost
example found (~$0.05/credit at Supercomputer rates) don't obviously
reconcile with the proposed BDT 1,199 (~$8) for ~1,200 credits. Full
calculation and the specific numbers still needed from the owner:
`docs/higgsfield/unit-economics.md`.

## Recheck date

2026-11-07 for everything above — vendor terms and blog content can change.
`RESEARCH-CACHE.md` carries this per-item.
