# Deployment Guide — AI Premium Shop Website

**Zero-cost, zero-billing deployment using local Wrangler OAuth.**

---

## The Problem We Solved

| Issue | Why It Happened | Solution |
|-------|----------------|----------|
| GitHub Actions blocked | `sysmoai` account has a billing lock | **Removed GitHub Actions entirely** — deploy locally instead |
| API token kept expiring | Temporary OAuth token in GitHub secret | **Use local Wrangler OAuth** — refreshes automatically, no token management |
| `wrangler` auth failing | `CLOUDFLARE_API_TOKEN` env var (expired) was overriding OAuth | **Deploy scripts clear the env var** before calling wrangler |

---

## How to Deploy

### Option A: One-command deploy (Recommended)

```bash
# macOS / Linux / Git Bash on Windows
pnpm deploy

# Windows Command Prompt
pnpm deploy:win
```

That's it. No tokens, no billing, no GitHub Actions.

### Option B: Manual steps

```bash
# 1. Build
pnpm build

# 2. Clear the broken env var and deploy
export CLOUDFLARE_API_TOKEN=""
npx wrangler pages deploy dist --project-name=aips-landing --branch=main
```

### Option C: Double-click (Windows)

Double-click `deploy.bat` in File Explorer.

---

## How It Works

1. **OAuth session stored locally** in `%APPDATA%/.wrangler/config/default.toml`
2. **Auto-refresh** — Wrangler refreshes the token before it expires
3. **No API tokens needed** — The OAuth flow handles everything
4. **No GitHub required** — Deploy directly from your machine

---

## Live Site

- **Production:** https://a3e85522.aips-landing.pages.dev
- **Project:** `aips-landing` on Cloudflare Pages
- **Account:** `sysmoai.com@gmail.com`

---

## Troubleshooting

### "Invalid access token [code: 9109]"

Run the deploy script — it automatically clears `CLOUDFLARE_API_TOKEN`.

### "Authentication error [code: 10000]"

Same fix — the env var is overriding OAuth. The deploy script handles it.

### OAuth completely expired (rare)

```bash
npx wrangler login
```

This opens your browser. Click **"Authorize"** — no payment needed.
