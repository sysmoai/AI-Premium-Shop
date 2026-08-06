# Higgsfield offer — unit economics

**Status: INCOMPLETE — do not treat this offer as launch-ready until the
owner fills the blanks below.** Per master-prompt section 10: "Do not launch
BDT 1,199 when... it loses money without approved acquisition subsidy." This
document exists specifically so that question gets answered with numbers,
not assumed away.

## What's actually known (from `docs/agent/RESEARCH-CACHE.md`, sourced 2026-08-07)

| Item | Value | Source | Confidence |
|---|---|---|---|
| Proposed retail price | BDT 1,199 / month | `data/higgsfield-offer.json` (owner-attested) | This part is real — it's AIPS's own fee |
| Proposed credit allocation | ~1,200 credits/month | `data/higgsfield-offer.json` | **Unverified against the vendor** — not confirmed this plan/tier exists at this credit count |
| Only vendor price actually found | $49/mo (Plus plan, auto-renewal mention) | higgsfield.ai/blog/new-unlimited-more-models | Medium — incidental mention, not a rate-card entry, and not confirmed as the plan AIPS would resell-assist |
| Supercomputer credit-cost example | ~90 credits ≈ $4.50 (one animation step); ~200 credits ≈ $10 (full workflow) | higgsfield.ai/blog/higgsfield-supercomputer-guide | Medium — examples, not a full rate card, and Supercomputer may not even be the intended usage path for this offer |

## The red flag

Do the arithmetic both ways and they don't reconcile cleanly:

- **If** $49/mo buys the vendor-side subscription this offer resells
  payment-assistance for, that's ≈ BDT 7,328 at a ~150 BDT/USD rate — nearly
  **6× the proposed BDT 1,199 retail price.** Either the actual vendor cost
  is much lower than $49 (a cheaper tier, a different billing period, a
  promo rate), or the margin doesn't work as currently proposed.
- **If** the ~1,200 credits are meant to be usable at Supercomputer-example
  rates (~$0.05/credit), 1,200 credits ≈ **$60 of vendor-side credit
  value** — again far above an $8 retail price (BDT 1,199 ≈ $8 at ~150
  BDT/USD).

Neither calculation proves the offer loses money — both rest on numbers
that don't specifically describe AIPS's actual arrangement (payment-
assistance fee structure may differ from a straight subscription resale;
the actual plan/credit tier is still unconfirmed). But **nobody has done
this arithmetic with AIPS's real numbers yet**, and the two rough estimates
above both point the same direction: possible loss, not confirmed margin.

## What the owner needs to supply (cannot be derived from the repo or public vendor pages)

| Field | Needed to calculate |
|---|---|
| Actual vendor cost for the specific plan/tier being resold | Whether BDT 1,199 covers it at all |
| Currency conversion rate actually used (bank/card rate, not a round number) | Real BDT cost of a USD vendor charge |
| Card/payment-gateway fee for paying Higgsfield in USD | Net vendor cost after fees |
| bKash/Nagad/Rocket receiving fee on the customer's BDT 1,199 payment | Net revenue after receiving fees |
| Support cost per activation (WhatsApp time + the "free Google Meet onboarding" time) | Contribution margin |
| Refund reserve (15-minute window, `data/higgsfield-offer.json` payment terms elsewhere) | Expected loss rate |
| Replacement reserve, if this offer ever gets a warranty (currently none — B2) | Expected loss rate |
| Customer acquisition cost, if any paid marketing funds this offer | Full economics, not just per-unit |

## Maximum safe volume — not calculable yet

Depends on the above. Once margin per unit is known, "maximum safe monthly
sales" and "maximum daily activations" (section 10's other asks) follow
directly — no reason to guess at them before the margin itself is real.

## Support capacity — see `support-capacity.md` (not created this session)

The proposed offer includes a "free live Google Meet onboarding" per
customer (`data/higgsfield-offer.json` → `offer.onboarding`). At a target of
100 monthly sales (master-prompt section 1's stated commercial target),
that's roughly 3-4 onboarding calls/day if evenly spread — whether that's
sustainable depends on who's running them and what else they do, which is
outside what this repository can answer. Flagged, not calculated — a
`support-capacity.md` doc would need the same owner input as the table
above plus a real staffing answer.

## Recommendation

Do not move this offer past its current `inquiry-only` / category F status
(`data/higgsfield-offer.json`) until the owner supplies the inputs above and
this document's blanks get filled with real numbers. The current
implementation already does the right thing by keeping the CTA disabled and
the price "indicative, confirmed on WhatsApp" rather than a live checkout —
this document is the reason that caution is justified, not just a general
compliance instinct.
