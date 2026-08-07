import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MIN_PRICE } from "@/lib/catalogStats";
import {
  GraduationCap,
  Laptop,
  Video,
  Briefcase,
  Search,
  Code2,
  ChevronRight,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  StudentStorySVG,
  FreelancerStorySVG,
  BusinessStorySVG,
  JobSeekerStorySVG,
  DeveloperStorySVG,
  CreatorStorySVG,
} from "@/components/illustrations";

const CARDS = [
  {
    id: "students",
    Icon: GraduationCap,
    SvgComp: StudentStorySVG,
    headline: "Falling Behind in Your Studies?",
    color: "#3b82f6",
    gradientTo: "#8b5cf6",
    stripClass: "bg-gradient-to-r from-blue-500 to-purple-500",
    pains: [
      "Assignment deadlines keep slipping",
      "Research papers are overwhelming — especially in English",
      "Exam prep feels scattered and disorganized",
    ],
    solution:
      "Use AI to understand difficult topics, organize research and improve your own drafts.",
    price: `From BDT ${MIN_PRICE}/mo`,
    cta: "See Student Solutions",
    href: "/best-ai-for-students",
  },
  {
    id: "freelancers",
    Icon: Laptop,
    SvgComp: FreelancerStorySVG,
    headline: "No Clients? Slow Deliveries?",
    color: "#10a37f",
    gradientTo: "#20b2aa",
    stripClass: "bg-gradient-to-r from-emerald-500 to-teal-500",
    pains: [
      "Can't write proposals that win on Upwork or Fiverr",
      "Takes 2–3 days to deliver — competitors do it in 2 hours",
      "No international card to buy premium AI tools",
    ],
    solution:
      "Draft proposals, research client industries and build repeatable delivery workflows. Pay with bKash.",
    price: `From BDT ${MIN_PRICE}/mo`,
    cta: "See Freelancer Solutions",
    href: "/best-ai-for-freelancers",
  },
  {
    id: "creators",
    Icon: Video,
    SvgComp: CreatorStorySVG,
    headline: "Out of Ideas? Tired of Editing?",
    color: "#ec4899",
    gradientTo: "#f97316",
    stripClass: "bg-gradient-to-r from-pink-500 to-orange-500",
    pains: [
      "Script writing eats hours of your day",
      "Hiring designers for every thumbnail gets expensive",
      "Background music keeps getting copyright strikes",
    ],
    solution:
      "Plan scripts, design thumbnail concepts, generate media and repurpose content faster.",
    price: `From BDT ${MIN_PRICE}/mo`,
    cta: "See Creator Solutions",
    href: "/best-ai-for-creators",
  },
  {
    id: "business",
    Icon: Briefcase,
    SvgComp: BusinessStorySVG,
    headline: "Still Doing Everything Manually?",
    color: "#f97316",
    gradientTo: "#f4b942",
    stripClass: "bg-gradient-to-r from-amber-500 to-orange-500",
    pains: [
      "Slow customer replies are costing you sales",
      "Marketing content costs lakhs at agencies",
      "You're burning out trying to manage everything alone",
    ],
    solution:
      "Reduce repetitive support, content and reporting work with controlled AI workflows — human review stays in the loop.",
    price: "From BDT 500/mo",
    cta: "See Business Solutions",
    href: "/best-ai-for-business",
  },
  {
    id: "jobseekers",
    Icon: Search,
    SvgComp: JobSeekerStorySVG,
    headline: "Not Getting Hired?",
    color: "#8b5cf6",
    gradientTo: "#6366f1",
    stripClass: "bg-gradient-to-r from-indigo-500 to-purple-500",
    pains: [
      "Your CV isn't getting shortlisted",
      "Interview nerves are holding you back",
      "Not sure which skills to learn in the AI era",
    ],
    solution:
      "Improve your CV, practice interviews and build an evidence-based skill roadmap.",
    price: `From BDT ${MIN_PRICE}/mo`,
    cta: "See Job Seeker Solutions",
    href: "/best-ai-for-job-seekers",
  },
  {
    id: "developers",
    Icon: Code2,
    SvgComp: DeveloperStorySVG,
    headline: "Coding Until 3 AM?",
    color: "#06b6d4",
    gradientTo: "#8b5cf6",
    stripClass: "bg-gradient-to-r from-purple-500 to-pink-500",
    pains: [
      "Hours lost debugging",
      "Client project deadlines keep slipping",
      "No time to learn new frameworks",
    ],
    solution:
      "Generate boilerplate, investigate bugs and review code with AI — human verification before you ship.",
    price: "From BDT 1,495/mo",
    cta: "See Developer Solutions",
    href: "/best-ai-for-developers",
  },
];

export function PainPointSection() {
  const [, navigate] = useLocation();
  // No global MotionConfig(reducedMotion="user") exists in this app yet, so each
  // section that wants to honour the OS setting checks it itself. This also
  // gates the six story SVGs' native SMIL animations below, which CSS/Framer
  // settings can't reach.
  const reduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.07 } },
  };

  const cardVariants: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
      };

  return (
    <section
      id="pain-points"
      className="py-24 px-4"
      style={{ backgroundColor: "#0a0e27" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#f4b942" }}
          >
            Find Your Solution
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold text-white mb-3"
          >
            Every Problem Has an AI Solution
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg"
            style={{ color: "#c9ceda" }}
          >
            Find yours below.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={reduced ? undefined : { y: -5, boxShadow: `0 0 32px ${card.color}22` }}
              transition={reduced ? undefined : { type: "spring", stiffness: 280, damping: 22 }}
              className="group relative rounded-2xl flex flex-col border border-white/10 motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-xl overflow-hidden"
              style={{ backgroundColor: "#151b3d" }}
              data-testid={`pain-card-${card.id}`}
            >
              {/* Gradient top strip */}
              <div className={`h-1 w-full flex-shrink-0 ${card.stripClass}`} />

              {/* Illustration strip */}
              <div className="w-full flex items-center justify-center py-3" style={{ backgroundColor: "#0a0e27" }}>
                <card.SvgComp reduced={!!reduced} />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: `1.5px solid ${card.color}55`, inset: 0 }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: card.color + "1a", border: `1px solid ${card.color}40` }}
                >
                  <card.Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                  {card.headline}
                </h3>

                <ul className="space-y-2 mb-5">
                  {card.pains.map((pain) => (
                    <li key={pain} className="flex items-start gap-2 text-sm" style={{ color: "#c9ceda" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: card.color }} />
                      {pain}
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-xl px-4 py-3 mb-5 text-sm leading-relaxed"
                  style={{ backgroundColor: card.color + "12", borderLeft: `3px solid ${card.color}` }}
                >
                  <span className="font-semibold text-white">Solution: </span>
                  <span style={{ color: "#c9ceda" }}>{card.solution}</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "rgba(244,185,66,0.1)", color: "#f4b942" }}
                  >
                    {card.price}
                  </span>
                  <a
                    href={card.href}
                    onClick={(e) => { e.preventDefault(); navigate(card.href); }}
                    className="text-sm font-medium flex items-center gap-1 transition-colors"
                    style={{ color: card.color }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {card.cta}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
