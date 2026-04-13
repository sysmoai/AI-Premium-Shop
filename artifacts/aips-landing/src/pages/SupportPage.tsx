import { motion } from "framer-motion";
import { MessageCircle, Clock, Users, HelpCircle, ChevronRight, Star, GraduationCap, Laptop, Building, Code } from "lucide-react";
import { CommunitySocialCards } from "@/components/CommunitySocialCards";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const WHATSAPP = "https://wa.me/8801865385348";
const WHATSAPP_ORDER = "https://wa.me/8801865385348?text=Hi%2C%20I%20need%20support%20with%20my%20AI%20subscription";
const COMMUNITY = "https://chat.whatsapp.com/LKHNCYz05MrA0j6uX272Zc";

const FAQS = [
  {
    q: "I ordered but haven't received my account yet. What should I do?",
    a: "Message us on WhatsApp with your order details (which product, payment amount, and transaction screenshot). Shared accounts are delivered within 5–30 minutes; personal accounts within 2–4 hours. If you're past these windows, message us immediately.",
  },
  {
    q: "My account stopped working. What's the warranty?",
    a: "All orders include a 30-day warranty. If your account stops working within 30 days, message us on WhatsApp and we'll replace it at no extra charge within the delivery timeframe.",
  },
  {
    q: "Can I upgrade from Shared to Personal?",
    a: "Yes. Pay the price difference and we'll set up your personal account. Message us on WhatsApp with your current plan details.",
  },
  {
    q: "What is 1:1 AI Coaching?",
    a: "1:1 AI Coaching is a personalised session where an AIPS expert shows you exactly how to use AI tools for your specific work — writing, coding, image generation, or automation. Sessions are 1 hour at ৳799. Message us to book.",
  },
  {
    q: "Do you have a WhatsApp Community?",
    a: "Yes! Join our WhatsApp Community to get AI tips, product updates, exclusive discount codes, and connect with 10,000+ AI users in Bangladesh.",
  },
  {
    q: "What payment methods do you support?",
    a: "bKash, Nagad, Rocket, Bank Transfer, and Binance (USDT). No international credit card needed.",
  },
];

