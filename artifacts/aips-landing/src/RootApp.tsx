import App from "./App";
import PlanPage from "./pages/PlanPage";
import SafeQuarantineApp from "./SafeQuarantineApp";
import { PUBLICATION_STATE } from "./generated/publicationState";

const PLAN_PATH = /^\/product\/([^/]+)\/plans\/([^/]+)\/?$/;

export default function RootApp() {
  if (!PUBLICATION_STATE.publicationAllowed || PUBLICATION_STATE.quarantine) {
    return <SafeQuarantineApp />;
  }

  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const match = pathname.match(PLAN_PATH);

  if (match) {
    const [, productSlug, planKey] = match;
    return <PlanPage productSlug={decodeURIComponent(productSlug)} planKey={decodeURIComponent(planKey)} />;
  }

  return <App />;
}
