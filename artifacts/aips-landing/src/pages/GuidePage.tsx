import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const WHATSAPP = "https://wa.me/8801865385348";

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

const GUIDES: Record<string, GuideConfig> = {
  students: {
    slug: "best-ai-for-students",
    title: "Best AI Tools for Students in Bangladesh 2026 | AI Premium Shop",
    h1: "Best AI Tools for Students",
    subtitle: "Write better papers. Study smarter. Ace your exams.",
    metaDescription: "Best AI tools for students in Bangladesh 2026. ChatGPT Plus from BDT 350, Google AI Pro BDT 500. Pay with bKash. No credit card needed. Compare tools and prices.",
    canonical: "https://aipremiumshop.com/best-ai-for-students",
    whyHeading: "Why AI Matters for Students",
    whyText: "AI tools have become essential study companions — like having a tutor available at 2 AM. Whether you're writing research papers, solving math problems, debugging code assignments, or preparing for exams, AI accelerates learning significantly. Students who use AI tools consistently report submitting higher-quality work in less time. The best part: you can access the same tools used by university students in the US and UK — at Bangladesh prices.",
    tools: [
      { rank: 1, name: "Google AI Pro", price: "BDT 500/mo", reason: "Best value. Deep Research for papers, 2TB storage, works with Gmail and Google Docs. 83% off official price.", badge: "Best Value", color: "#4285f4" },
      { rank: 2, name: "ChatGPT Plus — Starter Shared", price: "BDT 350/mo", reason: "Cheapest way to access GPT-5.4. Great for assignments, essays, coding, and exam prep.", badge: "Cheapest", color: "#10a37f" },
      { rank: 3, name: "Perplexity Pro — Shared", price: "BDT 400/mo", reason: "AI research engine with real citations and source links. Perfect for thesis and academic papers.", badge: "For Research", color: "#20b2aa" },
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
    title: "Best AI Tools for Freelancers in Bangladesh 2026 | AI Premium Shop",
    h1: "Best AI Tools for Freelancers",
    subtitle: "Win more clients. Deliver faster. Earn more.",
    metaDescription: "Best AI tools for freelancers in Bangladesh 2026. Win more Upwork and Fiverr clients using ChatGPT, Claude, and Midjourney. BDT prices, bKash payment.",
    canonical: "https://aipremiumshop.com/best-ai-for-freelancers",
    whyHeading: "Why AI is a Freelancer's Competitive Advantage",
    whyText: "Freelancers who use AI tools earn 44% more on average (Upwork 2025 Report). AI tools let you write proposals faster, deliver projects on tighter deadlines, and take on more clients simultaneously. Whether you're a writer, designer, developer, or marketer, AI multiplies your output without multiplying your hours. These tools pay for themselves with your first client win.",
    statLine: "Freelancers who use AI earn 44% more on average — Upwork 2025 Report",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Premium Shared", price: "BDT 950/mo", reason: "Write proposals, emails, and content 10x faster. Higher stability than starter plan.", badge: "Top Pick", color: "#10a37f" },
      { rank: 2, name: "Claude Pro — Premium Shared", price: "BDT 1,495/mo", reason: "#1 ranked AI for writing quality. Extended thinking for complex client projects.", badge: "Best Writing", color: "#d97706" },
      { rank: 3, name: "Midjourney — Standard Shared", price: "BDT 1,199/mo", reason: "Create client graphics, thumbnails, and mockups. Unlimited image generation.", badge: "For Design", color: "#8b5cf6" },
      { rank: 4, name: "GitHub Copilot — Individual", price: "BDT 600/mo", reason: "For developer freelancers. Code 50% faster. Works in VS Code and JetBrains.", badge: "For Devs", color: "#6e40c9" },
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
    title: "Best AI Tools for Content Creators in Bangladesh 2026 | AI Premium Shop",
    h1: "Best AI Tools for Content Creators",
    subtitle: "Create faster. Edit smarter. Grow your audience.",
    metaDescription: "Best AI tools for content creators in Bangladesh 2026. ChatGPT for scripts, Midjourney for thumbnails, ElevenLabs for voiceovers. BDT prices, bKash payment.",
    canonical: "https://aipremiumshop.com/best-ai-for-creators",
    whyHeading: "Why AI is a Creator's Superpower",
    whyText: "Content creation in 2026 is an arms race. YouTube channels, TikTok accounts, and social media pages that use AI produce more content, at higher quality, with less burnout. AI handles the repetitive parts — writing captions, generating thumbnails, creating voiceovers, composing background music — so you can focus on strategy and audience connection. Creators who adopted AI tools in 2024 grew their channels 3x faster on average.",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Premium Shared", price: "BDT 950/mo", reason: "Scripts, captions, content calendars, viral hooks — all in minutes.", badge: "For Scripts", color: "#10a37f" },
      { rank: 2, name: "Midjourney — Standard Shared", price: "BDT 1,199/mo", reason: "AI thumbnails and graphics without hiring a designer. Unlimited generations.", badge: "For Thumbnails", color: "#8b5cf6" },
      { rank: 3, name: "ElevenLabs — Starter Plan", price: "BDT 550/mo", reason: "Ultra-realistic AI voiceovers. Clone your own voice. Supports 29 languages.", badge: "For Voiceovers", color: "#f97316" },
      { rank: 4, name: "Suno AI — Pro Plan", price: "BDT 500/mo", reason: "Create background music and jingles with no copyright issues. Commercial use included.", badge: "For Music", color: "#f59e0b" },
      { rank: 5, name: "Runway — Standard Plan", price: "BDT 1,100/mo", reason: "AI video generation. B-roll, transitions, cinematic effects from text prompts.", badge: "For Video", color: "#ec4899" },
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
    title: "Best AI Tools for Business Owners in Bangladesh 2026 | AI Premium Shop",
    h1: "Best AI Tools for Business Owners",
    subtitle: "Automate operations. Cut costs. Scale faster.",
    metaDescription: "Best AI tools for businesses in Bangladesh 2026. ChatGPT Team, Google AI Pro, Notion AI for automation. BDT prices, bKash payment, WhatsApp support.",
    canonical: "https://aipremiumshop.com/best-ai-for-business",
    whyHeading: "Why Businesses in Bangladesh Are Adopting AI Now",
    whyText: "AI is no longer a luxury for large corporations. Small and medium businesses in Bangladesh are using AI to draft contracts, analyze sales data, manage customer communications, and run marketing campaigns — all at a fraction of the cost of hiring specialists. Businesses that adopt AI tools reduce operational costs by 30–40% while increasing output quality. The window to get ahead of competitors who haven't adopted AI yet is closing fast.",
    tools: [
      { rank: 1, name: "Google AI Pro", price: "BDT 500/mo", reason: "Gmail AI, Google Docs AI, Sheets AI — AI built into tools your team already uses daily.", badge: "Best for Teams", color: "#4285f4" },
      { rank: 2, name: "ChatGPT Team", price: "BDT 1,200/mo", reason: "Team AI assistant with admin controls and privacy. Unlimited GPT-5.4 for the whole team.", badge: "For Operations", color: "#10a37f" },
      { rank: 3, name: "Notion AI — Plus Plan", price: "BDT 550/mo", reason: "AI workspace for docs, projects, SOPs, and team collaboration. Replaces multiple tools.", badge: "For Docs", color: "#000000" },
      { rank: 4, name: "Claude Pro — Shared", price: "BDT 400/mo", reason: "Best AI for drafting contracts, reports, and long-form business documents.", badge: "For Writing", color: "#d97706" },
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
    title: "Best AI Coding Tools for Developers in Bangladesh 2026 | AI Premium Shop",
    h1: "Best AI Tools for Developers",
    subtitle: "Code faster. Debug instantly. Ship on time.",
    metaDescription: "Best AI coding tools for developers in Bangladesh 2026. GitHub Copilot, Cursor Pro, Claude Pro. BDT prices, bKash payment. No international card needed.",
    canonical: "https://aipremiumshop.com/best-ai-for-developers",
    whyHeading: "Why Developers Need AI Coding Tools in 2026",
    whyText: "AI coding assistants have changed what's possible for individual developers. GitHub Copilot reduces coding time by 55% according to GitHub's own research. Cursor's agent mode can write entire features from a single prompt. Claude Code can debug complex multi-file issues that would take hours manually. Developers who invest in AI tools are shipping products faster, catching bugs earlier, and competing with teams twice their size.",
    statLine: "GitHub Copilot reduces coding time by 55% — GitHub Developer Productivity Report",
    tools: [
      { rank: 1, name: "GitHub Copilot — Individual", price: "BDT 600/mo", reason: "Unlimited code completions. Works in VS Code, JetBrains, Neovim. Industry standard.", badge: "Industry Standard", color: "#6e40c9" },
      { rank: 2, name: "Cursor — Pro Plan", price: "BDT 1,100/mo", reason: "AI-native editor with agent mode. Used by engineers at OpenAI, Stripe, and Figma.", badge: "AI-Native Editor", color: "#3b82f6" },
      { rank: 3, name: "Tabnine — Pro Plan", price: "BDT 600/mo", reason: "Private AI code completion — runs on your machine with no code leaving your environment. Secure option.", badge: "Private AI", color: "#0891b2" },
      { rank: 4, name: "Claude Pro — Private Account", price: "BDT 750/mo", reason: "#1 ranked AI for reasoning. Claude Code terminal for complex debugging and architecture decisions.", badge: "For Reasoning", color: "#d97706" },
    ],
    startHere: {
      name: "GitHub Copilot — Individual",
      price: "BDT 600/mo",
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
    title: "Best AI Tools for Job Seekers in Bangladesh 2026 | AI Premium Shop",
    h1: "Best AI Tools for Job Seekers",
    subtitle: "Build a winning CV. Ace interviews. Land the job.",
    metaDescription: "Best AI tools for job seekers in Bangladesh 2026. Write better CVs and cover letters with ChatGPT and Google AI Pro. From BDT 350. Pay with bKash.",
    canonical: "https://aipremiumshop.com/best-ai-for-job-seekers",
    whyHeading: "Why AI Gives Job Seekers an Edge",
    whyText: "Job hunting in Bangladesh has never been more competitive. AI tools help you write stronger CVs, craft personalized cover letters, research companies before interviews, and practice answering difficult questions. Candidates who use AI to prepare their applications consistently report more callbacks and better interview performance. The best part: you can tailor your application to each job in minutes instead of hours.",
    tools: [
      { rank: 1, name: "ChatGPT Plus — Starter Shared", price: "BDT 350/mo", reason: "Write professional CVs, cover letters, and LinkedIn summaries in minutes. Most affordable option.", badge: "Start Here", color: "#10a37f" },
      { rank: 2, name: "Google AI Pro", price: "BDT 500/mo", reason: "Gmail AI for job applications. Google Docs AI for CV formatting. 2TB storage included.", badge: "Best Value", color: "#4285f4" },
      { rank: 3, name: "Perplexity Pro — Shared", price: "BDT 400/mo", reason: "Research companies before interviews. Get industry insights with citations and sources.", badge: "For Research", color: "#20b2aa" },
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

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-14">

        {/* Hero */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
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
        </motion.div>

        {/* Why AI */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="p-6 md:p-8 rounded-2xl border border-white/10 mb-10"
          style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-3">{guide.whyHeading}</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{guide.whyText}</p>
        </motion.div>

        {/* Recommended Tools */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Recommended Tools</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>Ranked by value for {guide.h1.replace("Best AI Tools for ", "").toLowerCase()}.</p>
          <div className="space-y-4">
            {guide.tools.map((tool, i) => (
              <motion.div key={i} custom={i + 3} variants={fadeUp} initial="hidden" animate="visible"
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/10"
                style={{ backgroundColor: "#151b3d" }}>
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