export default function SupportPage() {
  return (
    <PageLayout>
      <SEOHead
        title="AI Setup Support &amp; 1:1 Coaching — BDT 799/hr | AI Premium Shop"
        description="Get support for your AI subscriptions. WhatsApp: +880 1865-385348. 10 AM to Midnight BST, 7 days a week. 30-day warranty on all orders."
        canonical="https://aipremiumshop.com/support"
      />

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#f4b942" }}>Help Center</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Support</h1>
          <p className="text-lg max-w-xl" style={{ color: "#c9ceda" }}>
            We're here 10 AM to Midnight BST, 7 days a week. WhatsApp is the fastest way to reach us.
          </p>
        </motion.div>

        {/* Primary CTA */}
        <motion.a
          href={WHATSAPP_ORDER}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-lg font-bold hover:opacity-90 transition-opacity mb-8"
          style={{ backgroundColor: "#25d366", color: "#fff" }}
        >
          <MessageCircle className="w-6 h-6" />
          Message Support on WhatsApp — +880 1865-385348
        </motion.a>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="p-5 rounded-2xl border border-white/10"
            style={{ backgroundColor: "#151b3d" }}
          >
            <Clock className="w-5 h-5 mb-3" style={{ color: "#f4b942" }} />
            <div className="font-bold text-white mb-1 text-sm">Service Hours</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>10 AM – Midnight BST</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>7 days a week</div>
            <div className="text-xs mt-2 font-medium" style={{ color: "#25d366" }}>WhatsApp: under 5 min</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-5 rounded-2xl border border-white/10"
            style={{ backgroundColor: "#151b3d" }}
          >
            <div className="text-lg mb-3">🛡</div>
            <div className="font-bold text-white mb-1 text-sm">30-Day Warranty</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>All orders covered</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>Free replacement if needed</div>
            <div className="text-xs mt-2 font-medium" style={{ color: "#f4b942" }}>No questions asked</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="p-5 rounded-2xl border border-white/10"
            style={{ backgroundColor: "#151b3d" }}
          >
            <Users className="w-5 h-5 mb-3" style={{ color: "#3b82f6" }} />
            <div className="font-bold text-white mb-1 text-sm">Community</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>10,000+ members</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>AI tips & discount codes</div>
            <a
              href={COMMUNITY}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-2 font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: "#3b82f6" }}
            >
              Join WhatsApp Community
              <ChevronRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>

        {/* 1:1 AI Coaching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-6 md:p-8 rounded-2xl border border-yellow-400/30"
          style={{ backgroundColor: "#151b3d" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(244,185,66,0.15)" }}>
              <Star className="w-6 h-6" style={{ color: "#f4b942" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">1:1 AI Coaching</h2>
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#c9ceda" }}>
                Get a personalised session with an AIPS AI expert. We show you exactly how to use ChatGPT, Midjourney, Claude, or any AI tool for your specific work. Pick the package that fits your needs.
              </p>

              {/* Coaching Packages Table */}
              <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
                <div className="grid grid-cols-[1fr_auto_auto] text-xs font-semibold uppercase tracking-wider border-b border-white/10 px-4 py-2.5"
                  style={{ color: "#c9ceda" }}>
                  <div>Package</div>
                  <div className="text-right pr-4">Price</div>
                  <div className="w-20 text-center">Duration</div>
                </div>
                {[
                  { name: "Quick Start", price: "৳799", duration: "1 hour", desc: "One focused session on any tool" },
                  { name: "Deep Dive", price: "৳1,499", duration: "2 hours", desc: "Full workflow setup + hands-on practice" },
                  { name: "Team Training", price: "৳2,999", duration: "3 hours", desc: "For teams of 2–6 — group session" },
                  { name: "AI Workflow Setup", price: "৳4,999", duration: "Custom", desc: "Full AI stack setup for your business" },
                ].map((pkg, i) => (
                  <div key={i} className={`grid grid-cols-[1fr_auto_auto] items-center px-4 py-3 ${i > 0 ? "border-t border-white/5" : ""}`}>
                    <div>
                      <div className="text-sm font-semibold text-white">{pkg.name}</div>
                      <div className="text-xs" style={{ color: "#c9ceda" }}>{pkg.desc}</div>
                    </div>
                    <div className="text-sm font-bold text-right pr-4" style={{ color: "#f4b942" }}>{pkg.price}</div>
                    <div className="w-20 text-center text-xs" style={{ color: "#c9ceda" }}>{pkg.duration}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {["ChatGPT for writing", "Midjourney for design", "Cursor for coding", "AI workflow automation", "Prompt engineering"].map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-lg"
                    style={{ backgroundColor: "rgba(244,185,66,0.08)", color: "#c9ceda", border: "1px solid rgba(244,185,66,0.15)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={`${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%201%3A1%20AI%20Coaching%20session`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #ec4899, #f97316)", color: "#fff" }}
              >
                <MessageCircle className="w-4 h-4" />
                Book a Coaching Session
              </a>
            </div>
          </div>
        </motion.div>

        {/* 1:1 AI Coaching Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">1:1 AI Coaching Results</h2>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { Icon: GraduationCap, color: "text-blue-400", label: "Students", desc: "CGPA improvement path + study AI system" },
              { Icon: Laptop, color: "text-purple-400", label: "Freelancers", desc: "AI workflow saving 8+ hrs/week" },
              { Icon: Building, color: "text-amber-400", label: "Business", desc: "3 processes automated in 1 session" },
              { Icon: Code, color: "text-green-400", label: "Developers", desc: "Copilot/Cursor mastered in 1 hour" },
            ].map((card) => (
              <div key={card.label} className="bg-gray-900 rounded-lg p-4">
                <card.Icon className={`w-5 h-5 mb-2 ${card.color}`} />
                <div className="font-bold text-white text-sm mb-1">{card.label}</div>
                <div className="text-xs" style={{ color: "#c9ceda" }}>{card.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-lg font-bold text-white">One 1-hour session can change how you work forever. BDT 799.</p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5" style={{ color: "#f4b942" }} />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-white/10 overflow-hidden" style={{ backgroundColor: "#151b3d" }}>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white text-sm">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-90" style={{ color: "#f4b942" }} />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </motion.div>

        {/* Stay Connected */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-gray-900 rounded-xl p-6 border border-gray-800"
        >
          <h3 className="text-white font-semibold">Stay Connected</h3>
          <p className="text-gray-400 text-sm mt-2">
            Join our WhatsApp community for renewal reminders, exclusive deals, and AI tips from fellow users.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="https://chat.whatsapp.com/LKHNCYz05MrA0j6uX272Zc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-[#20BD5A] transition-colors"
            >
              Join Community
            </a>
            <a
              href="https://whatsapp.com/channel/0029VatCUtC72WTpSObAQF3O"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              Follow Updates
            </a>
            <a
              href="https://www.facebook.com/aipremiumshopbd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-[#1565D8] transition-colors"
            >
              Facebook Page
            </a>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
