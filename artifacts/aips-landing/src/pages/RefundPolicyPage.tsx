import { motion } from "framer-motion";
import { MessageCircle, Shield, Clock, AlertCircle, Star } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";

const WHATSAPP = "https://wa.me/8801865385348";

const SECTIONS = [
  {
    icon: Shield,
    color: "#22c55e",
    title: "30-Day Replacement Warranty",
    content:
      "All accounts come with a 30-day replacement warranty from the date of delivery. If your account experiences any issues during the subscription period — access lost, plan changed, or service interrupted — we replace it at no extra cost. No questions asked.",
  },
  {
    icon: Clock,
    color: "#f4b942",
    title: "Refund Eligibility",
    content:
      "Refunds are available within 15 minutes of delivery if the service does not match what was ordered (e.g., wrong plan, wrong access type). After this window, our 30-day replacement warranty covers all issues at no cost to you.",
  },
  {
    icon: AlertCircle,
    color: "#ef4444",
    title: "Non-Refundable Cases",
    content:
      "The following are not eligible for refunds: (1) Subscription fees for accounts that have already been activated and are working as described. (2) Cases where the customer provided incorrect information during ordering. (3) Dissatisfaction with the AI tool itself — this is outside our control as we provide access to third-party platforms. (4) No-shows for scheduled onboarding sessions.",
  },
  {
    icon: MessageCircle,
    color: "#25d366",
    title: "How to Request a Refund or Replacement",
    content:
      "Message us on WhatsApp at +880 1865-385348 within the eligible timeframe. Include your order details (which tool, when you ordered, payment amount) and describe the issue you're experiencing. We'll review your request and respond within 5 minutes.",
  },
  {
    icon: Star,
    color: "#8b5cf6",
    title: "High-Value Refund Review",
    content:
      "Refund requests above BDT 5,000 are reviewed directly by the founder to ensure fairness and accuracy. These are processed within 24 hours of the request.",
  },
];

export default function RefundPolicyPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Refund & Replacement Policy | AI Premium Shop Bangladesh"
        description="AI Premium Shop refund & replacement policy. 30-day warranty. How to request a refund or replacement."
        canonical="https://aipremiumshop.com/refund-policy"
      />

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
            <Shield className="w-3.5 h-3.5" /> Customer Protection
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Refund &amp; Replacement Policy</h1>
          <p style={{ color: "#c9ceda" }}>Last updated: April 2026</p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-6 rounded-2xl border border-white/10"
              style={{ backgroundColor: "#151b3d" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: s.color + "20" }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <h2 className="font-bold text-white mb-2">{s.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{s.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl text-center border border-white/10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <p className="font-semibold text-white text-lg mb-2">Have an issue with your order?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Message us on WhatsApp right away. We respond within 5 minutes and resolve all genuine issues without hassle.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}>
            <MessageCircle className="w-5 h-5" />
            Contact Support on WhatsApp
          </a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
