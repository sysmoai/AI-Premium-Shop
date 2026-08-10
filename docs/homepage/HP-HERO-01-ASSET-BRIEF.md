# HP-HERO-01 — Homepage V2 Hero Asset Brief

**Status:** Ready for generation  
**Placement:** `homepage / home / hero`  
**Target component:** `HomepageHeroMedia`  
**Primary layout:** 5:4 media frame on the right side of Homepage V2 hero  
**Commercial role:** Editorial/decision-support visual only; not evidence of provider UI, customer results, payments or official provider affiliation.

## 1. Objective

Create one premium visual that makes the AIPS value proposition immediately understandable without relying on provider logos or fake screenshots:

**AI Premium Shop helps a Bangladesh buyer move from a real job-to-be-done to the right AI workflow/tool, with local buying/access guidance.**

The visual should communicate a connected AI-workflow universe rather than a collage of unrelated software cards.

## 2. Preferred concept — “AI Workflow Command Center”

A sophisticated dark 3D/editorial visualization:

- central warm-gold intelligent core / orchestration hub;
- six connected floating glass modules around it;
- each module uses a simple universal visual metaphor, not a provider interface:
  1. research — document/search/source layers;
  2. coding — code brackets/terminal blocks;
  3. image creation — image/canvas frame;
  4. video — film/timeline/frame sequence;
  5. automation — connected workflow nodes;
  6. local buying — smartphone/wallet/payment abstraction;
- subtle connection lines/energy paths show one coordinated ecosystem;
- premium enterprise/SaaS ecommerce art direction rather than gamer/cyberpunk neon.

## 3. Composition contract

- Aspect ratio: **5:4**.
- Master generation size: **2000 × 1600 px** or larger at exact 5:4.
- Main subject cluster: center-right, occupying roughly 65–75% of frame.
- Preserve breathing room around all edges for responsive crop tolerance.
- No critical object within the outer ~8% safe margin.
- Avoid tiny details that disappear at a rendered width of 420–620 px.
- Strongest focal point should be the central gold core, not any single workflow module.
- Background must blend naturally with page background `#07101F` / `#0D1930`.

## 4. Color / material direction

Primary palette:

- deep navy: `#07101F`
- secondary navy: `#0D1930`
- warm AIPS gold: `#F4B942`
- restrained indigo/violet accent: approximately `#6366F1`
- white/silver highlights only as secondary detail

Materials:

- dark anodized metal;
- smoked/translucent glass;
- subtle polished edges;
- controlled volumetric lighting;
- realistic depth and reflections;
- no excessive bloom.

## 5. Generation prompt — master still

Use this as the base prompt and keep the output free of baked-in text:

> Premium editorial 3D visualization for an AI tools marketplace homepage. A futuristic AI workflow command center on a deep navy background, with one elegant warm-gold luminous intelligence core connected to six floating translucent smoked-glass modules. The modules visually represent research and source documents, coding and code brackets, image creation and a visual canvas, AI video and a film timeline, business automation and connected workflow nodes, and local digital buying through a generic smartphone wallet/payment abstraction. Sophisticated enterprise SaaS ecommerce aesthetic, physically plausible glass and dark anodized metal, refined warm gold edge lighting, restrained indigo accents, subtle volumetric light, crisp premium product-render quality, clean hierarchy, generous negative space, subject cluster centered slightly right, cinematic but practical, highly polished, dark navy #07101F and #0D1930 with warm gold #F4B942. No people, no readable text, no provider interfaces, no provider logos, no currency amounts, no testimonials, no fake transactions, no watermark. 5:4 composition, designed for a premium responsive website hero.

## 6. Negative constraints

Reject/regenerate outputs containing any of the following:

- ChatGPT/OpenAI/Claude/Gemini/Midjourney/Canva/other provider logos;
- fake application screenshots or browser chrome;
- readable pseudo-text/gibberish;
- price tags, discount badges or currency amounts;
- fake customer photos/reviews/orders;
- humanoid robot cliché as the main subject;
- Bangladesh flag/map cliché unless extremely subtle and non-political;
- excessive purple neon/cyberpunk lighting;
- cluttered dashboard wall;
- more than six main workflow modules;
- tiny unreadable UI elements;
- distorted phones/screens/icons;
- stock-photo hands/people;
- obvious watermark/signature;
- bright/white background;
- flat cartoon style unless a deliberate later art-direction decision replaces this brief.

## 7. Candidate generation

Generate **4 candidates** from the same prompt, varying only composition/light balance:

- Candidate A — balanced command center, safest default;
- Candidate B — slightly more cinematic depth;
- Candidate C — cleaner/minimal product-render look;
- Candidate D — strongest glass/metal premium material detail.

Do not vary the core concept between candidates. We are selecting execution quality, not reopening strategy.

## 8. Selection checklist

A candidate passes only if:

- the first impression is premium and trustworthy;
- the central hub is obvious at phone size;
- six workflow ideas are visually distinguishable without text;
- there is no fake provider UI or brand affiliation implication;
- the image does not compete with the left-side H1;
- the navy background merges naturally into the website;
- gold is an accent/focal color, not an overwhelming yellow wash;
- crop remains coherent at 390 px mobile width;
- no malformed geometry/text/icons are visible;
- the scene still reads when downscaled to ~600 px wide.

## 9. Delivery files after selection

Keep the original highest-quality source plus export candidates for processing.

Preferred input to AIPS media pipeline:

- master: PNG or highest-quality WebP, 2000 × 1600 or larger, 5:4;
- no text baked into image;
- no added AIPS logo required — site UI already supplies brand identity;
- preserve an uncompressed/high-quality source for future crops/animation.

The production media pipeline will create optimized AVIF/WebP derivatives; do not repeatedly recompress the only master copy.

## 10. Optional motion derivative — only after still approval

The still must be approved first. Motion should be subtle and derived from the selected composition rather than regenerated as a different scene.

Target:

- 6–10 second seamless loop;
- 5:4;
- central core breathes/pulses softly;
- connection lines move slowly;
- floating modules have very small parallax/drift;
- no camera whip/zoom;
- no objects appearing/disappearing;
- no text;
- no audio;
- no flashing/strobing;
- first frame and poster visually match closely.

Production video will remain poster-first and user-controllable in Homepage V2.

## 11. Registry contract after approval

Still hero example:

- asset id: `HP-HERO-01`
- kind: `PRODUCT_HERO`
- publicationStatus: `APPROVED`
- link entityType: `homepage`
- link entityKey: `home`
- link placement: `hero`
- link isPrimary: `true`

If a motion version is approved later, use a separate video asset with a registered poster asset and keep exactly one primary homepage hero link.

## 12. QA before registry approval

Before any asset receives `APPROVED`:

1. inspect master at 100% zoom for malformed/gibberish detail;
2. inspect 5:4 desktop render in canary;
3. inspect 390 × 844 mobile render;
4. confirm no horizontal overflow/layout shift;
5. confirm meaningful alt text/caption;
6. verify intrinsic dimensions;
7. verify file type/magic bytes and metadata stripping through media pipeline;
8. verify visual contrast against the real hero;
9. compare page LCP/weight before vs after;
10. only then add/approve the registry record.
