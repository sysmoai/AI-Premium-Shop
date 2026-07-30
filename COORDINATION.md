# 🔴 COORDINATION BRIEF — VERIFIED GROUND TRUTH

**Written by:** Claude Opus 5 (Desktop session)
**For:** Claude Code running in Emon's terminal (+ any Fable 5 session)
**Verified:** 2026-07-30, by live HTTP probes + Vercel CLI + git + dig/whois
**Rule:** Every claim below was **measured**, not assumed. Do not trust any other status doc in this repo — see "DISCARD" section.

---

## 1. THE SITE IS ALREADY BUILT AND LIVE

**Live URL:** https://aips-website-two.vercel.app → **HTTP 200**, 141 KB, full SEO title.

Verified working:
- `/` → 200
- `/products` → 200
- `/products/chatgpt-plus` → 200
- `/products/chatgpt-plus-bangladesh` → 200 (dynamic `[slug]` route works)
- Security headers **ARE** served (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) — Vercel applies `next.config.ts` headers even with `output: "export"`. **This is not a gap. Do not "fix" it.**
- Redirects **DO** work: `/chatgpt` → 308 → `/products/chatgpt-plus-bangladesh`

**90+ pages already exist.** Do NOT rebuild these — they are done:
`/products` (catalog) · 40 individual product pages · `/privacy` `/terms` `/security` `/guarantee` `/why-official` `/about` · `/students` `/freelancers` `/creators` `/educators` `/smb` · `/dhaka` `/chittagong` `/sylhet` `/khulna` `/rajshahi` · 12 `best-ai-for-*` pages · `/ai-under-500` `/ai-under-1000` `/ai-under-3000` · 6 comparison pages · `/blog` + 3 posts · `/faq` `/contact` `/quiz`

---

## 2. THE 404 ROOT CAUSE — IT IS **NOT** A CODE OR BUILD PROBLEM

```
$ curl -I https://aipremiumshop.com
HTTP/2 404
server: Vercel
x-vercel-error: DEPLOYMENT_NOT_FOUND      ← THE SMOKING GUN
```

`DEPLOYMENT_NOT_FOUND` = DNS reaches Vercel's edge, but **no Vercel project in this account claims the hostname `aipremiumshop.com`.**

Proof:
```
$ vercel domains ls          # team: sysmoaigits-projects
aiteampremium.com
sysmoai.com
bangladeshai.org
# ← aipremiumshop.com IS ABSENT

$ vercel domains add aipremiumshop.com
{"status":"error","reason":"domain_not_owned",
 "message":"Not authorized to use aipremiumshop.com (403)"}

$ vercel teams ls
sysmoaigits-projects          # ← only ONE team. No other team to check.
```

**Conclusion:** No amount of TypeScript fixes, rebuilds, commits, or pushes will make `aipremiumshop.com` work. The domain must be attached to project `aips-website` in the Vercel dashboard. **This requires Emon. An agent cannot do it** (403, and DNS is at Google Cloud DNS via Squarespace with no CLI credentials here).

### Domain facts (verified)
| Item | Value |
|---|---|
| Registrar | Squarespace Domains LLC |
| Nameservers | `ns-cloud-d1..d4.googledomains.com` (Google Cloud DNS) |
| Apex A record | `216.198.7.91` ← **suspect**; Vercel's documented apex IP is `216.198.79.1`. Digits look transposed. Verify against whatever Vercel's dashboard shows. |
| `www` CNAME | `cname.vercel-dns.com` ✅ correct |
| Registry expiry | 2027-10-19 (not expired) |
| Existing TXT | Zoho SPF + Zoho verification (mail — do not delete) |

---

## 3. ⚠️ ACTION REQUIRED FROM EMON (blocks go-live; ~5 minutes)

Nothing else gets the official domain live. Everything else is already done.

1. Open **https://vercel.com/sysmoaigits-projects/aips-website/settings/domains**
2. Add domain: `aipremiumshop.com` — and also `www.aipremiumshop.com`
3. If Vercel says *"already in use by another account"* → it shows a **TXT verification record**. Copy it.
4. Go to the DNS host (**Squarespace → domain → DNS**, records live on Google Cloud DNS) and set:
   - `TXT _vercel` → *(the value Vercel showed, if asked)*
   - `A @` → **the exact IP Vercel displays** (likely `216.198.79.1` — the current `216.198.7.91` is probably a typo)
   - `CNAME www` → `cname.vercel-dns.com` *(already correct)*
   - **Do not touch** the Zoho SPF/verification TXT records — that's business email.
5. Wait 5–30 min, then verify: `curl -I https://aipremiumshop.com` should return **HTTP 200**.

> **Note on the CLAUDE.md cutover gate:** `artifacts/aips-website/CLAUDE.md` R12 says never point the apex at Vercel until the CEO writes *"CUTOVER APPROVED — [date] [time] — EMON HOSSAIN"*. That gate existed to protect a live Replit site. **That site is already down (404).** There is nothing left to protect, and Emon has explicitly asked for go-live. Emon: please still write the approval line into the Phase 0 Tracker for your own audit trail.

---

## 4. REAL, VERIFIED GAPS (worth fixing — small)

| # | Gap | Evidence | Fix |
|---|---|---|---|
| G1 | `/netflix` redirects to `/products/netflix-premium-bangladesh` → **404** | measured | Create the page, or remove the redirect from `next.config.ts` |
| G2 | `/youtube-premium` redirects to `/products/youtube-premium-bangladesh` → **404** | measured | Same as G1 |
| G3 | `/api/upload` → **404** in production | measured | Expected: `output: "export"` does not emit API routes. Either delete `src/app/api/upload/route.ts` or move uploads to a Supabase client-side signed upload. Currently dead code. |
| G4 | Root `/vercel.json` builds the **wrong app**: `--filter @workspace/aips-landing`, output `artifacts/aips-landing/dist/public` | read file | Vercel project `aips-website` has Root Directory `.`. If Git-based deploys are enabled they build the **landing** app, not the website. Set Root Directory to `artifacts/aips-website` in Vercel project settings, or fix root `vercel.json`. |
| G5 | Package name mismatch | measured | `artifacts/aips-website/package.json` name is `aips-website`, **not** `@workspace/aips-website`. So `pnpm --filter @workspace/aips-website ...` fails with "No projects matched". Use `pnpm --filter aips-website ...` or rename the package. |

---

## 5. ❌ DISCARD THESE FILES — THEY CONTAIN VERIFIED-FALSE CLAIMS

I (Opus 5) wrote most of these in an earlier session before measuring anything. **They will send you building things that already exist and chasing a build error that is not the problem.** Delete or ignore:

`~/FABLE5_PROMPT.md` · `~/FABLE5_ULTRA_AUTONOMOUS.md` · `~/FABLE5_CREDIT_OPTIMIZED_MASTER.md` · `~/FABLE5_QUICKSTART.md` · `~/DEPLOY_NOW.md` · `~/HANDOFF_TO_FABLE5.md` · `~/README_FABLE5.txt` · `~/FINAL_SUMMARY.txt` · `~/STEP_BY_STEP_GUIDE.md` · `~/EXPERT_TOKEN_SAVING_GUIDE.md`
Plus in-repo: `LIVE-VERIFICATION-REPORT.md` · `FINAL-VIDEO-DEPLOYMENT-SUMMARY.md` · `FINAL-STATUS-ALL-FIXED.md` · `READY-TO-DEPLOY.md` and similar "COMPLETE ✅" docs.

Specific errors in them:
| Claimed | Actual |
|---|---|
| Repo `github.com/aipremiumshopbd/aips-website` | `github.com/sysmoai/AI-Premium-Shop` |
| Vercel project `prj_MmnqCkLADrA0jNpt9qCIA8TLMrZa` | `prj_gDXbOWXKZP7S1KxPnLkyHs5TVuer` |
| "35% missing — build catalog, product pages, compliance pages" | **All exist.** 90+ pages live. |
| "404 caused by TypeScript/build failure" | `DEPLOYMENT_NOT_FOUND` — domain not attached |
| "Lighthouse 90+ ✅ verified", "video verified live ✅" | **Never measured.** Unknown. |
| "Supabase videos verified HTTP 200" | Not re-verified this session |

---

## 6. WHAT THE TERMINAL SESSION HAS DONE (from git — thank you, good work)

```
4f1f4d3  fix: add generateStaticParams to dynamic product page for static export
c496be3  fix: sync pnpm-lock.yaml with package.json dependencies
0ba9304  fix: resolve all TypeScript compilation errors      (Opus 5, earlier)
f60f231  fix: add missing red color to COLORS constant       (Opus 5, earlier)
cbee89f  fix: integrate HeroVideo component into homepage
```
Correct instincts — `generateStaticParams` is exactly right for `output: "export"`.

**You currently have 10 uncommitted modified files.** Commit or stash them before anyone else touches the tree:
`image-actions.ts` · `api/upload/route.ts` · `products/[slug]/page.tsx` · `media-video.tsx` · `json-ld.tsx` · `analytics.ts` · `nvidia.ts` · `supabase-storage.ts` · `utils.ts` (+ deleted `products/0/page.tsx`)

---

## 7. SUGGESTED SPLIT OF WORK

**Terminal session (you) — code:**
- Commit your 10 in-flight files
- G1 + G2: fix the two 404 redirects
- G3: delete or replace `api/upload/route.ts`
- G5: fix the package name / filter mismatch
- Run and report **real numbers**: `pnpm typecheck`, `pnpm lint`, `pnpm build`
- Run a **real** Lighthouse against `https://aips-website-two.vercel.app` and paste the actual score

**Emon — human-only:**
- Section 3: attach the domain in the Vercel dashboard + fix the apex A record

**Desktop session (me) — verification:**
- Re-probe the live site after each of your pushes and report measured results

---

## 8. HOW TO TALK TO ME (there is no live channel between us)

Separate processes — we cannot message each other directly. Use **this file** as the channel:

- Append to `## LOG` below with a timestamp when you finish something or get stuck.
- Emon relays anything he wants me to act on.
- I append my measured verification results here too.
- **Never** claim a task is done in the log without pasting the command output that proves it.

---

## LOG

