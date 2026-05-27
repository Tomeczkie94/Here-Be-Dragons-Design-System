# Design System Source Context

This file is generated during setup and should be treated as source evidence for the design-system project. Use it before writing or revising DESIGN.md, previews, tokens, UI kit examples, or assets.

## Company / Product

Canonical design-system title: Here Be Dragons Design Design System

Here Be Dragons Design System for fantasy-themed and RPG-related projects

## GitHub Repositories

- None linked.

Connector status: GitHub connector is not configured; repository intake will use local git credentials or authenticated GitHub CLI when possible.

## Local Code

Linked folders readable by the local agent: none.

Copied browser-selected code snapshot files under `context/local-code/`:
- context_local-code_here-be-dragons-design-system_.DS_Store
- context_local-code_here-be-dragons-design-system_README.md
- context_local-code_here-be-dragons-design-system_project_README.md
- context_local-code_here-be-dragons-design-system_project_SKILL.md
- context_local-code_here-be-dragons-design-system_project_colors_and_type.css
- context_local-code_here-be-dragons-design-system_project_assets_dice-d12.svg
- context_local-code_here-be-dragons-design-system_project_assets_dice-d10.svg
- context_local-code_here-be-dragons-design-system_project_assets_dice-d8.svg
- context_local-code_here-be-dragons-design-system_project_assets_dice-d4.svg
- context_local-code_here-be-dragons-design-system_project_assets_dice-d6.svg
- context_local-code_here-be-dragons-design-system_project_assets_dice-d20.svg
- context_local-code_here-be-dragons-design-system_project_fonts_TiamatCondensedSC-Regular.eot
- context_local-code_here-be-dragons-design-system_project_fonts_TiamatCondensedSC-Regular.ttf
- context_local-code_here-be-dragons-design-system_project_fonts_TiamatCondensedSC-Regular.woff
- context_local-code_here-be-dragons-design-system_project_fonts_TiamatCondensedSC-Regular.woff2
- context_local-code_here-be-dragons-design-system_project_fonts_TiamatCondensedSC-Regular.svg
- context_local-code_here-be-dragons-design-system_project_preview_components-spellcard.html
- context_local-code_here-be-dragons-design-system_project_preview_components-dividers.html
- context_local-code_here-be-dragons-design-system_project_preview_type-scale.html
- context_local-code_here-be-dragons-design-system_project_preview_components-dice.html
- context_local-code_here-be-dragons-design-system_project_preview_components-buttons.html
- context_local-code_here-be-dragons-design-system_project_preview_colors-inks.html
- context_local-code_here-be-dragons-design-system_project_preview_components-callout.html
- context_local-code_here-be-dragons-design-system_project_preview_colors-semantic.html
- context_local-code_here-be-dragons-design-system_project_preview_colors-parchment.html
- context_local-code_here-be-dragons-design-system_project_preview_components-checkbox.html
- context_local-code_here-be-dragons-design-system_project_preview_components-statblock.html
- context_local-code_here-be-dragons-design-system_project_preview_spacing-tokens.html
- context_local-code_here-be-dragons-design-system_project_preview_type-display.html
- context_local-code_here-be-dragons-design-system_project_preview_spacing-borders.html
- context_local-code_here-be-dragons-design-system_project_preview_components-slider.html
- context_local-code_here-be-dragons-design-system_project_preview_type-body.html
- context_local-code_here-be-dragons-design-system_project_preview_components-codeblock.html
- context_local-code_here-be-dragons-design-system_project_preview_colors-accents.html
- context_local-code_here-be-dragons-design-system_project_uploads_TiamatCondensedSC-Regular.eot
- context_local-code_here-be-dragons-design-system_project_uploads_dice-eight-faces-eight.svg
- context_local-code_here-be-dragons-design-system_project_uploads_TiamatCondensedSC-Regular.ttf
- context_local-code_here-be-dragons-design-system_project_uploads_TiamatCondensedSC-Regular.woff
- context_local-code_here-be-dragons-design-system_project_uploads_dice-twenty-faces-twenty.svg
- context_local-code_here-be-dragons-design-system_project_uploads_d12.svg
- ...and 17 more files.

## Design And Brand Resources

Figma files selected: none.

