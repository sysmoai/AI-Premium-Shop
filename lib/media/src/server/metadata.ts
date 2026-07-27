export interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  /** Parsed EXIF tags (camera, orientation, GPS stripped by default). */
  exif?: Record<string, unknown>;
}

/**
 * Read dimensions/format via sharp and EXIF tags via exifr.
 * GPS tags are omitted unless includeGps is true — never publish customer GPS data.
 */
export async function readImageMetadata(
  input: Buffer | Uint8Array,
  { includeGps = false }: { includeGps?: boolean } = {},
): Promise<ImageMetadata> {
  const { default: sharp } = await import("sharp");
  const meta = await sharp(input).metadata();
  let exif: Record<string, unknown> | undefined;
  try {
    const { default: exifr } = await import("exifr");
    const parsed = (await exifr.parse(input as Buffer, { gps: includeGps })) ?? undefined;
    if (parsed && !includeGps) {
      delete parsed.latitude;
      delete parsed.longitude;
    }
    exif = parsed;
  } catch {
    // Non-EXIF formats (SVG, some PNGs) — dimensions alone are fine.
  }
  return { width: meta.width, height: meta.height, format: meta.format, exif };
}
