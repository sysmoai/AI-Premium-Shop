import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ChevronDown, ChevronRight, MessageCircle, CheckCircle, ArrowRight,
  GraduationCap, Laptop, Camera, Briefcase, Code2, Search,
  Palette, TrendingUp, ShoppingBag, type LucideIcon,
} from "lucide-react";
import { Link } from "wouter";

import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { faqSchema, schemaJson } from "@/utils/schemas";

const WHATSAPP = "https://wa.me/8801865385348";

const GUIDE_ICONS: Record<string, { Icon: LucideIcon; color: string }> = {
  students:      { Icon: GraduationCap, color: "#4285f4" },
  freelancers:   { Icon: Laptop,        color: "#10a37f" },
  creators:      { Icon: Camera,        color: "#ec4899" },
  business:      { Icon: Briefcase,     color: "#f4b942" },
  developers:    { Icon: Code2,         color: "#8b5cf6" },
  "job-seekers": { Icon: Search,        color: "#6366f1" },
  designers:     { Icon: Palette,       color: "#a855f7" },
  marketers:     { Icon: TrendingUp,    color: "#4285f4" },
  ecommerce:     { Icon: ShoppingBag,   color: "#f4b942" },
};

const GUIDE_GLOWS: Record<string, string> = {
  students:      "bg-blue-500/[0.06]",
  freelancers:   "bg-emerald-500/[0.06]",
  creators:      "bg-pink-500/[0.06]",
  business:      "bg-amber-500/[0.06]",
  developers:    "bg-purple-500/[0.06]",
  "job-seekers": "bg-indigo-500/[0.06]",
  designers:     "bg-violet-500/[0.06]",
  marketers:     "bg-blue-500/[0.06]",
  ecommerce:     "bg-amber-500/[0.06]",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08, ease: [0, 0, 0.2, 1] } }),
};

