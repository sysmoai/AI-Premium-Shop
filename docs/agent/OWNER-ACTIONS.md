# Owner actions required

Infrastructure/business decisions a CLI session should not make unilaterally,
even when it has the access to. Each entry: what was found, exact evidence,
recommended action, and the exact command or dashboard path.

---

## OA1 — Stale duplicate Vercel deployment, publicly live (RESOLVED 2026-08-07)

**Status:** resolved. You approved option A below; all three `vercel alias
rm` commands ran successfully this session (a prior attempt at the same
action was blocked by Claude Code's own safety classifier — this time it
went through). All three aliases now 404/unreachable, production
(`aipremiumshop.com`) confirmed unaffected. See `BLOCKERS.md` B11.

**Original text, for the record:** corrects `BLOCKERS.md` B11's initial
narrative — see "What this actually is" below; it's simpler and lower-risk
than first described.

### Evidence

```
$ vercel project inspect aips-website
  ID              prj_gDXbOWXKZP7S1KxPnLkyHs5TVuer
  Name            aips-website
  Created At      30 July 2026 06:05:47 [8d ago]
  Root Directory  artifacts/aips-landing        ← the CORRECT/live app
  Framework       Vite
  Build Command   BASE_PATH=/ PORT=3000 pnpm --filter @workspace/aips-landing run build

$ vercel inspect https://aips-website-two.vercel.app
  id       dpl_DPfznLnKPh1q4fs4VkdJteRjBACK
  target   production
  status   ● Ready
  created  Thu Jul 30 2026 10:39:31 GMT+0600 [8d ago]
  Aliases:
    https://aips-website-two.vercel.app
    https://aips-website-sysmoaigits-projects.vercel.app
    https://aips-website-git-main-sysmoaigits-projects.vercel.app

$ vercel ls aips-website
  # every deployment under this project is 8d old — never redeployed since
  # project creation

$ curl -s https://aips-website-two.vercel.app/
  <title>AI Premium Shop — 118+ Premium AI Tools Bangladesh | From BDT 299</title>
  ...3,000+ customers...
  # no <link rel="canonical">, robots.txt says "Allow: /"

$ vercel domains ls
  # aiteampremium.com, sysmoai.com, bangladeshai.org only — no custom
  # domain is aliased to this project, just the three auto-generated
  # *.vercel.app subdomains above
```

### What this actually is

**Not** the archived Next.js experiment (`artifacts/aips-website/`, see its
own `DEPRECATED.md`) despite the confusingly-matching project name. This
Vercel project's Root Directory is `artifacts/aips-landing` — the same,
correct, currently-live Vite app. It was created 2026-07-30 (the same date
`DEPRECATED.md` records the "kept SPA, archived Next.js" decision) — almost
certainly a duplicate/test project spun up during that day's consolidation
work, deployed once, then abandoned in favor of the real production project
(`ai-premium-shopai-premium-shop-aipai-premium-shops-landing`). It has never
been redeployed since, so it's frozen at an 8-day-old snapshot of the
*correct* app — stale catalog numbers, not wrong architecture.

No custom domain is at risk. Only three auto-generated `*.vercel.app`
subdomains point at it, and only because Vercel's own project system
generated them automatically — nothing in DNS depends on them.

### Recommended action (safest → most thorough)

**A. Remove just the aliases** (recommended — smallest blast radius,
reversible: aliases can be re-added, nothing is deleted):
```
vercel alias rm aips-website-two.vercel.app --yes
vercel alias rm aips-website-sysmoaigits-projects.vercel.app --yes
vercel alias rm aips-website-git-main-sysmoaigits-projects.vercel.app --yes
```
After this, the deployment still technically exists but has no reachable
URL — nothing to crawl or link to.

**B. Enable Deployment Protection** on the project (dashboard: Project
`aips-website` → Settings → Deployment Protection → Vercel Authentication →
apply to Production). Keeps the project/deployment intact but puts it behind
Vercel's own SSO wall — same effect as A, done in the dashboard instead of
CLI, no alias removal needed.

**C. Delete the whole project** (most thorough, least reversible — deletes
deployment history too):
```
vercel remove aips-website --yes
```
Only do this if you're confident nothing else references
`prj_gDXbOWXKZP7S1KxPnLkyHs5TVuer` — I found no such reference in the repo
during this session, but I did not check Vercel team settings, DNS records
outside the `vercel domains ls` list above, or any external system.

**Not recommending:** a 410/noindex retirement page (master prompt's
fallback option D) — unnecessary here since option A achieves the same
outcome (unreachable) without keeping a placeholder deployment around, and
is one command instead of a new deploy.

### Rollback

A: re-run `vercel alias set <deployment-url> <alias>` for any alias you want
back. B: turn Deployment Protection back off in the dashboard. C: not
reversible — Vercel does not restore deleted projects; you'd recreate it and
lose the deployment history (which has no value here since it's abandoned).

---

## OA2 — Two-hop redirect on `http://www.aipremiumshop.com` (LOW)

### Evidence

```
$ curl -sI http://www.aipremiumshop.com/
  HTTP/1.0 308 Permanent Redirect
  Location: https://www.aipremiumshop.com/

$ curl -sI https://www.aipremiumshop.com/
  HTTP/1.1 308 Permanent Redirect
  Location: https://aipremiumshop.com/
```
Two hops (`http://www` → `https://www` → `https://` apex) where the other
three host/scheme combinations are one hop. Not fixable from application
code — Vercel applies each domain's own http→https rule before any
www→apex redirect chains on top.

### Recommended action

Dashboard: production project → Settings → Domains → find the
`www.aipremiumshop.com` entry → its redirect target should point directly to
`https://aipremiumshop.com` (not to `https://www.aipremiumshop.com` first).
Vercel's domain-redirect UI normally lets you set the exact target host
+ scheme in one step; if `www` is currently configured as "Redirect to
another domain" pointed at `aipremiumshop.com` without also forcing https in
that same hop, that's the extra hop. Five-minute fix, low priority — explicitly
not blocking any higher-impact work per the master prompt's own instruction.

No CLI command recorded for this — Vercel's domain-redirect configuration
isn't exposed via `vercel domains` subcommands in this CLI version; it's a
dashboard-only setting.
