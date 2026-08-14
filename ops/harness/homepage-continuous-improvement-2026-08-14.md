# AIPS Homepage Continuous Improvement Harness — 2026-08-14

## Locked architecture
- Do not rebuild or replace Homepage V2.
- Production foundation remains `HomeV2` composed inside `HomepagePremiumShell` by `RootApp`.
- Improvements must be incremental and preserve working behavior unless a measured defect requires change.

## Release policy
Every production promotion must pass the same exact-SHA controls:
1. TypeScript/typecheck and catalog/truth validation.
2. Production-equivalent static build and SEO/prerender audits.
3. Chromium/Playwright interaction tests across desktop and 390px mobile.
4. Bundle/performance budgets.
5. READY Vercel preview for the exact candidate SHA when deployment capacity permits.
6. Custom-domain post-deploy verification including build identity, robots/canonical/schema, representative commerce routes and runtime errors.
7. Never weaken a gate to make a candidate green.

## UI/UX policy
- Improve product discovery, conversion clarity, accessibility, responsiveness or performance; reject decorative complexity without measurable value.
- Keep Motion/framer-motion as the animation stack. Prefer transform/opacity and one-time or interaction-driven motion.
- Respect `prefers-reduced-motion`/`useReducedMotion` for every transform/layout animation.
- Avoid unpausable infinite movement when the same information can be presented as user-controlled scroll/swipe.
- Desktop mega menus and mobile navigation must expose real category/task/product paths.
- Search must be keyboard accessible, task-aware and must never surface retired product routes.

## Truth policy
- Commercial labels, payment methods and catalog counts should come from governed/generated public data when available, not duplicate hardcoded marketing copy.
- Do not add or restore unsupported warranty, delivery SLA, social proof, provider authorization or unlimited-use claims.
- Retired Replit commerce routes must remain excluded from discovery surfaces.

## Current branch
`improve/homepage-v2-continuous-2026-08-14`

## First checkpoint
- task-aware premium search using existing category/task taxonomy
- accessible search dialog with focus loop, Escape close, focus restoration and background scroll lock
- mobile category → task/subcategory discovery using existing URLs
- viewport-safe scroll behavior for mobile and desktop mega menus
- reduced-motion fixes in navigation accordions/chevrons/search transitions
- homepage payment labels derived from `HOMEPAGE_V2.payments`
- popular-brand infinite marquee replaced with user-controlled horizontal scroll plus one-time reveal
- E2E regression coverage expanded for the above
