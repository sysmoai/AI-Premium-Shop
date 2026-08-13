import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronRight,
  Code2,
  GraduationCap,
  Image,
  Layout,
  LifeBuoy,
  Menu,
  MessageCircle,
  MessageSquare,
  Music,
  Newspaper,
  Package,
  Palette,
  Pen,
  Search,
  Sparkles,
  Users,
  Video,
  WalletCards,
  X,
} from "lucide-react";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { PageFooter } from "@/components/PageFooter";
import { BLOG_CATEGORIES } from "@/lib/blogTaxonomy";
import { TOTAL_PRODUCTS, categoryStats, taka } from "@/lib/catalogStats";
import { computeTopBrands } from "@/lib/topBrands";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../../data/catalog-lite.json";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

type MenuKey = "products" | "bundles" | "solutions" | "learn";
type LiteProduct = (typeof productsData.products)[number];

const CATEGORY_DEFS = [
  { id: "ai-assistant", label: "AI Chat & Assistants", href: "/ai-assistant", icon: MessageSquare, note: "Chat, reasoning, research and general assistants" },
  { id: "ai-image", label: "AI Image & Design", href: "/ai-image", icon: Image, note: "Image generation, editing and creative assets" },
  { id: "ai-video", label: "AI Video", href: "/ai-video", icon: Video, note: "Video generation, avatars, editing and production" },
  { id: "ai-voice-music", label: "AI Voice & Music", href: "/ai-voice-music", icon: Music, note: "Voice, speech, audio and music creation" },
  { id: "ai-code", label: "AI Code & Development", href: "/ai-code", icon: Code2, note: "Coding copilots, IDE agents and app builders" },
  { id: "ai-workspace", label: "AI Workspace", href: "/ai-workspace", icon: Layout, note: "Productivity, documents, meetings and operations" },
  { id: "ai-writing", label: "AI Writing & SEO", href: "/ai-writing", icon: Pen, note: "Writing, rewriting, marketing and search workflows" },
  { id: "ai-design", label: "AI Design & Creative", href: "/ai-design", icon: Palette, note: "Design systems, graphics and creative production" },
  { id: "bundles", label: "Bundles & Services", href: "/bundles", icon: Package, note: "Multi-tool packages, setup and implementation" },
] as const;

const SOLUTIONS = [
  { label: "Students", href: "/best-ai-for-students", icon: GraduationCap, note: "Study, research and exam workflows" },
  { label: "Freelancers", href: "/best-ai-for-freelancers", icon: Users, note: "Proposals, client delivery and productivity" },
  { label: "Creators", href: "/best-ai-for-creators", icon: Palette, note: "Content, visuals, video and publishing" },
  { label: "Business", href: "/best-ai-for-business", icon: Building2, note: "Operations, teams and automation" },
  { label: "Developers", href: "/best-ai-for-developers", icon: Code2, note: "Build, debug and ship faster" },
  { label: "Job Seekers", href: "/best-ai-for-job-seekers", icon: Briefcase, note: "CV, interview and career workflows" },
] as const;

const LEARN_LINKS = [
  { label: "All Guides", href: "/guides", icon: BookOpen, note: "Practical AI workflows by audience" },
  { label: "AI Blog", href: "/blog", icon: Newspaper, note: "Research, comparisons and buying guidance" },
  { label: "Pricing", href: "/pricing", icon: WalletCards, note: "Compare current public plan records" },
  { label: "Support", href: "/support", icon: LifeBuoy, note: "Help before and after choosing" },
] as const;

const SEO_DEEP_LINKS = [
  { label: "AI tools under BDT 500", href: "/ai-under-500" },
  { label: "AI tools under BDT 1,000", href: "/ai-under-1000" },
  { label: "AI tools under BDT 3,000", href: "/ai-under-3000" },
  { label: "ChatGPT vs Claude", href: "/chatgpt-vs-claude-bangladesh" },
  { label: "ChatGPT vs Gemini", href: "/chatgpt-vs-gemini" },
  { label: "Copilot vs Cursor", href: "/copilot-vs-cursor" },
  { label: "Midjourney vs Ideogram", href: "/midjourney-vs-ideogram" },
  { label: "Best AI subscription 2026", href: "/best-ai-subscription-2026" },
] as const;

function uniqueCheapestProducts(categoryId: string, limit = 8): LiteProduct[] {
  const cheapest = new Map<string, LiteProduct>();
  for (const product of productsData.products) {
    if (product.category !== categoryId) continue;
    const current = cheapest.get(product.slug);
    if (!current || (product.price ?? Number.POSITIVE_INFINITY) < (current.price ?? Number.POSITIVE_INFINITY)) {
      cheapest.set(product.slug, product);
    }
  }
  return Array.from(cheapest.values())
    .sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY))
    .slice(0, limit);
}

