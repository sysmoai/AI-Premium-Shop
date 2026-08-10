import App from "./App";
import PlanPage from "./pages/PlanPage";

const PLAN_PATH = /^\/product\/([^/]+)\/plans\/([^/]+)\/?$/;

export default function RootApp() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const match = pathname.match(PLAN_PATH);

  if (match) {
    const [, productSlug, planKey] = match;
    return <PlanPage productSlug={decodeURIComponent(productSlug)} planKey={decodeURIComponent(planKey)} />;
  }

  return <App />;
}
