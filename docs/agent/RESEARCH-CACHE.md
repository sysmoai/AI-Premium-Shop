# Research cache

Per the credit-efficient operating mode: record external research once, reuse
it until its recheck date passes.

## Higgsfield — checked 2026-08-07

`higgsfield.ai/pricing` is a fully client-rendered app shell — three separate
fetch attempts returned zero prices, plan names, or credit numbers (only nav
chrome and meta tags). **Current plan names/prices/credit allocations remain
unverified** — this needs a real browser (JS execution) or a human visiting
the page directly, not a static fetch. Still open, still blocks confirming
the proposed BDT 1,199/~1,200-credit offer.

The terms page and both blog posts *are* server-rendered and yielded
concrete, quotable findings:

| Question | Answer | Source | Date checked | Confidence | Recheck by |
|---|---|---|---|---|---|
| Can a reseller create an account on a customer's behalf? | No, except for an entity the reseller is "authorized to represent." §2.4: "You agree not to create an Account on behalf of any individual other than yourself, except that you may create an Account on behalf of an entity that you are authorized to represent." AIPS has no such authorization (B4). | higgsfield.ai/terms-of-use-agreement | 2026-08-07 | High (direct quote) | 2026-11-07 (terms can change) |
| Is credential/login sharing permitted? | No. §2.4: "You may not share your Account or login credentials with anyone." | higgsfield.ai/terms-of-use-agreement | 2026-08-07 | High | 2026-11-07 |
| Is resale/transfer of the subscription permitted? | No. §5.2(i) prohibits "license, resell, rent, transfer, assign, reproduce, distribute, host, or otherwise commercially exploit the Service"; §1.2's license grant is explicitly "non-transferable, non-sublicensable"; §2.5: workspace/seat rights "not transferable between members." | higgsfield.ai/terms-of-use-agreement | 2026-08-07 | High | 2026-11-07 |
| Can generated outputs be used commercially? | Yes, unrestricted. §4.4: "Company does not claim ownership of any of your Inputs or Outputs, nor does it restrict your commercial use of Outputs." Relevant to the "service opportunities" content (section 12) — that's about reselling *outputs*, not the subscription itself, which is fine per this clause. | higgsfield.ai/terms-of-use-agreement | 2026-08-07 | High | 2026-11-07 |
| What does "unlimited" actually cover? | Not a standalone plan — a toggle available via a 1-day free trial, a 7-day window bundled with Plus/Max/Ultra, or a separate paid "Unlimited Models Marketplace" bundle. Covers all 11 image, 7 video, 5 audio models across all three paths. | higgsfield.ai/blog/new-unlimited-more-models | 2026-08-07 | High | 2026-11-07 |
| Does "unlimited" cover Supercomputer/MCP/CLI? | **No, explicitly excluded.** "Unlimited only applies on the main website with that toggle on. MCP, CLI, Canvas, Supercomputer, Marketing Studio, and Shorts Studio all spend credits regardless." | higgsfield.ai/blog/new-unlimited-more-models | 2026-08-07 | High (direct quote) | 2026-11-07 |
| Does "unlimited" allow parallel/simultaneous generation? | **No.** "Unlimited runs on a relaxed queue by design, allowing 1 image, 1 video, and 1 audio generation at a time" — one at a time, not in parallel. Credit-paid generations use "the faster priority queue" instead. | higgsfield.ai/blog/new-unlimited-more-models | 2026-08-07 | High (direct quote) | 2026-11-07 |
| Does unlimited support 4K output? | Only "Max annual and Ultra annual" unlock 4K on Seedance 2.0; other tiers cap at 1080p under unlimited. | higgsfield.ai/blog/new-unlimited-more-models | 2026-08-07 | High | 2026-11-07 |
| What does Supercomputer cost per generation? | Example figures: an animation step (Seedance 2.0, 10-sec, 1080p, High) = 90 credits (~$4.50); a full end-to-end production workflow ≈ 200 credits (~$10). | higgsfield.ai/blog/higgsfield-supercomputer-guide | 2026-08-07 | Medium (examples, not a rate card) | 2026-11-07 |
| Is Supercomputer included free with any plan? | No — "available on paid plans only. Most meaningful actions require Plus or above," and spends credits regardless of unlimited status (see above). | higgsfield.ai/blog/higgsfield-supercomputer-guide | 2026-08-07 | High | 2026-11-07 |
| Any concurrent-generation figure found? | "Ultra supports 10 active chats/projects at once" (agency-oriented, Ultra-tier-specific — about parallel *projects*, not simultaneous renders). No figure resembling "6 video and 8 image parallel generations" (the number named in the current master prompt's proposed offer) appears anywhere in either blog post. | higgsfield.ai/blog/higgsfield-supercomputer-guide | 2026-08-07 | Medium (absence of evidence, not proof of absence — could be on the unfetched pricing page) | 2026-11-07 |
| Only price actually found anywhere | Plus plan: "$49 is charged to your card" on auto-renewal (trial→paid transition, referenced in passing, not a rate card entry). | higgsfield.ai/blog/new-unlimited-more-models | 2026-08-07 | Medium (one incidental mention) | 2026-11-07 |

### What this means for the proposed BDT 1,199 / ~1,200-credit offer

**Compliance — the current implementation's approach is confirmed correct,
not just cautious.** `data/higgsfield-offer.json`'s customer-owns-the-account
model (compliance category F, no checkout, `docs/compliance/
higgsfield-offer-review.md`) is exactly what §2.4 and §5.2(i) require —
any credential-sharing or AIPS-creates-the-account model would be a direct
terms violation, not just an unverified claim. This is now evidence, not
caution.

**Unit economics — a real red flag, not yet in any doc.** The only
concrete price found ($49/mo for Plus) and the only concrete credit-cost
figures found (~$0.05/credit at the Supercomputer example rate: 200 credits
≈ $10) don't obviously reconcile with "BDT 1,199 for ~1,200 credits" (≈$8 at
~150 BDT/USD). If those 1,200 credits are meant to be usable at
Supercomputer-type rates, $8 of retail price would need to cover roughly
$60 of vendor-side credit value — a large gap that needs explaining before
this offer could be profitable, let alone at the stated price. This is
exactly the calculation `docs/higgsfield/unit-economics.md` (master-prompt
section 10) is supposed to contain, and it doesn't exist yet — see
`BACKLOG.md`.

**"Six video and eight image parallel generations"** (named in the current
master prompt as part of the proposed offer) — no supporting figure found in
either blog post. Not proven false (could be on the unfetched pricing page,
or a real feature of a specific plan neither post covered), but currently
**unverified** and should not be published. `data/higgsfield-offer.json`
already correctly keeps it out of the shipped page — confirmed as the right
call, not something to relax.

## Also open, not yet checked

| Question | Why it matters | Primary source to check |
|---|---|---|
| Current Higgsfield plan names, prices, credit allocations | Pricing page is client-rendered — needs a real browser, not a static fetch | `higgsfield.ai/pricing` (visit directly / screenshot) |
| bKash/Nagad/Rocket current merchant-account requirements | Needed for `docs/compliance/payment-methods.md` (not yet created) | `bkash.com/en/business/merchant`, `nagad.com.bd`, `dutchbanglabank.com/rocket` |
