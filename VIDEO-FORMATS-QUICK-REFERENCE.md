# 🎬 **VIDEO FORMATS - QUICK REFERENCE**
**Everything You Need to Know About Web Video Formats**

---

## 📊 **FORMAT COMPARISON AT A GLANCE**

| Format | Support | Size | Quality | Best For | Fallback |
|--------|---------|------|---------|----------|----------|
| **WebM (VP9)** | 85% | 🟢 Small | Excellent | Primary | NO |
| **MP4 (H.264)** | 99%+ | 🟡 Large | Good | Fallback | YES |
| **HLS (m3u8)** | 95% | 🟡 Variable | Adaptive | Streaming | NO |
| **HEVC (H.265)** | 50% | 🟢 Tiny | Excellent | Limited | NO |

### **RECOMMENDATION**
✅ Use **WebM + MP4 fallback** (covers 99%+ of users)

---

## 📁 **VIDEO SPECIFICATIONS**

### **HERO BACKGROUND VIDEO**
```
Resolution:    1920x1080px (16:9)
Duration:      3-5 seconds
WebM:          < 2MB
MP4:           < 5MB
Bitrate:       2500-3500 kbps
Codec:         VP9 (WebM), H.264 (MP4)
Audio:         Optional (will be muted)
Quality:       1080p
Loop:          YES (fade in/out ready)
Poster:        1920x1080 JPG
```

### **HOW IT WORKS VIDEO**
```
Resolution:    1280x720px (16:9)
Duration:      8-12 seconds
WebM:          < 3MB
MP4:           < 7MB
Bitrate:       1500-2500 kbps
Audio:         YES (voice-over)
Codec:         VP9 (WebM), H.264 (MP4)
Captions:      YES (SRT file)
Quality:       720p
Poster:        1280x720 JPG
```

### **TESTIMONIAL VIDEO**
```
Resolution:    1280x720px (16:9)
Duration:      15-30 seconds
WebM:          < 4MB
MP4:           < 10MB
Bitrate:       1500-2500 kbps
Audio:         YES (person speaking)
Codec:         VP9 (WebM), H.264 (MP4)
Captions:      YES (SRT file - required)
Quality:       720p
Poster:        1280x720 JPG (thumbnail)
```

### **PRODUCT DEMO VIDEO**
```
Resolution:    1280x720px (16:9)
Duration:      20-30 seconds
WebM:          < 5MB
MP4:           < 12MB
Bitrate:       2000-3000 kbps
Audio:         YES (narration/music)
Codec:         VP9 (WebM), H.264 (MP4)
Captions:      YES (SRT file)
Quality:       720p
Poster:        1280x720 JPG
```

---

## 🎯 **RESPONSIVE SIZING BY DEVICE**

### **Desktop (1024px+)**
```
Hero:       1920x1080 (100% width)
How-It-Works: 1280x720 (80% max-width)
Testimonial:  1280x720 (responsive grid)
Demo:       1280x720 (full-width capped)
Autoplay:   YES (muted only)
```

### **Tablet (768-1023px)**
```
Hero:       1024x576 (100% width)
How-It-Works: 960x540 (95% width)
Testimonial:  800x450 (responsive grid)
Demo:       960x540 (full-width)
Autoplay:   NO
```

### **Mobile (375-767px)**
```
Hero:       750x422 (100% width, no autoplay)
How-It-Works: 600x337 (full-width)
Testimonial:  500x281 (full-width stack)
Demo:       600x337 (full-width)
Autoplay:   NO
Play:       Click to start (respects data)
```

---

## 🔧 **FFMPEG CONVERSION COMMANDS**

### **Convert to WebM (Primary - Smaller File)**
```bash
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 2500k \
  -c:a libopus \
  -b:a 128k \
  -y \
  output.webm

# Explanation:
# -c:v libvpx-vp9       = Use VP9 codec for video
# -crf 30               = Quality (lower = better, 0-63)
# -b:v 2500k            = Bitrate 2500 kbps
# -c:a libopus          = Audio codec
# -b:a 128k             = Audio bitrate
```

### **Convert to MP4 (Fallback - Universal Support)**
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 23 \
  -b:v 3500k \
  -c:a aac \
  -b:a 128k \
  -y \
  output.mp4

