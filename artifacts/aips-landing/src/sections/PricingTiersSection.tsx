import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { productsInPriceRange, MIN_PRICE, MAX_PRICE, taka } from "@/lib/catalogStats";

interface PricingTier {
  name: string;
  range: string;
  minPrice: number;
  maxPrice: number;
  description: string;
  color: string;
  icon: string;
  examples: string[];
}

export function PricingTiersSection() {
  // Not annotated as PricingTier[] — the .map below adds a derived
  // productCount, and an explicit annotation would erase it from the type.
  const tiers = ([
    {
      name: "Budget",
      range: "BDT 299-399",
      minPrice: 299,
      maxPrice: 399,
      description: "Perfect for trying AI tools",
      color: "#f4b942",
      icon: "💰",
      examples: ["CapCut Pro", "ChatGPT Starter", "Perplexity Pro"],
    },
    {
      name: "Starter",
      range: "BDT 400-999",
      minPrice: 400,
      maxPrice: 999,
      description: "Popular subscriptions for daily use",
      color: "#3b82f6",
      icon: "🚀",
      examples: ["Claude Pro", "Midjourney", "Notion AI"],
    },
    {
      name: "Professional",
      range: "BDT 1000-2999",
      minPrice: 1000,
      maxPrice: 2999,
      description: "For professionals & creators",
      color: "#8b5cf6",
      icon: "⭐",
      examples: ["ChatGPT Pro", "Runway Standard", "GitHub Copilot"],
    },
    {
      name: "Premium",
      range: "BDT 3000-9999",
      minPrice: 3000,
      maxPrice: 9999,
      description: "Advanced features & priority support",
      color: "#ec4899",
      icon: "👑",
      examples: ["ChatGPT Enterprise", "Adobe Creative Cloud", "Suno Pro"],
    },
    {
      name: "Enterprise",
      range: "BDT 10000+",
      minPrice: 10000,
      maxPrice: Infinity,
      description: "Complete solutions for teams",
      color: "#22c55e",
      icon: "🏢",
      examples: ["Premium Bundles", "Team Plans", "Custom Packages"],
    },
  ] as PricingTier[]).map((t) => ({
    // Counted by each product's CHEAPEST tier, so a single product can't
    // inflate several bands at once. These were hand-written and badly wrong:
    // "Premium 30+" covered 3 products, "Enterprise 16+" covered 2.
    ...t,
    productCount: productsInPriceRange(t.minPrice, t.maxPrice),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
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
          Pricing for Every Budget
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          From {taka(MIN_PRICE)} to {taka(MAX_PRICE)}. Find the right AI tools for your budget.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3"
      >
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={itemVariants}
            className="group relative rounded-xl border transition-all duration-300 hover:scale-105 overflow-hidden h-full"
            style={{
              borderColor: tier.color + "44",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
            }}
          >
            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
              style={{ backgroundColor: tier.color }}
            />

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Icon */}
              <div className="text-4xl mb-3">{tier.icon}</div>

              {/* Title and range */}
              <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
              <div className="text-lg font-semibold mb-2" style={{ color: tier.color }}>
                {tier.range}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4">{tier.description}</p>

              {/* Product count */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                <span className="text-2xl font-bold text-white">{tier.productCount}</span>
                <span className="text-xs text-gray-400">{tier.productCount === 1 ? "Product" : "Products"}</span>
              </div>

              {/* Examples */}
              <div className="space-y-2 mb-6 flex-1">
                {tier.examples.map((example, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: tier.color }}
                    />
                    <span className="text-xs text-gray-300">{example}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/products"
                className="w-full py-2 rounded-lg text-center text-xs font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: tier.color + "22",
                  color: tier.color,
                  border: `1px solid ${tier.color}44`,
                }}
              >
                Browse This Tier
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Info text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400 text-sm md:text-base">
          All prices include delivery within 5-30 minutes and 30-day replacement warranty.
        </p>
      </motion.div>
    </section>
  );
}
