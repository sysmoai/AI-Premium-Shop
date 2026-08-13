#!/usr/bin/env node
import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(APP, "dist/public");
const ASSETS = join(DIST, "assets");

const BUDGETS = {
  entryGzipKb: 70,
  homepageV2GzipKb: 15,
  cssGzipKb: 35,
  productsGzipKb: 80,
  anyJsRawKb: 600,
};

const kb = (bytes) => Number((bytes / 1024).toFixed(2));

function readMetrics(fileName) {
  const path = join(ASSETS, fileName);
  const body = readFileSync(path);
  return {
    fileName,
    rawBytes: statSync(path).size,
    rawKb: kb(statSync(path).size),
    gzipBytes: gzipSync(body, { level: 9 }).length,
    gzipKb: kb(gzipSync(body, { level: 9 }).length),
  };
}

function oneFile(files, pattern, label) {
  const matches = files.filter((file) => pattern.test(file));
  if (matches.length !== 1) {
    throw new Error(`[bundle-budget] Expected exactly one ${label} asset, found ${matches.length}: ${matches.join(", ") || "none"}`);
  }
  return matches[0];
}

function assertMax(metric, field, maxKb, label) {
  const actual = metric[field];
  if (actual > maxKb) {
    throw new Error(`[bundle-budget] ${label} is ${actual} kB, over ${maxKb} kB budget (${metric.fileName})`);
  }
}

const files = readdirSync(ASSETS);
const indexHtml = readFileSync(join(DIST, "index.html"), "utf8");
const entryMatch = indexHtml.match(/<script[^>]+type=["']module["'][^>]+src=["']\/assets\/(index-[^"']+\.js)["']/i)
  ?? indexHtml.match(/<script[^>]+src=["']\/assets\/(index-[^"']+\.js)["'][^>]+type=["']module["']/i);
if (!entryMatch) throw new Error("[bundle-budget] Could not resolve the hashed entry module from dist/public/index.html");

const entry = readMetrics(entryMatch[1]);
const homepageV2 = readMetrics(oneFile(files, /^HomeV2-[A-Za-z0-9_-]+\.js$/, "Homepage V2 route"));
const css = readMetrics(oneFile(files, /^index-[A-Za-z0-9_-]+\.css$/, "entry CSS"));
const products = readMetrics(oneFile(files, /^products-[A-Za-z0-9_-]+\.js$/, "products data"));
const jsFiles = files.filter((file) => file.endsWith(".js"));
const largestJs = jsFiles.map(readMetrics).sort((a, b) => b.rawBytes - a.rawBytes)[0];

assertMax(entry, "gzipKb", BUDGETS.entryGzipKb, "entry gzip");
assertMax(homepageV2, "gzipKb", BUDGETS.homepageV2GzipKb, "Homepage V2 route gzip");
assertMax(css, "gzipKb", BUDGETS.cssGzipKb, "entry CSS gzip");
assertMax(products, "gzipKb", BUDGETS.productsGzipKb, "products data gzip");
assertMax(largestJs, "rawKb", BUDGETS.anyJsRawKb, "largest JavaScript chunk raw size");

console.log(JSON.stringify({
  status: "PASS",
  budgetsKb: BUDGETS,
  measuredKb: {
    entry: { raw: entry.rawKb, gzip: entry.gzipKb, file: entry.fileName },
    homepageV2: { raw: homepageV2.rawKb, gzip: homepageV2.gzipKb, file: homepageV2.fileName },
    css: { raw: css.rawKb, gzip: css.gzipKb, file: css.fileName },
    products: { raw: products.rawKb, gzip: products.gzipKb, file: products.fileName },
    largestJs: { raw: largestJs.rawKb, gzip: largestJs.gzipKb, file: largestJs.fileName },
  },
}, null, 2));
