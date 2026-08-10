# AI Premium Shop — Safe Ecommerce + Product/Plan + Media Architecture Upgrade

**Date:** 2026-08-10 (Asia/Dhaka)  
**Scope:** Architecture and migration plan only.  
**Production impact:** None from this document. No live route, product, price, database row, domain, or deployment is modified by this plan.  
**Primary rule:** Preserve the current AIPS stack and production safety controls. Upgrade by adding clear boundaries, adapters, validation and progressive release—not by rewriting the website.

---

# 0. Executive decision

AI Premium Shop should **not** migrate to a new framework, a new ecommerce platform, or a new CMS as the first move.

The repository already contains the core pieces needed for a strong ecommerce architecture:

- React + TypeScript + Vite frontend.
- Wouter routing.
- Existing rich Products, Product, Brand, Category, Comparison, Guide and Blog page implementations.
- Existing API server.
- Existing Drizzle/Postgres database package.
- Existing generated React API client and Zod/API spec libraries.
- Existing cart and order routes.
- Existing admin product/order surfaces.
- Existing `@aips/media` library with responsive images, AVIF/WebP, lazy media, carousel, HLS/MP4/WebM video, Sharp optimization, EXIF stripping and upload validation.
- Existing catalog/truth validators.
- Existing prerender pipeline.
- Existing commerce-quarantine layer.
- Existing Vercel configuration and preview workflow.

The correct upgrade is to **turn these existing pieces into one coherent publishing architecture**.

The target system must let AIPS create rich ecommerce pages for every product and plan while guaranteeing that a photo, video, poster, SEO edit, or legacy dataset cannot accidentally publish an unapproved price, access method, delivery promise, warranty, review count, provider relationship, or sales CTA.

---

# 1. Findings from the architecture audit

## 1.1 Two site generations currently coexist

The repository contains a mature ecommerce/content generation with `ProductPage.tsx`, `ProductsPage.tsx`, `BrandPage.tsx`, `CategoryPage.tsx`, `ComparisonPage.tsx`, Blog/Guide pages and admin components.

The current React entry point, however, routes through `SafePublicSite`, which intentionally places older commercial routes behind a verification/review layer.

This is not a reason to discard either generation. The safe architecture is:

> **Reuse the mature ecommerce UI, but make it consume the verified public projection produced by the current safety layer.**

## 1.2 Product data is too mixed

Current product datasets and the database combine several different truth domains in the same record:

- product identity,
- provider facts,
- AIPS price,
- plan/tier,
- access model,
- marketing description,
- Bangla copy,
- delivery SLA,
- WhatsApp copy,
- stock,
- SEO metadata,
- FAQs,
- trust/warranty claims,
- competitor content,
- media references.

That makes a content or visual edit capable of affecting commercial facts, and makes it difficult to prove which fields are authoritative.

## 1.3 The generic ProductPage is valuable but unsafe as a direct data consumer

The existing ProductPage already includes most ecommerce modules AIPS needs:

- breadcrumbs,
- product hero,
- sticky buy box,
- plan selector,
- duration selector,
- feature and limitation panels,
- plan comparison table,
- Bangladesh use cases,
- Why AIPS section,
- competitor comparison,
- how-it-works flow,
- trust bar,
- FAQ,
- related products,
- freshness display,
- mobile sticky order bar.

It also has model fields for `gallery` and `videoDemoUrl`.

However, its historical fallback copy can synthesize commercial claims such as warranty, delivery speed, customer counts and payment assumptions. Therefore it should be retained as a **presentation shell** but refactored so all commercial sections are driven only by an approved public view model.

## 1.4 The media foundation already exists

The shared `@aips/media` workspace library already includes:

- responsive image components,
- AVIF/WebP support,
- lazy loading,
- media carousel,
- HLS/MP4/WebM video player,
- poster thumbnails,
- Sharp-based optimization,
- EXIF metadata handling/GPS stripping,
- magic-byte upload validation,
- optional SVG optimization.

The upgrade should promote this library to the official AIPS product-media subsystem instead of introducing an unrelated media stack.

## 1.5 Current database is intentionally simple

The `products` table is flat. It includes fields such as slug, name, brand, category, price, tier, access type, delivery SLA, description, stock and WhatsApp message.

This table should not be destroyed. It should be treated as **legacy/read-compatible commerce data** while new normalized tables are added beside it.

## 1.6 Existing API/admin should be extended, not replaced

The API server already exposes products, cart, orders and admin routes. The React admin already has product CRUD.

