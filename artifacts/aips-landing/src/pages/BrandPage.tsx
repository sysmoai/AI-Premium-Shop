import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle, ChevronRight,
  FileText, Terminal, Brain, Zap,
  Link2, Layers, Clock,
  Bot, Search, Mail, HardDrive, BarChart2, Layout, Play, ImageIcon,
  GraduationCap, Laptop, Briefcase, Monitor,
  Camera, Youtube, Palette, Megaphone, BookOpen, Home,
  Video, Scissors, Maximize, ArrowUpCircle, Sparkles, Music,
  Code, ThumbsUp,
  Users, History, UserPlus, Shield, Building, Rocket,
  BarChart3, Globe, CheckSquare,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { BrandIcon } from "@/components/BrandIcon";
import productsData from "../../data/products.json";
import {
  StudentStorySVG,
  FreelancerStorySVG,
  BusinessStorySVG,
  JobSeekerStorySVG,
  DeveloperStorySVG,
  FOMOSplitSVG,
  AgenticRobotSVG,
  OrderFlowSVG,
} from "@/components/illustrations";

const WHATSAPP = "https://wa.me/8801865385348";

const BRAND_COMPETITORS: Record<string, {
  name1: string; slug1: string; price1: string; strength1: string;
  name2: string; slug2: string; price2: string; strength2: string;
  compPage?: string;
}> = {
  "chatgpt-plans-bangladesh": { name1: "Claude", slug1: "/claude-pro-bangladesh", price1: "from BDT 1,495", strength1: "#1 for writing quality & reasoning", name2: "Google AI Pro", slug2: "/gemini-advanced-bangladesh", price2: "BDT 500", strength2: "Google Workspace AI + 2TB storage", compPage: "/chatgpt-vs-claude" },
  "chatgpt-plus-bangladesh": { name1: "Claude Pro", slug1: "/claude-pro-bangladesh", price1: "from BDT 1,495", strength1: "#1 for writing quality & reasoning", name2: "Google AI Pro", slug2: "/gemini-advanced-bangladesh", price2: "BDT 500", strength2: "Google Workspace AI + 2TB storage", compPage: "/chatgpt-vs-claude" },
  "chatgpt-business-bangladesh": { name1: "Claude Pro", slug1: "/claude-pro-bangladesh", price1: "from BDT 1,495", strength1: "Best writing quality, long documents", name2: "Google AI Pro", slug2: "/gemini-advanced-bangladesh", price2: "BDT 500", strength2: "Google Workspace integration" },
  "chatgpt-pro-bangladesh": { name1: "Claude Max 5x", slug1: "/claude-pro-bangladesh", price1: "from BDT 14,950", strength1: "Extended thinking, 1M context window", name2: "GitHub Copilot Pro", slug2: "/github-copilot-bangladesh", price2: "BDT 1,495", strength2: "Best AI coding tool in VS Code" },
  "claude-pro-bangladesh": { name1: "ChatGPT Plus", slug1: "/chatgpt-plans-bangladesh", price1: "from BDT 350", strength1: "All-rounder: images, agents, web search", name2: "Perplexity Pro", slug2: "/perplexity-pro-bangladesh", price2: "from BDT 350", strength2: "AI-powered web research with citations", compPage: "/chatgpt-vs-claude" },
  "gemini-advanced-bangladesh": { name1: "ChatGPT Plus", slug1: "/chatgpt-plans-bangladesh", price1: "from BDT 350", strength1: "Image gen, coding agents, widest capabilities", name2: "Claude Pro", slug2: "/claude-pro-bangladesh", price2: "from BDT 1,495", strength2: "Writing quality & long document analysis", compPage: "/chatgpt-vs-gemini" },
  "supergrok-bangladesh": { name1: "ChatGPT Plus", slug1: "/chatgpt-plans-bangladesh", price1: "from BDT 350", strength1: "More affordable, image generation", name2: "Claude Pro", slug2: "/claude-pro-bangladesh", price2: "from BDT 1,495", strength2: "Best writing & reasoning quality" },
  "perplexity-pro-bangladesh": { name1: "ChatGPT Plus", slug1: "/chatgpt-plans-bangladesh", price1: "from BDT 350", strength1: "Broader AI capabilities, image gen", name2: "Claude Pro", slug2: "/claude-pro-bangladesh", price2: "from BDT 1,495", strength2: "Long document analysis, best writing" },
  "midjourney-bangladesh": { name1: "Ideogram", slug1: "/ideogram-bangladesh", price1: "from BDT 2,990", strength1: "Text in images, typography design", name2: "Leonardo AI", slug2: "/leonardo-ai-bangladesh", price2: "from BDT 599", strength2: "Budget image generation, character consistency" },
  "ideogram-bangladesh": { name1: "Midjourney", slug1: "/midjourney-bangladesh", price1: "from BDT 1,199", strength1: "Highest quality photorealistic & artistic images", name2: "Leonardo AI", slug2: "/leonardo-ai-bangladesh", price2: "from BDT 599", strength2: "Budget image generation" },
  "leonardo-ai-bangladesh": { name1: "Midjourney", slug1: "/midjourney-bangladesh", price1: "from BDT 1,199", strength1: "Best quality images across all styles", name2: "Ideogram", slug2: "/ideogram-bangladesh", price2: "from BDT 2,990", strength2: "Text in images & typography" },
  "runway-bangladesh": { name1: "HeyGen", slug1: "/heygen-bangladesh", price1: "from BDT 1,499", strength1: "AI avatars & video translation", name2: "Midjourney", slug2: "/midjourney-bangladesh", price2: "from BDT 1,199", strength2: "Best image generation" },
  "heygen-bangladesh": { name1: "Runway", slug1: "/runway-bangladesh", price1: "from BDT 1,794", strength1: "Video editing & AI video generation", name2: "ElevenLabs", slug2: "/elevenlabs-bangladesh", price2: "from BDT 748", strength2: "AI voice cloning & dubbing" },
  "elevenlabs-bangladesh": { name1: "Suno AI", slug1: "/suno-ai-bangladesh", price1: "from BDT 1,495", strength1: "AI music generation with commercial license", name2: "HeyGen", slug2: "/heygen-bangladesh", price2: "from BDT 1,499", strength2: "AI video creation with avatars" },
  "suno-ai-bangladesh": { name1: "ElevenLabs", slug1: "/elevenlabs-bangladesh", price1: "from BDT 748", strength1: "Voice cloning & audio production", name2: "Udio", slug2: "/udio-bangladesh", price2: "from BDT 499", strength2: "Budget AI music generation" },
  "github-copilot-bangladesh": { name1: "Cursor Pro", slug1: "/cursor-bangladesh", price1: "from BDT 2,990", strength1: "AI-native editor with autonomous agent mode", name2: "Claude Pro", slug2: "/claude-pro-bangladesh", price2: "from BDT 1,495", strength2: "Best for complex code reasoning", compPage: "/copilot-vs-cursor" },
  "cursor-bangladesh": { name1: "GitHub Copilot", slug1: "/github-copilot-bangladesh", price1: "BDT 1,495", strength1: "Works in existing VS Code/JetBrains IDE", name2: "Claude Pro", slug2: "/claude-pro-bangladesh", price2: "from BDT 1,495", strength2: "Long context code review & reasoning", compPage: "/copilot-vs-cursor" },
  "notion-business-bangladesh": { name1: "Google AI Pro", slug1: "/gemini-advanced-bangladesh", price1: "BDT 500", strength1: "AI in Gmail, Docs, Sheets + 2TB storage", name2: "Otter.ai", slug2: "/otter-ai-bangladesh", price2: "from BDT 799", strength2: "Meeting transcription & AI notes" },
  "replit-bangladesh": { name1: "GitHub Copilot", slug1: "/github-copilot-bangladesh", price1: "BDT 1,495", strength1: "Best IDE code completion plugin", name2: "Cursor Pro", slug2: "/cursor-bangladesh", price2: "from BDT 2,990", strength2: "Full AI-native coding environment" },
  "v0-dev-bangladesh": { name1: "GitHub Copilot", slug1: "/github-copilot-bangladesh", price1: "BDT 1,495", strength1: "Best for general backend/frontend coding", name2: "Replit Core", slug2: "/replit-bangladesh", price2: "BDT 500", strength2: "Cloud dev environment with AI" },
};

const BEST_FOR_LABELS: Record<string, string> = {
  "chatgpt-plans-bangladesh":    "All-rounder: writing, coding, images, agents",
  "chatgpt-plus-bangladesh":     "Best budget AI — writing, coding, images",
  "chatgpt-business-bangladesh": "Teams: admin controls + unlimited usage",
  "chatgpt-pro-bangladesh":      "Power users: unlimited GPT-5 Pro + Sora",
  "claude-pro-bangladesh":       "Best writing quality & code analysis",
  "gemini-advanced-bangladesh":  "Google Workspace AI + 2TB storage",
  "supergrok-bangladesh":        "Real-time AI with X/Twitter data",
  "perplexity-pro-bangladesh":   "AI-powered web research with citations",
  "midjourney-bangladesh":       "Best AI image generation",
  "ideogram-bangladesh":         "AI images with perfect text rendering",
  "leonardo-ai-bangladesh":      "Budget AI image generation",
  "runway-bangladesh":           "Professional AI video creation",
  "heygen-bangladesh":           "AI avatars & video translation",
  "elevenlabs-bangladesh":       "AI voice cloning & text-to-speech",
  "suno-ai-bangladesh":          "AI music & song generation",
  "github-copilot-bangladesh":   "AI coding assistant for VS Code",
  "cursor-bangladesh":           "AI-native IDE with agent mode",
  "notion-business-bangladesh":  "AI workspace for teams",
  "manus-ai-bangladesh":         "Autonomous AI agent",
  "replit-bangladesh":           "Cloud dev environment with AI",
  "v0-dev-bangladesh":           "AI-powered UI component generation",
};

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  brandColor: string;
  category: string;
  price: number;
  officialUSD: number | null;
  tier: string;
  accessType: string;
  badge?: string;
  description: string;
  deliverySLA: string;
  capabilities?: string[];
  whatsappMsg?: string;
}

