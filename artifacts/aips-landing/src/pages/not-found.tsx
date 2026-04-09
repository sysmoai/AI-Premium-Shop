import { motion, type Variants } from "framer-motion";
import { MessageCircle, Home, Package, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";

const WHATSAPP = "https://wa.me/8801865385348";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1, ease: [0, 0, 0.2, 1] } }),
};

export default function NotFound() {
  return (
    <PageLayout>
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="text-8xl font-black mb-6"
            style={{ color: "#f4b942", letterSpacing: "-0.04em" }}>
            404
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-2xl md:text-3xl font-bold text-white mb-3">
            Page Not Found
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-8" style={{ color: "#c9ceda" }}>
            The page you're looking for doesn't exist or has moved.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
            <Link href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">
              <Package className="w-4 h-4" />
              Browse All Products
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25d366", color: "#fff" }}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-12 p-6 rounded-2xl border border-white/10 text-left"
            style={{ backgroundColor: "#151b3d" }}>
            <p className="text-sm font-semibold text-white mb-3">Popular pages</p>
            <div className="space-y-2">
              {[
                { label: "ChatGPT Plus from BDT 350", href: "/ai-assistant" },
                { label: "All AI Tools", href: "/products" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQ", href: "/faq" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="flex items-center justify-between py-1.5 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: "#c9ceda" }}>
                  {l.label}
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: "#f4b942" }} />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
