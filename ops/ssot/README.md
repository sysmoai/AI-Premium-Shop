# AI Premium Shop — GitHub SSOT

`ops/ssot/` is the canonical machine-readable business and operating source of truth for AI Premium Shop.

## Authority
1. Current files in `ops/ssot/` for approved business/publication facts.
2. Account-authoritative **Cloudflare Workers** deployment, current DNS and `https://aipremiumshop.com/.well-known/aips-build.json` for actual runtime evidence.
3. Current application code, tests and `ops/cloudflare-migration/CANONICAL-ARCHITECTURE-AND-ACCESS.md` for technical context.
4. Historical Vercel configurations, old PRs, retired hosting, archived implementations, old harness snapshots and external workspaces are evidence only, never automatic production authority.

Notion is not business authority. ChatGPT and the CEO's approved agents are operating interfaces; durable decisions and evidence must be recorded in versioned Git files.

## Rules
- Unknown protected commercial facts remain unpublished.
- Never infer prices, access models, provider authorization, payment/delivery promises, warranty/refund terms, customer counts or compliance claims from legacy content.
- GREEN technical changes may run through the guarded release model in `autonomy-policy.json`.
- Production is not considered verified merely because a merge, Cloudflare deploy or one browser load succeeded; verify the actual Worker build SHA, external routes, and relevant customer network paths.
- Search indexing is not considered recovered until external crawl/index evidence exists.
- Some legacy metadata inside `site.json` and `ops/harness/state.json` predates the October 2026 Cloudflare cutover; reconcile only through a tested PR, never assume Vercel is the production origin.

## Publication state
`site.json` and `commercial.json` define whether normal commerce publication is permitted. While quarantine is true, build output must remain fail-closed.
