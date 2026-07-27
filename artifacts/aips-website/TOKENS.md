# AIPS Token Management — Single Source of Truth

## Cloudflare Pages Deployment

### Live Site
- **URL:** https://e21d6a9f.aips-landing.pages.dev
- **Last deployed:** 2026-05-20 via Wrangler OAuth

### GitHub Actions (Configured but Blocked)
- Workflow: `.github/workflows/deploy.yml`
- Secret: `CLOUDFLARE_API_TOKEN` ✅ set in repo
- **Blocker:** GitHub account billing lock
  - Fix at: https://github.com/settings/billing
  - Error: "account is locked due to a billing issue"

### Local Wrangler OAuth (ACTIVE)
- Token stored in: `~/.config/wrangler/config/default.toml` (Windows: `%APPDATA%/xdg.config/.wrangler/config/default.toml`)
- Current token expires: 2026-05-20T08:42:49Z (~1 hour from creation)
- Run: `npx wrangler pages deploy dist --project-name aips-landing`

### Permanent API Token (NEEDED for long-term GitHub Actions)
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token** → **Custom token**
3. Name: `GitHub Actions AIPS Deploy`
4. Permissions:
   - `Account` → `Cloudflare Pages` → `Edit`
5. Account Resources: Include `Sysmoai.com@gmail.com's Account`
6. Click **Continue to summary** → **Create Token**
7. Copy the token value
8. Set as GitHub secret:
   ```bash
   echo "YOUR_TOKEN" | gh secret set CLOUDFLARE_API_TOKEN --repo=sysmoai/aips-website
   ```

## WhatsApp Number
- Primary: `8801865385348`
- Set in: `NEXT_PUBLIC_WA_PRIMARY` env var

## Current Status
- ✅ Site deployed and live
- ✅ Code pushed to GitHub main
- ✅ GitHub Actions workflow created
- ✅ GitHub Secret set (temporary OAuth token)
- ❌ GitHub Actions blocked by billing — **needs user action**
- ⏳ Permanent API token — **needs user action** (or re-run `wrangler login` when token expires)
