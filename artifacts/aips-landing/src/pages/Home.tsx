import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
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
  Zap,
} from "lucide-react";

import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { SEOHead } from "@/components/SEOHead";
import { ORG_SCHEMA, WEBSITE_SCHEMA, schemaJson } from "@/utils/schemas";
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
  { label: "AI Assistant & Chat", count: 20, Icon: MessageSquare, color: "#10a37f", href: "/ai-assistant" },
  { label: "AI Image & Design", count: 9, Icon: Image, color: "#ec4899", href: "/ai-image" },
  { label: "AI Video", count: 4, Icon: Video, color: "#8b5cf6", href: "/ai-video" },
  { label: "AI Voice & Music", count: 6, Icon: Music, color: "#f97316", href: "/ai-voice-music" },
  { label: "AI Code & Dev Tools", count: 6, Icon: Code2, color: "#06b6d4", href: "/ai-code" },
  { label: "AI Workspace", count: 5, Icon: Layout, color: "#f4b942", href: "/ai-workspace" },
];

const SECONDARY_NAV = [
  { label: "Bundles", href: "/bundles" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
];

const MOBILE_DRAWER_LINKS = [
  { label: "Products", href: "#categories" },
  { label: "Solutions", href: "#pain-points" },
  { label: "Best Sellers", href: "#offers" },
  { label: "Why Us", href: "#why-us" },
  { label: "Bundles", href: "/bundles" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
  { label: "FAQ", href: "/faq" },
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
    question: "I'm new to AI — which tool should I start with?",
    answer:
      "Start with ChatGPT Plus Starter Shared (BDT 350/mo). It's our most popular plan and covers writing, coding, research, and image generation. Most beginners find it's all they need. If you're unsure, message us on WhatsApp and we'll recommend the best tool for your specific work in 2 minutes.",
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

const MEGA_COLUMNS = [
  {
    heading: "AI Assistant & Chat",
    icon: MessageSquare,
    color: "#10a37f",
    href: "/ai-assistant",
    brands: [
      { name: "ChatGPT Plus", from: "৳350", href: "/chatgpt-plus-bangladesh", badge: "⭐" },
      { name: "Claude Pro", from: "৳1,495", href: "/claude-pro-bangladesh" },
      { name: "Google AI Pro", from: "৳500", href: "/gemini-advanced-bangladesh", badge: "🔥" },
      { name: "Grok / SuperGrok", from: "৳1,495", href: "/supergrok-bangladesh" },
      { name: "Perplexity Pro", from: "৳350", href: "/perplexity-pro-bangladesh" },
    ],
  },
  {
    heading: "AI Creative Studio",
    icon: Image,
    color: "#ec4899",
    href: "/ai-image",
    brands: [
      { name: "Midjourney", from: "৳1,199", href: "/midjourney-bangladesh", badge: "⭐" },
      { name: "Leonardo AI", from: "৳599", href: "/leonardo-ai-bangladesh" },
      { name: "Ideogram", from: "৳2,990", href: "/ideogram-bangladesh" },
      { name: "Runway", from: "৳1,794", href: "/runway-bangladesh" },
      { name: "HeyGen", from: "৳1,499", href: "/heygen-bangladesh" },
      { name: "ElevenLabs", from: "৳748", href: "/elevenlabs-bangladesh" },
      { name: "Suno AI", from: "৳1,495", href: "/suno-ai-bangladesh" },
      { name: "Udio", from: "৳499", href: "/udio-bangladesh" },
    ],
  },
  {
    heading: "AI Professional",
    icon: Code2,
    color: "#06b6d4",
    href: "/ai-code",
    brands: [
      { name: "GitHub Copilot", from: "৳1,495", href: "/github-copilot-bangladesh", badge: "⭐" },
      { name: "Cursor Pro", from: "৳2,990", href: "/cursor-bangladesh" },
      { name: "v0.dev", from: "৳999", href: "/v0-dev-bangladesh" },
      { name: "Replit Core", from: "৳500", href: "/replit-bangladesh", badge: "🔥" },
      { name: "Notion Business", from: "৳800", href: "/notion-business-bangladesh", badge: "🔥" },
      { name: "Otter.ai", from: "৳799", href: "/otter-ai-bangladesh" },
      { name: "Gamma", from: "৳399", href: "/gamma-bangladesh" },
      { name: "Writesonic", from: "৳799", href: "/writesonic-bangladesh" },
    ],
  },
  {
    heading: "Quick Links",
    icon: Zap,
    color: "#f4b942",
    href: "/products",
    brands: [
      { name: "📋 All 56 Products", from: "", href: "/products" },
      { name: "📦 Bundles from ৳449", from: "", href: "/bundles" },
      { name: "💰 Pricing & Compare", from: "", href: "/pricing" },
      { name: "🎓 Best AI for Students", from: "", href: "/best-ai-for-students" },
      { name: "💼 Best AI for Freelancers", from: "", href: "/best-ai-for-freelancers" },
      { name: "🏢 Best AI for Business", from: "", href: "/best-ai-for-business" },
      { name: "❓ FAQ", from: "", href: "/faq" },
      { name: "💬 Support", from: "", href: "/support" },
    ],
  },
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
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const goTo = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      window.location.hash = href.slice(2);
    } else {
      navigate(href);
    }
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
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
            style={{ backgroundColor: "#151b3d", width: "780px", maxWidth: "calc(100vw - 2rem)" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="grid grid-cols-4 gap-0 divide-x divide-white/5 p-1">
              {MEGA_COLUMNS.map((col) => (
                <div key={col.heading} className="p-4">
                  <button
                    onClick={() => goTo(col.href)}
                    className="flex items-center gap-2 mb-3 w-full text-left hover:opacity-80 transition-opacity"
                  >
                    <col.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: col.color }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: col.color }}>
                      {col.heading}
                    </span>
                  </button>
                  <div className="space-y-0.5">
                    {col.brands.map((brand) => (
                      <button
                        key={brand.name}
                        onClick={() => goTo(brand.href)}
                        className="flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-left hover:bg-white/5 transition-colors group"
                      >
                        <span className="text-sm text-white group-hover:opacity-90 transition-opacity truncate">
                          {brand.name}
                          {brand.badge && <span className="ml-1 text-xs">{brand.badge}</span>}
                        </span>
                        {brand.from && (
                          <span className="text-xs flex-shrink-0 ml-2" style={{ color: "#f4b942" }}>
                            {brand.from}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              <span className="text-xs" style={{ color: "#c9ceda" }}>
                56 premium AI tools · bKash, Nagad, Rocket · 30-day warranty
              </span>
              <button
                onClick={() => goTo("/products")}
                className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity"
                style={{ color: "#f4b942" }}
              >
                View all 56 products
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
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
  const [, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AI Premium Shop",
      "url": "https://aipremiumshop.com",
      "logo": "https://aipremiumshop.com/images/brand/aips-logo.png",
      "foundingDate": "2022",
      "description": "Bangladesh's most trusted source for premium AI subscriptions. ChatGPT, Claude, Midjourney, and 30+ tools with local payment via bKash and Nagad.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+8801865385348",
        "contactType": "sales",
        "availableLanguage": "English",
        "contactOption": "TollFree"
      },
      "sameAs": [
        "https://www.facebook.com/aipremiumshopbd",
        "https://www.instagram.com/aipremiumshop/",
        "https://www.linkedin.com/showcase/aipremiumshop/"
      ]
    };
    let script = document.getElementById("org-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "org-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    return () => {
      const el = document.getElementById("org-jsonld");
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title="AI Premium Shop — Premium AI Tools Bangladesh | From BDT 350"
        description="56 premium AI tools in Bangladesh. ChatGPT from BDT 350. Pay via bKash/Nagad. 5-min WhatsApp delivery. 30-day warranty. Order now."
        canonical="https://aipremiumshop.com/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(ORG_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson(WEBSITE_SCHEMA) }} />

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
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
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
            style={{ background: "linear-gradient(135deg, #ec4899, #f97316)", color: "#fff" }}
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
                    href={cat.href}
                    onClick={(e) => { e.preventDefault(); navigate(cat.href); setMenuOpen(false); }}
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
                    onClick={(e) => {
                      if (!link.href.startsWith("#")) { e.preventDefault(); navigate(link.href); }
                      setMenuOpen(false);
                    }}
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
        <div className="scroll-reveal"><PainPointSection /></div>

        {/* 3. AI AGENTS — The 2026 Game Changer */}
        <div className="scroll-reveal"><AIAgentsSection /></div>

        {/* 4. SPECIAL OFFERS + BEST SELLERS */}
        <div className="scroll-reveal"><OffersSection /></div>

        {/* 5. BROWSE BY CATEGORY */}
        <div className="scroll-reveal"><CategorySection /></div>

        {/* 6. WHY AI PREMIUM SHOP */}
        <div className="scroll-reveal"><WhyUsSection /></div>

        {/* 7. HOW IT WORKS */}
        <div className="scroll-reveal"><HowItWorksSection /></div>

        {/* 8. TESTIMONIALS */}
        <div className="scroll-reveal"><TestimonialsSection /></div>

        {/* 9. FAQ — 8 questions */}
        <div className="scroll-reveal"><FAQSection items={FAQS} title="Frequently Asked Questions" /></div>

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
