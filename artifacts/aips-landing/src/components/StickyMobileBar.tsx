import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

interface StickyMobileBarProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export function StickyMobileBar({ heroRef }: StickyMobileBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-white/10"
          style={{ backgroundColor: "#0a0e27" }}
          data-testid="sticky-mobile-bar"
        >
          <div className="flex items-center justify-between px-4 py-3 gap-4">
            <div>
              <div className="text-xs" style={{ color: "#c9ceda" }}>AI tools starting from</div>
              <div className="text-lg font-semibold text-white">৳350/month</div>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap"
            >
              Order Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
