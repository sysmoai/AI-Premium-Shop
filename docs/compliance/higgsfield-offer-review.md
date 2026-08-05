# Higgsfield AI offer — vendor compliance review

**Date of review:** 2026-08-05
**Reviewed by:** Claude Code session (Opus 5), on the owner's instruction
**Approval owner:** Emon Hossain (CEO/Founder, AI Premium Shop)
**Status:** DECIDED — Category F, inquiry-only. Not open for re-interpretation by
a future session without new written evidence.
**Machine-readable state:** `artifacts/aips-landing/data/higgsfield-offer.json`
**Enforced by:** `artifacts/aips-landing/scripts/validate-higgsfield-offer.mjs`
(runs in `pnpm run build`; exits non-zero on violation)

---

## 1. The proposed offer, as supplied

The business supplied these as inputs, on promotional creatives and in the
brief:

| Input | Value as supplied |
|---|---|
| Product | Higgsfield AI Plus |
| Duration | 1 month |
| Target price | BDT 1,199 |
| Monthly credits | 1,200 |
| Access claimed | image, video and audio tools |
| Unlimited claimed | "eligible unlimited models", Seedance unlimited |
| Supercomputer | claimed included |
| Support | free live Google Meet onboarding |
| Contact | WhatsApp 8801865385348 |
| Offer end on creative | **2 August 2026 — already expired at review time** |

These were treated as **proposed business inputs, not verified facts**, per the
brief's own instruction. A promotional image is not a source of truth.

## 2. Authorization determination

The owner confirmed directly (5 Aug 2026) that AI Premium Shop holds **no
written reseller, affiliate or partnership authorization from Higgsfield**.

| Authorization type | Held? | Evidence |
|---|---|---|
| Written reseller authorization | No | — |
| Affiliate / partnership authorization | No | — |
| Authorization to create accounts for customers | No | — |
| Authorization to sell subscriptions at a markup | No | — |
| Authorization to transfer subscriptions | No | — |
| Authorization to share login credentials | No | — |
| Authorization to place customers in a shared workspace | No | — |
| Authorization to advertise as an official provider | No | — |
| Authorization to use Higgsfield trademarks commercially | No | — |

## 3. Classification

**Category F — unverified delivery model.**

Under the compliance gate the business itself defined: *"Do not enable checkout
for F or G."* That is binding here.

## 4. Delivery model published

The compliant implementation the brief itself names as preferred when reseller
authorization is absent:

- The **customer creates and controls their own Higgsfield account**, with their
  own email, password and recovery access.
- AI Premium Shop provides **payment assistance and setup/onboarding only** —
  the USD-billing step a Bangladeshi debit card typically cannot complete.
- **Renewal and cancellation belong to the customer**, directly with the vendor.
- The service fee and the subscription cost are stated separately before payment.
- The page carries an independent-provider disclaimer above the fold.

AIPS never holds the login, never shares credentials, and never places unrelated
customers in one workspace.

## 5. Claims approved for publication

| Claim | Basis |
|---|---|
| Platform capabilities (text-to-video, image-to-video, camera controls, talking avatar/lip-sync, UGC formats, AI image, credit-based plans) | Vendor's own public material, verified 2026-07-30, sourced to `higgsfield.ai/pricing` on the page |
| BDT 1,199 indicative service price, 1 month | Owner-attested 2026-08-05. Published as **AIPS's own fee**, explicitly indicative, confirmed on WhatsApp before payment |
| Customer owns the account, renewal and cancellation | The delivery model above |
| Payment via bKash / Nagad / Rocket / bank / Binance Pay | Existing, operating payment channels |
| Free live Google Meet onboarding | Owner-attested; a service AIPS itself performs |
| Credit systems are budgets, not video counts | Generic, accurate explanation of credit-based pricing |

## 6. Claims BLOCKED from publication

| Blocked claim | Reason |
|---|---|
| "1,200 monthly credits" | Not re-verified against current vendor pricing. Credit allocations change. |
| "Unlimited eligible models" | No documented scope. §15: no "unlimited" without scope. |
| "Seedance unlimited" | Model availability varies by plan, account and region. |
| "Supercomputer access" | Unconfirmed at this tier; unknown whether it spends credits. |
| Specific model roster (Seedance, Kling, Veo, Sora, WAN) and any version number | Rosters change without notice; version numbers must never be guessed. |
| "Official" / "authorized" / "partner" / "endorsed" | No authorization on file. |
| "30-day replacement guarantee" | No written policy for a customer-owned third-party account AIPS does not control. |
| "10,000+ customers since 2022" | No evidence supplied. Removed from this product's record. |
| "Full privacy" as a generic bullet | Only meaningful where the customer owns the account — so the page states the ownership fact instead of the marketing phrase. |
| Offer-end date of 2 August 2026, and any countdown | Expired. No auto-renewing or fake countdown is rendered. |

Rather than silently dropping the blocked vendor claims, the page publishes them
in a **"What we have not verified"** section, each with the reason it is
unconfirmed. A buyer whose purchase depends on one of them is told to get it
confirmed in writing first.

## 7. What changed in the repository

- `artifacts/aips-landing/data/higgsfield-offer.json` — new single source of truth.
- `artifacts/aips-landing/scripts/validate-higgsfield-offer.mjs` — new build gate.
- `artifacts/aips-landing/src/pages/HiggsfieldPage.tsx` — dedicated page. Does
  **not** use `ProductPage.tsx`, whose trust bar hardcodes "10,000+ customers",
  "30-day warranty" and "Instant delivery" into every product page it renders.
- `artifacts/aips-landing/data/products.json` — Higgsfield record: unsupported
  customer-count, "full privacy" and warranty claims removed; compliance and
  ownership fields added.

## 8. Open questions for the owner

1. **Is there any documentary evidence for "10,000+ customers since 2022"?**
   It is still hardcoded in `ProductPage.tsx` (4 places) and in ~70 catalog
   records, so it currently renders on most product pages. Removed from
   Higgsfield only. This needs a decision — it is the single most repeated
   unevidenced claim on the site.
2. **Is the "30-day replacement guarantee" a written policy?** If yes, it can be
   published with a link to it. It appears on ~85 records today.
3. **Does the business want to pursue actual Higgsfield authorization?** With a
   signed agreement this offer moves to Category A and a real checkout becomes
   available.
4. **Confirm the vendor entitlements** (credits, unlimited scope, Supercomputer)
   from inside the live account, and the review moves those into published facts.

## 9. Re-enabling a transactional offer

Do not edit the page to enable a CTA. The sequence is:

1. Obtain and file the written authorization; put its location in
   `compliance.authorizationEvidence`.
2. Set `compliance.authorizationOnFile: true`, `category` to `A`–`E`, and
   `ctaEnabled: true` in `higgsfield-offer.json`.
3. Move verified entitlements out of `pendingVerification` into
   `platform.capabilities`, each with a `sourceUrl` and `verifiedOn`.
4. Set real future `offerStart` / `offerEnd` dates if running a dated promotion.
5. `pnpm run build` — the gate re-checks all of the above and fails if any step
   was skipped.