# Explanation:
# -c:v libx264          = Use H.264 codec
# -crf 23               = Quality (lower = better, 0-51)
# -b:v 3500k            = Bitrate 3500 kbps
# -c:a aac              = Audio codec
# -b:a 128k             = Audio bitrate
```

### **Create Poster Image**
```bash
ffmpeg -i input.mp4 \
  -ss 00:00:02 \
  -vf scale=1280:720 \
  -q:v 2 \
  poster.jpg

# Explanation:
# -ss 00:00:02          = Capture at 2 seconds
# -vf scale=1280:720    = Resize to 1280x720
# -q:v 2                = Quality (1-31, lower is better)
```

### **Extract Captions to SRT**
```bash
# If video has burned-in captions, use OCR:
ffmpeg -i input.mp4 \
  -f srt \
  output.srt

# If video has subtitle stream:
ffmpeg -i input.mp4 \
  -map 0:s:0 \
  output.srt
```

### **Batch Convert All Videos**
```bash
#!/bin/bash
# Save as convert-videos.sh

for file in *.mp4; do
  filename="${file%.mp4}"
  echo "Converting $filename..."
  
  # WebM
  ffmpeg -i "$file" -c:v libvpx-vp9 -crf 30 -b:v 2500k -c:a libopus -b:a 128k "${filename}.webm"
  
  # MP4
  ffmpeg -i "$file" -c:v libx264 -crf 23 -b:v 3500k -c:a aac -b:a 128k "${filename}-fallback.mp4"
  
  # Poster
  ffmpeg -i "$file" -ss 00:00:02 -vf scale=1280:720 -q:v 2 "${filename}-poster.jpg"
  
  echo "✓ $filename done"
done
```

---

## 🌐 **BROWSER SUPPORT**

### **WebM (VP9)**
- ✅ Chrome 29+
- ✅ Firefox 28+
- ✅ Opera 16+
- ✅ Edge 14+
- ✅ Android Browser 5+
- ❌ Safari (use MP4 fallback)
- ❌ IE (use MP4 fallback)

### **MP4 (H.264)**
- ✅ Chrome (all)
- ✅ Firefox (all)
- ✅ Safari (all)
- ✅ Edge (all)
- ✅ Internet Explorer 9+
- ✅ iOS Safari (all)
- ✅ Android Browser (all)
- ✅ Samsung Internet (all)

### **Strategy**
```html
<video>
  <source src="video.webm" type="video/webm">  <!-- Primary: 85% support, small file -->
  <source src="video.mp4" type="video/mp4">    <!-- Fallback: 99% support -->
</video>
```

---

## ⚡ **FILE SIZE TARGETS**

### **Compression Goals**

```
Video Type          WebM Target    MP4 Target
─────────────────────────────────────────────
Hero (1920x1080)    < 2MB          < 5MB
How-It-Works        < 3MB          < 7MB
Testimonial         < 4MB          < 10MB
Product Demo        < 5MB          < 12MB
```

### **How to Achieve**

1. **Resolution:**  Keep at recommended size
2. **Bitrate:**     Use specified bitrate (2500k for WebM, 3500k for MP4)
3. **Duration:**    Shorter = smaller (keep under 30s)
4. **Quality:**     Accept slight quality loss for file size
5. **Audio:**       96-128k bitrate (mono is fine)

### **Check File Size**
```bash
# Linux/Mac
ls -lh filename.webm

# Windows
dir filename.webm
```

---

## 🎬 **HTML5 VIDEO SYNTAX**

### **Basic**
```html
<video width="1280" height="720" controls>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>
```

### **Full Featured**
```html
<video
  width="1280"
  height="720"
  controls
  preload="metadata"
  poster="poster.jpg"
  playsinline
  muted
>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  
  <!-- Captions -->
  <track kind="captions" src="captions.vtt" srcLang="en" label="English">
  
  Fallback: <a href="video.mp4">Download video</a>
</video>
```

### **Attributes Explained**
```
controls       = Show play/pause/volume/fullscreen buttons
preload        = "metadata" (load info), "auto" (load video), "none"
poster         = Image shown before playing
playsinline    = Play inline on iOS (not fullscreen)
muted          = Start muted (required for autoplay on most browsers)
autoplay       = Auto-play when loaded (requires muted)
loop           = Restart at end
```

---

## 🔍 **TESTING FILE SIZES**

### **Before Upload**
```bash
# Check WebM
ffprobe -v error -show_entries stream=width,height,duration,bit_rate \
  -of default=noprint_wrappers=1:nokey=1:novalue=1 video.webm

