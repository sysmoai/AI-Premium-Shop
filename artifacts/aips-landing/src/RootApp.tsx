import App from "./App";
import HomeV2 from "./pages/HomeV2";
import PlanPage from "./pages/PlanPage";
import SafeQuarantineApp from "./SafeQuarantineApp";
import { PUBLICATION_STATE } from "./generated/publicationState";

const HOMEPAGE_V2_PREVIEW_PATH = "/__preview/homepage-v2";
const PLAN_PATH = /^\/product\/([^/]+)\/plans\/([^/]+)\/?$/;

export default function RootApp() {
  if (!PUBLICATION_STATE.publicationAllowed || PUBLICATION_STATE.quarantine) {
    return <SafeQuarantineApp />;
  }

  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;

  if (pathname === HOMEPAGE_V2_PREVIEW_PATH || pathname === `${HOMEPAGE_V2_PREVIEW_PATH}/`) {
    return <HomeV2 />;
  }

  const match = pathname.match(PLAN_PATH);
  if (match) {
    const [, productSlug, planKey] = match;
    return <PlanPage productSlug={decodeURIComponent(productSlug)} planKey={decodeURIComponent(planKey)} />;
  }

  return <App />;
}
