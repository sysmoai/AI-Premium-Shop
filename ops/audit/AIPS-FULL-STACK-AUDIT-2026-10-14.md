# AIPS Full-Stack Production, Global Access, SEO and Security Audit
**Snapshot:** 2026-10-14 (Asia/Dhaka). **Evidence status:** PARTIAL / independently reproducible; NOT a certification of global availability or a complete security penetration test.
**Canonical project:** https://github.com/sysmoai/AI-Premium-Shop
**Owner:** AIPS Founder/CEO; authorized technical execution by Command Code in Windows.
**Priority order:** P0 customer access -> P1 privacy/commercial/security -> P2 SEO/conversion/reliability -> P3 enhancement.

## 1. Executive determination
The public AI Premium Shop storefront is operational from SOME independent internet vantages, but the CEO reported that the REAL Android mobile-data connection does not work. **Incident #113 remains P0 OPEN** and a new current-failure screenshot has not been supplied here. The old Android Vercel-paused screenshot is historical, not proof of the present mobile failure. Do not call this globally accessible because GitHub monitoring passed or Google/Alibaba public DNS answers are correct.

No direct authenticated Cloudflare Security Events/WAF, Squarespace registrar browser, Windows Chrome, device packet capture or actual carrier test occurred in this ChatGPT connector session. These steps must be carried out by a real connected Command Code/browser/operator environment. Root cause of the CURRENT mobile failure is UNKNOWN.

Current public app build observed in served `/.well-known/aips-build.json`: `a3ae5a6dc7551069635ad40345d1cd07ec238b9c`. Repository main and the app build are different because deployment is path-filtered; compare release-relevant changes, not just SHA equality.

## 2. Methodology, evidence and limits
- Read current GitHub main (source, configuration, API handlers, CI workflows, open issues/PRs) through the authorized GitHub connector.
- Fetched a sample of 30 production paths/assets/APIs via independent external web renderers; **24 produced content, 6 produced expected or ambiguous tool errors**. This is not a full 282-URL crawl nor a full manual browser checkout test.
- Queried Google Public DNS and AliDNS for relevant A, AAAA, NS, www, MX, DMARC and media DNS. Their answers agreed for the tested apex A/AAAA. NOT equivalent to actual customer carrier DNS.
- Reviewed GitHub Actions workflow status including successful Live site monitor `38531431024` at 2026-10-14 07:54:41Z. This test is daily and from one GitHub-hosted runner, not an Android mobile carrier.
- Read official Cloudflare Workers Custom Domains, WAF/1020, IPv6, Rate Limiting, and Google Search merchant/schema/spam guidance; do not assume account-specific settings or prices.
- Tried to retrieve a public PageSpeed Insights mobile lab report but encountered a tool URL/redirect limitation. **LCP, CLS, INP, Lighthouse score and actual field CWV remain UNKNOWN**; do not fabricate them.

