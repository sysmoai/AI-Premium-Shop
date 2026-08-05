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

## Root cause 3 — the prerendered shell PAINTED, then was thrown away (the big one)

Root causes 1 and 2 removed the white flash, and the owner reported the blink was
still there. It was, and this was why.

`scripts/prerender-products.mjs` writes a plain, **class-free** HTML copy of each
page into `<div id="root">` so crawlers that do not execute JS see real content.
`main.tsx` then calls `createRoot(...).render()`, which **does not hydrate** — it
empties the container and renders fresh.

Measured on production, 1280px viewport:

| | |
|---|---|
| first frame | 106 elements, **0** with a class attribute, `<h1>` computing to **16px**, `<main>` at full 1265px bleed with no padding |
| duration | DOM interactive 87ms, JS chunks land ~370ms — so **~300-400ms** on a warm fast connection, far longer on mobile data |
| second frame | `createRoot` empties `#root`, real design paints |

A wall of unstyled text for a third of a second, replaced wholesale. That is the
blink, on every page.

The SEO work in the same session made it **worse**: growing the static bodies
(homepage 3,489 → 4,517 chars, Higgsfield 1,536 → 8,702) grew exactly the content
that painted unstyled and was then discarded.

### Fix

The prerendered body is wrapped in `#prerender-shell`, and `index.html` hides it
for any browser that will run React:

```html
<style>html.js #prerender-shell { display: none !important; }</style>
<script>document.documentElement.className += " js";</script>
```

Both live in `<head>`, and the script is **synchronous**, so the class is set
before `<body>` is parsed — the shell is never painted, rather than being shown
and then removed (which would be the same flash by another route).

Verified on production across 5 routes: `display: none`, painted height 0,
**0 visible characters** at first paint, background already `#0a0e27`, and
4,545 / 3,774 / 8,702 / 7,890 / 156 chars still served to crawlers.

**This is not cloaking.** Googlebot executes JS, gets the `.js` class, and sees
exactly what a user sees — the React render. Only agents that cannot run JS at
all fall back to the shell, which is precisely who it was written for.

### The mistake worth remembering

The first attempt shipped the correct rule inside an **unterminated CSS comment**
— I closed it with `-->` (HTML) instead of `*/` (CSS), so everything after it,
including the hide rule, was swallowed. The `.js` class was set correctly and
`display` was still `block`.

`seo-check` passed it because it asserted the rule *text* was present in `<head>`.
Presence is not the property that matters. It now counts `/*` against `*/`, fails
on `-->` inside CSS, and strips comments before asserting the rule exists.

## Root cause 4 — .scroll-reveal could hide content permanently

`.scroll-reveal` starts at `opacity: 0` and waits for an IntersectionObserver to
add `.visible`. Measured live: **16 of 16** homepage sections sat at opacity 0.

Two defects, duplicated in `Home.tsx` and `BanglaBN.tsx`:

1. `threshold: 0.1` required 10% of the element visible. An element taller than
   10× the viewport can never reach a 0.1 ratio — so the tallest, most
   content-heavy sections were the ones that could never reveal.
2. No fallback at all. Any failure to add `.visible` left a blank page with full
   scroll height.

Now `src/hooks/useScrollReveal.ts`: `threshold: 0` with a small `rootMargin`, an
immediate reveal when `IntersectionObserver` is absent or the user prefers
reduced motion, and a 3s fail-open backstop. Plus a `prefers-reduced-motion` rule
in `index.css` and a `<noscript>` rule in `index.html`.

Content visibility must fail **open**. An animation that does not play is a
cosmetic loss; content that never appears is the page being broken.

## Known remaining behaviour — the static → React swap

`main.tsx` calls `createRoot(container).render(<App/>)` on a container that
Vercel serves with **prerendered static markup already inside it** (written by
`scripts/prerender-products.mjs` for SEO).

`createRoot` does not hydrate — it empties the container and renders fresh. So
the crawlable static body is discarded and replaced by React's tree on every
load. React does this within a single commit, so there is no blank *paint*, but
the two markups differ in layout, so there is a content shift.

The swap still happens — but it is no longer *visible*, because the shell is
never painted. What remains is a dark screen until React mounts. This was not
changed further, deliberately:

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
