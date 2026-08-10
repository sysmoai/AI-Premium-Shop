#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(APP, "data/media/manifest.json"), "utf8"));
const CANONICAL_MEDIA_ORIGIN = "https://media.aipremiumshop.com";
const allowedKinds = new Set([
  "LOGO", "PRODUCT_HERO", "PLAN_HERO", "POSTER", "GALLERY_IMAGE",
  "SCREENSHOT", "INFOGRAPHIC", "COMPARISON_GRAPHIC", "VIDEO_DEMO",
  "VIDEO_TUTORIAL", "VIDEO_POSTER", "ANIMATION", "OG_IMAGE",
  "CATEGORY_HERO", "BRAND_ASSET",
]);
const allowedStatus = new Set(["DRAFT", "APPROVED", "SUSPENDED", "RETIRED"]);
const allowedHomepagePlacements = new Set(["hero", "demo", "job", "editorial", "trust"]);
const allowedSourceTypes = new Set(["GENERATED_EDITORIAL", "FIRST_PARTY_CAPTURE", "AUTHORIZED_PROVIDER_ASSET", "OWNER_SUPPLIED"]);
const allowedLicenseStatus = new Set(["OWNED", "AUTHORIZED", "LICENSED"]);
const imageKinds = new Set([
  "LOGO", "PRODUCT_HERO", "PLAN_HERO", "POSTER", "GALLERY_IMAGE", "SCREENSHOT",
  "INFOGRAPHIC", "COMPARISON_GRAPHIC", "VIDEO_POSTER", "OG_IMAGE", "CATEGORY_HERO", "BRAND_ASSET",
]);
const videoKinds = new Set(["VIDEO_DEMO", "VIDEO_TUTORIAL", "ANIMATION"]);
const assetIds = new Set();
const assetsById = new Map();

function positiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function assertApprovedR2Asset(asset) {
  if (!asset.objectKey || !/^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/.test(asset.objectKey) || asset.objectKey.split("/").includes("..")) {
    throw new Error(`${asset.id}: approved media requires a safe, versioned objectKey`);
  }
  if (!/^[a-f0-9]{64}$/i.test(String(asset.sha256 ?? ""))) {
    throw new Error(`${asset.id}: approved media requires a SHA-256 digest`);
  }
  if (!positiveInteger(asset.byteSize)) {
    throw new Error(`${asset.id}: approved media requires positive byteSize`);
  }
  if (!allowedSourceTypes.has(asset.sourceType)) {
    throw new Error(`${asset.id}: approved media requires sourceType (${[...allowedSourceTypes].join(", ")})`);
  }
  if (!allowedLicenseStatus.has(asset.licenseStatus)) {
    throw new Error(`${asset.id}: approved media requires licenseStatus (${[...allowedLicenseStatus].join(", ")})`);
  }
  if (!asset.approvedAt || Number.isNaN(Date.parse(asset.approvedAt))) {
    throw new Error(`${asset.id}: approved media requires an ISO approvedAt timestamp`);
  }
  if (!asset.approvedBy) {
    throw new Error(`${asset.id}: approved media requires approvedBy`);
  }

  let publicUrl;
  try {
    publicUrl = new URL(asset.publicUri);
  } catch {
    throw new Error(`${asset.id}: approved media publicUri must be an absolute HTTPS URL`);
  }
  if (publicUrl.origin !== CANONICAL_MEDIA_ORIGIN) {
    throw new Error(`${asset.id}: approved media must use canonical Cloudflare R2 origin ${CANONICAL_MEDIA_ORIGIN}`);
  }
  const uriKey = decodeURIComponent(publicUrl.pathname.replace(/^\/+/, ""));
  if (uriKey !== asset.objectKey) {
    throw new Error(`${asset.id}: publicUri path must exactly match objectKey`);
  }
  if (publicUrl.search || publicUrl.hash) {
    throw new Error(`${asset.id}: approved media publicUri must be stable and must not contain query strings or fragments`);
  }

  if (imageKinds.has(asset.kind)) {
    if (!positiveInteger(asset.width) || !positiveInteger(asset.height)) {
      throw new Error(`${asset.id}: approved image media requires intrinsic width and height`);
    }
  }
  if (videoKinds.has(asset.kind)) {
    if (!positiveInteger(asset.durationMs)) {
      throw new Error(`${asset.id}: approved video/animation requires positive durationMs`);
    }
    if (!asset.posterMediaId) {
      throw new Error(`${asset.id}: approved video/animation requires posterMediaId`);
    }
  }
  if (!asset.decorative && !String(asset.altEn ?? "").trim()) {
    throw new Error(`${asset.id}: approved non-decorative media requires altEn`);
  }
}

