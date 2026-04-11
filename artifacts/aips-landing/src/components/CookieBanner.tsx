import { useState, useEffect } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "cookie_consent";

interface CookieBannerProps {
  onConsent: () => void;
}

export function CookieBanner({ onConsent }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    } else {
      onConsent();
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
    onConsent();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-8 gap-4"
      style={{
        backgroundColor: "#151b3d",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        height: "52px",
      }}
    >
      <span className="text-xs flex-1 truncate" style={{ color: "#c9ceda" }}>
        We use cookies to improve your experience.
      </span>
      <div className="flex items-center gap-3 flex-shrink-0">
        <Link href="/privacy-policy" className="text-xs hover:text-white transition-colors" style={{ color: "#c9ceda" }}>
          Privacy Policy
        </Link>
        <button
          onClick={accept}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#f4b942", color: "#0a0e27" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
