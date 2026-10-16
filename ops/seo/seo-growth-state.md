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

1. DONE for the Command Code visible-browser session: access `https://aipremiumshop.com/` using CEO-designated Google account `aipremiumshopbd@gmail.com` (2026-10-16). Owner role VERIFIED on 2026-10-16 via Search Console Settings → Ownership verification ("You are a verified owner"; property added 2026-08-02). The separate ChatGPT/SMEPost connector remains `siteUnverifiedUser` until explicitly reauthorized.
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
  aipremiumshopbd@gmail.com (recorded in ops/ssot/site.json). Verified owner
  role confirmed in Search Console Settings (2026-10-16 00:35+06).
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

## 28-day segment (2026-09-16 → 2026-10-13, live GSC 2026-10-16)

- 183 clicks / 1,695 impressions / 10.8% CTR / avg position 7.8 (~6.5
  clicks/day). Position and CTR are improving versus the 3-month window
  (11.1 / 8.7%).
- Countries: Bangladesh 160 clicks / 1,471 impressions (87%); US 1/66;
  India 2/14; 49 countries total. Market concentration is healthy.
- Queries (28d, 276 rows): still brand-led — "ai premium shop" 11, "all
  premium shop" 3, "premium shop bd" 2/42 imp, "ai shop bd" 0/19 imp,
  "premium shop" 0/18 imp. Zero-click impression opportunities exist on the
  brand-misspell variants; low absolute non-brand volume.

## Keyword-universe validation against real GSC queries (2026-10-16)

- Real queries (820 over 3 months) are ~overwhelmingly brand/directory
  intent ("ai premium shop", "ai store bd", "buy ai tools") plus one
  product-price query ("heygen ai price in bangladesh", 2 clicks).
- The 927 candidate rows include 102 brand-family terms (notion 15,
  chatgpt 11, claude 9, gemini 4, midjourney 7, cursor 7, heygen 5, ...).
  Classification: these 102 are PARTIALLY CORROBORATED — the brand family
  has proven search presence, but the specific price-intent variants remain
  UNMEASURED. The other 825 candidates remain UNKNOWN (no evidence).
- Next validation lever: after the 404/4xx re-validation clears, Google's
  re-indexing of the 143-indexed + newly eligible canonicals should surface
  product-price queries in GSC; re-run this check before creating content.
  Do NOT generate 927 pages.

## 9. Evidence and next export contract — 2026-10-16

1. Keep the three-month report and its exact dates/search type in the source record. For each next comparison use matching finalized periods (last 28 days vs previous 28, and where available 3-month trend) with country=Bangladesh and device segments. Preserve raw totals separately from grouped-query sums, which can omit anonymized/low-volume queries.
2. Export available query and page data using the authorized owner's browser or supported Search Console API OAuth `webmasters.readonly`. Record rows, country/device, CTR and average position; do not claim all queries are available. Deduplicate the 927 generated candidate terms against verified intent and real canonical destinations. Never assume a Search Console property can be accessed through an unrelated ChatGPT connector just because the browser session is logged in.
3. In Page indexing, group all 367 excluded URLs by actual reason, sample affected URLs, distinguish expected `noindex`, redirects, duplicate/canonical and genuine errors. Check live Cloudflare HTML and hydrated DOM before changing robots/canonical. Never request indexing for intentionally excluded pages.
4. Open the two invalid Merchant listings and one invalid Breadcrumb report, record exact affected example URLs and errors, then validate on current live pages and Google Rich Results Test. Merchant-listing eligibility requires real merchant checkout/sale functionality; inquiry-only or request-price services may warrant accurate Product snippet data or no Offer markup, rather than invented prices, returns or shipping.
5. Owner-role level VERIFIED under Settings → Ownership verification (2026-10-16). Do not store Google login sessions or verification tokens in the public repository.

## 10. Legacy URL triage — 2026-10-16 (verified from Windows vantage)

| URL | Response | Decision |
|---|---|---|
| /students | 404 | KEEP 404 — pre-migration path; current equivalent is /best-ai-for-students (200), which is properly canonicalized. No redirect needed. |
| /category/bundles | 404 | KEEP 404 — retired category URL pattern (/ai-* is current). |
| /blog/ai-video-tools-bangladesh | 404 | KEEP 404 — old blog slug, no current equivalent page. |
| /digital-marketing/ | 404 | KEEP 404 — WordPress-era path. |
| /2025/11/ | 404 | KEEP 404 — WordPress archive path. |
| /canva-vs-adobe | 451 | PRESERVE — restriction observed, but the emitting source is NOT yet identified: no 451 in repo code/redirects, Cloudflare account "Blocked content" is EMPTY (checked 2026-10-16), and the zone has no WAF custom rules. Do NOT relabel as intentional without the emitting rule; do NOT circumvent. Current governed equivalent /canva-vs-adobe-express is live (200, in sitemap). |
| /best-ai-for-students | 200 | CURRENT — no action. |

No blanket homepage redirects are added: each legacy path either has a
governed current equivalent (users find it via internal links) or is
correctly dead. The GSC 404/4xx validations already cover re-crawl.

## 11. Crawled/Discovered-not-indexed triage — 2026-10-16

- Crawled - currently not indexed (23): sampled URLs are legacy patterns
  from July 2026 crawls (`/products/<brand-slug>`, `/buy/netflix-bangladesh`,
  old nested paths) plus a homepage entry from the migration-day crawl.
- HOMEPAGE RESOLVED: Google URL Inspection for `https://aipremiumshop.com/`
  run 2026-10-16 02:40 Dhaka reports **"Page is indexed"** with HTTPS OK —
  the transitional crawl entry was not a real indexing defect.
- Discovered - currently not indexed (6): low-priority legacy discoveries;
  monitor after the running 404/4xx validations complete.
- No "request indexing" actions for these — they are either legacy or
  Google crawl-scheduling decisions, not blocked important pages.

## 12. GSC refresh — 2026-10-16 ~08:25 +06 (Command Code, owner session)

Fresh reads in the aipremiumshopbd@gmail.com session (all classifications
honest: nothing marked passed unless Google says so):

- Performance (3-month Web search, 7/14/26–10/13/26): 550 clicks / 6.3K
  impressions / 8.7% CTR / avg position 11.1 — matches historical baseline.
  Recommendation card: homepage impressions −87% week-over-week
  (10/5–10/11 vs prior week). Watch, do not over-interpret yet.
- Indexing: 143 indexed / 367 not indexed. Validations: 404 (192) STARTED;
  other-4xx (106, migration-day Vercel 402 artifact) STARTED. Google
  result pending for both.
- Breadcrumbs: 20 valid / 1 invalid (`https://aipremiumshop.com/bn`,
  missing `item`) — VALIDATION STARTED 10/16/26 after PR #136; last crawl
  Oct 14. Pending.
- Merchant listings: 0 valid / 2 invalid, 1 critical issue =
  `Missing field "image"` on /chatgpt-plus-bangladesh and
  /gemini-advanced-bangladesh. Shipping/return/availability warnings stay
  deliberately absent per SSOT. Critical fix blocked on first approved
  product imagery (#49 / H-MEDIA). Product snippets: 4 valid / 0 invalid.
- CWV field data: none yet (0) — no field-data claims made.
- Full detail: issue #135 comment 2026-10-16.
