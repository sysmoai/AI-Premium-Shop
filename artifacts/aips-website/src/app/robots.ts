export const dynamic = "force-static";

import type { MetadataRoute } from "next";

// This app is archived — see DEPRECATED.md. Its last live deployment
// (aips-website-two.vercel.app) was found still publicly crawlable with no
// robots protection, serving a stale catalog ("118+ tools", "3,000+
// customers" vs the canonical site's current 197/10,000+) — exactly the
// "conflicting indexed versions" risk this file exists to prevent. Disallow
// everything unconditionally: this app should never be crawled, deployed, or
// linked. See docs/agent/BLOCKERS.md B11.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
