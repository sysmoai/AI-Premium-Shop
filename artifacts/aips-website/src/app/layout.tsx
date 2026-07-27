import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { siteUrl, buildMetadata } from "@/lib/seo/metadata";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { StickyWhatsApp } from "@/components/layout/sticky-whatsapp";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0e27",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = buildMetadata({
  title: "Premium AI Subscriptions in Bangladesh",
  canonical: siteUrl,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <link rel="llms-txt" href="/llms.txt" type="text/plain" />
        <link rel="preconnect" href={siteUrl} />
        <link rel="dns-prefetch" href={siteUrl} />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0e27] text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#f4b942] focus:text-[#0a0e27] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold">Skip to main content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-[4.5rem]">{children}</main>
        <Footer />
        <StickyWhatsApp />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
