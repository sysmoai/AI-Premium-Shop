#!/bin/bash
# CommandCode SSH Rebuild — pulls latest from GitHub, builds, and deploys
# Run this from the Replit Shell when CommandCode pushes code changes
set -e

echo "=== CC Rebuild $(date '+%Y-%m-%d %H:%M:%S') ==="

# Pull latest code from CommandCode branch
echo "[1/3] Pulling latest code..."
git pull origin replit-agent --no-edit

# Build
echo "[2/3] Building..."
pnpm run build 2>&1 | tail -5

# Restart the app
echo "[3/3] Restarting app..."
kill -9 $(lsof -t -i:8080 2>/dev/null || echo 0) 2>/dev/null || true
echo "" > /tmp/.cc-rebuild-trigger

echo "=== Rebuild complete. App restarting... ==="
echo "Next: Click 'Republish' in the top bar to deploy to production."
echo ""