# Check MP4
ffprobe -v error -show_entries stream=width,height,duration,bit_rate \
  -of default=noprint_wrappers=1:nokey=1:novalue=1 video.mp4
```

### **After Upload**
```bash
# Test from Supabase CDN
curl -I https://cdn.supabase.../video.webm

# Check Content-Type
# Should show: Content-Type: video/webm

# Check Content-Length
# Should be within target size
```

---

## 📱 **MOBILE OPTIMIZATION**

### **Mobile-Specific**
```html
<video playsinline muted>
  <!-- playsinline: Play inline, not fullscreen on iOS -->
  <!-- muted: Required for autoplay on mobile -->
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
</video>
```

### **Mobile Data Considerations**
- WebM is 50-80% smaller (better for 4G/3G)
- Don't autoplay on mobile (saves data)
- Use `preload="none"` on mobile (user click loads video)
- Show poster until user clicks

### **Mobile Performance**
- Load time goal: <2 seconds on 4G
- File size: <80KB for mobile variant (600px wide)
- Bitrate: 1000-1500 kbps max

---

## 🎨 **POSTER IMAGE SPECS**

### **Create Good Poster**
```
Format:       JPG (JPEG)
Resolution:  Same as video (e.g., 1280x720)
File Size:   < 150KB
Quality:     Good quality (90-95 JPG quality)
Content:     Show engaging frame from video
             NOT just black screen

Naming:
  video.webm       →  video-poster.jpg
  testimonial.mp4  →  testimonial-poster.jpg
  demo.mp4         →  demo-poster.jpg
```

### **Create with FFmpeg**
```bash
# Extract frame at 2 seconds
ffmpeg -i input.mp4 -ss 00:00:02 -vf scale=1280:720 -q:v 2 poster.jpg

# Extract frame at 5 seconds
ffmpeg -i input.mp4 -ss 00:00:05 -vf scale=1280:720 -q:v 2 poster.jpg

# -q:v 2 = quality (1 best, 31 worst)
```

---

## 📊 **FILE SIZE COMPARISON**

### **Example: 10-second video at 1280x720**

```
Format                Size        Load Time (4G)    Quality
─────────────────────────────────────────────────────────
WebM (VP9, 2.5Mbps)   3MB         6 seconds         Excellent
MP4 (H.264, 3.5Mbps)  7MB         14 seconds        Good
Raw (no compression)  500MB+      N/A               Excellent
HLS (adaptive)        3-5MB       3-8 seconds       Variable
```

**WebM wins for web!** 🏆

---

## ✅ **QUICK CHECKLIST**

### **Before Sending Videos to Claude**
- [ ] Video exported as MP4 (high quality)
- [ ] Resolution: 1920x1080 (hero) or 1280x720 (others)
- [ ] Duration correct (3-5s, 8-12s, 15-30s, 20-30s)
- [ ] Audio clear (if applicable)
- [ ] No watermarks visible
- [ ] High quality (no compression artifacts)

### **After Conversion**
- [ ] WebM created (<2MB for hero, <5MB for others)
- [ ] MP4 created (<5MB for hero, <12MB for others)
- [ ] Poster image created (JPG, <150KB)
- [ ] Captions created (SRT file)
- [ ] All files have correct names
- [ ] Files upload to Supabase CDN
- [ ] CDN URLs working
- [ ] Videos play in browser
- [ ] No console errors

---

## 🔗 **USEFUL TOOLS**

### **Online Converters**
- Squoosh (Google): https://squoosh.app/ (images + video)
- CloudConvert: https://cloudconvert.com/
- Handbrake: https://handbrake.fr/ (desktop)

### **FFmpeg Alternatives**
- Handbrake (GUI, easy)
- DaVinci Resolve (professional)
- Adobe Media Encoder (professional)
- VLC (free, basic)

### **Validation**
- MediaInfo: https://mediaarea.net/en/MediaInfo
- FFprobe: Part of FFmpeg package

---

## 📞 **READY?**

### **What to Do:**
1. ✅ Generate videos (any tool)
2. ✅ Export as MP4
3. ✅ Send to me
4. ✅ I'll convert to WebM + MP4
5. ✅ Upload to Supabase CDN
6. ✅ Provide CDN URLs
7. ✅ You update code
8. ✅ Deploy!

**Send videos anytime!** 🚀