The new architecture should turn this into a controlled **Product Publishing Console**.

## 1.7 Deployment/publication ownership is not explicit enough

The connected Vercel account contains multiple AIPS-related projects. The project named `aips-landing` currently does not show the production custom domain/deployment relationship expected for `aipremiumshop.com` in the connected project metadata. Production ownership must therefore be resolved and recorded explicitly before architecture code is merged.

A release must never depend on an engineer remembering which Vercel project actually owns the domain.

## 1.8 Critical publication consistency is P0

The current main-branch commercial SSOT has:

- `publication_allowed: false`,
- `quarantine: true`,
- no approved public SKUs,
- no approved public prices,
- no approved access models,
- no approved payment facts,
- no approved delivery facts,
- no approved warranty/refund facts,
- no approved social proof.

The public site/build projection must be reconciled against this source before expansion.

The architectural rule is:

> **React, prerendered HTML, JSON-LD, sitemap output, feeds, admin preview and public APIs must all use exactly the same publication policy.**

No renderer is allowed to read raw historical commerce data directly.

---

# 2. Non-negotiable architecture principles

## Principle A — preserve the stack

Keep the current React/Vite/TypeScript/Wouter frontend, current monorepo, API server, Drizzle/Postgres package, API-client package, media package, validators and Vercel deployment model.

## Principle B — additive migrations only

No destructive database migration, mass route deletion, mass URL rename, or replacement of the live site in one release.

## Principle C — one public projection

There must be one function/service responsible for determining what the public is allowed to see.

## Principle D — media cannot control commerce

Images, posters, videos, captions and graphical assets are independent from prices, stock, access type and purchase eligibility.

## Principle E — no raw database row is a public product

Database rows and research records are internal facts. Public pages use a sanitized, typed `PublicProductView`/`PublicPlanView`.

## Principle F — one route registry

Canonical URLs, aliases, redirects, index policy and page ownership belong in one registry, not in hand-maintained lists spread across React, prerender scripts and Vercel configuration.

## Principle G — product family and plan are separate entities

A product such as ChatGPT, Claude, Midjourney or Cursor is a product family/entity. A Plus/Pro/Team/Personal/Shared tier is a plan/offer variant. The model must not force every plan to masquerade as an independent product.

## Principle H — every public commercial fact has provenance

A price, access model, delivery promise, payment method, warranty/refund statement or provider relationship needs source/approval, status, verifier/approver, timestamp and optional expiration/review date.

## Principle I — safe failure

If facts conflict or become stale, the page falls back from sellable → request current price → informational/review state. It never guesses.

## Principle J — rollback is a product feature

The existing safe public site remains the emergency fallback until the new projection is proven stable.

---

# 3. Target system overview

```text
                           ┌─────────────────────────────┐
                           │      Research / Atlas       │
                           │ raw records, competitors,   │
                           │ provider research, history  │
                           └──────────────┬──────────────┘
                                          │ evidence only
                                          ▼
┌─────────────────┐   ┌─────────────────────────────┐   ┌──────────────────────┐
│ Product Identity│   │      Provider Fact Store    │   │ Content / SEO Store  │
│ family/category │   │ plan names/features/terms   │   │ EN/BN copy, FAQ, SEO │
│ brand/taxonomy  │   │ official price + sources   │   │ guides/relationships │
└────────┬────────┘   └──────────────┬──────────────┘   └───────────┬──────────┘
         │                           │                              │
         │                ┌──────────▼──────────┐                   │
         │                │ Commercial Offer   │                   │
         │                │ + Approval Store   │                   │
         │                │ AIPS price/access  │                   │
         │                │ delivery/status    │                   │
         │                └──────────┬──────────┘                   │
         │                           │                              │
         │     ┌─────────────────────▼─────────────────────┐        │
         └────►│          PUBLICATION POLICY ENGINE         │◄───────┘
               │ builds only safe PublicProduct/Plan views │
               └───────────┬───────────┬───────────┬───────┘
                           │           │           │
               ┌───────────▼───┐ ┌─────▼─────┐ ┌──▼─────────────┐
               │ React pages   │ │ Prerender │ │ JSON-LD/Sitemap│
               │ product/plan  │ │ static HTML│ │ feeds/meta     │
               └───────────────┘ └───────────┘ └────────────────┘
                           ▲
                           │
                ┌──────────┴─────────────┐
                │   Product Media Store  │
                │ image/video/gallery/OG │
                │ publication-safe assets│
                └────────────────────────┘
```

