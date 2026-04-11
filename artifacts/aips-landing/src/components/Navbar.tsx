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
import productsData from "../../data/products.json";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const CATEGORIES = [
  { icon: MessageSquare, label: "AI Chat & Assistant", meta: "21 tools · from ৳350",  href: "/products" },
  { icon: Image,         label: "AI Image & Design",   meta: "9 tools · from ৳599",   href: "/midjourney-bangladesh" },
  { icon: Video,         label: "AI Video",             meta: "4 tools · from ৳1,499", href: "/runway-bangladesh" },
  { icon: Music,         label: "AI Voice & Music",     meta: "6 tools · from ৳499",   href: "/elevenlabs-bangladesh" },
  { icon: Code2,         label: "AI Code & Dev",        meta: "6 tools · from ৳500",   href: "/github-copilot-bangladesh" },
  { icon: Layout,        label: "AI Workspace",         meta: "5 tools · from ৳399",   href: "/notion-business-bangladesh" },
  { icon: Pen,           label: "AI Writing",           meta: "1 tool · ৳799",         href: "/writesonic-bangladesh" },
  { icon: Package,       label: "Bundle Packs",         meta: "5 packs · from ৳449",   href: "/bundles" },
];

const POPULAR_BRANDS = [
  { name: "ChatGPT",         price: "from ৳350",   badge: "9 plans",    badgeGreen: false, href: "/chatgpt-plans-bangladesh" },
  { name: "Claude",          price: "from ৳1,495", badge: "5 plans",    badgeGreen: false, href: "/claude-pro-bangladesh" },
  { name: "Midjourney",      price: "from ৳1,199", badge: "6 plans",    badgeGreen: false, href: "/midjourney-bangladesh" },
  { name: "Google AI Pro",   price: "from ৳500",   badge: "83% OFF",    badgeGreen: true,  href: "/gemini-advanced-bangladesh" },
  { name: "GitHub Copilot",  price: "from ৳1,495", badge: "",           badgeGreen: false, href: "/github-copilot-bangladesh" },
  { name: "Cursor",          price: "from ৳2,990", badge: "",           badgeGreen: false, href: "/cursor-bangladesh" },
  { name: "Notion Business", price: "from ৳800",   badge: "73% OFF",    badgeGreen: true,  href: "/notion-business-bangladesh" },
  { name: "Perplexity",      price: "from ৳350",   badge: "",           badgeGreen: false, href: "/perplexity-pro-bangladesh" },
];

const SOLUTIONS = [
  { icon: GraduationCap, label: "Students",    href: "/best-ai-for-students" },
  { icon: Laptop,        label: "Freelancers", href: "/best-ai-for-freelancers" },
  { icon: Palette,       label: "Creators",    href: "/best-ai-for-creators" },
  { icon: Building,      label: "Business",    href: "/best-ai-for-business" },
  { icon: Code2,         label: "Developers",  href: "/best-ai-for-developers" },
  { icon: Briefcase,     label: "Job Seekers", href: "/best-ai-for-job-seekers" },
];

const BUNDLES_LEFT = [
  { icon: GraduationCap, iconCls: "text-blue-400",   name: "Student Essentials", price: "৳449",    sub: "ChatGPT + Study Guide",                  badge: "" },
  { icon: GraduationCap, iconCls: "text-purple-400", name: "University Pro",     price: "৳899",    sub: "ChatGPT + Perplexity + Coaching",         badge: "" },
  { icon: Laptop,        iconCls: "text-green-400",  name: "Freelancer",         price: "৳3,999",  sub: "ChatGPT + Midjourney + Perplexity",       badge: "Save ৳540" },
];

const BUNDLES_RIGHT = [
  { icon: Building,  iconCls: "text-amber-400", name: "Business Package",   price: "৳15,000", sub: "6 AI tools + 2hr Expert Setup",              badge: "Save ৳3,570" },
  { icon: Building2, iconCls: "text-red-400",   name: "B2B Implementation", price: "৳25,000", sub: "Full stack + 5hr Training + 30-day Support", badge: "" },
];

function useActiveLink(location: string) {
  if (location === "/bundles") return "bundles";
  if (location === "/pricing") return "pricing";
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
                  <div className="text-sm font-bold flex-shrink-0" style={{ color: "#f4b942" }}>BDT {p.price.toLocaleString()}</div>
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
            Type to search 56 premium AI tools
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
          <a href="/" onClick={(e) => { e.preventDefault(); go("/"); }} aria-label="AI Premium Shop" className="flex-shrink-0">
            <PrimaryBrandLogo size="medium" layout="horizontal" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navBtn("products", "Products")}
            {navBtn("bundles", "Bundles")}
            {navLink("/pricing", "Pricing", "pricing")}
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
                  <span className="text-gray-400 text-sm">56 Premium AI Tools · bKash/Nagad · 5-30 min delivery</span>
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
