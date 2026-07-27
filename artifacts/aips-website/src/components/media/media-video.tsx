"use client";

import { useEffect, useRef, useState } from "react";

interface MediaVideoProps {
  /** WebM source under /public, e.g. "/media/hero/aips-hero-home-loop-1920x1080.webm" */
  src: string;
  /** MP4/H.264 fallback source (optional but recommended) */
  srcMp4?: string;
  /** Poster image, always required — shown before load, on slow connections, and for reduced-motion users */
  poster: string;
  width: number;
  height: number;
  className?: string;
  /** Descriptive label for assistive tech */
  ariaLabel: string;
}

/**
 * Autoplaying ambient video: muted, looped, playsinline, lazy — playback
 * starts only when scrolled into view, and users with prefers-reduced-motion
 * get the poster image instead. No audio, ever.
 */
export function MediaVideo({
  src,
  srcMp4,
  poster,
  width,
  height,
  className,
  ariaLabel,
}: MediaVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={poster}
        alt={ariaLabel}
        width={width}
        height={height}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      width={width}
      height={height}
      className={className}
      aria-label={ariaLabel}
    >
      <source src={src} type="video/webm" />
      {srcMp4 ? <source src={srcMp4} type="video/mp4" /> : null}
    </video>
  );
}
