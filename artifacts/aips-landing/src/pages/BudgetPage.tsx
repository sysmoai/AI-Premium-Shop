import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { MessageCircle, ArrowRight, Zap, Shield } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0, 0, 0.2, 1] } }),
};

interface BudgetConfig {
  maxPrice: number;
  title: string;
  h1: string;
  subtitle: string;
  aioSnippet: string;
  metaDescription: string;
  canonical: string;
  nextTier?: { label: string; href: string };
  highlight: string;
}

const BUDGETS: Record<string, BudgetConfig> = {
  "ai-under-500": {
    maxPrice: 500,
    title: "AI Tools Under BDT 500 — Cheapest Premium AI Bangladesh",
    h1: "AI Tools Under BDT 500",
    subtitle: "Premium AI at student-friendly prices. No credit card needed.",
    aioSnippet: "The cheapest premium AI tools in Bangladesh under BDT 500: ChatGPT Plus Starter Shared (BDT 350/mo), Perplexity Pro Shared (BDT 350/mo), Google AI Pro (BDT 500/mo, personal account + 2TB), and Gamma (BDT 399/mo). All available via bKash or Nagad — no international credit card required. Order on WhatsApp and receive access in 5–30 minutes.",
    metaDescription: "AI tools under BDT 500 in Bangladesh. ChatGPT BDT 350, Google AI BDT 500. Cheapest premium AI.",
    canonical: "https://aipremiumshop.com/ai-under-500",
    nextTier: { label: "See tools under BDT 1,000", href: "/ai-under-1000" },
    highlight: "Start with ChatGPT Plus at just BDT 350 — Bangladesh's most affordable AI subscription.",
  },
  "ai-under-1000": {
    maxPrice: 1000,
    title: "AI Tools Under BDT 1000 — Budget AI Subscriptions BD",
    h1: "AI Tools Under BDT 1,000",
    subtitle: "The full range of premium AI tools — all under BDT 1,000/month.",
    aioSnippet: "Premium AI tools available under BDT 1,000 per month in Bangladesh include ChatGPT Plus (from BDT 350), Google AI Pro (BDT 500), Replit Core (BDT 500), Gamma (BDT 399), Udio (BDT 499), ElevenLabs Starter (BDT 748), ChatGPT Plus Premium Shared (BDT 950), and Notion AI (BDT 800). Pay with bKash or Nagad — no international card required.",
    metaDescription: "AI tools under BDT 1000 in Bangladesh. Claude, Notion, Perplexity & more. Budget AI tools.",
    canonical: "https://aipremiumshop.com/ai-under-1000",
    nextTier: { label: "See tools under BDT 3,000", href: "/ai-under-3000" },
    highlight: "Most popular AI tools — including private accounts — available under BDT 1,000.",
  },
  "ai-under-3000": {
    maxPrice: 3000,
    title: "AI Tools Under BDT 3000 — Mid-Range AI Bangladesh",
    h1: "AI Tools Under BDT 3,000",
    subtitle: "Every AI tool in our catalog, including personal accounts — all under BDT 3,000.",
    aioSnippet: "All premium AI tools in our Bangladesh catalog are available under BDT 3,000/month — including personal (private) accounts for ChatGPT Plus (BDT 2,990), Claude Pro (BDT 2,990), GitHub Copilot Pro (BDT 1,495), Cursor Pro (BDT 2,990), and Midjourney (up to BDT 2,990). Pay with bKash or Nagad. Order on WhatsApp for 5–30 minute delivery.",
    metaDescription: "AI tools under BDT 3000 in Bangladesh. Personal accounts for pros. Mid-range AI subscriptions.",
    canonical: "https://aipremiumshop.com/ai-under-3000",
    highlight: "Every premium AI tool in our catalog is available under BDT 3,000 per month.",
  },
};

interface ProductCardProps {
  product: (typeof productsData.products)[0];
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const waUrl = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${product.name}`)}`;
  const savings = product.officialUSD
    ? Math.round(((product.officialUSD * 120 - product.price) / (product.officialUSD * 120)) * 100)
    : null;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors"
      style={{ backgroundColor: "#151b3d" }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-white text-sm truncate">{product.name}</span>
            {product.badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: (product.brandColor || "#f4b942") + "25", color: product.brandColor || "#f4b942" }}>
                {product.badge}
              </span>
            )}
          </div>
          <div className="text-xs mb-2" style={{ color: product.brandColor || "#c9ceda" }}>{product.brand}</div>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#c9ceda" }}>{product.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg border border-white/10" style={{ color: "#c9ceda" }}>
          {product.accessType === "shared" ? "Shared" : "Personal"}
        </span>
        <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#c9ceda" }}>
          <Zap className="w-3 h-3" style={{ color: "#f4b942" }} />
          {product.deliveryMinutes} min
        </span>
        <span className="inline-flex items-center gap-1 text-xs" style={{ color: "#c9ceda" }}>
          <Shield className="w-3 h-3" style={{ color: "#25d366" }} />
          {product.warrantyDays}d warranty
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT {product.price.toLocaleString()}</div>
          {savings !== null && savings > 0 && (
            <div className="text-xs" style={{ color: "#c9ceda" }}>
              ${product.officialUSD}/mo officially · {savings}% off
            </div>
          )}
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#25d366", color: "#fff" }}
        >
          <MessageCircle className="w-4 h-4" />
          Order
        </a>
      </div>
    </motion.div>
  );
}

