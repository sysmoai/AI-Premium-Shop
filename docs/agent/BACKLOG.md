# Backlog

Ordered by value / effort. Anything blocked names its blocker from `BLOCKERS.md`.

| # | Item | Blocked by |
|---|---|---|
| 1 | Resolve the "10,000+ customers" claim site-wide | B1 (owner) |
| 2 | Verify the six Higgsfield entitlements from the real account | B3 (owner) |
| 3 | Written replacement/warranty policy, or removal | B2 (owner) |
| 4 | Playwright *screenshot* regression testing (visual diffing) — narrower than #4's original scope, since the mount-crash detection half is now done (see #22, B9) | — (new dependency, and a real baseline-image workflow to design) |
| 5 | Higgsfield vs Runway / vs Kling comparisons | B3 + credit approval |
| 6 | Higgsfield Supercomputer explainer page | B3 |
| 7 | AI video cost calculator | — |
| 8 | AI video model-selection quiz | — |
| 9 | Bangla AI-video guide with real local value | B7 |
| 10 | Shared-access authorization audit (44 products) | B5 (owner) |
| 11 | BrandPage 160 KB / BlogPostPage 116 KB chunk reduction | — |
| 12 | Proper SSG so static bodies come from the components themselves | — (large) |
| 15 | Payment methods have no single source of truth — at least 5 independent hardcoded lists found (`PaymentMethodsSection.tsx`, `PaymentBadges.tsx`, `PageFooter.tsx`, `data/brand.json`, `scripts/generate-llms-txt.mjs`), each requiring its own manual edit when a method is added/removed. Binance had to be removed from all 5 separately on 2026-08-07 — see `docs/homepage/executive-audit.md` | — (real refactor: one data source, every component/script reads it) |
| 17 | Delivery-time claims disagree across surfaces: prerendered homepage body and About page say "5–30 minutes"; `FAQPage.tsx`'s English and Bangla FAQs say "5–15 minutes... max 2-3 hours off-hours" (internally consistent with each other, just not with the other two surfaces) | — (owner: which is actually true) |
| 18 | `midjourney-bangladesh`'s "Pro Shared" tier is priced ৳4,788 — more than BOTH the "Personal" (৳2,495) and "Pro" personal (৳3,990) tiers of the same product. A shared/split tier costing more than the equivalent (or a cheaper) personal tier defeats the commercial premise of sharing; either a real pricing error or a legitimate reason not evident from the data (e.g. Pro Shared includes something Pro Personal doesn't). Caught by the new `validate-catalog.mjs` shared-vs-personal check (2026-08-07) — see `docs/agent/OWNER-ACTIONS.md`-style evidence in the commit | — (owner: confirm the price or fix it) |
| 31 | The #28 sweep (2026-08-07, full repo) covered `src/pages` and `src/sections` but not `data/products.json`'s own prose fields (descriptions, useCases, whyBuyFromAIPS) at the same depth — those get lighter automated coverage from `validate-catalog.mjs`'s keyword scan, not a full read. Also not covered: Bangla-language prose (only English-language superlatives/stats were checked; Bangla equivalents may carry the same issues untranslated-and-unaudited) | — (real audit time, not blocked) |
| 21 | Real bKash/Nagad/Rocket logo asset files still don't exist in the repo — interim fallback (generic icon + brand color, no logo mark) applied 2026-08-07, revised same day after the owner flagged the first version (a bare colored bar) as looking broken/unfinished, not just "not a real logo." See `docs/compliance/payment-methods.md` / `docs/brand/payment-assets.md` | — (owner: supply real asset files whenever convenient; not urgent, current version reads as a finished design) |
| 22 | Playwright **full click-through user journeys** — the mount-crash-detection scope (B9) is done as of 2026-08-07 (`tests/e2e/smoke.spec.ts`, 8 routes, wired into CI + pre-push, verified to actually catch the real historical bug). What's left is the bigger ask: two full journeys the master prompt specified — Homepage→Find Your Solution→Audience page→Category→Product→Policy→WhatsApp, and Homepage→AI Video→Higgsfield→Credits→Unlimited→Service opportunities→WhatsApp — clicking through real navigation and asserting each step, not just that each page mounts | — (real scoping + maintenance-burden work; lower urgency now that B9's actual risk is covered) |
| 23 | Individual re-audit of all 6 audience pages against the master prompt's per-page requirement list (unique intent, ethical limitations, Bangladesh context, FAQ, internal links) — partially covered as a side effect of the testimonial-fabrication sweep (2026-08-07), which touched all 5 guide pages, but that was a narrow pass for one issue class, not the full audit | — (large, ~6 pages × full checklist) |
| 30 | Chatbot sweep (#24) found two real gaps, fixed 2026-08-07, but only sampled 14 queries — the same method (live-test against production) would likely find more with a larger sample. Untested areas: multi-turn conversation context, more Bangla dialect variety, questions about specific vendor ToS details, pricing-negotiation attempts | — (real testing time, not blocked) |
| 25 | Chatbot: scheduled knowledge-base sync — `api/_catalog.json` is generated from `data/products.json` by `scripts/generate-concierge-catalog.mjs` and gated by `validate-catalog.mjs`'s sync check (so it can't silently drift), but nothing runs that generator automatically on a schedule independent of a manual build/deploy. Only matters if content updates without a full deploy become common | — (low priority — the existing gate already prevents silent drift, this is about cadence not correctness) |
| 26 | Chatbot: NVIDIA API quota/limits documentation — needs the actual NVIDIA account dashboard, which this session has no access to. `api/concierge.js`'s own comments already document real operational learnings (model latency/quality tradeoffs from actual re-benchmarking), which is more useful than generic API docs would be, but quota/rate-limit specifics are still unknown | — (owner: check the NVIDIA NIM dashboard directly) |
| 27 | Chatbot: fine-tuning / continuous-learning pipeline — not started, and not clearly worth building. The existing retrieval+grounding architecture (server-side price/product grounding, never trusting the model's own numbers) already solves the failure mode fine-tuning would target, with far less operational risk than retraining a model on live chat logs | — (owner call: is this actually wanted given the existing architecture already covers it?) |
| 29 | `artifacts/api-server` (Express + Drizzle backend) is dead code — unreferenced anywhere by the live site, untouched since 2026-05-03, has its own real typecheck errors. Currently excluded from CI and the local pre-push hook (B13), same treatment as the already-`DEPRECATED.md`-marked `aips-website`. Nobody has decided whether to actually delete it, formally deprecate it with a marker file (for consistency/clarity), or revive and fix it | — (owner: pick one; low urgency since it's already excluded from every gate) |

## Done (2026-08-07 implementation session)

Items 0a–0e below were found and root-caused during a same-day
evidence-collection pass, then fixed in a same-day follow-up session — see
`docs/homepage/executive-audit.md` for full before/after evidence. Branch
`seo/homepage-product-authority`, 3 commits, not yet pushed or deployed.

- **0a** — soft-404: every unknown URL returned the homepage at HTTP 200.
  Fixed: real `404.html` + `vercel.json` rewrite removed.
- **0b** — Binance live as an accepted payment method, no compliance doc on
  file. Fixed: removed from every surface found by a full-repo sweep,
  including the live AI concierge chatbot's own system prompt.
- **0c** — `/pricing`, `/about`, `/faq` meta descriptions shipped broken
  template interpolation ("tools from BDT ."). Fixed: `parseSeoHead()` now
  resolves against real catalog stats instead of stripping blank.
- **0d** — `/best-ai-for-job-seekers` prerendered the Students page's
  content. Fixed: `guideBlock()` no longer collides with the icon lookup map.
- **0e** — homepage's six solution cards missing from prerendered HTML.
  Fixed: now extracted from `PainPointSection.tsx`'s own `CARDS` array.

Also fixed while implementing 0a–0e: a source-code leak on `/pricing`
("); const [accessFilter, setAccessFilter] = useState(" inside a `<p>`
tag — a P0 hypothesis from the second master prompt, root-caused to a
regex quote-pairing bug, not just patched for that one page), six
unsupported-outcome claims on the solution cards (30-minutes-flat
assignments, 50%-faster delivery, zero-copyright-issues music,
zero-burnout automation, AI-built CVs, every-language-supported coding),
and three Bangla FAQ answers carrying numbers that conflicted with the rest
of the site (founding year, tool count, a stale price, a "#১" claim).

**Also done, 2026-08-07 (continuation session):** vendor-compliance matrix
skeleton (`docs/compliance/vendor-matrix.csv`, 37 vendors, all "Unverified"
by construction — no research performed, just extraction); flagged (not
rewritten) generic shared-account-safety language in `Home.tsx`/`FAQPage.tsx`
per B5; Higgsfield offer verified against the vendor's actual current terms
and two blog posts (`docs/higgsfield/offer-evidence.md`,
`unit-economics.md` — found a real unit-economics red flag, the proposed
BDT 1,199/~1,200-credit price doesn't obviously reconcile with the one
vendor price found); catalogue shared-vs-personal price check added,
former item 16 (all 9 "#1"/superlative claims) fixed across
`BestAISubscriptionPage.tsx`, `BrandPage.tsx` (9 instances, more than the
validator's narrower regex had originally flagged), `CategoryPage.tsx`,
`ComparisonPage.tsx` — including verifying against arena.ai's live
leaderboard that the specific "Opus 4.6 ranked #1" claim no longer matches
current standings, not just removing the phrasing on principle.

**Also done, 2026-08-07 (second continuation session):**

- **Savings-percentage validation (#19, was open above) — done.** Extended
  `validate-catalog.mjs` for bare percentages near savings language, found
  7 real instances, fixed all — including confirming via real math (RATE ×
  officialUSD) that one claimed figure was actively wrong, not just
  unverified, and removing rather than replacing it per the "don't invent a
  replacement number" rule.
- **Hreflang audit — done, found a real sitewide bug.** Every one of the
  272 built pages was asserting the HOMEPAGE's Bangla pair in its static
  HTML regardless of whether it had one, because index.html's hardcoded
  default was never overridden by the prerender step — the correct,
  reciprocal client-side pairing (already existed, in `GuidePage.tsx`)
  never reached crawlable HTML. Fixed at the source with a proper
  `HREFLANG_PAIRS` map in `scripts/prerender-products.mjs`; also fixed
  region codes sitewide (bare "en"/"bn" → "en-BD"/"bn-BD") so hydration
  doesn't immediately re-break it with mismatched codes.
- **Fabricated testimonials — found and removed, all 5 guide pages.** Every
  audience guide page (`StudentsGuide`, `FreelancersGuide`, `CreatorsGuide`,
  `SMBGuide`, `EducatorsGuide`) had four fake named-person testimonials with
  invented outcomes (fake grades, fake earnings — "$5/hr to $25/hr, income
  tripled" — fake follower counts, fake cost savings) attributed to real
  Bangladesh institutions. Also removed matching fabricated hero-stat blocks
  (fake "550+ educators", fake "15 hours saved", fake "GitHub Survey 2025"
  statistic) and a fake "vs Hiring" cost comparison with an invented
  baseline. This is the most severe class of finding this whole project has
  turned up — a small "illustrative example" disclaimer doesn't neutralize
  a named-person-plus-quote presentation, so these were removed entirely,
  not softened.
- **Payment-method compliance documentation** — confirmed the current
  bKash/Nagad/Rocket "logos" are hand-drawn SVG approximations, not real
  assets (#21).

**Also done, 2026-08-07 (4th continuation session, after "Go"):**

- **Chatbot sweep (#24) — done, 2 real bugs found and fixed.** Live-tested
  14 queries against production across prompt-injection, refund-promise,
  and account-safety intents. Found: (1) "will my bKash account get
  banned?" got a confident "No, it won't" — an absolute safety guarantee
  about the customer's own payment account, not covered by the existing
  suspension rule (which was scoped to the AI subscription account only),
  proven inconsistent by the same underlying question with "100%" in it
  getting correctly hedged; (2) "is this shop legal in Bangladesh?" got
  an unqualified "yes, legal" — an unbacked compliance claim inconsistent
  with how the same session correctly hedges the reseller-authorization
  question. Fixed with two new STRICT RULES in `buildSystem()`, verified
  by re-testing the exact same queries against the deployed fix (multiple
  times, to check for stochastic variance) — both now hedge instead of
  asserting certainty. New item #30 for a larger follow-up sample.
- **Fabricated-claims sweep (#28) — done, repo-wide.** Full read of every
  page/section file flagged by grep for superlative and stat-shaped
  patterns (~28 files). Most severe: `SegmentHeroContent.tsx` — the
  homepage's interactive segment-picker result — had the exact same fake
  named-testimonial pattern already removed from the 5 guide pages
  ("Went from $5/hour to $25/hour! — Fatima, Freelancer", "Got 100K
  subscribers in 6 months! — Karim, YouTube Creator", etc.), untouched by
  that earlier sweep because it isn't a guide page. Also found: a second
  fake testimonial in `GuidePage.tsx` (invented CGPA numbers dressed as
  "anonymized real outcomes"), a whole fake-testimonial grid in
  `BlogPostPage.tsx` attributed to real institutions (BRAC University,
  Upwork, a Dhaka business), two fabricated report citations that
  misattribute real-sounding sources to numbers those sources don't say
  (a fake "Adobe 2025 Creative Trends Report" stat, a fake "Shopify 2025"
  stat), fabricated named-company claims with real reputational risk
  ("trusted by engineering teams at OpenAI, Stripe, Figma" — Cursor,
  "used by teams at Google, Shopify" — Gamma), a fake "$34,000/mo profit
  — Medium, March 2026" citation, and roughly a dozen chained
  income/ROI-projection blocks presenting invented numbers as computed
  facts. Fixed across 13 files. New item #31 for what this pass didn't
  cover (data/products.json's own prose, Bangla-language content).

**Also done, 2026-08-07 (third continuation session, "full permission" turn):**

- **Claude model name corrected, Opus 4.6 → Opus 5 (#20 — was open above, now
  done).** Verified via Anthropic's own July 24, 2026 announcement
  (anthropic.com/news/claude-opus-5) plus corroborating coverage: Opus 5 is
  now the top model on the Claude Pro subscription. Fixed every
  live-relevant reference (`data/products.json` + regenerated derived
  files, `BlogPostPage.tsx`, `BrandPage.tsx`, `CategoryPage.tsx`,
  `ComparisonPage.tsx`); left two confirmed-dead/unreferenced files
  untouched. While in `BrandPage.tsx`, also removed a benchmark
  superlative ("scored highest on SWE-bench, GPQA, and Chatbot Arena...
  objectively the smartest AI") — checked, and Opus 5 is NOT #1 on
  Chatbot Arena (#3 as of Aug 2026), so the claim would still have been
  false under the new model name — and a fabricated-stats block ("3x more
  content", "60% faster delivery", "44% avg income increase", no source
  anywhere). Deliberately left "GPT-5.4" mentions alone — no verification
  was done on OpenAI's current naming. See new item #28 for the process
  gap this surfaced (superlative sweep missed non-regex-matching phrasing).
- **Payment logos — text-only fallback applied (#21).**
  `PaymentMethodsSection.tsx`'s hand-drawn SVG letter-marks (colored
  rectangle + single bold letter approximating each brand's real logo)
  replaced with a plain colored accent bar (no letterform) plus the
  existing bold text name — per the master prompt's own sanctioned interim
  fallback for when no official asset file is available. Confirmed
  `PaymentBadges.tsx`/`PageFooter.tsx` needed no change (already text-only
  pills). Build, seo:check, validate-catalog, validate-truth,
  validate-higgsfield-offer all clean; diff scoped to the one file plus
  doc updates.
- **`lib/api-client-react` typecheck (#14) and the root lockfile install
  (#13) — actually root-caused and fixed 2026-08-07, correcting an
  earlier wrong entry in this same file.** An earlier pass this same day
  ran `pnpm install --filter @workspace/api-client-react` and then saw
  `pnpm run typecheck` pass, and recorded both as "resolved, cause
  unclear." That was wrong: it passed locally only because that `install`
  plus an ad-hoc `npx tsc -b` run inside `lib/api-client-react` left a
  built `dist/` and a stale `.tsbuildinfo` on disk in this one checkout —
  it wasn't a real fix, just a locally-lucky state. The real bug surfaced
  once GitHub Actions ran for the first time ever (2026-08-07, after B13's
  billing lock cleared) on a truly clean checkout with none of that
  leftover state: `artifacts/aips-landing` — **the live site itself**,
  not just the already-excluded dead packages — failed typecheck with
  TS6305 "output file has not been built", because `aips-landing`'s own
  `tsconfig.json` references `lib/api-client-react`
  (`useAddToCart`/`getGetCartQueryKey` etc. in `AddToCartButton.tsx`,
  `CartButton.tsx`, `src/lib/api-config.ts`, `src/pages/admin/*`), and
  neither `ci.yml` nor the new pre-push hook (B13) ever built that
  project-reference lib before typechecking its consumers — both called
  `pnpm -r typecheck` directly instead of the root's `pnpm run typecheck`
  (which runs `typecheck:libs` = `tsc --build` first for exactly this
  reason). The 7 `TS7006` implicit-any errors reported alongside it in the
  same CI run were cascading symptoms of the same missing build, not
  separate bugs — verified by rebuilding the libs from a genuinely clean
  state (deleted `dist/` and `.tsbuildinfo` for `lib/db`,
  `lib/api-client-react`, `lib/api-zod`, reran `tsc --build`, then
  `aips-landing`'s typecheck alone) and all 7 disappeared with zero manual
  type-annotation changes needed. **Real fix:** added a
  `pnpm run typecheck:libs` step before the recursive typecheck in both
  `ci.yml` and `.husky/pre-push`. Verified from a truly clean local state
  this time, not just re-running in the same dirty checkout.
  Also confirmed while investigating: `AddToCartButton.tsx`, `CartButton.tsx`,
  and all of `src/pages/admin/*` are unreferenced by `App.tsx`/`main.tsx` or
  any other reachable file — dead code from the same 2026-05-03
  "e-commerce + admin" commit that produced the also-dead
  `artifacts/api-server` (#29). Left in place (Vite tree-shakes unreached
  code out of the real bundle regardless, so there's no live-site risk
  either way) rather than deciding to delete live-site source files
  unilaterally — that's a bigger, less reversible call than a type-safety
  fix and belongs with #29's owner decision, not bundled into it silently.

**Explicitly not doing:** bulk AI-generated product descriptions; near-duplicate
pages per keyword variant; fabricated ratings to clear the GSC "Product snippets
invalid" warning — the catalog's own truth validator forbids it, and it is right.
