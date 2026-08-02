// Adds CEO-approved (option B, 2026-08-02) request-price product records.
//
// Request-price records publish NO price — the page reads "Request current
// price on WhatsApp". That removes price risk entirely, so the only factual
// surface is the description. Accordingly this script only includes products
// whose identity and purpose are well established; the obscure entries from the
// ATLAS gap list are deliberately NOT here and are routed to a verification
// report instead of being given invented descriptions.
//
// Idempotent: skips any slug already present.

import fs from "node:fs";

const PATH = "artifacts/aips-landing/data/products.json";
const raw = JSON.parse(fs.readFileSync(PATH, "utf8"));

const NEW = [
  {
    name: "SuperGrok (xAI)", brand: "Grok", provider: "xAI", category: "ai-assistant",
    color: "#111827", access: "personal", src: "https://x.ai/grok",
    desc: "xAI's Grok assistant on a paid SuperGrok subscription — reasoning, real-time information via X, image understanding and image generation. Plan tiers and limits are set by xAI and change periodically, so AI Premium Shop quotes the current price on WhatsApp.",
    bn: "xAI-এর Grok অ্যাসিস্ট্যান্ট — রিজনিং, রিয়েল-টাইম তথ্য, ছবি বোঝা ও ছবি তৈরি। প্ল্যান ও দাম পরিবর্তনশীল, তাই WhatsApp-এ বর্তমান দাম জানানো হয়।",
    caps: ["text", "reasoning", "search", "vision", "image-gen"],
  },
  {
    name: "You.com", brand: "You.com", provider: "You.com", category: "ai-assistant",
    color: "#5b21b6", access: "personal", src: "https://you.com",
    desc: "AI search and research assistant that cites its sources and can switch between multiple underlying models. Useful when you need answers with references rather than a single unsourced reply.",
    bn: "AI সার্চ ও রিসার্চ অ্যাসিস্ট্যান্ট — সোর্স উল্লেখ করে উত্তর দেয় এবং একাধিক মডেল ব্যবহার করা যায়।",
    caps: ["search", "text", "research"],
  },
  {
    name: "Monica", brand: "Monica", provider: "Monica", category: "ai-assistant",
    color: "#0ea5e9", access: "personal", src: "https://monica.im",
    desc: "All-in-one AI assistant that runs as a browser extension and app — summarise any page, translate, write and rewrite text, and chat with multiple AI models from one place without switching tabs.",
    bn: "ব্রাউজার এক্সটেনশন ও অ্যাপ হিসেবে চলা AI অ্যাসিস্ট্যান্ট — যেকোনো পেজ সামারি, অনুবাদ, লেখা ও একাধিক AI মডেলের সাথে চ্যাট।",
    caps: ["text", "translate", "summarize", "browser"],
  },
  {
    name: "Fireflies.ai", brand: "Fireflies", provider: "Fireflies.ai", category: "ai-workspace",
    color: "#6366f1", access: "personal", src: "https://fireflies.ai/pricing",
    desc: "Meeting assistant that joins your calls, records and transcribes them, then produces searchable notes and action items. Works with the common video-conferencing platforms.",
    bn: "মিটিং অ্যাসিস্ট্যান্ট — কল রেকর্ড ও ট্রান্সক্রাইব করে, নোট ও অ্যাকশন আইটেম তৈরি করে। সাধারণ ভিডিও কনফারেন্সিং প্ল্যাটফর্মে কাজ করে।",
    caps: ["transcription", "meetings", "search", "summarize"],
  },
  {
    name: "MeetGeek", brand: "MeetGeek", provider: "MeetGeek", category: "ai-workspace",
    color: "#0891b2", access: "personal", src: "https://meetgeek.ai",
    desc: "Automatic meeting recording, transcription and summary tool. Captures calls, generates notes and highlights, and can push summaries into your other work tools.",
    bn: "স্বয়ংক্রিয় মিটিং রেকর্ডিং, ট্রান্সক্রিপশন ও সামারি টুল — নোট ও হাইলাইট তৈরি করে অন্য টুলে পাঠাতে পারে।",
    caps: ["transcription", "meetings", "summarize"],
  },
  {
    name: "Make (Make.com)", brand: "Make", provider: "Make", category: "ai-workspace",
    color: "#7c3aed", access: "personal", src: "https://www.make.com/en/pricing",
    desc: "Visual automation platform for connecting apps and building multi-step workflows, including AI steps. Commonly used to automate repetitive business processes without writing code.",
    bn: "ভিজ্যুয়াল অটোমেশন প্ল্যাটফর্ম — অ্যাপ যুক্ত করে কোড ছাড়াই মাল্টি-স্টেপ ওয়ার্কফ্লো তৈরি করা যায়, AI স্টেপসহ।",
    caps: ["automation", "integrations", "no-code"],
  },
  {
    name: "Lindy AI", brand: "Lindy", provider: "Lindy", category: "ai-workspace",
    color: "#db2777", access: "personal", src: "https://www.lindy.ai",
    desc: "AI agent builder for business workflows — create assistants that handle email, scheduling, lead follow-up and other recurring tasks by connecting to the tools you already use.",
    bn: "বিজনেস ওয়ার্কফ্লোর জন্য AI এজেন্ট বিল্ডার — ইমেইল, শিডিউলিং ও লিড ফলো-আপের মতো কাজ স্বয়ংক্রিয় করা যায়।",
    caps: ["agents", "automation", "email"],
  },
  {
    name: "Relevance AI", brand: "Relevance AI", provider: "Relevance AI", category: "ai-workspace",
    color: "#2563eb", access: "personal", src: "https://relevanceai.com",
    desc: "Platform for building and running AI agents and multi-agent teams for business tasks such as research, data processing and sales support, without building infrastructure yourself.",
    bn: "AI এজেন্ট ও মাল্টি-এজেন্ট টিম তৈরির প্ল্যাটফর্ম — রিসার্চ, ডেটা প্রসেসিং ও সেলস সাপোর্টের কাজে ব্যবহৃত হয়।",
    caps: ["agents", "automation", "data"],
  },
  {
    name: "Gumloop", brand: "Gumloop", provider: "Gumloop", category: "ai-workspace",
    color: "#f59e0b", access: "personal", src: "https://www.gumloop.com",
    desc: "No-code workspace for building AI-powered automations on a visual canvas — chain together scraping, AI processing and delivery steps to automate research and content workflows.",
    bn: "নো-কোড AI অটোমেশন ওয়ার্কস্পেস — ভিজ্যুয়াল ক্যানভাসে স্ক্র্যাপিং, AI প্রসেসিং ও ডেলিভারি ধাপ যুক্ত করে কাজ স্বয়ংক্রিয় করা যায়।",
    caps: ["automation", "no-code", "agents"],
  },
  {
    name: "Stack AI", brand: "Stack AI", provider: "Stack AI", category: "ai-workspace",
    color: "#334155", access: "personal", src: "https://www.stack-ai.com",
    desc: "No-code builder for AI applications and internal assistants — connect your documents and data sources to build tools such as document Q&A and support assistants.",
    bn: "AI অ্যাপ ও ইন্টারনাল অ্যাসিস্ট্যান্ট তৈরির নো-কোড বিল্ডার — ডকুমেন্ট ও ডেটা সোর্স যুক্ত করে Q&A টুল বানানো যায়।",
    caps: ["no-code", "rag", "agents"],
  },
  {
    name: "Lovable.dev", brand: "Lovable", provider: "Lovable", category: "ai-code",
    color: "#ec4899", access: "personal", src: "https://lovable.dev",
    desc: "AI app builder that turns a written description into a working web application with editable code. Aimed at shipping functional prototypes and small products without a full development setup.",
    bn: "AI অ্যাপ বিল্ডার — লেখা বর্ণনা থেকে কার্যকর ওয়েব অ্যাপ ও এডিটযোগ্য কোড তৈরি করে। দ্রুত প্রোটোটাইপ ও ছোট প্রোডাক্ট বানানোর জন্য।",
    caps: ["code", "web-apps", "no-code"],
  },
  {
    name: "Bolt.new", brand: "Bolt", provider: "StackBlitz", category: "ai-code",
    color: "#1e293b", access: "personal", src: "https://bolt.new",
    desc: "In-browser AI development environment from StackBlitz — describe an app and it scaffolds, runs and deploys full-stack code without any local setup.",
    bn: "StackBlitz-এর ব্রাউজারভিত্তিক AI ডেভেলপমেন্ট এনভায়রনমেন্ট — বর্ণনা দিলে ফুল-স্ট্যাক কোড তৈরি, রান ও ডিপ্লয় করে, লোকাল সেটআপ লাগে না।",
    caps: ["code", "web-apps", "deploy"],
  },
  {
    name: "Dify AI", brand: "Dify", provider: "Dify", category: "ai-code",
    color: "#0f766e", access: "personal", src: "https://dify.ai",
    desc: "Platform for building LLM applications — visual workflow builder, retrieval over your own documents, and agent tooling. Available as a cloud service and as open-source software you can self-host.",
    bn: "LLM অ্যাপ তৈরির প্ল্যাটফর্ম — ভিজ্যুয়াল ওয়ার্কফ্লো, নিজের ডকুমেন্টে রিট্রিভাল ও এজেন্ট টুলিং। ক্লাউড ও সেলফ-হোস্ট দুইভাবেই ব্যবহারযোগ্য।",
    caps: ["rag", "agents", "no-code", "open-source"],
  },
  {
    name: "Flowise AI", brand: "Flowise", provider: "Flowise", category: "ai-code",
    color: "#16a34a", access: "personal", src: "https://flowiseai.com",
    desc: "Drag-and-drop builder for LLM flows and agents. Open-source with a hosted cloud option, commonly used to prototype chatbots and retrieval pipelines over private data.",
    bn: "LLM ফ্লো ও এজেন্ট তৈরির ড্র্যাগ-অ্যান্ড-ড্রপ বিল্ডার। ওপেন-সোর্স, ক্লাউড অপশনসহ — চ্যাটবট ও রিট্রিভাল পাইপলাইন প্রোটোটাইপ করতে ব্যবহৃত হয়।",
    caps: ["rag", "agents", "no-code", "open-source"],
  },
  {
    name: "Fliki", brand: "Fliki", provider: "Fliki", category: "ai-video",
    color: "#8b5cf6", access: "personal", src: "https://fliki.ai/pricing",
    desc: "Text-to-video and text-to-speech tool — turn scripts, blog posts or ideas into narrated videos using AI voices, with stock media and subtitles. Often used for social and faceless video content.",
    bn: "টেক্সট-টু-ভিডিও ও টেক্সট-টু-স্পিচ টুল — স্ক্রিপ্ট বা ব্লগ থেকে AI ভয়েসে ন্যারেটেড ভিডিও তৈরি করে, স্টক মিডিয়া ও সাবটাইটেলসহ।",
    caps: ["video-gen", "tts", "subtitles"],
  },
  {
    name: "NotebookLM", brand: "NotebookLM", provider: "Google", category: "ai-workspace",
    color: "#4285f4", access: "personal", src: "https://notebooklm.google.com",
    desc: "Google's research and note-taking assistant, grounded in documents you upload — ask questions about your own sources, generate summaries and study guides, and produce audio overviews. A free tier exists; higher limits come through Google's paid plans, so AI Premium Shop confirms current options on WhatsApp.",
    bn: "Google-এর রিসার্চ ও নোট অ্যাসিস্ট্যান্ট — আপনার আপলোড করা ডকুমেন্টের ভিত্তিতে প্রশ্নের উত্তর, সামারি ও স্টাডি গাইড তৈরি করে। ফ্রি টিয়ার আছে; বেশি লিমিটের জন্য পেইড প্ল্যান।",
    caps: ["research", "rag", "summarize", "audio"],
  },
];

