# AI Premium Shop — Homepage V2 Master Plan

**Date:** 2026-08-10 (Asia/Dhaka)  
**Status:** Active implementation blueprint  
**Target app:** `artifacts/aips-landing`  
**Target market:** Bangladesh  
**Active implementation branch:** `upgrade/ecommerce-media-foundation-2026-08-10`  
**Safety:** Homepage V2 must be built and verified as an isolated canary before replacing `/`.

## 1. Homepage mission

The homepage is not a catalog dump. Its job is to help a Bangladesh visitor answer five questions quickly and truthfully:

1. What is AI Premium Shop and what problem does it solve for me?
2. Which AI tool or plan fits my actual job-to-be-done?
3. What am I buying: personal, shared, bundle, setup/service, or request-price?
4. Why should I trust the facts, price, delivery/access description and support process shown here?
5. What is the next safest action: explore a product, compare options, ask for advice, or order?

The defensible positioning is not "largest", "cheapest", or a wall of urgency. It is:

**AI-only expertise + Bangladesh buying guidance + local payment usability + explicit access-model labeling + verifiable/fresh product facts + practical decision support.**

This is consistent with the 2026-08-10 Bangladesh competitor intelligence baseline: broad marketplaces already compete on catalog size, local payment and templated long-form pages; AIPS should win on AI specialization, verification, freshness, access transparency and information gain.

## 2. Current-state findings

### P0 — publication/deployment integrity

**HP-P0-01 — Root/catalog publication mismatch.**

The public root currently presents a product-availability verification notice, while `/products` and `/pricing` still expose commercial catalog/pricing content. Meanwhile canonical Git SSOT on the upgrade branch says publication is allowed and quarantine is false. Homepage work cannot be promoted until `/`, `/products`, `/pricing`, product pages, schema, sitemap and publication SSOT agree on one public state.

**Required control:** production build identity + publication-state audit before any homepage release.

### P0 — homepage bypasses commercial/publication domain

**HP-P0-02 — Hardcoded commercial/trust promises exist throughout homepage presentation components.**

Examples include customer counts, warranty duration, response-time promises, delivery windows, "official subscriptions", special-offer timing, order speed, support/setup claims and savings baselines. Some are owner-attested or current catalog facts; others are editorial literals. Homepage V2 must not decide whether they are publishable.

**Required control:** generate one `PublicHomepageView` from the same publication/commercial projection used by the catalog. Components render only approved fields. If a fact becomes unknown/suspended, its module degrades or disappears automatically.

### P0 — risky/unsupported outcome language

**HP-P0-03 — Hero and agent modules contain outcome or autonomy claims that should not be structural homepage copy.**

Current examples include "3 hours -> 15 minutes", assignments completed in 30 minutes, 10x faster content creation, proposals in 2 minutes, "no manual steps", agents sending emails/processing orders 24/7, and coding agents building/fixing features "on their own". Even where AI can assist those tasks, the page should describe capabilities/workflows, not imply guaranteed outcomes or safe unsupervised operation.

**Required control:** capability-first language + explicit human-review language where relevant.

### P0 — policy-sensitive access explanation is too promotional

**HP-P0-04 — Shared/personal access is described as a simple price/privacy choice.**

The broader system already tracks unresolved provider-policy risk for shared access. Homepage V2 must explain access type plainly, link to the relevant policy/context, and never imply provider authorization unless documented.

## 3. Conversion/UX gaps

### HP-P1-01 — too many competing discovery systems

Current homepage contains brand showcase, pricing tiers, featured products, payments, audience cards, trending tools, AI Video, AI Agents, special offers, best sellers, categories, Why Us, process, FAQ, community and final CTA.

Several modules answer the same question — "what should I buy?" — with different organizing principles. This increases page length and choice overload.

**Homepage V2 rule:** every section must have one unique decision job. Remove/merge sections that do not change the visitor's next decision.

### HP-P1-02 — brand showcase is not true brand navigation

The current brand grid uses emoji-like placeholders and sends every brand tile to `/products`, even though brand/product-specific destinations exist. It consumes a large early-page block without advancing a specific decision.

**Homepage V2:** compact brand credibility/discovery strip; use authorized brand assets only; route to the correct brand/product family destination.

### HP-P1-03 — pricing tiers are artificial bands, not a buyer mental model

"Budget / Starter / Professional / Premium / Enterprise" is derived from arbitrary BDT bands. The examples inside those cards are editorial, and price alone does not explain access type, use case or value.

