# Here Be Dragons — Design System

> A Dungeons & Dragons–styled design system for fantasy-themed and RPG-related web projects.
> Medieval manuscript aesthetic: iron-gall ink on aged parchment, illuminated chapter headings, a dragon's hoard of gold accents.

---

## Product Overview

**Here Be Dragons** is a browser-based D&D companion tool whose primary product is the **Adventurer's Compendium** — a parchment-toned, sidebar-navigated interface for spell libraries, stat blocks, dice rolling, equipment management, and lore pages. The visual language is medieval manuscript: aged parchment surfaces, Tiamat Condensed SC engraved-serif display type, iron-gall ink typography, gold ornamental accents, and blood-red primary actions. Every interaction surface is designed to feel hand-scribed by a monastery scribe circa 1350, while remaining fully WCAG 2.2 AA compliant.

### Primary UI Surfaces

| Surface | Description | Source component |
|---------|-------------|-----------------|
| Sidebar navigation | 220px dark-ink sidebar, gold-highlighted active items, lore footer | `Navigation.jsx` |
| Spell grid | Responsive auto-fill grid of SpellCards, school-colour top bands, filter tabs | `SpellGrid.jsx` + `SpellCard.jsx` |
| Stat block | Full D&D stat block — ability score grid, `<dl>` attributes, Actions / Legendary | `StatBlock.jsx` |
| Hero section | Large display heading, dragon-sigil watermark SVG, section divider | `HeroSection.jsx` |
| Character sheet | Proficiency and condition tracking via checkboxes, indeterminate state | `Checkbox.jsx` |
| Dice roller | d4–d20 pool, individual die values, roll history, animated SVG dice | `DiceRoller.jsx` |
| Equipment viewer | Rarity-badged item cards with attunement indicator and ornamental corners | `EquipmentCard.jsx` |
| Callout / Sage Advice | Tinted parchment panel, gold-dashed border, flavor-italic body | `Callout.jsx` |

### Core Capabilities

- **Spell library** — browsable by school (Evocation, Conjuration, Divination, Abjuration, Necromancy, Transmutation) with live school-filter tabs
- **Monster compendium** — stat blocks with ability scores, challenge rating, action economy, and legendary actions
- **Dice rolling** — pooled d4/d6/d8/d10/d12/d20 selection, individual die tracking, roll history
- **Character management** — checkbox-based proficiency, condition, and spell-component tracking
- **Equipment management** — rarity tiers (Common through Legendary), attunement, property lists
- **Lore annotations** — Sage Advice callouts in three semantic variants (standard, arcane, danger)

**Source repository / folder:** `context/local-code/here-be-dragons-design-system/`

---

## Product Context

The design system was extracted from a working React + Babel Compendium codebase captured under `context/local-code/here-be-dragons-design-system/`. The captured evidence includes the original `colors_and_type.css` token file, five modular JSX components from `project/ui_kits/compendium/`, the Tiamat Condensed SC font in five formats, six dice SVGs, and five visual acceptance screenshots. All token values, component shapes, and layout rules in this package trace directly to that source evidence — nothing was invented without a source reference.

---

## Source / Context References

All token values, component anatomy, and visual rules are backed by the following captured source evidence under `context/`:

| Context path | Contents |
|--------------|----------|
| `context/local-code/.../project/colors_and_type.css` | Original token file — 17 colour tokens, 4 font families, spacing grid, border/shadow tokens |
| `context/local-code/.../project/ui_kits/compendium/SpellCard.jsx` | SpellCard — school colours, dl stats, ornamental corners |
| `context/local-code/.../project/ui_kits/compendium/SpellGrid.jsx` | SpellGrid — auto-fill layout, school filtering |
| `context/local-code/.../project/ui_kits/compendium/StatBlock.jsx` | StatBlock — 6-col ability grid, sections, dl attributes |
| `context/local-code/.../project/ui_kits/compendium/Navigation.jsx` | Navigation — dark sidebar gradient, active states |
| `context/local-code/.../project/ui_kits/compendium/HeroSection.jsx` | HeroSection — display scale, sigil, eyebrow |
| `context/local-code/.../project/assets/dice-d*.svg` | Dice SVGs: d4, d6, d8, d10, d12, d20 |
| `context/local-code/.../project/fonts/TiamatCondensedSC-Regular.*` | Tiamat Condensed SC in woff2, woff, ttf, eot, svg |
| `context/local-code/.../project/preview/*.html` | 15 source preview cards |
| `context/local-code/.../project/screenshots/dice-check*.png` | 5 visual acceptance screenshots |
| `context/source-context.md` | Setup brief and intake manifest |

---

## Package Contents

