#!/usr/bin/env bash
set -euo pipefail

# AIPS Website — Local Deployment Script
# Uses Wrangler OAuth (no API token needed)
# Problem solved: CLOUDFLARE_API_TOKEN env var overrides OAuth and breaks auth

PROJECT_NAME="aips-landing"
DIST_DIR="dist"
BRANCH="main"

echo "🚀 AI Premium Shop — Deployment Script"
echo "========================================"

# Step 1: Ensure dist exists
if [ ! -d "$DIST_DIR" ]; then
  echo "❌ dist/ not found. Building first..."
  pnpm build
fi

# Step 2: Clear the broken CLOUDFLARE_API_TOKEN env var
# This expired token overrides the working OAuth session
export CLOUDFLARE_API_TOKEN=""

echo "🔓 Cleared stale CLOUDFLARE_API_TOKEN (using OAuth instead)"

# Step 3: Get git info for deployment metadata
COMMIT_HASH=$(git rev-parse HEAD)
COMMIT_MSG=$(git log -1 --pretty=%B)

echo "📦 Commit: $COMMIT_HASH"
echo "📝 Message: $COMMIT_MSG"

# Step 4: Deploy
echo "☁️  Deploying to Cloudflare Pages..."
npx wrangler pages deploy "$DIST_DIR" \
  --project-name="$PROJECT_NAME" \
  --branch="$BRANCH" \
  --commit-hash="$COMMIT_HASH" \
  --commit-message="$COMMIT_MSG"

echo "✅ Deployment complete!"