**Homepage V2:** replace the five-band block with budget as a filter inside the guided finder and/or product discovery module. Keep a simple "from" price only where it helps orientation.

### HP-P1-04 — Featured / Best Seller / Trending / Offers overlap

The current site separately presents featured products, best sellers, trending products and special offers. Badges such as "Best Seller", "Top Rated", "Most Ordered", "Latest" or "Limited Time" need provenance and freshness rules.

**Homepage V2:** one governed recommendation module with tabs/filters such as `Popular`, `Students`, `Freelancers`, `Creators`, `Developers`, `Business`; only show ranking/offer labels backed by approved data and timestamps.

### HP-P1-05 — the segment selector is dead architecture

`Home.tsx` contains a segment-selector state and alternate segment hero, but no current trigger sets `showSegmentSelector` true. It adds complexity without creating a usable journey.

**Homepage V2:** remove the dead modal mechanism. Replace it with a visible, accessible goal selector that is useful on first load and has real URLs/deep links.

### HP-P1-06 — hero is visually decorative rather than demonstrative

The current hero's right side is a floating stack of synthetic product cards. It does not show an actual AI workflow, product output, catalog breadth, or the distinction AIPS is trying to own.

**Homepage V2:** media-led hero with a real/clearly illustrative workflow composition and lightweight fallback. Media must explain the value proposition, not decorate it.

### HP-P1-07 — hero communicates too many ideas at once

Current hero includes trust pill, semantic H1, separate visual H2, catalog breadth/range, payment chips, rotating problem/solution claims, scrolling "most wanted" products, two CTAs, payment badges, three floating price cards and a five-item trust bar.

**Homepage V2:** one message, one supporting paragraph, one primary CTA, one secondary CTA, and one compact proof strip. Discovery details move below the fold.

### HP-P1-08 — search/trend freshness is not automatic enough

The current `TrendingNowSection` is based on a dated Search Console snapshot but uses "right now" / "this quarter" language and a static item list. Freshness semantics must match actual refresh cadence.

**Homepage V2:** editorial spotlights carry an `asOf` date or are generated from a refreshed approved dataset. No timeless "trending" label from a frozen list.

### HP-P1-09 — special offers lack a complete offer lifecycle

Current cards can say `LIMITED TIME`, show official-price comparisons and calculate discounts, but the component itself does not model an explicit campaign validity window and publication revision.

**Homepage V2:** offers render only from approved `CommercialOffer`/campaign records with start/end, source, revision and publication status. Expired offers disappear automatically.

### HP-P1-10 — community block contains ungoverned scale/speed claims

Examples include "join thousands members", "order in 2 minutes", support in under five minutes and content-frequency promises.

**Homepage V2:** community/social destinations can remain, but quantitative/frequency claims must come from evidence or be replaced with neutral benefit copy.

## 4. Trust/content gaps

### HP-P1-11 — trust is repeated as slogans instead of evidence

Customer count, establishment year, warranty, response time, "official subscriptions", secure-payment language and savings recur across hero, payment, Why Us, FAQ and final CTA.

**Homepage V2:** a single evidence-oriented trust module. Each proof point has one authoritative source. Do not repeat a claim across five components.

### HP-P1-12 — competitor framing is unnecessary and risky

"Other sellers just hand you a login" is a broad competitor assertion with no need to exist.

**Homepage V2:** state AIPS's own process and evidence without generalized claims about competitors.

### HP-P1-13 — FAQ mixes education, sales promises and policy-sensitive facts

The homepage FAQ hardcodes shared-account safety, user counts, response time, delivery windows, refund/warranty policy, "legitimate subscription" framing and plan recommendations.

**Homepage V2:** FAQ questions come from a governed FAQ/public policy view. Policy-sensitive answers link to the canonical policy/product facts. Recommendations should be decision guidance, not unsupported "most popular" statements.

### HP-P1-14 — social proof needs a real provenance system

Competitors use reviews aggressively; AIPS previously removed fabricated testimonials. Homepage V2 must not rebuild a testimonial section until real reviews have consent/provenance/moderation records.

**Interim:** use verifiable process proof, product freshness, real support channels and real case studies only when available.

## 5. Media gaps

### HP-P1-15 — no governed homepage media narrative

The current homepage is primarily cards, icons and decorative motion. There is no controlled sequence of hero media, actual workflow demonstrations, product-output examples, video posters and responsive/lazy media.

