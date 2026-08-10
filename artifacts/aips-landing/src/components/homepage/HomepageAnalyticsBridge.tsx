import { useEffect } from "react";
import {
  HOMEPAGE_ANALYTICS_EVENT,
  type HomepageAnalyticsEvent,
} from "@/lib/homepageAnalytics";

interface HomepageAnalyticsBridgeProps {
  enabled: boolean;
}

/**
 * Forwards only future Homepage V2 events after cookie consent is enabled.
 * Events emitted before consent stay in-browser and are intentionally not
 * replayed. GoogleAnalytics owns vendor loading/configuration; this bridge only
 * maps the already-validated controlled event payload to gtag when available.
 */
export function HomepageAnalyticsBridge({ enabled }: HomepageAnalyticsBridgeProps) {
  useEffect(() => {
    if (!enabled) return;

    const forward = (event: Event) => {
      const detail = (event as CustomEvent<HomepageAnalyticsEvent>).detail;
      if (!detail || typeof window.gtag !== "function") return;

      const { name, ...parameters } = detail;
      window.gtag("event", name, parameters);
    };

    window.addEventListener(HOMEPAGE_ANALYTICS_EVENT, forward);
    return () => window.removeEventListener(HOMEPAGE_ANALYTICS_EVENT, forward);
  }, [enabled]);

  return null;
}
