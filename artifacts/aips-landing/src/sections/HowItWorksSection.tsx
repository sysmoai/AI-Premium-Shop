import { motion, type Variants } from "framer-motion";
import { ShoppingCart, CreditCard, Package, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const STEPS = [
  {
    number: "01",
    Icon: ShoppingCart,
    title: "Choose Your AI Tool",
    description: "Browse our catalog of 57 premium AI tools and pick the one that fits your work and budget.",
    color: "#f4b942",
    gradientTo: "#f97316",
  },
  {
    number: "02",
    Icon: CreditCard,
    title: "Pay via bKash, Nagad, or Rocket",
    description: "Send payment with local mobile banking. No international card, no PayPal, no hassle.",
    color: "#ec4899",
    gradientTo: "#f97316",
  },
  {
    number: "03",
    Icon: Package,
    title: "Receive Access Fast",
    description: "Shared accounts: 5–30 minutes. Personal accounts: 2–4 hours. Delivery starts after payment confirmation.",
    color: "#3b82f6",
    gradientTo: "#8b5cf6",
  },
  {
    number: "04",
    Icon: MessageCircle,
    title: "Get Support on WhatsApp",
    description: "We respond in under 5 minutes. Free setup help is always included. No extra charge.",
    color: "#10a37f",
    gradientTo: "#06b6d4",
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
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
        >
          {/* Connecting dashes between steps (desktop only) */}
          <div className="absolute top-10 left-0 right-0 hidden lg:flex items-center px-[12.5%]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 mx-4"
                style={{
                  borderTop: "2px dashed rgba(255,255,255,0.15)",
                  marginTop: 0,
                }}
              />
            ))}
          </div>

          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex flex-col items-center text-center relative"
            >
              {/* Circle with icon */}
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center mb-5 z-10"
                style={{
                  background: `linear-gradient(135deg, ${step.color}22, ${step.gradientTo}18)`,
                  border: `2px solid ${step.color}50`,
                  boxShadow: `0 0 24px ${step.color}20`,
                }}
              >
                <step.Icon className="w-8 h-8" style={{ color: step.color }} />
                {/* Step number badge */}
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.gradientTo})`,
                    color: "#0a0e27",
                    boxShadow: `0 2px 8px ${step.color}60`,
                  }}
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
