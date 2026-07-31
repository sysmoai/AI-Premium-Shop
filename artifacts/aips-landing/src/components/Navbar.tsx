import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, MessageCircle, Search,
  ChevronDown, ChevronRight,
  MessageSquare, Image, Code2,
  Video, Music, Layout, Pen, Package,
  GraduationCap, Laptop, Palette, Building, Briefcase,
  Building2,
} from "lucide-react";
import { useLocation } from "wouter";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { TOTAL_PRODUCTS, categoryStats, brandStats, taka, cheapestPriceFor, tierPrice } from "@/lib/catalogStats";
import productsData from "../../data/products.json";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

// Tool counts and "from" prices are derived from the catalog, never written by
// hand — every one of these used to be stale, and four of them advertised a
// price BELOW anything actually purchasable (AI Chat said "from ৳350" when the
// cheapest assistant is ৳499). See src/lib/catalogStats.ts.
const CATEGORIES = [
  { icon: MessageSquare, label: "AI Chat & Assistant", catId: "ai-assistant",   noun: "tool", href: "/products" },
  { icon: Image,         label: "AI Image & Design",   catId: "ai-image",       noun: "tool", href: "/midjourney-bangladesh" },
  { icon: Video,         label: "AI Video",            catId: "ai-video",       noun: "tool", href: "/runway-bangladesh" },
  { icon: Music,         label: "AI Voice & Music",    catId: "ai-voice-music", noun: "tool", href: "/elevenlabs-bangladesh" },
  { icon: Code2,         label: "AI Code & Dev",       catId: "ai-code",        noun: "tool", href: "/github-copilot-bangladesh" },
  { icon: Layout,        label: "AI Workspace",        catId: "ai-workspace",   noun: "tool", href: "/notion-business-bangladesh" },
  { icon: Pen,           label: "AI Writing",          catId: "ai-writing",     noun: "tool", href: "/writesonic-bangladesh" },
  { icon: Palette,       label: "AI Design",           catId: "ai-design",      noun: "tool", href: "/canva-pro-bangladesh" },
  { icon: Package,       label: "Bundle Packs",        catId: "bundles",        noun: "pack", href: "/bundles" },
].map((c) => {
  const s = categoryStats(c.catId);
  const price = s.fromPrice != null ? ` · from ${taka(s.fromPrice)}` : "";
  return { ...c, meta: `${s.productCount} ${c.noun}${s.productCount === 1 ? "" : "s"}${price}` };
});

// `brand` is the catalog's brand field; several of these nav links point at a
// brand hub page that owns no records itself, so prices/plan counts must roll
// up by brand rather than by slug. Hard-coded values here were badly stale —
// Claude showed "from ৳1,590" against a real ৳599 entry tier, GitHub Copilot
// "৳1,495" against ৳399, Cursor "৳2,990" against ৳699.
//
// The "X% OFF" badges below were ALSO stale in a subtler way: `officialPrice`
// looks like it drives a computed discount, but a literal `badge` string
// always wins over `b.badge || computed`, so "83% OFF" and "73% OFF" were
// dead literals that could never update even though the code looked dynamic.
// Google AI Pro showed 83% against a real ৳599 entry (true discount: 80%).
// Both badges below are now genuinely computed — no `badge` field is set on
// the source rows, so there's nothing for a stale literal to hide behind.
const POPULAR_BRANDS = [
  { name: "ChatGPT",         brand: "ChatGPT",    showPlans: true,  href: "/chatgpt-plans-bangladesh" },
  { name: "Claude",          brand: "Claude",     showPlans: true,  href: "/claude-pro-bangladesh" },
  { name: "Midjourney",      brand: "Midjourney", showPlans: true,  href: "/midjourney-bangladesh" },
  { name: "Google AI Pro",   brand: "Google",     showPlans: false, officialPrice: 2990, href: "/gemini-advanced-bangladesh" },
  { name: "GitHub Copilot",  brand: "GitHub",     showPlans: false, href: "/github-copilot-bangladesh" },
  { name: "Cursor",          brand: "Cursor",     showPlans: false, href: "/cursor-bangladesh" },
  { name: "Notion Business", brand: "Notion",     showPlans: false, officialPrice: 2990, href: "/notion-business-bangladesh" },
  { name: "Perplexity",      brand: "Perplexity", showPlans: false, href: "/perplexity-pro-bangladesh" },
].map((b) => {
  const s = brandStats(b.brand);
  const off = "officialPrice" in b && b.officialPrice && s.fromPrice != null
    ? `${Math.round((1 - s.fromPrice / (b.officialPrice as number)) * 100)}% OFF`
    : "";
  return {
    ...b,
    price: s.fromPrice != null ? `from ${taka(s.fromPrice)}` : "price on WhatsApp",
    badge: off || (b.showPlans && s.plans > 1 ? `${s.plans} plans` : ""),
    badgeGreen: !!off,
  };
});