| Path | Purpose |
|------|---------|
| `DESIGN.md` | Canonical rules: source context (§0), colour + contrast, type, spacing, layout, components, motion, voice, anti-patterns |
| `colors_and_type.css` | All design tokens + `@font-face` + Google Fonts + utility classes — import first in every artifact |
| `README.md` | This file — package guide for reuse |
| `SKILL.md` | Agent-facing Claude Design skill entry with YAML frontmatter |
| `design-system.html` | Live full design-system reference page (all tokens + components, WCAG 2.2 AA verified) |
| `assets_TiamatCondensedSC-Regular.woff2` | Tiamat Condensed SC — primary display font (woff2) |
| `assets_TiamatCondensedSC-Regular.woff` | Tiamat Condensed SC (woff) |
| `assets_TiamatCondensedSC-Regular.ttf` | Tiamat Condensed SC (ttf) |
| `assets_TiamatCondensedSC-Regular.eot` | Tiamat Condensed SC (eot, legacy IE) |
| `assets_TiamatCondensedSC-Regular.svg` | Tiamat Condensed SC (svg) |
| `preview/colors-parchment.html` | Parchment surface palette swatches + WCAG badges |
| `preview/colors-inks.html` | Ink palette contrast ratios on parchment |
| `preview/colors-accents.html` | Gold, blood, emerald, sapphire usage rules |
| `preview/typography-specimens.html` | Type scale hero→micro, drop cap, eyebrow |
| `preview/spacing-tokens.html` | Space scale, border/shadow/radius tokens |
| `preview/components-buttons.html` | All 3 button variants + all interaction states |
| `preview/components-spellcard.html` | 4 school-specific spell cards |
| `preview/components-statblock.html` | Dragon + Goblin stat blocks |
| `preview/components-callout.html` | Callout in standard/arcane/danger variants |
| `preview/components-dice.html` | d4–d20 set, hover animation, a11y contrast |
| `preview/components-dividers.html` | 7 named sigils, double-rule, dashed-rule |
| `preview/components-codeblock.html` | Code block syntax token classes |
| `preview/components-checkbox.html` | Checkbox states, variants, CheckboxGroup |
| `ui_kits/app/index.html` | Runnable React + Babel Compendium entry |
| `ui_kits/app/README.md` | Kit structure, component docs, usage workflow |
| `ui_kits/app/components/App.jsx` | App shell — composes all role components |
| `ui_kits/app/components/Navigation.jsx` | Dark sidebar, gold active states, lore footer |
| `ui_kits/app/components/HeroSection.jsx` | Display heading, dragon watermark, eyebrow |
| `ui_kits/app/components/SpellCard.jsx` | Spell card with school band and dl stat rows |
| `ui_kits/app/components/SpellGrid.jsx` | Responsive spell grid with school filter tabs |
| `ui_kits/app/components/StatBlock.jsx` | D&D stat block — ability grid, actions |
| `ui_kits/app/components/Callout.jsx` | Sage Advice callout — type prop, role semantics |
| `ui_kits/app/components/Checkbox.jsx` | Accessible checkbox + CheckboxGroup |
| `ui_kits/app/components/DiceRoller.jsx` | Full dice roller — pool, history, SVG |
| `ui_kits/app/components/EquipmentCard.jsx` | Equipment card — rarity, attunement, corners |
| `context/` | Captured source snapshots, screenshots, intake evidence |

---

## Preview Manifest

Each card renders live tokens and components against the parchment surface. Open in any browser — no build step required. All cards import `../colors_and_type.css` so they always reflect the current token values.

| Card | Path | What to inspect |
|------|------|-----------------|
| Parchment surface palette | `preview/colors-parchment.html` | `--parchment-100/200/300/400` swatches with WCAG contrast badges; usage rules |
| Ink palette | `preview/colors-inks.html` | `--ink-black/brown/faded` and `--shadow` on parchment; contrast ratios vs parchment-100 |
| Accent palette | `preview/colors-accents.html` | Gold, blood, emerald, sapphire — usage rules, text-safe vs decorative split, contrast badges |
| Typography specimens | `preview/typography-specimens.html` | Hero/H1–H3 display scale, body Roboto, IM Fell italic, JetBrains Mono, drop cap, eyebrow label |
| Spacing tokens | `preview/spacing-tokens.html` | `--space-1` through `--space-24` visual scale; border, shadow, and radius tokens |
| Buttons | `preview/components-buttons.html` | `.btn`, `.btn--primary`, `.btn--gold`; hover, active (translate press), and `:focus-visible` states |
| Spell card | `preview/components-spellcard.html` | 4 spell cards across Evocation, Conjuration, Divination, Abjuration — school bands, ornamental corners, dl stat rows |
| Stat block | `preview/components-statblock.html` | Dragon + Goblin stat blocks; ability score grid, `<dl>` attributes, Actions / Legendary Actions |
| Callout / Sage Advice | `preview/components-callout.html` | Standard (gold), arcane (emerald), and danger (blood) callout variants; ARIA role notes |
| Dice components | `preview/components-dice.html` | Full d4–d20 set; hover animation; dark background variant; decorative vs informative accessibility |
| Sigil dividers | `preview/components-dividers.html` | All 7 named sigils; double-rule and dashed-rule breaks; ornamental corner card |
| Code block | `preview/components-codeblock.html` | CSS, JSON, and inline code examples; 6 syntax token classes; `data-lang` label; contrast verification |
| Checkbox | `preview/components-checkbox.html` | Unchecked, checked, indeterminate states; standard/arcane/danger variants; disabled; CheckboxGroup |

