// Shared operator-token check for internal-only endpoints (insights, diagnose).
// Identical to artifacts/aips-landing/api/_auth.js — keep in sync.
export function tokenMatches(given, expected) {
  if (typeof given !== "string" || typeof expected !== "string" || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
