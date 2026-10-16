#!/usr/bin/env node
// AIPS media preparation: Windows source image -> optimized, versioned
// WebP/AVIF derivatives for R2 publication. See ops/media/MEDIA-PUBLICATION-WORKFLOW.md.
// Reads nothing from the network; writes only into the gitignored
// media-intake/derived/<slug>/ directory; never touches the source file.
// Prints a JSON summary and a DRAFT manifest asset entry (publicationStatus
// stays DRAFT until the CEO approval fields are filled by an operator).
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const DERIVED_ROOT = join(APP, "media-intake", "derived");
const ALLOWED_INPUT_MIME = new Set(["image/png", "image/jpeg", "image/webp", "image/avif"]);

function fail(message) {
  console.error(`[media-prep] ERROR: ${message}`);
  process.exit(1);
}

function sha256Hex(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function sniffMime(buffer) {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (buffer.length >= 12 && buffer.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = buffer.subarray(8, 12).toString("ascii");
    if (["avif", "avis"].includes(brand)) return "image/avif";
  }
  return null;
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) fail(`Unexpected argument: ${token}`);
    const key = token.slice(2);
    const value = argv[i + 1];
    if (value === undefined || value.startsWith("--")) {
      if (token === "--force") { args.force = true; continue; }
      fail(`Missing value for --${key}`);
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.file || !args.slug) fail("Usage: node scripts/prepare-media-image.mjs --file <source> --slug <page-slug> [--alt-en ...] [--alt-bn ...] [--caption-en ...] [--caption-bn ...] [--max-width 960] [--source-type OWNER_SUPPLIED|GENERATED_EDITORIAL|FIRST_PARTY_CAPTURE|AUTHORIZED_PROVIDER_ASSET] [--license-status OWNED|AUTHORIZED|LICENSED] [--generator ...] [--generation-note ...] [--ai-disclosure ...] [--force]");
if (!/^[a-z0-9][a-z0-9-]*$/.test(args.slug)) fail("--slug must be a safe lowercase page slug (letters, digits, hyphens)");

const ALLOWED_SOURCE_TYPES = new Set(["OWNER_SUPPLIED", "GENERATED_EDITORIAL", "FIRST_PARTY_CAPTURE", "AUTHORIZED_PROVIDER_ASSET"]);
const ALLOWED_LICENSE_STATUS = new Set(["OWNED", "AUTHORIZED", "LICENSED"]);
const sourceType = args["source-type"] ?? "OWNER_SUPPLIED";
const licenseStatus = args["license-status"] ?? (sourceType === "GENERATED_EDITORIAL" ? "OWNED" : "OWNED");
if (!ALLOWED_SOURCE_TYPES.has(sourceType)) fail(`--source-type must be one of: ${[...ALLOWED_SOURCE_TYPES].join(", ")}`);
if (!ALLOWED_LICENSE_STATUS.has(licenseStatus)) fail(`--license-status must be one of: ${[...ALLOWED_LICENSE_STATUS].join(", ")}`);
if (sourceType === "AUTHORIZED_PROVIDER_ASSET" && licenseStatus === "OWNED") fail("AUTHORIZED_PROVIDER_ASSET media cannot claim OWNED license status; use AUTHORIZED or LICENSED");
if (sourceType !== "GENERATED_EDITORIAL" && args["ai-disclosure"]) fail("--ai-disclosure is only valid for GENERATED_EDITORIAL media");

const sourcePath = resolve(process.cwd(), args.file);
const sourceStat = statSync(sourcePath, { throwIfNoEntry: false });
if (!sourceStat?.isFile()) fail(`Source file not found: ${sourcePath}`);
if (sourceStat.size <= 0) fail("Source file is empty");
if (sourceStat.size > 100 * 1024 * 1024) fail("Source larger than 100 MiB; optimize before intake");

const sourceBuffer = readFileSync(sourcePath);
const sourceMime = sniffMime(sourceBuffer);
if (!sourceMime) fail("Unsupported source format; use PNG, JPEG, WebP or AVIF");
if (!ALLOWED_INPUT_MIME.has(sourceMime)) fail(`Source MIME ${sourceMime} is not an allowed intake format`);

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  fail("sharp is not installed in this workspace package. Run: pnpm --filter @workspace/aips-landing install");
}

