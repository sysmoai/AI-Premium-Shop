#!/usr/bin/env node
// The entry chunk lazily imports App (or the homepage / plan chunks), so the
// browser only discovers those files after the entry has downloaded AND run.
// This adds <link rel="modulepreload"> for exactly the chunks RootApp.tsx will
// import for each prerendered route. Same files, requested one hop earlier.
// The chunk lists come from the built entry itself, and a missing or ambiguous
// match fails the build instead of shipping stale hints.
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(process.argv[2] ?? join(APP, "dist/public"));
const fail = (msg) => { throw new Error(`[modulepreload] ${msg}`); };

const ENTRY_TAG = /<script type="module" crossorigin src="\/(assets\/index-[\w-]+\.js)"><\/script>/;
const template = readFileSync(join(DIST, "index.html"), "utf8");
const entryFile = template.match(ENTRY_TAG)?.[1] ?? fail("entry script not found in index.html");
const entry = readFileSync(join(DIST, entryFile), "utf8");

const deps = JSON.parse(entry.match(/m\.f=(\[[^\]]*\])/)?.[1] ?? fail("__vite__mapDeps table not found"));
function chunksFor(name) {
  const found = [...entry.matchAll(new RegExp(`import\\("\\./(${name}-[\\w-]{8}\\.js)"\\)[\\s\\S]{0,120}?__vite__mapDeps\\(\\[([\\d,]+)\\]\\)`, "g"))];
  if (found.length !== 1) fail(`expected one lazy import of ${name}, found ${found.length}`);
  const files = found[0][2].split(",").map((i) => deps[Number(i)]);
  if (!files.includes(`assets/${found[0][1]}`)) fail(`dependency list of ${name} does not contain its own chunk`);
  for (const f of files) if (!f?.startsWith("assets/") || !existsSync(join(DIST, f))) fail(`missing chunk ${f}`);
  return files.filter((f) => f.endsWith(".js"));
}
const app = chunksFor("App");
const plan = chunksFor("PlanPage");

const counts = { home: 0, plan: 0, app: 0, skipped: 0 };
for (const item of readdirSync(DIST, { recursive: true, withFileTypes: true })) {
  if (!item.isFile() || !item.name.endsWith(".html")) continue;
  const file = join(item.parentPath, item.name);
  const route = `/${relative(DIST, file).split(sep).join("/")}`.replace(/index\.html$/, "");
  const html = readFileSync(file, "utf8");
  if (!ENTRY_TAG.test(html) || html.includes("data-route-preload")) { counts.skipped++; continue; }
  // Mirrors the branch order in src/RootApp.tsx.
  const kind = route === "/" || route === "/__preview/homepage-v2/" ? "home"
    : /^\/product\/[^/]+\/plans\/[^/]+\/$/.test(route) ? "plan" : "app";
  const tags = { home, plan, app }[kind]
    .filter((f) => !html.includes(`href="/${f}"`))
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" data-route-preload>`)
    .join("\n    ");
  writeFileSync(file, html.replace(ENTRY_TAG, (m) => `${m}\n    ${tags}`), "utf8");
  counts[kind]++;
}
if (!counts.home || !counts.app) fail(`unexpected route coverage ${JSON.stringify(counts)}`);
console.log(`[modulepreload] PASS ${JSON.stringify(counts)} chunks app=${app.length} home=${home.length} plan=${plan.length}`);
