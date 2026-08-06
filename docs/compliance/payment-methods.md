# Payment method compliance

**Date:** 2026-08-07. **Status:** logos are a confirmed, unresolved
compliance gap (see below) — everything else on this page is descriptive
of current implementation, not a new finding.

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

## Logo compliance — confirmed gap, not fixed this session

`src/sections/PaymentMethodsSection.tsx`, `src/components/PaymentBadges.tsx`,
and `src/components/PageFooter.tsx` all render **hand-drawn inline SVGs**:
a colored rounded rectangle with a single bold letter ("b", "N", "R") in
each provider's approximate brand color. These are not official assets —
they're approximations built from scratch in this codebase. `public/`
contains no bKash/Nagad/Rocket image files at all (checked this session).

This is exactly the risk the master prompt's payment-asset rules exist to
prevent: *"Do not recreate logos with CSS... Do not distort, redraw, recolor
or hotlink logos... Obtain brand marks only from the provider's official
merchant kit / official brand or press resources... If no authorized
production-quality logo file is available: do not invent one, use a
text-only payment label temporarily, record the missing asset as a
blocker."*

**Not fixed this session because:** I have no legitimate way to obtain the
actual official asset files from an agent session — official brand/press
kits require visiting the provider's site and downloading real image
files (not something a text-based fetch can do), and even if I could
retrieve image bytes, I have no way to confirm licensing/usage-permission
terms for AI Premium Shop's specific use case without human judgement.
Generating replacement logos via any AI tool, or hand-redrawing closer
approximations, would still violate the same rule this is trying to fix.

**Recommended fix, in order of preference:**
1. Owner downloads official SVG/PNG assets directly from each provider's
   brand/merchant kit (bKash: bkash.com/en/business/merchant; Nagad:
   nagad.com.bd; Rocket: dutchbanglabank.com/rocket) and supplies them to
   the repo at `public/brands/payments/<provider>/`.
2. Until then, per the master prompt's own explicit fallback: replace the
   hand-drawn SVGs with **text-only labels** ("bKash", "Nagad", "Rocket" as
   plain styled text, no logo mark) — a smaller but honest visual downgrade,
   safer than continuing to display invented brand marks. Not applied this
   session because it's a visible design change to a live, working section
   and deserves an explicit go-ahead rather than being bundled into a
   compliance-doc pass — flagged in `BACKLOG.md`.

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
