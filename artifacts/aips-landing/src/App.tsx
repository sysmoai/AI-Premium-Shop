import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieBanner } from "@/components/CookieBanner";
import { BRAND_PAGE_SLUGS } from "@/lib/productRoutes";
import { ConciergeWidget } from "@/components/ConciergeWidget";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { FacebookPixel } from "@/components/FacebookPixel";
// Home and NotFound stay eagerly imported: Home is the landing route for most
// visitors, so code-splitting it would only delay first paint. Every other page
// is lazy-loaded so the initial bundle no longer ships all 26 pages at once.
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const RefundPolicyPage = lazy(() => import("@/pages/RefundPolicyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const GuidePage = lazy(() => import("@/pages/GuidePage"));
const ComparisonPage = lazy(() => import("@/pages/ComparisonPage"));
const BudgetPage = lazy(() => import("@/pages/BudgetPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const BrandPage = lazy(() => import("@/pages/BrandPageTruthSafe"));
const SupportPage = lazy(() => import("@/pages/SupportPage"));
const HowToOrderPage = lazy(() => import("@/pages/HowToOrderPage"));
const BestAISubscriptionPage = lazy(() => import("@/pages/BestAISubscriptionPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const HiggsfieldPage = lazy(() => import("@/pages/HiggsfieldPage"));
const GuidesIndexPage = lazy(() => import("@/pages/GuidesIndexPage"));
const StudentsGuide = lazy(() => import("@/pages/guides/StudentsGuide"));
const FreelancersGuide = lazy(() => import("@/pages/guides/FreelancersGuide"));
const CreatorsGuide = lazy(() => import("@/pages/guides/CreatorsGuide"));
const SMBGuide = lazy(() => import("@/pages/guides/SMBGuide"));
const EducatorsGuide = lazy(() => import("@/pages/guides/EducatorsGuide"));
const BanglaBN = lazy(() => import("@/pages/BanglaBN"));
const StudentsBN = lazy(() => import("@/pages/StudentsBN"));
const DevelopersBN = lazy(() => import("@/pages/DevelopersBN"));
const FreelancersBN = lazy(() => import("@/pages/FreelancersBN"));
const CreatorsBN = lazy(() => import("@/pages/CreatorsBN"));
const SMBBangla = lazy(() => import("@/pages/SMBBangla"));
const EducatorsBangla = lazy(() => import("@/pages/EducatorsBangla"));

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
          <div className="text-xs" style={{ color: "#c9ceda" }}>Current catalog</div>
          <div className="text-sm font-bold" style={{ color: "#f4b942" }}>Confirm before payment</div>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
          style={{ backgroundColor: "#008236", color: "#fff", minHeight: "44px" }}
        >
          <MessageCircle className="w-4 h-4" />
          Ask on WhatsApp
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
      <Route path="/ai-design">{() => <CategoryPage categoryId="ai-design" />}</Route>
      <Route path="/bundles">{() => <CategoryPage categoryId="bundles" />}</Route>

      {/* Brand pages */}
      {BRAND_PAGE_SLUGS.map((slug) => (
        <Route key={slug} path={`/${slug}`}>{() => <BrandPage brandSlug={slug} />}</Route>
      ))}

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

      {/* Guides Index */}
      <Route path="/guides" component={GuidesIndexPage} />

      {/* Segment Guide Pages */}
      <Route path="/guides/students" component={StudentsGuide} />
      <Route path="/guides/freelancers" component={FreelancersGuide} />
      <Route path="/guides/creators" component={CreatorsGuide} />
      <Route path="/guides/smallbusiness" component={SMBGuide} />
      <Route path="/guides/educators" component={EducatorsGuide} />

      {/* Comparison pages */}
      <Route path="/chatgpt-vs-claude">{() => <ComparisonPage compKey="chatgpt-vs-claude" />}</Route>
      <Route path="/chatgpt-vs-claude-bangladesh">{() => <ComparisonPage compKey="chatgpt-vs-claude" />}</Route>
      <Route path="/chatgpt-vs-gemini">{() => <ComparisonPage compKey="chatgpt-vs-gemini" />}</Route>
      <Route path="/chatgpt-vs-perplexity">{() => <ComparisonPage compKey="chatgpt-vs-perplexity" />}</Route>
      <Route path="/claude-vs-gemini">{() => <ComparisonPage compKey="claude-vs-gemini" />}</Route>
      <Route path="/canva-vs-adobe-express">{() => <ComparisonPage compKey="canva-vs-adobe-express" />}</Route>
      <Route path="/copilot-vs-cursor">{() => <ComparisonPage compKey="copilot-vs-cursor" />}</Route>
      <Route path="/midjourney-vs-ideogram">{() => <ComparisonPage compKey="midjourney-vs-ideogram" />}</Route>
      <Route path="/chatgpt-plans-comparison-bangladesh">{() => <BrandPage brandSlug="chatgpt-plans-bangladesh" />}</Route>
      <Route path="/google-ai-pro-bangladesh">{() => <BrandPage brandSlug="gemini-advanced-bangladesh" />}</Route>
      <Route path="/best-ai-budget-bangladesh">{() => <BudgetPage budgetKey="ai-under-500" />}</Route>

      {/* Budget pages */}
      <Route path="/ai-under-500">{() => <BudgetPage budgetKey="ai-under-500" />}</Route>
      <Route path="/ai-under-1000">{() => <BudgetPage budgetKey="ai-under-1000" />}</Route>
      <Route path="/ai-under-3000">{() => <BudgetPage budgetKey="ai-under-3000" />}</Route>

      {/* Product detail pages. Higgsfield keeps its dedicated compliance page. */}
      <Route path="/product/higgsfield-ai-bangladesh" component={HiggsfieldPage} />
      <Route path="/product/:slug">{(params) => <ProductPage productSlug={params.slug} />}</Route>

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
      <Route path="/privacy" component={PrivacyPolicyPage} />

      {/* Bangla pages */}
      <Route path="/bn" component={BanglaBN} />
      <Route path="/students-bn" component={StudentsBN} />
      <Route path="/developers-bn" component={DevelopersBN} />
      <Route path="/freelancers-bn" component={FreelancersBN} />
      <Route path="/creators-bn" component={CreatorsBN} />
      <Route path="/smb-bn" component={SMBBangla} />
      <Route path="/educators-bn" component={EducatorsBangla} />

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
          <Suspense fallback={<div style={{ minHeight: "60vh" }} aria-busy="true" />}>
            <Router />
          </Suspense>
          <MobileOrderBar />
          <ConciergeWidget />
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
