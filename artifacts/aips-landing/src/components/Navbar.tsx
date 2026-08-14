import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Search, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { productPath } from "@/lib/productRoutes";
import productsData from "../../data/catalog-lite.json";

const RETIRED = new Set(["replit-bangladesh"]);
const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20please%20help%20me%20confirm%20the%20current%20details%20for%20an%20AI%20tool%20before%20payment.";

const CATEGORY_DEFS = [
  ["ai-assistant", "AI Assistants", "/ai-assistant"],
  ["ai-image", "AI Image", "/ai-image"],
  ["ai-video", "AI Video", "/ai-video"],
  ["ai-voice-music", "AI Voice & Music", "/ai-voice-music"],
  ["ai-code", "AI Code", "/ai-code"],
  ["ai-workspace", "AI Workspace", "/ai-workspace"],
  ["ai-writing", "AI Writing & SEO", "/ai-writing"],
  ["ai-design", "AI Design", "/ai-design"],
  ["bundles", "Bundles & Services", "/bundles"],
] as const;

const AUDIENCE_LINKS = [
  ["Students", "/best-ai-for-students"],
  ["Freelancers", "/best-ai-for-freelancers"],
  ["Creators", "/best-ai-for-creators"],
  ["Business", "/best-ai-for-business"],
  ["Developers", "/best-ai-for-developers"],
  ["Educators", "/guides/educators"],
] as const;

type CatalogRecord = (typeof productsData.products)[number];
const catalog = (productsData.products as CatalogRecord[]).filter((record) => !RETIRED.has(record.slug));

function baseName(value: string) {
  return value.split(/—\s*/)[0].split(/\s+-\s+/)[0].trim();
}

