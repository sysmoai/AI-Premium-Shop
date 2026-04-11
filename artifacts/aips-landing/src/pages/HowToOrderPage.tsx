import { motion } from "framer-motion";
import { MessageCircle, ChevronRight, Package, CreditCard, Smartphone, Zap } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";
const WHATSAPP_SUPPORT = "https://wa.me/8801865385348";

const STEPS = [
  {
    number: 1,
    icon: Package,
    color: "#10a37f",
    title: "Choose Your Tool",
    subtitle: "Not sure which to pick? We'll help.",
    content: [
      "Browse our full catalog at /products or use the category menus.",
      "Decide: Shared (lower cost, 2-5 users) or Personal (your own account).",
      "If unsure, message us on WhatsApp — we'll recommend the right tool for your budget and use case in minutes.",
    ],
    cta: { label: "Browse All Products", href: "/products", isInternal: true },
  },
  {
    number: 2,
    icon: MessageCircle,
    color: "#25d366",
    title: "Message Us on WhatsApp",
    subtitle: "Response in under 5 minutes.",
    content: [
      "WhatsApp: +880 1865-385348",
      "Tell us: which tool, which plan (Shared or Personal), how many months.",
      "We'll confirm availability, send the exact price, and give you payment details.",
    ],
    cta: { label: "Open WhatsApp", href: WHATSAPP, isInternal: false },
  },
  {
    number: 3,
    icon: CreditCard,
    color: "#f4b942",
    title: "Pay via bKash, Nagad, or Rocket",
    subtitle: "No international card required.",
    content: [
      "We'll send you the exact amount and our bKash/Nagad/Rocket number.",
      "Send the exact amount. Screenshot the payment confirmation.",
      "Send the screenshot on WhatsApp. We'll verify and start processing immediately.",
    ],
    paymentMethods: ["bKash", "Nagad", "Rocket", "Bank Transfer"],
  },
  {
    number: 4,
    icon: Zap,
    color: "#ec4899",
    title: "Receive Your Access",
    subtitle: "Most accounts delivered in 5–30 minutes.",
    content: [
      "Shared accounts: Delivered in 5–30 minutes, even at midnight.",
      "Personal accounts: Delivered in 2–4 hours (we create a new account for you).",
      "We send your credentials on WhatsApp. 30-day warranty included on all orders.",
    ],
  },
];

