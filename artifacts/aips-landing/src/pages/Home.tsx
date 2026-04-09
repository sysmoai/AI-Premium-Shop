import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  SiOpenai,
  SiAnthropic,
  SiGithubcopilot,
  SiNotion,
  SiGoogle,
  SiGithub,
} from "react-icons/si";
import {
  Users,
  Calendar,
  Shield,
  MessageCircle,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { PrimaryBrandLogo } from "@/components/PrimaryBrandLogo";
import { FAQSection } from "@/components/FAQSection";
import { PaymentBadges } from "@/components/PaymentBadges";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const AI_TOOLS = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    tagline: "GPT-4o · Shared",
    price: 350,
    icon: SiOpenai,
    color: "#10a37f",
    badge: "Best Seller",
  },
  {
    id: "chatgpt-private",
    name: "ChatGPT Plus",
    tagline: "GPT-4o · Private",
    price: 700,
    icon: SiOpenai,
    color: "#10a37f",
    badge: "Most Popular",
  },
  {
    id: "claude",
    name: "Claude Pro",
    tagline: "Sonnet 3.5 · Shared",
    price: 400,
    icon: SiAnthropic,
    color: "#d97706",
    badge: "Top Rated",
  },
  {
    id: "claude-private",
    name: "Claude Pro",
    tagline: "Sonnet 3.5 · Private",
    price: 750,
    icon: SiAnthropic,
    color: "#d97706",
    badge: null,
  },
  {
    id: "gemini",
    name: "Gemini Advanced",
    tagline: "1.5 Pro · Private",
    price: 750,
    icon: SiGoogle,
    color: "#4285f4",
    badge: null,
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    tagline: "Individual · Private",
    price: 600,
    icon: SiGithubcopilot,
    color: "#6e40c9",
    badge: "For Devs",
  },
  {
    id: "notion",
    name: "Notion AI",
    tagline: "Plus Plan · Private",
    price: 550,
    icon: SiNotion,
    color: "#ffffff",
    badge: null,
  },
  {
    id: "cursor",
    name: "Cursor Pro",
    tagline: "AI Code Editor",
    price: 1100,
    icon: SiGithub,
    color: "#3b82f6",
    badge: "Hot",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Browse & Choose",
    description: "Browse our full catalog of premium AI tools. Pick the plan that fits your budget and workflow.",
    icon: Star,
  },
  {
    number: "02",
    title: "Message on WhatsApp",
    description: "Contact us directly on WhatsApp. We respond in under 5 minutes during service hours.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Pay Locally",
    description: "Pay securely via bKash, Nagad, Rocket, or Bank Transfer. No international card needed.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Instant Delivery",
    description: "Receive your account credentials within 1 hour. We support you through setup.",
    icon: Zap,
  },
];

const TRUST_ITEMS = [
  { icon: Users, value: "1,200+", label: "Customers Served" },
  { icon: Calendar, value: "Since 2022", label: "Trusted & Established" },
  { icon: Shield, value: "30 Days", label: "Replacement Warranty" },
  { icon: MessageCircle, value: "<5 Min", label: "Response Time" },
];

const WHY_US = [
  {
    title: "No International Card Needed",
    description: "Pay in BDT with bKash, Nagad, or Rocket. No Visa or Mastercard required.",
  },
  {
    title: "1:1 Live Setup Support",
    description: "We don't just send credentials. We help you get started and make the most of your tools.",
  },
  {
    title: "Lowest Prices in Bangladesh",
    description: "Premium accounts starting from ৳350/month — a fraction of the official USD price.",
  },
  {
    title: "30-Day Replacement Warranty",
    description: "If your account has any issues during the subscription period, we replace it immediately.",
  },
  {
    title: "Fast, Reliable Delivery",
    description: "Most orders delivered within 30 minutes. Service available 10 AM to Midnight BST.",
  },
  {
    title: "Verified & Trusted Since 2022",
    description: "Over 1,200 satisfied customers across Bangladesh with a 4.9-star track record.",
  },
];

