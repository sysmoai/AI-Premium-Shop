# AI Premium Shop — GitHub SSOT

`ops/ssot/` is the canonical machine-readable business and operating source of truth for AI Premium Shop.

## Authority

1. Current files in `ops/ssot/`
2. Current production evidence from Vercel and `aipremiumshop.com`
3. Current application code and tests
4. Historical documents, old pull requests, archived implementations and external workspaces are evidence only, never authority.

Notion is not an authority for this project.

ChatGPT is the primary operating interface. Durable truth must still be written here so every agent run is reproducible, versioned and auditable.

## Rules

- Unknown protected commercial facts remain unpublished.
- Never infer prices, access models, provider authorization, payments, delivery, warranty/refund terms, customer counts or legal/compliance claims from historical content.
- GREEN technical/content changes may run autonomously through the release gates in `autonomy-policy.json`.
- Production is not considered verified merely because a merge succeeded; the exact Vercel deployment and representative live routes must be checked.
- Search indexing is not considered recovered until external crawl/index evidence exists.

## Publication state

`site.json` and `commercial.json` define whether normal commerce publication is permitted. While quarantine is true, build output must remain fail-closed.
