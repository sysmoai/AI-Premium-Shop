/**
 * prerender-meta.mjs
 *
 * Post-build script: for every public route, copies the Vite-built index.html
 * and injects route-specific <title>, description, canonical, and OG/Twitter
 * tags so social bots and AI crawlers see the correct metadata immediately,
 * without waiting for JavaScript to run.
 *
 * Run after `vite build`:  node scripts/prerender-meta.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist", "public");
const TEMPLATE = path.join(DIST, "index.html");

const SITE = "https://aipremiumshop.com";
const SITE_NAME = "AI Premium Shop";
const DEFAULT_OG = `${SITE}/images/og/default-og.png`;

// ---------------------------------------------------------------------------
// Route manifest — title, description, canonical for every indexable route
// ---------------------------------------------------------------------------

const ROUTES = [
  // ── Static pages ──────────────────────────────────────────────────────────
  {
    path: "/products",
    title: `All 80 AI Tools — Prices in BDT | ${SITE_NAME} Bangladesh`,
    description:
      "Browse 80 AI subscriptions in Bangladesh. ChatGPT, Claude, Midjourney & more. Prices in BDT. Pay with bKash/Nagad. Fast delivery. AI Premium Shop.",
  },
  {
    path: "/about",
    title: `About AI Premium Shop — 3,000+ Customers Since 2024 | Bangladesh`,
    description:
      "AI Premium Shop — Bangladesh's WhatsApp-first AI subscription store. 3,000+ customers since 2024. 80 tools including ChatGPT, Claude, Midjourney.",
  },
  {
    path: "/contact",
    title: `Contact AI Premium Shop — WhatsApp Order | bKash & Nagad`,
    description:
      "Contact AI Premium Shop in Dhaka, Bangladesh. WhatsApp +880 1865-385348, Messenger, or email. Under 5-minute response, 10 AM to Midnight BST.",
  },
  {
    path: "/faq",
    title: `FAQ — AI Subscription Bangladesh | bKash/Nagad Payment | ${SITE_NAME}`,
    description:
      "80+ AI subscriptions in Bangladesh. ChatGPT Plus BDT 350, Claude Pro, Midjourney. bKash/Nagad payment, 30-day warranty, WhatsApp support.",
  },
  {
    path: "/pricing",
    title: `AI Tool Pricing Bangladesh 2026 — All 80 Plans | ${SITE_NAME}`,
    description:
      "Compare all AI subscription prices in Bangladesh. 80 tools from BDT 350. bKash/Nagad payment. AI Premium Shop 2026.",
  },
  {
    path: "/support",
    title: `AI Setup Support & 1:1 Coaching — BDT 799/hr | ${SITE_NAME}`,
    description:
      "Get support for your AI subscriptions. WhatsApp: +880 1865-385348. 10 AM to Midnight BST, 7 days a week. 30-day warranty on all orders.",
  },
  {
    path: "/how-to-order",
    title: `How to Buy AI Tools in Bangladesh via bKash | ${SITE_NAME}`,
    description:
      "Step-by-step guide to ordering AI subscriptions in Bangladesh. Pay with bKash or Nagad. Delivered in minutes. No international card required.",
  },
  {
    path: "/blog",
    title: `AI Blog Bangladesh — Guides, Tips & Strategies | ${SITE_NAME}`,
    description:
      "AI guides, comparisons, and tips for Bangladesh. Learn how to earn, study, and work smarter with AI tools.",
  },
  {
    path: "/best-ai-subscription-2026",
    title: `Best AI Subscription 2026 Bangladesh — Top 10 | ${SITE_NAME}`,
    description:
      "The best AI subscriptions available in Bangladesh in 2026, ranked by value. ChatGPT, Claude, Google AI Pro, Midjourney and more.",
  },
  {
    path: "/refund-policy",
    title: `Refund & 30-Day Warranty Policy | ${SITE_NAME}`,
    description:
      "AI Premium Shop refund & replacement policy. 30-day warranty. How to request a refund or replacement.",
  },
  {
    path: "/terms",
    title: `Terms of Service | ${SITE_NAME} Bangladesh`,
    description:
      "Terms of service for AI Premium Shop Bangladesh. Shared & personal account terms explained.",
  },
  {
    path: "/privacy-policy",
    title: `Privacy Policy | ${SITE_NAME} Bangladesh`,
    description:
      "Privacy policy for AI Premium Shop. How we handle your data, payments, and WhatsApp communication.",
  },

  // ── Category pages ────────────────────────────────────────────────────────
  {
    path: "/ai-assistant",
    title: `AI Assistant & Chat — ChatGPT, Claude, Gemini Bangladesh | ${SITE_NAME}`,
    description:
      "ChatGPT, Claude, Gemini, Grok, Perplexity in Bangladesh. From BDT 350. Shared & Personal. bKash/Nagad. Fast delivery.",
  },
  {
    path: "/ai-image",
    title: `AI Image Generator — Midjourney, Ideogram Bangladesh | ${SITE_NAME}`,
    description:
      "Midjourney, Ideogram, Leonardo AI, Freepik in Bangladesh. From BDT 190. AI image generation. bKash/Nagad payment.",
  },
  {
    path: "/ai-video",
    title: `AI Video Generator — Runway, HeyGen Bangladesh | ${SITE_NAME}`,
    description:
      "Runway, HeyGen, Kling AI, Synthesia in Bangladesh. From BDT 270. AI video generation & avatars. Local payment.",
  },
  {
    path: "/ai-voice-music",
    title: `AI Voice & Music — ElevenLabs, Suno Bangladesh | ${SITE_NAME}`,
    description:
      "ElevenLabs, Suno AI, Udio in Bangladesh. From BDT 499. Voice cloning & AI music. Local payment.",
  },
  {
    path: "/ai-code",
    title: `AI Coding Tools — GitHub Copilot, Cursor Bangladesh | ${SITE_NAME}`,
    description:
      "GitHub Copilot, Cursor, Windsurf, v0.dev, Replit in Bangladesh. From BDT 500. AI coding tools. bKash/Nagad.",
  },
  {
    path: "/ai-workspace",
    title: `AI Workspace — Notion, Manus AI Bangladesh | ${SITE_NAME}`,
    description:
      "Notion, Manus AI, Otter.ai, Gamma in Bangladesh. From BDT 399. AI productivity tools. Local payment.",
  },
  {
    path: "/ai-writing",
    title: `AI Writing & SEO Tools — Writesonic Bangladesh | ${SITE_NAME}`,
    description:
      "AI writing tools in Bangladesh 2026. Grammarly, QuillBot, Jasper, Writesonic from BDT 390/mo. Grammar checking, paraphrasing, SEO content. Pay with bKash, Nagad.",
  },
  {
    path: "/ai-design",
    title: `AI Design Tools — Canva Pro, Adobe Firefly Bangladesh | ${SITE_NAME}`,
    description:
      "Canva Pro, Adobe Firefly in Bangladesh. From BDT 190. AI design tools. bKash/Nagad. Instant delivery.",
  },
  {
    path: "/bundles",
    title: `AI Tool Bundles — Student to Business Packages | From BDT 449 | ${SITE_NAME}`,
    description:
      "AI tool bundles for students, freelancers & business. From BDT 449. Save more. AI Premium Shop.",
  },

  // ── Brand pages — ChatGPT ─────────────────────────────────────────────────
  {
    path: "/chatgpt-plans-bangladesh",
    title: `ChatGPT Plans Bangladesh 2026 — From BDT 350 | ${SITE_NAME}`,
    description:
      "All ChatGPT plans Bangladesh from BDT 350. Plus, Business, Pro. bKash/Nagad. 5-30 min delivery. 30-day warranty. AI Premium Shop.",
  },
  {
    path: "/chatgpt-plans-comparison-bangladesh",
    title: `ChatGPT Plans Bangladesh 2026 — From BDT 350 | ${SITE_NAME}`,
    description:
      "All ChatGPT plans Bangladesh from BDT 350. Plus, Business, Pro. bKash/Nagad. 5-30 min delivery. 30-day warranty. AI Premium Shop.",
  },
  {
    path: "/chatgpt-plus-bangladesh",
    title: `Buy ChatGPT Plus Bangladesh — BDT 350/mo | ${SITE_NAME}`,
    description:
      "ChatGPT Plus Bangladesh from BDT 350/mo. GPT-5.4 Thinking, DALL-E images, agents, deep research, Projects. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },
  {
    path: "/chatgpt-business-bangladesh",
    title: `ChatGPT Business Bangladesh — BDT 699/mo | ${SITE_NAME}`,
    description:
      "ChatGPT Business Bangladesh from BDT 699/mo. Privacy-by-default, Codex, unlimited GPT-5.3, admin controls. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },
  {
    path: "/chatgpt-pro-bangladesh",
    title: `ChatGPT Pro Bangladesh — BDT 4,500/mo | ${SITE_NAME}`,
    description:
      "ChatGPT Pro Bangladesh from BDT 4,500/mo. Unlimited GPT-5.4 Pro, Sora video, Codex, deep research. bKash/Nagad. Power users. AI Premium Shop.",
  },
  {
    path: "/chatgpt-go-bangladesh",
    title: `ChatGPT Go Bangladesh — BDT 1,196/mo | ${SITE_NAME}`,
    description:
      "ChatGPT Go Bangladesh BDT 1,196/mo. Personal account, GPT-5.3, image gen, agents. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },

  // ── Brand pages — AI Assistants ───────────────────────────────────────────
  {
    path: "/claude-pro-bangladesh",
    title: `Claude Pro Bangladesh — From BDT 1,495/mo | ${SITE_NAME}`,
    description:
      "Claude Pro Bangladesh from BDT 1,495/mo. Opus 4.6, 200K context, Claude Code. bKash/Nagad. 5-15 min delivery. AI Premium Shop.",
  },
  {
    path: "/gemini-advanced-bangladesh",
    title: `Google AI Pro Bangladesh — BDT 500/mo 83% Off | ${SITE_NAME}`,
    description:
      "Google AI Pro Bangladesh BDT 500/mo — 83% off. Gemini Pro, 2TB storage, YouTube Premium, Workspace AI. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/google-ai-pro-bangladesh",
    title: `Google AI Pro Bangladesh — BDT 500/mo 83% Off | ${SITE_NAME}`,
    description:
      "Google AI Pro Bangladesh BDT 500/mo — 83% off. Gemini Pro, 2TB storage, YouTube Premium, Workspace AI. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/supergrok-bangladesh",
    title: `SuperGrok Bangladesh — From BDT 1,495/mo | ${SITE_NAME}`,
    description:
      "SuperGrok Bangladesh from BDT 1,495/mo. Grok 4.1, real-time X data, image & video gen, AI agents. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/perplexity-pro-bangladesh",
    title: `Perplexity Pro Bangladesh — From BDT 350/mo | ${SITE_NAME}`,
    description:
      "Perplexity Pro Bangladesh from BDT 350/mo. AI research with citations, deep research mode. bKash/Nagad. 5-15 min delivery. AI Premium Shop.",
  },
  {
    path: "/microsoft-copilot-pro-bangladesh",
    title: `Microsoft Copilot Pro Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Microsoft Copilot Pro price in Bangladesh. AI assistant in Microsoft 365 apps. Pay with bKash/Nagad. Instant delivery. 30-day warranty.",
  },

  // ── Brand pages — AI Image & Design ──────────────────────────────────────
  {
    path: "/midjourney-bangladesh",
    title: `Midjourney Bangladesh — From BDT 1,199/mo | ${SITE_NAME}`,
    description:
      "Midjourney Bangladesh from BDT 1,199/mo. AI image generation. 6 plans. bKash/Nagad. Instant delivery. AI Premium Shop.",
  },
  {
    path: "/ideogram-bangladesh",
    title: `Ideogram AI Bangladesh — From BDT 2,990/mo | ${SITE_NAME}`,
    description:
      "Ideogram AI Bangladesh from BDT 2,990/mo. Best AI for text in images, logos, typography. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/leonardo-ai-bangladesh",
    title: `Leonardo AI Bangladesh — BDT 599/mo | ${SITE_NAME}`,
    description:
      "Leonardo AI Bangladesh from BDT 599/mo. AI image generation, 3D textures, character design. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },
  {
    path: "/canva-pro-bangladesh",
    title: `Canva Pro Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Canva Pro price in Bangladesh. AI Magic Studio, 100M+ stock assets, brand kit, background remover. Pay with bKash/Nagad. Instant delivery. 30-day warranty.",
  },
  {
    path: "/adobe-firefly-bangladesh",
    title: `Adobe Firefly Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Adobe Firefly price in Bangladesh. AI image generation, generative fill, text effects. Commercial-safe. Pay with bKash/Nagad. Instant delivery.",
  },
  {
    path: "/freepik-premium-bangladesh",
    title: `Freepik Premium Bangladesh — BDT 450/mo | ${SITE_NAME}`,
    description:
      "Freepik Premium Bangladesh from BDT 450/mo. Unlimited premium vectors, photos, icons. AI image generation, reimagine, upscaler. bKash/Nagad. AI Premium Shop.",
  },

  // ── Brand pages — AI Video ─────────────────────────────────────────────────
  {
    path: "/runway-bangladesh",
    title: `Runway AI Bangladesh — From BDT 1,794/mo | ${SITE_NAME}`,
    description:
      "Runway AI Bangladesh from BDT 1,794/mo. Professional AI video generation, Gen-4, 4K. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/heygen-bangladesh",
    title: `HeyGen Bangladesh — BDT 1,499/mo | ${SITE_NAME}`,
    description:
      "HeyGen Bangladesh BDT 1,499/mo. AI avatar videos, 175+ languages, Bangla support. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },
  {
    path: "/kling-ai-bangladesh",
    title: `Kling AI Bangladesh — BDT 270/mo | ${SITE_NAME}`,
    description:
      "Kling AI Bangladesh from BDT 270/mo. Cinematic text-to-video and image-to-video AI. Character consistency, motion realism. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/synthesia-bangladesh",
    title: `Synthesia Bangladesh — BDT 700/mo | ${SITE_NAME}`,
    description:
      "Synthesia Bangladesh from BDT 700/mo. 140+ AI avatars, 120+ languages. Corporate training, marketing, education. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/capcut-pro-bangladesh",
    title: `CapCut Pro Bangladesh — BDT 399/mo | ${SITE_NAME}`,
    description:
      "CapCut Pro Bangladesh from BDT 399/mo. AI video editing for TikTok, Reels, Shorts. Auto-captions, keyframe, 4K. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/pika-labs-bangladesh",
    title: `Pika Labs Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Pika Labs price in Bangladesh. Text-to-video AI generation. Pay with bKash/Nagad. Instant delivery.",
  },
  {
    path: "/opus-clip-bangladesh",
    title: `Opus Clip Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Opus Clip price in Bangladesh. AI video repurposing for Shorts, Reels, and TikTok. Pay with bKash/Nagad. Instant delivery.",
  },
  {
    path: "/descript-pro-bangladesh",
    title: `Descript Pro Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Descript Pro price in Bangladesh. AI video and podcast editing. Pay with bKash/Nagad. Instant delivery.",
  },

  // ── Brand pages — AI Voice & Music ────────────────────────────────────────
  {
    path: "/elevenlabs-bangladesh",
    title: `ElevenLabs Bangladesh — From BDT 748/mo | ${SITE_NAME}`,
    description:
      "ElevenLabs Bangladesh from BDT 748/mo. AI voice cloning, 3000+ voices, Bangla support. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/suno-ai-bangladesh",
    title: `Suno AI Bangladesh — From BDT 1,495/mo | ${SITE_NAME}`,
    description:
      "Suno AI Bangladesh from BDT 1,495/mo. AI music generation, 500 songs/mo, Bangla songs. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/udio-bangladesh",
    title: `Udio Pro Bangladesh — BDT 499/mo | ${SITE_NAME}`,
    description:
      "Udio Pro Bangladesh from BDT 499/mo. AI music generation, 1200 credits/mo, commercial use. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },
  {
    path: "/murf-ai-bangladesh",
    title: `Murf AI Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Murf AI price in Bangladesh. 120+ AI voices in 20+ languages. Text-to-speech studio. Pay with bKash/Nagad. Instant delivery.",
  },

  // ── Brand pages — AI Code ─────────────────────────────────────────────────
  {
    path: "/github-copilot-bangladesh",
    title: `GitHub Copilot Bangladesh — BDT 1,495/mo | ${SITE_NAME}`,
    description:
      "GitHub Copilot Bangladesh BDT 1,495/mo. AI code completion in VS Code & JetBrains. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/cursor-bangladesh",
    title: `Cursor Pro Bangladesh — From BDT 2,990/mo | ${SITE_NAME}`,
    description:
      "Cursor Pro Bangladesh from BDT 2,990/mo. AI-native IDE, agent mode, full codebase context. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/v0-dev-bangladesh",
    title: `v0.dev Pro Bangladesh — BDT 999/mo | ${SITE_NAME}`,
    description:
      "v0.dev Pro Bangladesh BDT 999/mo. AI UI builder by Vercel, React + Tailwind code. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },
  {
    path: "/replit-bangladesh",
    title: `Replit Core Bangladesh — BDT 500/mo | ${SITE_NAME}`,
    description:
      "Replit Core Bangladesh BDT 500/mo — 83% off. AI coding agent, cloud IDE, instant deploy. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/windsurf-bangladesh",
    title: `Windsurf Bangladesh — BDT 590/mo | ${SITE_NAME}`,
    description:
      "Windsurf Bangladesh from BDT 590/mo. AI-native IDE with cascade agent. 70+ languages. Autonomous coding, debugging. bKash/Nagad. AI Premium Shop.",
  },

  // ── Brand pages — AI Workspace ────────────────────────────────────────────
  {
    path: "/notion-business-bangladesh",
    title: `Notion Business Bangladesh — BDT 800/mo 73% Off | ${SITE_NAME}`,
    description:
      "Notion Business BDT 800/mo — 73% off. Notion AI, teamspaces, SSO. bKash/Nagad. 2-4hr delivery. AI Premium Shop.",
  },
  {
    path: "/manus-ai-bangladesh",
    title: `Manus AI Bangladesh — BDT 2,500/mo | ${SITE_NAME}`,
    description:
      "Manus AI Bangladesh BDT 2,500/mo. Autonomous AI agent, web browsing, data analysis, report writing. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/otter-ai-bangladesh",
    title: `Otter.ai Pro Bangladesh — BDT 799/mo | ${SITE_NAME}`,
    description:
      "Otter.ai Pro Bangladesh BDT 799/mo. AI meeting transcription, summaries, action items for Zoom & Meet. bKash/Nagad. AI Premium Shop.",
  },
  {
    path: "/gamma-bangladesh",
    title: `Gamma Plus Bangladesh — BDT 399/mo | ${SITE_NAME}`,
    description:
      "Gamma Plus Bangladesh BDT 399/mo. AI presentations, decks, websites from prompts. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },

  // ── Brand pages — AI Writing ──────────────────────────────────────────────
  {
    path: "/writesonic-bangladesh",
    title: `Writesonic Bangladesh — BDT 799/mo | ${SITE_NAME}`,
    description:
      "Writesonic Bangladesh BDT 799/mo. SEO blog posts, ad copy, product descriptions. bKash/Nagad. 5-30 min delivery. AI Premium Shop.",
  },
  {
    path: "/grammarly-premium-bangladesh",
    title: `Grammarly Premium Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Grammarly Premium price in Bangladesh. AI grammar, spelling, tone and clarity checking. Pay with bKash/Nagad. Instant delivery. 30-day warranty.",
  },
  {
    path: "/quillbot-premium-bangladesh",
    title: `QuillBot Premium Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "QuillBot Premium price in Bangladesh. AI paraphrasing, summarizing, grammar check, and plagiarism detection. Pay with bKash/Nagad. Instant delivery.",
  },
  {
    path: "/jasper-ai-bangladesh",
    title: `Jasper AI Bangladesh — Price in BDT | ${SITE_NAME}`,
    description:
      "Jasper AI price in Bangladesh. AI marketing copywriter for blogs, ads, and social media. Pay with bKash/Nagad. Instant delivery.",
  },

  // ── Guide pages ───────────────────────────────────────────────────────────
  {
    path: "/best-ai-for-students",
    title: `Best AI Tools for Students Bangladesh 2026 — From BDT 350`,
    description:
      "Best AI tools for students in Bangladesh 2026. Google AI BDT 500. ChatGPT BDT 350. Study smarter, write better, research faster.",
  },
  {
    path: "/best-ai-for-freelancers",
    title: `Best AI for Freelancers Bangladesh 2026`,
    description:
      "Best AI tools for freelancers Bangladesh 2026. Earn 44% more with AI. From BDT 350. Upwork & Fiverr.",
  },
  {
    path: "/best-ai-for-creators",
    title: `Best AI for Content Creators Bangladesh 2026`,
    description:
      "Best AI for content creators Bangladesh 2026. Script, thumbnail, music — all AI. From BDT 350.",
  },
  {
    path: "/best-ai-for-business",
    title: `Best AI for Business Bangladesh 2026`,
    description:
      "Best AI for business owners Bangladesh 2026. Automate sales, support, content. From BDT 500.",
  },
  {
    path: "/best-ai-for-developers",
    title: `Best AI Coding Tools Bangladesh 2026`,
    description:
      "Best AI coding tools Bangladesh 2026. Copilot, Cursor, Replit. Code 50% faster. From BDT 500.",
  },
  {
    path: "/best-ai-for-job-seekers",
    title: `Best AI for Job Seekers Bangladesh 2026`,
    description:
      "Best AI for job seekers Bangladesh 2026. CV builder, interview prep, skill roadmap. From BDT 350.",
  },
  {
    path: "/best-ai-for-designers",
    title: `Best AI for Designers Bangladesh 2026`,
    description:
      "Best AI design tools for designers in Bangladesh 2026. Midjourney, Ideogram, Leonardo AI. BDT prices.",
  },
  {
    path: "/best-ai-for-marketers",
    title: `Best AI for Digital Marketers Bangladesh 2026`,
    description:
      "Best AI tools for digital marketers in Bangladesh 2026. ChatGPT, Midjourney, Perplexity. BDT prices.",
  },
  {
    path: "/best-ai-for-ecommerce",
    title: `Best AI for E-commerce Bangladesh 2026`,
    description:
      "Best AI tools for e-commerce sellers in Bangladesh 2026. Product photos, descriptions, customer support AI.",
  },

  // ── Comparison pages ──────────────────────────────────────────────────────
  {
    path: "/chatgpt-vs-claude",
    title: `ChatGPT vs Claude Bangladesh 2026 — Which is Better?`,
    description:
      "ChatGPT vs Claude in Bangladesh 2026. Features, prices, which is better for writing, coding, research. AI Premium Shop.",
  },
  {
    path: "/chatgpt-vs-claude-bangladesh",
    title: `ChatGPT vs Claude Bangladesh 2026 — Which is Better?`,
    description:
      "ChatGPT vs Claude in Bangladesh 2026. Features, prices, which is better for writing, coding, research. AI Premium Shop.",
  },
  {
    path: "/chatgpt-vs-gemini",
    title: `ChatGPT vs Gemini Bangladesh 2026 — Full Comparison`,
    description:
      "ChatGPT vs Gemini in Bangladesh 2026. Full comparison with BDT prices. AI Premium Shop.",
  },
  {
    path: "/copilot-vs-cursor",
    title: `GitHub Copilot vs Cursor 2026 — Best AI Code Tool`,
    description:
      "GitHub Copilot vs Cursor 2026. Best AI code editor compared. Prices in BDT. AI Premium Shop.",
  },
  {
    path: "/midjourney-vs-ideogram",
    title: `Midjourney vs Ideogram 2026 — Best AI Image Tool`,
    description:
      "Midjourney vs Ideogram 2026 Bangladesh. Best AI image generator comparison with BDT prices. AI Premium Shop.",
  },

  // ── Budget pages ──────────────────────────────────────────────────────────
  {
    path: "/ai-under-500",
    title: `AI Tools Under BDT 500 — Cheapest Premium AI Bangladesh`,
    description:
      "AI tools under BDT 500 in Bangladesh. ChatGPT BDT 350, Google AI BDT 500. Cheapest premium AI subscriptions.",
  },
  {
    path: "/ai-under-1000",
    title: `AI Tools Under BDT 1000 — Budget AI Subscriptions BD`,
    description:
      "AI tools under BDT 1000 in Bangladesh. Claude, Notion, Perplexity & more. Budget AI tools.",
  },
  {
    path: "/ai-under-3000",
    title: `AI Tools Under BDT 3000 — Mid-Range AI Bangladesh`,
    description:
      "AI tools under BDT 3000 in Bangladesh. Personal accounts for pros. Mid-range AI subscriptions.",
  },
  {
    path: "/best-ai-budget-bangladesh",
    title: `AI Tools Under BDT 500 — Cheapest Premium AI Bangladesh`,
    description:
      "AI tools under BDT 500 in Bangladesh. ChatGPT BDT 350, Google AI BDT 500. Cheapest premium AI subscriptions.",
  },

  // ── Blog posts ────────────────────────────────────────────────────────────
  {
    path: "/blog/earn-money-with-ai-bangladesh",
    title: `How to Earn Money with AI in Bangladesh — 5 Proven Methods (2026) | ${SITE_NAME}`,
    description:
      "5 proven ways to earn BDT 20,000-100,000/mo with AI tools in Bangladesh. Freelancing, content, tutoring, automation. Start from BDT 350.",
  },
  {
    path: "/blog/ai-tools-university-students-bangladesh",
    title: `Best AI Tools for University Students Bangladesh 2026 | ${SITE_NAME}`,
    description:
      "Top AI tools for BD university students. Research, assignments, thesis, exam prep. From BDT 350/mo.",
  },
  {
    path: "/blog/pay-ai-tools-bkash-bangladesh",
    title: `How to Pay for AI Tools with bKash Bangladesh 2026 | ${SITE_NAME}`,
    description:
      "Buy ChatGPT, Claude, Midjourney with bKash or Nagad in Bangladesh. No credit card. 5-30 min delivery.",
  },
  {
    path: "/blog/chatgpt-plus-vs-free-bangladesh",
    title: `ChatGPT Plus vs Free — Worth BDT 350? Bangladesh Review | ${SITE_NAME}`,
    description:
      "Is ChatGPT Plus worth BDT 350/mo in Bangladesh? Honest comparison. GPT-5, DALL-E, agents, deep research.",
  },
  {
    path: "/blog/ai-freelancing-guide-bangladesh",
    title: `AI Freelancing Guide Bangladesh 2026 — Earn in 7 Days | ${SITE_NAME}`,
    description:
      "Start AI freelancing in Bangladesh in 7 days. Tools, platforms, pricing. Earn BDT 20,000+/mo.",
  },
  {
    path: "/blog/best-ai-tools-bangladesh-2026",
    title: `Best AI Tools in Bangladesh 2026: Complete Guide | ${SITE_NAME}`,
    description:
      "ChatGPT, Claude, Midjourney, and more. We rank every major AI tool by value, use case, and availability in Bangladesh.",
  },
  {
    path: "/blog/chatgpt-vs-claude-bangladesh",
    title: `ChatGPT vs Claude in Bangladesh 2026: Which is Better? | ${SITE_NAME}`,
    description:
      "Side-by-side comparison of ChatGPT Plus and Claude Pro for writing, coding, research, and everyday tasks.",
  },
  {
    path: "/blog/how-to-get-chatgpt-plus-bangladesh",
    title: `How to Get ChatGPT Plus in Bangladesh (No Visa Card Needed) | ${SITE_NAME}`,
    description:
      "Step-by-step guide to activating ChatGPT Plus in Bangladesh using bKash or Nagad — from BDT 350/month.",
  },
  {
    path: "/blog/ai-tools-for-freelancers-bangladesh",
    title: `5 AI Tools Every Bangladeshi Freelancer Needs in 2026 | ${SITE_NAME}`,
    description:
      "Freelancers using AI earn 44% more on average. Here are the 5 tools that pay for themselves fastest.",
  },
  {
    path: "/blog/midjourney-bangladesh-guide",
    title: `Midjourney in Bangladesh 2026: Full Guide + Pricing | ${SITE_NAME}`,
    description:
      "Everything you need to know about Midjourney in Bangladesh. Plans from BDT 1,199/mo.",
  },
  {
    path: "/blog/openai-codex-vs-claude-code-bangladesh-2026",
    title: `OpenAI Codex vs Claude Code in Bangladesh — April 2026 | ${SITE_NAME}`,
    description:
      "OpenAI Codex vs Claude Code for Bangladesh developers. Cursor and Replit comparison. What changed in 2026.",
  },
];

// Product detail routes — generated from products.json
// ProductPage.tsx resolves products by p.slug (not p.id), so we group by slug
// and use the lowest price variant for the description.
function buildProductRoutes() {
  try {
    const raw = fs.readFileSync(path.join(ROOT, "data", "products.json"), "utf8");
    const data = JSON.parse(raw);
    const products = Array.isArray(data) ? data : data.products ?? [];

    // Deduplicate by slug — keep the cheapest variant's price as the "from" price
    const bySlug = new Map();
    for (const p of products) {
      const slug = p.slug || p.id;
      if (!slug) continue;
      const existing = bySlug.get(slug);
      if (!existing || (p.price && p.price < existing.price)) {
        bySlug.set(slug, { slug, name: p.name, brand: p.brand, price: p.price });
      }
    }

    return Array.from(bySlug.values()).map(({ slug, name, brand, price }) => {
      const fromPrice = price ? `from BDT ${price.toLocaleString()}/mo` : "";
      const displayName = brand && !name.toLowerCase().includes(brand.toLowerCase())
        ? `${brand} — ${name}`
        : name;
      return {
        path: `/product/${slug}`,
        title: `${displayName} — ${fromPrice} Bangladesh | ${SITE_NAME}`,
        description: `Buy ${displayName} in Bangladesh ${fromPrice}. Pay with bKash/Nagad. Fast delivery. 30-day warranty. AI Premium Shop.`,
      };
    });
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// HTML injection
// ---------------------------------------------------------------------------

function escHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html, { title, description, canonical, ogImage = DEFAULT_OG }) {
  const t = escHtml(title);
  const d = escHtml(description);
  const img = escHtml(ogImage);

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${d}" />`)
    .replace(/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url"[^>]*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*\/?>/, `<meta property="og:title" content="${t}" />`)
    .replace(/<meta property="og:description"[^>]*\/?>/, `<meta property="og:description" content="${d}" />`)
    .replace(/<meta property="og:image"[^>]*\/?>/, `<meta property="og:image" content="${img}" />`)
    .replace(/<meta name="twitter:title"[^>]*\/?>/, `<meta name="twitter:title" content="${t}" />`)
    .replace(/<meta name="twitter:description"[^>]*\/?>/, `<meta name="twitter:description" content="${d}" />`)
    .replace(/<meta name="twitter:image"[^>]*\/?>/, `<meta name="twitter:image" content="${img}" />`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(TEMPLATE)) {
    console.error(`[prerender] Template not found: ${TEMPLATE}`);
    console.error("[prerender] Run 'vite build' first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(TEMPLATE, "utf8");
  const allRoutes = [...ROUTES, ...buildProductRoutes()];
  let written = 0;
  let skipped = 0;

  for (const route of allRoutes) {
    const canonical = `${SITE}${route.path}`;
    const injected = injectMeta(baseHtml, {
      title: route.title,
      description: route.description,
      canonical,
      ogImage: route.ogImage,
    });

    // Write to dist/public/<path>/index.html
    const outDir = path.join(DIST, ...route.path.split("/").filter(Boolean));
    const outFile = path.join(outDir, "index.html");

    try {
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outFile, injected, "utf8");
      written++;
    } catch (err) {
      console.error(`[prerender] Failed to write ${outFile}: ${err.message}`);
      skipped++;
    }
  }

  console.log(
    `[prerender] Done — ${written} routes pre-rendered, ${skipped} skipped.`
  );
}

main();
