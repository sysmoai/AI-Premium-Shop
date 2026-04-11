import { motion, type Variants } from "framer-motion";
import { MessageCircle, ArrowRight, Check, X } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: [0, 0, 0.2, 1] } }),
};

interface CompRow {
  feature: string;
  a: string | boolean;
  b: string | boolean;
}

interface WhoRow {
  persona: string;
  pick: string;
  reason: string;
}

interface CompConfig {
  title: string;
  h1: string;
  aioSnippet: string;
  metaDescription: string;
  canonical: string;
  productA: { name: string; color: string; orderText: string };
  productB: { name: string; color: string; orderText: string };
  rows: CompRow[];
  verdict: string;
  verdictA: string;
  verdictB: string;
  buyBothText?: string;
  whoTable: WhoRow[];
  relatedGuides: { label: string; href: string }[];
}

const COMPARISONS: Record<string, CompConfig> = {
  "chatgpt-vs-claude": {
    title: "ChatGPT vs Claude Bangladesh 2026 — Which is Better?",
    h1: "ChatGPT vs Claude — Which One Is Right for You?",
    aioSnippet: "ChatGPT vs Claude in Bangladesh 2026: ChatGPT Plus Shared starts at BDT 350/mo and excels as an all-rounder (images, web search, code, agents). Claude Pro starts at BDT 1,495/mo and is ranked #1 for writing quality and long-document reasoning (1M token context). Both available via bKash or Nagad — delivery in 5–30 minutes via WhatsApp.",
    metaDescription: "ChatGPT vs Claude in Bangladesh 2026. Features, prices, which is better. AI Premium Shop.",
    canonical: "https://aipremiumshop.com/chatgpt-vs-claude",
    productA: { name: "ChatGPT (OpenAI)", color: "#10a37f", orderText: "Order ChatGPT" },
    productB: { name: "Claude (Anthropic)", color: "#d97706", orderText: "Order Claude" },
    rows: [
      { feature: "Best for", a: "All-rounder: code, images, search, agents", b: "Writing, reasoning, long documents" },
      { feature: "Top model", a: "GPT-5.4", b: "Opus 4.6 (#1 on Chatbot Arena)" },
      { feature: "Image generation", a: true, b: false },
      { feature: "Video generation", a: "Yes (Sora — Pro only)", b: false },
      { feature: "Code assistant", a: "Codex agent in ChatGPT", b: "Claude Code terminal" },
      { feature: "Context window", a: "128K tokens", b: "200K–1M tokens" },
      { feature: "Shared price (AIPS)", a: "From BDT 350/mo", b: "From BDT 1,495/mo" },
      { feature: "Personal price (AIPS)", a: "BDT 2,990/mo", b: "BDT 2,990/mo" },
      { feature: "Web search", a: true, b: false },
      { feature: "Savings vs official", a: "~88%", b: "~80%" },
    ],
    verdict: "Both are world-class AI tools available at Bangladesh prices. Your choice depends on your primary use case.",
    verdictA: "Choose ChatGPT if you want an all-in-one tool that does everything — text, images, web search, code, and agents. It's also the cheapest option at BDT 350.",
    verdictB: "Choose Claude if you need the best writing quality, the longest document analysis (1M token context), or the most advanced reasoning. Claude is ranked #1 on the independent Chatbot Arena benchmark.",
    buyBothText: "ChatGPT Plus Shared (BDT 350) + Claude Pro Premium Shared (BDT 1,495) = BDT 1,845/mo total — get the best of both worlds for writing and everything else.",
    whoTable: [
      { persona: "Students on a tight budget", pick: "ChatGPT Plus Shared — BDT 350", reason: "Cheapest AI in our catalog. Covers writing, coding, and research." },
      { persona: "Copywriters & content writers", pick: "Claude Pro — BDT 1,495", reason: "Ranked #1 for writing quality on independent benchmarks." },
      { persona: "Developers & researchers", pick: "ChatGPT Plus", reason: "Image gen, agents, web search, and code — one comprehensive tool." },
    ],
    relatedGuides: [
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
    ],
  },
  "chatgpt-vs-gemini": {
    title: "ChatGPT vs Gemini Bangladesh 2026 — Full Comparison",
    h1: "ChatGPT vs Google AI Pro — Which Should You Choose?",
    aioSnippet: "ChatGPT vs Google AI Pro in Bangladesh 2026: ChatGPT Plus Shared is BDT 350/mo (shared account, cheapest AI tool available). Google AI Pro is BDT 500/mo and includes your own Gmail account, 2TB Google Drive storage, and AI built into Docs, Sheets, and Slides. Google AI Pro is the better value for anyone using Google Workspace daily. Both available via bKash — no international card needed.",
    metaDescription: "ChatGPT vs Gemini in Bangladesh 2026. Full comparison with BD prices. AI Premium Shop.",
    canonical: "https://aipremiumshop.com/chatgpt-vs-gemini",
    productA: { name: "ChatGPT Plus", color: "#10a37f", orderText: "Order ChatGPT" },
    productB: { name: "Google AI Pro", color: "#4285f4", orderText: "Order Google AI Pro" },
    rows: [
      { feature: "AIPS price", a: "BDT 350/mo (shared)", b: "BDT 500/mo (personal)" },
      { feature: "Account type", a: "Shared access", b: "Your own Gmail account" },
      { feature: "AI Model", a: "GPT-5.4", b: "Gemini 2.5 Pro" },
      { feature: "Storage", a: "None", b: "2TB Google Drive" },
      { feature: "Gmail AI", a: false, b: true },
      { feature: "Google Docs AI", a: false, b: true },
      { feature: "Google Sheets AI", a: false, b: true },
      { feature: "Image generation", a: true, b: true },
      { feature: "Web search", a: true, b: true },
      { feature: "Savings vs official", a: "~88%", b: "~83%" },
    ],
    verdict: "Both are excellent — the right choice depends on your existing tools and workflow.",
    verdictA: "Choose ChatGPT if you want the cheapest AI option (BDT 350) and primarily need AI for writing, coding, and chatting. Best for students on a tight budget.",
    verdictB: "Google AI Pro at BDT 500 is the best-value tool in our catalog. You get a personal account (not shared), 2TB storage, and AI built into Gmail, Docs, Sheets, and Slides. For anyone who uses Google Workspace daily, this is the clear winner.",
    buyBothText: "ChatGPT Plus Shared (BDT 350) + Google AI Pro (BDT 500) = BDT 850/mo — one for AI chat, one for your Google Workspace.",
    whoTable: [
      { persona: "Students on a tight budget", pick: "ChatGPT Plus Shared — BDT 350", reason: "Cheapest AI tool in our catalog." },
      { persona: "Google Workspace users", pick: "Google AI Pro — BDT 500", reason: "AI in Gmail, Docs, Sheets + 2TB storage + personal account." },
      { persona: "Job seekers & writers", pick: "Google AI Pro", reason: "Personal Gmail account is more professional for job applications." },
    ],
    relatedGuides: [
      { label: "Best AI for Students", href: "/best-ai-for-students" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
      { label: "Best AI for Job Seekers", href: "/best-ai-for-job-seekers" },
    ],
  },
  "midjourney-vs-ideogram": {
    title: "Midjourney vs Ideogram Bangladesh 2026 — Best AI Image Generator",
    h1: "Midjourney vs Ideogram — Which AI Image Generator Should You Choose?",
    aioSnippet: "Midjourney vs Ideogram in Bangladesh 2026: Midjourney Standard Shared starts at BDT 1,199/mo and produces the highest quality photorealistic and artistic images. Ideogram starts at BDT 2,990/mo and is the best AI for rendering text inside images — perfect for logos, posters, and typography. Both available via bKash — order on WhatsApp for delivery in 5–30 minutes.",
    metaDescription: "Midjourney vs Ideogram 2026 Bangladesh. Best AI image generator comparison with BDT prices. AI Premium Shop.",
    canonical: "https://aipremiumshop.com/midjourney-vs-ideogram",
    productA: { name: "Midjourney", color: "#8b5cf6", orderText: "Order Midjourney" },
    productB: { name: "Ideogram", color: "#ec4899", orderText: "Order Ideogram" },
    rows: [
      { feature: "Best for", a: "Photorealistic & artistic images", b: "Text in images, logos, typography" },
      { feature: "Image quality", a: "Highest overall quality", b: "Best for text rendering" },
      { feature: "Text in images", a: "Inconsistent — often misspells", b: "Excellent — reliable text rendering" },
      { feature: "Photorealism", a: "Industry-leading", b: "Good but not Midjourney-level" },
      { feature: "Artistic styles", a: "Full range, painterly, cinematic", b: "Limited compared to Midjourney" },
      { feature: "Images/month (shared)", a: "15hr GPU (~900 images) + unlimited slow", b: "400 priority + unlimited slower" },
      { feature: "Price (AIPS shared)", a: "BDT 1,199/mo", b: "from BDT 2,990/mo" },
      { feature: "Commercial use", a: "Yes (Standard+)", b: "Yes (Pro plan)" },
      { feature: "Learning curve", a: "Medium (prompt craft matters)", b: "Easy — simple prompts work well" },
      { feature: "Savings vs official", a: "~70%", b: "~60%" },
    ],
    verdict: "Both are world-class AI image generators. Your choice should be based on what you create most.",
    verdictA: "Choose Midjourney if you need the highest quality images overall — photorealistic portraits, artistic illustrations, product renders, or creative visuals. Midjourney's v7 model produces images that often surpass professional photography in artistic quality.",
    verdictB: "Choose Ideogram if you create designs with text — logos, posters, social media graphics, YouTube thumbnails, or marketing materials. Ideogram is the only AI that reliably renders text accurately inside images. For graphic design and brand work, it's the clear winner.",
    buyBothText: "Midjourney Standard Shared (BDT 1,199) + Ideogram (BDT 2,990) = BDT 4,189/mo — use Midjourney for photos and art, Ideogram for designs with text.",
    whoTable: [
      { persona: "Photographers & digital artists", pick: "Midjourney — BDT 1,199/mo", reason: "Best photorealistic and artistic image quality of any AI tool." },
      { persona: "Graphic designers & brand designers", pick: "Ideogram — from BDT 2,990/mo", reason: "Reliable text rendering inside images — essential for logo and poster design." },
      { persona: "Social media managers", pick: "Ideogram", reason: "Creates graphics with readable captions, CTAs, and branded text." },
    ],
    relatedGuides: [
      { label: "Best AI for Designers", href: "/best-ai-for-designers" },
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Marketers", href: "/best-ai-for-marketers" },
    ],
  },
  "copilot-vs-cursor": {
    title: "GitHub Copilot vs Cursor — Best AI Code Editor 2026",
    h1: "GitHub Copilot vs Cursor — Which AI Code Tool Should You Use?",
    aioSnippet: "GitHub Copilot vs Cursor in Bangladesh 2026: Copilot Pro (BDT 1,495/mo) plugs into your existing VS Code or JetBrains with zero workflow change. Cursor Pro (BDT 2,990/mo) offers a full AI-native coding environment with autonomous agent mode that can write entire features from a single prompt. Both available via bKash — order on WhatsApp and receive access in under 2 hours.",
    metaDescription: "GitHub Copilot vs Cursor 2026. Best AI code editor compared. Prices in BDT.",
    canonical: "https://aipremiumshop.com/copilot-vs-cursor",
    productA: { name: "GitHub Copilot Pro", color: "#6e40c9", orderText: "Order Copilot" },
    productB: { name: "Cursor Pro", color: "#3b82f6", orderText: "Order Cursor" },
    rows: [
      { feature: "AIPS price", a: "BDT 1,495/mo", b: "BDT 2,990/mo" },
      { feature: "Works in", a: "VS Code, JetBrains, Neovim, Visual Studio", b: "Cursor editor (VS Code fork)" },
      { feature: "Agent mode", a: "Cloud agents (limited)", b: "Full autonomous agent mode" },
      { feature: "AI models", a: "GPT-5.4, Claude Opus 4.6, Gemini", b: "All frontier models" },
      { feature: "Codebase indexing", a: "Partial", b: "Full codebase understanding" },
      { feature: "Chat with code", a: true, b: true },
      { feature: "Code completion", a: true, b: true },
      { feature: "Change existing IDE", a: false, b: true },
      { feature: "Multi-file editing", a: "Limited", b: "Full agent-driven" },
      { feature: "Best for", a: "IDE integration with existing workflow", b: "Full AI-native coding experience" },
    ],
    verdict: "Both tools make you a faster developer. The right choice depends on how much you want to change your workflow.",
    verdictA: "Choose GitHub Copilot if you want AI assistance inside your existing editor without changing anything. It plugs into VS Code or JetBrains and starts helping immediately. Best starting point for most developers.",
    verdictB: "Choose Cursor if you want the most powerful AI coding experience available. Its agent mode can write entire features autonomously. Many professional developers at top tech companies have switched to Cursor as their primary editor.",
    buyBothText: "GitHub Copilot Pro (BDT 1,495) + Cursor Pro (BDT 2,990) = BDT 4,485/mo — use Copilot in your main IDE and Cursor for complex agent tasks.",
    whoTable: [
      { persona: "Developers new to AI tools", pick: "GitHub Copilot Pro — BDT 1,495", reason: "No IDE change required — start getting completions in VS Code today." },
      { persona: "Full-stack / startup developers", pick: "Cursor Pro — BDT 2,990", reason: "Agent mode builds entire features from a single prompt." },
      { persona: "Budget-conscious developers", pick: "GitHub Copilot Pro", reason: "Half the price of Cursor with proven productivity gains." },
    ],
    relatedGuides: [
      { label: "Best AI for Developers", href: "/best-ai-for-developers" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
    ],
  },
};

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value
      ? <span className="inline-flex items-center justify-center text-emerald-400 font-semibold"><Check className="w-5 h-5" /></span>
      : <X className="w-5 h-5 mx-auto" style={{ color: "#ef4444" }} />;
  }
  return <span className="text-sm" style={{ color: "#c9ceda" }}>{value}</span>;
}

