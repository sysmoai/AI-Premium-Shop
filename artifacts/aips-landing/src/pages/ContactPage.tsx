import { motion } from "framer-motion";
import { MessageCircle, Facebook, Instagram, Linkedin, Mail, Clock } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { PaymentBadges } from "@/components/PaymentBadges";

const WHATSAPP = "https://wa.me/8801865385348";

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+880 1865-385348",
    desc: "Fastest — under 5 min response",
    href: WHATSAPP,
    color: "#25d366",
    primary: true,
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "facebook.com/aipremiumshopbd",
    desc: "Message us on Facebook",
    href: "https://www.facebook.com/aipremiumshopbd",
    color: "#1877f2",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@aipremiumshop",
    desc: "Follow for updates & deals",
    href: "#",
    color: "#e1306c",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/showcase/aipremiumshop",
    desc: "Professional network",
    href: "#",
    color: "#0a66c2",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@aipremiumshop.com",
    desc: "For formal inquiries",
    href: "mailto:support@aipremiumshop.com",
    color: "#f4b942",
  },
];

export default function ContactPage() {
  return (
    <PageLayout>
      <SEOHead
        title="Contact AI Premium Shop — Order via WhatsApp"
        description="Contact AI Premium Shop Bangladesh. WhatsApp: +880 1865-385348. Response under 5 minutes. 10 AM to Midnight BST, 7 days a week."
        canonical="https://aipremiumshop.com/contact"
      />

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-lg max-w-xl" style={{ color: "#c9ceda" }}>
            The fastest way to reach us is WhatsApp. We respond in under 5 minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-lg font-bold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            <MessageCircle className="w-6 h-6" />
            Message us on WhatsApp — +880 1865-385348
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {CHANNELS.filter((c) => !c.primary).map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-white/30 transition-colors"
              style={{ backgroundColor: "#151b3d" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: c.color + "20" }}
              >
                <c.icon className="w-5 h-5" style={{ color: c.color }} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{c.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#c9ceda" }}>{c.value}</div>
                <div className="text-xs mt-0.5" style={{ color: c.color }}>{c.desc}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
        >
          <div className="p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
            <Clock className="w-5 h-5 mb-3" style={{ color: "#f4b942" }} />
            <h3 className="font-bold text-white mb-2">Service Hours</h3>
            <p className="text-sm" style={{ color: "#c9ceda" }}>10 AM to Midnight BST</p>
            <p className="text-sm" style={{ color: "#c9ceda" }}>7 days a week, including holidays</p>
            <p className="text-xs mt-3" style={{ color: "#f4b942" }}>WhatsApp response: under 5 minutes</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/10" style={{ backgroundColor: "#151b3d" }}>
            <div className="w-5 h-5 mb-3 text-lg">💳</div>
            <h3 className="font-bold text-white mb-2">Payment Methods</h3>
            <p className="text-sm mb-3" style={{ color: "#c9ceda" }}>We accept all local and international payment methods:</p>
            <PaymentBadges label="" className="justify-start" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl text-center border border-white/10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <p className="font-semibold text-white text-lg mb-2">Ready to place an order?</p>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Tell us which tool you want. We confirm availability, send payment details, and deliver your account — all over WhatsApp.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            <MessageCircle className="w-5 h-5" />
            Start Ordering
          </a>
        </motion.div>
      </section>
    </PageLayout>
  );
}
