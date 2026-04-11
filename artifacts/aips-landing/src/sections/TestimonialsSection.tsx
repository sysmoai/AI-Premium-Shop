import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Got ChatGPT Plus for just BDT 350. Delivered in 10 minutes. Incredible service.",
    name: "Rafiq",
    role: "Student",
    initials: "R",
    gradientFrom: "#3b82f6",
    gradientTo: "#8b5cf6",
    borderColor: "#3b82f6",
    avatarClass: "bg-gradient-to-br from-blue-500 to-indigo-600",
    pillClass: "bg-blue-500/20 text-blue-400",
  },
  {
    id: 2,
    quote: "AI doubled my freelancing income. I buy all my tools from AIPS.",
    name: "Nusrat",
    role: "Freelancer",
    initials: "N",
    gradientFrom: "#10a37f",
    gradientTo: "#06b6d4",
    borderColor: "#10a37f",
    avatarClass: "bg-gradient-to-br from-emerald-500 to-teal-600",
    pillClass: "bg-emerald-500/20 text-emerald-400",
  },
  {
    id: 3,
    quote: "Automated our customer support with ChatGPT Business. Game changer.",
    name: "Kamal",
    role: "Business Owner",
    initials: "K",
    gradientFrom: "#f59e0b",
    gradientTo: "#ca8a04",
    borderColor: "#f59e0b",
    avatarClass: "bg-gradient-to-br from-amber-500 to-yellow-600",
    pillClass: "bg-amber-500/20 text-amber-400",
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

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
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
            Customer Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            Trusted by 1,200+ Customers Across Bangladesh
          </motion.h2>
        </div>

        {/* Mobile: horizontal snap scroll; Desktop: grid */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(244,185,66,0.12)` }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-[#f4b942]/20 flex flex-col flex-shrink-0 snap-center md:flex-shrink transition-all duration-300"
              style={{
                borderLeft: `3px solid ${t.borderColor}`,
                minWidth: 280,
              }}
              data-testid={`testimonial-${t.id}`}
            >
              {/* Large quote mark */}
              <div
                className="absolute top-2 left-4 text-6xl font-serif select-none pointer-events-none leading-none"
                style={{ color: "rgba(244,185,66,0.15)" }}
                aria-hidden="true"
              >"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#f4b942" }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base italic leading-relaxed mb-6 flex-1 relative z-10 text-gray-300">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white ${t.avatarClass}`}
                  style={{ boxShadow: `0 0 14px ${t.gradientFrom}50` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm flex items-center flex-wrap gap-1">
                    {t.name}
                    <span className={`${t.pillClass} px-2 py-0.5 rounded-full text-[10px] font-medium`}>{t.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-center mt-6"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Names changed for privacy. Real customer feedback.
        </motion.p>
      </div>
    </section>
  );
}
