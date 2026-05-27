---
name: here-be-dragons
description: Here Be Dragons — D&D-styled design system for fantasy/RPG web interfaces. Medieval manuscript aesthetic with parchment surfaces, Tiamat Condensed SC display type, iron-gall ink typography, gold ornamental accents, and blood-red primary actions. Backed by captured source components (SpellCard, StatBlock, Navigation, DiceRoller, Checkbox, Callout, EquipmentCard). WCAG 2.2 AA compliant throughout.
user-invocable: false
---

# Here Be Dragons Design System

A Dungeons & Dragons–styled design system for fantasy-themed and RPG-related web projects. The primary product surface is the **Adventurer's Compendium** — a parchment-toned, sidebar-navigated interface with spell grids, stat blocks, lore callouts, dice rolling, and character tracking. The aesthetic is warm, tactile, and ceremonial: every surface should feel hand-scribed by a monastery scribe circa 1350.

---

## What is inside

This package contains the full Claude Design-style design system for Here Be Dragons, grounded in captured source components, font files, SVG assets, and a live design-system reference page.

| File / path | What it contains |
|-------------|-----------------|
| `DESIGN.md` | Canonical rules document — §0 Product Context with source evidence table, §1 Visual Theme, §2 Colour (17 tokens + WCAG contrast ratios), §3 Typography (4 families), §4 Spacing (4px grid), §5 Layout, §6 Components (buttons, spell card, stat block, callout, code block, sigils, corners, nav, dice), §7 Motion, §8 Voice, §9 Anti-patterns |
| `colors_and_type.css` | All CSS custom properties on `:root` (`--parchment-*`, `--ink-*`, `--gold-*`, `--blood-*`, `--emerald`, `--sapphire`, `--shadow`), semantic aliases, `@font-face` for Tiamat Condensed SC, Google Fonts `@import`, spacing tokens (`--space-1` through `--space-24`), border/shadow/radius tokens, and utility classes (`.btn`, `.btn--primary`, `.btn--gold`, `.eyebrow`, `.dropcap`, `.callout`, `.code-block`, `.cornered`) |
| `design-system.html` | Self-contained live reference page — all tokens and components rendered against parchment, WCAG 2.2 AA verified, no external dependencies except Google Fonts |
| `assets_TiamatCondensedSC-Regular.woff2` | Tiamat Condensed SC display font (woff2 — primary) |
| `assets_TiamatCondensedSC-Regular.woff` | Tiamat Condensed SC (woff) |
| `assets_TiamatCondensedSC-Regular.ttf` | Tiamat Condensed SC (ttf) |
| `assets_TiamatCondensedSC-Regular.eot` | Tiamat Condensed SC (eot, legacy IE) |
| `assets_TiamatCondensedSC-Regular.svg` | Tiamat Condensed SC (svg) |
| `preview/colors-parchment.html` | `--parchment-100/200/300/400` swatches with WCAG contrast badges and usage rules |
| `preview/colors-inks.html` | `--ink-black/brown/faded` + `--shadow` contrast ratios on parchment |
| `preview/colors-accents.html` | Gold / blood / emerald / sapphire — usage rules, text-safe vs decorative split, contrast badges |
| `preview/typography-specimens.html` | Full type scale (hero → micro), drop cap `.dropcap`, eyebrow label `.eyebrow` |
| `preview/spacing-tokens.html` | Visual space scale, border/shadow/radius token reference |
| `preview/components-buttons.html` | `.btn`, `.btn--primary`, `.btn--gold` — hover, `:active` translate-press, `:focus-visible` |
| `preview/components-spellcard.html` | 4 school-specific spell cards (Evocation, Conjuration, Divination, Abjuration) |
| `preview/components-statblock.html` | Adult Red Dragon + Goblin stat blocks; ability grid; Actions / Legendary Actions |
| `preview/components-callout.html` | Sage Advice callout in standard (gold), arcane (emerald), danger (blood) |
| `preview/components-dice.html` | d4–d20 dice, hover animation, decorative vs informative accessibility |
| `preview/components-dividers.html` | 7 named SVG sigils, double-rule, dashed-rule, ornamental corner card |
| `preview/components-codeblock.html` | CSS/JSON/inline code blocks with 6 syntax token classes |
| `preview/components-checkbox.html` | Unchecked/checked/indeterminate, 3 variants, disabled, CheckboxGroup fieldset |
| `ui_kits/app/index.html` | Runnable React + Babel Compendium interface — open directly in browser |
| `ui_kits/app/README.md` | Component docs, props, design notes, rendering contract |
| `ui_kits/app/components/App.jsx` | Shell composing all role components into sidebar + main layout |
| `ui_kits/app/components/Navigation.jsx` | Dark sidebar, gold active states, lore footer |
| `ui_kits/app/components/HeroSection.jsx` | Display heading, dragon-sigil watermark, eyebrow label |
| `ui_kits/app/components/SpellCard.jsx` | School band, ornamental corners, dl stat rows |
| `ui_kits/app/components/SpellGrid.jsx` | Auto-fill grid, school filter tabs |
| `ui_kits/app/components/StatBlock.jsx` | Ability score grid, sections, dl attributes, responsive reflow |
| `ui_kits/app/components/Callout.jsx` | Sage Advice — type prop, SVG icon, role="note"/role="alert" |
| `ui_kits/app/components/Checkbox.jsx` | Accessible checkbox + CheckboxGroup with indeterminate support |
| `ui_kits/app/components/DiceRoller.jsx` | d4–d20 pool, individual die values, roll history, animated SVG dice |
| `ui_kits/app/components/EquipmentCard.jsx` | Rarity badge, attunement indicator, property list, ornamental corners |
| `context/` | Captured source snapshots: JSX components, CSS, SVG assets, screenshots, intake manifest |