const FAQS = [
  {
    question: "How long does delivery take?",
    answer: "Most accounts are delivered within 5–30 minutes after payment confirmation. In rare cases, delivery can take up to 1 hour. We are available 10 AM to Midnight BST.",
  },
  {
    question: "Are these shared or private accounts?",
    answer: "We offer both. Shared accounts are budget-friendly and work great for most users. Private accounts give you full solo access with no limitations. Product listings clearly indicate the type.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bKash, Nagad, Rocket, and Bank Transfer. No international card or PayPal required.",
  },
  {
    question: "What happens if my account stops working?",
    answer: "We provide a 30-day replacement warranty on all products. If there is any issue with your account during the subscription period, we will replace it at no extra cost.",
  },
  {
    question: "Can I renew the same account?",
    answer: "Yes. Simply message us on WhatsApp before your subscription expires and we will arrange renewal. Many of our customers have been renewing with us since 2022.",
  },
  {
    question: "Is this legal and safe?",
    answer: "Yes. We purchase official subscriptions and resell access in compliance with platform terms. Your device and data are not at risk. We have served 1,200+ customers safely since 2022.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 text-white" style={{ backgroundColor: "#0a0e27" }}>

      {/* ── NAVBAR ── */}
      <header
        data-testid="navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "navbar-bg border-b border-white/10 py-3" : "bg-transparent py-5"
        }`}
        style={{ height: scrolled ? undefined : 80 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-full">
          <a href="/" aria-label="AI Premium Shop Home">
            <PrimaryBrandLogo size="medium" layout="horizontal" />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["Tools", "How It Works", "Why Us", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium transition-colors"
                style={{ color: "#c9ceda" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f4b942")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#c9ceda")}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-cta"
              className="btn-cta px-5 py-2.5 rounded-xl text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </a>
          </div>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden absolute top-full left-0 right-0 border-b border-white/10 py-4 px-6 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(10, 14, 39, 0.97)" }}
            >
              {["Tools", "How It Works", "Why Us", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium py-2"
                  style={{ color: "#c9ceda" }}
                >
                  {item}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta px-5 py-3 rounded-xl text-sm text-center mt-2"
              >
                Order on WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-20 px-4 overflow-hidden"
        >
          {/* Background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(244,185,66,0.08) 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)" }}
            />
            <div
              className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
              style={{ borderColor: "rgba(244,185,66,0.35)", color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              Trusted by 1,200+ customers since 2022
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6"
            >
              Premium AI Tools
              <br />
              <span className="text-cta-gradient">Starting at ৳350/month</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "#c9ceda" }}
            >
              ChatGPT Plus, Claude Pro, Midjourney, and 30+ more — delivered in Bangladesh
              within 1 hour, paid via bKash or Nagad.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-primary"
                className="btn-cta glow-cta px-8 py-4 rounded-xl text-base flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>
              <a
                href="#tools"
                data-testid="hero-cta-secondary"
                className="btn-ghost-cta px-8 py-4 rounded-xl text-base flex items-center gap-2"
              >
                Browse All Tools
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Payment badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <PaymentBadges label="Pay with" className="justify-center" />
            </motion.div>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-16 w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="card-glass rounded-xl py-4 px-5 text-center"
                >
                  <item.icon className="w-5 h-5 mx-auto mb-2 text-gold" style={{ color: "#f4b942" }} />
                  <div className="text-lg font-semibold text-white">{item.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#c9ceda" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── TOOLS SHOWCASE ── */}
        <section id="tools" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#f4b942" }}
              >
                Our Catalog
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-semibold text-white mb-4"
              >
                Premium AI Subscriptions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg max-w-xl mx-auto"
                style={{ color: "#c9ceda" }}
              >
                All tools delivered in BDT. No international card. No hassle.
              </motion.p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {AI_TOOLS.map((tool) => (
                <motion.div
                  key={tool.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="card-navy relative flex flex-col"
                  data-testid={`card-tool-${tool.id}`}
                  style={{ width: "100%", maxWidth: 320 }}
                >
                  {tool.badge && (
                    <span
                      className="absolute -top-3 left-4 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: "linear-gradient(135deg, #ec4899, #f97316)", color: "#fff" }}
                    >
                      {tool.badge}
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: tool.color + "22", border: `1px solid ${tool.color}44` }}
                    >
                      <tool.icon style={{ color: tool.color, fontSize: 20 }} />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-base leading-tight">{tool.name}</div>
                      <div className="text-xs" style={{ color: "#c9ceda" }}>{tool.tagline}</div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/10">
                    <div>
                      <span className="text-2xl font-semibold text-white">৳{tool.price}</span>
                      <span className="text-xs ml-1" style={{ color: "#c9ceda" }}>/month</span>
                    </div>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta text-xs px-4 py-2 rounded-lg flex items-center gap-1"
                    >
                      Order
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-cta px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2"
              >
                See All 30+ Tools on WhatsApp
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          id="how-it-works"
          className="py-24 px-4"
          style={{ backgroundColor: "#151b3d" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#f4b942" }}
              >
                Simple Process
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-semibold text-white"
              >
                Get Started in 4 Steps
              </motion.h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {STEPS.map((step) => (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 glow-gold"
                    style={{ backgroundColor: "rgba(244,185,66,0.1)", border: "1px solid rgba(244,185,66,0.3)" }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: "#f4b942" }} />
                  </div>
                  <div className="text-xs font-bold mb-1" style={{ color: "#f4b942", letterSpacing: "0.1em" }}>
                    {step.number}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{step.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-14"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="howitworks-cta"
                className="btn-cta glow-cta px-8 py-4 rounded-xl text-base inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Place Your Order Now
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section id="why-us" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#f4b942" }}
              >
                Why Choose AIPS
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-semibold text-white"
              >
                Built for Bangladesh. Trusted Since 2022.
              </motion.h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {WHY_US.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="card-navy"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(244,185,66,0.15)" }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: "#f4b942" }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── PAYMENT ── */}
        <section
          className="py-16 px-4 border-y border-white/10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest mb-6"
              style={{ color: "#f4b942" }}
            >
              Accepted Payment Methods
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <PaymentBadges label="" className="justify-center flex-wrap gap-3" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm mt-6"
              style={{ color: "#c9ceda" }}
            >
              All transactions in BDT. No international card, no PayPal, no hassle.
            </motion.p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq">
          <FAQSection items={FAQS} title="Frequently Asked Questions" />
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-navy rounded-2xl py-14 px-8"
              style={{ borderColor: "rgba(244,185,66,0.3)" }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "#c9ceda" }}>
                Message us on WhatsApp and we will help you pick the right plan.
                Most orders are delivered within 30 minutes.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-cta"
                className="btn-cta glow-cta px-10 py-4 rounded-xl text-base inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp Now
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="py-12 px-4 border-t border-white/10"
        style={{ backgroundColor: "#080c1f" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <PrimaryBrandLogo size="small" layout="horizontal" />
              <p className="text-sm mt-3 max-w-xs" style={{ color: "#c9ceda" }}>
                Premium AI subscriptions in Bangladesh. Fast delivery. Local payment. Real support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 text-sm" style={{ color: "#c9ceda" }}>
              <div>
                <div className="font-semibold text-white mb-3">Contact</div>
                <div className="space-y-2">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">WhatsApp</a>
                  <a href="https://www.facebook.com/aipremiumshopbd" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Facebook</a>
                  <a href="mailto:support@aipremiumshop.com" className="block hover:text-white transition-colors">Email</a>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-3">Popular</div>
                <div className="space-y-2">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">ChatGPT Plus</a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Claude Pro</a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">GitHub Copilot</a>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-3">Service</div>
                <div className="space-y-2">
                  <span className="block" style={{ color: "#c9ceda" }}>10 AM – Midnight BST</span>
                  <span className="block" style={{ color: "#c9ceda" }}>Response &lt;5 minutes</span>
                  <span className="block" style={{ color: "#c9ceda" }}>30-Day Warranty</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{ color: "#c9ceda" }}
          >
            <span>© {new Date().getFullYear()} AI Premium Shop. All rights reserved.</span>
            <span>Bangladesh · aipremiumshop.com</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
