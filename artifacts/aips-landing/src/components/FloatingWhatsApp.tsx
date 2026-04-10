import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-testid="floating-whatsapp"
      className="fixed z-50 flex items-center gap-3"
      style={{ bottom: 84, right: 24 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-lg"
            style={{ backgroundColor: "#25d366", color: "#fff" }}
          >
            Chat with us
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <span
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "#25d366",
            animation: "whatsapp-pulse 2s ease-out infinite",
          }}
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
          style={{ backgroundColor: "#25d366" }}
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </motion.div>
      </div>

      <style>{`
        @keyframes whatsapp-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-pulse { animation: none !important; }
        }
      `}</style>
    </a>
  );
}