Locally parsed Figma summaries under `context/figma/`: none.
Fonts, logos, and assets selected:
- TiamatCondensedSC-Regular.woff2
- TiamatCondensedSC-Regular.woff
- TiamatCondensedSC-Regular.eot
- TiamatCondensedSC-Regular.svg
- TiamatCondensedSC-Regular.ttf

Uploaded brand asset files under `assets/`:
- assets_TiamatCondensedSC-Regular.woff2
- assets_TiamatCondensedSC-Regular.woff
- assets_TiamatCondensedSC-Regular.eot
- assets_TiamatCondensedSC-Regular.svg
- assets_TiamatCondensedSC-Regular.ttf

## Notes

Create a Dungeons & Dragons–styled design system rendered as a self-contained HTML page.
The page should demonstrate all tokens and components live — the guide IS the design system.
Follow every specification below precisely.

The final output MUST adhere to WCAG 2.2 AA accessibility standards for all applicable criteria.

---

# Aesthetic Direction

Medieval fantasy manuscript. Think iron-gall ink on aged parchment, candle-lit reading rooms, illuminated chapter headings, and a dragon's hoard of gold accents.

The goal is warm, tactile, and ceremonial — not dark-mode fantasy, not neon, not minimalist.

Every surface should feel like it could have been hand-scribed by a monastery scribe circa 1350.

Accessibility compliance is mandatory and takes precedence over decorative fidelity if conflicts arise.

---

# Typography

## Headings — Tiamat Condensed SC

* Primary display face. Condensed, small-caps, engraved-serif character.
* Declare via `@font-face` with `local("Tiamat Condensed SC")`.
* Fallback stack:

  * `"Cinzel"` (load from Google Fonts)
  * `"IM Fell English SC"`
  * `serif`
* Use for:

  * all headings (`h1–h5`)
  * UI labels
  * button text
  * stat block names
  * eyebrow labels
* Settings:

  * `font-weight: 700`
  * `letter-spacing: 0.02em`
  * `line-height: 1.1`

## Body — Roboto

* Load from Google Fonts:

  * 300
  * 400
  * 500
  * 700
* Use for:

  * all body paragraphs
  * table cells
  * meta text
* Settings:

  * `font-size: 17px`
  * `line-height: 1.7`

## Flavor text — IM Fell English (italic)

* Load from Google Fonts.
* Use for:

  * card descriptions
  * callout bodies
  * introductory pull quotes
  * drop-cap paragraphs
* Always italicized.

## Mono — JetBrains Mono

* Load from Google Fonts.
* Use for:

  * code blocks
  * hex values
  * token names

---

# Type Scale

| Role       | Family          | Size          |
| ---------- | --------------- | ------------- |
| Hero title | Tiamat / Cinzel | 56–96px clamp |
| H1         | Tiamat / Cinzel | 40px          |
| H2         | Tiamat / Cinzel | 28px          |
| H3         | Tiamat / Cinzel | 20px          |
| Body       | Roboto 400      | 17px / 1.7    |
| Flavor     | IM Fell italic  | 15px / 1.6    |
| Label      | Tiamat caps     | 11–13px       |

Use `clamp()` for responsive scaling.

---

# Color Tokens

Declare all as CSS custom properties on `:root`.

```css
/* Surfaces */
--parchment-100: #f5ecd7;
--parchment-200: #ead9b3;
--parchment-300: #d4bc88;
--parchment-400: #a88d5a;

/* Inks */
--ink-black:  #1a1410;
--ink-brown:  #3d2817;
--ink-faded:  #6b4f35;

/* Accents */
--gold:        #b8893b;
--gold-bright: #d4a548;
--gold-deep:   #7a5a22;

--blood:       #7a1212;
--blood-deep:  #4a0808;

--emerald:     #2d5a3d;
--sapphire:    #1e3a5f;
--shadow:      #2a1f17;
```

## Usage Rules

* `--parchment-100` covers ≥ 80% of all surface area.
* `--blood` and `--gold` are reserved for elements that demand attention.
* Never use `--emerald` and `--sapphire` together on the same component.

---

# Accessibility — Color & Contrast

All text and UI elements MUST meet WCAG 2.2 AA contrast requirements.

Requirements:

* Normal text: minimum contrast ratio 4.5:1
* Large text: minimum 3:1
* Interactive boundaries and focus indicators: minimum 3:1
* Meaningful SVG/icon graphics: minimum 3:1

If any specified token combination fails accessibility contrast requirements, adjust the implementation while preserving the intended medieval aesthetic.