---

## Source context

This design system is grounded in captured source evidence from a working React + Babel Compendium codebase, stored under `context/local-code/here-be-dragons-design-system/`. Before generating artifacts, read `DESIGN.md` §0 (Product Context & Source Evidence) for the full evidence inventory. Key source files and what they establish:

**Token source** — `context/.../project/colors_and_type.css` establishes all 17 colour custom properties, four typeface declarations, 4px spacing grid (rem values), and border/shadow/radius tokens. Every value in the package `colors_and_type.css` traces directly to this file.

**Component anatomy** (from `context/.../project/ui_kits/compendium/`):
- `SpellCard.jsx` — `linear-gradient(135deg, parchment-100, parchment-200)` card background; `2px solid --ink-brown` border; `4px 4px 0 --parchment-400` hard shadow; 28×28px gold L-bracket corners; `<dl>/<dt>/<dd>` stat rows; school colour top band.
- `SpellGrid.jsx` — `repeat(auto-fill, minmax(220px, 1fr))` responsive grid; school filter tabs with live toggle.
- `StatBlock.jsx` — blood-red 6px top/bottom border + inner 1px rule; `repeat(6, 1fr)` ability score grid; `<dl>` attribute list; `<section>` for Actions / Legendary Actions.
- `Navigation.jsx` — `linear-gradient(180deg, --ink-black, --shadow)` sidebar background; `border-right: 1px solid --gold-deep`; active items: `--gold-bright` text + `rgba(184,137,59,0.12)` fill + `2px solid --gold` left border.
- `HeroSection.jsx` — display-scale heading with candlelight flicker animation; dragon-sigil SVG watermark at 18% opacity; eyebrow label pattern.

**Font source** — `context/.../project/fonts/TiamatCondensedSC-Regular.{woff2,woff,ttf,eot,svg}` captured and preserved as `assets_TiamatCondensedSC-Regular.*` in the project root. Bound via `@font-face` with `local("Tiamat Condensed SC")` first in `colors_and_type.css`.

**SVG assets** — `context/.../project/assets/dice-d{4,6,8,10,12,20}.svg` used as the basis for inline SVG die shapes in `DiceRoller.jsx`.

**Visual acceptance** — `context/.../project/screenshots/dice-check{1–5}.png` are reference screenshots for component rendering fidelity.

---

## When to use this skill

Use Here Be Dragons when generating artifacts for:

- D&D / fantasy / RPG product interfaces
- Spell libraries, monster compendiums, campaign management tools
- Character sheet and dice-rolling interfaces
- Lore pages, quest boards, and tabletop-companion applications
- Any product that should evoke a hand-scribed medieval manuscript

**Do not use** for modern SaaS, clean tech, editorial, or consumer app products — the parchment + ink palette and Tiamat display face are strongly domain-specific and will look anachronistic outside a fantasy context.

---

## How to use

