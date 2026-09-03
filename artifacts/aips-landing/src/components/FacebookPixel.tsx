import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function FacebookPixel({ enabled }: { enabled: boolean }) {
  const pixelId = import.meta.env.VITE_FB_PIXEL_ID as string | undefined;
  const [location] = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!enabled || !pixelId || initialized.current) return;

    if (!window.fbq) {
      const fbq = function (...args: unknown[]) {
        (fbq as unknown as { q: unknown[] }).q = (fbq as unknown as { q: unknown[] }).q || [];
        (fbq as unknown as { q: unknown[] }).q.push(args);
      };
      (fbq as unknown as { version: string }).version = "2.0";
      (fbq as unknown as { queue: unknown[] }).queue = [];
      window.fbq = fbq as (...args: unknown[]) => void;
      window._fbq = fbq;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      window.fbq("init", pixelId);
    }

    initialized.current = true;
  }, [enabled, pixelId]);

  useEffect(() => {
    if (!enabled || !pixelId || !initialized.current || !window.fbq) return;
    window.fbq("track", "PageView", { path: location });
  }, [enabled, pixelId, location]);

  return null;
}
