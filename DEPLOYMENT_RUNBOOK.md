# Deployment runbook (moved)

The previous runbook described Vercel deployment, which is retired for AI Premium Shop. It is archived at
[`docs/history/DEPLOYMENT_RUNBOOK-2026-07-29-vercel-era.md`](docs/history/DEPLOYMENT_RUNBOOK-2026-07-29-vercel-era.md) for audit only.

Current production release path:

- Platform: Cloudflare Workers with Static Assets, Worker `ai-premium-shop` (`wrangler.toml`).
- Release: merge to `main` triggers `.github/workflows/aips-cloudflare-deploy.yml` (path-filtered).
- Verify: `https://aipremiumshop.com/.well-known/aips-build.json` must show the merged `git_sha`.
- Gates and approvals: `AGENTS.md` → "Required release gates" and `ops/ssot/autonomy-policy.json`.
