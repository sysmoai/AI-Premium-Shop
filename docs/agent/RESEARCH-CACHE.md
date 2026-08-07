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

## Chatbot Arena leaderboard — checked 2026-08-07

| Question | Answer | Source | Date checked | Confidence | Recheck by |
|---|---|---|---|---|---|
| Which model currently ranks #1 overall on Chatbot Arena (arena.ai)? | Anthropic claude-fable-5 (score 1508±6) | arena.ai/leaderboard | 2026-08-07 | High | 2026-08-21 (this leaderboard moves fast — 2-week recheck, not the usual 3-month) |
| Which model ranks #1 for Creative Writing specifically? | Anthropic claude-opus-5-high | arena.ai/leaderboard | 2026-08-07 | High | 2026-08-21 |

**Why this matters:** the site's copy (`BrandPage.tsx`, `BestAISubscriptionPage.tsx`,
`CategoryPage.tsx`, `ComparisonPage.tsx`) cites "Opus 4.6" as the model
"ranked #1 on Chatbot Arena" — that's not the model currently topping the
board (Fable 5 / Opus 5 family now leads). Two problems, not one: the rank
claim is stale, AND the specific model version named is stale (unrelated to
whether "Claude Pro" the subscription even maps to that version — not
checked). Treated as unverified-as-stated and fixed same session (see
`WORKLOG.md`) rather than left open, since the fix (remove the specific
rank+version claim, keep accurate non-time-sensitive description) doesn't
need further research to be safe.

## Bangladesh AI-subscription market, customer pain points, and SEO gaps — checked 2026-08-07

Three parallel research passes (owner asked for a broad "understand the
business, customers, and market" pass; this is the read-only research half —
none of it was published to the live site automatically, it's an input to
future content/copy decisions). None of this contradicts or duplicates the
existing Higgsfield/Chatbot-Arena entries above.

### Competitor landscape

