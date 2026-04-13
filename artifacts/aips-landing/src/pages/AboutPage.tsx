import { motion } from "framer-motion";
import { MessageCircle, Users, Package, Layers, Calendar, Clock } from "lucide-react";
import { CommunitySocialCards } from "@/components/CommunitySocialCards";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PaymentBadges } from "@/components/PaymentBadges";

const WHATSAPP = "https://wa.me/8801865385348";

const STATS = [
  { icon: Users, value: "10,000+", label: "Happy customers" },
  { icon: Package, value: "56", label: "AI tools available" },
  { icon: Layers, value: "19", label: "Leading brands" },
  { icon: Calendar, value: "2022", label: "Founded" },
  { icon: Clock, value: "<5 min", label: "WhatsApp response" },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <SEOHead
        title="About AI Premium Shop — 10,000+ Customers Since 2022 | Bangladesh"
        description="AI Premium Shop — 10,000+ customers since 2022. Official AI subscriptions in Bangladesh. bKash payment. WhatsApp support."
        canonical="https://aipremiumshop.com/about"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "About" }]} />

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ backgroundColor: "rgba(244,185,66,0.15)", color: "#f4b942" }}>
            🇧🇩 Since 2022
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About AI Premium Shop</h1>
          <p className="text-lg max-w-2xl" style={{ color: "#c9ceda" }}>
            Bangladesh&apos;s most trusted source for premium AI tool subscriptions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl border border-white/10"
            style={{ backgroundColor: "#151b3d" }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>
              AI Premium Shop (AIPS) has served 10,000+ Bangladeshi customers since 2022 with premium AI subscriptions. Founded by Emon Hossain, AIPS delivers ChatGPT, Claude, Midjourney, and more via WhatsApp-first sales with bKash/Nagad payments.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>
              We started with a simple idea: make the world&apos;s best AI tools accessible to everyone in Bangladesh — without needing an international credit card. Today, students, freelancers, content creators, developers, and business owners trust us to deliver authentic AI subscriptions quickly, affordably, and with real human support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl border border-white/10"
            style={{ backgroundColor: "#151b3d" }}
          >
            <h2 className="text-xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>
              56 premium AI tools from 19 leading brands including ChatGPT, Claude, Midjourney, GitHub Copilot, Runway, ElevenLabs, and more. Shared and personal accounts available. Prices start at just BDT 350 per month.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>
              All plans come with 30-day replacement warranty, under-5-minute WhatsApp response, and local payment via bKash, Nagad, Rocket, or bank transfer.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl border border-white/10 mb-16"
          style={{ backgroundColor: "#151b3d" }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Our Difference</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#c9ceda" }}>
            We don&apos;t just sell subscriptions. We provide 1:1 AI coaching to help you actually use these tools for your specific work. Whether you&apos;re a student writing a thesis or a business owner automating customer support — we set it up for you.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>
            Our team is available 10 AM to Midnight, 7 days a week. We respond to every WhatsApp message within 5 minutes. You always talk to a real human, not a bot.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-5 rounded-2xl border border-white/10 text-center"
              style={{ backgroundColor: "#151b3d" }}
            >
              <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: "#f4b942" }} />
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "#c9ceda" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-white mb-6">Connect With AI Premium Shop</h2>
          <CommunitySocialCards cols="3" />
        </motion.div>

        <div className="p-8 rounded-2xl text-center border border-white/10" style={{ backgroundColor: "#151b3d" }}>
          <p className="font-semibold text-white text-lg mb-2">Ready to get started?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>Order your first AI subscription on WhatsApp. Delivered in minutes.</p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}>
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </a>
          <div className="mt-6">
            <PaymentBadges label="We accept" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
