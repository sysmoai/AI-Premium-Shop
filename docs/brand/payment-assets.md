# Payment brand assets — manifest

**Status: EMPTY. No legitimate official asset files exist in this repo.**
See `docs/compliance/payment-methods.md` for the full compliance writeup —
this file is the asset-tracking manifest the master prompt asked for
specifically, kept separate since one is a compliance record and this one
is meant to be updated every time an asset is actually added.

## Current state (2026-08-07, revised same day)

`PaymentBadges.tsx` and `PageFooter.tsx` already rendered text-only brand
pills, not fabricated logos — no change needed. `PaymentMethodsSection.tsx`
was the one file rendering a hand-drawn logo approximation; first switched
to a plain colored accent bar (compliant, but the owner flagged it as
looking broken/unfinished), then revised to a colored icon badge using a
generic lucide icon per payment type (Smartphone/MessageCircle/Wallet/
Landmark — none resemble the real marks) — see
`docs/compliance/payment-methods.md` for the full before/after, verified
with real screenshots.

| Brand | Asset filename | Official source | Download date | Guideline/permission | Approved variation | Alt text | Pages using it |
|---|---|---|---|---|---|---|---|
| bKash | *(none)* | *(not obtained)* | — | — | — | — | All 3 files now text/generic-icon only (no fabricated mark anywhere) |
| Nagad | *(none)* | *(not obtained)* | — | — | — | — | same |
| Rocket | *(none)* | *(not obtained)* | — | — | — | — | same |
| Bank Transfer | N/A | N/A | N/A | N/A | Text label + generic icon (correct per policy — no single trademarked bank) | "Bank Transfer" | same |

## How to add a real asset (for whoever does this next)

1. Obtain the SVG/PNG directly from the provider's own official brand,
   press, or merchant-kit page — never a logo-aggregator site, search
   results, or an AI image generator.
2. Save to `public/brands/payments/<provider>/<provider>-primary.svg` (and
   a `-reverse.svg` variant if the provider publishes one suited to a dark
   background — this site's whole visual identity is dark).
3. Preserve the original SVG `viewBox`; strip only non-visual metadata
   (editor cruft, unused `<defs>`) — do not recolor, restretch, or alter
   proportions.
4. Update this table: filename, exact source URL, download date, and the
   specific guideline/permission page you checked.
5. Wire it into `PaymentMethodsSection.tsx` / `PaymentBadges.tsx` /
   `PageFooter.tsx` with explicit width/height (no layout shift) and real
   alt text (e.g. `alt="bKash"`, not `alt=""` — these are meaningful
   standalone logos, not decorative).
6. Remove the corresponding hand-drawn SVG block it replaces.

## Why this wasn't done automatically this session

An agent session can read and write text, and fetch text/markdown content
from URLs, but cannot browse to a provider's brand-kit page, click through
to a real image file, verify its usage license applies to AI Premium Shop's
specific case, and download the binary asset — that combination of steps
needs a human, at least for the first acquisition of each asset. Once real
files exist in the repo, an agent can absolutely maintain/update them going
forward.
