#!/usr/bin/env node
// Contract test for scripts/prepare-media-image.mjs — synthetic fixture only.
// Never labels the fixture as an approved product asset; writes into the
// gitignored media-intake/derived/ tree.
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const script = join(fileURLToPath(new URL(".", import.meta.url)), "prepare-media-image.mjs");
const temp = mkdtempSync(join(tmpdir(), "aips-media-prep-"));
const { default: sharp } = await import("sharp");

function run(args) {
  return execFileSync(process.execPath, [script, ...args], { encoding: "utf8" });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  const fixture = join(temp, "fixture.png");
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: { r: 244, g: 185, b: 66, alpha: 1 } } })
    .png()
    .toFile(fixture);

  const out = run(["--file", fixture, "--slug", "synthetic-fixture", "--alt-en", "Synthetic test fixture (never a product image)", "--alt-bn", "পরীক্ষামূলক ফিক্সচার"]);
  const summary = JSON.parse(out);
  assert(summary.source.mime === "image/png", "Source sniff must be image/png");
  assert(summary.source.width === 1200 && summary.source.height === 630, "Source dimensions must match fixture");
  assert(/^[a-f0-9]{64}$/.test(summary.source.sha256), "Source SHA-256 missing");
  assert(summary.derivatives.some((d) => d.format === "webp" && d.label === "full" && d.width === 960), "Expected 960px WebP derivative");
  assert(summary.derivatives.some((d) => d.format === "webp" && d.label === "thumb" && d.width === 480), "Expected 480px WebP thumb");
  assert(summary.derivatives.some((d) => d.format === "avif"), "Expected AVIF derivative");
  for (const d of summary.derivatives) {
    assert(/^[a-f0-9]{64}$/.test(d.sha256), `Derivative SHA-256 missing: ${d.label}/${d.format}`);
    assert(d.suggestedObjectKey.startsWith("media/products/synthetic-fixture/"), "Suggested object key must be namespaced");
  }
  assert(summary.draftManifestEntry.publicationStatus === "DRAFT", "Draft entry must never be APPROVED automatically");
  assert(summary.draftManifestEntry.publicUri.startsWith("https://media.aipremiumshop.com/"), "Draft publicUri must use canonical origin");
  assert(summary.draftManifestLink.entityType === "product" && summary.draftManifestLink.entityKey === "synthetic-fixture", "Draft link must point at the fixture slug");

  const combined = `${out}`;
  assert(!combined.includes("sensitive") && !combined.includes("secret"), "Output must not contain credential material");

  console.log("[media-prep-test] PASS: synthetic fixture -> WebP/AVIF derivatives, draft manifest entry, no credentials");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
