# AIPS Failure Intelligence Register

Deduplicated register of AIPS production/CI failures. Sources: GitHub
Actions runs/logs, live-site monitor, deployment events, provider status.
Gmail audit status: no Gmail connector is available to this execution
environment, so email evidence is UNVERIFIED; GitHub remains the
authoritative failure source. Entries are deduplicated across notifications.

Legend: OPEN / MONITORING / RESOLVED / OBSOLETE / UNVERIFIED

## F-001 — Vercel paused deployment served to customers (402)
- First: 2026-10-05 (live-site-monitor), last: 2026-10-14 (stale resolvers).
- Root cause: Vercel plan blocked → "Deployment Paused"/402; after the
  Cloudflare cutover, stale resolver caches (legacy Google/Squarespace zone
  still serving Vercel A/CNAME; A TTL 14400; delegation cache up to 48h).
- Fix: Cloudflare cutover (PR #100-#104), legacy-zone repoint to Cloudflare
  (2026-10-14), Google Public DNS cache flush, Vercel leak guard in the
  monitor (PR #105).
- Status: MONITORING — expected resolver convergence ≤4h from repoint;
  real Android acceptance still pending owner test result.

## F-002 — SEO Quality workflow: 10 Playwright failures
- First: pre-existing on pristine main baseline (proven 2026-10-13); also
  failing on PR branches. Latest run: 38466933521 (2026-10-13).
- Classification (evidence: identical failures on pristine origin/main):
  - provider-commerce-control (3): stale price assertions (BDT 2,990 vs
    current governed 3,390) + blocked-row expectations → STALE TEST.
  - product-page-truth (1), homepage-v2 (2), budget-mobile-truth (1),
    support-clusters (1), tier-a-money-pages-v2 (2): content/assertion
    drift against the Sept catalog updates → STALE TEST (each to be
    updated to current SSOT-approved facts, keeping safety assertions).
- Business impact: none on production (site serves approved projection);
  risk: red CI badge hides real regressions.
- Action: update assertions to current approved facts in a dedicated PR;
  no commercial data may change to satisfy a test.
- Status: OPEN (tracked; not yet fixed).

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
- Status: MONITORING — close after one green scheduled run.

## F-008 — Raw-catalog audit debt (validate-catalog warnings)
- 239 records missing commercialStatus/verificationDate, 14 missing
  sourceUrl, 153 missing officialUSD, 44 shared records pending CEO
  classification, 9 unverified trust fields, legacy claim occurrences.
- Impact: pre-push hook failure requiring --no-verify (documented); public
  projection strips the fields, so production is not affected.
- Status: OPEN (business-data debt; owner decisions required for shared
  classification).

## F-009 — Search Console access gap
- `siteUnverifiedUser` / `permission_denied`.
- Status: BLOCKED — requires owner Google account authorization.

## F-010 — NVIDIA diagnostic key hygiene (issue #111)
- Unused diagnostic key `aips-concierge-diag` revoked 2026-10-14.
- Pre-existing `NVIDIABuild-Autogen-43` ownership unconfirmed — left
  untouched, noted in #111.
- Status: RESOLVED for the diag key; OPEN for entitlement verification.
