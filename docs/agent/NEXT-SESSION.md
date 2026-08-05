# Next session — start here

**Written:** 2026-08-05, end of session 16.

## Do this first (5 minutes)

From the repo root:

```bash
pnpm install --filter ./artifacts/aips-landing --no-frozen-lockfile
cd artifacts/aips-landing && pnpm run build && pnpm run seo:check
curl -s https://aipremiumshop.com/product/higgsfield-ai-bangladesh | grep -c "What we have not verified"
```

Expect: build green, `seo:check` 0 errors, the curl returns `1`. If the curl
returns `0`, production has drifted from `main` — check Vercel before doing
anything else.

Then read `CURRENT-STATE.md` and `BLOCKERS.md`.

## The single highest-value next task

**Resolve B1** — the "10,000+ customers since 2022" claim. It is the largest
remaining trust liability, it blocks nothing technically, and it is a one-commit
change once the owner answers. Ask the owner the B1 question verbatim, then
either document the evidence or run the removal across:

- `src/pages/ProductPage.tsx` (4 sites — grep for `10,000`)
- `data/products.json` (~70 FAQ answers)
- `index.html` (default meta description)
- `scripts/prerender-products.mjs` (homepage static body)

Add a `seo-check` rule for it afterwards so it cannot come back, the way the
Higgsfield claims are now gated.

## Then, in order

1. **B3** — get the six Higgsfield entitlements verified from the real account
   and move them out of `pendingVerification`. This is the change that makes the
   product page convert.
2. **Playwright flash regression test.** Spec section 6 asked for one; session 16
   fixed the flash and documented it but shipped no automated screenshot test.
   The repo has no Playwright setup at all, so this is a genuine new dependency —
   scope it deliberately rather than bolting it on.
3. **Content cluster.** `docs/seo/higgsfield-keyword-map.csv` lists the target
   pages. The highest-intent gap with no page today is a Higgsfield vs Runway /
   vs Kling comparison — but section 13 forbids publishing one without real
   side-by-side testing, which needs B3 resolved and credit approval first.
4. **BrandPage 160 KB / BlogPostPage 116 KB chunks** — carried from session 15.

## Do not

- Do not enable a Higgsfield checkout, or use "official" / "partner" /
  "authorized". The build will fail; that is intended. See `docs/compliance/`.
- Do not move the inline `<style>` out of `index.html`, and do not reintroduce
  the Google Fonts `@import` in `index.css` — either restores the page-load flash.
- Do not type a price, credit count or product total anywhere. Derive them.
- Do not bulk-generate product descriptions.