const BRAND_META: Record<string, {
  displayName: string;
  tagline: string;
  description: string;
  accentColor: string;
  filterBySlug?: boolean;
  faqs: { q: string; a: string }[];
}> = {

  "chatgpt-plans-bangladesh": {
    displayName: "ChatGPT",
    tagline: "All ChatGPT Plans — from ৳350/month",
    description: "ChatGPT by OpenAI is the world's most popular AI assistant. From writing and coding to deep research, image generation, and autonomous agents — ChatGPT handles it all. Choose from Plus (personal productivity), Business (team features), or Pro (unlimited power). Available in Bangladesh via bKash and Nagad from ৳350/month.",
    accentColor: "#10a37f",
    faqs: [
      { q: "What is the difference between ChatGPT Plus, Business, and Pro?", a: "ChatGPT Plus is for personal use — writing, coding, research, and image generation from ৳350. ChatGPT Business adds team admin controls, unlimited usage, and data privacy from ৳699. ChatGPT Pro is for power users — unlimited GPT-5.4 Pro, Sora video, and agents from ৳4,500." },
      { q: "Which ChatGPT plan is best for students in Bangladesh?", a: "ChatGPT Plus Starter Shared at ৳350/month is ideal for students. It covers essay writing, research, code, and image generation. For higher stability, the Plus Premium Shared at ৳950 has fewer users per account." },
      { q: "What is a shared vs personal ChatGPT account?", a: "Shared: 2–7 users share a subscription — lower cost, slightly less availability. Personal: your own dedicated account — full privacy, all features, best performance. For privacy-sensitive work, always choose personal." },
      { q: "Can ChatGPT generate images in Bangladesh?", a: "Yes. All ChatGPT Plus, Business, and Pro plans include DALL-E image generation. You can create images directly in the chat interface by describing what you want." },
      { q: "How fast is delivery?", a: "ChatGPT Shared plans: 5–30 minutes. Personal plans: 2–4 hours. The clock starts after payment confirmation on WhatsApp." },
    ],
  },

  "chatgpt-plus-bangladesh": {
    displayName: "ChatGPT Plus",
    tagline: "ChatGPT Plus Bangladesh — from ৳350/month",
    description: "ChatGPT Plus gives you access to GPT-5 with writing, coding, research, image generation (DALL-E), deep research, and AI agents. Available in three tiers: Starter Shared (৳350), Premium Shared (৳950, fewer users), and Personal (৳2,990, your own account). All plans include bKash, Nagad, and Rocket payment.",
    accentColor: "#10a37f",
    filterBySlug: true,
    faqs: [
      { q: "What does ChatGPT Plus include?", a: "ChatGPT Plus includes GPT-5 model access, unlimited messaging, DALL-E image generation, deep research mode, AI agent mode (for autonomous tasks), custom GPTs, and file/code analysis." },
      { q: "What is the difference between Starter Shared and Premium Shared?", a: "Starter Shared has up to 7 users per account — lowest price but occasional slowdowns during peak hours. Premium Shared has only 2–3 users — more stable, faster responses, ৳950/month. For full privacy, choose Personal at ৳2,990." },
      { q: "Can I use ChatGPT Plus for coding?", a: "Yes. ChatGPT Plus (all tiers) includes GPT-5 which excels at code generation, debugging, code review, and explaining complex codebases in Python, JavaScript, TypeScript, and 50+ languages." },
      { q: "Is ChatGPT Plus better than the free version?", a: "ChatGPT Plus is significantly more powerful: access to GPT-5 (vs GPT-4o mini free), image generation, deep research, agents, and much higher usage limits. For any serious work, Plus is essential." },
      { q: "How do I pay for ChatGPT Plus in Bangladesh?", a: "Message us on WhatsApp (+880 1865-385348), choose your plan, and pay via bKash, Nagad, Rocket, or Bank Transfer. No international credit card needed." },
    ],
  },

  "chatgpt-business-bangladesh": {
    displayName: "ChatGPT Business",
    tagline: "ChatGPT Business Bangladesh — from ৳699/month",
    description: "ChatGPT Business is built for professional teams. It includes all Plus features plus admin controls, team workspaces, data privacy guarantees, and unlimited usage. Available in Starter Shared (৳699), Premium Shared (৳1,299), and Personal (৳3,990) tiers. Pay via bKash.",
    accentColor: "#10a37f",
    filterBySlug: true,
    faqs: [
      { q: "How is ChatGPT Business different from ChatGPT Plus?", a: "ChatGPT Business adds enterprise features: admin controls to manage team access, data not used for model training (privacy guarantee), unlimited GPT-5 usage, and Codex agent for software development automation. Best for companies and agencies." },
      { q: "Does ChatGPT Business protect my company data?", a: "Yes. ChatGPT Business (all tiers) includes a data privacy guarantee — your conversations are not used to train OpenAI models. This is critical for business confidential work." },
      { q: "What is the Codex agent in ChatGPT Business?", a: "Codex is an AI software development agent that can write, test, and fix code autonomously in the cloud. It's included in ChatGPT Business and is used by engineering teams to automate repetitive development tasks." },
      { q: "Is ChatGPT Business suitable for agencies in Bangladesh?", a: "Yes. ChatGPT Business is widely used by marketing agencies, development agencies, and content studios in Bangladesh for producing client deliverables, automating workflows, and managing team access." },
      { q: "How fast is delivery?", a: "Shared plans: 5–30 minutes. Personal plan: 2–4 hours after payment confirmation." },
    ],
  },

  "chatgpt-pro-bangladesh": {
    displayName: "ChatGPT Pro",
    tagline: "ChatGPT Pro Bangladesh — from ৳4,500/month",
    description: "ChatGPT Pro is the highest tier of ChatGPT — unlimited GPT-5.4 Pro mode, Sora video generation, unlimited deep research, and maximum AI performance. Available as Premium Shared (৳4,500) or Personal (৳29,900). Designed for power users, researchers, and businesses that need the absolute best AI capabilities.",
    accentColor: "#10a37f",
    filterBySlug: true,
    faqs: [
      { q: "What makes ChatGPT Pro different from Plus?", a: "ChatGPT Pro includes unlimited GPT-5.4 Pro mode (the most intelligent version), Sora video generation, unlimited deep research (vs limited in Plus), and extended thinking for complex reasoning. It's built for researchers, authors, and power users." },
      { q: "What is Sora and is it included in ChatGPT Pro?", a: "Sora is OpenAI's AI video generation model. It creates videos from text descriptions. ChatGPT Pro includes Sora video generation — you can describe a scene and Sora generates the video." },
      { q: "Is the ChatGPT Pro Shared plan worth it at ৳4,500?", a: "For heavy users who need unlimited access and Sora video, the Pro Shared plan at ৳4,500 offers exceptional value vs the official $200/month ($29,900 BDT). You get 85% savings." },
      { q: "Who needs ChatGPT Pro?", a: "ChatGPT Pro is ideal for: academic researchers doing deep analysis, authors and screenwriters, data scientists, AI product builders, and businesses that need Sora video generation regularly." },
      { q: "How fast is delivery?", a: "ChatGPT Pro Shared: 2–12 hours. Personal: 2–4 hours. The account requires careful setup." },
    ],
  },

  "chatgpt-go-bangladesh": {
    displayName: "ChatGPT Go",
    tagline: "ChatGPT Go Bangladesh — ৳1,196/month",
    description: "ChatGPT Go is the official $8/month plan from OpenAI — your own personal account with GPT-5 access, image generation, deep research, and agent mode. May show occasional ads. AIPS price: ৳1,196/month. A great middle-ground between Plus Shared and Plus Personal.",
    accentColor: "#10a37f",
    filterBySlug: true,
    faqs: [
      { q: "What is ChatGPT Go?", a: "ChatGPT Go is OpenAI's new $8/month plan — a personal account with GPT-5, image generation, deep research, and agents. It's slightly cheaper than Plus ($20) with similar features, though it may show occasional ads." },
      { q: "Is ChatGPT Go personal or shared?", a: "ChatGPT Go is always a personal account — your own login, full privacy, all features. No sharing with other users." },
      { q: "How does ChatGPT Go compare to ChatGPT Plus?", a: "ChatGPT Go costs less than Plus ($8 vs $20/month). Both include GPT-5 and similar features. The main difference: Go may show ads occasionally. For ad-free experience, choose Plus Personal." },
      { q: "Is ChatGPT Go good value at ৳1,196?", a: "Yes. At ৳1,196/month you get a personal ChatGPT account with GPT-5 — much cheaper than Plus Personal at ৳2,990. If ads don't bother you, Go is excellent value." },
      { q: "How fast is delivery?", a: "ChatGPT Go Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "claude-pro-bangladesh": {
    displayName: "Claude",
    tagline: "Claude Pro Bangladesh — from ৳1,495/month",
    description: "Claude by Anthropic is the AI that rivals and often surpasses ChatGPT for writing, coding, and nuanced analysis. Claude Opus 4.6 leads in creative writing, legal documents, research, and complex reasoning. Available from Premium Shared (৳1,495) to Max 20x (৳29,900). Pay via bKash.",
    accentColor: "#d97706",
    faqs: [
      { q: "Is Claude better than ChatGPT for writing?", a: "Claude (especially Opus) consistently scores higher for nuanced writing, creative content, legal documents, and academic papers. ChatGPT is stronger for coding and tool use. Most professionals use both." },
      { q: "What is Claude Max?", a: "Claude Max is for high-volume professional users. Max 5x gives 5× Claude Pro limits with 1M token context and persistent memory. Max 20x gives 20× limits with the highest Claude Code access. Prices: ৳14,950 (5x) and ৳29,900 (20x)." },
      { q: "What is Claude Code?", a: "Claude Code is an autonomous AI coding agent included in Claude Pro and above. It can write, review, test, and fix entire codebases — not just complete lines. Used by professional software engineers." },
      { q: "What is Claude Team?", a: "Claude Team is a business plan with admin controls, collaboration features, shared projects, and central billing. Claude Team Personal Seat is ৳3,990/month." },
      { q: "How fast is delivery?", a: "Claude Shared plans: 5–30 minutes. Personal plans: 2–4 hours after payment confirmation." },
    ],
  },

  "gemini-advanced-bangladesh": {
    displayName: "Google AI Pro",
    tagline: "Google AI Pro Bangladesh — ৳500/month",
    description: "Google AI Pro (formerly Gemini Advanced) is AIPS's most popular special offer. Get the full Google AI Pro subscription — Gemini 3.1 Pro, Deep Research, AI agents, 2TB Google Drive storage, YouTube Premium, and more — for just ৳500/month. Official price: ৳2,990. Save 83%.",
    accentColor: "#4285f4",
    faqs: [
      { q: "What is Google AI Pro?", a: "Google AI Pro is Google's premium AI subscription. It includes Gemini 3.1 Pro (Google's most intelligent model), Deep Research, AI agents, Workspace AI features, 2TB Google Drive storage, YouTube Premium, and Google One benefits." },
      { q: "Why is AIPS selling Google AI Pro at ৳500?", a: "AI Premium Shop negotiates special volume pricing for Bangladesh customers. The ৳500 price is an AIPS exclusive promotional rate — you cannot get this price directly from Google." },
      { q: "Does Google AI Pro work with my existing Gmail?", a: "Yes. Google AI Pro is activated on YOUR existing Gmail or Google account. All features — Gemini in Gmail, Docs, Drive, and Google Search — work seamlessly with your current account." },
      { q: "Is Google AI Pro better than ChatGPT Plus?", a: "Both are excellent. Google AI Pro includes 2TB storage and YouTube Premium — added value beyond AI. Gemini 3.1 Pro excels at multimodal tasks (combining text, image, code). For most users, Google AI Pro at ৳500 offers outstanding value vs ChatGPT Plus at ৳350+." },
      { q: "How fast is delivery?", a: "Google AI Pro activation is delivered within 5–15 minutes — the fastest delivery of any product in our catalog." },
    ],
  },

  "supergrok-bangladesh": {
    displayName: "SuperGrok",
    tagline: "SuperGrok Bangladesh — from ৳1,495/month",
    description: "SuperGrok by xAI (Elon Musk's AI company) gives you Grok 4.1 — one of the most intelligent AI models available. Real-time access to X (Twitter) data, AI image generation, HD video generation, and 4x AI agents. Available as Lite (৳1,495) or Standard (৳3,990). Personal accounts only.",
    accentColor: "#1a1a2e",
    faqs: [
      { q: "What is SuperGrok?", a: "SuperGrok is the premium tier of Grok by xAI. It gives you access to Grok 4.1 — xAI's most powerful model — plus real-time X (Twitter) data, image/video generation, DeepSearch, and AI agents. Available as Lite ($10/mo) or Standard ($30/mo)." },
      { q: "What makes Grok unique?", a: "Grok has real-time access to X (Twitter) data, which no other AI has. This makes it uniquely valuable for tracking news, trends, market sentiment, and real-time events. It's also uncensored on most topics." },
      { q: "What is the difference between SuperGrok Lite and Standard?", a: "Lite (৳1,495): Grok 4, image/video generation, 2x longer chat context. Standard (৳3,990): Grok 4.1 unlimited, DeepSearch, HD images, 30-second videos, 4x AI agents, real-time X data." },
      { q: "Can SuperGrok generate videos?", a: "Yes. SuperGrok Lite includes AI video generation. SuperGrok Standard includes HD 30-second video generation from text prompts." },
      { q: "How fast is delivery?", a: "SuperGrok Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "perplexity-pro-bangladesh": {
    displayName: "Perplexity Pro",
    tagline: "Perplexity Pro Bangladesh — from ৳350/month",
    description: "Perplexity Pro is the AI research tool that gives you answers with citations — like a search engine powered by GPT-5, Claude, and Gemini. Every answer links to sources. Deep Research mode synthesizes dozens of sources into a comprehensive report. Available from Shared (৳350) to Personal (৳2,990) to Max (৳29,900).",
    accentColor: "#20b2aa",
    faqs: [
      { q: "What is Perplexity Pro?", a: "Perplexity Pro is a premium AI research assistant. It searches the web in real time and gives you sourced, cited answers. Unlike ChatGPT, every response links to the original sources — making it ideal for research, fact-checking, and staying current." },
      { q: "What is Perplexity Deep Research?", a: "Deep Research is Perplexity's most powerful feature. It reads 20–50 web sources and synthesizes them into a detailed research report. Used by students, journalists, consultants, and analysts for comprehensive topic research." },
      { q: "Is Perplexity Pro better than Google for research?", a: "For synthesized answers with citations, yes. Perplexity reads multiple sources and summarizes them — saving hours vs reading individual pages. For discovering new pages, Google is still useful alongside Perplexity." },
      { q: "What is Perplexity Max?", a: "Perplexity Max at ৳29,900/month gives unlimited deep research, access to all frontier AI models, and maximum data handling for enterprise-level research." },
      { q: "How fast is delivery?", a: "Shared plans: 5–15 minutes. Personal plan: 2–4 hours after payment." },
    ],
  },

  "midjourney-bangladesh": {
    displayName: "Midjourney",
    tagline: "Midjourney Bangladesh — from ৳1,199/month",
    description: "Midjourney is the world's most acclaimed AI image generator. Artists, designers, and creators worldwide use it for photorealistic images, concept art, product visuals, and stunning illustrations. Available from Standard Shared (৳1,199) to Mega Personal (৳17,940). Pay via bKash.",
    accentColor: "#6366f1",
    faqs: [
      { q: "What is Midjourney best at?", a: "Midjourney consistently produces the most artistic and photorealistic AI images. It excels at character design, product photography, architectural visualization, concept art, and any visual that needs a professional aesthetic." },
      { q: "What is the difference between Standard and Pro Midjourney?", a: "Standard: 15hr fast GPU/month — enough for most users. Pro: 30hr fast GPU + stealth mode (images private) + HD video generation + 12 concurrent jobs. Mega: 60hr fast GPU for high-volume studios." },
      { q: "Can I use Midjourney images commercially?", a: "Yes. All paid Midjourney plans include commercial use rights. You can use generated images for client projects, products, marketing, and publishing." },
      { q: "Does Midjourney have video generation?", a: "Yes. Midjourney Standard and above include AI video generation. You can animate existing images or generate videos from text prompts." },
      { q: "How fast is delivery?", a: "Shared plans: 5–30 minutes. Personal plans: 2–4 hours after payment confirmation." },
    ],
  },

  "ideogram-bangladesh": {
    displayName: "Ideogram",
    tagline: "Ideogram Bangladesh — from ৳2,990/month",
    description: "Ideogram is the best AI image generator for text rendering. While other tools distort letters, Ideogram accurately generates readable text inside images — making it essential for logos, social media graphics, thumbnails, and branded content. Personal plans from ৳2,990.",
    accentColor: "#6366f1",
    faqs: [
      { q: "Why is Ideogram better for text in images?", a: "Ideogram was specifically trained to render readable text inside AI-generated images. Midjourney and Stable Diffusion often distort text. Ideogram produces clean, accurate typography — essential for logos, thumbnails, and marketing graphics." },
      { q: "What is Ideogram Plus vs Pro?", a: "Plus (৳2,990): 1000 priority credits/month + unlimited slow generation. For regular use. Pro (৳8,970): 3500 priority credits/month + batch generation — for high-volume designers and agencies." },
      { q: "Can I use Ideogram for YouTube thumbnails?", a: "Yes. Ideogram is popular for YouTube thumbnails because it can accurately add text overlays to striking AI-generated backgrounds. This saves significant time vs manual Photoshop work." },
      { q: "Does Ideogram support Bangla text in images?", a: "Ideogram works best with English text, but can handle some Bangla characters. For Bangla text rendering, results may vary — test with a few prompts before committing to heavy use." },
      { q: "How fast is delivery?", a: "Ideogram Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "runway-bangladesh": {
    displayName: "Runway",
    tagline: "Runway Bangladesh — from ৳1,794/month",
    description: "Runway is the leading professional AI video generator. Used by filmmakers, YouTubers, and marketing teams worldwide. Generate videos from text, animate images with Gen-4, and produce 4K output. Available from Standard (৳1,794) to Unlimited (৳11,362). Pay via bKash.",
    accentColor: "#111827",
    faqs: [
      { q: "What is Runway Gen-4?", a: "Gen-4 is Runway's latest AI video model — it produces cinematic quality videos with consistent characters, realistic motion, and stunning visual quality. Used by professional filmmakers and agencies for commercial production." },
      { q: "What can I create with Runway?", a: "Product videos, social media content, explainer animations, music videos, short films, concept visualization, architectural flythroughs, and any video that would normally require a production crew." },
      { q: "What is the difference between Standard, Pro, and Unlimited?", a: "Standard (৳1,794): 625 credits/month — for moderate use. Pro (৳4,186): 2250 credits/month + 4K export + watermark-free. Unlimited (৳11,362): unlimited Gen-4 generations — for agencies and studios." },
      { q: "Do I need video editing experience to use Runway?", a: "No. Runway is designed for creators without traditional video editing skills. You describe what you want in text and Runway generates the video. However, it can also be used professionally by experienced filmmakers." },
      { q: "How fast is delivery?", a: "Runway Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "elevenlabs-bangladesh": {
    displayName: "ElevenLabs",
    tagline: "ElevenLabs Bangladesh — from ৳748/month",
    description: "ElevenLabs produces the most human-like AI voice synthesis available. Clone your own voice or use 3,000+ AI voices for narration, audiobooks, YouTube videos, explainers, and dubbing. Available from Starter (৳748) to Pro (৳14,802). Pay via bKash.",
    accentColor: "#111827",
    faqs: [
      { q: "What is ElevenLabs best for?", a: "ElevenLabs produces the most realistic AI voices for: YouTube narration, podcast intros, audiobooks, corporate training videos, app voiceovers, explainer videos, and multilingual dubbing. The voices are virtually indistinguishable from human speakers." },
      { q: "Can ElevenLabs clone my voice?", a: "Yes. ElevenLabs Instant Voice Cloning lets you clone your voice from a 1-minute audio sample. Professional Voice Cloning (available in Creator and Pro) produces even higher accuracy using longer recordings." },
      { q: "What is the difference between Starter, Creator, and Pro?", a: "Starter (৳748): 30K characters/month + commercial license — for regular use. Creator (৳3,289): 100K characters/month + professional cloning + 192kbps audio. Pro (৳14,802): 500K characters + highest audio quality." },
      { q: "Can ElevenLabs speak Bangla?", a: "Yes. ElevenLabs supports Bangla and 50+ other languages with high-quality text-to-speech. The Multilingual v2 model handles Bangla naturally." },
      { q: "How fast is delivery?", a: "ElevenLabs Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "suno-ai-bangladesh": {
    displayName: "Suno AI",
    tagline: "Suno AI Bangladesh — from ৳1,495/month",
    description: "Suno AI creates complete original songs from a text prompt — vocals, instruments, and lyrics included. Generate pop, hip-hop, folk, Bangla fusion, electronic, or any genre in seconds. Pro plan: 2,500 credits (~500 songs) for ৳1,495. Premier: 10,000 credits (~2,000 songs) for ৳3,990.",
    accentColor: "#7c3aed",
    faqs: [
      { q: "What is Suno AI?", a: "Suno AI is an AI music generator that creates complete original songs from text prompts. You describe the mood, genre, topic, and style — Suno writes the lyrics, composes the melody, and generates a full song with vocals and instruments in seconds." },
      { q: "Can Suno AI make Bangla songs?", a: "Yes. Suno AI supports Bangla lyrics and music generation. You can request Bangla folk (baul), modern Bangla pop, or Bangla hip-hop. Quality is improving with each model version." },
      { q: "How many songs can I make per month?", a: "Suno Pro (৳1,495): ~500 songs/month (2,500 credits, ~5 per song). Premier (৳3,990): ~2,000 songs/month (10,000 credits). More than enough for professional content creators." },
      { q: "Can I use Suno AI music in YouTube videos?", a: "Yes. Suno Pro and Premier plans include commercial use rights. You can use generated music in YouTube videos, social media, client work, and products." },
      { q: "How fast is delivery?", a: "Suno AI Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "github-copilot-bangladesh": {
    displayName: "GitHub Copilot",
    tagline: "GitHub Copilot Bangladesh — from ৳1,495/month",
    description: "GitHub Copilot Pro is the most widely used AI coding assistant. It integrates directly into VS Code, JetBrains, Neovim, and other IDEs — providing real-time code completions, inline chat, and automated PR reviews. Available as Pro (৳1,495) or Pro+ (৳5,831) with 5x usage.",
    accentColor: "#6e40c9",
    faqs: [
      { q: "What IDEs does GitHub Copilot work with?", a: "GitHub Copilot works with VS Code, IntelliJ IDEA, PyCharm, WebStorm, Neovim, Vim, and Azure Data Studio. It integrates seamlessly — once installed, completions appear as you type." },
      { q: "What is the difference between Copilot Pro and Pro+?", a: "Pro (৳1,495): unlimited completions + 300 premium requests/month using Claude and GPT-5 models. Pro+ (৳5,831): 1,500 premium requests/month (5× more) + highest model access. For heavy AI-assisted coding, choose Pro+." },
      { q: "Does GitHub Copilot write entire files or just lines?", a: "Both. Copilot can complete single lines, suggest entire functions, generate classes, write tests, and with Copilot Workspace, can plan and implement multi-file changes across a repository." },
      { q: "How does GitHub Copilot compare to Cursor?", a: "Copilot installs as a plugin in your existing IDE — minimal disruption to your workflow. Cursor is a standalone IDE with deeper AI integration and codebase-level awareness. Many developers use both." },
      { q: "How fast is delivery?", a: "GitHub Copilot Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "cursor-bangladesh": {
    displayName: "Cursor",
    tagline: "Cursor Pro Bangladesh — from ৳2,990/month",
    description: "Cursor is the AI-native code editor trusted by engineering teams at OpenAI, Stripe, Figma, and thousands of startups. Built on VS Code — all your extensions work. Cursor understands your entire codebase and can make multi-file edits, explain complex code, and build features end-to-end. From ৳2,990/month.",
    accentColor: "#111827",
    faqs: [
      { q: "What makes Cursor different from GitHub Copilot?", a: "Cursor is a complete IDE (built on VS Code) with deeper AI integration. It indexes your entire codebase for context-aware completions and can make changes across multiple files at once. Copilot works as a plugin in your existing editor. Cursor is more powerful; Copilot is more convenient." },
      { q: "Can I use Cursor with my existing VS Code setup?", a: "Yes. Cursor is built on VS Code — all your extensions, themes, and keybindings work. Most developers switch in under 5 minutes." },
      { q: "What is Cursor Pro vs Pro+?", a: "Pro (৳2,990): unlimited completions + 500 premium requests/month using Claude, GPT-5, Gemini. Pro+ (৳8,970): 3× usage credits + all frontier models — for developers building complex AI-native products." },
      { q: "What programming languages does Cursor support?", a: "All major languages: Python, JavaScript, TypeScript, Go, Rust, Java, C++, Swift, Kotlin, PHP, Ruby, and more. Cursor understands the full context of your project regardless of language." },
      { q: "How fast is delivery?", a: "Cursor Pro Personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "notion-business-bangladesh": {
    displayName: "Notion Business",
    tagline: "Notion Business Bangladesh — from ৳800/month",
    description: "Notion Business is the all-in-one workspace for teams — notes, docs, databases, project management, and Notion AI included. Notion AI writes, summarizes, and answers questions about your workspace content. Available as Monthly (৳800) or 6-Month plan (৳4,800 one-time). 73% off the official price.",
    accentColor: "#111827",
    faqs: [
      { q: "What is included in Notion Business?", a: "Notion Business includes unlimited blocks, unlimited team members, Notion AI (writing assistant + Q&A + summaries), teamspaces, SSO (single sign-on), 90-day page history, advanced permissions, and priority support." },
      { q: "What does Notion AI do?", a: "Notion AI can write new content, summarize long documents, translate text, answer questions about your workspace, fix grammar, generate action items from meeting notes, and fill database properties automatically." },
      { q: "How does Notion Business compare to regular Notion?", a: "Notion Business adds Notion AI, teamspaces for organizational structure, SSO, extended page history (90 days), and advanced admin controls. If you're using Notion for a team or business, Business is essential." },
      { q: "Why is the AIPS price lower than official?", a: "AIPS negotiates volume pricing for Bangladesh customers. The ৳800/month price is 73% off the official ৳2,990/month price." },
      { q: "How fast is delivery?", a: "Notion Business accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },

  "manus-ai-bangladesh": {
    displayName: "Manus AI",
    tagline: "Manus AI Bangladesh — ৳2,500/month",
    description: "Manus AI is a fully autonomous AI agent — it browses the web, writes code, analyzes data, generates reports, and completes complex multi-step tasks without human intervention. Think of it as an AI employee that handles research, analysis, and automation entirely on its own.",
    accentColor: "#111827",
    faqs: [
      { q: "What is Manus AI?", a: "Manus AI is an autonomous AI agent that can independently browse the web, write and execute code, analyze files and data, generate comprehensive reports, and automate complex workflows. Unlike ChatGPT (conversational), Manus works autonomously on long tasks." },
      { q: "What tasks can Manus AI automate?", a: "Market research reports, data analysis and visualization, web scraping, competitive analysis, content research, document summarization, coding projects, and any multi-step task that would take a human hours to complete." },
      { q: "How is Manus AI different from ChatGPT agents?", a: "Manus AI runs longer, more complex autonomous tasks — it can browse hundreds of pages, write and execute code, handle files, and produce full reports without needing constant input. ChatGPT agent mode is more limited in scope and duration." },
      { q: "Is Manus AI good for business research?", a: "Yes. Manus AI is excellent for competitive research, market analysis, investor reports, and business intelligence. It autonomously gathers data from multiple sources and produces professional-quality reports." },
      { q: "How fast is delivery?", a: "Manus AI Personal accounts are delivered within 2–12 hours after payment confirmation due to the additional setup required." },
    ],
  },

  "leonardo-ai-bangladesh": {
    displayName: "Leonardo AI",
    tagline: "Leonardo AI Bangladesh — from ৳599/month",
    description: "Leonardo AI is a powerful AI image generator built for creative professionals. Generate stunning visuals, 3D textures, concept art, and photorealistic images. Shared Apprentice plan available from ৳599/month — includes 8,500 tokens and full commercial rights.",
    accentColor: "#7c3aed",
    faqs: [
      { q: "What is Leonardo AI best for?", a: "Leonardo AI excels at game assets, concept art, character design, product photography, and stylized illustrations. Its fine-tuning capabilities let you train on your own style." },
      { q: "How many images can I generate with 8,500 tokens?", a: "On the Apprentice plan with 8,500 tokens, you can generate approximately 850–2,000 images per month depending on resolution and generation speed." },
      { q: "Is Leonardo AI good for commercial use?", a: "Yes. All paid Leonardo AI plans include full commercial use rights. You can use generated images for client projects, products, and publishing." },
      { q: "How does it compare to Midjourney?", a: "Midjourney generally produces more artistic and photorealistic results. Leonardo AI offers more fine-tuning options, faster generation, and a more user-friendly interface for high-volume generation." },
      { q: "How fast is delivery?", a: "Shared Leonardo AI accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },

  "udio-bangladesh": {
    displayName: "Udio",
    tagline: "Udio Bangladesh — from ৳499/month",
    description: "Udio is an advanced AI music generation platform that creates full songs from text prompts. Generate royalty-free music in any genre — pop, hip-hop, classical, electronic, Bangla folk, and more. Shared Pro plan with 1,200 credits/month from ৳499.",
    accentColor: "#ec4899",
    faqs: [
      { q: "What genres can Udio create?", a: "Udio can generate music in virtually any genre: pop, hip-hop, rock, classical, jazz, electronic, lo-fi, Bangla folk, Bollywood style, and more. You can specify tempo, mood, instruments, and vocals in your prompt." },
      { q: "Can I use Udio music commercially?", a: "Yes. Udio Pro plan includes commercial use rights. Generated music can be used for YouTube videos, social media, products, and client work." },
      { q: "How many songs can I create with 1,200 credits?", a: "Each generation uses approximately 5-10 credits. With 1,200 credits, you can generate approximately 120-240 songs per month on the shared plan." },
      { q: "How is Udio different from Suno AI?", a: "Both are excellent AI music generators. Udio generally has better lyrical coherence and more realistic instrument simulation. Suno is faster and has more credits at similar price points. Many creators use both." },
      { q: "How fast is delivery?", a: "Shared Udio Pro accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },

  "heygen-bangladesh": {
    displayName: "HeyGen",
    tagline: "HeyGen Bangladesh — from ৳1,499/month",
    description: "HeyGen is the leading AI avatar video platform. Create professional videos with 700+ AI avatars in 175+ languages — no camera or editing experience required. Clone your own avatar for authentic AI-generated presentations, training videos, and marketing content.",
    accentColor: "#6366f1",
    faqs: [
      { q: "What can I create with HeyGen?", a: "HeyGen is used for explainer videos, product demos, training content, social media videos, news reports, and marketing campaigns. The AI avatars speak naturally in 175+ languages with lip-sync accuracy." },
      { q: "Can HeyGen speak Bangla?", a: "Yes. HeyGen supports Bangla among its 175+ languages. You can create AI avatar videos in Bangla for local audiences." },
      { q: "Does the shared plan allow unlimited video creation?", a: "Yes. The Creator plan includes unlimited video generation. You can create as many videos as you need within your monthly plan." },
      { q: "Can I create a custom avatar of myself?", a: "The Creator plan shared through AIPS uses HeyGen's stock avatars. Contact us on WhatsApp if you need a personal account with custom avatar training." },
      { q: "How fast is delivery?", a: "Shared HeyGen Creator accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },

  "otter-ai-bangladesh": {
    displayName: "Otter.ai",
    tagline: "Otter.ai Bangladesh — from ৳799/month",
    description: "Otter.ai is the AI meeting assistant that automatically transcribes, summarizes, and captures action items from your meetings. Works with Zoom, Google Meet, and Teams. Stop taking notes — let Otter handle everything so you can focus on the conversation.",
    accentColor: "#3b82f6",
    faqs: [
      { q: "What platforms does Otter.ai work with?", a: "Otter.ai integrates with Zoom, Google Meet, Microsoft Teams, and Webex. It joins as a bot, transcribes in real time, and sends summaries automatically after meetings end." },
      { q: "Does Otter.ai work for Bangla meetings?", a: "Otter.ai is currently optimized for English meetings. For bilingual teams where English is used professionally, it works well and significantly reduces follow-up time." },
      { q: "What are action items and how does Otter extract them?", a: "Otter AI automatically identifies tasks, decisions, and follow-ups from meeting transcriptions. It labels them as action items and can send them to participants by email." },
      { q: "How many minutes of transcription do I get?", a: "The Pro shared plan includes 6,000 minutes of transcription per month — enough for roughly 100 one-hour meetings." },
      { q: "How fast is delivery?", a: "Shared Otter.ai Pro accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },

  "writesonic-bangladesh": {
    displayName: "Writesonic",
    tagline: "Writesonic Bangladesh — from ৳799/month",
    description: "Writesonic is an AI content writing platform built for marketers, bloggers, and agencies. Generate SEO-optimized blog posts, product descriptions, ad copy, and social media content with GPT-4o. Integrates with SurferSEO for keyword-optimized content that ranks.",
    accentColor: "#6366f1",
    faqs: [
      { q: "What types of content can Writesonic create?", a: "Writesonic creates SEO blog posts, product descriptions, Google and Facebook ad copy, email campaigns, landing page copy, social media captions, and press releases. The Article Writer produces complete 1,500-3,000 word posts from a headline." },
      { q: "Does Writesonic help with SEO?", a: "Yes. Writesonic integrates with SurferSEO to analyze keyword density, NLP terms, and competitor content. The AI Article Writer produces content designed to rank in search engines." },
      { q: "Can Writesonic write in Bangla?", a: "Writesonic supports 25+ languages including Bangla. You can generate content in Bangla for local audiences or start in English and translate." },
      { q: "How many credits do I get per month?", a: "The Individual plan includes 100 credits per month on the shared plan. One long-form blog post typically uses 3-5 credits. Contact us on WhatsApp if you need higher volume." },
      { q: "How fast is delivery?", a: "Shared Writesonic accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },

  "gamma-bangladesh": {
    displayName: "Gamma",
    tagline: "Gamma Bangladesh — from ৳399/month",
    description: "Gamma creates beautiful presentations, documents, and websites from a single text prompt. Replace boring PowerPoint slides with AI-designed decks that look professionally made. Used by teams at Google, Shopify, and thousands of startups. Shared Plus plan from ৳399.",
    accentColor: "#8b5cf6",
    faqs: [
      { q: "What is Gamma used for?", a: "Gamma is used for pitch decks, investor presentations, product demos, training materials, reports, and personal portfolios. It generates beautiful, shareable presentations from a brief description in under 2 minutes." },
      { q: "Is Gamma better than PowerPoint?", a: "For speed and design quality, yes. Gamma generates polished presentations without manual formatting. For complex custom designs or presentations that need pixel-perfect control, PowerPoint may be preferable. Most users find Gamma handles 90% of their presentation needs faster." },
      { q: "Can Gamma create websites?", a: "Yes. Gamma can generate shareable microsite-style websites from prompts. These are great for landing pages, link-in-bio pages, event pages, and portfolios." },
      { q: "Does the Plus plan remove Gamma branding?", a: "Yes. Gamma Plus removes the Gamma watermark from your presentations, making them fully white-labeled." },
      { q: "How fast is delivery?", a: "Shared Gamma Plus accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },

  "v0-dev-bangladesh": {
    displayName: "v0.dev",
    tagline: "v0.dev Bangladesh — from ৳999/month",
    description: "v0.dev by Vercel is the leading AI web application builder. Describe what you want to build and v0 generates production-ready React code with Tailwind CSS. Deploy instantly to Vercel. Used by professional developers and non-technical founders to ship products 10x faster.",
    accentColor: "#111827",
    faqs: [
      { q: "What can I build with v0.dev?", a: "v0.dev can build UI components, full web app pages, dashboards, forms, landing pages, and complete web applications. It generates production-ready React + Tailwind code that you can deploy directly." },
      { q: "Do I need to know how to code to use v0?", a: "No. v0.dev is designed for both technical and non-technical users. You describe what you want in plain English and v0 generates the code. You can then iterate through conversation." },
      { q: "Is the shared plan suitable for building real projects?", a: "Yes. The shared Pro plan gives you v0.dev Pro capabilities for building and iterating on projects. For team use with multiple projects, contact us about a personal plan." },
      { q: "Can I use v0.dev with my own domain?", a: "v0.dev generates code that you own. You can deploy to Vercel, Netlify, or any hosting provider, using your own custom domain." },
      { q: "How fast is delivery?", a: "Shared v0.dev Pro accounts are delivered within 5–30 minutes after payment confirmation." },
    ],
  },

  "replit-bangladesh": {
    displayName: "Replit",
    tagline: "Replit Bangladesh — ৳500/month",
    description: "Replit Core is a cloud-based AI development environment. Build, host, and deploy apps with an AI agent that writes code, fixes bugs, and deploys for you — all from your browser. AIPS special pricing: ৳500/month (official price ৳2,990/month). Save 83%.",
    accentColor: "#f26207",
    faqs: [
      { q: "What is Replit Core?", a: "Replit Core is a full cloud IDE with an AI agent that writes and deploys code. You describe what you want to build, the AI writes the code, and Replit hosts and deploys it automatically." },
      { q: "Do I need programming experience to use Replit?", a: "Replit is used by experienced developers and complete beginners. The AI agent can handle coding entirely — you describe what you want and it builds it. Many Replit users have no prior coding experience." },
      { q: "What can I build with Replit?", a: "Web apps, APIs, bots, scripts, data analysis tools, games, and more. Replit handles hosting and deployment automatically — your project gets its own URL without any server configuration." },
      { q: "Why is the AIPS price so low?", a: "AI Premium Shop is authorized to offer Replit Core at a special promotional rate for Bangladesh. This ৳500 price is exclusive to AIPS customers — you cannot get this price directly from Replit." },
      { q: "How fast is delivery?", a: "Replit Core personal accounts are delivered within 2–4 hours after payment confirmation." },
    ],
  },
};

interface BrandPageProps {
  brandSlug: string;
}

export default function BrandPage({ brandSlug }: BrandPageProps) {
  const [, navigate] = useLocation();
  const meta = BRAND_META[brandSlug];

  const products = useMemo(() => {
    const all = productsData.products as Product[];
    const filtered = meta?.filterBySlug
      ? all.filter((p) => p.slug === brandSlug)
      : all.filter((p) => p.brandSlug === brandSlug);
    return filtered.sort((a, b) => a.price - b.price);
  }, [brandSlug, meta?.filterBySlug]);

  if (!meta) {
    return (
      <PageLayout>
        <div className="text-center py-40 text-white">Brand page not found.</div>
      </PageLayout>
    );
  }

  const cheapest = products[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": meta.displayName,
    "description": meta.description,
    "brand": { "@type": "Brand", "name": meta.displayName },
    "offers": products.map((p) => ({
      "@type": "Offer",
      "name": p.name,
      "price": p.price,
      "priceCurrency": "BDT",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "AI Premium Shop" },
    })),
  };

  return (
    <PageLayout>
      <SEOHead
        title={`${meta.displayName} in Bangladesh — ${meta.tagline} | AI Premium Shop`}
        description={meta.description.slice(0, 160)}
        canonical={`https://aipremiumshop.com/${brandSlug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "#c9ceda" }}>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-white transition-colors">All Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: meta.accentColor }}>{meta.displayName}</span>
        </nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ backgroundColor: meta.accentColor + "20", color: meta.accentColor }}>
            Bangladesh Pricing
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {meta.displayName} Bangladesh
          </h1>
          <p className="text-xl font-semibold mb-4" style={{ color: meta.accentColor }}>
            {meta.tagline}
          </p>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#c9ceda" }}>
            {meta.description}
          </p>
        </motion.div>

        {/* 1A: What ChatGPT Can Do */}
        {brandSlug === "chatgpt-plans-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-2">What ChatGPT Can Do For You</h2>
            <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>The world's most capable AI — writing, coding, research, images, and autonomous agents.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Write",
                  desc: "Essays, proposals, emails, ads — professional quality in minutes",
                  icon: (
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                      <rect x="4" y="6" width="18" height="3" rx="1.5" fill="white" />
                      <rect x="4" y="12" width="24" height="3" rx="1.5" fill="white" />
                      <rect x="4" y="18" width="20" height="3" rx="1.5" fill="white" />
                      <rect x="4" y="24" width="14" height="3" rx="1.5" fill="white" />
                      <path d="M26 5 L29 8 L20 17 L17 17 L17 14 Z" fill="#10a37f" />
                    </svg>
                  ),
                },
                {
                  label: "Code",
                  desc: "Debug, build features, write tests — 55% faster (GitHub Research)",
                  icon: (
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                      <rect x="2" y="4" width="28" height="24" rx="3" stroke="white" strokeWidth="2" />
                      <rect x="4" y="6" width="28" height="2" rx="1" fill="#10a37f" />
                      <path d="M10 14 L6 18 L10 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 14 L26 18 L22 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18 13 L14 23" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  label: "Research",
                  desc: "Deep research with sources, data analysis, market insights",
                  icon: (
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                      <circle cx="14" cy="14" r="9" stroke="white" strokeWidth="2" />
                      <path d="M21 21 L28 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M10 14 H18" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
                      <path d="M14 10 V18" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  label: "Create",
                  desc: "Generate images with DALL-E, design assets, presentations",
                  icon: (
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                      <rect x="4" y="6" width="24" height="20" rx="2" stroke="white" strokeWidth="2" />
                      <circle cx="11" cy="13" r="3" fill="#10a37f" />
                      <path d="M4 22 L12 16 L18 20 L22 15 L28 22 Z" fill="white" fillOpacity="0.4" />
                    </svg>
                  ),
                },
                {
                  label: "Automate",
                  desc: "AI Agents do tasks for you — research, email, reports",
                  icon: (
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                      <rect x="10" y="2" width="12" height="8" rx="2" fill="white" />
                      <circle cx="16" cy="6" r="2" fill="#10a37f" />
                      <rect x="8" y="10" width="16" height="14" rx="3" fill="white" />
                      <rect x="11" y="14" width="4" height="3" rx="1" fill="#10a37f" />
                      <rect x="17" y="14" width="4" height="3" rx="1" fill="#10a37f" />
                      <path d="M6 14 H8 M24 14 H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 20 H8 M24 20 H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <rect x="12" y="24" width="4" height="4" rx="1" fill="white" />
                      <rect x="16" y="24" width="4" height="4" rx="1" fill="white" />
                    </svg>
                  ),
                },
                {
                  label: "Learn",
                  desc: "Learn any subject, any language, 24/7 personal tutor",
                  icon: (
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                      <path d="M16 4 C22 4 28 9 28 16 C28 23 22 28 16 28 C10 28 4 23 4 16 C4 9 10 4 16 4 Z" stroke="white" strokeWidth="2" />
                      <path d="M13 12 C13 10 15 9 16 9 C18 9 20 10.5 20 13 C20 15 18 16 16 17 L16 19" stroke="#10a37f" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="16" cy="22" r="1.5" fill="white" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 border transition-all duration-200"
                  style={{
                    backgroundColor: "#0e1535",
                    borderTop: "3px solid #10a37f",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px #10a37f30";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div className="mb-3">{item.icon}</div>
                  <div className="font-bold text-white text-sm mb-1">{item.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 1B: Who Uses ChatGPT */}
        {brandSlug === "chatgpt-plans-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-2">Which ChatGPT Plan Fits Your Life?</h2>
            <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>Real use cases for real people in Bangladesh.</p>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2" style={{ scrollbarWidth: "none" }}>
              {[
                {
                  emoji: "🎓",
                  title: "Students",
                  accent: "#3b82f6",
                  iconBg: "bg-blue-500/10",
                  borderClass: "border-blue-500",
                  pain: "Assignment deadline, English weak, research paper",
                  solution: "ChatGPT Plus ৳350/mo → A+ grades, research done in 30 min",
                  outcome: "CGPA 2.8 → 3.5+ possible",
                  cta: "Order ৳350/mo",
                  msg: "Hi, I want ChatGPT Plus Starter Shared (৳350/mo) for studies",
                  svgBg: "#0b1a3a",
                  svg: <StudentStorySVG />,
                },
                {
                  emoji: "💻",
                  title: "Freelancers",
                  accent: "#10a37f",
                  iconBg: "bg-emerald-500/10",
                  borderClass: "border-emerald-500",
                  pain: "Can't write proposals, delivery slow, clients leaving",
                  solution: "ChatGPT Plus ৳350–950/mo → Proposals in 2 min, delivery 50% faster",
                  outcome: "Freelancers with AI earn 44% more — Upwork 2025",
                  cta: "Order ৳950/mo",
                  msg: "Hi, I want ChatGPT Plus Premium Shared (৳950/mo) for freelancing",
                  svgBg: "#021a0e",
                  svg: <FreelancerStorySVG />,
                },
                {
                  emoji: "💼",
                  title: "Business Owners",
                  accent: "#f59e0b",
                  iconBg: "bg-amber-500/10",
                  borderClass: "border-amber-500",
                  pain: "Marketing expensive, support staff needed, content slow",
                  solution: "ChatGPT Business ৳699/mo → 1 person does 10 people's work",
                  outcome: "Save ৳15,000–50,000/mo in staff costs",
                  cta: "Order ৳699/mo",
                  msg: "Hi, I want ChatGPT Business Starter Shared (৳699/mo)",
                  svgBg: "#160801",
                  svg: <BusinessStorySVG />,
                },
                {
                  emoji: "🔍",
                  title: "Job Seekers",
                  accent: "#a855f7",
                  iconBg: "bg-indigo-500/10",
                  borderClass: "border-indigo-500",
                  pain: "CV rejected, interview nervous, no skill roadmap",
                  solution: "ChatGPT Plus ৳350/mo → Professional CV in 5 min, mock interview",
                  outcome: "Get hired 2–3 months faster. Starting salary 10–20% higher.",
                  cta: "Order ৳350/mo",
                  msg: "Hi, I want ChatGPT Plus Starter Shared (৳350/mo) for job search",
                  svgBg: "#120530",
                  svg: <JobSeekerStorySVG />,
                },
                {
                  emoji: "🖥️",
                  title: "Developers",
                  accent: "#06b6d4",
                  iconBg: "bg-purple-500/10",
                  borderClass: "border-purple-500",
                  pain: "Debugging for hours, client deadlines slipping",
                  solution: "ChatGPT Pro ৳4,500/mo → Unlimited GPT-5 Pro mode, Sora video, agents",
                  outcome: "Code 55% faster. Bug fix in seconds, not hours.",
                  cta: "Order ৳4,500/mo",
                  msg: "Hi, I want ChatGPT Pro Premium Shared (৳4,500/mo)",
                  svgBg: "#030e1a",
                  svg: <DeveloperStorySVG />,
                },
              ].map((seg) => {
                const waLink = `${WHATSAPP}?text=${encodeURIComponent(seg.msg)}`;
                return (
                  <div
                    key={seg.title}
                    className="flex-shrink-0 rounded-xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{ width: 200, backgroundColor: "#0e1535", borderColor: "rgba(255,255,255,0.1)", borderLeftWidth: 4, borderLeftColor: seg.accent }}
                  >
                    <div className="flex items-center justify-center py-3" style={{ backgroundColor: seg.svgBg }}>
                      {seg.svg}
                    </div>
                    <div className="p-4">
                      <div className={`w-10 h-10 rounded-lg ${seg.iconBg} flex items-center justify-center mb-2`}>
                        <span className="text-xl">{seg.emoji}</span>
                      </div>
                      <div className="font-bold text-white text-sm mb-2">{seg.title}</div>
                      <div className="text-xs mb-2 leading-relaxed" style={{ color: "#ef4444" }}>
                        <span className="font-semibold">Pain:</span> {seg.pain}
                      </div>
                      <div className="text-xs mb-2 leading-relaxed" style={{ color: "#9ca3af" }}>
                        <span className="font-semibold text-white">Fix:</span> {seg.solution}
                      </div>
                      <div className="text-xs mb-3 leading-relaxed font-semibold" style={{ color: seg.accent }}>
                        ✓ {seg.outcome}
                      </div>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-xs font-semibold py-2 px-3 rounded-lg transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#10a37f", color: "#fff" }}
                      >
                        {seg.cta}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Products */}
        {products.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-white">Available Plans</h2>
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: meta.accentColor + "20", color: meta.accentColor }}>
                {products.length} {products.length === 1 ? "plan" : "plans"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p, i) => {
                const waLink = `${WHATSAPP}?text=${encodeURIComponent(p.whatsappMsg ?? `Hi, I want to order ${p.name} (BDT ${p.price})`)}`;
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    whileHover={{ y: -3, boxShadow: `0 8px 32px ${meta.accentColor}30`, scale: 1.02 }}
                    className="relative rounded-2xl border border-white/10 border-l-4 flex flex-col overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    style={{ backgroundColor: "#151b3d", borderLeftColor: p.brandColor || meta.accentColor }}
                  >
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <BrandIcon brand={p.brand || meta.displayName} color={p.brandColor || meta.accentColor} size={32} />
                          <div>
                            <div className="font-bold text-white text-sm leading-tight">{p.name}</div>
                            <div className="text-xs mt-0.5" style={{ color: meta.accentColor }}>{p.tier}</div>
                          </div>
                        </div>
                        {p.badge && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "#f4b94222", color: "#f4b942" }}>
                            {p.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs leading-relaxed flex-1" style={{ color: "#c9ceda" }}>{p.description}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full border"
                          style={p.accessType === "shared"
                            ? { color: "#c9ceda", borderColor: "rgba(255,255,255,0.2)" }
                            : { color: "#f4b942", borderColor: "rgba(244,185,66,0.3)" }
                          }>
                          {p.accessType === "shared" ? "Shared" : p.accessType === "bundle" ? "Bundle" : "Personal"}
                        </span>
                        <span className="text-xs" style={{ color: "#c9ceda" }}>⚡ {p.deliverySLA}</span>
                        <span className="text-xs" style={{ color: "#c9ceda" }}>🛡 30-day warranty</span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div>
                          <div className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT {p.price.toLocaleString()}</div>
                          {p.officialUSD != null && (
                            <div className="text-xs" style={{ color: "#c9ceda" }}>${p.officialUSD}/mo official</div>
                          )}
                        </div>
                        <a href={waLink} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                          style={{ backgroundColor: "#25d366", color: "#fff" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#22c55e"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#25d366"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Order
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 1C: FOMO Section */}
        {brandSlug === "chatgpt-plans-bangladesh" && (
          <div className="mb-14">
            <div className="mb-6 rounded-2xl overflow-hidden">
              <FOMOSplitSVG />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">The Cost of NOT Using AI in 2026</h2>
            <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>Every month without AI, you're falling behind.</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-500/5 border-l-4 border-red-500 rounded-lg p-6">
                <div className="text-red-400 font-bold text-lg mb-4">❌ Without AI</div>
                <ul className="space-y-3 text-sm" style={{ color: "#c9ceda" }}>
                  <li><span className="font-semibold text-white">Students:</span> Assignment takes 3 days. CGPA stuck at 2.8. English writing weak.</li>
                  <li><span className="font-semibold text-white">Freelancers:</span> 10 proposals → 1 reply. Delivery takes 3–5 days. Earning $200–500/mo.</li>
                  <li><span className="font-semibold text-white">Business:</span> Hiring 3 staff for content + support + marketing = ৳45,000+/mo cost.</li>
                  <li><span className="font-semibold text-white">Job Seekers:</span> Generic CV. 50 applications → 2 calls. 6+ months to get hired.</li>
                </ul>
              </div>
              <div className="bg-emerald-500/5 border-l-4 border-emerald-500 rounded-lg p-6">
                <div className="text-emerald-400 font-bold text-lg mb-4">✅ With ChatGPT (৳350/mo)</div>
                <ul className="space-y-3 text-sm" style={{ color: "#c9ceda" }}>
                  <li><span className="font-semibold text-white">Students:</span> Assignment in 2 hours. CGPA 3.5+. Professional English writing.</li>
                  <li><span className="font-semibold text-white">Freelancers:</span> 10 proposals → 3–4 replies. Delivery 1–2 days. Earning $500–1,500+/mo.</li>
                  <li><span className="font-semibold text-white">Business:</span> ChatGPT Business ৳699 = 1 person doing 10 people's work.</li>
                  <li><span className="font-semibold text-white">Job Seekers:</span> ATS-optimized CV. 20 apps → 5–8 calls. Hired in 1–3 months.</li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl p-5 border text-center" style={{ backgroundColor: "#10a37f12", borderColor: "#10a37f35" }}>
              <p className="text-sm font-semibold mb-4 text-white">Start for just <span style={{ color: "#f4b942" }}>৳350/mo</span> — the price of 2 cups of tea.</p>
              <a
                href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I want to order ChatGPT Plus Starter Shared (৳350/mo)")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#25d366", color: "#fff" }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M5.418 21.917l.97-3.533A9.91 9.91 0 012 12.01C2 6.477 6.477 2 12.01 2 14.673 2 17.17 3.029 19.065 4.93a9.944 9.944 0 012.926 7.08c-.003 5.533-4.48 10.008-10.01 10.008a10.04 10.04 0 01-4.791-1.217l-3.772.016z" fillRule="evenodd" clipRule="evenodd" opacity=".3"/></svg>
                Order on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* 1D: Agentic AI Highlight */}
        {brandSlug === "chatgpt-plans-bangladesh" && (
          <div className="mb-14 rounded-2xl border overflow-hidden bg-purple-500/5 border-purple-500/20" style={{ backgroundColor: undefined }}>
            <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <h3 className="text-xl font-bold text-white mb-1">🤖 ChatGPT Pro = Your Own AI Employee</h3>
              <p className="text-sm" style={{ color: "#c9ceda" }}>This is not a chatbot. This is an AI employee that works 24/7.</p>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <AgenticRobotSVG />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-4" style={{ color: "#c9ceda" }}>
                    ChatGPT Pro (৳4,500/mo shared, ৳29,900 personal) includes:
                  </p>
                  <ul className="space-y-2 text-sm mb-5" style={{ color: "#c9ceda" }}>
                    {[
                      "Unlimited GPT-5 Pro mode (smartest AI available)",
                      "Sora video generation",
                      "Codex agent (writes code autonomously)",
                      "Deep research agent (researches for hours, delivers report)",
                      "Custom GPTs for your specific workflow",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span style={{ color: "#10a37f" }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg p-4 mt-6 text-sm" style={{ color: "#f4b942" }}>
                    📊 "AI agency founders earn $34,000/mo profit with just 5 clients — Medium, March 2026"
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CLAUDE SECTIONS ===== */}

        {/* Claude 1A: Writing & Code Highlight */}
        {brandSlug === "claude-pro-bangladesh" && (
          <div className="mb-14">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3" style={{ backgroundColor: "#d9770620", color: "#d97706" }}>The Smartest AI for Writing & Code</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">Claude Opus 4.6 — The World's Best AI for Writing &amp; Code</h2>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "#c9ceda" }}>Ranked #1 on Chatbot Arena. SWE-bench leader. 1M token context.</p>
            </div>

            {/* Document + Code illustration */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 320 120" width="320" height="120" aria-hidden="true">
                {/* Document */}
                <rect x="20" y="15" width="80" height="95" rx="6" fill="#1e293b" stroke="#d97706" strokeWidth="1.5"/>
                <rect x="30" y="28" width="60" height="4" rx="2" fill="#d97706" opacity="0.7"/>
                <rect x="30" y="38" width="50" height="3" rx="1.5" fill="#d97706" opacity="0.3"/>
                <rect x="30" y="47" width="55" height="3" rx="1.5" fill="#d97706" opacity="0.3"/>
                <rect x="30" y="56" width="45" height="3" rx="1.5" fill="#d97706" opacity="0.3"/>
                <rect x="30" y="65" width="52" height="3" rx="1.5" fill="#d97706" opacity="0.3"/>
                <rect x="30" y="74" width="40" height="3" rx="1.5" fill="#d97706" opacity="0.3"/>
                {/* Sparkles */}
                <circle cx="115" cy="25" r="3" fill="#d97706" opacity="0.8"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="125" cy="40" r="2" fill="#f4b942" opacity="0.6"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite"/></circle>
                <circle cx="108" cy="55" r="2.5" fill="#d97706" opacity="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite"/></circle>
                {/* Code terminal */}
                <rect x="155" y="15" width="145" height="95" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5"/>
                <rect x="155" y="15" width="145" height="18" rx="6" fill="#1e293b"/>
                <circle cx="170" cy="24" r="3" fill="#ef4444" opacity="0.8"/>
                <circle cx="181" cy="24" r="3" fill="#f59e0b" opacity="0.8"/>
                <circle cx="192" cy="24" r="3" fill="#10b981" opacity="0.8"/>
                <rect x="165" y="42" width="55" height="4" rx="2" fill="#10b981" opacity="0.6"/>
                <rect x="165" y="52" width="80" height="4" rx="2" fill="#94a3b8" opacity="0.4"/>
                <rect x="165" y="62" width="65" height="4" rx="2" fill="#10b981" opacity="0.6"/>
                <rect x="165" y="72" width="45" height="4" rx="2" fill="#94a3b8" opacity="0.4"/>
                <rect x="165" y="82" width="70" height="4" rx="2" fill="#10b981" opacity="0.6"/>
                {/* Bug squash check */}
                <circle cx="275" cy="60" r="16" fill="#10b981" opacity="0.15"/>
                <path d="M267 60 L272 65 L283 53" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { Icon: FileText, title: "Writing", desc: "#1 on Chatbot Arena for writing quality. Legal documents, research papers, creative content — Claude writes better than any AI." },
                { Icon: Terminal, title: "Code", desc: "Claude Code: autonomous coding agent. Writes, reviews, tests, and fixes entire codebases. Used by professional engineers worldwide." },
                { Icon: Brain, title: "Thinking", desc: "1M token context + extended thinking. Feed it your entire thesis, legal case, or codebase — it understands ALL of it." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ backgroundColor: "#0a0e27", border: "1px solid rgba(217,119,6,0.2)", borderTopWidth: 4, borderTopColor: "#d97706", borderTopStyle: "solid" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(217,119,6,0.12)", border: "1px solid rgba(217,119,6,0.25)" }}>
                    <card.Icon className="w-6 h-6" style={{ color: "#d97706" }} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm" style={{ color: "#c9ceda" }}>{card.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl text-sm text-center" style={{ backgroundColor: "#d9770610", color: "#d97706" }}>
              Claude Opus 4.6 scored highest on SWE-bench, GPQA, and Chatbot Arena — the three most trusted AI benchmarks. It is objectively the smartest AI for writing and code analysis.
            </div>
          </div>
        )}

        {/* Claude 1B: Who Uses Claude */}
        {brandSlug === "claude-pro-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Who Uses Claude in Bangladesh?</h2>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-500/10">
                    <th className="text-left px-4 py-3 font-semibold text-white">Segment</th>
                    <th className="text-left px-4 py-3 font-semibold text-white hidden sm:table-cell">Why Claude</th>
                    <th className="text-left px-4 py-3 font-semibold text-white hidden md:table-cell">Plan</th>
                    <th className="text-right px-4 py-3 font-semibold" style={{ color: "#d97706" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { seg: "✍️ Writers & Researchers", why: "Best writing quality of any AI", plan: "Premium Shared", price: "৳1,495", link: "/best-ai-for-students" },
                    { seg: "⚖️ Lawyers & Legal", why: "Legal document analysis, case research", plan: "Personal", price: "৳2,990", link: "/best-ai-for-business" },
                    { seg: "🖥️ Developers", why: "Claude Code = autonomous coding agent", plan: "Premium Shared", price: "৳1,495", link: "/best-ai-for-developers" },
                    { seg: "🎬 Content Creators", why: "Long-form blogs, scripts, newsletters", plan: "Premium Shared", price: "৳1,495", link: "/best-ai-for-creators" },
                    { seg: "🏢 Agencies", why: "Team plan with admin controls", plan: "Team", price: "৳3,990", link: "/best-ai-for-business" },
                    { seg: "⚡ Power Users", why: "5x–20x limits, 1M context window", plan: "Max 5x/20x", price: "৳14,950–29,900", link: "/" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                      <td className="px-4 py-3 text-white font-medium">{row.seg}</td>
                      <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "#c9ceda" }}>{row.why}</td>
                      <td className="px-4 py-3 hidden md:table-cell" style={{ color: "#c9ceda" }}>{row.plan}</td>
                      <td className="px-4 py-3 text-right font-semibold" style={{ color: "#d97706" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Claude 1C: FOMO for Writers */}
        {brandSlug === "claude-pro-bangladesh" && (
          <div className="bg-amber-500/5 border-l-4 border-amber-500 rounded-lg p-6 my-8">
            <div className="text-base font-bold mb-3" style={{ color: "#d97706" }}>⚠️ If You Write for a Living and You're NOT Using Claude…</div>
            <p className="text-sm mb-4" style={{ color: "#c9ceda" }}>
              You're competing with one hand tied behind your back. Every writer using Claude Opus 4.6 produces <strong className="text-white">3× more content at higher quality</strong>. Clients are comparing proposals written by AI-assisted writers against your manual work — and choosing the AI-assisted ones.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
              {[
                { label: "More content", stat: "3×", sub: "produced per day" },
                { label: "Faster delivery", stat: "60%", sub: "deadline improvement" },
                { label: "Higher earnings", stat: "44%", sub: "avg income increase" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl" style={{ backgroundColor: "#d9770615" }}>
                  <div className="text-3xl font-bold text-amber-400">{s.stat}</div>
                  <div className="font-semibold text-white">{s.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Claude 1D: Agentic Highlight (Max) */}
        {brandSlug === "claude-pro-bangladesh" && (
          <div className="mb-14 rounded-2xl border overflow-hidden bg-purple-500/5 border-purple-500/20">
            <div className="px-6 py-4" style={{ background: "linear-gradient(135deg, #292108 0%, #1a1508 100%)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(217,119,6,0.2)" }}>
                  <Zap className="w-5 h-5" style={{ color: "#d97706" }} />
                </div>
                <div className="text-sm font-semibold" style={{ color: "#d97706" }}>Claude Max — AI That Thinks for Hours</div>
              </div>
              <h3 className="text-lg font-bold text-white">৳14,950–৳29,900/mo = AI Partner for Complex Professional Work</h3>
              <p className="text-sm mt-1" style={{ color: "#c9ceda" }}>This is not a chatbot. This is an AI partner for complex professional work.</p>
            </div>
            <div className="p-6" style={{ backgroundColor: "#0a0e27" }}>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {[
                  { Icon: Layers, title: "Entire codebase", desc: "Feed Claude your whole project — it understands architecture, dependencies, and logic end-to-end." },
                  { Icon: FileText, title: "Full legal case", desc: "Upload hundreds of pages of case files. Claude reads, cross-references, and finds the key arguments." },
                  { Icon: GraduationCap, title: "Complete thesis", desc: "1M token window = your entire dissertation. Claude restructures, cites, and polishes everything." },
                ].map((c) => (
                  <div key={c.title} className="p-4 rounded-xl border border-white/10 border-l-4 border-purple-500/50" style={{ backgroundColor: "#151b3d" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(217,119,6,0.12)" }}>
                      <c.Icon className="w-5 h-5" style={{ color: "#d97706" }} />
                    </div>
                    <div className="font-semibold text-white text-sm mb-1">{c.title}</div>
                    <p className="text-xs" style={{ color: "#c9ceda" }}>{c.desc}</p>
                  </div>
                ))}
              </div>
              <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I want Claude Max 5x (৳14,950/mo)")}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#d97706", color: "#fff" }}>
                Order Claude Max →
              </a>
            </div>
          </div>
        )}

        {/* ===== PERPLEXITY SECTIONS ===== */}

        {/* Perplexity 2A: Research Highlight */}
        {brandSlug === "perplexity-pro-bangladesh" && (
          <div className="mb-14">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3" style={{ backgroundColor: "#20b2aa20", color: "#20b2aa" }}>The Future of Research</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">Perplexity Pro — AI Research with Real Sources</h2>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "#c9ceda" }}>Every answer comes with source links. No hallucinations. Real research in 30 seconds.</p>
            </div>

            {/* Magnifying glass illustration */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 260 110" width="260" height="110" aria-hidden="true">
                {/* Documents behind glass */}
                <rect x="10" y="20" width="65" height="80" rx="5" fill="#1e293b" stroke="#20b2aa" strokeWidth="1" opacity="0.5"/>
                <rect x="18" y="32" width="49" height="4" rx="2" fill="#20b2aa" opacity="0.4"/>
                <rect x="18" y="42" width="40" height="3" rx="1.5" fill="#94a3b8" opacity="0.3"/>
                <rect x="18" y="51" width="45" height="3" rx="1.5" fill="#94a3b8" opacity="0.3"/>
                <rect x="18" y="60" width="35" height="3" rx="1.5" fill="#20b2aa" opacity="0.3"/>
                <rect x="18" y="69" width="42" height="3" rx="1.5" fill="#94a3b8" opacity="0.3"/>
                {/* Second doc */}
                <rect x="55" y="30" width="65" height="70" rx="5" fill="#1e293b" stroke="#20b2aa" strokeWidth="1" opacity="0.7"/>
                <rect x="63" y="42" width="49" height="4" rx="2" fill="#20b2aa" opacity="0.5"/>
                <rect x="63" y="52" width="40" height="3" rx="1.5" fill="#94a3b8" opacity="0.4"/>
                <rect x="63" y="61" width="45" height="3" rx="1.5" fill="#94a3b8" opacity="0.4"/>
                <rect x="63" y="70" width="35" height="3" rx="1.5" fill="#20b2aa" opacity="0.4"/>
                {/* Magnifying glass */}
                <circle cx="155" cy="52" r="36" fill="#0a1628" stroke="#20b2aa" strokeWidth="2.5"/>
                <circle cx="155" cy="52" r="30" fill="#0d1f40" stroke="#20b2aa" strokeWidth="1" opacity="0.5"/>
                <line x1="182" y1="79" x2="205" y2="102" stroke="#20b2aa" strokeWidth="5" strokeLinecap="round"/>
                {/* Answer inside glass */}
                <rect x="133" y="38" width="44" height="5" rx="2.5" fill="#20b2aa" opacity="0.8"/>
                <rect x="136" y="49" width="38" height="3" rx="1.5" fill="#94a3b8" opacity="0.5"/>
                <rect x="136" y="57" width="34" height="3" rx="1.5" fill="#94a3b8" opacity="0.5"/>
                {/* Citation link icons */}
                <circle cx="230" cy="25" r="8" fill="#20b2aa" opacity="0.2"/><text x="226" y="29" fontSize="8" fill="#20b2aa">🔗</text>
                <circle cx="248" cy="50" r="8" fill="#20b2aa" opacity="0.15"/><text x="244" y="54" fontSize="8" fill="#20b2aa">🔗</text>
                <circle cx="232" cy="75" r="8" fill="#20b2aa" opacity="0.1"/><text x="228" y="79" fontSize="8" fill="#20b2aa">🔗</text>
              </svg>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { Icon: Link2, title: "Citations", desc: "Every answer comes with source links you can verify. No hallucinations. No made-up facts. Real research you can cite." },
                { Icon: Layers, title: "Deep Research", desc: "Ask complex questions, get multi-page reports with data, charts, and cited sources from 20–50 web sources — in minutes." },
                { Icon: Clock, title: "Real-Time", desc: "Always up to date. Searches the live web. Perfect for market research, competitor analysis, and trending topics." },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: "#0a0e27", border: "1px solid rgba(32,178,170,0.2)", borderTopWidth: 3, borderTopColor: "#20b2aa", borderTopStyle: "solid" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(32,178,170,0.12)", border: "1px solid rgba(32,178,170,0.25)" }}>
                    <card.Icon className="w-6 h-6" style={{ color: "#20b2aa" }} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm" style={{ color: "#c9ceda" }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perplexity 2B: Segment Table */}
        {brandSlug === "perplexity-pro-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Who Uses Perplexity Pro in Bangladesh?</h2>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#151b3d" }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Segment</th>
                    <th className="text-left px-4 py-3 font-semibold text-white hidden sm:table-cell">Use Case</th>
                    <th className="text-right px-4 py-3 font-semibold" style={{ color: "#20b2aa" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { seg: "🎓 Students", use: "Thesis citations, paper research with sources", price: "৳350", link: "/best-ai-for-students" },
                    { seg: "💻 Freelancers", use: "Client industry research before writing proposals", price: "৳350", link: "/best-ai-for-freelancers" },
                    { seg: "📢 Marketers", use: "Competitor analysis, trend reports, content ideas", price: "৳350", link: "/best-ai-for-business" },
                    { seg: "🔬 Researchers", use: "Academic paper discovery, data synthesis", price: "৳2,990", link: "/" },
                    { seg: "🏢 Business", use: "Market research, investment analysis, due diligence", price: "৳29,900", link: "/best-ai-for-business" },
                  ].map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#0a0e2788" : "#151b3d88" }}>
                      <td className="px-4 py-3 text-white font-medium">{row.seg}</td>
                      <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "#c9ceda" }}>{row.use}</td>
                      <td className="px-4 py-3 text-right font-semibold" style={{ color: "#20b2aa" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Perplexity 2C: vs Google Search */}
        {brandSlug === "perplexity-pro-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-white mb-5">Perplexity vs Google Search</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 border" style={{ backgroundColor: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)" }}>
                <div className="font-bold mb-3 text-sm" style={{ color: "#ef4444" }}>😩 Old Way — Google Search</div>
                <ul className="space-y-2 text-sm" style={{ color: "#c9ceda" }}>
                  {[
                    "Search query → 10 blue links",
                    "Open 5 tabs → read for 30 min",
                    "Piece together scattered facts",
                    "Manually write citations",
                    "Maybe find the answer…",
                  ].map((s, i) => <li key={i} className="flex gap-2"><span style={{ color: "#ef4444" }}>✗</span>{s}</li>)}
                </ul>
                <div className="mt-4 text-xs font-semibold" style={{ color: "#ef4444" }}>⏱ 30–60 min per research question</div>
              </div>
              <div className="rounded-2xl p-5 border" style={{ backgroundColor: "rgba(32,178,170,0.05)", borderColor: "rgba(32,178,170,0.2)" }}>
                <div className="font-bold mb-3 text-sm" style={{ color: "#20b2aa" }}>🚀 New Way — Perplexity Pro</div>
                <ul className="space-y-2 text-sm" style={{ color: "#c9ceda" }}>
                  {[
                    "Ask your question naturally",
                    "Direct answer with cited sources",
                    "Follow-up questions in the same thread",
                    "Citations formatted automatically",
                    "Verified facts in 30 seconds",
                  ].map((s, i) => <li key={i} className="flex gap-2"><span style={{ color: "#20b2aa" }}>✓</span>{s}</li>)}
                </ul>
                <div className="mt-4 text-xs font-semibold" style={{ color: "#20b2aa" }}>⚡ 30 seconds per research question</div>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl text-center text-sm" style={{ backgroundColor: "#20b2aa10", color: "#20b2aa" }}>
              Perplexity saves students <strong>2–3 hours PER research paper</strong>. At ৳350/mo, that's less than <strong>৳12 per hour saved</strong>.
            </div>
          </div>
        )}

        {/* ===== GOOGLE AI PRO SECTIONS ===== */}

        {/* Google AI Pro 3A: Best Value Hero */}
        {brandSlug === "gemini-advanced-bangladesh" && (
          <div className="mb-14">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3" style={{ backgroundColor: "#4285f420", color: "#4285f4" }}>Best AI Deal in Bangladesh</span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">Google AI Pro — The Best Value AI in Bangladesh</h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "#c9ceda" }}>Everything Google has built into one subscription. On your existing Gmail account.</p>
            </div>

            {/* Price tag SVG */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 300 130" width="300" height="130" aria-hidden="true">
                {/* Strikethrough price */}
                <text x="30" y="55" fontSize="28" fill="#ef4444" opacity="0.5" fontWeight="bold" fontFamily="sans-serif">৳2,990</text>
                <line x1="25" y1="45" x2="185" y2="45" stroke="#ef4444" strokeWidth="3" opacity="0.6"/>
                {/* Main price */}
                <text x="30" y="100" fontSize="52" fill="#4285f4" fontWeight="bold" fontFamily="sans-serif">৳500</text>
                {/* Badge */}
                <rect x="220" y="20" width="68" height="35" rx="10" fill="#4285f4"/>
                <text x="228" y="35" fontSize="11" fill="white" fontWeight="bold" fontFamily="sans-serif">83% OFF</text>
                <circle cx="254" cy="39" r="4" fill="white" opacity="0.3"><animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" additive="sum"/><animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/></circle>
                {/* /month */}
                <text x="32" y="118" fontSize="13" fill="#94a3b8" fontFamily="sans-serif">/month · Personal Gmail account</text>
              </svg>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {[
                { Icon: Bot, label: "Gemini 3.1 Pro", desc: "Google's most capable AI model" },
                { Icon: Search, label: "Deep Research", desc: "Multi-source research reports in minutes" },
                { Icon: Mail, label: "AI in Gmail", desc: "Write and reply to emails automatically" },
                { Icon: FileText, label: "AI in Google Docs", desc: "Write, summarize, translate documents" },
                { Icon: BarChart2, label: "AI in Sheets", desc: "Formulas, analysis, charts automatically" },
                { Icon: Layout, label: "AI in Slides", desc: "Create full presentations from a prompt" },
                { Icon: HardDrive, label: "2TB Google Drive", desc: "Never worry about storage again" },
                { Icon: ImageIcon, label: "AI Image Gen", desc: "Generate images with Imagen 3" },
                { Icon: Play, label: "YouTube Premium", desc: "Ad-free YouTube included" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl border border-white/10 transition-all duration-200 hover:border-[#4285f4]/30" style={{ backgroundColor: "#0a0e27" }}>
                  <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "rgba(66,133,244,0.12)" }}>
                    <item.Icon className="w-4 h-4" style={{ color: "#4285f4" }} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{item.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl text-center text-sm font-medium" style={{ backgroundColor: "#4285f415", color: "#4285f4" }}>
              All of this for <strong>৳500/mo</strong> — on YOUR personal Gmail account. This is the biggest AI deal in Bangladesh.
            </div>
          </div>
        )}

        {/* Google AI Pro 3B: Segment Table */}
        {brandSlug === "gemini-advanced-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Who Benefits Most from Google AI Pro?</h2>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#151b3d" }}>
                    <th className="text-left px-4 py-3 font-semibold text-white">Segment</th>
                    <th className="text-left px-4 py-3 font-semibold text-white hidden sm:table-cell">Key Benefits</th>
                    <th className="text-right px-4 py-3 font-semibold" style={{ color: "#4285f4" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { seg: "🎓 Students", benefits: "Gmail AI for applications + Docs AI for assignments + 2TB storage", price: "৳500" },
                    { seg: "🔍 Job Seekers", benefits: "Gmail AI for cold emails + Docs AI for CV + Slides for presentations", price: "৳500" },
                    { seg: "💼 Business", benefits: "Gmail + Docs + Sheets + Slides — all AI-powered, one account", price: "৳500" },
                    { seg: "🔬 Researchers", benefits: "Deep Research + Google Scholar integration + 2TB storage", price: "৳500" },
                  ].map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#0a0e2788" : "#151b3d88" }}>
                      <td className="px-4 py-3 text-white font-medium">{row.seg}</td>
                      <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "#c9ceda" }}>{row.benefits}</td>
                      <td className="px-4 py-3 text-right font-bold" style={{ color: "#4285f4" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Google AI Pro 3C: Google Ecosystem SVG */}
        {brandSlug === "gemini-advanced-bangladesh" && (
          <div className="mb-14 rounded-2xl p-6 border border-white/10" style={{ backgroundColor: "#151b3d" }}>
            <h2 className="text-xl font-bold text-white mb-6 text-center">AI Everywhere in Google</h2>
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 400 140" width="100%" style={{ display: "block", height: "auto", maxHeight: 160 }} aria-hidden="true">
                {/* Center hub */}
                <circle cx="200" cy="70" r="30" fill="#4285f4" opacity="0.15" stroke="#4285f4" strokeWidth="1.5"/>
                <text x="192" y="66" fontSize="10" fill="#4285f4" fontWeight="bold">Google</text>
                <text x="196" y="78" fontSize="8" fill="#4285f4">AI Pro</text>
                {/* Sparkle center */}
                <circle cx="200" cy="70" r="5" fill="#4285f4"><animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite"/></circle>

                {/* Gmail — left */}
                <circle cx="55" cy="70" r="24" fill="#1e293b" stroke="#ea4335" strokeWidth="1.5"/>
                <text x="43" y="67" fontSize="9" fill="#ea4335" fontWeight="bold">Gmail</text>
                <text x="46" y="78" fontSize="7" fill="#94a3b8">AI write</text>
                <line x1="79" y1="70" x2="170" y2="70" stroke="#ea4335" strokeWidth="1" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite"/></line>

                {/* Docs — top */}
                <circle cx="200" cy="20" r="24" fill="#1e293b" stroke="#4285f4" strokeWidth="1.5"/>
                <text x="191" y="17" fontSize="9" fill="#4285f4" fontWeight="bold">Docs</text>
                <text x="187" y="28" fontSize="7" fill="#94a3b8">AI write</text>
                <line x1="200" y1="44" x2="200" y2="40" stroke="#4285f4" strokeWidth="1" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite"/></line>

                {/* Sheets — top right */}
                <circle cx="335" cy="25" r="24" fill="#1e293b" stroke="#0f9d58" strokeWidth="1.5"/>
                <text x="322" y="22" fontSize="9" fill="#0f9d58" fontWeight="bold">Sheets</text>
                <text x="323" y="33" fontSize="7" fill="#94a3b8">AI charts</text>
                <line x1="313" y1="40" x2="222" y2="52" stroke="#0f9d58" strokeWidth="1" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite"/></line>

                {/* Slides — bottom right */}
                <circle cx="335" cy="115" r="24" fill="#1e293b" stroke="#f4b300" strokeWidth="1.5"/>
                <text x="325" y="112" fontSize="9" fill="#f4b300" fontWeight="bold">Slides</text>
                <text x="319" y="123" fontSize="7" fill="#94a3b8">AI decks</text>
                <line x1="313" y1="100" x2="222" y2="88" stroke="#f4b300" strokeWidth="1" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite"/></line>

                {/* Drive — bottom */}
                <circle cx="200" cy="120" r="24" fill="#1e293b" stroke="#a142f4" strokeWidth="1.5"/>
                <text x="191" y="117" fontSize="9" fill="#a142f4" fontWeight="bold">Drive</text>
                <text x="190" y="128" fontSize="7" fill="#94a3b8">2TB free</text>
                <line x1="200" y1="96" x2="200" y2="100" stroke="#a142f4" strokeWidth="1" strokeDasharray="4 3"><animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite"/></line>
              </svg>
            </div>
            <p className="text-center text-sm" style={{ color: "#c9ceda" }}>All Google apps upgraded with AI — on your existing account. One subscription, every tool.</p>
          </div>
        )}

        {/* ===== MIDJOURNEY SECTIONS ===== */}

        {brandSlug === "midjourney-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">What You Can Create With Midjourney</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { Icon: Camera, title: "Product Photography", desc: "AI product shots without a studio", pill: "E-commerce" },
                { Icon: Youtube, title: "YouTube Thumbnails", desc: "Viral thumbnails in 30 seconds", pill: "Creators" },
                { Icon: Palette, title: "Logo Concepts", desc: "50 brand concepts in 1 hour", pill: "Designers" },
                { Icon: Megaphone, title: "Ad Creatives", desc: "Facebook/Instagram ads instantly", pill: "Marketers" },
                { Icon: BookOpen, title: "Book Covers", desc: "Professional cover art", pill: "Authors" },
                { Icon: Home, title: "Interior Design", desc: "Room visualization from text", pill: "Architects" },
              ].map((card) => (
                <div key={card.title} className="bg-gray-900 rounded-xl p-6">
                  <card.Icon className="w-8 h-8 mb-3" style={{ color: "#6366f1" }} />
                  <div className="font-bold text-white mb-1">{card.title}</div>
                  <p className="text-sm mb-3" style={{ color: "#c9ceda" }}>{card.desc}</p>
                  <span className="bg-gray-800 text-xs rounded-full px-3 py-1" style={{ color: "#c9ceda" }}>{card.pill}</span>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Midjourney Freelance Income Potential</h3>
            <div className="bg-gradient-to-r from-[#1a1a2e] to-gray-900 rounded-xl p-6 border border-gray-800">
              <ul className="space-y-2 text-sm mb-4" style={{ color: "#c9ceda" }}>
                <li>• Logo design with AI concepts: $200-500 per project</li>
                <li>• Social media content pack (30 posts): $300-1,000/month retainer</li>
                <li>• Product photography for e-commerce: $50-200 per product set</li>
                <li>• YouTube thumbnail service: $10-50 per thumbnail</li>
              </ul>
              <p className="font-bold text-sm" style={{ color: "#f4b942" }}>Investment: BDT 1,199/mo | Potential: $1,000-3,000/mo | ROI: 6x-19x</p>
            </div>
          </div>
        )}

        {/* ===== RUNWAY SECTIONS ===== */}

        {brandSlug === "runway-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">What Runway Can Do</h2>
            <div className="space-y-3">
              {[
                { Icon: Video, text: "Generate video clips from text descriptions" },
                { Icon: Scissors, text: "Remove backgrounds from any video" },
                { Icon: Maximize, text: "Extend existing video clips with AI" },
                { Icon: ArrowUpCircle, text: "4K upscale any footage" },
                { Icon: Sparkles, text: "Motion graphics without After Effects" },
              ].map((item) => (
                <div key={item.text} className="bg-gray-900 rounded-lg p-4 flex items-center gap-4">
                  <item.Icon className="w-5 h-5 flex-shrink-0 text-amber-500" />
                  <span className="text-sm text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ELEVENLABS SECTIONS ===== */}

        {brandSlug === "elevenlabs-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">ElevenLabs — Professional Voiceover in Seconds</h2>
            <div className="bg-gray-900 rounded-xl p-6">
              <p className="text-sm mb-4" style={{ color: "#c9ceda" }}>Clone your voice and use it in 29 languages. Or choose from hundreds of natural-sounding AI voices.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["YouTube Narration", "Podcast Intros", "Ad Voiceover", "Audiobook Creation"].map((pill) => (
                  <span key={pill} className="bg-gray-800 rounded-full px-3 py-1 text-sm" style={{ color: "#c9ceda" }}>{pill}</span>
                ))}
              </div>
              <div className="border-l-4 border-green-500 bg-gray-800 p-4 rounded-r-lg">
                <p className="text-sm" style={{ color: "#c9ceda" }}>Voiceover freelancers charge $50-300/min. ElevenLabs: BDT 748/mo. Create Fiverr voiceover service → $50/project → deliver in 5 min. 20 projects/month = $1,000/mo.</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== SUNO AI SECTIONS ===== */}

        {brandSlug === "suno-ai-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Create Music From Words</h2>
            <div className="bg-gray-900 rounded-xl p-6">
              <Music className="w-8 h-8 mb-4" style={{ color: "#a855f7" }} />
              <ul className="space-y-2 text-sm mb-4" style={{ color: "#c9ceda" }}>
                <li>• YouTube background music (no copyright)</li>
                <li>• Brand jingles</li>
                <li>• Podcast intro/outro</li>
                <li>• Social media tracks</li>
                <li>• Full songs with lyrics</li>
              </ul>
              <p className="font-bold text-sm text-white">2,500 credits/month = ~500 songs. All commercially licensed.</p>
            </div>
          </div>
        )}

        {/* ===== NOTION SECTIONS ===== */}

        {brandSlug === "notion-business-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Notion Business — AI-Powered Workspace</h2>
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <ul className="space-y-4">
                {[
                  { Icon: Brain, text: "Notion AI — write, summarize, translate in your workspace" },
                  { Icon: Users, text: "Teamspaces — organize by department" },
                  { Icon: History, text: "90-day version history — never lose work" },
                  { Icon: UserPlus, text: "250 guest collaborators" },
                  { Icon: Shield, text: "SSO + advanced security" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-white">
                    <item.Icon className="w-5 h-5 flex-shrink-0 text-blue-400" />
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 border border-white/10">
                <div className="text-sm line-through mb-1" style={{ color: "#ef4444" }}>Official: $20/seat = BDT 2,990</div>
                <div className="text-3xl font-bold mb-2" style={{ color: "#f4b942" }}>BDT 800/mo</div>
                <span className="inline-block bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">73% OFF</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Who Needs Notion Business?</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { Icon: Briefcase, label: "Freelancers", desc: "Client portal + project tracking", price: "BDT 800" },
                { Icon: Building, label: "Agencies", desc: "Team wiki + SOP library", price: "BDT 800" },
                { Icon: Rocket, label: "Startups", desc: "Docs, tasks, roadmap, OKRs", price: "BDT 800" },
                { Icon: GraduationCap, label: "Students", desc: "Notes + assignment tracker", price: "BDT 800" },
              ].map((card) => (
                <div key={card.label} className="bg-gray-800 rounded-lg p-4">
                  <card.Icon className="w-5 h-5 mb-2 text-blue-400" />
                  <div className="font-bold text-white text-sm mb-1">{card.label}</div>
                  <div className="text-xs mb-2" style={{ color: "#c9ceda" }}>{card.desc}</div>
                  <div className="text-xs font-semibold" style={{ color: "#f4b942" }}>{card.price}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-6 border" style={{ background: "linear-gradient(to right, rgba(245,158,11,0.1), #111827)", borderColor: "rgba(245,158,11,0.3)" }}>
              <p className="text-sm mb-4" style={{ color: "#c9ceda" }}>
                Pay BDT 4,800 once → get 6 months (BDT 800/mo). No monthly renewal hassle.
              </p>
              <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I want Notion Business 6-Month (৳4,800)")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80 transition-opacity"
                style={{ color: "#f4b942" }}>
                Order 6-Month Plan →
              </a>
            </div>
          </div>
        )}

        {/* ===== MANUS AI SECTIONS ===== */}

        {brandSlug === "manus-ai-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Manus AI — The AI That Does Tasks By Itself</h2>
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <p className="text-sm font-bold text-white mb-5">Manus is NOT a chatbot. It's an AUTONOMOUS AGENT.</p>
              <ul className="space-y-4">
                {[
                  { Icon: Search, text: "Researches topics and delivers comprehensive reports" },
                  { Icon: BarChart3, text: "Analyzes data and creates visualizations" },
                  { Icon: Globe, text: "Browses the web and summarizes findings" },
                  { Icon: FileText, text: "Generates documents and presentations" },
                  { Icon: CheckSquare, text: "Executes multi-step tasks without supervision" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-white">
                    <item.Icon className="w-5 h-5 flex-shrink-0" style={{ color: "#3b82f6" }} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The AI Evolution</h3>
            <div className="flex gap-4 mb-5">
              {[
                { year: "2024", label: "Chatbot", desc: "AI answers questions", yearColor: "#6b7280", border: false },
                { year: "2025", label: "Copilot", desc: "AI helps with tasks", yearColor: "#3b82f6", border: false },
                { year: "2026", label: "Agent", desc: "AI DOES the tasks", yearColor: "#22c55e", border: true },
              ].map((item) => (
                <div key={item.year}
                  className={`flex-1 bg-gray-800 rounded-lg p-4 text-center ${item.border ? "border-2 border-green-500" : ""}`}>
                  <div className="text-sm font-semibold mb-1" style={{ color: item.yearColor }}>{item.year}</div>
                  <div className={`font-bold text-white text-sm mb-1 ${item.border ? "font-bold" : ""}`}>{item.label}</div>
                  <div className="text-xs" style={{ color: "#c9ceda" }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-white">Manus AI is at Level 3. <span style={{ color: "#f4b942" }}>BDT 2,500/mo = your autonomous employee.</span></p>
          </div>
        )}

        {/* ===== GITHUB COPILOT SECTIONS ===== */}

        {brandSlug === "github-copilot-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">GitHub Copilot — Code 55% Faster</h2>
            <div className="grid grid-cols-3 gap-4 mb-3">
              {[
                { stat: "55%", label: "faster task completion" },
                { stat: "87%", label: "less mental effort on repetitive tasks" },
                { stat: "73%", label: "developers stay in flow state" },
              ].map((item) => (
                <div key={item.stat} className="bg-gray-900 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: "#6e40c9" }}>{item.stat}</div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs italic text-gray-500 mb-6">Source: GitHub Research 2025</p>
            <h3 className="text-xl font-bold text-white mb-3">Income Impact</h3>
            <div className="border-l-4 bg-gray-900 p-4 rounded-r-lg" style={{ borderColor: "#6e40c9" }}>
              <p className="text-sm" style={{ color: "#c9ceda" }}>
                At BDT 1,495/mo, saving 20 hours/month = effective cost BDT 75/hour saved.
                20 extra hours at $20/hr = $400/mo = BDT 52,000 extra income.{" "}
                <strong style={{ color: "#f4b942" }}>ROI: 35x return.</strong>
              </p>
            </div>
          </div>
        )}

        {/* ===== CURSOR SECTIONS ===== */}

        {brandSlug === "cursor-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Cursor Agent Mode — AI That Writes Code For You</h2>
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <ul className="space-y-3">
                {[
                  "Understands your ENTIRE codebase",
                  "Writes full features from a single prompt",
                  "Multi-file refactoring autonomously",
                  "Uses Claude, GPT-5, Gemini — all frontier models",
                  "Used by developers at OpenAI, Stripe, Shopify",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white">
                    <Code className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Copilot vs Cursor — Quick Decision</h3>
            <div className="space-y-2">
              {[
                { Icon: ThumbsUp, text: "Start with Copilot (BDT 1,495) if:", sub: "You love your current VS Code setup" },
                { Icon: Zap, text: "Choose Cursor (BDT 2,990) if:", sub: "You want full AI agent coding" },
                { Icon: Layers, text: "Use BOTH (BDT 4,485) if:", sub: "Quick completions + complex features" },
              ].map((item) => (
                <div key={item.text} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
                  <item.Icon className="w-5 h-5 flex-shrink-0" style={{ color: "#c9ceda" }} />
                  <div>
                    <span className="text-sm font-semibold text-white">{item.text}</span>
                    <span className="text-sm text-gray-400"> {item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== REPLIT SECTIONS ===== */}

        {brandSlug === "replit-bangladesh" && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Build Anything With AI</h2>
            <div className="rounded-xl p-6 border" style={{ background: "linear-gradient(to right, rgba(249,115,22,0.1), #111827)", borderColor: "rgba(249,115,22,0.3)" }}>
              <p className="text-sm mb-4" style={{ color: "#c9ceda" }}>
                Replit Core BDT 500/mo — Cloud IDE with AI Agent. Build full apps from a single prompt. Deploy instantly. No local setup.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Students", "Freelancers", "Entrepreneurs", "MVPs"].map((pill) => (
                  <span key={pill} className="bg-gray-800 rounded-full px-3 py-1 text-sm" style={{ color: "#c9ceda" }}>{pill}</span>
                ))}
              </div>
              <p className="font-bold text-sm" style={{ color: "#f4b942" }}>BDT 500/mo = build a SaaS that earns $1,000+/mo. Best ROI in tech.</p>
            </div>
          </div>
        )}

        {/* How to Order */}
        <div className="mb-14 p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-4">How to Order {meta.displayName} in Bangladesh</h2>
          <div className="mb-5">
            <OrderFlowSVG />
          </div>
          <ol className="space-y-3 text-sm" style={{ color: "#c9ceda" }}>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>1</span>
              <span>Click any <strong className="text-white">Order</strong> button above, or message us on WhatsApp: <strong className="text-white">+880 1865-385348</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>2</span>
              <span>Tell us which {meta.displayName} plan you want. We&apos;ll confirm availability and price.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>3</span>
              <span>Pay via bKash, Nagad, or Rocket. Send payment screenshot on WhatsApp.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: meta.accentColor + "30", color: meta.accentColor }}>4</span>
              <span>Receive your account credentials. Delivery: {cheapest?.deliverySLA ?? "5–30 min"}. 30-day warranty included.</span>
            </li>
          </ol>
          <a
            href={cheapest ? `${WHATSAPP}?text=${encodeURIComponent(cheapest.whatsappMsg ?? `Hi, I want ${meta.displayName}`)}` : WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            <MessageCircle className="w-5 h-5" />
            Order {meta.displayName} on WhatsApp
          </a>
        </div>

        {/* FAQs */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">{meta.displayName} — Frequently Asked Questions</h2>
          <div className="space-y-3">
            {meta.faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white text-sm">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-90" style={{ color: "#f4b942" }} />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* 3B: Quick Answers */}
        {(() => {
          const qa = [
            {
              q: `How much does ${meta.displayName} cost in Bangladesh?`,
              a: `${meta.displayName} in Bangladesh costs from BDT ${products[0]?.price.toLocaleString() ?? "—"}/month through AI Premium Shop. Plans range from BDT ${products[0]?.price.toLocaleString()} to BDT ${products[products.length - 1]?.price.toLocaleString()}. Pay with bKash, Nagad, or Rocket — no international card required.`,
            },
            {
              q: `Is ${meta.displayName} available in Bangladesh?`,
              a: `Yes. AI Premium Shop (AIPS) offers official ${meta.displayName} subscriptions in Bangladesh. All plans are delivered within 5–30 minutes via WhatsApp after payment confirmation. We have served 1,200+ customers since 2022.`,
            },
            {
              q: `How do I buy ${meta.displayName} in Bangladesh without a credit card?`,
              a: `Message AI Premium Shop on WhatsApp (+880 1865-385348). Choose your plan from the options above. Pay with bKash, Nagad, or Rocket. Receive your credentials in ${cheapest?.deliverySLA ?? "5–30 minutes"}. No international credit card needed.`,
            },
            {
              q: `Is it safe to buy ${meta.displayName} through AI Premium Shop?`,
              a: `Yes. AIPS provides official, verified ${meta.displayName} subscriptions. All plans include a 30-day warranty. Over 1,200 customers served since 2022.`,
            },
          ];
          return (
            <div className="mb-14">
              <h2 className="text-xl font-bold text-white mb-4">Quick Answers — {meta.displayName} Bangladesh</h2>
              <div className="space-y-3">
                {qa.map((item, i) => (
                  <details key={i} className="group rounded-xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white text-sm">
                      {item.q}
                      <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-90" style={{ color: "#f4b942" }} />
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          );
        })()}

        {/* 3C: Segment Table */}
        {products.length > 0 && (() => {
          const sharedProducts = products.filter(p => p.accessType === "shared");
          const personalProducts = products.filter(p => p.accessType === "personal");
          const cheapestShared = sharedProducts[0] ?? products[0];
          const premiumShared = sharedProducts.length > 1 ? sharedProducts[Math.min(1, sharedProducts.length - 1)] : sharedProducts[0] ?? products[0];
          const businessPlan = products.find(p => (p.tier ?? "").toLowerCase().includes("business") || (p.tier ?? "").toLowerCase().includes("team")) ?? personalProducts[0] ?? products[Math.floor(products.length / 2)];
          const proPlan = products[products.length - 1];
          const segments = [
            { icon: "🎓", type: "Student / Budget user", plan: cheapestShared, why: "Maximum savings, full AI features included" },
            { icon: "💼", type: "Freelancer", plan: premiumShared, why: "Fewer users per account — more reliable for client work" },
            { icon: "🏢", type: "Business / Team", plan: businessPlan ?? cheapestShared, why: "Admin controls, privacy, or team features" },
            { icon: "💻", type: "Developer / Power user", plan: proPlan, why: "Maximum limits, full access, best performance" },
          ].filter((s, i, arr) => arr.findIndex(x => x.plan?.id === s.plan?.id) === i);
          return (
            <div className="mb-14">
              <h2 className="text-xl font-bold text-white mb-2">Which {meta.displayName} Plan is Right for You?</h2>
              <p className="text-sm mb-5" style={{ color: "#c9ceda" }}>Choose based on your usage and budget.</p>
              <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                <div className="grid grid-cols-[auto_1fr_auto_auto] text-xs font-semibold uppercase tracking-wider border-b border-white/10 px-5 py-3" style={{ color: "#c9ceda" }}>
                  <div className="w-8"></div>
                  <div>If you are…</div>
                  <div className="text-right pr-6">Price/mo</div>
                  <div className="w-20 text-center">Order</div>
                </div>
                {segments.map((seg, i) => {
                  const waUrl = seg.plan ? `${WHATSAPP}?text=${encodeURIComponent(seg.plan.whatsappMsg ?? `Hi, I want ${seg.plan.name}`)}` : WHATSAPP;
                  return (
                    <div key={i} className={`grid grid-cols-[auto_1fr_auto_auto] items-center px-5 py-3 ${i > 0 ? "border-t border-white/6" : ""}`}>
                      <div className="w-8 text-lg">{seg.icon}</div>
                      <div>
                        <div className="font-semibold text-white text-sm">{seg.type}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#c9ceda" }}>{seg.plan?.name ?? "—"} · {seg.why}</div>
                      </div>
                      <div className="text-sm font-bold pr-6" style={{ color: "#f4b942" }}>
                        {seg.plan ? `BDT ${seg.plan.price.toLocaleString()}` : "—"}
                      </div>
                      <a href={waUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#25d366", color: "#fff" }}>
                        <MessageCircle className="w-3 h-3" />
                        Order
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* 3D: Competitor Comparison */}
        {BRAND_COMPETITORS[brandSlug] && (() => {
          const comp = BRAND_COMPETITORS[brandSlug];
          return (
            <div className="mb-14">
              <h2 className="text-xl font-bold text-white mb-2">How {meta.displayName} Compares</h2>
              <p className="text-sm mb-5" style={{ color: "#c9ceda" }}>Consider these alternatives — all available through AI Premium Shop.</p>
              <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                <div className="grid grid-cols-4 text-xs font-semibold uppercase tracking-wider border-b border-white/10" style={{ color: "#c9ceda" }}>
                  <div className="p-4">Feature</div>
                  <div className="p-4 border-l border-white/10" style={{ color: meta.accentColor }}>{meta.displayName}</div>
                  <div className="p-4 border-l border-white/10">
                    <a href={comp.slug1} onClick={(e) => { e.preventDefault(); navigate(comp.slug1); }} className="hover:opacity-80 transition-opacity underline decoration-white/20">{comp.name1}</a>
                  </div>
                  <div className="p-4 border-l border-white/10">
                    <a href={comp.slug2} onClick={(e) => { e.preventDefault(); navigate(comp.slug2); }} className="hover:opacity-80 transition-opacity underline decoration-white/20">{comp.name2}</a>
                  </div>
                </div>
                {[
                  { label: "Price (AIPS)", a: cheapest ? `from BDT ${cheapest.price.toLocaleString()}` : "—", b: comp.price1, c: comp.price2 },
                  { label: "Best for", a: BEST_FOR_LABELS[brandSlug] ?? meta.tagline, b: comp.strength1, c: comp.strength2 },
                  { label: "Delivery", a: cheapest?.deliverySLA ?? "5–30 min", b: "5–30 min", c: "5–30 min" },
                ].map((row, ri) => (
                  <div key={ri} className={`grid grid-cols-4 ${ri > 0 ? "border-t border-white/5" : ""}`}>
                    <div className="p-4 text-xs font-semibold" style={{ color: "#c9ceda" }}>{row.label}</div>
                    <div className={`p-4 border-l border-white/10 text-sm${ri === 0 ? " text-amber-400 font-bold" : ""}`} style={{ color: ri !== 0 ? "#c9ceda" : undefined }}>{row.a}</div>
                    <div className="p-4 border-l border-white/10 text-sm" style={{ color: "#c9ceda" }}>{row.b}</div>
                    <div className="p-4 border-l border-white/10 text-sm" style={{ color: "#c9ceda" }}>{row.c}</div>
                  </div>
                ))}
              </div>
              {comp.compPage && (
                <div className="mt-3">
                  <a href={comp.compPage} onClick={(e) => { e.preventDefault(); navigate(comp.compPage!); }}
                    className="inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity"
                    style={{ color: "#f4b942" }}>
                    Full comparison: {meta.displayName} vs {comp.name1} →
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })()}

        {/* Related links */}
        <div className="mb-10">
          <h3 className="font-semibold text-white mb-4">Browse more AI categories</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "AI Assistant & Chat", href: "/ai-assistant" },
              { label: "AI Image & Design", href: "/ai-image" },
              { label: "AI Code & Dev Tools", href: "/ai-code" },
              { label: "AI Voice & Music", href: "/ai-voice-music" },
              { label: "All 56 Products", href: "/products" },
            ].map((link) => (
              <a key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-white/30 transition-colors"
                style={{ color: "#c9ceda", minHeight: "44px" }}>
                {link.label}
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
