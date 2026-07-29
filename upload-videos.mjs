import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  'https://fjpkhgecnothqjfhxrhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcGtoZ2Vjbm90aHFqZmh4cmh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA4MjAyMiwiZXhwIjoyMTAwNjU4MDIyfQ.OHbzkW_5833oLwZT8qN1JSvr0cJgSQMgfkJug55w1nM',
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
      const url = `https://fjpkhgecnothqjfhxrhx.supabase.co/storage/v1/object/public/videos/${name}`;
      console.log(`✅ ${name}`);
      console.log(`   CDN: ${url}\n`);
    }
  }
}

upload().catch(console.error);
