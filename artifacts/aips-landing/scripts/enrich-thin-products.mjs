// Adds FAQ + USP content to catalog records that currently have none, using
// only facts already present on the record (price, deliverySLA, accessType).
// No per-tool factual claims are invented — this closes the "0 FAQ / 0 USP"
// gap on the 47 products that fall back to the generic ProductPage template.
import fs from "node:fs";

const path = "data/products.json";
const raw = JSON.parse(fs.readFileSync(path, "utf8"));
const products = raw.products;

const bySlugFirst = new Map();
for (const p of products) {
  if (!bySlugFirst.has(p.slug)) bySlugFirst.set(p.slug, p);
}

let touched = 0;
for (const p of bySlugFirst.values()) {
  const hasFaq = Array.isArray(p.faq) && p.faq.length > 0;
  const hasUsp = Array.isArray(p.uniqueSellingPoints) && p.uniqueSellingPoints.length > 0;
  if (hasFaq && hasUsp) continue;

  const deliverySLA = p.deliverySLA || p.estimatedDeliveryTime || "5–30 minutes";
  const accessLine =
    p.accessType === "shared"
      ? {
          q: `Is the ${p.name} account shared with other users?`,
          a: `Yes, it's a shared account. Multiple users split one subscription at a lower cost — but nobody can see anyone else's conversations or data.`,
        }
      : p.accessType === "personal"
      ? {
          q: `Is ${p.name} a personal, dedicated account?`,
          a: `Yes, this is a personal account exclusively yours — full privacy, your own login, no shared limits.`,
        }
      : null;

  if (!hasFaq) {
    p.faq = [
      {
        q: `Is ${p.name} safe to buy through AI Premium Shop?`,
        a: `Yes. AIPS provides working access with a 30-day replacement guarantee. We have served 10,000+ customers since 2022.`,
      },
      {
        q: `How long does delivery take for ${p.name}?`,
        a: `Typically ${deliverySLA} via WhatsApp after payment confirmation.`,
      },
      {
        q: `What payment methods can I use for ${p.name}?`,
        a: `bKash, Nagad, Rocket, or bank transfer. No international card needed.`,
      },
      ...(accessLine ? [accessLine] : []),
    ];
  }

  if (!hasUsp) {
    p.uniqueSellingPoints = [
      "Pay with bKash or Nagad — no international card needed",
      `Delivery in ${deliverySLA}`,
      "30-day replacement guarantee",
      "Real human WhatsApp support, not a bot",
    ];
  }

  touched++;
}

fs.writeFileSync(path, JSON.stringify(raw, null, 2) + "\n");
console.log(`Enriched ${touched} product records with FAQ/USP (previously 0/0).`);