Never use low-contrast gold text on parchment backgrounds for essential content.

Decorative text MAY use lower contrast only if:

* purely ornamental
* hidden from assistive technologies

---

# Texture & Atmosphere

Apply to `body` using pseudo-elements only.
No image assets. Pure CSS + inline SVG.

## `body::before` — stains + vignette

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 800px 600px at 15% 10%, rgba(168,141,90,0.18), transparent 60%),
    radial-gradient(ellipse 600px 400px at 85% 80%, rgba(122,90,34,0.15), transparent 60%),
    radial-gradient(ellipse at center, transparent 40%, rgba(58,40,23,0.25) 100%);
}
```

## `body::after` — paper-fiber noise

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.4;
  mix-blend-mode: multiply;
}
```

---

# Accessibility — Texture & Atmospheric Effects

Decorative overlays must never reduce readability.

Requirements:

* Text contrast must remain compliant after overlays render
* Focus indicators must remain clearly visible
* Noise layers must not obscure small text
* Decorative overlays must not interfere with text selection
* Overlays must not intercept interaction events

---

# Borders & Dividers

## Double-rule section breaks

```css
border-bottom: 2px double var(--gold-deep);
```

## Dashed separators

```css
border-bottom: 1px dashed var(--ink-faded);
```

## Sigil Divider Component

Use:

* gradient lines
* inline SVG sigil
* pseudo-elements

Decorative sigils must use:

```html
aria-hidden="true"
focusable="false"
```

---

# Components

## Ornamental Corners

Four absolutely positioned spans:

* `.tl`
* `.tr`
* `.bl`
* `.br`

Size:

* `28×28px`

Use visible borders to create L-shaped corner marks.

Corners must remain decorative only and must not overlap readable text at zoom levels up to 400%.

---

# Drop Cap

```css
.dropcap::first-letter {
  font-family: var(--font-display);
  font-size: 5.5em;
  line-height: 0.85;
  float: left;
  color: var(--blood);
  font-weight: 900;
  padding: 6px 12px 0 0;
}
```

Ensure the drop cap does not interfere with:

* screen magnification
* text reflow
* custom spacing overrides

---

# Eyebrow Label

* all caps
* `font-size: 13px`
* `letter-spacing: 0.3em`
* `text-transform: uppercase`

Maintain WCAG AA contrast ratios.

---

# Buttons

Three variants:

* `.btn`
* `.btn--primary`
* `.btn--gold`

All buttons must:

* use semantic `<button>` elements
* support keyboard interaction
* provide visible focus states
* maintain minimum 24×24 CSS pixel target size

## Base styling

```css
.btn {
  box-shadow: 3px 3px 0 var(--ink-black);
}
.btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--ink-black);
}
```

## Focus states

Use `:focus-visible`.

Requirements:

* minimum 2px visible outline
* minimum 3:1 contrast
* visible above textured backgrounds

Never remove outlines without accessible replacements.

---

# Spell Card

Use:

* semantic headings
* definition lists (`dl`, `dt`, `dd`)
* accessible reading order

Background:

```css
linear-gradient(135deg, var(--parchment-100), var(--parchment-200))
```

Border:

```css
2px solid var(--ink-brown)
```

Shadow:

```css
4px 4px 0 var(--parchment-400)
```

---

# Stat Block

Use semantic HTML structure.

Requirements:

* logical heading hierarchy
* readable table/grid structure
* no reliance on color alone
* responsive reflow at narrow widths

The stat grid must remain readable at:

* 320px viewport width
* 400% browser zoom

---

# Callout / Sage Advice

Requirements:

* dashed gold border
* tinted parchment background
* accessible contrast
* decorative SVGs hidden from assistive technologies

---

# Code Block

Dark background:

```css
background: var(--shadow);
border-left: 4px solid var(--gold);
```

Use:

* JetBrains Mono
* accessible syntax contrast
* semantic `<pre><code>`

Language labels driven by `data-lang`.

---

# Dice (SVG)

Create inline SVG d20, d6, and d4.

Requirements:

* decorative dice use `aria-hidden="true"`
* informative dice include `<title>`
* hover transforms disabled under reduced motion preferences

Hover animation:

```css
transform: rotate(20deg) scale(1.05);
```

---

# Layout & Spacing

Use a 4px base grid.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

Max content width:

