import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, MessageCircle, Search,
  ChevronDown, ChevronRight,
  MessageSquare, Image, Code2, Zap,
} from "lucide-react";
import { useLocation } from "wouter";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import productsData from "../../data/products.json";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const MEGA_COLUMNS = [
  {
    heading: "AI Assistant & Chat",
    color: "#f4b942",
    href: "/ai-assistant",
    Icon: MessageSquare,
    brands: [
      { name: "ChatGPT", price: "from BDT 350", href: "/chatgpt-plans-bangladesh" },
      { name: "Claude", price: "from BDT 1,495", href: "/claude-pro-bangladesh" },
      { name: "Google AI Pro", price: "BDT 500", href: "/gemini-advanced-bangladesh" },
      { name: "Grok / SuperGrok", price: "from BDT 1,495", href: "/supergrok-bangladesh" },
      { name: "Perplexity Pro", price: "from BDT 350", href: "/perplexity-pro-bangladesh" },
    ],
  },
  {
    heading: "AI Creative Studio",
    color: "#ec4899",
    href: "/ai-image",
    Icon: Image,
    brands: [
      { name: "Midjourney", price: "from BDT 1,199", href: "/midjourney-bangladesh" },
      { name: "Ideogram", price: "from BDT 2,990", href: "/ideogram-bangladesh" },
      { name: "Runway", price: "from BDT 1,794", href: "/runway-bangladesh" },
      { name: "HeyGen", price: "from BDT 1,499", href: "/heygen-bangladesh" },
      { name: "ElevenLabs", price: "from BDT 748", href: "/elevenlabs-bangladesh" },
      { name: "Suno AI", price: "from BDT 1,495", href: "/suno-ai-bangladesh" },
    ],
  },
  {
    heading: "AI Professional",
    color: "#06b6d4",
    href: "/ai-code",
    Icon: Code2,
    brands: [
      { name: "GitHub Copilot", price: "BDT 1,495", href: "/github-copilot-bangladesh" },
      { name: "Cursor Pro", price: "from BDT 2,990", href: "/cursor-bangladesh" },
      { name: "Notion Business", price: "BDT 800", href: "/notion-business-bangladesh" },
      { name: "Replit Core", price: "BDT 500", href: "/replit-bangladesh" },
      { name: "v0.dev Pro", price: "BDT 999", href: "/v0-dev-bangladesh" },
      { name: "Manus AI", price: "BDT 2,500", href: "/manus-ai-bangladesh" },
    ],
  },
  {
    heading: "Quick Links",
    color: "#f4b942",
    href: "/products",
    Icon: Zap,
    brands: [
      { name: "All 56 Products", price: "", href: "/products" },
      { name: "Bundles from BDT 449", price: "", href: "/bundles" },
      { name: "Pricing", price: "", href: "/pricing" },
      { name: "Best AI for Students", price: "", href: "/best-ai-for-students" },
      { name: "Best AI for Freelancers", price: "", href: "/best-ai-for-freelancers" },
      { name: "Best AI for Business", price: "", href: "/best-ai-for-business" },
    ],
  },
];

