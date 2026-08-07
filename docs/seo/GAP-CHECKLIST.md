# SEO gap checklist — aipremiumshop.com

**Built from a real audit of all 273 built pages + live measurement, 2026-08-07.**
Not a wishlist: every item below is a measured gap with the number that proves it.

Status key: `[ ]` open · `[x]` done · `[~]` partially done · `[B#]` blocked, see BLOCKERS.md

---

## P0 — The largest measured gap: content exists but is not in the static HTML

React renders the content; the prerender emits a stub. Googlebot runs JS so it
eventually sees the full page, but **its render queue is delayed by days-to-weeks**,
and Bing (which feeds Copilot and other AI answer surfaces), plus most AI crawlers
and every social unfurler, do not render JS at all.

Measured live:

| Route | static HTML | React renders | ratio |
|---|---|---|---|
| `/pricing` | 253 | 13,389 | 53× |
| `/chatgpt-vs-claude` | 218 | 3,545 | 16× |
| `/about` | 246 | 3,191 | 13× |
| `/how-to-order` | 285 | 2,512 | 9× |
| `/students-bn` | 291 | 2,103 | 7× |

- [x] **Generic prerender enrichment for thin routes.** One extractor that pulls
      real prose from any page component, applied only to pages under a
      threshold, so pages with good bespoke extractors (products, blog, guides,
      /bn) are untouched.
- [ ] Verify each enriched page's static body matches what React renders.
- [ ] Add a `seo:check` rule failing any route under 800 static chars that has a
      component with more content available.

## P1 — Page-type coverage (37 pages under 800 static chars)

- [x] `/bn` — 156 → 7,850
- [ ] `/pricing` — 253. Highest-traffic commercial page on the site.
- [ ] `/about`, `/contact` — 246 / 291. E-E-A-T pages; Google weighs these for
      "who is this business" on YMYL-adjacent commerce.
- [ ] `/how-to-order` — 285. Directly answers a real query cluster.
- [ ] `/refund-policy`, `/terms`, `/privacy-policy` — 233 / 203 / 206. Trust
      signals; thin policy pages are a known quality flag.
- [ ] 4 comparison pages (`/chatgpt-vs-claude`, `/chatgpt-vs-gemini`,
      `/copilot-vs-cursor`, `/midjourney-vs-ideogram`) — ~200 each, and
      comparison queries are the highest commercial intent on the site.
- [ ] `/blog` — 146. The index of 19 posts renders as almost nothing.
- [ ] 6 Bangla role pages (`/students-bn` … `/educators-bn`) — 236-323 each.
      The whole Bangla strategy rests on these and they are empty.

## P2 — Structured data gaps

Current coverage across 273 pages: Organization+LocalBusiness 273, WebSite 273,
FAQPage 207, BreadcrumbList 157, Product+SoftwareApplication 157.

- [ ] `BlogPosting` / `Article` on all 19 blog posts — currently none carry it.
- [ ] `ItemList` on the 9 category hubs and `/products` — tells search engines
      these are collection pages.
- [ ] `BreadcrumbList` on the 116 non-product pages that lack it.
- [ ] `HowTo` on `/how-to-order`.
- [ ] `Person` / `author` on guides — the brief requires a named author and
      reviewer per guide. **[B1-adjacent: needs a real named person from the owner.]**
- [ ] Do NOT add: AggregateRating, Review (no verified data — see B1/B2).

## P3 — Information architecture

- [ ] `/bn/*` locale routes. Brief specifies `/bn/students/` etc.; the site has
      `/students-bn`. Needs new routes + 301s from the old paths + updated
      sitemap and hreflang. Do not ship one without all four.
- [ ] AI Tool Finder (5-question recommender). Specified in the brief, does not
      exist. Must refuse shared plans for confidential/academic/client work.
- [ ] Bangla versions of the 9 category hubs — none exist.
- [ ] Bangla comparison pages — none exist.

## P4 — Research not yet done

The research workflow died on a session usage limit and returned nothing. None
of this exists; do not assume otherwise.

- [ ] Bangladesh SERP + competitor gap analysis
- [ ] Bangla + Banglish keyword/intent map → `docs/seo/`
- [ ] First-party GSC query pull to direct content priority
- [ ] Internal-search term log → find queries with no matching product

## P5 — Verification and monitoring

- [x] `seo:check` over 273 pages (titles, canonicals, H1, claims, anti-flash contract)
- [x] Daily live monitor, content-based not status-based
- [x] Weekly time-based gate so expiring claims fail on their own
- [ ] **Playwright smoke test — [B9].** Nothing in CI executes the React app;
      a hook-order bug blanked every page in production and passed all gates.
      This is the highest-priority engineering item on the list.
- [ ] Core Web Vitals field data (currently only lab measurements)
- [ ] IndexNow wired to actually submit on deploy (key file exists from 530862d;
      nothing calls the API yet)

## P6 — Trust and claims (blocked on the owner)

- [ ] **[B1]** "10,000+ customers since 2022" — no evidence; ~70 pages + 4
      hardcoded sites + the site-wide meta description.
- [ ] **[B2]** "30-day replacement guarantee" — no written policy on file.
- [ ] **[B3]** Six Higgsfield entitlements unverified.
- [ ] **[B5]** Shared-access authorization for 44 products.
- [ ] **[B7]** Native-speaker review of `data/bn-homepage.json`
      (`lastReviewedByNativeSpeaker` is null).
- [ ] **[B10]** Floating chat buttons cover 52×51px of a mobile CTA.

---

## What this buys, honestly

Fixing P0/P1 does not make the site rank #1 — nobody controls that. What it does
is remove the reasons a page *cannot* rank: a crawler that does not execute JS
currently sees 200-300 characters on pages that contain 3,000-13,000. That is the
difference between being ineligible and being eligible. Where it lands after that
depends on competition, links and time, none of which are in this repo.
