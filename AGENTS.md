# AGENTS.md — AI Premium Shop (aipremiumshop.com)

## Project
- Domain: aipremiumshop.com
- Repo: github.com/sysmoai/AI-Premium-Shop (Replit mirror)
- Secondary: C:\Users\emonh\aips-website (Next.js rebuild, PROJECT PHOENIX)
- Stack: React+Vite (pnpm workspace monorepo, artifact: artifacts/aips-landing)
- Owner: EMON HOSSAIN <emon@emonhossain.pro>

## Truth Rules
- NEVER claim: "3,000+ customers" → use "a growing community of customers since 2024"
- NEVER claim unverified statistics
- Payment badges are descriptive (bKash, Nagad, Rocket, Bank Transfer)

## Build
- From artifacts/aips-landing: pnpm build (requires PORT + BASE_PATH env vars)
- Output: dist/public/ → CF Pages or Python http.server for local

## Deploy
- Push to main → GitHub Actions → CF Pages (sysmoai/AI-Premium-Shop)
- CF project: aips-website
- Requires: CF_API_TOKEN + CF_ACCOUNT_ID secrets
