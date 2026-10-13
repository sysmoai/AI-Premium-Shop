// Cloudflare Pages Functions port of artifacts/aips-landing/api/_dep0169-trace.js.
//
// The original installs a Node process "warning" listener to trace DEP0169.
// The Workers runtime has no `process`, so the module becomes a no-op here.
// Keep the original semantics whenever a Node-compatible runtime is present.
const marker = Symbol.for("aips.dep0169.trace.installed");

if (typeof process !== "undefined" && process?.on && !globalThis[marker]) {
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
