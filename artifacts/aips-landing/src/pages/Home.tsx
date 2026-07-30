import { useEffect, useState } from "react";
import { MIN_PRICE, TOTAL_PRODUCTS } from "@/lib/catalogStats";
import { Navbar } from "@/components/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { ORG_SCHEMA, WEBSITE_SCHEMA, breadcrumbSchema, productListSchema } from "@/utils/schemas";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FAQSection } from "@/components/FAQSection";

import { HeroSection } from "@/sections/HeroSection";
import { SegmentSelector } from "@/sections/SegmentSelector";
import { SegmentHeroContent } from "@/sections/SegmentHeroContent";
import { BrandShowcaseSection } from "@/sections/BrandShowcaseSection";
import { PricingTiersSection } from "@/sections/PricingTiersSection";
import { FeaturedProductsSection, FEATURED_PRODUCTS } from "@/sections/FeaturedProductsSection";
import { PaymentMethodsSection } from "@/sections/PaymentMethodsSection";
import { PainPointSection } from "@/sections/PainPointSection";
import { AIAgentsSection } from "@/sections/AIAgentsSection";
import { OffersSection } from "@/sections/OffersSection";
import { CategorySection } from "@/sections/CategorySection";
import { WhyUsSection } from "@/sections/WhyUsSection";
import { HowItWorksSection } from "@/sections/HowItWorksSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { FinalCTASection } from "@/sections/FinalCTASection";
import { CommunitySocialCards } from "@/components/CommunitySocialCards";

type Segment = "students" | "freelancers" | "creators" | "smbs" | "educators" | null;

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
    question: "Are these working subscriptions? How does it work?",
    answer:
      "Yes. We provide working paid subscriptions — no hacked or unauthorized access. Shared plans let 2–7 users split a legitimate subscription (similar to family sharing). Personal plans are dedicated accounts with full privacy. Every order includes a 30-day replacement warranty.",
  },
  {
    question: "I'm new to AI — which tool should I start with?",
    answer:
      "Start with ChatGPT Plus Starter Shared (BDT 499/mo). It's our most popular plan and covers writing, coding, research, and image generation. Most beginners find it's all they need. If you're unsure, message us on WhatsApp and we'll recommend the best tool for your specific work in 2 minutes.",
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
  const [selectedSegment, setSelectedSegment] = useState<Segment>(null);
  const [showSegmentSelector, setShowSegmentSelector] = useState(false);

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

  const handleSegmentSelect = (segment: Segment) => {
    setSelectedSegment(segment);
    setShowSegmentSelector(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <SEOHead
        title={`AI Premium Shop — ${TOTAL_PRODUCTS} Premium AI Tools Bangladesh | From BDT ${MIN_PRICE}`}
        description={`Buy ChatGPT, Claude, Midjourney, Copilot, DeepSeek and more AI tools in Bangladesh. bKash/Nagad payment, WhatsApp delivery. From BDT ${MIN_PRICE}/month.`}
        canonical="https://aipremiumshop.com/"
        jsonLd={[
          ORG_SCHEMA,
          WEBSITE_SCHEMA,
          breadcrumbSchema([{ name: "Home" }]),
          // Built from the exact array FeaturedProductsSection renders, so
          // this can never describe products different from what's on screen.
          productListSchema(
            FEATURED_PRODUCTS.map((p) => ({
              id: p.id,
              name: p.name,
              description: `${p.name} — ${p.capabilities.join(", ")}.`,
              brand: p.brand,
              price: p.price,
            }))
          ),
        ]}
      />

      <Navbar />

      {/* Segment Selector Modal */}
      <SegmentSelector isOpen={showSegmentSelector} onSelect={handleSegmentSelect} />

      <main>
        {/* 1. HERO - Segment Aware */}
        {selectedSegment ? (
          <section className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: "#0a0e27" }}>
            <div className="max-w-4xl mx-auto px-4 md:px-8">
              <SegmentHeroContent segment={selectedSegment} />
            </div>
          </section>
        ) : (
          <HeroSection />
        )}

        {/* 2. BRAND SHOWCASE — Top 20 brands */}
        <div className="scroll-reveal"><BrandShowcaseSection /></div>

        {/* 3. PRICING TIERS — Visual pricing cards */}
        <div className="scroll-reveal"><PricingTiersSection /></div>

        {/* 4. FEATURED PRODUCTS — Top 12 products */}
        <div className="scroll-reveal"><FeaturedProductsSection /></div>

        {/* 5. PAYMENT METHODS — All 5 payment options */}
        <div className="scroll-reveal"><PaymentMethodsSection /></div>

        {/* 6. FIND YOUR SOLUTION — 6 pain-point cards */}
        <div className="scroll-reveal"><PainPointSection /></div>

        {/* 3. AI AGENTS — The 2026 Game Changer */}
        <div className="scroll-reveal"><AIAgentsSection /></div>

        {/* 3B. AI AGENT ECONOMY */}
        <div className="scroll-reveal">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
            <div
              className="rounded-xl p-8 border"
              style={{
                background: "linear-gradient(135deg, #111827 0%, #0a0e27 100%)",
                borderColor: "rgba(168,85,247,0.2)",
                backgroundImage: "linear-gradient(135deg, #111827 0%, #0a0e27 100%), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.03) 39px, rgba(255,255,255,0.03) 40px)",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">The AI Agent Economy</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { value: "$34K", unit: "/mo profit", label: "Solo AI agency", color: "#f4b942" },
                  { value: "45%", unit: "higher rates", label: "AI freelancers", color: "#22c55e" },
                  { value: "18,000%", unit: "growth", label: "AI services on Fiverr", color: "#a855f7" },
                  { value: "8M", unit: "SMEs", label: "BD needs AI automation", color: "#3b82f6" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-800/50 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.05] cursor-default"
                  >
                    <div className="text-4xl md:text-5xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-sm text-gray-400 mb-0.5">{stat.unit}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm" style={{ color: "#c9ceda" }}>
                Start with ChatGPT Pro (BDT 4,500) or Manus AI (BDT 2,500) and build AI agent services.
              </p>
            </div>
          </div>
        </div>

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

        {/* 10. JOIN OUR COMMUNITY */}
        <div className="scroll-reveal">
          <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
            <div className="bg-gradient-to-br from-[#0a0e27] to-[#151b3d] rounded-2xl p-8 md:p-12 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Join thousands Happy Customers</h2>
              <p className="text-gray-400 text-center mt-2">Follow us for deals, AI tips, and instant support</p>
              <div className="mt-8">
                <CommunitySocialCards cols="3" />
              </div>
            </div>
          </section>
        </div>

        {/* 11. FINAL CTA + FOOTER */}
        <FinalCTASection />
      </main>

      {/* FLOATING WHATSAPP BUTTON */}
      <FloatingWhatsApp />
    </div>
  );
}
