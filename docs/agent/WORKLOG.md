# Worklog

## Savings-claims validation + hreflang fix + fabricated-testimonials removal — 2026-08-07 (Sonnet 5, same day, sixth turn)

Continuation per a fourth master prompt covering the remaining P0 list.
Reconciled state (clean, matched docs exactly), then worked through:

**P0.3 — savings-percentage validation.** `validate-catalog.mjs` already
tracked "% off" but missed "Savings vs official: ~88%"-style bare
percentages. Added a regex check, found 7 instances, and while fixing them
computed the real numbers (RATE × officialUSD from `data/products.json`)
rather than assuming "unverified" — found ComparisonPage.tsx's "~88%" claim
for ChatGPT Plus is actually ~83%, i.e. wrong, not just unsupported.
Removed the three "Savings vs official" table rows entirely rather than
publish a different guessed number. Found and fixed adjacent violations in
the same pass: a fabricated "92% of developers... GitHub Survey 2025" stat
with a "code 55% faster" claim attached, and a "vs Hiring: BDT 37,000/mo...
85% savings" comparison built on an invented baseline cost — both in
GuidePage.tsx, both removed.

**A line-ending mistake and its fix.** The Node script used to remove the
three table rows wrote the file back with mixed CRLF/CR line endings
instead of the repo's LF convention, turning a 3-line change into a 900-line
diff. Caught by checking `git show --stat` before moving on, fixed with a
follow-up commit, verified the *cumulative* diff across both commits was
the intended 3 lines. Worth remembering: node's `fs.writeFileSync` doesn't
preserve original line-ending style — check `file <path>` after any
script-driven edit to a text file, not just after manual Edit-tool changes.

