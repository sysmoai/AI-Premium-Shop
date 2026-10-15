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

## 7. 2026-10-14 quality and production-access amendment

- Current P0 customer problem: Android mobile-data access FAIL reported by CEO,
  even while the remote Cloudflare site and daily GitHub monitoring succeed.
  Incident: ops/incidents/AIPS-MOBILE-DATA-2026-10-14.md (issue #113).
  Do not treat affected cellular market as accessible until verified.
- The 927 keyword rows are **machine-generated candidates**, not measured
  search demand, approved content topics or necessarily valid canonical URLs.
  All demand_evidence values remain UNKNOWN. Example overly generic query:
  'google price in bd'. Example provisional mapping: ChatGPT price keyword
  points to /product/chatgpt-plus-bangladesh, while the live canonical money
  page is /chatgpt-plus-bangladesh. Validate route registry against live
  canonical and redirect behavior before generating pages.
- Data source priority: CURRENT governed public projection for eligibility,
  provider-policy evidence for access, and authoritative current GSC for
  demand. Raw 239 products do not imply 239 authorized public offers.
- A separate authorized ChatGPT Gmail connector was able to inspect historic
  AIPS Search Console emails; the prior Command Code session lacked that
  connector. GSC direct query is still permission_denied for this account.
- Full execution handoff: ops/audit/AIPS-CONTEXT-HANDOFF-2026-10-14.md.

## VERIFIED GSC baseline — 2026-10-16 (live dashboard, 3 months to 2026-10-13)

- Property: https://aipremiumshop.com/ — owner account aipremiumshopbd@gmail.com
  (recorded in ops/ssot/site.json). Access verified via visible browser.
- Web search: 550 clicks, 6,304 impressions, 8.7% CTR, avg position 11.1.
  820 queries recorded; demand is currently brand-heavy.
- Top queries (clicks/impressions): ai premium shop 50/78, premium shop bd
  6/193, ai store bd 5/52, all premium shop 5/27, ai premium subscription
  4/28, ai shop 2/39, ai premium tools 2/32, ai buy bd 2/16, ai tools buy
  2/6, heygen ai price in bangladesh 2/2.
- Indexing: 143 indexed / 367 not-indexed; CWV no field data; HTTPS 30 valid;
  product snippets 4 valid; merchant listings 2 invalid; breadcrumbs 20/1.
- Interpretation: ~18 clicks/day, ~11th avg position — the 50,000
  monthly-visit target is a long-term ambition, not a near-term projection.
  Next measured steps: triage the 367 not-indexed reasons, repair the 2
  invalid merchant listings and 1 invalid breadcrumb, then validate the
  keyword universe against the 820 real queries before any new content.

