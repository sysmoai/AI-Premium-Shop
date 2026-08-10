#!/usr/bin/env node
import { createHash, createHmac } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";

const DEFAULT_BUCKET = "aips-media";
const DEFAULT_PUBLIC_URL = "https://media.aipremiumshop.com";
const DEFAULT_CACHE_CONTROL = "public, max-age=31536000, immutable";
const REGION = "auto";
const SERVICE = "s3";

function fail(message) {
  console.error(`[r2-media] ERROR: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = { dryRun: false };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    if (!token.startsWith("--")) fail(`Unexpected argument: ${token}`);
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) fail(`Missing value for --${key}`);
    args[key] = value;
    index += 1;
  }
  return args;
}

function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

function hmac(key, value, encoding) {
  return createHmac("sha256", key).update(value, "utf8").digest(encoding);
}

function encodePath(path) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`))
    .join("/");
}

function normalizeObjectKey(value) {
  const key = String(value ?? "").trim().replace(/^\/+/, "");
  if (!key) fail("--key is required");
  if (key.includes("\\") || key.split("/").includes("..") || /[?#]/.test(key)) {
    fail("--key must be a safe R2 object key without backslashes, parent traversal, query strings, or fragments");
  }
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/.test(key)) {
    fail("--key contains unsupported characters; use letters, numbers, dots, underscores, hyphens, and slashes");
  }
  return key;
}

function sniffMime(buffer, filePath) {
  const extension = extname(filePath).toLowerCase();
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    return "image/webp";
  }
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (buffer.length >= 12 && buffer.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = buffer.subarray(8, 12).toString("ascii");
    if (["avif", "avis"].includes(brand)) return "image/avif";
    return "video/mp4";
  }
  if (buffer.length >= 4 && buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) {
    return "video/webm";
  }
  const prefix = buffer.subarray(0, Math.min(buffer.length, 512)).toString("utf8").trimStart().toLowerCase();
  if (extension === ".svg" && (prefix.startsWith("<svg") || prefix.startsWith("<?xml"))) return "image/svg+xml";
  return null;
}

function expectedMimeForExtension(filePath) {
  return {
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
  }[extname(filePath).toLowerCase()] ?? null;
}

function amzTimestamp(date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function signingHeaders({ method, url, bodyHash, contentType, cacheControl, accessKeyId, secretAccessKey, now }) {
  const amzDate = amzTimestamp(now);
  const dateStamp = amzDate.slice(0, 8);
  const canonicalUri = url.pathname;
  const canonicalHeaders = [
    `cache-control:${cacheControl}`,
    `content-type:${contentType}`,
    `host:${url.host}`,
    `x-amz-content-sha256:${bodyHash}`,
    `x-amz-date:${amzDate}`,
  ].join("\n") + "\n";
  const signedHeaders = "cache-control;content-type;host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = [
    method,
    canonicalUri,
    "",
    canonicalHeaders,
    signedHeaders,
    bodyHash,
  ].join("\n");
  const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");
  const kDate = hmac(Buffer.from(`AWS4${secretAccessKey}`, "utf8"), dateStamp);
  const kRegion = hmac(kDate, REGION);
  const kService = hmac(kRegion, SERVICE);
  const kSigning = hmac(kService, "aws4_request");
  const signature = hmac(kSigning, stringToSign, "hex");
  return {
    Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    "Cache-Control": cacheControl,
    "Content-Type": contentType,
    "x-amz-content-sha256": bodyHash,
    "x-amz-date": amzDate,
  };
}

async function verifyPublicObject(publicUri, expectedMime, expectedBytes) {
  let lastError = "unknown verification failure";
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(publicUri, {
        method: "HEAD",
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        lastError = `HTTP ${response.status}`;
      } else {
        const contentType = String(response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
        const contentLength = Number(response.headers.get("content-length"));
        if (contentType && contentType !== expectedMime) {
          lastError = `public MIME mismatch (${contentType} != ${expectedMime})`;
        } else if (Number.isFinite(contentLength) && contentLength > 0 && contentLength !== expectedBytes) {
          lastError = `public byte-size mismatch (${contentLength} != ${expectedBytes})`;
        } else {
          return {
            status: response.status,
            contentType: contentType || null,
            contentLength: Number.isFinite(contentLength) && contentLength > 0 ? contentLength : null,
            cacheControl: response.headers.get("cache-control"),
            etag: response.headers.get("etag"),
          };
        }
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 600 * attempt));
  }
  throw new Error(lastError);
}