**P0.8 — hreflang audit.** Found hreflang was static and IDENTICAL across
all 272 pages, hardcoded once in `index.html`, which every prerendered page
starts from and nothing overrode. Every page told Google its Bangla
alternate was the homepage, regardless of whether it had a real one — a
correct, reciprocal client-side mapping already existed
(`GuidePage.tsx`'s `BANGLA_ALTERNATE`) but only applied after React
hydrated, never reaching the static HTML crawlers primarily use for
hreflang. Fixed with a `HREFLANG_PAIRS` map in the prerender script itself;
also fixed region codes sitewide (bare "en"/"bn" → "en-BD"/"bn-BD") across
every client-side `hreflang` prop so hydration doesn't immediately
re-introduce the mismatch. Verified live via `vercel curl` on a paired page
and its reciprocal Bangla page — both correct.

**The most severe finding this project has produced.** While fixing
EducatorsGuide.tsx's hreflang prop, found a "Success Stories" section with
four fabricated testimonials: named individuals ("Dr. Karim Hassan,
Professor, Dhaka University") with invented outcomes attributed to a real
university. Checked the other four guide pages — same pattern in all of
them. StudentsGuide had fake grade improvements at BUET/Dhaka University/
IUB/AIUB; FreelancersGuide had fabricated EARNINGS claims ("$5/hr to
$25/hr, income tripled") plus a fake Fiverr rating and Toptal status;
CreatorsGuide had fake follower counts (500K, 2M) and growth percentages;
SMBGuide had fabricated cost savings and win-rate figures. A prior session
had added a small "illustrative example, not verified" disclaimer under
each — concluded that doesn't neutralize a named-person-plus-quote
presentation, and removed all five sections entirely rather than soften
the copy further. Also removed matching fabricated hero-stat blocks on the
same pages (fake "550+ educators", fake "15 hours saved/week", a fake
"GitHub Survey 2025" citation).

**P0.6 — payment-method compliance.** Confirmed (not previously checked
this precisely) that `PaymentMethodsSection.tsx`, `PaymentBadges.tsx`, and
`PageFooter.tsx` all render hand-drawn inline SVGs standing in for real
bKash/Nagad/Rocket logos — `public/` has no actual brand asset files.
Documented thoroughly (`docs/compliance/payment-methods.md`,
`docs/brand/payment-assets.md`) rather than attempting to source or
generate replacement logos, which the master prompt's own rules
explicitly forbid doing without a legitimate official source.

Two fresh Vercel previews deployed and verified against real
infrastructure across this turn — not just local build output. Branch is
now 16 commits, still entirely local.

## Vendor compliance + Higgsfield verification + superlative cleanup — 2026-08-07 (Sonnet 5, same day, fifth turn)

Continuation of the fourth turn's `NEXT-TASK.md`, doing both Option A and
Option B rather than choosing one, then a third bonus item found along the
way:

**Vendor compliance (Option A):** built `docs/compliance/vendor-matrix.csv`
mechanically from `data/products.json`'s 44 `accessType:"shared"` records —
37 distinct vendors, every classification "Unverified" by construction, no
research performed (that's real work, correctly out of scope for a
mechanical pass). Flagged (did not rewrite) two places asserting a blanket
shared-account-safety claim across all vendors, since B5 says compliance is
vendor-specific and no vendor's terms have actually been checked yet.

**Higgsfield verification (Option B):** the first real external web research
this session — `higgsfield.ai/terms-of-use-agreement` and two blog posts
(the pricing page itself is a client-rendered app shell, confirmed
unfetchable after 3 attempts). Found that the existing customer-owned-
account implementation isn't just cautious — it's what the vendor's actual
terms require (§2.4 prohibits credential sharing and creating accounts for
others without authorization). Found "unlimited" now has a defined scope
(never covers Supercomputer/MCP/CLI, one generation at a time). Found the
proposed "6 video and 8 image parallel generations" claim has no supporting
evidence in what was fetchable. Found a real unit-economics red flag: the
only vendor price found ($49/mo) doesn't obviously reconcile with the
proposed BDT 1,199 price. Wired the newly-verified facts into
`data/higgsfield-offer.json`, the live `HiggsfieldPage.tsx` component
(new "What we have verified" section), AND the separate prerender static-
body generator in the same commit — the drift-prevention pattern this
entire session has been enforcing elsewhere, applied here proactively
rather than after finding a bug.

**Superlative claims (found while checking `NEXT-TASK.md`'s backlog #16):**
`validate-truth.mjs`'s regex only catches `#1\s+(AI|for|paraphras...)` —
a direct grep for `#1` across the 4 flagged files found more instances than
the validator had (9 in `BrandPage.tsx` alone, not 5). Fixed all of them.
Distinguished two categories: pure marketing puffery with no source
(rewritten to accurate descriptive language) vs. claims citing a real,
named benchmark (Chatbot Arena) — for those, actually checked arena.ai's
live leaderboard rather than assuming either that the claim was fine or
that it should be stripped. Current #1 is Anthropic's Fable 5 / Opus 5
family, not the "Opus 4.6" the site cites — removed the stale ranking claim,
kept the model name itself (no evidence it's wrong as a description of
what's included, separate question, logged as BACKLOG #20).

Every commit this turn was individually build+seo:check verified, not
batched and checked once at the end. Branch is now 10 commits, still
entirely local.

## Catalogue integrity + owner-actions doc — 2026-08-07 (Sonnet 5, same day, fourth turn)

Reconciled repo/doc state per the fourth master prompt's checklist first:
confirmed branch (`seo/homepage-product-authority`, 5 commits, unpushed),
confirmed `robots.ts` from the prior turn has no dead code, confirmed
`CURRENT-STATE.md` has no duplicate headers. All clean — no cleanup needed.

Then gathered exact Vercel evidence for B11 (project ID
`prj_gDXbOWXKZP7S1KxPnLkyHs5TVuer`, deployment ID
`dpl_DPfznLnKPh1q4fs4VkdJteRjBACK`, three aliases, creation/last-deploy date)
via `vercel project inspect` / `vercel inspect` / `vercel ls`, which
**corrected the prior turn's root-cause narrative**: the stray live
deployment is not the archived Next.js app (confusingly similar project
name only) — it's a duplicate Vercel project whose Root Directory is
already `artifacts/aips-landing` (the correct app), created and deployed
once on 2026-07-30, never redeployed since. Wrote `docs/agent/OWNER-
ACTIONS.md` with exact recommended commands (`vercel alias rm` ×3,
reversible) and the corrected `BLOCKERS.md` B11 entry.

P0 task group "catalogue plan-and-price integrity": read
`validate-catalog.mjs` first rather than assuming a gap — it was already
far more thorough than expected (plan/price consistency, whatsappMsg drift,
sitemap sync, 4 separate generated-file sync checks, banned-claims scan).
The one real missing check — shared tier priced at or above the equivalent
personal tier — found a genuine anomaly on first run: `midjourney-
bangladesh`'s "Pro Shared" (৳4,788) costs more than both its "Personal"
(৳2,495) and "Pro" personal (৳3,990) tiers. Added as a permanent warning-
level check, recorded for owner review (BACKLOG.md #18) rather than guessed
at a fix.

Verified `pnpm run build` still clean after the validator change (0 errors,
272/272 routes) — the validator isn't wired into `build`, so this was a
sanity check, not a required gate for this specific change.

**Next up:** shared-account/vendor compliance (B5, large, owner-decision-
heavy) and Higgsfield offer verification (needs real external web research
against higgsfield.ai — see `RESEARCH-CACHE.md` for the exact open
questions) are both better scoped as their own focused sessions rather than
continuing to stack onto an already-long one. See `NEXT-TASK.md`.

## Host/version-consistency task group — 2026-08-07 (Sonnet 5, same day, third turn)

P0 task group 2 of the third master prompt's ordering ("host and version
consistency" / Hypothesis 1 — conflicting indexed versions). Found the real
cause: not CDN staleness or a www/non-www misconfiguration on the live site
(both checked, both clean except one low-severity 2-hop redirect — B12), but
a **decommissioned Next.js app whose last deployment is still live and
publicly crawlable** at `aips-website-two.vercel.app`, serving a stale
catalog ("118+ tools", "3,000+ customers"). Its own `DEPRECATED.md` (dated
2026-07-30) already documents the decision to archive it and turn off
auto-deploy — that stopped future deploys, not the one already live.
Recorded as `BLOCKERS.md` B11 (needs owner approval to delete/unalias — a
Vercel infrastructure action, not a code change) and B12 (the 2-hop
redirect). Hardened that app's `robots.ts` to disallow all crawlers as
defense-in-depth, since editing its code can't reach the already-live
deployment (redeploying it is explicitly forbidden by its own docs).

Also created the durable context files the third master prompt asked for:
`SITE-CONTEXT.md`, `ARCHITECTURE.md`, `RESEARCH-CACHE.md`, `NEXT-TASK.md`
(supersedes `NEXT-SESSION.md` going forward). Rewrote `CURRENT-STATE.md`,
which had drifted 2-3 sessions stale (see the note already in
`NEXT-SESSION.md` from earlier the same day).

## Evidence-collection session — 2026-08-07 (Sonnet 5)

No code changed — scope was deliberately limited to verification (per an
external audit brief covering routing, payments compliance, animation, SEO
and content-quality). Ran the repo's own drift checks (`build`, `seo:check`,
the `higgsfield-ai-bangladesh` curl check) — all green, production on
`main`'s HEAD (`1e147bb`). Full findings in `docs/homepage/executive-audit.md`;
five new issues (F1–F5) added to `BACKLOG.md` as items 0a–0e, all root-caused
with file:line references, none fixed yet. Confirmed several of the audit
brief's specific claims were stale (Higgsfield template bug already fixed in
session 16; About/homepage customer-count and founding-year numbers are now
internally consistent, though still evidence-less per existing B1).

Also flagged: `WORKLOG.md`/`NEXT-SESSION.md` were stale by 2-3 sessions
(the `/bn` rebuild `NEXT-SESSION.md` called "next" was already done;
`BLOCKERS.md` B9/B10 exist but have no corresponding `WORKLOG.md` entries).
Patched `NEXT-SESSION.md` to flag this rather than silently trust it.

## Session 16 — 2026-08-05 (Opus 5)

Higgsfield offer implemented compliantly, AI Video surfaces rebuilt, page-load
flash fixed, quality gates added. Deployed to production and verified live.

**Shipped**

- `data/higgsfield-offer.json` — single source of truth separating vendor-
  verifiable platform facts from owner-attested service facts, with six
  unverified supplied claims quarantined in `pendingVerification`.
- `scripts/validate-higgsfield-offer.mjs` — build-time compliance gate, wired
  into `build`. Regression-tested by deliberately re-enabling the expired offer
  date and the CTA; both correctly failed the build.
- `src/pages/HiggsfieldPage.tsx` — dedicated page routed above `/product/:slug`,
  deliberately not the generic template (whose trust bar hardcodes the
  unevidenced customer count and warranty into every product page it renders).
- `scripts/seo-check.mjs` + `pnpm run seo:check` — 273-page claim and SEO gate.
- `.github/workflows/seo-quality.yml` and `live-site-monitor.yml`.
- `src/sections/AIVideoHub.tsx` and `src/sections/AIVideoFeatureSection.tsx`.
- Inline anti-flash critical CSS in `index.html`; removed the duplicate Google
  Fonts `@import` from `index.css`.

**Bugs found and fixed while working**

- 22 broken template strings on 11 live product pages, rendering as "Delivery in
  Confirmed on WhatsApp" and "Typically Confirmed on WhatsApp via WhatsApp after
  payment confirmation".
- `/privacy` and `/privacy-policy` were two self-canonical pages with identical
  titles. Fixed generically: the prerender alias-canonical resolver now also
  covers plain `component={X}` routes, not just Comparison/Budget pages.
- My own first prerender pass linked four alternatives at `/product/<slug>` when
  they are brand-page slugs living at `/<slug>`. Caught by the repo's own
  `audit-prerender` gate, not by me.
- My own first `seo-check` had two false positives: it split FAQ questions from
  their answers (rejecting "Is AIPS an official partner?" — the question that
  exists in order to answer "No"), and it matched the word `undefined` in
  legitimate prose. Both narrowed; the value-leak check now runs against raw HTML
  in value positions only.

**Measured**

| Page | Static visible chars before | after |
|---|---|---|
| `/product/higgsfield-ai-bangladesh` | 1,536 | 8,702 |
| `/ai-video` | 1,112 | 3,770 |
| `/` | 3,489 | 4,517 |

`seo:check`: 0 errors across 273 built pages (160 warnings, mostly long titles
and thin legacy pages — triaged, not silenced).

**Not done, and why** — see `BLOCKERS.md`. Chiefly: the site-wide "10,000+
customers" claim (owner decision, ~70 live pages), the six Higgsfield
entitlements (needs the real vendor account), a Playwright regression test (no
Playwright in the repo yet), and original Higgsfield demo media (no MCP
integration connected and no credit approval).
