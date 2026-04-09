import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import CategoryPage from "@/pages/CategoryPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import FAQPage from "@/pages/FAQPage";
import PricingPage from "@/pages/PricingPage";
import RefundPolicyPage from "@/pages/RefundPolicyPage";
import TermsPage from "@/pages/TermsPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/ai-assistant">
        {() => <CategoryPage categoryId="ai-assistant" />}
      </Route>
      <Route path="/ai-image">
        {() => <CategoryPage categoryId="ai-image" />}
      </Route>
      <Route path="/ai-video">
        {() => <CategoryPage categoryId="ai-video" />}
      </Route>
      <Route path="/ai-voice-music">
        {() => <CategoryPage categoryId="ai-voice-music" />}
      </Route>
      <Route path="/ai-code">
        {() => <CategoryPage categoryId="ai-code" />}
      </Route>
      <Route path="/ai-workspace">
        {() => <CategoryPage categoryId="ai-workspace" />}
      </Route>
      <Route path="/bundles">
        {() => <CategoryPage categoryId="bundles" />}
      </Route>
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/refund-policy" component={RefundPolicyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
