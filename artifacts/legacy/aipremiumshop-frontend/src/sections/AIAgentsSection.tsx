import { motion } from "framer-motion";
import { ChevronRight, MessageCircle, TrendingUp, Bot, ListChecks, CheckCircle2, Cpu } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";
const SETUP_LINK = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20book%20a%201%3A1%20AI%20Setup%20Session";

const USE_CASES = [
  {
    id: "freelancers",
    label: "Freelancers",
    color: "#10a37f",
    icon: "✍️",
    text: "AI Agents write your proposals, do the research, and deliver first drafts — even while you sleep.",
  },
  {
    id: "students",
    label: "Students",
    color: "#3b82f6",
    icon: "🎓",
    text: "AI Agents find research sources, write summaries, and format citations — autonomously.",
  },
  {
    id: "business",
    label: "Business",
    color: "#f97316",
    icon: "🏢",
    text: "AI Agents reply to customers, process orders, and generate reports — around the clock.",
  },
  {
    id: "developers",
    label: "Developers",
    color: "#8b5cf6",
    icon: "💻",
    text: "Codex and Claude Code understand your entire codebase — they fix bugs and build features on their own.",
  },
];

const PIPELINE = [
  {
    icon: ListChecks,
    title: "You set the goal",
    desc: "Tell the AI what you need — in plain language",
    color: "#3b82f6",
  },
  {
    icon: Cpu,
    title: "AI works autonomously",
    desc: "Researches, writes, codes, emails — 24/7",
    color: "#8b5cf6",
  },
  {
    icon: CheckCircle2,
    title: "You get results",
    desc: "Review finished work. No manual steps.",
    color: "#10a37f",
  },
];

export function AIAgentsSection() {
  return (
    <section
      id="ai-agents"
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #151b3d 0%, #0a0e27 100%)" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 uppercase tracking-widest"
            style={{ borderColor: "rgba(244,185,66,0.4)", color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}
          >
            The 2026 Game Changer
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            AI Agents Now Work<br className="hidden md:block" /> For You — 24/7
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#c9ceda" }}
          >
            This isn't just chat anymore. In 2026, AI researches, codes, sends emails,
            and builds reports — autonomously.
          </motion.p>
        </div>

        {/* Pipeline visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col md:flex-row items-center justify-center gap-0 mb-14"
        >
          {PIPELINE.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col md:flex-row items-center">
                {/* Card */}
                <div
                  className="rounded-2xl p-6 text-center w-64 flex-shrink-0 relative"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: step.color + "18" }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: step.color }}
                  >
                    Step {i + 1}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
                  <p className="text-xs" style={{ color: "#8892a4" }}>{step.desc}</p>
                </div>

                {/* Arrow between cards */}
                {i < PIPELINE.length - 1 && (
                  <div className="flex items-center justify-center px-3 py-4 md:py-0">
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="rotate-90 md:rotate-0 opacity-40">
                      <path d="M0 10 H26 M20 3 L28 10 L20 17" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Use-case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -3, boxShadow: `0 10px 30px ${uc.color}20` }}
              className="rounded-2xl p-5 transition-all duration-300"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderLeft: `4px solid ${uc.color}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                  style={{ backgroundColor: uc.color + "18" }}
                >
                  {uc.icon}
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ color: uc.color, backgroundColor: uc.color + "15" }}
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
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl px-8 py-6 mb-6 flex flex-col sm:flex-row items-center gap-4 justify-center text-center sm:text-left"
          style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          <TrendingUp className="w-8 h-8 flex-shrink-0" style={{ color: "#8b5cf6" }} />
          <p className="text-lg font-semibold text-white">
            Freelancers who use AI earn{" "}
            <span className="text-4xl font-bold" style={{ color: "#f4b942" }}>44%</span>{" "}
            more on average.
          </p>
          <span className="text-xs text-gray-500 italic sm:ml-2 self-end sm:self-center">— Upwork 2025</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
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
            Book a 1:1 AI Setup — BDT 799
          </a>
        </motion.div>
      </div>
    </section>
  );
}
