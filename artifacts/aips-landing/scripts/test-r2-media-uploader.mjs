#!/usr/bin/env node
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(new URL("./upload-r2-media.mjs", import.meta.url));
const tempDir = await mkdtemp(join(tmpdir(), "aips-r2-media-"));

function run(args) {
  return spawnSync(process.execPath, [scriptPath, ...args], {
    encoding: "utf8",
    env: {
      ...process.env,
      R2_ACCOUNT_ID: "sensitive-account-id",
      R2_ACCESS_KEY_ID: "sensitive-access-key",
      R2_SECRET_ACCESS_KEY: "sensitive-secret-key",
      R2_BUCKET_NAME: "aips-media",
      R2_PUBLIC_URL: "https://media.aipremiumshop.com",
    },
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  const webpPath = join(tempDir, "hero.webp");
  const fakeWebp = Buffer.concat([
    Buffer.from("RIFF", "ascii"),
    Buffer.from([0x04, 0x00, 0x00, 0x00]),
    Buffer.from("WEBP", "ascii"),
  ]);
  await writeFile(webpPath, fakeWebp);

  const success = run([
    "--file", webpPath,
    "--key", "homepage/2026-08/hp-hero-01-v1.webp",
    "--dry-run",
  ]);
  assert(success.status === 0, `Expected dry-run success, got ${success.status}: ${success.stderr}`);
  const payload = JSON.parse(success.stdout);
  assert(payload.dryRun === true, "Dry-run payload did not report dryRun=true");
  assert(payload.mimeType === "image/webp", `Unexpected MIME: ${payload.mimeType}`);
  assert(payload.bucket === "aips-media", `Unexpected bucket: ${payload.bucket}`);
  assert(payload.objectKey === "homepage/2026-08/hp-hero-01-v1.webp", `Unexpected key: ${payload.objectKey}`);
  assert(payload.publicUri === "https://media.aipremiumshop.com/homepage/2026-08/hp-hero-01-v1.webp", `Unexpected public URI: ${payload.publicUri}`);
  assert(payload.cacheControl === "public, max-age=31536000, immutable", `Unexpected cache policy: ${payload.cacheControl}`);
  assert(payload.bytes === fakeWebp.length, `Unexpected byte count: ${payload.bytes}`);
  assert(/^[a-f0-9]{64}$/.test(payload.sha256), "Dry-run did not emit a SHA-256 digest");

  const combinedOutput = `${success.stdout}\n${success.stderr}`;
  for (const secret of ["sensitive-account-id", "sensitive-access-key", "sensitive-secret-key"]) {
    assert(!combinedOutput.includes(secret), `Credential material leaked to output: ${secret}`);
  }

  const mismatchedPath = join(tempDir, "hero.png");
  await writeFile(mismatchedPath, fakeWebp);
  const mismatch = run([
    "--file", mismatchedPath,
    "--key", "homepage/2026-08/hp-hero-01-v1.png",
    "--dry-run",
  ]);
  assert(mismatch.status !== 0, "Extension/signature mismatch should fail closed");
  assert(mismatch.stderr.includes("extension/signature mismatch"), "Mismatch failure did not explain the validation error");

  const traversal = run([
    "--file", webpPath,
    "--key", "../hp-hero-01.webp",
    "--dry-run",
  ]);
  assert(traversal.status !== 0, "Parent-traversal object keys should fail closed");

  console.log("[r2-media-test] PASS: dry-run, signature validation, key safety, and no credential leakage");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
