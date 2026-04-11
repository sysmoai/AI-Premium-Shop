import { motion, type Variants } from "framer-motion";
import { Zap, CreditCard, Shield, GraduationCap } from "lucide-react";

const COMPARISON = [
  { tool: "ChatGPT Plus", direct: "BDT 2,990/mo", aips: "BDT 350/mo", save: "88%" },
  { tool: "Google AI Pro", direct: "BDT 2,990/mo", aips: "BDT 500/mo", save: "83%" },
  { tool: "Notion Business", direct: "BDT 2,990/mo", aips: "BDT 800/mo", save: "73%" },
];

const PILLARS = [
  {
    Icon: Zap,
    title: "Instant Delivery",
    description: "Shared: 5–30 min. Personal: 2–4 hours.",
    color: "#f4b942",
  },
  {
    Icon: CreditCard,
    title: "Local Payment",
    description: "bKash, Nagad, Rocket, Bank Transfer, Binance. No international card.",
    color: "#10a37f",
  },
  {
    Icon: Shield,
    title: "30-Day Warranty",
    description: "Any issue? We replace it. No questions asked.",
    color: "#3b82f6",
  },
  {
    Icon: GraduationCap,
    title: "1:1 AI Coaching",
    description: "We don't just sell tools. We teach you how to use them. BDT 799/hr.",
    color: "#ec4899",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] } },
};

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="py-24 px-4"
      style={{ backgroundColor: "#151b3d" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#f4b942" }}
          >
            Why AIPS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            Why 1,200+ Customers Choose Us
          </motion.h2>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 rounded-2xl overflow-hidden border border-white/10"
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <th className="text-left px-5 py-4 font-semibold text-white">Tool</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "#c9ceda" }}>Direct Purchase</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "#f4b942" }}>With AIPS</th>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: "#10a37f" }}>You Save</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.tool}
                  style={{ backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}
                  className="border-t border-white/10"
                >
                  <td className="px-5 py-4 font-medium text-white">{row.tool}</td>
                  <td className="px-5 py-4 text-red-400 line-through">{row.direct}</td>
                  <td className="px-5 py-4 text-amber-400 text-lg font-bold">{row.aips}</td>
                  <td className="px-5 py-4">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-sm font-bold">
                      {row.save}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="px-5 py-4 text-sm border-t border-white/10"
            style={{ backgroundColor: "rgba(255,255,255,0.02)", color: "#c9ceda" }}
          >
            No international credit card needed. Pay with bKash or Nagad. Delivered in minutes.
          </div>
        </motion.div>

        {/* 4 value pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={itemVariants}
              className="rounded-2xl p-5 border border-white/10 flex items-start gap-4"
              style={{ backgroundColor: "rgba(10,14,39,0.5)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: pillar.color + "1a" }}
              >
                <pillar.Icon className="w-5 h-5" style={{ color: pillar.color }} />
              </div>
              <div>
                <div className="font-semibold text-white mb-1">{pillar.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>{pillar.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Differentiator text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center rounded-2xl py-8 px-8 border"
          style={{ backgroundColor: "rgba(244,185,66,0.04)", borderColor: "rgba(244,185,66,0.2)" }}
        >
          <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "#c9ceda" }}>
            Other sellers just hand you a login.{" "}
            <span style={{ color: "#f4b942" }}>
              We give you the tool, the training, and the workflow.
            </span>{" "}
            Buying AI without knowing how to use it is a waste of money. We set it up for YOUR work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
