#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   🎬 PROCESSING VIDEO FOR AI PREMIUM SHOP HOMEPAGE             ║"
echo "║   Converting to Best Formats for All Devices                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

cd /Users/emonhossain/AI-Premium-Shop

# Source video
SOURCE="/Users/emonhossain/Downloads/archive/hf_20260727_112155_9375cd48-d4fe-46d6-911d-f67646c16a22.mp4"

echo "📋 STEP 1: Copy Source Video"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cp "$SOURCE" "homepage-hero.mp4"
echo "✅ Source copied"
echo ""

# Convert to WebM (Primary Format)
echo "🎬 STEP 2: Converting to WebM (Primary - 50% Smaller)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Creating: homepage-hero.webm (optimized for web)"
ffmpeg -i "homepage-hero.mp4" \
  -c:v libvpx-vp9 \
  -crf 28 \
  -b:v 2500k \
  -c:a libopus \
  -b:a 128k \
  "homepage-hero.webm" -y 2>&1 | grep -E "time=|Duration" | tail -1

if [ -f "homepage-hero.webm" ]; then
  size=$(du -h "homepage-hero.webm" | cut -f1)
  echo "   ✅ WebM created: $size"
fi
echo ""

# Optimize MP4 (Fallback)
echo "🎬 STEP 3: Optimizing MP4 (Fallback Format)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Creating: homepage-hero-optimized.mp4"
ffmpeg -i "homepage-hero.mp4" \
  -c:v libx264 \
  -crf 23 \
  -b:v 3500k \
  -c:a aac \
  -b:a 128k \
  "homepage-hero-optimized.mp4" -y 2>&1 | grep -E "time=|Duration" | tail -1

if [ -f "homepage-hero-optimized.mp4" ]; then
  size=$(du -h "homepage-hero-optimized.mp4" | cut -f1)
  echo "   ✅ MP4 optimized: $size"
fi
echo ""

# Create Poster Image
echo "🖼️ STEP 4: Creating Poster Image (Thumbnail)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Creating: homepage-hero-poster.jpg"
ffmpeg -i "homepage-hero.mp4" \
  -ss 00:00:02 \
  -vf scale=1920:1080 \
  -q:v 2 \
  "homepage-hero-poster.jpg" -y 2>&1 | tail -1

if [ -f "homepage-hero-poster.jpg" ]; then
  size=$(du -h "homepage-hero-poster.jpg" | cut -f1)
  echo "   ✅ Poster created: $size"
fi
echo ""

# Create Mobile Variant
echo "📱 STEP 5: Creating Mobile Variant"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Creating: homepage-hero-mobile.webm (600x800)"
ffmpeg -i "homepage-hero.mp4" \
  -vf scale=600:800 \
  -c:v libvpx-vp9 \
  -crf 28 \
  -b:v 1500k \
  -c:a libopus \
  -b:a 96k \
  "homepage-hero-mobile.webm" -y 2>&1 | grep -E "time=" | tail -1

if [ -f "homepage-hero-mobile.webm" ]; then
  size=$(du -h "homepage-hero-mobile.webm" | cut -f1)
  echo "   ✅ Mobile variant: $size"
fi
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   ✅ VIDEO PROCESSING COMPLETE!                               ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "📁 FILES READY FOR HOMEPAGE:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
ls -lh homepage-hero* | awk '{print "   " $9 " - " $5}'

echo ""
echo "🎯 SPECIFICATIONS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   ✅ Primary: homepage-hero.webm (VP9, 2500kbps)"
echo "   ✅ Fallback: homepage-hero-optimized.mp4 (H.264, 3500kbps)"
echo "   ✅ Mobile: homepage-hero-mobile.webm (600x800, 1500kbps)"
echo "   ✅ Poster: homepage-hero-poster.jpg (1920x1080)"
echo ""

