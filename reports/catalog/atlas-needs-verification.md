# ATLAS candidates NOT added — need verification before they can be listed

**Generated:** 2026-08-02 · **Decision:** CEO approved option B (add absent
candidates as request-price pages), applied selectively.

Of the 33 ATLAS candidates absent from the catalog, **14 were added** as
request-price records. The rest were held back. This file explains why, so the
decision is auditable rather than silent.

## Rejected as duplicates of products we already sell (2)

Adding these would have put a "request current price" page directly alongside a
page already quoting a real price for the same product — customer-visible
contradiction, split SEO signal.

| Candidate | Already in catalog as | Existing prices |
|---|---|---|
| SuperGrok / Grok (xAI) | `supergrok-bangladesh` | Shared ৳699 · Lite ৳1,699 · Standard ৳4,990 |
| Make (Make.com) | `make-pro-bangladesh` | Shared ৳499 |

The importer's slug check missed both — "SuperGrok / Grok (xAI)" and "Make
(Make.com)" slugify away from the existing slugs. Dedup now also compares
normalized brand and product names, so this class of collision is blocked.

## Held back pending verification (17)

I do not have reliable knowledge of these products — their current status,
pricing model, or in some cases whether they are still operating. Writing
descriptions for them would be fabrication, which the truth rules forbid, and a
request-price page still makes a factual claim that the product exists and that
AI Premium Shop can source it.

SocialSweep · Membership.io · BuddyPro · ChatAid · HireAlli · Revio ·
YourAtlas · Hiro Finance · HelloFrank · Revaly · Precision · Jigso · timeOS ·
Tempo AI · Supabase Pro · Calendly Pro · Bing (AI search assistant)

Three sub-groups:

1. **Unverifiable / obscure** (SocialSweep, Membership.io, BuddyPro, ChatAid,
   HireAlli, Revio, YourAtlas, Hiro Finance, HelloFrank, Revaly, Precision,
   Jigso, timeOS, Tempo AI) — these read like entries harvested from a
   "top AI tools" listicle. Each needs an official-site check confirming it is
   live, has a paid plan, and is sourceable before it can be listed.

2. **Real but poor fit** (Supabase Pro, Calendly Pro) — Supabase is developer
   backend infrastructure tied to a personal account, Calendly is scheduling
   with limited AI. Neither matches the AI-subscription positioning, and
   reselling account-bound infrastructure raises the same access-model question
   flagged elsewhere in the catalog.

3. **Free product** (Bing AI search) — no paid consumer subscription to sell.
   Appropriate as educational content, not as a catalog listing.

## To release any of these

Confirm: (a) the product is currently operating, (b) it has a paid plan AIPS can
legitimately fulfil, (c) which access model applies. Then add to
`scripts/catalog/add-request-price-products.mjs` and re-run — it is idempotent.