**Homepage V2:** all homepage media must be registered in the media manifest/catalog, include ownership/license/source metadata, alt/caption, dimensions, approval state and placement. Offer-linked media is revision/validity bound.

### HP-P2-01 — brand asset quality

Emoji placeholders are not a premium brand experience. Do not generate counterfeit provider logos. Use official/authorized provider brand assets where permitted, or neutral text/initial-free cards.

### HP-P2-02 — real-vs-generated media labeling

Do not use AI-generated "screenshots" as if they are real provider UI, real customer results, real staff, real orders or real testimonials. Generated editorial illustrations are fine when they are clearly illustrative. Actual UI demonstrations should be captured from legitimate accounts and scrubbed of private information.

## 6. Performance/accessibility gaps

### HP-P2-03 — motion density

Multiple independent Framer Motion blocks, hover scaling, marquee motion and scroll-reveal effects create visual noise and potential mobile cost. Existing reduced-motion protections are useful but Homepage V2 should reduce animation count by design.

### HP-P2-04 — homepage length and JS/media budget

The new homepage should be shorter in decision depth even if richer in media. Below-fold sections should lazy-load when practical; the initial bundle must not import the full catalog or large media.

### HP-P2-05 — mobile is the primary purchasing surface

Bangladesh purchase/contact flow is heavily WhatsApp/mobile oriented. Homepage V2 must be designed first at 360–430px, then expanded to desktop. No desktop-only information can be required to understand access type, price state or CTA.

## 7. Homepage V2 information architecture

### 0. Header / navigation

**Job:** reach search, products, solutions, Bangla content, support and primary contact with minimal friction.

- Sticky, compact, high-contrast.
- Search is prominent on mobile and desktop.
- `Products`, `Solutions`, `Guides`, `Pricing`, `Support`, language switch.
- Primary CTA wording depends on publication state: `Get recommendation`, `Order on WhatsApp`, or `Check availability`.
- Navigation prices/discounts must use public projection only.

### 1. Hero — "Find the right AI tool, pay locally, know exactly what access you get"

**Job:** explain the business in one screen.

Recommended content structure:

- Eyebrow: Bangladesh-focused AI buying/advisory context.
- H1: clear category + local-value proposition; no generic productivity promise.
- Supporting copy: breadth plus what differentiates AIPS — guidance, BDT/local payment, access transparency, verification.
- Primary CTA: `Find my AI tool`.
- Secondary CTA: `Browse all tools` or `Ask on WhatsApp` based on publication state.
- Compact proof strip: only governed facts (e.g. local payment methods, number of public tools, verified-update process).
- Right-side media: one media-led workflow composition, not three fake cards.

### 2. Guided finder — choose by job-to-be-done

**Job:** turn a vague visitor into a useful product/guide path.

First-class intents:

- Study & research
- Freelancing & client work
- Content & video creation
- Coding & app development
- Business & automation
- Writing, marketing & SEO

Optional filters after intent:

- Budget
- Personal vs shared vs service/setup
- Need privacy/dedicated account
- Need Bangla guidance
- Image / video / voice / coding / research

Output is 3–5 recommendations, never an unbounded catalog.

### 3. Recommended / popular tools

**Job:** let shoppers who already know names move fast.

- One module replaces Featured + Best Sellers + most of Trending.
- Tabs: `Popular`, plus audience/job segments.
- Product card: authorized logo/media, product/plan name, access type, approved price/request-price state, one-line best-for, last-verified/freshness cue where useful, CTA to product page.
- WhatsApp order shortcut only when commercial status allows it.

### 4. Access & buying model explainer

**Job:** remove the biggest source of buyer misunderstanding before conversion.

Cards/table for:

- Personal / dedicated
- Shared
- Bundle/package
- Setup/service
- Request current price / enquiry

Explain ownership/privacy/credential implications and provider-policy caveats plainly. Do not disguise a shared account as equivalent to a personal subscription.

### 5. Media demo rail — "See what these tools actually do"

**Job:** make AI capability tangible.

Use 3–5 short, real or clearly illustrative demonstrations:

- AI assistant/research workflow
- AI image/design workflow
- AI video workflow
- Coding workflow
- Automation/workspace workflow

Each has poster, caption, tool links and a text fallback. No autoplay sound. Mobile loads posters first; video loads on interaction or near viewport.

### 6. Browse the AI universe

