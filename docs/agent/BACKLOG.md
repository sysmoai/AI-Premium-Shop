# Backlog

Ordered by value / effort. Anything blocked names its blocker from `BLOCKERS.md`.

| # | Item | Blocked by |
|---|---|---|
| 1 | Resolve the "10,000+ customers" claim site-wide | B1 (owner) |
| 2 | Verify the six Higgsfield entitlements from the real account | B3 (owner) |
| 3 | Written replacement/warranty policy, or removal | B2 (owner) |
| 4 | Playwright cold-load screenshot regression test — still the only gap that would catch a render-breaking bug like B9 | — (new dependency) |
| 5 | Higgsfield vs Runway / vs Kling comparisons | B3 + credit approval |
| 6 | Higgsfield Supercomputer explainer page | B3 |
| 7 | AI video cost calculator | — |
| 8 | AI video model-selection quiz | — |
| 9 | Bangla AI-video guide with real local value | B7 |
| 10 | Shared-access authorization audit (44 products) | B5 (owner) |
| 11 | BrandPage 160 KB / BlogPostPage 116 KB chunk reduction | — |
| 12 | Proper SSG so static bodies come from the components themselves | — (large) |
| 13 | Fix the workspace lockfile `overrides` mismatch | — |
| 14 | Build `lib/api-client-react` so `pnpm run typecheck` passes | — |
| 15 | Payment methods have no single source of truth — at least 5 independent hardcoded lists found (`PaymentMethodsSection.tsx`, `PaymentBadges.tsx`, `PageFooter.tsx`, `data/brand.json`, `scripts/generate-llms-txt.mjs`), each requiring its own manual edit when a method is added/removed. Binance had to be removed from all 5 separately on 2026-08-07 — see `docs/homepage/executive-audit.md` | — (real refactor: one data source, every component/script reads it) |
| 17 | Delivery-time claims disagree across surfaces: prerendered homepage body and About page say "5–30 minutes"; `FAQPage.tsx`'s English and Bangla FAQs say "5–15 minutes... max 2-3 hours off-hours" (internally consistent with each other, just not with the other two surfaces) | — (owner: which is actually true) |
| 18 | `midjourney-bangladesh`'s "Pro Shared" tier is priced ৳4,788 — more than BOTH the "Personal" (৳2,495) and "Pro" personal (৳3,990) tiers of the same product. A shared/split tier costing more than the equivalent (or a cheaper) personal tier defeats the commercial premise of sharing; either a real pricing error or a legitimate reason not evident from the data (e.g. Pro Shared includes something Pro Personal doesn't). Caught by the new `validate-catalog.mjs` shared-vs-personal check (2026-08-07) — see `docs/agent/OWNER-ACTIONS.md`-style evidence in the commit | — (owner: confirm the price or fix it) |
| 19 | "Savings vs official" percentage claims (`ComparisonPage.tsx`: "~88%", "~80%" and likely elsewhere) aren't covered by any validator — same unsupported-numeric-claim category as the superlatives just fixed (#16, done), just a different regex shape | — (extend `validate-truth.mjs`'s pattern list) |
| 20 | Is "Claude Opus 4.6" still the model Anthropic's actual Claude Pro consumer subscription currently exposes? Left the model name in place while removing the false "#1 on Chatbot Arena" ranking claim attached to it (2026-08-07) — Chatbot Arena's current leaderboard shows newer Claude models (Opus 5 family) on top, which raises the question of whether "Opus 4.6" itself is stale, but that's a different claim than the one checked and wasn't verified either way | — (owner or a fresh WebFetch check against Anthropic's own current Claude Pro plan page) |

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

**Explicitly not doing:** bulk AI-generated product descriptions; near-duplicate
pages per keyword variant; fabricated ratings to clear the GSC "Product snippets
invalid" warning — the catalog's own truth validator forbids it, and it is right.
