#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(APP, "data/media/manifest.json"), "utf8"));
const projection = JSON.parse(readFileSync(join(APP, "data/public-products.json"), "utf8")).projection ?? {};
const commerceEnabled = Boolean(projection.publication_allowed) && !Boolean(projection.quarantine);

const approvedAssets = new Map();
for (const asset of manifest.assets ?? []) {
  if (asset.publicationStatus !== "APPROVED") continue;
  if (asset.offerId && !commerceEnabled) continue;
  approvedAssets.set(asset.id, {
    id: asset.id,
    mediaKey: asset.mediaKey ?? asset.id,
    kind: asset.kind,
    publicUri: asset.publicUri,
    mimeType: asset.mimeType,
    width: asset.width ?? null,
    height: asset.height ?? null,
    durationMs: asset.durationMs ?? null,
    posterMediaId: asset.posterMediaId ?? null,
    altEn: asset.altEn ?? "",
    altBn: asset.altBn ?? "",
    captionEn: asset.captionEn ?? "",
    captionBn: asset.captionBn ?? "",
    offerId: asset.offerId ?? null,
    approvalRevision: asset.approvalRevision ?? null,
  });
}

const links = [];
for (const link of manifest.links ?? []) {
  if (!approvedAssets.has(link.mediaId)) continue;
  links.push({
    mediaId: link.mediaId,
    entityType: link.entityType,
    entityKey: link.entityKey,
    placement: link.placement,
    sortOrder: Number(link.sortOrder ?? 0),
    isPrimary: Boolean(link.isPrimary),
    locale: link.locale ?? "en-BD",
  });
}
links.sort((a, b) => a.sortOrder - b.sortOrder || Number(b.isPrimary) - Number(a.isPrimary));

const output = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  publication_mode: projection.mode ?? "unknown",
  assets: Object.fromEntries(approvedAssets),
  links,
};
const outDir = join(APP, "public/generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "media-catalog.json"), `${JSON.stringify(output)}\n`, "utf8");
console.log(`[media-catalog] ${approvedAssets.size} approved assets, ${links.length} public links`);