**Job:** support broad exploration after the guided path is clear.

- Compact categories with current public counts/from-price where approved.
- Compact authorized brand strip/search.
- Link to full catalog.

This replaces the oversized early brand grid + separate five-tier price grid.

### 7. Editorial spotlight / What's changing in AI

**Job:** show expertise and freshness, not manufacture urgency.

One swappable module at a time, for example:

- AI Video
- AI Agents
- New model/plan changes
- Tool comparison of the week

Every spotlight has `asOf`/verification date and links to deeper content. The current AI Video and AI Agents sections should become candidates for this slot, not permanent giant blocks both shown on every visit.

### 8. How buying works in Bangladesh

**Job:** explain the real transaction/support workflow.

- Choose/ask
- Confirm exact plan/access type/current price
- Pay using approved local methods
- Receive/activate according to product-specific SLA
- Get documented support/replacement/refund handling

Do not turn product-specific SLAs into a universal promise.

### 9. Why AIPS — evidence, not slogans

**Job:** establish trust after the visitor understands the offer.

Potential evidence blocks, only when governed:

- AI-specialist catalog and advisory focus
- Local payment options
- Visible access-type labels
- Product facts have verification dates/source records
- Transparent unverified/unknown states
- Bangla/English guidance
- Support channel and documented policies

Optional actual business proof (only when supplied/verified): trade/business registration, real office/team/support photos, real review totals, real fulfillment metrics.

### 10. Learning & comparison hub

**Job:** serve visitors not ready to buy and strengthen topical authority.

- 3–6 current comparison/guides chosen from Search Console/content strategy.
- English/Bangla pathways.
- Avoid a generic blog feed with no decision relevance.

### 11. Real customer proof — conditional module

**Job:** reduce perceived purchase risk.

Render only when a review/case-study provenance system exists. Required fields: source, consent, date, order/product relation where appropriate, moderation state. No generated or anonymized-persona testimonials presented as customer reviews.

### 12. FAQ

**Job:** resolve the final objections.

Keep 5–7 high-value questions with governed answers:

- What access types do you sell?
- How do I know the current price/availability?
- How do local payments work?
- What should I use for private/client/academic work?
- What happens if access fails?
- Are you affiliated with the AI providers?
- How do I choose a tool?

### 13. Community + final CTA + footer

**Job:** give a clear next step and full trust/navigation closure.

Community block should be compact. Final CTA adapts to publication state. Footer carries product/solution/guide/policy/language paths and avoids ungoverned promises.

## 8. What should be removed or consolidated from current homepage

- Remove the dead `SegmentSelector`/alternate hero path unless reimplemented as the visible guided finder.
- Remove the standalone five-band `PricingTiersSection`; budget becomes a finder/filter dimension.
- Merge `FeaturedProductsSection` and `OffersSection` best-seller content into one governed recommendation surface.
- `Special Offers` becomes campaign-driven and only appears when an approved active campaign exists.
- Reduce `BrandShowcaseSection` to compact correct-destination brand discovery with authorized assets.
- `TrendingNowSection` becomes dated editorial/search-demand content rather than static "right now" copy.
- `AIVideoFeatureSection` and `AIAgentsSection` become a single rotating/editorial spotlight slot.
- `PaymentMethodsSection` is reduced and merged into access/buying/trust flow; do not duplicate budget tiers there.
- `WhyUsSection` is rebuilt as evidence-backed trust, not generalized competitor comparison.
- Community becomes compact; quantitative scale/speed claims require evidence.

## 9. Homepage media production plan

All assets need a media-manifest record before production publication.

### HP-HERO-01 — hero key visual

**Purpose:** show the breadth of AI workflows + AIPS as the decision/payment bridge.  
**Preferred formats:** responsive AVIF/WebP still; optional WebM/MP4 motion derivative.  
**Desktop composition:** 4:3 or 5:4; safe crop for 16:9.  
**Mobile:** separate portrait crop/poster.  
**Motion:** 8–12 seconds maximum loop if used; muted; no audio; subtle; no essential information only in animation.  
**Do not fabricate:** real provider UI, real transactions, customer outcomes or provider logos.

### HP-JOB-01..06 — job-to-be-done visuals

One visual family for study, freelancing, content/video, coding, business automation, writing/marketing. These may be original generated editorial illustrations. Keep the same art direction, lighting, camera language and color system.

### HP-DEMO-01..05 — actual workflow demonstrations

