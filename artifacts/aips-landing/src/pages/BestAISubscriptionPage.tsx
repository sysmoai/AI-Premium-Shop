import { motion } from "framer-motion";
import { TOTAL_PRODUCTS, cheapestPriceFor } from "@/lib/catalogStats";
import { MessageCircle, ChevronRight, ArrowRight, Star } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07 } }),
};

const TOP_TOOLS = [
  {
    rank: 1, name: "ChatGPT Plus", price: "from BDT 499/mo", badge: "Best All-Rounder",
    badgeColor: "#10a37f", slug: "/chatgpt-plans-bangladesh",
    why: "Most versatile AI available. Writing, coding, image generation, web search, and autonomous agents in one tool. Cheapest entry point in our catalog.",
    bestFor: ["Students", "Writers", "Developers", "Everyone"],
  },
  {
    rank: 2, name: "Google AI Pro", price: "BDT 499/mo", badge: "Best Value",
    badgeColor: "#4285f4", slug: "/gemini-advanced-bangladesh",
    why: "Personal Gmail account, 2TB Drive storage, and AI in every Google app — for BDT 500/month. Strong value for Google Workspace users.",
    bestFor: ["Professionals", "Students", "Job seekers"],
  },
  {
    rank: 3, name: "Claude Pro", price: "from BDT 599/mo", badge: "Strong for Writing",
    badgeColor: "#d97706", slug: "/claude-pro-bangladesh",
    why: "Strong writing quality on independent benchmarks, a 1M token context window, and Claude Code for developers. A solid choice for writers, researchers, and analysts.",
    bestFor: ["Writers", "Researchers", "Lawyers", "Developers"],
  },
  {
    rank: 4, name: "GitHub Copilot Pro", price: "BDT 1,495/mo", badge: "Best for Developers",
    badgeColor: "#6e40c9", slug: "/github-copilot-bangladesh",
    why: "Works inside VS Code and JetBrains with zero workflow change. Unlimited code completions, 300 premium model requests, and multi-file editing. The highest-ROI tool for developers.",
    bestFor: ["Developers", "Software engineers"],
  },
  {
    rank: 5, name: "Midjourney", price: "from BDT 1,199/mo", badge: "Best for Images",
    badgeColor: "#8b5cf6", slug: "/midjourney-bangladesh",
    why: "Photorealistic and artistic image generation. Popular with designers and content creators.",
    bestFor: ["Designers", "Content creators", "Marketers"],
  },
  {
    rank: 6, name: "Perplexity Pro", price: "from BDT 599/mo", badge: "Best for Research",
    badgeColor: "#20b2aa", slug: "/perplexity-pro-bangladesh",
    why: "AI-powered search with citations and source links. Answers any research question with references you can verify. Best research tool at the lowest price.",
    bestFor: ["Researchers", "Students", "Journalists"],
  },
  {
    rank: 7, name: "Cursor Pro", price: "from BDT 2,990/mo", badge: "Best AI IDE",
    badgeColor: "#3b82f6", slug: "/cursor-bangladesh",
    why: "An AI-native coding environment. Agent mode can build entire features from a single prompt.",
    bestFor: ["Full-stack developers", "Startup founders"],
  },
  {
    rank: 8, name: "ElevenLabs", price: "from BDT 748/mo", badge: "Best for Voice",
    badgeColor: "#f97316", slug: "/elevenlabs-bangladesh",
    why: "AI voice cloning and text-to-speech. Create voiceovers, clone your voice, or generate narration in any language.",
    bestFor: ["Content creators", "Marketers", "Podcasters"],
  },
  {
    rank: 9, name: "Notion AI", price: "from BDT 800/mo", badge: "Best Workspace AI",
    badgeColor: "#fff", slug: "/notion-business-bangladesh",
    why: "AI built into the most popular workspace tool. Write, summarize, and organize directly in your Notion pages. Best for teams and knowledge workers.",
    bestFor: ["Teams", "Managers", "Knowledge workers"],
  },
  {
    rank: 10, name: "Suno AI", price: "from BDT 1,199/mo", badge: "Best for Music",
    badgeColor: "#ec4899", slug: "/suno-ai-bangladesh",
    why: "Generate complete songs with lyrics, instruments, and vocals from a text prompt. The best AI music generator for content creators and marketers who need background music.",
    bestFor: ["Musicians", "Content creators", "Video editors"],
  },
];

