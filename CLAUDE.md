# CLAUDE.md — AI Premium Shop

This file is a pointer. The previous long-form guide (last updated 2026-07-31) described Vercel deployment,
an 87-product catalog and old contacts; it is archived at
[`docs/history/CLAUDE-2026-07-31-vercel-era.md`](docs/history/CLAUDE-2026-07-31-vercel-era.md) for audit only.
Do not follow commands, deploy steps, counts or contacts from it.

## Read first, in this order
1. `AGENTS.md` — latest verified checkpoint, live authority and required release gates.
2. `ops/ssot/site.json`, `ops/ssot/commercial.json`, `ops/ssot/autonomy-policy.json`, `ops/ssot/brand-visual.json` — business truth. They outrank every other document in this repo.
3. `ops/audit/AIPS-FAILURE-REGISTER.md` — known failures and their status.
4. `ops/seo/seo-growth-state.md` — SEO evidence; `UNKNOWN` means unmeasured.

## Production facts (verify live before relying on them)
- App: `artifacts/aips-landing` (React + Vite + TypeScript, pnpm workspace).
- Hosting: Cloudflare Workers with Static Assets, Worker `ai-premium-shop`, config `wrangler.toml`, API in `functions/api/` via `worker/index.js`.
- Release: `.github/workflows/aips-cloudflare-deploy.yml` on `main`. Confirm the deployed commit at `https://aipremiumshop.com/.well-known/aips-build.json`.
- Vercel is retired. Never deploy to, pay for or require a Vercel preview. `vercel.json` is legacy.

## Working rules
- Build and test with `pnpm install --frozen-lockfile` then `pnpm run build` in `artifacts/aips-landing` (the build runs the governed SSOT, prerender, SEO and llms-truth gates).
- Prices, availability, access model, provider authorization, payment, delivery, refund, social proof and legal claims are protected facts: take them from `ops/ssot/` only, never infer them.
- Never request or store passwords, OTPs, PINs, cookies or API tokens; never publish shared-seat offers that `ops/ssot/` blocks.
- Work on a branch and open a PR. Merging and deploying need the owner's approval under the release gates.
- AIPS is isolated from SaveOnSub, softsuper.shop, SYSmoAI, AIPT, AITP and other brands; never touch their workers, buckets, data or accounts.