```css
1100px
```

Page padding:

```css
48px 32px
```

---

# Accessibility — Responsive Reflow

The layout must remain usable at:

* 320px viewport width
* 400% zoom
* increased browser text spacing

Requirements:

* no horizontal scrolling for standard content
* components stack gracefully
* decorative elements may simplify responsively
* no clipped text
* no overlapping text

---

# Accessibility — Text Spacing

The interface must remain functional when users apply:

* line height: 1.5×
* paragraph spacing: 2× font size
* letter spacing: 0.12× font size
* word spacing: 0.16× font size

No text may clip or overlap.

---

# Accessibility — Reading & Focus Order

Requirements:

* DOM order must match visual reading order
* keyboard navigation order must remain logical
* decorative elements must not interrupt reading flow
* multi-column layouts must collapse predictably

---

# Animation

## Page load

Use:

* opacity fade
* translateY
* staggered delays

## Hero icon

Subtle candlelight flicker.

## Dice hover

```css
rotate(20deg) scale(1.05)
```

## Button active

Hard translate press.

---

# Accessibility — Motion Reduction

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

* disable flicker
* disable staggered entrances
* disable dice transforms
* disable non-essential motion

The interface must remain fully functional without animation.

---

# Accessibility — Semantic Structure

Use semantic HTML throughout.

Requirements:

* `header`
* `main`
* `section`
* `article`
* `footer`
* `nav`

Maintain logical heading hierarchy.

Use:

* tables for tabular data
* lists for list structures
* proper `dl/dt/dd` semantics

The document must remain understandable without CSS.

---

# Accessibility — General Requirements

Additional constraints:

* Use `rem` units where possible
* Preserve browser zoom
* Do not disable text selection
* Avoid justified body text
* Do not rely on color alone
* Avoid absolute positioning for meaningful content
* Maintain readable line lengths
* Interactive controls must remain accessible by keyboard only

---

# What to Include in the Output

The HTML file must contain, in order:

1. Hero
2. Color Palette
3. Typography
4. Texture
5. Borders & Dividers
6. Components
7. Stat Block
8. Composition
9. Footer

Between each section:

* unique SVG sigil divider

Each section opens with:

* large italic Roman numeral in `--blood`

---

# Do Not

* Do not use `Inter`, `Arial`, or `system-ui`
* Do not use purple gradients
* Do not use blurred shadows on interactive elements
* Do not use border-radius > 2px
* Do not load external images or icon libraries
* All effects must be pure CSS or inline SVG

---

# Final Requirement

The final HTML output must be:

* fully self-contained
* semantically structured
* keyboard accessible
* responsive
* WCAG 2.2 AA compliant
* production-quality
* visually faithful to the medieval manuscript aesthetic

## Review Contract

