# 🎬 **HOMEPAGE VIDEO STRATEGY**
**AI Premium Shop - Professional Video Integration for All Devices**

---

## 🎯 **STRATEGY OVERVIEW**

Add 3-4 strategic videos to homepage that:
- ✅ Load fast on all devices (mobile 4G, desktop, tablet)
- ✅ Autoplay silently on desktop (no jarring sound)
- ✅ Play on-click on mobile (respects data usage)
- ✅ Perfect responsive design (375px → 1920px)
- ✅ Professional quality (1080p)
- ✅ Zero performance issues
- ✅ SEO optimized
- ✅ Accessible (captions, controls)

---

## 📍 **VIDEO PLACEMENT ON HOMEPAGE**

### **1. HERO SECTION BACKGROUND VIDEO** (Primary)
**Location:** Hero section (right side, or fullscreen background)
**Purpose:** Showcase product in action + brand vibes
**Duration:** 3-5 seconds (looped)
**Content:** AI tool demo, subscription setup, or feature showcase
**Autoplay:** Yes (muted on desktop, play-on-click on mobile)

### **2. HOW IT WORKS - STEP BY STEP** (Optional)
**Location:** How It Works section
**Purpose:** Visual walkthrough instead of text only
**Duration:** 8-12 seconds
**Content:** 4-step process with animations
**Autoplay:** No (user clicks to play)

### **3. TESTIMONIAL VIDEO** (Optional)
**Location:** Testimonials section (replace static testimonial)
**Purpose:** Real customer using product
**Duration:** 15-30 seconds
**Content:** Customer speaking about experience
**Autoplay:** No (user clicks to play)

### **4. PRODUCT DEMO VIDEO** (Optional)
**Location:** Featured Products section or new section
**Purpose:** Show AI tools in action
**Duration:** 20-30 seconds
**Content:** ChatGPT, Midjourney, Claude demos
**Autoplay:** No (user clicks to play)

---

## 📊 **BEST VIDEO FORMATS FOR WEB**

### **Format Comparison**

| Format | Browser Support | File Size | Quality | Recommended |
|--------|-----------------|-----------|---------|-------------|
| **MP4 (H.264)** | 99%+ | Medium | Good | ✅ YES (Fallback) |
| **WebM (VP9)** | 85%+ | Small | Excellent | ✅ YES (Primary) |
| **HLS (m3u8)** | 95%+ | Variable | Adaptive | ✅ YES (Streaming) |
| **HEVC (H.265)** | 50% | Very Small | Excellent | ⚠️ Limited |
| **AV1** | 60% | Tiny | Excellent | ⚠️ Too new |

### **RECOMMENDED STRATEGY**

```
Primary:  WebM (VP9) + H.264 (MP4) fallback
Adaptive: HLS for large files
Fallback: PNG poster image
```

---

## 🎥 **VIDEO SPECIFICATIONS**

### **1. HERO BACKGROUND VIDEO**
```
Resolution:     1920x1080px (16:9 aspect ratio)
Duration:       3-5 seconds
Format:         WebM (VP9) + MP4 (H.264)
File Size:      WebM <2MB, MP4 <5MB
Quality:        1080p
Codec:          VP9 (WebM), H.264 (MP4)
Bitrate:        2500-3500 kbps
FPS:            30 fps
Content:        Loop-ready (no fade in/out)
Audio:          Optional (will be muted)
```

**Optimization Targets:**
- Desktop (1920x1080): WebM <2MB, MP4 <5MB
- Tablet (1024x576): WebM <1.5MB, MP4 <3MB
- Mobile (750x422): WebM <800KB, MP4 <2MB

### **2. HOW IT WORKS VIDEO**
```
Resolution:     1280x720px (16:9 aspect ratio)
Duration:       8-12 seconds
Format:         WebM + MP4
File Size:      WebM <3MB, MP4 <7MB
Quality:        720p
Bitrate:        1500-2500 kbps
FPS:            30 fps
Content:        4-step animation/screencast
Audio:          YES (English, optional captions)
Poster:         PNG screenshot (800x450)
```

