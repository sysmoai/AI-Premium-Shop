import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, "..");
const repoRoot = path.resolve(appRoot, "../..");
const outDir = path.join(appRoot, "dist/public/.well-known");

function sha256File(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function gitSha() {
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA;
  if (fromEnv) return fromEnv;
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unknown";
  }
}

const commercialPath = path.join(repoRoot, "ops/ssot/commercial.json");
const sitePath = path.join(repoRoot, "ops/ssot/site.json");
const productsPath = path.join(appRoot, "data/products.json");

for (const file of [commercialPath, sitePath, productsPath]) {
  if (!fs.existsSync(file)) throw new Error(`Build identity input missing: ${file}`);
}

const commercial = JSON.parse(fs.readFileSync(commercialPath, "utf8"));
const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));

const identity = {
  schema_version: 1,
  application: "AI Premium Shop",
  domain: "aipremiumshop.com",
  git_sha: gitSha(),
  build_time: new Date().toISOString(),
  release_id: process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_URL || null,
  publication: {
    site_commerce_quarantine: Boolean(site?.current_publication_state?.commerce_quarantine),
    commercial_quarantine: Boolean(commercial?.quarantine),
    publication_allowed: Boolean(commercial?.publication_allowed),
  },
  hashes: {
    site_ssot_sha256: sha256File(sitePath),
    commercial_ssot_sha256: sha256File(commercialPath),
    products_catalog_sha256: sha256File(productsPath),
  },
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "aips-build.json"), `${JSON.stringify(identity, null, 2)}\n`, "utf8");
console.log(`[build-identity] wrote .well-known/aips-build.json for ${identity.git_sha}`);
