import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/8801865385348";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-testid="floating-whatsapp"
      className="fixed bottom-6 right-6 z-50"
      style={{ bottom: 80 }}
    >
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
      `}</style>
    </a>
  );
}
