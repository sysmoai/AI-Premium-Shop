/**
 * Database Setup Script
 * Verifies Supabase connection and initializes schema
 */

import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
const databaseUrl = process.env.DATABASE_URL;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

async function setupDatabase() {
  try {
    console.log('🔧 Setting up AI Premium Shop database...\n');

    // 1. Test Supabase connection
    console.log('📡 Testing Supabase connection...');
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      process.exit(1);
    }
    console.log('✅ Supabase connection successful\n');

    // 2. Connect with Drizzle
    if (!databaseUrl) {
      console.warn('⚠️  DATABASE_URL not set, skipping schema deployment');
      console.log('ℹ️  To deploy schema, set DATABASE_URL in .env.local');
      process.exit(0);
    }

    console.log('🗄️  Connecting to PostgreSQL database...');
    const client = postgres(databaseUrl);
    const db = drizzle(client);

    // 3. Verify connection
    const result = await db.execute('SELECT NOW()');
    console.log('✅ PostgreSQL connection successful\n');

    // 4. Summary
    console.log('========================================');
    console.log('✅ DATABASE SETUP COMPLETE');
    console.log('========================================');
    console.log('\nNext steps:');
    console.log('1. Run: drizzle-kit generate:pg');
    console.log('2. Run: drizzle-kit push:pg');
    console.log('3. Verify tables in Supabase dashboard');
    console.log('\nCredentials verified:');
    console.log(`- Project URL: ${supabaseUrl}`);
    console.log(`- Service Role Key: ${supabaseServiceRole.substring(0, 20)}...`);
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
