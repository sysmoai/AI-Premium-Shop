// Temporary production-safe diagnostic for the concierge Node 24 DEP0169 warning.
//
// This listener records warning metadata + stack only. It never reads request
// data, environment variables, credentials, catalog contents, or customer text.
// Remove it once the concrete url.parse() caller has been identified and fixed.
const marker = Symbol.for("aips.dep0169.trace.installed");

if (!globalThis[marker]) {
  globalThis[marker] = true;
  process.on("warning", (warning) => {
    if (warning?.code !== "DEP0169") return;
    console.warn(JSON.stringify({
      event: "dep0169_trace",
      code: warning.code,
      name: warning.name,
      message: String(warning.message ?? "").slice(0, 800),
      stack: String(warning.stack ?? "").slice(0, 6000),
    }));
  });
}
