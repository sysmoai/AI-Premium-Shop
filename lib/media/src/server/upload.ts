export interface UploadPolicy {
  /** Allowed MIME types. */
  allowedTypes: string[];
  /** Maximum size in bytes. */
  maxBytes: number;
}

export const IMAGE_UPLOAD_POLICY: UploadPolicy = {
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"],
  maxBytes: 10 * 1024 * 1024,
};

export const VIDEO_UPLOAD_POLICY: UploadPolicy = {
  allowedTypes: ["video/mp4", "video/webm"],
  maxBytes: 200 * 1024 * 1024,
};

/** Magic-byte sniffing for the formats we accept — never trust the client MIME. */
function sniff(buf: Uint8Array): string | undefined {
  const ascii = (start: number, len: number) =>
    String.fromCharCode(...buf.slice(start, start + len));
  if (buf[0] === 0xff && buf[1] === 0xd8) return "image/jpeg";
  if (buf[0] === 0x89 && ascii(1, 3) === "PNG") return "image/png";
  if (ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP") return "image/webp";
  if (ascii(4, 4) === "ftyp") {
    const brand = ascii(8, 4);
    if (brand.startsWith("avif")) return "image/avif";
    return "video/mp4";
  }
  if (buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3) return "video/webm";
  const head = ascii(0, 256).trimStart();
  if (head.startsWith("<svg") || (head.startsWith("<?xml") && head.includes("<svg"))) return "image/svg+xml";
  return undefined;
}

export interface UploadValidation {
  ok: boolean;
  detectedType?: string;
  error?: string;
}

/**
 * Validate an upload against a policy using magic bytes, not the client-supplied
 * content type. SVG passes type checks here but MUST additionally be sanitized
 * (svgo with scripts/event handlers stripped) before serving.
 */
export function validateUpload(buf: Uint8Array, policy: UploadPolicy): UploadValidation {
  if (buf.byteLength > policy.maxBytes) {
    return { ok: false, error: `File exceeds ${policy.maxBytes} bytes` };
  }
  const detectedType = sniff(buf);
  if (!detectedType || !policy.allowedTypes.includes(detectedType)) {
    return { ok: false, detectedType, error: `Type ${detectedType ?? "unknown"} not allowed` };
  }
  return { ok: true, detectedType };
}
