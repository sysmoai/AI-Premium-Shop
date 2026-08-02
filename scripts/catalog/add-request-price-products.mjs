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
  // ---- Batch 3 (2026-08-02): full-universe coverage gaps (data/coverage/missing-tools.json) ----
  // 129 MISSING measured; this batch adds the 69 that are well-known, currently
  // operating, genuinely purchasable products. Exclusions (documented in
  // data/coverage/triage-2026-08-02.md): free products, features/plans of tools
  // already in the catalog, open-weight model families, enterprise-only
  // platforms, China-regional apps, and ATLAS bundles awaiting CEO composition.
  {
    name: "X Premium", brand: "X Premium", provider: "X Corp", category: "ai-assistant",
    color: "#000000", access: "personal", src: "https://help.x.com/en/using-x/x-premium",
    desc: "Paid X (Twitter) subscription that includes access to the Grok AI assistant alongside verification, longer posts and reduced ads. Tiers and Grok limits are set by X and change periodically.",
    bn: "X (Twitter)-এর পেইড সাবস্ক্রিপশন — Grok AI অ্যাসিস্ট্যান্ট, ভেরিফিকেশন ও বাড়তি ফিচারসহ। টিয়ার ও লিমিট পরিবর্তনশীল।",
    caps: ["text", "search", "social"],
  },
  {
    name: "Mistral Le Chat Pro", brand: "Le Chat", provider: "Mistral AI", category: "ai-assistant",
    color: "#f97316", access: "personal", src: "https://mistral.ai/products/le-chat",
    desc: "Mistral AI's paid chat assistant — fast responses from Mistral's frontier models, web search, image generation and document analysis, from the leading European AI lab.",
    bn: "Mistral AI-এর পেইড চ্যাট অ্যাসিস্ট্যান্ট — দ্রুত উত্তর, ওয়েব সার্চ, ইমেজ জেনারেশন ও ডকুমেন্ট বিশ্লেষণ।",
    caps: ["text", "search", "image-gen", "documents"],
  },
  {
    name: "Adobe Creative Cloud", brand: "Adobe", provider: "Adobe", category: "ai-design",
    color: "#fa0f00", access: "personal", src: "https://www.adobe.com/creativecloud/plans.html",
    desc: "Adobe's full creative suite — Photoshop, Illustrator, Premiere Pro and more, now with Firefly generative AI built in for image generation, generative fill and AI-assisted editing.",
    bn: "Adobe-এর সম্পূর্ণ ক্রিয়েটিভ স্যুট — Photoshop, Illustrator, Premiere Pro, Firefly জেনারেটিভ AI বিল্ট-ইনসহ।",
    caps: ["image-edit", "video-edit", "image-gen", "design"],
  },
  {
    name: "Adobe Express Premium", brand: "Adobe Express", provider: "Adobe", category: "ai-design",
    color: "#ff2bc2", access: "personal", src: "https://www.adobe.com/express/pricing",
    desc: "Adobe's quick design tool for social posts, flyers and short videos — templates, brand kits and Firefly AI generation in a lightweight editor that needs no design experience.",
    bn: "Adobe-এর দ্রুত ডিজাইন টুল — সোশ্যাল পোস্ট, ফ্লায়ার ও শর্ট ভিডিওর জন্য টেমপ্লেট ও Firefly AI জেনারেশন।",
    caps: ["design", "templates", "image-gen"],
  },
  {
    name: "Magnific AI", brand: "Magnific", provider: "Magnific", category: "ai-image",
    color: "#7c3aed", access: "personal", src: "https://magnific.ai",
    desc: "AI image upscaler and enhancer known for adding realistic detail while enlarging — widely used to sharpen AI-generated art, product photos and portraits for print and web.",
    bn: "AI ইমেজ আপস্কেলার ও এনহ্যান্সার — ছবি বড় করার সময় বাস্তবসম্মত ডিটেইল যোগ করে।",
    caps: ["upscale", "image-edit"],
  },
  {
    name: "Playground AI", brand: "Playground", provider: "Playground", category: "ai-image",
    color: "#f59e0b", access: "personal", src: "https://playground.com",
    desc: "AI image creation and editing platform — generate graphics, posters and product mockups from text, with templates aimed at practical design work rather than only art.",
    bn: "AI ইমেজ তৈরি ও এডিটিং প্ল্যাটফর্ম — টেক্সট থেকে গ্রাফিক্স, পোস্টার ও মকআপ তৈরি করা যায়।",
    caps: ["image-gen", "design", "templates"],
  },
  {
    name: "Clipdrop Pro", brand: "Clipdrop", provider: "Jasper", category: "ai-image",
    color: "#111827", access: "personal", src: "https://clipdrop.co/pricing",
    desc: "AI image toolbox — background removal, relighting, upscaling, cleanup and text-to-image in one place. Popular with e-commerce sellers for fast product-photo work.",
    bn: "AI ইমেজ টুলবক্স — ব্যাকগ্রাউন্ড রিমুভ, রিলাইটিং, আপস্কেল ও ক্লিনআপ এক জায়গায়। ই-কমার্স প্রোডাক্ট ফটোর জন্য জনপ্রিয়।",
    caps: ["image-edit", "background-removal", "upscale"],
  },
  {
    name: "Civitai", brand: "Civitai", provider: "Civitai", category: "ai-image",
    color: "#1971c2", access: "personal", src: "https://civitai.com/pricing",
    desc: "Community hub for AI image models with paid memberships — on-site generation credits, model training and early access to community-created styles and checkpoints.",
    bn: "AI ইমেজ মডেলের কমিউনিটি হাব — পেইড মেম্বারশিপে জেনারেশন ক্রেডিট, মডেল ট্রেনিং ও আর্লি অ্যাক্সেস।",
    caps: ["image-gen", "model-training", "community"],
  },
  {
    name: "PlayHT", brand: "PlayHT", provider: "PlayHT", category: "ai-voice-music",
    color: "#10b981", access: "personal", src: "https://play.ht/pricing",
    desc: "AI voice generator with a large library of realistic voices in many languages — turn scripts into narration for videos, podcasts and IVR, with voice cloning on higher plans.",
    bn: "AI ভয়েস জেনারেটর — বহু ভাষায় বাস্তবসম্মত ভয়েস, স্ক্রিপ্ট থেকে ন্যারেশন ও ভয়েস ক্লোনিং।",
    caps: ["tts", "voice-clone"],
  },
  {
    name: "Speechify Premium", brand: "Speechify", provider: "Speechify", category: "ai-voice-music",
    color: "#2563eb", access: "personal", src: "https://speechify.com/pricing",
    desc: "Text-to-speech app that reads articles, PDFs, books and emails aloud in natural AI voices at adjustable speed — popular with students and professionals who prefer listening to reading.",
    bn: "টেক্সট-টু-স্পিচ অ্যাপ — আর্টিকেল, PDF ও বই প্রাকৃতিক AI ভয়েসে পড়ে শোনায়। শিক্ষার্থীদের কাছে জনপ্রিয়।",
    caps: ["tts", "reading", "accessibility"],
  },
  {
    name: "Krisp", brand: "Krisp", provider: "Krisp", category: "ai-voice-music",
    color: "#8b5cf6", access: "personal", src: "https://krisp.ai/pricing",
    desc: "AI noise cancellation for calls — removes background noise, echo and other voices from both sides of any call, plus meeting transcription and notes. Works with every calling app.",
    bn: "কলের জন্য AI নয়েজ ক্যান্সেলেশন — ব্যাকগ্রাউন্ড শব্দ ও ইকো দূর করে, মিটিং ট্রান্সক্রিপশনসহ। সব কলিং অ্যাপে কাজ করে।",
    caps: ["noise-cancel", "transcription", "meetings"],
  },
  {
    name: "LALAL.AI", brand: "LALAL.AI", provider: "LALAL.AI", category: "ai-voice-music",
    color: "#ef4444", access: "personal", src: "https://www.lalal.ai/pricing",
    desc: "AI stem splitter — extract vocals, instruments and individual tracks from any song with high accuracy. Used by musicians, DJs and content creators for remixes and karaoke tracks.",
    bn: "AI স্টেম স্প্লিটার — যেকোনো গান থেকে ভোকাল ও ইনস্ট্রুমেন্ট আলাদা করে। রিমিক্স ও কারাওকের জন্য ব্যবহৃত।",
    caps: ["stem-split", "audio-edit"],
  },
  {
    name: "Resemble AI", brand: "Resemble", provider: "Resemble AI", category: "ai-voice-music",
    color: "#0ea5e9", access: "personal", src: "https://www.resemble.ai/pricing",
    desc: "AI voice cloning and speech generation platform — create a custom voice from recordings and generate speech with emotion control, aimed at production voice-over and localization.",
    bn: "AI ভয়েস ক্লোনিং প্ল্যাটফর্ম — রেকর্ডিং থেকে কাস্টম ভয়েস তৈরি ও ইমোশন কন্ট্রোলসহ স্পিচ জেনারেশন।",
    caps: ["voice-clone", "tts"],
  },
  {
    name: "WellSaid Labs", brand: "WellSaid", provider: "WellSaid Labs", category: "ai-voice-music",
    color: "#1e293b", access: "personal", src: "https://wellsaidlabs.com/pricing",
    desc: "Studio-quality AI voice-over platform built for corporate training, e-learning and product videos — consistent, natural narration from a curated set of professional voice avatars.",
    bn: "স্টুডিও-মানের AI ভয়েস-ওভার প্ল্যাটফর্ম — ট্রেনিং, ই-লার্নিং ও প্রোডাক্ট ভিডিওর জন্য প্রফেশনাল ন্যারেশন।",
    caps: ["tts", "voice-over"],
  },
  {
    name: "Synthflow AI", brand: "Synthflow", provider: "Synthflow", category: "ai-voice-music",
    color: "#6366f1", access: "personal", src: "https://synthflow.ai",
    desc: "No-code AI phone agent builder — create voice assistants that answer calls, book appointments and qualify leads, connected to your calendar and CRM.",
    bn: "নো-কোড AI ফোন এজেন্ট বিল্ডার — কল রিসিভ, অ্যাপয়েন্টমেন্ট বুকিং ও লিড কোয়ালিফাই করা ভয়েস অ্যাসিস্ট্যান্ট তৈরি করা যায়।",
    caps: ["voice-agents", "automation", "no-code"],
  },
  {
    name: "Deepgram", brand: "Deepgram", provider: "Deepgram", category: "ai-voice-music",
    color: "#13ef95", access: "personal", src: "https://deepgram.com/pricing",
    desc: "Speech-to-text and voice AI API used by developers — fast, accurate transcription and real-time audio understanding, billed on paid credit plans.",
    bn: "ডেভেলপারদের জন্য স্পিচ-টু-টেক্সট ও ভয়েস AI API — দ্রুত ও নির্ভুল ট্রান্সক্রিপশন, ক্রেডিট-ভিত্তিক প্ল্যান।",
    caps: ["transcription", "api", "realtime"],
  },
  {
    name: "AssemblyAI", brand: "AssemblyAI", provider: "AssemblyAI", category: "ai-voice-music",
    color: "#2545d3", access: "personal", src: "https://www.assemblyai.com/pricing",
    desc: "Speech AI API for developers — transcription, speaker detection, summarization and audio intelligence models, commonly used to build voice features into apps.",
    bn: "ডেভেলপারদের জন্য স্পিচ AI API — ট্রান্সক্রিপশন, স্পিকার ডিটেকশন ও সামারাইজেশন মডেল।",
    caps: ["transcription", "api", "summarize"],
  },
  {
    name: "Cartesia", brand: "Cartesia", provider: "Cartesia", category: "ai-voice-music",
    color: "#0f172a", access: "personal", src: "https://cartesia.ai",
    desc: "Real-time voice AI platform — ultra-low-latency text-to-speech and voice cloning built for live agents, games and interactive applications.",
    bn: "রিয়েল-টাইম ভয়েস AI প্ল্যাটফর্ম — লাইভ এজেন্ট ও ইন্টার‌্যাক্টিভ অ্যাপের জন্য আল্ট্রা-লো-লেটেন্সি TTS ও ভয়েস ক্লোনিং।",
    caps: ["tts", "voice-clone", "realtime", "api"],
  },
  {
    name: "Ahrefs", brand: "Ahrefs", provider: "Ahrefs", category: "ai-workspace",
    color: "#ff8800", access: "personal", src: "https://ahrefs.com/pricing",
    desc: "Industry-standard SEO toolset — backlink analysis, keyword research, rank tracking and site audits, now with AI content helpers. Essential for agencies and serious site owners.",
    bn: "ইন্ডাস্ট্রি-স্ট্যান্ডার্ড SEO টুলসেট — ব্যাকলিংক বিশ্লেষণ, কিওয়ার্ড রিসার্চ, র‍্যাংক ট্র্যাকিং ও সাইট অডিট।",
    caps: ["seo", "keywords", "backlinks", "audit"],
  },
  {
    name: "SE Ranking", brand: "SE Ranking", provider: "SE Ranking", category: "ai-workspace",
    color: "#2563eb", access: "personal", src: "https://seranking.com/prices.html",
    desc: "All-in-one SEO platform at a friendlier price point — rank tracking, competitor research, site audit and an AI writing assistant for SEO content.",
    bn: "অল-ইন-ওয়ান SEO প্ল্যাটফর্ম — র‍্যাংক ট্র্যাকিং, কম্পিটিটর রিসার্চ, সাইট অডিট ও AI রাইটিং অ্যাসিস্ট্যান্ট।",
    caps: ["seo", "keywords", "audit", "writing"],
  },
  {
    name: "Moz Pro", brand: "Moz", provider: "Moz", category: "ai-workspace",
    color: "#1c8bd9", access: "personal", src: "https://moz.com/products/pro/pricing",
    desc: "Veteran SEO software suite — keyword research, link analysis with Domain Authority metrics, rank tracking and on-page optimization recommendations.",
    bn: "অভিজ্ঞ SEO সফটওয়্যার স্যুট — কিওয়ার্ড রিসার্চ, Domain Authority-সহ লিংক বিশ্লেষণ ও র‍্যাংক ট্র্যাকিং।",
    caps: ["seo", "keywords", "backlinks"],
  },
  {
    name: "Frase", brand: "Frase", provider: "Frase", category: "ai-workspace",
    color: "#7c3aed", access: "personal", src: "https://www.frase.io/pricing",
    desc: "SEO content optimization tool — analyzes top-ranking pages for a keyword and guides AI-assisted briefs and drafts that match search intent.",
    bn: "SEO কনটেন্ট অপটিমাইজেশন টুল — টপ-র‍্যাংকিং পেজ বিশ্লেষণ করে AI-সহায়তায় ব্রিফ ও ড্রাফট তৈরি করে।",
    caps: ["seo", "content", "writing"],
  },
  {
    name: "MarketMuse", brand: "MarketMuse", provider: "MarketMuse", category: "ai-workspace",
    color: "#0891b2", access: "personal", src: "https://www.marketmuse.com/pricing",
    desc: "AI content strategy platform — audits your whole site, scores topical authority and prioritizes which content to create or update for the biggest SEO impact.",
    bn: "AI কনটেন্ট স্ট্র্যাটেজি প্ল্যাটফর্ম — পুরো সাইট অডিট করে কোন কনটেন্ট আগে বানানো বা আপডেট করা উচিত তা নির্ধারণ করে।",
    caps: ["seo", "content-strategy", "audit"],
  },
  {
    name: "AdCreative.ai", brand: "AdCreative", provider: "AdCreative.ai", category: "ai-design",
    color: "#ef4444", access: "personal", src: "https://www.adcreative.ai/pricing",
    desc: "AI ad creative generator — produces conversion-focused banner and social ad designs with scoring that predicts which creatives will perform best.",
    bn: "AI অ্যাড ক্রিয়েটিভ জেনারেটর — কনভার্সন-ফোকাসড ব্যানার ও সোশ্যাল অ্যাড ডিজাইন তৈরি করে, পারফরম্যান্স স্কোরসহ।",
    caps: ["ads", "design", "image-gen"],
  },
  {
    name: "Predis.ai", brand: "Predis", provider: "Predis.ai", category: "ai-design",
    color: "#8b5cf6", access: "personal", src: "https://predis.ai/pricing",
    desc: "AI social media content generator — turns a one-line idea into ready-to-post creatives, carousels, reels and captions, with scheduling and competitor analysis built in.",
    bn: "AI সোশ্যাল মিডিয়া কনটেন্ট জেনারেটর — এক লাইনের আইডিয়া থেকে পোস্ট, ক্যারাউসেল, রিল ও ক্যাপশন তৈরি করে, শিডিউলিংসহ।",
    caps: ["social", "design", "scheduling"],
  },
  {
    name: "Simplified", brand: "Simplified", provider: "Simplified", category: "ai-design",
    color: "#f43f5e", access: "personal", src: "https://simplified.com/pricing",
    desc: "All-in-one AI marketing workspace — design, AI writing, video editing and social scheduling in a single tool, aimed at small teams replacing several subscriptions.",
    bn: "অল-ইন-ওয়ান AI মার্কেটিং ওয়ার্কস্পেস — ডিজাইন, AI রাইটিং, ভিডিও এডিটিং ও সোশ্যাল শিডিউলিং এক টুলে।",
    caps: ["design", "writing", "video-edit", "scheduling"],
  },
  {
    name: "Ocoya", brand: "Ocoya", provider: "Ocoya", category: "ai-workspace",
    color: "#10b981", access: "personal", src: "https://www.ocoya.com/pricing",
    desc: "AI social media management platform — generate captions and graphics, schedule across all major networks and track performance from one dashboard.",
    bn: "AI সোশ্যাল মিডিয়া ম্যানেজমেন্ট — ক্যাপশন ও গ্রাফিক্স তৈরি, সব নেটওয়ার্কে শিডিউল ও পারফরম্যান্স ট্র্যাকিং।",
    caps: ["social", "scheduling", "writing"],
  },
  {
    name: "Scite", brand: "Scite", provider: "Scite", category: "ai-workspace",
    color: "#1d4ed8", access: "personal", src: "https://scite.ai/pricing",
    desc: "Research tool that shows how papers cite each other — Smart Citations reveal whether a study is supported or contrasted by later work, plus an AI assistant grounded in real literature.",
    bn: "গবেষণা টুল — Smart Citations দেখায় কোনো স্টাডি পরবর্তী গবেষণায় সমর্থিত না বিরোধিত, রিয়েল লিটারেচারে গ্রাউন্ডেড AI অ্যাসিস্ট্যান্টসহ।",
    caps: ["research", "citations"],
  },
  {
    name: "SciSpace", brand: "SciSpace", provider: "SciSpace", category: "ai-workspace",
    color: "#7c3aed", access: "personal", src: "https://typeset.io/pricing",
    desc: "AI research assistant for academic papers — chat with PDFs, explain complex passages, run literature reviews and find related work. Widely used by thesis and journal writers.",
    bn: "একাডেমিক পেপারের জন্য AI রিসার্চ অ্যাসিস্ট্যান্ট — PDF-এর সাথে চ্যাট, কঠিন অংশের ব্যাখ্যা ও লিটারেচার রিভিউ। থিসিস লেখকদের কাছে জনপ্রিয়।",
    caps: ["research", "pdf-chat", "literature-review"],
  },
  {
    name: "WolframAlpha Pro", brand: "WolframAlpha", provider: "Wolfram Research", category: "ai-workspace",
    color: "#dd1100", access: "personal", src: "https://www.wolframalpha.com/pro",
    desc: "Computational knowledge engine with step-by-step solutions — math, statistics, physics and data analysis with worked steps, file upload and practice problems. A staple for STEM students.",
    bn: "কম্পিউটেশনাল নলেজ ইঞ্জিন — গণিত, পরিসংখ্যান ও ফিজিক্সের ধাপে ধাপে সমাধান। STEM শিক্ষার্থীদের অপরিহার্য টুল।",
    caps: ["math", "step-by-step", "data-analysis"],
  },
  {
    name: "Paperpal", brand: "Paperpal", provider: "Cactus Communications", category: "ai-writing",
    color: "#16a34a", access: "personal", src: "https://paperpal.com/pricing",
    desc: "AI academic writing assistant — language editing tuned for research manuscripts, journal-submission checks, paraphrasing and citation support for scholarly writing.",
    bn: "AI একাডেমিক রাইটিং অ্যাসিস্ট্যান্ট — গবেষণা ম্যানুস্ক্রিপ্টের ভাষা সম্পাদনা, জার্নাল-সাবমিশন চেক ও প্যারাফ্রেজিং।",
    caps: ["academic-writing", "editing", "citations"],
  },
  {
    name: "Jenni AI", brand: "Jenni", provider: "Jenni AI", category: "ai-writing",
    color: "#6366f1", access: "personal", src: "https://jenni.ai/pricing",
    desc: "AI writing assistant built for academic essays and papers — autocomplete that writes alongside you, in-text citations from real sources, and paraphrasing tools.",
    bn: "একাডেমিক প্রবন্ধ ও পেপারের জন্য AI রাইটিং অ্যাসিস্ট্যান্ট — সাথে সাথে লেখা, রিয়েল সোর্স থেকে সাইটেশন ও প্যারাফ্রেজিং।",
    caps: ["academic-writing", "citations", "autocomplete"],
  },
  {
    name: "Voiceflow", brand: "Voiceflow", provider: "Voiceflow", category: "ai-workspace",
    color: "#3b82f6", access: "personal", src: "https://www.voiceflow.com/pricing",
    desc: "Platform for designing and launching AI chat and voice agents — visual builder, knowledge-base grounding and integrations, used by teams to ship customer-support assistants.",
    bn: "AI চ্যাট ও ভয়েস এজেন্ট ডিজাইন ও লঞ্চের প্ল্যাটফর্ম — ভিজ্যুয়াল বিল্ডার ও নলেজ-বেস গ্রাউন্ডিংসহ।",
    caps: ["agents", "chatbots", "no-code"],
  },
  {
    name: "Relay.app", brand: "Relay.app", provider: "Relay.app", category: "ai-workspace",
    color: "#a855f7", access: "personal", src: "https://www.relay.app/pricing",
    desc: "AI-assisted workflow automation with human-in-the-loop steps — automate multi-app processes while keeping approval checkpoints where judgment is needed.",
    bn: "হিউম্যান-ইন-দ্য-লুপ ধাপসহ AI ওয়ার্কফ্লো অটোমেশন — অনুমোদন চেকপয়েন্ট রেখে মাল্টি-অ্যাপ প্রসেস স্বয়ংক্রিয় করা যায়।",
    caps: ["automation", "agents", "approvals"],
  },
  {
    name: "Haiper AI", brand: "Haiper", provider: "Haiper", category: "ai-video",
    color: "#0ea5e9", access: "personal", src: "https://haiper.ai",
    desc: "AI video generation platform — text-to-video and image animation with credit-based paid plans, aimed at short creative and social clips.",
    bn: "AI ভিডিও জেনারেশন প্ল্যাটফর্ম — টেক্সট-টু-ভিডিও ও ইমেজ অ্যানিমেশন, ক্রেডিট-ভিত্তিক প্ল্যান।",
    caps: ["video-gen", "image-to-video"],
  },
  {
    name: "LTX Studio", brand: "LTX Studio", provider: "Lightricks", category: "ai-video",
    color: "#111827", access: "personal", src: "https://ltx.studio",
    desc: "AI filmmaking studio from Lightricks — turn a script or idea into a full storyboard with consistent characters, shots, voice and music, then render scenes. Built for narrative video, not just clips.",
    bn: "Lightricks-এর AI ফিল্মমেকিং স্টুডিও — স্ক্রিপ্ট থেকে সম্পূর্ণ স্টোরিবোর্ড, কনসিসটেন্ট ক্যারেক্টার, ভয়েস ও মিউজিকসহ দৃশ্য তৈরি।",
    caps: ["video-gen", "storyboard", "character-consistency"],
  },
  {
    name: "Argil", brand: "Argil", provider: "Argil", category: "ai-video",
    color: "#f59e0b", access: "personal", src: "https://www.argil.ai",
    desc: "AI avatar video platform for creators — generate talking videos of your own avatar with body language control, built for short-form social content at scale.",
    bn: "ক্রিয়েটরদের জন্য AI অ্যাভাটার ভিডিও প্ল্যাটফর্ম — নিজের অ্যাভাটারের টকিং ভিডিও, বডি-ল্যাঙ্গুয়েজ কন্ট্রোলসহ।",
    caps: ["avatar", "video-gen"],
  },
  {
    name: "Vizard", brand: "Vizard", provider: "Vizard", category: "ai-video",
    color: "#8b5cf6", access: "personal", src: "https://vizard.ai/pricing",
    desc: "AI clipping tool — upload a long video or podcast and it finds the best moments, cuts them into subtitled vertical clips and scores each for viral potential.",
    bn: "AI ক্লিপিং টুল — লম্বা ভিডিও থেকে সেরা মুহূর্ত খুঁজে সাবটাইটেলসহ ভার্টিকাল ক্লিপ বানায়।",
    caps: ["video-edit", "clipping", "subtitles"],
  },
  {
    name: "Colossyan", brand: "Colossyan", provider: "Colossyan", category: "ai-video",
    color: "#2563eb", access: "personal", src: "https://www.colossyan.com/pricing",
    desc: "AI avatar video platform focused on workplace learning — turn documents and slides into presenter-led training videos in many languages, no filming required.",
    bn: "ওয়ার্কপ্লেস লার্নিংয়ের জন্য AI অ্যাভাটার ভিডিও — ডকুমেন্ট ও স্লাইড থেকে বহু ভাষায় ট্রেনিং ভিডিও, শুটিং ছাড়াই।",
    caps: ["avatar", "video-gen", "training"],
  },
  {
    name: "Akool", brand: "Akool", provider: "Akool", category: "ai-video",
    color: "#0f766e", access: "personal", src: "https://akool.com/pricing",
    desc: "Generative AI platform for marketing visuals — realistic avatars, face swap, talking photos and streaming avatars used for personalized ads and campaigns.",
    bn: "মার্কেটিং ভিজ্যুয়ালের জন্য জেনারেটিভ AI — রিয়েলিস্টিক অ্যাভাটার, ফেস সোয়াপ ও টকিং ফটো।",
    caps: ["avatar", "face-swap", "video-gen"],
  },
  {
    name: "Wondershare Filmora", brand: "Filmora", provider: "Wondershare", category: "ai-video",
    color: "#000000", access: "personal", src: "https://filmora.wondershare.com/shop/buy/buy-video-editor.html",
    desc: "Popular desktop video editor with built-in AI — smart cutout, audio denoise, AI copilot editing and text-based editing, at a fraction of professional-suite pricing.",
    bn: "জনপ্রিয় ডেস্কটপ ভিডিও এডিটর — স্মার্ট কাটআউট, অডিও ডিনয়েজ ও AI কোপাইলট এডিটিংসহ, সাশ্রয়ী দামে।",
    caps: ["video-edit", "audio-denoise", "ai-copilot"],
  },
  {
    name: "Figma", brand: "Figma", provider: "Figma", category: "ai-design",
    color: "#a259ff", access: "personal", src: "https://www.figma.com/pricing/",
    desc: "The standard collaborative interface-design tool — UI/UX design, prototyping and design systems in the browser, now with Figma AI features for faster drafting and asset search.",
    bn: "ইন্টারফেস ডিজাইনের স্ট্যান্ডার্ড টুল — UI/UX ডিজাইন, প্রোটোটাইপিং ও ডিজাইন সিস্টেম, Figma AI ফিচারসহ।",
    caps: ["design", "prototyping", "collaboration"],
  },
  {
    name: "Framer", brand: "Framer", provider: "Framer", category: "ai-design",
    color: "#0055ff", access: "personal", src: "https://www.framer.com/pricing/",
    desc: "Website builder loved by designers — design and publish production sites visually, with AI page generation, CMS and hosting built in. No code required to ship a polished site.",
    bn: "ডিজাইনারদের প্রিয় ওয়েবসাইট বিল্ডার — ভিজ্যুয়ালি ডিজাইন ও পাবলিশ, AI পেজ জেনারেশন, CMS ও হোস্টিংসহ।",
    caps: ["web-design", "no-code", "cms"],
  },
  {
    name: "Plus AI", brand: "Plus AI", provider: "Plus", category: "ai-design",
    color: "#4f46e5", access: "personal", src: "https://plusai.com/pricing",
    desc: "AI presentation maker that works inside Google Slides and PowerPoint — generate full decks from a prompt or document, then edit natively in the tools you already use.",
    bn: "Google Slides ও PowerPoint-এর ভিতরে কাজ করা AI প্রেজেন্টেশন মেকার — প্রম্পট বা ডকুমেন্ট থেকে সম্পূর্ণ ডেক তৈরি।",
    caps: ["presentations", "slides", "templates"],
  },
  {
    name: "Decktopus", brand: "Decktopus", provider: "Decktopus", category: "ai-design",
    color: "#f43f5e", access: "personal", src: "https://www.decktopus.com/pricing",
    desc: "AI presentation generator — answer a few questions and get a structured, designed deck with suggested content, forms and embeds, aimed at sales and pitch use.",
    bn: "AI প্রেজেন্টেশন জেনারেটর — কয়েকটি প্রশ্নের উত্তর দিলে ডিজাইন করা ডেক তৈরি হয়, সেলস ও পিচের জন্য।",
    caps: ["presentations", "templates"],
  },
  {
    name: "Looka", brand: "Looka", provider: "Looka", category: "ai-design",
    color: "#00b8d4", access: "personal", src: "https://looka.com/pricing",
    desc: "AI logo and brand kit generator — design a logo in minutes, then get matching business cards, social profiles and a full brand kit. Popular with new businesses on a budget.",
    bn: "AI লোগো ও ব্র্যান্ড কিট জেনারেটর — মিনিটে লোগো ডিজাইন, সাথে বিজনেস কার্ড ও সম্পূর্ণ ব্র্যান্ড কিট। নতুন ব্যবসার জন্য জনপ্রিয়।",
    caps: ["logo", "branding", "design"],
  },
  {
    name: "Designs.ai", brand: "Designs.ai", provider: "Inmagine", category: "ai-design",
    color: "#7c3aed", access: "personal", src: "https://designs.ai/pricing",
    desc: "AI creative suite — logo maker, video maker, AI writer and design tools under one subscription, built for quick marketing asset production.",
    bn: "AI ক্রিয়েটিভ স্যুট — লোগো মেকার, ভিডিও মেকার, AI রাইটার ও ডিজাইন টুল এক সাবস্ক্রিপশনে।",
    caps: ["logo", "video-gen", "writing", "design"],
  },
  {
    name: "Pitch", brand: "Pitch", provider: "Pitch", category: "ai-design",
    color: "#111827", access: "personal", src: "https://pitch.com/pricing",
    desc: "Modern presentation software for teams — beautiful templates, real-time collaboration, analytics on who viewed your deck, and AI-assisted first drafts.",
    bn: "টিমের জন্য আধুনিক প্রেজেন্টেশন সফটওয়্যার — সুন্দর টেমপ্লেট, রিয়েল-টাইম কোলাবরেশন ও AI ড্রাফট।",
    caps: ["presentations", "collaboration", "analytics"],
  },
  {
    name: "SlidesAI", brand: "SlidesAI", provider: "SlidesAI", category: "ai-design",
    color: "#22c55e", access: "personal", src: "https://www.slidesai.io/pricing",
    desc: "AI add-on for Google Slides — paste your text and it structures it into a designed presentation automatically. A fast, low-cost way to turn notes into decks.",
    bn: "Google Slides-এর AI অ্যাড-অন — টেক্সট পেস্ট করলেই ডিজাইন করা প্রেজেন্টেশনে সাজিয়ে দেয়।",
    caps: ["presentations", "slides"],
  },
  {
    name: "Napkin AI", brand: "Napkin", provider: "Napkin AI", category: "ai-design",
    color: "#f59e0b", access: "personal", src: "https://www.napkin.ai",
    desc: "Turns written text into visuals — paste a paragraph and get editable diagrams, flowcharts and infographics for docs, decks and social posts.",
    bn: "লেখা থেকে ভিজ্যুয়াল তৈরি — প্যারাগ্রাফ পেস্ট করলে এডিটযোগ্য ডায়াগ্রাম, ফ্লোচার্ট ও ইনফোগ্রাফিক পাওয়া যায়।",
    caps: ["diagrams", "infographics", "design"],
  },
  {
    name: "Envato Elements", brand: "Envato", provider: "Envato", category: "ai-workspace",
    color: "#82b541", access: "personal", src: "https://elements.envato.com/pricing",
    desc: "Unlimited-download subscription for creative assets — stock video, templates, graphics, fonts, music and WordPress themes, with simple commercial licensing. A workhorse for agencies and creators.",
    bn: "ক্রিয়েটিভ অ্যাসেটের আনলিমিটেড-ডাউনলোড সাবস্ক্রিপশন — স্টক ভিডিও, টেমপ্লেট, গ্রাফিক্স, ফন্ট ও মিউজিক, কমার্শিয়াল লাইসেন্সসহ।",
    caps: ["stock-assets", "templates", "commercial-license"],
  },
  {
    name: "Storyblocks", brand: "Storyblocks", provider: "Storyblocks", category: "ai-workspace",
    color: "#0ea5e9", access: "personal", src: "https://www.storyblocks.com/pricing",
    desc: "Unlimited stock media subscription — royalty-free video footage, After Effects templates, images and audio for video production at a flat rate.",
    bn: "আনলিমিটেড স্টক মিডিয়া সাবস্ক্রিপশন — রয়্যালটি-ফ্রি ফুটেজ, টেমপ্লেট, ছবি ও অডিও।",
    caps: ["stock-assets", "video", "audio"],
  },
  {
    name: "Motion Array", brand: "Motion Array", provider: "Artlist", category: "ai-workspace",
    color: "#1e293b", access: "personal", src: "https://motionarray.com/pricing/",
    desc: "All-in-one subscription for video creators — Premiere Pro and After Effects templates, presets, stock footage, music and plugins from the Artlist family.",
    bn: "ভিডিও ক্রিয়েটরদের অল-ইন-ওয়ান সাবস্ক্রিপশন — Premiere/After Effects টেমপ্লেট, প্রিসেট, ফুটেজ ও মিউজিক।",
    caps: ["templates", "stock-assets", "plugins"],
  },
  {
    name: "LinkedIn Premium Career", brand: "LinkedIn Premium", provider: "LinkedIn", category: "ai-workspace",
    color: "#0a66c2", access: "personal", src: "https://premium.linkedin.com",
    desc: "LinkedIn's job-seeker plan — see who viewed your profile, InMail credits, salary insights, AI-powered profile and message writing, plus full LinkedIn Learning access.",
    bn: "LinkedIn-এর জব-সিকার প্ল্যান — প্রোফাইল ভিউয়ার, InMail, স্যালারি ইনসাইট, AI রাইটিং ও LinkedIn Learning অ্যাক্সেস।",
    caps: ["career", "networking", "learning"],
  },
  {
    name: "LinkedIn Premium Business", brand: "LinkedIn Business", provider: "LinkedIn", category: "ai-workspace",
    color: "#0a66c2", access: "personal", src: "https://premium.linkedin.com",
    desc: "LinkedIn's business networking plan — unlimited profile browsing, more InMail, company growth insights and AI-assisted outreach for sales and business development.",
    bn: "LinkedIn-এর বিজনেস প্ল্যান — আনলিমিটেড প্রোফাইল ব্রাউজিং, বেশি InMail, কোম্পানি ইনসাইট ও AI আউটরিচ।",
    caps: ["networking", "sales", "insights"],
  },
  {
    name: "LinkedIn Learning", brand: "LinkedIn Learning", provider: "LinkedIn", category: "ai-workspace",
    color: "#0a66c2", access: "personal", src: "https://www.linkedin.com/learning/subscription",
    desc: "Professional course library with certificates that show on your LinkedIn profile — thousands of courses in business, tech and creative skills, with AI coaching on higher tiers.",
    bn: "প্রফেশনাল কোর্স লাইব্রেরি — হাজারো কোর্স ও LinkedIn প্রোফাইলে দেখানো সার্টিফিকেট।",
    caps: ["learning", "certificates"],
  },
  {
    name: "Coursera Plus", brand: "Coursera", provider: "Coursera", category: "ai-workspace",
    color: "#0056d2", access: "personal", src: "https://www.coursera.org/courseraplus",
    desc: "Unlimited access to 7,000+ courses and certificates from top universities and companies — Google, IBM, Meta and university programs under one subscription, with shareable certificates.",
    bn: "শীর্ষ বিশ্ববিদ্যালয় ও কোম্পানির ৭০০০+ কোর্সে আনলিমিটেড অ্যাক্সেস — Google, IBM, Meta সার্টিফিকেটসহ।",
    caps: ["learning", "certificates", "university"],
  },
  {
    name: "Skillshare", brand: "Skillshare", provider: "Skillshare", category: "ai-workspace",
    color: "#00ff84", access: "personal", src: "https://www.skillshare.com/membership",
    desc: "Creative learning membership — thousands of classes in design, illustration, video, photography and freelancing, taught by working creators with hands-on projects.",
    bn: "ক্রিয়েটিভ লার্নিং মেম্বারশিপ — ডিজাইন, ইলাস্ট্রেশন, ভিডিও ও ফ্রিল্যান্সিংয়ের হাজারো ক্লাস।",
    caps: ["learning", "creative"],
  },
  {
    name: "DataCamp", brand: "DataCamp", provider: "DataCamp", category: "ai-workspace",
    color: "#03ef62", access: "personal", src: "https://www.datacamp.com/pricing",
    desc: "Interactive learning platform for data skills — Python, SQL, R, machine learning and AI courses with in-browser coding exercises and career tracks with certification.",
    bn: "ডেটা স্কিলের ইন্টার‌্যাক্টিভ লার্নিং — Python, SQL, R ও মেশিন লার্নিং কোর্স, ব্রাউজারেই কোডিং প্র্যাকটিস।",
    caps: ["learning", "data-science", "coding"],
  },
  {
    name: "Qodo", brand: "Qodo", provider: "Qodo", category: "ai-code",
    color: "#7c3aed", access: "personal", src: "https://www.qodo.ai/pricing",
    desc: "AI code-integrity platform (formerly Codium) — test generation, code review and PR analysis agents focused on catching bugs before merge rather than just writing code faster.",
    bn: "AI কোড-ইন্টিগ্রিটি প্ল্যাটফর্ম (আগের Codium) — টেস্ট জেনারেশন, কোড রিভিউ ও PR বিশ্লেষণ এজেন্ট।",
    caps: ["code", "testing", "code-review"],
  },
  {
    name: "Augment Code", brand: "Augment", provider: "Augment", category: "ai-code",
    color: "#10b981", access: "personal", src: "https://www.augmentcode.com/pricing",
    desc: "AI coding assistant built for large real-world codebases — deep context engine that understands your whole repository, with agent mode in VS Code and JetBrains.",
    bn: "বড় কোডবেসের জন্য AI কোডিং অ্যাসিস্ট্যান্ট — পুরো রিপোজিটরি বোঝা কনটেক্সট ইঞ্জিন, VS Code ও JetBrains-এ এজেন্ট মোড।",
    caps: ["code", "codebase-context", "agents"],
  },
  {
    name: "Amazon Q Developer", brand: "Amazon Q", provider: "AWS", category: "ai-code",
    color: "#ff9900", access: "personal", src: "https://aws.amazon.com/q/developer/pricing/",
    desc: "AWS's AI developer assistant — code completion and agents in the IDE and CLI, plus AWS-aware help for infrastructure, debugging and cost questions. Paid Pro tier per user.",
    bn: "AWS-এর AI ডেভেলপার অ্যাসিস্ট্যান্ট — IDE ও CLI-তে কোড কমপ্লিশন ও এজেন্ট, AWS-বিষয়ক সহায়তাসহ।",
    caps: ["code", "aws", "agents"],
  },
  {
    name: "v0.dev Pro", brand: "v0", provider: "Vercel", category: "ai-code",
    color: "#000000", access: "personal", src: "https://v0.dev/pricing",
    desc: "Vercel's AI UI generator — describe an interface and get production-ready React and Tailwind components, iterate in chat and deploy straight to Vercel.",
    bn: "Vercel-এর AI UI জেনারেটর — বর্ণনা দিলে প্রোডাকশন-রেডি React ও Tailwind কম্পোনেন্ট তৈরি করে।",
    caps: ["code", "ui-gen", "react"],
  },
  {
    name: "Rytr", brand: "Rytr", provider: "Rytr", category: "ai-writing",
    color: "#4f46e5", access: "personal", src: "https://rytr.me/pricing",
    desc: "Budget-friendly AI writing assistant — 40+ content templates for emails, ads, blogs and product descriptions in 30+ languages, at one of the lowest price points in the category.",
    bn: "সাশ্রয়ী AI রাইটিং অ্যাসিস্ট্যান্ট — ইমেইল, অ্যাড, ব্লগের ৪০+ টেমপ্লেট, ৩০+ ভাষায়।",
    caps: ["writing", "templates", "multilingual"],
  },
  {
    name: "Sudowrite", brand: "Sudowrite", provider: "Sudowrite", category: "ai-writing",
    color: "#8b5cf6", access: "personal", src: "https://www.sudowrite.com/pricing",
    desc: "AI writing partner built specifically for fiction — describe, rewrite and brainstorm story beats, generate prose in your voice, and plan whole novels with Story Bible.",
    bn: "ফিকশনের জন্য তৈরি AI রাইটিং পার্টনার — গল্পের বিট ব্রেনস্টর্ম, নিজের ভয়েসে গদ্য ও Story Bible দিয়ে উপন্যাস পরিকল্পনা।",
    caps: ["fiction", "writing", "brainstorm"],
  },
  {
    name: "HyperWrite", brand: "HyperWrite", provider: "OthersideAI", category: "ai-writing",
    color: "#2563eb", access: "personal", src: "https://www.hyperwriteai.com",
    desc: "AI writing assistant with hundreds of purpose-built tools — flexible autowrite, message replies, summarizers and research helpers that work across the web via extension.",
    bn: "শত শত টুলসহ AI রাইটিং অ্যাসিস্ট্যান্ট — অটোরাইট, রিপ্লাই, সামারাইজার, ব্রাউজার এক্সটেনশনে সর্বত্র কাজ করে।",
    caps: ["writing", "browser", "research"],
  },
  {
    name: "Fathom", brand: "Fathom", provider: "Fathom", category: "ai-workspace",
    color: "#6366f1", access: "personal", src: "https://fathom.video/pricing",
    desc: "AI notetaker for Zoom, Meet and Teams — records, transcribes and summarizes calls instantly, with action items and CRM sync. Known for a generous free tier and fast summaries.",
    bn: "Zoom, Meet ও Teams-এর AI নোটটেকার — কল রেকর্ড, ট্রান্সক্রাইব ও সাথে সাথে সামারি, অ্যাকশন আইটেমসহ।",
    caps: ["meetings", "transcription", "summarize"],
  },
  {
    name: "tl;dv", brand: "tl;dv", provider: "tl;dv", category: "ai-workspace",
    color: "#ec4899", access: "personal", src: "https://tldv.io/pricing",
    desc: "Meeting recorder and AI notetaker — timestamps, clips and multi-meeting AI reports across Zoom, Meet and Teams, with translation into 30+ languages.",
    bn: "মিটিং রেকর্ডার ও AI নোটটেকার — টাইমস্ট্যাম্প, ক্লিপ ও মাল্টি-মিটিং AI রিপোর্ট, ৩০+ ভাষায় অনুবাদসহ।",
    caps: ["meetings", "transcription", "translate"],
  },
  {
    name: "Read AI", brand: "Read AI", provider: "Read AI", category: "ai-workspace",
    color: "#0891b2", access: "personal", src: "https://www.read.ai/pricing",
    desc: "AI copilot for meetings, email and messaging — summaries, speaker coaching metrics and workflow reports that connect what happened in meetings to your inbox and chats.",
    bn: "মিটিং, ইমেইল ও মেসেজিংয়ের AI কোপাইলট — সামারি, স্পিকার কোচিং ও ওয়ার্কফ্লো রিপোর্ট।",
    caps: ["meetings", "email", "summarize"],
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

// Distinct products that share a brand prefix with an existing record but are
// NOT the same product (Adobe Firefly is in the catalog; Creative Cloud and
// Express are different Adobe subscriptions). Checked by exact normalized name.
const BRAND_PREFIX_ALLOWLIST = new Set(["adobecreativecloud", "adobeexpresspremium"]);

function collidesWithExisting(t) {
  const nb = norm(t.brand);
  const nn = norm(t.name);
  if (BRAND_PREFIX_ALLOWLIST.has(nn) && !existingNames.has(nn)) return false;
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
