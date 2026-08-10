# AI Premium Shop Engineering Harness Protocol

This document is the mandatory execution protocol for every future website enhancement. It exists so development does not depend on conversational memory, stale local state, or assumptions about which branch is live.

## 1. Start from reality, not memory

Before changing code:

1. Read `ops/harness/state.json`.
2. Read `ops/ssot/site.json` and `ops/ssot/commercial.json`.
3. Verify the actual Vercel production deployment and its Git SHA.
4. Compare the intended development branch against the verified live SHA.
5. Read current blockers and unresolved release gates.
6. If repository documentation conflicts with live deployment metadata, live deployment + canonical SSOT wins and the stale documentation must be corrected.

Never assume `main` is production. Never assume the newest branch is production. Never use Replit.

## 2. Preserve before improving

Every enhancement begins with a baseline:

- existing public routes/canonicals
- current visible critical content
- current publication state
- current build/CI state
- production runtime-error baseline
- relevant screenshots/browser journeys when UI is affected
- database compatibility assumptions when data structure is affected

Existing working behavior is a regression contract unless the task intentionally changes it.

## 3. Classify the change

Every change must be classified before implementation:

- `SAFE_ADDITIVE`: new isolated code/data with no existing behavior change
- `GUARDED_REFACTOR`: shared logic replacement behind tests/projection/adapter
- `COMMERCIAL_HIGH_RISK`: price, access, payment, delivery, warranty, availability, provider terms, offer schema, price-bearing media
- `ROUTING_SEO_HIGH_RISK`: canonical, sitemap, redirect, index policy, structured data
- `DATA_MIGRATION_HIGH_RISK`: schema or persistent data changes
- `PRODUCTION_INFRA_HIGH_RISK`: domains, Vercel project/settings, environment variables, storage, DNS

High-risk work must have explicit rollback and verification artifacts before production promotion.

## 4. One public truth path

Raw catalog/database/provider research is not a public rendering contract.

Required flow:

`raw/catalog/db/SSOT -> PublicationPolicy -> PublicProjection -> React + prerender + structured data + sitemap + public API + media views`

No renderer may independently reconstruct protected commercial facts.

Fail closed when truth is unknown or unapproved:

- hide numeric price
- hide purchase CTA
- hide Offer schema
- hide unapproved payment/delivery/warranty/social-proof claims
- downgrade to request-current-price or informational state only when the publication policy permits it

## 5. Route discipline

- Preserve existing product canonical URLs by default.
- Generate/validate routes through the route registry.
- Dedicated plan route format: `/product/{product-slug}/plans/{plan-slug}`.
- New plan pages default to `CANONICAL_PARENT`/`noindex,follow` until they have unique, substantial, approved search intent/content.
- Never add sitemap entries for noindex routes.
- Duplicate active canonicals, redirect loops, self-redirects, and broken internal product links are release blockers.

## 6. Media discipline

Use the existing AIPS media subsystem; do not create a parallel framework.

Every public asset must be registry-controlled and include the metadata needed for its type. Media attached to a commercial offer inherits the offer publication state. Price-bearing posters or graphics are commercial claims and cannot outlive/sidestep the approved offer revision.

Performance rules:

- reserve image dimensions/aspect ratio
- primary hero may be eager/high priority
- non-primary gallery assets lazy-load
- responsive image variants where available
- video uses poster and intent/lazy loading
- no autoplay with sound
- no unnecessary eager carousel/video bytes

## 7. Database discipline

- Additive normalization first.
- Preserve legacy tables/fields until adapters and readers are migrated.
- Prepare forward migration + rollback before execution.
- Verify backup/restore capability before production schema writes.
- Apply migration before enabling code that requires new tables.
- Never perform destructive cleanup in the same first migration that introduces the replacement model.

## 8. Required validation ladder

A change is not complete because it compiles.

Run the applicable ladder:

1. SSOT validation
2. shared/app typecheck
3. catalog/truth validation
4. publication fail-closed simulation
5. route registry validation
6. media registry validation
7. build
8. product/plan prerender audit
9. SEO/static/schema-visible-content audit
10. Playwright/browser tests for changed and critical journeys
11. visual desktop/mobile check for UI changes
12. performance budget check for media/UI changes
13. Vercel preview deployment
14. preview smoke tests
15. production promotion only after all required gates pass
16. production smoke + build identity + runtime error check

Never weaken a gate merely to make CI green. Fix the cause or explicitly document a justified exception.

## 9. Canary-first rollout

For meaningful storefront changes:

1. implement shared foundation with no visual change
2. select one low-blast-radius product/plan canary
3. validate product family + plan + media + SEO + mobile behavior
4. compare canary against unchanged existing pages
5. expand to a small batch
6. expand by category/brand only after repeated green releases

Do not mass-enable ProductPage V2, new plan indexing, or a new media model in one release.

## 10. Repository memory is part of Definition of Done

Every completed development increment must update durable context as applicable:

- `ops/harness/state.json` — exact current execution state and next queue
- canonical SSOT files — only for real business/publication decisions
- architecture/decision documents — when architecture changes
- blockers — when a dependency is discovered/resolved
- migration/rollback artifacts — for persistent-data changes
- build identity — generated by build/deploy process

A future agent/session should be able to continue correctly from the repository without requiring the owner to repeat prior context.

## 11. Autonomous decision boundary

The engineering agent should proceed without asking the owner for routine implementation decisions when the safest choice follows this harness.

Owner input is required only when the work needs a fact or authority that engineering cannot legitimately infer, such as:

- approving/changing a commercial price or offer
- approving a payment/delivery/warranty/refund promise
- accepting a known provider/compliance risk
- supplying credentials or access that are not connected
- authorizing a destructive or irreversible production action when no safe reversible path exists

Do not ask for information that can be obtained from GitHub, Vercel, the canonical SSOT, existing connected systems, tests, or source code.

## 12. Enhancement loop

For each future enhancement, execute this loop:

`Observe -> Reconcile Context -> Baseline -> Research/Audit -> Design Smallest Safe Change -> Implement -> Validate -> Preview -> Compare -> Promote -> Verify -> Record State -> Select Next Highest-Value Gap`

The loop is cumulative. Each pass should improve both the website and the harness so the next pass becomes safer, faster, and less dependent on human memory.
