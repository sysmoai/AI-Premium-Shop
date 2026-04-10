import { useEffect, useState, useRef, forwardRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MessageCircle, ChevronRight, Star, Users, Calendar, Shield } from "lucide-react";
import { PaymentBadges } from "@/components/PaymentBadges";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

const ROTATING_LINES = [
  { problem: "Assignment deadline?", solution: "AI finishes it in 30 minutes" },
  { problem: "No clients on Upwork?", solution: "AI writes winning proposals in 2 minutes" },
  { problem: "Content creation burnout?", solution: "AI makes you 10x faster" },
  { problem: "Running your business alone?", solution: "AI Agents handle it 24/7" },
  { problem: "Can't land a job?", solution: "AI builds your CV and preps your interview" },
  { problem: "Coding all night?", solution: "AI Copilot writes 50% of your code" },
];

function useCountUp(target: number, duration = 2000, enabled = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);
  return count;
}

function TrustBadge({
  icon: Icon,
  label,
  staticValue,
  countTo,
  suffix,
}: {
  icon: React.ElementType;
  label: string;
  staticValue?: string;
  countTo?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(countTo ?? 0, 2000, !!(countTo && inView));

  return (
    <div ref={ref} className="card-glass rounded-xl py-4 px-4 text-center">
      <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: "#f4b942" }} />
      <div className="text-base font-semibold text-white">
        {countTo
          ? `${count.toLocaleString()}${suffix ?? "+"}`
          : staticValue}
      </div>
      <div className="text-xs mt-0.5" style={{ color: "#c9ceda" }}>{label}</div>
    </div>
  );
}

export const HeroSection = forwardRef<HTMLElement>((_, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % ROTATING_LINES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-28 pb-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0e27 0%, #151b3d 50%, #0a0e27 100%)" }}
    >
      {/* Animated dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPositionY: ["0px", "28px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, rgba(0,0,0,0.6) 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, rgba(0,0,0,0.6) 85%, transparent 100%)",
        }}
      />

      {/* Aurora animated glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl hero-glow-1"
          style={{ background: "radial-gradient(ellipse, rgba(244,185,66,0.09) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl hero-glow-2"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl hero-glow-3"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-2/3 right-1/3 w-56 h-56 rounded-full blur-3xl hero-glow-4"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Trust pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-medium"
          style={{ borderColor: "rgba(244,185,66,0.4)", color: "#f4b942", backgroundColor: "rgba(244,185,66,0.08)" }}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Trusted by 1,200+ customers since 2022
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6"
          style={{ letterSpacing: "-0.02em" }}
        >
          What Takes You 3 Hours —<br className="hidden sm:block" />
          <span style={{ color: "#ffffff" }}> AI Does in 15 Minutes.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: "#c9ceda" }}
        >
          57 premium AI tools. Local payment via bKash and Nagad.
          Starting at just <strong className="text-white">BDT 350/month.</strong>
        </motion.p>

        {/* Animated rotating text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-14 flex items-center justify-center mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-base md:text-lg"
            >
              <span className="font-medium" style={{ color: "#c9ceda" }}>
                {ROTATING_LINES[activeIndex].problem}
              </span>
              <span className="text-white/40">→</span>
              <span
                className="font-semibold px-3 py-1 rounded-lg"
                style={{ color: "#f4b942", backgroundColor: "rgba(244,185,66,0.1)" }}
              >
                {ROTATING_LINES[activeIndex].solution}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-primary"
            className="btn-cta glow-cta px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5" />
            Order on WhatsApp
          </a>
          <a
            href="#pain-points"
            data-testid="hero-cta-secondary"
            className="btn-ghost-cta px-8 py-4 rounded-xl text-base flex items-center gap-2"
          >
            Which AI is right for me?
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Payment badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex justify-center"
        >
          <PaymentBadges label="Pay with" className="justify-center" />
        </motion.div>
      </div>

      {/* Trust badges bar with count-up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="relative z-10 mt-16 w-full max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <TrustBadge icon={Users} label="Customers" countTo={1200} suffix="+" />
          <TrustBadge icon={Calendar} label="Established" staticValue="Since 2022" />
          <TrustBadge icon={Shield} label="Warranty" countTo={30} suffix=" Days" />
          <TrustBadge icon={MessageCircle} label="Response" staticValue="5-Min" />
        </div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
