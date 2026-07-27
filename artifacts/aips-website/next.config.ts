import type { NextConfig } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aipremiumshop.com";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com https://*.fbcdn.net",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com https://*.resend.io",
      "frame-src 'self' https://*.facebook.com",
      "media-src 'self' https://*.aipremiumshop.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  poweredByHeader: false,

  images: {
    unoptimized: true, // Required for static export
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.aipremiumshop.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/og/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    const redirects = [
      // WWW to non-www (apex is canonical)
      {
        source: "/:path*",
        has: [
          {
            type: "host" as const,
            value: "www.aipremiumshop.com",
          },
        ],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      },
      // Next.js App Router defaults to trailingSlash: false; no manual redirect needed.
      // Legacy or common misspellings
      {
        source: "/chatgpt",
        destination: "/products/chatgpt-plus-bangladesh",
        permanent: true,
      },
      {
        source: "/claude",
        destination: "/products/claude-pro-bangladesh",
        permanent: true,
      },
      {
        source: "/midjourney",
        destination: "/products/midjourney-bangladesh",
        permanent: true,
      },
      {
        source: "/canva",
        destination: "/products/canva-pro-bangladesh",
        permanent: true,
      },
      {
        source: "/netflix",
        destination: "/products/netflix-premium-bangladesh",
        permanent: true,
      },
      {
        source: "/youtube-premium",
        destination: "/products/youtube-premium-bangladesh",
        permanent: true,
      },
      {
        source: "/capcut-vs-premiere",
        destination: "/suno-vs-udio",
        permanent: true,
      },
      {
        source: "/midjourney-vs-dalle",
        destination: "/midjourney-vs-leonardo",
        permanent: true,
      },
    ];

    return redirects;
  },

  // Experimental features (evaluate stability before enabling in production)
  // experimental: {
  //   ppr: true,
  //   dynamicIO: true,
 // },
};

export default nextConfig;