const SOLUTIONS = [
  { icon: GraduationCap, label: "Students",    href: "/best-ai-for-students" },
  { icon: Laptop,        label: "Freelancers", href: "/best-ai-for-freelancers" },
  { icon: Palette,       label: "Creators",    href: "/best-ai-for-creators" },
  { icon: Building,      label: "Business",    href: "/best-ai-for-business" },
  { icon: Code2,         label: "Developers",  href: "/best-ai-for-developers" },
  { icon: Briefcase,     label: "Job Seekers", href: "/best-ai-for-job-seekers" },
];

// Bundle prices come from the catalog; only the copy is written here.
//
// The Freelancer badge read "Save ৳540" while the product's own description
// said ৳789. Computed from the tiers it actually contains — ChatGPT Personal
// ৳2,990 + Midjourney ৳1,199 + Perplexity ৳599 = ৳4,788 against a ৳3,999
// bundle — the saving is ৳789, so the navbar was understating it by ৳249 and
// disagreeing with the product page.
//
// The Business Package badge previously read "Save ৳3,570". That figure could
// not be reconciled with anything: the five tools it names come to ৳3,896 at
// their cheapest tiers, so a ৳3,570 saving would imply ৳18,570 of contents
// against a ৳15,000 price. It is removed rather than replaced with a guess —
// this catalog already carries 127 unverified-claim flags and an unsourced
// savings number is exactly that. Restore it with a computed basis.
const BUNDLES_LEFT = [
  { icon: GraduationCap, iconCls: "text-blue-400",   name: "Student Essentials", price: "৳449",    sub: "ChatGPT + Study Guide",                  badge: "" },
  { icon: GraduationCap, iconCls: "text-purple-400", name: "University Pro",     price: "৳899",    sub: "ChatGPT + Perplexity + Coaching",         badge: "" },
  { icon: Laptop,        iconCls: "text-green-400",  name: "Freelancer",         price: "৳3,999",  sub: "ChatGPT + Midjourney + Perplexity",       badge: `Save ${taka((tierPrice("chatgpt-plus-bangladesh", "Personal") ?? 0) + (cheapestPriceFor("midjourney-bangladesh") ?? 0) + (cheapestPriceFor("perplexity-pro-bangladesh") ?? 0) - 3999)}` },
];

const BUNDLES_RIGHT = [
  { icon: Building,  iconCls: "text-amber-400", name: "Business Package",   price: "৳15,000", sub: "6 AI tools + 2hr Expert Setup",              badge: "" },
  { icon: Building2, iconCls: "text-red-400",   name: "B2B Implementation", price: "৳25,000", sub: "Full stack + 5hr Training + 30-day Support", badge: "" },
];

