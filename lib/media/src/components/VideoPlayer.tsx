import React, { useEffect, useRef } from "react";

export interface VideoPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** HLS (.m3u8), MP4, or WebM source URL. HLS is attached via hls.js when needed. */
  src: string;
  /** Poster/thumbnail image URL. */
  poster?: string;
}

/**
 * Video player supporting HLS (via dynamic hls.js import), MP4, and WebM.
 * Safari plays HLS natively; other browsers get hls.js attached lazily so
 * the library is only downloaded when an HLS source is actually rendered.
 */
export function VideoPlayer({ src, poster, controls = true, ...rest }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHls = src.endsWith(".m3u8");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isHls) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }
    let hls: { destroy(): void } | undefined;
    let cancelled = false;
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      const instance = new Hls();
      instance.loadSource(src);
      instance.attachMedia(video);
      hls = instance;
    });
    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src, isHls]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      controls={controls}
      playsInline
      preload="metadata"
      {...(isHls ? {} : { src })}
      {...rest}
    />
  );
}
