# Here Be Dragons — Design System

A Dungeons & Dragons–flavored design system built for **Here Be Dragons!**, a medieval fantasy
product / brand. The aesthetic is warm, tactile, and ceremonial — iron-gall ink on aged parchment,
candle-lit reading rooms, illuminated chapter headings, and a dragon's hoard of gold accents.

---

## Sources

| Asset | Location |
|---|---|
| Tiamat Condensed SC (all formats) | `uploads/` → `fonts/` |
| Full design brief | Provided in project creation prompt |

No Figma link or external codebase was supplied. The design system was derived directly from the
detailed written brief.

---

## Content Fundamentals

### Voice & Tone
- **Ceremonial and weighty.** Every word should feel like it was chosen by a scribe.  
- **Second person, direct.** "You are the last line of defense." Not "Users can…"  
- **No emoji.** Ever. Use ornamental glyphs (✦ ◆ ❧) or SVG sigils instead.  
- **Sentence case for body; Small-caps for headings and UI labels.** Tiamat is a small-caps face — embrace it.  
- **Oxford comma.** Always.  
- **Short, declarative sentences in UI copy.** Long, atmospheric prose in flavor text.
- **Numbers spell out one through ten** in running prose; numerals for stats and game mechanics.

### Flavor Text Convention
Flavor text is always enclosed in a separate typographic voice (IM Fell italic). It narrates;
it does not instruct. Examples:
> *"The ancient wyrm stirred beneath the mountain, scales aglow with a millennium of rage."*
> *"No adventurer has returned from the Tomb of Eternity and kept their sanity intact."*

### Heading Casing
- H1–H3: Title Case, set in Tiamat Condensed SC (rendered as small-caps by the typeface).
- Eyebrow labels: ALL CAPS with wide letter-spacing (0.3em).
- Buttons: ALL CAPS with 0.2em tracking.
- Body text: Standard sentence case.

---

## Visual Foundations

### Colors
Two primary palettes: **Parchment** (warm neutral surfaces) and **Inks** (brown-black text).
Accents — Blood, Gold, Emerald, Sapphire — are used sparingly and never more than one chromatic
accent per component.

- **Parchment 100** `#f5ecd7` — ≥80% of all surface area. Page background.
- **Parchment 200** `#ead9b3` — Card backgrounds, inset panels.
- **Parchment 300** `#d4bc88` — Table row stripes, shadow color.
- **Parchment 400** `#a88d5a` — Deep stain; box-shadow color.
- **Ink Black** `#1a1410` — Primary text, borders.
- **Ink Brown** `#3d2817` — Body text, secondary borders.
- **Ink Faded** `#6b4f35` — Meta text, labels, de-emphasized UI.
- **Gold** `#b8893b` — Borders, icons, reward state.
- **Gold Bright** `#d4a548` — Highlight, selected state.
- **Gold Deep** `#7a5a22` — Shadow, hover state for gold elements.
- **Blood** `#7a1212` — Primary actions, danger, dragon motifs.
- **Blood Deep** `#4a0808` — Hover/press on blood elements.
- **Emerald** `#2d5a3d` — Arcane magic. Never with Sapphire on same component.
- **Sapphire** `#1e3a5f` — Divine magic. Never with Emerald on same component.
- **Shadow** `#2a1f17` — Code block backgrounds, deep void.

### Typography
Three distinct voices, never mixed within the same element:
1. **Tiamat Condensed SC / Cinzel** — Display. All headings, labels, buttons, eyebrows.
2. **IM Fell English (italic)** — Flavor. Card descriptions, callouts, pull quotes.
3. **Roboto** — Utility. Body paragraphs, table cells, stat block data.
4. **JetBrains Mono** — Technical. Code blocks, token names, hex values.

### Backgrounds
Pure CSS + inline SVG. No raster images.
- Body has two pseudo-elements: stain/vignette (`::before`) and paper-fiber noise (`::after`).
- The noise layer uses `mix-blend-mode: multiply` for non-destructive parchment aging.
- Cards use `linear-gradient(135deg, parchment-100, parchment-200)`.
- Code blocks use flat `--shadow` (`#2a1f17`) background.

### Spacing
4px base grid. Named tokens: `--space-1` (4px) through `--space-24` (96px).
Max content width: 1100px, centered, padding `clamp(16px, 4vw, 48px)`.

### Borders
- **Section dividers:** `2px double var(--gold-deep)` — the signature double-rule.
- **Card borders:** `2px solid var(--ink-brown)`.
- **Callout borders:** `2px dashed var(--gold-deep)`.
- **Internal card rules:** `1px dashed var(--ink-faded)`.
- **Stat block borders:** `6px solid var(--blood)` top and bottom; `1px solid var(--blood)` inner rules.
- **No border-radius greater than 2px** on any interactive element or card.

