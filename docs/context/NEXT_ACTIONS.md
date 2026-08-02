# Next Actions — AI Premium Shop

Last updated: 2026-08-02 (Session 4, Claude Sonnet 5, branch `feat/aips-ssot-claim-price-guards`)

## Unblocked — safe to start immediately, no CEO input needed

1. Reconcile the 41-brand-route vs. 77-brand / 87-slug gap at the source level (`artifacts/aips-landing/src/App.tsx`, `src/lib/productRoutes.ts`). This is the one remaining unexplained number in the count ledger.
2. Find the actual source of the live "87 Premium AI Tools... 3,000+ customers" homepage copy (static `index.html` vs. a build-time template) so the unsupported customer-count claim can be fixed at its source instead of hand-patched again.
3. Diff `origin/claude/aips-repo-consolidation-q4j508` against current `main` to determine if it holds unmerged, relevant work or is superseded/abandoned.
4. Inspect `artifacts/legacy` and `artifacts/figma-make-v2` (present on HEAD, not yet reviewed this session) — confirm they are correctly inert/archival and not silently diverging like `aips-website`.
5. Decide (engineering judgment, not a CEO call) whether to fix or remove `.github/workflows/deploy.yml` and `pages.yml` — both are broken (billing lock) and both misdescribe the real hosting platform (Vercel) regardless.
6. Extend `scripts/validate-catalog.mjs`'s existing banned-claims list to explicitly catch "3,000+ customers" / "X,000+ customers" patterns (currently the warning list catches "trusted by," "best seller," etc., per this session's `--strict` run, but not bare customer-count claims) so this class of regression is caught by CI once Actions billing is restored, and by local pre-push in the meantime.

## Blocked — require Emon/CEO decision (unchanged from `docs/context/DECISIONS.md`, not re-litigated this session)

1. Frontend architecture: promote `aips-website` (Next.js, 155 pages, richer content) vs. keep optimizing `aips-landing` (Vite SPA, currently live) vs. run both in parallel.
2. Shared-access legal authorization for 44 products (`accessType: "shared"`) — evidence per product, delist, or switch to customer-owned model.
3. LMArena leaderboard usage rules (draft guidelines exist in `DECISIONS.md`, unapproved).
4. Bangla + audience-segment content strategy (65-page expansion matrix drafted, unapproved).
5. Whether Notion is canonical for product/plan definitions (access is no longer the blocker — Notion MCP works — only the decision itself is pending).

## Red-lane, CEO/admin-only, not actionable by any Claude session

1. Rotate `NEXTAUTH_SECRET` and Supabase anon key (exposed in Git history at `c8ae002`); decide separately whether history needs scrubbing.
2. Resolve GitHub Actions billing lock on the `sysmoai` account.

## Exact next command for the next session

```bash
cd /c/Users/emonh/SYSmoAI-Stack/apps/AI-Premium-Shop
git fetch origin --quiet
git status
git log origin/main -3 --oneline   # confirm nothing moved since 82e5c4b
cd artifacts/aips-landing && node scripts/validate-catalog.mjs --strict
```
Then read `docs/context/resume.json` for the structured handoff state.
