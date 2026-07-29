import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  'https://fjpkhgecnothqjfhxrhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcGtoZ2Vjbm90aHFqZmh4cmh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA4MjAyMiwiZXhwIjoyMTAwNjU4MDIyfQ.OHbzkW_5833oLwZT8qN1JSvr0cJgSQMgfkJug55w1nM',
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
      const url = `https://fjpkhgecnothqjfhxrhx.supabase.co/storage/v1/object/public/generated-content/${filePath}`;
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
