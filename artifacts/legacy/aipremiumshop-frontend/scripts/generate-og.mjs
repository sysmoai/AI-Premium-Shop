import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const fontRegular = readFileSync("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf");
const fontBold = readFileSync("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf");

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/images/og");
mkdirSync(outDir, { recursive: true });

const element = {
  type: "div",
  props: {
    style: {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0a0e27",
      fontFamily: "sans-serif",
      padding: "60px 80px",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "32px",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f4b942, #f97316)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                children: [
                  {
                    type: "span",
                    props: {
                      style: { fontSize: 32 },
                      children: "⚡",
                    },
                  },
                ],
              },
            },
            {
              type: "span",
              props: {
                style: {
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "#ffffff",
                  letterSpacing: "-1px",
                },
                children: "AI Premium Shop",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            fontSize: 36,
            color: "#c9ceda",
            textAlign: "center",
            marginBottom: "28px",
            lineHeight: 1.3,
          },
          children: "56 Premium AI Tools · Bangladesh",
        },
      },
      {
        type: "div",
        props: {
          style: {
            fontSize: 52,
            fontWeight: "bold",
            color: "#f4b942",
            textAlign: "center",
            marginBottom: "40px",
          },
          children: "From BDT 350/mo",
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            gap: "24px",
            alignItems: "center",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  backgroundColor: "#1a2255",
                  borderRadius: "12px",
                  padding: "10px 24px",
                  color: "#c9ceda",
                  fontSize: 22,
                },
                children: "bKash",
              },
            },
            {
              type: "div",
              props: {
                style: {
                  backgroundColor: "#1a2255",
                  borderRadius: "12px",
                  padding: "10px 24px",
                  color: "#c9ceda",
                  fontSize: 22,
                },
                children: "Nagad",
              },
            },
            {
              type: "div",
              props: {
                style: {
                  backgroundColor: "#1a2255",
                  borderRadius: "12px",
                  padding: "10px 24px",
                  color: "#c9ceda",
                  fontSize: 22,
                },
                children: "Rocket",
              },
            },
          ],
        },
      },
    ],
  },
};

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "sans-serif", data: fontRegular, weight: 400, style: "normal" },
    { name: "sans-serif", data: fontBold, weight: 700, style: "normal" },
  ],
});

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
});
const pngData = resvg.render();
const pngBuffer = pngData.asPng();

const outPath = join(outDir, "default-og.png");
writeFileSync(outPath, pngBuffer);
console.log(`✅ OG image written to: ${outPath} (${pngBuffer.length} bytes)`);
