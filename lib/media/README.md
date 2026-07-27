# @aips/media — shared media handling stack

Shared, framework-light media utilities for all AIPS frontends (Vite landing, Next.js Phoenix site).

## What's included

| Area | Where | Notes |
|---|---|---|
| Responsive images (srcset/picture, AVIF/WebP) | `src/components/ResponsiveImage.tsx` | CDN-variant URLs via `buildUrl` |
| Lazy loading (IntersectionObserver) | `src/components/LazyMedia.tsx` | Wrap any heavy media |
| Video player (HLS/MP4/WebM, poster thumbnails) | `src/components/VideoPlayer.tsx` | hls.js loaded lazily; Safari native HLS |
| Gallery/carousel | `src/components/Carousel.tsx` | Scroll-snap, keyboard, dots, no deps |
| Image optimization (resize, WebP/AVIF conversion) | `src/server/optimize.ts` | sharp, lazy-imported |
| EXIF / metadata | `src/server/metadata.ts` | exifr; GPS stripped by default |
| Upload validation | `src/server/upload.ts` | Magic-byte sniffing, size limits |
| SVG optimization | `svgo` (optionalDependency) | Run in build scripts; sanitize user SVGs |
| Canvas | native `<canvas>` | No wrapper needed; use for client-side crops |

## CDN configuration

`ResponsiveImage` assumes an image CDN that accepts `?w=<width>&fm=<webp|avif>`
(Vercel Image Optimization, Cloudflare Images, imgix all support an equivalent —
pass a custom `buildUrl` to match). The media host is
`NEXT_PUBLIC_MEDIA_URL=https://media.aipremiumshop.com` (see `config/`).

In the Next.js app (`artifacts/aips-website`) prefer `next/image` for static
pages — it already uses sharp + AVIF/WebP; use these components where `next/image`
doesn't fit (carousels, HLS video, the Vite apps).

## Install

Workspace package — from repo root:

```sh
pnpm add @aips/media --filter <app>   # then: import { ResponsiveImage } from "@aips/media"
```

`sharp` and `svgo` are optionalDependencies so client-only apps don't pull native binaries.
