@echo off
setlocal EnableDelayedExpansion

REM AIPS Website — Local Deployment Script (Windows)
REM Uses Wrangler OAuth (no API token needed)

echo 🚀 AI Premium Shop — Deployment Script
echo ========================================

REM Step 1: Ensure dist exists
if not exist "dist\" (
  echo ❌ dist/ not found. Building first...
  call pnpm build
)

REM Step 2: Clear the broken CLOUDFLARE_API_TOKEN env var
set "CLOUDFLARE_API_TOKEN="

echo 🔓 Cleared stale CLOUDFLARE_API_TOKEN (using OAuth instead)

REM Step 3: Get git info
for /f "tokens=*" %%a in ('git rev-parse HEAD') do set COMMIT_HASH=%%a
for /f "tokens=*" %%a in ('git log -1 --pretty^=%%B') do set COMMIT_MSG=%%a

echo 📦 Commit: %COMMIT_HASH%
echo 📝 Message: %COMMIT_MSG%

REM Step 4: Deploy
echo ☁️  Deploying to Cloudflare Pages...
call npx wrangler pages deploy dist --project-name=aips-landing --branch=main --commit-hash="%COMMIT_HASH%" --commit-message="%COMMIT_MSG%"

echo ✅ Deployment complete!
pause
