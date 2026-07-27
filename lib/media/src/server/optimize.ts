export interface OptimizeOptions {
  width?: number;
  height?: number;
  format?: "webp" | "avif" | "jpeg" | "png";
  quality?: number;
}

/**
 * Resize/convert an image buffer with sharp (loaded lazily so environments
 * without native sharp binaries can still import this module).
 * Defaults: WebP at quality 80, no upscaling.
 */
export async function optimizeImage(
  input: Buffer | Uint8Array,
  { width, height, format = "webp", quality = 80 }: OptimizeOptions = {},
): Promise<Buffer> {
  const { default: sharp } = await import("sharp");
  let pipeline = sharp(input, { failOn: "error" }).rotate(); // respect EXIF orientation
  if (width || height) {
    pipeline = pipeline.resize({ width, height, fit: "inside", withoutEnlargement: true });
  }
  return pipeline.toFormat(format, { quality }).toBuffer();
}
