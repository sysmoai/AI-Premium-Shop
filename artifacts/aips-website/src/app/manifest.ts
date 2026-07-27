import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Premium Shop",
    short_name: "AI Premium Shop",
    description: "Buy Premium AI Subscriptions in Bangladesh. ChatGPT Plus, Claude Pro, Midjourney, Canva Pro & 86+ more. Pay with bKash or Nagad.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e27",
    theme_color: "#0a0e27",
    icons: [
      {
        src: "/icon.png",
        sizes: "500x500",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["shopping", "business"],
    lang: "en",
    dir: "ltr",
    orientation: "portrait",
    scope: "/",
  };
}
