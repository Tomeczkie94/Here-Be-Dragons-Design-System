// Here Be Dragons DS — scripts/new-component.js
// Scaffolds a new Web Component following CLAUDE.md §7.2
// Run: node scripts/new-component.js <name>
// Example: node scripts/new-component.js button

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ─── CLI input ────────────────────────────────────────────────────────────────
const name = process.argv[2];

if (!name) {
  console.error('Error: component name is required.');
  console.error('Usage: node scripts/new-component.js <name>');
  console.error('Example: node scripts/new-component.js button');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error(`Error: invalid name "${name}".`);
  console.error('Names must be lowercase letters, digits, and hyphens only.');
  process.exit(1);
}

// ─── Derived identifiers ──────────────────────────────────────────────────────
const tagName = `hbd-${name}`;

// HbdMyComponent from "my-component"
const className = `Hbd${name.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join('')}`;

// "My Component" for display
const displayName = name.split('-').map((s) => s[0].toUpperCase() + s.slice(1)).join(' ');

// ─── Target paths ─────────────────────────────────────────────────────────────
const cssFile = path.join(ROOT, 'ds', 'styles', 'components', `${tagName}.css`);
const jsFile  = path.join(ROOT, 'ds', 'components', `${tagName}.js`);
const indexJs = path.join(ROOT, 'ds', 'index.js');

if (fs.existsSync(cssFile)) {
  console.error(`Error: ${path.relative(ROOT, cssFile)} already exists.`);
  process.exit(1);
}
if (fs.existsSync(jsFile)) {
  console.error(`Error: ${path.relative(ROOT, jsFile)} already exists.`);
  process.exit(1);
}

// ─── CSS template ─────────────────────────────────────────────────────────────
const cssContent = `/*
 * Here Be Dragons DS
 * ds/styles/components/${tagName}.css
 * Component layer — ${tagName} styles.
 *
 * Rules (CLAUDE.md §6):
 *   - All values must reference --hbd-* custom properties.
 *   - Reference semantic tokens only — never reference primitive tokens directly.
 *   - Class names follow BEM with hbd- prefix: .${tagName}, .${tagName}__{el}, .${tagName}--{mod}
 *   - State classes: .is-disabled .is-loading .is-open .is-active .is-selected .is-invalid .is-valid
 */

/* Component-scoped tokens — override here, reference semantics */
:root {
  /* --${tagName}-padding-x: var(--hbd-space-4); */
  /* --${tagName}-padding-y: var(--hbd-space-2); */
  /* --${tagName}-radius:    var(--hbd-radius-md); */
}

/* Block */
.${tagName} {
}

/* Elements */
/* .${tagName}__label {} */
/* .${tagName}__icon  {} */

/* Modifiers */
/* .${tagName}--primary {} */
/* .${tagName}--ghost   {} */

/* States */
/* .${tagName}.is-disabled {} */
/* .${tagName}.is-loading  {} */
/* .${tagName}.is-invalid  {} */
`;

// ─── JS Web Component template (CLAUDE.md §7.2) ───────────────────────────────
const jsContent = `// Here Be Dragons DS — ds/components/${tagName}.js

class ${className} extends HTMLElement {

  // §7.2.1  Declare observed attributes
  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  // §7.2.2  Constructor — attach shadow DOM and bind methods only
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // §7.2.3  connectedCallback — render, add listeners, ARIA
  connectedCallback() {
    this._render();
    this._upgradeAccessibility();
  }

  // §7.2.4  disconnectedCallback — clean up listeners
  disconnectedCallback() {
  }

  // §7.2.5  attributeChangedCallback — re-render on change
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this._render();
  }

  // §7.2.6  Private methods prefixed with _
  _render() {
    const variant  = this.getAttribute('variant') || 'default';
    const disabled = this.hasAttribute('disabled');

    this.shadowRoot.innerHTML = \`
      <link rel="stylesheet" href="/tokens/tokens.css">
      <link rel="stylesheet" href="/ds/styles/components/${tagName}.css">
      <div
        class="${tagName} ${tagName}--\${variant}\${disabled ? ' is-disabled' : ''}"
        part="root"
      >
        <slot></slot>
      </div>
    \`;
  }

  _upgradeAccessibility() {
    // Add ARIA attributes here. Prefer native HTML semantics where possible (CLAUDE.md §8.4).
  }
}

// §7.2.7  Guard against double registration
if (!customElements.get('${tagName}')) {
  customElements.define('${tagName}', ${className});
}
`;