**Preferred:** real screen recordings from legitimate accounts or approved product captures, with private data removed.  
**Format:** 16:9, 1080p source; WebM/MP4 derivatives; 8–20 sec each; poster image mandatory.  
**Examples:** research assistant, image generation, AI video, coding assistant, automation/workspace.

### HP-TRUST-01..03 — real AIPS proof assets

Only real assets if presented as company/customer proof: support operations, real order/fulfillment workflow with sensitive data redacted, real team/office/business documentation where owner chooses to publish it. Do not generate synthetic "staff" or "customer" photos and present them as real.

### HP-EDITORIAL-01..N — spotlight media

Campaign/editorial assets for AI Video, AI Agents, new model changes and comparisons. Must carry a date/revision and can be retired without code edits.

## 10. Media quality/performance contract

- First hero image/poster: eager/high priority; correct intrinsic dimensions.
- All other images: lazy unless measurable UX reason says otherwise.
- Responsive `srcset`/AVIF/WebP through the existing media package.
- Video: poster first, preload metadata/none as appropriate, lazy source attachment, no autoplay audio.
- No layout shifts from unknown dimensions.
- Every meaningful image gets useful alt text; decorative assets use empty alt/aria-hidden.
- Asset filenames/URLs are stable and crawlable when indexable.
- Mobile page must remain useful before any video loads.
- Set and enforce page-weight/LCP budgets before production rollout.

## 11. Data architecture for Homepage V2

Create one generated `PublicHomepageView` derived from:

- `ops/ssot/site.json`
- `ops/ssot/commercial.json`
- public product projection
- route registry
- approved media catalog
- approved active campaigns/offers
- approved social-proof/review data when it exists
- dated editorial/search-demand dataset

Suggested shape:

```ts
interface PublicHomepageView {
  publication: { commerceAllowed: boolean; mode: string };
  identity: { name: string; market: string };
  catalog: { productCount: number; planCount: number; minPrice: number | null };
  payments: PublicPaymentMethod[];
  finder: HomepageIntent[];
  recommendations: HomepageRecommendationGroup[];
  accessModels: PublicAccessModel[];
  campaigns: PublicCampaign[];
  trustFacts: PublicTrustFact[];
  editorialSpotlight: PublicSpotlight | null;
  faq: PublicFAQ[];
  media: HomepageMediaPlacement[];
}
```

The React homepage, prerender/static body, SEO/schema and analytics labeling should all derive from this same view.

## 12. SEO architecture

- One visible, useful H1 that contains the category/local intent naturally; do not hide the SEO meaning in `sr-only` while the visible headline says something unrelated.
- Homepage title/meta should express category + Bangladesh + decision/local-payment value, not keyword stuffing.
- Canonical remains `/`.
- `en-BD` / `bn-BD` hreflang remains only for real reciprocal language counterparts.
- Structured data must exactly match visible/public content. Product/Offer data only for approved visible offers.
- Keep homepage crawlable content in the build/static output; no critical decision copy available only after React mounts.
- Internal links prioritize canonical product families, solution guides, categories and comparison clusters.

## 13. Analytics/conversion instrumentation

Homepage V2 needs explicit non-PII funnel events:

- `homepage_view`
- `homepage_finder_start`
- `homepage_finder_select_intent`
- `homepage_recommendation_click`
- `homepage_product_click`
- `homepage_search_open`
- `homepage_search_result_click`
- `homepage_whatsapp_click` with placement, not message content
- `homepage_access_model_expand`
- `homepage_demo_play`
- `homepage_guide_click`

KPIs:

- Hero -> finder engagement
- Finder -> product click-through
- Homepage -> WhatsApp qualified click-through
- Product/guide path distribution
- Mobile vs desktop conversion path
- Search usage and zero-result rate
- Scroll/section reach only when useful for diagnosis, not vanity
- Core Web Vitals / JS/media weight

## 14. Implementation roadmap

### Phase 0 — baseline and gap lock

- [x] Inspect current source structure.
- [x] Check live root/products/pricing behavior.
- [x] Reconcile current SSOT.
- [x] Reuse current Bangladesh competitor intelligence.
- [x] Write this master plan.
- [ ] Add machine-readable Homepage V2 execution manifest.

### Phase 1 — public homepage data contract

- Build/generate `PublicHomepageView`.
- Move homepage-wide trust/payment/delivery/policy facts behind this projection.
- Add validator: no protected hardcoded commerce/trust claims in Homepage V2 components.
- Add publication-state tests.

