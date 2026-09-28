export type ServiceBilling = "one-time" | "monthly" | "usage";

export interface AipsServiceOffer {
  slug: string;
  name: string;
  shortName: string;
  category: "API" | "Development" | "Website" | "Automation" | "SEO" | "Maintenance" | "Content";
  priceBdt: number;
  priceSuffix?: string;
  billing: ServiceBilling;
  duration: string;
  summary: string;
  features: string[];
  idealFor: string[];
  limitations: string[];
  faq: { question: string; answer: string }[];
  whatsappMessage: string;
  featured?: boolean;
  lastVerified: string;
}

export const serviceOffers: AipsServiceOffer[] = [
  {
    slug: "deepseek-api-credit",
    name: "DeepSeek API $10 Credit",
    shortName: "API $10 Credit",
    category: "API",
    priceBdt: 1990,
    billing: "usage",
    duration: "Until the purchased API balance is consumed",
    summary: "A simple starter option for developers who want official API usage without handling the international payment process themselves.",
    features: [
      "$10 API usage balance",
      "Activation and basic setup support",
      "Basic guidance for connecting the API to a development project",
      "BDT payment support",
    ],
    idealFor: ["Developers", "Students learning APIs", "Small coding projects", "AI experiments"],
    limitations: [
      "Token usage is metered by the provider; this is not an unlimited plan.",
      "Model availability, token pricing, context limits, peak/off-peak pricing and provider policies can change.",
      "Any quoted provider allowance must be reconfirmed before payment.",
    ],
    faq: [
      {
        question: "How long does the $10 API credit last?",
        answer: "There is no fixed validity based on days. It lasts until the API balance is consumed, and the usage rate depends on the selected model, input/output tokens, caching and provider pricing.",
      },
      {
        question: "Is unlimited AI usage included?",
        answer: "No. This is metered API credit. Unlimited usage is not included.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want the DeepSeek API $10 Credit package.",
    featured: true,
    lastVerified: "2026-09-28",
  },
  {
    slug: "developer-full-setup",
    name: "Developer Full Setup",
    shortName: "Developer Setup",
    category: "Development",
    priceBdt: 3490,
    billing: "one-time",
    duration: "One-time environment setup; third-party subscriptions/credits are separate",
    summary: "Turn a customer PC into a practical AI-assisted website development environment with Git, GitHub, deployment and guided handover.",
    features: [
      "AI coding workflow setup",
      "VS Code + Git configuration",
      "GitHub private repository setup",
      "Cloudflare deployment workflow",
      "Custom domain + DNS + SSL/CDN guidance/setup",
      "PC development environment configuration",
      "Video-call walkthrough and handover",
    ],
    idealFor: ["Beginners who want to build with AI", "Freelancers", "Students", "Small business owners"],
    limitations: [
      "Paid AI subscriptions/API credits are not unlimited and are not automatically included.",
      "Domain registration and any paid third-party plan are separate unless explicitly quoted.",
      "This package prepares the environment; full website development is a separate service unless added.",
    ],
    faq: [
      {
        question: "Which AI is included?",
        answer: "The package is an AI-development environment setup, not an unlimited AI subscription. We configure the workflow around a supported AI coding tool/API selected for the customer. Any paid AI plan or API credit is quoted separately.",
      },
      {
        question: "Do I need to buy the setup again when AI credit finishes?",
        answer: "No. The development environment remains configured. You only renew or recharge the selected AI service when needed.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want the Developer Full Setup package.",
    featured: true,
    lastVerified: "2026-09-28",
  },
  {
    slug: "complete-website-starter",
    name: "Complete Website Starter",
    shortName: "Complete Website",
    category: "Website",
    priceBdt: 6990,
    priceSuffix: "from",
    billing: "one-time",
    duration: "Project-based delivery",
    summary: "A complete responsive business website built, deployed and handed over with essential SEO, speed and security foundations.",
    features: [
      "Responsive website development",
      "Cloud deployment",
      "Custom domain + DNS + SSL/CDN setup",
      "Basic technical SEO",
      "Speed optimization",
      "Security baseline",
      "Contact/WhatsApp CTA",
      "Handover guidance",
    ],
    idealFor: ["Local businesses", "Personal brands", "Service businesses", "Startups"],
    limitations: [
      "Final price depends on pages, design complexity and integrations.",
      "Domain and paid third-party services are separate unless quoted.",
      "Advanced e-commerce, login, dashboard, database and payment gateway work are separate scopes.",
    ],
    faq: [
      {
        question: "Is hosting included?",
        answer: "We can deploy suitable websites on a free-tier hosting architecture when the project fits the provider limits. Paid hosting is only required when the project needs resources beyond the free tier.",
      },
      {
        question: "Will I be able to edit the website later?",
        answer: "Yes. We provide a maintainable codebase and can also set up an AI-assisted editing workflow or provide ongoing maintenance.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I need a complete website. Please assess my requirements.",
    featured: true,
    lastVerified: "2026-09-28",
  },
  {
    slug: "business-website-pro",
    name: "Business Website Pro",
    shortName: "Business Website Pro",
    category: "Website",
    priceBdt: 9990,
    priceSuffix: "from",
    billing: "one-time",
    duration: "Project-based delivery",
    summary: "A stronger business website package focused on lead generation, analytics, local trust and an SEO-ready launch.",
    features: [
      "5-8 core business pages",
      "Lead/contact form",
      "WhatsApp conversion CTA",
      "Analytics setup",
      "Google Search Console setup",
      "Technical SEO foundation",
      "Sitemap and indexing setup",
      "Performance and security optimization",
    ],
    idealFor: ["SMEs", "Professional services", "Agencies", "Clinics and local businesses"],
    limitations: [
      "Content volume, custom design, booking systems, advanced CRM and paid integrations are scoped separately.",
      "SEO setup improves crawlability and search readiness but does not guarantee rankings or leads.",
    ],
    faq: [
      {
        question: "Is SEO included?",
        answer: "The package includes technical SEO foundations and search setup. Ongoing content, backlinks, local citations and monthly SEO campaigns are separate.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want the Business Website Pro package.",
    featured: true,
    lastVerified: "2026-09-28",
  },
  {
    slug: "landing-page-lead-funnel",
    name: "Landing Page + Lead Funnel",
    shortName: "Lead Funnel",
    category: "Website",
    priceBdt: 4990,
    priceSuffix: "from",
    billing: "one-time",
    duration: "Project-based delivery",
    summary: "A focused landing page designed to turn ad, social or organic visitors into WhatsApp conversations or qualified leads.",
    features: [
      "Conversion-focused landing page",
      "Lead form",
      "WhatsApp CTA",
      "Basic analytics and event tracking",
      "Mobile optimization",
      "Speed optimization",
      "Thank-you/confirmation flow",
    ],
    idealFor: ["Campaigns", "Lead generation", "Course/service offers", "Product launches"],
    limitations: [
      "Advertising budget, ad management, CRM subscription and external automation costs are separate.",
      "No lead volume or conversion rate is guaranteed.",
    ],
    faq: [
      {
        question: "Can this connect to WhatsApp?",
        answer: "Yes. The page can route visitors to WhatsApp with a pre-filled message and can also use forms where appropriate.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I need a landing page and lead funnel.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "ecommerce-starter",
    name: "E-commerce Starter",
    shortName: "E-commerce Starter",
    category: "Website",
    priceBdt: 14990,
    priceSuffix: "from",
    billing: "one-time",
    duration: "Project-based delivery",
    summary: "A starter online store with product catalog, order flow and an architecture that can grow with the business.",
    features: [
      "Responsive storefront",
      "Product catalog",
      "Cart/order flow",
      "Basic admin/data setup",
      "Domain + deployment",
      "SSL/CDN",
      "Basic analytics and SEO setup",
      "WhatsApp/order notification flow where suitable",
    ],
    idealFor: ["Small online stores", "Digital products", "Subscription businesses", "Local brands"],
    limitations: [
      "Payment gateway onboarding/fees, advanced inventory, logistics, ERP and custom dashboards are separate.",
      "Scope and final price depend on product count and business workflow.",
    ],
    faq: [
      {
        question: "Can bKash or another payment gateway be added?",
        answer: "Yes, where the merchant account and provider requirements are available. Gateway onboarding, credentials and provider fees remain the customer's responsibility unless separately agreed.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want an e-commerce website. Please assess my requirements.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "ai-customer-support-assistant",
    name: "AI Customer Support Assistant",
    shortName: "AI Support Assistant",
    category: "Automation",
    priceBdt: 6990,
    priceSuffix: "setup from",
    billing: "one-time",
    duration: "Initial setup; ongoing AI/provider usage is separate",
    summary: "A website AI assistant configured around approved business information to answer common questions and collect leads.",
    features: [
      "Website chat assistant setup",
      "Business FAQ/knowledge setup",
      "Lead capture",
      "Escalation path to human support",
      "Basic conversation guardrails",
      "Testing and handover",
    ],
    idealFor: ["Service businesses", "Stores", "Agencies", "Support-heavy websites"],
    limitations: [
      "AI/API usage charges are separate.",
      "The assistant should not be treated as a replacement for human approval in payments, refunds, legal, medical or other high-impact decisions.",
      "Quality depends on the accuracy of the supplied knowledge base.",
    ],
    faq: [
      {
        question: "Will it answer every customer correctly?",
        answer: "No AI system is guaranteed to answer every question correctly. We configure the approved knowledge, guardrails and human escalation so uncertain or sensitive cases can be handed to a person.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want an AI customer support assistant for my website.",
    featured: true,
    lastVerified: "2026-09-28",
  },
  {
    slug: "lead-automation-setup",
    name: "Lead Automation Setup",
    shortName: "Lead Automation",
    category: "Automation",
    priceBdt: 7990,
    priceSuffix: "from",
    billing: "one-time",
    duration: "Project-based setup",
    summary: "Connect website leads to a practical workflow so new inquiries reach the right place quickly and are easier to follow up.",
    features: [
      "Lead form workflow",
      "Email/notification routing",
      "Google Sheet or supported CRM logging",
      "Basic lead status structure",
      "Follow-up workflow design",
      "Testing and documentation",
    ],
    idealFor: ["Sales teams", "Service businesses", "Agencies", "Lead-generation websites"],
    limitations: [
      "Third-party CRM, email, WhatsApp or automation platform fees are separate.",
      "Advanced multi-team routing and enterprise automation require a separate scope.",
    ],
    faq: [
      {
        question: "Can leads go to Google Sheets?",
        answer: "Yes. A simple setup can record form submissions in a structured sheet and trigger approved notifications or follow-up steps.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I need lead automation for my website/business.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "google-business-local-seo",
    name: "Google Business + Local SEO",
    shortName: "Local SEO",
    category: "SEO",
    priceBdt: 4990,
    billing: "one-time",
    duration: "Initial optimization project",
    summary: "Improve local search readiness by optimizing the business profile, website signals and local search foundations.",
    features: [
      "Google Business Profile optimization guidance",
      "Business information consistency check",
      "Local keyword/page recommendations",
      "Local SEO website foundation",
      "Search Console connection where applicable",
      "Review and local trust recommendations",
    ],
    idealFor: ["Restaurants", "Clinics", "Shops", "Local service providers"],
    limitations: [
      "Google controls profile verification and ranking.",
      "We do not guarantee map-pack placement, rankings, calls or leads.",
      "Ongoing citation building/content campaigns are separate.",
    ],
    faq: [
      {
        question: "Will this put my business at number one on Google Maps?",
        answer: "No legitimate provider can guarantee a specific Google Maps position. The service improves the profile and local SEO foundation so the business is better prepared to compete.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want Google Business and Local SEO setup.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "seo-launch-pack",
    name: "SEO Launch Pack",
    shortName: "SEO Launch",
    category: "SEO",
    priceBdt: 5990,
    billing: "one-time",
    duration: "Initial technical SEO project",
    summary: "Prepare a website for search engines with a clean technical foundation, indexing setup and measurement tools.",
    features: [
      "Technical SEO review",
      "Metadata foundation",
      "Sitemap and robots review/setup",
      "Google Search Console setup",
      "Analytics setup",
      "Indexing/crawl checks",
      "On-page structure recommendations",
    ],
    idealFor: ["New websites", "Business sites", "Landing-page portfolios", "Sites not indexed properly"],
    limitations: [
      "This is a launch/foundation package, not an ongoing SEO campaign.",
      "Rankings, traffic, customers and revenue are not guaranteed.",
      "Content production and backlink campaigns are separate.",
    ],
    faq: [
      {
        question: "How fast will I rank after this?",
        answer: "Search engines decide crawling, indexing and ranking. The package removes common technical gaps and establishes measurement, but there is no fixed ranking timeline.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want the SEO Launch Pack.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "website-speed-security-fix",
    name: "Website Speed + Security Fix",
    shortName: "Speed + Security",
    category: "Maintenance",
    priceBdt: 3990,
    priceSuffix: "from",
    billing: "one-time",
    duration: "Audit and remediation project",
    summary: "Find and fix practical performance, HTTPS, deployment and baseline security issues on an existing website.",
    features: [
      "Performance audit",
      "Asset and loading optimization",
      "CDN/cache review",
      "SSL/HTTPS review",
      "Security-header and configuration review",
      "Basic technical remediation",
      "Before/after notes",
    ],
    idealFor: ["Slow websites", "Broken SSL", "Poor mobile performance", "Recently migrated sites"],
    limitations: [
      "Final price depends on the existing stack and severity of issues.",
      "Compromised sites, malware cleanup, server incidents and complex backend security may require a separate incident scope.",
    ],
    faq: [
      {
        question: "Can every website become extremely fast?",
        answer: "Not always. Performance depends on hosting, theme/framework, plugins, third-party scripts, media and backend architecture. We optimize what is technically practical within the agreed scope.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, my website is slow or has technical/security issues. I want an audit.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "wordpress-rescue-modern-migration",
    name: "WordPress Rescue / Modern Migration",
    shortName: "WordPress Rescue",
    category: "Website",
    priceBdt: 7990,
    priceSuffix: "from",
    billing: "one-time",
    duration: "Project-based delivery",
    summary: "Fix an existing WordPress site or migrate an appropriate site to a modern coded architecture with fewer plugin dependencies.",
    features: [
      "Current-site audit",
      "Plugin/theme dependency review",
      "Performance and update-risk review",
      "Rescue/fix plan or migration plan",
      "Modern deployment option",
      "Domain/DNS/SSL migration support",
      "SEO-preserving migration checklist where applicable",
    ],
    idealFor: ["Slow WordPress sites", "Expired premium plugin/theme stacks", "Broken updates", "Businesses wanting a lighter coded site"],
    limitations: [
      "WordPress itself is not inherently slow; performance depends on hosting, theme, plugins, media and configuration.",
      "Premium licenses, hosting, paid plugins and third-party services are separate.",
      "Complex stores, memberships and plugin-specific functionality require detailed migration scoping.",
    ],
    faq: [
      {
        question: "Is WordPress bad?",
        answer: "No. WordPress can be excellent when maintained properly. We recommend rescue, optimization or migration based on the customer's actual requirements rather than using one stack for every project.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I have a WordPress website and want a rescue/migration assessment.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "website-care-plan",
    name: "Website Care Plan",
    shortName: "Website Care",
    category: "Maintenance",
    priceBdt: 1990,
    priceSuffix: "per month from",
    billing: "monthly",
    duration: "Monthly recurring service",
    summary: "Ongoing website care for routine updates, checks and small changes so the customer does not have to manage technical maintenance alone.",
    features: [
      "Routine website checks",
      "Small content updates within monthly allowance",
      "Backup/deployment checks where applicable",
      "Basic uptime/technical review",
      "Minor bug fixes",
      "Monthly maintenance notes",
    ],
    idealFor: ["Business owners", "Non-technical teams", "Small company websites", "Ongoing support customers"],
    limitations: [
      "Major redesigns, new features, large content projects and emergency incidents are quoted separately.",
      "Third-party subscription costs are separate.",
    ],
    faq: [
      {
        question: "Can I cancel the care plan?",
        answer: "Yes, unless a custom contract states otherwise. The care plan is a monthly service rather than a lifetime commitment.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want ongoing website maintenance.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "ai-content-starter",
    name: "AI Content Starter",
    shortName: "AI Content",
    category: "Content",
    priceBdt: 4990,
    priceSuffix: "per month from",
    billing: "monthly",
    duration: "Monthly content service",
    summary: "A starter content-production service using AI-assisted workflows with human review for social and business content.",
    features: [
      "Content planning",
      "AI-assisted captions/copy",
      "Branded visual concepts",
      "Basic content calendar",
      "Human review before delivery",
      "Reusable content workflow",
    ],
    idealFor: ["Small businesses", "Personal brands", "New pages", "Founders"],
    limitations: [
      "Exact post count and media type must be defined in the quotation.",
      "Paid ad spend, influencer work, photography and third-party media licenses are separate.",
      "Virality, reach and sales are not guaranteed.",
    ],
    faq: [
      {
        question: "Is everything fully automatic?",
        answer: "AI assists the workflow, but customer-facing content should still be reviewed for brand accuracy, claims and context before publishing.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want the AI Content Starter package.",
    lastVerified: "2026-09-28",
  },
  {
    slug: "ai-video-content-pack",
    name: "AI Video Content Pack",
    shortName: "AI Video",
    category: "Content",
    priceBdt: 5990,
    priceSuffix: "per month from",
    billing: "monthly",
    duration: "Monthly video content service",
    summary: "A practical short-form video package using AI-assisted production for social media and promotional content.",
    features: [
      "Short-form video concepts",
      "AI-assisted video production",
      "Caption/subtitle support",
      "Platform-ready aspect ratios",
      "Basic brand consistency",
      "Human review before delivery",
    ],
    idealFor: ["Facebook/Instagram pages", "YouTube Shorts", "Product/service promotion", "Creators"],
    limitations: [
      "Exact video count, duration and production complexity must be agreed in the quotation.",
      "Paid actors, custom filming, licensed music/media and ad spend are separate.",
      "Views, reach and sales are not guaranteed.",
    ],
    faq: [
      {
        question: "How many videos are included?",
        answer: "The exact monthly quantity depends on duration, style and production complexity. We confirm the deliverable count in the quotation before payment.",
      },
    ],
    whatsappMessage: "Hi AI Premium Shop, I want the AI Video Content Pack.",
    lastVerified: "2026-09-28",
  },
];

export function getServiceOffers(): AipsServiceOffer[] {
  return serviceOffers;
}

export function getServiceOffer(slug: string): AipsServiceOffer | undefined {
  return serviceOffers.find((offer) => offer.slug === slug);
}

export function servicePriceLabel(offer: AipsServiceOffer): string {
  const amount = `৳${offer.priceBdt.toLocaleString("en-US")}`;
  if (!offer.priceSuffix) return amount;
  if (offer.priceSuffix === "from") return `${amount} থেকে`;
  if (offer.priceSuffix === "setup from") return `${amount} setup থেকে`;
  if (offer.priceSuffix === "per month from") return `${amount}/month থেকে`;
  return `${amount} ${offer.priceSuffix}`;
}

export function serviceWhatsappUrl(offer: AipsServiceOffer): string {
  const number = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";
  return `https://wa.me/${number}?text=${encodeURIComponent(offer.whatsappMessage)}`;
}
