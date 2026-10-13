# AIPS Cloudflare Deployment Runbook

Deploy target: Cloudflare Workers with static assets, name `ai-premium-shop`.
Repository: `sysmoai/AI-Premium-Shop`, production branch `main` (after merge).

## Prerequisites

- Node 24 + pnpm 9.15.9 (repo `packageManager`).
- Wrangler v4 authenticated: `npx wrangler whoami`.
- On Windows: Git Bash `sh` must be on PATH for the pnpm `preinstall` script,
  and the repo's `.gitattributes` must be in effect (LF checkout).

## Build + prepare (any machine)

```bash
pnpm install --frozen-lockfile
pnpm build:cloudflare
```

`build:cloudflare` runs the governed aips-landing build (validations,
SSOT projection, vite build, prerender, SEO audits) and then
`scripts/prepare-cloudflare.mjs`, which:

1. copies `api/_policy.json` + `api/_catalog.json` into `functions/api/`;
2. writes `dist/public/_redirects` (from vercel.json redirects);
3. writes `dist/public/_headers` (from vercel.json headers, /api/* first).

## Local verification

```bash
npx wrangler dev --port 8788
```

Probe list (must match Vercel behavior):

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8788/
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8788/products   # 200, NOT 308
curl -s http://127.0.0.1:8788/api/concierge                               # JSON status
curl -s -X POST http://127.0.0.1:8788/api/concierge -H 'Content-Type: application/json' -d '{"messages":[{"role":"user","content":"hi"}]}'
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://127.0.0.1:8788/chatgpt  # 301
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8788/nonexistent-xyz          # 404
```

## Secrets (production)

Set with: `npx wrangler secret put <NAME>` (project `ai-premium-shop`).

- `NVIDIA_API_KEY` (required for concierge)
- `ANTHROPIC_API_KEY` (optional fallback)
- `INSIGHTS_TOKEN` (optional, operator insights)
- `DATABASE_URL` or `POSTGRES_URL` (optional, Neon conversation store)

## Deploy

```bash
pnpm deploy:cloudflare        # npx wrangler deploy
```

Rollback: `npx wrangler rollback` (goes to the previous deployment).

## Domain cutover (owner-assisted)

1. Add zone `aipremiumshop.com` to the Cloudflare account (scans existing
   records from Google Domains). Verify/restore: Zoho MX (10/20/50), Zoho
   verification TXT, SPF TXT, any DKIM/DMARC subdomain records.
2. Attach the custom domain `aipremiumshop.com` (and `www`) to the Worker
   (Workers & Pages → project → Settings → Domains & Routes). Cloudflare
   proxies with automatic SSL.
3. At the registrar (Squarespace Domains), replace nameservers with the two
   Cloudflare-assigned nameservers. Do not edit anything else at the
   registrar.
4. Verify: `https://aipremiumshop.com` and `https://www.aipremiumshop.com`
   over HTTPS, redirects, SSL mode Full (no loop), Zoho mail still flows
   (MX unchanged inside Cloudflare).

## Post-deploy verification (release gate)

- The repo's own live-site monitor assertions (see
  `.github/workflows/live-site-monitor.yml`) must pass against the live
  domain: route markers, sitemap/robots, publication state, anti-flash CSS,
  Higgsfield WhatsApp CTA and no Offer schema.
- `.well-known/aips-build.json` must show the deployed commit.
