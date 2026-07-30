import { motion } from "framer-motion";
import { tierPrice, taka } from "@/lib/catalogStats";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";


const makeOrderLink = (product: string) =>
  `https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20${encodeURIComponent(product)}`;

// price is derived below from the catalog; officialPrice/pctOff stay editorial.
const SPECIAL_OFFERS = ([
  {
    id: "google-ai-pro",
    name: "Google AI Pro",
    slug: "gemini-advanced-bangladesh",
    tier: "Shared",
    officialPrice: 2990,
    pctOff: 83,
    description:
      "Gemini 3.1 Pro, Deep Research, 2TB storage, AI agents. Official price BDT 2,990.",
    color: "#4285f4",
    accentBg: "rgba(66,133,244,0.08)",
    accentBorder: "rgba(66,133,244,0.25)",
    glowColor: "rgba(66,133,244,0.3)",
  },
  {
    id: "notion-business",
    name: "Notion Business",
    slug: "notion-business-bangladesh",
    tier: "Monthly",
    officialPrice: 2990,
    pctOff: 73,
    description:
      "Notion AI included, teamspaces, advanced permissions & SSO. Official price BDT 2,990.",
    color: "#e5e7eb",
    accentBg: "rgba(229,231,235,0.06)",
    accentBorder: "rgba(229,231,235,0.15)",
    glowColor: "rgba(229,231,235,0.2)",
  },
]).map((o) => {
  // Displayed price and the advertised % off both come from the catalog record,
  // so a stale literal can't claim a discount the real price doesn't support.
  const price = tierPrice(o.slug, o.tier);
  return { ...o, price, pctOff: price != null ? Math.round((1 - price / o.officialPrice) * 100) : o.pctOff };
});

// Price and the pre-filled WhatsApp message are BOTH derived from the catalog
// record named by (slug, tier). Previously each row hard-coded a display price
// AND a separate message string, and three of them disagreed with each other:
// Perplexity showed ৳350 while its own order message said ৳599 (real ৳599),
// Google AI Pro showed ৳500 vs ৳599, Claude showed ৳1,495 vs ৳1,590. A shopper
// tapped a price and got a different one in WhatsApp. One source now, so the
// card and the message can never disagree again.
const BEST_SELLERS = [
  { id: "chatgpt-plus-starter", slug: "chatgpt-plus-bangladesh", tier: "Starter Shared", name: "ChatGPT Plus Starter Shared", badge: "Best Seller", color: "#10a37f" },
  { id: "perplexity-pro-shared", slug: "perplexity-pro-bangladesh", tier: "Shared", name: "Perplexity Pro Shared", badge: null, color: "#20b2aa" },
  { id: "google-ai-pro-bs", slug: "gemini-advanced-bangladesh", tier: "Shared", name: "Google AI Pro", badge: null, officialPrice: 2990, color: "#4285f4" },
  { id: "chatgpt-business", slug: "chatgpt-business-bangladesh", tier: "Starter Shared", name: "ChatGPT Business Starter Shared", badge: null, color: "#10a37f" },
  { id: "midjourney", slug: "midjourney-bangladesh", tier: "Shared", name: "Midjourney Standard Shared", badge: "Popular", color: "#8b5cf6" },
  { id: "claude-premium", slug: "claude-pro-bangladesh", tier: "Premium Shared", name: "Claude Pro Premium Shared", badge: null, color: "#d97706" },
].map((b) => {
  const price = tierPrice(b.slug, b.tier);
  // A "% Off" badge is computed from the real price vs the official price —
  // the hard-coded "83% Off" here was stale against the true ৳599 (= 80%).
  const off = "officialPrice" in b && b.officialPrice && price != null
    ? `${Math.round((1 - price / (b.officialPrice as number)) * 100)}% Off`
    : null;
  return {
    ...b,
    price,
    badge: b.badge ?? off,
    msg: `Hi, I want ${b.name} (${price != null ? taka(price) + "/mo" : "current price please"})`,
  };
});

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
              className="text-3xl md:text-4xl font-bold text-white"
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
                className="relative rounded-2xl p-6 pt-10 transition-all duration-300"
                style={{
                  backgroundColor: offer.accentBg,
                  border: `1px solid ${offer.accentBorder}`,
                  animation: `glow-offer-${i === 0 ? "blue" : "dark"} 2s ease-in-out infinite`,
                }}
              >
                {/* LIMITED TIME ribbon — top-right */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block bg-gradient-to-r from-[#f4b942] to-amber-600 text-[#0a0e27] font-bold text-xs uppercase px-3 py-1 rounded-full">
                    LIMITED TIME
                  </span>
                </div>

                {/* % Off badge — top-left */}
                <div className="absolute top-0 left-0">
                  <span
                    className="inline-flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-tl-2xl rounded-br-lg text-white"
                    style={{ background: "linear-gradient(135deg, #ec4899, #f97316)" }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {offer.pctOff}% Off
                  </span>
                </div>

                {/* Price row */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl font-black text-white">৳{offer.price}</span>
                    <span className="text-lg line-through text-red-400">
                      ৳{offer.officialPrice}
                    </span>
                    <span className="text-xs" style={{ color: "#c9ceda" }}>/month</span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: offer.color }}>
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
                  className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg text-center flex items-center justify-center gap-2 transition-colors duration-200"
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
              className="text-3xl md:text-4xl font-bold text-white"
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
                whileHover={{ y: -2, boxShadow: `0 8px 32px rgba(244,185,66,0.15)` }}
                className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-[#f4b942]/40 flex flex-col transition-all duration-200"
                data-testid={`best-seller-${product.id}`}
              >
                {/* Brand color top border */}
                <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: product.color }} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className="absolute top-5 right-4 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "linear-gradient(135deg, #ec4899, #f97316)", color: "#fff" }}
                    >
                      {product.badge}
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="font-bold text-white text-sm">{product.name}</span>
                  </div>

                  <div className="text-xl font-bold mb-3" style={{ color: "#f4b942" }}>
                    ৳{product.price}
                    <span className="text-xs font-normal ml-1 text-gray-400">/mo</span>
                  </div>

                  {product.id === "chatgpt-plus-starter" && (
                    <div className="mb-3 space-y-1">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#10a37f20", color: "#10a37f" }}>
                        Writing · Coding · Research · Images
                      </span>
                      <div>
                        <Link href="/chatgpt-plans-bangladesh" className="text-xs underline decoration-white/20 hover:opacity-80 transition-opacity" style={{ color: "#10a37f" }}>
                          View all 9 ChatGPT plans →
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <a
                      href={`https://wa.me/8801865385348?text=${encodeURIComponent(product.msg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 transition-colors duration-200"
                      style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fbbf24")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f4b942")}
                    >
                      Order
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
