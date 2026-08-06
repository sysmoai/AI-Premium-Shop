# Site context

**Business:** AI Premium Shop — Bangladesh-focused reseller/purchase-assistance
service for premium AI tool subscriptions (ChatGPT, Claude, Midjourney,
Higgsfield, etc.), delivered via WhatsApp, paid via bKash/Nagad/Rocket/bank
transfer (Binance removed 2026-08-07, see `BLOCKERS.md`/session commits —
no written compliance review on file).

**Production domain:** https://aipremiumshop.com (canonical host; non-www,
https). Timezone Asia/Dhaka. Languages: English (primary) + Bangla (`/bn` and
per-audience `-bn` routes).

**Repo:** `github.com/sysmoai/AI-Premium-Shop` — a consolidated monorepo (see
root `README.md`'s "Consolidated repository layout" section and
`docs/CONSOLIDATION_REPORT.md`). Contains several `artifacts/*` apps from
different points in the project's history; **only one is live**:

| Path | What it is | Live? |
|---|---|---|
| `artifacts/aips-landing` | React + Vite SPA, prerendered at build time | **Yes — this is the production site** |
| `artifacts/aips-website` | Next.js rebuild ("Project Phoenix") | No — archived 2026-07-30, see its own `DEPRECATED.md`. Its *last* deployment is still live and crawlable at `aips-website-two.vercel.app` — BLOCKERS.md B11, unresolved. |
| `artifacts/figma-make-v2`, `artifacts/mockup-sandbox`, `artifacts/legacy/*` | Design exports / pre-consolidation snapshots | No |
| `artifacts/api-server` | Not investigated this session | Unknown — out of scope unless it turns out to serve something live |

Root-level `README.md` is stale/generic (describes a Next.js/PostgreSQL stack
that doesn't match reality). **`AGENTS.md` and this `docs/agent/` directory
are the accurate, current sources** — trust them over `README.md`.

**Vercel:** production project is
`sysmoaigits-projects/ai-premium-shopai-premium-shop-aipai-premium-shops-landing`,
deployed from `artifacts/aips-landing` (root `vercel.json` sets
`buildCommand`/`outputDirectory` accordingly). No GitHub Actions deploy
workflow exists — Vercel's own git integration handles deploy-on-push to
`main`. `AGENTS.md` claiming "Cloudflare Pages" is stale; production is
Vercel (confirmed via response headers and `vercel project ls`).

**Priority commercial product (as of this session's third master prompt):**
Higgsfield AI, proposed BDT 1,199/month ≈1,200 credits — **proposed, not
verified**. Current implementation (`data/higgsfield-offer.json`,
`src/pages/HiggsfieldPage.tsx`) is deliberately enquiry-only (compliance
category F — see `docs/compliance/higgsfield-offer-review.md`), price shown
as "indicative," six vendor-side claims explicitly marked unverified. No
checkout exists and none should until BLOCKERS.md B3/B4 resolve.

Full architecture detail: `ARCHITECTURE.md`. Current defect/fix state:
`CURRENT-STATE.md`. Open owner-decision items: `BLOCKERS.md`. Prioritized work
queue: `BACKLOG.md`. What actually happened, session by session:
`WORKLOG.md`. What to do next: `NEXT-TASK.md`.
