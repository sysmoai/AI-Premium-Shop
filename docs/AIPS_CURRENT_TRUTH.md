# AIPS Current Truth (measured, 2026-08-02)

This document supersedes any product-count or architecture claim in README.md, AGENTS.md, replit.md, or historical Notion pages until they are individually reconciled. It records **only measured facts**, each tagged with how it was verified. Where a fact was verified by this session's own tooling (not asserted from memory or an old document), the exact command is included so it can be re-run.

Linked from: [AIPS Master Coordinator](https://app.notion.com/p/3ad968d9162881adb64ec138483a782f) (Notion, 2026-07-30).

## Repository & production

| Fact | Value | How verified |
|---|---|---|
| Repository | `sysmoai/AI-Premium-Shop` | `git remote -v` |
| Default branch | `main` | `git branch --show-current` on fresh clone state |
| Production application | `artifacts/aips-landing` — Vite + React + TypeScript + Wouter SPA | `git ls-tree`, `package.json` inspection |
| `artifacts/aips-website` (Next.js) | **Correction — this session initially got this wrong.** An early check against a stale-cached `origin/main` ref showed only `aips-landing`, `api-server`, `mockup-sandbox`. After a full `git fetch`, `artifacts/` on true current HEAD (`82e5c4b`) actually contains **six** directories: `aips-landing`, `aips-website`, `api-server`, `figma-make-v2`, `legacy`, `mockup-sandbox`. `aips-website` is a substantial Next.js 16 app (own `AGENTS.md`, `AUDIT_REPORT.md`, `BUILD_STATE.md`, `CLAUDE.md`, `DEPLOY-CEO.md`, `data/`, `docs/`) per a prior session's `docs/context/CURRENT_STATE.md` (2026-07-31): 155 pre-rendered static pages, richer Bangla content, but a **divergent catalog** from `aips-landing`'s `products.json`. It is built and Vercel-configured but **not the live production app** — no production domain, per both the Notion coordinator page and the prior session's own findings. | `git ls-tree HEAD artifacts/`, `docs/context/CURRENT_STATE.md` (prior session) |
| `artifacts/legacy`, `artifacts/figma-make-v2` | Exist on current HEAD, **not yet inspected this session** | `git ls-tree HEAD artifacts/` |
| Hosting | **Vercel** (not Cloudflare Pages, not GitHub Pages, despite both being configured in `.github/workflows/`) | DNS (`cname.vercel-dns.com`), `Server: Vercel` response header |
| Canonical host | **Apex** `aipremiumshop.com` — `www` 308-redirects to apex | `curl -I https://www.aipremiumshop.com/` |
| Deploy mechanism | Vercel's own Git integration auto-deploys on push to `main`, independent of GitHub Actions | Live `Last-Modified` header timestamp matches `git log` commit timestamp for the current HEAD commit exactly |
| GitHub Actions | **Billing-locked on the `sysmoai` account.** All workflows (`CI`, `Deploy`, `Deploy to GitHub Pages`) fail in 3-11s with "account is locked due to a billing issue" | `gh run view <id>` |
| `vercel.json` / `.vercel/` in repo | Not present — Vercel project config lives only in the Vercel dashboard | `git ls-tree -r` grep |

## Catalog — verified count ledger (supersedes 23/49/56/57/75/80/84/100+/115/118/129/150+/156 as a single figure)

Computed directly from `artifacts/aips-landing/data/products.json` on current `main` HEAD (commit `82e5c4b`), 2026-08-02:

| Metric | Count | Definition |
|---|---|---|
| Total plan/variant records | **129** | every entry in `products.json`, i.e. one row per sellable plan/tier |
| Unique `id` values | 129 (0 duplicates) | data-integrity check, not a business count |
| Unique providers | 77 | distinct `provider` field values |
| Unique brands (product families) | 77 | distinct `brand` field values (currently 1:1 with provider in this dataset) |
| Unique `slug` values (product-family pages) | 87 | distinct rendered product pages — higher than 77 because some brands render more than one page (e.g. tiered offerings split across pages) |
| Distinct `brand` **routes** per the validator | 41 | the validator's own live count of rendered brand routes — lower than 77/87 above; **this gap is unreconciled** and is the next concrete task (see Open Questions) |
| Categories | 9 | `ai-assistant, ai-image, ai-video, ai-voice-music, ai-code, ai-workspace, ai-writing, bundles, ai-design` |
| Records with `status: "Active"` | 129 / 129 | none marked inactive/retired in the data file itself — commercial-status taxonomy (approved/pending_ceo/etc.) is **not yet applied to this file** (see below) |
| Records with `requestPrice: true` (quote-only, no fixed price) | 11 | |
| Records carrying a fixed price | 118 | **129 − 11.** This is a fourth, distinct meaning for the number "118" already seen in this project's history — it is NOT the same as any prior "118 rows" or "118 tools" claim. Do not reuse "118" in any public copy without stating which of these definitions is meant. |
| Records missing `commercialStatus` field | 129 / 129 (100%) | field does not exist in the current schema at all — the 14-state taxonomy required by the execution contract has not been retrofitted onto this data file yet |
| Records missing `verificationDate` | 129 / 129 (100%) | same — evidence/freshness tracking not yet retrofitted |
| Records missing `sourceUrl` | 37 / 129 | |
| Records missing `officialUSD` | 43 / 129 | |
| Records with `accessType: "shared"` | 44 | pending CEO access-model classification per the audit checkpoint's compliance findings (credential-sharing legitimacy varies by provider ToS) |
| Records with unverified `trust.reviewCount`/`rating` | 9 | fabricated social proof — must not render until evidenced or removed |
| Sitemap URLs | 161 | `public/sitemap.xml`, counted by the validator |

**How to reproduce this table:** `cd artifacts/aips-landing && node scripts/validate-catalog.mjs --strict`

### Why this table exists

A prior stale check earlier in this same session (before `git fetch` refreshed the local ref) computed **80** records from a `git show origin/main:...` snapshot that was, at that moment, ~16 commits behind true `origin/main`. That 80 was wrong the moment it was fetched fresh — a live demonstration of Section 3's rule: counts drift constantly and must be recomputed at the moment of use, never cited from memory or a prior session's report. The repo's own `VALIDATION_SUMMARY.txt` (dated 2026-07-29) separately claims "118 Total Products Analyzed / 86 complete" — a fifth number, from a fifth moment in time. **None of 80, 118 (from that file), 129, or any other historical figure should be published without recomputing at publish time.**

### Live site vs. repository claim conflict (unresolved, evidenced)

The live homepage `<title>` and meta description currently read: *"AI Premium Shop — 87 Premium AI Tools Bangladesh | From BDT 299"* and *"87 premium AI tools (129 plans)... 3,000+ customers."* Checked via `curl https://aipremiumshop.com/`, 2026-08-02.

- "129 plans" matches the verified total above.
- "87" does not match 77 (brands) or 41 (validator's brand-route count) exactly, though it is close to 87 (slugs) — likely the source of "87," but needs confirmation against whatever generated this static HTML.
- **"3,000+ customers" is an unverified claim** matching a pattern the project has previously flagged and corrected before (commit `d9e46cd`, "truth: replace unverified '3,000+ customers' with 'a growing community'" — that fix evidently did not reach this particular static file, or was reverted/regressed afterward). This is a live, public, unsupported quantitative claim and should be treated as a P0 item per the execution contract's Section 21 (Claim Registry) and Section 3 (no published count without a ledger).

This session did **not** edit the live claim — that requires deciding whether to fix it via a data/template regeneration (safer, matches how the rest of the site is built) or a hand-edit to the static HTML (fragile, will drift again). Recorded as the top open action.

## Security

- A real `NEXTAUTH_SECRET` value and a `NEXT_PUBLIC_SUPABASE_ANON_KEY` were committed in `.env.local` at commit `c8ae0025d0cc9e648ecabfe85459c5625cfa42d1` (2026-07-26). The file is no longer in the current tree, but **remains permanently retrievable from Git history** by anyone who clones the repo. Secret **values are not reproduced anywhere in this document or in chat**; only the key names and commit are recorded.
- Rotation of these credentials (Supabase project settings + NextAuth config) and any decision about Git-history rewriting are **CEO/admin-only actions** (red lane) — not performed by this session.
- `.gitignore` did not previously exclude `.env*` files, meaning this could recur on any future commit. Fixed this session (see Changes below) — this is pure hygiene, no secret was touched.

## Changes made this session (on branch `feat/aips-ssot-claim-price-guards`, not merged)

1. Preserved and removed a dangerous, never-pushed local commit (`ba7cb8f`) that would have deleted the entire production app if it had reached `origin/main`. Tagged as `preserved/local-main-ba7cb8f-pre-reset` for recoverability; local `main` reset to verified `origin/main`.
2. Regenerated `public/llms.txt` from `data/products.json` (`node scripts/generate-llms-txt.mjs`) — cleared the validator's one HARD FAILURE (file was out of sync with the catalog).
3. Added `.env*` (excluding `.env.example`) to `.gitignore` to prevent re-committing local secrets.
4. Created this document, the capability report, and the conflict ledger.

No commercial claim, price, or access-model decision was changed. No production deployment was touched — Vercel deploys only from `main`, and nothing was merged to `main`.

## Reconciliation with prior session's context files (found after this session's independent work — `docs/context/CURRENT_STATE.md`, `KNOWN_RISKS.md`, `DECISIONS.md`, all dated 2026-07-31, discovered via CLAUDE.md's own pointer)

The count ledger above is now **independently confirmed** by that prior session's own measurements: 129 tier/plan records, 87 unique product families (by slug), 77 unique providers (brand parent companies) — exact match. The only figure still unreconciled is the validator's "41 brand routes" vs. 77/87 (see Open Questions).

That prior session also left five explicit, unresolved CEO decisions in `docs/context/DECISIONS.md` that this session did not re-litigate (they are Emon's calls, not investigable facts):
1. Promote `aips-website` to production vs. keep optimizing `aips-landing` vs. run both in parallel.
2. Shared-access legal authorization for 44 products (evidence, delist, or switch to customer-owned).
3. LMArena leaderboard usage rules (reference-only, never predictive/endorsement language).
4. Bangla + audience-segment content strategy (65-page expansion matrix drafted, unapproved).
5. Whether Notion is canonical for product/plan definitions.

**Update to Decision 5's premise:** `DECISIONS.md` states Notion was inaccessible ("no web browsing in CLI"). That has changed — **this session successfully connected to Notion via MCP** and read the AIPS Master Coordinator page and Audit Checkpoint in full. Decision 5 should be revisited with that constraint removed; it is no longer a hard blocker, only an unmade choice.

**Critical operational warning carried forward from `CLAUDE.md` Session 3 (2026-08-01), not yet re-verified this session:** a previous local `.vercel/project.json` pointed at a decoy Vercel project whose production URL was `--`, causing an entire session's deploys to reach nothing silently. The correct project is documented there as `prj_aP4bi30UW8mcHgBvU7E72yyFOPQd`. This session confirmed no `.vercel/` directory exists in the current local checkout at all (nothing to accidentally point at the decoy right now), but **any future session must re-link to the correct project explicitly before running any deploy script**, not trust whatever `vercel link` produces by default.

## Open questions (require investigation, not CEO decision, before next session)

1. Why does the validator report 41 brand routes when the data has 77 unique brands / 87 unique slugs? Likely a routing/grouping layer collapses several slugs under one route — needs source-level confirmation (`src/App.tsx` / `src/lib/productRoutes.ts`), not just data-level.
2. What actually generated the live `index.html`'s "87 Premium AI Tools" / "3,000+ customers" copy, and is it regenerated on every build or hand-maintained? If hand-maintained, it will keep drifting from `products.json` regardless of catalog fixes.
3. Confirm whether `origin/claude/aips-repo-consolidation-q4j508` (an existing branch from a prior session, distinct from the "merged PR 1" the coordinator page references) is superseded, still relevant, or abandoned.

## CEO decisions required (not inferred, not actioned)

- Rotate `NEXTAUTH_SECRET` and Supabase anon key; decide whether Git history needs scrubbing.
- Resolve GitHub billing lock (blocks all CI, though Vercel deploys are unaffected).
- All 40+ commercial/access-model/pricing gates already logged in the 2026-07-26 audit checkpoint (do-not-sell list, API resale ToS conflicts, bundle underpricing, etc.) — unchanged by this session, not re-litigated here.
