import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const indexPath = path.resolve("dist/public/index.html");
const marker = "Product availability is under verification";
const quarantined = fs.existsSync(indexPath) && fs.readFileSync(indexPath, "utf8").includes(marker);
const args = quarantined
  ? ["exec", "playwright", "test", "tests/e2e/quarantine.spec.ts"]
  : ["exec", "playwright", "test"];

console.log(quarantined
  ? "e2e: quarantine build detected; running fail-closed browser suite"
  : "e2e: normal build detected; running standard browser suite");

const result = spawnSync("pnpm", args, { stdio: "inherit", shell: process.platform === "win32" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
