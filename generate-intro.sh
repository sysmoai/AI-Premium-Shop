#!/bin/bash

echo ""
echo "🎬 Creating Professional Introduction Audio"
echo "=========================================="
echo ""

cd /Users/emonhossain/AI-Premium-Shop

# Create intro using combined approach
# 1. Opening with uplifting chord
# 2. Mid-range tones for message
# 3. Closing with resolution

echo "Creating professional 8-second introduction..."

ffmpeg -f lavfi \
  -i "aevalsrc=\
sin(264*2*PI*t)*0.3 + \
sin(330*2*PI*t)*0.3 + \
sin(396*2*PI*t)*0.25 + \
sin(528*2*PI*t)*0.2 + \
sin(660*2*PI*t)*0.15 + \
sin(132*2*PI*t)*0.15 + \
(sin(792*2*PI*t)*cos(PI*t/4))*0.12 + \
(sin(198*2*PI*t)*sin(PI*t/4))*0.1:\
sample_rate=48000:duration=8" \
  -c:a libmp3lame \
  -q:a 0 \
  -b:a 256k \
  -ar 48000 \
  -ac 2 \
  "aips-intro-professional.mp3" \
  -y 2>&1 | tail -5

echo ""
echo "✅ Introduction Audio Created!"
ls -lh aips-intro-professional.mp3

ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "aips-intro-professional.mp3" 2>/dev/null | head -1

