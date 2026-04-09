import { motion } from "framer-motion";
import { ChevronRight, MessageCircle, TrendingUp } from "lucide-react";

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
      className="py-24 px-4"
      style={{ background: "linear-gradient(135deg, #151b3d 0%, #0a0e27 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
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

        {/* Use case cards — horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0 mb-12">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="rounded-2xl p-6 flex-shrink-0 snap-center border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", minWidth: 260 }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-3 px-2.5 py-1 rounded-full inline-block"
                style={{ color: uc.color, backgroundColor: uc.color + "18" }}
              >
                {uc.label}
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
          className="rounded-2xl p-6 mb-10 text-center border"
          style={{ backgroundColor: "rgba(244,185,66,0.05)", borderColor: "rgba(244,185,66,0.2)" }}
        >
          <TrendingUp className="w-6 h-6 mx-auto mb-3" style={{ color: "#f4b942" }} />
          <p className="text-lg font-semibold text-white mb-1">
            "Freelancers who use AI earn 44% more on average."
          </p>
          <p className="text-sm" style={{ color: "#c9ceda" }}>— Upwork 2025 Report</p>
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
