# AIPS Master Gap Register

This register records verified AIPS gaps and their evidence-backed lifecycle. A gap is not closed merely because code changed; production and downstream states are tracked separately.

## AIPS-P0-20260810-COMMERCE-COMPLIANCE-DRIFT

- **Timestamp (Asia/Dhaka):** 2026-08-10 02:04
- **Domain:** Compliance / commerce / catalog projection
- **Severity:** P0
- **Description:** Production exposed shared-access commercial offers and order paths while current A1 controls require fail-closed customer-owned/provider-compliant or otherwise specifically approved delivery.
- **Exact evidence:** Pre-mitigation production and main catalog exposed shared tiers, shared-seat descriptions, public prices and direct WhatsApp ordering. Current A1 control requires these offers not remain purchasable without an approved compliant model.
- **Source URL/page/file:** `https://aipremiumshop.com/`; `artifacts/aips-landing/data/products.json`; current AIPS A1 Provider Authorization & SKU Compliance Matrix / Customer-Owned Delivery controls.
- **Affected files:** Public prerendered HTML generated from the AIPS landing app; `artifacts/aips-landing/api/concierge.js`; underlying shared commercial data remains retained for reconciliation and is not treated as publishable authority.
- **Affected live URLs:** Sitewide commercial/content routes, including `/`, `/products`, `/pricing`, product/brand pages and `/api/concierge`.
- **Authority involved:** A1 compliance controls; A2 catalog projection is subject to current approval/review state.
- **Current state:** Public website is fail-closed under a temporary commerce quarantine. Generated HTML is replaced after prerender with a `noindex,nofollow` availability-under-verification notice; the concierge returns HTTP 503 and does not serve catalog/pricing/access/order guidance.
- **Desired state:** Restore a useful indexable storefront only after A1/A2 reconciliation yields current approved commercial variants, access models, prices and publishable claims; then remove the temporary quarantine with regression coverage.
- **Owner:** AIPS governance / commercial authority for protected A1/A2 decisions; implementation lane may execute approved projection safely.
- **Dependencies:** Current canonical SKU compliance classifications; approved catalog/commercial statuses; approved BDT prices where applicable; approved policy/payment facts where surfaced.
- **Release lane:** GREEN emergency mitigation completed; restoration of protected commercial facts may include YELLOW decisions.
- **Action taken:** PR #9 suppressed public commercial output sitewide and disabled the public concierge without inventing replacement prices, access models or policy facts.
- **Acceptance criteria:** CI + catalog validators + build + quarantine SEO validator + real-browser quarantine suite pass; exact production SHA verified; live root and representative nested route show only verification notice; concierge returns 503/no-store.
- **Test evidence:** Final pre-merge candidate `e39ad87a8987c3da1b056025afaea8ae7771f1b5` passed repository CI and SEO/browser quality workflows.
- **Preview evidence:** Vercel preview for the final candidate reached READY; build replaced 278 generated HTML files after the normal 275-route prerender audit.
- **Deployed SHA:** `78b4a0b431cc5781caa65feb5559bb88052d514e`
- **Production deployment:** `dpl_2paGQhGEc2yYsxuNdknwmEfYt8su`
- **Live verification:** 2026-08-10 ~02:04 Asia/Dhaka: `https://aipremiumshop.com/` and `/products` returned HTTP 200 with the verification notice and `noindex,nofollow`; `/api/concierge` returned HTTP 503 `availability_under_verification` with `Cache-Control: no-store`.
- **Index status:** LIVE_FIXED; search-engine recrawl/index propagation not yet verified. Do not report index resolution until measured.
- **Status:** VERIFIED_LIVE
- **Next action:** Reconcile every shared/commercial SKU against current A1/A2 authority, prepare protected decision diffs where required, then restore only approved customer-owned/provider-compliant commercial projections and remove the quarantine through the same test/preview/live-verification gates.
