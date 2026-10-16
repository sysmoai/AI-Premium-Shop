# AIPS AI-Creative Provenance & Metadata Policy

Status: ACTIVE (2026-10-16). Applies to every asset entering
`data/media/manifest.json`. Companion to ops/media/MEDIA-PUBLICATION-WORKFLOW.md.

## 1. Why this exists
The first version of `scripts/prepare-media-image.mjs` stamped every draft
with `sourceType: OWNER_SUPPLIED` / `licenseStatus: OWNED` by default. That
is untruthful for generated or third-party media and could misstate rights.
This document + the script's provenance flags close that gap.

## 2. Classification rules (registry values)
- `OWNER_SUPPLIED` — a human owner provided the source file and owns it
  (or has already cleared its rights). Default only for the manual intake
  path; never for tool-generated images.
- `GENERATED_EDITORIAL` — produced by AIPS tooling (deterministic SVG
  composition, licensed generator, etc.) with no provider UI, logos,
  screenshots or endorsements reproduced. May claim `licenseStatus: OWNED`
  because AIPS created it.
- `FIRST_PARTY_CAPTURE` — AIPS-captured photos/screens of its own
  operations. `OWNED`.
- `AUTHORIZED_PROVIDER_ASSET` — provider-supplied/branded material used
  with authorization. MUST NOT claim `OWNED`; use `AUTHORIZED` or
  `LICENSED` and record the authorization source.
Fail-closed: invalid combinations are rejected by the script (tested).

## 3. Required provenance fields (draft entry)
- `sourceType`, `licenseStatus` — validated against registry values.
- `generator` — tool/model + version, e.g. `aips-svg-compose/1.0 + sharp/0.35.5`.
- `generationNote` — what was composed and what was NOT reproduced
  (no provider UI/logos/screenshots).
- `aiDisclosure` — platform-facing disclosure text for generated media.
- `sha256`, `byteSize`, `width/height` — immutable per asset.
- `approvedAt` / `approvedBy` — filled ONLY by the operator after real
  CEO approval. Never auto-filled; scripts cannot fabricate approval.

## 4. Metadata persistence after conversion
- Sharp's WebP/AVIF encode does NOT carry IPTC/XMP from a PNG rasterized
  from SVG (the SVG source has no embedded metadata).
- CONSEQUENCE for Google Merchant surfaces: derivatives that require
  IPTC `DigitalSourceType` (e.g. `trainedAlgorithmicMedia` for synthetic
  imagery) cannot currently be produced by this pipeline with embedded
  IPTC. Until a metadata-embedding step exists, **do not publish
  generated derivatives as Google Merchant primary images**; use
  first-party photographic captures (OWNER_SUPPLIED/FIRST_PARTY_CAPTURE)
  for Merchant primary images, and keep generated art for editorial/
  product-page/social slots where structured disclosure is carried in the
  manifest and alt text instead.
- Tracked follow-up: add an EXIF/IPTC writer step (e.g. piexifjs or
  exiftool wrapper) with a contract test before any Merchant use of
  generated derivatives.

## 5. Synthetic tests
`scripts/test-prepare-media-image.mjs` covers:
- GENERATED_EDITORIAL provenance recorded truthfully (generator, note,
  disclosure present; licenseStatus OWNED allowed).
- AUTHORIZED_PROVIDER_ASSET + OWNED rejected (fail-closed).
- No credential material in outputs; fixture derivatives are cleaned up.
Run via CI (AIPS Upgrade Validation) on every app PR.
