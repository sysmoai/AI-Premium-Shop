# AIPS SEO Growth State

Updated: 2026-10-14 (Asia/Dhaka). Evidence-based; UNKNOWN means unmeasured,
never estimated.

## 1. Measurement baseline (2026-10-14)

| Source | Access | Status |
|---|---|---|
| Google Search Console | connector reports `siteUnverifiedUser`, direct query `permission_denied` | BLOCKED — owner Google login required |
| GA4 / analytics IDs | `.env.example` values blank | DISABLED (trackers off) |
| Cloudflare Web Analytics | CSP allows beacon; collection unverified | UNKNOWN |
| CrUX field data | not retrieved | UNKNOWN |
| Historic GSC milestone | ~150 clicks / 28 days on 2026-05-03 (email evidence) | HISTORICAL |

No current clicks/impressions/positions are claimed. Non-branded organic
traffic baseline = UNKNOWN until GSC access is restored.

## 2. Keyword universe (generated 2026-10-14)

- `ops/seo/keyword-universe.csv` — 927 rows across 186 clusters and 193
  owned URLs. Generator: `scripts/build-keyword-universe.mjs` (reads the raw
  catalog + maintained seeds; rerun after catalog changes).
- `ops/seo/keyword-clusters.json` — cluster → keyword map.
- `ops/seo/keyword-url-ownership.json` — URL → keyword ownership map
  (one intent → one primary canonical; prevents cannibalization).
- All `demand_evidence` = UNKNOWN until a real source (GSC/Trends/ads)
  provides measurement. No volumes, CPC or difficulty are invented.

## 3. Ownership conventions

- Brand money pages: `/<slug>` when a route-registry brand page exists,
  else `/product/<slug>`, else `/products`.
- Use-case guides: `/best-ai-for-*`, budget pages `/ai-under-*`,
  how-to: `/how-to-order`, comparisons: `/<a>-vs-<b>`.

## 4. First canary candidates (recalculate with real data when available)

1. ChatGPT Plus Bangladesh pricing page (existing canonical).
2. Claude Pro pricing page.
3. Google AI Pro / Gemini page.
4. Higgsfield AI page (inquiry-only; keep truth controls).
5. High-intent AI video comparisons.

## 5. Rules (non-negotiable)

- One search intent, one canonical page. Improve existing URLs before
  creating new slugs.
- Shared-access keyword demand may be researched informationally, but
  provider-specific publication blocks always outrank SEO opportunity.
- No doorway pages, no fabricated volumes, no auto-generated filler pages.
- Every published page passes the existing governed build/SEO gates.

## 6. Next measurement actions

1. Restore Search Console access (owner Google login; property
   `https://aipremiumshop.com/`).
2. Pull 28-day query/click/impression data and populate demand evidence.
3. Verify Cloudflare Web Analytics collection and consent behavior.
4. Re-run `scripts/build-keyword-universe.mjs` and re-rank clusters with
   measured demand.
