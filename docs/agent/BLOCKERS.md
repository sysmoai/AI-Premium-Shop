# Blockers

Items that cannot be resolved by reading the repository. Each needs a human
decision or a document that does not exist yet. Do not "resolve" these by
guessing — every one of them is a claim that carries legal or revenue risk.

---

## B1 — "10,000+ customers since 2022" has no evidence on file (HIGH)

**Status:** open. Owner decision required.

This is the single most-repeated unevidenced claim on the site. It renders on
almost every product page, and it is hardcoded in code as well as data:

- `src/pages/ProductPage.tsx` — 4 places: `USP_DEFAULT` (line ~128), the
  request-price meta description (~196), the AIO quick-answer paragraph (~298),
  and the trust bar (~543).
- `data/products.json` — ~70 records carry it inside a FAQ answer.
- `index.html` — the site-wide default meta description.

Session 16 removed it from the Higgsfield record and did **not** use
`ProductPage.tsx` for that page, precisely so the new page could avoid it. It was
deliberately **not** bulk-removed elsewhere: that is ~70 live revenue pages, and
whether the number is true is a business fact only the owner can attest.

**Decision needed, one of:**
1. Evidence exists → keep it, record the source in `docs/compliance/`, and add
   the attestation date to the copy.
2. No evidence → replace with a factual operational statement everywhere
   (a one-commit change once the wording is chosen).

Until then `validate-truth.mjs` keeps flagging it and `seo-check` does not,
because a customer count is not mechanically checkable.

## B2 — "30-day replacement guarantee" is not a written policy (HIGH)

~85 records and `ProductPage.tsx`'s trust bar assert it. `/refund-policy` exists
but does not clearly cover replacement of a third-party account AIPS does not
control. Needs either a written policy to link to, or removal.

## B3 — Higgsfield vendor entitlements unverified (MEDIUM, blocks revenue)

Six claims sit in `higgsfield-offer.json → pendingVerification`: the 1,200-credit
allocation, "unlimited eligible models", Seedance unlimited, Supercomputer
access, the model roster, and the replacement guarantee.

These need someone to open the actual Higgsfield account and the current pricing
page and record what is true. Until then the page publishes them as open
questions, which is honest but converts worse than confirmed features would.

## B4 — No Higgsfield reseller authorization (HIGH, blocks checkout)

Confirmed by the owner 2026-08-05. Keeps the offer at compliance category F:
enquiry-only, no checkout, no "official"/"partner"/"authorized" language.
`docs/compliance/higgsfield-offer-review.md` §9 has the exact steps to move to a
transactional offer if authorization is ever obtained.

## B5 — Shared-access authorization for the other 44 products (HIGH)

Carried forward from session 2 and still open. 44 catalog records are marked
`accessType: "shared"`. The same question that produced B4 applies to them, and
the answer may be different per vendor. Not touched in session 16 — out of the
Higgsfield scope, and too large to resolve without the owner.

## B6 — No Higgsfield MCP / Supercomputer integration is connected (LOW)

Spec section 14 asks for original demo media generated through Higgsfield's own
tooling. No such MCP server is connected to this workspace, and the `notion` MCP
that is configured is unauthenticated in non-interactive sessions. No credits
were spent, and `content/higgsfield/asset-manifest.json` was therefore not
created — there are no assets to manifest. Reopen when an integration exists and
the owner approves credit spend.

## B7 — Bangla prose needs a native-speaker read (MEDIUM)

Carried from session 15. The Bangla pages exist and are consistent with the
English facts, but nobody has confirmed they read naturally. Session 16 added
only two short Bangla link labels, no new Bangla prose.

## B9 — Nothing in CI executes the React app (RESOLVED 2026-08-07)

**Status:** resolved. Playwright smoke suite added and verified to actually
catch the exact bug class that caused the outage.

A hook-order bug (`useT()` placed below an early `return null` in CookieBanner)
threw React error #310 at the App root. `createRoot` emptied #root and rendered
nothing: **every page went blank in production**.

It passed every gate that existed at the time:
 - `pnpm run build` — Vite bundles, it does not execute the app.
 - `pnpm run seo:check` — inspects static HTML, which is byte-identical whether
   or not the app crashes on mount.
 - `audit-prerender` — same blind spot.
 - `live-site-monitor` — greps the SERVED HTML for markers, and the prerendered
   markers are all still present on a crashed page.

Only a screenshot caught it, and only because the failure was total.

