# AIPS Media Library

Naming convention: `aips-[type]-[subject]-[variant]-[WxH].[ext]`
Examples:
- `hero/aips-hero-home-loop-1920x1080.webm` (+ `posters/aips-hero-home-poster-1920x1080.webp`)
- `products/aips-product-chatgpt-plus-card-800x600.webp`
- `categories/aips-category-ai-video-loop-800x450.webm`

Rules: images AVIF/WebP; video WebM/MP4 (H.264 fallback), muted, loop,
poster always present in /posters. Use <MediaImage> / <MediaVideo> from
src/components/media — never raw <img>/<video>.