The central idea is simple: **all output paths share the same publication engine**.

---

# 4. Proposed domain model

## 4.1 Product Family

Represents the software/tool entity, not a price tier.

```text
id
external_id
canonical_name
slug
brand_id/provider_id
category_id
entity_type
short_description
status
primary_official_url
terms_url
created_at
updated_at
```

## 4.2 Plan

Represents a named tier/variant belonging to a product family.

```text
id
product_id
plan_key
plan_name
billing_cycle
seat_model
feature_profile
position
status
```

AIPS-specific delivery/access should not be stored as an official provider-plan property unless it truly is a provider property.

## 4.3 Provider Fact Snapshot

Stores evidence from the first-party provider.

```text
id
product_id / plan_id
fact_type
value_json
source_url
source_title
verified_at
verified_by
valid_from
valid_until
status
content_hash
notes
```

Example fact types:

```text
official_plan_name
official_price
official_currency
official_feature
quota
account_policy
sharing_policy
regional_availability
billing_policy
terms_change
```

## 4.4 Commercial Offer

Represents what AIPS itself is prepared to offer.

```text
id
product_id
plan_id
sku
commercial_status
access_model
price_bdt
billing_cycle
availability
stock_policy
activation_method
delivery_window
payment_methods
warranty_policy_id
refund_policy_id
approved_at
approved_by
approval_reference
review_due_at
suspended_at
```

Recommended status enum:

```text
RESEARCH_ONLY
DRAFT
VERIFYING
APPROVAL_PENDING
PUBLIC_INFO_ONLY
PUBLIC_REQUEST_PRICE
PUBLIC_SELLABLE
SUSPENDED
RETIRED
```

Only `PUBLIC_SELLABLE` may emit a purchase CTA with a public approved price.

## 4.5 Content / SEO Record

Content is independent from commerce.

```text
id
entity_type
entity_id
locale
page_role
title
meta_description
h1
short_copy
long_copy
use_cases
faq
comparison_notes
keywords/research_metadata
editorial_status
reviewed_at
```

A content editor cannot set `price_bdt`, approve access models, or make an offer sellable.

## 4.6 Media Asset

Every photo, graphic, screenshot, poster or video becomes a typed media asset.

```text
id
media_key
kind
mime_type
source_kind
original_uri
public_uri
width
height
aspect_ratio
file_size_bytes
duration_ms
poster_media_id
alt_en
alt_bn
caption_en
caption_bn
copyright_owner
license/source_url
checksum
processing_status
publication_status
created_at
approved_at
```

Recommended `kind` values:

```text
LOGO
PRODUCT_HERO
PLAN_HERO
POSTER
GALLERY_IMAGE
SCREENSHOT
INFOGRAPHIC
COMPARISON_GRAPHIC
VIDEO_DEMO
VIDEO_TUTORIAL
VIDEO_POSTER
ANIMATION
OG_IMAGE
CATEGORY_HERO
BRAND_ASSET
```

## 4.7 Entity Media Link

```text
id
media_id
entity_type
entity_id
placement
sort_order
is_primary
locale
visibility
```

Example placements:

```text
product.hero
product.gallery
product.feature
plan.hero
plan.gallery
seo.og
category.hero
article.inline
```

## 4.8 Route Registry

The route registry becomes the only authority for URL ownership.

```text
id
entity_type
entity_id
canonical_path
route_type
index_policy
legacy_paths
redirect_status
locale
active
```

Existing valid canonical paths should be preserved. New plan URLs can follow a consistent child convention without changing parent URLs.

Recommended new plan path:

```text
/product/{product-slug}/plans/{plan-slug}
```

## 4.9 Verification Event

```text
id
entity_type
entity_id
verification_type
source_url
result
changes_detected
verified_by
verified_at
next_review_at
```

## 4.10 Publication Revision

```text
id
entity_type
entity_id
revision
public_payload_json
source_hashes
published_by
published_at
superseded_at
```

This creates an auditable history of what AIPS actually made public.

---

# 5. Database migration strategy

Keep existing `products`, carts, orders, admins and existing commerce tables during the first migration.

Add normalized tables beside them:

```text
product_families
product_plans
provider_fact_snapshots
commercial_offers
content_records
media_assets
entity_media
route_registry
redirect_registry
verification_events
publication_revisions
product_relations
```

Create a compatibility adapter:

```text
legacy products row
      ↓
LegacyProductAdapter
      ↓
normalized internal model
      ↓
PublicationPolicy
      ↓
PublicProductView
```

