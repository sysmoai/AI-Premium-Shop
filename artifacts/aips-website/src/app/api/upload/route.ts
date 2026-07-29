'use server';

import { uploadImage, batchUploadImages } from '@/lib/storage/supabase-storage';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/upload
 * Upload images to Supabase Storage
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string || 'products';
    const productId = formData.get('productId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Upload image
    const result = await uploadImage(file, path, {
      productId,
      originalName: file.name,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/upload/batch
 * Batch upload multiple images
 */
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const basePath = formData.get('path') as string || 'products';
    const productId = formData.get('productId') as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Batch upload
    const results = await batchUploadImages(files, basePath, {
      productId,
    });

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Batch upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Batch upload failed' },
      { status: 500 }
    );
  }
}
