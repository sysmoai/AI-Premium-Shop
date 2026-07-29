import { motion } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";

interface FeaturedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  badge: string;
  capabilities: string[];
}

export function FeaturedProductsSection() {
  const products: FeaturedProduct[] = [
    {
      id: "chatgpt-plus-starter-shared",
      name: "ChatGPT Plus Starter",
      brand: "ChatGPT",
      category: "AI Assistant",
      price: 499,
      badge: "Best Seller",
      capabilities: ["Text", "Code", "Vision", "Image Gen"],
    },
    {
      id: "claude-pro-premium-shared",
      name: "Claude Pro",
      brand: "Claude",
      category: "AI Assistant",
      price: 1590,
      badge: "Popular",
      capabilities: ["Long Context", "Code", "Analysis"],
    },
    {
      id: "midjourney-standard-shared",
      name: "Midjourney Standard",
      brand: "Midjourney",
      category: "AI Image",
      price: 1199,
      badge: "Top Rated",
      capabilities: ["Image Gen", "Upscale", "Variations"],
    },
    {
      id: "chatgpt-pro-premium-shared",
      name: "ChatGPT Pro",
      brand: "ChatGPT",
      category: "AI Assistant",
      price: 4500,
      badge: "Premium",
      capabilities: ["GPT-5.4", "Deep Research", "Sora"],
    },
    {
      id: "google-ai-pro-personal",
      name: "Google AI Pro",
      brand: "Google",
      category: "AI Assistant",
      price: 2990,
      badge: "Advanced",
      capabilities: ["Gemini", "Analysis", "Integration"],
    },
    {
      id: "supergrok-personal",
      name: "SuperGrok",
      brand: "Grok",
      category: "AI Assistant",
      price: 4990,
      badge: "Latest",
      capabilities: ["Real-time", "Reasoning", "Web"],
    },
    {
      id: "perplexity-pro-shared",
      name: "Perplexity Pro",
      brand: "Perplexity",
      category: "Research",
      price: 599,
      badge: "Budget",
      capabilities: ["Web Search", "Analysis", "Sources"],
    },
    {
      id: "runway-standard-personal",
      name: "Runway Standard",
      brand: "Runway",
      category: "AI Video",
      price: 1794,
      badge: "Creator",
      capabilities: ["Video Gen", "Editing", "Effects"],
    },
    {
      id: "suno-ai-pro-personal",
      name: "Suno AI Pro",
      brand: "Suno",
      category: "Music",
      price: 4990,
      badge: "Creative",
      capabilities: ["Music Gen", "AI Vocals", "Lyrics"],
    },
    {
      id: "github-copilot-pro-personal",
      name: "GitHub Copilot Pro",
      brand: "GitHub",
      category: "Coding",
      price: 1495,
      badge: "Dev",
      capabilities: ["Code", "CLI", "Copilot Chat"],
    },
    {
      id: "notion-pro-setup-service",
      name: "Notion Pro",
      brand: "Notion",
      category: "Workspace",
      price: 1499,
      badge: "Productivity",
      capabilities: ["Databases", "Docs", "AI Features"],
    },
    {
      id: "capcut-pro-starter-shared",
      name: "CapCut Pro",
      brand: "CapCut",
      category: "Video",
      price: 299,
      badge: "Affordable",
      capabilities: ["Editing", "Effects", "Templates"],
    },
  ];

  const WHATSAPP_LINK = "https://wa.me/8801865385348";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const categoryColors: Record<string, string> = {
    "AI Assistant": "#10a37f",
    "AI Image": "#8b5cf6",
    "AI Video": "#f59e0b",
    "Research": "#3b82f6",
    "Music": "#ec4899",
    "Coding": "#6366f1",
    "Workspace": "#14b8a6",
    "Video": "#f97316",
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
          Our most popular AI subscriptions trusted by thousands of users across Bangladesh.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((product) => {
          const categoryColor = categoryColors[product.category] || "#f4b942";

          return (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative rounded-xl border border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 p-6 transition-all duration-300 hover:border-gray-600 hover:scale-105 overflow-hidden flex flex-col h-full"
            >
              {/* Gradient accent on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                style={{ backgroundColor: categoryColor }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: categoryColor + "33", border: `1px solid ${categoryColor}` }}
                  >
                    {product.badge}
                  </span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>

                {/* Brand & Category */}
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{product.category}</p>
                </div>

                {/* Price */}
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <span className="text-3xl font-bold text-white">৳{product.price}</span>
                  <span className="text-xs text-gray-400 ml-2">/month</span>
                </div>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-2 mb-6 flex-1">
                  {product.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full text-gray-300 bg-gray-800/50"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* View all CTA */}
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
          style={{
            borderColor: "#f4b942",
            color: "#f4b942",
          }}
        >
          View All 118+ Tools
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
