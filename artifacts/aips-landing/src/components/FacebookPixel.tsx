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
      // Mirrors Meta's base snippet: fbevents.js drains `queue` and then
      // installs `callMethod`. A stub that queues anywhere else loads the
      // script but never sends init or events.
      type FbqStub = {
        (...args: unknown[]): void;
        callMethod?: (...args: unknown[]) => void;
        queue: unknown[];
        push: FbqStub;
        loaded: boolean;
        version: string;
      };
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      } as FbqStub;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      window.fbq = fbq;
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
