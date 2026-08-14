import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpDown, Filter, MessageCircle, ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { formatBDT } from "@/lib/format";
import productsData from "../../data/products.json";

const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);

const CATEGORY_LABELS: Record<string, string> = {
  "ai-assistant": "AI Assistant & Chat",
  "ai-image": "AI Image & Design",
  "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music",
  "ai-code": "AI Code & Development",
  "ai-workspace": "AI Workspace",
  "ai-writing": "AI Writing & SEO",
  "ai-design": "AI Design & Creative",
  bundles: "Bundles & Services",
};

const ACCESS_LABELS: Record<string, string> = {
  shared: "Shared",
  personal: "Personal",
  team: "Team",
  bundle: "Bundle",
  "setup-service": "Setup / Service",
  setup: "Setup / Service",
  service: "Setup / Service",
};

type SortKey = "price-asc" | "price-desc" | "name";

interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string | null;
  brandColor?: string | null;
  category: string;
  price?: number | null;
  requestPrice?: boolean;
  tier?: string | null;
  accessType?: string | null;
}

const sourceProducts = (productsData.products as Product[]).filter(
  (product) =>
    !RETIRED_PRODUCT_SLUGS.has(product.slug) &&
    !product.requestPrice &&
    typeof product.price === "number" &&
    product.price > 0,
);

function accessLabel(value: string | null | undefined): string {
  return value ? ACCESS_LABELS[value] ?? "Confirm" : "Confirm";
}

