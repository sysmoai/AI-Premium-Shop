import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Blog — AI & Premium Tools Tips | AI Premium Shop Bangladesh",
  description:
    "Read expert guides on ChatGPT Plus, Midjourney, Claude, Canva Pro, CapCut Pro, and more. Stay updated on AI tools for Bangladeshi users.",
  canonical: "https://aipremiumshop.com/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">Blog</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">AI & Premium Tools Guides</h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-[#8a91a8] max-w-2xl">
          Expert guides and honest reviews for Bangladeshi creators, developers, and professionals.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card rounded-2xl overflow-hidden group flex flex-col">
              <div className={`h-1 bg-gradient-to-r from-[#f4b942]/40 to-transparent`} />
              <div className="p-6 flex flex-col flex-1">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#f4b942]">{post.category}</p>
                <h2 className="mt-2 text-[1.125rem] font-semibold text-white group-hover:text-[#f4b942] transition">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[0.8125rem] text-[#5b6280] line-clamp-3">{post.description}</p>
                <div className="mt-auto pt-4 flex items-center justify-between text-[0.625rem] text-[#5b6280]">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
