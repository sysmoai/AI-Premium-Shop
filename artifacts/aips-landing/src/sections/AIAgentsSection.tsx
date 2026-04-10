import { motion } from "framer-motion";
import { ChevronRight, MessageCircle, TrendingUp, Bot } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";
const SETUP_LINK = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20book%20a%201%3A1%20AI%20Setup%20Session";

const USE_CASES = [
  {
    id: "freelancers",
    label: "Freelancers",
    color: "#10a37f",
    text: "AI Agents write your proposals, do the research, and deliver first drafts — even while you sleep.",
  },
  {
    id: "students",
    label: "Students",
    color: "#3b82f6",
    text: "AI Agents find research sources, write summaries, and format citations — autonomously.",
  },
  {
    id: "business",
    label: "Business",
    color: "#f97316",
    text: "AI Agents reply to customers, process orders, and generate reports — around the clock.",
  },
  {
    id: "developers",
    label: "Developers",
    color: "#8b5cf6",
    text: "Codex and Claude Code understand your entire codebase — they fix bugs and build features on their own.",
  },
];

export function AIAgentsSection() {
  return (
    <section
      id="ai-agents"
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #151b3d 0%, #0a0e27 100%)" }}
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ borderColor: "rgba(244,185,66,0.4)", color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}
          >
            The 2026 Game Changer
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold text-white mb-4"
          >
            AI Agents Now Work For You — 24/7
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#c9ceda" }}
          >
            This isn't just chat anymore. In 2026, AI researches, codes, sends emails,
            and builds reports — autonomously.
          </motion.p>
        </div>

        {/* Use case cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0 mb-12">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -4, boxShadow: `0 8px 28px ${uc.color}25` }}
              className="group rounded-2xl p-5 flex-shrink-0 snap-center border border-white/10 transition-all duration-300"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                minWidth: 240,
                borderLeft: `3px solid ${uc.color}`,
              }}
            >
              {/* Bot icon + label */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: uc.color + "18" }}
                >
                  <Bot className="w-4 h-4" style={{ color: uc.color }} />
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ color: uc.color, backgroundColor: uc.color + "18" }}
                >
                  {uc.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#c9ceda" }}>
                {uc.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stat banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 mb-10 border"
          style={{
            backgroundColor: "rgba(139,92,246,0.07)",
            borderColor: "rgba(139,92,246,0.3)",
            borderLeft: "4px solid #8b5cf6",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center text-center sm:text-left">
            <TrendingUp className="w-8 h-8 flex-shrink-0" style={{ color: "#8b5cf6" }} />
            <div>
              <p className="text-lg font-semibold text-white">
                Freelancers who use AI earn{" "}
                <span style={{ color: "#f4b942", fontSize: "1.4em" }}>44%</span>{" "}
                more on average.
              </p>
              <p className="text-sm" style={{ color: "#c9ceda" }}>— Upwork 2025 Report</p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-cta px-7 py-3.5 rounded-xl text-sm inline-flex items-center justify-center gap-2"
          >
            Explore AI Agent Tools
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href={SETUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta px-7 py-3.5 rounded-xl text-sm inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Book a 1:1 AI Setup Session — BDT 799
          </a>
        </motion.div>
      </div>
    </section>
  );
}
