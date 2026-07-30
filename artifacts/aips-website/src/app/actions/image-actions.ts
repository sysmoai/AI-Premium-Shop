'use server';

import { db } from '@/db';
import { media } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { errorMessage } from '@/lib/utils';

interface ImageMetadata {
  url: string;
  alt: string;
  altBn?: string;
  type: 'image' | 'video' | 'document';
  bucket: string;
  size: number;
}

/**
 * Save image metadata to database
 */
export async function saveImageMetadata(data: ImageMetadata) {
  try {
    const result = await db
      .insert(media)
      .values({
        ...data,
        createdAt: new Date(),
      })
      .returning();

    return {
      success: true,
      id: result[0]?.id,
    };
  } catch (error: unknown) {
    console.error('Failed to save image metadata:', error);
    throw new Error(errorMessage(error));
  }
}

/**
 * Get image by ID
 */
export async function getImageById(id: string) {
  try {
    const result = await db
      .select()
      .from(media)
      .where(eq(media.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error: unknown) {
    console.error('Failed to get image:', error);
    throw new Error(errorMessage(error));
  }
}

/**
 * Get images by bucket
 */
export async function getImagesByBucket(bucket: string) {
  try {
    const result = await db
      .select()
      .from(media)
      .where(eq(media.bucket, bucket));

    return result;
  } catch (error: unknown) {
    console.error('Failed to get images:', error);
    throw new Error(errorMessage(error));
  }
}

/**
 * Delete image metadata
 */
export async function deleteImageMetadata(id: string) {
  try {
    await db.delete(media).where(eq(media.id, id));

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error('Failed to delete image:', error);
    throw new Error(errorMessage(error));
  }
}

/**
 * Batch save image metadata
 */
export async function batchSaveImageMetadata(images: ImageMetadata[]) {
  try {
    const result = await db
      .insert(media)
      .values(
        images.map((img) => ({
          ...img,
          createdAt: new Date(),
        }))
      )
      .returning();

    return {
      success: true,
      count: result.length,
      ids: result.map((r: typeof media.$inferSelect) => r.id),
    };
  } catch (error: unknown) {
    console.error('Failed to batch save images:', error);
    throw new Error(errorMessage(error));
  }
}
