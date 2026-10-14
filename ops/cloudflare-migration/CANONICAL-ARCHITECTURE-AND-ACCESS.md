# AIPS Production Architecture & Access Registry (public-safe)
Snapshot date: 2026-10-14 (Asia/Dhaka). Verify at every session; this is a dated evidence index, not an automatically refreshed live dashboard.

## Canonical authority and verified runtime
- Commercial/publication authority: `ops/ssot/` (especially `commercial.json`). Never infer a protected commercial claim from this document.
- Source control: `sysmoai/AI-Premium-Shop`, production code branch `main`, app `artifacts/aips-landing` (React/TypeScript/Vite, pnpm workspace).
- Production hosting: **Cloudflare Workers with Static Assets**, Worker `ai-premium-shop`, routes for `aipremiumshop.com` and `www.aipremiumshop.com`. See `wrangler.toml`, `worker/index.js`, `functions/api/`.
- Deploy pipeline: `.github/workflows/aips-cloudflare-deploy.yml`, triggered by selected changed paths on `main`; workflow deploys Worker and assets via Wrangler.
- Production build identity at snapshot: `6fa93117fc1532bc8db3a5dc86885d1510e6ae92` from `/.well-known/aips-build.json`. Repository `main` was `48c4325c21dbc5096cb3f16b1be05ae3faea90c4` after monitoring/docs-only commits. Different SHAs are not automatically deployment drift; compare deploy-trigger paths and artifacts.
- Last observed successful Workers workflow: https://github.com/sysmoai/AI-Premium-Shop/actions/runs/38466933323
- Public homepage, catalog, product page, robots, build identity and Concierge status were independently accessible in an external fetch on 2026-10-14. This is NOT proof for every ISP, real Android, or every customer path.
- `/api/concierge`, `/api/feedback`, `/api/insights` route through `worker/index.js` and Workers-compatible handlers.
- Concierge was **DEGRADED**: public status `keyConfigured:false` (NVIDIA runtime key not configured); supported WhatsApp fallback is not equivalent to AI chat functionality.

## External services and account ownership boundaries
| Platform | AIPS role | Snapshot status / verification next step |
|---|---|---|
| GitHub | Canonical repo, PRs, CI/CD, monitoring/issues | Connected and verified. |
| Cloudflare | Authoritative zone, TLS, Workers runtime, Workers Static Assets, R2 | Primary production; account-owner session required for sensitive settings. |
| Squarespace Domains (Google Domains migration) | Registrar and legacy authoritative DNS records | Nameservers delegated to Cloudflare; transitional legacy A/CNAME pointed toward Cloudflare on 2026-10-14. Validate remaining stale caches; do not treat old Cloudflare edge IP literals as permanent. |
| Vercel | Retired/paused former origin and historical deployment evidence | Connected project exists but is NOT the production deployment authority. Do not pay or promote there. Preserve historical data during cache convergence. |
| Zoho Mail | Domain email/MX/SPF and DKIM administration | MX, SPF, verification, DMARC public DNS present. DKIM requires selector/key from actual Zoho Admin console, not a guessed record. |
| NVIDIA NIM / model API | Concierge AI replies | Runtime key absent as last observed; verify model availability, plan/quotas/cost before enabling. |
| Neon / PostgreSQL | Optional Concierge transcript and insights persistence | Code references database binding; actual connected production DB, retention and consent NOT verified. Do not assume storage is active. |
| Supabase | Historical AIPS project infrastructure | Two named AIPS Supabase projects were found INACTIVE through the connected service on 2026-10-14. Not proven as live application database. No cross-tenant access or repurposing. |
| Cloudflare R2 | Potential media storage `aips-media` | Previous operator reported bucket empty and current build had no R2 dependencies. Revalidate before activating custom media domain; do not touch another brand's bucket. |
| Google Search Console | Organic-search measurement | Connected service lists AIPS property with `siteUnverifiedUser`; usable live performance-data access is unverified. Do not report ranking/clicks without property access. |
| Cloudflare Web Analytics | Possible first-party traffic measurement | CSP permits its beacon; verify injection, consent implications and actual collection separately. |
| Command Code / Playwright MCP | Windows local execution, visible authenticated Chrome sessions | A separate execution environment. Presence in previous logs is not proof of current connection; check at each session. |

Do not publish login email addresses, account IDs, API keys, token identifiers, customer information, billing data, or browser cookies in this PUBLIC repository. A private, access-controlled account register may contain non-secret account-owner metadata and links, never raw credentials.

## DNS / domain facts (2026-10-14 independent check)
- Google Public DNS NS: `andy.ns.cloudflare.com`, `treasure.ns.cloudflare.com`.
- Current Google Public DNS apex A: `104.21.19.189`, `172.67.188.143` (observations only; not permanent hardcoding targets).
- MX: Zoho priority 10 / 20 / 50; SPF: `v=spf1 include:zohomail.com ~all`.
- DMARC TXT exists: `v=DMARC1; p=none;` (no reporting destination; NOT a completed authentication audit).
- `media.aipremiumshop.com` had no public DNS record; previous app evidence classified it as non-blocking.
- Some recursive/ISP caches previously served Vercel/HTTP 402. Legacy DNS transitional edits and Google Public DNS cache flush were reported; actual Android Wi-Fi/mobile-data acceptance remains UNVERIFIED until tested.
- Temporary Windows `hosts` entries marked `AIPS-TEMP` were reported present. Remove ONLY after safe independent checks with normal DNS and record the cleanup. They must never count as global success.

## Critical governance and known gaps
1. Close customer-network incident by proving real Android Wi-Fi and mobile-data reachability without a hosts override; do not impose an artificial four-hour maximum on all recursive resolvers.
2. Restore AI Concierge with approved NIM access or transparently retain degraded state, without unapproved API spending.
3. Reconcile stale `ops/ssot/site.json`, `ops/harness/state.json`, old README, and engineering harness references that still describe Vercel; preserve historic fields under explicitly named legacy sections with tests before promotion.
4. Separate tests: production CI and Worker deploy were green at snapshot; SEO Quality Playwright test step had 10 pre-existing reported failures. Verify root causes; never disable checks for cosmetics.
5. Fix Search Console property access/measurement truth only after valid permissions and real evidence. Keep consent and claims policies intact.
6. Audit Zoho DKIM from console before publishing a selector; review DMARC reporting / enforcement over time.
7. Restore deterministic monitoring from independent networks; existing live-site-monitor has a DAILY schedule and a Vercel leak guard, not continuous global coverage.
8. Audit www-to-apex canonical consistency, accessibility, Core Web Vitals, CSP security, data/consent flow, conversion and commercial-projection integrity without a storefront redesign.

## Release and update contract
Read `AGENTS.md`, `ops/ssot/`, `ops/cloudflare-migration/RECOVERY-STATE.md`, `ops/harness/`, this file, and live evidence before any change. Classify observations as VERIFIED / REPORTED / OPEN / BLOCKED / LEGACY with timestamps and links. Branch -> tests -> PR -> approved merge -> verify the actual Cloudflare build identity and customer paths -> update records. Stop only for authentication, irreversible or paid operations and protected commercial decisions. A green merge is not proof of a new production deployment; jobs are path-filtered.

This registry is deliberately PUBLIC-SAFE. Keep private account-inventory details outside the public repository.
