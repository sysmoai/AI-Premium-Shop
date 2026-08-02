// Truth validator — guards the canonical AI Premium Shop facts against drift.
//
// This project's failure mode has never been "someone wrote something false on
// purpose". It is that a number gets typed by hand in a 9th place, or an old
// phrasing survives a find-and-replace because it was worded differently, and
// nobody notices for weeks. Two real examples this validator would have caught:
//   - "Over 3,000 customers served" survived a sweep that only looked for "3,000+"
//   - "since 2024" was live in Organization JSON-LD while pages said otherwise
//
// Exit 1 on any ERROR so CI blocks the merge. Warnings are advisory.
//
// Run: npm run validate:truth

import fs from "node:fs";
import path from "node:path";

const SRC = "src";
const errors = [];
const warnings = [];

// --- canonical facts (CEO-attested 2026-08-02) ------------------------------
const CANON = {
  foundingYear: "2022",
  customerCount: "10,000+",
};

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx?|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = walk(SRC);
const read = (f) => fs.readFileSync(f, "utf8");

// Strip line/block comments so an explanatory comment about a past bug can
// mention the old value without tripping the guard that prevents it returning.
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

for (const f of files) {
  const body = stripComments(read(f));
  const lines = body.split("\n");

  lines.forEach((line, i) => {
    const at = `${f}:${i + 1}`;

    // 1. Founding year must be canonical.
    const years = line.match(/\b(?:since|Since|founded|Founded|established|Established)\s+(20\d\d)\b/g);
    if (years) {
      for (const y of years) {
        const yr = y.match(/(20\d\d)/)[1];
        if (yr !== CANON.foundingYear) {
          errors.push(`${at}  founding year "${yr}" — canonical is ${CANON.foundingYear}  |  ${line.trim().slice(0, 90)}`);
        }
      }
    }

    // 2. Organization JSON-LD foundingDate.
    const fd = line.match(/foundingDate:\s*["'](\d{4})["']/);
    if (fd && fd[1] !== CANON.foundingYear) {
      errors.push(`${at}  JSON-LD foundingDate "${fd[1]}" — canonical is ${CANON.foundingYear}`);
    }

    // 3. Any customer/client count must be the canonical figure. Catches
    //    "3,000+ customers", "Over 3,000 customers", "thousands of customers".
    const counts = line.match(/([\d,]{3,}\+?|thousands|Thousands)\s+(?:of\s+)?(?:happy\s+)?(customers|clients)\b/g);
    if (counts) {
      for (const c of counts) {
        if (!c.startsWith(CANON.customerCount)) {
          errors.push(`${at}  customer count "${c.trim()}" — canonical is "${CANON.customerCount} customers"  |  ${line.trim().slice(0, 80)}`);
        }
      }
    }

    // 4. Hard-banned self-claims. These are never acceptable about AIPS.
    for (const [re, label] of [
      [/\bzero disputes\b/i, "zero disputes"],
      [/\b(?:we are|we're)\s+(?:the\s+)?(?:#1|number one|cheapest|best)\b/i, "self-superlative"],
      [/\bofficial\s+partner\b/i, "official partner"],
      [/\bauthorized\s+(?:distributor|reseller)\b/i, "authorized distributor/reseller"],
      [/\bguaranteed\s+(?:income|earnings|results|ranking)/i, "guaranteed outcome"],
      [/\bBangladesh['’]s\s+#1\b/i, "Bangladesh's #1"],
    ]) {
      if (re.test(line)) errors.push(`${at}  banned claim (${label})  |  ${line.trim().slice(0, 90)}`);
    }

    // 5. "Instant delivery" must carry a real time window (advisory: the
    //    catalog legitimately says "Instant activation" next to an SLA).
    if (/\binstant\s+delivery\b/i.test(line) && !/\d\s*[–-]\s*\d|\d+\s*(min|hour)/i.test(line)) {
      warnings.push(`${at}  "instant delivery" with no stated time window  |  ${line.trim().slice(0, 80)}`);
    }

    // 6. Third-party superlatives — editorial claims about other vendors'
    //    products. Not blocking (they describe someone else's tool, not AIPS)
    //    but they are unverified and worth periodic review.
    if (/#1\s+(?:AI|for|paraphras|avatar|paid|paid )/i.test(line)) {
      warnings.push(`${at}  unverified third-party superlative  |  ${line.trim().slice(0, 80)}`);
    }
  });
}

// --- report -----------------------------------------------------------------
console.log(`validate-truth: scanned ${files.length} source files\n`);

if (errors.length) {
  console.log(`[31m✖ ${errors.length} ERROR(S) — canonical fact drift[0m`);
  for (const e of errors) console.log("  " + e);
  console.log("");
}

if (warnings.length) {
  console.log(`[33m⚠ ${warnings.length} warning(s)[0m`);
  const shown = warnings.slice(0, 15);
  for (const w of shown) console.log("  " + w);
  if (warnings.length > shown.length) console.log(`  … and ${warnings.length - shown.length} more`);
  console.log("");
}

if (!errors.length) {
  console.log(`[32m✔ canonical facts intact[0m  (since ${CANON.foundingYear}, ${CANON.customerCount} customers, no banned self-claims)`);
}

process.exit(errors.length ? 1 : 0);