interface ComparisonPageProps {
  compKey: string;
}

export default function ComparisonPage({ compKey }: ComparisonPageProps) {
  const comp = COMPARISONS[compKey];
  if (!comp) return null;

  const orderAUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${comp.productA.name}`)}`;
  const orderBUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${comp.productB.name}`)}`;

  return (
    <PageLayout>
      <SEOHead title={comp.title} description={comp.metaDescription} canonical={comp.canonical} />
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Compare", href: "/blog" },
        { name: `${comp.productA.name.split(" ")[0]} vs ${comp.productB.name.split(" ")[0]}` },
      ]} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-14">

        {/* Hero */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-white/20" style={{ color: "#c9ceda" }}>
            ⚡ Head-to-Head Comparison — Bangladesh 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{comp.h1}</h1>
        </motion.div>

        {/* AIO Snippet */}
        <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
          className="p-5 rounded-2xl border mb-8"
          style={{ backgroundColor: "rgba(244,185,66,0.06)", borderColor: "rgba(244,185,66,0.25)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#e8d5a3" }}>{comp.aioSnippet}</p>
        </motion.div>

        {/* VS Visual */}
        <motion.div custom={0.8} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: comp.productA.color + "33", color: comp.productA.color }}>
              {comp.productA.name.charAt(0)}
            </div>
            <span className="text-gray-500 text-2xl font-bold">VS</span>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: comp.productB.color + "33", color: comp.productB.color }}>
              {comp.productB.name.charAt(0)}
            </div>
          </div>
        </motion.div>

        {/* Product Labels */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl border text-center"
            style={{ backgroundColor: comp.productA.color + "15", borderColor: comp.productA.color + "40" }}>
            <div className="font-bold text-base" style={{ color: comp.productA.color }}>{comp.productA.name}</div>
          </div>
          <div className="p-4 rounded-2xl border text-center"
            style={{ backgroundColor: comp.productB.color + "15", borderColor: comp.productB.color + "40" }}>
            <div className="font-bold text-base" style={{ color: comp.productB.color }}>{comp.productB.name}</div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="rounded-2xl border border-white/10 overflow-hidden mb-10"
          style={{ backgroundColor: "#151b3d" }}>
          <div className="grid grid-cols-[1fr_1fr_1fr] text-xs font-semibold uppercase tracking-wider border-b border-white/10 bg-white/[0.03]"
            style={{ color: "#c9ceda" }}>
            <div className="p-4">Feature</div>
            <div className="p-4 border-l border-white/10 text-center" style={{ color: comp.productA.color }}>{comp.productA.name.split(" ")[0]}</div>
            <div className="p-4 border-l border-white/10 text-center" style={{ color: comp.productB.color }}>{comp.productB.name.split(" ")[0]}</div>
          </div>
          {comp.rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-[1fr_1fr_1fr] border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
              <div className="p-4 text-sm font-medium text-white">{row.feature}</div>
              <div className="p-4 border-l border-white/10 text-center flex items-center justify-center">
                <Cell value={row.a} />
              </div>
              <div className="p-4 border-l border-white/10 text-center flex items-center justify-center">
                <Cell value={row.b} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Verdict */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Our Verdict</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>{comp.verdict}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg p-6 border-l-4"
              style={{ backgroundColor: comp.productA.color + "0d", borderLeftColor: comp.productA.color }}>
              <div className="font-bold mb-2" style={{ color: comp.productA.color }}>Choose {comp.productA.name.split(" (")[0]}</div>
              <p className="text-sm" style={{ color: "#c9ceda" }}>{comp.verdictA}</p>
            </div>
            <div className="rounded-lg p-6 border-l-4"
              style={{ backgroundColor: comp.productB.color + "0d", borderLeftColor: comp.productB.color }}>
              <div className="font-bold mb-2" style={{ color: comp.productB.color }}>Choose {comp.productB.name.split(" (")[0]}</div>
              <p className="text-sm" style={{ color: "#c9ceda" }}>{comp.verdictB}</p>
            </div>
          </div>
        </motion.div>

        {/* Who Should Choose */}
        <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Who Should Choose What?</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
            <div className="grid grid-cols-[1fr_1fr_1fr] text-xs font-semibold uppercase tracking-wider border-b border-white/10 bg-white/[0.03]"
              style={{ color: "#c9ceda" }}>
              <div className="p-4">If you are…</div>
              <div className="p-4 border-l border-white/10">Our pick</div>
              <div className="p-4 border-l border-white/10">Why</div>
            </div>
            {comp.whoTable.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_1fr_1fr] border-b border-white/5 ${i % 2 !== 0 ? "bg-white/2" : ""}`}>
                <div className="p-4 text-sm font-medium text-white">{row.persona}</div>
                <div className="p-4 border-l border-white/10 text-sm font-semibold" style={{ color: "#f4b942" }}>{row.pick}</div>
                <div className="p-4 border-l border-white/10 text-sm" style={{ color: "#c9ceda" }}>{row.reason}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Decision Matrix — ChatGPT vs Claude */}
        {compKey === "chatgpt-vs-claude" && (
          <motion.div custom={3.8} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-10 rounded-2xl border overflow-hidden"
            style={{ backgroundColor: "#0e1535", borderColor: "rgba(16,163,127,0.3)" }}>
            <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <h2 className="text-xl font-bold text-white">Quick Decision</h2>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✔</span>
                <div><span className="font-bold text-white">Choose ChatGPT if:</span> <span style={{ color: "#c9ceda" }}>You want one tool for everything — writing, coding, images, agents, research</span></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✔</span>
                <div><span className="font-bold text-white">Choose Claude if:</span> <span style={{ color: "#c9ceda" }}>You write long documents, legal content, or do complex code review</span></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✔</span>
                <div><span className="font-bold text-white">Choose BOTH if:</span> <span style={{ color: "#c9ceda" }}>You're a professional who needs the best of both worlds (৳1,845/mo)</span></div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <div className="text-xs font-semibold mb-3" style={{ color: "#f4b942" }}>Real-world test results:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { cat: "Writing quality", winner: "Claude wins", desc: "Opus 4.6 = #1 on Chatbot Arena" },
                  { cat: "Coding speed", winner: "ChatGPT wins", desc: "Codex agent builds full features" },
                  { cat: "Image generation", winner: "ChatGPT wins", desc: "DALL-E built in, Claude has none" },
                  { cat: "Research", winner: "Tie", desc: "Both excellent for research" },
                  { cat: "Agents", winner: "ChatGPT wins", desc: "Custom GPTs, deep research, Codex" },
                  { cat: "Price", winner: "ChatGPT wins", desc: "৳350 vs Claude ৳1,495" },
                ].map((row) => (
                  <div key={row.cat} className="rounded-lg p-2.5 border border-white/10" style={{ backgroundColor: "#151b3d" }}>
                    <div style={{ color: "#c9ceda" }}>{row.cat}</div>
                    <div className="font-semibold" style={{ color: "#f4b942" }}>{row.winner}</div>
                    <div style={{ color: "#6b7280" }}>{row.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Decision Matrix — ChatGPT vs Gemini */}
        {compKey === "chatgpt-vs-gemini" && (
          <motion.div custom={3.8} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-10 rounded-2xl border overflow-hidden"
            style={{ backgroundColor: "#0e1535", borderColor: "rgba(16,163,127,0.3)" }}>
            <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <h2 className="text-xl font-bold text-white">Quick Decision</h2>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✔</span>
                <div><span className="font-bold text-white">Choose ChatGPT if:</span> <span style={{ color: "#c9ceda" }}>You want the most versatile AI with agents + coding + images</span></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✔</span>
                <div><span className="font-bold text-white">Choose Google AI if:</span> <span style={{ color: "#c9ceda" }}>You live in Google ecosystem (Gmail, Docs, Drive) and want 2TB storage</span></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✔</span>
                <div><span className="font-bold text-white">Choose BOTH if:</span> <span style={{ color: "#c9ceda" }}>ChatGPT for work + Google AI for email/docs (৳850/mo total)</span></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Order CTAs */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="p-8 rounded-2xl border border-white/10 text-center"
          style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-2">Ready to order?</h2>
          <p className="text-sm mb-2" style={{ color: "#c9ceda" }}>
            Both delivered in 5–30 minutes. Pay with bKash, Nagad, or Rocket. 30-day warranty.
          </p>
          {comp.buyBothText && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border mb-6"
              style={{ backgroundColor: "#f4b94210", borderColor: "#f4b94230", color: "#f4b942" }}>
              💡 {comp.buyBothText}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={orderAUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity border"
              style={{ backgroundColor: comp.productA.color + "20", borderColor: comp.productA.color + "50", color: comp.productA.color }}>
              <MessageCircle className="w-4 h-4" />
              {comp.productA.orderText}
            </a>
            <a href={orderBUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity border"
              style={{ backgroundColor: comp.productB.color + "20", borderColor: comp.productB.color + "50", color: comp.productB.color }}>
              <MessageCircle className="w-4 h-4" />
              {comp.productB.orderText}
            </a>
            <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I want to order BOTH " + comp.productA.name.split(" ")[0] + " and " + comp.productB.name.split(" ")[0])}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Buy Both
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 justify-center">
            <Link href="/products"
              className="inline-flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
              style={{ color: "#c9ceda" }}>
              Browse all 56 AI tools
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {comp.relatedGuides.length > 0 && (
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-8 p-6 rounded-2xl border border-white/10"
            style={{ backgroundColor: "#151b3d" }}>
            <h3 className="font-semibold text-white mb-1">Role-specific guides</h3>
            <p className="text-sm mb-4" style={{ color: "#c9ceda" }}>See which tool our experts recommend for your use case.</p>
            <div className="flex flex-wrap gap-3">
              {comp.relatedGuides.map((g) => (
                <Link key={g.href} href={g.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#f4b94212", borderColor: "#f4b94230", color: "#f4b942", minHeight: "44px" }}>
                  {g.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}
