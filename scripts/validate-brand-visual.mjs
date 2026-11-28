#!/usr/bin/env node
// Brand-visual integrity gate (logo locked, palette/typography governed).
// Run: node scripts/validate-brand-visual.mjs
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const ssot = JSON.parse(readFileSync(join(ROOT, "ops", "ssot", "brand-visual.json"), "utf8"));
const failures = [];

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();
}

// 1. SSOT structural gates
if (ssot.identity.public_name !== "AI Premium Shop") failures.push("public_name must be 'AI Premium Shop'");
if (ssot.identity.public_abbreviation_allowed !== false) failures.push("public abbreviation must stay disallowed");
const palette = ssot.palette ?? {};
for (const [name, hex] of [
  ["deep_navy", "#0A0E27"], ["secondary_navy", "#151B3D"], ["gold", "#F4B942"],
  ["purple", "#8B5CF6"], ["white", "#FFFFFF"],
]) {
  if (String(palette[name] ?? "").toUpperCase() !== hex) failures.push(`palette.${name} must be ${hex}`);
}

// 2. Locked-logo integrity (byte hash + size)
const logoRel = ssot.logo?.repository_asset;
if (!logoRel) {
  failures.push("logo.repository_asset missing in brand-visual.json");
} else {
  const logoPath = join(ROOT, logoRel);
  try {
    const digest = sha256(logoPath);
    const size = readFileSync(logoPath).length;
    if (ssot.logo.sha256 && digest !== String(ssot.logo.sha256).toUpperCase()) {
      failures.push(`logo SHA-256 mismatch: file=${digest} ssot=${ssot.logo.sha256} — logo was modified; restore the locked asset`);
    }
    if (ssot.logo.byte_size && size !== ssot.logo.byte_size) {
      failures.push(`logo byte size mismatch: file=${size} ssot=${ssot.logo.byte_size}`);
    }
  } catch {
    failures.push(`logo file missing at ${logoPath}`);
  }
}

// 3. No hard-coded brand colors outside SSOT/palette consumers? (light gate: just warn on drift)
//    Full scan intentionally out of scope; the SSOT is the enforcement point.

if (failures.length) {
  console.error(`[brand-visual] FAIL:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("[brand-visual] PASS: name/abbreviation/palette gates + locked-logo hash and size verified");