export default function PricingPage() {
  const reducedMotion = useReducedMotion();
  const [catFilter, setCatFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("price-asc");

  const products = useMemo(() => {
    let list = [...sourceProducts];
    if (catFilter !== "all") list = list.filter((product) => product.category === catFilter);
    if (accessFilter !== "all") list = list.filter((product) => product.accessType === accessFilter);
    if (sort === "price-asc") list.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "price-desc") list.sort((a, b) => Number(b.price) - Number(a.price));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [catFilter, accessFilter, sort]);

  const minPrice = useMemo(() => {
    const prices = sourceProducts.map((product) => Number(product.price)).filter(Number.isFinite);
    return prices.length ? Math.min(...prices) : null;
  }, []);

  return (
    <PageLayout>
      <SEOHead
        title="AI Tool Pricing in Bangladesh | AI Premium Shop"
        description="Compare current fixed-price AI plans in Bangladesh by published BDT price and access model. Confirm availability, provider limits, delivery ETA and terms before payment."
        canonical="https://aipremiumshop.com/pricing"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />

      <div id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-14">
        <header className="mb-9 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold mb-4" style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}>
            <ShieldCheck className="w-3.5 h-3.5" /> Current public catalog
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">AI Tool Pricing in Bangladesh</h1>
          <p className="leading-relaxed" style={{ color: "#c9ceda" }}>
            Compare the fixed BDT prices and access models currently published by AI Premium Shop. Prices shown here are AIPS catalog prices, not inferred provider prices. Confirm current availability, provider limits, delivery ETA and applicable order terms before payment.
          </p>
          {minPrice != null && (
            <p className="text-sm mt-3" style={{ color: "#9ca3af" }}>Current fixed-price catalog starts from {formatBDT(minPrice)}.</p>
          )}
        </header>

        <motion.section
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl border border-white/10 mb-9"
          style={{ backgroundColor: "#151b3d" }}
        >
          <h2 className="font-bold text-white mb-3">How to use this comparison</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-white/10 p-4" style={{ backgroundColor: "#0a0e27" }}>
              <div className="font-semibold text-white mb-1">1. Compare price</div>
              <p style={{ color: "#c9ceda" }}>Use the published BDT amount as the starting point for your decision.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4" style={{ backgroundColor: "#0a0e27" }}>
              <div className="font-semibold text-white mb-1">2. Check access</div>
              <p style={{ color: "#c9ceda" }}>Shared, personal, team, bundle and service arrangements have different operational implications.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4" style={{ backgroundColor: "#0a0e27" }}>
              <div className="font-semibold text-white mb-1">3. Confirm before payment</div>
              <p style={{ color: "#c9ceda" }}>Verify current availability, provider limits, delivery ETA and applicable terms for the exact plan.</p>
            </div>
          </div>
        </motion.section>

        <section aria-label="Pricing filters" className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <Filter aria-hidden="true" className="w-4 h-4" style={{ color: "#f4b942" }} />
          <select aria-label="Filter by category" className="rounded-lg px-3 py-2 text-sm border border-white/10" style={{ backgroundColor: "#0a0e27", color: "#fff" }} value={catFilter} onChange={(event) => setCatFilter(event.target.value)}>
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
          <select aria-label="Filter by access type" className="rounded-lg px-3 py-2 text-sm border border-white/10" style={{ backgroundColor: "#0a0e27", color: "#fff" }} value={accessFilter} onChange={(event) => setAccessFilter(event.target.value)}>
            <option value="all">All Access Types</option>
            <option value="shared">Shared</option>
            <option value="personal">Personal</option>
            <option value="team">Team</option>
            <option value="bundle">Bundle</option>
            <option value="setup-service">Setup / Service</option>
          </select>
          <div className="flex items-center gap-2 sm:ml-auto">
            <ArrowUpDown aria-hidden="true" className="w-4 h-4" style={{ color: "#c9ceda" }} />
            <select aria-label="Sort products" className="rounded-lg px-3 py-2 text-sm border border-white/10" style={{ backgroundColor: "#0a0e27", color: "#fff" }} value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 overflow-hidden mb-12" aria-label="Current fixed-price AI plans">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10" style={{ backgroundColor: "#151b3d" }}>
                  <th className="text-left px-5 py-4 font-semibold text-white">Plan</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden sm:table-cell">Brand</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden lg:table-cell">Access</th>
                  <th className="text-left px-4 py-4 font-semibold" style={{ color: "#f4b942" }}>Published BDT Price</th>
                  <th className="text-left px-4 py-4 font-semibold text-white hidden lg:table-cell">Delivery</th>
                  <th className="px-4 py-4" />
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const waLink = `${WHATSAPP}?text=${encodeURIComponent(`Hi, I want ${product.name}. Published AIPS price: ${formatBDT(Number(product.price))}. Please confirm the current access model, availability, provider limits, delivery ETA and applicable terms before payment.`)}`;
                  return (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/3 transition-colors" style={{ backgroundColor: index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
                      <td className="px-5 py-4"><div className="flex items-center gap-2"><div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: product.brandColor || "#f4b942" }} /><div><div className="font-medium text-white text-xs leading-tight">{product.name}</div>{product.tier && <div className="text-[11px] mt-1" style={{ color: "#9ca3af" }}>{product.tier}</div>}</div></div></td>
                      <td className="px-4 py-4 hidden sm:table-cell text-xs" style={{ color: "#c9ceda" }}>{product.brand || "—"}</td>
                      <td className="px-4 py-4 hidden md:table-cell text-xs" style={{ color: "#c9ceda" }}>{CATEGORY_LABELS[product.category] ?? product.category}</td>
                      <td className="px-4 py-4 hidden lg:table-cell"><span className="text-xs px-2 py-0.5 rounded-full border border-white/15" style={{ color: product.accessType === "personal" ? "#f4b942" : "#c9ceda" }}>{accessLabel(product.accessType)}</span></td>
                      <td className="px-4 py-4"><div className="font-bold" style={{ color: "#f4b942" }}>{formatBDT(Number(product.price))}</div></td>
                      <td className="px-4 py-4 hidden lg:table-cell text-xs" style={{ color: "#c9ceda" }}>Confirm before payment</td>
                      <td className="px-4 py-4"><a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap" style={{ backgroundColor: "#008236", color: "#fff" }}><MessageCircle className="w-3 h-3" /> Confirm</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {products.length === 0 && <div className="text-center py-16" style={{ color: "#c9ceda" }}>No fixed-price plans match these filters.</div>}
        </section>

        <section className="p-8 rounded-2xl text-center border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <p className="font-semibold text-white text-lg mb-2">Need help choosing?</p>
          <p className="text-sm mb-6 max-w-2xl mx-auto" style={{ color: "#c9ceda" }}>Send the tool or workflow you need. Confirm the exact plan, access model, availability, delivery ETA and applicable terms before making payment.</p>
          <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi, I want help choosing a current AI plan. Please confirm price, access model, availability, provider limits, delivery ETA and applicable terms before payment.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity" style={{ backgroundColor: "#008236", color: "#fff" }}><MessageCircle className="w-5 h-5" /> Ask on WhatsApp</a>
        </section>
      </div>
    </PageLayout>
  );
}