### **3. TESTIMONIAL VIDEO**
```
Resolution:     1280x720px (16:9 aspect ratio)
Duration:       15-30 seconds
Format:         WebM + MP4
File Size:      WebM <4MB, MP4 <10MB
Quality:        720p
Bitrate:        1500-2500 kbps
Content:        Person speaking (talking head)
Audio:          YES (with captions)
Captions:       SRT file (required for accessibility)
Poster:         Video thumbnail
```

### **4. PRODUCT DEMO VIDEO**
```
Resolution:     1280x720px (16:9 aspect ratio)
Duration:       20-30 seconds
Format:         WebM + MP4
File Size:      WebM <5MB, MP4 <12MB
Quality:        720p
Bitrate:        2000-3000 kbps
Content:        Screen recording or demo footage
Audio:          YES (upbeat, fast-paced)
Captions:       YES (hard-coded or SRT)
Poster:         Video thumbnail
```

---

## 🎬 **VIDEO CREATION WORKFLOW**

### **Step 1: Generate Videos Using Higgsfield**
- Use your existing videos or create new ones with Higgsfield
- Record at 1080p/60fps (we'll scale down)
- Ensure content is clear and engaging
- Include subtitles/captions for accessibility

### **Step 2: Download Videos**
- Export as MP4 (highest quality)
- Size: 1920x1080px or larger
- Duration: As specified above

### **Step 3: Convert to Multiple Formats**
**Using FFmpeg (or online tool):**

```bash
# WebM (VP9) - Primary format, smaller file
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 2500k -c:a libopus output.webm

# MP4 (H.264) - Fallback, universal support
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -b:v 3500k -c:a aac output.mp4

# Poster image (screenshot)
ffmpeg -i input.mp4 -ss 00:00:02 -vf scale=1280:720 -q:v 2 poster.jpg
```

### **Step 4: Optimize File Sizes**
- WebM target: <2MB for hero, <3MB for others
- MP4 target: <5MB for hero, <8MB for others
- Use Handbrake or FFmpeg with proper bitrate

### **Step 5: Upload to Supabase Storage**
```
Structure:
/videos/
  ├── hero-bg/
  │   ├── hero-bg.webm
  │   ├── hero-bg.mp4
  │   └── hero-bg-poster.jpg
  ├── how-it-works/
  │   ├── how-it-works.webm
  │   ├── how-it-works.mp4
  │   ├── how-it-works.srt
  │   └── how-it-works-poster.jpg
  ├── testimonial/
  │   ├── testimonial.webm
  │   ├── testimonial.mp4
  │   ├── testimonial.srt
  │   └── testimonial-poster.jpg
  └── product-demo/
      ├── product-demo.webm
      ├── product-demo.mp4
      ├── product-demo.srt
      └── product-demo-poster.jpg
```

---

## 💻 **IMPLEMENTATION CODE**

### **Option 1: Hero Background Video Component**

```tsx
// src/components/public/hero-video.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const isMobileDevice = /iPhone|iPad|Android|webOS|BlackBerry/i.test(
      navigator.userAgent
    );
    setIsMobile(isMobileDevice);

    // Auto-play only on desktop
    if (!isMobileDevice && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user can click to play
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Video Container */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay={!isMobile}
        muted
        loop
        playsInline
        controls={isMobile} // Show controls on mobile
        poster="https://cdn.supabase.../hero-bg-poster.jpg"
        preload="metadata"
      >
        {/* WebM format (primary, smaller) */}
        <source
          src="https://cdn.supabase.../videos/hero-bg/hero-bg.webm"
          type="video/webm"
        />
        {/* MP4 fallback (universal support) */}
        <source
          src="https://cdn.supabase.../videos/hero-bg/hero-bg.mp4"
          type="video/mp4"
        />
        {/* Fallback for no video support */}
        <img
          src="https://cdn.supabase.../hero-bg-poster.jpg"
          alt="AI Premium Shop Hero"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Overlay gradient (optional - for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
    </div>
  );
}
```

### **Option 2: Click-to-Play Video Component**

```tsx
// src/components/public/video-player.tsx
"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  webmSrc: string;
  mp4Src: string;
  posterSrc: string;
  title: string;
  captionsSrc?: string; // Optional SRT file
}

export function VideoPlayer({
  webmSrc,
  mp4Src,
  posterSrc,
  title,
  captionsSrc,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black group">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-auto block"
        poster={posterSrc}
        playsInline
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* WebM format (primary) */}
        <source src={webmSrc} type="video/webm" />
        {/* MP4 fallback */}
        <source src={mp4Src} type="video/mp4" />
        {/* Captions (if provided) */}
        {captionsSrc && (
          <track kind="captions" src={captionsSrc} srcLang="en" label="English" />
        )}
        {/* Fallback */}
        <img src={posterSrc} alt={title} className="w-full h-auto" />
      </video>

      {/* Play Button Overlay (shown when not playing) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors"
          aria-label={`Play ${title}`}
        >
          <Play className="size-16 text-white fill-white" />
        </button>
      )}
    </div>
  );
}
```

### **Option 3: Hero Section with Video (Full Implementation)**

```tsx
// src/app/page.tsx - Updated HERO SECTION

import { HeroVideo } from "@/components/public/hero-video";

export default function Home() {
  return (
    <>
      {/* ... existing code ... */}

      {/* HERO SECTION WITH VIDEO */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="gradient-orb gradient-orb-gold w-[600px] h-[600px] -top-40 -left-40 animate-pulse-glow" />
          <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-1/3 right-0 animate-pulse-glow" style={{ animationDelay: "-2s" }} />
          <div className="gradient-orb gradient-orb-blue w-[400px] h-[400px] bottom-0 left-1/3 animate-pulse-glow" style={{ animationDelay: "-4s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left: Copy */}
            <div className="max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f4b942]/20 bg-[#f4b942]/5 px-4 py-1.5 text-[0.8125rem] text-[#f4b942] mb-8">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#f4b942] opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#f4b942]" />
                </span>
                Premium access, local payment, human support
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]">
                Buy Premium AI{" "}
                <span className="text-gradient">Subscriptions</span>{" "}
                in Bangladesh
              </h1>

              <p className="mt-6 text-[1rem] leading-relaxed text-[#8a91a8] max-w-md">
                ChatGPT Plus, Claude Pro, Midjourney, Canva Pro, GitHub Copilot, and 98+ more.
                Pay with bKash or Nagad. Delivered in minutes on WhatsApp.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/products" className="btn-primary">
                  Browse Products
                  <ChevronRight className="size-4" />
                </Link>
                <a href={whatsappUrl} className="btn-secondary">
                  <MessageCircle className="size-4 text-[#25d366]" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 max-w-md">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-lg sm:text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs sm:text-[0.6875rem] text-[#5b6280] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: VIDEO HERO */}
            <div className="relative hidden lg:block min-h-[500px]">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
              <div className="relative rounded-2xl border border-white/[0.06] overflow-hidden">
                <HeroVideo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... rest of homepage ... */}
    </>
  );
}
```

---

## 🎬 **RESPONSIVE VIDEO BEHAVIOR**

### **Desktop (1024px+)**
- Video resolution: 1920x1080px
- Aspect ratio: 16:9
- Autoplay: Yes (muted)
- Controls: Hidden (autoplay loop)
- File: WebM preferred, MP4 fallback
- Preload: metadata (starts loading immediately)

### **Tablet (768px-1023px)**
- Video resolution: 1280x720px
- Aspect ratio: 16:9 or adjusted
- Autoplay: No (respects user preference)
- Controls: Visible
- File: WebM or MP4 (choose smaller)
- Preload: none (save bandwidth)

### **Mobile (375px-767px)**
- Video resolution: 750x422px (16:9 scaled)
- Aspect ratio: 16:9 (responsive width)
- Autoplay: No
- Controls: Visible
- File: MP4 (better mobile support)
- Preload: none
- Poster: Visible until played
- Play: Click to play (respects data usage)

---

## ⚡ **PERFORMANCE OPTIMIZATION**

### **1. Video Preloading Strategy**
```html
<!-- Metadata only - fast initial load -->
<video preload="metadata">

<!-- Or none - user must click to start loading -->
<video preload="none" poster="...">
```

### **2. Lazy Loading Videos**
```tsx
// Load video only when entering viewport
<video loading="lazy" ... >
```

### **3. Responsive Video Sizing**
```css
video {
  width: 100%;
  height: auto;
  max-width: 1920px;
  aspect-ratio: 16 / 9;
  object-fit: cover; /* Maintain aspect ratio */
}
```

### **4. Mobile Data Optimization**
- Show poster image first
- Require user click to play
- Use MP4 (better compression on mobile)
- Max 2-3 videos per page
- Total video size <20MB per page

### **5. Caching Strategy**
- Set Supabase cache headers to 1 year (videos don't change)
- Use CDN edge caching
- Browser caching enabled
- Expected load time: <1s desktop, <2s mobile

---

## 📱 **RESPONSIVE VIDEO GRID IMPLEMENTATION**

### **For Multiple Videos (e.g., Testimonials)**

```tsx
// src/components/public/video-grid.tsx
"use client";

import { VideoPlayer } from "./video-player";

const testimonialVideos = [
  {
    id: 1,
    webmSrc: "https://cdn.supabase.../testimonial-1.webm",
    mp4Src: "https://cdn.supabase.../testimonial-1.mp4",
    posterSrc: "https://cdn.supabase.../testimonial-1-poster.jpg",
    title: "Testimonial from Rafi K.",
    name: "Rafi K.",
    role: "Freelancer",
  },
  {
    id: 2,
    webmSrc: "https://cdn.supabase.../testimonial-2.webm",
    mp4Src: "https://cdn.supabase.../testimonial-2.mp4",
    posterSrc: "https://cdn.supabase.../testimonial-2-poster.jpg",
    title: "Testimonial from Tasnim A.",
    name: "Tasnim A.",
    role: "Student",
  },
  // ... more testimonials
];

export function VideoTestimonialGrid() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {testimonialVideos.map((video) => (
        <div key={video.id} className="glass-card rounded-2xl overflow-hidden">
          <VideoPlayer
            webmSrc={video.webmSrc}
            mp4Src={video.mp4Src}
            posterSrc={video.posterSrc}
            title={video.title}
          />
          <div className="p-4">
            <p className="text-[0.8125rem] font-semibold text-white">
              {video.name}
            </p>
            <p className="text-[0.6875rem] text-[#5b6280]">{video.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔍 **SEO & ACCESSIBILITY**

### **Schema.org Video Markup**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How to order AI subscriptions",
  "description": "Step-by-step guide to ordering premium AI tools with local payment",
  "thumbnailUrl": "https://cdn.supabase.../poster.jpg",
  "uploadDate": "2026-07-30",
  "duration": "PT12S",
  "contentUrl": "https://cdn.supabase.../video.mp4",
  "embedUrl": "https://aipremiumshop.com/videos/how-it-works"
}
</script>
```

### **Accessibility Requirements**
- ✅ Captions (SRT file for hard of hearing)
- ✅ Controls visible (play/pause/volume/fullscreen)
- ✅ Keyboard accessible (Tab, Enter, Spacebar)
- ✅ Alt text on poster image
- ✅ Aria-label on play button
- ✅ No autoplay with sound (muted only)

### **Video Track (VTT Captions)**
```html
<video>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srcLang="en" label="English">
</video>
```

**captions.vtt:**
```
WEBVTT

00:00:00.000 --> 00:00:03.000
Welcome to AI Premium Shop

00:00:03.000 --> 00:00:06.000
Order your favorite AI tools with local payment
```

---

## 📊 **VIDEO DELIVERY CHECKLIST**

### **Before Upload**
- [ ] Video recorded at 1080p/60fps or higher
- [ ] Duration meets specs (3-30s depending on use)
- [ ] Audio quality is clear
- [ ] Captions created (SRT format)
- [ ] No visible watermarks
- [ ] Poster image created (1280x720 JPG)

### **During Conversion**
- [ ] WebM converted with VP9 codec
- [ ] MP4 converted with H.264 codec
- [ ] File sizes optimized (<2MB WebM, <5MB MP4 for hero)
- [ ] Quality verified visually
- [ ] No encoding artifacts

### **After Upload**
- [ ] All files uploaded to Supabase
- [ ] CDN URLs working
- [ ] Videos load quickly (<1s desktop, <2s mobile)
- [ ] Poster images display correctly
- [ ] Captions load and display
- [ ] Video plays on all devices
- [ ] Responsive behavior tested (375px, 768px, 1920px)
- [ ] No performance issues detected
- [ ] SEO markup added

---

## 🎯 **RECOMMENDED VIDEO LOCATIONS**

### **Priority 1 (Most Important)**
1. **Hero Section** - Showcase product/brand (3-5s autoplay muted video)
2. **How It Works** - Animated walkthrough (8-12s click-to-play)

### **Priority 2 (Enhances Conversion)**
3. **Testimonials** - Customer videos (15-30s click-to-play)
4. **Product Demo** - AI tools in action (20-30s click-to-play)

### **Priority 3 (Nice to Have)**
5. **Feature Highlights** - Benefits visualization
6. **Brand Story** - Company mission/values
7. **FAQ Answers** - Video explanations

---

## 💾 **SUPABASE STORAGE SETUP**

### **Create Video Bucket**
```bash
# Via Supabase Dashboard:
1. Go to Storage → Create new bucket
2. Name: "videos"
3. Privacy: Public (for CDN access)
4. Enable CDN
5. Set cache control: 31536000 (1 year)
```

### **Upload Videos**
```bash
# Via CLI or dashboard
1. Create folders: hero-bg/, how-it-works/, testimonials/, products/
2. Upload WebM and MP4 for each video
3. Upload poster JPGs
4. Upload SRT caption files
5. Set access to Public (readable)
```

### **Get CDN URLs**
```
Format: https://[project].supabase.co/storage/v1/object/public/videos/[path]

Example:
- https://xxx.supabase.co/storage/v1/object/public/videos/hero-bg/hero-bg.webm
- https://xxx.supabase.co/storage/v1/object/public/videos/hero-bg/hero-bg.mp4
- https://xxx.supabase.co/storage/v1/object/public/videos/hero-bg/hero-bg-poster.jpg
```

---

## 🚀 **IMPLEMENTATION TIMELINE**

| Step | Time | What |
|------|------|------|
| **1. Plan** | 30 min | Decide which videos, where, content |
| **2. Create/Record** | 1-2 hours | Generate videos with Higgsfield or record |
| **3. Convert** | 30 min | WebM + MP4 conversion + optimization |
| **4. Upload** | 15 min | Upload to Supabase, get URLs |
| **5. Implement** | 1-2 hours | Add components to homepage |
| **6. Test** | 30 min | Test all devices, all browsers |
| **7. Deploy** | 10 min | Commit, PR, deploy to production |
| **TOTAL** | **4-5 hours** | **Complete video homepage** |

---

## ✅ **FINAL CHECKLIST**

**Before Deployment:**
- [ ] Videos created/recorded and exported
- [ ] Converted to WebM + MP4
- [ ] Poster images created
- [ ] Captions created (SRT)
- [ ] All files uploaded to Supabase CDN
- [ ] Components created and tested
- [ ] Responsive design verified (375px, 768px, 1920px)
- [ ] Performance tested (load times <2s)
- [ ] Accessibility checked (captions, controls, keyboard)
- [ ] SEO markup added (schema.org)
- [ ] All links verified
- [ ] Works on all browsers (Chrome, Firefox, Safari, Edge)
- [ ] Works on mobile (iOS Safari, Android Chrome)
- [ ] No console errors
- [ ] Performance score >85 (Lighthouse)

---

## 📞 **READY TO ADD VIDEOS?**

**Next Steps:**
1. ✅ Generate 3-4 videos using Higgsfield or record them
2. ✅ Send me videos (MP4 format)
3. ✅ I'll convert to WebM/MP4, create captions, upload to Supabase
4. ✅ I'll implement responsive video components
5. ✅ I'll integrate into homepage
6. ✅ I'll test on all devices
7. ✅ Deploy to production

**What to Send Me:**
```
Video 1: Hero background (3-5 seconds)
         - Content: Product showcase or brand vibes
         - File: MP4, high quality

Video 2: How It Works (8-12 seconds)
         - Content: 4-step animated walkthrough
         - File: MP4, with audio/captions

Video 3 (Optional): Testimonial (15-30 seconds)
         - Content: Customer speaking
         - File: MP4, with audio/captions

Video 4 (Optional): Product Demo (20-30 seconds)
         - Content: AI tools in action
         - File: MP4, with audio/captions
```

---

# 🎬 **LET'S ADD PROFESSIONAL VIDEOS TO YOUR HOMEPAGE!**

**With best formats, responsive design, performance optimization, and perfect multi-device support.** ✨