All migrations must be additive, dry-run capable, backed up, reversible without data loss and deployed before code depends on them.

---

# 6. Publication Policy Engine

Create a shared framework-independent package, e.g.:

```text
lib/catalog-domain/
  src/
    schemas.ts
    catalog.ts
    commercial.ts
    publication.ts
    routes.ts
    seo.ts
    media.ts
    public-view.ts
```

Consumers:

- Vite frontend,
- API server,
- prerender/build scripts,
- admin preview,
- tests,
- sitemap generator,
- structured-data generator.

Core methods:

```ts
getPublicProductView(productId)
getPublicPlanView(planId)
getPublicCatalogView(filters)
getPublicRoute(path)
canPublishOffer(offer)
canRenderPrice(offer)
canRenderCTA(offer)
getSafeStructuredData(view)
```

### Fail-closed behavior

If approval/evidence is absent:

```text
price → hidden
availability → unknown/review
purchase CTA → hidden
Offer schema → absent
payment/delivery/warranty → hidden
social proof → hidden
```

This must be true in React and prerendered/static HTML.

---

# 7. Unify React and prerender

Current risky pattern:

```text
React ProductPage → raw product data → UI logic
Prerender script → raw product data → separate SEO/body logic
Quarantine script → commercial SSOT → overwrite logic
```

Target:

```text
raw/catalog/db/SSOT
       ↓
PublicationPolicy
       ↓
PublicProjection
       ├──── React
       ├──── prerender
       ├──── structured data
       ├──── sitemap
       └──── API/public feed
```

The build should fail if a product price exists in HTML/JSON-LD without the required approved offer.

---

# 8. Product page architecture

Refactor the existing ProductPage; do not discard it.

```text
Breadcrumb

┌──────────────────────── Product Hero ─────────────────────────┐
│  Media gallery             │ Product identity                 │
│  image/video/poster        │ Brand / provider                 │
│                            │ Verified availability status     │
│                            │ Approved price or request price  │
│                            │ Plan selector                    │
│                            │ CTA only when allowed            │
└───────────────────────────────────────────────────────────────┘

Verified facts summary
Plan selector / variant navigation
Plan comparison
What is included
Limitations
Access / activation model
Bangladesh use cases
Payment/delivery section (approved facts only)
How it works
Media / demonstrations
Provider facts + last verified
FAQ
Related comparisons
Related guides
Related products
Policies / trademark disclaimer
Sticky mobile CTA (only when policy allows)
```

The product hero media should use existing `@aips/media` Carousel + ResponsiveImage + VideoPlayer primitives.

No price should be baked permanently into a generic promotional image unless that media asset is tied to a specific approved offer revision and review/expiry state.

---

# 9. Dedicated page for every plan

Every plan can have a dedicated ecommerce URL/view without making every plan indexable.

Recommended path:

```text
/product/{product-slug}/plans/{plan-slug}
```

Plan page modules:

```text
Breadcrumb: Category → Product → Plan
Product/brand header
Plan-specific hero/poster/video
Plan status
Approved plan price or Request Price
Billing cycle
Who this plan is for
What is included
What is not included / limitations
Plan-specific access/activation terms
Official provider context
Comparison with sibling plans
Bangladesh-specific use cases
FAQ
Related guide/comparison content
CTA if approved
Last verified
```

SEO/index states:

```text
INDEX_SELF       — unique demand + substantial unique content
CANONICAL_PARENT — dedicated UX, but insufficient separate search intent
NOINDEX_REVIEW   — unresolved/unverified/policy-sensitive
```

Existing product canonical URLs remain unchanged unless a future migration has a documented reason and tested redirect.

---

# 10. Media architecture

## Reuse `@aips/media`

Do not build another carousel, video player or image optimizer.

## Storage abstraction

```ts
interface MediaStorage {
  put(input): Promise<StoredMedia>;
  delete(key): Promise<void>;
  getPublicUrl(key): string;
  getVariantUrl(key, options): string;
}
```

Phase 1 can reuse repository/static assets and existing media-host conventions. A later object/CDN backend can be swapped through the adapter.

Suggested static organization where needed:

```text
public/media/
  products/
    {product-slug}/
      hero/
      gallery/
      plans/{plan-slug}/
      screenshots/
      video/
      og/
  brands/
  categories/
  articles/
```

Pages read media relationships from the registry, not by guessing folder names.

## Image pipeline

```text
upload/original
→ validate magic bytes
→ strip sensitive metadata
→ optimize
→ create responsive variants
→ store checksum/metadata
→ preview
→ approve
→ publish
```

