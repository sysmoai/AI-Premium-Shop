import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  'https://fjpkhgecnothqjfhxrhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcGtoZ2Vjbm90aHFqZmh4cmh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTA4MjAyMiwiZXhwIjoyMTAwNjU4MDIyfQ.OHbzkW_5833oLwZT8qN1JSvr0cJgSQMgfkJug55w1nM',
  { auth: { persistSession: false } }
);

async function uploadVideos() {
  console.log('🚀 UPLOADING VIDEOS TO SUPABASE CDN\n');
  
  // List existing buckets
  console.log('📋 Checking existing buckets...');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  if (bucketsError) {
    console.log(`⚠️  ${bucketsError.message}`);
  } else {
    const videosBucket = buckets.find(b => b.name === 'videos');
    if (videosBucket) {
      console.log('✅ Videos bucket exists\n');
    } else {
      console.log('⚠️  Videos bucket not found. Available buckets:');
      buckets.forEach(b => console.log(`   - ${b.name}`));
      console.log('');
    }
  }

  // Try uploading to different bucket names
  const bucketNames = ['videos', 'video', 'media', 'assets'];
  
  for (const bucketName of bucketNames) {
    console.log(`Trying bucket: ${bucketName}...`);
    const data = readFileSync('/Users/emonhossain/AI-Premium-Shop/homepage-hero-poster.jpg');
    
    const { error } = await supabase.storage
      .from(bucketName)
      .upload('test.jpg', data, { upsert: true });
    
    if (!error) {
      console.log(`✅ Success with bucket: ${bucketName}\n`);
      break;
    } else {
      console.log(`❌ ${bucketName}: ${error.message}`);
    }
  }
}

uploadVideos().catch(console.error);