**Fix:** `artifacts/aips-landing/tests/e2e/smoke.spec.ts`, a Playwright suite
that runs the actual built app (`vite preview` serving `dist/public`) in a
real Chromium instance across 8 structurally distinct routes (home,
products, pricing, ai-video, the Higgsfield product page, an audience
guide, the Bangla homepage, and a 404), and for each asserts:
 - `#root` has at least one child element,
 - the page body has real visible text (catches an empty-but-truthy
   wrapper div, not just a fully empty `#root`),
 - zero `pageerror`/`console.error` events fired during load.

**Verified this would have actually caught the real bug**, not just a
synthetic one: reproduced the exact CookieBanner hook-order bug locally
(moved `useT()` below the early return again), rebuilt, ran the suite —
all 8 routes failed with the exact same "#root has no children" signature
the real outage would have produced. Reverted immediately after
confirming (`git diff` on the component came back empty).

Wired into `.github/workflows/seo-quality.yml` (after the build step,
installs the Chromium binary then runs `pnpm run test:e2e`, uploads the
HTML report as an artifact on failure) and into `.husky/pre-push` (B13),
so both the remote and local gate now execute the app, not just inspect
its static output.

Playwright itself was Backlog #4/#22 (a bigger, full-user-journey
version) — this is the narrower, B9-scoped version: mount-crash
detection across representative routes, not full click-through
journeys. #22's fuller scope (Homepage→Solution→Category→Product→
Policy→WhatsApp, etc.) is still open if ever wanted, but the thing that
actually caused a real outage is now covered.

## B10 — Floating chat buttons click-jack CTAs on mobile (MEDIUM, costs conversions)

**Status:** open. Needs a product decision, not a code decision.

Measured on live /bn at 375x812: the fixed chat FAB covers a **52x51px** region of
the "সব প্ল্যান ও দাম দেখুন" CTA (CTA at 20,609 335x64). Tapping that corner opens
the chat widget instead of the CTA. Site-wide behaviour, not specific to /bn —
9b32e97 already fixed one instance of the same class (the sort dropdown on
Products/Pricing).

It is inherent to the pattern: the FABs are viewport-fixed bottom-right, and any
full-width in-flow button passes under them at some scroll position. Padding the
buttons would leave them visibly asymmetric.

**The question for the owner:** on mobile the StickyMobileBar already provides a
persistent "Order Now" conversion path, so the floating chat buttons duplicate it
while blocking real CTAs. Options:
 1. Hide the FABs on mobile (`md:hidden` inverted) and rely on the sticky bar.
 2. Keep one FAB, drop the second — the stack is what makes the collision large.
 3. Accept it.

Option 1 is probably right, but it removes a conversion affordance from every
page on the site, so it is not mine to make unilaterally.

## B8 — Vercel free-tier deploy cap (LOW, operational)

100 deploys / rolling 24h, shared across the team's projects. Over the cap,
pushes silently do nothing. `scripts/deploy-live.sh --wait` parks and retries.
The only real fix is a paid plan — an owner decision.

## B11 — A stale duplicate deployment is still live and publicly crawlable, serving old catalog numbers (HIGH)

**Status:** open. Needs an owner decision or explicit permission to act on
Vercel infrastructure (not fixable by a code change/deploy). Exact commands
and evidence: `docs/agent/OWNER-ACTIONS.md` OA1.