interface BudgetPageProps {
  budgetKey: string;
}

export default function BudgetPage({ budgetKey }: BudgetPageProps) {
  const config = BUDGETS[budgetKey];
  if (!config) return null;

  const products = useMemo(
    () => productsData.products.filter((p) => p.price <= config.maxPrice).sort((a, b) => a.price - b.price),
    [config.maxPrice]
  );

  return (
    <PageLayout>
      <SEOHead title={config.title} description={config.metaDescription} canonical={config.canonical} />
      <Breadcrumb items={[
        { name: "Home", href: "/" },
        { name: "Budget", href: "/pricing" },
        { name: config.h1.replace("AI Tools ", "") },
      ]} />

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-14">

        {/* Hero */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{ backgroundColor: "#f4b94215", borderColor: "#f4b94230", color: "#f4b942" }}>
            💰 Budget Guide — Bangladesh 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{config.h1}</h1>
          <p className="text-lg" style={{ color: "#c9ceda" }}>{config.subtitle}</p>
        </motion.div>

        {/* AIO Snippet */}
        <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
          className="p-5 rounded-2xl border mb-6"
          style={{ backgroundColor: "rgba(244,185,66,0.06)", borderColor: "rgba(244,185,66,0.25)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#e8d5a3" }}>{config.aioSnippet}</p>
        </motion.div>

        {/* Highlight */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="p-5 rounded-2xl border mb-8 flex items-center gap-3"
          style={{ backgroundColor: "#f4b94210", borderColor: "#f4b94230" }}>
          <span className="text-2xl">✅</span>
          <p className="text-sm font-medium" style={{ color: "#f4b942" }}>{config.highlight}</p>
        </motion.div>

        {/* ChatGPT Hero — Under 500 only */}
        {budgetKey === "ai-under-500" && (
          <motion.div custom={1.5} variants={fadeUp} initial="hidden" animate="visible"
            className="rounded-2xl border mb-10 overflow-hidden"
            style={{ backgroundColor: "#10a37f0d", borderColor: "rgba(16,163,127,0.35)" }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#10a37f" />
                  <path d="M10 30 L18 14 L22 22 L26 18 L30 30 Z" fill="white" />
                  <circle cx="28" cy="13" r="4" fill="#f4b942" />
                </svg>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#10a37f" }}>
                    Best Value Under ৳500
                  </div>
                  <div className="font-bold text-white text-lg">ChatGPT Plus Shared — ৳350/mo</div>
                </div>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#c9ceda" }}>
                ChatGPT Plus Shared at ৳350/mo is the <strong className="text-white">#1 best-value AI tool in Bangladesh</strong>.
                It gives you writing, coding, image generation, deep research, and AI agents —
                all for the price of 2 cups of tea per month.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Writing", "Coding", "Research", "Images", "AI Agents", "Deep Research"].map((cap) => (
                  <span key={cap} className="text-xs px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "#10a37f20", color: "#10a37f" }}>
                    {cap}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/8801865385348?text=${encodeURIComponent("Hi, I want ChatGPT Plus Starter Shared (৳350/mo)")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#25d366", color: "#fff" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Order ৳350/mo
                </a>
                <Link href="/chatgpt-plans-bangladesh"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors text-sm">
                  View all ChatGPT plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats row */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="grid grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-2xl border border-white/10 text-center" style={{ backgroundColor: "#151b3d" }}>
            <div className="text-2xl font-bold text-white">{products.length}</div>
            <div className="text-xs mt-1" style={{ color: "#c9ceda" }}>Tools available</div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 text-center" style={{ backgroundColor: "#151b3d" }}>
            <div className="text-2xl font-bold" style={{ color: "#f4b942" }}>BDT {products[0]?.price ?? 0}</div>
            <div className="text-xs mt-1" style={{ color: "#c9ceda" }}>Starting from</div>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 text-center" style={{ backgroundColor: "#151b3d" }}>
            <div className="text-2xl font-bold" style={{ color: "#25d366" }}>5–60 min</div>
            <div className="text-xs mt-1" style={{ color: "#c9ceda" }}>Delivery time</div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i + 3} />
          ))}
        </div>

        {/* Next Tier Link */}
        {config.nextTier && (
          <motion.div
            custom={products.length + 3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-10"
          >
            <Link href={config.nextTier.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-sm font-medium text-white hover:bg-white/5 transition-colors">
              {config.nextTier.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          custom={products.length + 5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="p-8 rounded-2xl text-center border border-white/10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <h2 className="text-xl font-bold text-white mb-3">Not sure which to choose?</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Message us on WhatsApp. Tell us your budget and what you need — we'll recommend the perfect tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-5 h-5" />
              Ask on WhatsApp
            </a>
            <Link href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">
              Browse All 56 Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
