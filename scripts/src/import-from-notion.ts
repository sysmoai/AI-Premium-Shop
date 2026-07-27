/**
 * Notion → site catalog import (R11: Notion is the single source of truth).
 *
 * Reads the "AIPS — Catalog — Products" data source and regenerates
 * artifacts/aips-landing/data/products.json. Run whenever prices or the
 * catalog change in Notion; wire into CI to prevent three-way price drift
 * (see docs/NOTION_RECONCILIATION.md for the incident this prevents).
 *
 * Env: NOTION_API_KEY — internal-integration secret with read access to the DB.
 * Usage: pnpm tsx scripts/src/import-from-notion.ts [--check]
 *   --check: exit 1 if the generated file differs from what's committed (CI mode).
 */
import { readFileSync, writeFileSync } from "node:fs";

const DATA_SOURCE_ID = "48285403-f0dd-4a02-9e6f-d9b7ed93dcd1";
const OUT = "artifacts/aips-landing/data/products.json";

const CATEGORY_MAP: Record<string, string> = {
  "task-planning": "ai-workspace", "docs-knowledge": "ai-workspace",
  "sop-documentation": "ai-workspace", "reporting-dashboards": "ai-workspace",
  "workflow-automation": "ai-workspace", "ai-agents": "ai-workspace",
  "integrations": "ai-workspace", "customer-support": "ai-workspace",
  "sales-outreach": "ai-workspace",
  "photo-editing": "ai-image", "image-generation": "ai-image", "thumbnail-creative": "ai-image",
  "video-generation": "ai-video", "video-editing": "ai-video", "subtitles-dubbing": "ai-video",
  "audio-cleanup": "ai-voice-music", "voice-tts": "ai-voice-music",
  "translation": "ai-writing", "proofreading-rewriting": "ai-writing",
  "ads-copy": "ai-writing", "email-marketing": "ai-writing", "seo-content": "ai-writing",
  "social-content": "ai-writing", "research-summarization": "ai-writing",
  "pdf-chat": "ai-writing", "citation-bibliography": "ai-writing", "study-planning": "ai-writing",
  "general-chat-assistant": "ai-assistant", "meeting-notes": "ai-assistant",
  "code-copilot": "ai-code", "debugging": "ai-code", "code-review": "ai-code", "app-builder": "ai-code",
};

interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
}

async function queryAll(): Promise<NotionPage[]> {
  const key = process.env.NOTION_API_KEY;
  if (!key) throw new Error("NOTION_API_KEY is not set");
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Notion-Version": "2025-09-03",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cursor ? { start_cursor: cursor } : {}),
    });
    if (!res.ok) throw new Error(`Notion query failed: ${res.status} ${await res.text()}`);
    const body = (await res.json()) as {
      results: NotionPage[]; has_more: boolean; next_cursor?: string;
    };
    pages.push(...body.results);
    cursor = body.has_more ? body.next_cursor : undefined;
  } while (cursor);
  return pages;
}

/* eslint-disable @typescript-eslint/no-explicit-any -- Notion property payloads are dynamic */
function prop(page: NotionPage, name: string): any {
  return (page.properties as any)[name];
}
function text(page: NotionPage, name: string): string {
  const p = prop(page, name);
  const rt = p?.rich_text ?? p?.title;
  return (rt ?? []).map((t: any) => t.plain_text).join("");
}
function num(page: NotionPage, name: string): number | null {
  return prop(page, name)?.number ?? null;
}
function sel(page: NotionPage, name: string): string | null {
  return prop(page, name)?.select?.name ?? null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

async function main() {
  const check = process.argv.includes("--check");
  const pages = await queryAll();
  const products = pages
    .filter((p) => sel(p, "Status") === "Active")
    .map((p) => {
      const name = text(p, "Name");
      const slug = text(p, "Slug");
      const pricingType = sel(p, "Pricing Type") ?? "Personal";
      const access = { Shared: "shared", Personal: "personal", Key: "personal", Service: "service" }[pricingType] ?? "personal";
      const tier = access === "service" ? "Setup Service" : pricingType;
      const price = num(p, "Starting Price BDT");
      let plans: unknown[] = [];
      try { plans = JSON.parse(text(p, "Variants")); } catch { /* free-text variants — no plan rows */ }
      return {
        id: `${slug}-${access}`,
        name: `${name} — ${tier}`,
        slug: `${slug}-bangladesh`,
        brand: name.replace(/\s*\(.*\)$/, ""),
        brandSlug: `${slug}-bangladesh`,
        provider: name.replace(/\s*\(.*\)$/, ""),
        brandColor: "#6366f1",
        category: CATEGORY_MAP[sel(p, "Subcategory") ?? ""] ?? "ai-workspace",
        price,
        compareAtBDT: num(p, "Compare-at BDT"),
        tier,
        accessType: access,
        description: text(p, "SEO Description"),
        capabilities: [sel(p, "Subcategory")].filter(Boolean),
        status: "Active",
        plans,
        source: `notion:${p.id}`,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const output = JSON.stringify({ products }, null, 2) + "\n";
  if (check) {
    const current = readFileSync(OUT, "utf-8");
    if (current !== output) {
      console.error(`DRIFT: ${OUT} differs from the Notion catalog. Run the import and commit.`);
      process.exit(1);
    }
    console.log("No drift — site catalog matches Notion.");
    return;
  }
  writeFileSync(OUT, output);
  console.log(`Wrote ${products.length} products to ${OUT}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
