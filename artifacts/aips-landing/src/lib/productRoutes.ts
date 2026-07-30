// Single source of truth for which product slugs have a dedicated top-level
// brand page at /{slug}. App.tsx renders one <Route> per entry, and
// productPath() below decides every product link and canonical URL from the
// same list — so the route table, internal links, and canonicals cannot drift
// apart (that drift is how /product/ pages ended up declaring canonicals that
// pointed at NotFound-rendering paths).
//
// Alias routes whose path differs from the brandSlug they render (e.g.
// /google-ai-pro-bangladesh -> gemini-advanced-bangladesh) stay hand-written
// in App.tsx; they already canonicalize correctly via BrandPage.
export const BRAND_PAGE_SLUGS = [
  // Batch 1 additions
  "grammarly-premium-bangladesh",
  "quillbot-premium-bangladesh",
  "canva-pro-bangladesh",
  "microsoft-copilot-pro-bangladesh",
  "jasper-ai-bangladesh",
  "adobe-firefly-bangladesh",
  "pika-labs-bangladesh",
  "opus-clip-bangladesh",
  "descript-pro-bangladesh",
  "murf-ai-bangladesh",
  // AI video editing
  "freepik-premium-bangladesh",
  "kling-ai-bangladesh",
  "synthesia-bangladesh",
  "windsurf-bangladesh",
  "capcut-pro-bangladesh",
  // ChatGPT
  "chatgpt-plans-bangladesh",
  "chatgpt-plus-bangladesh",
  "chatgpt-business-bangladesh",
  "chatgpt-pro-bangladesh",
  "chatgpt-go-bangladesh",
  // AI assistants
  "claude-pro-bangladesh",
  "gemini-advanced-bangladesh",
  "supergrok-bangladesh",
  "perplexity-pro-bangladesh",
  // AI image & video
  "midjourney-bangladesh",
  "ideogram-bangladesh",
  "runway-bangladesh",
  "leonardo-ai-bangladesh",
  "heygen-bangladesh",
  // AI voice & music
  "elevenlabs-bangladesh",
  "suno-ai-bangladesh",
  "udio-bangladesh",
  // AI code & dev
  "github-copilot-bangladesh",
  "cursor-bangladesh",
  "v0-dev-bangladesh",
  "replit-bangladesh",
  // AI workspace
  "notion-business-bangladesh",
  "manus-ai-bangladesh",
  "otter-ai-bangladesh",
  "gamma-bangladesh",
  // AI writing
  "writesonic-bangladesh",
] as const;

const BRAND_PAGE_SLUG_SET: ReadonlySet<string> = new Set(BRAND_PAGE_SLUGS);

export function hasBrandPage(slug: string): boolean {
  return BRAND_PAGE_SLUG_SET.has(slug);
}

// Preferred URL for a product: the brand page when one exists (richer page,
// and the canonical target for the /product/ duplicate), otherwise the
// /product/ detail page itself.
export function productPath(slug: string): string {
  return hasBrandPage(slug) ? `/${slug}` : `/product/${slug}`;
}
