import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Facebook, Instagram, Linkedin, Mail, Clock, CheckCircle } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumb } from "@/components/Breadcrumb";
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

const AI_TOOLS = [
  "ChatGPT Plus / Pro",
  "Claude Pro",
  "Google AI Pro",
  "Midjourney",
  "GitHub Copilot",
  "Cursor Pro",
  "ElevenLabs",
  "Suno AI",
  "Runway",
  "Notion Business",
  "Other / Not sure",
];

const INQUIRY_TYPES = ["Order Inquiry", "Technical Support", "Bundle Pricing", "General Question", "Partnership"];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    tool: "",
    inquiry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `New contact form submission:\n\nName: ${form.name}\nPhone: ${form.phone}\nTool interested in: ${form.tool}\nInquiry type: ${form.inquiry}\nMessage: ${form.message}`;
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <SEOHead
        title="Contact AI Premium Shop — WhatsApp Order | bKash &amp; Nagad"
        description="Contact AI Premium Shop on WhatsApp +880 1865-385348. Under 5-min response. 10AM-Midnight, 7 days a week."
        canonical="https://aipremiumshop.com/contact"
      />
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />

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

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-6 md:p-8 rounded-2xl border border-white/10"
          style={{ backgroundColor: "#151b3d" }}
        >
          <h2 className="text-xl font-bold text-white mb-2">Send us a message</h2>
          <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
            Fill out the form and we&apos;ll open WhatsApp with your message pre-filled. Or just message us directly.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "#25d366" }} />
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp opened!</h3>
              <p className="text-sm mb-6" style={{ color: "#c9ceda" }}>
                Your message has been pre-filled. Just tap Send in WhatsApp and we&apos;ll reply within 5 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ color: "#f4b942" }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Your Name <span style={{ color: "#f4b942" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahim Hossain"
                    className="w-full rounded-xl px-4 py-3 text-sm border border-white/10 focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ backgroundColor: "#0a0e27", color: "#fff" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Phone / WhatsApp <span style={{ color: "#f4b942" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 01700-000000"
                    className="w-full rounded-xl px-4 py-3 text-sm border border-white/10 focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ backgroundColor: "#0a0e27", color: "#fff" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">AI Tool Interested In</label>
                  <select
                    name="tool"
                    value={form.tool}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-sm border border-white/10 focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ backgroundColor: "#0a0e27", color: form.tool ? "#fff" : "#c9ceda" }}
                  >
                    <option value="" style={{ color: "#c9ceda" }}>Select a tool (optional)</option>
                    {AI_TOOLS.map((t) => (
                      <option key={t} value={t} style={{ color: "#fff" }}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">
                    Inquiry Type <span style={{ color: "#f4b942" }}>*</span>
                  </label>
                  <select
                    name="inquiry"
                    required
                    value={form.inquiry}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-sm border border-white/10 focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ backgroundColor: "#0a0e27", color: form.inquiry ? "#fff" : "#c9ceda" }}
                  >
                    <option value="" style={{ color: "#c9ceda" }}>Select inquiry type</option>
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t} style={{ color: "#fff" }}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Message <span style={{ color: "#f4b942" }}>*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need — which tool, how you'll use it, any questions about pricing or setup..."
                  className="w-full rounded-xl px-4 py-3 text-sm border border-white/10 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  style={{ backgroundColor: "#0a0e27", color: "#fff" }}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#25d366", color: "#fff", minHeight: "52px" }}
              >
                <MessageCircle className="w-5 h-5" />
                Send via WhatsApp
              </button>
              <p className="text-xs text-center" style={{ color: "#c9ceda" }}>
                This will open WhatsApp with your message pre-filled. We respond in under 5 minutes.
              </p>
            </form>
          )}
        </motion.div>

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
      </section>
    </PageLayout>
  );
}
