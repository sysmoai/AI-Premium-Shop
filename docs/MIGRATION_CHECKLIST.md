# Migration checklist — repo consolidation

## Done on branch `claude/aips-repo-consolidation-q4j508`
- [x] Audit of all 4 AIPS repos (see CONSOLIDATION_REPORT.md)
- [x] aips-website → `artifacts/aips-website/`
- [x] Aipswebsitev2 → `artifacts/figma-make-v2/`
- [x] aipremiumshop-frontend → `artifacts/legacy/aipremiumshop-frontend/` (zero-loss snapshot)
- [x] Screenshots/static archive → `media/`
- [x] Env templates → `config/` (no secrets)
- [x] Media stack → `lib/media/` (@aips/media)
- [x] Untracked committed `.env.local` files; `.env*` gitignored

## Owner actions before merging
- [ ] 🔴 Rotate `NEXTAUTH_SECRET` (was committed to git history)
- [ ] Review & merge the consolidation PR (EMON is merge gate)
- [ ] `pnpm install && pnpm -r typecheck && pnpm -r lint` green in CI

## Owner actions after merging
- [ ] Repoint Vercel project for the Phoenix site to AI-Premium-Shop with root directory `artifacts/aips-website` (verify preview build before touching production)
- [ ] Cherry-pick wanted frontend-only components from `artifacts/legacy/` into `artifacts/aips-landing`, then delete `artifacts/legacy/`
- [ ] Enable branch protection on `main` (require PR + green checks)
- [ ] Run `scripts/archive-backup.sh` for local bundles (optional)
- [ ] **Archive** (do not delete) on GitHub: aips-website, aipremiumshop-frontend, Aipswebsitev2
- [ ] Update Notion trackers to point at the single repo

## Slated for archive (NOT deletion)
| Repo | Reason it's safe |
|---|---|
| sysmoai/aips-website | Full source in `artifacts/aips-website`; screenshots in `media/` |
| sysmoai/aipremiumshop-frontend | Snapshot in `artifacts/legacy/`; newer twin lives at `artifacts/aips-landing` |
| sysmoai/Aipswebsitev2 | Full export in `artifacts/figma-make-v2` |