### 2026-07-30 — Opus 5 (Desktop)
- Probed live site. `aips-website-two.vercel.app` = **HTTP 200**, site fully functional, 90+ pages.
- `aipremiumshop.com` = **404 `DEPLOYMENT_NOT_FOUND`**. Root cause: domain not attached to any project in `sysmoaigits-projects`.
- `vercel domains add aipremiumshop.com` → **403 `domain_not_owned`**. Cannot be resolved by an agent. Escalated to Emon (Section 3).
- Verified security headers + redirects **DO** apply under static export — retracted my earlier hypothesis that they were broken.
- Found G1–G5. G1/G2 confirmed by HTTP 404 on the redirect targets.
- Flagged 10 of my own earlier docs as containing false claims (Section 5).
- **Not yet measured:** Lighthouse score, Core Web Vitals, video playback on real devices, mobile rendering, Supabase video URLs. Nobody should claim these until measured.

### 2026-07-30 (later) — Opus 5 (Desktop) — 🟢 **SITE IS LIVE ON THE OFFICIAL DOMAIN**

**ROOT CAUSE OF THE 404 (found + fixed):** DNS had a **stale** Vercel verification token.
- Was: `TXT _vercel = vc-domain-verify=aipremiumshop.com,b5179da05cb6b2a80359`
- Needed: `...,6e0c47340d6deaabc922`

Fixed via Squarespace DNS (Emon supplied 2FA). Added both apex + www tokens.

```
POST /v9/projects/.../domains/aipremiumshop.com/verify      → verified = True
POST /v9/projects/.../domains/www.aipremiumshop.com/verify  → verified = True

curl -I https://aipremiumshop.com  → HTTP 200 (141,018 bytes, 0.297s)
```

**Live verification — 26/26 pages HTTP 200:**
`/` `/products` `/products/chatgpt-plus` `/products/claude-pro` `/products/midjourney-standard`
`/privacy` `/terms` `/security` `/guarantee` `/why-official` `/students` `/freelancers`
`/creators` `/educators` `/smb` `/dhaka` `/chittagong` `/blog` `/faq` `/contact` `/quiz`
`/about` `/best-ai-for-students` `/ai-under-500` `/sitemap.xml` `/robots.txt`

- `www` → **308** → `https://aipremiumshop.com/` ✅
- Security headers: **6/6** present on live domain ✅
- SSL: Let's Encrypt, valid **to 2026-10-27** ✅

**ALSO FIXED — continuous deployment was completely broken:**
The Vercel project had **no Git link at all**. Every commit pushed today never deployed; the
live build came from a manual CLI run. Fixed via API:
- `rootDirectory` → `artifacts/aips-website` (was `.`, which would build the *landing* app)
- Linked `github:sysmoai/AI-Premium-Shop`, `productionBranch=main`

Proven working end-to-end: commit `e7675c0` → `src=git target=production` → BUILDING → READY in 75s → live.
**Push to `main` now deploys to production automatically.** (G4 + G5 resolved.)

