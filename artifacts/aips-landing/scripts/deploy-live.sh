#!/usr/bin/env bash
# Deploy aips-landing to production AND prove it actually went live.
#
# WHY THIS EXISTS
# ---------------
# This account's plan caps DEPLOYMENTS PER ACCOUNT PER ROLLING 24h
# (`api-deployments-free-per-day`, >100). The cap is shared by the Git
# integration and the CLI — the CLI is NOT a bypass.
#
# Measured 2026-07-30, and worth recording because it is easy to misread: a
# push was rejected at 16:58 UTC, a `vercel --prod` CLI deploy succeeded at
# ~17:03, and a second CLI deploy was rejected minutes later. The CLI run did
# not beat the limit — it happened to claim a slot that had just aged out of
# the rolling window. Do not treat the CLI as a way around the cap.
#
# What this script actually buys you:
#   * it refuses to spend a scarce deploy slot on work that fails the gates;
#   * --wait parks and retries, so the moment a slot frees the work ships
#     without anyone babysitting it;
#   * it verifies the LIVE site afterwards instead of trusting a 200. Every
#     unmatched path on this SPA returns 200 and renders client-side, so
#     "curl said 200" has repeatedly hidden real breakage (a fully blank
#     /pricing shipped that way).
#
# The only permanent fix for the cap is a paid Vercel plan — that is a business
# decision for the owner, not something this script can engineer around.
#
# USAGE
#   bash scripts/deploy-live.sh            # gates -> deploy -> verify
#   bash scripts/deploy-live.sh --wait     # same, but retry until a slot frees
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
  node scripts/validate-truth.mjs || fail "truth validator: canonical facts have drifted — fix before deploying"

  echo "- typecheck"
  npx tsc --noEmit || fail "TypeScript errors"

  echo "- production build"
  PORT=3000 BASE_PATH=/ pnpm run build >/dev/null || fail "build failed"

  grn "gates passed"
}

# --------------------------------------------------------------------- deploy
# Returns 0 on success, 2 specifically when blocked by the deploy cap, 1 otherwise.
deploy() {
  step "Deploy (Vercel CLI)"
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
    # Match Vercel's actual wording. It says "Resource is limited - try again in
    # 24 hours ... api-deployments-free-per-day", NOT "rate limited" — an
    # earlier version of this check grepped for "rate limit" and silently
    # misreported the cap as a generic failure.
    if echo "$out" | grep -qiE 'api-deployments-free-per-day|resource is limited|rate limit'; then
      ylw "deploy cap reached (shared by CLI and Git integration)"
      return 2
    fi
    red "deploy failed (exit $rc)"
    return 1
  fi
  grn "deploy finished"
  return 0
}

# Park until a deploy slot frees. The cap is a rolling 24h window, so slots age
# out continuously rather than all at once — polling gets the work live at the
# earliest possible moment instead of waiting out a full day.
deploy_waiting() {
  local attempt=1 max_hours=6 interval=600
  local max_attempts=$(( max_hours * 3600 / interval ))
  while :; do
    deploy
    case $? in
      0) return 0 ;;
      1) fail "deploy failed for a reason other than the cap — see output above" ;;
    esac
    if [ "$attempt" -ge "$max_attempts" ]; then
      fail "still capped after ${max_hours}h. Work is committed and safe; re-run later or upgrade the Vercel plan."
    fi
    ylw "attempt $attempt/$max_attempts capped — retrying in $((interval/60)) min ($(date '+%H:%M'))"
    attempt=$((attempt+1))
    sleep "$interval"
  done
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
  --wait)    gates; deploy_waiting; sleep 5; verify ;;
  *)
    gates
    deploy
    case $? in
      0) sleep 5; verify ;;
      2) fail "deploy cap reached. Work is committed and safe — re-run with --wait to ship automatically when a slot frees." ;;
      *) fail "deploy failed" ;;
    esac
    ;;
esac
