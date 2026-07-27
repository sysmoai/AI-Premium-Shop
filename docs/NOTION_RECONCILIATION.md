# Notion ↔ Website Reconciliation — 2026-07-27

Source of truth per R11: Notion. Compared `AIPS — Catalog — Products` (66 products,
data source `collection://48285403-f0dd-4a02-9e6f-d9b7ed93dcd1`) against
`artifacts/aips-landing/data/products.json` (80 variant rows, ~62 products).

## ⚠️ Three conflicting pricing authorities [HIGH — verified directly]

| Source | ChatGPT Plus shared | Last touched |
|---|---|---|
| Notion Catalog DB ("Starting Price BDT") | **350** | 2026-07-20 |
| Notion AIPS Hub "EXECUTIVE PRICING DECISIONS" | **599** (and ৳999 campaign page 07-23; $20-tier personal locked 2,990) | 2026-07-22 |
| Repo `aips-landing` (commit "Definitive pricing sweep") | **499** | 2026-07-27 |

The Notion *database* has NOT absorbed the CEO decisions page, and the repo went a
third direction. Same pattern for Claude Pro / Perplexity (DB 350 vs decisions
599/2,990) and Grok (decisions: SuperGrok 4,990, Lite 1,699 — DB has no Grok row at all).
**CEO must pick the single authority; then the other two get overwritten.**

## Starting-price conflicts (site min vs Notion DB) [HIGH]

22 products differ; extremes: adobe-firefly site 190 vs Notion 1,099 · descript site 470
vs 1,099 · synthesia site 700 vs 1,499 · ideogram site 2,990 vs 499 · cursor site 2,990
vs 999 · manus site 2,500 vs 999. Full table generated from live data — regenerate with
the comparison script (see git history of this file's commit).

## Catalog gaps

- **36 Notion products missing from the site** — incl. entire ops/automation category
  (Zapier, Make, n8n, Monday, ClickUp, Airtable, HubSpot, Semrush, Surfer, Notion AI,
  Google AI Pro, DeepL, VEED, Pictory, Remove.bg, Tome, setup services…).
- **17 site products missing from the Notion DB** — Gemini Advanced, SuperGrok, Suno,
  Udio, Gamma, v0.dev, Windsurf, Kling, Pika, Freepik, Opus Clip, ChatGPT Go, Replit,
  plus 4 bundles (student/freelancer/business/b2b). The DB is NOT yet complete as SSOT.

## Recommended sync plan (pending CEO price ruling)

1. CEO declares price authority (recommend: fix the Notion DB to the 07-22 decisions,
   then treat DB as sole SSOT).
2. Add the 17 site-only products to the Notion DB (I can do this via the connector).
3. Regenerate site `products.json` from the Notion DB (fulfils R11) and add the 36
   missing products to the site.
4. Add a `scripts/import-from-notion.ts` step to CI so drift can't recur.

## Also noted [MED]
- Backend repo `sysmoaigit/aips-ecommerce` (different GitHub org) referenced in the
  AIPS Hub — outside current session access scope; include it in a future consolidation pass.
- AIPS Hub lists domain as `aipremiumshop.com.bd`; repo/CLAUDE.md use `aipremiumshop.com`. Confirm canonical domain.

---
## SYNC EXECUTED — 2026-07-27 (CEO ruling: 07-22 decisions page is law)

- Notion DB: 16 prices corrected + 18 products added (now 84 rows).
- Site `products.json`: 25 variant prices corrected + 3 variants added (claude-pro-starter-shared 599, supergrok-shared 699, google-ai-pro-shared 599).
- Copy sweep: 42 lines (aips-landing) + 61 lines (aips-website) of hardcoded ৳ prices updated, context-aware (product keyword required on line).
- Still flagged [MED]: Adobe Firefly shared ৳190 row (index has personal 799 only); Gamma Plus vs Gamma Pro naming; midjourney-mega DB 6,950 vs site 17,940; ChatGPT Business tiers not covered by the 07-22 index; the 36 Notion-only products still need site pages (needs design work, not just data).

---
## FINAL VERIFICATION PASS — 2026-07-27
Full DB↔site cross-check after all rulings. Added 3 law-backed shared variants missing
from the site (cursor 699, github-copilot 399, suno 1199 — 07-22 index). Reverted a
misapplied DB price (runway-standard 2,990→1,299; index covers Runway Pro only).

### Prices with NO CEO-verified source — need a pricing pass [LOW confidence both sides]
descript (site 470 / DB 1,099) · murf (740/499) · otter (799/999) · quillbot (390/399) ·
synthesia (700/1,499) · writesonic (799/499) · heygen (1,499/1,399) · jasper (1,520/1,299) ·
runway-standard (1,794/1,299) · replit (500/999) · midjourney-mega (17,940/6,950) ·
google-ai-pro DB row 499 duplicates gemini-advanced 599 — recommend retiring one.
