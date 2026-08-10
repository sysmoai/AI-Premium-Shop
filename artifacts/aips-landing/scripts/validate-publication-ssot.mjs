import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve("../..");
const sitePath = path.join(repoRoot, "ops/ssot/site.json");
const commercialPath = path.join(repoRoot, "ops/ssot/commercial.json");

const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
const commercial = JSON.parse(fs.readFileSync(commercialPath, "utf8"));
const publication = site.current_publication_state ?? {};

const errors = [];

if (Boolean(publication.commerce_quarantine) !== Boolean(commercial.quarantine)) {
  errors.push(`commerce_quarantine mismatch: site=${publication.commerce_quarantine} commercial=${commercial.quarantine}`);
}

if (Boolean(publication.commerce_publish_allowed) !== Boolean(commercial.publication_allowed)) {
  errors.push(`commerce_publish_allowed mismatch: site=${publication.commerce_publish_allowed} commercial=${commercial.publication_allowed}`);
}

if (commercial.quarantine && commercial.publication_allowed) {
  errors.push("commercial SSOT cannot be both quarantined and publication_allowed");
}

if (errors.length) {
  console.error("[publication-ssot] FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[publication-ssot] OK quarantine=${Boolean(commercial.quarantine)} publication_allowed=${Boolean(commercial.publication_allowed)}`);
