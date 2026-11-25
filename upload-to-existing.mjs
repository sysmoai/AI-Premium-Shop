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
  console.log('📍 Using bucket: generated-content\n');
  
  const files = [
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero.webm', 'homepage-hero/homepage-hero.webm', 'video/webm'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-optimized.mp4', 'homepage-hero/homepage-hero-optimized.mp4', 'video/mp4'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-mobile.webm', 'homepage-hero/homepage-hero-mobile.webm', 'video/webm'],
    ['/Users/emonhossain/AI-Premium-Shop/homepage-hero-poster.jpg', 'homepage-hero/homepage-hero-poster.jpg', 'image/jpeg']
  ];

  const urls = {};
  
  console.log('Uploading files...\n');
  for (const [path, filePath, type] of files) {
    const fileName = filePath.split('/').pop();
    process.stdout.write(`📤 ${fileName}... `);
    const data = readFileSync(path);
    
    const { error } = await supabase.storage
      .from('generated-content')
      .upload(filePath, data, {
        contentType: type,
        upsert: true,
        cacheControl: '31536000'
      });
    
    if (error) {
      console.log(`❌ ${error.message}`);
    } else {
      const url = `${SUPABASE_URL}/storage/v1/object/public/generated-content/${filePath}`;
      urls[fileName] = url;
      console.log('✅');
    }
  }

  console.log('\n' + '═'.repeat(70));
  console.log('\n✨ UPLOAD COMPLETE!\n');
  console.log('📋 CDN URLS FOR COMPONENT:\n');
  
  if (Object.keys(urls).length > 0) {
    for (const [name, url] of Object.entries(urls)) {
      console.log(`${name}:`);
      console.log(`${url}\n`);
    }
    
    console.log('═'.repeat(70));
    console.log('\n⏭️  NEXT: Update component with these URLs');
  } else {
    console.log('⚠️  No files were uploaded');
  }
}

uploadVideos().catch(console.error);
