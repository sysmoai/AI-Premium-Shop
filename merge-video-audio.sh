#!/bin/bash

echo ""
echo "🎬 Merging Hero Video + Professional Audio"
echo "=============================================="
echo ""

# Files
VIDEO="hero-video-no-audio.mp4"
AUDIO="hero-audio-professional.mp3"
OUTPUT="hero-final.mp4"
WEBM="hero-final.webm"
POSTER="hero-poster.jpg"

echo "Input Files:"
echo "  Video: $VIDEO"
echo "  Audio: $AUDIO"
echo ""

# Step 1: Merge video and audio
echo "1️⃣ Merging video with audio..."
ffmpeg -i "$VIDEO" -i "$AUDIO" \
  -c:v copy \
  -c:a aac \
  -map 0:v:0 -map 1:a:0 \
  -shortest \
  "$OUTPUT" -y 2>&1 | grep -E "(time=|Duration)" | tail -3

if [ -f "$OUTPUT" ]; then
  size=$(du -h "$OUTPUT" | cut -f1)
  echo "   ✅ Merged: $OUTPUT ($size)"
fi

echo ""
echo "2️⃣ Creating WebM format (primary, optimized)..."
ffmpeg -i "$OUTPUT" \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 2500k \
  -c:a libopus \
  -b:a 128k \
  "$WEBM" -y 2>&1 | grep -E "(time=)" | tail -1

if [ -f "$WEBM" ]; then
  size=$(du -h "$WEBM" | cut -f1)
  echo "   ✅ WebM created: $WEBM ($size)"
  echo "   📊 File size: $(ls -lh $WEBM | awk '{print $5}')"
fi

echo ""
echo "3️⃣ Creating optimized MP4 fallback..."
ffmpeg -i "$OUTPUT" \
  -c:v libx264 \
  -crf 23 \
  -b:v 3500k \
  -c:a aac \
  -b:a 128k \
  "hero-final-optimized.mp4" -y 2>&1 | grep -E "(time=)" | tail -1

if [ -f "hero-final-optimized.mp4" ]; then
  size=$(du -h "hero-final-optimized.mp4" | cut -f1)
  echo "   ✅ MP4 created: hero-final-optimized.mp4 ($size)"
fi

echo ""
echo "4️⃣ Creating poster image (thumbnail)..."
ffmpeg -i "$OUTPUT" \
  -ss 00:00:02 \
  -vf scale=1920:1080 \
  -q:v 2 \
  "$POSTER" -y 2>&1 | tail -2

if [ -f "$POSTER" ]; then
  size=$(du -h "$POSTER" | cut -f1)
  echo "   ✅ Poster created: $POSTER ($size)"
fi

echo ""
echo "=============================================="
echo "✅ ALL FILES READY!"
echo "=============================================="
echo ""
ls -lh hero-final* hero-poster.jpg | awk '{print "   " $9 " - " $5}'
echo ""

