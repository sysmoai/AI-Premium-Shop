# AGENTS.md — AI Premium Shop (aipremiumshop.com)

## Latest verified checkpoint — 2026-10-15
- **Live Cloudflare build:** `a8b283e5a773ae953c7bc031360b9df09a6fcd04` from PR #128, independently fetched via `/.well-known/aips-build.json`; verify fresh on each new session.
- **Full browser suite GREEN:** SEO Quality main run `38627504846`, 128/128 tests passed after fixing real budget-page hydrated robots/noindex mismatch and stale assertions (PR #128).
- **Governed `llms.txt` fixed:** PR #126 generates from approved public projection and final canonical sitemap; excludes old raw shared/CapCut/ChatGPT price claims; P1 issue #125 closed with production evidence.
- **Current Concierge:** public GET `keyConfigured:true` (not licensing entitlement, issue #111). Previous `keyConfigured:false` below is HISTORICAL and superseded.
- **Open P0 #113:** real Android cellular reachability NOT verified; do not change DNS/WAF/SSL on stale assumptions. Open #119 rate-limiting/operator security, #116 residual error logging, #129 176 vs 177 metric, GSC permission gap.
- Full dated release/architecture addendum: `ops/audit/AIPS-CONTEXT-HANDOFF-2026-10-14.md` section 10. Failure details: `ops/audit/AIPS-FAILURE-REGISTER.md` F-016–F-018.

## Current comprehensive website audit (2026-10-14)
Read `ops/audit/AIPS-FULL-STACK-AUDIT-2026-10-14.md` before scoping SEO, security, conversion, API, Cloudflare, mobile/global access, CI or infrastructure tasks. This audit is date-stamped evidence, not an automatically refreshing status dashboard. It distinguishes real tested results from unverified customer/carrier/account access. New changes need a fresh live state check and must not replace commercial SSOT.

## P0 CURRENT CUSTOMER-ACCESS INCIDENT (2026-10-14)
The CEO reports that https://aipremiumshop.com DOES NOT LOAD on an actual Android phone using mobile carrier data on 2026-10-14 evening. A new screenshot is pending; do NOT assume the previous Vercel-paused image reflects the current error. The 2026-10-14 GitHub Live site monitor passed from one hosted runner, but that does not verify mobile carrier access. Read issue #113, ops/incidents/AIPS-MOBILE-DATA-2026-10-14.md and ops/audit/AIPS-CONTEXT-HANDOFF-2026-10-14.md before any site/DNS change. Treat production reachability as P0 until actual affected mobile-data acceptance is verified. Do not change Cloudflare DNS, WAF, SSL, Worker or nameservers speculatively.

## Live authority (updated 2026-10-14)
- Canonical repository: `sysmoai/AI-Premium-Shop`; app: `artifacts/aips-landing`.
- Stack: React + TypeScript + Vite, pnpm monorepo; frontend is governed/prerendered for search.
- **Production platform: Cloudflare Workers with Static Assets**, Worker `ai-premium-shop`, custom domains `aipremiumshop.com` and `www.aipremiumshop.com`. Source: `wrangler.toml`, `worker/index.js`, `functions/api/`.
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

## Historical degraded/open state (snapshot 2026-10-14; superseded by 2026-10-15 checkpoint above)
- AI Concierge `keyConfigured:false`; WhatsApp fallback does not equal live AI replies.
- Real Android customer-network reachability remains to be rechecked following DNS transition.
- Windows temporary `AIPS-TEMP` hosts overrides must be safely removed when appropriate.
- SEO Quality's Playwright failures and stale Vercel-era registry/harness files require tracked reconciliation.
- Refer to current provider state before deciding whether any finding is still open.