### Phase 2 — isolated Homepage V2 canary

- Add `HomeV2` under a noindex, non-production-canonical preview route or build flag.
- Keep current `/` unchanged.
- Add desktop/mobile E2E smoke coverage for the canary.

### Phase 3 — navigation + hero

- Rebuild header/nav only where required for V2.
- Implement semantic/visual H1 alignment.
- Implement finder-first CTAs.
- Add HP-HERO-01 placeholder slot through media catalog.
- User help required only for final hero asset generation/selection if a custom visual is desired.

### Phase 4 — guided finder

- Implement job-to-be-done selector.
- Use canonical route/product data.
- Add access/budget/privacy filters.
- Add analytics events.
- E2E keyboard/mobile flow.

### Phase 5 — recommendations and campaign system

- Consolidate featured/best-seller/trending/offer duplication.
- Recommendations use approved public products.
- Campaign module renders only active approved offers.

### Phase 6 — access model + buying process + trust

- Build transparent Personal/Shared/Service/Bundle explanation.
- Build product-specific/current-price confirmation flow.
- Rebuild Why AIPS as evidence-backed trust.
- Rebuild payment/how-to-order modules from canonical facts.

### Phase 7 — media rail and generated assets

- Register hero/job/demo/editorial assets.
- Wire responsive images/video through existing media package.
- User and assistant work through each asset one by one: objective -> prompt/storyboard -> generation/capture -> QA -> optimization -> registry -> preview.

### Phase 8 — editorial/learning/FAQ/community

- Dated editorial spotlight.
- Current decision-oriented guide/comparison links.
- Governed FAQ.
- Compact community block.

### Phase 9 — SEO/static/schema

- Generate matching static homepage body from `PublicHomepageView`.
- Canonical/hreflang/meta/schema audits.
- Product/Offer schema visibility/publication tests.
- Sitemap/internal-link audit.

### Phase 10 — quality engineering

- Desktop/mobile visual QA.
- Keyboard/focus/accessibility audit.
- Reduced motion.
- Browser console/page-error tests.
- Performance/LCP/CLS/INP and page-weight budgets.
- Fail-closed publication simulation.
- Claim scan/regression tests.

### Phase 11 — preview comparison

Compare canary against current homepage on:

- time to understand offer
- number of competing CTAs above fold
- finder completion
- product click-through
- mobile clarity
- trust/access comprehension
- media performance
- crawlable content/schema

No production replacement until all gates pass.

### Phase 12 — production rollout

- Promote through the controlled production lineage only after current-head CI + Vercel preview/browser QA.
- Verify exact build identity/SHA.
- Check `/`, `/products`, `/pricing`, top product routes, policies, sitemap, robots and structured data.
- Check Vercel runtime errors.
- Record the new production SHA/deployment in harness state.
- Keep rollback candidate.

## 15. Owner help — only when genuinely required

Engineering should proceed autonomously. Owner input is required only for:

1. Real business evidence or policy decisions not derivable from the repo.
2. Real customer reviews/case studies and publication consent.
3. Real team/office/operations photos if we choose to use them as trust proof.
4. Final custom image/video generation or source captures when credentials/real accounts are required.
5. Provider/brand assets that require authorized downloads/merchant kits.
6. Access/credentials to Search Console/analytics or other external systems if not connected.
7. Explicit irreversible production/business decisions.

For generated editorial imagery, the assistant will supply one precise art direction/prompt at a time and QA the returned asset before it enters the media registry.

## 16. Definition of done

Homepage V2 is done only when:

- publication state is consistent across all public commerce surfaces;
- no homepage component can bypass protected commercial/trust projection;
- every visible price/access/delivery/warranty/offer/trust fact is approved or safely absent;
- one clear mobile-first decision path exists from hero -> finder/recommendation -> product/contact;
- duplicate discovery modules are consolidated;
- all media is licensed/sourced/approved/optimized/registered;
- real UI media is real, generated media is not presented as evidence;
- SEO/static/schema match the visible page;
- accessibility and reduced-motion checks pass;
- performance budgets pass;
- Playwright/browser smoke and conversion journeys pass;
- fail-closed simulation passes;
- Vercel preview is visually inspected;
- production build identity and post-deploy runtime checks pass;
- harness state is updated to the deployed SHA and next enhancement.
