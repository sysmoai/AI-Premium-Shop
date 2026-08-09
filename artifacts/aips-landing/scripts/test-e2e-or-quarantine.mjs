import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const indexPath = path.resolve("dist/public/index.html");
const marker = "Product availability is under verification";
const quarantined = fs.existsSync(indexPath) && fs.readFileSync(indexPath, "utf8").includes(marker);

// quarantine.spec.ts asserts the fail-closed verification page is showing --
// it must run ALONE when quarantined, and must be excluded from the normal
// suite otherwise (it would always fail against real content, since that's
// exactly what it's designed to detect).
const e2eDir = path.resolve("tests/e2e");
const normalSpecs = fs
  .readdirSync(e2eDir)
  .filter((f) => f.endsWith(".spec.ts") && f !== "quarantine.spec.ts")
  .map((f) => `tests/e2e/${f}`);

const args = quarantined
  ? ["exec", "playwright", "test", "tests/e2e/quarantine.spec.ts"]
  : ["exec", "playwright", "test", ...normalSpecs];

console.log(quarantined
  ? "e2e: quarantine build detected; running fail-closed browser suite"
  : "e2e: normal build detected; running standard browser suite");

const result = spawnSync("pnpm", args, { stdio: "inherit", shell: process.platform === "win32" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