Useful generated widths where appropriate:

```text
320 480 640 960 1280 1600
```

Always retain width/height/aspect ratio to prevent layout shifts.

## Video pipeline

Use the existing HLS/MP4/WebM player and support:

```text
video source
poster image
title
description
caption/subtitle track if available
duration
aspect ratio
transcript or summary
publish status
```

Defaults: no autoplay with sound, lazy load below fold, visible poster, keyboard controls, mobile sizing.

## Price-bearing graphical assets

A promotional image containing a visible price is itself a commercial claim.

Such an asset must carry or be linked to:

```text
offer_id
approval_revision
valid_from / review_due
publication_status
```

If the offer is suspended, the image must automatically disappear from the public projection even though the underlying file remains in storage/audit history.

---

# 11. Admin → Product Publishing Console

Preserve the current AdminProducts/API-client architecture and progressively extend the editor into tabs.

## Identity

Name, slug, brand/provider, category, product family, canonical route, status.

## Plans

Plan name/key, billing cycle, order/position, status, plan content.

## Provider Facts

Official source URL, official plan name, official price snapshot, features/limits, terms/policy links, verified-at/status.

## AIPS Offer

Permissioned commercial fields only: commercial status, approved price, access model, availability, payment, delivery, warranty/refund, approval source, review due.

## Media

Upload, asset type, product/plan assignment, alt EN/BN, caption, order, primary image, poster/video pairing, preview, approve/unpublish.

## Content + SEO

Title, meta description, H1, short/long copy, Bangla copy, FAQ, use cases, guides, comparison links. No price field exists in this tab.

## Search / Route

Canonical path, legacy aliases, redirect behavior, index policy, schema eligibility, sitemap eligibility.

## Preview

Preview the exact `PublicProductView`, including desktop/mobile and crawler/static HTML.

## Publish Checklist

```text
✓ identity validated
✓ canonical route unique
✓ provider facts verified
✓ commercial offer approved OR info-only state selected
✓ media approved
✓ SEO required fields complete
✓ structured data matches visible content
✓ internal links valid
✓ no unknown commercial claim
✓ preview tests pass
```

## History

Who changed what, source/approval, previous public revision and rollback.

---

# 12. Ecommerce navigation architecture

Preserve existing valuable routes and centralize new route ownership.

```text
/
/products

category hubs (preserve current canonical paths)

existing product-family canonical URLs

/product/{slug}/plans/{plan-slug}

brand pages
comparisons
guides
blog
about
faq
support
policies
```

Every product card consumes one `PublicCatalogItem` shape:

```text
name
brand
primary_media
category
public_status
starting_price_if_approved
plan_count_public
approved_badge
canonical_url
CTA_mode
```

Filters/search use only public fields.

---

# 13. SEO and structured-data architecture

Use one generator based on `PublicProductView`/`PublicPlanView`.

Render a public `Offer` only when the offer is sellable and its price/currency/availability are approved and visibly match the page.

A request-price/information page must not emit a fabricated `Offer`.

Keep important product content in prerendered/initial HTML, but eliminate independent commerce calculations inside the prerenderer.

Image requirements: stable crawlable URL, useful context, descriptive alt text, dimensions and consistent canonical asset usage.

Video requirements: visible page element, poster/thumbnail, discoverable source, structured data only when the visible content supports it; consider video sitemap support for important demos/tutorials.

Generate sitemap from Route Registry + publication policy. Only `INDEX_SELF` routes are included.

---

# 14. Route and redirect safety

Eliminate duplicate ownership across React, `productRoutes.ts`, prerender scripts and `vercel.json`.

Route Registry should drive or validate:

```text
React route lookup
prerender route list
sitemap
canonical tags
redirect manifest
broken-link audit
```

Never change a high-value indexed URL without a documented reason and tested redirect.

---

# 15. Build pipeline upgrade

```text
1. pnpm install
2. typecheck shared libraries
3. typecheck app/API
4. validate raw catalog schemas
5. validate provider-fact evidence
6. validate commercial approvals
7. validate route uniqueness / redirects
8. validate media registry
9. process/optimize media variants
10. build PublicProjection
11. build Vite app
12. prerender product + plan + category + content routes from PublicProjection
13. generate structured data from PublicProjection
14. apply/verify global commerce quarantine
15. audit generated HTML
16. sitemap/canonical/link audit
17. schema-visible-content audit
18. Playwright critical-flow tests
19. visual regression snapshots
20. preview deployment
21. preview smoke tests
22. production promotion
23. production smoke tests
24. Search Console/index monitoring
```

