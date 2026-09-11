# Sky-Zone Palette Morph — How It Works & How to Replicate It

The "sky zone" is the effect where the entire site color palette smoothly morphs from warm amber/gold into cool sky-blue when the **Software Projects** section scrolls into view, and morphs back when you scroll away.

---

## The Mental Model

```
User scrolls → IntersectionObserver fires → JS sets data-sky on <html>
                                                        ↓
                                          CSS @property values change
                                                        ↓
                                    Browser interpolates custom properties
                                    (because they are *registered* @properties)
                                                        ↓
                                    Every element using var(--accent) etc.
                                    smoothly animates to the new value
```

---

## Step 1 — Register Your CSS Custom Properties with `@property`

This is the **most critical** step and what most people miss.

Normal CSS custom properties (e.g. `--accent: red`) **cannot be transitioned**. The browser treats them as opaque strings. You have to use `@property` to tell the browser the *type* of the value, which unlocks interpolation.

```css
/* globals.css */
@property --accent   { syntax: "<color>"; inherits: true; initial-value: #c9ab7f; }
@property --accent-2 { syntax: "<color>"; inherits: true; initial-value: #d8c09a; }
@property --bg       { syntax: "<color>"; inherits: true; initial-value: #060504; }
```

**Key options:**
- `syntax: "<color>"` — tells the browser to interpolate as a color (LAB/sRGB)
- `inherits: true` — child elements automatically see the inherited value
- `initial-value` — the fallback if no theme sets a value

> [!TIP]
> Only register the tokens that need to *animate*. Registering everything wastes style recalc budget and can slow down low-end GPUs.

---

## Step 2 — Define Your Two Palettes

Define a "default" theme and a "sky" override. The sky override only needs to redefine the tokens that change — the rest stay inherited.

```css
/* Default theme (dark mode example) */
[data-theme="dark"] {
  --accent:  #c9ab7f;   /* gold */
  --accent-2: #d8c09a;  /* champagne */
  --bg:      #060504;   /* near black */
}

/* Sky zone override — only redefine what changes */
[data-theme="dark"][data-sky="true"] {
  --accent:  #85aedb;   /* sky blue */
  --accent-2: #a5c2e6;  /* light blue */
  --bg:      #04060b;   /* night sky */
}
```

Because `--accent` is a registered `@property`, when `data-sky` is added or removed, the browser interpolates between the old and new `<color>` values.

---

## Step 3 — Set the Transition on `<html>` (ALWAYS, not just when sky is active)

```css
/* ✅ CORRECT — transition is always present, fires in BOTH directions */
html {
  transition:
    --bg       1.1s cubic-bezier(0.22, 0.61, 0.36, 1),
    --accent   1.1s cubic-bezier(0.22, 0.61, 0.36, 1),
    --accent-2 1.1s cubic-bezier(0.22, 0.61, 0.36, 1);
}
```

```css
/* ❌ WRONG — common mistake: only transitions ON sky, snaps back OFF sky */
[data-sky="true"] {
  transition: --bg 1.1s ..., --accent 1.1s ..., --accent-2 1.1s ...;
}
/* When data-sky is REMOVED, this selector stops matching,
   the transition property vanishes instantly, palette SNAPS back. */
```

> [!IMPORTANT]
> **Why `<html>`?** Because `@property` custom properties are inherited, and `<html>` is the root. Any transition you put here cascades to all children automatically. This is what makes the exit animation work.

---

## Step 4 — Do NOT put a `background-color` transition on `<body>`

This is the bug causing the **"washed-out flash on enter"**.

```css
/* ❌ BAD — creates a double-transition race */
body {
  background-color: var(--bg);
  transition: background-color 0.7s ease; /* ← DELETE THIS */
}
```

When `--bg` changes on `<html>`, two things happen simultaneously:
1. `html` transitions `--bg` from gold → blue over 1.1s (the `@property` transition)
2. `body` sees the *already-resolved* new value of `var(--bg)` and starts its own 0.7s `background-color` transition

These two timelines conflict. The result: body gets the new color before the custom property has finished interpolating — causing a visible desaturated flash.

