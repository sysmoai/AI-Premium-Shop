# AI Premium Shop: growth, access and implementation audit

Audit date: 2026-09-07 UTC. Owner: Emon Hossain. Scope: aipremiumshop.com only.

## Decision

Improve the existing React/TypeScript/Vite application at `artifacts/aips-landing`; do not rebuild another site or buy another domain. GitHub `ops/ssot` remains the business authority, Vercel serves the application, and the existing media contract selects Cloudflare R2. Prioritize reliable maintenance, customer-facing clarity, real measurement, useful content and attributable WhatsApp enquiries.

50,000 monthly organic visitors is a target, not a guarantee. Agree on a measurable definition: GA4 organic-search users for visitors, with organic sessions reported separately. Search Console clicks are another metric, not interchangeable with either. No current baseline or defensible time-to-target forecast is available in this session. The existing 12-week planning horizon is a review period, not a promise.

## Evidence and limits

- Audited main commit: `7e125cf12567ff66bc61252862ea42102864e71d`.
- Live `/.well-known/aips-build.json` reports that commit and deployment `dpl_3pAyhQYmtGBuvFsJaUFcDzvfnTLB`; Vercel reports this production deployment READY and both production domains attached.
- Representative HTTP checks succeeded for home, products, pricing, ChatGPT, Claude, Higgsfield, ordering and refund pages. They had canonical tags and one H1 in initial HTML.
- `robots.txt` allows crawling; sitemap has 266 URLs. A deliberately nonexistent route returned 404 and noindex.
- The rendered desktop homepage was inspected in a real browser. Its four image elements loaded the existing logo; the approved media manifest has zero assets and zero links.
- Current source has 239 raw catalog records. All 239 lack `verificationDate` and `commercialStatus`; 14 lack `sourceUrl`. Raw records are not the same as eligible public offers. Existing provider publication guards must remain intact.
- Existing SSOT and provider-source validators passed. These validate implementation consistency, not every provider fact or commercial assertion independently.
- No Search Console/GA4 reports, real order records, mobile device performance measurements, complete manual page review, penetration test, restore test or payment transaction were available. No claim of zero remaining gaps is justified.

## Prioritized gap register

Status: VERIFIED means observed in this session; DOCUMENTED means present in repository records but not fully revalidated; UNKNOWN means an evidence/access gap. P1 comes before expansion; P2 is the growth backlog; P3 follows working measurement and order operations.

