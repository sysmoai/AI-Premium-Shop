# AGENTS.md — AI Premium Shop (aipremiumshop.com)

## Canonical project
- Domain: `aipremiumshop.com`
- Repository: `sysmoai/AI-Premium-Shop`
- Production application: `artifacts/aips-landing`
- Stack: React + TypeScript + Vite in a pnpm workspace
- Production platform: Vercel
- Durable business/operating SSOT: `ops/ssot/`
- Primary operator: ChatGPT
- Notion is not an authority.

## Authority and truth
Read `ops/ssot/` before changing public output. Current SSOT outranks historical docs, old pull requests, archived implementations and stale pages.

Protected facts must never be guessed: prices, product availability, access models, provider authorization, payment/delivery facts, warranty/refund terms, customer counts/social proof, and legal/compliance claims.

When a protected fact is unknown or unapproved, fail closed instead of projecting old content.

## Autonomous release model
GREEN work may be executed autonomously: technical SEO, accessibility, performance, responsive visual media, non-commercial informational content, internal links, tests, monitoring and reversible implementation fixes.

Protected commercial changes require explicit approved facts in the GitHub SSOT before publication.

Prohibited: passwords/OTPs, unapproved shared-seat or family-splitting delivery, fabricated testimonials/reviews/statistics/badges, or invented commercial facts.

## Required release gates
1. Read SSOT and current production state.
2. Work on a branch.
3. Run applicable SSOT, truth, catalog, type, SEO and browser checks.
4. Verify Vercel preview.
5. Merge only when required gates pass.
6. Verify the exact Vercel production deployment and representative live routes.
7. Record evidence and unresolved gaps.

A merge is not proof of a live fix. Search indexing is not considered recovered until external crawl/index evidence exists.

## Current publication state
The public site is intentionally under commerce quarantine until `ops/ssot/commercial.json` permits publication. Do not remove quarantine or re-enable old commerce output by inference.
