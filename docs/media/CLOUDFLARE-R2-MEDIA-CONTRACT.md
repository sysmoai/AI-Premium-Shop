# AI Premium Shop — Canonical Cloudflare R2 Media Contract

Status: active  
Canonical store: Cloudflare R2  
Bucket: `aips-media`  
Public origin: `https://media.aipremiumshop.com`  
Repository role: code and governed media metadata only; do not add new image/video binaries to Git.

## Authority

This document supersedes the legacy Supabase upload instructions in `IMAGE-MANAGEMENT-SETUP.md`, `VIDEO-UPLOAD-GUIDE.md`, and the old root `upload-*.mjs` scripts for new AIPS media work. Those files may remain as historical implementation artifacts, but they are not the current upload path.

The canonical environment contract is:

```text
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME=aips-media
R2_PUBLIC_URL=https://media.aipremiumshop.com
```

Credentials must be supplied as execution-environment secrets. Never pass them on the command line, commit them, print them, put them in generated manifests, or copy them into tickets/chat logs.

## Uploader

Use:

```bash
cd artifacts/aips-landing
node scripts/upload-r2-media.mjs \
  --file /absolute/or/relative/path/to/asset.webp \
  --key homepage/2026-08/hp-hero-01-v1.webp \
  --dry-run
```

After the dry-run is correct and the R2 secrets are present in the execution environment, remove `--dry-run` to upload.

The uploader:

- validates the file signature instead of trusting the extension;
- rejects extension/signature mismatches;
- rejects unsafe object keys;
- computes SHA-256 and byte size;
- signs the R2 S3-compatible PUT using AWS Signature V4;
- applies immutable caching to versioned objects by default;
- verifies the object through `media.aipremiumshop.com` after upload;
- does not emit R2 credentials.

CI runs `scripts/test-r2-media-uploader.mjs` without real credentials to prove the dry-run, signature validation, object-key safety, and secret non-disclosure contract.

## Object key rules

Use stable placement prefixes plus explicit versions. Never overwrite an approved object in place.

Examples:

```text
homepage/2026-08/hp-hero-01-v1.webp
homepage/2026-08/hp-hero-01-mobile-v1.webp
homepage/2026-08/hp-demo-01-v1.webm
homepage/2026-08/hp-demo-01-poster-v1.webp
editorial/2026-08/agents-spotlight-v1.webp
```

When replacing media, create `-v2`, update the manifest after QA, deploy, then retire the old manifest record later. Versioned URLs are eligible for `public, max-age=31536000, immutable` caching.

## Homepage V2 approval sequence

For every homepage image/video:

1. Define the placement ID and objective (`HP-HERO-01`, `HP-DEMO-01`, etc.).
2. Generate/capture the source. Generated editorial media must not be represented as documentary customer/staff/order/provider-UI evidence.
3. QA composition, factual implications, cropping, text legibility and mobile safety.
4. Optimize the delivery derivative. Strip unnecessary metadata; use responsive AVIF/WebP for still images where appropriate; videos require a poster and should not autoplay with sound.
5. Run the R2 uploader in dry-run mode and record its proposed object key, MIME type, byte size and SHA-256.
6. Upload through R2 and require successful verification from `media.aipremiumshop.com`.
7. Add the asset to `artifacts/aips-landing/data/media/manifest.json` with provenance and approval metadata.
8. Add/adjust the homepage media link only after the asset itself is approved.
9. Run media validation, typecheck, public projection tests, build, SEO/static audit and Homepage V2 E2E tests.
10. Inspect the exact-head Vercel preview on desktop and mobile before any production route switch.

## Approved asset manifest requirements

An `APPROVED` media record is fail-closed unless it includes at least:

- `id`
- `mediaKey`
- `kind`
- `publicationStatus: "APPROVED"`
- `publicUri` on `https://media.aipremiumshop.com`
- `objectKey` exactly matching the public URI path
- `mimeType`
- `sha256` (64 hex characters)
- `byteSize` (positive integer)
- `sourceType`: one of `GENERATED_EDITORIAL`, `FIRST_PARTY_CAPTURE`, `AUTHORIZED_PROVIDER_ASSET`, `OWNER_SUPPLIED`
- `licenseStatus`: one of `OWNED`, `AUTHORIZED`, `LICENSED`
- `approvedAt` ISO timestamp
- `approvedBy`
- intrinsic `width` and `height` for images
- `durationMs` and an approved `posterMediaId` for video/animation
- meaningful `altEn` unless explicitly `decorative: true`

Homepage links must use `entityType: "homepage"`, `entityKey: "home"`, an approved placement (`hero`, `demo`, `job`, `editorial`, `trust`), and the hero must be primary.

## `HP-HERO-01`

Current selected direction: Candidate 3 from the Homepage V2 visual review. The intended first delivery derivative is a 1000×800 WebP with metadata stripped and a stable versioned R2 key. It must not be marked `APPROVED` until the actual bytes are recovered, uploaded, verified, visually QA'd and registered with the resulting SHA-256/byte-size/provenance data.

The page is intentionally useful without the hero asset; `HomepageHeroMedia` fails safely to an explicit reserved slot until the approved registry record exists.

## Security debt

Legacy Supabase service-role material was found in historical media tooling. Do not reuse or quote it. Treat those credentials as rotation/sanitization debt and remove or rotate them through the relevant service owner when that access is available. New Cloudflare/R2 work must not depend on those scripts or credentials.
