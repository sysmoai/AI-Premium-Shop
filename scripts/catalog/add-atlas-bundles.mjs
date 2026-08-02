// Adds the 12 ATLAS-listed entries the CEO approved on 2026-08-02 ("Do it all"):
// 9 AIPS bundles (compositions from atlas-canonical.json category_raw) and 3
// third-party chatbot products (BuddyPro, ChatAid, HelloFrank).
//
// All request-price: ATLAS price observations for these are UNVERIFIED
// (aips_price_bdt null, no approval id), so no price is published — the page
// says the current price is confirmed on WhatsApp. When the CEO confirms
// prices, set price + requestPrice:false via the normal approval ledger flow.
//
// Idempotent: skips slugs/names already present.

import fs from "node:fs";

const PATH = "artifacts/aips-landing/data/products.json";
const raw = JSON.parse(fs.readFileSync(PATH, "utf8"));

const BUNDLES = [
  { name: "AI Developer Starter Pack", tools: ["Bolt.new", "Replit Core", "GitHub Copilot"],
    audience: "students starting out in development",
    bn: "ডেভেলপমেন্ট শুরু করা শিক্ষার্থীদের জন্য — Bolt.new, Replit Core ও GitHub Copilot এক প্যাকেজে।" },
  { name: "Business Power Package", tools: ["ChatGPT Business (Personal)", "Claude Pro (Personal)", "Notion Business", "Adobe Creative Cloud"],
    audience: "business owners who want writing, analysis, docs and design covered",
    bn: "ব্যবসার জন্য — ChatGPT Business, Claude Pro, Notion Business ও Adobe Creative Cloud একসাথে।" },
  { name: "Content Creator Pack", tools: ["CapCut Pro", "Canva Pro", "ChatGPT Plus", "ElevenLabs"],
    audience: "creators producing video and social content",
    bn: "কনটেন্ট ক্রিয়েটরদের জন্য — CapCut Pro, Canva Pro, ChatGPT Plus ও ElevenLabs এক প্যাকেজে।" },
  { name: "Digital Marketing Pro Pack", tools: ["Jasper AI", "Canva Pro", "ChatGPT Business", "HubSpot"],
    audience: "marketers running campaigns and content at scale",
    bn: "ডিজিটাল মার্কেটারদের জন্য — Jasper AI, Canva Pro, ChatGPT Business ও HubSpot একসাথে।" },
  { name: "Freelancer Pro Pack", tools: ["ChatGPT (Personal)", "Midjourney", "Canva", "ElevenLabs"],
    audience: "freelancers delivering writing, design and voice work",
    bn: "ফ্রিল্যান্সারদের জন্য — ChatGPT, Midjourney, Canva ও ElevenLabs এক প্যাকেজে।" },
  { name: "Full-Stack Freelancer Stack", tools: ["Cursor Pro", "Bolt.new", "Vercel Pro", "Supabase", "GitHub Copilot"],
    audience: "developers shipping client projects end to end",
    bn: "ফুল-স্ট্যাক ডেভেলপারদের জন্য — Cursor Pro, Bolt.new, Vercel Pro, Supabase ও GitHub Copilot একসাথে।" },
  { name: "Research Powerhouse Package", tools: ["Claude", "Perplexity", "Grammarly"],
    audience: "researchers and students doing serious reading and writing",
    bn: "গবেষক ও শিক্ষার্থীদের জন্য — Claude, Perplexity ও Grammarly এক প্যাকেজে।" },
  { name: "Thesis Writer Pack", tools: ["Claude Pro (Personal)", "Grammarly", "Perplexity"],
    audience: "thesis and dissertation writers",
    bn: "থিসিস লেখকদের জন্য — Claude Pro, Grammarly ও Perplexity একসাথে।" },
  { name: "Video Creator Pack", tools: ["Runway", "ElevenLabs", "HeyGen", "ChatGPT"],
    audience: "video creators covering generation, voice and avatars",
    bn: "ভিডিও ক্রিয়েটরদের জন্য — Runway, ElevenLabs, HeyGen ও ChatGPT এক প্যাকেজে।" },
];

