# Rollback Plan — 2026-07-19

## Current Release
- **Commit**: `6b26ea9` — fix: lint errors + documentation
- **Prior Release**: `4a7d9d6` — feat(phase8): all new pages in sitemap + build verified
- **Baseline**: `95808b9` — origin main (last deployed to production)

## Previous Known-Good Deployment
- **Git SHA**: `95808b9c2d84b518e6ef9825e4dad2239b3c4b45`
- **Live Site**: https://aipremiumshop.com currently serves this baseline
- **Product count**: ~80 tools
- **Routes**: ~65 URLs

## Rollback Procedure

### P0 Regression Detection
If after publishing the new release, any of the following break:
1. Homepage fails to load (500/404)
2. WhatsApp deep links broken
3. Product pages return 404
4. Checkout flow broken
5. SEO files (sitemap, robots, llms) missing

### Rollback Steps
1. In Replit IDE → Git pane → `git checkout 95808b9`
2. Run `pnpm build` in Shell
3. Republish via Publishing pane ("Republish" button)
4. Verify https://aipremiumshop.com serves baseline content
5. Document root cause
6. Fix on branch `command-code/phase0-reconcile-20260714`
7. Rebuild and retest
8. Republish only after build gates pass

### No Force Push
Never force push to `origin/main`. The rollback is a Git checkout + republish, not a revert commit.

## Previous Snapshot
Unknown — Replit deployment snapshots are not visible without IDE access.
