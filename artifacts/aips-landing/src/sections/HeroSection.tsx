import { useEffect, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronRight, Star, Users, Calendar, Shield, Zap } from "lucide-react";
import { PaymentBadges } from "@/components/PaymentBadges";
import { TOTAL_PRODUCTS, TOTAL_PLANS, MIN_PRICE, MAX_PRICE, taka, cheapestPriceFor } from "@/lib/catalogStats";
import { computeTopBrands } from "@/lib/topBrands";
import { BrandIcon } from "@/components/BrandIcon";
import type React from "react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const ROTATING_LINES = [
  { problem: "Assignment deadline?", solution: "ChatGPT finishes it in 30 minutes" },
  { problem: "No clients on Upwork?", solution: "Claude writes winning proposals in 2 minutes" },
  { problem: "Content creation burnout?", solution: "Midjourney makes you 10x faster" },
  { problem: "Running your business alone?", solution: "AI Agents automate your workflow 24/7" },
  { problem: "Can't land a job?", solution: "AI preps your interview & tailors your CV" },
  { problem: "Coding all night?", solution: "GitHub Copilot writes 50% of your code" },
  { problem: "Need a branded voice?", solution: "ElevenLabs clones your voice in minutes" },
  { problem: "Creating video content?", solution: "Runway generates videos from text" },
];

// Real, clickable, catalog-priced chips replace what used to be a purely
// decorative (aria-hidden) list of plain brand-name text. Same source as the
// Navbar's Popular Brands column (@/lib/topBrands) — one place computes
// prices, both surfaces render them, so a repriced brand can't show two
// different numbers depending which component the visitor is looking at.
const TOP_DEMAND_BRANDS = computeTopBrands();

// Prices are the real cheapest tier of each product, read from the catalog —
// previously Claude Pro was hard-coded to ৳1,590 (its mid Premium Shared tier)
// while the other two cards showed entry prices, so the three weren't
// comparable and the Claude figure drifted from its true ৳599 entry point.
const HERO_CARDS = [
  { name: "Claude Pro", slug: "claude-pro-bangladesh", color: "#9ca3af", rotate: "-5deg", opacity: 0.65, zIndex: 1 },
  { name: "Midjourney", slug: "midjourney-bangladesh", color: "#8b5cf6", rotate: "0deg", opacity: 0.82, zIndex: 2 },
  { name: "ChatGPT Plus", slug: "chatgpt-plus-bangladesh", color: "#10a37f", rotate: "5deg", opacity: 1, zIndex: 3 },
].map((c) => ({ ...c, price: taka(cheapestPriceFor(c.slug) ?? MIN_PRICE) }));

function TrustBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-900/80 backdrop-blur border border-gray-800 hover:border-[#f4b942]/30 rounded-xl p-4 text-center transition-all duration-300">
      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: "#f4b942" }} />
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs mt-0.5 text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % ROTATING_LINES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const doubledBrands = [...TOP_DEMAND_BRANDS, ...TOP_DEMAND_BRANDS];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-28 pb-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0e27 0%, #151b3d 50%, #0a0e27 100%)" }}
    >
      {/* Aurora accent glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/[0.07] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-500/[0.04] blur-[80px] pointer-events-none" />

      {/* Animated dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPositionY: ["0px", "28px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, rgba(0,0,0,0.6) 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, rgba(0,0,0,0.6) 85%, transparent 100%)",
        }}
      />

      {/* Aurora animated glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl hero-glow-1"
          style={{ background: "radial-gradient(ellipse, rgba(244,185,66,0.09) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl hero-glow-2"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl hero-glow-3"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-2/3 right-1/3 w-56 h-56 rounded-full blur-3xl hero-glow-4"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* Two-column layout on lg+ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* LEFT: Text content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl w-full">
          {/* Trust pill */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
            style={{ borderColor: "rgba(244,185,66,0.4)", color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Trusted by 10,000+ customers across Bangladesh since 2022
          </motion.div>

          {/* SEO H1 — visually small, semantically authoritative */}
          <h1 className="sr-only">Premium AI Tools Bangladesh — ChatGPT, Claude, Midjourney &amp; More via bKash</h1>

          {/* Visual headline */}
          <motion.h2
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            What Takes You 3 Hours —<br className="hidden sm:block" />
            <span style={{ color: "#ffffff" }}> AI Does in 15 Minutes.</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-6 leading-relaxed"
          >
            {/* Counts and prices are derived from the catalog (see
                src/lib/catalogStats.ts) — never hard-coded, so the headline
                can't drift from what's actually for sale. */}
            <strong className="text-white">{TOTAL_PRODUCTS} premium AI tools</strong>, {TOTAL_PLANS} plans
            from {taka(MIN_PRICE)} to {taka(MAX_PRICE)}. ChatGPT, Claude, Midjourney, Notion &amp; more —
            <strong className="text-white"> no international card needed</strong>.
          </motion.p>

          {/* Payment Methods */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-base md:text-lg text-gray-400 max-w-2xl mb-8 leading-relaxed"
          >
            4 Payment Methods:{" "}
            <span className="inline-block bg-[#E2136E] text-white px-2.5 py-1 rounded-full text-xs font-semibold">bKash</span>{" "}
            {/* Nagad: white text on this brand color fails WCAG AA contrast
                (2.32:1 measured, need 4.5:1) — dark text passes comfortably
                (7.50:1) without changing the brand color. */}
            <span className="inline-block bg-[#F6921E] text-[#1a1a1a] px-2.5 py-1 rounded-full text-xs font-semibold">Nagad</span>{" "}
            <span className="inline-block bg-[#8b2f97] text-white px-2.5 py-1 rounded-full text-xs font-semibold">Rocket</span>{" "}
            <span className="inline-block bg-[#1a5276] text-white px-2.5 py-1 rounded-full text-xs font-semibold">Bank</span>
          </motion.p>

          {/* Animated rotating text */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-14 flex items-center justify-center lg:justify-start mb-6 w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2 text-base md:text-lg"
              >
                <span className="font-medium" style={{ color: "#c9ceda" }}>
                  {ROTATING_LINES[activeIndex].problem}
                </span>
                <span className="text-white/40">→</span>
                <span
                  className="font-semibold px-3 py-1 rounded-lg"
                  style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.1)" }}
                >
                  {ROTATING_LINES[activeIndex].solution}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Most-wanted tools ticker — real links + real catalog prices, not
              decorative text. Pauses on hover (::hover rule below) so it can
              actually be read and clicked rather than just glanced at. */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
            className="w-full overflow-hidden mb-8 hero-ticker"
            // Decorative loop (the list is duplicated to make the marquee
            // seamless, so a screen reader would otherwise hear every brand
            // twice with no useful order). The same brands are reachable —
            // and keyboard/AT accessible — from the Navbar mega-menu,
            // BrandShowcaseSection and their own pages; tabIndex={-1} on each
            // link below keeps this aria-hidden subtree free of focusable
            // descendants, which is itself an a11y violation otherwise.
            aria-hidden="true"
          >
            <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
              <span className="text-xs font-bold tracking-wide" style={{ color: "#f4b942" }}>🔥 MOST WANTED</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>this week in Bangladesh</span>
            </div>
            <div
              className="marquee-track flex gap-3 whitespace-nowrap w-max"
              style={{ animation: "marquee 40s linear infinite" }}
            >
              {doubledBrands.map((b, i) => (
                <a
                  key={i}
                  href={b.href}
                  className="flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-xl border transition-colors hover:border-[#f4b942]/50"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                  tabIndex={-1}
                >
                  <BrandIcon brand={b.brand} size={20} />
                  <span className="text-sm font-semibold text-white">{b.name}</span>
                  <span className="text-xs" style={{ color: "#f4b942" }}>{b.price}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-primary"
              className="btn-cta px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2.5"
              style={{ boxShadow: "0 8px 30px rgba(37,211,102,0.25)" }}
            >
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
            <a
              href="#pain-points"
              data-testid="hero-cta-secondary"
              className="px-8 py-4 rounded-xl text-base flex items-center gap-2 border-2 border-gray-600 text-gray-300 hover:border-[#f4b942] hover:text-[#f4b942] transition-all duration-200 font-medium"
            >
              Which AI is right for me?
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Payment badges */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex justify-center lg:justify-start"
          >
            <PaymentBadges label="Pay with" className="flex flex-wrap gap-2 justify-center lg:justify-start" />
          </motion.div>
        </div>

        {/* RIGHT: Floating card stack (desktop only) */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="hidden lg:flex flex-col items-center justify-center flex-shrink-0"
          style={{ width: 220 }}
          aria-hidden="true"
        >
          <div className="relative" style={{ height: 280, width: 200 }}>
            {HERO_CARDS.map((card, i) => (
              <div
                key={card.name}
                className="float-card-stack absolute rounded-xl p-4 border"
                style={{
                  width: 170,
                  backgroundColor: "#151b3d",
                  borderColor: card.color + "55",
                  boxShadow: `0 8px 32px ${card.color}22`,
                  transform: `rotate(${card.rotate})`,
                  opacity: card.opacity,
                  zIndex: card.zIndex,
                  top: i * 22,
                  left: i * 6,
                  animation: `float-card ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.7}s`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-lg mb-3 flex items-center justify-center"
                  style={{ backgroundColor: card.color + "22" }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.color }} />
                </div>
                <div className="text-xs font-medium mb-1" style={{ color: "#c9ceda" }}>{card.name}</div>
                <div className="text-lg font-bold" style={{ color: card.color }}>{card.price}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>/month</div>
                <div
                  className="mt-3 text-xs text-center py-1.5 rounded-lg font-semibold"
                  style={{ backgroundColor: "#008236", color: "#fff", fontSize: 11 }}
                >
                  Order via WhatsApp
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            {TOTAL_PRODUCTS} tools · Local payment
          </div>
        </motion.div>
      </div>

      {/* Trust badges bar */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="relative z-10 mt-16 w-full max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <TrustBadge icon={Users} label="Customers" value="10,000+" />
          <TrustBadge icon={Calendar} label="Established" value="Since 2022" />
          <TrustBadge icon={Shield} label="Warranty" value="30 Days" />
          <TrustBadge icon={Zap} label="Response" value="<5 Min" />
          <div className="bg-gray-900/80 backdrop-blur border border-gray-800 hover:border-[#f4b942]/30 rounded-xl p-4 text-center transition-all duration-300">
            <span className="text-2xl font-bold text-white">{TOTAL_PRODUCTS}</span>
            <div className="text-xs mt-0.5 text-gray-400 uppercase tracking-wider">AI Tools</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
