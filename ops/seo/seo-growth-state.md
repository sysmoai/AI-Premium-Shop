# AIPS SEO Growth State

Updated: 2026-10-16 (Asia/Dhaka). Evidence-based; UNKNOWN means unmeasured,
never estimated.

## 1. Measurement baseline (2026-10-14)

| Source | Access | Status |
|---|---|---|
| Google Search Console | On 2026-10-14 this ChatGPT/SMEPost connector reported `siteUnverifiedUser`; on 2026-10-16 Command Code's visible browser accessed the property as `aipremiumshopbd@gmail.com` | BROWSER ACCESS VERIFIED (session-specific). The separate SMEPost connector still requires its own account authorization. |
| GA4 / analytics IDs | `.env.example` values blank | DISABLED (trackers off) |
| Cloudflare Web Analytics | CSP allows beacon; collection unverified | UNKNOWN |
| CrUX field data | not retrieved | UNKNOWN |
| Historic GSC milestone | ~150 clicks / 28 days on 2026-05-03 (email evidence) | HISTORICAL |

This section is the HISTORICAL 2026-10-14 baseline. The later 2026-10-16
visible-browser evidence below supersedes the 'no current data' statement.
Non-branded organic clicks and conversions remain unmeasured separately.

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

1. DONE for the Command Code visible-browser session: access `https://aipremiumshop.com/` using CEO-designated Google account `aipremiumshopbd@gmail.com` (2026-10-16). Verify its actual permission level under Search Console Settings → Users and permissions before calling it a verified Owner role. The separate ChatGPT/SMEPost connector remains `siteUnverifiedUser` until explicitly reauthorized.
2. Pull last-finalized 28-day and comparison-period query/page/country/device exports and populate demand evidence; first three-month snapshot appears below.
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
  connector. In THIS ChatGPT/SMEPost connector session, GSC still reports
  `siteUnverifiedUser`; this does not contradict successful Command Code
  browser access through the different Google account below.
- Full execution handoff: ops/audit/AIPS-CONTEXT-HANDOFF-2026-10-14.md.

## VERIFIED GSC baseline — 2026-10-16 (live dashboard, 3 months to 2026-10-13)

- Property: https://aipremiumshop.com/ — CEO-designated account
  aipremiumshopbd@gmail.com (recorded in ops/ssot/site.json). Access to
  reports observed through the visible browser; exact Search Console
  **Owner** permission level still requires checking Settings → Users and permissions.
- Web search: 550 clicks, 6,304 impressions, 8.7% CTR, avg position 11.1.
  820 query rows reported in the visible interface; specific low-volume
  queries may be withheld/anonymized by Search Console. Among observed top
  terms, several are branded; compute true branded/non-branded share separately.
- Top queries (clicks/impressions): ai premium shop 50/78, premium shop bd
  6/193, ai store bd 5/52, all premium shop 5/27, ai premium subscription
  4/28, ai shop 2/39, ai premium tools 2/32, ai buy bd 2/16, ai tools buy
  2/6, heygen ai price in bangladesh 2/2.
- Indexing: 143 indexed / 367 not-indexed (not-indexed includes intentional
  canonical/noindex/redirect/excluded URLs and must not all be 'fixed'); CWV
  no field data; HTTPS 30 valid;
  product snippets 4 valid; merchant listings 2 invalid; breadcrumbs 20/1.
- Interpretation: 550 clicks across approximately three months means roughly
  **6 clicks/day**, NOT 18/day. The reported 18 may describe a peak day, not
  the period average. Search Console clicks are NOT equivalent to GA4 organic
  sessions/unique visitors. Average position 11.1 aggregates queries and is
  not proof of ranking #11 for every keyword. The 50,000 monthly-visit
  target is a long-term ambition, not a near-term projection.
  Next measured steps: triage the 367 not-indexed reasons, repair the 2
  invalid merchant listings and 1 invalid breadcrumb, then validate the
  keyword universe against the 820 real queries before any new content.


## 9. Evidence and next export contract — 2026-10-16

1. Keep the three-month report and its exact dates/search type in the source record. For each next comparison use matching finalized periods (last 28 days vs previous 28, and where available 3-month trend) with country=Bangladesh and device segments. Preserve raw totals separately from grouped-query sums, which can omit anonymized/low-volume queries.
2. Export available query and page data using the authorized owner's browser or supported Search Console API OAuth `webmasters.readonly`. Record rows, country/device, CTR and average position; do not claim all queries are available. Deduplicate the 927 generated candidate terms against verified intent and real canonical destinations. Never assume a Search Console property can be accessed through an unrelated ChatGPT connector just because the browser session is logged in.
3. In Page indexing, group all 367 excluded URLs by actual reason, sample affected URLs, distinguish expected `noindex`, redirects, duplicate/canonical and genuine errors. Check live Cloudflare HTML and hydrated DOM before changing robots/canonical. Never request indexing for intentionally excluded pages.
4. Open the two invalid Merchant listings and one invalid Breadcrumb report, record exact affected example URLs and errors, then validate on current live pages and Google Rich Results Test. Merchant-listing eligibility requires real merchant checkout/sale functionality; inquiry-only or request-price services may warrant accurate Product snippet data or no Offer markup, rather than invented prices, returns or shipping.
5. Current owner-role level still needs confirmation under Settings → Users and permissions. Correct any public statement of formal ownership only after that read. Do not store Google login sessions or verification tokens in the public repository.
