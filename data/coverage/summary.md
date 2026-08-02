# Full Tools Coverage — Summary

**Generated:** 2026-08-02  ·  **Branch:** feat/aips-full-tools-coverage-20260802-1300

## Answer: are ALL tools on the website?

**No.** Sellable coverage is 232/356 = **65%**.

## Required counts

| Metric | Value |
|---|---|
| TOTAL_SYSTEM_TOOLS | 467 |
| — of which sellable | 356 |
| — not applicable (labs / cloud infra / free) | 106 |
| PRESENT (priced) | 191 |
| PRESENT (request-price) | 41 |
| PRESENT total | 232 |
| PARTIAL | 0 |
| MISSING | 129 |
| ADDED_THIS_RUN | 0 (measurement pass; additions pending triage) |
| LEFT_REQUEST_PRICE | 41 |
| BLOCKED_FOR_CEO | 0 |
| **PRICES_CHANGED** | **0** |

## Why 106 tools are NOT_APPLICABLE

The universe list mixes purchasable subscriptions with research labs, national AI
programmes, open-weight model families and enterprise cloud platforms. Those are
not catalog gaps — listing Vertex AI or SEA-LION as a buyable product would be
false. This matches the ATLAS finding that 205 of 343 consolidated rows were
research-only.

## MISSING by group

### chat_assistants (32)
ChatGPT Edu · Codex · Claude Cowork · Claude Research · Workspace Gemini · Flow · AI Studio · Gemma · Vertex AI · X Premium access · Sonar API · Security Copilot · Meta AI · Llama · Meta AI Studio · Mistral Le Chat · La Plateforme · Codestral · Manus Pro 4000 · Manus Pro 8000 · Manus 1.6 Lite · Wide Research · AI Slides · Browser Operator · Pi · Kimi · Doubao · Yuanbao · ERNIE Bot · GLM · Spark · SenseChat

### image_design (13)
Adobe Creative Cloud AI · Adobe Express · Magic Studio · Dream Lab · Magnific · Playground AI · Clipdrop · Civitai · FLUX · Stability AI · DreamStudio · Stable Diffusion · LiblibAI

### audio_music_voice (12)
PlayHT · Cartesia · Deepgram · AssemblyAI · Speechify · Synthflow · Stable Audio · Resemble AI · LALAL.AI · Adobe Podcast · WellSaid Labs · Krisp

### atlas_bundles (12)
AI Developer Starter Pack · BuddyPro · Business Power Package · ChatAid · Content Creator Pack · Digital Marketing Pro Pack · Freelancer Pro Pack · Full-Stack Freelancer Stack · HelloFrank · Research Powerhouse Package · Thesis Writer Pack · Video Creator Pack

### seo_marketing_support (10)
Ahrefs · SE Ranking · Moz · Frase · MarketMuse · AdCreative.ai · Predis.ai · Simplified · Ocoya · Zendesk AI

### search_research_agents (9)
Scite · SciSpace · Wolfram · Turnitin · Paperpal · Jenni AI · Relay · Ada · Voiceflow

### video_avatar_edit (9)
Sora · Google Veo · Haiper · LTX Studio · Argil · Vizard · Colossyan · Akool · Filmora

### presentation_design_apps (9)
Figma · Framer · Plus AI · Decktopus · Looka · Designs.ai · Pitch · SlidesAI · Napkin AI

### creative_assets_learning (9)
Envato Elements · Storyblocks · Motion Array · LinkedIn Premium Career · LinkedIn Premium Business · LinkedIn Learning · Coursera Plus · Skillshare · DataCamp

### code_dev (4)
Poolside · Qodo · Augment · Amazon Q Developer

### writing_productivity (3)
Rytr · Sudowrite · HyperWrite

### automation (3)
Yellow.ai · Haptik · Gupshup

### meetings (3)
Fathom · tl;dv · Read AI

### aips_catalog_db (1)
v0.dev Pro

## Method

Matching is exact-normalized first, then token-containment with a stopword list
(so "Poe Pro" matches "Poe" and "Looker Studio Setup" matches "Looker Studio
Dashboard Setup"). An earlier prefix-based version under-reported coverage by 7
tools — n8n, Poe, VEED, Tome, Looker, Otter and Elicit all exist but were being
reported missing because their names are shorter than the length threshold. That
bug was found and fixed before these numbers were published.

Ambiguous single tokens (flow, spark, chat, code, meta…) never match alone,
because "Flow" would otherwise falsely match Flowise.
