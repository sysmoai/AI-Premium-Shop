import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { FacebookPixel } from "@/components/FacebookPixel";
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
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import GuidePage from "@/pages/GuidePage";
import ComparisonPage from "@/pages/ComparisonPage";
import BudgetPage from "@/pages/BudgetPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import BrandPage from "@/pages/BrandPage";
import SupportPage from "@/pages/SupportPage";
import HowToOrderPage from "@/pages/HowToOrderPage";
import BestAISubscriptionPage from "@/pages/BestAISubscriptionPage";

const WHATSAPP = "https://wa.me/8801865385348?text=Hi%2C%20I%20want%20to%20order%20an%20AI%20subscription";

function MobileOrderBar() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (location === "/contact") return null;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 border-t border-white/10 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ backgroundColor: "#0a0e27" }}
    >
      <div className="flex items-center justify-between px-4 h-14 gap-3">
        <div>
          <div className="text-xs" style={{ color: "#c9ceda" }}>From</div>
          <div className="text-base font-bold" style={{ color: "#f4b942" }}>BDT 350/mo</div>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
          style={{ backgroundColor: "#25d366", color: "#fff", minHeight: "44px" }}
        >
          <MessageCircle className="w-4 h-4" />
          Order Now
        </a>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* Product catalog */}
      <Route path="/products" component={ProductsPage} />

      {/* Category pages */}
      <Route path="/ai-assistant">{() => <CategoryPage categoryId="ai-assistant" />}</Route>
      <Route path="/ai-image">{() => <CategoryPage categoryId="ai-image" />}</Route>
      <Route path="/ai-video">{() => <CategoryPage categoryId="ai-video" />}</Route>
      <Route path="/ai-voice-music">{() => <CategoryPage categoryId="ai-voice-music" />}</Route>
      <Route path="/ai-code">{() => <CategoryPage categoryId="ai-code" />}</Route>
      <Route path="/ai-workspace">{() => <CategoryPage categoryId="ai-workspace" />}</Route>
      <Route path="/ai-writing">{() => <CategoryPage categoryId="ai-writing" />}</Route>
      <Route path="/bundles">{() => <CategoryPage categoryId="bundles" />}</Route>

      {/* Brand pages — ChatGPT */}
      <Route path="/chatgpt-plans-bangladesh">{() => <BrandPage brandSlug="chatgpt-plans-bangladesh" />}</Route>
      <Route path="/chatgpt-plus-bangladesh">{() => <BrandPage brandSlug="chatgpt-plus-bangladesh" />}</Route>
      <Route path="/chatgpt-business-bangladesh">{() => <BrandPage brandSlug="chatgpt-business-bangladesh" />}</Route>
      <Route path="/chatgpt-pro-bangladesh">{() => <BrandPage brandSlug="chatgpt-pro-bangladesh" />}</Route>
      <Route path="/chatgpt-go-bangladesh">{() => <BrandPage brandSlug="chatgpt-go-bangladesh" />}</Route>

      {/* Brand pages — AI Assistants */}
      <Route path="/claude-pro-bangladesh">{() => <BrandPage brandSlug="claude-pro-bangladesh" />}</Route>
      <Route path="/gemini-advanced-bangladesh">{() => <BrandPage brandSlug="gemini-advanced-bangladesh" />}</Route>
      <Route path="/supergrok-bangladesh">{() => <BrandPage brandSlug="supergrok-bangladesh" />}</Route>
      <Route path="/perplexity-pro-bangladesh">{() => <BrandPage brandSlug="perplexity-pro-bangladesh" />}</Route>

      {/* Brand pages — AI Image & Video */}
      <Route path="/midjourney-bangladesh">{() => <BrandPage brandSlug="midjourney-bangladesh" />}</Route>
      <Route path="/ideogram-bangladesh">{() => <BrandPage brandSlug="ideogram-bangladesh" />}</Route>
      <Route path="/runway-bangladesh">{() => <BrandPage brandSlug="runway-bangladesh" />}</Route>
      <Route path="/leonardo-ai-bangladesh">{() => <BrandPage brandSlug="leonardo-ai-bangladesh" />}</Route>
      <Route path="/heygen-bangladesh">{() => <BrandPage brandSlug="heygen-bangladesh" />}</Route>

      {/* Brand pages — AI Voice & Music */}
      <Route path="/elevenlabs-bangladesh">{() => <BrandPage brandSlug="elevenlabs-bangladesh" />}</Route>
      <Route path="/suno-ai-bangladesh">{() => <BrandPage brandSlug="suno-ai-bangladesh" />}</Route>
      <Route path="/udio-bangladesh">{() => <BrandPage brandSlug="udio-bangladesh" />}</Route>

      {/* Brand pages — AI Code & Dev */}
      <Route path="/github-copilot-bangladesh">{() => <BrandPage brandSlug="github-copilot-bangladesh" />}</Route>
      <Route path="/cursor-bangladesh">{() => <BrandPage brandSlug="cursor-bangladesh" />}</Route>
      <Route path="/v0-dev-bangladesh">{() => <BrandPage brandSlug="v0-dev-bangladesh" />}</Route>
      <Route path="/replit-bangladesh">{() => <BrandPage brandSlug="replit-bangladesh" />}</Route>

      {/* Brand pages — AI Workspace */}
      <Route path="/notion-business-bangladesh">{() => <BrandPage brandSlug="notion-business-bangladesh" />}</Route>
      <Route path="/manus-ai-bangladesh">{() => <BrandPage brandSlug="manus-ai-bangladesh" />}</Route>
      <Route path="/otter-ai-bangladesh">{() => <BrandPage brandSlug="otter-ai-bangladesh" />}</Route>
      <Route path="/gamma-bangladesh">{() => <BrandPage brandSlug="gamma-bangladesh" />}</Route>

      {/* Brand pages — AI Writing */}
      <Route path="/writesonic-bangladesh">{() => <BrandPage brandSlug="writesonic-bangladesh" />}</Route>

      {/* Blog */}
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug">{(params) => <BlogPostPage postSlug={params.slug} />}</Route>

      {/* Guide pages */}
      <Route path="/best-ai-for-students">{() => <GuidePage guideKey="students" />}</Route>
      <Route path="/best-ai-for-freelancers">{() => <GuidePage guideKey="freelancers" />}</Route>
      <Route path="/best-ai-for-creators">{() => <GuidePage guideKey="creators" />}</Route>
      <Route path="/best-ai-for-business">{() => <GuidePage guideKey="business" />}</Route>
      <Route path="/best-ai-for-developers">{() => <GuidePage guideKey="developers" />}</Route>
      <Route path="/best-ai-for-job-seekers">{() => <GuidePage guideKey="job-seekers" />}</Route>
      <Route path="/best-ai-for-designers">{() => <GuidePage guideKey="designers" />}</Route>
      <Route path="/best-ai-for-marketers">{() => <GuidePage guideKey="marketers" />}</Route>
      <Route path="/best-ai-for-ecommerce">{() => <GuidePage guideKey="ecommerce" />}</Route>
      <Route path="/best-ai-subscription-2026" component={BestAISubscriptionPage} />

      {/* Comparison pages */}
      <Route path="/chatgpt-vs-claude">{() => <ComparisonPage compKey="chatgpt-vs-claude" />}</Route>
      <Route path="/chatgpt-vs-claude-bangladesh">{() => <ComparisonPage compKey="chatgpt-vs-claude" />}</Route>
      <Route path="/chatgpt-vs-gemini">{() => <ComparisonPage compKey="chatgpt-vs-gemini" />}</Route>
      <Route path="/copilot-vs-cursor">{() => <ComparisonPage compKey="copilot-vs-cursor" />}</Route>
      <Route path="/midjourney-vs-ideogram">{() => <ComparisonPage compKey="midjourney-vs-ideogram" />}</Route>
      <Route path="/chatgpt-plans-comparison-bangladesh">{() => <BrandPage brandSlug="chatgpt-plans-bangladesh" />}</Route>
      <Route path="/google-ai-pro-bangladesh">{() => <BrandPage brandSlug="gemini-advanced-bangladesh" />}</Route>
      <Route path="/best-ai-budget-bangladesh">{() => <BudgetPage budgetKey="ai-under-500" />}</Route>

      {/* Budget pages */}
      <Route path="/ai-under-500">{() => <BudgetPage budgetKey="ai-under-500" />}</Route>
      <Route path="/ai-under-1000">{() => <BudgetPage budgetKey="ai-under-1000" />}</Route>
      <Route path="/ai-under-3000">{() => <BudgetPage budgetKey="ai-under-3000" />}</Route>

      {/* Info pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/how-to-order" component={HowToOrderPage} />
      <Route path="/refund-policy" component={RefundPolicyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [cookieConsent, setCookieConsent] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <Router />
          <MobileOrderBar />
          <CookieBanner onConsent={() => setCookieConsent(true)} />
        </WouterRouter>
        <GoogleAnalytics enabled={cookieConsent} />
        <FacebookPixel enabled={cookieConsent} />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
