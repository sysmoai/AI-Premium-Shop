import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ enabled }: { enabled: boolean }) {
  const gaId = import.meta.env.VITE_GA_ID as string | undefined;

  useEffect(() => {
    if (!enabled || !gaId) return;

    const existing = document.querySelector(`script[src*="googletagmanager"]`);
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { page_path: window.location.pathname });
  }, [enabled, gaId]);

  return null;
}
