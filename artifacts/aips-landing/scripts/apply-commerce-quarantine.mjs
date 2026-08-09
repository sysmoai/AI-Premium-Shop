import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("dist/public");
const heroImage = "https://d8j0ntlcm91z4.cloudfront.net/user_3GpJL0EdnORuwvaMLAgyKiJmieA/hf_20260809_202826_d085c9d3-5ee5-4d75-9f49-81ffe7eb24e6_min.webp";
const notice = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Availability Under Verification | AI Premium Shop</title>
  <meta name="description" content="AI Premium Shop is reviewing current product availability and commercial information before accepting new website orders." />
  <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" crossorigin />
  <style>
    :root{color-scheme:dark;--bg:#070b1d;--panel:#111831;--line:rgba(255,255,255,.10);--muted:#b8c1d9;--gold:#f5c451;--green:#25d366}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 15% 0%,#182044 0,transparent 34%),var(--bg);color:#fff;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}.shell{width:min(1120px,calc(100% - 32px));margin:auto;padding:30px 0 54px}.brandbar{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:8px 0 28px}.brandname{font-weight:800;letter-spacing:.02em}.badge{font-size:12px;color:#d8def0;border:1px solid var(--line);border-radius:999px;padding:8px 12px;background:rgba(255,255,255,.04)}.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.9fr);gap:34px;align-items:center}.copy{padding:28px 0}.eyebrow{display:inline-flex;align-items:center;gap:8px;color:var(--gold);font-weight:800;font-size:13px;letter-spacing:.08em;text-transform:uppercase}.dot{width:8px;height:8px;border-radius:50%;background:var(--gold);box-shadow:0 0 18px rgba(245,196,81,.6)}h1{font-size:clamp(38px,6vw,68px);line-height:.98;letter-spacing:-.045em;margin:18px 0 22px;max-width:780px}p{color:var(--muted);line-height:1.75;font-size:17px;margin:0 0 15px;max-width:720px}.actions{margin-top:28px;display:flex;gap:12px;flex-wrap:wrap}a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:12px;text-decoration:none;font-weight:800}.support{background:var(--green);color:#07140b}.visual{position:relative;border:1px solid var(--line);background:#0f1631;border-radius:26px;overflow:hidden;min-height:440px;box-shadow:0 28px 80px rgba(0,0,0,.35)}.visual img{width:100%;height:100%;min-height:440px;display:block;object-fit:cover}.visual:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 48%,rgba(7,11,29,.62))}.visual-label{position:absolute;left:18px;right:18px;bottom:18px;z-index:2;padding:14px 16px;border:1px solid rgba(255,255,255,.12);background:rgba(7,11,29,.72);backdrop-filter:blur(12px);border-radius:14px;color:#e8ecf7;font-size:13px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:34px}.card{border:1px solid var(--line);background:rgba(17,24,49,.72);border-radius:16px;padding:18px}.card strong{display:block;margin-bottom:7px;font-size:14px}.card span{color:#9faac4;font-size:13px;line-height:1.55}.footer{margin-top:34px;padding-top:22px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;color:#8792ad;font-size:13px}.footer a{padding:0;min-height:0;color:#cbd3e8;font-weight:700}@media(max-width:800px){.shell{padding-top:20px}.brandbar{padding-bottom:12px}.hero{grid-template-columns:1fr;gap:10px}.copy{padding-top:18px}h1{font-size:clamp(36px,12vw,54px)}.visual,.visual img{min-height:300px}.grid{grid-template-columns:1fr}.footer{flex-direction:column}.badge{display:none}}
  </style>
</head>
<body>
  <main class="shell">
    <header class="brandbar"><div class="brandname">AI Premium Shop</div><div class="badge">Bangladesh · Verification mode</div></header>
    <section class="hero">
      <div class="copy">
        <div class="eyebrow"><span class="dot"></span>Catalog review in progress</div>
        <h1>Product availability is under verification</h1>
        <p>We are validating current product availability, access methods and other commercial information before publishing or accepting new website orders.</p>
        <p>Older product pages should not be treated as current offers while this review is active.</p>
        <div class="actions"><a class="support" href="https://wa.me/8801865385348?text=Hi%2C%20I%20have%20a%20question%20about%20AI%20Premium%20Shop%20availability." rel="noopener noreferrer">Contact support</a></div>
      </div>
      <figure class="visual">
        <img src="${heroImage}" alt="Editorial AI workspace visual for AI Premium Shop" width="1344" height="752" fetchpriority="high" decoding="async" />
        <figcaption class="visual-label">Brand editorial visual · commercial details intentionally withheld until verification completes</figcaption>
      </figure>
    </section>
    <section class="grid" aria-label="Verification status">
      <div class="card"><strong>Catalog truth</strong><span>Protected commercial facts remain unpublished until explicitly approved in the canonical source of truth.</span></div>
      <div class="card"><strong>Safe publishing</strong><span>Production stays fail-closed while automated checks prevent stale commercial content from returning.</span></div>
      <div class="card"><strong>Support channel</strong><span>General availability questions can still be directed to the public support contact.</span></div>
    </section>
    <footer class="footer"><span>AI Premium Shop · Bangladesh</span><span>Commercial storefront temporarily paused for verification</span></footer>
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