const sourceMeta = await sharp(sourceBuffer).metadata();
const sourceWidth = sourceMeta.width ?? 0;
const sourceHeight = sourceMeta.height ?? 0;
if (!sourceWidth || !sourceHeight) fail("Could not read source dimensions");

const maxWidth = Math.min(Number(args["max-width"] ?? 960) || 960, sourceWidth);
const targets = [];
if (maxWidth < sourceWidth) targets.push({ label: "full", width: maxWidth });
else targets.push({ label: "full", width: sourceWidth });
if (sourceWidth > 480) targets.push({ label: "thumb", width: 480 });

const outDir = join(DERIVED_ROOT, args.slug);
mkdirSync(outDir, { recursive: true });

const derivatives = [];
for (const target of targets) {
  for (const format of ["webp", "avif"]) {
    const outPath = join(outDir, `${args.slug}-v1-${target.label === "thumb" ? "480" : String(target.width)}.${format}`);
    if (statSync(outPath, { throwIfNoEntry: false }) && !args.force) {
      fail(`Derivative already exists: ${outPath} (use --force to regenerate)`);
    }
    let pipeline = sharp(sourceBuffer).resize({ width: target.width, withoutEnlargement: true });
    pipeline = format === "webp" ? pipeline.webp({ quality: 82 }) : pipeline.avif({ quality: 60 });
    const outBuffer = await pipeline.toBuffer();
    writeFileSync(outPath, outBuffer);
    const outMeta = await sharp(outBuffer).metadata();
    derivatives.push({
      label: target.label,
      format,
      width: outMeta.width,
      height: outMeta.height,
      bytes: outBuffer.length,
      sha256: sha256Hex(outBuffer),
      relativePath: `artifacts/aips-landing/media-intake/derived/${args.slug}/${outPath.split(/[\\/]/).pop()}`,
      suggestedObjectKey: `media/products/${args.slug}/${outPath.split(/[\\/]/).pop()}`,
    });
  }
}

const primary = derivatives.find((d) => d.label === "full" && d.format === "webp") ?? derivatives[0];
const summary = {
  source: {
    path: sourcePath,
    extension: extname(sourcePath).toLowerCase(),
    mime: sourceMime,
    bytes: sourceBuffer.length,
    sha256: sha256Hex(sourceBuffer),
    width: sourceWidth,
    height: sourceHeight,
  },
  derivatives,
  draftManifestEntry: {
    id: `${args.slug}-hero-v1`,
    kind: "PRODUCT_HERO",
    publicationStatus: "DRAFT",
    mediaKey: `media/products/${args.slug}/${args.slug}-v1.webp`,
    objectKey: primary.suggestedObjectKey,
    publicUri: `https://media.aipremiumshop.com/${primary.suggestedObjectKey}`,
    mimeType: "image/webp",
    width: primary.width,
    height: primary.height,
    byteSize: primary.bytes,
    sha256: primary.sha256,
    altEn: args["alt-en"] ?? "",
    altBn: args["alt-bn"] ?? "",
    captionEn: args["caption-en"] ?? "",
    captionBn: args["caption-bn"] ?? "",
    decorative: false,
    sourceType,
    licenseStatus,
    generator: args.generator ?? null,
    generationNote: args["generation-note"] ?? null,
    aiDisclosure: sourceType === "GENERATED_EDITORIAL" ? (args["ai-disclosure"] ?? "AI-generated editorial illustration; no provider UI, logos, screenshots or endorsements reproduced") : null,
    approvedAt: null,
    approvedBy: null,
  },
  draftManifestLink: {
    mediaId: `${args.slug}-hero-v1`,
    entityType: "product",
    entityKey: args.slug,
    placement: "product-media",
    isPrimary: true,
    locale: "en-BD",
  },
  nextSteps: [
    "Review derivatives; fill alt/caption/rights truthfully",
    "Dry-run upload: node scripts/upload-r2-media.mjs --file <derived> --key <objectKey> --dry-run",
    "Upload, verify public URL, then set publicationStatus APPROVED + approvedAt/approvedBy in data/media/manifest.json",
    "Regenerate catalog: node scripts/generate-media-catalog.mjs",
  ],
};

console.log(JSON.stringify(summary, null, 2));
