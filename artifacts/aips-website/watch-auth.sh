#!/bin/bash
# Watcher script: detects when wrangler OAuth completes, then deploys

echo "=== WRANGLER AUTH WATCHER ==="
echo "Waiting for OAuth authorization..."
echo ""
echo "STEP 1: Click this link in your browser:"
echo "https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=54d11594-84e4-41aa-b438-e81b8fa78ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8976%2Foauth%2Fcallback&scope=account%3Aread%20user%3Aread%20workers%3Awrite%20workers_kv%3Awrite%20workers_routes%3Awrite%20workers_scripts%3Awrite%20workers_tail%3Aread%20d1%3Awrite%20pages%3Awrite%20zone%3Aread%20ssl_certs%3Awrite%20ai%3Awrite%20ai-search%3Awrite%20ai-search%3Arun%20queues%3Awrite%20pipelines%3Awrite%20secrets_store%3Awrite%20artifacts%3Awrite%20flagship%3Awrite%20containers%3Awrite%20cloudchamber%3Awrite%20connectivity%3Aadmin%20email_routing%3Awrite%20email_sending%3Awrite%20browser%3Awrite%20offline_access&code_challenge=NV0Hr7n3HccIuQ-X8esQQRukZppU6aZ6j9mUcKmBKSE&code_challenge_method=S256"
echo ""
echo "STEP 2: Log into Cloudflare and click 'Authorize'"
echo ""

# Poll every 5 seconds for up to 5 minutes
for i in {1..60}; do
  sleep 5
  if npx wrangler whoami >/dev/null 2>&1; then
    echo ""
    echo "✅ AUTH SUCCESSFUL — Deploying now..."
    npx wrangler pages deploy dist --project-name aips-landing
    exit 0
  fi
  echo -n "."
done

echo ""
echo "❌ Timed out waiting for authorization. Please try again."