Hard build failures:

- duplicate canonical route,
- two active entities owning one URL,
- public price without approval,
- Offer schema differing from visible page,
- hidden/unapproved social proof rendered,
- missing canonical on indexable page,
- sitemap containing noindex route,
- broken internal product link,
- public media relationship pointing to missing asset,
- plan URL resolving to wrong plan,
- static HTML violating commercial SSOT/quarantine.

---

# 16. Production ownership and deployment hardening — P0

Before implementing ecommerce expansion, create:

```text
ops/deployment/production.json
```

Suggested fields:

```text
production_domain
vercel_team_id
vercel_project_id
project_name
repo
branch
root_directory
build_command
output_directory
expected_framework
last_verified_at
last_verified_by
```

Also expose a harmless build identity file such as:

```text
/.well-known/aips-build.json
```

with no secrets:

```text
git_sha
build_time
catalog_projection_hash
commercial_ssot_hash
release_id
```

Every architecture change goes:

```text
feature branch
→ automated checks
→ Vercel preview
→ desktop/mobile verification
→ SEO/static verification
→ merge
→ production verification
```

---

# 17. Security hardening

Review existing AdminGuard/authentication before expanding admin capabilities.

High-risk commercial approval actions should have stronger authorization than content editing where practical.

Uploads must use existing media validation plus allowlisted MIME types, size/dimension limits, video limits, sanitized names/keys, SVG sanitization, EXIF/GPS stripping and optional malware scanning if upload volume grows.

Do not allow arbitrary unsanitized HTML from admin fields.

Storage/database/provider credentials remain server-side only.

Public support/order flows should remain no-password/no-OTP by default.

---

# 18. Performance architecture

## Hero

- Do not lazy-load the primary visible hero image.
- Give it width/height/aspect ratio.
- Load only the first gallery asset eagerly.
- Lazy-load remaining slides.
- Use responsive candidates.
- Do not preload every carousel image.

## Video

- poster image,
- lazy initialize heavy player logic,
- lazy-load HLS implementation,
- avoid downloading video before intent where possible.

## JavaScript

Move product normalization/heavy logic out of page components. Use code splitting for admin/video-heavy/comparison-heavy surfaces as appropriate.

Create performance budgets for initial JS/CSS, hero image bytes, gallery image bytes, poster bytes and eager request count.

---

# 19. Product and plan content architecture

Product content:

```text
summary
Bangla summary
who it is for
who it is not for
use cases
key capabilities
limitations
provider context
Bangladesh buying context
FAQ
related alternatives
related comparisons
related guides
```

Plan content:

```text
plan summary
best for
included
limits
billing context
seat/user context
provider plan differences
AIPS offer context (approved public fields only)
sibling plan differences
FAQ
```

---

# 20. Product relationship graph

Use explicit relations instead of hand-coded arrays:

```text
ALTERNATIVE_TO
UPGRADE_FROM
DOWNGRADE_FROM
SAME_PROVIDER
SAME_CATEGORY
GOOD_WITH
REPLACES
RELATED_GUIDE
COMPARED_WITH
```

This powers related products, comparison pages, plan upgrades, recommendations and internal linking.

---

# 21. Catalog states and customer behavior

| Internal state | Public page | Price | CTA | Index |
|---|---|---:|---|---|
| RESEARCH_ONLY | rich info if editorially approved | none | related/help | optional |
| DRAFT | not public | none | none | no |
| VERIFYING | review page | none | support | no |
| APPROVAL_PENDING | review/info | none | support | usually no |
| PUBLIC_INFO_ONLY | education | none | support/related | yes if substantial |
| PUBLIC_REQUEST_PRICE | ecommerce-style | request price | WhatsApp/contact | yes if substantial |
| PUBLIC_SELLABLE | full ecommerce | approved | order/cart/WhatsApp | yes |
| SUSPENDED | info/review fallback | hidden | support | depends |
| RETIRED | replacement/archive/redirect | none | alternative | case-by-case |

---

# 22. Rollout phases

## Phase 0 — integrity and ownership

1. Identify and document exact deployment/project serving `aipremiumshop.com`.
2. Snapshot live routes, headers, HTML and indexable URLs.
3. Reconcile public projection with commercial SSOT/quarantine.
4. Make source commit → Vercel deployment → domain relationship deterministic.
5. Add production build identity.
6. Verify backup/rollback path.