for (const asset of manifest.assets ?? []) {
  if (!asset.id || assetIds.has(asset.id)) throw new Error(`Duplicate/missing media asset id: ${asset.id}`);
  assetIds.add(asset.id);
  assetsById.set(asset.id, asset);
  if (!allowedKinds.has(asset.kind)) throw new Error(`${asset.id}: unsupported media kind ${asset.kind}`);
  if (!allowedStatus.has(asset.publicationStatus)) throw new Error(`${asset.id}: unsupported publication status ${asset.publicationStatus}`);
  if (!asset.publicUri || !/^https:\/\/|^\//.test(asset.publicUri)) throw new Error(`${asset.id}: publicUri must be HTTPS or root-relative`);
  if (!asset.mimeType) throw new Error(`${asset.id}: mimeType is required`);
  if (asset.kind.startsWith("VIDEO_") && !asset.posterMediaId && asset.publicationStatus === "APPROVED") {
    throw new Error(`${asset.id}: approved video requires posterMediaId`);
  }
  if (asset.offerId && !asset.approvalRevision) {
    throw new Error(`${asset.id}: offer-linked media requires approvalRevision`);
  }
  if (asset.publicationStatus === "APPROVED") {
    assertApprovedR2Asset(asset);
  }
}

for (const asset of assetsById.values()) {
  if (asset.posterMediaId && !assetIds.has(asset.posterMediaId)) {
    throw new Error(`${asset.id}: posterMediaId references unknown asset ${asset.posterMediaId}`);
  }
  if (asset.publicationStatus === "APPROVED" && asset.posterMediaId) {
    const poster = assetsById.get(asset.posterMediaId);
    if (poster?.publicationStatus !== "APPROVED") {
      throw new Error(`${asset.id}: approved media requires an approved poster asset`);
    }
  }
}

const linkKeys = new Set();
const primaryCounts = new Map();
for (const link of manifest.links ?? []) {
  if (!assetIds.has(link.mediaId)) throw new Error(`Media link references unknown asset ${link.mediaId}`);
  if (!link.entityType || !link.entityKey || !link.placement) throw new Error(`Invalid media link for ${link.mediaId}`);
  const key = `${link.mediaId}:${link.entityType}:${link.entityKey}:${link.placement}`;
  if (linkKeys.has(key)) throw new Error(`Duplicate media link ${key}`);
  linkKeys.add(key);

  if (link.entityType === "homepage") {
    if (link.entityKey !== "home") throw new Error(`${link.mediaId}: homepage media entityKey must be "home"`);
    if (!allowedHomepagePlacements.has(link.placement)) {
      throw new Error(`${link.mediaId}: unsupported homepage placement ${link.placement}`);
    }
    if (link.placement === "hero" && !link.isPrimary) {
      throw new Error(`${link.mediaId}: homepage hero media must set isPrimary=true`);
    }
  }

  if (link.isPrimary) {
    const primaryKey = `${link.entityType}:${link.entityKey}:${link.placement}`;
    primaryCounts.set(primaryKey, Number(primaryCounts.get(primaryKey) ?? 0) + 1);
  }
}

for (const [primaryKey, count] of primaryCounts) {
  if (count > 1) throw new Error(`${primaryKey}: multiple primary media links are not allowed`);
}

console.log(`[media-registry] PASS: ${assetIds.size} assets, ${linkKeys.size} links; approved assets locked to ${CANONICAL_MEDIA_ORIGIN}`);
