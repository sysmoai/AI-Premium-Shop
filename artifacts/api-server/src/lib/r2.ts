import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

// Cloudflare R2 is S3-API-compatible, so the AWS SDK works unmodified against
// R2's endpoint. Bucket: aips-media (APAC region), provisioned in Cloudflare.
const REQUIRED_ENV = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME", "R2_PUBLIC_URL"] as const;

function getEnv(name: (typeof REQUIRED_ENV)[number]): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name} (see config/monorepo.env.example)`);
  return value;
}

let client: S3Client | null = null;

function getClient(): S3Client {
  if (client) return client;
  const accountId = getEnv("R2_ACCOUNT_ID");
  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: getEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: getEnv("R2_SECRET_ACCESS_KEY"),
    },
  });
  return client;
}

export interface UploadAssetOptions {
  key: string;
  body: Buffer | Uint8Array;
  contentType: string;
  cacheControl?: string;
}

/** Uploads an asset to the aips-media R2 bucket and returns its public URL. */
export async function uploadAsset(opts: UploadAssetOptions): Promise<string> {
  const bucket = getEnv("R2_BUCKET_NAME");
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: opts.key,
      Body: opts.body,
      ContentType: opts.contentType,
      CacheControl: opts.cacheControl ?? "public, max-age=31536000, immutable",
    }),
  );
  return assetUrl(opts.key);
}

export async function deleteAsset(key: string): Promise<void> {
  const bucket = getEnv("R2_BUCKET_NAME");
  await getClient().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export async function assetExists(key: string): Promise<boolean> {
  const bucket = getEnv("R2_BUCKET_NAME");
  try {
    await getClient().send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Builds the public URL for a key. Requires R2_PUBLIC_URL to be set to the
 * bucket's connected custom domain (e.g. https://media.aipremiumshop.com) or
 * its r2.dev public URL — both are configured in the Cloudflare dashboard,
 * not from this app.
 */
export function assetUrl(key: string): string {
  const base = getEnv("R2_PUBLIC_URL").replace(/\/+$/, "");
  return `${base}/${key.replace(/^\/+/, "")}`;
}
