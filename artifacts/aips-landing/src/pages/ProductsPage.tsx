import { useState, useMemo, useEffect } from "react";
import { TOTAL_PRODUCTS } from "@/lib/catalogStats";
import { motion } from "framer-motion";
import { MessageCircle, Filter, ArrowUpDown, ChevronRight, Search, X } from "lucide-react";
import { Link } from "wouter";
import { productPath } from "@/lib/productRoutes";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { productListSchema, faqSchema } from "@/utils/schemas";
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

// Persona quick-filters. Grounded in the Notion Problem Library / segment
// research (2026-08-02): every segment buys 3-4 tools, and the top pains are
// plan confusion and not knowing which tools fit their work — so the catalog
// answers "what should a student/freelancer/developer buy" directly, and each
// persona links to its full guide page. Matching uses capabilities plus
// category so new catalog entries join a persona automatically.
const PERSONAS: { key: string; label: string; guide: string; cats: string[]; caps: string[] }[] = [
  { key: "students", label: "🎓 Students", guide: "/best-ai-for-students",
    cats: ["ai-writing"],
    caps: ["research", "citations", "academic-writing", "literature-review", "pdf-chat", "math", "step-by-step", "learning", "certificates"] },
  { key: "freelancers", label: "💼 Freelancers", guide: "/best-ai-for-freelancers",
    cats: ["ai-design", "ai-image"],
    caps: ["design", "writing", "templates", "image-gen", "image-edit", "logo", "web-design", "stock-assets", "career", "networking"] },
  { key: "developers", label: "👨‍💻 Developers", guide: "/best-ai-for-developers",
    cats: ["ai-code"],
    caps: ["code", "api", "agents", "automation", "no-code", "rag"] },
  { key: "marketers", label: "📈 Marketers", guide: "/best-ai-for-business",
    cats: [],
    caps: ["seo", "keywords", "backlinks", "ads", "social", "scheduling", "content-strategy", "audit", "sales", "insights"] },
  { key: "creators", label: "🎬 Creators", guide: "/best-ai-for-creators",
    cats: ["ai-video", "ai-voice-music"],
    caps: ["video-gen", "video-edit", "avatar", "music-gen", "tts", "subtitles", "clipping", "image-to-video", "stock-assets"] },
  { key: "teachers", label: "👩‍🏫 Teachers", guide: "/best-ai-for-students",
    cats: [],
    caps: ["presentations", "slides", "training", "learning", "diagrams", "summarize", "academic-writing", "step-by-step"] },
  { key: "business", label: "🏢 Business", guide: "/best-ai-for-business",
    cats: ["bundles", "ai-workspace"],
    caps: ["crm", "chatbots", "support", "meetings", "transcription", "email", "whatsapp", "automation"] },
];
const VALID_PERSONA = new Set(PERSONAS.map((p) => p.key));

// Rendered as visible content below the grid and emitted as FAQPage JSON-LD.
// Answers mirror claims already made site-wide — do not invent new terms here.
const SHOPPING_FAQS = [
  { q: "How do I pay for AI subscriptions in Bangladesh?",
    a: "bKash, Nagad, Rocket or bank transfer. You never need an international credit card — that's the point of AI Premium Shop." },
  { q: "How fast is delivery?",
    a: "Most tools are delivered in 5–30 minutes via WhatsApp after payment confirmation. Tools marked 'request price' get a confirmed delivery time along with the quote." },
  { q: "What does the 30-day warranty cover?",
    a: "If your access stops working within 30 days, we replace it. See the refund policy for exact terms." },
  { q: "What's the difference between shared and personal plans?",
    a: "Shared plans split one premium subscription between a few users — cheapest way in. Personal plans are private accounts only you use. Choose personal if you need your own chat history, settings and privacy." },
  { q: "Why do some tools say 'request price' instead of showing a number?",
    a: "Provider pricing for those tools changes frequently. Instead of publishing a stale figure, we confirm the current price on WhatsApp before you pay." },
];

function matchesPersona(p: { category: string; capabilities?: string[] }, key: string): boolean {
  const def = PERSONAS.find((d) => d.key === key);
  if (!def) return true;
  if (def.cats.includes(p.category)) return true;
  return (p.capabilities ?? []).some((c) => def.caps.includes(c));
}

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
  capabilities?: string[];
  featured?: boolean;
}

