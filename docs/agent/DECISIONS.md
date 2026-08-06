# Decisions

## D16.1 — Higgsfield gets its own page component, not the shared template

`ProductPage.tsx` hardcodes "10,000+ customers since 2022", "30-day warranty" and
"Instant delivery" into its trust bar, AIO paragraph, default USP list and meta
description. Those are unevidenced (see BLOCKERS B1, B2). A page whose entire
position is "we publish only what we can evidence" cannot inherit them.

Alternative considered: strip the claims from `ProductPage.tsx` first. Rejected
for now — that changes ~70 live revenue pages on an unresolved business fact,
which is the owner's call, not a side effect of building one product page.

The route is registered **above** `/product/:slug`; wouter matches in order, so
the catch-all would otherwise win.

## D16.2 — Unverified claims are published as open questions, not dropped

The supplied selling points (1,200 credits, unlimited Seedance, Supercomputer
access) could have been silently omitted. Instead the page carries a "What we
have not verified" section listing all six with the reason each is unconfirmed.

Rationale: a buyer purchasing *because of* one of those claims is better served
by being told it is unconfirmed than by its absence. It is also a real
differentiator against resellers who repeat poster copy as fact.

## D16.3 — The service price is published; vendor entitlements are not

BDT 1,199 is AIPS's own fee, which the owner can attest, so it is shown as
`indicative` with an attestation date and an explicit "confirmed on WhatsApp"
before payment. Vendor-side facts are a different epistemic class and stay
unpublished until verified. `validate-higgsfield-offer.mjs` enforces the split.

## D16.4 — No Offer node in the Higgsfield structured data

An enquiry-only page emitting a priced `Offer` would be structured data that
contradicts its own visible state — exactly what spec section 16 forbids.
`seo-check` asserts this cannot regress.

## D16.5 — Flash fixed with inline critical CSS, not by switching to hydrateRoot

The textbook fix for the static-to-React swap is `hydrateRoot`. Not done: the
prerendered markup is built by a string extractor in `prerender-products.mjs`,
not by React, so hydration would mismatch on every page. The flash's actual root
cause was the missing pre-CSS background, which the inline style fixes outright.
Proper SSG is scoped as separate work in `docs/performance/page-load-flash.md`.

## D17 — Did not delete/unalias the stray live `aips-website-two.vercel.app` deployment

Found it publicly live, serving stale facts, with no canonical tag and a
permissive robots.txt — see `BLOCKERS.md` B11. The actual fix is a Vercel
infrastructure action (delete the project, remove the deployment/alias, or
turn on Deployment Protection), not a code change. Deleting or unaliasing
live infrastructure is hard to reverse and affects shared state outside this
repository's own deploy pipeline, so it needs the owner's explicit go-ahead
even though the CLI session had the access to do it directly. Hardened the
archived app's `robots.ts` instead — safe, reversible, and closes the gap if
that app is ever accidentally redeployed, without touching what's live today.

## D16.6 — Alias canonicals resolved generically

`/privacy` vs `/privacy-policy` was fixed by extending the prerender's existing
alias resolver to cover plain `component={X}` routes, rather than special-casing
privacy. Any future two-paths-one-component alias is now handled, and the
resolver warns when such a component declares no canonical at all.