const MAIN_NAV = [
  { label: "Bundles", href: "/bundles" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
];

function ProductsMegaMenu() {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className="flex items-center gap-1 text-sm font-medium transition-colors"
        style={{ color: open ? "#f4b942" : "#c9ceda" }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Products
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[780px] rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
            style={{ backgroundColor: "#151b3d" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="grid grid-cols-4 gap-0">
              {MEGA_COLUMNS.map((col, ci) => (
                <div key={col.heading} className={`p-5 ${ci < 3 ? "border-r border-white/8" : ""}`}>
                  <a
                    href={col.href}
                    onClick={(e) => { e.preventDefault(); navigate(col.href); setOpen(false); }}
                    className="flex items-center gap-2 mb-4 group"
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: col.color + "20" }}>
                      <col.Icon className="w-3.5 h-3.5" style={{ color: col.color }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider group-hover:opacity-80 transition-opacity"
                      style={{ color: col.color }}>
                      {col.heading}
                    </span>
                  </a>
                  <div className="space-y-0.5">
                    {col.brands.map((brand) => (
                      <a
                        key={brand.name}
                        href={brand.href}
                        onClick={(e) => { e.preventDefault(); navigate(brand.href); setOpen(false); }}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/6 transition-colors group/item"
                      >
                        <span className="text-sm font-medium text-white group-hover/item:text-white truncate">{brand.name}</span>
                        {brand.price && (
                          <span className="text-xs ml-2 flex-shrink-0" style={{ color: "#f4b942" }}>{brand.price}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/8 px-5 py-3 flex items-center justify-between"
              style={{ backgroundColor: "rgba(244,185,66,0.04)" }}>
              <span className="text-xs" style={{ color: "#c9ceda" }}>56 premium AI tools · Pay with bKash or Nagad · Delivery in 5–30 min</span>
              <a href="/products" onClick={(e) => { e.preventDefault(); navigate("/products"); setOpen(false); }}
                className="flex items-center gap-1 text-xs font-semibold hover:opacity-80 transition-opacity"
                style={{ color: "#f4b942" }}>
                See all products <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (alwaysSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  const navLink = (href: string, label: string) => (
    <a
      key={label}
      href={href}
      onClick={(e) => { e.preventDefault(); navigate(href); setMenuOpen(false); }}
      className="text-sm font-medium transition-colors"
      style={{ color: "#c9ceda" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#f4b942")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#c9ceda")}
    >
      {label}
    </a>
  );

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 py-3" : "py-4"}`}
        style={scrolled ? { backgroundColor: "rgba(10,14,39,0.95)", backdropFilter: "blur(14px)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} aria-label="AI Premium Shop" className="flex-shrink-0">
            <PrimaryBrandLogo size="medium" layout="horizontal" />
          </a>

          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <ProductsMegaMenu />
            {MAIN_NAV.map((l) => navLink(l.href, l.label))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Search products"
              style={{ color: "#c9ceda" }}
            >
              <Search className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #ec4899, #f97316)", color: "#fff" }}
            >
              <MessageCircle className="w-4 h-4" />
              Order Now
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-1 -mr-1">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Search"
              style={{ color: "#c9ceda" }} onClick={() => setSearchOpen(true)}>
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
              <div className="px-5 py-5 flex flex-col gap-1">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold mb-3 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#25d366", color: "#fff", minHeight: "44px" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>

                {MEGA_COLUMNS.map((col) => (
                  <div key={col.heading}>
                    <button
                      className="flex items-center justify-between w-full px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => setOpenCategory(openCategory === col.heading ? null : col.heading)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: col.color + "20" }}>
                          <col.Icon className="w-3.5 h-3.5" style={{ color: col.color }} />
                        </div>
                        <span className="text-sm font-semibold text-white">{col.heading}</span>
                      </div>
                      <motion.div animate={{ rotate: openCategory === col.heading ? 180 : 0 }} transition={{ duration: 0.18 }}>
                        <ChevronDown className="w-4 h-4" style={{ color: "#c9ceda" }} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openCategory === col.heading && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-8 mb-1 space-y-0.5">
                            {col.brands.map((brand) => (
                              <a
                                key={brand.name}
                                href={brand.href}
                                onClick={(e) => { e.preventDefault(); navigate(brand.href); setMenuOpen(false); }}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <span className="text-sm text-white">{brand.name}</span>
                                {brand.price && (
                                  <span className="text-xs ml-2" style={{ color: "#f4b942" }}>{brand.price}</span>
                                )}
                              </a>
                            ))}
                            <a
                              href={col.href}
                              onClick={(e) => { e.preventDefault(); navigate(col.href); setMenuOpen(false); }}
                              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold hover:opacity-80 transition-opacity"
                              style={{ color: col.color }}
                            >
                              View all → <ChevronRight className="w-3 h-3" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="h-px my-2" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                {MAIN_NAV.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); navigate(l.href); setMenuOpen(false); }}
                    className="px-2 py-2.5 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
                    style={{ color: "#c9ceda" }}
                  >
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
