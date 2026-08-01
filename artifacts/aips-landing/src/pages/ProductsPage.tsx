import { useState, useMemo, useEffect } from "react";
import { TOTAL_PRODUCTS } from "@/lib/catalogStats";
import { motion } from "framer-motion";
import { MessageCircle, Filter, ArrowUpDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { productListSchema } from "@/utils/schemas";
// catalog-pages carries the 17 fields the page chunks render — not plans/faq/
// useCases/descriptionBN, which are 100+ KB this page never reads.
import productsData from "../../data/catalog-pages.json";

const WHATSAPP = "https://wa.me/8801865385348";
const ALL = productsData.products;

// This list previously omitted "ai-design" — a real category with 4 products,
// its own live route (/ai-design), and its own Navbar entry — so it had a
// dedicated landing page but was invisible in the /products filter dropdown.
// Same disease as the other hardcoded copies found today: this map isn't
// derived from anywhere, it's retyped, and it silently drifted out of sync
// with CategoryPage.tsx and Navbar.tsx, which both already knew about it.
const CATEGORY_LABELS: Record<string, string> = {
  "ai-assistant": "AI Assistant & Chat",
  "ai-image": "AI Image & Design",
  "ai-video": "AI Video",
  "ai-voice-music": "AI Voice & Music",
  "ai-code": "AI Code & Dev Tools",
  "ai-workspace": "AI Workspace",
  "ai-writing": "AI Writing & SEO",
  "ai-design": "AI Design & Creative",
  "bundles": "Bundles & Packages",
};

const CATEGORY_ORDER = ["ai-assistant", "ai-image", "ai-code", "ai-voice-music", "ai-video", "ai-workspace", "ai-writing", "ai-design", "bundles"];

type SortKey = "price-asc" | "price-desc" | "name";

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandColor: string;
  category: string;
  price: number | null;
  requestPrice?: boolean;
  officialUSD: number | null;
  tier: string;
  accessType: string;
  badge?: string;
  description: string;
  deliverySLA: string;
  whatsappMsg?: string;
  featured?: boolean;
}

