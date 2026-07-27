import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { buildBlogMetadata } from "@/lib/seo/metadata";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found | AI Premium Shop",
      robots: { index: false, follow: false },
    };
  }
  return buildBlogMetadata({
    title: post.title,
    excerpt: post.description,
    slug: post.slug,
    
    authorName: post.authorName,
    publishedAt: new Date(post.date),
    updatedAt: new Date(post.date),
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ];

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        authorName={post.authorName}
        publishedAt={post.datePublished}
        modifiedAt={post.dateModified}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[0.8125rem] text-[#5b6280] hover:text-[#f4b942] transition">
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>

          <p className="mt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-[#f4b942]">{post.category}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-[0.75rem] text-[#5b6280]">
            <span className="flex items-center gap-1"><Calendar className="size-3.5" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="size-3.5" />{post.readTime}</span>
          </div>

          <div
            className="mt-10 prose prose-sm prose-invert max-w-none
              prose-headings:font-semibold prose-headings:text-white
              prose-p:text-[#8a91a8] prose-p:leading-relaxed
              prose-strong:text-white
              prose-li:text-[#8a91a8] prose-li:marker:text-[#f4b942]
              prose-a:text-[#f4b942] prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-[#f4b942] prose-blockquote:bg-white/[0.03] prose-blockquote:rounded-r-lg prose-blockquote:px-4 prose-blockquote:py-2
              prose-pre:bg-[#0a0e27] prose-pre:border prose-pre:border-white/[0.06]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
      </main>
    </>
  );
}
