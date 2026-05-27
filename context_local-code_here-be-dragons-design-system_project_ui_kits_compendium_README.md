# Compendium UI Kit

An interactive D&D Compendium prototype demonstrating the Here Be Dragons design system
applied to a real product surface.

## What's Here
- `index.html` — Interactive compendium app (main entry point)
- `Navigation.jsx` — Sidebar navigation with section links and scroll-spy
- `HeroSection.jsx` — Hero panel with dragon SVG sigil, title, and flavor text
- `SpellCard.jsx` — Reusable spell card component (school/level/stats/flavor)
- `StatBlock.jsx` — Canonical D&D stat block component
- `SpellGrid.jsx` — Filterable spell grid with school tabs

## Design Width
1200px desktop. The sidebar is 220px; main content is fluid.

## Usage
Open `index.html` in any browser. No build step required — Babel transpiles JSX inline.

## Fonts Required
The `../fonts/` folder (relative to this kit's location) must contain:
- `TiamatCondensedSC-Regular.woff2`
- `TiamatCondensedSC-Regular.woff`

Google Fonts (Cinzel, IM Fell English, JetBrains Mono, Roboto) are loaded from CDN.