function ProductCard({ p }: { p: Product }) {
  const [, navigate] = useLocation();
  const waLink = `${WHATSAPP}?text=${encodeURIComponent(p.whatsappMsg ?? (p.requestPrice ? `Hi, I want ${p.name}. Please share the current price.` : `Hi, I want to order ${p.name} (BDT ${p.price})`))}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="relative rounded-2xl border border-white/10 border-l-4 flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      style={{ backgroundColor: "#151b3d", borderLeftColor: p.brandColor }}
    >
      <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: p.brandColor }} />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-bold text-white text-sm leading-tight">{p.name}</div>
            <div className="text-xs mt-0.5" style={{ color: p.brandColor }}>{p.brand}</div>
          </div>
          {p.badge && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#f4b942" + "22", color: "#f4b942" }}
            >
              {p.badge}
            </span>
          )}
        </div>

        <p className="text-xs leading-relaxed flex-1" style={{ color: "#c9ceda" }}>{p.description}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs px-2 py-0.5 rounded-full border"
            style={
              p.accessType === "shared"
                ? { color: "#c9ceda", borderColor: "rgba(255,255,255,0.2)" }
                : { color: "#f4b942", borderColor: "rgba(244,185,66,0.3)" }
            }
          >
            {p.accessType === "shared" ? "Shared" : "Personal"}
          </span>
          <span className="text-xs" style={{ color: "#c9ceda" }}>⚡ {p.deliverySLA}</span>
          <span className="text-xs" style={{ color: "#c9ceda" }}>🛡 30-day warranty</span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div>
            {p.requestPrice
              ? <div className="text-sm font-bold leading-snug" style={{ color: "#f4b942" }}>বর্তমান মূল্য জানতে<br />WhatsApp করুন</div>
              : <div className="text-xl font-bold" style={{ color: "#f4b942" }}>BDT {(p.price ?? 0).toLocaleString()}</div>}
            {p.officialUSD != null && <div className="text-xs" style={{ color: "#c9ceda" }}>${p.officialUSD}/mo officially</div>}
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ backgroundColor: "#008236", color: "#fff" }}
          >
            <MessageCircle className="w-4 h-4" />
            Order
          </a>
          <button
            onClick={() => navigate(`/product/${p.slug}`)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0 ml-2"
            style={{ backgroundColor: "rgba(244,185,66,0.12)", color: "#f4b942", border: "1px solid rgba(244,185,66,0.25)" }}
          >
            <ChevronRight className="w-4 h-4" />
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Filter state lives in the URL so a filtered view is a real, shareable
// place. Before this, choosing "shared" and "AI Assistant" produced a view
// that could not be linked, bookmarked, or sent to a customer on WhatsApp —
// and that the AI assistant had no way to point anyone at.
const VALID_ACCESS = new Set(["all", "shared", "personal"]);
const VALID_SORT = new Set(["price-asc", "price-desc", "name"]);

function readParams() {
  if (typeof window === "undefined") return { category: "all", access: "all", sort: "price-asc" as SortKey };
  const q = new URLSearchParams(window.location.search);
  const category = q.get("category") ?? "all";
  const access = q.get("access") ?? "all";
  const sort = q.get("sort") ?? "price-asc";
  return {
    // Validated rather than trusted — these come from a URL anyone can edit,
    // and an unknown value would silently render an empty catalogue.
    category: category === "all" || CATEGORY_ORDER.includes(category) ? category : "all",
    access: VALID_ACCESS.has(access) ? access : "all",
    sort: (VALID_SORT.has(sort) ? sort : "price-asc") as SortKey,
  };
}

export default function ProductsPage() {
  const initial = readParams();
  const [categoryFilter, setCategoryFilter] = useState<string>(initial.category);
  const [accessFilter, setAccessFilter] = useState<string>(initial.access);
  const [sort, setSort] = useState<SortKey>(initial.sort);

  // replaceState rather than push: changing a dropdown should not stack up
  // history entries the back button has to walk through.
  useEffect(() => {
    const q = new URLSearchParams();
    if (categoryFilter !== "all") q.set("category", categoryFilter);
    if (accessFilter !== "all") q.set("access", accessFilter);
    if (sort !== "price-asc") q.set("sort", sort);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `/products?${qs}` : "/products");
  }, [categoryFilter, accessFilter, sort]);

  const filterLabel = useMemo(() => {
    if (categoryFilter === "all" && accessFilter === "all") return null;
    const cat = categoryFilter === "all" ? "AI tools" : CATEGORY_LABELS[categoryFilter] ?? "AI tools";
    const access = accessFilter === "all" ? "" : accessFilter === "shared" ? "shared " : "personal ";
    return `${access}${cat}`.trim();
  }, [categoryFilter, accessFilter]);

  const filtered = useMemo(() => {
    let list = [...ALL] as Product[];
    if (categoryFilter !== "all") list = list.filter((p) => p.category === categoryFilter);
    if (accessFilter !== "all") list = list.filter((p) => p.accessType === accessFilter);
    if (sort === "price-asc") list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    else if (sort === "price-desc") list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [categoryFilter, accessFilter, sort]);

  const grouped = useMemo(() => {
    if (categoryFilter !== "all") return null;
    const map: Record<string, Product[]> = {};
    filtered.forEach((p) => {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    });
    return map;
  }, [filtered, categoryFilter]);

  return (
    <PageLayout>
      <SEOHead
        title={
          filterLabel
            ? `${filtered.length} ${filterLabel} — Prices in BDT | AI Premium Shop Bangladesh`
            : `All ${TOTAL_PRODUCTS} AI Tools — Prices in BDT | AI Premium Shop Bangladesh`
        }
        description={
          filterLabel
            ? `${filtered.length} ${filterLabel} with prices in BDT. Pay with bKash, Nagad or Rocket. AI Premium Shop Bangladesh.`
            : `Browse ${TOTAL_PRODUCTS} AI subscriptions. ChatGPT, Claude, Midjourney & more. Prices in BDT. Local payment. Fast delivery. AI Premium Shop.`
        }
        /* A filtered view is a subset of this same page, so it points its
           canonical back at the unfiltered URL rather than asking to be
           indexed as separate thin pages. The filters exist to be shared and
           linked, not to spawn 24 near-duplicate documents. */
        canonical="https://aipremiumshop.com/products"
        // No breadcrumbSchema here: <Breadcrumb> below already injects its own
        // BreadcrumbList JSON-LD from these same items — adding it here too
        // duplicated the block (2x BreadcrumbList in the rendered page).
        jsonLd={[productListSchema(ALL)]}
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "All Products" }]} />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="mb-10">
          {/* The heading has to agree with the filter. A filtered view still
              reading "All 87 AI Tools" above four results contradicts itself,
              and a shared link lands on a page that misstates what it shows. */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {filterLabel ? `${filtered.length} ${filterLabel}` : `All ${TOTAL_PRODUCTS} AI Tools`}
          </h1>
          <p style={{ color: "#c9ceda" }}>
            {filterLabel
              ? `Filtered from ${ALL.length} subscriptions. Local payment. Fast delivery.`
              : `${ALL.length} premium subscriptions. Local payment. Fast delivery.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <Filter aria-hidden="true" className="w-4 h-4 flex-shrink-0" style={{ color: "#f4b942" }} />

          <select
            aria-label="Filter by category"
            className="rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-yellow-400"
            style={{ backgroundColor: "#0a0e27", color: "#fff" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORY_ORDER.map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
            ))}
          </select>

          <select
            aria-label="Filter by access type"
            className="rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-yellow-400"
            style={{ backgroundColor: "#0a0e27", color: "#fff" }}
            value={accessFilter}
            onChange={(e) => setAccessFilter(e.target.value)}
          >
            <option value="all">All Access Types</option>
            <option value="shared">Shared</option>
            <option value="private">Personal / Private</option>
          </select>

          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown aria-hidden="true" className="w-4 h-4" style={{ color: "#c9ceda" }} />
            <select
              aria-label="Sort products"
              className="rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-yellow-400"
              style={{ backgroundColor: "#0a0e27", color: "#fff" }}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </div>

        {grouped ? (
          <div className="space-y-14">
            {CATEGORY_ORDER.filter((cat) => (grouped[cat] ?? []).length > 0).map((cat) => (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-6">
                  <Link href={`/${cat}`}
                    className="text-xl font-bold text-white hover:opacity-80 transition-opacity flex items-center gap-1.5">
                    {CATEGORY_LABELS[cat]}
                    <ChevronRight className="w-4 h-4" style={{ color: "#f4b942" }} />
                  </Link>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}
                  >
                    {grouped[cat].length} tools
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {grouped[cat].map((p) => <ProductCard key={p.id} p={p} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: "#c9ceda" }}>
            <p className="text-lg">No products match your filters.</p>
          </div>
        )}

        <div className="mt-16 p-6 rounded-2xl border border-white/10 mb-8" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-lg font-bold text-white mb-1">Not sure where to start?</h2>
          <p className="text-sm mb-5" style={{ color: "#c9ceda" }}>Browse our role-specific guides to find the best AI tools for your needs.</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Best AI for Students", href: "/best-ai-for-students" },
              { label: "Best AI for Freelancers", href: "/best-ai-for-freelancers" },
              { label: "Best AI for Content Creators", href: "/best-ai-for-creators" },
              { label: "Best AI for Business", href: "/best-ai-for-business" },
              { label: "Best AI for Developers", href: "/best-ai-for-developers" },
              { label: "Best AI for Job Seekers", href: "/best-ai-for-job-seekers" },
            ].map((g) => (
              <Link key={g.href} href={g.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border hover:opacity-80 transition-opacity"
                style={{ backgroundColor: "#f4b94212", borderColor: "#f4b94230", color: "#f4b942", minHeight: "44px" }}>
                {g.label}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div
          className="p-8 rounded-2xl text-center border border-white/10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <p className="font-semibold text-white text-lg mb-2">Not sure which tool is right for you?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Message us on WhatsApp and we&apos;ll recommend the perfect AI subscription for your needs and budget.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#008236", color: "#fff" }}
          >
            <MessageCircle className="w-5 h-5" />
            Chat with us on WhatsApp
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
