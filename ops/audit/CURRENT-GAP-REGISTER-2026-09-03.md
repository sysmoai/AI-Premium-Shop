# AI Premium Shop — Current Gap Register

Date: 2026-09-03
Scope: verified production state after provider-governance follow-up releases

## Current production evidence

- GitHub main: `61bc7401a2e220786d03e70a28a5277eb33e2b6e`
- Vercel production deployment: `dpl_HdE772tbk9hnxDxCosNPtjYdwwXY`
- Vercel project: `prj_aP4bi30UW8mcHgBvU7E72yyFOPQd`
- Vercel team: `team_WCN7gRRsLzPy8C0EdOFtDYrJ`
- Production domains: `aipremiumshop.com`, `www.aipremiumshop.com`
- Production build identity endpoint confirms the same Git SHA and deployment ID.
- Publication state: allowed; commerce quarantine false.

This register records only verified state. Unknown values remain unknown. It is not permission to invent missing commercial, analytics, provider, domain or customer facts.

## DONE

### Provider and commercial truth governance
- PR #62 remains merged and authoritative for the completed shared-provider governance wave.
- Public projection remains provider-filtered.
- 11 restricted-only product families retain neutral, indexable, informational-only canonical URLs.
- Representative live checks confirmed commerce restrictions on ChatGPT and Midjourney and informational-only behavior on Freepik.
- Public payments remain limited by commercial SSOT to bKash and Nagad.
- Fixed delivery/refund/warranty, provider authorization, seat/privacy/full-feature and unverified review claims remain protected by current public governance.

### AI Concierge public-truth controls
- `/api/concierge` health returns HTTP 200.
- Governed runtime catalog reports 186 products.
- Policy revision: `commercial-truth-v2.3-2026-09-03`.
- Static JSON bundle tracing for `_catalog.json` and `_policy.json` remains intact.

### Sitemap metadata hygiene — PR #64
- Removed speculative `changefreq` and `priority` metadata from the deployed sitemap.
- Product sitemap sync no longer fabricates build-date freshness metadata for newly discovered routes.
- Existing syntactically valid `lastmod` values are preserved rather than rewritten to build time.
- Final prerender audit now reads the deployed `dist/public/sitemap.xml` after canonical pruning.
- Current build validates 266 canonical/indexable sitemap URLs.

### SPA homepage commercial-truth incident — PR #65
- Removed the legacy App-level homepage renderer from client-side return-to-home flow.
- SPA navigation from non-home routes now reboots through the governed `RootApp -> HomeV2` homepage.
- Added Chromium regression coverage to prevent stale delivery/warranty/payment/legacy homepage claims from reappearing.
- Exact release was preview-tested, merged, production-verified and superseded by later production releases carrying the same fix.

### Proven legacy URL equivalence — PR #66
- `/products/kling-ai-bangladesh` now permanently maps one-to-one to `/kling-ai-bangladesh`.
- `/buy/gemini-advanced-bangladesh` now permanently maps one-to-one to `/gemini-advanced-bangladesh`.
- Unknown legacy URLs remain eligible for genuine 404/410 handling; no blanket homepage redirect policy was introduced.

### Basic crawler and runtime availability
- `robots.txt` and `sitemap.xml` are live.
- Current robots policy does not block Googlebot, Bingbot, OAI-SearchBot or GPTBot by default.
- Representative live commerce, informational, homepage and API routes were re-probed after releases.

## PARTIAL

### Full post-provider-governance production audit
Completed representative route/API/SEO probes and real Chromium release tests, but a full route-by-route mobile/manual visual audit of every money page has not been completed.

### DEP0169 `url.parse()` warning
- `/api/concierge` succeeds with HTTP 200 but cold/runtime requests still emit Node `DEP0169` in Vercel logs.
- Direct Concierge source already uses WHATWG `new URL(...)` for adjacent JSON and contains no known direct `url.parse()` call.
- A preview-only `NODE_OPTIONS=--trace-deprecation` diagnostic was attempted; Vercel preview SSO intercepted the function request before execution, so no application trace stack was obtained.
- The diagnostic branch was reset to current main and was never merged to production.
- `@vercel/postgres@^0.10.0` is deprecated and remains technical debt, but evidence is insufficient to blame it for DEP0169 because the health GET path does not execute `logTurn()` or the lazy Postgres import.
- Do not suppress the warning or rewrite working Concierge code without a trace/proven culprit.

### Analytics / attribution
- Consent plumbing, GA4 component, Meta Pixel component and homepage analytics bridge exist.
- Current production bundle has no verified GA4 Measurement ID or Meta Pixel ID compiled into it, so those vendor integrations are effectively inactive.
- Gmail and Google Drive searches did not locate a verified AIPS GA4 Measurement ID or Meta Pixel ID.
- Organic sessions, landing-page conversion, WhatsApp click, order-intent, sale and profit attribution therefore remain incomplete.

### `/api/insights`
- HTTP 503 is intentional fail-closed behavior while `INSIGHTS_TOKEN` is not configured.
- The endpoint also requires a durable conversation store before it can produce customer-question insights.
- Its source still references the legacy Vercel Postgres setup path; modern database provisioning/migration remains open.

### Sitemap `lastmod`
- Invalid/future dates are rejected and arbitrary build-date rewriting is blocked.
- Existing historical `lastmod` values are not yet systematically backed by route-level material-update evidence.

