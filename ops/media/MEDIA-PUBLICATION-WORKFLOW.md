# AIPS Media Publication Workflow (Windows → Live Product Page)

Status: infrastructure VERIFIED ready (2026-10-16); first approved asset PENDING.
Tracks issue #49. Every step is reversible until the manifest/PR step.

## Verified-ready chain (evidence)
- R2 bucket `aips-media` (public), custom domain `media.aipremiumshop.com`
  (probe object returns HTTP 200).
- Scoped S3 credential `aips-media-upload-v2` (bucket `aips-media`,
  Object Read & Write; sibling-tenant deny-test passed; local gitignored
  `.env.r2-local` holds the values). Exposed predecessor token deleted
  (F-021, PR #141).
- Uploader: `artifacts/aips-landing/scripts/upload-r2-media.mjs`
  (SigV4, signature/MIME/key safety checks, public verification loop;
  contract test passes).
- Registry: `artifacts/aips-landing/data/media/manifest.json` (empty).
  Validator `scripts/validate-media-registry.mjs` passes.
- Catalog generator `scripts/generate-media-catalog.mjs` → `public/generated/media-catalog.json`.
- React `ProductMedia.tsx` already consumes the catalog on product pages
  (`ProductPage.tsx` line ~295); renders nothing when no APPROVED asset.
- Brand rules: `ops/ssot/brand-visual.json` (logo locked, forbidden claim
  classes — media must not carry price/social-proof/SLA claims).

## Full chain (one approved image at a time)
1. **Intake** — CEO provides exact Windows path + target page slug.
   Copy (never move/overwrite the original) into
   `artifacts/aips-landing/data/media/intake/<slug>/` (gitignored).
   Record: SHA-256, bytes, MIME, dimensions, source/rights statement.
2. **Derivatives** — `node scripts/prepare-media-image.mjs --file <src>
   --slug <slug> --alt-en "..." --alt-bn "..."`
   produces WebP (+AVIF where supported) at capped widths (max 960px for
   product slots, 480px thumb) in `data/media/derived/<slug>/`,
   never overwriting originals. Alt text must be truthful, no claims.
3. **Dry-run upload** — `node artifacts/aips-landing/scripts/upload-r2-media.mjs
   --file <derived> --key media/products/<slug>/<slug>-v1.webp --dry-run`
   (credentials from `.env.r2-local`, never CLI args).
4. **Upload** — same command without `--dry-run`. Script verifies public
   HTTPS response, MIME and byte size itself. Object keys are versioned;
   no overwrite of unrelated keys; never bulk-delete.
5. **Manifest** — append ONE asset entry + ONE product link (entityType
   "product", entityKey = exact page slug, isPrimary true, placement
   "product-media") with rights/approval fields, then run
   `node artifacts/aips-landing/scripts/validate-media-registry.mjs`.
   CEO approval is recorded in the entry (approver, timestamp) — never
   invented.
6. **Catalog** — `node artifacts/aips-landing/scripts/generate-media-catalog.mjs`
   (committed output `public/generated/media-catalog.json`).
7. **Local verify** — build + `pnpm run seo:check`; Playwright product page
   desktop/mobile: image renders, no console errors, fallback when catalog
   missing is silent (component never breaks the page).
8. **PR + release** — branch → PR (ssot/build/validate; deploy path
   `artifacts/aips-landing/**` triggers Cloudflare release on merge) →
   verify live `aips-build.json` SHA changed → verify public image URL and
   on-page rendering with the visible browser (desktop + mobile).
9. **Closeout** — evidence in issue #49; #49 stays open until this full
   chain completes for the first real asset.

## Rollback
- Pre-merge: delete branch; manifest entry removal is a revert commit.
- Post-merge/pre-deploy: revert PR.
- Post-deploy: `npx wrangler rollback` (project ai-premium-shop) and/or
  remove the manifest link + regenerate catalog in a follow-up PR.

## Hard rules
- No synthetic fixture is ever labeled as an approved product image.
- Never publish screenshots of provider UIs as product imagery without
  rights; never fabricate endorsement.
- Keep original CEO files untouched; intake is a copy.
- No customer data, no prices, no SLAs in alt/caption text.