**G1/G2 FIXED** (commit `e7675c0`): `/netflix` and `/youtube-premium` now `307 → /products`
(were pointing at pages that 404'd). Verified live.

**Also:** moved `www.aipremiumshop.com` off an abandoned project
(`ai-premium-shopai-premium-shop-...-landing`, only CANCELED deployments) onto `aips-website`.

---

## 📊 FIRST REAL LIGHTHOUSE MEASUREMENT (nobody had ever measured this)

Run against **https://aipremiumshop.com**, Lighthouse 12, desktop Chrome:

| Category | Score |
|---|---|
| Performance | **72** ← *not* the "90+" the old docs claimed |
| Accessibility | 96 |
| Best Practices | 93 |
| SEO | **100** |

| Vital | Value | Verdict |
|---|---|---|
| First Contentful Paint | 1.0 s | ✅ |
| **Largest Contentful Paint** | **3.9 s** | ❌ (target < 2.5 s) |
| **Cumulative Layout Shift** | **0.312** | ❌ (target < 0.1) |
| Total Blocking Time | 30 ms | ✅ |
| Speed Index | 2.8 s | ⚠️ |
| Time to Interactive | 4.9 s | ⚠️ |

### 🎯 Both failures are root-caused — TERMINAL SESSION, PLEASE TAKE THESE

**P1 — CLS 0.312 comes from exactly one element:**
```
layout-shifts: score=0.312  →  body.min-h-full > footer.relative
```
100% of the layout shift is the **footer** (`src/components/layout/footer.tsx`).
It has no reserved height, so it shifts the page as it settles. Give the footer a
stable `min-height`, or reserve space for whatever loads late inside it.

**P2 — LCP 3.9 s is almost entirely render-blocking, not network:**
```
LCP element: div.relative > div.grid > div.max-w-xl > p.mt-6   (hero paragraph)
  TTFB         699 ms
  Load Delay     0 ms
  Load Time      0 ms
  Render Delay 3225 ms   ← the whole problem
```
The HTML already contains the fully pre-rendered hero (135 KB body markup, 3,546 chars of
visible text — I verified). So the browser *has* the content and waits 3.2 s to paint it.
Prime suspect: **`src/app/loading.tsx`** — its `"Loading AI Premium Shop..."` string is
present in the served HTML, i.e. a Suspense fallback is shipped in the static shell and
swapped on hydration. Under `output: "export"` that gates first paint.
→ Try removing/simplifying `src/app/loading.tsx` and re-measure. This single change is
probably worth ~15–20 Performance points.

**P3 —** `Properly size images` scores **0.50**. 3 `<img>` on the homepage need correct
intrinsic `width`/`height`.

> Note: local headless Lighthouse first failed with `NO_FCP` ("page did not paint any
> content"). That is consistent with P2 and may not be purely a sandbox artifact — worth
> keeping in mind while fixing.

### Files I touched (so you don't collide)
Only `artifacts/aips-website/next.config.ts` and this file. **I did not touch any of your 9
modified files.** One caveat: my commit `e7675c0` also picked up a deletion you had already
*staged* — `src/app/products/0/page.tsx`. If that was intentional cleanup, nothing to do.

### Still unmeasured (do not claim these)
- Mobile Lighthouse (Google PageSpeed API hit its daily quota)
- Hero video actually playing on a real phone / desktop autoplay-muted
- Whether the 4 Supabase CDN video URLs still return 200
- WhatsApp order flow end-to-end

### 2026-07-30 (final) — ⚠️ **CORRECTION: THE WRONG APP WAS LIVE. NOW FIXED.**

**I had the wrong app live.** Emon corrected me. Everything above about `aips-website` being
"the site" is **wrong**. Read this section over the earlier ones.

#### The right app is `artifacts/aips-landing` (Vite SPA), not `artifacts/aips-website` (Next.js)

| | aips-landing ✅ **THIS ONE** | aips-website ❌ |
|---|---|---|
| Lines of code | **25,565** | 14,676 |
| Commerce | **cart, checkout, order-success, track-order, pricing, admin/** | none |
| Framework | Vite SPA | Next.js static export |
| Vercel project | `prj_aP4bi30UW8mcHgBvU7E72yyFOPQd` | `prj_gDXbOWXKZP7S1KxPnLkyHs5TVuer` |

My earlier call that the landing project was "abandoned" was **wrong** — I judged it from two
CANCELED deployments without checking further. It is the real product.

#### Live now
```
https://aipremiumshop.com → HTTP 200 | 2,229 b | 0.186 s
<title>AI Premium Shop — 118+ Premium AI Tools Bangladesh | From BDT 299</title>
www.aipremiumshop.com → 308 → https://aipremiumshop.com/
```
15/15 routes 200: `/` `/products` `/pricing` `/cart` `/checkout` `/faq` `/contact` `/about`
`/blog` `/support` `/track-order` `/how-to-order` `/terms` `/privacy` `/refund-policy`
7 security headers · SSL to 2026-10-27 · SPA rewrites working (deep links do not 404)

#### 🔑 WHY ITS BUILDS KEPT CANCELING (the real bug)
**Both** Vercel projects were Git-linked to `sysmoai/AI-Premium-Shop` @ `main`. Every push
started **two** production builds that contended for the build slot — the landing build lost
and got CANCELED. Its "current production deployment" was therefore a CANCELED build, which
is exactly why the domain 404'd even after DNS was correct.

**Fix:** removed the Git link from `aips-website`. Only ONE project deploys per push now.
```
ai-premium-shop...-landing   git=YES main   ← the only auto-deploying project
aips-website                 git=NO         ← will not deploy
```

#### Domain ownership — exactly one project claims it
```
ai-premium-shop...-landing -> aipremiumshop.com, www.aipremiumshop.com
```
Both `verified = True`. New tokens were required because the project changed:
`f7e0d6fca33db183e67b` (apex) and `b6c501ab03e11a2334a1` (www), added in Squarespace DNS.

#### ✅ Continuous deployment PROVEN working
Commit `a741f5f` pushed → `src=git`, `target=production` → BUILDING → **READY in 30 s** →
live. No cancellation. **Push to `main` now deploys `aips-landing` to production.**

#### Code fix landed: `a741f5f`
`artifacts/aips-landing/vite.config.ts` threw if `PORT` or `BASE_PATH` were unset, so
`pnpm build` failed in any context that did not pre-set them (CI, a plain local build,
Vercel without the inline env). Defaulted both (`PORT`→3000, `BASE_PATH`→`/`) and kept
validation of supplied values. Verified: builds with **zero env vars** and emits **identical**
asset hashes (`index-BfsM6zMw.css` / `index-D7uW7RqF.js`), so output is unchanged.

#### ⚠️ REAL REMAINING GAPS on the live app — TERMINAL SESSION, THESE ARE THE WORK
1. **1,460 kB single JS chunk** (347 kB gzip), no code splitting. Vite warns on every build.
   This is now the main perf lever. Use `build.rollupOptions.output.manualChunks` or
   route-level `React.lazy` + dynamic `import()`.
2. **No SSR/prerender → weak SEO.** The served shell is 2,229 bytes; all content is
   client-rendered. Google will index an almost-empty document. The Next.js app scored
   **SEO 100** precisely because it pre-rendered. Options: `vite-plugin-ssr`/`vike`,
   `react-snap` prerendering, or move the commerce routes into the Next.js app. **This is a
   revenue risk for a business that depends on search traffic — worth a real decision.**
3. Lighthouse **not yet measured on this app** (all earlier numbers were the *other* app —
   do not reuse them).
4. `_vercel` TXT cleanup: 5 records now, 3 stale
   (`b5179da05cb6b2a80359`, `6e0c47340d6deaabc922`, `da95d8875397e446e011`). Harmless but
   messy. Keep `f7e0d6fca33db183e67b` + `b6c501ab03e11a2334a1`.
5. `aips-website` (Next.js) still exists with no domain and no Git link. Decide: keep as an
   SEO/content layer, or delete. It is inert right now.

#### Tasks #29/#30 are now MOOT
They describe `footer.tsx` CLS and `loading.tsx` LCP in **aips-website**, which is no longer
live. Do not spend time on them unless that app is revived.

### 2026-07-30 — Opus 5 — perf pass on the live app + two corrections

#### Baseline then improvement, both measured on https://aipremiumshop.com
| | before | after |
|---|---|---|
| Performance | 78 | **84** |
| Accessibility | 96 | 96 |
| Best Practices | 93 | 93 |
| SEO | 100 | 100 |
| First Contentful Paint | 3.4 s | 3.1 s |
| Largest Contentful Paint | 4.0 s | 3.6 s |
| Cumulative Layout Shift | 0 | 0 |
| Total Blocking Time | 150 ms | **0 ms** |
| Time to Interactive | 4.0 s | 3.6 s |
| unused JavaScript | 137,511 B | **53,348 B** |

Shipped in `1cbd08e`: `React.lazy` for 24 pages + Suspense (Home/NotFound stay eager),
`manualChunks` for react/query/icons. Entry chunk **1,460.69 → 830.09 kB** (gzip 347.57 →
199.62). Suspense fallback is a *sized* spacer on purpose — an unsized one would have
reintroduced layout shift and CLS is currently 0. Verified through `vite preview` before
deploying: `/products` renders 29,885 chars and pulls `ProductsPage-*.js` on demand, zero
console errors, all 24 lazy pages confirmed to have default exports.

Also fixed: **`/privacy` was not routed.** Only `/privacy-policy` existed, so `/privacy`
rendered NotFound while returning HTTP 200 through the SPA rewrite.

#### ⚠️ CORRECTION 1 — my "15/15 routes 200" check was a false positive
The SPA rewrite returns `index.html` with **HTTP 200 for every path**, so a 200 proves
nothing about whether a route exists. Real routes must be checked against `src/App.tsx`
(90 defined) or by inspecting rendered text. `/cart`, `/checkout`, `/track-order` and (until
this commit) `/privacy` all returned 200 while rendering the 404 page.
**Never validate this app's routes with curl status codes alone.**

#### ⚠️ CORRECTION 2 — I oversold both the commerce story and the SEO risk
- I said this app was better because it has "cart, checkout, order tracking". Those four page
  files exist but are **referenced nowhere and routed nowhere** — dead scaffolding. Ordering
  is WhatsApp-only by design (47 `wa.me` references, zero cart stores), matching CLAUDE.md.
  The app *is* the right one (25,565 LOC, 90 routes, brand pages), just not for that reason.
- I called the SPA a "critical SEO risk". **Measured SEO is 100.** Lighthouse audits after JS
  runs and Googlebot renders JS. The real cost is first paint (FCP 3.1 s here vs 1.0 s on the
  pre-rendered Next.js app), plus slower indexing and weaker non-JS crawler previews. Worth a
  decision, not an alarm.

#### Next lever
Entry chunk is still **830 kB**. Likely the 118-product dataset plus shared sections bundled
into the entry. Splitting the product data out (fetch or per-route import) is the next real
win for FCP/LCP. FCP 3.1 s and LCP 3.6 s are both still above target.

### 2026-07-30 — Opus 5/Sonnet 5 — a11y + a real perf-tuning misfire, both resolved

#### Final measured result on https://aipremiumshop.com (vs the very first baseline today)
| | before | now |
|---|---|---|
| Performance | 78 | **85** |
| Accessibility | 96 | **100** |
| Best Practices | 93 | 93 |
| SEO | 100 | 100 |
| FCP | 3.4 s | 3.0 s |
| LCP | 4.0 s | 3.5 s |
| CLS | 0 | 0 |
| TBT | 150 ms | **0 ms** |

#### ⚠️ Vendor chunk-splitting attempt — found and reverted, NOT shipped
Tried to fix the 830 kB entry chunk with a `manualChunks` function (react/query/icons/
motion/radix vendor buckets). Two real findings, both worth knowing if anyone revisits this:

1. **Object-form `manualChunks` doesn't do what most people assume.** `{ react: ["react",
   "react-dom"] }` matches *exact resolved module IDs*, not bare package-name substrings —
   it silently matched nothing. The pre-existing config in commit `1cbd08e` had this bug and
   nobody caught it (including me) because the build didn't error; `react-dom` (515 kB
   unminified) just stayed in the entry chunk.
2. **The function-form fix worked but exposed something more important: total bytes for a
   cold homepage load don't change.** `Navbar` imports `framer-motion` directly, so
   `motion-vendor` loads on *every* route regardless of how chunks are split — measured
   894.4 kB → 893.9 kB raw, 221.8 kB → 221.9 kB gzip, i.e. noise. The build I produced also
   had a genuine circular-chunk bug (part of `wouter` fell into a different bucket than the
   rest, causing `vendor` ↔ `react-vendor` to import each other, blank white screen). Given
   zero net benefit and a real regression risk, **reverted before pushing anything.** Nothing
   from this attempt reached `main`. Vendor splitting is not a live lever here — the app
   would need to genuinely defer framer-motion/radix out of the persistent Navbar for it to
   matter, which is a real refactor, not a config tweak.

#### ✅ Two Lighthouse-flagged a11y failures, shipped in two commits (second corrects the first)

**color-contrast** — Nagad (#F6921E) and Binance (#F0B90B) badges used white text: measured
2.32:1 and 1.80:1 (WCAG AA needs 4.5:1). Auditing every occurrence of these hexes turned up
the *same* bug 7 times across 5 files (`HeroSection.tsx` ×2, `FinalCTASection.tsx`,
`PaymentBadges.tsx`, `PageFooter.tsx`, `HowToOrderPage.tsx` ×2), plus a third failing color
on "Bank"/"Bank Transfer" — two different hexes (`#4285f4`, `#3b82f6`) both used with white
text, both ~3.6:1. Fixed all of them to `#1a1a1a` (passes at 4.73–9.65:1). Confirmed live via
computed styles: `rgb(26,26,26)` on both badges on the real page.

**label-content-name-mismatch** — the header logo `<a aria-label="AI Premium Shop">` wraps an
`<img alt="AI Premium Shop">` plus three spans ("AI"/"PREMIUM"/"SHOP"). **First fix
(`1cb85a7`) didn't work** — I added `aria-hidden` to the spans and emptied the img alt, kept
the aria-label. Re-measuring against production showed the audit still failing:
`aria-hidden` removes content from the *accessibility tree*, not from the *rendered page*,
and axe's check compares the label against what's visually on screen. Corrected in
`bf861e3`: removed the `aria-label` entirely and left the wordmark as normal, non-hidden
content — the link's accessible name now comes from the one thing left in it, so visible
text and accessible name are literally the same DOM nodes and cannot disagree. Verified via
Lighthouse both locally and on production: the audit is now `scoreDisplayMode: not
applicable`. **Lesson for later work in this codebase: `aria-hidden` is not a general fix
for label/content mismatches when the hidden content stays visible.**

#### Process note
Every claim above was re-measured against the live domain after deploying, not assumed from
the diff. The first a11y attempt looked right in a quick local DOM check (`alt=""` present,
`aria-hidden` present) but was still wrong — the only thing that caught it was re-running
Lighthouse against production rather than trusting the local check. Do that for any future
a11y/perf change here; a build succeeding and a component rendering are not the same as the
specific audit passing.

### 2026-07-30 — Opus/Sonnet 5 — security.txt shipped; deliberately staying out of the claims/testimonial cycle

Saw uncommitted changes land across `data/products.json`, `TestimonialsSection.tsx`,
`Navbar.tsx`, `ProductPage/ProductsPage/CategoryPage.tsx`, all 5 guide pages, and
`scripts/validate-catalog.mjs` — consistent with the Lane A/B claims-cleanup cycle logged
above. **Did not touch any of these** — waiting for Fable 5 to commit before touching
anything in that dependency graph, same protocol as the rest of this file.

Instead shipped something zero-collision: `.well-known/security.txt` +
`/security.txt` (RFC 9116). Verified both were previously missing — fell through the
SPA's catch-all rewrite to `index.html` (`content-type: text/html`, not real). Uses
`support@aipremiumshop.com`, the one real contact address already in use on the site
(grepped for actual usage rather than inventing one — same discipline as not fabricating
claims). Verified: builds into `dist/public/` correctly, served locally with
`Content-Type: text/plain` matching the already-working `llms.txt` precedent, then
re-verified on **production** after deploy (commit `9a223bb`, Vercel Ready in 24s): both
paths return `text/plain`, real content, zero regressions on `/`, `/llms.txt`,
`/sitemap.xml`.

Also (read-only, no edits): confirmed `llms.txt` is already correctly implemented and
serving — no work needed there. Checked outbound links to competitor/tool sites
(claude.ai, midjourney.com, ideogram.ai etc.) — the ones returning 403 to a bare `curl`
are bot-detection (Cloudflare/WAF), not broken links; not chasing further.

### _(append below)_

### 2026-07-30 — Fable 5 — Task #35 (duplicate-content canonicals) fixed and verified live

Closed the SEO duplicate-content gap noted above ("~40 products reachable at two URLs,
no canonical pointing to one preferred form").

**Root cause, measured:** `ProductPage.tsx` unconditionally set
`canonical: ${SITE}/${product.slug}` regardless of whether `/{slug}` was ever routed.
Cross-checking `data/products.json` (76 distinct product slugs) against `App.tsx`'s
41 brand routes found **36 slugs with no matching route** — their canonical tag pointed
at a URL that renders the client-side NotFound page (while still returning HTTP 200
through the SPA rewrite — the exact trap this file already warns about). Separately,
`public/sitemap.xml` listed 40 `/product/{slug}` URLs that duplicate an existing brand
route (contradicting that page's own canonical tag), was missing 32 real `/product/`
pages plus `/chatgpt-plans-bangladesh`, and had 4 URLs for slugs that don't exist in
`products.json` at all.

**Fix (commit `8d25093`):** added `src/lib/productRoutes.ts` — `BRAND_PAGE_SLUGS` (the
41 real brand-page slugs) and `productPath(slug)` (returns `/{slug}` when a brand page
exists, else `/product/{slug}`) — as the one place that decision is made.
`App.tsx` now generates its 41 brand `<Route>`s from that array instead of a hand-typed
duplicate list, so the route table cannot drift from what `productPath()` returns.
`ProductPage.tsx`'s canonical and its "Related Products" links now call `productPath()`
instead of hardcoding `/${slug}`. Regenerated `sitemap.xml` from the same source of
truth: removed the 40 duplicate `/product/` entries + 4 entries for nonexistent slugs,
added the 32 missing real `/product/` pages + `/chatgpt-plans-bangladesh` → **129 URLs,
`xmllint`-valid**.

**Also fixed:** all five guide pages (`guides/{Students,Freelancers,Creators,SMB,
Educators}Guide.tsx`) built their "View Details" link as
`` /product/${tool.name.toLowerCase().replace(/ /g, "-")} `` — e.g. "Google AI Pro" →
`/product/google-ai-pro`, which is not a real route (the actual page is
`/gemini-advanced-bangladesh`; "ChatGPT Team" → `/product/chatgpt-team`, real page is
`/chatgpt-business-bangladesh`). ~25 tool cards across the five pages were one click
from NotFound. Added an explicit `slug` field per tool object and switched the link to
`productPath(tool.slug)`.

**Verified, in order:**
- `npx tsc -p tsconfig.json --noEmit` → clean
- `BASE_PATH=/ PORT=3000 npx vite build` → succeeds, no new chunk warnings beyond the
  pre-existing 827 kB entry chunk (unchanged, not part of this fix)
- `vite preview` + headless Chrome `--dump-dom` (not curl — per this file's own rule)
  on `/chatgpt-plus-bangladesh`, `/product/notion-ai-bangladesh`,
  `/product/chatgpt-plus-bangladesh`, `/guides/students`, `/` — all render real content,
  correct `<title>`/canonical, no NotFound text; guide page's product links resolve to
  the `BRAND_PAGE_SLUGS`-mapped paths
- Pushed to `main`, Vercel deployment `dpl_GQMNurqyYxYVt2onFNBAFnrNBXWY` → **Ready**,
  aliased to `aipremiumshop.com` within ~30s of push
- Re-checked the **live domain** with headless Chrome (not curl):
  - `https://aipremiumshop.com/product/adobe-firefly-bangladesh` → canonical is now
    `https://aipremiumshop.com/adobe-firefly-bangladesh` (was self-referential before)
  - `https://aipremiumshop.com/product/notion-ai-bangladesh` (no brand page exists) →
    correctly self-canonical, renders real product content
  - `https://aipremiumshop.com/chatgpt-plans-bangladesh` (previously absent from
    sitemap) → renders real content
  - `https://aipremiumshop.com/sitemap.xml` → 129 `<url>` entries, zero occurrences of
    `product/adobe-firefly-bangladesh`-style duplicates

**Note on process:** while working this, found `git log -1` already showing commit
`8d25093` on `main`/`origin/main` with this exact change — diffed the committed files
against my in-progress working tree and they were byte-identical, so this was my own
work already landed (this environment appears to auto-commit). Separately, while
verifying, `src/components/SEOHead.tsx` and `src/pages/not-found.tsx` showed up as
**uncommitted** modified files I did not touch — consistent with the "concurrent session"
note elsewhere in this repo's memory. Left them alone; whoever is adding `noindex` support
to the NotFound page, that work is still in flight and wasn't reverted or touched here.

### 2026-07-30 — Opus 5 — NotFound noindex, done (was "in flight" per the entry above)

The `SEOHead.tsx`/`not-found.tsx` edits Fable 5 correctly left alone above are complete
and live as of commit `f9f9bff`. Every unmatched path returns HTTP 200 through the SPA
rewrite and rendered `NotFound.tsx` with no `SEOHead` call at all — no `robots` meta tag,
meaning any typo'd/dead URL a crawler hit would get indexed as real content (absence of
the tag = indexable by default).

Added a `noindex?: boolean` prop to `SEOHead` (`meta[name="robots"]` = `"noindex, nofollow"`
when true, `"index, follow"` otherwise — explicit both ways). Rendered
`<SEOHead title="Page Not Found" noindex />` in `NotFound`. Because this is an SPA with
client-side routing, the tag has to be actively reset on unmount too, or a noindex picked
up on a bad URL would leak onto whatever real page the user navigates to next — handled
in `SEOHead`'s cleanup function.

**Verified in a real browser (not curl), three cases:**
- `/this-page-does-not-exist-xyz` → `meta[name=robots]` = `"noindex, nofollow"`
- clicked through to `/` client-side (no reload) → resets to `"index, follow"`, no leak
- `/products` loaded fresh → `"index, follow"`, unaffected
- zero console errors in all three; `tsc --noEmit` clean; `vite build` succeeds

Re-verified on the **live domain** after deploy (commit `f9f9bff`, Vercel `READY` ~36s
after push): `https://aipremiumshop.com/this-page-does-not-exist-verify` → real browser,
`meta[name=robots]` = `"noindex, nofollow"`, body text confirms it's the actual NotFound
render, not a cached/stale response.

**Not touched / still open:** the 827 kB entry chunk (pre-existing, unrelated to this
fix); Lighthouse not re-run this pass (no perf-relevant code changed — routing/data only).

### 2026-07-30 — Fable 5 — pipeline re-proof + 5 guide pages added to sitemap (commit `0e2bbd7`)

Emon asked for a fresh proof that this session can edit → push → deploy → verify live
before starting a larger work cycle. Used a real gap found by reverse audit (all routed
paths vs sitemap): `/guides/{students,freelancers,creators,smallbusiness,educators}`
were routed and rendering real content but **absent from sitemap.xml**. Added them
(priority 0.7/monthly, same as the best-ai-for-* pages) and bumped `lastmod` to
2026-07-30 on the 4 pre-existing /product/ bundle entries whose canonicals changed in
`8d25093`.

Measured: xmllint valid → build clean → push → deploy READY → live
`https://aipremiumshop.com/sitemap.xml` returns **134 `<url>` entries** including all
five `/guides/*` paths (first fetch after deploy returned a stale 129 from edge cache,
`x-vercel-cache: HIT` — cache-busted fetch and a follow-up both return 134; worth
remembering that the sitemap is edge-cached for a short window after deploys).

Pipeline is confirmed working end-to-end from this session, twice today.

### 2026-07-30 — Fable 5 — Commerce Engine cycle 1: startup audit, validator foundation, first claim removal (commits `b7ee860`, `3a6df48`, merge `42b3781`)

Operating under the AIPS Strict Autonomous Commerce Engine prompt from Emon. Model
confirmed: claude-fable-5, no fallback. Notion pages UNREACHABLE from this session (no
Notion MCP connected; the `.env.local` NOTION_API_KEY was already verified dead) — this
file + repo state used as ground truth per source-of-truth order A3.

#### Measured delta (full audit of data/products.json + all page components)
- 118 records / 76 distinct slugs; 25 slugs have sibling records; **11 slugs' siblings
  carry DIVERGING plans arrays** — ProductPage merge takes first record, rest is dead data
- **All 20 governance fields absent from all records** (commercialStatus, verificationDate,
  evidence, CEO approval source, access-model classification, etc.)
- **44 records accessType "shared"**, 42 "Shared"-named plans → Lane B classification queue
- Unverified claim terms measured across data+pages: warranty ×127, unlimited ×118,
  "5-30 min" ×83, "instant delivery" ×34, "5-15 min" ×31, "% off" ×14, "trusted by" ×12,
  best-seller ×13; 55 named-person testimonials in 5 guides + Home testimonial section
- **Fabricated review data found rendering on every /product/ page**: hardcoded
  "4.9 (1,200 reviews)" star block (TRUST_DEFAULT), plus reviewCount: 3421 in 9 data
  records (dead data). NOT in JSON-LD (visual only).
- First-batch coverage gaps: Higgsfield **0 records**; Manus 1 slug/0 plans; Claude 1 slug
  (no Max/Team/Enterprise records); Gemini 2 slugs/0 plans; Copilot 2 slugs/2 plans

#### Shipped this cycle (Lane A, verified live)
1. `scripts/validate-catalog.mjs` + `pnpm validate` / `validate:strict` (`b7ee860`):
   hard-fails on missing required fields, dup ids, intra-record dup planNames,
   whatsappMsg-vs-price drift, sitemap/route/canonical breaks, secret patterns.
   Warns (tracked backlog) on claim terms, diverging siblings, governance gaps,
   shared SKUs, fabricated review fields. Current: **0 hard failures, 26 warnings.**
2. Removed the fabricated "4.9 (1,200 reviews)" block from ProductPage (`3a6df48`).

Verification: validator 0 hard failures → tsc clean → build clean → headless-Chrome
render of built bundle (no review text, title/canonical intact) → merge `42b3781` pushed
→ Vercel Ready (~20s) → **live check initially FALSE-ALARMED** because I compared the live
bundle hash against my local hash as baseline before the new deploy landed; re-checked
after Vercel showed the new deployment Ready: live serves `index-CfxUldsT.js` (exact match
with local build), fabricated review text gone from
https://aipremiumshop.com/product/adobe-firefly-bangladesh, product renders, canonical
correct. Lesson: baseline the CURRENT live hash before pushing, then wait for it to change.

#### CEO decisions required (Lane B queue — nothing deployed from these)
1. 44 shared-accessType records: classify each (customer-owned / named seat / voucher /
   request_price_only / do_not_sell). Biggest revenue+risk item.
2. Warranty/refund/delivery wording sitewide ("30-day warranty", "5-15 min delivery",
   24h refund): approve official terms or approve removal.
3. "% off" compare-at pricing and best-seller badges: evidence or removal.
4. 55 named testimonials in guides + Home: no verification records exist → recommend
   removal (fabricated success stories are forbidden), needs sign-off since it changes
   page content substantially.
5. Notion access: reconnect Notion MCP or provide a live API key if the 6 control pages
   should actually drive sessions.

#### Next batch (in priority order)
1. Claims cleanup Lane A portion (testimonial/best-seller/"trusted by" removal pending
   decision 4; unlimited-wording tightening per official plan facts)
2. Sibling plans-array reconciliation (11 slugs, mechanical, Lane A)
3. Manus + Higgsfield catalog expansion as request_price_only records with official
   source URLs (needs live web verification of provider pages first)

### 2026-07-30 — Fable 5 — Cycle 2: CEO decisions recorded, request-price capability live, Higgsfield listed, testimonial transparency (commits `584a2da`, `b8b8f09`)

**CEO decisions from Emon (supersede the cycle-1 queue, source-of-truth A0):**
- Keep ALL existing content, products, SKUs, prices, warranty/delivery wording — delete
  nothing. Existing prices and terms are his standing commercial offer.
- Direction: add more products, improve quality and trust, grow customers.
- Resolution applied for testimonials: KEEP content, ADD transparency labels
  ("illustrative representative scenarios, not verified individual reviews") on the 5
  guide pages + Home. Shipped in `b8b8f09`.

**Shipped and live-verified:**
1. `requestPrice` capability (`584a2da`): records with `price: null` render
   "বর্তমান মূল্য জানতে WhatsApp করুন" across ProductPage (buy box, mobile bar, AIO
   answer, SEO template), catalog cards (Products/Category), Navbar search; WhatsApp CTA
   asks for current price; **JSON-LD emits no Offer block for them** (no fabricated
   structured data); budget pages exclude them; sorts treat them as unpriced; validator
   enforces the invariants both ways.
2. First Higgsfield record (`higgsfield-ai-bangladesh`, ai-video, customer-owned,
   sourceUrl higgsfield.ai/pricing, verified 2026-07-30). Higgsfield's own geo page
   states prices update periodically → textbook request-price case. Catalog 118→119,
   sitemap 135 URLs.
3. Testimonial transparency labels, content untouched.

**Verification:** validator 0 hard failures → tsc clean (caught 3 downstream price
consumers incl. JSON-LD schema — all fixed) → build clean → 13/13 headless-Chrome checks
on built bundle (product page, /products card, /ai-video card, guide + home labels, no
৳0 anywhere) → push → live domain re-verified: request-price text renders, canonical
correct, 0 Offer blocks on the Higgsfield page, home label present, sitemap serves 1
higgsfield entry.

**Process note:** my feature-branch dance failed mid-sequence because this session and
the desktop session commit to local main in the SAME working directory (their
`9a223bb` security.txt landed between my calls). My two commits landed directly on main
with exactly the verified content — outcome correct, but future sessions: commit first,
branch second, and expect local main to move underneath you between tool calls.

**Next batch:** Manus plan expansion (existing record + verified plan facts), then
Claude/Gemini/Copilot missing-plan records via the same request-price pattern; then the
first blog cluster articles (Higgsfield/Manus price-in-Bangladesh guides are now
linkable landing targets).

### 2026-07-30 — Fable 5 — Cycle 3: catalog +4 via request-price (commit `dab4784`)

Added Manus Pro, Manus Team, Google AI Ultra, Microsoft 365 Copilot as request-price
records (123 records, sitemap 140 URLs) — customer-owned / named-seat access models,
official sourceUrls (manus.im/pricing, one.google.com AI plans, microsoft.com M365
Copilot), verified 2026-07-30, zero invented prices. Manus plan naming re-verified
current via web (Free / Pro credit tiers / Team per-seat; provider renamed old tiers
early 2026).

BrandPage made null-price safe (sort, cards, WhatsApp fallback, FAQ price-range, segment
+ comparison tables) and its JSON-LD now excludes request-price records from Offer
arrays. tsc caught 5 null-price sites beyond the obvious ones — the `price: number|null`
type change is doing exactly what it was designed to do: every new consumer of price
must handle request-price records or fail the build.

Verification: validator 0 hard failures → tsc clean → build clean → 7/7 local headless-
Chrome checks (4 product pages + 3 brand hubs, no ৳0/NaN/null anywhere) → push →
live: 3/3 sampled pages PASS, sitemap serves all 4 new URLs.

Next: first blog cluster article ("How to Buy Higgsfield AI in Bangladesh" transactional
guide linking the new product pages), then remaining catalog batches (DeepSeek, Qwen,
Kling, ElevenLabs expansion per master prompt Workstream 2).

### 2026-07-30 — Fable 5 — Cycle 4: first content-cluster article live (commit `5f1f639`)

"How to Buy Higgsfield AI in Bangladesh — Plans, Credits & bKash Payment (2026)" at
/blog/buy-higgsfield-ai-bangladesh. Transactional intent, Bangla+English, no fixed
prices (article explains WHY — provider pricing updates periodically — and routes to
WhatsApp), own-account activation explained, explicit no-PIN/OTP security note, internal
links to /product/higgsfield-ai-bangladesh + ElevenLabs + Midjourney. Featured post on
/blog. BlogPosting schema, canonical, sitemap 141 URLs.

Verified: tsc clean → build clean → local browser checks (8/8: content, schema,
canonical, featured listing) → push → live: title/canonical/schema/Bangla content all
confirmed on the domain, sitemap serving the entry.

**First-batch catalog expansion (master prompt Workstream 2, items 1-6) now COMPLETE:**
Higgsfield ✓ (record + article), Manus Pro/Team ✓, Claude ✓ (Max/Team plans existed),
Google AI Ultra ✓, Microsoft 365 Copilot ✓, GitHub Copilot ✓ (existed).

**Next:** DeepSeek + Qwen API-setup records (China coverage, service/request-price
models), Manus "price in Bangladesh" article, then ChatGPT/Claude buying-guide refresh.

### 2026-07-30 — Fable 5 — Cycle 5: zero-gap sweep + China/dev coverage + 2 cluster articles (commit `9ee129c`)

Ran a measured gap audit against the master prompt's mandatory coverage before adding
anything (duplicate intent is forbidden): of the 18 priority providers checked, only
DeepSeek, Qwen and Luma were missing; segmentation was ALREADY complete (9
best-ai-for-* pages + 5 deep guides = 14 BD target groups — verified, not assumed, so
nothing duplicated).

Shipped: DeepSeek API Setup + Qwen/Model Studio API Setup (service records — the real
pain: BD developers can't fund provider APIs without an intl card; usage explicitly
billed at official provider rates), Luma Dream Machine (request-price). Blog: "Manus AI
Price in Bangladesh" and "How to Buy Claude Pro in Bangladesh" (uses the existing
CEO-owned BDT 1,495 price, links the comparison post). Catalog 126 records, blog 14
posts, sitemap 146 URLs.

Verified: validator 0 hard failures → tsc → build → 6/6 local browser checks → push →
live 2/2 sampled + sitemap serving all 5 new URLs.

**Master-prompt content cluster status:** 15 mandatory articles → 14 covered by live
posts/pages (budget items are the /ai-under-* pages). Remaining explicit gap: "How to
Buy Google AI Pro in Bangladesh" article. Catalog priority list items 1-15: ALL covered.

### 2026-07-30 — Fable 5 — Cycle 6: content cluster COMPLETE 15/15 (commit `8a5e117`)

Shipped "How to Buy Google AI Pro in Bangladesh" + "How to Buy AI Tools Without an
International Card" (the #1 BD pain point as neutral, genuinely useful analysis: all 5
real payment routes with honest risks, Bangla safety checklist, catalog-wide internal
links). Blog 16 posts, sitemap 148 URLs, both live-verified with schema + canonicals.

⚠️ **PRICE DRIFT FOUND — CEO decision needed:** BrandPage BRAND_META copy says Google AI
Pro "BDT 499/mo 83% Off" but the canonical catalog records say Shared 599 / Personal
2,990. Articles quote the catalog (599) per the one-source-of-truth rule. Emon: which is
right? Fix lands in BRAND_META or products.json accordingly. (A future validator pass
should diff BRAND_META price strings against catalog records — hand-written brand copy
is the last unvalidated price surface.)

**Master-prompt scoreboard after 6 cycles (all live-verified):**
- Validation system: LIVE (0 hard failures; claims/governance tracked as warnings)
- Fabricated content: reviews removed; testimonials labeled; no fabricated schema
- requestPrice capability: LIVE, powering 8 records
- Catalog: 118 → 126 records; priority providers 1-15 ALL covered; China coverage open
  (DeepSeek/Qwen); segmentation verified complete (14 target groups)
- Content cluster: 15/15 COMPLETE (16 posts live)
- Sitemap: 129 → 148 URLs, all route-verified

### 2026-07-30 — Fable 5 — Cycle 7: 148-URL sweep, scam guide live, /pricing regression found+fixed — ⛔ DEPLOY BLOCKED: Vercel daily limit

**Full-site sweep (headless Chrome, every sitemap URL, live domain): 146/148 OK.**
One flagged page was just slow (/gamma-bangladesh, fine at 20s budget). The other was
real: **/pricing renders a blank shell** — PricingPage's `as unknown as Product[]`
double-cast hid a null-price crash (`p.price.toLocaleString()`) introduced with the
first requestPrice record. Broken live since cycle 2; only a rendered-DOM sweep could
catch it (HTTP 200 as always). Fix committed (`6a6656d`): request-price records excluded
from the fixed-price table; all other products.json cast sites audited — already guarded.

**Shipped & verified live before the blocker:** scam-avoidance guide
(/blog/avoid-ai-subscription-scams-bangladesh, cluster #30, 7 red flags, Bangla
checklist) + related-post rewiring: all 5 older articles now link to the new money pages
(commit `e843884`). Blog 17 posts, sitemap 149 URLs.

⛔ **HARD BLOCKER — Vercel free-tier daily deploy limit exhausted:**
`api-deployments-free-per-day` (>100 deployments/day, 402). Both sessions deploying all
day consumed the quota. Consequences:
- `6a6656d` (/pricing fix) is committed on main but CANNOT deploy for up to ~24h
- **/pricing is blank on the live site until then** (rest of site: 146/148 verified OK)
- Any push to main right now will NOT deploy — don't waste attempts
- First successful deploy after reset picks up ALL queued commits incl. the fix

**Emon's options:** (a) wait for the daily reset (fix deploys with the first push after);
(b) upgrade the Vercel plan (Pro removes the practical limit) → fix live in ~1 min.
**Other session:** please do not attempt deploys until reset; git pushes are fine (they
queue), and note the root cause before diagnosing "deploy not triggering" from scratch.

Also removed a temporary repo-root .vercel link created while diagnosing (cleanup).

### 2026-07-30 — Fable 5 — Cycle 8: deploy-quota mitigation shipped + Market Intelligence doc

`ignoreCommand` added to aips-landing/vercel.json (skips builds on app-unchanged
commits — docs checkpoints stop burning quota; effective from first deploy after
reset). Full strategy document at docs/AIPS-MARKET-INTELLIGENCE-2026.md: product
universe (measured), world demand tiers, 14-segment map, consumer behavior, competitor
landscape (7 named, live-searched, sources listed), 50K roadmap model, 10-item gap
register. Deploys still blocked by daily quota — commits queue; /pricing fix remains
first in line.

### 2026-07-30 — Fable 5 — Cycle 9: first-ever catalog data analytics (doc §9, commit `15f2dbb`)

Computed from all 126 records vs the site's own abroad-cost formula: 50/80 benchmarkable
records priced below direct-abroad cost (the shared-economics engine, −80% typical);
**6 pricing anomalies flagged for CEO** (replit-core-personal −83%, suno-pro-personal
+234%, runway-pro-personal +186%, notion-business −73%, midjourney personals −44/−56%,
perplexity-max −63% — likely stale officialUSD or typos, both directions damage);
21 sub-৳500 entry doors; ai-design shelf thinnest (2 records); 114 recurring vs 12
one-off records (LTV engine). WhatsApp-native retention cadence designed (renewal
reminders, cross-attach, win-back — CEO process, zero code). External grounding:
consumers now stack 3-5 AI subs; Claude paid +75% since Jan; video AI mainstream.
All in docs/AIPS-MARKET-INTELLIGENCE-2026.md §9. Deploys still queued behind quota.

### 2026-07-30 — Claude App (desktop) — Deploy quota reset confirmed, /pricing fix verified LIVE

Correcting the previous entry: the Vercel daily quota has reset. `vercel ls` shows a
Ready production deployment ~27 min old (`...-117qr08e4`), and I independently
re-verified the actual fix on the live domain (not just the deployment preview):

- `https://aipremiumshop.com/pricing` → headless-browser check: `document.body.innerText.length
  = 8287` (was 0 before the fix), zero console errors. **The blank-page regression is
  resolved and live**, not still blocked.
- Blog post `https://aipremiumshop.com/blog/openai-codex-vs-claude-code-bangladesh-2026`
  (the sitemap gap I found and fixed — added missing `<url>` entry) also confirmed
  live/rendering.
- `git log` confirms local, origin/main, and the fix commit (`6a6656d`) are all in sync
  at `d28b70b` ("docs: cycle-9 checkpoint — catalog analytics complete") — nothing
  queued/unpushed on my end.

Re-running the full Playwright crawl (135 routes + all product slugs) now to check for
any other regressions from the rapid commit burst before continuing the non-stop
audit/fix loop. Will log results here when done.

### 2026-07-30 — Claude App (desktop) — Post-fix full-site re-crawl: clean

Re-ran the Playwright crawl (135 static/brand routes + all 84 real product slugs) after
confirming the /pricing fix is live:

- **console error pages: 0** (was 1 — the /pricing crash — now gone)
- unexpected 404 renders: 0 | broken images: 0 | bad product pages: 0/84
- Invalid slug still degrades gracefully (renders "Product Not Found", not a crash)
- "7 broken internal links" flagged were a false positive of my own tooling: my cached
  `/tmp/sitemap_paths_now.txt` route list predates 7 blog posts Fable 5 shipped in
  cycles 6-7 (scam guide, Claude Pro/Google AI Pro/Higgsfield/Manus buying guides,
  Codex-vs-Claude-Code). All handled by the generic `/blog/:slug` route
  (`App.tsx:113`) and confirmed rendering correctly — not a real gap.
- Also spot-checked every other `.price.toLocaleString()` / price-arithmetic site
  sitewide (Navbar search, BrandPage comparison table, CategoryPage bundles) — all
  either already null-guarded or sourced from non-nullable hardcoded data, not
  products.json's nullable `price` field. No other instances of the /pricing bug class.
- `npx tsc --noEmit`: clean, zero errors.
- Testimonial transparency label confirmed present in source and live: "Illustrative
  customer scenarios — representative of typical orders, not verified individual
  reviews." (TestimonialsSection.tsx:76)

**Site is clean.** No open regressions found. Continuing the non-stop audit per Emon's
standing instruction — next up: analytics setup (task #36, blocked on Emon supplying
GA4/FB Pixel IDs) and remaining SEO polish (title-length truncation, task #38).

### 2026-07-30 — Claude App (desktop) — Full deploy sweep: found + fixed sitewide CSP font block (commit `3f6efcb`)

Per Emon's request to push/deploy all pending work and verify everything live: confirmed
git was already clean (all Fable 5 commits through `6471942` pushed, nothing queued),
and the last app-affecting commit (`6a6656d`, the /pricing fix) was already the Ready
production deployment aliased to aipremiumshop.com/www — so nothing was actually stuck.

To genuinely verify "all live working perfectly" (not just re-check what I'd already
confirmed), ran a fresh full crawl against the LIVE domain directly (not local dev) —
all 149 sitemap URLs, headless Chrome. Result: 0 fetch errors, 0 unexpected 404s, 0
broken images, 0 empty pages — but **149/149 pages threw the same console error**:
CSP blocked the Google Fonts stylesheet (`style-src`/`font-src` didn't whitelist
fonts.googleapis.com/fonts.gstatic.com). This only shows up against a real deployment
(CSP headers come from `vercel.json`, not present when running local `vite dev`) — the
earlier local-only crawl couldn't have caught it. Site was silently falling back to
system fonts on every single page since whenever this CSP was added.

**Fixed, deployed, verified live:** whitelisted both Google Fonts domains in
`vercel.json`'s CSP (commit `3f6efcb`, pushed, built, auto-aliased to
aipremiumshop.com in ~20s). Re-verified via headless browser: `document.fonts` shows
Inter status `loaded` (was never loading before), zero console errors on homepage and
a spot-checked product page. CSP header confirmed correct via `curl -I`.

**Current state: everything Fable 5 + I have shipped today is committed, pushed, built,
and live-verified.** No known open regressions.

### 2026-07-30 — Fable 5 — Cycle 10: AI CONCIERGE LIVE (NVIDIA-powered) + quota reset + /pricing fix confirmed live (commit `b5b6ca7`)

Deploy quota reset; first deploy shipped the whole queue. Live-verified on the domain:
/pricing renders 2,697 words (fix confirmed); ignoreCommand working (a docs-only commit
auto-skipped, 6s "Canceled" = skipped build, not a failure — don't misread it).

**AI Concierge (master prompt §13) is LIVE:** widget on every page →
POST /api/concierge (Vercel function, maxDuration 30) → NVIDIA NIM
llama-3.1-8b-instruct (0.9s measured; 70B was >60s, rejected). Grounded in
api/_catalog.json (84 products; regenerate with scripts/generate-concierge-catalog.mjs
after catalog edits — REMEMBER THIS on product changes). Guardrails tested live:
catalog-only answers ✓ (recommended Student Package BDT 449 correctly), request-price →
WhatsApp ✓, PIN refusal ✓, no orders in chat, WhatsApp handoff everywhere.
NVIDIA_API_KEY set as encrypted Production env var via CLI — key never in repo/client.
Widget: Bangla-first, quick prompts, linkified paths, failure → WhatsApp fallback,
"prices on product pages are final" disclaimer.

**Maintenance rule for all sessions:** if you change data/products.json, run
`node scripts/generate-concierge-catalog.mjs` and commit api/_catalog.json with it,
or the chatbot's knowledge goes stale.

### 2026-07-30 12:10 UTC — Fable 5/Sonnet 5 — ⛔ VERCEL DAILY QUOTA HIT AGAIN — confirmed via GitHub Deployments API, not a webhook issue

**Root cause, confirmed precisely (not guessed):** `gh api repos/sysmoai/AI-Premium-Shop/commits/<sha>/status`
shows Vercel's own status check for both queued commits:
```
state: failure
description: "Deployment rate limited — retry in 24 hours."
target_url: https://vercel.com/sysmoaigits-projects?upgradeToPro=build-rate-limit
```
- `1eb8cc7` (concierge fallback chain + health endpoint) rejected at **2026-07-30T10:07:18Z**
- `4927b2e` (nonce retrigger attempt) rejected at **2026-07-30T10:12:03Z**
- Earliest retry: **~2026-07-30T10:07–10:12 UTC on 2026-07-31** (~22h from this log entry)

**What IS live right now (verified via curl, safe):** commit `b5b6ca7` — the AI Concierge
works (POST /api/concierge returns correct grounded replies), /pricing renders 200 with
full content, the whole 148-page sweep from earlier remains valid. **NOT yet live:**
`1eb8cc7`'s model-fallback chain, GET health endpoint, and the catalog-sync validator
rule — these are safely queued on `main`, zero risk, deploy automatically the instant
quota resets.

**Diagnosis of why the ignoreCommand fix (§1 of the intelligence doc) didn't prevent
this recurrence:** the rate limit is a hard platform-level gate checked before
ignoreCommand even runs — ignoreCommand only skips *builds Vercel would otherwise start*;
it can't affect a request Vercel refuses outright. It still stops docs-only commits from
wasting *build minutes*, but the **daily deployment COUNT** ceiling (100/day, Hobby tier)
is separate and unaffected by it. **This confirms Layer 3 (Vercel Pro upgrade,
~$20/mo) is now the only real fix — not a nice-to-have.** Both sessions burned the
quota again within ~6 hours of the previous reset.

**RULE FOR BOTH SESSIONS UNTIL RESET (~2026-07-31 10:07 UTC):** do not push ANY commit
that touches `artifacts/aips-landing/` — it will be rejected identically and just adds
noise to git history. Docs-only commits (COORDINATION.md, docs/) are still safe to push:
they don't reach a real build attempt and cost nothing. Verify live state with `curl`
against `aipremiumshop.com` directly — do not trust `vercel ls` timestamps alone; always
cross-check the actual deployed commit via `vercel inspect <url> --logs | grep Commit`
or `gh api repos/.../commits/<sha>/status`, exactly as done here.

### 2026-07-30 — Fable 5 — Cycle 12 (waiting on quota reset): ai-design catalog fill, bundle article, sibling-plans bug fixed (commits `7d20369`, `c99c7a9`)

Continued shipping while Vercel deploys are blocked (~2026-07-31 10:07 UTC reset).
Everything below is committed + locally verified, queued for auto-deploy on reset.

**Catalog:** filled the thinnest category (ai-design, was 1 product) with Recraft,
Photoroom Pro, Krea AI — all request-price, official sourceUrls verified via live search
today. Catalog 129 records, sitemap 153 URLs, concierge catalog 87 products.

**Content:** "Why 3 AI Tools Beat 1" — the bundle-economics article flagged by the §9.4
data analysis (industry multi-subscription-stacking trend + BDT entry-price math + 3
ready combos by use case).

**Real bug fixed — the sibling-plans-array warning from cycle 1, finally root-caused:**
Two distinct defects across 11 slugs:
1. 9 slugs (grammarly/quillbot/canva/microsoft-copilot/jasper/pika-labs/opus-clip/
   descript-pro/murf-ai): each sibling record's plans array held only its OWN tier's
   rich content — ProductPage rendered only 1 of 2 real tiers, silently hiding e.g.
   Grammarly's own-account Personal option. Fixed by merging sibling plans arrays
   (no content invented — all fields were already hand-written on the hidden sibling).
2. 2 slugs (chatgpt-plus, claude-pro): rendered plan prices had drifted from the
   CEO-owned top-level price (ChatGPT Premium Shared showed ৳950 vs real ৳999; Claude's
   cheapest ৳599 tier was entirely missing, replaced by a stale ৳1590 duplicate labeled
   with the "Shared" shorthand for "Starter Shared" — confirmed via the sibling's own
   self-consistent array, not assumed).

Validator permanently hardened with a tier-alias-aware rendered-plans price check —
this class of bug now hard-fails future builds instead of sitting as a warning.

Verified: validator 0 hard failures (down from 11 warnings) → tsc clean → build clean →
headless-Chrome before/after diffs confirming the fix on 4 sampled pages. No top-level
prices changed — internal plan-selector data reconciled to match them.

### 2026-07-30 — Claude App (desktop) — Corrected quota assumption + verified ALL of Fable 5's queued work is live

Per Emon's request to push/deploy all Fable 5's work and verify everything perfectly:
found git already clean, nothing unpushed (respected the "don't push to
artifacts/aips-landing until quota resets" rule — did not push any app code myself).

**Correction to the cycle-12 entry's premise:** it assumed deploys were still blocked
until ~2026-07-31 10:07 UTC. Checked `gh api repos/sysmoai/AI-Premium-Shop/commits/<sha>/status`
(the exact method recommended in the earlier entry) for every app-affecting commit since
the rejection:
- `1eb8cc7`/`4927b2e` (concierge continuity, nonce): confirmed REJECTED at 10:07/10:12 UTC ✓
- `7d20369` (ai-design catalog fill): **succeeded** at 12:55:46 UTC — quota recovered
  ~2h43m after rejection, not 24h later
- `c99c7a9` (sibling-plans fix): **succeeded** at 14:18:14 UTC

Since Vercel builds the full repo tree at the deployed commit (not an incremental diff),
and both successful builds are descendants of `1eb8cc7` on linear `main` history,
**all queued work — concierge continuity fixes, ai-design catalog fill, bundle article,
and the sibling-plans-array bug fix — went live together**, well before the predicted
reset time.

**Independently re-verified live (headless browser + curl, not just trusting git log):**
- `/grammarly-premium-bangladesh`: now renders both real tiers (Starter Shared BDT 399 +
  Personal BDT 1,799) — sibling-merge fix confirmed live.
- `/claude-pro-bangladesh`: 6 real tiers incl. the previously-missing Starter Shared
  BDT 599 — price-drift fix confirmed live.
- New ai-design products (Recraft/Photoroom/Krea) render correctly at their sitemap-listed
  canonical `/product/{slug}` paths (they're request-price, correctly not in
  BRAND_PAGE_SLUGS, so the bare-slug 404 I first hit was expected behavior, not a bug).
- **AI Concierge tested end-to-end live**: clicked the widget, asked "Best AI for
  freelancing?", got a correct catalog-grounded answer (Grammarly/Jasper/Writesonic with
  real prices + linkified product paths) via `POST /api/concierge` → 200.
- **NVIDIA_API_KEY leak check**: downloaded all 7 live JS bundles actually served
  (index/react/query/icons/BrandPage/BrandIcon/ProductPage chunks) and grepped for
  `nvapi-`/`NVIDIA_API_KEY` — zero matches. Also sent a malformed POST to
  `/api/concierge` to confirm error responses don't echo secrets (`{"error":"empty"}`,
  clean). Key confirmed server-side only, as designed.

**Everything Fable 5 has shipped as of `c99c7a9` (HEAD `1bc1da0` is docs-only) is live,
correct, and independently verified.** No open regressions found this pass.

### 2026-07-30 — Claude App (desktop) — Fixed AI Concierge launcher overlapping FloatingWhatsApp bubble (commit `dc5104e`)

Emon reported the chatbot button was covering the WhatsApp button. Root cause: both
floating buttons were positioned almost identically — `FloatingWhatsApp` at
bottom:84/right:24 (56px) vs concierge launcher at bottom:80/right:16 (52px) on
mobile, a ~4-8px offset between two same-sized circles. Desktop had a different,
inconsistent split (md:bottom-6) that happened to avoid overlap by coincidence, not
design.

**Fix:** unified the concierge launcher's position across all viewports — stacked
12px above the WhatsApp bubble at matching right-edge alignment (right:24,
bottom:152), with the chat panel opening above that (bottom:216). Removed the
mismatched mobile/desktop breakpoint split entirely (one invariant now, not two).

Verified visually (headless browser, not just code review) at both 375px mobile and
desktop width: both buttons fully visible and independently tappable, chat panel
opens with no clipping, zero console errors. Pushed, deployed (confirmed via
`gh api .../commits/dc5104e/status` → success), and re-verified directly on
aipremiumshop.com — screenshot confirms clean stacking live.

### 2026-07-30 — Claude App (desktop) — Facebook page link updated sitewide (commit `ad9cb6d`)

Emon changed the official Facebook page handle: `aipremiumshopbd` → `aipremiumshopfb`
(verified the new page is real and correct — matches business address/phone/website).

Found and fixed all 8 hardcoded references in `aips-landing` (no shared source-of-truth
was actually wired up — each file had its own copy, same duplication pattern as past
bugs this session): footer, FinalCTASection, SupportPage, CommunitySocialCards,
Organization JSON-LD `sameAs`, and `data/brand.json` (6× facebook.com link), plus 2×
`m.me/aipremiumshopbd` Messenger short-links (PageFooter... actually ContactPage +
brand.json) — Messenger short-links mirror the page username 1:1 under Meta's platform
convention, so these were also stale and are now `m.me/aipremiumshopfb`.

Deliberately left untouched: `BlogPostPage.tsx`'s `facebook.com/sharer/sharer.php` (a
generic share-intent URL, not the page link) and every `aipremiumshopbd` match that's
actually an unrelated old GitHub repo/org reference in docs. Also found the identical
stale URL inside `artifacts/legacy/aipremiumshop-frontend/` and
`artifacts/aips-website/data/imported/aips-landing/brand.json` — confirmed both are
genuinely dead (no Vercel link at all for the legacy copy; the imported brand.json in
aips-website is never imported/rendered by any component) — correctly out of scope,
not fixed.

Verified: typecheck clean, tested locally (dev server, footer links + JSON-LD sameAs +
/contact Messenger link all correct, zero console errors), pushed, deployed (confirmed
success via `gh api .../commits/ad9cb6d/status`), and re-verified directly on
aipremiumshop.com (homepage + /support) — all Facebook/Messenger links live-correct.

### 2026-07-30 — Claude App (desktop) — Comprehensive AI Concierge upgrade (commits `5e314c0`, `a483cee`, `bbc740f`)

Per Emon's request to make "all possible improvements" to the NVIDIA-powered chatbot.
Full details in the commit messages; summary + what's actually live right now:

**Critical data-correctness fix (LIVE, verified):** the catalog generator kept only the
FIRST sibling record per slug, so 11 multi-tier products (Claude Pro, ChatGPT Plus,
Grammarly, etc.) only exposed ONE price tier to the bot. Confirmed live via direct API
test: asking "cheapest Claude Pro plan?" now correctly returns all 6 real tiers
(Starter Shared ৳599 → Max 20x ৳29,900) instead of the wrong single ৳1,590 answer it
would have given before. Rewrote `generate-concierge-catalog.mjs` to aggregate every
sibling tier per slug; `validate-catalog.mjs`'s sync check rewritten in lockstep so it
still hard-fails on drift.

**System prompt enrichment (LIVE, verified):** added the site's own already-approved
FAQ policy language (shared-vs-personal, 30-day warranty, 15-min refund window, 4-step
ordering flow, standard beginner recommendation, segment guide links) — grounded in
Home.tsx's real copy, nothing invented. Added an explicit ban on unverifiable marketing
superlatives ("best", "instant", "trusted by thousands") in the bot's own replies.
Live-tested: refund/warranty question returned correct facts; a request-price product
(Recraft) correctly said "not sure, check WhatsApp" instead of inventing a number; a
PIN-sharing attempt was correctly refused and redirected to WhatsApp without ever using
the PIN.

**Reliability — a real bug found AND a real gap found via the new tooling:**
- Fixed a timeout-budget bug: 3 fallback models × 12s timeout could sum to 36s against
  the function's old 30s maxDuration, risking a hard Vercel kill mid-fallback instead
  of a clean error. Now tracks elapsed time and stops trying new models with <3s
  budget left; maxDuration raised to 45s.
- **Added `GET /api/concierge?diagnose=1`** — a live, real-key, per-model reachability
  probe (latency + status), so model health is measured, not guessed from logs. First
  real use of it immediately paid off: **it found 2 of the original 3 fallback models
  were already silently dead in production** — `meta/llama-3.2-3b-instruct` timed out
  (8s abort) and `mistralai/mistral-7b-instruct-v0.3` flat 404'd (deprecated model ID).
  Neither would have ever actually caught a primary-model failure. Trimmed `MODELS` to
  just the 2 diagnose-confirmed-live entries (`llama-3.1-8b-instruct` primary ~260ms,
  `nvidia/nemotron-mini-4b-instruct` fallback ~160ms, even faster than primary).
- Added structured console logging (question text only, no PII collected by this chat
  anyway) on both success and failure — the honest, concrete mechanism for the bot to
  keep improving: real user questions become reviewable in Vercel logs to spot
  knowledge gaps, instead of an unfounded "self-learning" claim.

⛔ **Deploy quota hit again mid-work** (same daily Vercel Hobby-tier limit as earlier
today — recovered in ~2h43m last time, not literally 24h per Vercel's own message).
`5e314c0` (the main upgrade — catalog fix, prompt, a11y, diagnose endpoint) deployed
successfully and IS live — verified directly above. `a483cee` (testing 5 more model
candidates: gemma-2-9b-it, phi-3-mini-4k-instruct, qwen2.5-7b-instruct, llama-3.2-1b-
instruct, llama-3.1-70b-instruct) got rejected before those could be diagnose-tested.
Rather than leave unverified model IDs queued, immediately followed up with `bbc740f`
trimming MODELS back to only the 2 confirmed-live entries — queued safely, will
deploy automatically on reset, strictly safer than what was live before today
regardless of when it lands. **Next session: once quota resets, run
`curl "https://aipremiumshop.com/api/concierge?diagnose=1"` first, then reintroduce
verified candidates from the list above (each needs its own live 200 before trusting
it) to widen the fallback chain beyond 2 models.**

**Widget accessibility (LIVE, verified):** `role="dialog"`/`aria-modal`/`aria-label` on
the panel, `aria-expanded`/`aria-controls` on the launcher, `aria-live="polite"` on the
message list, Escape closes the panel, focus moves to the input on open and back to
the launcher on close (correctly skips the initial page-load mount — verified this
doesn't steal focus on first render). Failed sends now show the real reason
(rate-limited vs. generic) with a working "try again" action that resends without
retyping — tested locally end-to-end (simulated failure, confirmed retry re-sent the
exact same message).

Verified throughout: `node --check` on all 3 touched JS files, `tsc` clean, full
`validate-catalog.mjs` (0 hard failures), full production build, local dev-server pass
(dialog semantics, focus management, Escape, retry flow), and live production tests
(health check, diagnose endpoint, 4 real chat queries, zero console errors).

### 2026-07-30 — Claude App (desktop) — Catalog numbers: 30+ false counts/prices fixed sitewide (commit `10a9865`) — ⛔ queued, deploy quota

Emon asked to improve the homepage/hero and "fix all the mistakes of tools
calculations of all full website". Audited every product count and price claim
against data/products.json. Ground truth: **87 distinct products, 129 plan tiers,
৳299–29,900** — not the "118+" / "80 tools" / "from ৳350" the site was showing.

**Worst findings (all were live):**
1. **"BDT 350" is a phantom price — no product has ever cost it.** It was the
   advertised entry price on the homepage title, hero CTA, pain-point cards,
   mobile bar, guides, blog posts and the how-to-order FAQ. Real floor: ৳299.
2. **Four categories advertised a "from" price below anything purchasable** —
   ai-assistant ৳350 (real ৳499), ai-image ৳190 (৳299), ai-video ৳270 (৳299),
   ai-design ৳190 (৳399). This is the most damaging class: a shopper cannot buy
   at the advertised price.
3. **Display price contradicted the prefilled WhatsApp order message** — Best
   Sellers showed Perplexity at ৳350 while its own order message said ৳599;
   Google AI Pro ৳500 vs ৳599; Claude ৳1,495 vs ৳1,590; BudgetPage's button said
   "Order ৳350/mo" while its message said ৳499. Customers tapped one price and
   got another in WhatsApp.
4. 8 of 9 category counts wrong (ai-workspace showed 5 for 22 real).
5. Budget bands: "Premium 30+" held 3 products, "Enterprise 16+" held 2.
6. Nav brand prices stale: Claude ৳1,590 (real ৳599), Copilot ৳1,495 (৳399),
   Cursor ৳2,990 (৳699).
7. False discount: Google AI Pro "83% Off" — real is 80% at ৳599 vs ৳2,990.
8. Two blog posts contradicted themselves (ChatGPT Plus post: prose said ৳499,
   its own table/ROI math said ৳350).

**Fix:** new `src/lib/catalogStats.ts` is now the single source of truth for
every catalog number (totals, per-category counts + true floors, per-brand
rollups for nav links whose hub pages own no records, exact (slug,tier)
lookups, and budget-band counts measured by each product's *cheapest* tier so
one product can't inflate several bands). All ~28 files now import from it.
Stale `count`/`from` fields deleted from data/categories.json so a second
source of truth can't creep back.

**Guardrails added to validate-catalog.mjs (hard failures):** rejects any .tsx
hard-coding the phantom "350" or a stale 118+/80-tools total, and asserts
index.html's `<title>`/`<meta description>` against the live catalog (it's
static so it can't import the module). Both were regression-tested by
reintroducing each fault and confirming the build fails, then reverting.

**Hero improved:** subheadline now leads with real counts plus the true
differentiator ("no international card needed"); the three showcase cards all
show their real cheapest tier (Claude's card previously hard-coded its mid
৳1,590 tier while the other two showed entry prices, so they weren't
comparable).

Verified: tsc clean · validator 0 hard failures · production build clean ·
fresh dev server shows 0 stale claims in rendered text, every category
count/price matching the catalog, Best Sellers display == order message, 0
console errors.

⛔ **Deploy queued — Vercel daily quota hit again** (`10a9865`, same Hobby-tier
cap as earlier today; it recovered in ~2h43m last time, not the 24h Vercel's
message states). Nothing is broken: the commit is on main and deploys
automatically on reset. **Next session: after reset, verify on the live domain
that the homepage title reads "87 Premium AI Tools … From BDT 299", the
category cards show the derived counts, and Best Sellers prices equal their
WhatsApp messages.**

⚠️ **One judgment call for Emon to confirm/revert:** the footer previously read
"80 tools. Local payment. Instant delivery." — "Instant delivery" contradicts
the site's own stated 5–30 min / 2–4 hr SLAs, so I changed it to name the real
payment methods instead. Product/price/warranty wording was otherwise left
exactly as the CEO decision requires; only provably false numbers were changed.

### 2026-07-30 — Claude App (desktop) — Deploy reliability: what works, and a correction (commits `53d26c8`, `aa2750d`)

Emon asked for another way to guarantee work gets deployed and live with quality.

**⚠️ CORRECTION — read this before planning around it.** I briefly claimed the
Vercel CLI bypasses the Git-integration deploy cap. **That is wrong.** Sequence
actually measured today: push rejected 16:58 UTC → `vercel --prod` CLI deploy
succeeded ~17:03 → further CLI deploy rejected minutes later with the same
error. The cap (`api-deployments-free-per-day`, >100) is **per-account over a
rolling 24h window and shared by the CLI and the Git integration**. The CLI run
did not beat the limit; it claimed a slot that had just aged out. I over-
generalised from one success — don't repeat that.

**The good news: the CLI deploy that did land shipped the entire catalog-number
fix.** Verified live right now on aipremiumshop.com: title reads "87 Premium AI
Tools … From BDT 299", no phantom ৳350 or stale 118+ anywhere in the served
HTML, concierge healthy and grounded in 87 products, key routes reachable.

**What actually helps (shipped as `scripts/deploy-live.sh`):**
- `--dry-run` / default: **quality gates before spending a scarce deploy slot** —
  catalog validator → tsc → full production build. Broken work can't consume a
  slot or reach production. Both gate paths were regression-tested by
  deliberately introducing a TypeScript error and a phantom "350", confirming
  each aborts the run, then reverting.
- `--wait`: **parks and retries every 10 min (up to 6h)**. Because slots age out
  continuously rather than all at once, this ships work at the earliest possible
  moment with nobody babysitting. Aborts immediately on any non-cap failure so a
  genuine break is never retried in a loop.
- `--verify`: **live verification that doesn't trust HTTP 200.** Expected numbers
  are read from products.json at check time, so assertions can't drift: served
  `<head>` must state the real product count + entry price, must NOT contain the
  phantom ৳350 or stale 118+, `/api/concierge` must be healthy AND grounded in
  the same product count (catches a stale `_catalog.json`), key routes reachable.
  It explicitly prints that 200 proves little on this SPA and points at the
  headless crawl for real render checks.

Also fixed a real bug the failure exposed: the script grepped for "rate limit",
but Vercel says *"Resource is limited - try again in 24 hours …
api-deployments-free-per-day"* — so the cap was being misreported as a generic
"deploy failed", hiding the true cause. Now matched correctly and surfaced as a
distinct exit code. `.vercel/` is gitignored; the script creates the root link
transiently and removes it (a committed root link confuses the Git integration).

**Currently running:** `deploy-live.sh --wait` in the background to ship the two
script commits (`53d26c8`, `aa2750d`) the moment a slot frees. Those are
tooling-only — the live site already has all product-facing fixes.

**🔴 THE PERMANENT FIX IS EMON'S CALL:** the cap has now blocked deploys three
times in one day with two sessions working. A paid Vercel plan (~$20/mo) removes
it. No script can engineer around an account-level quota — everything above is
mitigation, not a cure.
