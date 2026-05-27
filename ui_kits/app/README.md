# Here Be Dragons — Applied UI Kit

An applied interface kit for the Adventurer's Compendium — a fantasy-themed, sidebar-navigated product surface with spell grids, stat blocks, and lore content.

## Structure

```
ui_kits/app/
├── index.html              ← Runnable browser entry (React + Babel)
├── README.md               ← This file
└── components/
    ├── Navigation.jsx      ← Dark sidebar with section nav and tools
    ├── HeroSection.jsx     ← Compendium hero with dragon-sigil watermark
    ├── SpellCard.jsx       ← Individual spell card with school colour band
    ├── SpellGrid.jsx       ← Filterable spell grid with school tabs + search
    ├── StatBlock.jsx       ← D&D stat block with ability score grid
    └── App.jsx             ← Root composition component
```

## Usage

Open `index.html` directly in a browser. No build step required. The page loads:
1. React 18 + ReactDOM + Babel standalone (from unpkg CDN)
2. `../../colors_and_type.css` for all design tokens and component styles
3. Each `components/*.jsx` file via `<script type="text/babel" src="...">`
4. Renders `<App />` into `#root`

Each component file exposes itself as a browser global (`window.ComponentName`) so the Babel evaluation order doesn't matter.

## Component Reference

### `Navigation.jsx`
Dark sidebar (`--ink-black`/`--shadow` gradient), 220px wide. Props: `activeSection` (string), `onNavigate` (function). Sections: Spells, Monsters, Equipment, Classes. Tools: Dice Roller, Initiative.

### `HeroSection.jsx`
Parchment hero panel with eyebrow label, display title, flavor subtitle, and decorative dragon-sigil SVG watermark. Props: `title`, `subtitle`, `meta` (eyebrow string).

### `SpellCard.jsx`
Spell card with school colour band, ornamental gold corners, stats grid, and flavor text. Props: `spell` (object with name, school, level, castingTime, range, components, duration, flavor), `onClick`, `selected` (bool). School colours from `schoolColors` map.

### `SpellGrid.jsx`
Filterable grid of `SpellCard` components. Built-in school tab filter and name search. Props: `spells` (array), `onSelectSpell`, `selectedSpell`. Renders `<SpellCard>` for each matching spell.

### `StatBlock.jsx`
Full D&D stat block. Props: `creature` (object with name, type, ac, hp, speed, abilities {STR/DEX/CON/INT/WIS/CHA}, savingThrows?, senses?, languages?, challenge?, traits?, actions?, legendary?, legendaryDesc?).

### `App.jsx`
Root component. Composes Navigation + main area. Active section state drives content: Spells section renders HeroSection + SpellGrid + detail pane; Monsters section renders StatBlock examples; other sections show a flavor callout placeholder.

## Design Notes

- All components use inline style objects keyed to the Here Be Dragons token values (`#f5ecd7`, `#7a1212`, `#b8893b`, etc.)
- Token CSS custom properties are declared in `../../colors_and_type.css`
- Font families: Tiamat Condensed SC (local) → Cinzel → serif for display; Roboto for body; IM Fell English italic for flavor
- No `border-radius > 2px`
- Hard offset button shadows: `3px 3px 0 <ink-color>`
- School colours: Evocation = blood/gold, Divination = sapphire, Conjuration = emerald, Abjuration = gold-deep, Necromancy = shadow/gold-bright, Illusion = purple-ish, Transmutation = green, Enchantment = deep rose

## Source Basis

Components are adapted from the source UI kit at `context/local-code/here-be-dragons-design-system/project/ui_kits/compendium/`. The original files are preserved at `context/local-code_here-be-dragons-design-system_project_ui_kits_compendium_*.jsx` in the project root.
