import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(here, "..");
const repoRoot = path.resolve(appDir, "../..");
const indexPath = path.resolve(appDir, "dist/public/index.html");
const sitePath = path.resolve(repoRoot, "ops/ssot/site.json");
const marker = "Product availability is under verification";
const quarantined = fs.existsSync(indexPath) && fs.readFileSync(indexPath, "utf8").includes(marker);
const site = fs.existsSync(sitePath) ? JSON.parse(fs.readFileSync(sitePath, "utf8")) : null;
const selective = site?.current_publication_state?.public_indexing === "selective";

let args;
let mode;
if (selective) {
  args = ["exec", "playwright", "test", "tests/e2e/smoke.spec.ts", "tests/e2e/selective-publication.spec.ts"];
  mode = "selective-publication recovery build detected; running mount + recovery contract suites";
} else if (quarantined) {
  args = ["exec", "playwright", "test", "tests/e2e/quarantine.spec.ts"];
  mode = "sitewide quarantine build detected; running fail-closed browser suite";
} else {
  args = ["exec", "playwright", "test"];
  mode = "normal commerce build detected; running standard browser suite";
}

console.log(`e2e: ${mode}`);
const result = spawnSync("pnpm", args, { stdio: "inherit", shell: process.platform === "win32", cwd: appDir });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