// ─── Insert import into ds/index.js (alphabetical by component name) ──────────
const IMPORT_RE = /^import\s+'\.\/components\/(hbd-[^']+)';\s*$/gm;

let indexContent = fs.existsSync(indexJs)
  ? fs.readFileSync(indexJs, 'utf8')
  : '// Here Be Dragons DS — ds/index.js\n// ESM barrel: imports + registers all Custom Elements (CLAUDE.md §7.5)\n';

const newImportLine = `import './components/${tagName}.js';`;

if (indexContent.includes(newImportLine)) {
  console.warn(`Warning: ${newImportLine} already present in ds/index.js — skipping.`);
} else {
  // Collect existing component imports, add the new one, sort alphabetically
  const existingImports = [];
  let m;
  while ((m = IMPORT_RE.exec(indexContent)) !== null) {
    existingImports.push(m[0].trim());
  }
  existingImports.push(newImportLine);
  existingImports.sort();

  // Replace the entire block of component imports in index.js
  const IMPORT_BLOCK_RE = /^import\s+'\.\/components\/hbd-[^']+';(\s*\nimport\s+'\.\/components\/hbd-[^']+';)*/m;
  if (IMPORT_BLOCK_RE.test(indexContent)) {
    indexContent = indexContent.replace(IMPORT_BLOCK_RE, existingImports.join('\n'));
  } else {
    // No existing imports yet — append
    indexContent = indexContent.trimEnd() + '\n' + newImportLine + '\n';
  }
}

// ─── Write files ──────────────────────────────────────────────────────────────
fs.writeFileSync(cssFile, cssContent);
console.log(`Created  ds/styles/components/${tagName}.css`);

fs.writeFileSync(jsFile, jsContent);
console.log(`Created  ds/components/${tagName}.js`);

fs.writeFileSync(indexJs, indexContent);
console.log(`Updated  ds/index.js  →  added import './components/${tagName}.js'`);

// ─── Preview section HTML — printed to stdout for manual placement ─────────────
const previewSection = `
<!-- ═══════════════════════════════════════════════════════════════════════════
     ${displayName.toUpperCase()} — paste into preview/design-system.html
     1. Add to <nav aria-label="Design system sections"> table of contents:
        <li><a href="#component-${name}">${displayName}</a></li>
     2. Paste the <section> block in the correct alphabetical position.
     ═══════════════════════════════════════════════════════════════════════════ -->

<section class="ds-section" id="component-${name}" aria-labelledby="heading-${name}">

  <h2 class="ds-section__heading" id="heading-${name}">${displayName}</h2>
  <p class="ds-section__description">
    <!-- One or two sentences: what this component is and when to use it. -->
  </p>

  <div class="ds-preview-group">
    <h3 class="ds-preview-group__label">Default</h3>
    <div class="ds-preview-canvas">
      <${tagName}></${tagName}>
    </div>
    <details class="ds-preview-code">
      <summary>View code</summary>
      <pre><code>&lt;${tagName}&gt;&lt;/${tagName}&gt;</code></pre>
    </details>
  </div>

  <!-- Add more ds-preview-group blocks for each variant -->

</section>
`;

console.log('\n' + '─'.repeat(72));
console.log('Paste this into preview/design-system.html:');
console.log('─'.repeat(72));
console.log(previewSection);
