# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

**Here Be Dragons** is a static, no-build design system package for fantasy/RPG web interfaces. There is no bundler, no `npm install`, no test suite, and no CI pipeline. All deliverables are plain HTML/CSS/JSX files that run directly in a browser.

## Local development

Start the HTTP server (required — Babel cannot load `.jsx` files over `file://`):

```bash
npm run dev
# or: npx serve@14 . --no-clipboard
# or: python3 -m http.server 3000
```

Then open **`http://localhost:3000`** — this loads `index.html`, the navigation hub linking to every preview card, the full token reference, and the Compendium app.

| URL | What it is |
|-----|-----------|
| `http://localhost:3000` | Navigation hub (all previews + app) |
| `http://localhost:3000/design-system.html` | Full token + component reference |
| `http://localhost:3000/ui_kits/app/index.html` | Runnable React Compendium app |
| `http://localhost:3000/preview/<card>.html` | Individual token/component cards |

**Package audit** (validates token usage, contrast, anti-patterns):
```
"$OD_NODE_BIN" "$OD_BIN" tools connectors design-system-package-audit --path . --fail-on-warnings
```

## Architecture

### Token layer — `colors_and_type.css`
Single source of truth. Import it first in every HTML artifact:
```html
<link rel="stylesheet" href="../../colors_and_type.css">
```
Declares all 17 CSS custom properties on `:root`, semantic aliases, `@font-face` for Tiamat Condensed SC (referencing the `assets_TiamatCondensedSC-Regular.*` files in the project root), Google Fonts `@import`, spacing tokens (`--space-1` through `--space-24`), border/shadow/radius tokens, and utility classes (`.btn`, `.btn--primary`, `.btn--gold`, `.eyebrow`, `.dropcap`, `.callout`, `.code-block`, `.cornered`).

**Never invent token values outside this file.** Derive new colours with `color-mix()` from existing tokens.

### Component layer — `ui_kits/app/components/`
React 18 + Babel standalone JSX components. Each file exposes itself on `window.ComponentName` (e.g. `window.SpellCard`) so Babel script evaluation order is irrelevant. Components use inline style objects with hard-coded hex values matching the token palette — the token CSS custom properties are not accessible from inline styles.

### Preview layer — `preview/`
Thirteen static HTML cards. Each imports `../colors_and_type.css` and renders live tokens/components. These are the authoritative visual reference for component shapes, spacing, and interaction states.

### Source evidence — `context/`
Captured snapshots from the original React + Babel Compendium codebase. All design decisions trace to files here. The subdirectory `context/local-code/here-be-dragons-design-system/project/` holds the original `colors_and_type.css`, source JSX components, font files, dice SVGs, and acceptance screenshots.

## Key design rules

These rules are enforced by the audit and must be respected in all new artifacts:

- **`--parchment-100` (`#f5ecd7`) covers ≥80% of all surface area.**
- **Never use `--gold` (`#b8893b`) or `--gold-bright` as text on parchment** — fails WCAG AA (~2.9:1). Use `--gold-deep` (`#7a5a22`, ~5.4:1) for gold text.
- **Never use `--emerald` and `--sapphire` together on the same component.**
- **`border-radius` must not exceed 2px** (`--radius: 1px`, `--radius-lg: 2px`). Higher values break the manuscript feel.
- **Hard offset shadows only** — `4px 4px 0` or `3px 3px 0` with an ink/parchment colour. No `blur()` on interactive elements.
- **Never use Inter, Arial, or system-ui** as a typeface.
- **No `scrollIntoView()`** — breaks embedded previews.
- **No `text-align: justify`** on body text.
- All decorative SVGs must have `aria-hidden="true" focusable="false"`. Informative dice need a `<title>` element.
- All animations must be disabled under `@media (prefers-reduced-motion: reduce)`.

## Canonical design reference

Read `DESIGN.md` before making any design decisions. It is the authoritative source for:
- §0 — Source evidence inventory (which captured file backs which decision)
- §2 — Colour palette with WCAG contrast ratios
- §6 — Exact component anatomy (borders, shadows, layout patterns)
- §8 — Voice & brand terminology ("Sage Advice" not "Tip"; "Compendium" not "Library")
- §9 — Anti-patterns (full list of forbidden patterns)
