import { motion, type Variants } from "framer-motion";
import { ChevronRight, MessageSquare, Image, Video, Music, Code2, Layout, Package, PenTool } from "lucide-react";
import { useLocation } from "wouter";
import categories from "../../data/categories.json";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare,
  Image,
  Video,
  Music,
  Code2,
  Layout,
  Package,
  PenTool,
};

const COLORS = ["#10a37f", "#ec4899", "#8b5cf6", "#f97316", "#06b6d4", "#f4b942", "#6366f1", "#e11d48"];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] } },
};

export function CategorySection() {
  const [, navigate] = useLocation();

  return (
    <section
      id="categories"
      className="py-24 px-4"
      style={{ backgroundColor: "#0a0e27" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#f4b942" }}
          >
            57 Tools
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            Browse by Category
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {categories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] ?? Package;
            const color = COLORS[i % COLORS.length];
            return (
              <motion.a
                key={cat.id}
                href={`/${cat.slug}`}
                onClick={(e) => { e.preventDefault(); navigate(`/${cat.slug}`); }}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: `0 8px 32px ${color}22` }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group rounded-2xl p-5 border border-white/10 flex flex-col gap-3 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: "#151b3d" }}
                data-testid={`category-${cat.id}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: color + "1a", border: `1px solid ${color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-white text-sm leading-snug mb-0.5">
                    {cat.displayName}
                  </div>
                  <div className="text-xs" style={{ color: "#c9ceda" }}>{cat.industrySubtitle}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-white">from ৳{cat.from}</span>
                    <span className="text-xs ml-1.5 px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#c9ceda" }}>
                      {cat.count} {cat.count === 1 ? "tool" : "tools"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color }} />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