interface Tool {
  rank: number;
  name: string;
  price: string;
  reason: string;
  badge?: string;
  color?: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface GuideConfig {
  slug: string;
  title: string;
  h1: string;
  subtitle: string;
  aioSnippet: string;
  metaDescription: string;
  canonical: string;
  whyHeading: string;
  whyText: string;
  statLine?: string;
  tools: Tool[];
  startHere: { name: string; price: string; reason: string };
  faqs: FAQ[];
  accentColor: string;
  emoji: string;
  alsoRead: { label: string; href: string }[];
  comparison?: { label: string; href: string };
}

const TOOL_BRAND_SLUGS: Record<string, string> = {
  "ChatGPT": "/chatgpt-plans-bangladesh",
  "ChatGPT Plus": "/chatgpt-plans-bangladesh",
  "ChatGPT Plus — Starter Shared": "/chatgpt-plans-bangladesh",
  "ChatGPT Plus — Premium Shared": "/chatgpt-plans-bangladesh",
  "ChatGPT Team": "/chatgpt-business-bangladesh",
  "Claude": "/claude-pro-bangladesh",
  "Claude Pro": "/claude-pro-bangladesh",
  "Claude Pro — Premium Shared": "/claude-pro-bangladesh",
  "Claude Pro — Personal": "/claude-pro-bangladesh",
  "Google AI Pro": "/gemini-advanced-bangladesh",
  "Midjourney": "/midjourney-bangladesh",
  "Midjourney — Standard Shared": "/midjourney-bangladesh",
  "GitHub Copilot Pro": "/github-copilot-bangladesh",
  "Cursor Pro": "/cursor-bangladesh",
  "ElevenLabs": "/elevenlabs-bangladesh",
  "ElevenLabs — Starter Plan": "/elevenlabs-bangladesh",
  "Suno AI — Pro Plan": "/suno-ai-bangladesh",
  "Runway — Standard Plan": "/runway-bangladesh",
  "Notion AI — Plus Plan": "/notion-business-bangladesh",
  "Replit": "/replit-bangladesh",
  "v0.dev Pro — Shared": "/v0-dev-bangladesh",
  "Perplexity Pro": "/perplexity-pro-bangladesh",
  "Perplexity Pro — Shared": "/perplexity-pro-bangladesh",
  "Grok": "/supergrok-bangladesh",
};

const GUIDES: Record<string, GuideConfig> = {
  students: {
    slug: "best-ai-for-students",
    title: "Best AI Tools for Students Bangladesh 2026",
    h1: "Best AI Tools for Students in Bangladesh 2026",
    subtitle: "Write better papers. Study smarter. Ace your exams.",
    aioSnippet: "The best AI tools for students in Bangladesh in 2026 are Google AI Pro (BDT 500/mo) for Gmail and Docs integration, ChatGPT Plus Shared (BDT 350/mo) for writing and coding assignments, and Perplexity Pro Shared (BDT 350/mo) for research with cited sources. No international credit card needed — pay with bKash or Nagad and receive access in 5–30 minutes via WhatsApp.",
    metaDescription: "Best AI tools for students in Bangladesh 2026. Google AI BDT 500. ChatGPT BDT 350. Study smarter.",
    canonical: "https://aipremiumshop.com/best-ai-for-students",
    whyHeading: "Why AI Matters for Students",
    whyText: "AI tools have become essential study companions — like having a tutor available at 2 AM. Whether you're writing research papers, solving math problems, debugging code assignments, or preparing for exams, AI accelerates learning significantly. Students who use AI tools consistently report submitting higher-quality work in less time. The best part: you can access the same tools used by university students in the US and UK — at Bangladesh prices.",
    tools: [
      { rank: 1, name: "Google AI Pro", price: "BDT 500/mo", reason: "Best value. Deep Research for papers, 2TB storage, works with Gmail and Google Docs. 83% off official price.", badge: "Best Value", color: "#4285f4" },
      { rank: 2, name: "ChatGPT Plus — Starter Shared", price: "BDT 350/mo", reason: "Cheapest way to access GPT-5.4. Great for assignments, essays, coding, and exam prep.", badge: "Cheapest", color: "#10a37f" },
      { rank: 3, name: "Perplexity Pro — Shared", price: "BDT 350/mo", reason: "AI research engine with real citations and source links. Perfect for thesis and academic papers.", badge: "For Research", color: "#20b2aa" },
    ],
    startHere: {
      name: "ChatGPT Plus — Starter Shared",
      price: "BDT 350/mo",
      reason: "The most affordable AI tool in our catalog. Access GPT-5.4 for writing, coding, and research. Delivered in 5–30 minutes via bKash or Nagad.",
    },
    faqs: [
      { q: "Is AI allowed for university assignments?", a: "AI is a study tool, like a calculator. Use it to research, draft, and learn — but always submit your own work. Most universities allow AI as a research aid. Check your institution's specific policy on AI-assisted writing." },
      { q: "Which is cheaper — ChatGPT or Google AI Pro?", a: "ChatGPT Plus Shared is BDT 350. Google AI Pro is BDT 500 but includes 2TB storage, Workspace AI, and more features. If you use Gmail and Google Docs, Google AI Pro is better value." },
      { q: "Can I use these for coding assignments?", a: "Yes. Both ChatGPT and Google AI Pro can write, debug, and explain code in any programming language — Python, Java, C++, JavaScript, and more." },
      { q: "Do I need a credit card?", a: "No. Pay with bKash or Nagad. No international card or bank account needed. We deliver directly to your WhatsApp after payment." },
    ],
    accentColor: "#4285f4",
    emoji: "🎓",
    alsoRead: [
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Job Seekers", href: "/best-ai-for-job-seekers" },
    ],
    comparison: { label: "ChatGPT vs Google Gemini — which is better for study?", href: "/chatgpt-vs-gemini" },
  },
  freelancers: {
    slug: "best-ai-for-freelancers",
    title: "Best AI Tools for Freelancers Bangladesh 2026",
    h1: "Best AI Tools for Freelancers in Bangladesh 2026",
    subtitle: "Win more clients. Deliver faster. Earn more.",
    aioSnippet: "The top AI tools for freelancers in Bangladesh 2026 are ChatGPT Plus Premium Shared (BDT 950/mo) for proposals and content delivery, Claude Pro Premium Shared (BDT 1,495/mo) for writing quality, and Midjourney Standard Shared (BDT 1,199/mo) for client graphics. Freelancers using AI earn 44% more on average (Upwork 2025). Order any tool via WhatsApp and pay with bKash or Nagad.",
    metaDescription: "Best AI tools for freelancers Bangladesh 2026. Earn 44% more with AI. From BDT 350. Upwork & Fiverr.",
    canonical: "https://aipremiumshop.com/best-ai-for-freelancers",
    whyHeading: "Why AI is a Freelancer's Competitive Advantage",
    whyText: "Freelancers who use AI tools earn 44% more on average (Upwork 2025 Report). AI tools let you write proposals faster, deliver projects on tighter deadlines, and take on more clients simultaneously. Whether you're a writer, designer, developer, or marketer, AI multiplies your output without multiplying your hours. These tools pay for themselves with your first client win.",
    statLine: "Freelancers who use AI earn 44% more on average — Upwork 2025 Report",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Premium Shared", price: "BDT 950/mo", reason: "Write proposals, emails, and content 10x faster. Higher stability than starter plan.", badge: "Top Pick", color: "#10a37f" },
      { rank: 2, name: "Claude Pro — Premium Shared", price: "BDT 1,495/mo", reason: "#1 ranked AI for writing quality. Extended thinking for complex client projects.", badge: "Best Writing", color: "#d97706" },
      { rank: 3, name: "Midjourney — Standard Shared", price: "BDT 1,199/mo", reason: "Create client graphics, thumbnails, and mockups. Unlimited image generation.", badge: "For Design", color: "#8b5cf6" },
      { rank: 4, name: "GitHub Copilot Pro — Individual", price: "BDT 1,495/mo", reason: "For developer freelancers. Code 50% faster. Works in VS Code and JetBrains.", badge: "For Devs", color: "#6e40c9" },
    ],
    startHere: {
      name: "ChatGPT Plus — Starter Shared",
      price: "BDT 350/mo",
      reason: "Start with the essentials. Use ChatGPT to write proposals, respond to clients, and draft content. Upgrade to Premium Shared once you've landed your first clients.",
    },
    faqs: [
      { q: "Which AI tool is best for writing client proposals?", a: "ChatGPT Plus and Claude Pro are both excellent for proposals. Claude Pro has slightly better writing quality, while ChatGPT is better for proposals that require research or data." },
      { q: "Can I use AI-generated content for client work?", a: "Most clients allow AI-assisted work as long as the final deliverable meets their quality standards. Always review and edit AI outputs. Disclose AI usage if your client contract requires it." },
      { q: "How much can I save compared to direct subscriptions?", a: "Significantly. ChatGPT Plus costs $20/month officially (≈BDT 2,400 with exchange and fees). With AIPS you pay BDT 350–950 depending on the plan — saving 60–85%." },
      { q: "Can I get multiple tools at a discount?", a: "Yes. Message us on WhatsApp about bundle pricing. We offer package discounts when you take multiple subscriptions together." },
    ],
    accentColor: "#10a37f",
    emoji: "💼",
    alsoRead: [
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
    ],
    comparison: { label: "ChatGPT vs Claude — which writes better proposals?", href: "/chatgpt-vs-claude" },
  },
  creators: {
    slug: "best-ai-for-creators",
    title: "Best AI for Content Creators Bangladesh 2026",
    h1: "Best AI Tools for Content Creators in Bangladesh 2026",
    subtitle: "Create faster. Edit smarter. Grow your audience.",
    aioSnippet: "The best AI tools for content creators in Bangladesh 2026 are ChatGPT Plus (BDT 950/mo) for scripting, Midjourney Standard Shared (BDT 1,199/mo) for thumbnails, ElevenLabs (BDT 748/mo) for voiceovers, and Suno AI Pro (BDT 1,495/mo) for copyright-free music. All accessible via bKash or Nagad payment through WhatsApp — no international card required.",
    metaDescription: "Best AI for content creators Bangladesh 2026. Script, thumbnail, music — all AI. From BDT 350.",
    canonical: "https://aipremiumshop.com/best-ai-for-creators",
    whyHeading: "Why AI is a Creator's Superpower",
    whyText: "Content creation in 2026 is an arms race. YouTube channels, TikTok accounts, and social media pages that use AI produce more content, at higher quality, with less burnout. AI handles the repetitive parts — writing captions, generating thumbnails, creating voiceovers, composing background music — so you can focus on strategy and audience connection. Creators who adopted AI tools in 2024 grew their channels 3x faster on average.",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Premium Shared", price: "BDT 950/mo", reason: "Scripts, captions, content calendars, viral hooks — all in minutes.", badge: "For Scripts", color: "#10a37f" },
      { rank: 2, name: "Midjourney — Standard Shared", price: "BDT 1,199/mo", reason: "AI thumbnails and graphics without hiring a designer. Unlimited generations.", badge: "For Thumbnails", color: "#8b5cf6" },
      { rank: 3, name: "ElevenLabs — Starter Plan", price: "BDT 748/mo", reason: "Ultra-realistic AI voiceovers. Clone your own voice. Supports 29 languages.", badge: "For Voiceovers", color: "#f97316" },
      { rank: 4, name: "Suno AI — Pro Plan", price: "BDT 1,495/mo", reason: "Create background music and jingles with no copyright issues. Commercial use included.", badge: "For Music", color: "#f59e0b" },
      { rank: 5, name: "Runway — Standard Plan", price: "BDT 1,794/mo", reason: "AI video generation. B-roll, transitions, cinematic effects from text prompts.", badge: "For Video", color: "#ec4899" },
    ],
    startHere: {
      name: "ChatGPT Plus — Starter Shared",
      price: "BDT 350/mo",
      reason: "Start with ChatGPT for content planning, scripts, and captions. Then add Midjourney for thumbnails when you're ready to upgrade your visual game.",
    },
    faqs: [
      { q: "Which AI tool should YouTubers start with?", a: "Start with ChatGPT for scripting and SEO titles. Then add Midjourney for thumbnails. Together they handle 80% of the creative process for around BDT 1,300/mo." },
      { q: "Is AI-generated music copyright safe for YouTube?", a: "Suno AI Pro includes commercial use licensing. Music generated on the Pro plan can be used on YouTube, TikTok, and other platforms without copyright strikes." },
      { q: "Can I clone my own voice with ElevenLabs?", a: "Yes. ElevenLabs Starter allows voice cloning. You record a short sample and it generates your voice reading any text — useful for multilingual content or saving time on voiceovers." },
      { q: "Can I use AI-generated thumbnails for YouTube monetization?", a: "Yes. AI-generated thumbnails are allowed on YouTube and do not affect monetization eligibility. Midjourney images are commercially licensed on paid plans." },
    ],
    accentColor: "#ec4899",
    emoji: "🎬",
    alsoRead: [
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
    ],
    comparison: { label: "ChatGPT vs Claude — best AI for creative work", href: "/chatgpt-vs-claude" },
  },
  business: {
    slug: "best-ai-for-business",
    title: "Best AI for Business & SME Bangladesh 2026",
    h1: "Best AI Tools for Business Owners in Bangladesh 2026",
    subtitle: "Automate operations. Cut costs. Scale faster.",
    aioSnippet: "The top AI tools for business owners in Bangladesh 2026 are Google AI Pro (BDT 500/mo) for Gmail and Google Workspace AI, ChatGPT Team (BDT 1,200/mo) for team operations with admin controls, and Claude Pro (BDT 1,495/mo) for contracts and business documents. AI reduces operational costs by 30–40%. Pay with bKash or Nagad — no international card required.",
    metaDescription: "Best AI for business owners Bangladesh 2026. Automate sales, support, content. From BDT 500.",
    canonical: "https://aipremiumshop.com/best-ai-for-business",
    whyHeading: "Why Businesses in Bangladesh Are Adopting AI Now",
    whyText: "AI is no longer a luxury for large corporations. Small and medium businesses in Bangladesh are using AI to draft contracts, analyze sales data, manage customer communications, and run marketing campaigns — all at a fraction of the cost of hiring specialists. Businesses that adopt AI tools reduce operational costs by 30–40% while increasing output quality. The window to get ahead of competitors who haven't adopted AI yet is closing fast.",
    tools: [
      { rank: 1, name: "Google AI Pro", price: "BDT 500/mo", reason: "Gmail AI, Google Docs AI, Sheets AI — AI built into tools your team already uses daily.", badge: "Best for Teams", color: "#4285f4" },
      { rank: 2, name: "ChatGPT Team", price: "BDT 1,200/mo", reason: "Team AI assistant with admin controls and privacy. Unlimited GPT-5.4 for the whole team.", badge: "For Operations", color: "#10a37f" },
      { rank: 3, name: "Notion AI — Plus Plan", price: "BDT 550/mo", reason: "AI workspace for docs, projects, SOPs, and team collaboration. Replaces multiple tools.", badge: "For Docs", color: "#000000" },
      { rank: 4, name: "Claude Pro — Premium Shared", price: "BDT 1,495/mo", reason: "Best AI for drafting contracts, reports, and long-form business documents.", badge: "For Writing", color: "#d97706" },
    ],
    startHere: {
      name: "Google AI Pro",
      price: "BDT 500/mo",
      reason: "The best-value AI upgrade for any business that uses Gmail, Google Docs, or Google Sheets. Get AI assistance in every tool your team already uses — for BDT 500.",
    },
    faqs: [
      { q: "Can multiple team members share one subscription?", a: "Shared accounts are used by one person at a time. For teams, we recommend individual subscriptions per member, or the ChatGPT Team plan which is designed for multi-user access with admin controls." },
      { q: "How can AI help reduce business costs?", a: "AI can replace or reduce spending on content writing, graphic design, customer support responses, data analysis, and market research. Most businesses recover the subscription cost within the first month." },
      { q: "Is our business data safe with AI tools?", a: "ChatGPT Team and Notion Business do not use your data for model training. Google AI Pro with Workspace follows Google's enterprise data policies. For sensitive data, always use private account plans." },
      { q: "Do you offer bulk pricing for multiple seats?", a: "Yes. Message us on WhatsApp with your team size and we'll provide custom bundle pricing for multiple subscriptions." },
    ],
    accentColor: "#4285f4",
    emoji: "🏢",
    alsoRead: [
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Developers", href: "/best-ai-for-developers" },
    ],
    comparison: { label: "ChatGPT vs Google Gemini for business use", href: "/chatgpt-vs-gemini" },
  },
  developers: {
    slug: "best-ai-for-developers",
    title: "Best AI Coding Tools for Developers Bangladesh 2026",
    h1: "Best AI Coding Tools for Developers in Bangladesh 2026",
    subtitle: "Code faster. Debug instantly. Ship on time.",
    aioSnippet: "The best AI coding tools for developers in Bangladesh 2026 are GitHub Copilot Pro (BDT 1,495/mo) for IDE integration with zero workflow changes, Cursor Pro (BDT 2,990/mo) for full AI-native agent-mode coding, and Claude Pro Personal (BDT 2,990/mo) for complex reasoning and debugging. GitHub Copilot reduces coding time by 55%. Order via WhatsApp — pay with bKash.",
    metaDescription: "Best AI coding tools Bangladesh 2026. Copilot, Cursor, Replit. Code 50% faster. From BDT 500.",
    canonical: "https://aipremiumshop.com/best-ai-for-developers",
    whyHeading: "Why Developers Need AI Coding Tools in 2026",
    whyText: "AI coding assistants have changed what's possible for individual developers. GitHub Copilot reduces coding time by 55% according to GitHub's own research. Cursor's agent mode can write entire features from a single prompt. Claude Code can debug complex multi-file issues that would take hours manually. Developers who invest in AI tools are shipping products faster, catching bugs earlier, and competing with teams twice their size.",
    statLine: "GitHub Copilot reduces coding time by 55% — GitHub Developer Productivity Report",
    tools: [
      { rank: 1, name: "GitHub Copilot Pro", price: "BDT 1,495/mo", reason: "Unlimited code completions. Works in VS Code, JetBrains, Neovim. Industry standard.", badge: "Industry Standard", color: "#6e40c9" },
      { rank: 2, name: "Cursor Pro", price: "BDT 2,990/mo", reason: "AI-native editor with agent mode. Used by engineers at OpenAI, Stripe, and Figma.", badge: "AI-Native Editor", color: "#3b82f6" },
      { rank: 3, name: "Claude Pro — Personal", price: "BDT 2,990/mo", reason: "#1 ranked AI for reasoning. Claude Code terminal for complex debugging and architecture decisions.", badge: "For Reasoning", color: "#d97706" },
      { rank: 4, name: "v0.dev Pro — Shared", price: "BDT 999/mo", reason: "AI web app builder by Vercel. Build UIs, apps, and sites from prompts and deploy instantly.", badge: "UI Builder", color: "#111827" },
    ],
    startHere: {
      name: "GitHub Copilot Pro",
      price: "BDT 1,495/mo",
      reason: "The safest starting point. Works inside your existing IDE (VS Code or JetBrains) with zero workflow changes. Industry-proven, with access to GPT-5.4 and Claude models.",
    },
    faqs: [
      { q: "Cursor or GitHub Copilot — which should I choose?", a: "GitHub Copilot is better if you want AI assistance inside your existing editor without changing workflows. Cursor is better if you want the most powerful AI coding experience with agent mode and codebase-wide understanding. Many developers use both." },
      { q: "Does Copilot work with JetBrains IDEs?", a: "Yes. GitHub Copilot works in VS Code, JetBrains (IntelliJ, PyCharm, WebStorm, etc.), Neovim, and Visual Studio. The plugin is available from each IDE's marketplace." },
      { q: "Which AI is best for debugging complex code?", a: "Claude Pro is the best for complex reasoning and debugging. Its 200K token context window means you can paste entire files or multiple files at once for analysis." },
      { q: "Can I use these tools for commercial projects?", a: "Yes. All tools are licensed for commercial use on paid plans. GitHub Copilot Individual and Cursor Pro both include commercial use rights." },
    ],
    accentColor: "#6e40c9",
    emoji: "💻",
    alsoRead: [
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
    ],
    comparison: { label: "GitHub Copilot vs Cursor — full comparison", href: "/copilot-vs-cursor" },
  },
  "job-seekers": {
    slug: "best-ai-for-job-seekers",
    title: "Best AI Tools for Job Seekers Bangladesh 2026",
    h1: "Best AI Tools for Job Seekers in Bangladesh 2026",
    subtitle: "Build a winning CV. Ace interviews. Land the job.",
    aioSnippet: "The best AI tools for job seekers in Bangladesh 2026 are ChatGPT Plus Starter Shared (BDT 350/mo) for CVs and cover letters, Google AI Pro (BDT 500/mo) for Gmail-integrated job applications, and Perplexity Pro (BDT 350/mo) for researching companies before interviews. Starting at just BDT 350/mo — one job offer pays back months of subscription. Pay with bKash via WhatsApp.",
    metaDescription: "Best AI for job seekers Bangladesh 2026. CV builder, interview prep, skill roadmap. From BDT 350.",
    canonical: "https://aipremiumshop.com/best-ai-for-job-seekers",
    whyHeading: "Why AI Gives Job Seekers an Edge",
    whyText: "Job hunting in Bangladesh has never been more competitive. AI tools help you write stronger CVs, craft personalized cover letters, research companies before interviews, and practice answering difficult questions. Candidates who use AI to prepare their applications consistently report more callbacks and better interview performance. The best part: you can tailor your application to each job in minutes instead of hours.",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Starter Shared", price: "BDT 350/mo", reason: "Write professional CVs, cover letters, and LinkedIn summaries in minutes. Most affordable option.", badge: "Start Here", color: "#10a37f" },
      { rank: 2, name: "Google AI Pro", price: "BDT 500/mo", reason: "Gmail AI for job applications. Google Docs AI for CV formatting. 2TB storage included.", badge: "Best Value", color: "#4285f4" },
      { rank: 3, name: "Perplexity Pro — Shared", price: "BDT 350/mo", reason: "Research companies before interviews. Get industry insights with citations and sources.", badge: "For Research", color: "#20b2aa" },
    ],
    startHere: {
      name: "ChatGPT Plus — Starter Shared",
      price: "BDT 350/mo",
      reason: "At BDT 350, this is the best investment for your job search. Use it to write and refine your CV, draft cover letters, practice interview questions, and research companies. One job offer pays back months of subscription.",
    },
    faqs: [
      { q: "Can AI write my CV for me?", a: "Yes. ChatGPT and Google AI Pro can generate a professional CV from bullet points you provide. You input your experience and skills, and AI formats it into a polished, ATS-friendly document. Always review and personalize before sending." },
      { q: "How do I use AI to prepare for interviews?", a: "Ask ChatGPT to role-play as an interviewer for your target role. It will ask you industry-standard questions and give feedback on your answers. Also ask it to generate likely technical questions for your specific job and field." },
      { q: "Can Perplexity help me research a company before an interview?", a: "Yes. Perplexity Pro gives you real-time web search with cited sources. Ask it about the company's recent news, products, culture, and common interview questions — it'll compile everything with links you can verify." },
      { q: "Is BDT 350 worth it just for a job search?", a: "Absolutely. One successful application from an AI-improved CV pays back months of subscription. Students and fresh graduates consistently report significantly more interview callbacks after using AI to upgrade their application materials." },
    ],
    accentColor: "#20b2aa",
    emoji: "🎯",
    alsoRead: [
      { label: "Best AI for Students", href: "/best-ai-for-students" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
    ],
    comparison: { label: "ChatGPT vs Google Gemini — which is easier to start with?", href: "/chatgpt-vs-gemini" },
  },
  "designers": {
    slug: "best-ai-for-designers",
    title: "Best AI Design Tools Bangladesh 2026",
    h1: "Best AI Tools for Designers in Bangladesh 2026",
    subtitle: "Generate stunning visuals. Cut design time in half. Win more clients.",
    aioSnippet: "The best AI design tools for designers in Bangladesh in 2026 are Midjourney Standard Shared (BDT 1,199/mo) for photorealistic and artistic image generation, Ideogram (from BDT 2,990/mo) for typography and text-in-image design, and Leonardo AI (from BDT 599/mo) for 3D textures and character design. All available via bKash — no international card needed.",
    metaDescription: "Best AI design tools for designers in Bangladesh 2026. Midjourney, Ideogram, Leonardo AI. BDT prices.",
    canonical: "https://aipremiumshop.com/best-ai-for-designers",
    whyHeading: "Why Every Designer Needs AI in 2026",
    whyText: "AI image generation has fundamentally changed design workflows. Designers who use Midjourney, Ideogram, and Leonardo AI report cutting concept creation time by 70-80%. Generate mood boards in minutes, create client presentations faster, and produce stunning visuals without photography budgets. The top design freelancers on Fiverr and 99designs now use AI as part of every project workflow.",
    statLine: "Designers using AI tools report 70% faster concept creation — Adobe 2025 Creative Trends Report",
    tools: [
      { rank: 1, name: "Midjourney — Standard Shared", price: "BDT 1,199/mo", reason: "The gold standard for AI image quality. Photorealistic portraits, product renders, artistic illustrations — no other tool matches its output. 15hr fast GPU + unlimited relaxed mode.", badge: "Best Quality", color: "#8b5cf6" },
      { rank: 2, name: "Ideogram", price: "from BDT 2,990/mo", reason: "The only AI that reliably renders text inside images. Perfect for logos, posters, social media graphics, and typography-heavy designs. 400 priority images/month.", badge: "Best for Text & Logos", color: "#ec4899" },
      { rank: 3, name: "Leonardo AI", price: "from BDT 599/mo", reason: "Budget image generation with strong 3D textures, character consistency, and motion effects. Great for game assets, product visuals, and UI design concepts.", badge: "Best Budget Option", color: "#f97316" },
      { rank: 4, name: "ChatGPT Plus — Starter Shared", price: "BDT 350/mo", reason: "Use AI to write design briefs, generate image prompts, write client emails, and research trends. The DALL-E image generation is also included.", badge: "For Workflow", color: "#10a37f" },
    ],
    startHere: {
      name: "Midjourney — Standard Shared",
      price: "BDT 1,199/mo",
      reason: "Midjourney produces the highest quality AI images available. Generate unlimited concepts for clients at BDT 1,199/month — far cheaper than any stock photography subscription. Delivered in 5–30 minutes via WhatsApp.",
    },
    faqs: [
      { q: "Which AI image tool is best for logo design?", a: "Ideogram is the best choice for logos and text-heavy designs. It renders text accurately inside images — which Midjourney struggles with. For logos with typography, start with Ideogram. For abstract logos and brand visuals, Midjourney produces better artistic results." },
      { q: "Can I use AI-generated images for client work commercially?", a: "Yes. Midjourney Standard plans and above include commercial use rights. Ideogram Pro includes commercial use. Leonardo AI Apprentice plan also includes commercial use. Always use these on paid plans for commercial client work." },
      { q: "Is Leonardo AI good enough compared to Midjourney?", a: "Leonardo AI is excellent for 3D textures, character consistency (same character in multiple images), and budget-conscious projects. Midjourney still produces better overall photorealistic and artistic quality. Many designers use both for different types of projects." },
      { q: "How fast is image generation?", a: "Midjourney Standard Shared: 1-2 minutes for fast mode, 5-15 minutes for relaxed mode. Ideogram: 30-60 seconds per image. Delivery of your account after ordering: 5-30 minutes via WhatsApp." },
    ],
    accentColor: "#8b5cf6",
    emoji: "🎨",
    alsoRead: [
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Marketers", href: "/best-ai-for-marketers" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
    ],
    comparison: { label: "Midjourney vs Ideogram — which is better for design?", href: "/midjourney-vs-ideogram" },
  },
  "marketers": {
    slug: "best-ai-for-marketers",
    title: "Best AI for Digital Marketing Bangladesh 2026",
    h1: "Best AI Tools for Digital Marketers in Bangladesh 2026",
    subtitle: "Write better copy. Create stunning visuals. Research faster.",
    aioSnippet: "The best AI tools for digital marketers in Bangladesh in 2026 are ChatGPT Plus Shared (BDT 350/mo) for ad copy and social captions, Midjourney Standard Shared (BDT 1,199/mo) for visual content creation, and Perplexity Pro Shared (BDT 350/mo) for competitor research with real citations. Total: BDT 1,899/mo for a complete marketing AI stack — pay with bKash or Nagad, no international card required.",
    metaDescription: "Best AI tools for digital marketers in Bangladesh 2026. ChatGPT, Midjourney, Perplexity. BDT prices.",
    canonical: "https://aipremiumshop.com/best-ai-for-marketers",
    whyHeading: "Why AI is Non-Negotiable for Marketers in 2026",
    whyText: "Digital marketing in 2026 is a speed game. AI tools let marketers produce a week's worth of content in a single afternoon. Write Facebook ads, generate Instagram visuals, research competitor strategies, draft email sequences, and analyze campaign performance — all with AI. Marketers who adopt AI consistently outperform those who don't, regardless of budget. The tools that used to cost thousands of dollars are now available from BDT 350/month.",
    statLine: "Marketers using AI tools save 5+ hours per week on content creation — HubSpot 2026 Marketing Report",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Starter Shared", price: "BDT 350/mo", reason: "The essential marketing copywriter. Write ad copy, email campaigns, social media captions, blog posts, and product descriptions. Fastest and cheapest AI tool available.", badge: "Essential", color: "#10a37f" },
      { rank: 2, name: "Midjourney — Standard Shared", price: "BDT 1,199/mo", reason: "Generate professional marketing visuals — social media graphics, product mockups, campaign imagery — without a photographer or designer. 15hr fast GPU monthly.", badge: "For Visuals", color: "#8b5cf6" },
      { rank: 3, name: "Perplexity Pro — Shared", price: "BDT 350/mo", reason: "AI-powered market research with real-time citations. Research competitor strategies, industry trends, and consumer behavior in minutes — with source links you can verify.", badge: "For Research", color: "#20b2aa" },
      { rank: 4, name: "Claude Pro — Premium Shared", price: "BDT 1,495/mo", reason: "Best AI for long-form marketing content. Blog posts, whitepapers, case studies, and email sequences with higher writing quality than ChatGPT.", badge: "For Long-form", color: "#d97706" },
    ],
    startHere: {
      name: "ChatGPT Plus — Starter Shared",
      price: "BDT 350/mo",
      reason: "Start with ChatGPT Plus at BDT 350 — the most versatile marketing AI available. Use it for copy, research, strategy, and daily content. When you're ready to scale visuals, add Midjourney.",
    },
    faqs: [
      { q: "Can AI write Facebook and Google Ads?", a: "Yes. ChatGPT is excellent at writing ad copy with specific character limits, calls-to-action, and emotional hooks. Give it your product, target audience, and goals, and it will generate multiple variations in seconds." },
      { q: "Which AI is best for creating social media content?", a: "ChatGPT for captions, hashtags, and written content. Midjourney for visuals and graphics. Together they form a complete social media content creation stack for under BDT 1,600/month." },
      { q: "How can AI help with SEO content?", a: "Claude Pro is the best AI for writing long-form SEO content. It produces more natural, human-sounding articles that rank well. For keyword research and competitor analysis, use Perplexity Pro — it gives real-time data with citations." },
      { q: "Can AI replace a marketing agency?", a: "AI dramatically reduces the need for external agencies for content, copywriting, and basic design. However, strategy, media buying, and campaign management still benefit from human expertise. AI augments marketers — it doesn't replace strategy." },
    ],
    accentColor: "#ec4899",
    emoji: "📈",
    alsoRead: [
      { label: "Best AI for Business Owners", href: "/best-ai-for-business" },
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Designers", href: "/best-ai-for-designers" },
    ],
    comparison: { label: "ChatGPT vs Claude — which writes better marketing copy?", href: "/chatgpt-vs-claude" },
  },
  "ecommerce": {
    slug: "best-ai-for-ecommerce",
    title: "Best AI for E-commerce Sellers Bangladesh 2026",
    h1: "Best AI Tools for E-commerce Sellers in Bangladesh 2026",
    subtitle: "Better product photos. Faster listings. More sales.",
    aioSnippet: "The best AI tools for e-commerce sellers in Bangladesh in 2026 are ChatGPT Plus Shared (BDT 350/mo) for product descriptions and customer support copy, Midjourney Standard Shared (BDT 1,199/mo) for professional product photography and lifestyle images, and Perplexity Pro (BDT 350/mo) for competitor and market research. Available via bKash — no international card needed.",
    metaDescription: "Best AI tools for e-commerce sellers in Bangladesh 2026. Product photos, descriptions, customer support AI.",
    canonical: "https://aipremiumshop.com/best-ai-for-ecommerce",
    whyHeading: "Why E-commerce Sellers Need AI in 2026",
    whyText: "Running an e-commerce business in Bangladesh is increasingly competitive. AI tools help sellers write compelling product listings faster, create professional product images without a photography studio, respond to customer queries automatically, and research trending products. Sellers who use AI consistently report better conversion rates and more time to focus on sourcing and scaling. The entire toolkit costs less than one product photoshoot.",
    statLine: "AI-written product listings outperform manually written ones by 33% in click-through rate — Shopify 2025",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Starter Shared", price: "BDT 350/mo", reason: "Write compelling product titles and descriptions optimized for search. Draft FAQ responses, customer service templates, and promotional copy. Essential for any e-commerce operation.", badge: "Essential", color: "#10a37f" },
      { rank: 2, name: "Midjourney — Standard Shared", price: "BDT 1,199/mo", reason: "Generate professional product photography and lifestyle images without a studio. Create background-removed product shots, styled scenes, and banner graphics for social media.", badge: "For Visuals", color: "#8b5cf6" },
      { rank: 3, name: "Perplexity Pro — Shared", price: "BDT 350/mo", reason: "Research trending products, analyze competitor pricing, and identify market gaps. Get real-time data on what's selling and why — with citations you can verify.", badge: "For Research", color: "#20b2aa" },
      { rank: 4, name: "Claude Pro — Premium Shared", price: "BDT 1,495/mo", reason: "Write longer-form content like seller profiles, brand stories, and email marketing sequences with higher quality than ChatGPT.", badge: "For Brand Content", color: "#d97706" },
    ],
    startHere: {
      name: "ChatGPT Plus — Starter Shared",
      price: "BDT 350/mo",
      reason: "At BDT 350, ChatGPT Plus pays for itself with better product listings alone. Use it to write all your product titles and descriptions in bulk — then add Midjourney when you're ready to upgrade your visuals.",
    },
    faqs: [
      { q: "Can AI write Daraz and Facebook Marketplace listings?", a: "Yes. ChatGPT is excellent at writing product titles and descriptions optimized for search engines and shoppers. Give it your product details (name, specs, price range) and it will write multiple variations. Works for Daraz, Chaldal, Facebook Marketplace, and any other platform." },
      { q: "Can Midjourney replace product photography?", a: "For digital goods, social media graphics, and lifestyle imagery, yes — Midjourney produces professional results. For products that need to show exact textures and colors (clothing, electronics), traditional photography is still better for e-commerce listings. Many sellers use Midjourney for marketing visuals and traditional photography for listing images." },
      { q: "How can AI help with customer support?", a: "Use ChatGPT to draft standard response templates for your most common customer questions (shipping times, return policy, size guides). For high-volume stores, Claude Pro's longer context window is better for handling complex customer situations." },
      { q: "Can AI help me find trending products to sell?", a: "Yes. Perplexity Pro gives you real-time market data with citations. Ask it to research trending products in Bangladesh, popular categories on Daraz, or compare competitor pricing — it'll give you current information with sources." },
    ],
    accentColor: "#f97316",
    emoji: "🛒",
    alsoRead: [
      { label: "Best AI for Business Owners", href: "/best-ai-for-business" },
      { label: "Best AI for Marketers", href: "/best-ai-for-marketers" },
      { label: "Best AI for Designers", href: "/best-ai-for-designers" },
    ],
    comparison: { label: "ChatGPT vs Claude — which writes better product descriptions?", href: "/chatgpt-vs-claude" },
  },
};

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl border border-white/10 overflow-hidden"
      style={{ backgroundColor: "#151b3d" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4" style={{ color: "#f4b942" }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{faq.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface GuidePageProps {
  guideKey: string;
}

export default function GuidePage({ guideKey }: GuidePageProps) {
  const guide = GUIDES[guideKey];
  if (!guide) return null;

  const wa = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${guide.tools[0]?.name} for ${guide.tools[0]?.price}`)}`;

  return (
    <PageLayout>
      <SEOHead title={guide.title} description={guide.metaDescription} canonical={guide.canonical} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(faqSchema(guide.faqs)) }} />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/blog" }, { name: guide.h1 }]} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-14 relative overflow-hidden">
        {GUIDE_GLOWS[guideKey] && (
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full ${GUIDE_GLOWS[guideKey]} blur-[80px] pointer-events-none`} />
        )}

        {/* Hero */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
                style={{ backgroundColor: guide.accentColor + "18", borderColor: guide.accentColor + "40", color: guide.accentColor }}>
                <span>{guide.emoji}</span>
                <span>Guide for {guide.h1.replace("Best AI Tools for ", "")}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{guide.h1}</h1>
              <p className="text-lg md:text-xl" style={{ color: "#c9ceda" }}>{guide.subtitle}</p>
              {guide.statLine && (
                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ backgroundColor: "#f4b94215", borderColor: "#f4b94230", color: "#f4b942" }}>
                  <span>📊</span>
                  <span>{guide.statLine}</span>
                </div>
              )}
            </div>
            {GUIDE_ICONS[guideKey] && (() => {
              const { Icon, color } = GUIDE_ICONS[guideKey];
              return (
                <div className="hidden md:flex flex-shrink-0 w-24 h-24 rounded-3xl items-center justify-center"
                  style={{ backgroundColor: color + "15", border: `1px solid ${color}30` }}>
                  <Icon className="w-12 h-12" style={{ color }} />
                </div>
              );
            })()}
          </div>
        </motion.div>

        {/* AIO Snippet */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="p-5 rounded-2xl border mb-8"
          style={{ backgroundColor: "rgba(244,185,66,0.06)", borderColor: "rgba(244,185,66,0.25)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#e8d5a3" }}>{guide.aioSnippet}</p>
        </motion.div>

        {/* Quick Price Comparison Table */}
        <motion.div custom={1.5} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Price Comparison — {new Date().getFullYear()}</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
            <div className="grid grid-cols-[auto_1fr_auto_auto] text-xs font-semibold uppercase tracking-wider border-b border-white/10 px-5 py-3" style={{ color: "#c9ceda" }}>
              <div className="w-7">#</div>
              <div>Tool</div>
              <div className="text-right pr-6">Price/mo</div>
              <div className="w-20 text-center">Order</div>
            </div>
            {guide.tools.map((tool, i) => {
              const slug = TOOL_BRAND_SLUGS[tool.name] ?? null;
              const waUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${tool.name}`)}`;
              return (
                <div key={i} className={`grid grid-cols-[auto_1fr_auto_auto] items-center px-5 py-3 ${i > 0 ? "border-t border-white/6" : ""}`}>
                  <div className="w-7 text-sm font-bold" style={{ color: guide.accentColor }}>{tool.rank}</div>
                  <div>
                    {slug
                      ? <Link href={slug} className="font-semibold text-white text-sm hover:opacity-80 transition-opacity underline decoration-white/20">{tool.name}</Link>
                      : <span className="font-semibold text-white text-sm">{tool.name}</span>
                    }
                    {tool.badge && <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: (tool.color ?? guide.accentColor) + "25", color: tool.color ?? guide.accentColor }}>{tool.badge}</span>}
                  </div>
                  <div className="text-sm font-bold pr-6" style={{ color: "#f4b942" }}>{tool.price}</div>
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
        </motion.div>

        {/* Why AI */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="p-6 md:p-8 rounded-2xl border border-white/10 mb-10"
          style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-3">{guide.whyHeading}</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{guide.whyText}</p>
        </motion.div>

        {/* Guide-specific ChatGPT callout boxes */}
        {guideKey === "students" && (
          <motion.div custom={2.5} variants={fadeUp} initial="hidden" animate="visible"
            className="rounded-2xl border mb-10 overflow-hidden"
            style={{ backgroundColor: "rgba(59,130,246,0.05)", borderColor: "rgba(59,130,246,0.25)" }}>
            <div className="p-6">
              <div className="text-5xl mb-3">🎓</div>
              <blockquote className="text-sm leading-relaxed mb-4 italic" style={{ color: "#c9ceda" }}>
                "ChatGPT ৳350/mo changed how I study. My research papers went from C+ to A.
                I can explain complex economics theories in simple Bangla now.
                My CGPA improved from 2.9 to 3.6 in one semester."
              </blockquote>
              <p className="text-xs mb-4" style={{ color: "#6b7280" }}>— Based on real student outcomes (anonymized)</p>
              <p className="text-sm font-semibold text-white mb-3">Every subject. Every assignment. Every exam. One tool.</p>
              <div className="flex flex-wrap gap-2">
                {["Economics", "Accounting", "Law", "CSE", "English", "BBA", "Medical", "HSC"].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(59,130,246,0.15)", color: "#93c5fd" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {guideKey === "freelancers" && (
          <motion.div custom={2.5} variants={fadeUp} initial="hidden" animate="visible"
            className="rounded-2xl border mb-10 overflow-hidden"
            style={{ backgroundColor: "rgba(16,163,127,0.05)", borderColor: "rgba(16,163,127,0.25)" }}>
            <div className="p-6">
              <div className="text-5xl mb-3">💻</div>
              <h3 className="text-base font-bold text-white mb-4">Freelancer Income Calculator</h3>
              <div className="space-y-2 text-sm mb-5" style={{ color: "#c9ceda" }}>
                <div className="flex justify-between"><span>Without AI: 5 projects × $50</span><span className="font-semibold" style={{ color: "#ef4444" }}>$250/month</span></div>
                <div className="flex justify-between"><span>With ChatGPT + Midjourney: 12 projects × $80</span><span className="font-semibold" style={{ color: "#10a37f" }}>$960/month</span></div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-semibold"><span>Extra income/month</span><span style={{ color: "#f4b942" }}>$710 = ৳92,300 BDT</span></div>
                <div className="flex justify-between text-xs"><span>AI subscription cost</span><span>৳350–1,199/month</span></div>
                <div className="flex justify-between text-xs font-bold"><span>ROI</span><span style={{ color: "#10a37f" }}>77x–264x return</span></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { type: "Writer", rec: "ChatGPT Plus ৳350" },
                  { type: "Designer", rec: "+ Midjourney ৳1,199" },
                  { type: "Developer", rec: "+ Copilot ৳1,495" },
                  { type: "VA", rec: "ChatGPT + Notion ৳1,150" },
                ].map((item) => (
                  <div key={item.type} className="rounded-lg p-2 border border-white/10" style={{ backgroundColor: "#151b3d" }}>
                    <div className="font-semibold text-white">{item.type}</div>
                    <div style={{ color: "#10a37f" }}>{item.rec}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {guideKey === "business" && (
          <motion.div custom={2.5} variants={fadeUp} initial="hidden" animate="visible"
            className="rounded-2xl border mb-10 overflow-hidden"
            style={{ backgroundColor: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.25)" }}>
            <div className="p-6">
              <div className="text-5xl mb-3">💼</div>
              <h3 className="text-base font-bold text-white mb-4">Business Cost Savings with AI</h3>
              <div className="space-y-2 text-sm mb-2">
                {[
                  { label: "Content Writer", before: "৳15,000/mo", after: "ChatGPT Business: ৳699/mo" },
                  { label: "Designer", before: "৳5,000/mo", after: "Midjourney: ৳1,199/mo" },
                  { label: "Support Staff", before: "৳12,000/mo", after: "AI Agent: ৳699/mo" },
                  { label: "Marketing Agency", before: "৳50,000/mo", after: "AI Stack: ৳2,497/mo" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <div className="w-32 text-xs font-semibold text-white flex-shrink-0">{row.label}</div>
                    <div className="text-xs line-through flex-shrink-0" style={{ color: "#ef4444" }}>{row.before}</div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>→</div>
                    <div className="text-xs" style={{ color: "#10a37f" }}>{row.after}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl p-3 border text-sm font-bold text-center" style={{ backgroundColor: "#f4b94210", borderColor: "#f4b94230", color: "#f4b942" }}>
                Total savings: ৳79,000/mo with same or better output
              </div>
            </div>
          </motion.div>
        )}

        {guideKey === "job-seekers" && (
          <motion.div custom={2.5} variants={fadeUp} initial="hidden" animate="visible"
            className="rounded-2xl border mb-10 overflow-hidden"
            style={{ backgroundColor: "rgba(99,102,241,0.05)", borderColor: "rgba(99,102,241,0.25)" }}>
            <div className="p-6">
              <div className="text-5xl mb-3">🔍</div>
              <h3 className="text-base font-bold text-white mb-4">Job Search Timeline with AI</h3>
              <div className="grid grid-cols-2 gap-4 mb-5 text-center">
                <div className="rounded-xl p-4 border" style={{ backgroundColor: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)" }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: "#ef4444" }}>6 months</div>
                  <div className="text-xs" style={{ color: "#c9ceda" }}>Without AI — average time to get hired</div>
                </div>
                <div className="rounded-xl p-4 border" style={{ backgroundColor: "rgba(16,163,127,0.08)", borderColor: "rgba(16,163,127,0.2)" }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: "#10a37f" }}>1–3 months</div>
                  <div className="text-xs" style={{ color: "#c9ceda" }}>With AI — average time to get hired</div>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-4" style={{ color: "#c9ceda" }}>
                <div className="flex justify-between"><span>Every month without a job</span><span className="font-semibold" style={{ color: "#ef4444" }}>৳15,000–30,000 lost</span></div>
                <div className="flex justify-between"><span>3 months faster = extra earnings</span><span className="font-semibold" style={{ color: "#10a37f" }}>৳45,000–90,000</span></div>
                <div className="flex justify-between"><span>ChatGPT subscription cost</span><span>৳350/mo</span></div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold"><span>ROI</span><span style={{ color: "#f4b942" }}>128x–257x return</span></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommended Tools */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Recommended Tools</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>Ranked by value for {guide.h1.replace("Best AI Tools for ", "").toLowerCase()}.</p>
          <div className="space-y-4">
            {guide.tools.map((tool, i) => (
              <motion.div key={i} custom={i + 3} variants={fadeUp} initial="hidden" animate="visible"
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 border-l-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{ backgroundColor: "#151b3d", borderLeftColor: tool.rank === 1 ? "#fbbf24" : tool.rank === 2 ? "#9ca3af" : tool.rank === 3 ? "#92400e" : "rgba(255,255,255,0.1)" }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: (tool.color ?? guide.accentColor) + "25", color: tool.color ?? guide.accentColor }}>
                  {tool.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{tool.name}</span>
                    {tool.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: (tool.color ?? guide.accentColor) + "25", color: tool.color ?? guide.accentColor }}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold mb-1" style={{ color: "#f4b942" }}>{tool.price}</div>
                  <p className="text-sm" style={{ color: "#c9ceda" }}>{tool.reason}</p>
                </div>
                <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${tool.name}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#25d366", color: "#fff" }}>
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Order</span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start Here */}
        <motion.div custom={guide.tools.length + 3} variants={fadeUp} initial="hidden" animate="visible"
          className="p-6 md:p-8 rounded-2xl mb-10 border"
          style={{ backgroundColor: guide.accentColor + "12", borderColor: guide.accentColor + "35" }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5" style={{ color: guide.accentColor }} />
            <span className="font-bold text-white">Start Here</span>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-white mb-1">{guide.startHere.name}</div>
              <div className="text-lg font-bold mb-2" style={{ color: "#f4b942" }}>{guide.startHere.price}</div>
              <p className="text-sm" style={{ color: "#c9ceda" }}>{guide.startHere.reason}</p>
            </div>
            <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${guide.startHere.name}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-5 h-5" />
              Order Now
            </a>
          </div>
        </motion.div>

        {/* Internal brand links */}
        {guide.tools.some((t) => TOOL_BRAND_SLUGS[t.name]) && (
          <motion.div custom={guide.tools.length + 4} variants={fadeUp} initial="hidden" animate="visible"
            className="p-6 rounded-2xl border border-white/10 mb-10"
            style={{ backgroundColor: "#151b3d" }}>
            <h3 className="font-bold text-white mb-1 text-sm">Explore each tool in detail</h3>
            <p className="text-xs mb-4" style={{ color: "#c9ceda" }}>Read full pricing, plans, and reviews for each tool.</p>
            <div className="flex flex-wrap gap-2">
              {guide.tools.filter((t) => TOOL_BRAND_SLUGS[t.name]).map((t) => (
                <Link key={t.name} href={TOOL_BRAND_SLUGS[t.name]}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 text-sm font-medium hover:border-white/30 transition-colors"
                  style={{ color: t.color ?? guide.accentColor, minHeight: "36px" }}>
                  {t.name.split(" —")[0].split(" — ")[0]}
                  <ChevronRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQ */}
        <motion.div custom={guide.tools.length + 5} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {guide.faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
          </div>
        </motion.div>

        {/* Also Read */}
        {(guide.alsoRead.length > 0 || guide.comparison) && (
          <motion.div custom={guide.tools.length + 6} variants={fadeUp} initial="hidden" animate="visible"
            className="p-6 rounded-2xl border border-white/10 mb-10"
            style={{ backgroundColor: "#151b3d" }}>
            <h3 className="font-semibold text-white mb-4">Also read</h3>
            <div className="flex flex-col gap-2">
              {guide.alsoRead.map((item) => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: "#f4b942" }}>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  {item.label}
                </Link>
              ))}
              {guide.comparison && (
                <Link href={guide.comparison.href}
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: "#c9ceda" }}>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  {guide.comparison.label}
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* FOMO Banner */}
        <motion.div custom={guide.tools.length + 6.5} variants={fadeUp} initial="hidden" animate="visible">
          <div className="bg-[#151b3d] border border-red-500/20 rounded-xl p-6 my-12">
            <h3 className="text-white font-bold text-lg mb-3">⚠️ The Cost of Waiting</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Students using AI outperform non-AI students in every metric</li>
              <li>• Freelancers with AI earn 44% more — Upwork Research 2025</li>
              <li>• Businesses using AI save 60-80% on operations — McKinsey</li>
              <li>• 92% of developers now use AI coding tools — GitHub Survey</li>
            </ul>
            <p className="text-white font-semibold mt-4">The question is not "should I use AI?" — it's "how long can I afford not to?"</p>
          </div>
        </motion.div>

        {/* Developer Career Path */}
        {guideKey === "developers" && (
          <motion.div custom={guide.tools.length + 6.8} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Developer Career Path With AI</h2>
            <div className="space-y-3 mb-6">
              {[
                { border: "border-blue-500", level: "Level 1: Junior", tool: "Copilot Pro BDT 1,495", desc: "Learn faster, code faster, get hired faster" },
                { border: "border-purple-500", level: "Level 2: Mid-level", tool: "Copilot + Cursor BDT 4,485", desc: "Complex projects, premium freelance rates" },
                { border: "border-amber-500", level: "Level 3: Senior", tool: "+ Claude Pro BDT 7,475", desc: "Architect systems, $50+/hr" },
                { border: "border-green-500", level: "Level 4: AI Agent Builder", tool: "Full stack BDT 10,000+", desc: "Build AI products, $100+/hr" },
              ].map((item) => (
                <div key={item.level} className={`bg-gray-900 rounded-lg p-4 border-l-4 ${item.border}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-white text-sm mb-0.5">{item.level}</div>
                      <div className="text-sm mb-1" style={{ color: "#f4b942" }}>{item.tool}</div>
                      <div className="text-sm" style={{ color: "#c9ceda" }}>{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-sm" style={{ color: "#c9ceda" }}>
                92% of developers now use AI coding tools (GitHub Survey 2025). The 8% who don't are competing against developers who code 55% faster.
              </p>
            </div>
          </motion.div>
        )}

        {/* Creator AI Stack Calculator */}
        {guideKey === "creators" && (
          <motion.div custom={guide.tools.length + 6.8} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Creator AI Stack — Cost Calculator</h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="space-y-2 text-sm mb-4">
                {[
                  { label: "ChatGPT", note: "scripts", price: "BDT 350" },
                  { label: "Midjourney", note: "visuals", price: "BDT 1,199" },
                  { label: "ElevenLabs", note: "voiceover", price: "BDT 748" },
                  { label: "Suno AI", note: "music", price: "BDT 1,495" },
                  { label: "Runway", note: "video", price: "BDT 1,794" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-1 border-b border-white/5">
                    <span style={{ color: "#c9ceda" }}>{item.label} <span className="text-xs opacity-60">({item.note})</span></span>
                    <span style={{ color: "#c9ceda" }}>{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center py-2 mb-3">
                <span className="font-bold text-white">Total</span>
                <span className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT 5,586/mo</span>
              </div>
              <div className="flex justify-between items-center py-1 mb-1">
                <span className="text-sm" style={{ color: "#c9ceda" }}>vs Hiring</span>
                <span className="text-sm font-semibold line-through" style={{ color: "#ef4444" }}>BDT 37,000/mo</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm font-bold text-white">Save</span>
                <span className="text-sm font-bold" style={{ color: "#22c55e" }}>BDT 31,414/mo (85% savings)</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Designer AI Stack ROI */}
        {guideKey === "designers" && (
          <motion.div custom={guide.tools.length + 6.8} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
            <h3 className="text-xl font-bold text-white mb-5">Designer AI Stack ROI</h3>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="space-y-2 text-sm mb-4">
                {[
                  { label: "Midjourney", price: "BDT 1,199" },
                  { label: "Ideogram", price: "BDT 2,990" },
                  { label: "ChatGPT", price: "BDT 350" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-1 border-b border-white/5">
                    <span style={{ color: "#c9ceda" }}>{item.label}</span>
                    <span style={{ color: "#c9ceda" }}>{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center py-2 mb-4">
                <span className="font-bold text-white">Total</span>
                <span className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT 4,539/mo</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2" style={{ color: "#c9ceda" }}>
                  <span style={{ color: "#a855f7" }}>•</span>
                  <span>Output: 50+ client concepts/week</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: "#c9ceda" }}>
                  <span style={{ color: "#a855f7" }}>•</span>
                  <span>Potential: BDT 50,000-100,000+/mo</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <span style={{ color: "#a855f7" }}>•</span>
                  <span>ROI: 11x-22x</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* FOMO Banner — all guide pages */}
        <motion.div custom={guide.tools.length + 6.9} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <div className="rounded-xl p-6" style={{ backgroundColor: "#151b3d", border: "1px solid rgba(239,68,68,0.1)" }}>
            <h3 className="text-lg font-bold text-white mb-3">AI Is No Longer Optional</h3>
            <div className="text-sm leading-relaxed space-y-1 mb-4" style={{ color: "#d1d5db" }}>
              <p>• Students using AI outperform peers in every metric</p>
              <p>• Freelancers with AI earn 44% more (Upwork Research)</p>
              <p>• Businesses save 60-80% on operations (McKinsey)</p>
              <p>• 92% of developers use AI coding tools (GitHub)</p>
            </div>
            <p className="text-white font-bold mb-4">The question is not "should I use AI?" — it's "how long can I afford not to?"</p>
            <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I want to start with AI tools")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Start for BDT 350/mo →
            </a>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div custom={guide.tools.length + 7} variants={fadeUp} initial="hidden" animate="visible"
          className="p-8 rounded-2xl text-center border border-white/10"
          style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Message us on WhatsApp. Tell us which tool you want. We'll deliver within 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
            <Link href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