const CATEGORY_TABLE = [
  { category: "AI Writing", best: "Claude Pro", price: "BDT 599/mo", runner: "ChatGPT Plus", slug: "/claude-pro-bangladesh" },
  { category: "AI Coding", best: "GitHub Copilot Pro", price: "BDT 1,495/mo", runner: "Cursor Pro", slug: "/github-copilot-bangladesh" },
  { category: "AI Images", best: "Midjourney", price: "BDT 1,199/mo", runner: "Ideogram", slug: "/midjourney-bangladesh" },
  { category: "AI Research", best: "Perplexity Pro", price: "BDT 599/mo", runner: "ChatGPT Plus", slug: "/perplexity-pro-bangladesh" },
  { category: "AI Video", best: "Runway", price: "BDT 1,794/mo", runner: "HeyGen", slug: "/runway-bangladesh" },
  { category: "AI Voice", best: "ElevenLabs", price: "BDT 748/mo", runner: "HeyGen", slug: "/elevenlabs-bangladesh" },
  { category: "AI Music", best: "Suno AI", price: "BDT 1,199/mo", runner: "Udio", slug: "/suno-ai-bangladesh" },
  { category: "AI Workspace", best: "Notion AI", price: "BDT 800/mo", runner: "Google AI Pro", slug: "/notion-business-bangladesh" },
];

const BUDGET_RECS = [
  { budget: "Under BDT 500", title: "Best starter combo", tools: "ChatGPT Plus (BDT 499) + Perplexity Pro (BDT 499)", href: "/ai-under-500" },
  { budget: "BDT 500–1,000", title: "Best solo tool", tools: "Google AI Pro (BDT 499) — personal account, 2TB Drive, AI in all Google apps", href: "/ai-under-1000" },
  { budget: "BDT 1,000–2,000", title: "Writer's stack", tools: `Claude Pro (from BDT ${(cheapestPriceFor("claude-pro-bangladesh") ?? 0).toLocaleString()}) — the best writing quality, 1M context`, href: "/ai-under-3000" },
  { budget: "BDT 2,000+", title: "Developer stack", tools: "Cursor Pro (BDT 2,990) — full AI-native coding environment with agent mode", href: "/ai-under-3000" },
];