const args = parseArgs(process.argv.slice(2));
const fileArg = args.file;
if (!fileArg) fail("Usage: node scripts/upload-r2-media.mjs --file <path> --key <versioned/object-key> [--content-type <mime>] [--cache-control <value>] [--dry-run]");

const filePath = resolve(process.cwd(), fileArg);
const objectKey = normalizeObjectKey(args.key);
const fileInfo = await stat(filePath).catch(() => null);
if (!fileInfo?.isFile()) fail(`File not found or not a regular file: ${filePath}`);
if (fileInfo.size <= 0) fail("Refusing to upload an empty file");
if (fileInfo.size > 250 * 1024 * 1024) fail("Refusing files larger than 250 MiB through the single-object uploader");

const body = await readFile(filePath);
const sniffedMime = sniffMime(body, filePath);
const extensionMime = expectedMimeForExtension(filePath);
if (!sniffedMime) fail("Unsupported or unrecognized media file signature");
if (extensionMime && extensionMime !== sniffedMime) fail(`File extension/signature mismatch (${extensionMime} != ${sniffedMime})`);
const contentType = String(args["content-type"] ?? sniffedMime).toLowerCase();
if (contentType !== sniffedMime) fail(`Requested MIME does not match file signature (${contentType} != ${sniffedMime})`);

const bodyHash = sha256Hex(body);
const bucket = process.env.R2_BUCKET_NAME || DEFAULT_BUCKET;
const publicBase = String(process.env.R2_PUBLIC_URL || DEFAULT_PUBLIC_URL).replace(/\/+$/, "");
if (!/^https:\/\//i.test(publicBase)) fail("R2_PUBLIC_URL must use HTTPS");
const publicUri = `${publicBase}/${encodePath(objectKey)}`;
const cacheControl = String(args["cache-control"] ?? DEFAULT_CACHE_CONTROL);

if (args.dryRun) {
  console.log(JSON.stringify({
    dryRun: true,
    file: filePath,
    bytes: body.length,
    sha256: bodyHash,
    mimeType: contentType,
    bucket,
    objectKey,
    publicUri,
    cacheControl,
  }, null, 2));
  process.exit(0);
}

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
if (!accountId || !accessKeyId || !secretAccessKey) {
  fail("Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY in the execution environment; credentials are never accepted as CLI arguments.");
}

const endpoint = new URL(`https://${accountId}.r2.cloudflarestorage.com/${encodePath(bucket)}/${encodePath(objectKey)}`);
const headers = signingHeaders({
  method: "PUT",
  url: endpoint,
  bodyHash,
  contentType,
  cacheControl,
  accessKeyId,
  secretAccessKey,
  now: new Date(),
});

const uploadResponse = await fetch(endpoint, {
  method: "PUT",
  headers,
  body,
  redirect: "manual",
  signal: AbortSignal.timeout(120_000),
});
if (!uploadResponse.ok) {
  const detail = (await uploadResponse.text()).replace(/\s+/g, " ").trim().slice(0, 500);
  fail(`R2 PUT failed with HTTP ${uploadResponse.status}${detail ? `: ${detail}` : ""}`);
}

let verification;
try {
  verification = await verifyPublicObject(publicUri, contentType, body.length);
} catch (error) {
  fail(`R2 upload succeeded but public verification failed for ${publicUri}: ${error instanceof Error ? error.message : String(error)}`);
}

console.log(JSON.stringify({
  uploaded: true,
  bytes: body.length,
  sha256: bodyHash,
  mimeType: contentType,
  bucket,
  objectKey,
  publicUri,
  cacheControl,
  uploadEtag: uploadResponse.headers.get("etag"),
  verification,
}, null, 2));
