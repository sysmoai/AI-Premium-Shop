import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";

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
                    className="relative rounded-2xl border border-white/10 flex flex-col overflow-hidden cursor-pointer"
                    style={{ backgroundColor: "#151b3d", transition: "border-color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = meta.accentColor + "50")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  >
                    <div className="h-1 w-full" style={{ backgroundColor: meta.accentColor }} />
                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-white text-sm leading-tight">{p.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: meta.accentColor }}>{p.tier}</div>
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

        {/* How to Order */}
        <div className="mb-14 p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-4">How to Order {meta.displayName} in Bangladesh</h2>
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
