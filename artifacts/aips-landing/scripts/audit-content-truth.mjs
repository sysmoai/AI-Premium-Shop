#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const targets = [
  "src/pages/BlogPostPage.tsx",
  "src/pages/BlogPage.tsx",
  "src/pages/BrandPage.tsx",
  "src/pages/CategoryPage.tsx",
  "src/pages/ComparisonPage.tsx",
  "data/products.json",
  "data/catalog-lite.json",
].map((p) => path.join(root, p));

const rules = [
  {
    id: "fixed-fast-delivery",
    severity: "error",
    re: /\b(?:5\s*[-–]\s*30|5\s*[-–]\s*15|10\s*[-–]\s*30)\s*(?:min|minute|minutes|মিনিট)\b/gi,
    reason: "Fixed delivery-time claims require current AIPS fulfillment evidence and approval.",
  },
  {
    id: "earnings-outcome",
    severity: "error",
    re: /(?:earn|income|আয়|উপার্জন)[^\n]{0,50}(?:BDT|৳)\s*[\d,]+\+?\s*(?:\/mo|per month|মাসে)?/gi,
    reason: "Earnings outcomes require substantiation and must not be presented as expected results.",
  },
  {
    id: "earn-fast",
    severity: "error",
    re: /earn\s+in\s+\d+\s+days?/gi,
    reason: "Time-bound earnings claims are not acceptable without strong evidence and contextual qualification.",
  },
  {
    id: "shared-login-sales-language",
    severity: "error",
    re: /\b(?:starter\s+shared|premium\s+shared|pro\s+shared|shared\s+account|shared\s+pool|shared\s+login)\b/gi,
    reason: "Shared-access sales language must remain quarantined unless exact provider authorization is evidenced and approved.",
  },
  {
    id: "hard-coded-tool-count",
    severity: "warning",
    re: /\b(?:\d{2,3}\+?|\d{2,3})\s+(?:AI\s+)?(?:tools?|products?|plans?)\b/gi,
    reason: "Hard-coded catalog/tool counts drift; use a reconciled generated source or omit the count.",
  },
  {
    id: "best-ranking-claim",
    severity: "warning",
    re: /\b(?:best|#1|number\s+one|top-ranked)\b[^\n]{0,80}\b(?:AI\s+)?(?:shop|subscription|provider|company|service)\b/gi,
    reason: "Superlative/ranking claims require objective current evidence and clear methodology.",
  },
];

const allow = [
  /current provider price/i,
  /price varies/i,
  /under verification/i,
  /not a guarantee/i,
];

let errors = 0;
let warnings = 0;
const findings = [];

for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (allow.some((re) => re.test(line))) continue;
    for (const rule of rules) {
      rule.re.lastIndex = 0;
      const match = rule.re.exec(line);
      if (!match) continue;
      const entry = { file: rel, line: i + 1, rule: rule.id, severity: rule.severity, match: match[0], reason: rule.reason };
      findings.push(entry);
      if (rule.severity === "error") errors += 1;
      else warnings += 1;
    }
  }
}

console.log(`[content-truth] findings=${findings.length} errors=${errors} warnings=${warnings}`);
for (const f of findings.slice(0, 200)) {
  console.log(`[${f.severity}] ${f.file}:${f.line} ${f.rule} :: ${JSON.stringify(f.match)} :: ${f.reason}`);
}
if (findings.length > 200) console.log(`[content-truth] ${findings.length - 200} additional findings omitted from console output.`);

// Research branch is an audit lane: existing legacy debt is expected, so the script
// reports findings without blocking by default. Set AIPS_CONTENT_TRUTH_STRICT=1 in a
// release workflow to fail on error-severity findings.
if (process.env.AIPS_CONTENT_TRUTH_STRICT === "1" && errors > 0) {
  process.exit(1);
}
