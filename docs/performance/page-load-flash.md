# Page-load flash — root cause and fix

**Reported:** the site "visibly blinks or flashes while loading."
**Diagnosed and fixed:** 2026-08-05
**Regression risk:** high. Both fixes are one-line deletions away from coming back.

---

## Reproduction

Cold cache, any route, dark-themed site. The flash is a **full-viewport white
frame** between first paint and the stylesheet applying. It is most visible on a
slow connection and on mobile, and invisible on a warm cache — which is why it
survived fifteen sessions of work.

## Root cause 1 — the background lived only in the external stylesheet

`src/index.css` line ~188 declared:

```css
body { background-color: #0a0e27; color: #FFFFFF; }
```

That file ships as `<link rel="stylesheet" href="/assets/index-*.css">` — a
render-blocking *external* resource. `index.html` itself set **no** background on
`<html>` or `<body>`.

So the browser's paint sequence was:

1. Parse HTML, see no background → paint the default canvas, which is **white**.
2. Fetch and apply the stylesheet.
3. Repaint at `#0a0e27`.

Step 1 → step 3 is the flash. The site declares `<meta name="theme-color"
content="#0a0e27">`, so the browser chrome was already dark while the document
body was still white — which makes the flash read as a "blink" rather than a
slow load.

### Fix

An inline `<style>` in `index.html`, positioned **first in `<head>`, above every
stylesheet link**:

```html
<style>
  :root { color-scheme: dark; }
  html, body { background-color: #0a0e27; color: #ffffff; margin: 0; }
  #root { min-height: 100vh; }
</style>
```

- `background-color` on `html, body` means the very first paint is correct.
- `color-scheme: dark` stops the browser painting white default scrollbars and
  form controls before the CSS lands.
- `#root { min-height: 100vh }` keeps the page from collapsing to zero height
  during the static-HTML → React swap (see below), which is what turned a colour
  change into a visible jump.

**Do not** move this block below the font `<link>`, and **do not** move it into
`index.css`. Either change restores the exact bug.

## Root cause 2 — the Google Fonts request was serialised behind the app CSS

`src/index.css` line 1 was:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:...');
```

`index.html` **already** loaded the same Inter stylesheet via `<link>`. So the
font CSS was requested twice, and the `@import` copy was the pathological one: a
CSS `@import` cannot start downloading until the importing stylesheet has itself
arrived. That produced a four-hop serial chain in front of first paint:

```
HTML → index.css → fonts.googleapis.com/css2 → the font files
```

### Fix

Deleted the `@import`. Font loading stays in the HTML `<link>` only, which the
browser's preload scanner can start immediately and in parallel. The URL already
carries `&display=swap`, so text renders in the fallback face rather than
staying invisible.

## Not the cause (checked and ruled out)

- **Suspense fallback.** `App.tsx` already uses an empty `<div style={{minHeight:
  "60vh"}} aria-busy>` rather than a full-page "Loading…" screen. A previous
  session fixed this.
- **Theme flash / localStorage.** The site has no theme toggle; it is
  unconditionally dark. No `next-themes`, no `localStorage` read before paint.
- **Hydration mismatch.** `main.tsx` uses `createRoot(...).render()`, not
  `hydrateRoot`. It therefore never *attempts* hydration and cannot emit a
  hydration mismatch warning.

## Known remaining behaviour — the static → React swap

`main.tsx` calls `createRoot(container).render(<App/>)` on a container that
Vercel serves with **prerendered static markup already inside it** (written by
`scripts/prerender-products.mjs` for SEO).

`createRoot` does not hydrate — it empties the container and renders fresh. So
the crawlable static body is discarded and replaced by React's tree on every
load. React does this within a single commit, so there is no blank *paint*, but
the two markups differ in layout, so there is a content shift.

This was **not** changed in this pass, deliberately:

- Switching to `hydrateRoot` would be the textbook fix, but the static markup is
  **not React-generated** — it is built by a string extractor in
  `prerender-products.mjs`. Hydrating against it would produce mismatches on
  every page and is a much larger piece of work than a flash fix.
- With root cause 1 fixed, the swap now happens dark-on-dark with a reserved
  viewport height, which is what made it perceptible.

If the shift is still objectionable after this deploy, the real fix is to render
the static bodies *from the React components themselves* (a proper SSG step)
rather than from a text extractor, and then switch to `hydrateRoot`. That is a
substantial project and should be scoped on its own.
