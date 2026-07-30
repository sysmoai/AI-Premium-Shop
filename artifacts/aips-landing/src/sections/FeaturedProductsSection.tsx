import { motion } from "framer-motion";
import { TOTAL_PRODUCTS, tierPrice, taka } from "@/lib/catalogStats";
import { productPath } from "@/lib/productRoutes";
import { MessageCircle, Star } from "lucide-react";

interface FeaturedProductSource {
  slug: string;
  tier: string;
  name: string;
  brand: string;
  category: string;
  badge: string;
  capabilities: string[];
}

// (slug, tier) pairs are looked up against the live catalog, so price can
// never go stale — the previous version hard-coded 12 prices as literals and
// one row ("Notion Pro — BDT 1,499") was a fully fabricated product: no
// Notion plan has ever existed at that price, and 1,499 actually belongs to
// an unrelated HeyGen tier. Replaced with Gamma Plus, a real ai-workspace
// product, so every card here maps to something a customer can actually buy.
const SOURCE: FeaturedProductSource[] = [
  { slug: "chatgpt-plus-bangladesh", tier: "Starter Shared", name: "ChatGPT Plus Starter", brand: "ChatGPT", category: "AI Assistant", badge: "Best Seller", capabilities: ["Text", "Code", "Vision", "Image Gen"] },
  { slug: "claude-pro-bangladesh", tier: "Premium Shared", name: "Claude Pro", brand: "Claude", category: "AI Assistant", badge: "Popular", capabilities: ["Long Context", "Code", "Analysis"] },
  { slug: "midjourney-bangladesh", tier: "Shared", name: "Midjourney Standard", brand: "Midjourney", category: "AI Image", badge: "Top Rated", capabilities: ["Image Gen", "Upscale", "Variations"] },
  { slug: "chatgpt-pro-bangladesh", tier: "Premium Shared", name: "ChatGPT Pro", brand: "ChatGPT", category: "AI Assistant", badge: "Premium", capabilities: ["GPT-5.4", "Deep Research", "Sora"] },
  { slug: "gemini-advanced-bangladesh", tier: "Personal", name: "Google AI Pro", brand: "Google", category: "AI Assistant", badge: "Advanced", capabilities: ["Gemini", "Analysis", "Integration"] },
  { slug: "supergrok-bangladesh", tier: "Standard", name: "SuperGrok", brand: "Grok", category: "AI Assistant", badge: "Latest", capabilities: ["Real-time", "Reasoning", "Web"] },
  { slug: "perplexity-pro-bangladesh", tier: "Shared", name: "Perplexity Pro", brand: "Perplexity", category: "Research", badge: "Budget", capabilities: ["Web Search", "Analysis", "Sources"] },
  { slug: "runway-bangladesh", tier: "Standard", name: "Runway Standard", brand: "Runway", category: "AI Video", badge: "Creator", capabilities: ["Video Gen", "Editing", "Effects"] },
  { slug: "suno-ai-bangladesh", tier: "Pro", name: "Suno AI Pro", brand: "Suno", category: "Music", badge: "Creative", capabilities: ["Music Gen", "AI Vocals", "Lyrics"] },
  { slug: "github-copilot-bangladesh", tier: "Pro", name: "GitHub Copilot Pro", brand: "GitHub", category: "Coding", badge: "Dev", capabilities: ["Code", "CLI", "Copilot Chat"] },
  { slug: "gamma-bangladesh", tier: "Shared", name: "Gamma Plus", brand: "Gamma", category: "Workspace", badge: "Productivity", capabilities: ["Presentations", "Docs", "AI Design"] },
  { slug: "capcut-pro-bangladesh", tier: "Starter Shared", name: "CapCut Pro", brand: "CapCut", category: "Video", badge: "Affordable", capabilities: ["Editing", "Effects", "Templates"] },
];

export interface FeaturedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number | null;
  path: string;
  badge: string;
  capabilities: string[];
}

// Exported so Home.tsx can build a matching Product/ItemList JSON-LD from the
// exact same data the page renders — one source, so structured data can never
// describe a different catalog than what's on screen.
export const FEATURED_PRODUCTS: FeaturedProduct[] = SOURCE.map((p) => ({
  id: `${p.slug}-${p.tier}`,
  name: p.name,
  brand: p.brand,
  category: p.category,
  price: tierPrice(p.slug, p.tier),
  path: productPath(p.slug),
  badge: p.badge,
  capabilities: p.capabilities,
}));

const WHATSAPP = "https://wa.me/8801865385348";

export function FeaturedProductsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const categoryColors: Record<string, string> = {
    "AI Assistant": "#10a37f",
    "AI Image": "#8b5cf6",
    "AI Video": "#f59e0b",
    Research: "#3b82f6",
    Music: "#ec4899",
    Coding: "#6366f1",
    Workspace: "#14b8a6",
    Video: "#f97316",
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Featured AI Tools
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Our most-ordered AI subscriptions in Bangladesh.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FEATURED_PRODUCTS.map((product) => {
          const categoryColor = categoryColors[product.category] || "#f4b942";
          const waLink = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${product.name}${product.price != null ? ` (BDT ${product.price})` : ""}`)}`;

          return (
            <motion.div
              key={product.id}
              variants={itemVariants}
              onClick={() => { window.location.href = product.path; }}
              className="group relative rounded-xl border border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 p-6 transition-all duration-300 hover:border-gray-600 hover:scale-105 overflow-hidden flex flex-col h-full cursor-pointer"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                style={{ backgroundColor: categoryColor }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: categoryColor + "33", border: `1px solid ${categoryColor}` }}
                  >
                    {product.badge}
                  </span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>

                <div className="mb-2">
                  <h3 className="text-lg font-bold text-white">
                    <a href={product.path} className="hover:underline">{product.name}</a>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{product.category}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-800">
                  {product.price != null ? (
                    <>
                      <span className="text-3xl font-bold text-white">{taka(product.price)}</span>
                      <span className="text-xs text-gray-400 ml-2">/month</span>
                    </>
                  ) : (
                    <span className="text-lg font-semibold" style={{ color: "#f4b942" }}>Price on WhatsApp</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6 flex-1">
                  {product.capabilities.map((cap) => (
                    <span key={cap} className="text-xs px-2 py-1 rounded-full text-gray-300 bg-gray-800/50">
                      {cap}
                    </span>
                  ))}
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 text-white"
                  style={{ backgroundColor: "#25d366" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <a
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 border-2"
          style={{ borderColor: "#f4b942", color: "#f4b942" }}
        >
          View All {TOTAL_PRODUCTS} Tools
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
