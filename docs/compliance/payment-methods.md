# Payment method compliance

**Date:** 2026-08-07. **Status:** logos were a confirmed compliance gap;
`PaymentMethodsSection.tsx` has since been switched to the text-only
interim fallback (see Logo Compliance below) — the underlying gap (no real
official asset files) is still open, only the invented-mark risk is
resolved.

## Current accepted methods (post Binance-removal, 2026-08-07)

bKash, Nagad, Rocket, Bank Transfer. Binance was removed sitewide earlier
this session — no crypto payment method is currently offered anywhere on
the site, matching the master prompt's explicit rule pending written
Bangladesh legal/compliance review (none on file).

## Per-method record

| Field | bKash | Nagad | Rocket | Bank Transfer |
|---|---|---|---|---|
| Public name | bKash | Nagad | Rocket | Bank Transfer |
| Provider | BRAC Bank-backed MFS | Nagad (Bangladesh Post Office-backed) | Dutch-Bangla Bank | N/A (generic) |
| Receiving-account type | **Unverified** — not confirmed whether AIPS's receiving number is a registered merchant account or a personal/agent number | **Unverified** | **Unverified** | **Unverified** — which bank(s), account type |
| Merchant agreement on file | **Unverified** — no document found in this repository | **Unverified** | **Unverified** | N/A |
| Approved public wording | "Accepted payment methods" (already in use, correct — matches the master prompt's required heading) | same | same | same |
| Logo source used today | **None legitimate — see Logo Compliance below** | Same | Same | N/A — text label only, which is correct per the "neutral icon for bank transfer" rule |
| Checkout process | Customer sends payment manually to a number/account given over WhatsApp; no integrated gateway | Same | Same | Same |
| "Partner" language used anywhere? | Not found in this session's searches — good, matches the rule against calling providers "partners" without an agreement | — | — | — |

## Logo compliance — text-only fallback applied, real assets still needed

`src/components/PaymentBadges.tsx` and `src/components/PageFooter.tsx`
already rendered brand-colored text (`{method.name}` in a colored pill),
not fabricated logo marks — no change needed there.
`src/sections/PaymentMethodsSection.tsx` previously rendered **hand-drawn
inline SVGs**: a colored rounded rectangle with a single bold letter ("b",
"N", "R") in each provider's approximate brand color — an invented
approximation of each real logo, not a text label. `public/` contains no
bKash/Nagad/Rocket image files at all (checked 2026-08-07).

This was exactly the risk the master prompt's payment-asset rules exist to
prevent: *"Do not recreate logos with CSS... Do not distort, redraw, recolor
or hotlink logos... Obtain brand marks only from the provider's official
merchant kit / official brand or press resources... If no authorized
production-quality logo file is available: do not invent one, use a
text-only payment label temporarily, record the missing asset as a
blocker."*

**Fixed 2026-08-07:** `PaymentMethodsSection.tsx` no longer draws any
letter-mark shape. Each card now shows a plain colored accent bar (no
letterform, not shaped like a logo) plus the existing bold-text
`<h3>{method.name}</h3>` label — text only, per the master prompt's own
sanctioned interim fallback. This is a visual downgrade from the old
(non-compliant) card, not a redesign; it should be swapped for a real
`<img>` the moment an official asset exists.

**Still not obtainable from an agent session:** the actual official asset
files. Official brand/press kits require visiting the provider's site and
downloading real image files (not something a text-based fetch can do),
and even with image bytes, licensing/usage-permission terms for AI Premium
Shop's specific use case need human confirmation. Generating replacement
logos via any AI tool, or hand-redrawing closer approximations, would
still violate the same rule this fix resolves.

**Recommended follow-up:** Owner downloads official SVG/PNG assets
directly from each provider's brand/merchant kit (bKash:
bkash.com/en/business/merchant; Nagad: nagad.com.bd; Rocket:
dutchbanglabank.com/rocket) and supplies them to the repo at
`public/brands/payments/<provider>/` — see `docs/brand/payment-assets.md`
for the exact wiring steps once files exist.

## Merchant/business-account status

Not verifiable from this repository or from public web sources — whether
AIPS's bKash/Nagad/Rocket receiving numbers are registered merchant
accounts, agent accounts, or personal accounts is private account
information only the owner has. Per `BLOCKERS.md`-style treatment: this is
recorded as unverified, not assumed either way. No public copy on the site
claims "merchant" or "authorized" status for any of these (checked) — so
there's no existing overclaim to walk back, just an open verification gap.

## Recheck

Provider brand guidelines and merchant terms can change; recheck this
document within 6 months of any payment-section redesign, and immediately
if any provider requests a takedown or raises a brand-usage concern.
