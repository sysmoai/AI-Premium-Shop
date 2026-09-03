# GO 1 — SEO Ground Truth Checkpoint

Date: 2026-09-03
Status: implementation branch prepared for validation

## Completed in this wave

- Re-locked exact GitHub/Vercel production state before changing the repository.
- Re-read all required AIPS SSOT files.
- Re-verified current governed catalog surface: 185 active tool families and 206 priced public plan records on `/products`.
- Recovered official historical Google Search Console evidence from the connected AIPS mailbox.
- Distinguished old Search Console schema/indexing findings from current production behavior.
- Sampled current Bangladesh-oriented SERPs for high-intent AI subscription/product queries.
- Identified recurring competitor domains and the page features AIPS must exceed without copying unsupported claims.
- Identified sibling-domain cannibalization risk from SaveOnSub and AI Team Premium surfaces.
- Locked one primary AIPS URL per first-wave product intent.
- Selected 20 Tier-A product families for evidence-first money-page upgrades.
- Explicitly blocked fake reviews, fake product imagery, invented shipping/return schema and unsupported availability as SEO shortcuts.

## Durable outputs

- `ops/seo/README.md`
- `ops/seo/SEO-GROUND-TRUTH-2026-09-03.md`
- `ops/seo/keyword-ownership-2026-09-03.json`
- `ops/seo/serp-competitor-snapshot-2026-09-03.json`

## Key diagnosis

The current evidence does not support a sitewide indexing-ban diagnosis. The dominant gap is product-level discovery/authority: current money pages are live and crawlable, but sampled SERPs frequently surface local competitors or sibling properties instead of AIPS product URLs. Current Search Console query/page data is required to quantify that gap.

## Structured-data decision

Historical Google Merchant evidence reported missing `image` as critical. Current production does not expose a generic Product/Offer schema on the representative generic product page tested. Because AIPS currently has no approved product-image library and no verified universal shipping/return facts, restoring Merchant schema with synthetic values would violate the SSOT. Product-rich-result work therefore follows media/commercial evidence rather than warning suppression.

## Next wave

GO 2 should execute technical index cleanup and URL-ownership enforcement: historical URL registry, exact successor redirects versus 404/410, Tier-A canonical/title/H1 collision audit, internal-link ownership audit, stale competing surfaces and evidence-based indexing notification options.
