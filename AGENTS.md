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

Provider-specific restrictions and compliance blocks are recorded in `ops/ssot/provider-compliance.json` when present and must be checked before restoring or creating an offer.

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
The public site is under **commerce quarantine**, not a mandatory sitewide shutdown. Truth-safe informational routes may remain public and indexable when `ops/ssot/site.json` explicitly allows them. Historical or unapproved commercial routes must default to `noindex` and a review-gated public state while `ops/ssot/commercial.json` has quarantine enabled.

Do not remove commerce quarantine, republish historical prices/access models, or re-enable old commercial output by inference. Quarantine must never be bypassed by stale catalog data, prerender output, cached HTML, posters, or generated media.
