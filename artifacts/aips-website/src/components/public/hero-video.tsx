"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * HeroVideo Component - Autoplay muted on desktop, click-to-play on mobile
 * Responsive video with multiple format support (WebM + MP4)
 * Desktop: 1920×1080, Tablet: 1024×576, Mobile: 600×338
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [deviceType, setDeviceType] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectDevice = () => {
      const isMobileDevice = /iPhone|iPad|Android|webOS|BlackBerry/i.test(
        navigator.userAgent
      );
      const isTabletDevice = /iPad|Android(?!.*Mobile)|Tablet/i.test(
        navigator.userAgent
      );

      if (isMobileDevice) {
        setDeviceType("mobile");
      } else if (isTabletDevice) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
        // Auto-play only on desktop
        videoRef.current?.play().catch(() => {
          // Autoplay failed, user can click to play
        });
      }
    };

    detectDevice();
  }, []);

  const handleError = () => {
    setVideoError(true);
  };

  // Fallback if videos fail to load
  if (videoError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <p className="text-white/60 text-sm">Video unavailable</p>
        </div>
      </div>
    );
  }

  // Determine which video sources to use based on device
  const desktopWebM = "https://fjpkhgecnothqjfhxrhx.supabase.co/storage/v1/object/public/videos/homepage-hero.webm";
  const desktopMP4 = "https://fjpkhgecnothqjfhxrhx.supabase.co/storage/v1/object/public/videos/homepage-hero-optimized.mp4";
  const mobileWebM = "https://fjpkhgecnothqjfhxrhx.supabase.co/storage/v1/object/public/videos/homepage-hero-mobile.webm";
  const posterImg = "https://fjpkhgecnothqjfhxrhx.supabase.co/storage/v1/object/public/videos/homepage-hero-poster.jpg";

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-black">
      {/* Video Container */}
      <picture>
        {/* Mobile variant (600×800) for small devices */}
        <source
          media="(max-width: 640px)"
          srcSet={mobileWebM}
          type="video/webm"
        />

        {/* Desktop/Tablet variant (1920×1080) for larger devices */}
        <source
          media="(min-width: 641px)"
          srcSet={desktopWebM}
          type="video/webm"
        />

        {/* MP4 fallback for older browsers */}
        <source
          media="(min-width: 641px)"
          srcSet={desktopMP4}
          type="video/mp4"
        />

        {/* Video element as fallback for picture tag */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay={deviceType === "desktop"}
          muted
          loop
          playsInline
          controls={deviceType !== "desktop"}
          poster={posterImg}
          preload="metadata"
          onError={handleError}
        >
          {/* Primary WebM format (smaller, better quality) */}
          <source src={desktopWebM} type="video/webm" />

          {/* MP4 fallback (universal browser support) */}
          <source src={desktopMP4} type="video/mp4" />

          {/* Image fallback for no video support */}
          <Image
            src={posterImg}
            alt="AI Premium Shop - Premium AI Subscriptions in Bangladesh"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
        </video>
      </picture>

      {/* Subtle overlay gradient for text readability (when needed) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
