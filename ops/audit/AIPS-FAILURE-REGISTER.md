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

## F-002 — SEO Quality workflow: Playwright failures (10 → 7)
- First: pre-existing on pristine main baseline (proven 2026-10-13); also
  failing on PR branches.
- Progress 2026-10-14: PR #127 derived the ChatGPT Plus price assertions
  from ops/ssot/pricing-v2.json (approved 3,390 instead of hardcoded 2,990),
  fixing the 3 provider-commerce-control failures (run 38622210707:
  7 failed / 121 passed, down from 10).
- Remaining 7 failures (each to be fixed individually against current SSOT,
  preserving safety assertions): budget-mobile-truth (1), homepage-v2 (2),
  product-page-truth (1), support-clusters (1), tier-a-money-pages-v2 (2).
- Classification of the remaining 7: mixed stale assertions and possible
  real behavior defects; reproduce separately. Example: tier-a tests expect
  the literal phrase "do not assume" while the live governed copy says
  "must not be assumed"; budget tests expect product links on budget pages
  that are now deliberately empty/noindexed (F-014).
- Action: update assertions to current approved facts in a dedicated PR;
  no commercial data may change to satisfy a test.
- Status: OPEN (7 remaining; tracked).

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

## F-009 — Search Console access gap
- `siteUnverifiedUser` / `permission_denied`.
- Status: BLOCKED — requires owner Google account authorization.

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

## F-013 — Historical GSC indexing/schema notifications (April–May 2026)
- Connected SYSmoAI Gmail surfaced April 2026 reports of 404, robots.txt,
  soft-404, noindex, alternate canonical; also Product image and Merchant
  structured-data warnings. May 3 milestone said 150 prior-28-day clicks.
- These are HISTORICAL, not evidence of current Cloudflare production defects
  or current traffic. Verify current URL-level Search Console state and actual
  visible commerce offers before adding schema (never invent reviews/shipping).
- Status: P2 ACCESS-BLOCKED: current GSC integration reports permission_denied.

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
- Status: RESOLVED (monitor: budget buckets auto-re-index when items return).

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
