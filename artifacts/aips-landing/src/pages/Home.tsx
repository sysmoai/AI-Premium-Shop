import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MessageCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Image,
  Video,
  Music,
  Code2,
  Layout,
  ChevronRight,
} from "lucide-react";

import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { FAQSection } from "@/components/FAQSection";

import { HeroSection } from "@/sections/HeroSection";
import { PainPointSection } from "@/sections/PainPointSection";
import { AIAgentsSection } from "@/sections/AIAgentsSection";
import { OffersSection } from "@/sections/OffersSection";
import { CategorySection } from "@/sections/CategorySection";
import { WhyUsSection } from "@/sections/WhyUsSection";
import { HowItWorksSection } from "@/sections/HowItWorksSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { FinalCTASection } from "@/sections/FinalCTASection";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const PRODUCT_CATEGORIES = [
  { label: "AI Assistant & Chat", count: 21, Icon: MessageSquare, color: "#10a37f" },
  { label: "AI Image & Design", count: 8, Icon: Image, color: "#ec4899" },
  { label: "AI Video", count: 3, Icon: Video, color: "#8b5cf6" },
  { label: "AI Voice & Music", count: 5, Icon: Music, color: "#f97316" },
  { label: "AI Code & Dev Tools", count: 4, Icon: Code2, color: "#06b6d4" },
  { label: "AI Workspace", count: 3, Icon: Layout, color: "#f4b942" },
];

const SECONDARY_NAV = [
  { label: "Bundles", href: "#" }, // Phase 2
  { label: "Pricing", href: "#" }, // Phase 2
  { label: "Support", href: "#" }, // Phase 2
];

const MOBILE_DRAWER_LINKS = [
  { label: "Products", href: "#categories" },
  { label: "Solutions", href: "#pain-points" },
  { label: "Best Sellers", href: "#offers" },
  { label: "Why Us", href: "#why-us" },
  { label: "Bundles", href: "#" }, // Phase 2
  { label: "Pricing", href: "#" }, // Phase 2
  { label: "Support", href: "#" }, // Phase 2
  { label: "FAQ", href: "#faq" },
];

const FAQS = [
  {
    question: "Is a shared account safe to use?",
    answer:
      "Yes. You get full access to premium features. However, 2–7 people share the same subscription. For full privacy, we recommend a personal account.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Shared accounts: 5–30 minutes. Personal accounts: 2–4 hours. The clock starts after payment is confirmed on WhatsApp.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "bKash, Nagad, Rocket, Bank Transfer, and Binance (crypto). No international credit card needed.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Refunds are available within 15 minutes of delivery if there's a service mismatch. Tool and subscription fees are non-refundable.",
  },
  {
    question: "Is this official and legal?",
    answer:
      "Yes. We provide official, verified subscriptions. No hacked or unauthorized access.",
  },
  {
    question: "I'm new to AI. Where should I start?",
    answer:
      "Students: ChatGPT Plus Shared at BDT 350 or Google AI Pro at BDT 500. Freelancers: ChatGPT Premium Shared at BDT 950. Business: ChatGPT Business at BDT 699.",
  },
  {
    question: "What's the difference between Shared and Personal?",
    answer:
      "Shared: Lower price, 2–7 users share the account. Personal: Your own account, full privacy, all features, premium experience.",
  },
  {
    question: "What can AI actually do?",
    answer:
      "Write content, generate code, conduct research, create images, produce videos, clone voices, compose music, automate tasks — almost anything. Each AI tool specialises in different areas.",
  },
];

function ProductsDropdown() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
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
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50"
            style={{ backgroundColor: "#151b3d" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="p-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href="#categories"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl group transition-colors hover:bg-white/5"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: cat.color + "20" }}
                  >
                    <cat.Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{cat.label}</div>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#c9ceda" }}
                  >
                    {cat.count}
                  </span>
                </a>
              ))}

              {/* Divider */}
              <div className="h-px mx-3 my-2" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <span className="text-sm font-semibold" style={{ color: "#f4b942" }}>
                  All 49 Products
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: "#f4b942" }} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>

      {/* ── STICKY NAVBAR ── */}
      <header
        data-testid="navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-white/10 py-3" : "bg-transparent py-4"
        }`}
        style={scrolled ? { backgroundColor: "rgba(10,14,39,0.95)", backdropFilter: "blur(14px)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="/" aria-label="AI Premium Shop" className="flex-shrink-0">
            <PrimaryBrandLogo size="medium" layout="horizontal" />
          </a>

          {/* Desktop nav: Products dropdown + secondary links */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <ProductsDropdown />
            {SECONDARY_NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "#c9ceda" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f4b942")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#c9ceda")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA — GREEN Order Now */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-cta"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 flex-shrink-0"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            <MessageCircle className="w-4 h-4" />
            Order Now
          </a>

          {/* Mobile right icons: Search + WhatsApp + Hamburger */}
          <div className="lg:hidden flex items-center gap-2 -mr-1">
            <button
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              aria-label="Search"
              style={{ color: "#c9ceda" }}
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              aria-label="WhatsApp"
              style={{ color: "#25d366" }}
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
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
                {/* Product categories in mobile */}
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-2 px-2"
                  style={{ color: "#f4b942" }}
                >
                  Products
                </div>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <a
                    key={cat.label}
                    href="#categories"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: cat.color + "20" }}
                    >
                      <cat.Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                    </div>
                    <span className="text-sm font-medium text-white">{cat.label}</span>
                    <span className="ml-auto text-xs" style={{ color: "#c9ceda" }}>{cat.count}</span>
                  </a>
                ))}

                <div className="h-px my-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                {/* Secondary links */}
                {MOBILE_DRAWER_LINKS.filter(l => ["Bundles", "Pricing", "Support", "FAQ"].includes(l.label)).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-2 py-2.5 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
                    style={{ color: "#c9ceda" }}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-5 py-3 rounded-xl text-sm font-semibold text-center transition-opacity hover:opacity-90"
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

      <main>
        {/* 1. HERO */}
        <HeroSection ref={heroRef} />

        {/* 2. FIND YOUR SOLUTION — 6 pain-point cards */}
        <PainPointSection />

        {/* 3. AI AGENTS — The 2026 Game Changer */}
        <AIAgentsSection />

        {/* 4. SPECIAL OFFERS + BEST SELLERS */}
        <OffersSection />

        {/* 5. BROWSE BY CATEGORY */}
        <CategorySection />

        {/* 6. WHY AI PREMIUM SHOP */}
        <WhyUsSection />

        {/* 7. HOW IT WORKS */}
        <HowItWorksSection />

        {/* 8. TESTIMONIALS */}
        <TestimonialsSection />

        {/* 9. FAQ — 8 questions */}
        <FAQSection items={FAQS} title="Frequently Asked Questions" />

        {/* 10. FINAL CTA + FOOTER */}
        <FinalCTASection />
      </main>

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />

      {/* MOBILE STICKY BOTTOM BAR */}
      <StickyMobileBar heroRef={heroRef} />
    </div>
  );
}
