# AIPS Conflict Ledger

Format per entity/field. Authority order per Notion coordinator page (2026-07-30): A0 CEO decision > A1 legal/compliance/provider ToS > A2 canonical AIPS catalog/brand/price source > A3 repository + measured production > A4 research/reference > A5 historical/archived.

---

### CL-1 — Deployment architecture (hosting platform)
- **notionValue:** Master prompt v3.4 says Next.js 16 + Cloudflare Pages. Checkpoint (2026-07-26 header) says React/Vite/Express + Cloudflare Pages.
- **repositoryValue:** `wrangler.toml` targets Cloudflare Pages; `.github/workflows/pages.yml` targets GitHub Pages. Both configured, both currently broken (GitHub Actions billing lock).
- **liveValue:** Vercel (confirmed by DNS + `Server: Vercel` header + Git-integration auto-deploy behavior).
- **officialValue:** n/a
- **authorityUsed:** A3 (measured production) — per the 2026-07-30 coordinator page's own ruling, which already resolved this in favor of Vercel/`aips-landing`.
- **severity:** P1 (resolved in Notion already; residual risk is that the repo's own workflow files still misrepresent this to future readers/agents).
- **recommendedAction:** Either fix or remove `deploy.yml`/`pages.yml` so the repo doesn't self-contradict its own measured truth, once GitHub Actions billing is restored enough to test safely (or remove them regardless, since they cannot run either way).
- **requiresCEOApproval:** false (no commercial/legal impact — pure repo hygiene). Deferred this session to keep the first batch small.

---

### CL-2 — Product/catalog count
- **notionValue:** Coordinator page: "118 catalog rows or variants," "57 products verified," "80 tools" (all three stated in the same document as unreconciled). Checkpoint: 80 tools / 9 categories headline, 118 in its own audit scorecard, AITP-comparator figure of 107 used internally.
- **repositoryValue:** `VALIDATION_SUMMARY.txt` (dated 2026-07-29, stale): 118. Live working-tree `data/products.json` (2026-08-02, current `main` HEAD `82e5c4b`): **129** total records, 77 unique brands, 87 unique slugs, 41 validator-reported brand routes, 118 records-with-fixed-price (11 are request-price-only).
- **liveValue:** Live site copy says "87 Premium AI Tools... 129 plans" — the "129" matches current data; "87" does not cleanly match any single computed figure above (closest to the 87-slug count).
- **officialValue:** n/a — this is an internal counting/dedup problem, not a provider-fact problem.
- **authorityUsed:** A3 (freshest measured repository state — `docs/AIPS_CURRENT_TRUTH.md` count ledger, reproducible via `node scripts/validate-catalog.mjs --strict`).
- **severity:** P0 — this is the exact ambiguity Section 3 of the execution contract exists to prevent; no public count claim should be made until "unique product family" vs "plan variant" vs "rendered page" vs "brand route" are each independently confirmed and consistently reported.
- **recommendedAction:** Reconcile why brand routes (41) ≠ unique brands (77) ≠ unique slugs (87) at the source-code level (`src/App.tsx`, `src/lib/productRoutes.ts`) before quoting any single number publicly.
- **requiresCEOApproval:** false for the reconciliation itself; true for what number (if any) gets published afterward.

---

### CL-3 — Live "3,000+ customers" claim
- **notionValue:** Coordinator page C5 explicitly flags unsupported outcome/testimonial/count claims as an open risk, referencing "118+ Premium AI Tools" specifically; checkpoint's own history shows this exact class of claim was already corrected once (commit `d9e46cd`, 2026-07-24-ish).
- **repositoryValue:** Not found in current `data/products.json` or component source in this session's spot-check (not exhaustively grepped this pass).
- **liveValue:** `curl https://aipremiumshop.com/` on 2026-08-02 shows meta description containing "3,000+ customers" verbatim.
- **officialValue:** n/a — no evidence record exists for this figure anywhere in the ledger.
- **authorityUsed:** A1 (compliance/truth rule: no unverified customer-count claim, per the standing CEO ruling already applied once to this exact phrase).
- **severity:** P0 — live, public, unsupported quantitative claim; a prior fix for this exact phrase apparently did not reach this file or was reverted.
- **recommendedAction:** Locate the actual source of the live `index.html`/meta content (static file vs. build-time template) and correct it there so it cannot regress again; do not hand-patch the deployed artifact directly.
- **requiresCEOApproval:** false (correcting an already-established truth violation, not making a new claim decision).

---

### CL-4 — Exposed secret in Git history
- **notionValue:** Coordinator page: "A previously committed authentication secret remains in Git history. It must be rotated... requires a coordinated CEO/admin procedure."
- **repositoryValue:** Confirmed this session: real `NEXTAUTH_SECRET` + Supabase anon key committed in `.env.local` at `c8ae0025d0cc9e648ecabfe85459c5625cfa42d1` (2026-07-26); file removed from current tree but retrievable from history indefinitely.
- **liveValue:** n/a (cannot verify from outside whether the live Supabase/NextAuth deployment still uses this exact secret value without CEO/admin access).
- **officialValue:** n/a
- **authorityUsed:** A1 (security overrides everything else).
- **severity:** P0 / red lane.
- **recommendedAction:** CEO/admin rotates both credentials at the provider (Supabase dashboard, NextAuth config) and decides separately whether Git history itself needs scrubbing. This session added `.env*` to `.gitignore` to stop recurrence but did not and cannot rotate the actual secret.
- **requiresCEOApproval:** true (explicitly red lane per the execution contract, Section 6).

---

### CL-5 — GitHub Actions billing lock
- **notionValue:** Not mentioned in the coordinator page or checkpoint text read this session (may be documented elsewhere, e.g. the AITP-side memory that first surfaced this exact pattern for the sibling project).
- **repositoryValue:** All three workflows fail immediately with "account is locked due to a billing issue" (confirmed via `gh run view` on the 3 most recent runs).
- **liveValue:** Unaffected — Vercel's Git integration deploys independently of Actions.
- **authorityUsed:** A3 (measured).
- **severity:** P1 (does not block production, but blocks all automated CI/lint/test/secret-scan gating described in Section 36 of the execution contract).
- **recommendedAction:** CEO/admin resolves GitHub billing account-wide (affects every `sysmoai` repo, not just this one).
- **requiresCEOApproval:** true (billing/account action, red lane).

---

### CL-6 — Governance contamination (pricing decision package location)
- **notionValue:** Coordinator page C7: "The internal AIPS Pricing Decision Package is currently nested below an AITP-related hierarchy." Referenced page: `61723d37913644d0919953396f3102bb`.
- **repositoryValue:** n/a (Notion-only issue).
- **authorityUsed:** A2 (canonical AIPS content should not live under a different brand's Notion hierarchy).
- **severity:** P2 — retrieval/confusion risk, not a live customer-facing defect.
- **recommendedAction:** Per the coordinator page: create an AIPS-native canonical replacement, or move only after confirming no linked workflow breaks. Not attempted this session (Notion write scope was read-only investigation this pass).
- **requiresCEOApproval:** false for creating a copy; possibly true for moving/deleting the original if other pages link to it.

---

### CL-7 — Uncertain status of `origin/claude/aips-repo-consolidation-q4j508`
- **notionValue:** Coordinator page references "merged PR 1" as part of the consolidation history but does not name this branch specifically.
- **repositoryValue:** Branch exists on origin, not yet diffed against current `main` this session.
- **severity:** P2 — unknown until inspected; could contain unmerged, superseded, or duplicate work.
- **recommendedAction:** Diff this branch against current `main` in the next session before assuming it's stale or assuming it's needed.
- **requiresCEOApproval:** false (investigation only).
