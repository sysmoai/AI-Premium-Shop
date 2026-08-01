// Shared operator-token check for internal-only endpoints (insights, diagnose).
// Extracted rather than left duplicated in each handler — this codebase has
// repeatedly found the same logic copy-pasted into two places and drifting;
// a 6-line timing-safe compare is exactly cheap enough to have been
// re-typed carelessly the next time an endpoint needed it.
export function tokenMatches(given, expected) {
  if (typeof given !== "string" || typeof expected !== "string" || given.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