| ID | Priority / status | Gap and evidence | Action and acceptance criterion |
|---|---|---|---|
| G01 | P1 VERIFIED | Hero exposes `HP-HERO-01`, “Hero media slot is ready” and registry implementation text. | Replace customer-facing fallback with useful buying guidance; insert approved hero when available. No internal slot IDs or production instructions visible to customers. |
| G02 | P1 VERIFIED | Five empty demo slots expose internal placeholders; media manifest is empty. | Hide unavailable demo section or show genuine useful alternatives; publish only approved assets. Never fake product demonstrations. |
| G03 | P1 VERIFIED | Homepage repeats the same use-case heading, access guidance, categories and final CTAs. | Consolidate into one clear sequence: need → shortlist → access/price → evidence → WhatsApp. Validate finder and navigation after consolidation. |
| G04 | P1 VERIFIED | Internal phrases such as “governed public projection,” “public plan records” and the full social-proof policy string are rendered. | Separate internal governance from public copy without weakening truth rules. Have the owner supply a discrete approved public proof statement or omit it. |
| G05 | P1 VERIFIED | Editorial renders `review_after` as “Reviewed ... through” a future date. | Display the actual `as_of` date as the review date; keep next-review scheduling separate. Do not invent a new review date. |
| G06 | P1 VERIFIED | Current live-monitor run failed and its issue creation also failed with `ReferenceError: ai is not defined`. | Pass failure output as environment data, not interpolated JavaScript source. Exercise both create and comment paths with backticks and template-like text. Prepared repair in this branch. |
| G07 | P1 VERIFIED | Live `/ai-video` lacks the educational heading expected by the monitor and present in an earlier prerender section. | Trace renderer/build overwrite and restore useful governed category guidance. Keep the failing content assertion until the cause is resolved. |
| G08 | P1 VERIFIED | GitHub reports `main` unprotected; repository rulesets list is empty. | Owner configures required PR/check rules and controlled emergency access. Verify through permission reads; do not assume account admin implies every connector API can administer rules. |
| G09 | P1 VERIFIED | No GA script appeared after browser cookie acceptance; component depends on `VITE_GA_ID`. | Identify the correct GA4 property and compile its Measurement ID. Verify consent handling, a page view, WhatsApp event and no duplicate event in DebugView/Realtime. |
| G10 | P1 DOCUMENTED | Search Console property verification is documented, but live performance data access is absent. | Obtain property-specific performance/indexing exports or authenticated read access. Record baseline, dates, country, device and brand/non-brand segmentation. |
| G11 | P1 VERIFIED | Two WhatsApp event names exist (`whatsapp_click`, `homepage_whatsapp_click`); homepage links can be generic. | Define one reporting funnel, retain source/product/plan/placement as controlled values, and prefill useful context. Test every principal CTA; never treat a click as a confirmed conversation or sale. |
| G12 | P1 UNKNOWN | No verified connection between web enquiry, WhatsApp conversation, quote, payment and delivered order. | Start with a minimal lead/order ledger and an opaque enquiry reference; record source, product, outcome, costs and order status. Human support reconciles real outcomes. |
| G13 | P1 VERIFIED | 239 raw catalog records lack verification date/status; 14 lack source URL. | Verify revenue-priority offers first with owner price/availability evidence and current provider sources. Do not mass-fill synthetic dates or treat owner approval as provider authorization. |
| G14 | P1 VERIFIED | `/api/insights` returns 503: `INSIGHTS_TOKEN not configured`. | Identify/provision the intended store and secure operator access, then verify sanitized insights. Health of `/api/concierge` does not prove durable logging. |
| G15 | P1 DOCUMENTED | Supabase projects named AIPS Production DB and Brand System report INACTIVE in the access check; actual runtime dependency is unconfirmed. | Map runtime environment-variable names and current storage code to the real database. Do not blindly restore old projects or migrate production data. Verify backups and a safe restore path. |
| G16 | P1 VERIFIED | Media uploader contract exists but R2 upload authentication is unavailable in this runtime. | Provide bucket-scoped credentials through approved secrets. Dry-run, versioned upload, public GET, MIME/dimension/hash check, then approved manifest record. |
| G17 | P1 DOCUMENTED | Previously selected hero “Candidate 3” has no recovered bytes in this audit. | Owner supplies the original selected file or explicitly selects a new concept. Existing production logo is already available; no need to recreate it. |
| G18 | P1 VERIFIED | AGENTS publication paragraph conflicts with current SSOT; old Cloudflare access record says Vercel does not own domain although current Vercel/build identity shows otherwise. | Correct active instructions and clearly mark historical access evidence as historical. Read live identity before each release/rollback. AGENTS correction prepared. |
| G19 | P2 VERIFIED | Eight sampled indexable routes had zero initial-HTML image elements; rendered homepage has only logo images. | Add real responsive editorial/product images where useful; preserve crawlable content and useful alt text. Zero initial images alone is not proof of an indexing penalty. |
| G20 | P2 UNKNOWN | Current indexed-page count, selected Google canonicals, impressions, search demand and ranking losses unknown. | Use Search Console; sitemap inclusion and HTTP 200 do not prove indexing. Prioritize real queries/pages rather than invented keyword volumes. |
| G21 | P2 DOCUMENTED | Historical redirects/backlinks and evidence-based lastmod coverage incomplete. | Build legacy URL inventory from GSC/backlinks; apply one-to-one redirects only when equivalent; otherwise retain genuine 404/410. Record material content update dates. |
| G22 | P2 UNKNOWN | Full mobile layout, keyboard/screen-reader flows, cookie/assistant overlay collisions and field performance unverified. | Test representative templates at small/large widths, keyboard navigation and reduced motion. Measure LCP/INP/CLS with real field data where available; no invented Lighthouse score. |
| G23 | P2 VERIFIED | CSP permits unsafe-inline/unsafe-eval; root install command uses no-frozen-lockfile. | Investigate dependencies and script needs; stage CSP tightening without breaking runtime. Validate reproducible dependency installation before changing build settings. |
| G24 | P2 DOCUMENTED | Legacy credential rotation debt and deprecated Postgres tooling remain recorded. | Verify rotation completion without reading historic secret values; modernize only after runtime mapping. Use authenticated header-based operator access rather than query tokens where possible. |
| G25 | P2 UNKNOWN | Content differentiation, hands-on evidence, author review and Bangladesh-specific value not proven across 266 URLs. | Refresh the highest-value existing pages with original examples, real screenshots, limitations, sources, review dates and contextual CTAs. No bulk near-duplicate AI articles. |
| G26 | P2 UNKNOWN | Support capacity, enquiry qualification, close rate and margin baseline unverified. | Owner/support records enquiry → quoted → paid → delivered → resolved, net contribution and response time. Optimize profitable qualified leads, not WhatsApp clicks alone. |
| G27 | P2 UNKNOWN | Vercel/registrar/R2 billing continuity, domain renewal and recovery evidence incomplete. | Owner confirms renewal, billing alerts, 2FA and recovery; scope access to AIPS. Read permissions are enough to audit most of this. |
| G28 | P3 UNKNOWN | WhatsApp API, business verification, opt-in records and templates not connected. | Keep working click-to-chat now. Add official business messaging only after account setup, current policy review, consent, message cost review, webhook validation and human escalation. |
| G29 | P3 UNKNOWN | Payment verification, fulfillment and verified-review chain not established. | Add payment automation after order ledger, merchant account and reconciliation exist. Accept a review as verified only after paid/delivered order evidence. |
| G30 | P1 VERIFIED | Previous AIPS daily growth automation was paused. | Existing task updated and re-enabled for its daily Asia/Dhaka morning cycle. Verify future execution; scheduled work is not an always-on daemon. |

