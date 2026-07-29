#!/bin/bash

echo ""
echo "🎬🎵 Merging Hero Video with Professional Introduction Audio"
echo "=============================================================="
echo ""

cd /Users/emonhossain/AI-Premium-Shop

# Files
VIDEO="hero-video-no-audio.mp4"
AUDIO="aips-intro-professional.mp3"
OUTPUT="hero-intro-video-final.mp4"
WEBM="hero-intro-video.webm"
POSTER="hero-intro-poster.jpg"

echo "✅ Files Found:"
ls -lh "$VIDEO" "$AUDIO" 2>/dev/null | awk '{print "   " $9 " - " $5}'
echo ""

# Merge
echo "1️⃣ Merging video with introduction audio..."
ffmpeg -i "$VIDEO" -i "$AUDIO" \
  -c:v copy \
  -c:a aac \
  -map 0:v:0 -map 1:a:0 \
  -shortest \
  "$OUTPUT" -y 2>&1 | grep -E "(time=)" | tail -1

if [ -f "$OUTPUT" ]; then
  size=$(du -h "$OUTPUT" | cut -f1)
  echo "   ✅ Merged: $OUTPUT ($size)"
fi

echo ""
echo "2️⃣ Creating WebM format (optimized, 50-80% smaller)..."
ffmpeg -i "$OUTPUT" \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 2500k \
  -c:a libopus \
  -b:a 128k \
  "$WEBM" -y 2>&1 | grep -E "(time=)" | tail -1

if [ -f "$WEBM" ]; then
  size=$(du -h "$WEBM" | cut -f1)
  echo "   ✅ WebM: $WEBM ($size)"
fi

echo ""
echo "3️⃣ Creating poster image..."
ffmpeg -i "$OUTPUT" \
  -ss 00:00:01 \
  -vf scale=1920:1080 \
  -q:v 2 \
  "$POSTER" -y 2>&1 | tail -1

if [ -f "$POSTER" ]; then
  size=$(du -h "$POSTER" | cut -f1)
  echo "   ✅ Poster: $POSTER ($size)"
fi

echo ""
echo "=============================================================="
echo "✅ PROFESSIONAL INTRODUCTION VIDEO READY!"
echo "=============================================================="
echo ""
ls -lh hero-intro-* | awk '{print "   " $9 " - " $5}'
echo ""

