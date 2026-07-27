import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useBottomSafe } from "@/components/BottomSafeContext";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { offset } = useBottomSafe();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  const bottom = offset + 12;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed right-4 z-40 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 shadow-lg transition-all flex items-center justify-center md:bottom-20"
      style={{ bottom: bottom }}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