## Access to add, in order

Do not send passwords, OTPs, API secrets or service-role keys in chat, tickets or Git. The assistant has no personal email address to invite. Use an existing supported authenticated connection, an actual owner-controlled operator/service account, or exports. Provision secrets in the approved execution environment; a secret in GitHub Actions is not automatically available to the local runtime.

| System | Minimum useful access | What Emon/human supplies | How access is accepted |
|---|---|---|---|
| Search Console | Property read/performance data; Full user only if sitemap/index actions are required | Current property identity, 3 months performance by query/page/country/device plus indexing/sitemap reports; ideally up to 16 months for seasonality | Read actual property data and reconcile date/filter scope. Exports unblock analysis now. |
| GA4 | Viewer for reports; Editor for stream/event configuration | Correct property and web stream; `G-...` Measurement ID is non-secret; export organic landing pages/events | Consent-aware live test appears in correct property and controlled WhatsApp event arrives once. |
| GitHub | Existing repository read/write; owner-side rules configuration | Configure branch protection/rules for this repository only | Read back rules and observe CI on a PR. No further broad repo access is needed for code edits. |
| Vercel | AIPS project deploy, preview, logs, environment management; existing reads work | Secure project-specific environment configuration if required | Preview of exact commit is READY, tested; production alias and build identity agree after release. |
| Cloudflare R2 | Object Read & Write scoped to existing `aips-media` bucket | `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` in secure execution secrets; bucket/public origin as configured | Versioned test asset upload and public retrieval succeed. Do not request account-wide administrator access for uploads. |
| DNS / registrar | Read first; zone-scoped edit only for a required DNS change | Actual registrar/provider and domain renewal evidence | Verify account-authoritative zone/renewal. Domain ownership transfer is unnecessary. |
| Database | Start with schema/backup inspection; isolated dev write access for implementation | Identify real active store and securely connect it; retention/backup decisions | Read schema and run non-destructive health query; staging migration and restore test before production changes. |
| WhatsApp | Number confirmation for click-to-chat; API access only for later messaging | Confirm `+8801865385348`, responsible support person, hours/capacity; later owned WABA/phone connection | Verify link target and draft context without sending messages; later verify webhooks/test messaging with explicit authorization. |
| Brand/evidence | Existing exact logo is available; selected hero and genuine demos | Candidate 3 file or new direction decision; genuine product captures with personal data removed | Human reviews concept and factual implications; asset QA and registry checks pass before publication. |
| Commercial operations | Owner-approved facts, not broad account privileges | Top 10 profitable products, current prices/availability, exact access/duration/limits, applicable refund terms, anonymized order outcomes | Evidence recorded in appropriate protected operations store; public projection uses only approved facts. |

R2 documentation: https://developers.cloudflare.com/r2/api/tokens/
Search Console permissions: https://support.google.com/webmasters/answer/7687615
GA4 user access: https://support.google.com/analytics/answer/9305788

## Branding and human-assisted visual production

