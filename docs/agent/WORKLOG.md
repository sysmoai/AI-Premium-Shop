# Worklog

## Catalogue integrity + owner-actions doc — 2026-08-07 (Sonnet 5, same day, fourth turn)

Reconciled repo/doc state per the fourth master prompt's checklist first:
confirmed branch (`seo/homepage-product-authority`, 5 commits, unpushed),
confirmed `robots.ts` from the prior turn has no dead code, confirmed
`CURRENT-STATE.md` has no duplicate headers. All clean — no cleanup needed.

Then gathered exact Vercel evidence for B11 (project ID
`prj_gDXbOWXKZP7S1KxPnLkyHs5TVuer`, deployment ID
`dpl_DPfznLnKPh1q4fs4VkdJteRjBACK`, three aliases, creation/last-deploy date)
via `vercel project inspect` / `vercel inspect` / `vercel ls`, which
**corrected the prior turn's root-cause narrative**: the stray live
deployment is not the archived Next.js app (confusingly similar project
name only) — it's a duplicate Vercel project whose Root Directory is
already `artifacts/aips-landing` (the correct app), created and deployed
once on 2026-07-30, never redeployed since. Wrote `docs/agent/OWNER-
ACTIONS.md` with exact recommended commands (`vercel alias rm` ×3,
reversible) and the corrected `BLOCKERS.md` B11 entry.

P0 task group "catalogue plan-and-price integrity": read
`validate-catalog.mjs` first rather than assuming a gap — it was already
far more thorough than expected (plan/price consistency, whatsappMsg drift,
sitemap sync, 4 separate generated-file sync checks, banned-claims scan).
The one real missing check — shared tier priced at or above the equivalent
personal tier — found a genuine anomaly on first run: `midjourney-
bangladesh`'s "Pro Shared" (৳4,788) costs more than both its "Personal"
(৳2,495) and "Pro" personal (৳3,990) tiers. Added as a permanent warning-
level check, recorded for owner review (BACKLOG.md #18) rather than guessed
at a fix.

Verified `pnpm run build` still clean after the validator change (0 errors,
272/272 routes) — the validator isn't wired into `build`, so this was a
sanity check, not a required gate for this specific change.

**Next up:** shared-account/vendor compliance (B5, large, owner-decision-
heavy) and Higgsfield offer verification (needs real external web research
against higgsfield.ai — see `RESEARCH-CACHE.md` for the exact open
questions) are both better scoped as their own focused sessions rather than
continuing to stack onto an already-long one. See `NEXT-TASK.md`.

## Host/version-consistency task group — 2026-08-07 (Sonnet 5, same day, third turn)

P0 task group 2 of the third master prompt's ordering ("host and version
consistency" / Hypothesis 1 — conflicting indexed versions). Found the real
cause: not CDN staleness or a www/non-www misconfiguration on the live site
(both checked, both clean except one low-severity 2-hop redirect — B12), but
a **decommissioned Next.js app whose last deployment is still live and
publicly crawlable** at `aips-website-two.vercel.app`, serving a stale
catalog ("118+ tools", "3,000+ customers"). Its own `DEPRECATED.md` (dated
2026-07-30) already documents the decision to archive it and turn off
auto-deploy — that stopped future deploys, not the one already live.
Recorded as `BLOCKERS.md` B11 (needs owner approval to delete/unalias — a
Vercel infrastructure action, not a code change) and B12 (the 2-hop
redirect). Hardened that app's `robots.ts` to disallow all crawlers as
defense-in-depth, since editing its code can't reach the already-live
deployment (redeploying it is explicitly forbidden by its own docs).

Also created the durable context files the third master prompt asked for:
`SITE-CONTEXT.md`, `ARCHITECTURE.md`, `RESEARCH-CACHE.md`, `NEXT-TASK.md`
(supersedes `NEXT-SESSION.md` going forward). Rewrote `CURRENT-STATE.md`,
which had drifted 2-3 sessions stale (see the note already in
`NEXT-SESSION.md` from earlier the same day).

## Evidence-collection session — 2026-08-07 (Sonnet 5)

No code changed — scope was deliberately limited to verification (per an
external audit brief covering routing, payments compliance, animation, SEO
and content-quality). Ran the repo's own drift checks (`build`, `seo:check`,
the `higgsfield-ai-bangladesh` curl check) — all green, production on
`main`'s HEAD (`1e147bb`). Full findings in `docs/homepage/executive-audit.md`;
five new issues (F1–F5) added to `BACKLOG.md` as items 0a–0e, all root-caused
with file:line references, none fixed yet. Confirmed several of the audit
brief's specific claims were stale (Higgsfield template bug already fixed in
session 16; About/homepage customer-count and founding-year numbers are now
internally consistent, though still evidence-less per existing B1).

Also flagged: `WORKLOG.md`/`NEXT-SESSION.md` were stale by 2-3 sessions
(the `/bn` rebuild `NEXT-SESSION.md` called "next" was already done;
`BLOCKERS.md` B9/B10 exist but have no corresponding `WORKLOG.md` entries).
Patched `NEXT-SESSION.md` to flag this rather than silently trust it.

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
