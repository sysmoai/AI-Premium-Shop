# AI Premium Shop — Production Preservation Baseline

Date: 2026-09-03 (Asia/Dhaka)
Status: W0 preservation evidence — branch only, not merged

## Purpose

This record freezes the known-good production identity before the September 2026 improvement program. It is evidence and rollback context only. It does not change public content, routing, pricing, SEO, commerce behavior, or production infrastructure.

## Canonical production identity

- Repository: `sysmoai/AI-Premium-Shop`
- Default branch: `main`
- Application root: `artifacts/aips-landing`
- Baseline Git commit: `f0d7425913cfb7e24bac277f5dbc984842e63563`
- Baseline commit message: `Align AIPS validation jobs with Node 24`
- Vercel team: `team_WCN7gRRsLzPy8C0EdOFtDYrJ`
- Vercel project: `prj_aP4bi30UW8mcHgBvU7E72yyFOPQd`
- Vercel framework/runtime: `vite` / Node `24.x`
- Production deployment: `dpl_FvKP6Poqyjv4uRuYhiFyezoaBXev`
- Production deployment state at verification: `READY`
- Production deployment target: `production`
- Production deployment Git ref: `main`
- Production deployment Git SHA: `f0d7425913cfb7e24bac277f5dbc984842e63563`
- `main` still resolves to the same Git SHA at this checkpoint.
- Production deployment is marked by Vercel as a rollback candidate.
- Previous READY production rollback candidate: `dpl_4KduhLbbH2dcreYCFEBz13nGpPty`, Git SHA `8bcf55f37a8832a222853583ccf380f37177709e`.
- Verified primary domains remain `aipremiumshop.com` and `www.aipremiumshop.com`.

## Hosting compliance checkpoint

Initial capture found the Vercel team on `hobby`.

On 2026-09-03 at approximately 10:56 Asia/Dhaka, the connected Vercel account reports the same team as plan `pro`. The owner-provided onboarding screenshot shows `Pro Trial`, so the current commercial-plan surface is active but continuity beyond the trial remains an owner billing responsibility.

W0.1 status: **VERIFIED ACTIVE ON PRO PLAN SURFACE**.

No application migration, project replacement, domain change, or production deployment was required for this plan transition.

## Preview isolation evidence

The first evidence-only commit on branch `aips/w0-preservation-baseline-2026-09-03` generated Vercel Preview deployment `dpl_6cZXd8xL4zpNapD4PWsFScZpKTZC`.

- Preview state: `READY`
- Preview target: none / non-production
- Preview Git SHA: `90651c6d81bf8f4f550e8eabcf9c554fe2bb4c05`
- Production remained `dpl_FvKP6Poqyjv4uRuYhiFyezoaBXev` at baseline SHA `f0d7425913cfb7e24bac277f5dbc984842e63563`.

This confirms the branch/preview path is isolated from the active production deployment.

## Preservation contract

1. Preserve `aipremiumshop.com` and `www.aipremiumshop.com`.
2. Preserve existing ranking-bearing URLs unless an explicit one-to-one migration is qualified.
3. Preserve WhatsApp-assisted sales flow and current commercial truth controls.
4. Preserve approved AI Premium Shop brand identity and production logo asset.
5. Make improvements on isolated branches and Vercel Preview first.
6. Run applicable truth, catalog, SEO, type/build and browser tests before merge.
7. Merge only qualified changes.
8. Verify the exact production deployment ID and Git SHA after every production release.
9. Roll back immediately for wrong protected commercial facts, broken conversion paths, indexing/canonical regressions, broad 4xx/5xx regressions, major mobile breakage, or brand corruption.

## Known baseline risks intentionally NOT fixed in this evidence commit

- The owner onboarding screen indicates `Pro Trial`; billing continuity after the trial must remain active to avoid falling back to a non-commercial tier.
- `ops/ssot/growth.json` has known state drift versus newer site/commercial SSOT and must be reconciled in a later isolated change.
- Analytics environment-variable contract has known drift (`VITE_*` runtime expectations vs documented non-VITE names).
- Main branch was observed as unprotected at this checkpoint; repository governance should be assessed separately before changing branch rules.
- Existing runtime deprecation warning around `url.parse()` in `/api/concierge` should be remediated in a separate qualified change.

## Change-control note

This file is deliberately stored on `aips/w0-preservation-baseline-2026-09-03` first. It is not authority for protected commercial facts. Current `ops/ssot/`, exact production evidence, code/tests, and owner-approved evidence retain their established authority order.
