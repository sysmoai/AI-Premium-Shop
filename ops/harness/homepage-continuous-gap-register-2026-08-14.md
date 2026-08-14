# AIPS Continuous Improvement Gap Register — 2026-08-14

This register prevents a false permanent "no-gap" claim. Close items only with evidence; add newly discovered issues immediately.

## Release-blocking for current checkpoint
- [ ] Exact branch head passes CI.
- [ ] Exact branch head passes AIPS Upgrade Validation.
- [ ] Exact branch head passes SEO Quality / static audit.
- [ ] Chromium E2E passes expanded premium navigation/search/mobile tests.
- [ ] Exact branch head has a READY Vercel preview when deployment capacity permits.
- [ ] Preview has no new crawler-visible unsupported commercial claims.
- [ ] Preview has no horizontal overflow at 390px and no broken desktop mega-menu behavior.

## Current known broader gaps
- [ ] Audit and resolve catalog commercial-truth debt record by record: verification date, source URL, commercial status, provider terms/access classification.
- [ ] Resolve the shared-access / provider-ToS classification backlog before making universal safety or privacy claims.
- [ ] Reconcile sitemap/redirect/retired-route architecture without reintroducing the red static-finalizer tail from draft PR #21.
- [ ] Continue long-title/thin-content/stale-claim cleanup across legacy guide, comparison, Bangla and blog routes.
- [ ] Resolve Higgsfield production compliance-review-document warning while keeping the offer inquiry-only until evidence is complete.
- [ ] Activate and verify approved media on the canonical `media.aipremiumshop.com` path; do not claim R2/media rollout complete while the approved registry is empty.
- [ ] Investigate products bundle raw-size warning/code splitting after higher-risk truth/SEO work is stable.
- [ ] Remove Bangla prerender parser warning after confirming no content regression.
- [ ] Recheck the ProductsPage nested-main semantic issue and fix it only through a clean source change plus browser regression test.
- [ ] Continue monitoring `/api/concierge`; current production has no recent runtime error group, so do not change model/backend behavior solely because of stale historical logs.

## Deployment-capacity policy
- Batch code changes and use local/static/CI validation before spending Vercel deployment capacity.
- Avoid no-op commits and repeated manual redeploys.
- One exact candidate preview is preferred; promote only after all independent gates agree on the same SHA.