**Exit gate:** publication policy and production output are explainable and reproducible.

## Phase 1 — shared domain/public projection

Add shared schemas/policy, legacy adapters, one PublicProjection, and tests proving quarantine wins over raw data.

## Phase 2 — route registry

Inventory live/indexed/legacy URLs, preserve canonicals, centralize aliases/redirects/index policy and generate/validate sitemap.

## Phase 3 — normalized product + plan layer

Add product-family/plan/provider-fact/commercial-offer tables beside legacy records and link current approvals.

## Phase 4 — media registry + pipeline

Add media records, admin upload/processing, responsive variants, gallery/video and plan-specific media.

## Phase 5 — ProductPage V2

Refactor existing ProductPage into reusable modules fed by `PublicProductView`. Use a feature flag/canary first.

## Phase 6 — PlanPage V1

Add dedicated plan URL resolver/page, media, sibling comparison, per-plan index policy and prerender.

## Phase 7 — Admin Publishing Console

Extend existing admin with plans, media, provider facts, commerce approval display, SEO, routing, preview, publish checklist and history.

## Phase 8 — category/brand/search modernization

Rewire discovery surfaces to `PublicCatalogView` and expose only public facets.

## Phase 9 — content/SEO graph

Reconnect comparisons, guides and blog to canonical entities and explicit relations.

## Phase 10 — commerce expansion

Only after operational verification: cart/checkout/payment integration, order lifecycle, renewal lifecycle, customer account/history and real review collection.

---

# 23. Canary strategy

Do not switch every product at once.

Use:

1. **Informational-only product** — proves content/media/SEO without commerce.
2. **Request-price product** — proves conversion while hiding numeric price.
3. **Verified sellable product** — proves full offer/plan/order flow.

Avoid a policy-sensitive shared-account product as the first sellable canary.

---

# 24. Test matrix

For every migrated product/plan:

## Functional

- correct product/plan loads,
- correct plan preselected,
- product ↔ plan navigation,
- gallery keyboard/touch,
- video poster/playback,
- CTA matches public status,
- request-price state shows no numeric price,
- suspended offer removes sale CTA.

## Data safety

- raw legacy price cannot leak,
- unapproved access model cannot render,
- unapproved warranty/customer count cannot render,
- hidden media cannot render,
- stale offer cannot create Offer JSON-LD,
- crawler HTML equals hydrated commercial truth.

## SEO

- unique title/meta,
- canonical correct,
- index policy correct,
- sitemap membership correct,
- breadcrumbs correct,
- visible offer matches structured data,
- no orphan product/plan,
- legacy route redirects exactly once.

## Media

- alt text,
- dimensions,
- responsive variants,
- poster for video,
- no broken assets,
- acceptable byte sizes,
- no GPS metadata,
- mobile layout stable.

## Accessibility

- keyboard gallery,
- visible focus,
- button/link labels,
- contrast,
- video controls/captions where available,
- reduced-motion behavior.

## Regression

- homepage,
- products,
- categories,
- About/FAQ/Support/Terms/Privacy,
- historical high-value product URLs,
- mobile CTA,
- 404/review routes.

---

# 25. Release gates

```text
[ ] production project/domain ownership verified
[ ] backup/rollback verified
[ ] typecheck passes
[ ] catalog validation passes
[ ] truth/commercial validation passes
[ ] route/canonical validation passes
[ ] media validation passes
[ ] prerender audit passes
[ ] e2e critical journeys pass
[ ] crawler HTML checked
[ ] mobile visual regression checked
[ ] no public commercial data exceeds SSOT approvals
[ ] production smoke-check procedure ready
```

---

# 26. Rollback strategy

- `SafePublicSite` remains available as whole-site fallback while V2 is rolled out.
- Product/plan publication status can disable one entity without restoring the historical catalog.
- `SUSPENDED` removes price/CTA/schema across all output paths.
- Unpublish media relationships without deleting historical files.
- Promote previous known-good Vercel deployment after exact production ownership is confirmed.

---

# 27. Recommended project structure

