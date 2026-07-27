import Image from "next/image";
import { CSSProperties } from "react";

interface MediaImageProps {
  /** Path under /public, e.g. "/media/products/aips-product-chatgpt-card-800x600.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
}

/**
 * Standard image wrapper: explicit dimensions (no CLS), lazy by default,
 * responsive sizes. Use for every static visual instead of raw <img>.
 */
export function MediaImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  style,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={style}
      sizes={sizes}
    />
  );
}
