# P0 AIPS Android Mobile-Data Access Incident — 2026-10-14

**Status: OPEN / CUSTOMER REPORTED / ROOT CAUSE UNVERIFIED.**
**Incident tracker:** https://github.com/sysmoai/AI-Premium-Shop/issues/113
**Observed report time:** 2026-10-14 around 18:19 Asia/Dhaka (12:19 UTC).
**Owner:** AIPS Founder/CEO and authorized Windows/Command Code operations agent.
**Scope:** aipremiumshop.com on an actual Android handset using mobile carrier data. Other business units are out of scope.

## 1. Do not confuse this with the prior Vercel screenshot
- CURRENT user statement (2026-10-14 evening): website **does not work on mobile data**. A new screenshot of the current error is PROMISED but NOT YET PROVIDED.
- HISTORICAL phone screenshot: displayed Vercel's "This deployment is temporarily paused". This is NOT verified as the current error.
- Therefore current HTTP response, carrier DNS answer, exact Chrome error, mobile carrier, TLS outcome and Cloudflare request outcome are all UNKNOWN.
- Do not automatically label the present failure Vercel 402, propagation, IPv6, WAF or a browser-cache issue.

## 2. Fresh independent checks (2026-10-14, remote tools)
- External URL renderer successfully retrieved actual AIPS homepage on apex and www, /products, /.well-known/aips-build.json and /api/concierge. This proves these routes are reachable from SOME remote networks, not the user's mobile carrier.
- Served public application git_sha: a3ae5a6dc7551069635ad40345d1cd07ec238b9c.
- GET /api/concierge: ok=true, products=177, keyConfigured=true. This is only a configuration/status response; do not infer successful POST inference or NVIDIA commercial entitlement.
- Current GitHub main: bb855bb86934213c8ddcb026b841bdc063f1d68f (merged PR #112); a newer main SHA than the deployed app can be expected for documentation and keyword-data changes with path-filtered deployment.
- Latest Live site monitor: https://github.com/sysmoai/AI-Premium-Shop/actions/runs/38531431024 ; scheduled runner succeeded 2026-10-14 07:54:41Z / 13:54:41 Asia/Dhaka. It checks apex HTTP/HTML from ONE GitHub-hosted network, not Bangladesh mobile data. A green result does NOT close this incident.
- Google Public DNS A: 104.21.19.189, 172.67.188.143; AAAA: 2606:4700:3033::6815:13bd, 2606:4700:3037::ac43:bc8f; NS: andy.ns.cloudflare.com and treasure.ns.cloudflare.com; www A currently resolves to Cloudflare. THESE ARE SNAPSHOT OBSERVATIONS, NOT addresses to hardcode.
- MX records resolve to Zoho (10/20/50). Do not disturb email DNS during triage.
- DNSSEC DS response from Google DNS showed no DS answer; this is not proof of end-to-end phone DNS behavior.
- Host filesystem in this assistant's isolated test runtime could not resolve the domain; the runtime itself lacks normal outbound name resolution. This is an execution-environment limit, NOT independent evidence of an AIPS public outage.
- Direct Cloudflare dashboard, authenticated WAF/Security Events, Android packet capture and the user's Windows Chrome are NOT available in this ChatGPT session. The separately authorized Command Code desktop/browser session should perform those tasks.

## 3. Incident hypothesis matrix (NONE YET CONFIRMED)
| Hypothesis | Distinguishing evidence | Action only after verified |
|---|---|---|
| Mobile ISP resolver still points to retired Vercel | Actual device resolver answers / HTTP 402 with Vercel identifiers vs Cloudflare public DNS | Audit cached delegation and old zone, safe cache convergence; do not thrash NS |
| IPv6 mobile path differs from IPv4 | IPv4 works and cellular IPv6 fails, recorded network/TLS outcome | Check AAAA/edge/TLS/routing on provider dashboards |
| Cloudflare WAF/ASN/country rule blocks mobile carrier | 403/1020/challenge plus Cloudflare Ray ID, matching Security Event | Narrowly correct erroneous rule; never disable WAF globally |
| TLS/HTTPS/browser issue | Exact net::ERR_* code or certificate evidence, browser comparison | Correct the verified TLS/browser issue; avoid insecure HTTP workaround |
| Carrier routing, DNS-over-HTTPS/Private DNS, captive portal or device network | Distinct mobile-data vs Wi-Fi outcomes and timestamped actual probes | Scoped resolver/network remediation and owner-safe diagnostics |
| Cloudflare Worker/route failure | 5xx, Worker trace, Ray ID, regional or hostname mismatch | Debug Worker/custom domain, roll back only known-good release |
| Other | Newly collected facts | Research current official docs before acting |

## 4. Triage sequence AFTER new phone screenshot
1. Save screenshot privately; redact unrelated phone/account information. Record exact error text, URL, time, Android browser and connection state. Request mobile carrier only if needed; never request personal identifiers.
2. Determine whether the screenshot is Vercel "paused", Chrome DNS/TLS error, Cloudflare 403/1020, 52x, page-white JS error, ISP interstitial, or another failure. Do not conflate cases.
3. Obtain ONE targeted device follow-up at a time only when Command Code cannot remotely test that device: Wi-Fi vs mobile data, alternate browser, private DNS, IPv4/IPv6 as appropriate.
4. From approved Windows/Command Code access, inspect Cloudflare Worker custom domain, Cloudflare zone status, authoritative DNS, WAF/Security Events, Ray ID, TLS, rate-limit/challenge rules, and currently active deployment identity.
5. Compare real affected ISP recursive resolver and actual HTTP response to Cloudflare and Google Public DNS. Check old Google/Squarespace authoritative server only as a plausible stale-delegation path.
6. Inspect any Windows AIPS-TEMP hosts-file mappings separately. Never use a successful hosts-override result as proof for public customers; remove only affected entries safely when appropriate.
7. Implement minimal verified remediation. Preserve other services, public content, MX/SPF/DKIM/DMARC, commercial SSOT and rollback. No paid Vercel service or indiscriminate nameserver/security changes.
8. Retest from the ACTUAL affected mobile data network, Android Wi-Fi and at least one independent network. Record status/body or Ray ID and time.
9. Improve monitoring coverage if feasible within approved cost: single GitHub runner is not mobile-carrier coverage. Use only real independent probes; no false continuous-agent claims.
10. Update issue #113, failure register and context handoff with dated results. Close only when affected mobile data and agreed customer-path tests PASS.

## 5. Acceptance criteria
- A real Android device on the previously failing cellular network loads the intended AIPS Cloudflare site using ordinary DNS; mobile-data result is timestamped and confirmed.
- Apex + www/canonical HTTPS and representative product/WhatsApp journeys work, with no Vercel paused page.
- No Windows hosts workaround is used as customer acceptance evidence.
- Any root cause is documented as confirmed evidence or explicitly unresolved; monitoring limitations are honest.
- No unapproved hosting payment, sweeping security disablement, DNS rollback or unrelated business modification.

## 7. CLOSEOUT — 2026-10-16 ~09:00 +06
- CEO reported `Done H-113 — PASS`: the previously affected Android phone
  now loads https://aipremiumshop.com on mobile data with Wi-Fi off.
  Classification: OPERATOR-REPORTED verbal PASS (no screenshot; carrier
  name not captured — noted as a record gap, not a blocker).
- Corroborating evidence (Command Code, same window):
  - CEO's Windows PC on the local Bangladesh ISP resolves
    aipremiumshop.com to Cloudflare (104.21.19.189 / 172.67.188.143) and
    loads the full site (products, concierge, build identity).
  - Cloudflare Security Events, 24h: zero Bangladeshi-IP blocks; only
    scanner traffic blocked (NL/AU/US/UK/Tor).
  - Hosts file verified clean (no AIPS-TEMP entries).
  - Live build edbde2c verified; GitHub live-site-monitor last run PASS.
- Issue #113 closed as completed on this acceptance. Residual note:
  single-device, single-carrier evidence — not a multi-carrier guarantee;
  the daily live-site-monitor remains the automated net.

## 6. Evidence and handoff
- GitHub history: PR #100–#112; main bb855bb; Worker app a3ae5a6.
- Automated monitor pass: https://github.com/sysmoai/AI-Premium-Shop/actions/runs/38531431024
- Incident: https://github.com/sysmoai/AI-Premium-Shop/issues/113
- Historical monitor issue: https://github.com/sysmoai/AI-Premium-Shop/issues/99
- Persistent wider handoff: ops/audit/AIPS-CONTEXT-HANDOFF-2026-10-14.md
- **Next input:** CEO's promised current mobile-data screenshot. A new exact-error-tailored Command Code prompt is to be produced AFTER reviewing that evidence; do not prematurely assume a diagnosis.