- `/design-systems/create` only collected setup inputs. All GitHub extraction, local evidence intake, source reading, design-system construction, package audit, and artifact writes should happen inside this project workspace.
- DESIGN.md is the canonical source of truth.
- Use the canonical design-system title above for headings, README/SKILL names, preview labels, and UI-kit copy unless inspected evidence proves a more accurate product name. Never title the system from URL protocol text such as `https`.
- colors_and_type.css should hold concrete reusable tokens when the source evidence supports them; if fonts/ contains preserved font files, colors_and_type.css must bind those files with @font-face, @import, or url(...) references so typography does not fall back to substitute fonts.
- README.md and SKILL.md should make the extracted system reusable as a real Open Design design-system package.
- README.md should include a source-backed Product Overview/Product Context section, source repository or source folder references, package contents, a concrete `## Preview Manifest` listing every generated `preview/*.html` card, and reuse workflow, similar to Claude Design exports.
- SKILL.md should include YAML frontmatter with `name`, `description`, and `user-invocable`, plus Claude-style reusable skill sections: What is inside, Source context, When to use this skill, How to use, and Design system highlights. The usage guidance should point agents at README.md, DESIGN.md, colors_and_type.css, preview/, assets/, build/, fonts/, source_examples/, and ui_kits/app/.
- README.md, SKILL.md, DESIGN.md, and ui_kits/app/README.md must describe the final focused preview cards and `ui_kits/app/` paths, not old scaffold names such as `preview/typography-scale.html` or `ui_kits/generated_interface/`.
- preview/ should contain small reviewable HTML cards for typography, color themes, spacing, radius, shadows, brand assets, and component evidence.
- source_examples/ or equivalent root/nested source files should preserve selected high-signal original components when snapshots include substantial app/component source, similar to Claude Design exports that keep files like SelectModelButton.tsx or ChatNavBar/index.tsx alongside the package. These examples should contain substantive original implementation code, not tiny stubs that only share the component name.
- ui_kits/app/ should contain an applied interface example, plus substantive role-based files under `ui_kits/app/components/` when the source snapshots include representative app shells, navigation, chat/input surfaces, or reusable components. `ui_kits/app/README.md` should explain structure, component files, usage, design notes, and source basis. `ui_kits/app/index.html` must load `../../colors_and_type.css`, must load/import/compose the modular component files, and must mount/render the composed interface instead of staying as a standalone generic static mock or disconnected script list. If the entry directly loads `.jsx`/`.tsx` files, include React, ReactDOM, and Babel standalone scripts and expose each loaded component as `window.ComponentName` / `globalThis.ComponentName`, or write compiled browser-ready JavaScript instead. For chat/workspace evidence, cover app shell, sidebar/navigation, assistant/list rail, chat area, input bar/composer, and message bubble/comment roles; the app shell component must compose those roles into one product-like surface. Placeholder component shells are not sufficient.
Claude-style UI-kit entry contract:
- When `ui_kits/app/components/*.jsx` or `*.tsx` files exist, `ui_kits/app/index.html` must behave like a runnable browser entry, not a static mock.
- Use the same structure as Claude Design exports: load React, ReactDOM, and Babel standalone scripts, load `../../colors_and_type.css`, create a `#root`, load each component script from `components/`, then render the composed `App` component.
- `App.jsx` must assign `window.App = App` (or `globalThis.App = App`), and every directly loaded component file must expose the same browser global for its component name.
- Use this skeleton for direct JSX component kits, replacing the component list only when evidence supports different names:
```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
<link rel="stylesheet" href="../../colors_and_type.css">
<div id="root"></div>
<script type="text/babel" src="components/Sidebar.jsx"></script>
<script type="text/babel" src="components/AssistantsList.jsx"></script>
<script type="text/babel" src="components/ChatArea.jsx"></script>
<script type="text/babel" src="components/MessageBubble.jsx"></script>
<script type="text/babel" src="components/InputBar.jsx"></script>
<script type="text/babel" src="components/App.jsx"></script>
<script type="text/babel">
const { App } = window;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
</script>
```
- Preview cards and UI-kit visuals should explicitly label or model source-backed modules from the captured evidence instead of generic placeholder modules.
- assets/, build/, fonts/, and context/ should preserve logos, app icons, tray icons, installer/runtime icons, wordmarks, font files, provenance, and source notes for future projects.
Claude-style build asset contract:
- When evidence includes `context/.../files/build/...`, create a root `build/` directory and copy representative runtime assets there with their original filenames and path intent, such as `build/icon.png`, `build/logo.png`, `build/tray_icon.png`, and `build/icon.ico`.
- Copy those runtime assets byte-for-byte from the captured `context/.../files/...` snapshots. Do not redraw, re-encode, optimize, or substitute generated placeholders for files that the evidence already captured.
- Do not satisfy build/runtime icon evidence by only renaming those files into `assets/`. `assets/` may include convenience aliases, but root `build/` must preserve the source runtime files for future agents and package consumers.
- `preview/brand-assets.html` should reference at least some real preserved files from `build/` or `assets/` with `<img>`, `<picture>`, `<object>`, or CSS `url(...)`, and README.md / SKILL.md should mention `build/` in the package manifest when it exists.
- preview/brand-assets.html should visibly reference preserved files from assets/ or build/ instead of recreating logos/icons as inline placeholder drawings.
- GitHub evidence must come from the bounded `github-design-context` command, not direct connector tree/content/raw tool calls. The command tries this-device git first, authenticated GitHub CLI second, and connector-platform fallback only when local access cannot read the repository.
- Linked local folder evidence should come from the bounded `local-design-context` command, which writes a local evidence note and snapshots under `context/local-code/` before final design-system rules are drafted.
- Before marking the design system ready, run `"$OD_NODE_BIN" "$OD_BIN" tools connectors design-system-package-audit --path . --fail-on-warnings` and fix every reported error or warning.
- Draft design systems cannot be used by other projects until published.