function uniqueSearchResults(query: string): LiteProduct[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return [];
  const best = new Map<string, LiteProduct>();
  for (const product of productsData.products) {
    const haystack = `${product.name} ${product.brand} ${product.category} ${product.tier ?? ""}`.toLowerCase();
    if (!haystack.includes(normalized)) continue;
    const current = best.get(product.slug);
    if (!current || (product.price ?? Number.POSITIVE_INFINITY) < (current.price ?? Number.POSITIVE_INFINITY)) {
      best.set(product.slug, product);
    }
  }
  return Array.from(best.values()).slice(0, 8);
}

function formatPrice(product: LiteProduct) {
  return product.requestPrice || product.price == null ? "Check current price" : taka(product.price);
}

function NavButton({
  id,
  label,
  openMenu,
  setOpenMenu,
}: {
  id: MenuKey;
  label: string;
  openMenu: MenuKey | null;
  setOpenMenu: (value: MenuKey | null) => void;
}) {
  const open = openMenu === id;
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={open}
      onMouseEnter={() => setOpenMenu(id)}
      onFocus={() => setOpenMenu(id)}
      onClick={() => setOpenMenu(open ? null : id)}
      className={`group inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
        open ? "bg-white/[0.07] text-[#ffd26f]" : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      {label}
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} className="inline-flex">
        <ChevronDown className="h-3.5 w-3.5" />
      </motion.span>
    </button>
  );
}

function ProductMegaMenu({ onKeepOpen }: { onKeepOpen: () => void }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORY_DEFS[0].id);
  const current = CATEGORY_DEFS.find((category) => category.id === activeCategory) ?? CATEGORY_DEFS[0];
  const products = useMemo(() => uniqueCheapestProducts(activeCategory, 8), [activeCategory]);
  const stats = categoryStats(activeCategory);

  return (
    <div data-testid="mega-products" onMouseEnter={onKeepOpen} className="mx-auto grid max-w-7xl grid-cols-[280px_minmax(0,1fr)_260px] gap-6 px-6 py-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-2">
        <div className="px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Browse categories</div>
        {CATEGORY_DEFS.map((category) => {
          const Icon = category.icon;
          const categoryInfo = categoryStats(category.id);
          const active = category.id === activeCategory;
          return (
            <a
              key={category.id}
              href={category.href}
              data-testid={`mega-category-${category.id}`}
              onMouseEnter={() => setActiveCategory(category.id)}
              onFocus={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${active ? "bg-[#f4b942]/10 text-white" : "text-slate-300 hover:bg-white/[0.05] hover:text-white"}`}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${active ? "border-[#f4b942]/30 bg-[#f4b942]/10 text-[#ffd26f]" : "border-white/8 bg-white/[0.03] text-slate-500 group-hover:text-slate-300"}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{category.label}</span>
                <span className="block text-[11px] text-slate-500">{categoryInfo.productCount} tools</span>
              </span>
              <ChevronRight className={`h-4 w-4 ${active ? "text-[#f4b942]" : "text-slate-600"}`} />
            </a>
          );
        })}
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f4b942]">Category explorer</p>
            <h3 data-testid="mega-active-category-title" className="mt-1 text-xl font-bold text-white">{current.label}</h3>
            <p className="mt-1 text-sm text-slate-400">{current.note}</p>
          </div>
          <a href={current.href} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-white transition hover:border-[#f4b942]/40 hover:text-[#ffd26f]">
            View category <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 xl:grid-cols-4">
          {products.map((product) => (
            <a
              key={product.slug}
              data-testid="mega-product-link"
              href={productPath(product.slug)}
              className="group rounded-xl border border-white/8 bg-white/[0.025] p-3 transition hover:-translate-y-0.5 hover:border-[#f4b942]/30 hover:bg-[#f4b942]/[0.055]"
            >
              <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-slate-500">{product.brand}</p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-white">{product.name}</p>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-slate-500">{product.tier ?? "Plan"}</span>
                <span className="shrink-0 font-bold text-[#f4b942]">{formatPrice(product)}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
          <span>{stats.productCount} products in this category</span>
          {stats.fromPrice != null && <span>Public plans from {taka(stats.fromPrice)}</span>}
          <a href="/products" className="ml-auto font-bold text-[#f4b942] hover:text-[#ffd26f]">Browse all {TOTAL_PRODUCTS} tools</a>
        </div>
      </div>

      <aside className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(244,185,66,.075),rgba(255,255,255,.02))] p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white"><Sparkles className="h-4 w-4 text-[#f4b942]" /> Find by outcome</div>
        <p className="mt-2 text-xs leading-5 text-slate-400">Start with the work you need done, then compare the relevant tools.</p>
        <div className="mt-4 space-y-1">
          {SOLUTIONS.map((solution) => {
            const Icon = solution.icon;
            return (
              <a key={solution.href} href={solution.href} className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.055] hover:text-white">
                <Icon className="h-4 w-4 text-slate-500 group-hover:text-[#f4b942]" />
                {solution.label}
                <ChevronRight className="ml-auto h-3.5 w-3.5 text-slate-600" />
              </a>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function BundlesMegaMenu({ onKeepOpen }: { onKeepOpen: () => void }) {
  const bundles = uniqueCheapestProducts("bundles", 8);
  return (
    <div onMouseEnter={onKeepOpen} className="mx-auto max-w-5xl px-6 py-6">
      <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f4b942]">Bundles & services</p>
          <h3 className="mt-1 text-xl font-bold text-white">Combine tools or get implementation help</h3>
        </div>
        <a href="/bundles" className="text-sm font-bold text-[#f4b942]">View all bundles →</a>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {bundles.map((bundle) => (
          <a key={bundle.slug} href={productPath(bundle.slug)} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-[#f4b942]/30 hover:bg-white/[0.045]">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{bundle.brand}</p>
            <p className="mt-1 text-sm font-semibold text-white">{bundle.name}</p>
            <p className="mt-4 text-sm font-extrabold text-[#f4b942]">{formatPrice(bundle)}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function SolutionsMegaMenu({ onKeepOpen }: { onKeepOpen: () => void }) {
  return (
    <div onMouseEnter={onKeepOpen} className="mx-auto max-w-5xl px-6 py-6">
      <div className="grid grid-cols-3 gap-3">
        {SOLUTIONS.map((solution) => {
          const Icon = solution.icon;
          return (
            <a key={solution.href} href={solution.href} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-[#f4b942]/30 hover:bg-[#f4b942]/[0.045]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 group-hover:text-[#f4b942]"><Icon className="h-4.5 w-4.5" /></div>
              <h3 className="mt-3 font-bold text-white">{solution.label}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-400">{solution.note}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function LearnMegaMenu({ onKeepOpen }: { onKeepOpen: () => void }) {
  return (
    <div onMouseEnter={onKeepOpen} className="mx-auto grid max-w-6xl grid-cols-[1fr_1fr] gap-6 px-6 py-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f4b942]">Learn & compare</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {LEARN_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.href} href={item.href} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#f4b942]/30 hover:bg-white/[0.045]">
                <Icon className="h-4.5 w-4.5 text-slate-500 group-hover:text-[#f4b942]" />
                <p className="mt-2 text-sm font-bold text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.note}</p>
              </a>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f4b942]">Blog topics</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {BLOG_CATEGORIES.slice(0, 8).map((category) => (
            <a key={category.href} href={category.href} className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white">
              {category.emoji} {category.label}
            </a>
          ))}
        </div>
        <div className="mt-3 flex gap-3 text-sm">
          <a href="/how-to-order" className="font-semibold text-slate-400 hover:text-white">How to order</a>
          <a href="/faq" className="font-semibold text-slate-400 hover:text-white">FAQ</a>
          <a href="/bn" className="font-semibold text-slate-400 hover:text-white">বাংলা</a>
        </div>
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => uniqueSearchResults(query), [query]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      data-testid="premium-search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-[#02050b]/90 px-4 pt-20 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mx-auto max-w-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ChatGPT, Claude, video, coding, design..."
            className="w-full rounded-2xl border border-white/15 bg-[#0a1322] py-4 pl-12 pr-12 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-[#f4b942]/50"
          />
          <button onClick={onClose} aria-label="Close search" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:bg-white/[0.06] hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#07101c] shadow-2xl">
          {query.trim().length < 2 ? (
            <div className="p-6 text-sm text-slate-400">Search the current public catalog. Results link to crawlable product pages, not a JavaScript-only result state.</div>
          ) : results.length ? (
            results.map((product) => (
              <a key={product.slug} href={productPath(product.slug)} className="flex items-center gap-4 border-b border-white/8 px-5 py-3.5 last:border-0 hover:bg-white/[0.04]">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{product.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{product.brand} · {product.category}</p>
                </div>
                <span className="shrink-0 text-sm font-extrabold text-[#f4b942]">{formatPrice(product)}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-600" />
              </a>
            ))
          ) : (
            <div className="p-6 text-sm text-slate-400">No catalog match. <a href="/products" className="font-bold text-[#f4b942]">Browse all products</a>.</div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileMenu({ close }: { close: () => void }) {
  const [section, setSection] = useState<"products" | "solutions" | "learn" | null>("products");
  const sections = [
    { id: "products" as const, label: "Products & categories" },
    { id: "solutions" as const, label: "Find by goal" },
    { id: "learn" as const, label: "Learn & support" },
  ];

  return (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-[#060b13] lg:hidden">
      <div className="mx-auto max-w-7xl px-4 py-4">
        {sections.map((item) => (
          <div key={item.id} className="border-b border-white/8 last:border-0">
            <button type="button" onClick={() => setSection(section === item.id ? null : item.id)} className="flex w-full items-center justify-between py-3 text-left text-sm font-bold text-white" aria-expanded={section === item.id}>
              {item.label}<motion.span animate={{ rotate: section === item.id ? 180 : 0 }}><ChevronDown className="h-4 w-4 text-slate-500" /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {section === item.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="grid gap-1 pb-3 sm:grid-cols-2">
                    {item.id === "products" && CATEGORY_DEFS.map((category) => (
                      <a key={category.href} href={category.href} onClick={close} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.05] hover:text-white">{category.label}<span className="text-xs text-slate-600">{categoryStats(category.id).productCount}</span></a>
                    ))}
                    {item.id === "solutions" && SOLUTIONS.map((solution) => (
                      <a key={solution.href} href={solution.href} onClick={close} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.05] hover:text-white">{solution.label}</a>
                    ))}
                    {item.id === "learn" && [...LEARN_LINKS, { label: "বাংলা", href: "/bn", icon: BookOpen, note: "Bangla resources" }].map((link) => (
                      <a key={link.href} href={link.href} onClick={close} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/[0.05] hover:text-white">{link.label}</a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href="/pricing" onClick={close} className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-bold text-white">Pricing</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={close} className="rounded-xl bg-[#19a55a] px-4 py-3 text-center text-sm font-bold text-white">Ask on WhatsApp</a>
        </div>
      </div>
    </motion.div>
  );
}

function PremiumNavigation() {
  const reduced = useReducedMotion();
  const [openMenu, setOpenMenuState] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpenMenu = (menu: MenuKey | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenuState(menu);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenuState(null), 160);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenuState(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="border-b border-white/10 bg-[#03070d]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 overflow-hidden px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
          {TOTAL_PRODUCTS} AI tools · local BDT pricing · bKash · Nagad · Rocket · Bank
        </div>
      </div>

      <header data-testid="premium-homepage-nav" onMouseLeave={scheduleClose} className="sticky top-0 z-[70] border-b border-white/10 bg-[#050912]/88 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#050912]/76">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-8">
          <a href="/" className="shrink-0" aria-label="AI Premium Shop home"><PrimaryBrandLogo size="small" layout="horizontal" decorative /></a>

          <nav aria-label="Primary" className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
            <NavButton id="products" label="Products" openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <NavButton id="bundles" label="Bundles" openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <NavButton id="solutions" label="Solutions" openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <NavButton id="learn" label="Learn" openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <a href="/pricing" onMouseEnter={() => setOpenMenu(null)} className="rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white">Pricing</a>
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search AI tools" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"><Search className="h-4.5 w-4.5" /></button>
            <a href="/support" className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white xl:inline-flex">Support</a>
            <a href="/bn" className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white xl:inline-flex">বাংলা</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-xl bg-[#19a55a] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-[#20b965] sm:inline-flex"><MessageCircle className="h-4 w-4" /> Ask AIPS</a>
            <button type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white lg:hidden">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full hidden border-b border-white/10 bg-[#050912]/98 shadow-[0_30px_80px_rgba(0,0,0,.45)] backdrop-blur-2xl lg:block"
            >
              {openMenu === "products" && <ProductMegaMenu onKeepOpen={() => setOpenMenu("products")} />}
              {openMenu === "bundles" && <BundlesMegaMenu onKeepOpen={() => setOpenMenu("bundles")} />}
              {openMenu === "solutions" && <SolutionsMegaMenu onKeepOpen={() => setOpenMenu("solutions")} />}
              {openMenu === "learn" && <LearnMegaMenu onKeepOpen={() => setOpenMenu("learn")} />}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}</AnimatePresence>
      </header>

      <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
    </>
  );
}

function CategoryArchitecture() {
  const reduced = useReducedMotion();
  const topBrands = computeTopBrands().slice(0, 12);
  const doubled = [...topBrands, ...topBrands];

  return (
    <div className="bg-[#050912] text-white">
      <section aria-labelledby="browse-categories-title" className="border-t border-white/10 px-4 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">V1 strength, rebuilt</p>
              <h2 id="browse-categories-title" className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Browse the catalog the way search engines and humans understand it.</h2>
              <p className="mt-4 text-base leading-7 text-slate-400">Every major category is a crawlable destination, with direct links to the tools inside it. Hover for motion; click for the full category.</p>
            </div>
            <a href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#f4b942]">All {TOTAL_PRODUCTS} tools <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_DEFS.map((category, index) => {
              const Icon = category.icon;
              const stats = categoryStats(category.id);
              const preview = uniqueCheapestProducts(category.id, 3);
              return (
                <motion.a
                  key={category.id}
                  href={category.href}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.2) }}
                  whileHover={reduced ? undefined : { y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#f4b942]/0 blur-3xl transition duration-500 group-hover:bg-[#f4b942]/10" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition group-hover:border-[#f4b942]/30 group-hover:text-[#f4b942]"><Icon className="h-5 w-5" /></div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white">{category.label}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{category.note}</p>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-[#f4b942]" />
                  </div>
                  <div className="relative mt-4 flex flex-wrap gap-2 text-[11px] text-slate-500">
                    <span className="rounded-full border border-white/8 px-2.5 py-1">{stats.productCount} tools</span>
                    {stats.fromPrice != null && <span className="rounded-full border border-white/8 px-2.5 py-1">from {taka(stats.fromPrice)}</span>}
                  </div>
                  <div className="relative mt-4 border-t border-white/8 pt-3 text-xs text-slate-500">{preview.map((item) => item.brand).filter((brand, i, arr) => arr.indexOf(brand) === i).join(" · ")}</div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-[#070d17] py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Popular brand routes</p><h2 className="mt-1 text-xl font-bold">Fast paths into the catalog</h2></div>
            <a href="/pricing" className="text-sm font-bold text-slate-400 hover:text-white">Compare pricing →</a>
          </div>
        </div>
        <div className="group relative overflow-hidden" aria-label="Popular AI brands">
          <motion.div
            className="flex w-max gap-3 px-3"
            animate={reduced ? undefined : { x: [0, -Math.max(600, topBrands.length * 135)] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {doubled.map((brand, index) => (
              <a key={`${brand.name}-${index}`} href={brand.href} className="flex min-w-44 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 transition hover:border-[#f4b942]/30 hover:bg-white/[0.045]">
                <span className="text-sm font-bold text-white">{brand.name}</span><span className="text-xs font-bold text-[#f4b942]">{brand.price}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">Buy with clarity</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">A simple path from discovery to the right product page.</h2>
              <p className="mt-4 text-base leading-7 text-slate-400">The homepage should attract attention, but the buying decision still needs explicit access, plan and price context.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Choose the job", "Start with a category, goal, budget or comparison instead of guessing a brand."],
                ["02", "Check the exact plan", "Read the product page for the current access model, public price and governed details."],
                ["03", "Use the buying path", "Continue through the current order or support route only after the plan fits your needs."],
              ].map(([number, title, copy]) => (
                <motion.div key={number} whileHover={reduced ? undefined : { y: -4 }} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-xs font-extrabold tracking-[0.16em] text-[#f4b942]">{number}</p><h3 className="mt-3 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(244,185,66,.06),rgba(255,255,255,.02))] p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f4b942]">SEO discovery paths</p><h2 className="mt-2 text-2xl font-bold">Budget, comparison and guide pages deserve direct internal links.</h2><p className="mt-2 text-sm leading-6 text-slate-400">These are useful visitor shortcuts and also make the site hierarchy explicit to crawlers.</p></div>
              <a href="/guides" className="inline-flex items-center gap-2 text-sm font-bold text-[#f4b942]">Explore all guides <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {SEO_DEEP_LINKS.map((link) => <a key={link.href} href={link.href} className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:border-[#f4b942]/30 hover:text-white">{link.label}</a>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomepagePremiumShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#050912]">
      <style>{`
        [data-testid="homepage-v2"] > div:first-of-type,
        [data-testid="homepage-v2"] > header,
        [data-testid="homepage-v2"] > footer { display: none !important; }
        [data-testid="homepage-v2"] { min-height: auto !important; }
      `}</style>
      <PremiumNavigation />
      {children}
      <CategoryArchitecture />
      <PageFooter />
    </div>
  );
}
