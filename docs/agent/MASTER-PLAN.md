# Master plan

**Goal:** make aipremiumshop.com the most *trustworthy* Bangladesh-focused source
for AI video subscriptions — with trustworthiness as the actual mechanism, not a
tagline. The site's structural advantage over the resellers it competes with is
that it can afford to publish what it has not verified.

## Phases

1. **Compliance and truth foundation** — DONE (session 16). Claims are gated at
   build time rather than by review discipline. Correct content decays; a gate
   that exits non-zero does not.
2. **AI Video authority surfaces** — DONE for the category hub, the homepage
   module and the Higgsfield page. Remaining: the content cluster listed in
   `docs/seo/higgsfield-keyword-map.csv`.
3. **Resolve the trust debt** — BLOCKERS B1, B2, B5. Blocks nothing technically;
   caps everything reputationally.
4. **Verified comparisons** — needs B3 plus real side-by-side testing and credit
   approval. The highest-value content the site does not have.
5. **Performance** — flash fixed; chunk sizes and proper SSG remain.

## Standing rules

- Never type a price, count or claim into a component. Derive it, or gate it.
- Every gate must be regression-tested by deliberately breaking it.
- "HTTP 200" is not evidence — every unmatched route on this SPA returns 200.
  Check content.
- When a business fact cannot be verified, publish the uncertainty rather than
  either the claim or the silence.
