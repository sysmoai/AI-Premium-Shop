import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ChevronRight, Filter, MessageCircle, Search, ShieldCheck, X } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-pages.json";

const WHATSAPP = "https://wa.me/8801865385348";
const RETIRED_PRODUCT_SLUGS = new Set(["replit-bangladesh"]);
const ALL = productsData.products.filter((product) => !RETIRED_PRODUCT_SLUGS.has(product.slug));
const ACTIVE_FAMILY_COUNT = new Set(ALL.map((product) => product.slug)).size;

type Product = (typeof ALL)[number];
type SortKey = "price-asc" | "price-desc" | "name";

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

const CATEGORY_ORDER = [
  "ai-assistant",
  "ai-image",
  "ai-video",
  "ai-voice-music",
  "ai-code",
  "ai-workspace",
  "ai-writing",
  "ai-design",
  "bundles",
];

const PERSONAS: { key: string; label: string; guide: string; cats: string[]; caps: string[] }[] = [
  { key: "students", label: "🎓 Students", guide: "/best-ai-for-students", cats: ["ai-writing"], caps: ["research", "citations", "academic-writing", "pdf-chat", "math", "learning"] },
  { key: "freelancers", label: "💼 Freelancers", guide: "/best-ai-for-freelancers", cats: ["ai-design", "ai-image"], caps: ["design", "writing", "templates", "image-gen", "image-edit", "logo", "web-design"] },
  { key: "developers", label: "👨‍💻 Developers", guide: "/best-ai-for-developers", cats: ["ai-code"], caps: ["code", "api", "agents", "automation", "no-code", "rag"] },
  { key: "marketers", label: "📈 Marketers", guide: "/best-ai-for-business", cats: ["ai-writing"], caps: ["seo", "keywords", "ads", "social", "content-strategy", "sales"] },
  { key: "creators", label: "🎬 Creators", guide: "/best-ai-for-creators", cats: ["ai-video", "ai-voice-music", "ai-image"], caps: ["video-gen", "video-edit", "avatar", "music-gen", "tts", "subtitles", "image-to-video"] },
  { key: "business", label: "🏢 Business", guide: "/best-ai-for-business", cats: ["bundles", "ai-workspace"], caps: ["crm", "chatbots", "support", "meetings", "email", "automation"] },
];

const VALID_PERSONA = new Set(PERSONAS.map((persona) => persona.key));
const VALID_ACCESS = new Set(["all", "shared", "personal"]);
const VALID_SORT = new Set(["price-asc", "price-desc", "name"]);

function matchesPersona(product: Pick<Product, "category" | "capabilities">, key: string) {
  const definition = PERSONAS.find((persona) => persona.key === key);
  if (!definition) return true;
  if (definition.cats.includes(product.category)) return true;
  return (product.capabilities ?? []).some((capability) => definition.caps.includes(capability));
}

function readParams() {
  if (typeof window === "undefined") {
    return { category: "all", access: "all", sort: "price-asc" as SortKey, persona: "all", query: "" };
  }
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") ?? "all";
  const access = params.get("access") ?? "all";
  const sort = params.get("sort") ?? "price-asc";
  const persona = params.get("for") ?? "all";
  return {
    category: category === "all" || CATEGORY_ORDER.includes(category) ? category : "all",
    access: VALID_ACCESS.has(access) ? access : "all",
    sort: (VALID_SORT.has(sort) ? sort : "price-asc") as SortKey,
    persona: persona === "all" || VALID_PERSONA.has(persona) ? persona : "all",
    query: (params.get("q") ?? "").slice(0, 80),
  };
}

function displayPrice(product: Product) {
  return product.requestPrice || product.price == null ? "Check current price" : `BDT ${product.price.toLocaleString()}`;
}