function ProductCard({ p }: { p: Product }) {
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
            {/* A real anchor, not a JS handler: crawlers reach the 157 product
                pages from this master list, and users get cmd-click/preview. */}
            <Link href={productPath(p.slug)} className="font-bold text-white text-sm leading-tight hover:underline">{p.name}</Link>
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
          <Link
            href={productPath(p.slug)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0 ml-2"
            style={{ backgroundColor: "rgba(244,185,66,0.12)", color: "#f4b942", border: "1px solid rgba(244,185,66,0.25)" }}
          >
            <ChevronRight className="w-4 h-4" />
            Details
          </Link>
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
  if (typeof window === "undefined") return { category: "all", access: "all", sort: "price-asc" as SortKey, persona: "all", query: "" };
  const q = new URLSearchParams(window.location.search);
  const category = q.get("category") ?? "all";
  const access = q.get("access") ?? "all";
  const sort = q.get("sort") ?? "price-asc";
  const persona = q.get("for") ?? "all";
  return {
    // Validated rather than trusted — these come from a URL anyone can edit,
    // and an unknown value would silently render an empty catalogue.
    category: category === "all" || CATEGORY_ORDER.includes(category) ? category : "all",
    access: VALID_ACCESS.has(access) ? access : "all",
    sort: (VALID_SORT.has(sort) ? sort : "price-asc") as SortKey,
    persona: persona === "all" || VALID_PERSONA.has(persona) ? persona : "all",
    query: (q.get("q") ?? "").slice(0, 80),
  };
}

export default function ProductsPage() {
  const initial = readParams();
  const [categoryFilter, setCategoryFilter] = useState<string>(initial.category);
  const [accessFilter, setAccessFilter] = useState<string>(initial.access);
  const [sort, setSort] = useState<SortKey>(initial.sort);
  const [persona, setPersona] = useState<string>(initial.persona);
  const [query, setQuery] = useState<string>(initial.query);

  // replaceState rather than push: changing a dropdown should not stack up
  // history entries the back button has to walk through.
  useEffect(() => {
    const q = new URLSearchParams();
    if (categoryFilter !== "all") q.set("category", categoryFilter);
    if (accessFilter !== "all") q.set("access", accessFilter);
    if (sort !== "price-asc") q.set("sort", sort);
    if (persona !== "all") q.set("for", persona);
    if (query) q.set("q", query);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `/products?${qs}` : "/products");
  }, [categoryFilter, accessFilter, sort, persona, query]);

  const filterLabel = useMemo(() => {
    if (categoryFilter === "all" && accessFilter === "all" && persona === "all" && !query.trim()) return null;
    const cat = categoryFilter === "all" ? "AI tools" : CATEGORY_LABELS[categoryFilter] ?? "AI tools";
    const access = accessFilter === "all" ? "" : accessFilter === "shared" ? "shared " : "personal ";
    const who = persona === "all" ? "" : ` for ${PERSONAS.find((d) => d.key === persona)?.label.replace(/^\S+\s/, "").toLowerCase() ?? persona}`;
    const q = query.trim() ? ` matching “${query.trim()}”` : "";
    return `${access}${cat}${who}${q}`.trim();
  }, [categoryFilter, accessFilter, persona, query]);

  const filtered = useMemo(() => {
    let list = [...ALL] as Product[];
    if (categoryFilter !== "all") list = list.filter((p) => p.category === categoryFilter);
    if (accessFilter !== "all") list = list.filter((p) => p.accessType === accessFilter);
    if (persona !== "all") list = list.filter((p) => matchesPersona(p, persona));
    if (query.trim()) {
      const needle = query.trim().toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(needle) ||
        (p.brand ?? "").toLowerCase().includes(needle) ||
        (p.description ?? "").toLowerCase().includes(needle) ||
        (p.capabilities ?? []).some((c) => c.toLowerCase().includes(needle)),
      );
    }
    if (sort === "price-asc") list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    else if (sort === "price-desc") list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [categoryFilter, accessFilter, sort, persona, query]);

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
        jsonLd={[productListSchema(ALL), faqSchema(SHOPPING_FAQS)]}
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

        {/* Persona quick-filters: the #1 documented customer pain is not
            knowing which tools fit their work — answer it before the wall of
            cards, not in guides buried at the bottom of the page. */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm font-semibold mr-1" style={{ color: "#c9ceda" }}>I am a:</span>
          {PERSONAS.map((d) => (
            <button
              key={d.key}
              onClick={() => setPersona(persona === d.key ? "all" : d.key)}
              aria-pressed={persona === d.key}
              className="text-sm px-3 py-1.5 rounded-full border transition-colors"
              style={persona === d.key
                ? { backgroundColor: "#f4b942", color: "#0A0E27", borderColor: "#f4b942", fontWeight: 600 }
                : { color: "#c9ceda", borderColor: "rgba(255,255,255,0.2)" }}
            >
              {d.label}
            </button>
          ))}
          {persona !== "all" && (
            <Link href={PERSONAS.find((d) => d.key === persona)!.guide}
              className="text-sm underline ml-1" style={{ color: "#f4b942" }}>
              Full guide →
            </Link>
          )}
        </div>

        <div className="relative mb-4">
          <Search aria-hidden="true" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#c9ceda" }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${ALL.length} subscriptions — try "video", "SEO", "research"…`}
            aria-label="Search products"
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-white/10 text-sm text-white placeholder:text-[#8b92a8] focus:outline-none focus:border-[#f4b942]"
            style={{ backgroundColor: "#151b3d" }}
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10">
              <X className="w-4 h-4" style={{ color: "#c9ceda" }} />
            </button>
          )}
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

          <div className="flex items-center gap-2 sm:ml-auto">
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
            <p className="text-lg mb-2">No products match your search.</p>
            <p className="text-sm mb-6">We add tools every week — if you need something we don't list yet, we can usually source it.</p>
            <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I'm looking for "${query || "an AI tool"}" — can you help me get it?`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: "#008236", color: "#fff" }}>
              <MessageCircle className="w-4 h-4" /> Ask us on WhatsApp
            </a>
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

        {/* Crawlable buying-guide content: answers the four documented
            customer pains (trust, delivery, plan confusion, payment) in
            indexable prose instead of leaving this page as a bare grid.
            Facts only — payment methods, delivery SLA and warranty match the
            claims already made site-wide. */}
        <section className="mt-10 mb-8 p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-3">Buying premium AI subscriptions in Bangladesh</h2>
          <div className="text-sm leading-relaxed space-y-3" style={{ color: "#c9ceda" }}>
            <p>
              AI Premium Shop is a one-stop catalog of {TOTAL_PRODUCTS} premium AI tools for Bangladesh — from{" "}
              <Link href="/chatgpt-plans-bangladesh" className="underline" style={{ color: "#f4b942" }}>ChatGPT plans</Link>,{" "}
              <Link href="/claude-pro-bangladesh" className="underline" style={{ color: "#f4b942" }}>Claude Pro</Link> and{" "}
              <Link href="/midjourney-bangladesh" className="underline" style={{ color: "#f4b942" }}>Midjourney</Link> to
              SEO suites, video generators and <Link href="/bundles" className="underline" style={{ color: "#f4b942" }}>money-saving bundles</Link>.
              Every price is listed in BDT, and you pay with bKash, Nagad, Rocket or bank transfer — no international card needed.
            </p>
            <p>
              <strong className="text-white">Shared vs Personal:</strong> shared plans split one premium subscription between a few users at the
              lowest price; personal plans give you a private account. Both come with the same delivery and{" "}
              <Link href="/refund-policy" className="underline" style={{ color: "#f4b942" }}>30-day replacement warranty</Link>.
              Some newer tools show “request price” — provider pricing changes often, so we confirm the current rate on WhatsApp instead of publishing a stale number.
            </p>
            <p>
              New here? Read <Link href="/how-to-order" className="underline" style={{ color: "#f4b942" }}>how ordering works</Link>,
              compare plans on the <Link href="/pricing" className="underline" style={{ color: "#f4b942" }}>pricing page</Link>,
              or ask the <Link href="/support" className="underline" style={{ color: "#f4b942" }}>support team</Link> anything.
            </p>
          </div>
          <h3 className="text-lg font-bold text-white mt-6 mb-3">Common questions</h3>
          <div className="space-y-4 text-sm" style={{ color: "#c9ceda" }}>
            {SHOPPING_FAQS.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-white">{f.q}</p>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

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
