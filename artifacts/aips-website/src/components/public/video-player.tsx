"use client";

import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  webmSrc: string;
  mp4Src: string;
  posterSrc: string;
  title: string;
  captionsSrc?: string;
  autoPlay?: boolean;
}

/**
 * VideoPlayer Component - Click-to-play video with controls
 * Used for testimonials, how-it-works, product demos
 * Responsive: 1280x720 (desktop), 960x540 (tablet), 600x337 (mobile)
 */
export function VideoPlayer({
  webmSrc,
  mp4Src,
  posterSrc,
  title,
  captionsSrc,
  autoPlay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleError = () => {
    setVideoError(true);
  };

  // Fallback if video fails to load
  if (videoError) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-900 aspect-video flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-white/60 text-sm mb-2">Video unavailable</p>
          <p className="text-white/40 text-xs">
            Please try again later or contact support
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black group">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-auto block"
        poster={posterSrc}
        playsInline
        autoPlay={autoPlay}
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={handleError}
        onClick={togglePlay}
      >
        {/* WebM format (primary) */}
        <source src={webmSrc} type="video/webm" />
        {/* MP4 fallback */}
        <source src={mp4Src} type="video/mp4" />
        {/* Captions */}
        {captionsSrc && (
          <track
            kind="captions"
            src={captionsSrc}
            srcLang="en"
            label="English"
            default
          />
        )}
        {/* Image fallback */}
        <img src={posterSrc} alt={title} className="w-full h-auto" />
      </video>

      {/* Play Button Overlay (shown when not playing) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors duration-300"
          aria-label={`Play ${title}`}
          type="button"
        >
          <div className="flex items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
            <Play className="size-12 text-white fill-white" />
          </div>
        </button>
      )}

      {/* Mute Button (shown when playing) */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 flex items-center justify-center rounded-lg bg-black/50 p-2 hover:bg-black/70 transition-colors z-10"
          aria-label={isMuted ? "Unmute" : "Mute"}
          type="button"
        >
          {isMuted ? (
            <VolumeX className="size-5 text-white" />
          ) : (
            <Volume2 className="size-5 text-white" />
          )}
        </button>
      )}

      {/* Video Duration Indicator (optional) */}
      <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg text-[0.75rem] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
        {title}
      </div>
    </div>
  );
}
