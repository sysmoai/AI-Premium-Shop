#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(APP, "data/public-products.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const products = Array.isArray(data) ? data : data.products ?? [];

let changed = 0;
for (const product of products) {
  if (product?.slug === "chatgpt-business-bangladesh") {
    product.accessType = "team";
    product.billingUnit = "user";
    product.billingCycle = product.billingCycle ?? "monthly";
    // Keep generic catalog surfaces aligned with the governed Business semantics.
    // The dedicated money page separately explains that a local AIPS label does
    // not itself prove an exact OpenAI workspace, seat count or seat type.
    product.name = "ChatGPT Business — Team / Workspace Access (per user)";
    product.tier = "Team / Workspace (per user)";
    changed += 1;
  }
  if (["chatgpt-go-bangladesh", "chatgpt-plus-bangladesh"].includes(product?.slug)) {
    product.accessType = "personal";
  }
}

if (changed < 1) throw new Error("[access-models] ChatGPT Business governed commerce record is missing");
if (Array.isArray(data)) fs.writeFileSync(file, `${JSON.stringify(products)}\n`, "utf8");
else fs.writeFileSync(file, `${JSON.stringify({ ...data, products })}\n`, "utf8");
console.log(`[access-models] normalized ${changed} ChatGPT Business record(s) to provider-supported Team/Workspace per-user semantics`);
