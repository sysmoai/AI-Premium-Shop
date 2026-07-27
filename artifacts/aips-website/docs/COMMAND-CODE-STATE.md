# COMMAND CODE WORK STATE
# Project: PROJECT PHOENIX (aips-website)
# Updated: 2026-07-14

## Current State: DISCOVER → VERIFY
- Branch: main (95808b9)
- Status: Reconciling build environment + gaps

## Batch History
| Batch | Phase | Status | Commits | Notes |
|-------|-------|--------|---------|-------|
| 2026-07-14-01 | 0 | IN PROGRESS | — | Build fix, llms.txt, product reconciliation |

## Active Batch: 2026-07-14-01
- Objective: Fix build, create llms.txt files, reconcile product counts
- Files: src/app/layout.tsx (verify), public/llms.txt (create), public/llms-full.txt (create)
- Acceptance Criteria: pnpm build passes, 86 products reflected

## Pending Actions
- [ ] Fix pnpm build with node env
- [ ] Create llms.txt + llms-full.txt  
- [ ] Fix homepage "86+" count
- [ ] Verify all 41 product groups render
- [ ] Commit + push
