import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Credentials come from the environment only; never commit them.
// Use a Supabase secret API key (sb_secret_...), not a legacy service_role JWT.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set in the environment.");
  process.exit(1);
}

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  { auth: { persistSession: false } }
);

async function upload() {
  console.log('🚀 UPLOADING VIDEOS TO SUPABASE CDN\n');
  
  const files = [
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero.webm', 'homepage-hero.webm', 'video/webm'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-optimized.mp4', 'homepage-hero-optimized.mp4', 'video/mp4'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-mobile.webm', 'homepage-hero-mobile.webm', 'video/webm'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-poster.jpg', 'homepage-hero-poster.jpg', 'image/jpeg']
  ];

  for (const [path, name, type] of files) {
    console.log(`📤 Uploading ${name}...`);
    const data = readFileSync(path);
    
    const { data: uploadData, error } = await supabase.storage
      .from('videos')
      .upload(name, data, {
        contentType: type,
        upsert: true,
        cacheControl: '31536000'
      });
    
    if (error) {
      console.log(`❌ Error: ${error.message}`);
    } else {
      const url = `${SUPABASE_URL}/storage/v1/object/public/videos/${name}`;
      console.log(`✅ ${name}`);
      console.log(`   CDN: ${url}\n`);
    }
  }
}

upload().catch(console.error);
