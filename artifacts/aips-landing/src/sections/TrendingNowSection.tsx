import { motion } from "framer-motion";
import { Link } from "wouter";
import { TrendingUp } from "lucide-react";
import { cheapestPriceFor, tierPrice, taka } from "@/lib/catalogStats";

// What Bangladesh is actually searching for right now — grounded in this
// site's own Google Search Console data (2026-08-02: top real-intent queries
// beyond the brand name itself were ChatGPT plan comparisons, Claude Team,
// Gemini/Google AI Pro, and GitHub Copilot subscriptions), not a guessed
// "trending" list. Prices are read live from the catalog so this section
// can't drift the way a hand-typed number would.
const TRENDING = [
  { slug: "chatgpt-plans-comparison-bangladesh", name: "ChatGPT Plans", angle: "Plus vs Business vs Pro — compared", catalogSlug: "chatgpt-plus-bangladesh" },
  { slug: "claude-pro-bangladesh", name: "Claude Team", angle: "For teams and small agencies", catalogSlug: "claude-pro-bangladesh", tier: "Team" },
  { slug: "gemini-advanced-bangladesh", name: "Google AI Pro", angle: "Gemini, 2TB storage, Workspace AI", catalogSlug: "gemini-advanced-bangladesh" },
  { slug: "github-copilot-bangladesh", name: "GitHub Copilot", angle: "AI code completions in your IDE", catalogSlug: "github-copilot-bangladesh" },
  { slug: "midjourney-bangladesh", name: "Midjourney", angle: "The image generator everyone asks for", catalogSlug: "midjourney-bangladesh" },
  { slug: "chatgpt-business-bangladesh", name: "ChatGPT Business", angle: "Admin controls, no training on your data", catalogSlug: "chatgpt-business-bangladesh" },
];

export function TrendingNowSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: "rgba(244,185,66,0.1)", border: "1px solid rgba(244,185,66,0.25)" }}>
          <TrendingUp className="w-3.5 h-3.5" style={{ color: "#f4b942" }} />
          <span className="text-xs font-semibold" style={{ color: "#f4b942" }}>WHAT BANGLADESH IS SEARCHING FOR</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Trending AI Tools Right Now</h2>
        <p className="max-w-2xl mx-auto" style={{ color: "#c9ceda" }}>
          The searches climbing fastest this quarter — plan comparisons, team accounts, and the tools people ask
          us about most on WhatsApp.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRENDING.map((t, i) => {
          const price = t.tier ? tierPrice(t.catalogSlug, t.tier) : cheapestPriceFor(t.catalogSlug);
          return (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={`/${t.slug}`}
                className="group flex items-center justify-between gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: "#151b3d", borderColor: "rgba(255,255,255,0.1)" }}
              >
                <div className="min-w-0">
                  <div className="text-white font-semibold text-sm group-hover:text-[#f4b942] transition-colors">{t.name}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: "#c9ceda" }}>{t.angle}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm font-bold" style={{ color: "#f4b942" }}>
                    {price != null ? `${taka(price)}` : "Ask"}
                  </div>
                  <div className="text-[10px]" style={{ color: "#8b92a8" }}>/month</div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center text-xs mt-8"
        style={{ color: "#8b92a8" }}
      >
        Not sure which fits your work? <Link href="/products" className="underline hover:text-[#f4b942]">Browse all 197 tools</Link> or message
        us on WhatsApp — we'll point you at the right one in under 2 minutes.
      </motion.p>
    </section>
  );
}