### Shadows
Hard offset shadows only — **no blur**. Simulates a stamped physical artifact.
- Cards: `4px 4px 0 var(--parchment-400)`
- Buttons: `3px 3px 0 [border-color]`
- Buttons animate to `translate(2px, 2px)` + `1px 1px` shadow on `:active`.

### Corner Radii
Maximum 2px, and usually 0px (sharp corners). This is intentional — parchment does not round.

### Cards
- Background: `linear-gradient(135deg, parchment-100, parchment-200)`
- Border: `2px solid var(--ink-brown)`
- Shadow: `4px 4px 0 var(--parchment-400)` (hard, no blur)
- Optional: ornamental corner spans (`.tl`, `.tr`, `.bl`, `.br`)
- Spell card: 3px gold gradient bar at top.

### Animation & Motion
- Page load: `fadeIn` (opacity 0→1 + translateY 8px→0, 0.9s ease-out), staggered delays.
- Hero icon: `flicker` keyframe (opacity 1→0.85→1, 4s infinite) — candlelight simulation.
- Dice hover: `rotate(20deg) scale(1.05)` with `cubic-bezier(0.4, 1.4, 0.5, 1)` spring.
- Button press: instant hard translate, no transition needed.
- **No blur transitions.** No slide-in from far off-screen. Motion is subtle and purposeful.

### Hover & Press States
- Buttons: background darkens (parchment-300 / blood-deep / gold-bright).
- Buttons press: translate(2px, 2px) + reduced box-shadow. Instant — no transition.
- Dice: rotate + scale spring animation.
- Links: color shifts to `--blood`, underline appears.
- Cards: no hover state (static documents).

### Imagery
All visual effects are pure CSS or inline SVG. No raster images, no external icon libraries.
- Dragon sigils: hand-crafted inline SVG polygons with gradient fills.
- Dice: SVG polygon silhouettes with gradient fills and internal facet lines.
- Dividers: SVG sigils (stars, compasses, waves) flanked by CSS gradient lines.
- No photography. No illustrations beyond pure SVG geometry.

### Iconography
See **ICONOGRAPHY** section below.

---

## ICONOGRAPHY

Here Be Dragons uses **pure inline SVG** for all iconographic needs. No external icon
libraries, no icon fonts, no emoji.

### Sigil System
Decorative SVG sigils appear:
- In the hero section (dragon polygon)
- As section dividers (star, compass, wave, flourish — different per section)
- In callout boxes (star / asterism)
- In the footer

### Dice as Icons
The d4, d6, and d20 are first-class visual icons. Each is a 100×100 SVG with:
- Polygon silhouette + two-stop linear gradient (blood/gold/emerald depending on type)
- Lower-opacity facet polygons for 3D shading
- Center `<text>` face value in Cinzel

### No Substitutions
There is no CDN icon set linked. All icons are hand-crafted SVG defined inline.
If an icon is needed beyond the sigil set, draw a geometric SVG placeholder and note
that a real design asset should replace it.

---

## Visual Foundations — Anti-patterns

- ❌ Do NOT use `Inter`, `Arial`, `system-ui`, or any purple gradients.
- ❌ Do NOT use soft box-shadows (blur > 0) on interactive elements.
- ❌ Do NOT use `border-radius` > 2px on cards or buttons.
- ❌ Do NOT use Emerald + Sapphire together on the same component.
- ❌ Do NOT use Blood or Gold for decorative/non-attention elements.
- ❌ Do NOT load external images or icon libraries.

---

## File Index

```
README.md                     ← This file
SKILL.md                      ← Agent skill descriptor
colors_and_type.css           ← All CSS tokens (colors, type, spacing, borders)

fonts/
  TiamatCondensedSC-Regular.* ← Provided custom display typeface (all formats)

preview/                      ← Design System tab cards (registered as assets)
  colors-parchment.html
  colors-inks.html
  colors-accents.html
  colors-semantic.html
  type-display.html
  type-body.html
  type-scale.html
  spacing-tokens.html
  spacing-borders.html
  components-buttons.html
  components-spellcard.html
  components-statblock.html
  components-callout.html
  components-dice.html
  components-codeblock.html
  components-dividers.html

ui_kits/
  compendium/
    README.md                 ← UI kit overview
    index.html                ← Interactive D&D compendium app prototype
    HeroSection.jsx
    Navigation.jsx
    SpellCard.jsx
    StatBlock.jsx
    SpellGrid.jsx
```

---

*Compiled May 2026. Here Be Dragons! Design System v1.0.*
