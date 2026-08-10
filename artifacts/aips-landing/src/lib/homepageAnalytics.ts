export type HomepageAnalyticsEvent =
  | {
      name: "homepage_view";
      publication_mode: string;
      commerce_enabled: boolean;
    }
  | {
      name: "homepage_finder_start";
    }
  | {
      name: "homepage_finder_select_intent";
      intent_id: string;
    }
  | {
      name: "homepage_finder_filter";
      filter_type: "access" | "budget";
      filter_id: string;
    }
  | {
      name: "homepage_recommendation_click";
      placement: "finder" | "popular";
      product_slug: string;
    }
  | {
      name: "homepage_category_click";
      category_id: string;
    }
  | {
      name: "homepage_whatsapp_click";
      placement: "header" | "final_cta";
    }
  | {
      name: "homepage_demo_play";
      media_id: string;
    }
  | {
      name: "homepage_guide_click";
      placement: "finder" | "learning" | "editorial";
      guide_id: string;
    };

export const HOMEPAGE_ANALYTICS_EVENT = "aips:homepage-analytics";

const SAFE_VALUE = /^[a-zA-Z0-9][a-zA-Z0-9._/-]{0,119}$/;

function assertSafeIdentifier(value: string, label: string) {
  if (!SAFE_VALUE.test(value)) {
    throw new Error(`[homepage-analytics] ${label} must be a controlled identifier, not free-form user data`);
  }
}

function validateEvent(event: HomepageAnalyticsEvent) {
  switch (event.name) {
    case "homepage_view":
      assertSafeIdentifier(event.publication_mode, "publication_mode");
      return;
    case "homepage_finder_start":
      return;
    case "homepage_finder_select_intent":
      assertSafeIdentifier(event.intent_id, "intent_id");
      return;
    case "homepage_finder_filter":
      assertSafeIdentifier(event.filter_id, "filter_id");
      return;
    case "homepage_recommendation_click":
      assertSafeIdentifier(event.product_slug, "product_slug");
      return;
    case "homepage_category_click":
      assertSafeIdentifier(event.category_id, "category_id");
      return;
    case "homepage_whatsapp_click":
      return;
    case "homepage_demo_play":
      assertSafeIdentifier(event.media_id, "media_id");
      return;
    case "homepage_guide_click":
      assertSafeIdentifier(event.guide_id, "guide_id");
      return;
  }
}

/**
 * Emits a provider-neutral event inside the browser only. This helper does not
 * install an analytics vendor, make a network request, persist an identifier,
 * read cookies, or accept arbitrary user-entered text. A future analytics
 * integration can subscribe to HOMEPAGE_ANALYTICS_EVENT after its own consent
 * and privacy requirements are satisfied.
 */
export function trackHomepageEvent(event: HomepageAnalyticsEvent) {
  validateEvent(event);
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<HomepageAnalyticsEvent>(HOMEPAGE_ANALYTICS_EVENT, {
      detail: Object.freeze({ ...event }),
    }),
  );
}
