# AIPS Failure Intelligence Register

Deduplicated register of AIPS production/CI failures. Sources: GitHub
Actions runs/logs, live-site monitor, deployment events, provider status.
Gmail access correction (2026-10-14): the earlier Command Code execution
had no Gmail MCP and legitimately reported its email audit UNVERIFIED. In a
separate authorized ChatGPT connector session the SYSmoAI Gmail account was
successfully searched, with AIPS GitHub failure notices and past Google Search
Console alerts recovered. The failure root causes must still be confirmed
from exact GitHub workflow logs. Do not treat these different tool-session
access states as contradictory or infer that Command Code has Gmail access.
Entries are deduplicated across notifications.

Legend: OPEN / MONITORING / RESOLVED / OBSOLETE / UNVERIFIED

## F-001 — Vercel paused deployment served to customers (402)
- First: 2026-10-05 (live-site-monitor), last: 2026-10-14 (stale resolvers).
- Root cause: Vercel plan blocked → "Deployment Paused"/402; after the
  Cloudflare cutover, stale resolver caches (legacy Google/Squarespace zone
  still serving Vercel A/CNAME; A TTL 14400; delegation cache up to 48h).
- Fix: Cloudflare cutover (PR #100-#104), legacy-zone repoint to Cloudflare
  (2026-10-14), Google Public DNS cache flush, Vercel leak guard in the
  monitor (PR #105).
- Status UPDATE (2026-10-14 18:19+06): P0 OPEN — CEO reports the site does NOT
  work on actual Android mobile data, despite green monitoring from a GitHub
  runner. Current screenshot/response/error is pending. Do not infer that
  DNS convergence must finish within four hours or that stale DNS is proven
  as the current root cause. See issue #113 and ops/incidents/.

## F-002 — SEO Quality workflow: Playwright failures (10 → 7 → 0)
- First: pre-existing on pristine main baseline (proven 2026-10-13); also
  failing on PR branches.
- Progress 2026-10-14: PR #127 derived the ChatGPT Plus price assertions
  from ops/ssot/pricing-v2.json (approved 3,390 instead of hardcoded 2,990),
  fixing the 3 provider-commerce-control failures (run 38622210707:
  7 failed / 121 passed, down from 10).
- Previously remaining 7 failures (reproduced and addressed against current SSOT,
  preserving safety assertions): budget-mobile-truth (1), homepage-v2 (2),
  product-page-truth (1), support-clusters (1), tier-a-money-pages-v2 (2).
- Classification of the remaining 7: mixed stale assertions and possible
  real behavior defects; reproduce separately. Example: tier-a tests expect
  the literal phrase "do not assume" while the live governed copy says
  "must not be assumed"; budget tests expect product links on budget pages
  that are now deliberately empty/noindexed (F-014).
- Action: update assertions to current approved facts in a dedicated PR;
  no commercial data may change to satisfy a test.
- Status UPDATE (2026-10-15): RESOLVED. PR #128 repaired stale E2E
  expectations and fixed the genuine budget SEO hydration bug (F-017).
  CI/SSOT/SEO green. Playwright **128 passed / 0 failed** on both
  PR branch run 38627181831 and main run 38627504846.
  Keep regression coverage; reopen on any independently verified recurrence.

## F-003 — AI Concierge dead (keyConfigured:false → all requests fallback)
- First: 2026-10-13 (post-migration API check), resolved 2026-10-14.
- Root cause: NVIDIA_API_KEY missing on the Worker; after provisioning,
  retired models (meta/llama-3.1-*) returned 404 and the 9s first-token
  budget aborted valid cold starts.
- Fix: PR #109 (current models + raised budgets) + NVIDIA_API_KEY secret.
- Verified: keyConfigured:true; Banglish/English grounded answers;
  truth-guard refusal on warranty question.
- Status: RESOLVED — with open compliance note in issue #111 (NVIDIA Build
  key is labelled "for API testing use only"; production entitlement
  verification pending).

## F-004 — AIPS Cloudflare Deploy workflow failures
- Run 38461120777 (2026-10-13): wrangler-action v3 `pnpm add` at workspace
  root rejected → fixed in PR #101 (pinned npx wrangler).
- Run 38465653382 (2026-10-13): UTF-8 BOM in vercel.json broke the build →
  fixed in PR #104.
- Status: RESOLVED — subsequent main deploys green.

## F-005 — Windows governed build failures (pre-migration)
- CRLF checkouts breaking exact-string build scripts; POSIX-only path check
  in validate-indexnow-config.mjs.
- Fixed: .gitattributes (LF) + cross-platform relative-path check
  (PR #100).
- Status: RESOLVED.

## F-006 — GitHub Actions billing-era note (historical)
- Husky pre-push comment claimed Actions billing lock (2026-08). Actions
  verified running since 2026-10-13.
- Status: RESOLVED (stale note).

## F-007 — Live-site-monitor recurring failures (issue #99)
- Root cause: F-001. Monitor now includes the Vercel leak guard.
- Status UPDATE: one scheduled monitor run PASSED at 2026-10-14T07:54:41Z
  (https://github.com/sysmoai/AI-Premium-Shop/actions/runs/38531431024),
  but it is a single hosted runner and has NOT tested the failing Android
  carrier. Historical issue #99 remains open; new mobile P0 is issue #113.

## F-008 — Raw-catalog audit debt (validate-catalog warnings)
- 239 records missing commercialStatus/verificationDate, 14 missing
  sourceUrl, 159 missing officialUSD (per 2026-08-14 catalog snapshot), 44 raw shared records reviewed at the provider-family evidence level but
  not necessarily authorized at the exact SKU/fulfillment level, 9
  unverified trust fields, legacy claim occurrences.
- Impact: pre-push hook failure requiring --no-verify (documented); public
  projection strips the fields, so production is not affected.
- Status: OPEN (business-data debt; owner decisions required for shared
  classification).

## F-009 — Search Console access gap → RESOLVED 2026-10-16
- Historical: `siteUnverifiedUser` / `permission_denied`.
- Root cause: wrong Google account was being used. The AIPS Search Console
  property is owned by **aipremiumshopbd@gmail.com** ("AI Premium Shop"
  Google account), NOT by sysmoai.com@gmail.com.
- Evidence: visible-browser session 2026-10-16 00:35+06 — property
  https://aipremiumshop.com/ opens with full reports; Settings → Ownership
  verification confirms "You are a verified owner" (property added
  2026-08-02). Baseline read: 550 clicks/3mo; 143 indexed / 367 not-indexed;
  CWV no field data; HTTPS 30 valid; product snippets 4 valid;
  merchant listings 2 invalid; breadcrumbs 20 valid / 1 invalid.
- Recorded in ops/ssot/site.json (search_console section, PR #132).
- Status: RESOLVED (owner-verified). The separate ChatGPT/SMEPost connector
  still returns `siteUnverifiedUser` — unrelated to Command Code access.

## F-010 — NVIDIA diagnostic key hygiene (issue #111)
- Previous Command Code operator REPORTS that unused diagnostic key
  `aips-concierge-diag` was revoked 2026-10-14; no independent account-admin
  verification is available in this ChatGPT connector session.
- Pre-existing `NVIDIABuild-Autogen-43` ownership unconfirmed — left
  untouched, noted in #111.
- Status: RESOLVED for the diag key; OPEN for entitlement verification.

## F-011 — P0 Android mobile-data production access failure (2026-10-14)
- CEO reported at around 18:19 Asia/Dhaka that the live site does not load
  using actual mobile data. A NEW screenshot is forthcoming; exact present
  error, response code, mobile carrier and root cause UNKNOWN.
- An independent external browser successfully retrieved the real AIPS site,
  and GitHub daily monitor passed on one hosted runner at 13:54 Asia/Dhaka.
- These facts do not establish cellular access; avoid premature 'resolved'.
- Tracker: https://github.com/sysmoai/AI-Premium-Shop/issues/113
- Canonical incident: ops/incidents/AIPS-MOBILE-DATA-2026-10-14.md
- Status: P0 OPEN pending screenshot, carrier-path diagnosis and mobile test.

## F-012 — Keyword candidate versus canonical URL ownership drift (2026-10-14)
- Generator from PR #112 yields 927 proposed, ALL UNMEASURED search phrases.
- Example: 'google price in bd' is overly broad; ChatGPT price candidates
  map to /product/chatgpt-plus-bangladesh whereas current canonical money
  page is /chatgpt-plus-bangladesh. The generator may emit aliases/redirects
  rather than final canonical URLs when a generated route registry is absent.
- Action: validate live canonical ownership + public-projection eligibility,
  deduplicate/search-intent review and genuine volume before publishing pages.
- Status: P2 OPEN; do NOT create 927 SEO pages automatically.
  UPDATE 2026-10-16: Search Console is now accessible — the keyword universe
  can be validated against REAL query/impression data instead of guesses.

## F-013 — Historical GSC indexing/schema notifications (April–May 2026)
- Connected SYSmoAI Gmail surfaced April 2026 reports of 404, robots.txt,
  soft-404, noindex, alternate canonical; also Product image and Merchant
  structured-data warnings. May 3 milestone said 150 prior-28-day clicks.
- These are HISTORICAL, not evidence of current Cloudflare production defects
  or current traffic. Verify current URL-level Search Console state and actual
  visible commerce offers before adding schema (never invent reviews/shipping).
- Status UPDATE 2026-10-16: live GSC now accessible; current reports show
  143 indexed / 367 not-indexed, 2 invalid merchant listings and 1 invalid
  breadcrumb — triage these CURRENT numbers, do not reopen 2026-04/05 items.

## F-014 — SSOT-violating commercial claims in prerendered pages + llms.txt
- Found 2026-10-14 while reviewing the empty-budget-page audit finding.
- Budget pages, products hub, product meta descriptions, fallback sweep and
  llms.txt carried prohibited claims: blanket "30-day replacement warranty",
  unlisted payments (Rocket / bank transfer), fixed delivery wording
  ("5-30 minutes"), reseller/seat claims and stale prices (BDT 299/mo,
  ChatGPT Plus BDT 499) that no longer exist in the public projection.
- Fix: SSOT-compliant confirm-before-payment copy everywhere; llms.txt Policy
  Facts rewritten to approved statements; empty budget buckets
  (/ai-under-500, /ai-under-1000) are now noindex,follow until the catalog
  regains eligible listings (public projection min price = BDT 1,299).
  Approved "Trusted by 10,000+ customers since 2022" retained.
- Evidence: PRs #121, #122, #123 merged; deploy workflow green; production
  identity aa129a4d2e1cff36df182a52f19e2899eb21fff9 verified 2026-10-14
  14:18Z; live pages re-checked (noindex present, no prohibited claims,
  sitemap prunes the two buckets).
- Status: RESOLVED for blanket payment/warranty/ETA claims; additional raw
  LLM-price leak found later and resolved separately in F-016.
  Empty-budget hydration metadata issue is handled in F-017.

## F-015 — Internal endpoints accepted only URL-query tokens (issue #119)
- /api/insights and /api/concierge?diagnose=1 gated by ?token= query params,
  which leak into access logs/browser history; also per-isolate in-memory
  throttling rather than a shared limit.
- Fix shipped 2026-10-14 (PR #127): Authorization: Bearer <token> accepted
  (preferred); legacy query token kept as deprecated fallback; constant-time
  compare unchanged. Deployed as build bbddc87b7792f54d2c3ed1afdbcd03d43ec62be6
  (19:26Z). Note: production INSIGHTS_TOKEN is currently unset, so the
  endpoint fails closed with 503 for all callers — safe, but the operator
  workflow is non-functional until the secret is provisioned.
- Remaining: shared rate limiting (Cloudflare free plan allows one zone rate
  rule; needs dashboard/API authorization to enable) — tracked in #119.
- Status: PARTIALLY RESOLVED (auth scheme); rate-limit layer OPEN.

## F-016 — Raw catalog prices leaked into `/llms.txt` (P1; issue #125)
- 2026-10-15 verification: the earlier static `public/llms.txt` was generated
  directly from ungoverned raw `data/products.json` with BDT 499 ChatGPT Plus,
  BDT 599 Claude Pro and BDT 299 CapCut Pro. Current approved product pages
  offered ChatGPT Plus and Claude Pro at BDT 3,390; CapCut's current page stated
  no purchasable plan. This was distinct from F-014's banned policy-text cleanup.
- Root cause: the standalone llms generator bypassed the public projection,
  and the governed Cloudflare build did not regenerate the tracked output.
- Fix: PR #126 changes the build to generate `dist/public/llms.txt` from
  `data/public-products.json` after final sitemap pruning; tracks a safe
  price-free source fallback; adds `validate-llms-public-truth.mjs` fail-closed
  price, provider and URL consistency guard.
- Verified: build 8928183abf7fbcc398d112b593c08fcf72f7e4cc, CI and
  Cloudflare deploy green. Build guard PASS: 14 prices / 280 canonical routes.
  Live llms.txt now lists both ChatGPT Plus and Claude Pro from BDT 3,390;
  no CapCut BDT 299 offer; no links to the empty noindex budget pages.
- GitHub issue #125 closed with independent production acceptance evidence.
- Status: RESOLVED; monitor governed-projection parity on each build.

## F-017 — Client-side SEOHead reindexed empty budget pages after hydration
- First reproduction: PR #128 first browser run 38626740118
  (127 passed / 1 failed) observed React `meta[name=robots]` = `index, follow`
  on /ai-under-1000, despite prerendered HTML being noindex. This was a REAL
  crawler/runtime indexing mismatch, not a harmless stale test.
- Root cause: `BudgetPage.tsx` called SEOHead without `noindex`;
  useEffect set index,follow after React mounted.
- Fix: PR #128 passes `noindex={products.length === 0}` to SEOHead and
  updates seven stale E2E cases against approved public pricing, empty budgets,
  request-price products and expired editorial. Indexing can return when
  approved catalog records legitimately repopulate the threshold.
- Verified: branch SEO Quality 38627181831 PASS (128/128); main SEO Quality
  38627504846 PASS; Cloudflare deploy run 38627504974 PASS; public build SHA
  a8b283e5a773ae953c7bc031360b9df09a6fcd04 verified remotely.
- Status: RESOLVED on external build and browser E2E. This is NOT Android
  cellular acceptance; P0 incident #113 remains OPEN.

## F-018 — Storefront / Concierge / LLM product-family count mismatch
- Current /products: 176 active families and 193 public plan records.
  Current /api/concierge: products=177; new governed /llms.txt: 177 families.
- ProductsPage excludes `replit-bangladesh` from visible retail catalog,
  while the other catalog generators apply different eligibility scopes.
  This could explain one additional family; verify an exact slug-level diff.
- The Replit entry in ops/platforms/retired.json is a DEVELOPMENT/HOSTING
  retirement statement, not automatic proof that resale/product availability
  must be blocked. No commercial publication changed.
- Tracker: https://github.com/sysmoai/AI-Premium-Shop/issues/129
- Status: P2 OPEN — reconcile canonical metric definitions and access scope
  under approved commercial/provider SSOT before editing public claims.
  UPDATE 2026-10-16 (Command Code): exact slug-level evidence recorded on the
  issue — projection has 177 unique slugs including replit-bangladesh (Active,
  BDT 3,390); the storefront RETIRED set in sanitize-product-prerender.mjs
  subtracts exactly this one family; both /replit-bangladesh and
  /product/replit-bangladesh 308 to /products. A live Concierge probe answers
  the Replit price from catalog knowledge but returns no product card. Two
  options posted for owner decision: (A) retire the raw record (product
  removal, needs CEO authorization), or (B) keep WhatsApp-only sales and
  scope the Concierge wording.

## F-019 — Phase 3 technical-debt sweep (2026-10-16)
- A. Merge artifact: a trailing `>>>>>>> origin/main` remained in
  ops/seo/seo-growth-state.md after the #137 conflict resolution.
  Removed on main (commit b0805fa) with the intended content preserved;
  owner-role statements corrected to the verified Owner level.
- B. Stale AGENTS.md checkpoint (2026-10-15) refreshed to verified
  2026-10-16 state (commit b03caf0): production SHA dc955dbd, 128/128 E2E,
  GSC owner account aipremiumshopbd@gmail.com, R2/custom-domain status,
  sibling-tenant bucket isolation warning.
- C. Legacy URL triage verified from Windows vantage and recorded in
  ops/seo/seo-growth-state.md section 10 (commit c3334ab): /students,
  /category/bundles, /blog/ai-video-tools-bangladesh, /digital-marketing/,
  /2025/11/ keep 404; /best-ai-for-students is the live equivalent;
  /canva-vs-adobe returns 451 — an INTENTIONAL edge-level restriction not
  emitted by repo code; the governed equivalent /canva-vs-adobe-express is
  live (200) and in the sitemap. No redirects added; restriction preserved.
- Status: RESOLVED for A/B/C. Media infrastructure: see issue #49 (bucket
  aips-media empty; custom domain media.aipremiumshop.com connected
  2026-10-16, verify Active + first public object before production use).
