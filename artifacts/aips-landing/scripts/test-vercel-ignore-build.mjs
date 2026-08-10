#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(new URL("./vercel-ignore-build.mjs", import.meta.url));

function run(files) {
  return spawnSync(process.execPath, [scriptPath], {
    encoding: "utf8",
    env: {
      ...process.env,
      AIPS_VERCEL_CHANGED_FILES: files.join("\n"),
      VERCEL_GIT_PREVIOUS_SHA: "",
      VERCEL_GIT_COMMIT_SHA: "",
    },
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const docsOnly = run(["docs/homepage/README.md", "ops/harness/homepage-v2.json", ".github/workflows/ci.yml"]);
assert(docsOnly.status === 0, `Docs/harness/workflow-only changes should skip Vercel build: ${docsOnly.stdout} ${docsOnly.stderr}`);

const runtime = run(["artifacts/aips-landing/src/pages/HomeV2.tsx"]);
assert(runtime.status === 1, "Frontend runtime change must force Vercel build");

const ssot = run(["ops/ssot/commercial.json"]);
assert(ssot.status === 1, "Commercial SSOT change must force Vercel build");

const media = run(["artifacts/aips-landing/data/media/manifest.json"]);
assert(media.status === 1, "Media manifest change must force Vercel build");

const mixed = run(["docs/homepage/README.md", "lib/catalog-domain/src/index.ts"]);
assert(mixed.status === 1, "Mixed docs/runtime change must force Vercel build");

const unknown = run(["README.md"]);
assert(unknown.status === 1, "Unknown root path must fail safe and force Vercel build");

const empty = run([]);
assert(empty.status === 1, "Empty/unknown change set must fail safe and force Vercel build");

console.log("[vercel-ignore-test] PASS: only .github/docs/ops-harness-only changes may skip Vercel builds");