const FAQS = [
  {
    q: "What if I don't know which tool to choose?",
    a: "Message us on WhatsApp. Tell us what you want to do (write, design, code, research, etc.) and your budget. We'll recommend the best tool within 5 minutes.",
  },
  {
    q: "Can I pay in installments?",
    a: "We don't currently offer installment payment for standard subscriptions. However, our shared plans start from just BDT 350/month — the lowest cost point for any premium AI subscription in Bangladesh.",
  },
  {
    q: "What happens after payment?",
    a: "After receiving your payment screenshot on WhatsApp, we verify the transaction and begin setting up your account. For shared accounts: 5–30 minutes. For personal accounts: 2–4 hours. We send all credentials on WhatsApp.",
  },
  {
    q: "What payment methods do you accept?",
    a: "bKash, Nagad, Rocket, Bank Transfer (BRAC/DBL/Dutch-Bangla), and Binance (USDT). No international credit card or PayPal required.",
  },
  {
    q: "What is a shared account?",
    a: "A shared account means 2-5 users share the cost of a single subscription. Each user has their own chat history and sessions — you don't see each other's conversations. Shared accounts are 60-88% cheaper than buying the subscription yourself.",
  },
  {
    q: "What's included in the 30-day warranty?",
    a: "If your account stops working for any reason within 30 days of purchase, we'll replace it at no extra charge. Simply message us on WhatsApp with your order details.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.08 } }),
};

export default function HowToOrderPage() {
  return (
    <PageLayout>
      <SEOHead
        title="How to Order AI Tools in Bangladesh | bKash Nagad | AI Premium Shop"
        description="Step-by-step guide to ordering AI subscriptions in Bangladesh. Pay with bKash or Nagad. Delivered in minutes. No international card required."
        canonical="https://aipremiumshop.com/how-to-order"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "How to Order" }]} />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/20"
            style={{ color: "#c9ceda" }}>
            🛒 Ordering Guide — Bangladesh
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">How to Order — 4 Simple Steps</h1>
          <p className="text-lg" style={{ color: "#c9ceda" }}>
            Order any AI subscription in Bangladesh. Pay with{" "}
            <span className="inline-block bg-[#E2136E] text-white px-2.5 py-1 rounded-full text-xs font-semibold">bKash</span>{" "}
            or{" "}
            <span className="inline-block bg-[#F6921E] text-white px-2.5 py-1 rounded-full text-xs font-semibold">Nagad</span>.
            Most accounts delivered in under 30 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 mb-14">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} custom={i + 1} variants={fadeUp} initial="hidden" animate="visible"
                className="p-6 rounded-2xl border border-white/10"
                style={{ backgroundColor: "#151b3d" }}>
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: step.color + "25", border: `1.5px solid ${step.color}40` }}>
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: step.color }}>
                        Step {step.number}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">{step.title}</h2>
                    <p className="text-sm mb-3" style={{ color: step.color }}>{step.subtitle}</p>
                    <ul className="space-y-2 mb-4">
                      {step.content.map((line, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "#c9ceda" }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: step.color }} />
                          {line}
                        </li>
                      ))}
                    </ul>
                    {step.paymentMethods && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {step.paymentMethods.map((m) => {
                          const PM: Record<string, { bg: string; text: string }> = {
                            bKash: { bg: "#E2136E", text: "#fff" },
                            Nagad: { bg: "#F6921E", text: "#fff" },
                            Rocket: { bg: "#8B2F8B", text: "#fff" },
                            "Bank Transfer": { bg: "#3b82f6", text: "#fff" },
                            Binance: { bg: "#F0B90B", text: "#111" },
                          };
                          const c = PM[m] ?? { bg: "#f4b942", text: "#0a0e27" };
                          return (
                            <span key={m} className="inline-block text-xs px-2.5 py-1 rounded-full font-semibold"
                              style={{ backgroundColor: c.bg, color: c.text }}>
                              {m}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    {step.cta && (
                      step.cta.isInternal ? (
                        <Link href={step.cta.href}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity border border-white/15 text-white">
                          {step.cta.label}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a href={step.cta.href} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: step.color, color: "#fff" }}>
                          <MessageCircle className="w-4 h-4" />
                          {step.cta.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Delivery times */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="grid grid-cols-2 gap-4 mb-14">
          <div className="p-5 rounded-2xl border text-center"
            style={{ backgroundColor: "#151b3d", borderColor: "#10a37f30" }}>
            <div className="text-2xl font-bold text-white mb-1">5–30 min</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>Shared accounts</div>
            <div className="text-xs mt-1" style={{ color: "#10a37f" }}>ChatGPT, Claude, Gemini, Perplexity...</div>
          </div>
          <div className="p-5 rounded-2xl border text-center"
            style={{ backgroundColor: "#151b3d", borderColor: "#ec489930" }}>
            <div className="text-2xl font-bold text-white mb-1">2–4 hrs</div>
            <div className="text-xs" style={{ color: "#c9ceda" }}>Personal accounts</div>
            <div className="text-xs mt-1" style={{ color: "#ec4899" }}>Own Gmail, own OpenAI, own GitHub...</div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible" className="mb-14">
          <h2 className="text-2xl font-bold text-white mb-5">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-white/10 overflow-hidden"
                style={{ backgroundColor: "#151b3d" }}>
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-white text-sm">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-90"
                    style={{ color: "#f4b942" }} />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible"
          className="p-8 rounded-2xl border border-white/10 text-center"
          style={{ backgroundColor: "#151b3d" }}>
          <h2 className="text-xl font-bold text-white mb-2">Ready to order?</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Message us on WhatsApp and we'll handle everything. We're online 10 AM – Midnight BST, 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-5 h-5" />
              Order on WhatsApp
            </a>
            <Link href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors">
              Browse Products
            </Link>
          </div>
          <p className="text-xs mt-4" style={{ color: "#c9ceda" }}>
            Need help choosing? Message <a href={WHATSAPP_SUPPORT} target="_blank" rel="noopener noreferrer" className="underline">+880 1865-385348</a>
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
}