function familyStats(category: string) {
  const records = catalog.filter((record) => record.category === category);
  const families = new Set(records.map((record) => record.slug));
  const prices = records.filter((record) => !record.requestPrice && typeof record.price === "number" && record.price > 0).map((record) => Number(record.price));
  return { count: families.size, minPrice: prices.length ? Math.min(...prices) : null };
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => normalized.length < 2 ? [] : [...new Map(catalog
    .filter((record) => `${record.name} ${record.brand ?? ""} ${record.category}`.toLowerCase().includes(normalized))
    .map((record) => [record.slug, record])).values()].slice(0, 8), [normalized]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-[#0a0e27]/95 px-4 pt-24 backdrop-blur-xl" onClick={onClose}>
    <div className="mx-auto max-w-2xl" onClick={(event) => event.stopPropagation()}>
      <div className="relative"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search current AI catalog" className="min-h-14 w-full rounded-2xl border border-white/15 bg-[#151b3d] pl-12 pr-12 text-white outline-none focus:border-[#f4b942]/50" /><button type="button" onClick={onClose} aria-label="Close search" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"><X className="h-5 w-5" /></button></div>
      {normalized.length >= 2 && <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#151b3d]">{results.length ? results.map((record, index) => <Link key={record.slug} href={productPath(record.slug)} onClick={onClose} className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/5 ${index ? "border-t border-white/10" : ""}`}><div className="min-w-0"><div className="truncate text-sm font-semibold text-white">{baseName(record.name)}</div><div className="mt-1 text-xs text-slate-500">{record.category}</div></div><span className="shrink-0 text-xs font-semibold text-[#f4b942]">{typeof record.price === "number" && record.price > 0 && !record.requestPrice ? `BDT ${record.price.toLocaleString("en-BD")}` : "Check price"}</span></Link>) : <p className="px-5 py-6 text-center text-sm text-slate-400">No current catalog family matches that search.</p>}</div>}
    </div>
  </motion.div>;
}

function DesktopProductsMenu() {
  return <div className="absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-3"><div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-[#101633] p-4 shadow-2xl">{CATEGORY_DEFS.map(([id, label, href]) => { const stats = familyStats(id); return <Link key={id} href={href} className="rounded-xl border border-white/10 bg-[#151b3d] p-4 transition hover:border-[#f4b942]/35"><div className="text-sm font-bold text-white">{label}</div><div className="mt-1 text-xs text-slate-500">{stats.count} current {stats.count === 1 ? "family" : "families"}{stats.minPrice ? ` · from BDT ${stats.minPrice.toLocaleString("en-BD")}` : ""}</div></Link>; })}<Link href="/products" className="col-span-3 rounded-xl border border-[#f4b942]/20 bg-[#f4b942]/[0.06] px-4 py-3 text-center text-sm font-bold text-[#f4b942]">Browse the full current catalog</Link></div></div>;
}

function DesktopGuidesMenu() {
  return <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3"><div className="grid grid-cols-2 gap-5 rounded-2xl border border-white/10 bg-[#101633] p-5 shadow-2xl"><div><div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">By audience</div><div className="space-y-1">{AUDIENCE_LINKS.map(([label, href]) => <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">{label}</Link>)}</div></div><div><div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Decision support</div><div className="space-y-1"><Link href="/guides" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">All decision guides</Link><Link href="/blog" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">Editorial guides</Link><Link href="/best-ai-subscription-2026" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">Subscription decision guide</Link><Link href="/how-to-order" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">How to order</Link><Link href="/faq" className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">FAQ</Link></div></div></div></div>;
}

export function Navbar() {
  const [location] = useLocation();
  const [menu, setMenu] = useState<"products" | "guides" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => { setMenu(null); setMobileOpen(false); }, [location]);

  const active = (href: string) => href === "/" ? location === "/" : location === href || location.startsWith(`${href}/`);
  const navClass = (href: string) => `rounded-lg px-3 py-2 text-sm font-semibold transition ${active(href) ? "text-white" : "text-slate-400 hover:text-white"}`;

  return <>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0e27]/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 md:px-8">
        <Link href="/" className="shrink-0"><PrimaryBrandLogo /></Link>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          <div className="relative" onMouseEnter={() => setMenu("products")} onMouseLeave={() => setMenu(null)}><button type="button" onClick={() => setMenu("products")} aria-expanded={menu === "products"} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white">Products <ChevronDown className="h-3.5 w-3.5" /></button>{menu === "products" && <DesktopProductsMenu />}</div>
          <div className="relative" onMouseEnter={() => setMenu("guides")} onMouseLeave={() => setMenu(null)}><button type="button" onClick={() => setMenu("guides")} aria-expanded={menu === "guides"} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white">Guides <ChevronDown className="h-3.5 w-3.5" /></button>{menu === "guides" && <DesktopGuidesMenu />}</div>
          <Link href="/pricing" className={navClass("/pricing")}>Pricing</Link>
          <Link href="/blog" className={navClass("/blog")}>Blog</Link>
          <Link href="/support" className={navClass("/support")}>Support</Link>
        </nav>
        <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search catalog" className="ml-auto rounded-xl border border-white/10 p-2.5 text-slate-300 hover:text-white lg:ml-1"><Search className="h-4 w-4" /></button>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hidden min-h-10 items-center gap-2 rounded-xl bg-[#008236] px-4 py-2 text-sm font-bold text-white sm:inline-flex"><MessageCircle className="h-4 w-4" /> Ask AIPS</a>
        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle menu" className="rounded-xl border border-white/10 p-2.5 text-white lg:hidden">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>

      <AnimatePresence>{mobileOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-[#0a0e27] lg:hidden"><div className="mx-auto max-w-7xl px-4 py-5 md:px-8"><div className="grid gap-2 sm:grid-cols-2">{CATEGORY_DEFS.map(([id, label, href]) => { const stats = familyStats(id); return <Link key={id} href={href} className="rounded-xl border border-white/10 bg-[#151b3d] px-4 py-3"><div className="text-sm font-semibold text-white">{label}</div><div className="mt-1 text-xs text-slate-500">{stats.count} current families{stats.minPrice ? ` · from BDT ${stats.minPrice.toLocaleString("en-BD")}` : ""}</div></Link>; })}</div><div className="mt-4 grid grid-cols-2 gap-2"><Link href="/guides" className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Guides</Link><Link href="/blog" className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Blog</Link><Link href="/pricing" className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Pricing</Link><Link href="/support" className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300">Support</Link></div><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#008236] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Confirm current details</a></div></motion.div>}</AnimatePresence>
    </header>
    <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
  </>;
}
