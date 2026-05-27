# Here Be Dragons — Design System

> Category: Custom
> Surface: web
> Aesthetic: Medieval fantasy manuscript

Here Be Dragons is a D&D-styled design system for fantasy-themed and RPG-related web projects. The primary product is the **Adventurer's Compendium** — a parchment-toned, sidebar-navigated interface with spell grids, stat blocks, and lore pages.

---

## 0. Product Context & Source Evidence

### What this product is

The **Adventurer's Compendium** is a browser-based D&D companion tool. Its primary surfaces are:

1. **Sidebar navigation** — 220px dark-ink panel with gold-highlighted active items and a lore footer. Driven by `Navigation.jsx` (captured in `context/local-code/`).
2. **Spell grid** — responsive auto-fill grid of `SpellCard` components with school-colour top bands, ornamental corners, and a `<dl>`-based stat row. Source: `SpellGrid.jsx` + `SpellCard.jsx`.
3. **Stat block** — full D&D stat block with `repeat(6, 1fr)` ability score grid, `<dl>` attributes, and Actions / Legendary Actions sections. Source: `StatBlock.jsx`.
4. **Hero section** — large display heading, dragon-sigil watermark SVG, and a section divider. Source: `HeroSection.jsx`.
5. **Character sheet** — live checkbox-based proficiency and condition tracking. Source: `Checkbox.jsx` (composed into app shell via `App.jsx`).
6. **Dice roller** — interactive pool with d4–d20 selection, individual die values, roll history, and animated SVG dice. Source: `DiceRoller.jsx`.
7. **Equipment viewer** — rarity-badged item cards with attunement indicator, property list, and ornamental corners. Source: `EquipmentCard.jsx`.
8. **Callout / Sage Advice** — tinted parchment panel with gold-dashed border and flavor-italic body. Source: `Callout.jsx`.

### Source evidence captured

All design decisions are grounded in the following captured source files (stored under `context/local-code/here-be-dragons-design-system/`):

| Evidence file | What it backs |
|---------------|--------------|
| `project/colors_and_type.css` | All 17 color tokens, 4 font families, type scale, spacing grid, border/shadow/radius tokens |
| `project/ui_kits/compendium/SpellCard.jsx` | Spell card anatomy, school colour bands, ornamental corner pattern |
| `project/ui_kits/compendium/SpellGrid.jsx` | Responsive grid layout, school filter tabs |
| `project/ui_kits/compendium/StatBlock.jsx` | Ability score grid, `<dl>` attribute structure, blood-red borders |
| `project/ui_kits/compendium/Navigation.jsx` | Sidebar gradient, active-state gold highlight, lore footer |
| `project/ui_kits/compendium/HeroSection.jsx` | Hero display scale, sigil watermark, eyebrow label pattern |
| `project/assets/dice-d*.svg` | d4, d6, d8, d10, d12, d20 SVG shapes used in `DiceRoller.jsx` |
| `project/fonts/TiamatCondensedSC-Regular.*` | Display typeface in woff2/woff/ttf/eot/svg |
| `project/screenshots/dice-check*.png` | Visual acceptance screenshots used to verify component rendering |
| `project/preview/*.html` | Source preview cards (15 cards, expanded to 13 focused Claude Design cards in this package) |

### Design decisions grounded in source