## 3. Production stack and accounts (public-safe)
| Platform | Confirmed role | Evidence / caveat |
|---|---|---|
| GitHub | Canonical repo, PR/CI, docs and monitoring | Connected. Main after merged #118: `8e12fa0d3e2c241bf3915e27a3335891c8613147`; refresh. |
| Cloudflare Workers + Static Assets | Live app backend/static runtime | Worker `ai-premium-shop`; `worker/index.js`; `wrangler.toml`; `artifacts/aips-landing` Vite/React/TypeScript/pnpm. Dashboard security settings not inspected. |
| Cloudflare DNS / registrar | AIPS authoritative NS and TLS | Google Public DNS: `andy.ns.cloudflare.com`, `treasure.ns.cloudflare.com`. Registrar previously identified as Squarespace Domains. |
| Vercel | Retired prior AIPS origin | Connected Vercel project returned `live:false`; still lists legacy domain associations. Do not pay/reactivate as production. |
| Zoho | Email | Public MX 10/20/50 resolves; SPF historically observed; DMARC TXT `v=DMARC1; p=none;`; DKIM admin configuration and actual mail delivery not tested. |
| NVIDIA NIM | AI Concierge model backend | GET `/api/concierge` returns `keyConfigured:true`; actual account-specific commercial production rights still OPEN (#111). |
| Supabase | Historical AIPS data projects | Two AIPS-named projects found `INACTIVE`; no evidence they store live orders/feedback. Do not reactivate without need/approval. |
| Neon/PostgreSQL | Optional chat log/insights backend | Source supports binding but production connection and retention are UNVERIFIED. |
| Cloudflare R2 | Potential media storage | Existing `artifacts/aips-landing/data/media/manifest.json` contains zero approved assets and links. AIPS bucket previously reported empty. `media.aipremiumshop.com` DNS returns NXDOMAIN; do not set up without actual approved assets. |
| Google Search Console | SEO measurement | Connected property exists but permission `siteUnverifiedUser`; direct page insights `permission_denied`. Clicks/positions currently UNKNOWN. |
| Google Analytics / Cloudflare Web Analytics | Analytics | Analytics collection and consent unverified, `.env.example` historically blank. |
| Windows / Playwright MCP / Command Code | Owner-visible execution | Must authenticate and attach to real Windows Chrome or use headed fallback; no such live local-PC control was established in this ChatGPT session. |

Use private access control for account IDs, auth details and credentials. Never commit secret values to this public repository.

## 4. DNS/global reachability results
- Google + Alibaba public DNS returned Cloudflare anycast A `104.21.19.189`, `172.67.188.143`; AAAA `2606:4700:3033::6815:13bd`, `2606:4700:3037::ac43:bc8f`. These are current observations, not permanent hardcoding targets.
- Both `https://aipremiumshop.com/` and `https://www.aipremiumshop.com/` rendered the intended storefront externally, with canonical on the apex.
- Actual affected Android carrier HTTP outcome, DNS resolver, WAF/Ray ID, IPv4/IPv6 path and current error text all remain UNKNOWN.
- Previous Command Code agent reported Windows `AIPS-TEMP` hosts mappings removed after local resolver convergence at ~19:10 Asia/Dhaka (PR #115). This is **operator-reported, not independently inspected from this session**, and does NOT prove mobile-carrier convergence.
- Current GitHub live-site monitor checks one scheduled runner/daily and apex pages. Its green result is not worldwide reachability.
- Close P0 #113 only after real affected Android mobile-data PASS with ordinary DNS, plus Wi-Fi and independent checks. Preserve Zoho records and other business zones; no DNS thrash or global WAF disable.

## 5. Production endpoint sample (verified)
| Route | Observed external result | Interpretation |
|---|---|---|
| `/`, `/products`, `/pricing`, `/ai-video`, `/how-to-order`, `/refund-policy` | Intended content loaded | PASS from tested vantage only |
| `/chatgpt-plus-bangladesh`, `/claude-pro-bangladesh`, `/product/higgsfield-ai-bangladesh` | Intended product content | PASS sampled |
| `/product/gemini-advanced-bangladesh` and `/product/chatgpt-plus-bangladesh` | Resolved to canonical non-`/product/` URL | Alias is a redirect/legacy intent; SEO mappings should target actual canonical |
| `/chatgpt` | Resolved to `/chatgpt-plans-bangladesh` | Expected canonical redirect |
| `/robots.txt`, `/sitemap.xml`, `/.well-known/aips-build.json`, `/.well-known/security.txt` | Loaded | Sitemap lists 282 URLs; not all individually checked |
| `/api/concierge` GET | `{ok:true,products:177,keyConfigured:true,...}` | Configuration PASS; does not prove POST inference, quota or commercial entitlement |
| `/api/feedback` GET | HTTP 405 | Expected POST-only behaviour; POST/storage not tested |
| `/api/insights` GET | HTTP 503 | Expected fail-closed when INSIGHTS_TOKEN unset; stored-data feature not verified |
| Nonexistent URL | HTTP 404 | Good 404 behaviour |
| `/ai-coding` | 404 | Not evidence of broken internal navigation until linked/canonical route ownership is checked; use `/ai-code` if actual route |
| OG image `/images/og/default-og.png` | Valid 1200x630 media rendered externally | One asset PASS; not a full brand/image audit |
| `/favicon.svg` | Extractor reported empty_content | SVG extraction limitation, not a verified missing favicon |

WWW serves content with apex canonical; consider a tested 301/308 redirect only after confirming existing links/caching and no route conflict.

## 6. Commercial and SEO data quality
- Live catalog: **176 tool families**, **193 public plan records**. Concierge returns **177 product-family records**; metrics differ by definition.
- Raw catalog: **239 entries**, including **44 shared-access raw entries**. Provider access/resale restrictions and governed public projection must continue to filter raw records. No automatically publishing new shared offers or false provider affiliations.
- Snapshot records 239 missing verification date/commercial status, 14 missing source URL, 159 missing official USD, 9 unverified trust fields. These are legacy raw data debts, not necessarily current public claims.
- `/ai-under-500` and `/ai-under-1000` both currently render **zero fixed-price listings**; verify intended SEO indexability, page utility, internal links and empty-state copy. Do not fabricate products to fill them.
- Generic `/products` currently displays ChatGPT Business as **Personal** while open PR #95 states this contradicts the governed Team/Workspace per-user money-page semantics. Treat as potential P1 commercial-label inconsistency; validate actual approved terms and test PR #95 before merging.
- Keyword generator from PR #112 produced 927 **unmeasured candidates**, 186 clusters, 193 provisional URL ownership entries. `demand_evidence=UNKNOWN` for all; `/product/chatgpt-plus-bangladesh` ownership versus canonical `/chatgpt-plus-bangladesh` requires correction after route resolution. Do not publish hundreds of keyword pages.
- GSC access is blocked; current impressions/clicks/rankings/50k-organic objective progress cannot be credibly measured. Historical mail showed ~150 Google Search clicks in a prior 28-day period in May, NOT current traffic.
- Past GSC email warnings: some 404/soft-404/robots/noindex/canonical, Merchant/Product missing image and other structured-data warnings. Treat as historical until URL Inspection proves current problems.
- Verify Product vs Merchant structured data suitability for inquiry/WhatsApp-only digital subscriptions. Never fabricate ratings, reviews, shipping, returns or official authorization.
- 282 sitemap URLs and most current route bodies were NOT exhaustively crawled in this session. Perform a rate-limited full crawl via Command Code, compare declared canonicals, sitemap, redirects and linked routes.

## 7. Security/privacy/reliability findings
**P1 #116 / DRAFT PR #117:** Active `functions/api/concierge.js` and legacy parity handler log raw `lastQuestion` in eight event paths each and a raw `sessionId` on credential block, bypassing DB redaction. Draft PR #117 replaces them with metadata-only fields and adds a CI guard. CI and AIPS Upgrade Validation green; SEO Quality workflow remains red in previously observed Playwright step. Test preview and SSE/error flows before production merge. No actual user-data breach was proven.

**P1 #119:** Concierge rate limiting is a JavaScript module-level Map (`bump`/`throttled`) per Worker instance, not a guaranteed globally consistent rate limit; carrier-shared IPs could also be incorrectly throttled. Verify a low-cost Cloudflare Rate Limiting binding/WAF solution without unapproved charges or global security disable. Operator insights endpoint accepts a bearer-like token in URL query `?token=...`; migrate safely toward an Authorization header; production token provisioning UNKNOWN.

**P1 #111:** NVIDIA API trial/developer-key success does not itself prove customer-facing commercial production licensing; investigate account-specific entitlements and applicable terms. The previous operator reported diagnostic-key cleanup, not independently verified here.

**P1 privacy/data correctness:** `feedback.js` returns `{ok:true,stored:false}` if persistence is not provisioned. Verify user-visible UI state, consent and customer expectations. Store schema and actual Neon connection status unknown. No destructive DB changes.

**P1/P2 testing:** Existing SEO quality workflow has 118 passing, 10 failing Playwright tests in last thoroughly reviewed run; failures cover old prices, homepage finder, plan disclosures, budget links and sharing caveats. Not all may be harmless stale assertions. `.github/workflows/seo-quality.yml` has `continue-on-error:true` on catalog validators; tighten only after an evidence-backed migration so raw legacy warnings do not derail safe releases. Avoid disabling tests.

**P2 release governance:** `ops/ssot/autonomy-policy.json` still includes `verify Vercel preview` as a deployment gate; Vercel is retired. Update to a verified Cloudflare staging/custom-domain preview or equivalent safe release check, preserving all protected-commercial gates.

**P2 documentation integrity:** PR #115 reported Windows hosts cleanup and inadvertently converted ~79 Unicode source symbols to `???` in `RECOVERY-STATE.md`; PR #118 restored correct UTF-8 with source history and retained owner-reported cleanup. Historical documents may contain conflicting state; read timestamp/scope.

**P2 monitoring:** Daily `.github/workflows/live-site-monitor.yml` has Vercel leak detection but cannot prove mobile-carrier coverage or round-the-clock access. Add independent, honest monitors with viable IPv4/IPv6/resolver tests and deduplicated alerting if supported by approved free tools.

## 8. Open project work / merge controls
- P0 #113 — Android mobile-data outage, current screenshot/affected network proof missing.
- P1 #111 — NVIDIA production entitlement and key inventory.
- P1 #116 — raw Concierge logging, fix drafted in PR #117 (not yet live).
- P1 #119 — distributed rate limiting and URL-query operator-token risk.
- P1/P2 PR #95 — ChatGPT Business Team/Workspace semantics (unmerged).
- P2 PR #94 — mobile WhatsApp lead qualification and attribution (unmerged; old Vercel preview instructions need reconciliation).
- P2 open provider shared-account evidence issues #39–#46, media #49, and release board #16. Do not close without exact SKU/legal/commercial evidence.
- P2 catalog validator debt, ten Playwright failures, GSC permissions, budget-page empty states, SEO URL-mapping, media registry/Zoho DKIM, performance/accessibility.
- PR #118 recovered damaged UTF-8 and was merged after CI + Upgrade Validation success.
- PR #117 CI + Upgrade Validation passed; SEO quality remains failed due to browser suite. Review and merge with the approved release gate, not automatically.

## 9. Required execution order / verification matrix
1. P0 carrier triage: obtain exact current screenshot, browser error/status/Ray ID, carrier (only if necessary), compare Wi-Fi and cellular, Private DNS/VPN, DNS/AAAA, TLS, WAF/Security Events, Worker logs, Cloudflare custom domain. Execute only verified correction; real-device PASS is mandatory to close.
2. Protect/restore source control: inspect Windows uncommitted work, Git worktrees/stashes and concurrent agents before checkout/reset. Reconcile current main, PRs #94/#95/#117 and actual deployed SHA.
3. P1 privacy: test/finish PR #117, inspect logged error strings, DB redaction and operator authorization; no secrets displayed.
4. P1 commerce: review live catalog mislabels/blocked access, PR #95, provider terms and exact approved SSOT; fix without invented facts.
5. P1 API/model: validate NLP model entitlement, rate limiting, secrets, cost control, feedback persistence and fallback; avoid production destructive load testing.
6. P1/P2 test debt: reproduce all ten E2E failures individually, fix real bugs/stale assertions, remove accidental bypasses when safe, add regression coverage.
7. P2 technical SEO full crawl of all 282 sitemap URLs and actual internal graph. Verify 404s, redirects, canonical, hreflang (if any), structured data, image/video presence, empty-budget hubs and sitemap accuracy.
8. P2 UX/performance: browser tests on Chrome/Edge + Firefox/WebKit where practical, real Android mobile-data and Wi-Fi, accessibility, Core Web Vitals lab and field, errors, cross-device media quality, shopping enquiry and WhatsApp journey.
9. P2 measurement/SEO: verify Search Console property owner, actual query clicks/CTR/indexing, GA4/Web Analytics consent and conversion. Prioritize existing pages; do not generate low-value doorway pages.
10. P2 global monitoring: multi-vantage synthetic checks from available regions (not a universal guarantee), hourly or appropriate intervals with cost/usage limits, Vercel 402, Cloudflare 403/52x, DNS/AAAA/TLS, Worker build identity and deduped incidents. Label coverage by actual probe location.
11. Change controls: branch -> tests -> browser staging -> PR -> review -> approved merge -> Cloudflare deploy check -> public build identity -> genuine cellular acceptance -> document rollback/next action.
12. Archive exact proof as hashes/runs/links with dated VERIFIED/OPERATOR-REPORTED/UNKNOWN/BLOCKED labels. Never mark everything green because CI, one crawler, or Cloudflare dashboard says so.

## 10. Scope and safety
Do not promise 100% uptime, every network reachable, #1 Google ranking, guaranteed sales or a bug-free app. No provider can verify all possible worldwide networks in a single session. Define coverage and error budgets; track unknowns. No paid Vercel, unauthorized provider usage, broad permission escalation, risky WAF disable, unrelated tenant work, public credential disclosure, unverified catalogue claims or destructive prod DB changes. Work in the CEO-authorized Command Code Windows Chrome only after actually verifying the supported Playwright MCP extension/CDP connection; a separate headed browser is fallback but must be identified honestly.

**Next new-chat handoff:** Read AGENTS.md, this audit, issue #113, RECOVERY-STATE.md, canonical architecture SSOT and latest PR history. Start with real state checks and actual visible browser tool calls, not a generic migration plan.
