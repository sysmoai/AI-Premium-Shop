import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function FacebookPixel({ enabled }: { enabled: boolean }) {
  const pixelId = import.meta.env.VITE_FB_PIXEL_ID as string | undefined;

  useEffect(() => {
    if (!enabled || !pixelId) return;
    if (window.fbq) return;

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

    window.fbq?.("init", pixelId);
    window.fbq?.("track", "PageView");
  }, [enabled, pixelId]);

  return null;
}