**Corrected from this blocker's first version:** despite the name, this is
**not** the archived Next.js app (`artifacts/aips-website/`, see its own
`DEPRECATED.md`) — that confusion came from the Vercel *project* being named
"aips-website" too. `vercel project inspect aips-website` shows its Root
Directory is `artifacts/aips-landing` — the same, correct, currently-live
Vite app. The project was created 2026-07-30 (the same date `DEPRECATED.md`
records the "kept SPA, archived Next.js" decision), deployed exactly once,
and never redeployed since — a duplicate/test project from that day's
consolidation work, abandoned in favor of the real production project. It's
frozen at an 8-day-old snapshot of the *correct* app, not a different
architecture: stale catalog numbers ("118+ tools", "3,000+ customers" vs
today's 197/10,000+), no canonical tag, permissive `robots.txt`. This is the
live source of the "conflicting indexed versions" pattern the second and
third master prompts both hypothesized. No custom domain is at risk — only
three auto-generated `*.vercel.app` subdomains alias to it.

**Fixed separately, unrelated but worth keeping:** hardened
`artifacts/aips-website/src/app/robots.ts` (the actual archived Next.js
app's own code) to unconditionally disallow all crawlers, defense-in-depth
against that different, unrelated app ever being redeployed by mistake. Does
not touch this blocker's live deployment.

**What actually fixes this (owner decision — see OWNER-ACTIONS.md OA1 for
exact commands):** remove the three aliases pointing at the stale deployment
(safest, one command each, fully reversible), enable Vercel Deployment
Protection on the project (dashboard, also reversible), or delete the whole
project (most thorough, not reversible). Not done unilaterally this session —
deleting/unaliasing live infrastructure is a hard-to-reverse action on shared
state, explicitly one of the "questions that genuinely require owner
approval" the master prompt itself calls for.

## B13 — GitHub Actions is billing-locked on the `sysmoai` account (RESOLVED 2026-08-07)

**Status:** resolved. Owner fixed the GitHub billing issue directly.
Confirmed via `gh run rerun` on a previously-failed run — it now actually
executes instead of failing before starting.

That first-ever real CI run immediately paid for itself: it caught a
genuine typecheck build-order bug (`aips-landing` itself failing TS6305
because `lib/api-client-react` wasn't built first) that every local
check this session had missed, because local checkouts kept
accumulating leftover build state that masked it. Fixed in both
`ci.yml` and `.husky/pre-push` — see `BACKLOG.md`'s corrected #13/#14
entry for the full story, including where the previous "resolved, cause
unclear" note in that same file was itself wrong.

The local pre-push hook (below) stays — a local + remote gate is
strictly safer than either alone, and it just proved its worth by using
the exact same command CI uses.

**Original text, for the record:**

Every job in every workflow run (`CI`, `SEO quality`) carries the identical
annotation: *"The job was not started because your account is locked due
to a billing issue."* Checked 200 runs back to 2026-08-02 (4 days before
this whole session's work began) — **zero successes**. Not caused by any
commit; the job never starts, so no code change can fix it. Confirmed via
`gh run view <id>` on multiple runs across both workflows.

`main` has no branch-protection rule requiring these checks, so this has
never blocked a push or merge — only automated verification and the
Actions-tab status.

**Fix (owner-only):** log in as `sysmoai` at `github.com/settings/billing`
— it's a personal account, not an org — and resolve whatever's outstanding
(declined card, unpaid invoice, or an Actions spending limit at $0). Then
either push again or `gh run rerun <run-id>` on the queued/failed runs.
Nothing on the code side needs to change for CI to go green once this is
cleared.

**Mitigation (done, doesn't require the above):** added a `husky` pre-push
git hook (`.husky/pre-push`, wired via the root `package.json`'s
`prepare` script so it installs automatically on `pnpm install`) that runs
the same real checks `ci.yml` and `seo-quality.yml` would: workspace
typecheck + lint, then `aips-landing`'s claim gates
(`validate-higgsfield-offer.mjs`, `validate-catalog.mjs`,
`validate-truth.mjs`), build, and `seo:check`. It runs locally, before any
push leaves the machine, entirely independent of GitHub's account status.
Verified end-to-end, exit 0. This isn't a substitute for real CI running
on every collaborator's and every CI runner's copy of the code — it only
protects pushes made from a checkout that has the hook installed — but it
closes the actual gap (nothing verifying code before it reaches `main`)
without needing the billing issue resolved first. Once B13 itself clears,
GitHub Actions resumes as a second, independent layer — no conflict, no
need to remove the hook.

**Found while wiring the hook, not previously known:** `pnpm --filter
'!aips-website' -r typecheck` — the exact command `ci.yml` has always
run — fails on `artifacts/api-server`, a workspace member with real
pre-existing typecheck errors (unbuilt `lib/db` project reference, several
implicit-anys). Investigated: unreferenced anywhere by `aips-landing` (the
live site), last touched 2026-05-03, an abandoned early Express/Drizzle
backend from before the current static-data + Vercel-serverless-function
architecture. Same category as `aips-website` (already excluded, with its
own `DEPRECATED.md`), it just never got the marker. Excluded it the same
way in both `ci.yml` and the new hook, with the reasoning recorded inline
in both files. Because CI has (as far as this investigation can tell)
never once succeeded in this repo's history, this had gone undetected —
nobody has had a working automated signal to catch it until now.

## B12 — `http://www.aipremiumshop.com` is a 2-hop redirect (LOW)

`http://www` → `https://www` (308) → `https://` non-www (308) → 200. The other
three host/scheme combinations are single-hop to the canonical
`https://aipremiumshop.com/`. Vercel Domains configuration issue, not
fixable from application code. Low severity — explicitly not blocking any
higher-impact work. Exact dashboard path: `docs/agent/OWNER-ACTIONS.md` OA2.
