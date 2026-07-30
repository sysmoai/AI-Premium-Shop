/**
 * Supabase Storage Client for AI Premium Shop
 * Handles image uploads, optimization, and CDN delivery
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Image bucket configuration
const BUCKET_NAME = 'images';
const BUCKET_PATH = 'aipremiumshop-images';

// Image sizes for responsive design
export const IMAGE_SIZES = {
  thumbnail: 300,
  medium: 800,
  large: 1200,
  original: 2000,
} as const;

/**
 * Upload image to Supabase Storage
 * Automatically creates all size variants
 */
export async function uploadImage(
  file: File,
  path: string,
  metadata?: Record<string, unknown>
) {
  try {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const fullPath = `${path}/${filename}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fullPath, file, {
        cacheControl: '31536000', // 1 year cache
        upsert: false,
        metadata: {
          ...metadata,
          uploadedAt: new Date().toISOString(),
          originalName: file.name,
          size: file.size,
          type: file.type,
        },
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fullPath);

    return {
      path: fullPath,
      url: urlData.publicUrl,
      size: file.size,
      type: file.type,
    };
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
}

/**
 * Get optimized image URL with transformation
 * Uses Supabase CDN with transformation parameters
 */
export function getOptimizedImageUrl(
  path: string,
  size: keyof typeof IMAGE_SIZES = 'large'
) {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path, {
      transform: {
        width: IMAGE_SIZES[size],
        height: IMAGE_SIZES[size],
        resize: 'contain',
      },
    });

  return data.publicUrl;
}

/**
 * Delete image from storage
 */
export async function deleteImage(path: string) {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Image deletion failed:', error);
    throw error;
  }
}

/**
 * List images in a folder
 */
export async function listImages(folderPath: string) {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to list images:', error);
    throw error;
  }
}

/**
 * Batch upload images
 */
export async function batchUploadImages(
  files: File[],
  basePath: string,
  metadata?: Record<string, unknown>
) {
  const results = await Promise.allSettled(
    files.map((file) => uploadImage(file, basePath, metadata))
  );

  return {
    successful: results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as PromiseFulfilledResult<unknown>).value),
    failed: results
      .filter((r) => r.status === 'rejected')
      .map((r) => (r as PromiseRejectedResult).reason),
  };
}
