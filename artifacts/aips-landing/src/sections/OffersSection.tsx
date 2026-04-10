import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const makeOrderLink = (product: string) =>
  `https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20${encodeURIComponent(product)}`;

const SPECIAL_OFFERS = [
  {
    id: "google-ai-pro",
    name: "Google AI Pro",
    price: 500,
    officialPrice: 2990,
    badge: "83% Off",
    description:
      "Gemini 3.1 Pro, Deep Research, 2TB storage, AI agents. Official price BDT 2,990.",
    color: "#4285f4",
  },
  {
    id: "notion-business",
    name: "Notion Business",
    price: 800,
    officialPrice: 2990,
    badge: "73% Off",
    description:
      "Notion AI included, teamspaces, SSO. Official price BDT 2,990.",
    color: "#ffffff",
  },
];

const BEST_SELLERS = [
  { id: "chatgpt-plus-starter", name: "ChatGPT Plus Starter Shared", price: 350, badge: "Best Seller", color: "#10a37f", msg: "Hi, I want ChatGPT Plus Starter Shared (৳350/mo)" },
  { id: "perplexity-pro-shared", name: "Perplexity Pro Shared", price: 350, badge: null, color: "#20b2aa", msg: "Hi, I want Perplexity Pro Shared (৳350/mo)" },
  { id: "google-ai-pro-bs", name: "Google AI Pro", price: 500, badge: "83% Off", color: "#4285f4", msg: "Hi, I want Google AI Pro (৳500/mo)" },
  { id: "chatgpt-business", name: "ChatGPT Business Starter Shared", price: 699, badge: null, color: "#10a37f", msg: "Hi, I want ChatGPT Business Starter Shared (৳699/mo)" },
  { id: "midjourney", name: "Midjourney Standard Shared", price: 1199, badge: "Popular", color: "#1a1a2e", msg: "Hi, I want Midjourney Standard Shared (৳1,199/mo)" },
  { id: "claude-premium", name: "Claude Pro Premium Shared", price: 1495, badge: null, color: "#d97706", msg: "Hi, I want Claude Pro Premium Shared (৳1,495/mo)" },
];

export function OffersSection() {
  return (
    <section
      id="offers"
      className="py-24 px-4"
      style={{ backgroundColor: "#151b3d" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Special Offers */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#f4b942" }}
            >
              Limited Time
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold text-white"
            >
              Special Offers
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPECIAL_OFFERS.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-6 border border-white/10"
                style={{ backgroundColor: "rgba(10,14,39,0.7)" }}
              >
                {/* Discount badge */}
                <span
                  className="absolute -top-3 right-5 text-sm font-bold px-4 py-1.5 rounded-full"
                  style={{ background: "linear-gradient(135deg, #ec4899, #f97316)", color: "#fff" }}
                >
                  {offer.badge}
                </span>

                <div className="mb-4">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-semibold text-white">৳{offer.price}</span>
                    <span className="text-base line-through" style={{ color: "#c9ceda" }}>৳{offer.officialPrice}</span>
                    <span className="text-xs" style={{ color: "#c9ceda" }}>/month</span>
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: offer.color === "#ffffff" ? "#e5e7eb" : offer.color }}>
                    {offer.name}
                  </h3>
                </div>

                <p className="text-sm mb-6 leading-relaxed" style={{ color: "#c9ceda" }}>
                  {offer.description}
                </p>

                <a
                  href={makeOrderLink(offer.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2"
                >
                  Order Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Best Sellers */}
        <div>
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#f4b942" }}
            >
              Most Ordered
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold text-white"
            >
              Best Sellers
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_SELLERS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: `0 8px 32px ${product.color}22` }}
                className="relative rounded-xl p-5 border border-white/10 flex items-center justify-between"
                style={{ backgroundColor: "rgba(10,14,39,0.6)" }}
                data-testid={`best-seller-${product.id}`}
              >
                <div>
                  {product.badge && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                      style={{ background: "linear-gradient(135deg, #ec4899, #f97316)", color: "#fff" }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="font-medium text-white text-sm">{product.name}</span>
                  </div>
                  <div className="text-xl font-semibold mt-1 text-white">৳{product.price}<span className="text-xs font-normal ml-1" style={{ color: "#c9ceda" }}>/mo</span></div>
                </div>

                <a
                  href={`https://wa.me/8801865385348?text=${encodeURIComponent(product.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta text-xs px-4 py-2.5 rounded-lg flex items-center gap-1 flex-shrink-0"
                >
                  Order
                  <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