function ProductCard({ product }: { product: Product }) {
  const whatsappMessage = product.requestPrice
    ? `Hi, I want ${product.name}. Please share the current price and access details.`
    : `Hi, I want ${product.name} (${displayPrice(product)}). Please confirm the current access and delivery details.`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151b3d] transition hover:-translate-y-0.5 hover:border-white/20 hover:shadow-xl"
    >
      <div className="h-1 w-full" style={{ backgroundColor: product.brandColor }} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold" style={{ color: product.brandColor }}>{product.brand}</p>
            <Link href={productPath(product.slug)} className="mt-1 block text-sm font-bold leading-5 text-white hover:underline">
              {product.name}
            </Link>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-2 py-1 text-[11px] font-semibold capitalize text-slate-300">
            {product.accessType}
          </span>
        </div>

        <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-400">
          Choose this plan only after checking its current access, availability and delivery details on the product page.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(product.capabilities ?? []).slice(0, 3).map((capability) => (
            <span key={capability} className="rounded-full bg-white/[0.04] px-2 py-1 text-[10px] text-slate-500">
              {capability.replaceAll("-", " ")}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <p className="text-lg font-extrabold text-[#f4b942]">{displayPrice(product)}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={productPath(product.slug)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#f4b942]/25 bg-[#f4b942]/10 px-3 py-2 text-xs font-bold text-[#f4b942]"
            >
              Details <ChevronRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={`${WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[#008236] px-3 py-2 text-xs font-bold text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Ask AIPS
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductsPage() {
  const initial = readParams();
  const [categoryFilter, setCategoryFilter] = useState(initial.category);
  const [accessFilter, setAccessFilter] = useState(initial.access);
  const [sort, setSort] = useState<SortKey>(initial.sort);
  const [persona, setPersona] = useState(initial.persona);
  const [query, setQuery] = useState(initial.query);

  useEffect(() => {
    const params = new URLSearchParams();
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    if (accessFilter !== "all") params.set("access", accessFilter);
    if (sort !== "price-asc") params.set("sort", sort);
    if (persona !== "all") params.set("for", persona);
    if (query) params.set("q", query);
    const encoded = params.toString();
    window.history.replaceState(null, "", encoded ? `/products?${encoded}` : "/products");
  }, [categoryFilter, accessFilter, sort, persona, query]);

  const filtered = useMemo(() => {
    let list = [...ALL];
    if (categoryFilter !== "all") list = list.filter((product) => product.category === categoryFilter);
    if (accessFilter !== "all") list = list.filter((product) => product.accessType === accessFilter);
    if (persona !== "all") list = list.filter((product) => matchesPersona(product, persona));
    if (query.trim()) {
      const needle = query.trim().toLowerCase();
      list = list.filter((product) => {
        const searchable = `${product.name} ${product.brand} ${product.category} ${(product.capabilities ?? []).join(" ")}`.toLowerCase();
        return searchable.includes(needle);
      });
    }
    if (sort === "price-asc") list.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
    else if (sort === "price-desc") list.sort((a, b) => (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [accessFilter, categoryFilter, persona, query, sort]);

  const grouped = useMemo(() => {
    if (categoryFilter !== "all") return null;
    const groups: Record<string, Product[]> = {};
    for (const product of filtered) {
      if (!groups[product.category]) groups[product.category] = [];
      groups[product.category].push(product);
    }
    return groups;
  }, [categoryFilter, filtered]);

  const activePersona = PERSONAS.find((entry) => entry.key === persona);

  return (
    <PageLayout>
      <SEOHead
        title="AI Tools in Bangladesh — Prices in BDT | AI Premium Shop"
        description={`Browse ${ACTIVE_FAMILY_COUNT} active AI tool families by category, access type and use case. Compare public BDT prices and check each product page for current access and delivery details.`}
        canonical="https://aipremiumshop.com/products"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "All Products" }]} />

      <main className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <header className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Current public catalog</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">Find the AI tool that fits your work</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
            Browse {ACTIVE_FAMILY_COUNT} active AI tool families and {ALL.length} public plan records. Prices are shown in BDT where available. Access, availability, delivery and support conditions can vary by product and plan, so use the relevant product page as the current buying reference.
          </p>
        </header>

        <section aria-label="Browse by category" className="mt-8 flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((category) => (
            <Link
              key={category}
              href={`/${category}`}
              className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:border-[#f4b942]/30 hover:text-white"
            >
              {CATEGORY_LABELS[category]}
            </Link>
          ))}
        </section>

        <section aria-label="Catalog filters" className="mt-8 rounded-2xl border border-white/10 bg-[#151b3d] p-4">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-slate-400">Find for:</span>
            {PERSONAS.map((entry) => (
              <button
                key={entry.key}
                type="button"
                aria-pressed={persona === entry.key}
                onClick={() => setPersona(persona === entry.key ? "all" : entry.key)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${persona === entry.key ? "border-[#f4b942] bg-[#f4b942] font-bold text-[#07101f]" : "border-white/15 text-slate-300 hover:border-white/25"}`}
              >
                {entry.label}
              </button>
            ))}
            {activePersona && (
              <Link href={activePersona.guide} className="ml-1 text-sm font-semibold text-[#f4b942] underline">
                Full guide →
              </Link>
            )}
          </div>

          <div className="relative mb-4">
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by tool, brand or capability — e.g. video, research, code..."
              aria-label="Search products"
              className="w-full rounded-xl border border-white/10 bg-[#0a0e27] py-3 pl-11 pr-10 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#f4b942]/50"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Filter aria-hidden="true" className="h-4 w-4 shrink-0 text-[#f4b942]" />
            <select
              aria-label="Filter by category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#0a0e27] px-3 py-2 text-sm text-white outline-none focus:border-[#f4b942]/50"
            >
              <option value="all">All Categories</option>
              {CATEGORY_ORDER.map((category) => <option key={category} value={category}>{CATEGORY_LABELS[category]}</option>)}
            </select>

            <select
              aria-label="Filter by access type"
              value={accessFilter}
              onChange={(event) => setAccessFilter(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#0a0e27] px-3 py-2 text-sm text-white outline-none focus:border-[#f4b942]/50"
            >
              <option value="all">All Access Types</option>
              <option value="shared">Shared</option>
              <option value="personal">Personal</option>
            </select>

            <div className="flex items-center gap-2 sm:ml-auto">
              <ArrowUpDown aria-hidden="true" className="h-4 w-4 text-slate-500" />
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="rounded-lg border border-white/10 bg-[#0a0e27] px-3 py-2 text-sm text-white outline-none focus:border-[#f4b942]/50"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-slate-500">
          <p>{filtered.length} matching plan record{filtered.length === 1 ? "" : "s"}</p>
          {(categoryFilter !== "all" || accessFilter !== "all" || persona !== "all" || query) && (
            <button
              type="button"
              onClick={() => { setCategoryFilter("all"); setAccessFilter("all"); setPersona("all"); setQuery(""); setSort("price-asc"); }}
              className="font-semibold text-[#f4b942] hover:text-[#ffd26f]"
            >
              Reset filters
            </button>
          )}
        </div>

        {grouped ? (
          <div className="mt-10 space-y-14">
            {CATEGORY_ORDER.filter((category) => (grouped[category] ?? []).length > 0).map((category) => (
              <section key={category} aria-labelledby={`catalog-${category}`}>
                <div className="mb-5 flex items-center gap-3">
                  <Link id={`catalog-${category}`} href={`/${category}`} className="inline-flex items-center gap-1.5 text-xl font-bold text-white hover:text-[#f4b942]">
                    {CATEGORY_LABELS[category]} <ChevronRight className="h-4 w-4" />
                  </Link>
                  <span className="rounded-full bg-[#f4b942]/10 px-2 py-1 text-xs font-semibold text-[#f4b942]">{grouped[category].length} plans</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {grouped[category].map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <p className="text-lg font-semibold text-white">No current catalog match</p>
            <p className="mt-2 text-sm">Try another category, capability or access type, or ask AIPS for help finding the right route.</p>
            <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I am looking for ${query || "an AI tool"}. Can you help?`)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#008236] px-5 py-3 text-sm font-bold text-white">
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        )}

        <section className="mt-16 rounded-3xl border border-white/10 bg-[#151b3d] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f4b942]/20 bg-[#f4b942]/10 text-[#f4b942]"><ShieldCheck className="h-5 w-5" /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Read the exact plan before you pay</h2>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-400">
                Shared and personal access are different buying models, and delivery or support conditions can differ by product. This catalog is for discovery and public price comparison; the product page and current support confirmation are the reference for the exact plan you are considering.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/pricing" className="rounded-full border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:text-white">Compare pricing</Link>
            <Link href="/how-to-order" className="rounded-full border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:text-white">How to order</Link>
            <Link href="/support" className="rounded-full border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:text-white">Support</Link>
            <Link href="/refund-policy" className="rounded-full border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:text-white">Refund policy</Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
