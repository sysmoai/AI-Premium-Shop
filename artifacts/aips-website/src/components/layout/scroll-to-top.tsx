"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 flex size-11 items-center justify-center rounded-full bg-white/[0.06] text-[#8a91a8] shadow-lg shadow-black/20 backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.1] hover:text-white hover:border-white/[0.15]"
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-5" />
    </button>
  );
}
