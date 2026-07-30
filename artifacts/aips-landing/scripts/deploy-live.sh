#!/usr/bin/env bash
# Deploy aips-landing to production AND prove it actually went live.
#
# WHY THIS EXISTS
# ---------------
# Pushing to main triggers Vercel's Git integration, which on this account's
# plan is capped at a daily deployment count. Once that cap is hit, every push
# is rejected with "Deployment rate limited — retry in 24 hours" and work sits
# queued for hours. Measured 2026-07-30: the Git integration was hard-blocked
# while a direct `vercel --prod` CLI deploy from the repo root succeeded
# immediately and aliased to aipremiumshop.com. The CLI path is therefore the
# reliable way to get work live when the Git integration is throttled.
#
# It also refuses to deploy anything that fails the quality gates, and — the
# part that matters most on this SPA — it verifies the LIVE site afterwards
# instead of trusting a 200. Every unmatched path on this app returns HTTP 200
# and renders client-side, so "curl said 200" has repeatedly hidden real
# breakage (a fully blank /pricing shipped that way).
#
# USAGE
#   bash scripts/deploy-live.sh            # gates -> deploy -> verify
#   bash scripts/deploy-live.sh --verify   # verify the live site only
#   bash scripts/deploy-live.sh --dry-run  # gates only, no deploy
set -uo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$APP_DIR/../.." && pwd)"
SITE="https://aipremiumshop.com"
MODE="${1:-deploy}"

red()  { printf '\033[31m%s\033[0m\n' "$*"; }
grn()  { printf '\033[32m%s\033[0m\n' "$*"; }
ylw()  { printf '\033[33m%s\033[0m\n' "$*"; }
step() { printf '\n\033[1m== %s\033[0m\n' "$*"; }

fail() { red "FAIL: $*"; exit 1; }

# ---------------------------------------------------------------- quality gates
gates() {
  step "Quality gates"
  cd "$APP_DIR" || fail "cannot enter $APP_DIR"

  echo "- catalog validator (counts, prices, concierge sync, claim scan)"
  node scripts/validate-catalog.mjs || fail "validator reported hard failures — fix before deploying"

  echo "- typecheck"
  npx tsc --noEmit || fail "TypeScript errors"

  echo "- production build"
  PORT=3000 BASE_PATH=/ pnpm run build >/dev/null || fail "build failed"

  grn "gates passed"
}

# --------------------------------------------------------------------- deploy
deploy() {
  step "Deploy (Vercel CLI, bypasses the Git-integration daily cap)"
  # The project's Root Directory is artifacts/aips-landing, so the CLI must run
  # from the repo root or it doubles the path. The link lives in the app dir;
  # copy it to the root only for the duration of the deploy so nothing stray is
  # left behind (a committed root .vercel confuses the Git integration).
  cd "$REPO_ROOT" || fail "cannot enter $REPO_ROOT"
  local created_link=0
  if [ ! -f .vercel/project.json ]; then
    mkdir -p .vercel
    cp "$APP_DIR/.vercel/project.json" .vercel/project.json || fail "no Vercel link found at $APP_DIR/.vercel"
    created_link=1
  fi

  local out
  out="$(vercel --prod --yes 2>&1)"
  local rc=$?
  [ "$created_link" = "1" ] && rm -rf "$REPO_ROOT/.vercel"

  echo "$out" | tail -5
  if [ $rc -ne 0 ]; then
    echo "$out" | grep -qi "rate limit" && fail "CLI deploy ALSO rate-limited — wait for reset, then re-run"
    fail "deploy failed (exit $rc)"
  fi
  grn "deploy finished"
}

# --------------------------------------------------------- live verification
verify() {
  step "Verify LIVE site ($SITE)"
  cd "$APP_DIR" || fail "cannot enter $APP_DIR"

  # Expected numbers come from the catalog itself, so this check can never drift
  # from what the site is supposed to be claiming.
  local expect
  expect="$(node -e '
    const p=require("./data/products.json").products;
    const slugs=new Set(p.map(x=>x.slug));
    const listed=p.filter(x=>!x.requestPrice&&x.price!=null).map(x=>x.price);
    console.log(slugs.size+" "+Math.min(...listed));
  ')" || fail "could not read catalog"
  local n_products="${expect% *}" min_price="${expect#* }"
  echo "- catalog says: $n_products products, entry price BDT $min_price"

  local html
  html="$(curl -fsS --max-time 25 "$SITE/")" || fail "homepage unreachable"

  echo "$html" | grep -q "$n_products" \
    || fail "homepage <head> does not state the real product count ($n_products)"
  echo "$html" | grep -q "$min_price" \
    || fail "homepage <head> does not state the real entry price ($min_price)"
  grn "  head states correct count + entry price"

  # Claims that were provably false and must never return.
  if echo "$html" | grep -qE '118\+|BDT 350|৳350'; then
    fail "stale/phantom claim served on the homepage (118+ or the ৳350 price that no product has)"
  fi
  grn "  no phantom ৳350 / stale 118+ claim"

  # Concierge: confirms the serverless function deployed AND its grounding
  # catalog regenerated alongside the product data.
  local health
  health="$(curl -fsS --max-time 25 "$SITE/api/concierge")" || fail "/api/concierge unreachable"
  echo "$health" | grep -q '"ok":true' || fail "concierge unhealthy: $health"
  echo "$health" | grep -q "\"products\":$n_products" \
    || fail "concierge catalog is stale (expected $n_products): $health — run scripts/generate-concierge-catalog.mjs"
  grn "  concierge healthy, grounded in $n_products products"

  # Critical routes. NOTE: this app rewrites every unmatched path to index.html,
  # so a 200 proves almost nothing — it only rules out edge/CDN failures. Real
  # render verification needs a browser; see the note printed at the end.
  for path in / /products /pricing /blog /claude-pro-bangladesh; do
    local code
    code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$SITE$path")"
    [ "$code" = "200" ] || fail "$path returned HTTP $code"
  done
  grn "  key routes reachable"

  step "LIVE VERIFIED"
  ylw "Reminder: HTTP 200 does not prove this SPA rendered. For a full check of"
  ylw "rendered text/console errors, run the headless crawl over the sitemap."
}

case "$MODE" in
  --verify)  verify ;;
  --dry-run) gates; ylw "dry run — not deploying" ;;
  *)         gates; deploy; sleep 5; verify ;;
esac
