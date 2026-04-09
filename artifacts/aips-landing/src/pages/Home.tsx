import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

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

const NAV_LINKS = [
  { label: "Solutions", href: "#pain-points" },
  { label: "AI Agents", href: "#ai-agents" },
  { label: "Best Sellers", href: "#offers" },
  { label: "Why Us", href: "#why-us" },
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
          scrolled
            ? "border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
        style={scrolled ? { backgroundColor: "rgba(10,14,39,0.95)", backdropFilter: "blur(12px)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="/" aria-label="AI Premium Shop">
            <PrimaryBrandLogo size="medium" layout="horizontal" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
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

          {/* Desktop CTA */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-cta"
            className="hidden lg:inline-flex btn-cta px-5 py-2.5 rounded-xl text-sm items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              style={{ backgroundColor: "rgba(10,14,39,0.97)" }}
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-base font-medium py-1"
                    style={{ color: "#c9ceda" }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta px-5 py-3 rounded-xl text-sm text-center mt-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* 1. HERO */}
        <HeroSection ref={heroRef} />

        {/* 2. FIND YOUR SOLUTION */}
        <PainPointSection />

        {/* 3. AI AGENTS */}
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

        {/* 9. FAQ */}
        <FAQSection items={FAQS} title="Frequently Asked Questions" />

        {/* 10. FINAL CTA + FOOTER */}
        <FinalCTASection />
      </main>

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />

      {/* MOBILE STICKY BAR */}
      <StickyMobileBar heroRef={heroRef} />
    </div>
  );
}
