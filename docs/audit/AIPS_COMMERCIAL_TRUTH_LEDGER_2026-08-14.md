# AIPS Commercial Truth Ledger — 2026-08-14

Status: **ACTIVE CONTROL / OPEN AUDIT DEBT**  
Authority: `ops/ssot/commercial.json` + generated public projection controls  
Scope: AI Premium Shop only

## Why this control exists

The public website has already removed blanket delivery, warranty, refund, privacy, authorization and unsupported performance promises from the most important runtime and crawler surfaces. The raw catalog still contains historical commercial fields and copy that predate those truth controls. Raw retention is useful for reconstruction, but it must not be mistaken for current publication authority.

This ledger makes that distinction mechanical.

## Current approved publication model

AIPS commerce remains publishable. The catalog may continue to show AIPS-owned BDT prices and the stated access model. Those are business-owned catalog facts, not representations of current provider MSRP, discounts, authorization or exact provider entitlements.

Before payment, the exact order must confirm current availability, access arrangement, delivery ETA and applicable terms. Provider-controlled models, credits, quotas, storage, export quality, integrations and licensing require exact-plan verification.

## Claims that are not approved as blanket facts

- Fixed delivery SLA or activation time from legacy `deliverySLA`, `estimatedDeliveryTime`, `deliveryMethod` or `stock` fields.
- Blanket warranty, refund or replacement periods.
- Guaranteed resolution outcomes.
- Product ratings, review counts or aggregate-rating structured data without evidence.
- `Best Seller`, `Best Value`, percentage-off or similar merchandising labels without a current basis.
- Vendor authorization, reseller, partnership or endorsement claims without current written evidence.
- Unlimited/provider-entitlement claims without the exact scope and limit.
- Privacy or account-isolation guarantees inferred only from an access label.

## Mechanical projection rule

In approved-commerce mode the generated public projection preserves catalog identity, AIPS price, `requestPrice`, `accessType`, category and routes, while neutralizing legacy commercial fields that are no longer publication authority:

`deliverySLA`, `estimatedDeliveryTime`, `deliveryMethod`, `stock`, `trust`, `badges`, `competitorCompare`, `whatsappMsg`, `activationType`, `bundleSuggestions`, `higherPlanUpsell`, and `howItWorksSteps`.

In commerce quarantine, the existing fail-closed behavior remains stronger: prices, access models, plan commerce and other protected commercial fields are removed as well.

## Catalog debt snapshot

The SSOT snapshot is validated against `data/products.json`; the build fails if these counts drift without updating the ledger. For evidence completeness, an `officialUSD` value counts as missing when the field is either absent or explicitly `null`.

- 239 catalog records.
- 44 shared-access records.
- 239/239 records missing `commercialStatus`.
- 239/239 records missing `verificationDate`.
- 14/239 records missing `sourceUrl`.
- 159/239 records missing a usable `officialUSD` value (absent or `null`).
- 9 records carry unverified `trust.rating` and/or `trust.reviewCount`.
- Raw/source audit still finds historical claim terms including delivery-minute promises, warranty language, unscoped `unlimited`, instant-delivery labels and unsupported merchandising badges.

These are **open evidence debts**, not blanks to fill with guessed values.

## Shared-access owner decision

On 2026-08-10, Emon Hossain directed restoration of all 44 `accessType: "shared"` SKUs to public sale after the provider/ToS risk was disclosed. That decision authorizes the AIPS business action. It does **not** create provider authorization, close vendor ToS reconciliation, or justify privacy/account-isolation claims.

## Next closure sequence

1. Resolve the two Midjourney shared-vs-personal price inversions as either intentional offers or data errors.
2. Re-verify records in evidence batches and populate `verificationDate`, `sourceUrl`, provider MSRP/officialUSD only where a current source supports them.
3. Replace or delete raw legacy delivery/warranty/merchandising fields as evidence batches close; do not bulk-copy current dates into old records.
4. Classify the 44 shared records vendor-by-vendor for provider terms, authorization and operational risk.
5. Remove the nine unverified trust rating/review blocks from raw canonical data unless primary evidence is added.
6. Keep public claim gates and the governed projection in place even after raw data cleanup so the system cannot silently regress.

## Completion contract

This ledger is not complete when warnings reach zero. It is complete only when every protected commercial fact that is published has a current authority/evidence path, unresolved facts remain explicitly unresolved, and the generated public projection cannot reintroduce deprecated legacy promises.