---

## Preserved Assets & Fonts

**Tiamat Condensed SC font** (5 formats) — stored as `assets_TiamatCondensedSC-Regular.*` in the project root. Bound via `@font-face` in `colors_and_type.css` with `local("Tiamat Condensed SC")` first so the system font is preferred when installed. Source: `context/local-code/.../project/fonts/` and `.../project/uploads/`.

**Dice SVG assets** — source dice SVGs (d4–d20) are captured at `context/local-code/.../project/assets/`. They are composed inline in `DiceRoller.jsx` using the parchment + blood + gold token palette.

> No `build/` directory exists in this package — the source evidence captured fonts and component files, not runtime installer or tray-icon assets.

---

## UI Kit: `ui_kits/app/`

A runnable React + Babel Compendium interface. Open `ui_kits/app/index.html` directly in a browser — no build step required.

**Components under `ui_kits/app/components/`:**

| Component file | Role |
|----------------|------|
| `App.jsx` | App shell — composes all role components into one sidebar + main layout |
| `Navigation.jsx` | 220px dark sidebar with gold active highlight, lore footer, and section-based nav |
| `HeroSection.jsx` | Page hero with display heading, dragon watermark, and eyebrow label |
| `SpellCard.jsx` | Single spell card with school band, ornamental corners, and `<dl>` stat rows |
| `SpellGrid.jsx` | Responsive spell grid with school filter tabs |
| `StatBlock.jsx` | D&D stat block with ability score grid and actions |
| `Callout.jsx` | Sage Advice callout — standard / arcane / danger variants |
| `Checkbox.jsx` | Accessible checkbox with indeterminate state and `CheckboxGroup` wrapper |
| `DiceRoller.jsx` | Full interactive dice roller — d4–d20 pool, history, animated SVG dice |
| `EquipmentCard.jsx` | Equipment item card with rarity badge, attunement flag, and ornamental corners |

See `ui_kits/app/README.md` for component usage, props, design notes, and the rendering contract.

---

## Reuse Workflow

1. **Import tokens:** Add `<link rel="stylesheet" href="path/to/colors_and_type.css">` to your HTML `<head>`. This loads Google Fonts (Cinzel, IM Fell English, JetBrains Mono, Roboto) and declares Tiamat Condensed SC from the local font files.
2. **Read `DESIGN.md`** — all colour usage rules (including WCAG contrast ratios), component anatomy, and anti-patterns are codified in section 0 (source evidence) through section 9.
3. **Check preview cards** in `preview/` for live examples of every token and component against the real parchment surface.
4. **Copy a component from `ui_kits/app/components/`** as a starting point for new screens. Each component is a self-contained JSX file with no cross-component imports (all share the `window.*` global pattern).
5. **Never invent tokens** outside `colors_and_type.css`. If a new value is needed, derive it with `color-mix()` from existing tokens or add it to the CSS file with a source-backed rationale.
6. **Run the audit** before publishing: `"$OD_NODE_BIN" "$OD_BIN" tools connectors design-system-package-audit --path . --fail-on-warnings`.

---

## Typography Quick Reference

| Role | Family | Token |
|------|--------|-------|
| Display / hero | Tiamat Condensed SC → Cinzel → serif | `--font-display` |
| Body | Roboto 400 / 1.7lh | `--font-body` |
| Flavor / italic | IM Fell English italic | `--font-flavor` |
| Code / mono | JetBrains Mono | `--font-mono` |

---

## Colour Quick Reference

| Token | Hex | Role |
|-------|-----|------|
| `--parchment-100` | `#f5ecd7` | Primary background (≥80% surface area) |
| `--ink-black` | `#1a1410` | Primary text, borders (~14:1 on parchment-100) |
| `--blood` | `#7a1212` | Primary action, section numerals, drop cap (~9.4:1) |
| `--gold-deep` | `#7a5a22` | Text-safe gold (~5.4:1 on parchment-100) |
| `--gold` | `#b8893b` | Decorative borders, icons, dividers — NOT for text |
| `--shadow` | `#2a1f17` | Code block background, dark panel |
