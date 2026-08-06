# Architecture — artifacts/aips-landing (the live app)

**Stack:** React + TypeScript, Vite build, client-side routing (`wouter`),
Tailwind, Radix UI primitives, `framer-motion` for animation, TanStack Query.
Package manager: pnpm, workspace monorepo (`pnpm-workspace.yaml` at repo
root). Node/serverless functions for chat: `api/concierge.js`
(AI concierge chatbot backend, calls an LLM with a hand-maintained system
prompt + `api/_knowledge.js` objection-handling snippets).

**Rendering model:** client-rendered SPA, **plus a custom post-build
prerender step** (`scripts/prerender-products.mjs`) that writes real static
HTML per route into `dist/public/<route>/index.html` — title, meta
description, canonical, JSON-LD, and a readable body extracted from the same
source the live React component uses (never hand-retyped, to prevent drift —
though this session found several **duplicate** hardcoded copies that had
drifted anyway; see `WORKLOG.md`). This exists because Vite ships an empty
`<div id="root">` for every route otherwise, invisible to non-JS crawlers.
Vercel serves these static files directly (no rewrite needed) for anything
matching a real route; `dist/public/404.html` (added 2026-08-07) is the
fallback for anything that doesn't.

**Data flow (product/pricing facts):**
```
data/products.json  (source of truth, 239 records / 197 distinct slugs)
        │
        ├─→ src/lib/catalogStats.ts  (TOTAL_PRODUCTS, TOTAL_PLANS, MIN_PRICE,
        │    MAX_PRICE, cheapestPriceFor(), tierPrice(), categoryStats() —
        │    imports data/catalog-lite.json, a slimmed copy for bundle size)
        │         │
        │         └─→ every React component (ProductPage, PricingPage,
        │              GuidePage, PainPointSection, etc.) — never hardcode
        │              a count or price, import from here
        │
        └─→ scripts/prerender-products.mjs  (plain Node, CANNOT import the
             TS/ESM catalogStats.ts module — recomputes the same formulas
             independently against the same products.json array; see
             CATALOG_STATS in that script, added 2026-08-07 for exactly this
             reason — it used to just strip template interpolations blank)
```
This split (component-side stats module vs. prerender-side reimplementation
of the same formulas) is the recurring source of drift bugs found this
session — anywhere the prerender script's version of a formula/extraction
regex diverges from the component's actual behavior, the static and
hydrated versions of a page can disagree. See `WORKLOG.md` 2026-08-07 for
three concrete instances (job-seekers guide content, /pricing /about /faq
metadata, a source-code leak).

**Compliance-gated content:** `data/higgsfield-offer.json` is the single
source of truth for the Higgsfield offer, split into vendor-verifiable
`platform` facts and owner-attested `offer` facts, with unverified claims
quarantined in `pendingVerification`. `scripts/validate-higgsfield-offer.mjs`
is a build-time gate — re-enabling the checkout CTA or "official" language
fails the build. This is the reference pattern for any future compliance-
sensitive product page.

**Build gates** (`pnpm run build`, in order): `validate-blog-prices.mjs` →
`validate-higgsfield-offer.mjs` → `vite build` → `prerender-products.mjs` →
`audit-prerender.mjs` (asserts every sitemap URL has real static content, a
unique title, one canonical, a meta description). `pnpm run seo:check`
(separate command, not part of `build`) is the broader claim/SEO gate — 0
errors required, warnings triaged not silenced. `pnpm run typecheck` has 14
pre-existing, non-blocking errors (unbuilt `lib/api-client-react` workspace
package) — `build` does not run typecheck, so this doesn't block deploy.
`pnpm run validate:truth` and `pnpm run validate` (catalog) are additional
warn-level checks, not wired into `build`.

**What's genuinely untested:** no Playwright/browser-level smoke test exists
(BLOCKERS.md B9) — every gate above inspects static HTML or data, none of
them execute the React app in a real browser. A hook-order bug once blanked
every page in production and passed every gate. This is the most
architecturally significant gap, ranked #4 in `BACKLOG.md`.
