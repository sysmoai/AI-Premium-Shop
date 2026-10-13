// Cloudflare Workers with Static Assets — routing layer for AI Premium Shop.
//
// With `run_worker_first = ["/api/*"]` the Worker runs before asset serving
// for /api/* requests and delegates everything else to the assets binding
// (which applies _redirects, _headers, html_handling and not_found_handling).
//
// Security headers are attached here because _headers rules only apply to
// asset responses, not to Worker-produced responses.
import { onRequest as concierge } from "../functions/api/concierge.js";
import { onRequest as feedback } from "../functions/api/feedback.js";
import { onRequest as insights } from "../functions/api/insights.js";

const API_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

const ROUTES = [
  ["/api/concierge", concierge],
  ["/api/feedback", feedback],
  ["/api/insights", insights],
];

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    const route = ROUTES.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`));
    if (!route) return env.ASSETS.fetch(request);

    const response = await route[1]({ request, env, waitUntil: (p) => ctx.waitUntil(p) });
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(API_HEADERS)) {
      if (!headers.has(key)) headers.set(key, value);
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
