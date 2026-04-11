import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowUpDown, Filter } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";
const RATE = 149.5;

const CATEGORY_LABELS: Record<string, string> = {
  "ai-assistant": "AI Assistant & Chat",
  "ai-image": "AI Image & Design",
  "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music",
  "ai-code": "AI Code & Dev Tools",
  "ai-workspace": "AI Workspace",
  "bundles": "Bundles",
};

type SortKey = "price-asc" | "price-desc" | "savings";

interface Product {
  id: string;
  name: string;
  brand: string;
  brandColor: string;
  category: string;
  price: number;
  officialUSD: number | null;
  tier: string;
  accessType: string;
  badge: string | null;
  deliveryMinutes: string;
  warrantyDays: number;
}

export default function PricingPage() {
  const [catFilter, setCatFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("price-asc");

  const products = useMemo(() => {
    let list = [...((productsData.products as unknown) as Product[])];
    if (catFilter !== "all") list = list.filter((p) => p.category === catFilter);
    if (accessFilter !== "all") list = list.filter((p) => p.accessType === accessFilter);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => ((b.officialUSD ?? 0) * RATE - b.price) - ((a.officialUSD ?? 0) * RATE - a.price));
    return list;
  }, [catFilter, accessFilter, sort]);

  return (
    <PageLayout>
      <SEOHead
        title="AI Subscription Prices Bangladesh 2026 — Compare All Plans"
        description="Compare all AI subscription prices in Bangladesh. 56 tools from BDT 350. bKash/Nagad payment. AI Premium Shop 2026."
        canonical="https://aipremiumshop.com/pricing"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">All AI Subscription Prices — Bangladesh 2026</h1>
          <p style={{ color: "#c9ceda" }}>Compare every plan. Find the right tool at the right price.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl border border-white/10 mb-10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <h2 className="font-bold text-white mb-3">How our pricing works</h2>
          <p className="text-sm mb-4 max-w-3xl leading-relaxed" style={{ color: "#c9ceda" }}>
            When you buy directly from AI providers, you need an international credit card and pay in USD plus bank fees.
            Example: ChatGPT Plus costs $20/mo = approximately BDT 2,990 after exchange and fees.
            With AI Premium Shop, you pay BDT 350 for shared access or BDT 2,990 for a personal account —
            using bKash or Nagad. No international card needed. No bank fees.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: "#0a0e27" }}>
              <div className="font-semibold text-white mb-1">Without us</div>
              <div style={{ color: "#ef4444" }}>International card required</div>
              <div style={{ color: "#ef4444" }}>USD price + bank fees</div>
              <div style={{ color: "#ef4444" }}>No local support</div>
            </div>
            <div className="flex items-center justify-center text-2xl">→</div>
            <div className="p-4 rounded-xl border" style={{ backgroundColor: "#0a0e27", borderColor: "rgba(244,185,66,0.4)" }}>
              <div className="font-semibold mb-1" style={{ color: "#f4b942" }}>With AI Premium Shop</div>
              <div style={{ color: "#22c55e" }}>bKash, Nagad, Rocket</div>
              <div style={{ color: "#22c55e" }}>BDT prices, no card needed</div>
              <div style={{ color: "#22c55e" }}>WhatsApp support always</div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <Filter className="w-4 h-4" style={{ color: "#f4b942" }} />
          <select
            className="rounded-lg px-3 py-2 text-sm border border-white/10"
            style={{ backgroundColor: "#0a0e27", color: "#fff" }}
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select
            className="rounded-lg px-3 py-2 text-sm border border-white/10"
            style={{ backgroundColor: "#0a0e27", color: "#fff" }}
            value={accessFilter}
            onChange={(e) => setAccessFilter(e.target.value)}
          >
            <option value="all">All Access Types</option>
            <option value="shared">Shared</option>
            <option value="private">Personal / Private</option>
          </select>
          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-4 h-4" style={{ color: "#c9ceda" }} />
            <select
              className="rounded-lg px-3 py-2 text-sm border border-white/10"
              style={{ backgroundColor: "#0a0e27", color: "#fff" }}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="savings">Biggest Savings</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10" style={{ backgroundColor: "#151b3d" }}>
                  <th className="text-left px-5 py-4 font-semibold text-white">Product</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden sm:table-cell">Brand</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden lg:table-cell">Access</th>
                  <th className="text-left px-4 py-4 font-semibold" style={{ color: "#f4b942" }}>Our Price</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden md:table-cell">Official (USD)</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden lg:table-cell">Delivery</th>
                  <th className="px-4 py-4" />
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => {
                  const officialBDT = p.officialUSD ? Math.round(p.officialUSD * RATE) : 0;
                  const savings = officialBDT > 0 ? officialBDT - p.price : -1;
                  const waLink = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want to order ${p.name} (BDT ${p.price})`)}`;
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors"
                      style={{ backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: p.brandColor }} />
                          <div>
                            <div className="font-medium text-white text-xs leading-tight">{p.name}</div>
                            {p.badge && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full"
                                style={{ backgroundColor: "#f4b942" + "22", color: "#f4b942" }}>
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell text-xs" style={{ color: "#c9ceda" }}>{p.brand}</td>
                      <td className="px-4 py-4 hidden md:table-cell text-xs" style={{ color: "#c9ceda" }}>{CATEGORY_LABELS[p.category]}</td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-xs px-2 py-0.5 rounded-full border"
                          style={p.accessType === "shared"
                            ? { color: "#c9ceda", borderColor: "rgba(255,255,255,0.15)" }
                            : { color: "#f4b942", borderColor: "rgba(244,185,66,0.3)" }}>
                          {p.accessType === "shared" ? "Shared" : "Personal"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold" style={{ color: "#f4b942" }}>BDT {p.price.toLocaleString()}</div>
                        {savings > 0 && (
                          <div className="text-xs" style={{ color: "#22c55e" }}>Save BDT {savings.toLocaleString()}</div>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell text-xs" style={{ color: "#c9ceda" }}>
                        {p.officialUSD === null ? (
                          "—"
                        ) : p.id === "notion-business-6m" ? (
                          <>{`$${p.officialUSD} total (6 months)`}<br /><span style={{ color: "#c9ceda" }}>{"≈ BDT 800/mo × 6"}</span></>
                        ) : (
                          <>{`$${p.officialUSD}/mo`}<br /><span style={{ color: "#c9ceda" }}>{`≈ BDT ${officialBDT.toLocaleString()}`}</span></>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell text-xs" style={{ color: "#c9ceda" }}>⚡ {p.deliveryMinutes} min</td>
                      <td className="px-4 py-4">
                        <a href={waLink} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                          style={{ backgroundColor: "#25d366", color: "#fff" }}>
                          <MessageCircle className="w-3 h-3" />
                          Order
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-16" style={{ color: "#c9ceda" }}>No products match your filters.</div>
          )}
        </div>

        <div className="p-8 rounded-2xl text-center border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <p className="font-semibold text-white text-lg mb-2">Ready to order?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Choose any plan above, message us the name, and we'll handle everything over WhatsApp.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}>
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
