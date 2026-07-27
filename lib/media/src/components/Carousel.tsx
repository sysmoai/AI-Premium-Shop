import React, { useCallback, useRef, useState } from "react";
import { ResponsiveImage } from "./ResponsiveImage";

export interface CarouselImage {
  src: string;
  alt: string;
}

export interface CarouselProps {
  images: CarouselImage[];
  /** sizes attribute forwarded to each image. */
  sizes?: string;
  className?: string;
}

/**
 * Dependency-free image carousel with scroll-snap, keyboard arrows,
 * and dot indicators. Uses ResponsiveImage for AVIF/WebP + lazy loading.
 */
export function Carousel({ images, sizes = "100vw", className }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, track.children.length - 1));
    (track.children[clamped] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setIndex(clamped);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollTo(index + 1);
    if (e.key === "ArrowLeft") scrollTo(index - 1);
  };

  return (
    <div className={className} role="region" aria-label="Image carousel" tabIndex={0} onKeyDown={onKeyDown}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: "0.5rem",
        }}
      >
        {images.map((img, i) => (
          <div key={img.src} style={{ flex: "0 0 100%", scrollSnapAlign: "start" }}>
            <ResponsiveImage
              src={img.src}
              alt={img.alt}
              sizes={sizes}
              loading={i === 0 ? "eager" : "lazy"}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "0.5rem" }}>
        {images.map((img, i) => (
          <button
            key={img.src}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => scrollTo(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "none",
              background: i === index ? "#111" : "#bbb",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