| Competitor / model | Notable pattern | Source |
|---|---|---|
| Subscriptions Mart BD | Claude Pro ৳2,849/mo; stacks trust badges (DBID registration, "Google Business Verified," Trustpilot) but only 4 visible reviews behind a 4.75/5 rating; refund terms quietly exclude "usage limit/account restriction" | subscriptionsmartbd.com |
| BD Subscription | ChatGPT Plus shared ৳399, personal ৳2,200; claims "government-registered... established 2023" and "25,000+ customers" (unverifiable, same pattern as AIPS's own flagged B1 claim); a blog post carries a forward-dated publish date, a templated-content tell | bdsubscription.com |
| FanFlix BD | ChatGPT Plus shared ৳500, personal ৳2,750; one of several "OTT + AI" combo shops (same model as Netflix-reseller sites pivoting into AI resale) | fanflixbd.com |
| Tech Haat | Claims "trusted provider since 2017"; Claude Pro from ৳2,300 | tech-haat.com |
| EnterTool (India, adjacent market) | Explicit "group buy" framing, ₹549/mo advertised as "73% off official ₹1,999," WhatsApp delivery in 2-5 min — more transparent about the shared-seat model than most BD sellers | entertool.com |
| SubsPk (Pakistan, adjacent market) | WhatsApp-order → JazzCash/EasyPaisa → screenshot proof → manual activation — the same no-payment-gateway flow AIPS likely runs informally | subspk.com (via search) |
| Daraz.com.bd marketplace listings | Same subscriptions sold as generic listings with minimal seller-specific trust signals | daraz.com.bd |
| Telegram/marketplace resellers (Z2U, FunPay, G2G) | The clear "don't look like this" reference — $5 shared-seat accounts, no business identity, search results explicitly flag ties to stolen-card fraud | — |

**Direct SERP competitor worth flagging to the owner:** OneBrain.app runs
content-marketing posts with near-duplicate titles to AIPS's own ("Claude
Pro Price in BD: bKash Guide 2026," "ChatGPT Price in BD 2026: bKash, No
Card") and pitches a cheaper multi-model aggregator (৳199/mo). Direct
competition for AIPS's exact target queries.

**Positioning ideas, none requiring an unverifiable claim:**
- Specific, checkable operational details (support hours, response-time
  commitment) beat another unverifiable trust badge — every competitor
  above leans on badges, not specifics.
- State refund/replacement scope plainly (closes B2) rather than a vague
  guarantee — Subscriptions Mart BD's fine-print exclusion is exactly the
  kind of thing that erodes trust when discovered after purchase, not
  before.
- Keep the shared-vs-personal distinction explicit in every listing
  (already this project's direction per B5) — several competitors blur it.

### Customer pain points — why a reseller exists, and what buyers actually distrust

**Real, cited friction points with buying AI subscriptions directly from Bangladesh** (general market facts, not AIPS-specific claims — safe to reference in explanatory copy):

| Friction point | Detail | Source |
|---|---|---|
| Credit-card ownership | ~2.9M Bangladeshis hold a credit card (~1.6-1.7% of the population) — most people simply have no instrument the vendor's checkout accepts | Bangladesh Bank, Nov 2025 monthly credit-card report (bb.org.bd) |
| PayPal unavailable | No local PayPal account can be opened or funded from Bangladesh as of 2026 — a full access block, not a fee issue | nsave.com/bangladesh/paypal |
| Vendor/processor country-support gap | OpenAI officially supports paid ChatGPT in ~89 countries while its processor (Stripe) covers 164 — Bangladesh can fall in that gap, producing "payment method not available" errors even with a working card | weam.ai guide (secondary source, not OpenAI directly — treat as directional) |
| Bank-side forex restrictions | Bangladesh Bank regulates international-card forex release; banks have separately cut foreign-currency credit limits, and recurring USD subscription charges are exactly the pattern issuing banks flag | bb.org.bd forex guideline vol.1 ch.19; TBS News reporting on banks cutting FX limits |
| No direct bKash/Nagad/Rocket support from vendors | Confirmed by multiple independent third-party guides — this is the entire reason local resellers exist | Cross-referenced across several BD guide sites |

**Top 5 trust objections a first-time buyer has, and an honest (non-fabricated) way to address each:**
1. *"My shared account will get banned and I lose my money"* — real risk, not hypothetical (reseller/marketplace ChatGPT accounts are routinely suspended under vendor ToS with no vendor recourse). Honest fix: a specific written replacement/reissue policy (closes B2), not a vague "guarantee."
2. *"Is this seller actually authorized by the AI company?"* — honest fix: state plainly what AIPS is (purchase-assistance/reseller) and isn't (not an official partner), matching the existing B4/B5 stance rather than implying authorization.
3. *"They'll take my bKash payment and vanish"* — general BD e-commerce research finds prepayment fraud is the dominant reason local buyers still prefer cash-on-delivery. Honest fix: a visible, verifiable delivery-time commitment and a real, responsive support channel.
4. *"The reviews are probably fake"* — honest fix: never publish unverifiable aggregate testimonial/review counts (matches the existing `validate-catalog.mjs` rule already flagging "9 records carry unverified trust.reviewCount/rating").
5. *"Is there an actual written policy, or just a promise?"* — directly maps to B2; link a real policy page instead of a headline claim.

### SEO / content-gap opportunities (distinct from `docs/seo/GAP-CHECKLIST.md`, which is about crawler-visibility, not search-intent)

All items below map to an **existing** page needing a section/FAQ addition — none require a new route, consistent with this project's "don't create hundreds of SEO pages" rule:

1. Google AI Pro's Bangladesh student free offer ended 2026-03-11, but old news coverage still ranks for "Google Gemini Pro free Bangladesh student" — add an explicit "the free offer ended, here's the current alternative" section to the existing Google AI Pro page.
2. Reseller ban-risk/legality is a real, distinct search cluster (independently confirmed via search) — the chatbot already answers this (BACKLOG #24, done) but it isn't in static crawlable HTML yet. Add an explicit ban-risk/legality Q&A to `FAQPage.tsx`.
3. Wide reseller price dispersion across the market (Midjourney BD found ranging ৳199-16,500/mo elsewhere) signals real buyer confusion — a short "why prices vary so much elsewhere" trust note on `/midjourney-bangladesh` could help.
4. SSC/HSC-level students (a younger, free-tool-focused intent) are distinct from the university-student framing the existing student guide uses — add a subsection rather than a new page.
5. bKash payment troubleshooting ("payment failed," "screenshot not received") is its own search intent — add a troubleshooting FAQ block to the existing bKash guide post.
6. Bangla-script title targeting: at least one competitor uses literal "বিকাশ" (not just transliterated "bKash") in titles/H1s — worth checking `/bn` titles use Bangla script consistently (ties into the already-tracked B7 Bangla-quality gap).

None of this was implemented as new page content this turn — it's queued in `BACKLOG.md` for a dedicated content pass, since copy changes (especially bilingual ones) deserve their own careful review rather than being rushed alongside code changes.

## Also open, not yet checked

| Question | Why it matters | Primary source to check |
|---|---|---|
| Current Higgsfield plan names, prices, credit allocations | Pricing page is client-rendered — needs a real browser, not a static fetch | `higgsfield.ai/pricing` (visit directly / screenshot) |
| bKash/Nagad/Rocket current merchant-account requirements | Needed for `docs/compliance/payment-methods.md` (not yet created) | `bkash.com/en/business/merchant`, `nagad.com.bd`, `dutchbanglabank.com/rocket` |
