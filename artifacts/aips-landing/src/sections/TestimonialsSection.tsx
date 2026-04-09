import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Got ChatGPT Plus for just BDT 350. Delivered in 10 minutes. Incredible service.",
    name: "Rafiq",
    role: "Student",
    initials: "R",
    color: "#3b82f6",
  },
  {
    id: 2,
    quote:
      "AI doubled my freelancing income. I buy all my tools from AIPS.",
    name: "Nusrat",
    role: "Freelancer",
    initials: "N",
    color: "#10a37f",
  },
  {
    id: 3,
    quote:
      "Automated our customer support with ChatGPT Business. Game changer.",
    name: "Kamal",
    role: "Business Owner",
    initials: "K",
    color: "#f97316",
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="rounded-2xl p-6 border border-white/10 flex flex-col"
              style={{ backgroundColor: "rgba(10,14,39,0.5)" }}
              data-testid={`testimonial-${t.id}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#f4b942" }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base leading-relaxed mb-6 flex-1" style={{ color: "#e5e7eb" }}>
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: t.color + "25", color: t.color, border: `1px solid ${t.color}50` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: "#c9ceda" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
