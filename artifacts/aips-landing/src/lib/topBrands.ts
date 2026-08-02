import { brandStats, taka } from "@/lib/catalogStats";

// Single source for "top demand" brand chips — used by the Navbar mega-menu
// and the Hero ticker. Previously the Hero rendered a longer, static,
// non-catalog-linked name list (BRAND_NAMES) while Navbar computed its own
// catalog-derived version independently; a brand renamed or repriced in one
// place had no way to reach the other.
export interface TopBrandDef {
  name: string;
  brand: string;
  href: string;
  showPlans?: boolean;
  officialPrice?: number;
}

export const TOP_BRAND_DEFS: TopBrandDef[] = [
  { name: "ChatGPT",         brand: "ChatGPT",    showPlans: true,  href: "/chatgpt-plans-bangladesh" },
  { name: "Claude",          brand: "Claude",     showPlans: true,  href: "/claude-pro-bangladesh" },
  { name: "Midjourney",      brand: "Midjourney", showPlans: true,  href: "/midjourney-bangladesh" },
  { name: "Google AI Pro",   brand: "Google",     showPlans: false, officialPrice: 2990, href: "/gemini-advanced-bangladesh" },
  { name: "GitHub Copilot",  brand: "GitHub",     showPlans: false, href: "/github-copilot-bangladesh" },
  { name: "Cursor",          brand: "Cursor",     showPlans: false, href: "/cursor-bangladesh" },
  { name: "Notion Business", brand: "Notion",     showPlans: false, officialPrice: 2990, href: "/notion-business-bangladesh" },
  { name: "Perplexity",      brand: "Perplexity", showPlans: false, href: "/perplexity-pro-bangladesh" },
  { name: "ElevenLabs",      brand: "ElevenLabs", showPlans: false, href: "/elevenlabs-bangladesh" },
  { name: "Suno AI",         brand: "Suno",       showPlans: false, href: "/suno-ai-bangladesh" },
  { name: "Runway",          brand: "Runway",     showPlans: false, href: "/runway-bangladesh" },
  { name: "HeyGen",          brand: "HeyGen",     showPlans: false, href: "/heygen-bangladesh" },
  { name: "Canva Pro",       brand: "Canva",      showPlans: false, href: "/canva-pro-bangladesh" },
  { name: "Grammarly",       brand: "Grammarly",  showPlans: false, href: "/grammarly-premium-bangladesh" },
];

export function computeTopBrands() {
  return TOP_BRAND_DEFS.map((b) => {
    const s = brandStats(b.brand);
    const off = b.officialPrice && s.fromPrice != null
      ? `${Math.round((1 - s.fromPrice / b.officialPrice) * 100)}% OFF`
      : "";
    return {
      ...b,
      price: s.fromPrice != null ? `from ${taka(s.fromPrice)}` : "price on WhatsApp",
      fromPrice: s.fromPrice,
      badge: off || (b.showPlans && s.plans > 1 ? `${s.plans} plans` : ""),
      badgeGreen: !!off,
    };
  });
}
