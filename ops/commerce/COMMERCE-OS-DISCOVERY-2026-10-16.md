# AIPS Commerce OS — Real-State Discovery (2026-10-16)

Evidence-linked inventory for issue #142. Classification:
`IMPLEMENTED / HUMAN OPERATED / EXTERNAL SYSTEM / MISSING / UNVERIFIED / NOT REQUIRED`.
No customer records, credentials or private ledger content is reproduced here.
This document is a dated snapshot, not a live dashboard. Refresh with new
evidence before building anything.

## Sources consulted (2026-10-16, Asia/Dhaka)
- Live Worker code: `worker/index.js`, `functions/api/*`
  (concierge.js, feedback.js, insights.js, _store.js).
- Live Worker production settings (owner Cloudflare dashboard):
  secrets = NVIDIA_API_KEY only; bindings = none.
- Public pages: `HowToOrderPage.tsx`, `ProductPage.tsx`,
  `SupportPage/Support clusters`, concierge widget.
- Repository: workflows, `ops/ssot/*`, `ops/audit/*`,
  `ops/cloudflare-migration/*`, `.env.example` files, git history scan.
- Live public endpoints: `/api/concierge`, `/api/feedback`,
  `/api/insights` (insights fail-closed without INSIGHTS_TOKEN).

## 1. Commerce capability matrix

| # | Capability | Evidence | Classification |
|---|---|---|---|
| 1 | Product source/provider terms/availability | Governed catalog in `ops/ssot/` + raw 239-record catalog with known audit debt (44 shared accessType, 9 unverified trust counts, 239 missing governance fields). Provider-evidence batches tracked in issues #39-#46. | PARTIALLY IMPLEMENTED (publication projection) / HUMAN OPERATED (final provider facts) |
| 2 | Inquiry / qualification / quoting | WhatsApp deep link `wa.me/8801865385348` with confirm-plan text on product pages and `/how-to-order`; Concierge answers catalog questions but cannot transact. | HUMAN OPERATED via WhatsApp; Concierge = informational assistant |
| 3 | Unique order ID / consent / contact storage | No order ID generation, no consent storage, no contact DB found anywhere in code or production settings. | MISSING |
| 4 | Payment instructions / receiving-account separation / anti-fraud | `/how-to-order` instructs: pay only after exact amount+method confirmed per order; never share PIN/OTP/password. No payment gateway, no bKash/Nagad API keys in production (`.env.example` placeholders only). | HUMAN OPERATED (manual instructions) / MISSING (any systemized ledger) |
| 5 | Payment verification | No code or documented process beyond "verify access after payment". | HUMAN OPERATED / UNVERIFIED (no machine-readable evidence path) |
| 6 | Activation/fulfillment | No provisioning automation. Provider credentials are delivered by human operators over WhatsApp. | HUMAN OPERATED |
| 7 | Order status / support cases / refunds-disputes | Support = WhatsApp + `/api/feedback` (stores nothing: no DB in production — `_store.js` no-ops without DATABASE_URL/POSTGRES_URL, and neither secret is set on the Worker). | MISSING (systematic) / HUMAN OPERATED (informal) |
| 8 | Renewal schedule / reminders / consent | Nothing found. | MISSING |
| 9 | Operator auth / RBAC / MFA / audit logs | No admin surface exists. GitHub = owner account with branch protection (required ssot/build/validate; enforce_admins false). Cloudflare = owner session + scoped API tokens (see ops/audit F-021). | HUMAN OPERATED (platform-native controls) / NO APP-LEVEL ADMIN (MISSING by design, NOT REQUIRED yet) |
| 10 | Notifications / email/SMS/WhatsApp APIs | Zoho mail DNS present (MX/SPF/DMARC; DKIM admin unverified). No WhatsApp Business API, no email-sending automation in production. | EXTERNAL SYSTEM (Zoho mail) / UNVERIFIED (deliverability) |
| 11 | Funnel metrics (inquiry→paid→retained, profit) | No analytics of orders. GSC shows organic clicks only (28-day baseline: 183 clicks / 1,695 impressions). | MISSING |
| 12 | Data retention / PII minimization / backups / recovery | No customer DB exists → nothing to retain or back up beyond source Git + R2 media (2 infra objects) + Cloudflare state. Public-site build identity and rollback documented in RECOVERY-STATE. | NOT REQUIRED (no store exists) / PARTIAL (platform backups) |
| 13 | Resource ownership / cost / quotas | Cloudflare Free zone + Workers Free; R2 = Free tier (2 objects); GitHub Actions free. Concierge inference = NVIDIA key (commercial entitlement open, #111). | IMPLEMENTED at $0 recurring; cost alerting MISSING |

## 2. Conclusions from evidence (no fabrication)
1. There is **no in-repo or in-production order/payment/customer database**.
   `@neondatabase/serverless` is code-only; the Worker has no DB secret or
   binding. The insights endpoint fails closed by design.
2. The real operating loop today is **WhatsApp-assisted, human-operated**:
   inquiry → manual quote confirmation → manual payment instructions →
   human verification → manual fulfillment. This is a legitimate operating
   model; it is not "broken" merely because it is not automated.
3. Whether a private spreadsheet/notebook ledger exists outside the repo
   cannot be proven or disproven from here — classified UNVERIFIED, pending
   CEO statement. Nothing in the repo references one.
4. Before ANY new database/checkout/payment integration:
   - CEO must confirm the current external/human ledger practice (if any).
   - Payment verification must stay human-gated per `ops/ssot/autonomy-policy.json`
     (protected: payment/delivery facts) and #142 rules.
   - Smallest viable first step (post-approval) is a private, authenticated,
     audited order register — NOT a public checkout and NOT payment automation.

## 3. Recommended next step (proposal, not implemented)
Wait for CEO confirmation of current manual ledger practice, then decide:
- (A) keep pure human WhatsApp ops and document SOPs only, or
- (B) introduce a minimal private order register (e.g., Cloudflare D1 behind
  an authenticated, MFA-gated admin route) with synthetic-record tests,
  audit trail, export/backup and rollback — no payment APIs, no customer
  money movement by agents.
Nothing in this document provisions services or spends money.
