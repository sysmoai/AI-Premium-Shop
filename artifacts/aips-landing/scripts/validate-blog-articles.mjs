#!/usr/bin/env node
// Gate for long-form blog articles: any post in data/blog-guides.json that has `sections`.
// Short decision guides without sections keep their existing checks.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateArticle } from "./lib/product-guides.mjs";

const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const { products } = JSON.parse(fs.readFileSync(path.join(APP, "data/products.json"), "utf8"));
const { posts } = JSON.parse(fs.readFileSync(path.join(APP, "data/blog-guides.json"), "utf8"));
const articles = posts.filter((post) => Array.isArray(post.sections));
const errors = articles.flatMap((post) => validateArticle(post, products));
if (errors.length) {
  for (const error of errors) console.error(`[blog-articles] FAIL ${error}`);
  process.exit(1);
}
console.log(`[blog-articles] PASS: ${articles.length} long-form article(s) match catalog prices, approved payment methods and claim rules`);
