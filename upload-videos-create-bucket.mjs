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

async function uploadVideos() {
  console.log('🚀 UPLOADING VIDEOS TO SUPABASE CDN\n');
  console.log('1️⃣  Creating videos bucket...');
  
  // Create bucket if it doesn't exist
  const { error: bucketError } = await supabase.storage.createBucket('videos', {
    public: true,
    fileSizeLimit: 1024 * 1024 * 1024 // 1GB
  });
  
  if (bucketError && !bucketError.message.includes('already exists')) {
    console.log(`⚠️  Bucket notice: ${bucketError.message}`);
  } else {
    console.log('✅ Bucket ready\n');
  }

  console.log('2️⃣  Uploading video files...\n');
  
  const files = [
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero.webm', 'homepage-hero.webm', 'video/webm'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-optimized.mp4', 'homepage-hero-optimized.mp4', 'video/mp4'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-mobile.webm', 'homepage-hero-mobile.webm', 'video/webm'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-poster.jpg', 'homepage-hero-poster.jpg', 'image/jpeg']
  ];

  const urls = {};
  
  for (const [path, name, type] of files) {
    process.stdout.write(`📤 ${name}... `);
    const data = readFileSync(path);
    
    const { data: uploadData, error } = await supabase.storage
      .from('videos')
      .upload(name, data, {
        contentType: type,
        upsert: true,
        cacheControl: '31536000'
      });
    
    if (error) {
      console.log(`❌ ${error.message}`);
    } else {
      const url = `${SUPABASE_URL}/storage/v1/object/public/videos/${name}`;
      urls[name] = url;
      console.log('✅');
    }
  }

  console.log('\n3️⃣  Verifying CDN access...\n');

  // Verify files are accessible
  for (const [name, url] of Object.entries(urls)) {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      console.log(`✅ ${name} - Accessible`);
    } else {
      console.log(`❌ ${name} - HTTP ${response.status}`);
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log('✨ UPLOAD & VERIFICATION COMPLETE!\n');
  console.log('📋 CDN URLS:\n');
  
  for (const [name, url] of Object.entries(urls)) {
    console.log(`${name}:`);
    console.log(`${url}\n`);
  }
}

uploadVideos().catch(console.error);
