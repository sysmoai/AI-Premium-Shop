import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  'https://fjpkhgecnothqjfhxrhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcGtoZ2Vjbm90aHFqZmh4cmh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA4MjAyMiwiZXhwIjoyMTAwNjU4MDIyfQ.OHbzkW_5833oLwZT8qN1JSvr0cJgSQMgfkJug55w1nM',
  { auth: { persistSession: false } }
);

async function uploadVideos() {
  console.log('🚀 UPLOADING VIDEOS TO SUPABASE CDN\n');
  console.log('1️⃣  Creating videos bucket (large size limit)...');
  
  // Create bucket with large size limit
  const { error: bucketError } = await supabase.storage.createBucket('videos', {
    public: true,
    fileSizeLimit: 1024 * 1024 * 500 // 500MB per file
  });
  
  if (bucketError) {
    if (bucketError.message.includes('already exists')) {
      console.log('✅ Bucket already exists\n');
    } else {
      console.log(`✅ Bucket ready (${bucketError.message})\n`);
    }
  } else {
    console.log('✅ Bucket created\n');
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
    
    const { error } = await supabase.storage
      .from('videos')
      .upload(name, data, {
        contentType: type,
        upsert: true,
        cacheControl: '31536000'
      });
    
    if (error) {
      console.log(`❌ ${error.message}`);
    } else {
      const url = `https://fjpkhgecnothqjfhxrhx.supabase.co/storage/v1/object/public/videos/${name}`;
      urls[name] = url;
      console.log('✅');
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('\n✨ UPLOAD COMPLETE!\n');
  console.log('📋 CDN URLS:\n');
  
  if (Object.keys(urls).length > 0) {
    for (const [name, url] of Object.entries(urls)) {
      console.log(`✅ ${name}`);
      console.log(`   ${url}\n`);
    }
  } else {
    console.log('⚠️  No files were uploaded successfully');
  }
}

uploadVideos().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
