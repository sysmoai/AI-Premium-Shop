# ⚠️ DEPRECATED — NOT THE LIVE APP

**This Next.js app is NOT in production and has a diverging catalog.**

- **Live app:** `artifacts/aips-landing` (Vite SPA) → https://aipremiumshop.com
- **Vercel project:** `prj_aP4bi30UW8mcHgBvU7E72yyFOPQd` (aips-landing)
- **Git auto-deploy:** OFF for this project (removed 2026-07-30)

**Why this exists:** Built as a parallel Next.js version with SSR before the decision was made to keep the Vite SPA. Its catalog (`src/data/products.json`) diverges from the canonical source (`artifacts/aips-landing/data/products.json`).

**Do NOT:**
- Deploy this app — it will conflict with the live SPA
- Edit its catalog — changes won't reach production
- Link it to Vercel — already unlinked intentionally

**If you want to revive this:**
1. Reconcile its catalog with `artifacts/aips-landing/data/products.json` first
2. Get CEO approval for the architecture switch
3. Coordinate with the COORDINATION.md domain setup

**Decision date:** 2026-07-30 — kept SPA, archived Next.js  
**Archived by:** Claude Opus 5
