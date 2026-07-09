---
name: AIPS safe-upgrade rules
description: Standing rules for editing the live AIPS site (prices, Notion source of truth, price-review workflow)
---

**Rule:** Never change a displayed BDT `price` in `artifacts/aips-landing/data/products.json` without CEO approval. Any suggested change (from Notion, official-site research, or formula) goes into `data/price-review.json` as `pending-approval` instead.

**Why:** Owner explicitly set prices ("CEO-set prices"); the site is live and ranks. Auto-applying prices was declared a hard violation in the SAFE UPGRADE brief (July 2026).

**How to apply:** Notion database "AIPS — Catalog — Products" (data source `48285403-f0dd-4a02-9e6f-d9b7ed93dcd1`) is the source of truth for products/brand facts and *overrides web research*, but even Notion prices still require approval before hitting the site. Site slugs use a `-bangladesh` suffix vs Notion slugs. Notion had 65 active products vs ~30 tools on site (big catalog gap). `src/lib/pricing.ts` `formulaPrice()` is only for "direct abroad" comparison display, never for setting prices. Never claim "official distributor/authorized reseller". Brand-fact conflict pending owner decision: hero says "10,000+ since 2022", Notion/brief say "3,000+ since 2024".
