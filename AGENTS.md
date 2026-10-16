# AGENTS.md — AI Premium Shop (aipremiumshop.com)

## Latest verified checkpoint — 2026-10-16 (Asia/Dhaka)
- **Live Cloudflare build:** `1515200b71cdf99133f9d1ba79b91547bac2a9a0` (build_time 2026-10-16T01:17:02Z; PR #143 merge deploy) verified via `/.well-known/aips-build.json` 2026-10-16 ~07:20 +06; `main` = same SHA (deploy triggered by aips-landing/lockfile paths).
- **R2 exposed-token incident CLOSED:** previously exposed `aips-media-upload` was found still Active and was deleted 2026-10-16 ~04:53 +06; only `aips-media-upload-v2` (bucket `aips-media`, Object Read & Write) remains for media uploads; tenant deny-test passed. Evidence: `ops/audit/AIPS-FAILURE-REGISTER.md` F-021 (PR #141).
- **Worker production settings (verified 2026-10-16):** secrets = NVIDIA_API_KEY only (no DATABASE_URL/POSTGRES_URL/INSIGHTS_TOKEN); no bindings → conversation store is inert and insights fail closed by design. Commerce discovery: WhatsApp-assisted, human-operated; no order/customer database exists — see `ops/commerce/COMMERCE-OS-DISCOVERY-2026-10-16.md` (#142).
- **GitHub release control (verified 2026-10-16):** required contexts [ssot, build, validate]; enforce_admins false (admin bypass possible); `validate` runs on EVERY PR (PR #143) so docs-only PRs no longer deadlock non-admin merges. E2E/SEO-quality checks are advisory, not merge gates.
- **Operator auth (#119):** internal endpoints are header-only (Bearer) since 2026-10-16 (PR for the change pending); legacy `?token=` query fallback removed; Concierge app-level limits 15 req/min per session and 200 req/min per IP (ephemeral per isolate, 429 + Retry-After, CGNAT-safe); no edge-level IP rate rules.
- **Full browser suite GREEN:** 128/128 baseline from PR #128 (SEO Quality run `38627504846`); keep regression coverage.
- **Search Console recovered:** property `https://aipremiumshop.com/`, owner account `aipremiumshopbd@gmail.com` (verified Owner under Settings → Ownership verification, 2026-10-16). 28-day baseline: 183 clicks / 1,695 impressions / 10.8% CTR / avg position 7.8; Bangladesh 87% of clicks. Recorded in `ops/ssot/site.json` and `ops/seo/seo-growth-state.md`.
- **GSC validations started (not yet passed):** 404 (192), other-4xx (106 — migration-day Vercel 402 artifact; sampled URLs now 200 on Cloudflare), breadcrumbs (1 — `/bn` fixed in PR #136). Check outcomes in GSC before claiming closure.
- **Merchant listings (2 invalid):** `/chatgpt-plus-bangladesh`, `/gemini-advanced-bangladesh` — missing `image`; blocked on approved product imagery (#49). Warnings (shipping/returns/availability) are deliberately absent per SSOT — do not invent.
- **R2 media:** bucket `aips-media` exists (APAC, public access enabled, empty). Custom domain `media.aipremiumshop.com` connected 2026-10-16 (was "Initializing" — re-verify Active before publishing). Sibling buckets `aipt-media`/`redwanmart-assets` are OTHER tenants — never touch.
- **Open P0 #113:** real Android cellular reachability NOT verified; do not change DNS/WAF/SSL on stale assumptions. Open #119, #111, #129, #94, #95.
- Full dated release/architecture addendum: `ops/audit/AIPS-CONTEXT-HANDOFF-2026-10-14.md` section 10. Failure details: `ops/audit/AIPS-FAILURE-REGISTER.md`.

## Current comprehensive website audit (2026-10-14)
Read `ops/audit/AIPS-FULL-STACK-AUDIT-2026-10-14.md` before scoping SEO, security, conversion, API, Cloudflare, mobile/global access, CI or infrastructure tasks. This audit is date-stamped evidence, not an automatically refreshing status dashboard. It distinguishes real tested results from unverified customer/carrier/account access. New changes need a fresh live state check and must not replace commercial SSOT.

## P0 CURRENT CUSTOMER-ACCESS INCIDENT (2026-10-14)
The CEO reports that https://aipremiumshop.com DOES NOT LOAD on an actual Android phone using mobile carrier data on 2026-10-14 evening. A new screenshot is pending; do NOT assume the previous Vercel-paused image reflects the current error. The 2026-10-14 GitHub Live site monitor passed from one hosted runner, but that does not verify mobile carrier access. Read issue #113, ops/incidents/AIPS-MOBILE-DATA-2026-10-14.md and ops/audit/AIPS-CONTEXT-HANDOFF-2026-10-14.md before any site/DNS change. Treat production reachability as P0 until actual affected mobile-data acceptance is verified. Do not change Cloudflare DNS, WAF, SSL, Worker or nameservers speculatively.

## Live authority (updated 2026-10-16)
- Canonical repository: `sysmoai/AI-Premium-Shop`; app: `artifacts/aips-landing`.
- Stack: React + TypeScript + Vite, pnpm monorepo; frontend is governed/prerendered for search.
- **Production platform: Cloudflare Workers with Static Assets**, Worker `ai-premium-shop`, custom domains `aipremiumshop.com` and `www.aipremiumshop.com`. Source: `wrangler.toml`, `worker/index.js`, `functions/api/`.
- **Media origin:** Cloudflare R2 bucket `aips-media`, custom domain `media.aipremiumshop.com` (CNAME `media → aips-media` created 2026-10-16; verify Active before use). Public dev URL exists but is not for production.
- **Release: `.github/workflows/aips-cloudflare-deploy.yml` on selected `main` path changes.** Confirm actual deployed git_sha via `https://aipremiumshop.com/.well-known/aips-build.json`.
- Vercel is LEGACY/paused hosting evidence only. Do not pay Vercel or perform Vercel preview/deploy as a required production gate.
- Registrar: Squarespace Domains; primary authoritative DNS: Cloudflare. The old Google/Squarespace zone is transitional and must be kept separate from current DNS authority.
- Commercial source of truth: `ops/ssot/`. Brand/business boundaries: AIPS is isolated from SaveOnSub, AIPT, AITP and all other tenants.
- Current architecture/access register: `ops/cloudflare-migration/CANONICAL-ARCHITECTURE-AND-ACCESS.md`. Incident history: `ops/cloudflare-migration/RECOVERY-STATE.md`.
- Historic documents (`ops/harness/state.json`, `ops/ssot/site.json`, `README.md`, old runbooks) may still contain Vercel-only information. When facts conflict, verify with live provider evidence and reconcile stale references through a tested PR. Do not follow outdated Vercel instructions as production truth.

## Authority and protected commercial facts
Read `ops/ssot/` before editing public content. No prices, availability, provider authorization, access model, delivery, payments, warranty/refund terms, reviews/social proof, or legal claims may be inferred from old catalog rows. Fail closed on unknown claims. Do not present the site's internal `AIPS` abbreviation as a new public brand without approved SSOT.

## Autonomous execution and safety
Safe reversible technical/SEO/accessibility/performance/monitoring improvements can proceed with a scoped change. Protected commercial changes require approved evidence in the canonical Git SSOT. Do not request/store customer payment PINs, passwords, OTPs, cookies or API tokens in source/chat; never enable unauthorized seat sharing.

## Required release gates
1. Read Git business truth and current Cloudflare production build identity; verify live DNS/network evidence without local hosts overrides.
2. Work on a branch, document baseline, preserve redirects/canonicals/publications, and keep rollback.
3. Run applicable SSOT/truth/catalog, type/lint, build/prerender, SEO, security and browser checks. Classify existing E2E failures without suppressing genuine regressions.
4. Verify an appropriate Cloudflare preview/staging deployment when applicable. No Vercel preview requirement.
5. Merge only after release gates and acceptable risk disposition, then confirm the actual Cloudflare Worker deployment and production build identity.
6. Verify representative external customer paths (including Android Wi-Fi/mobile data when the owner/authorized device provides evidence), API behavior, conversion links, email DNS, TLS, and 402 leak guard.
7. Update the architecture register, recovery evidence, issues and next actions. Production is not verified merely because GitHub is green.

## Historical degraded/open state (snapshot 2026-10-14; superseded by the 2026-10-16 checkpoint above)
- AI Concierge `keyConfigured:false`; WhatsApp fallback does not equal live AI replies. (Superseded: synthetic probes get grounded replies with correct SSOT prices.)
- Real Android customer-network reachability remains to be rechecked following DNS transition.
- Windows temporary `AIPS-TEMP` hosts overrides must be safely removed when appropriate. (Verified removed 2026-10-15; hosts file has no AIPS entries.)
- SEO Quality's Playwright failures and stale Vercel-era registry/harness files require tracked reconciliation. (Superseded: 128/128 green via PR #128; remaining items tracked in the failure register.)
