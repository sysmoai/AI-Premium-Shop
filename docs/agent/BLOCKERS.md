# Blockers

Items that cannot be resolved by reading the repository. Each needs a human
decision or a document that does not exist yet. Do not "resolve" these by
guessing — every one of them is a claim that carries legal or revenue risk.

---

## B1 — "10,000+ customers since 2022" has no evidence on file (HIGH)

**Status:** open. Owner decision required.

This is the single most-repeated unevidenced claim on the site. It renders on
almost every product page, and it is hardcoded in code as well as data:

- `src/pages/ProductPage.tsx` — 4 places: `USP_DEFAULT` (line ~128), the
  request-price meta description (~196), the AIO quick-answer paragraph (~298),
  and the trust bar (~543).
- `data/products.json` — ~70 records carry it inside a FAQ answer.
- `index.html` — the site-wide default meta description.

Session 16 removed it from the Higgsfield record and did **not** use
`ProductPage.tsx` for that page, precisely so the new page could avoid it. It was
deliberately **not** bulk-removed elsewhere: that is ~70 live revenue pages, and
whether the number is true is a business fact only the owner can attest.

**Decision needed, one of:**
1. Evidence exists → keep it, record the source in `docs/compliance/`, and add
   the attestation date to the copy.
2. No evidence → replace with a factual operational statement everywhere
   (a one-commit change once the wording is chosen).

Until then `validate-truth.mjs` keeps flagging it and `seo-check` does not,
because a customer count is not mechanically checkable.

## B2 — "30-day replacement guarantee" is not a written policy (HIGH)

~85 records and `ProductPage.tsx`'s trust bar assert it. `/refund-policy` exists
but does not clearly cover replacement of a third-party account AIPS does not
control. Needs either a written policy to link to, or removal.

## B3 — Higgsfield vendor entitlements unverified (MEDIUM, blocks revenue)

Six claims sit in `higgsfield-offer.json → pendingVerification`: the 1,200-credit
allocation, "unlimited eligible models", Seedance unlimited, Supercomputer
access, the model roster, and the replacement guarantee.

These need someone to open the actual Higgsfield account and the current pricing
page and record what is true. Until then the page publishes them as open
questions, which is honest but converts worse than confirmed features would.

## B4 — No Higgsfield reseller authorization (HIGH, blocks checkout)

Confirmed by the owner 2026-08-05. Keeps the offer at compliance category F:
enquiry-only, no checkout, no "official"/"partner"/"authorized" language.
`docs/compliance/higgsfield-offer-review.md` §9 has the exact steps to move to a
transactional offer if authorization is ever obtained.

## B5 — Shared-access authorization for the other 44 products (HIGH)

Carried forward from session 2 and still open. 44 catalog records are marked
`accessType: "shared"`. The same question that produced B4 applies to them, and
the answer may be different per vendor. Not touched in session 16 — out of the
Higgsfield scope, and too large to resolve without the owner.

## B6 — No Higgsfield MCP / Supercomputer integration is connected (LOW)

Spec section 14 asks for original demo media generated through Higgsfield's own
tooling. No such MCP server is connected to this workspace, and the `notion` MCP
that is configured is unauthenticated in non-interactive sessions. No credits
were spent, and `content/higgsfield/asset-manifest.json` was therefore not
created — there are no assets to manifest. Reopen when an integration exists and
the owner approves credit spend.

## B7 — Bangla prose needs a native-speaker read (MEDIUM)

Carried from session 15. The Bangla pages exist and are consistent with the
English facts, but nobody has confirmed they read naturally. Session 16 added
only two short Bangla link labels, no new Bangla prose.

## B8 — Vercel free-tier deploy cap (LOW, operational)

100 deploys / rolling 24h, shared across the team's projects. Over the cap,
pushes silently do nothing. `scripts/deploy-live.sh --wait` parks and retries.
The only real fix is a paid plan — an owner decision.
