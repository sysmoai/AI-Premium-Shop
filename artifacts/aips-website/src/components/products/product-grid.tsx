"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ChevronRight, ShieldCheck, TrendingDown, Users, Lock, Star } from "lucide-react";
import {
  getProductGroups,
  getCategoryLabel,
  getCategories,
} from "@/lib/data/products";
import type { ProductGroup } from "@/lib/data/products";

const groups = getProductGroups();
const categories = getCategories();
const whatsappNumber = process.env.NEXT_PUBLIC_WA_PRIMARY ?? "8801865385348";

function computeSavings(group: ProductGroup): number {
  const anchor = group.variants.find((v) => v.officialUSD && v.officialUSD > 0);
  if (!anchor) return 0;
  const officialBdt = anchor.officialUSD * 110;
  const savings = ((officialBdt - anchor.price) / officialBdt) * 100;
  return Math.max(0, savings);
}

function getCategoryGradient(category: string): string {
  const map: Record<string, string> = {
    "ai-assistant": "from-emerald-400/20 to-cyan-400/20",
    "ai-code": "from-violet-400/20 to-fuchsia-400/20",
    "ai-image": "from-pink-400/20 to-rose-400/20",
    "ai-video": "from-orange-400/20 to-red-400/20",
    "ai-voice-music": "from-amber-400/20 to-yellow-400/20",
    "ai-workspace": "from-sky-400/20 to-blue-400/20",
    "ai-writing": "from-teal-400/20 to-emerald-400/20",
    bundles: "from-indigo-400/20 to-purple-400/20",
  };
  return map[category] ?? "from-gray-400/20 to-slate-400/20";
}

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = groups;
    if (activeCategory) {
      result = result.filter((g) => g.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.brand.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.provider.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Search */}
      <div className="mt-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#5b6280]" />
        <input aria-label="Search products"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-11 pr-10 text-[0.875rem] text-white placeholder:text-[#5b6280] outline-none transition focus:border-[#f4b942]/30 focus:bg-white/[0.04]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5b6280] hover:text-white transition"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-lg px-4 py-2 text-[0.75rem] font-semibold transition-all duration-200 ${
            activeCategory === null
              ? "bg-[#f4b942] text-[#0a0e27]"
              : "border border-white/[0.06] bg-white/[0.02] text-[#8a91a8] hover:border-white/[0.12] hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`rounded-lg px-4 py-2 text-[0.75rem] font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#f4b942] text-[#0a0e27]"
                : "border border-white/[0.06] bg-white/[0.02] text-[#8a91a8] hover:border-white/[0.12] hover:text-white"
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mt-5 text-[0.8125rem] text-[#5b6280]" aria-live="polite" aria-atomic="true">
        Showing <span className="text-white font-medium">{filtered.length}</span> of{" "}
        <span className="text-white font-medium">{groups.length}</span> products
      </p>

      {/* Grid */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((group) => (
          <article
            key={group.slug}
            className="glass-card rounded-2xl overflow-hidden group"
          >
            <div className={`h-1 bg-gradient-to-r ${getCategoryGradient(group.category).replace('/20', '')}`} />
            <div className="p-6">
              <Link href={`/products/${group.slug}`} className="block">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#5b6280]">
                      {getCategoryLabel(group.category)}
                    </p>
                    <h3 className="mt-1 text-[1.125rem] font-semibold text-white group-hover:text-[#f4b942] transition">
                      {group.brand}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[1.125rem] font-bold text-white">
                      ৳{group.minPrice.toLocaleString("en-BD")}
                    </p>
                    {group.maxPrice > group.minPrice && (
                      <p className="text-[0.625rem] text-[#5b6280]">
                        up to ৳{group.maxPrice.toLocaleString("en-BD")}
                      </p>
                    )}
                    {(() => {
                      const savings = computeSavings(group);
                      return savings > 10 ? (
                        <p className="mt-1 inline-flex items-center gap-1 text-[0.625rem] font-semibold text-green-400 bg-green-400/10 rounded-full px-2 py-0.5">
                          <TrendingDown className="size-3" />
                          {Math.round(savings)}% off
                        </p>
                      ) : null;
                    })()}
                  </div>
                </div>
                <p className="mt-3 text-[0.8125rem] text-[#5b6280] line-clamp-2">
                  {group.description}
                </p>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {group.variants.length > 1 && (
                    <span className="text-[0.6875rem] text-[#5b6280]">
                      {group.variants.length} plans
                    </span>
                  )}
                  {group.variants.some((v) => v.accessType === "personal") && (
                    <span className="inline-flex items-center gap-1 text-[0.625rem] font-medium text-emerald-400 bg-emerald-400/10 rounded-full px-2 py-0.5">
                      <Lock className="size-3" />
                      Personal
                    </span>
                  )}
                  {group.variants.some((v) => v.accessType === "shared") && (
                    <span className="inline-flex items-center gap-1 text-[0.625rem] font-medium text-[#8a91a8] bg-white/[0.05] rounded-full px-2 py-0.5">
                      <Users className="size-3" />
                      Shared
                    </span>
                  )}
                  {group.featured && (
                    <span className="inline-flex items-center gap-1 text-[0.625rem] font-bold text-[#0a0e27] bg-gradient-to-r from-[#f4b942] to-[#e8a838] rounded-full px-2 py-0.5">
                      <Star className="size-3" />
                      Popular
                    </span>
                  )}
                </div>
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  `Hi AI Premium Shop, I want ${group.brand}.`
                )}`}
                className="btn-whatsapp w-full mt-5 h-10 text-[0.8125rem]"
              >
                Order via WhatsApp
                <ChevronRight className="size-4" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-[1.125rem] text-[#8a91a8]">No products found.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory(null);
              setSearchQuery("");
            }}
            className="btn-secondary mt-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