function useActiveLink(location: string) {
  if (location === "/bundles") return "bundles";
  if (location === "/pricing") return "pricing";
  if (location === "/guides" || location.endsWith("-bn") || location === "/bn") return "guides";
  if (location === "/support") return "support";
  if (location === "/blog" || location.startsWith("/blog/")) return "blog";
  if (
    location.includes("-bangladesh") ||
    location.startsWith("/products") ||
    location.startsWith("/ai-assistant") ||
    location.startsWith("/ai-image") ||
    location.startsWith("/ai-video") ||
    location.startsWith("/ai-voice") ||
    location.startsWith("/ai-code") ||
    location.startsWith("/ai-workspace") ||
    location.startsWith("/ai-writing") ||
    location.startsWith("/best-ai")
  ) return "products";
  return null;
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = query.trim().length > 1
    ? productsData.products
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          (p.category ?? "").toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[60] flex flex-col items-center pt-24 px-4"
      style={{ backgroundColor: "rgba(10,14,39,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#c9ceda" }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search AI tools (ChatGPT, Midjourney, Cursor…)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-white/20 text-white placeholder-white/40 bg-transparent text-base outline-none focus:border-[#f4b942]/60"
            style={{ backgroundColor: "#151b3d" }}
          />
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#c9ceda" }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
            {results.map((p, i) => {
              const waUrl = `https://wa.me/8801865385348?text=${encodeURIComponent(`Hi, I want to order ${p.name}`)}`;
              return (
                <div key={i} className={`flex items-center gap-4 px-5 py-3.5 ${i > 0 ? "border-t border-white/6" : ""} hover:bg-white/4 transition-colors`}>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm truncate">{p.name}</div>
                    <div className="text-xs" style={{ color: "#c9ceda" }}>{p.brand}</div>
                  </div>
                  <div className="text-sm font-bold flex-shrink-0" style={{ color: "#f4b942" }}>{p.price != null ? `BDT ${p.price.toLocaleString()}` : "Price on WhatsApp"}</div>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={onClose}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
                    style={{ backgroundColor: "#25d366", color: "#fff" }}>
                    <MessageCircle className="w-3.5 h-3.5" />
                    Order
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {query.trim().length > 1 && results.length === 0 && (
          <div className="text-center py-8 text-sm" style={{ color: "#c9ceda" }}>
            No results for &ldquo;{query}&rdquo;. <a href="/products" onClick={(e) => { e.preventDefault(); navigate("/products"); onClose(); }} className="underline" style={{ color: "#f4b942" }}>Browse all products</a>
          </div>
        )}

        {query.trim().length <= 1 && (
          <div className="text-center py-6 text-sm" style={{ color: "#c9ceda" }}>
            Type to search {TOTAL_PRODUCTS} premium AI tools
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface NavbarProps {
  alwaysSolid?: boolean;
}

export function Navbar({ alwaysSolid = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"products" | "bundles" | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [location, navigate] = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeLink = useActiveLink(location);

  useEffect(() => {
    if (alwaysSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenMenu(null); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDropdown = (name: "products" | "bundles") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const go = (href: string) => {
    navigate(href);
    setOpenMenu(null);
    setMenuOpen(false);
  };

  const navBtn = (key: "products" | "bundles", label: string) => {
    const active = activeLink === key;
    const isOpen = openMenu === key;
    return (
      <button
        className={`flex items-center gap-1 text-sm font-medium transition-colors pb-px ${
          active ? "text-[#f4b942] border-b-2 border-[#f4b942]" : isOpen ? "text-[#f4b942]" : "text-[#c9ceda] hover:text-[#f4b942]"
        }`}
        onMouseEnter={() => openDropdown(key)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }} className="inline-flex">
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>
    );
  };

  const navLink = (href: string, label: string, key: string) => {
    const active = activeLink === key;
    return (
      <a key={label} href={href}
        onClick={(e) => { e.preventDefault(); go(href); }}
        className={`text-sm font-medium transition-colors pb-px ${
          active ? "text-[#f4b942] border-b-2 border-[#f4b942]" : "text-[#c9ceda] hover:text-[#f4b942]"
        }`}
        onMouseEnter={() => { if (openMenu) closeDropdown(); }}
      >
        {label}
      </a>
    );
  };

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-gray-800/50 ${scrolled ? "py-3" : "py-4"}`}
        style={scrolled
          ? { backgroundColor: "rgba(10,14,39,0.97)", backdropFilter: "blur(14px)" }
          : { backgroundColor: "#0a0e27" }}
        onMouseLeave={closeDropdown}
      >
        {/* ── Main bar ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
          {/* No aria-label here: the visible "AI PREMIUM SHOP" wordmark inside
              (decorative=true hides only the redundant icon image) is left as
              the link's one accessible-name source, so visible text and
              accessible name can't disagree. An aria-label here previously
              conflicted with that same visible text (axe:
              label-content-name-mismatch) even with aria-hidden on the text,
              since aria-hidden removes it from the a11y tree but not from
              the rendered page that axe compares the label against. */}
          <a href="/" onClick={(e) => { e.preventDefault(); go("/"); }} className="flex-shrink-0">
            <PrimaryBrandLogo size="medium" layout="horizontal" decorative />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navBtn("products", "Products")}
            {navBtn("bundles", "Bundles")}
            {navLink("/pricing", "Pricing", "pricing")}
            {navLink("/guides", "Guides", "guides")}
            {navLink("/support", "Support", "support")}
            {navLink("/blog", "Blog", "blog")}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search products" style={{ color: "#c9ceda" }}>
              <Search className="w-[18px] h-[18px]" />
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              data-testid="navbar-cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#ec4899,#f97316)", color: "#fff" }}>
              <MessageCircle className="w-4 h-4" />
              Order Now
            </a>
          </div>

          {/* Mobile right */}
          <div className="lg:hidden flex items-center gap-1 -mr-1">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search" style={{ color: "#c9ceda" }} onClick={() => setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg" aria-label="WhatsApp" style={{ color: "#25d366" }}>
              <MessageCircle className="w-5 h-5" />
            </a>
            <button className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Products Mega Menu ── */}
        <AnimatePresence>
          {openMenu === "products" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="hidden lg:block absolute left-0 right-0 top-full border-b border-gray-800 shadow-2xl"
              style={{ backgroundColor: "#0a0e27" }}
              onMouseEnter={() => openDropdown("products")}
            >
              <div className="max-w-5xl mx-auto px-6 py-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Browse by Category</h4>
                    <div className="space-y-0.5">
                      {CATEGORIES.map((cat) => (
                        <a key={cat.label} href={cat.href}
                          onClick={(e) => { e.preventDefault(); go(cat.href); }}
                          className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-800/50 transition-colors group">
                          <cat.icon className="w-4 h-4 text-gray-500 flex-shrink-0 group-hover:text-gray-300 transition-colors" />
                          <span className="text-white text-sm font-medium flex-1 leading-tight">{cat.label}</span>
                          <span className="text-gray-500 text-xs flex-shrink-0">{cat.meta}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Popular Brands</h4>
                    <div className="space-y-0.5">
                      {POPULAR_BRANDS.map((brand) => (
                        <a key={brand.name} href={brand.href}
                          onClick={(e) => { e.preventDefault(); go(brand.href); }}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800/50 transition-colors">
                          <span className="text-white text-sm font-medium flex-1">{brand.name}</span>
                          <span className="text-gray-400 text-xs flex-shrink-0">{brand.price}</span>
                          {brand.badge && (
                            <span className={`text-xs font-semibold flex-shrink-0 ${brand.badgeGreen ? "text-green-400" : "text-[#f4b942]"}`}>
                              {brand.badge}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Find Your Solution</h4>
                    <div className="space-y-0.5">
                      {SOLUTIONS.map((sol) => (
                        <a key={sol.label} href={sol.href}
                          onClick={(e) => { e.preventDefault(); go(sol.href); }}
                          className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-800/50 transition-colors group">
                          <sol.icon className="w-4 h-4 text-gray-500 flex-shrink-0 group-hover:text-gray-300 transition-colors" />
                          <span className="text-white text-sm font-medium">{sol.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-800 pt-4 mt-4"
                  style={{ background: "linear-gradient(to right, rgba(244,185,66,0.06), transparent)" }}>
                  <span className="text-gray-400 text-sm">{TOTAL_PRODUCTS} Premium AI Tools · bKash/Nagad · 5-30 min delivery</span>
                  <a href="/pricing" onClick={(e) => { e.preventDefault(); go("/pricing"); }}
                    className="text-sm font-medium hover:underline flex items-center gap-1"
                    style={{ color: "#f4b942" }}>
                    View All Products <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bundles Dropdown ── */}
        <AnimatePresence>
          {openMenu === "bundles" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="hidden lg:block absolute left-0 right-0 top-full border-b border-gray-800 shadow-2xl"
              style={{ backgroundColor: "#0a0e27" }}
              onMouseEnter={() => openDropdown("bundles")}
            >
              <div className="max-w-2xl mx-auto px-6 py-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Individual</h4>
                    <div className="space-y-2">
                      {BUNDLES_LEFT.map((b) => (
                        <a key={b.name} href="/bundles"
                          onClick={(e) => { e.preventDefault(); go("/bundles"); }}
                          className="flex items-start gap-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 transition-colors">
                          <b.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${b.iconCls}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-white text-sm font-medium">{b.name}</span>
                              {b.badge && (
                                <span className="text-green-400 text-xs font-semibold">{b.badge}</span>
                              )}
                              <span className="text-[#f4b942] text-sm font-bold ml-auto">{b.price}</span>
                            </div>
                            <p className="text-gray-400 text-xs mt-0.5">{b.sub}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">Business</h4>
                    <div className="space-y-2">
                      {BUNDLES_RIGHT.map((b) => (
                        <a key={b.name} href="/bundles"
                          onClick={(e) => { e.preventDefault(); go("/bundles"); }}
                          className="flex items-start gap-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 transition-colors">
                          <b.icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${b.iconCls}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-white text-sm font-medium">{b.name}</span>
                              {b.badge && (
                                <span className="text-green-400 text-xs font-semibold">{b.badge}</span>
                              )}
                              <span className="text-[#f4b942] text-sm font-bold ml-auto">{b.price}</span>
                            </div>
                            <p className="text-gray-400 text-xs mt-0.5">{b.sub}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-800 pt-3 mt-3">
                  <span className="text-gray-400 text-xs">Custom bundle? Tell us</span>
                  <a href="/bundles" onClick={(e) => { e.preventDefault(); go("/bundles"); }}
                    className="text-sm font-medium hover:underline" style={{ color: "#f4b942" }}>
                    View All Bundles →
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
              style={{ backgroundColor: "rgba(10,14,39,0.98)" }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold mb-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#25d366", color: "#fff", minHeight: "44px" }}
                  onClick={() => setMenuOpen(false)}>
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>

                {[
                  { key: "categories", label: "Categories",     items: CATEGORIES.map((c) => ({ label: c.label, href: c.href, meta: c.meta })) },
                  { key: "brands",     label: "Popular Brands", items: POPULAR_BRANDS.map((b) => ({ label: b.name, href: b.href, meta: b.price })) },
                  { key: "solutions",  label: "Best AI For",    items: SOLUTIONS.map((s) => ({ label: s.label, href: s.href, meta: "" })) },
                  {
                    key: "bundles", label: "Bundles",
                    items: [
                      ...BUNDLES_LEFT.map((b) => ({ label: b.name, href: "/bundles", meta: b.price })),
                      ...BUNDLES_RIGHT.map((b) => ({ label: b.name, href: "/bundles", meta: b.price })),
                    ],
                  },
                ].map((section) => (
                  <div key={section.key} className="rounded-lg my-0.5" style={{ backgroundColor: "#111827" }}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-white"
                      onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
                    >
                      {section.label}
                      <motion.span animate={{ rotate: openSection === section.key ? 180 : 0 }} transition={{ duration: 0.18 }} className="inline-flex">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openSection === section.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3 space-y-0.5">
                            {section.items.map((item) => (
                              <a key={item.label} href={item.href}
                                onClick={(e) => { e.preventDefault(); go(item.href); }}
                                className="flex items-center justify-between py-2 text-sm hover:text-white transition-colors"
                                style={{ color: "#c9ceda" }}>
                                <span>{item.label}</span>
                                {item.meta && <span className="text-xs" style={{ color: "#f4b942" }}>{item.meta}</span>}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="h-px my-1" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                {[
                  { label: "Pricing",       href: "/pricing" },
                  { label: "Guides",        href: "/guides" },
                  { label: "বাংলা",          href: "/bn" },
                  { label: "Support",       href: "/support" },
                  { label: "Blog",          href: "/blog" },
                  { label: "How to Order",  href: "/how-to-order" },
                ].map((l) => (
                  <a key={l.label} href={l.href}
                    onClick={(e) => { e.preventDefault(); go(l.href); }}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors ${activeLink === l.label.toLowerCase() ? "text-[#f4b942]" : ""}`}
                    style={{ color: activeLink === l.label.toLowerCase() ? "#f4b942" : "#c9ceda" }}>
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