const slugify = (s) =>
  s.toLowerCase().replace(/\.(ai|dev|new|com|io)\b/g, "").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

const existing = new Set(raw.products.map((p) => p.slug));

// Slug equality alone is NOT enough to detect a duplicate. "SuperGrok / Grok
// (xAI)" slugified to supergrok-xai-bangladesh and sailed straight past an
// existing supergrok-bangladesh that already sells three priced tiers; "Make
// (Make.com)" likewise collided with make-pro-bangladesh. Publishing those
// would have put a "request price" page next to a page with a real price for
// the same product. So also compare normalized brand/name against the existing
// catalog and refuse on any overlap.
const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
const existingBrands = new Set(raw.products.map((p) => norm(p.brand)).filter(Boolean));
const existingNames = new Set(raw.products.map((p) => norm(p.name)).filter(Boolean));

function collidesWithExisting(t) {
  const nb = norm(t.brand);
  const nn = norm(t.name);
  if (existingNames.has(nn)) return true;
  for (const b of existingBrands) {
    if (!b || !nb) continue;
    if (b === nb || b.startsWith(nb) || nb.startsWith(b)) return true;
  }
  return false;
}

let added = 0;
const skipped = [];

for (const t of NEW) {
  const slug = `${slugify(t.name)}-bangladesh`;
  if (existing.has(slug) || collidesWithExisting(t)) { skipped.push(t.name); continue; }

  raw.products.push({
    id: `${slugify(t.name)}-request`,
    name: t.name,
    slug,
    brand: t.brand,
    brandSlug: slug,
    provider: t.provider,
    brandColor: t.color,
    category: t.category,
    price: null,
    requestPrice: true,
    tier: "All Plans",
    accessType: t.access,
    description: t.desc,
    descriptionBN: t.bn,
    capabilities: t.caps,
    deliverySLA: "Confirmed on WhatsApp",
    featured: false,
    whatsappMsg: `Hi, I want ${t.name} from AI Premium Shop. Please share the current price, plans and next steps.`,
    status: "Active",
    sourceUrl: t.src,
    lastVerifiedDate: "2026-08-02",
    uniqueSellingPoints: [
      "Pay with bKash or Nagad — no international card needed",
      "Current price and plan options confirmed on WhatsApp",
      "Real human support, not a bot",
    ],
    faq: [
      { q: `How much does ${t.name} cost in Bangladesh?`,
        a: `Plan pricing for ${t.name} is set by the provider and changes periodically, so we confirm the current price on WhatsApp before you order rather than publishing a figure that may be out of date.` },
      { q: `How do I pay for ${t.name}?`,
        a: "bKash, Nagad, Rocket or bank transfer. No international credit card is required." },
      { q: `How is ${t.name} delivered?`,
        a: "Delivery method and timeline are confirmed on WhatsApp when we quote the current price, since it depends on the plan and access model." },
    ],
    atlas_source: "ATLAS canonical gap list, CEO-approved option B (2026-08-02)",
  });
  existing.add(slug);
  added++;
}

fs.writeFileSync(PATH, JSON.stringify(raw, null, 2) + "\n");
console.log(`added ${added} request-price products, skipped ${skipped.length} already present`);
if (skipped.length) console.log("skipped:", skipped.join(", "));
console.log(`catalog now: ${raw.products.length} records, ${new Set(raw.products.map((p) => p.slug)).size} distinct products`);