1. **Read `DESIGN.md` first** — especially §0 (product context and source evidence), §2 (colour with contrast ratios), and §9 (anti-patterns). All token and layout decisions are grounded in captured source files.
2. **Import `colors_and_type.css`** into every artifact as the first stylesheet:
   ```html
   <link rel="stylesheet" href="../../colors_and_type.css">
   ```
   Adjust path depth as needed. This pulls in all tokens, Google Fonts (Cinzel, IM Fell English, JetBrains Mono, Roboto), the `@font-face` for Tiamat Condensed SC, and utility classes.
3. **Check `preview/`** for live examples of every token and component rendered against the real parchment surface. Preview cards are authoritative for component shapes, spacing, and interaction states.
4. **Copy from `ui_kits/app/components/`** for React implementations. Each `.jsx` file is self-contained and exposes its component on `window.ComponentName` for Babel standalone use.
5. **Do not invent tokens** outside `colors_and_type.css`. Derive new values with `color-mix()` from existing tokens, or extend the token file with a source-backed rationale.
6. **Verify contrast** before shipping any new colour combination. `--gold` (`#b8893b`) fails WCAG AA on parchment (~2.9:1) — use `--gold-deep` (`#7a5a22`, ~5.4:1) for any text on parchment surfaces.
7. **Respect anti-patterns** in DESIGN.md §9: no `border-radius > 2px`, no purple gradients, no blurred shadows, no Inter/Arial/system-ui as typefaces.

---

## Design system highlights

### Palette — sourced from `context/.../project/colors_and_type.css`

| Role | Token | Hex | WCAG on parchment-100 |
|------|-------|-----|----------------------|
| Primary background | `--parchment-100` | `#f5ecd7` | — (surface) |
| Card background | `--parchment-200` | `#ead9b3` | — (surface) |
| Primary text | `--ink-black` | `#1a1410` | ~14:1 AA ✓ |
| Body text | `--ink-brown` | `#3d2817` | ~10:1 AA ✓ |
| Primary action | `--blood` | `#7a1212` | ~9.4:1 AA ✓ |
| Text-safe gold | `--gold-deep` | `#7a5a22` | ~5.4:1 AA ✓ |
| Decorative gold | `--gold` | `#b8893b` | ~2.9:1 — NOT for text |
| Dark panel | `--shadow` | `#2a1f17` | — (background) |
| Arcane accent | `--emerald` | `#2d5a3d` | ~7:1 AA ✓ |
| Divine accent | `--sapphire` | `#1e3a5f` | ~9:1 AA ✓ |

**Rule:** Never use `--emerald` and `--sapphire` together on the same component. `--parchment-100` covers ≥80% of all surface area.

### Typography — sourced from captured font files + Google Fonts declarations

| Role | Family | Token | Settings |
|------|--------|-------|---------|
| Display / headings | Tiamat Condensed SC → Cinzel → IM Fell English SC → serif | `--font-display` | 700, ls 0.02em, lh 1.1 |
| Body | Roboto 400 | `--font-body` | 17px / 1.7 |
| Flavor / italic | IM Fell English (always italic) | `--font-flavor` | 15px / 1.6 |
| Mono / code | JetBrains Mono | `--font-mono` | 400/500 |

**Never use** Inter, Arial, or system-ui — absent from all captured source files.

### Component shapes — sourced from captured JSX files

- **Spell card** (`SpellCard.jsx`): gradient card, 2px ink-brown border, 4px hard shadow, 28px gold L-bracket corners, `<dl>` stat rows
- **Stat block** (`StatBlock.jsx`): 6px blood border, 6-col ability grid, `<dl>` attributes, `<section>` actions
- **Buttons**: 2.75rem min-height, `3px 3px 0` hard shadow, `:active` translate-press, `:focus-visible` 2px outline
- **Sidebar** (`Navigation.jsx`): dark gradient, gold-deep right border, gold-bright active text + tinted fill

### Spacing

4px base grid. `--space-1` (0.25rem / 4px) through `--space-24` (6rem / 96px), all in rem for zoom compliance.
`--radius: 1px` · `--radius-lg: 2px` — **never exceed 2px**.

### Motion

- Page load: opacity + translateY(16px), staggered delays
- Hero: candlelight flicker (opacity 0.90–1.0, 7s loop, sourced from `HeroSection.jsx`)
- Dice hover: `rotate(20deg) scale(1.05)` (sourced from dice SVG assets)
- Button active: translate-press + shadow collapse
- All animation off under `@media (prefers-reduced-motion: reduce)`
