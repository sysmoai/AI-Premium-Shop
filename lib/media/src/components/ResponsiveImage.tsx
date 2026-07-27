import React from "react";

export interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  /** Base URL of the image on the media CDN (see config/media.config.ts). */
  src: string;
  /** Widths to generate srcset entries for. */
  widths?: number[];
  /** sizes attribute; defaults to full viewport width. */
  sizes?: string;
  /** Build a URL variant for a given width/format. Defaults to CDN query params. */
  buildUrl?: (src: string, width: number, format?: "avif" | "webp") => string;
}

const defaultBuildUrl = (src: string, width: number, format?: "avif" | "webp") => {
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}w=${width}${format ? `&fm=${format}` : ""}`;
};

/**
 * <picture>-based responsive image with AVIF/WebP sources, srcset/sizes,
 * and native lazy loading. Falls back to the original format.
 */
export function ResponsiveImage({
  src,
  widths = [320, 640, 960, 1280, 1920],
  sizes = "100vw",
  buildUrl = defaultBuildUrl,
  loading = "lazy",
  decoding = "async",
  alt = "",
  ...rest
}: ResponsiveImageProps) {
  const srcSetFor = (format?: "avif" | "webp") =>
    widths.map((w) => `${buildUrl(src, w, format)} ${w}w`).join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={srcSetFor("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetFor("webp")} sizes={sizes} />
      <img
        src={src}
        srcSet={srcSetFor()}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        alt={alt}
        {...rest}
      />
    </picture>
  );
}
