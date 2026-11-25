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