```text
AI-Premium-Shop/
│
├── artifacts/
│   ├── aips-landing/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── ProductPage.tsx
│   │   │   │   ├── PlanPage.tsx
│   │   │   │   └── ...existing pages
│   │   │   ├── components/commerce/
│   │   │   │   ├── ProductHero.tsx
│   │   │   │   ├── ProductMediaGallery.tsx
│   │   │   │   ├── OfferBox.tsx
│   │   │   │   ├── PlanSelector.tsx
│   │   │   │   ├── PlanComparison.tsx
│   │   │   │   ├── VerificationPanel.tsx
│   │   │   │   └── RelatedEntities.tsx
│   │   │   └── lib/publicCatalogClient.ts
│   │   ├── scripts/
│   │   │   ├── build-public-projection.mjs
│   │   │   ├── prerender-public-routes.mjs
│   │   │   ├── validate-public-commerce.mjs
│   │   │   └── audit-prerender.mjs
│   │   └── public/media/...
│   │
│   └── api-server/
│       └── existing Express API + new domain routes
│
├── lib/
│   ├── catalog-domain/          # new shared policy/domain package
│   ├── media/                   # existing @aips/media, enhanced
│   ├── db/                      # existing Drizzle package
│   ├── api-spec/
│   ├── api-zod/
│   └── api-client-react/
│
├── data/catalog/atlas/          # research/history, not direct storefront truth
│
├── ops/
│   ├── ssot/commercial.json
│   └── deployment/production.json
│
└── docs/architecture/
```

---

# 28. What must NOT be done

1. Do not replace Vite/React merely for ecommerce.
2. Do not install Shopify/WooCommerce/etc. as a shortcut over the existing architecture.
3. Do not import all 343 Atlas records as sellable products.
4. Do not publish every plan page as indexable by default.
5. Do not make media files the source of truth for prices.
6. Do not put unverified prices into posters.
7. Do not let React and prerender calculate commercial values separately.
8. Do not mass-rename product URLs.
9. Do not delete the legacy `products` table in the first migration.
10. Do not directly experiment on main/production.
11. Do not enable admin uploads without validation and authorization review.
12. Do not add ratings/reviews without real source data.
13. Do not use build time as a fake `last verified` date.
14. Do not let SEO copy override commercial approval rules.
15. Do not deploy rich media without performance budgets.

---

# 29. Definition of done

### Data

- Every public product belongs to a product family.
- Every public plan has a stable identity.
- Provider facts and AIPS offers are separate.
- Public commercial claims have provenance/approval.
- Atlas remains research/history, not direct storefront commerce.

### Pages

- Every product has a dedicated ecommerce-quality page or explicit info/review state.
- Every plan has a dedicated URL/view.
- Each plan has explicit index/canonical policy.
- Product/category/brand/search pages use one public catalog view.

### Media

- Admin can associate photos, posters, screenshots, graphics and video with a product or plan.
- Responsive image/video handling uses `@aips/media`.
- Media has alt text, metadata, status and ordering.
- Price-bearing graphics obey offer approval/revision rules.

### Safety

- Global quarantine overrides every renderer.
- Entity status overrides price/CTA/schema.
- Static HTML and hydrated React agree on commercial truth.
- Unknown facts fail closed.

### SEO

- Canonical/redirect registry has no duplicate ownership.
- Indexable product/plan pages are self-contained.
- Structured data is derived from visible approved data.
- Sitemap contains only indexable public routes.
- Media is crawlable and optimized.

### Operations

- Exact production project/domain ownership is documented.
- Release has preview, tests and rollback.
- Build identity maps to commit + public projection.
- Admin history shows who published what.

---

# 30. First implementation sequence

```text
Step 1  Resolve production deployment ownership.
Step 2  Capture live-route/current-output baseline.
Step 3  Fix SSOT → static/live projection mismatch.
Step 4  Add shared PublicProduct/PublicPlan schemas.
Step 5  Add PublicationPolicy with fail-closed tests.
Step 6  Generate one public projection from existing data.
Step 7  Make current safe site consume that projection without design change.
Step 8  Make prerender consume the same projection.
Step 9  Add route registry and migration map.
Step 10 Add media registry using existing @aips/media.
Step 11 Add gallery/video to one canary product page.
Step 12 Add one dedicated plan page.
Step 13 Extend admin for plan/media metadata.
Step 14 Verify preview/mobile/SEO/static HTML.
Step 15 Enable ProductPage V2 for canaries only.
Step 16 Expand in controlled batches.
```

---

# Final architectural position

The website does not need to be replaced. It needs its existing good components to be connected through a stricter domain and publication model.

The safest high-end AIPS architecture is:

> **Existing React/Vite storefront + existing API/admin/database + existing media stack + normalized Product/Plan/Provider/Offer/Content/Media domains + one publication-policy engine + one route registry + one prerender/public projection + progressive feature-flagged rollout.**

That architecture supports a true media-rich ecommerce experience while preserving the current site, its URLs, its tooling and its safety controls.