Keep exact logo `artifacts/aips-landing/public/images/brand/aips-logo.png`. Public name is AI Premium Shop. Palette: navy #0A0E27 / #151B3D, gold #F4B942, purple #8B5CF6, white #FFFFFF, secondary text #C9CEDA; WhatsApp accent #25D366. Fonts: Inter and Anek Bangla.

Produce a small useful set before expanding: one hero with mobile crop; five genuine workflow demo posters/clips; top-ten product/page visuals; one clear ordering graphic; one access-model explanation; unique share images for priority pages. Counts are a production backlog, not an asset quota or traffic forecast.

Hero brief: premium navy/gold/purple editorial composition communicating research, coding, creative work and local buying. Keep generated imagery abstract/illustrative; no invented product UI, customers, badges or performance promises. Use the approved logo as an exact design layer, not a model-redrawn approximation. Preserve space for real accessible HTML copy. Follow the selected Candidate 3 if recovered.

Humans provide: concept selection, genuine captures/demos, exact commercial evidence and review. AI provides: drafts/concepts, layout, responsive variants, compression, meaningful alt text, metadata and implementation. Upload versioned derivatives through R2; record source, rights, approver, dimensions and hashes. No new image/video binaries in Git under the existing contract. No asset was generated, uploaded or published in this audit.

## WhatsApp funnel

Recommended page flow: relevant search result → direct answer/product fit → clear plan/access comparison → contextual enquiry → human quote → recorded paid/delivered order. Make the primary conversion label obvious, for example “Ask on WhatsApp”; retain browsing for visitors still deciding.

Prefill product, selected plan and page/reference, with an invitation to confirm current price, availability and exact terms. Do not prefill unsupported delivery/refund claims. A generic example is: “Hi AI Premium Shop, I’m interested in [product/plan]. Please confirm current price, availability, access type and applicable terms. Reference: [opaque enquiry ID].” Never embed customer credentials or private data in URLs.

Start with a minimal human-maintained ledger. Record enquiry reference, landing page/source, product, stage, owner, quote, actual paid/delivered state and contribution margin. Add database/API integration after this process is validated. Deduplicate repeat customers and test clicks. A WhatsApp click does not reveal whether the user sent a message; API events or human reconciliation are needed to observe later stages.

Scenario only: 50,000 organic sessions × 2% CTA click rate = 1,000 clicks; if 50% become conversations and 20% of those become paid orders, that is 100 orders. These are illustrative assumptions, not measured AIPS rates. Financial success still depends on actual product margin, support cost and refunds.

## Delivery sequence

1. First release: repair monitor notification handling, resolve category prerender regression, remove internal/empty homepage content, correct stale instructions. Use a narrow PR and existing release gates.
2. Measurement: connect GSC/GA4, confirm WhatsApp number, instrument and verify the funnel, establish a dated baseline. Do not wait for automated messaging to improve click-to-chat.
3. Visual/content pass: approved hero; remove demo placeholders until real assets exist; refresh ten commercially important pages using human evidence. Consolidate repeated homepage sections.
4. Growth iterations: use actual query opportunities, content gaps and enquiry outcomes to select one coherent intent cluster at a time. Prefer strengthening existing URLs. Publish original Bangladesh examples, useful comparisons and real demonstrations; seek relevant editorial/community distribution rather than link spam.
5. Operations: validate lead/order ledger, support ownership and contribution margin; then add appropriate storage, payment reconciliation and consented messaging integrations.
6. Review at 4, 8 and 12 weeks: organic users/sessions, GSC clicks/impressions, qualified enquiries, paid orders, contribution margin, response time and unresolved failures. Reforecast from real baseline and observed results.

Google recommends original, helpful information and a satisfying page experience, rather than large quantities of search-first automated content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Definition of done

Every gap needs evidence, owner, priority, implementation reference and acceptance result. A commit is not a deployed fix; a sitemap is not indexing; a click is not a sale; a scheduled task is not a completed future run. All releases must satisfy current AGENTS/SSOT gates, exact-head preview and production checks. Unknown items remain open. The task can be continually improved, but cannot honestly be certified “no gaps forever.”

## Work prepared during this audit

The branch repairs workflow output handling and corrects the stale AGENTS publication paragraph. Local mock execution verifies that backticks/template-like text remain literal and both new/existing issue paths execute. Existing SSOT/provider validators passed and diff whitespace checks passed. These changes are prepared for review, not claimed merged or deployed. The live AI-video content failure remains open; the monitor assertion has not been weakened.
