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

## Known pitfalls (each one has already cost a failed gate or a silent production bug)
- **The build is not idempotent.** `pnpm run build` rewrites tracked files (`api/_catalog.json`, `data/catalog-lite.json`, `data/catalog-pages.json`, `data/informational-products.json`, `src/generated/*`, `src/pages/HomeV2.tsx`, `src/pages/PricingPage.tsx`). Never commit that residue, and never push from a tree that still has it: the pre-push gate builds again and fails. Commit only the files you meant to change, then push from a fresh `git worktree` at that commit.
- **After editing `data/products.json`**, regenerate the raw mirrors (`node scripts/generate-concierge-catalog.mjs`, then the catalog-lite and catalog-pages mirrors), run `node scripts/validate-catalog.mjs`, and update `catalog_snapshot` counts in `ops/ssot/commercial.json`. Run `node scripts/validate-ssot.mjs` locally; the CI `ssot` job checks it.
- **The Content-Security-Policy lives in `artifacts/aips-landing/vercel.json`** (three identical header blocks) and is converted to Cloudflare `_headers` by `scripts/prepare-cloudflare.mjs`. A new third-party script or endpoint needs all three blocks updated.
- **Analytics IDs are build-time repository variables**, not secrets: `VITE_GA_ID` and `VITE_FB_PIXEL_ID`, passed in the deploy workflow. Unset means the tag never loads. Both tags are gated on cookie consent.
- **A tag that loads is not a tag that works.** Both the gtag and fbq stubs once loaded their scripts while sending nothing. Verify on production that an event request leaves the browser (`google-analytics.com/g/collect`, `facebook.com/tr`). Meta's Pixel sends nothing from headless browsers, so check it in a real browser.
- **Payment method names are pinned in several places** besides `ops/ssot/commercial.json` (`scripts/validate-concierge-truth.mjs`, both `concierge.js` files, product-guide and blog validators, e2e specs). Change them together.
- Local pushes need pnpm 10 on `PATH`; the pre-push hook runs typecheck, lint, validators, build, `seo:check` and Playwright.
