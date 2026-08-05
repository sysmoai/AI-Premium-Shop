# Worklog

## Session 16 — 2026-08-05 (Opus 5)

Higgsfield offer implemented compliantly, AI Video surfaces rebuilt, page-load
flash fixed, quality gates added. Deployed to production and verified live.

**Shipped**

- `data/higgsfield-offer.json` — single source of truth separating vendor-
  verifiable platform facts from owner-attested service facts, with six
  unverified supplied claims quarantined in `pendingVerification`.
- `scripts/validate-higgsfield-offer.mjs` — build-time compliance gate, wired
  into `build`. Regression-tested by deliberately re-enabling the expired offer
  date and the CTA; both correctly failed the build.
- `src/pages/HiggsfieldPage.tsx` — dedicated page routed above `/product/:slug`,
  deliberately not the generic template (whose trust bar hardcodes the
  unevidenced customer count and warranty into every product page it renders).
- `scripts/seo-check.mjs` + `pnpm run seo:check` — 273-page claim and SEO gate.
- `.github/workflows/seo-quality.yml` and `live-site-monitor.yml`.
- `src/sections/AIVideoHub.tsx` and `src/sections/AIVideoFeatureSection.tsx`.
- Inline anti-flash critical CSS in `index.html`; removed the duplicate Google
  Fonts `@import` from `index.css`.

**Bugs found and fixed while working**

- 22 broken template strings on 11 live product pages, rendering as "Delivery in
  Confirmed on WhatsApp" and "Typically Confirmed on WhatsApp via WhatsApp after
  payment confirmation".
- `/privacy` and `/privacy-policy` were two self-canonical pages with identical
  titles. Fixed generically: the prerender alias-canonical resolver now also
  covers plain `component={X}` routes, not just Comparison/Budget pages.
- My own first prerender pass linked four alternatives at `/product/<slug>` when
  they are brand-page slugs living at `/<slug>`. Caught by the repo's own
  `audit-prerender` gate, not by me.
- My own first `seo-check` had two false positives: it split FAQ questions from
  their answers (rejecting "Is AIPS an official partner?" — the question that
  exists in order to answer "No"), and it matched the word `undefined` in
  legitimate prose. Both narrowed; the value-leak check now runs against raw HTML
  in value positions only.

**Measured**

| Page | Static visible chars before | after |
|---|---|---|
| `/product/higgsfield-ai-bangladesh` | 1,536 | 8,702 |
| `/ai-video` | 1,112 | 3,770 |
| `/` | 3,489 | 4,517 |

`seo:check`: 0 errors across 273 built pages (160 warnings, mostly long titles
and thin legacy pages — triaged, not silenced).

**Not done, and why** — see `BLOCKERS.md`. Chiefly: the site-wide "10,000+
customers" claim (owner decision, ~70 live pages), the six Higgsfield
entitlements (needs the real vendor account), a Playwright regression test (no
Playwright in the repo yet), and original Higgsfield demo media (no MCP
integration connected and no credit approval).
