import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, MessageCircle, Search,
  ChevronDown, ChevronRight,
  MessageSquare, Image, Video, Music, Code2, Layout, Package,
} from "lucide-react";
import { useLocation } from "wouter";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const PRODUCT_CATEGORIES = [
  { label: "AI Assistant & Chat", count: 11, Icon: MessageSquare, color: "#10a37f", href: "/ai-assistant" },
  { label: "AI Image & Design", count: 8, Icon: Image, color: "#ec4899", href: "/ai-image" },
  { label: "AI Video", count: 2, Icon: Video, color: "#8b5cf6", href: "/ai-video" },
  { label: "AI Voice & Music", count: 3, Icon: Music, color: "#f97316", href: "/ai-voice-music" },
  { label: "AI Code & Dev Tools", count: 5, Icon: Code2, color: "#06b6d4", href: "/ai-code" },
  { label: "AI Workspace", count: 2, Icon: Layout, color: "#f4b942", href: "/ai-workspace" },
  { label: "Bundles & Packages", count: 0, Icon: Package, color: "#e11d48", href: "/bundles" },
];

const MAIN_NAV = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

function ProductsDropdown() {
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 130);
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
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
            style={{ backgroundColor: "#151b3d" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="p-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  onClick={(e) => { e.preventDefault(); navigate(cat.href); setOpen(false); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: cat.color + "20" }}
                  >
                    <cat.Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <span className="flex-1 text-sm font-medium text-white truncate">{cat.label}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#c9ceda" }}
                  >
                    {cat.count}
                  </span>
                </a>
              ))}
              <div className="h-px mx-3 my-2" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
              <a
                href="/products"
                onClick={(e) => { e.preventDefault(); navigate("/products"); setOpen(false); }}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <span className="text-sm font-semibold" style={{ color: "#f4b942" }}>All Products</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: "#f4b942" }} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NavbarProps {
  alwaysSolid?: boolean;
}

export function Navbar({ alwaysSolid = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [menuOpen, setMenuOpen] = useState(false);
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
          <ProductsDropdown />
          {MAIN_NAV.map((l) => navLink(l.href, l.label))}
        </nav>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="navbar-cta"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
          style={{ backgroundColor: "#25d366", color: "#fff" }}
        >
          <MessageCircle className="w-4 h-4" />
          Order Now
        </a>

        <div className="lg:hidden flex items-center gap-1 -mr-1">
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Search" style={{ color: "#c9ceda" }}>
            <Search className="w-5 h-5" />
          </button>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg" aria-label="WhatsApp" style={{ color: "#25d366" }}>
            <MessageCircle className="w-5 h-5" />
          </a>
          <button className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
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
              <div className="text-xs font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: "#f4b942" }}>Products</div>
              {PRODUCT_CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  onClick={(e) => { e.preventDefault(); navigate(cat.href); setMenuOpen(false); }}
                  className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cat.color + "20" }}>
                    <cat.Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                  </div>
                  <span className="text-sm font-medium text-white flex-1">{cat.label}</span>
                  <span className="text-xs" style={{ color: "#c9ceda" }}>{cat.count}</span>
                </a>
              ))}
              <div className="h-px my-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
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
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-5 py-3 rounded-xl text-sm font-semibold text-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#25d366", color: "#fff" }}
                onClick={() => setMenuOpen(false)}
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
