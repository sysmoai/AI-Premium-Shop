import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ enabled }: { enabled: boolean }) {
  const gaId = import.meta.env.VITE_GA_ID as string | undefined;
  const [location] = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!enabled || !gaId || initialized.current) return;

    const existing = document.querySelector(`script[src*="googletagmanager"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { send_page_view: false });
    initialized.current = true;
  }, [enabled, gaId]);

  useEffect(() => {
    if (!enabled || !gaId || !initialized.current || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [enabled, gaId, location]);

  return null;
}
