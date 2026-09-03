# AI Premium Shop — SEO Ground Truth

Date: 2026-09-03
Market: Bangladesh
Domain: `aipremiumshop.com`
Purpose: durable SEO operating evidence for the 50,000+ qualified monthly organic-session target. This target is not a ranking or traffic guarantee.

## 1. Authority and release baseline

This file follows the authority order in `ops/ssot/README.md` and does not override protected commercial or provider facts.

Verified production at the start of this wave:

- GitHub `main`: `db7adba2459b4176954e18948c2f8b3897594deb`
- Vercel production: `dpl_4meoTKiCk7gynTey7xkGuKVdgY4D`
- Project: `prj_aP4bi30UW8mcHgBvU7E72yyFOPQd`
- Production domains: `aipremiumshop.com`, `www.aipremiumshop.com`
- Production state: READY
- Publication allowed: true
- Commerce quarantine: false
- Current Vercel runtime: Vite, Node 24.x
- Known runtime warning remains the already-tracked Node `DEP0169` warning on `/api/concierge`; it is not treated as a new SEO regression.

## 2. Current public catalog and crawl surface

The current deployed `/products` prerender is the authoritative public-count evidence for this wave:

- 185 active tool families
- 206 current public plan records with BDT prices where available
- Product-family counts, public plan-record counts and the 239-row raw audit catalog are distinct metrics and must not be compared as if they were the same thing.

Current crawler foundations are present:

- `robots.txt` is live.
- `sitemap.xml` is live and canonical-pruned.
- Deployed sitemap metadata no longer fabricates `priority`, `changefreq` or build-date freshness for new product URLs.
- Current canonical/indexable sitemap count from the release pipeline is 266 URLs.
- Representative current product pages return 200 with route-correct canonical tags and crawlable prerendered text.
- Genuine removed/unknown routes can return a 404 with `noindex`; blanket redirects to the homepage are not allowed.

## 3. Google Search Console evidence actually available

A direct Search Console data connector is not available in this execution environment. The connected mailbox contains official Google Search Console transactional evidence for this property and is therefore useful historical evidence, but it is not a substitute for a current query/page export.

### Property ownership

On 2026-04-07 Google Search Console sent the AIPS mailbox a “Get started using Search Console with https://aipremiumshop.com/” message stating the site had been verified/created as a verified property.

### Historical indexing reasons

On 2026-04-08 Google reported these reasons preventing pages from being indexed:

- Not found (404)
- Blocked by `robots.txt`
- Alternate page with proper canonical tag
- Soft 404
- Excluded by `noindex`

On 2026-04-12 Google separately reported “Alternate page with proper canonical tag” for pages in a sitemap.

These are historical findings. They must not be assumed to describe the current release without current Search Console coverage data. Current production has since undergone substantial route, prerender, canonical, sitemap and truth-governance changes.

### Historical structured-data findings

On 2026-04-08 Google reported Product snippets non-critical issues:

- missing `aggregateRating`
- missing `review`

AIPS must **not** resolve these suggestions by fabricating ratings or reviews. Current commercial SSOT explicitly blocks unverified product ratings, review counts and aggregate-rating schema.

On the same date Google reported Merchant listings issues:

- **critical:** missing `image`
- non-critical: missing `hasMerchantReturnPolicy` in `offers`
- non-critical: missing `shippingDetails` in `offers`

Current production no longer exposes the old generic Product/Offer JSON-LD on the representative generic product page tested in this wave; the final deployed page exposes BreadcrumbList schema only. This avoids publishing unsupported availability/return/shipping facts, but it also means current generic product pages are not yet eligible for a fully useful Product/Merchant rich-result implementation.

### Historical traffic milestone

On 2026-05-05 Google Search Console sent a milestone email stating `aipremiumshop.com` had reached **150 clicks from Google Search in the preceding 28 days** (milestone dated May 3, 2026).

This is historical traffic evidence only. Current clicks, impressions, CTR, average position and landing-page performance remain unknown until a current Search Console dataset is connected/exported.

## 4. Current product structured-data decision

Do not re-add Product/Merchant schema just to remove historical Search Console warnings.

Current product-media state:

- the media registry exists;
- current media manifest has 0 approved assets and 0 public links;
- public image directories currently provide brand and generic OG assets, not a verified product-image library.

Therefore:

1. Do not use the AIPS logo or a generic OG card as if it were the product image merely to satisfy `Product.image`.
2. Do not invent `aggregateRating` or `review`.
3. Do not invent `InStock`, delivery/shipping fields, fixed return periods or merchant-return policy facts.
4. Product/Merchant schema should be restored incrementally only when a route has an approved product-specific image and every included commercial field is backed by the current governed projection/policy.
5. Breadcrumb schema can remain where truthful.

This is a deliberate evidence-first rich-result strategy, not an omission to be papered over with synthetic data.

## 5. Current web SERP sampling

A 2026-09-03 web-search sample was run for Bangladesh-oriented high-intent product queries. This is a discovery sample, not a complete rank tracker and not a replacement for Search Console.

### Primary observation

AIPS is currently much easier to discover at the homepage/entity level than at the individual money-page level in the sampled results. Exact AIPS product URLs often did not surface in the sampled high-intent searches even though the current production URLs are live, canonical and crawlable.

This makes the current primary SEO problem a combined problem of:

- product-level index/reindex coverage,
- thin decision depth on many current money pages,
- weak external/entity authority relative to established local competitors,
- stale historical search-engine copies,
- insufficient current performance data to prioritize by real impressions/conversions.

It is **not** currently evidenced as a sitewide `noindex` problem.

## 6. Competitor displacement findings

The following domains repeatedly surfaced in current Bangladesh-oriented AI-subscription search sampling:

- `martsoon.com`
- `subscriptionsmartbd.com`
- `softofficebd.com`
- `deltaboxit.com`
- `techhaat.com.bd` / Tech Haat surfaces
- `bdsubscription.com`
- `giftcardszonebd.com`
- `digitallybuy.com`
- `marketmindstudio.com`
- AI Subscription BD surfaces
- AIPS sibling properties `saveonsub.com` and `aiteampremium.com` on several overlapping intents

Observed competitor strengths commonly include:

1. exact-match “price in Bangladesh” title/H1 targeting;
2. long, decision-oriented product copy;
3. plan-comparison tables;
4. Bangladesh-local buying/payment context;
5. freshness / last-updated or last-verified dates;
6. FAQs that cover pre-purchase objections;
7. product imagery and richer product cards;
8. external reputation/business identity or review surfaces;
9. checkout/cart depth;
10. use-case and audience-specific sections.

Some competitor pages also make claims that would be unsupported or prohibited under AIPS truth policy. AIPS must not copy those claims. The displacement strategy is **higher evidence density + better decision usefulness + stronger crawl/index architecture + stronger original authority**, not more aggressive unverifiable promises.

## 7. Sibling-domain cannibalization risk

Current search sampling shows AIPS-controlled/related properties can surface for the same product intents:

- SaveOnSub surfaced for products including Cursor, Midjourney, Suno, Grammarly, QuillBot, Ideogram, Adobe Firefly and Manus-related searches.
- AI Team Premium surfaced for ChatGPT and other AI-subscription queries.

Required boundary:

- **AI Premium Shop:** primary Bangladesh AI commerce authority — exact product identity, governed AIPS BDT price/access, buying decision and order path.
- **SaveOnSub:** savings/value/deal/market-comparison territory; it should not clone AIPS exact money-page title/H1/body for the same transactional intent.
- **AI Team Premium:** distinct business/editorial positioning; it should not intentionally duplicate AIPS exact transactional money pages or revive unsupported access claims.

Cross-domain linking is allowed only where it genuinely helps the user. Do not build a reciprocal keyword network or mass duplicate pages.

The machine-readable ownership map for the first priority cluster is `ops/seo/keyword-ownership-2026-09-03.json`.

## 8. Tier-A product set

Twenty product families are selected for the first money-page upgrade wave using current catalog eligibility, commercial relevance and current SERP competition. This is a qualitative execution priority because current Search Console query volume and AIPS transaction attribution are not connected.

P0 first:

1. ChatGPT Plus
2. Claude Pro
3. Google AI Pro / Gemini Advanced
4. Perplexity Pro / Max family
5. SuperGrok
6. Midjourney
7. Canva Pro
8. Kling AI
9. Runway
10. Higgsfield AI
11. ElevenLabs
12. Suno AI
13. GitHub Copilot
14. Cursor
15. Notion Business

P1 within Tier A:

