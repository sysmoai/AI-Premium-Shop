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
  // ---- Batch 2 (2026-08-02): D2 coverage gaps from the discovery scope ----
  // D1 measured at 15/16 (only Meta AI absent, and it is free — nothing to sell).
  // D2 measured at 21/38; these are the well-known, currently-operating paid
  // products from that gap. Obscure entries stay in atlas-needs-verification.md.
  {
    name: "Poe", brand: "Poe", provider: "Quora", category: "ai-assistant",
    color: "#5d3fd3", access: "personal", src: "https://poe.com",
    desc: "Quora's multi-model AI app — reach many leading chat and image models through one paid subscription instead of subscribing to each provider separately. Useful when you want to compare model outputs side by side.",
    bn: "Quora-এর মাল্টি-মডেল AI অ্যাপ — একটি সাবস্ক্রিপশনেই একাধিক শীর্ষ চ্যাট ও ইমেজ মডেল ব্যবহার করা যায়, আলাদা আলাদা সাবস্ক্রিপশন লাগে না।",
    caps: ["text", "image-gen", "multi-model"],
  },
  {
    name: "Genspark", brand: "Genspark", provider: "Genspark", category: "ai-assistant",
    color: "#0d9488", access: "personal", src: "https://www.genspark.ai",
    desc: "AI agent and search assistant that runs multi-step research tasks and compiles the results into structured pages rather than returning a list of links.",
    bn: "AI এজেন্ট ও সার্চ অ্যাসিস্ট্যান্ট — মাল্টি-স্টেপ রিসার্চ চালিয়ে ফলাফল গুছিয়ে উপস্থাপন করে, শুধু লিংকের তালিকা নয়।",
    caps: ["search", "agents", "research"],
  },
  {
    name: "Consensus", brand: "Consensus", provider: "Consensus", category: "ai-workspace",
    color: "#1d4ed8", access: "personal", src: "https://consensus.app",
    desc: "AI search engine over peer-reviewed research papers — ask a question and get findings drawn from published studies with citations. Built for literature review and evidence-checking rather than general web search.",
    bn: "পিয়ার-রিভিউড গবেষণাপত্রের উপর AI সার্চ ইঞ্জিন — প্রশ্ন করলে প্রকাশিত গবেষণা থেকে সাইটেশনসহ উত্তর দেয়। থিসিস ও লিটারেচার রিভিউর জন্য উপযোগী।",
    caps: ["research", "search", "citations"],
  },
  {
    name: "Hailuo AI (MiniMax)", brand: "Hailuo", provider: "MiniMax", category: "ai-video",
    color: "#e11d48", access: "personal", src: "https://hailuoai.video",
    desc: "MiniMax's video generation model — create short video clips from text prompts or a starting image. Sold on credit-based plans, with output quality that has made it popular for social and ad content.",
    bn: "MiniMax-এর ভিডিও জেনারেশন মডেল — টেক্সট বা ছবি থেকে ছোট ভিডিও ক্লিপ তৈরি করে। ক্রেডিট-ভিত্তিক প্ল্যান, সোশ্যাল ও অ্যাড কনটেন্টে জনপ্রিয়।",
    caps: ["video-gen", "image-to-video"],
  },
  {
    name: "PixVerse", brand: "PixVerse", provider: "AIsphere", category: "ai-video",
    color: "#7c3aed", access: "personal", src: "https://pixverse.ai",
    desc: "AI video generator for short-form content — text-to-video and image-to-video with motion and style controls, commonly used for social clips and effects-driven videos.",
    bn: "শর্ট-ফর্ম কনটেন্টের জন্য AI ভিডিও জেনারেটর — টেক্সট ও ছবি থেকে ভিডিও, মোশন ও স্টাইল কন্ট্রোলসহ।",
    caps: ["video-gen", "image-to-video"],
  },
  {
    name: "Vidu", brand: "Vidu", provider: "ShengShu Technology", category: "ai-video",
    color: "#0891b2", access: "personal", src: "https://www.vidu.com",
    desc: "Video generation model from ShengShu — text-to-video and reference-based generation with character consistency features aimed at short narrative and promotional clips.",
    bn: "ShengShu-এর ভিডিও জেনারেশন মডেল — টেক্সট থেকে ভিডিও ও রেফারেন্স-ভিত্তিক জেনারেশন, ক্যারেক্টার কনসিসটেন্সি ফিচারসহ।",
    caps: ["video-gen", "character-consistency"],
  },
  {
    name: "D-ID", brand: "D-ID", provider: "D-ID", category: "ai-video",
    color: "#ec4899", access: "personal", src: "https://www.d-id.com/pricing",
    desc: "Talking-avatar platform that animates a photo or digital human to speak your script, with support for multiple languages. Used for presenter-style videos without filming.",
    bn: "টকিং-অ্যাভাটার প্ল্যাটফর্ম — ছবি বা ডিজিটাল হিউম্যানকে আপনার স্ক্রিপ্ট বলাতে পারে, একাধিক ভাষায়। ক্যামেরা ছাড়াই প্রেজেন্টার ভিডিও।",
    caps: ["avatar", "video-gen", "tts"],
  },
  {
    name: "Captions", brand: "Captions", provider: "Captions", category: "ai-video",
    color: "#111827", access: "personal", src: "https://www.captions.ai",
    desc: "AI video editing app built for talking-head content — automatic subtitles, eye-contact correction, dubbing and editing aimed at creators producing short-form social video.",
    bn: "টকিং-হেড কনটেন্টের জন্য AI ভিডিও এডিটিং অ্যাপ — অটোমেটিক সাবটাইটেল, আই-কন্টাক্ট কারেকশন, ডাবিং ও এডিটিং।",
    caps: ["video-edit", "subtitles", "dubbing"],
  },
  {
    name: "Tavus", brand: "Tavus", provider: "Tavus", category: "ai-video",
    color: "#2563eb", access: "personal", src: "https://www.tavus.io",
    desc: "AI video platform for personalized and conversational video — generate a digital replica that can address individual recipients or hold real-time video conversations. Primarily an API/business product.",
    bn: "পার্সোনালাইজড ও কথোপকথনমূলক ভিডিওর জন্য AI প্ল্যাটফর্ম — ডিজিটাল রেপ্লিকা তৈরি করে ব্যক্তিভিত্তিক ভিডিও বা রিয়েল-টাইম কথোপকথন চালাতে পারে।",
    caps: ["avatar", "video-gen", "api"],
  },
  {
    name: "Soundraw", brand: "Soundraw", provider: "Soundraw", category: "ai-voice-music",
    color: "#f59e0b", access: "personal", src: "https://soundraw.io",
    desc: "AI music generator for creators — produce royalty-free background tracks by choosing mood, genre and length, then customise the arrangement. Aimed at video and social content soundtracks.",
    bn: "ক্রিয়েটরদের জন্য AI মিউজিক জেনারেটর — মুড, জঁর ও দৈর্ঘ্য বেছে রয়্যালটি-ফ্রি ব্যাকগ্রাউন্ড ট্র্যাক তৈরি ও কাস্টমাইজ করা যায়।",
    caps: ["music-gen", "royalty-free"],
  },
  {
    name: "AIVA", brand: "AIVA", provider: "AIVA Technologies", category: "ai-voice-music",
    color: "#6366f1", access: "personal", src: "https://www.aiva.ai",
    desc: "AI music composition tool focused on soundtrack and score generation — create original instrumental pieces in a chosen style and edit the composition, with licensing tiers for commercial use.",
    bn: "সাউন্ডট্র্যাক ও স্কোর তৈরির জন্য AI মিউজিক কম্পোজিশন টুল — নির্দিষ্ট স্টাইলে অরিজিনাল ইনস্ট্রুমেন্টাল তৈরি ও এডিট করা যায়।",
    caps: ["music-gen", "composition"],
  },
  {
    name: "Tabnine", brand: "Tabnine", provider: "Tabnine", category: "ai-code",
    color: "#0f172a", access: "personal", src: "https://www.tabnine.com/pricing",
    desc: "AI code completion assistant that works across major IDEs, with an emphasis on privacy and the option to run models without sending code to shared services.",
    bn: "প্রধান IDE-গুলোতে কাজ করা AI কোড কমপ্লিশন অ্যাসিস্ট্যান্ট — প্রাইভেসির উপর জোর, কোড শেয়ার না করেও ব্যবহারের অপশন আছে।",
    caps: ["code", "autocomplete", "privacy"],
  },
  {
    name: "JetBrains AI Assistant", brand: "JetBrains AI", provider: "JetBrains", category: "ai-code",
    color: "#000000", access: "personal", src: "https://www.jetbrains.com/ai/",
    desc: "AI assistant built into JetBrains IDEs (IntelliJ, PyCharm, WebStorm and others) — code completion, explanation, refactoring and commit-message generation inside the editor you already use.",
    bn: "JetBrains IDE-তে (IntelliJ, PyCharm, WebStorm) বিল্ট-ইন AI অ্যাসিস্ট্যান্ট — কোড কমপ্লিশন, ব্যাখ্যা, রিফ্যাক্টরিং ও কমিট মেসেজ তৈরি।",
    caps: ["code", "refactor", "ide"],
  },
  {
    name: "Sourcegraph Cody", brand: "Cody", provider: "Sourcegraph", category: "ai-code",
    color: "#a855f7", access: "personal", src: "https://sourcegraph.com/cody",
    desc: "AI coding assistant with codebase-wide context from Sourcegraph's code search — answers questions and writes code informed by your whole repository rather than the open file alone.",
    bn: "কোডবেস-ব্যাপী কনটেক্সটসহ AI কোডিং অ্যাসিস্ট্যান্ট — শুধু খোলা ফাইল নয়, পুরো রিপোজিটরির ভিত্তিতে প্রশ্নের উত্তর ও কোড লেখে।",
    caps: ["code", "codebase-context", "search"],
  },
  {
    name: "Devin (Cognition)", brand: "Devin", provider: "Cognition", category: "ai-code",
    color: "#1e293b", access: "personal", src: "https://devin.ai",
    desc: "Autonomous AI software engineer from Cognition — takes a task, plans it, writes and tests code, and iterates in its own environment. Positioned at the high end of the market with pricing to match.",
    bn: "Cognition-এর অটোনমাস AI সফটওয়্যার ইঞ্জিনিয়ার — কাজ নিয়ে পরিকল্পনা করে, কোড লেখে ও টেস্ট করে, নিজের এনভায়রনমেন্টে কাজ করে। উচ্চমূল্যের প্রোডাক্ট।",
    caps: ["code", "agents", "autonomous"],
  },
  {
    name: "Beautiful.ai", brand: "Beautiful.ai", provider: "Beautiful.ai", category: "ai-design",
    color: "#0ea5e9", access: "personal", src: "https://www.beautiful.ai/pricing",
    desc: "AI presentation builder that applies design rules automatically as you add content, so slides stay visually consistent without manual layout work. Aimed at business decks and pitches.",
    bn: "AI প্রেজেন্টেশন বিল্ডার — কনটেন্ট যোগ করার সাথে সাথে ডিজাইন রুল প্রয়োগ করে, ম্যানুয়াল লেআউট ছাড়াই স্লাইড সুসংগত থাকে।",
    caps: ["presentations", "design", "templates"],
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
