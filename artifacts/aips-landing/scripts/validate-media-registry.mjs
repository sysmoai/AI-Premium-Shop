#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(APP, "data/media/manifest.json"), "utf8"));
const allowedKinds = new Set([
  "LOGO", "PRODUCT_HERO", "PLAN_HERO", "POSTER", "GALLERY_IMAGE",
  "SCREENSHOT", "INFOGRAPHIC", "COMPARISON_GRAPHIC", "VIDEO_DEMO",
  "VIDEO_TUTORIAL", "VIDEO_POSTER", "ANIMATION", "OG_IMAGE",
  "CATEGORY_HERO", "BRAND_ASSET",
]);
const allowedStatus = new Set(["DRAFT", "APPROVED", "SUSPENDED", "RETIRED"]);
const assetIds = new Set();

for (const asset of manifest.assets ?? []) {
  if (!asset.id || assetIds.has(asset.id)) throw new Error(`Duplicate/missing media asset id: ${asset.id}`);
  assetIds.add(asset.id);
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
}

const linkKeys = new Set();
for (const link of manifest.links ?? []) {
  if (!assetIds.has(link.mediaId)) throw new Error(`Media link references unknown asset ${link.mediaId}`);
  if (!link.entityType || !link.entityKey || !link.placement) throw new Error(`Invalid media link for ${link.mediaId}`);
  const key = `${link.mediaId}:${link.entityType}:${link.entityKey}:${link.placement}`;
  if (linkKeys.has(key)) throw new Error(`Duplicate media link ${key}`);
  linkKeys.add(key);
}

console.log(`[media-registry] PASS: ${assetIds.size} assets, ${linkKeys.size} links`);