16. Grammarly Premium
17. QuillBot Premium
18. Ideogram
19. Leonardo AI
20. Manus AI

`/chatgpt-plans-bangladesh` is additionally locked as the broad ChatGPT plan-comparison hub. It does not replace `/chatgpt-plus-bangladesh`, which owns exact ChatGPT Plus transactional intent.

The next expansion set should be chosen from current Search Console impressions and verified transaction demand once available. Until then, likely candidates include ChatGPT Go, ChatGPT Business, ChatGPT Pro, Microsoft Copilot Pro, Adobe Firefly, Pika, Opus Clip, Descript Pro, Udio, Murf AI and Jasper AI.

## 9. Money-page content standard to beat current SERPs

Tier-A pages should not be mass-expanded with generic AI filler. Each should progressively meet an evidence-first Money Page V2 standard:

- one unambiguous query/URL owner;
- intent-matched title, H1 and meta description;
- current AIPS catalog price/access only when governed and eligible;
- “last verified” only when backed by an actual verification event;
- human author/reviewer identity when a real reviewer is assigned;
- first-party provider source(s) for provider-controlled facts;
- explicit “verified / not verified / confirm before payment” separation;
- useful plan comparison where multiple current eligible plans exist;
- Bangladesh-specific decision context;
- limitations / who should not buy;
- purchase/order path with WhatsApp first-class;
- bKash/Nagad references only under commercial SSOT;
- FAQs based on actual buying questions and verified answers;
- alternatives and internal links that follow query ownership;
- change history when material changes are actually recorded;
- original/owned/licensed product-specific images or screenshots when available;
- structured data only for facts and media that are genuinely supported.

## 10. Stale index and legacy URL workstream

Search sampling still exposes stale AIPS-era content and external entity copy. Current live pages have already been sanitized in many cases, so a stale snippet does not automatically mean a live production regression.

Next required work:

1. collect historical AIPS URLs visible in search, backlinks, old route code and any Search Console export;
2. classify each as exact successor → permanent redirect, intentionally removed → 404/410, or current canonical → keep;
3. never redirect unrelated dead URLs to the homepage;
4. identify stale search snippets whose live canonical content has already changed;
5. once Search Console data access is available, request/monitor recrawl and indexing rather than assuming the index updated;
6. keep legacy URL decisions in a durable registry.

## 11. Internal-link and cannibalization rules

- A category, use-case or budget hub may support a product owner; it must not duplicate the product page’s exact transactional content.
- Blog/how-to pages should answer informational questions and link to the relevant product owner rather than compete with it for the same exact “price/buy” query.
- Broad brand-plan hubs can compare plans; exact plan pages own exact plan transactional intent.
- Internal anchor text should be descriptive and natural; do not mass-stuff identical exact-match anchors sitewide.
- New routes require a defined unique user intent before they are made indexable.

## 12. What remains unknown / blocked

Still unknown without current Search Console or transaction data:

- current organic clicks and sessions;
- current query impressions;
- average positions;
- CTR by landing page;
- index coverage by current canonical route;
- which Tier-A product has the highest real organic opportunity;
- organic-to-WhatsApp conversion;
- organic-to-paid-order conversion;
- revenue/profit by landing page/query;
- new vs repeat organic customer mix.

Do not fabricate these values to score keywords.

## 13. Next execution order

### GO 2 — Technical Index Cleanup and URL Ownership Enforcement

- build the complete current/historical URL registry from repository history, live search evidence and any recoverable Search Console evidence;
- map exact-equivalent 301s versus genuine 404/410 outcomes;
- audit the Tier-A set for title/H1/canonical duplication and intent collisions;
- audit internal links into Tier-A owners;
- identify stale indexable blog/category surfaces that compete with a money owner;
- verify Bing/IndexNow opportunity without adding unverifiable configuration;
- ship only evidence-backed technical fixes through normal release gates.

### GO 3 — Money Page V2

- implement the reusable evidence-first money-page model on the first highest-value eligible product;
- test prerender, crawler truth, mobile UX, internal links and structured data;
- expand only after the template passes production verification.

## Operating rule

The objective is not “publish more URLs.” The objective is to make the smallest defensible set of pages become the best Bangladesh-specific answers for their assigned intents, then scale only from measured evidence. Ranking #1 and 50,000+ monthly organic visits remain targets, never guaranteed outcomes.