const PRODUCTS = [
  { name: "BuddyPro", brand: "BuddyPro", provider: "BuddyPro", category: "ai-workspace",
    color: "#16a34a", src: "https://buddypro.io",
    desc: "AI chatbot platform for WhatsApp — automate customer replies, order questions and follow-ups on the channel Bangladeshi customers actually use.",
    bn: "WhatsApp-এর জন্য AI চ্যাটবট প্ল্যাটফর্ম — কাস্টমার রিপ্লাই, অর্ডার প্রশ্ন ও ফলো-আপ স্বয়ংক্রিয় করা যায়।",
    caps: ["chatbots", "whatsapp", "automation"] },
  { name: "ChatAid", brand: "ChatAid", provider: "ChatAid", category: "ai-workspace",
    color: "#2563eb", src: "https://chataid.com",
    desc: "AI CRM chatbot — answers customer questions from your business data and keeps conversations organized so leads don't slip through.",
    bn: "AI CRM চ্যাটবট — আপনার বিজনেস ডেটা থেকে কাস্টমারের প্রশ্নের উত্তর দেয় ও কথোপকথন গুছিয়ে রাখে।",
    caps: ["chatbots", "crm", "support"] },
  { name: "HelloFrank", brand: "HelloFrank", provider: "HelloFrank", category: "ai-workspace",
    color: "#f59e0b", src: "https://hellofrank.ai",
    desc: "AI customer-support chatbot — handles routine support questions automatically and hands off to a human when the conversation needs one.",
    bn: "AI কাস্টমার-সাপোর্ট চ্যাটবট — সাধারণ প্রশ্নের উত্তর স্বয়ংক্রিয়ভাবে দেয়, প্রয়োজনে মানুষের কাছে হস্তান্তর করে।",
    caps: ["chatbots", "support", "automation"] },
];

const slugify = (s) =>
  s.toLowerCase().replace(/\.(ai|dev|new|com|io)\b/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
const existingSlugs = new Set(raw.products.map((p) => p.slug));
const existingNames = new Set(raw.products.map((p) => norm(p.name)).filter(Boolean));

let added = 0;
const skipped = [];

const common = (name) => ({
  price: null,
  requestPrice: true,
  deliverySLA: "Confirmed on WhatsApp",
  featured: false,
  status: "Active",
  lastVerifiedDate: "2026-08-02",
  whatsappMsg: `Hi, I want ${name} from AI Premium Shop. Please share the current price and next steps.`,
  uniqueSellingPoints: [
    "Pay with bKash or Nagad — no international card needed",
    "Current price and plan options confirmed on WhatsApp",
    "Real human support, not a bot",
  ],
});

for (const b of BUNDLES) {
  const slug = `${slugify(b.name)}-bangladesh`;
  if (existingSlugs.has(slug) || existingNames.has(norm(b.name))) { skipped.push(b.name); continue; }
  raw.products.push({
    id: slugify(b.name),
    name: b.name, slug, brand: "AIPS", brandSlug: "bundles", provider: "AIPS",
    brandColor: "#f4b942", category: "bundles", tier: "Bundle", accessType: "bundle",
    description: `AIPS bundle for ${b.audience} — ${b.tools.join(", ")} together in one package, so you pay once instead of managing separate subscriptions. Bundle pricing is confirmed on WhatsApp.`,
    descriptionBN: `${b.bn} একসাথে নিলে আলাদা সাবস্ক্রিপশনের ঝামেলা নেই। বান্ডেলের দাম WhatsApp-এ নিশ্চিত করা হয়।`,
    capabilities: ["bundle"],
    bundleTools: b.tools,
    faq: [
      { q: `What is included in the ${b.name}?`, a: `${b.tools.join(", ")} — bundled together for ${b.audience}. Exact plan tiers are confirmed on WhatsApp when we quote the current bundle price.` },
      { q: `How much does the ${b.name} cost in Bangladesh?`, a: `Bundle pricing depends on the current price of each included tool, so we confirm the up-to-date bundle price on WhatsApp before you order.` },
      { q: `How do I pay for the ${b.name}?`, a: "bKash, Nagad, Rocket or bank transfer. No international credit card is required." },
    ],
    ...common(b.name),
    atlas_source: "ATLAS aips-bundle entities, CEO-approved 2026-08-02 (request-price until prices confirmed)",
  });
  existingSlugs.add(slug); existingNames.add(norm(b.name)); added++;
}

for (const t of PRODUCTS) {
  const slug = `${slugify(t.name)}-bangladesh`;
  if (existingSlugs.has(slug) || existingNames.has(norm(t.name))) { skipped.push(t.name); continue; }
  raw.products.push({
    id: `${slugify(t.name)}-request`,
    name: t.name, slug, brand: t.brand, brandSlug: slug, provider: t.provider,
    brandColor: t.color, category: t.category, tier: "All Plans", accessType: "personal",
    description: t.desc, descriptionBN: t.bn, capabilities: t.caps, sourceUrl: t.src,
    faq: [
      { q: `How much does ${t.name} cost in Bangladesh?`, a: `Plan pricing for ${t.name} is set by the provider and changes periodically, so we confirm the current price on WhatsApp before you order.` },
      { q: `How do I pay for ${t.name}?`, a: "bKash, Nagad, Rocket or bank transfer. No international credit card is required." },
    ],
    ...common(t.name),
    atlas_source: "ATLAS registered-pricing-tbd, CEO-approved 2026-08-02",
  });
  existingSlugs.add(slug); existingNames.add(norm(t.name)); added++;
}

fs.writeFileSync(PATH, JSON.stringify(raw, null, 2) + "\n");
console.log(`added ${added}, skipped ${skipped.length}${skipped.length ? ": " + skipped.join(", ") : ""}`);
console.log(`catalog now: ${raw.products.length} records, ${new Set(raw.products.map((p) => p.slug)).size} distinct products`);
