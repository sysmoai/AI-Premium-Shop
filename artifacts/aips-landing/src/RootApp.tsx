import { lazy, Suspense } from "react";
import { Router as WouterRouter } from "wouter";
import { ConciergeWidget } from "./components/ConciergeWidget";
import HomepageSkipLink from "./components/homepage/HomepageSkipLink";
import SafeQuarantineApp from "./SafeQuarantineApp";
import { PUBLICATION_STATE } from "./generated/publicationState";

const App = lazy(() => import("./App"));
const HomeV2 = lazy(() => import("./pages/HomeV2"));
const HomepagePremiumShell = lazy(() => import("./components/homepage/HomepagePremiumShell"));
const PlanPage = lazy(() => import("./pages/PlanPage"));

const HOMEPAGE_V2_PREVIEW_PATH = "/__preview/homepage-v2";
const PLAN_PATH = /^\/product\/([^/]+)\/plans\/([^/]+)\/?$/;

function RouteLoadingFallback() {
  return (
    <div
      className="min-h-screen bg-[#07101f]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default function RootApp() {
  if (!PUBLICATION_STATE.publicationAllowed || PUBLICATION_STATE.quarantine) {
    return <SafeQuarantineApp />;
  }

  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const isHomepage = pathname === "/" || pathname === HOMEPAGE_V2_PREVIEW_PATH || pathname === `${HOMEPAGE_V2_PREVIEW_PATH}/`;

  if (isHomepage) {
    return (
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <HomepageSkipLink />
        <Suspense fallback={<RouteLoadingFallback />}>
          <HomepagePremiumShell>
            <HomeV2 />
          </HomepagePremiumShell>
        </Suspense>
        <ConciergeWidget />
      </WouterRouter>
    );
  }

  const match = pathname.match(PLAN_PATH);
  if (match) {
    const [, productSlug, planKey] = match;
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <PlanPage productSlug={decodeURIComponent(productSlug)} planKey={decodeURIComponent(planKey)} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <App />
    </Suspense>
  );
}