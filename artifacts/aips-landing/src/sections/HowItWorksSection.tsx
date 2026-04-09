import { motion, type Variants } from "framer-motion";
import { Search, CreditCard, Package, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const STEPS = [
  {
    number: "01",
    Icon: Search,
    title: "Choose Your AI Tool",
    description: "Browse our catalog of 49 premium AI tools and pick the one that fits your work and budget.",
    color: "#f4b942",
  },
  {
    number: "02",
    Icon: CreditCard,
    title: "Pay via bKash, Nagad, or Rocket",
    description: "Send payment with local mobile banking. No international card, no PayPal, no hassle.",
    color: "#10a37f",
  },
  {
    number: "03",
    Icon: Package,
    title: "Receive Access Fast",
    description: "Shared accounts: 5–30 minutes. Personal accounts: 2–4 hours. Delivery starts after payment confirmation.",
    color: "#3b82f6",
  },
  {
    number: "04",
    Icon: MessageCircle,
    title: "Get Support on WhatsApp",
    description: "We respond in under 5 minutes. Free setup help is always included. No extra charge.",
    color: "#ec4899",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
};

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4"
      style={{ backgroundColor: "#0a0e27" }}
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
            How to Order
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: step.color + "18", border: `1px solid ${step.color}45` }}
              >
                <step.Icon className="w-7 h-7" style={{ color: step.color }} />
                <div
                  className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: step.color, color: "#0a0e27" }}
                >
                  {step.number}
                </div>
              </div>
              <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="how-it-works-cta"
            className="btn-cta glow-cta px-10 py-4 rounded-xl text-base inline-flex items-center gap-2.5 font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