```css
/* ✅ CORRECT — let html's @property transition do the work */
body {
  background-color: var(--bg); /* stays reactive to --bg changes */
  transition: color 0.4s ease; /* only transition text color separately */
}
```

---

## Step 5 — Detect Scroll with IntersectionObserver

```js
// Vanilla JS
const section = document.querySelector("#projects");
const root = document.documentElement;
let isSky = false;
let timer = null;

const setSky = (next) => {
  if (next === isSky) return; // skip if unchanged — no redundant setAttribute
  clearTimeout(timer);
  // 60ms debounce kills rapid flip-flop from bouncy/momentum scrollers
  timer = setTimeout(() => {
    if (next === isSky) return;
    isSky = next;
    if (next) {
      root.setAttribute("data-sky", "true");
    } else {
      root.removeAttribute("data-sky");
    }
  }, 60);
};

const io = new IntersectionObserver(
  (entries) => entries.forEach(e => setSky(e.isIntersecting)),
  {
    // 0.15 = start the 1.1s transition while section is just peeking in.
    // By the time it's fully visible, the morph is complete.
    // Avoid negative rootMargin — it shifts the trigger zone and creates
    // a visual mismatch (palette changes before/after section is visible).
    threshold: 0.15,
  }
);
io.observe(section);
```

**React version** (in a `useEffect`):

```tsx
useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const root = document.documentElement;

  let isSky = false;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const setSky = (next: boolean) => {
    if (next === isSky) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (next === isSky) return;
      isSky = next;
      if (next) {
        root.setAttribute("data-sky", "true");
      } else {
        root.removeAttribute("data-sky");
      }
    }, 60);
  };

  const io = new IntersectionObserver(
    (entries) => { for (const entry of entries) setSky(entry.isIntersecting); },
    { threshold: 0.15 }
  );
  io.observe(el);

  return () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    io.disconnect();
    root.removeAttribute("data-sky");
  };
}, []);
```

---

## Step 6 — Respect Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  html {
    transition-duration: 0.001ms !important;
  }
}
```

---

## Summary Table

| Part | File | What it does |
|------|------|--------------|
| `@property --accent` etc. | `globals.css` | Registers tokens as typed `<color>` so browser can interpolate |
| `[data-theme="dark"]` | `globals.css` | Default palette |
| `[data-theme="dark"][data-sky="true"]` | `globals.css` | Sky palette override |
| `html { transition: --bg ... }` | `globals.css` | Makes change animate in **both** directions |
| `IntersectionObserver` | `projects.tsx` | Detects viewport entry/exit, sets `data-sky` |
| Debounce + isSky guard | `projects.tsx` | Prevents redundant setAttribute and scroll thrashing |

---

## Bug Reference

| Bug | Cause | Fix |
|-----|-------|-----|
| Exit snaps instantly | Transition only on `[data-sky="true"]` | Move transition to `html` unconditionally |
| Washed-out flash on enter | `body { transition: background-color }` conflicts | Remove `background-color` from body's transition |
| Laggy / mismatched trigger | Negative `rootMargin` shifts trigger zone | Remove `rootMargin`, tune `threshold` to 0.1–0.2 |
| Palette flickers at boundary | Bouncy scroller fires multiple observer entries | Add 60ms debounce + `isSky` redundancy guard |
| Custom property won't animate | Missing `@property` declaration | Register every token with `syntax: "<color>"` |

---

## Replication Checklist

- [ ] Register animated tokens with `@property { syntax: "<color>"; inherits: true; initial-value: ... }`
- [ ] Define base theme in `[data-theme]` or `:root`
- [ ] Define override theme in `[data-theme][data-sky="true"]`
- [ ] Put `html { transition: --token1 Xs easing, ... }` — **NOT** on `[data-sky]`
- [ ] Remove `background-color` from `body`'s transition list
- [ ] Add `IntersectionObserver` with `threshold: 0.15`, **no** negative `rootMargin`
- [ ] Add 60ms debounce + `isSky` redundancy guard in the observer callback
- [ ] Add `@media (prefers-reduced-motion)` to disable transitions
