#!/bin/bash
set -e

echo "Converting tsetseg.HEIC..."
magick "public/tsetseg.HEIC" "public/tsetseg.webp" || convert "public/tsetseg.HEIC" "public/tsetseg.webp" || heif-convert "public/tsetseg.HEIC" "public/tsetseg.webp"

echo "Converting MOV files..."
for f in public/*.MOV; do
  if [ -f "$f" ]; then
    mp4="${f%.MOV}.mp4"
    echo "Processing $f -> $mp4"
    ffmpeg -y -i "$f" -c:v libx264 -preset veryfast -crf 26 -c:a aac -b:a 128k "$mp4"
  fi
done

echo "Updating dictionary references..."
node -e "
const fs = require('fs');
for (const file of ['app/lib/dictionaries/en.ts', 'app/lib/dictionaries/mn.ts']) {
  if (fs.existsSync(file)) {
    let text = fs.readFileSync(file, 'utf8');
    text = text.replace(/\.MOV/g, '.mp4').replace(/\.mov/g, '.mp4');
    text = text.replace(/\.HEIC/g, '.webp').replace(/\.heic/g, '.webp');
    fs.writeFileSync(file, text);
  }
}
"

echo "Removing old files..."
rm public/*.MOV public/*.HEIC || true

echo "Done!"