- **Parchment-100 as the dominant background** — confirmed across all captured preview cards; no surface uses a white or dark base by default.
- **Gold-deep (#7a5a22) for text, gold (#b8893b) for decoration** — this split is present in the original `colors_and_type.css` and all component files; using `--gold` as text fails WCAG AA (~2.9:1 on parchment-100).
- **Tiamat Condensed SC as the only display face** — the five captured font formats plus local fallback chain are directly bound in `colors_and_type.css` via `@font-face`.
- **Border-radius ≤ 2px** — all captured component files use 1–2px radii; higher values break the hand-scribed feel established in the original design brief.
- **Hard 3px offset shadows** — box-shadow values extracted directly from the captured source CSS; no blurred shadows appear anywhere in the source.

---

## 1. Visual Theme & Atmosphere

**Mood:** Medieval fantasy manuscript. Iron-gall ink on aged parchment, candle-lit reading rooms, illuminated chapter headings, a dragon's hoard of gold accents. Warm, tactile, and ceremonial — not dark-mode fantasy, not neon, not minimalist. Every surface should feel hand-scribed by a monastery scribe circa 1350.

**Primary surfaces:**
- Compendium sidebar — dark ink background (`--ink-black`/`--shadow`) with gold-accent navigation
- Main content area — parchment-100 background with stain/vignette atmospheric overlays
- Spell cards, stat blocks — parchment gradient cards with ornamental corners
- Code blocks — shadow-dark panel with left gold border

**Atmosphere technique:** `body::before` carries the stain/vignette radial gradients; `body::after` applies SVG feTurbulence paper-fiber noise at 28% opacity with `mix-blend-mode: multiply`. Both use `pointer-events: none` and `z-index: 0/1`; content sits at `z-index: 2`.

---

## 2. Color

All tokens are CSS custom properties on `:root` in `colors_and_type.css`.

### Surface palette

| Token | Hex | Use |
|-------|-----|-----|
| `--parchment-100` | `#f5ecd7` | Primary page background — covers ≥80% of surface area |
| `--parchment-200` | `#ead9b3` | Card backgrounds, spell cards, stat blocks |
| `--parchment-300` | `#d4bc88` | Hover states, table row stripes, inset panels |
| `--parchment-400` | `#a88d5a` | Box-shadow colour, deep stain accents |

### Ink palette

| Token | Hex | Use |
|-------|-----|-----|
| `--ink-black` | `#1a1410` | Primary text (≈14:1 on parchment-100), hard borders |
| `--ink-brown` | `#3d2817` | Body text, secondary text, card borders |
| `--ink-faded` | `#6b4f35` | Meta text, labels, faint dividers |
| `--shadow` | `#2a1f17` | Code block background, dark panel |

### Accent palette

| Token | Hex | Use |
|-------|-----|-----|
| `--gold` | `#b8893b` | Decorative borders, icons, dividers — NOT for text |
| `--gold-bright` | `#d4a548` | Active sidebar item text, highlighted code values |
| `--gold-deep` | `#7a5a22` | Text-safe gold (≈5.4:1 on parchment-100), double-rule breaks |
| `--blood` | `#7a1212` | Primary actions, section numerals, drop caps, active heading colour |
| `--blood-deep` | `#4a0808` | Button shadow, hover state for blood elements |
| `--emerald` | `#2d5a3d` | Conjuration school, arcane magic indicators |
| `--sapphire` | `#1e3a5f` | Divination school, divine magic indicators |

### Usage rules
- `--parchment-100` covers ≥80% of all surface area
- `--blood` and `--gold` are reserved for elements that demand attention
- **Never use `--emerald` and `--sapphire` together on the same component**
- **Never use `--gold` or `--gold-bright` as text on parchment surfaces** — use `--gold-deep` instead (contrast ratio ~5.4:1)
- Decorative-only text MAY use lower contrast if `aria-hidden="true"`

### Semantic aliases (from `colors_and_type.css`)
```css
--color-bg:           var(--parchment-100)
--color-bg-card:      var(--parchment-200)
--color-bg-code:      var(--shadow)
--color-text:         var(--ink-brown)
--color-text-strong:  var(--ink-black)
--color-text-meta:    var(--ink-faded)
--color-text-accent:  var(--blood)
--color-text-gold:    var(--gold-deep)
--color-action:       var(--blood)
--color-action-hover: var(--blood-deep)
```

---

## 3. Typography

### Font families

| Role | Family | Token |
|------|--------|-------|
| Display / headings | Tiamat Condensed SC → Cinzel → IM Fell English SC → serif | `--font-display` |
| Body | Roboto 400/500/700 | `--font-body` |
| Flavor / italic | IM Fell English (always italic) | `--font-flavor` |
| Mono / code | JetBrains Mono 400/500 | `--font-mono` |

**Tiamat Condensed SC** is declared via `@font-face` in `colors_and_type.css` referencing the local font files (`assets_TiamatCondensedSC-Regular.woff2/.woff/.ttf/.eot/.svg`). Fallback: Cinzel from Google Fonts.

Roboto, IM Fell English, and JetBrains Mono load via Google Fonts `@import` at the top of `colors_and_type.css`.

### Type scale

| Role | Token | Size | Settings |
|------|-------|------|----------|
| Hero | `--text-hero` | `clamp(3rem, 7vw, 6rem)` | display face, weight 700, ls 0.02em, lh 1.1 |
| H1 | `--text-h1` | `clamp(2rem, 4.5vw, 2.5rem)` | display face |
| H2 | `--text-h2` | `clamp(1.375rem, 3vw, 1.75rem)` | display face |
| H3 | `--text-h3` | `clamp(1.0625rem, 2.2vw, 1.25rem)` | display face |
| Body | `--text-body` | `1.0625rem` | Roboto 400, lh 1.7 |
| Flavor | `--text-flavor` | `0.9375rem` | IM Fell English italic, lh 1.6 |
| Label / eyebrow | `--text-label` | `0.8125rem` | display face, ls 0.3em, uppercase |
| Micro | `--text-micro` | `0.6875rem` | display face, code labels |

### Drop cap
`.dropcap::first-letter` — display face, 5.5em, float left, `--blood` colour, lh 0.85. Used for introductory body paragraphs and lore sections.

### Eyebrow label
`.eyebrow` — display face, 13px, ls 0.3em, uppercase, `--gold-deep` colour. Used above section titles and card headings.

---

## 4. Spacing

4px base grid. All tokens in rem for zoom compliance.

| Token | rem | px |
|-------|-----|----|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-24` | 6rem | 96px |

**Page padding:** `clamp(1rem, 4vw, 3rem)` — token `--page-padding`
**Max content width:** `68.75rem` (1100px) — token `--max-width`

### Border tokens
```css
--border-card:       2px solid var(--ink-brown)
--border-double:     2px double var(--gold-deep)   /* section breaks */
--border-faint:      1px dashed var(--ink-faded)   /* separators */
--border-gold-dashed:2px dashed var(--gold-deep)   /* callouts */
```

### Shadow tokens
```css
--shadow-card:        4px 4px 0 var(--parchment-400)
--shadow-btn:         3px 3px 0 var(--ink-black)
--shadow-btn-primary: 3px 3px 0 var(--blood-deep)
--shadow-btn-gold:    3px 3px 0 var(--gold-deep)
```

### Radius
`--radius: 1px` · `--radius-lg: 2px` · **Never exceed 2px** — keeps the hand-crafted manuscript feel.

---

## 5. Layout & Composition

- **Max width:** 1100px, centered, `clamp` page padding
- **Sidebar layout (Compendium):** 220px dark sidebar (`--ink-black`/`--shadow`) + fluid main column; sticky sidebar at `height: 100vh`
- **Spell grid:** `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` — responsive without breakpoints
- **Stat block ability grid:** `repeat(6, 1fr)` — collapses at 320px via wrapping
- **Section structure:** `<header>` / `<main>` / `<section>` / `<article>` / `<footer>`; heading hierarchy H1 → H5 maintained
- **Responsive:** No horizontal scroll at 320px. All components stack gracefully. Decorative elements may simplify at narrow widths.
- **Text length:** 52–65ch for body paragraphs; `max-width` on flavor text blocks

---

## 6. Components

### Buttons (`.btn`, `.btn--primary`, `.btn--gold`)
- Semantic `<button>` element, `min-height: 2.75rem`
- Display face, uppercase, `letter-spacing: 0.2em`
- Hard box-shadow offset: `3px 3px 0 <ink-color>` — collapses to `1px 1px` on `:active` with `translate(2px, 2px)`
- `:focus-visible` ring: `2px solid --gold-deep` with `outline-offset: 2px`
- `.btn--primary`: blood background + parchment text + parchment focus ring
- `.btn--gold`: gold background + ink-black text

### Spell card
- `linear-gradient(135deg, --parchment-100, --parchment-200)` background
- `2px solid --ink-brown` border, `4px 4px 0 --parchment-400` shadow
- Ornamental corners (`.tl/.tr/.bl/.br`) — gold L-brackets, `aria-hidden`
- School colour bar (3px top band) — school-specific gradient
- `<dl>/<dt>/<dd>` for stat rows (Casting Time, Range, Components, Duration)
- School badge with accessible colour contrast

### Stat block
- Blood-red `6px` top/bottom border, inner `1px` blood rule
- Ability score grid: `repeat(6, 1fr)`, score + modifier display
- `<dl>` for attributes, `<section>` for Actions / Legendary Actions
- Responsive reflow at 320px — grid stays readable

### Callout / Sage Advice
- `2px dashed --gold-deep` border
- `rgba(184,137,59,0.08)` tinted background
- Display-face eyebrow label in `--gold-deep`
- Flavor-italic body text
- Decorative SVGs: `aria-hidden="true" focusable="false"`

### Code block
- `background: --shadow`, `border-left: 4px solid --gold`
- JetBrains Mono, `color: #c4b89a` (base text on `--shadow` background: ≥5:1)
- `data-lang` attribute drives the language label via CSS `::after`
- Syntax classes: `.tok-selector` / `.tok-property` / `.tok-value` / `.tok-comment`

### Sigil dividers
Centered flex row with gradient lines and inline SVG sigil. Sigil uses `aria-hidden="true" focusable="false"`. Seven unique sigil designs in `design-system.html`: Dragon Eye, Star, Rune Circle, Crossed Quills, Shield, Ouroboros, Compass Rose.

### Ornamental corners (`.cornered`)
Four `<span>` children `.tl/.tr/.bl/.br`, L-shaped gold borders, `28×28px`, `aria-hidden`. Must not overlap content at 400% zoom.

### Navigation sidebar
Dark background (`linear-gradient(180deg, --ink-black, --shadow)`), gold-deep right border. Active items: `--gold-bright` text + `rgba(184,137,59,0.12)` background + `2px solid --gold` left border. Labels in display face, 9–13px uppercase. See `ui_kits/app/components/Navigation.jsx`.

### Dice (SVG)
- `d20`, `d6`, `d4` inline SVG
- Decorative: `aria-hidden="true"`
- Informative: include `<title>` element
- Hover: `transform: rotate(20deg) scale(1.05)`
- Disabled under `prefers-reduced-motion`

---

## 7. Motion & Interaction

### Page load
- `opacity: 0 → 1` fade + `translateY(16px → 0)` for section elements
- Staggered entry delays (0ms, 150ms, 300ms…)

### Hero title
Subtle candlelight flicker: opacity oscillates between 0.90–1.0 on a 7s loop with natural timing.

### Dice hover
`transform: rotate(20deg) scale(1.05)` on `:hover`/`:focus-visible`.

### Button active
Hard translate press: `transform: translate(2px, 2px)` + shadow collapse.

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable: flicker, staggered entrance, dice transforms, all non-essential motion */
}
```
All interactive functions remain available without animation.

### Focus
`:focus-visible` outlines only. Never `outline: none` without accessible replacement.
- Default: `2px solid --gold-deep`, `outline-offset: 2px`
- On blood/dark backgrounds: `2px solid --parchment-100`

---

## 8. Voice & Brand

- **Tone:** Ceremonial, arcane, slightly archaic. "Sage Advice" not "Tip". "Compendium" not "Library". "Adventurer" not "User".
- **Capitalization:** Spell names, creature names, and school names are always Title Case.
- **Flavor text:** Always in IM Fell English italic. Present tense, evocative. Max 2–3 sentences.
- **Eyebrow labels:** ALL CAPS, display face. Examples: "Arcane Focus", "Legendary Action", "School of Evocation".
- **Numbers in stat blocks:** Plain Arabic numerals for scores; modifiers formatted as `+N` or `−N`.
- **Error / empty states:** Use flavor text format. Example: *"No such enchantment exists in the known tomes."*

---

## 9. Anti-patterns

The following are forbidden by design specification:

- `border-radius > 2px` — breaks manuscript feel
- Purple or violet gradients
- Blurred (`blur()`) shadows on interactive elements — use hard offset shadows only
- `Inter`, `Arial`, or `system-ui` as any typeface
- External image or icon library loading
- Emoji as icons (✨ 🚀 🎯) — use SVG glyphs or typographic ornaments
- `--gold` or `--gold-bright` as essential text on parchment surfaces (fails WCAG AA)
- `--emerald` and `--sapphire` on the same component
- `scrollIntoView()` — breaks embedded previews
- Justified (`text-align: justify`) body text
- Absolute positioning for meaningful (non-decorative) content
- Three or more competing flourishes on a single surface
- Warm beige/peach/pink gradients not grounded in the parchment palette
- Generic stat-slop ("10× faster", "99.9% uptime") without source backing
- Filler copy ("Feature One", lorem ipsum)
- Designer/demo controls (platform selectors, theme knobs, viewport toggles) rendered as product UI