### Legacy URL registry
- Two known historical equivalents were repaired in PR #66.
- A complete registry sourced from GSC, backlinks, search-visible old URLs and historical routes is still required.

### Media system
- Registry/generator infrastructure exists at `data/media/manifest.json` and `generate-media-catalog.mjs`.
- Current manifest contains 0 assets and 0 links; builds report `0 approved assets, 0 public links`.
- Storage provider and real evidence-backed media population are not yet complete.

### API measurement/store layer
- `/api/feedback` is POST-only as designed.
- `/api/insights` is not yet operational because its token/store are not provisioned.
- Concierge durable logging/feedback analytics cannot be considered fully operational until the store path is verified and modernized.

## OPEN

### Product-commercial verification
Complete systematic verification for all 239 raw records. For each record, preserve unknown as unknown and obtain evidence for commercial status, verification date, first-party provider source, AIPS price, access model, authorization status, availability, entitlements and restrictions.

### Raw catalog debt
Progressively clean/archive legacy fixed delivery, warranty, unlimited, bestseller, unverified rating/review and unsupported payment claims without overwriting verified current facts or deleting audit history.

### Technical SEO / discovery
- Build the complete historical URL registry and decide one-to-one 301 vs genuine 404/410 per URL.
- Obtain current Google Search Console performance/indexing data.
- Verify Bing Webmaster ownership and IndexNow operational status.
- Establish evidence-driven material-update dates for sitemap `lastmod`.
- Refresh stale search-index copies of pages whose live HTML has already been sanitized.

### Growth measurement
Implement a complete measurement model covering organic sessions, clicks, impressions, CTR, average position, landing-page conversion, WhatsApp click, order intent, sale, new/repeat, revenue/profit attribution, product margin, refund/replacement loss, payment cost, support workload, founder hours, repeat interval and defensible CLV.

### Product/content V2
Upgrade high-intent money pages with last-verified date, named human author/reviewer, what-was-checked evidence, first-party provider sources, original screenshots/video, Bangladesh-specific context, truthful price/access table, use cases, limitations, order path, FAQ, sources and change history. Avoid mass low-value AI content.

### Media/content evidence
Choose one primary storage model after account/cost verification, then populate real product identity visuals, real UI screenshots, access-explanation graphics, order-flow graphics, test/workflow evidence, demo video and unique OG images. Never fabricate provider UI/screenshots.

### Ecommerce / order system
Build the assisted ecommerce data model before payment automation: customers, checkout_intents, orders, order_items, payments, payment_events, fulfillment_events, renewals, support_cases, attribution, review_requests and reviews. Create order ID before payment; keep WhatsApp first-class; guest checkout first.

### Payments and WhatsApp automation
After the order DB exists, evaluate bKash merchant integration with server-side verification, expected amount/order matching, idempotency and audit events. Add official WhatsApp Cloud API lifecycle notifications only with human escalation retained.

### Verified reviews
Implement only after the transactional chain `order -> paid -> delivered -> review request -> verified purchase` exists. Do not fabricate `aggregateRating`.

### Security
- Main branch is currently unprotected and repository rulesets are absent.
- Gradually harden CSP; current production still permits `unsafe-inline` and `unsafe-eval`.
- Do not abruptly remove either directive without report-only/testing evidence because React/Vite/runtime scripts must not break.

### Performance telemetry
Evaluate Vercel Speed Insights / Web Analytics integration against privacy, sampling and package/runtime cost. Do not add Microsoft Clarity before explicit privacy review and policy alignment.

## BLOCKED-OWNER

These require account-holder or protected business action/evidence and must not be guessed:

- Vercel Pro billing continuity after the current Pro Trial / billing method confirmation.
- Current registrar account controls: ownership confirmation, expiry, auto-renew, registrar lock, 2FA, recovery path and billing continuity.
- Merchant/KYC actions for bKash or any payment gateway.
- Verified GA4 Measurement ID (`G-...`) and Meta Pixel ID if those properties are intended for this site and cannot be independently recovered from connected accounts.
- Any legal/business/provider authorization assertion that cannot be established from first-party evidence.

## BLOCKED-EXTERNAL / TOOL-SURFACE

- GitHub main branch protection/ruleset write is not exposed by the currently connected GitHub action surface; reads confirm `main` is unprotected and no ruleset exists.
- Google Search Console is not currently exposed as a connected property/data tool in this execution environment.
- Current registrar account controls cannot be verified from stale public WHOIS aggregators; authoritative registrar/account evidence is required.
- Preview-only DEP0169 trace execution was blocked by Vercel preview SSO at the available fetch layer.

## Operating priority from this checkpoint

1. Protect production truth and availability first.
2. Obtain/activate real measurement before claiming growth progress.
3. Complete high-intent commercial verification and evidence-backed money-page upgrades.
4. Establish durable order/payment/fulfillment attribution before automating payments or verified reviews.
5. Use GSC/real conversion data to prioritize organic clusters; 50,000+ qualified monthly organic visitors remains an operating target, never a guarantee.

## Release rule

A future task is not DONE because code was committed. It is DONE only when the exact head passes applicable validation, preview, production SHA/deployment verification, live-route/API probes and runtime monitoring, with rollback evidence preserved.
