import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("dist/public");
const notice = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Availability Under Verification | AI Premium Shop</title>
  <meta name="description" content="AI Premium Shop is reviewing current product availability and commercial information before accepting new website orders." />
  <style>
    :root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#0a0e27;color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh;display:grid;place-items:center}.wrap{width:min(760px,calc(100% - 32px));padding:56px 0;text-align:center}.mark{width:56px;height:56px;margin:0 auto 24px;border:1px solid rgba(251,191,36,.35);border-radius:16px;display:grid;place-items:center;background:rgba(251,191,36,.1);font-size:28px}h1{font-size:clamp(30px,5vw,44px);line-height:1.1;margin:0 0 18px}p{color:#c9ceda;line-height:1.7;font-size:17px;margin:0 auto 16px;max-width:690px}.actions{margin-top:32px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap}a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 20px;border-radius:12px;text-decoration:none;font-weight:700}.support{background:#008236;color:#fff}.plain{border:1px solid rgba(255,255,255,.18);color:#fff}.brand{margin-top:46px;color:#8f98ad;font-size:14px}
  </style>
</head>
<body>
  <main class="wrap">
    <div class="mark" aria-hidden="true">!</div>
    <h1>Product availability is under verification</h1>
    <p>We are reviewing current product availability, access methods, pricing and related commercial information before publishing or accepting new orders from this website.</p>
    <p>No product, price, access method or delivery promise from an older page should be treated as a current offer until this review is complete.</p>
    <div class="actions">
      <a class="support" href="https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20question%20about%20AI%20Premium%20Shop%20availability." rel="noopener noreferrer">Contact support</a>
      <a class="plain" href="mailto:info@aipremiumshop.com">Email support</a>
    </div>
    <div class="brand">AI Premium Shop · Bangladesh</div>
  </main>
</body>
</html>`;

if (!fs.existsSync(outDir)) throw new Error(`Build output not found: ${outDir}`);

let htmlCount = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) {
      fs.writeFileSync(full, notice, "utf8");
      htmlCount += 1;
    }
  }
}
walk(outDir);

const index = path.join(outDir, "index.html");
if (!fs.existsSync(index)) fs.writeFileSync(index, notice, "utf8");

console.log(`[commerce-quarantine] replaced ${htmlCount} generated HTML files with fail-closed verification notice`);