export default function BestAISubscriptionPage() {
  const [, navigate] = useLocation();
  return (
    <PageLayout>
      <SEOHead
        title="Best AI Subscription 2026 Bangladesh — Top 10 | AI Premium Shop"
        description="The best AI subscriptions available in Bangladesh in 2026, ranked by value. ChatGPT, Claude, Google AI Pro, Midjourney and more — with BDT prices and local payment."
        canonical="https://aipremiumshop.com/best-ai-subscription-2026"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Best AI Subscription 2026" }]} />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-14">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/20"
            style={{ color: "#c9ceda" }}>
            ⭐ Updated April 2026 — Bangladesh
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Best AI Subscription Bangladesh 2026 — Complete Guide
          </h1>
          <p className="text-lg mb-4" style={{ color: "#c9ceda" }}>
            {TOTAL_PRODUCTS} premium AI tools ranked by value, use case, and price. All available in Bangladesh via bKash — no international card needed.
          </p>
        </motion.div>

        {/* AIO Snippet */}
        <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
          className="p-5 rounded-2xl border mb-10"
          style={{ backgroundColor: "rgba(244,185,66,0.06)", borderColor: "rgba(244,185,66,0.25)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#e8d5a3" }}>
            {`The best AI subscription in Bangladesh in 2026 depends on your use case: for the best all-round value, ChatGPT Plus Shared starts at BDT ${(cheapestPriceFor("chatgpt-plus-bangladesh") ?? 0).toLocaleString()}/month. For the best writing quality, Claude Pro starts at BDT ${(cheapestPriceFor("claude-pro-bangladesh") ?? 0).toLocaleString()}/month. For the best value overall, Google AI Pro at BDT ${(cheapestPriceFor("gemini-advanced-bangladesh") ?? 0).toLocaleString()}/month includes a personal Gmail account and 2TB storage. For developers, GitHub Copilot Pro (from BDT ${(cheapestPriceFor("github-copilot-bangladesh") ?? 0).toLocaleString()}/month) offers the highest return on investment. All available via bKash or Nagad — delivery in 5–30 minutes on WhatsApp.`}
          </p>
        </motion.div>

        {/* Top 10 Ranked List */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Top 10 AI Subscriptions Bangladesh 2026</h2>
          <div className="space-y-4">
            {TOP_TOOLS.map((tool, i) => {
              const waUrl = `${WHATSAPP}?text=${encodeURIComponent("Hi, I want to order " + tool.name)}`;
              return (
                <motion.div key={i} custom={i + 1} variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl border border-white/10 border-l-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ backgroundColor: "#151b3d", borderLeftColor: tool.badgeColor }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-lg"
                      style={{ backgroundColor: tool.badgeColor + "20", border: `1px solid ${tool.badgeColor}40` }}>
                      {tool.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-white text-base"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(tool.slug)}>
                          {tool.name}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ backgroundColor: tool.badgeColor + "20", color: tool.badgeColor }}>
                          {tool.badge}
                        </span>
                      </div>
                      {/* Derived from the slug this card already links to. Four of the eight
                          typed prices here disagreed with the product they sat beside —
                          Claude Pro at BDT 1,495 (that is Copilot's price) against a real
                          599, Perplexity at 499 against 599. */}
                      <div className="text-sm font-semibold mb-2" style={{ color: "#f4b942" }}>
                        {(() => {
                          const p = cheapestPriceFor(tool.slug.replace(/^\//, ""));
                          return p == null ? tool.price : `from BDT ${p.toLocaleString()}/mo`;
                        })()}
                      </div>
                      <p className="text-sm mb-3" style={{ color: "#c9ceda" }}>{tool.why}</p>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="text-xs" style={{ color: "#c9ceda" }}>Best for:</span>
                        {tool.bestFor.map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full border"
                            style={{ borderColor: "rgba(255,255,255,0.1)", color: "#c9ceda" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <a href={waUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#008236", color: "#fff" }}>
                        <MessageCircle className="w-3.5 h-3.5" />
                        Order
                      </a>
                      <button onClick={() => navigate(tool.slug)}
                        className="flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white hover:bg-white/5 transition-colors">
                        Details
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Best by category */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-5">Best AI by Category</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
            <div className="grid grid-cols-4 text-xs font-semibold uppercase tracking-wider border-b border-white/10 px-5 py-3 bg-white/[0.03]"
              style={{ color: "#c9ceda" }}>
              <div>Category</div>
              <div>Best Pick</div>
              <div>Price</div>
              <div>Runner-up</div>
            </div>
            {CATEGORY_TABLE.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 items-center px-5 py-3.5 ${i > 0 ? "border-t border-white/5" : ""}`}>
                <div className="text-sm font-medium text-white">{row.category}</div>
                <div>
                  <a href={row.slug} onClick={(e) => { e.preventDefault(); navigate(row.slug); }}
                    className="text-sm font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "#f4b942" }}>
                    {row.best}
                  </a>
                </div>
                {/* CATEGORY_TABLE carries its own typed prices, so the page showed
                    Claude Pro at 599 in the cards above and 1,495 in this table —
                    the same page disagreeing with itself. Derived from row.slug. */}
                <div className="text-sm" style={{ color: "#c9ceda" }}>
                  {(() => {
                    const p = cheapestPriceFor(row.slug.replace(/^\//, ""));
                    return p == null ? row.price : `from BDT ${p.toLocaleString()}`;
                  })()}
                </div>
                <div className="text-sm" style={{ color: "#c9ceda" }}>{row.runner}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Budget recommendations */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-5">Best AI Subscription by Budget</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BUDGET_RECS.map((rec, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                style={{ backgroundColor: "#151b3d" }}
                onClick={() => navigate(rec.href)}>
                <div className="text-xs font-semibold mb-2 px-2 py-0.5 rounded-full w-fit"
                  style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>
                  {rec.budget}
                </div>
                <div className="font-bold text-white text-sm mb-2">{rec.title}</div>
                <p className="text-xs" style={{ color: "#c9ceda" }}>{rec.tools}</p>
                <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: "#f4b942" }}>
                  See tools at this price
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Guide links */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Find the Best AI for Your Role</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Students", href: "/best-ai-for-students" },
              { label: "Freelancers", href: "/best-ai-for-freelancers" },
              { label: "Content Creators", href: "/best-ai-for-creators" },
              { label: "Business Owners", href: "/best-ai-for-business" },
              { label: "Developers", href: "/best-ai-for-developers" },
              { label: "Job Seekers", href: "/best-ai-for-job-seekers" },
              { label: "Designers", href: "/best-ai-for-designers" },
              { label: "Marketers", href: "/best-ai-for-marketers" },
              { label: "E-commerce Sellers", href: "/best-ai-for-ecommerce" },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 hover:border-white/25 text-sm font-medium text-white hover:bg-white/3 transition-colors">
                {guide.label}
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#f4b942" }} />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="p-8 rounded-2xl border border-white/10 text-center"
          style={{ backgroundColor: "#151b3d" }}>
          <Star className="w-8 h-8 mx-auto mb-3" style={{ color: "#f4b942" }} />
          <h2 className="text-xl font-bold text-white mb-2">Not sure which one to get?</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Tell us what you want to do and your budget. We'll recommend the best tool in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I need help choosing the best AI tool for my needs")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#008236", color: "#fff" }}>
              <MessageCircle className="w-5 h-5" />
              Ask us on WhatsApp
            </a>
            <Link href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors">
              Browse All {TOTAL_PRODUCTS} Tools
            </Link>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
