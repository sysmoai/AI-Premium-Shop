# AIPS Cloudflare Rollback Plan

## Before DNS cutover (current state)

Vercel still owns the live DNS records (apex A `76.76.21.21`, www CNAME
`cname.vercel-dns.com`). Nothing deployed to Cloudflare changes the public
site. Rollback = do nothing (the paused Vercel page remains, which is the
pre-migration state).

## After Worker deploy but before NS switch

Cloudflare serves only the `*.workers.dev` / preview URLs. Public site
untouched. Rollback = stop using the Cloudflare URLs.

## After NS switch (production on Cloudflare)

Priority 1 — restore DNS:

1. At the registrar (Squarespace Domains), switch nameservers back to
   `ns-cloud-d1.googledomains.com` … `ns-cloud-d4.googledomains.com`.
   The Google Domains zone still contains the Vercel A/CNAME and Zoho
   records — it was never deleted, only superseded.
2. Propagation is usually minutes-to-hours. Vercel then serves the site
   again in whatever state the Vercel project is in (currently paused —
   see note below).

Priority 2 — Cloudflare-side fixes (no DNS change):

- Bad deploy: `npx wrangler rollback` (project `ai-premium-shop`) reverts to
  the previous deployment.
- Code rollback: redeploy the known-good build. The last verified source is
  `3f525235e7807aa2e074c39a89f6f12c5c2737c8` (origin/main, the state that was
  live on Vercel until the pause). Build with `pnpm build:cloudflare` on the
  recovery branch `aips/cloudflare-recovery-20261014`.

## Note on Vercel as a fallback

Vercel's deployment is currently paused at the account/plan level. Rolling
back DNS to Vercel restores only the paused page until the Vercel billing
issue is resolved. Do not reactivate Vercel billing for this site.

## Protected resources (never delete)

- Vercel project/team, its deployments and env vars.
- Zoho DNS records (MX/TXT/SPF/DKIM/DMARC) in either DNS zone.
- R2 bucket `aips-media` (if it exists) and its objects.
- GitHub repo, branches, and PR history.
