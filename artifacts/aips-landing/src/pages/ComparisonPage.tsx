import { motion, type Variants } from "framer-motion";
import { MessageCircle, ArrowRight, Check, X } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

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

interface CompConfig {
  title: string;
  h1: string;
  metaDescription: string;
  canonical: string;
  productA: { name: string; color: string; orderText: string };
  productB: { name: string; color: string; orderText: string };
  rows: CompRow[];
  verdict: string;
  verdictA: string;
  verdictB: string;
  relatedGuides: { label: string; href: string }[];
}

const COMPARISONS: Record<string, CompConfig> = {
  "chatgpt-vs-claude": {
    title: "ChatGPT vs Claude — Which AI Should You Buy? Bangladesh 2026 | AI Premium Shop",
    h1: "ChatGPT vs Claude — Which One Is Right for You?",
    metaDescription: "ChatGPT vs Claude comparison 2026 Bangladesh. Compare prices, features, and use cases. Both available from BDT 350–400 with bKash payment.",
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
      { feature: "Shared price (AIPS)", a: "From BDT 350/mo", b: "From BDT 400/mo" },
      { feature: "Private price (AIPS)", a: "BDT 700/mo", b: "BDT 750/mo" },
      { feature: "Web search", a: true, b: false },
      { feature: "Savings vs official", a: "~88%", b: "~80%" },
    ],
    verdict: "Both are world-class AI tools available at Bangladesh prices. Your choice depends on your primary use case.",
    verdictA: "Choose ChatGPT if you want an all-in-one tool that does everything — text, images, web search, code, and agents. It's also the cheapest option at BDT 350.",
    verdictB: "Choose Claude if you need the best writing quality, the longest document analysis (1M token context), or the most advanced reasoning. Claude is ranked #1 on the independent Chatbot Arena benchmark.",
    relatedGuides: [
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
      { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
    ],
  },
  "chatgpt-vs-gemini": {
    title: "ChatGPT vs Google AI Pro — Comparison Bangladesh 2026 | AI Premium Shop",
    h1: "ChatGPT vs Google AI Pro — Which Should You Choose?",
    metaDescription: "ChatGPT vs Google AI Pro (Gemini) comparison Bangladesh 2026. ChatGPT at BDT 350 vs Google AI Pro at BDT 500. Compare features, prices, and use cases.",
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
    relatedGuides: [
      { label: "Best AI for Students", href: "/best-ai-for-students" },
      { label: "Best AI for Business", href: "/best-ai-for-business" },
      { label: "Best AI for Job Seekers", href: "/best-ai-for-job-seekers" },
    ],
  },
  "copilot-vs-cursor": {
    title: "GitHub Copilot vs Cursor — Best AI Coding Tool 2026 | AI Premium Shop",
    h1: "GitHub Copilot vs Cursor — Which AI Code Tool Should You Use?",
    metaDescription: "GitHub Copilot vs Cursor comparison Bangladesh 2026. Copilot at BDT 600 vs Cursor Pro at BDT 1,100. Which AI coding tool is right for you?",
    canonical: "https://aipremiumshop.com/copilot-vs-cursor",
    productA: { name: "GitHub Copilot Pro", color: "#6e40c9", orderText: "Order Copilot" },
    productB: { name: "Cursor Pro", color: "#3b82f6", orderText: "Order Cursor" },
    rows: [
      { feature: "AIPS price", a: "BDT 600/mo", b: "BDT 1,100/mo" },
      { feature: "Works in", a: "VS Code, JetBrains, Neovim, Visual Studio", b: "Cursor editor (VS Code fork)" },
      { feature: "Agent mode", a: "Cloud agents (limited)", b: "Full autonomous agent mode" },
      { feature: "AI models", a: "GPT-5.4, Claude 3.5, Gemini", b: "All frontier models" },
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
    relatedGuides: [
      { label: "Best AI for Developers", href: "/best-ai-for-developers" },
      { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
    ],
  },
};

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value
      ? <Check className="w-5 h-5 mx-auto" style={{ color: "#25d366" }} />
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

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-14">

        {/* Hero */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border border-white/20" style={{ color: "#c9ceda" }}>
            ⚡ Head-to-Head Comparison — Bangladesh 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{comp.h1}</h1>
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
          <div className="grid grid-cols-[1fr_1fr_1fr] text-xs font-semibold uppercase tracking-wider border-b border-white/10"
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
            <div className="p-5 rounded-2xl border"
              style={{ backgroundColor: comp.productA.color + "12", borderColor: comp.productA.color + "35" }}>
              <div className="font-bold mb-2" style={{ color: comp.productA.color }}>Choose {comp.productA.name.split(" (")[0]}</div>
              <p className="text-sm" style={{ color: "#c9ceda" }}>{comp.verdictA}</p>
            </div>
            <div className="p-5 rounded-2xl border"
              style={{ backgroundColor: comp.productB.color + "12", borderColor: comp.productB.color + "35" }}>
              <div className="font-bold mb-2" style={{ color: comp.productB.color }}>Choose {comp.productB.name.split(" (")[0]}</div>
              <p className="text-sm" style={{ color: "#c9ceda" }}>{comp.verdictB}</p>
            </div>
          </div>
        </motion.div>

        {/* Order CTAs */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="p-8 rounded-2xl border border-white/10 text-center"
          style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-2">Ready to order?</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Both delivered in 5–30 minutes. Pay with bKash, Nagad, or Rocket. 30-day warranty.
          </p>
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
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              Not sure? Ask us
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 justify-center">
            <Link href="/products"
              className="inline-flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
              style={{ color: "#c9ceda" }}>
              Browse all 31 AI tools
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
