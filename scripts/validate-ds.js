// Here Be Dragons DS — scripts/validate-ds.js
// Validates that ds/ files conform to CLAUDE.md architectural rules.
// Run: node scripts/validate-ds.js

const fs   = require('fs');
const path = require('path');

const ROOT          = path.resolve(__dirname, '..');
const DS_DIR        = path.join(ROOT, 'ds');
const DS_STYLES     = path.join(ROOT, 'ds', 'styles');
const DS_COMPONENTS = path.join(ROOT, 'ds', 'components');
const DS_INDEX_JS   = path.join(ROOT, 'ds', 'index.js');
const PREVIEW_HTML  = path.join(ROOT, 'preview', 'design-system.html');

let violations = 0;

const fail = (file, lineNum, message) => {
  const rel = path.relative(ROOT, file);
  const loc = lineNum > 0 ? `:${lineNum}` : '';
  console.log(`  FAIL  ${rel}${loc}  →  ${message}`);
  violations++;
};

const pass = (message) => console.log(`  PASS  ${message}`);

// Read file into an array of lines (1-indexed externally)
const readLines = (filePath) =>
  fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8').split('\n') : [];

// Walk a directory recursively, returning absolute paths matching the extension
function walkFiles(dir, ext, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, ext, results);
    else if (entry.isFile() && entry.name.endsWith(ext)) results.push(full);
  }
  return results;
}

// Strip all var(…) expressions from a string (handles one level of nesting per pass)
function stripVarCalls(line) {
  let prev;
  let s = line;
  do {
    prev = s;
    s = s.replace(/var\([^()]*\)/g, 'VAR');
  } while (s !== prev);
  return s;
}

// Strip inline CSS comments /* … */ from a line (non-greedy)
const stripInlineComments = (line) => line.replace(/\/\*.*?\*\//g, '');

// True when the line is a comment line (// or /* or continuation *)
const isCommentLine = (line) => /^\s*(\/\/|\/\*|\*)/.test(line);

// ─── Check 1: hard-coded hex colours in ds/styles/ ───────────────────────────
console.log('\n[1] Hard-coded hex colours in ds/styles/');
const HEX_RE    = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
const cssFiles  = walkFiles(DS_STYLES, '.css');
let hexCount    = 0;

for (const file of cssFiles) {
  readLines(file).forEach((rawLine, i) => {
    if (isCommentLine(rawLine)) return;
    const line = stripInlineComments(rawLine);
    HEX_RE.lastIndex = 0;
    let m;
    while ((m = HEX_RE.exec(line)) !== null) {
      fail(file, i + 1, `Hard-coded hex colour: ${m[0]}`);
      hexCount++;
    }
  });
}
if (hexCount === 0) pass('No hard-coded hex colours in ds/styles/');

// ─── Check 2: hard-coded px values not inside var() in ds/styles/ ────────────
console.log('\n[2] Hard-coded px values outside var() in ds/styles/');
const PX_RE = /\b(\d+px)\b/g;
let pxCount = 0;

for (const file of cssFiles) {
  readLines(file).forEach((rawLine, i) => {
    if (isCommentLine(rawLine)) return;
    const line = stripInlineComments(rawLine);

    // Skip @media / @keyframes / @supports lines — breakpoints may be hard-coded
    if (/^\s*@(media|keyframes|supports|font-face)/.test(line)) return;

    const stripped = stripVarCalls(line);
    PX_RE.lastIndex = 0;
    let m;
    while ((m = PX_RE.exec(stripped)) !== null) {
      fail(file, i + 1, `Hard-coded pixel value: ${m[0]} (use a --hbd-* token)`);
      pxCount++;
    }
  });
}
if (pxCount === 0) pass('No hard-coded px values outside var() in ds/styles/');

// ─── Check 3: every hbd-*.js in ds/components/ is imported in ds/index.js ───
console.log('\n[3] Component registration in ds/index.js');
const componentFiles = fs.existsSync(DS_COMPONENTS)
  ? fs.readdirSync(DS_COMPONENTS)
      .filter((f) => /^hbd-.+\.js$/.test(f))
      .sort()
  : [];
const indexContent = fs.existsSync(DS_INDEX_JS) ? fs.readFileSync(DS_INDEX_JS, 'utf8') : '';
let importCount = 0;

for (const file of componentFiles) {
  const expected = `'./components/${file}'`;
  if (!indexContent.includes(expected)) {
    fail(DS_INDEX_JS, 0, `Missing import for ${file} — expected: import ${expected};`);
    importCount++;
  }
}
if (importCount === 0) pass('All hbd-*.js components imported in ds/index.js');

// ─── Check 4: every hbd-*.js has a preview section in design-system.html ─────
console.log('\n[4] Preview sections in preview/design-system.html');
const previewContent = fs.existsSync(PREVIEW_HTML)
  ? fs.readFileSync(PREVIEW_HTML, 'utf8')
  : '';
let previewCount = 0;

for (const file of componentFiles) {
  const name       = file.replace(/^hbd-/, '').replace(/\.js$/, '');
  const expectedId = `id="component-${name}"`;
  if (!previewContent.includes(expectedId)) {
    fail(PREVIEW_HTML, 0, `Missing section ${expectedId} for ${file}`);
    previewCount++;
  }
}
if (previewCount === 0) pass('All hbd-*.js components have preview sections in design-system.html');

// ─── Check 5: forbidden strings in any file inside ds/ ───────────────────────
console.log('\n[5] Forbidden strings in ds/');
const FORBIDDEN = [
  { needle: 'require(',      label: 'CommonJS require()' },
  { needle: 'import React',  label: 'React import (no framework in ds/)' },
  { needle: 'import Vue',    label: 'Vue import (no framework in ds/)' },
  { needle: 'import Svelte', label: 'Svelte import (no framework in ds/)' },
  { needle: ' from \'react\'', label: 'React import (no framework in ds/)' },
  { needle: ' from "react"', label: 'React import (no framework in ds/)' },
  { needle: 'npm install',   label: 'npm install reference' },
];
const allDsFiles = [...walkFiles(DS_DIR, '.js'), ...walkFiles(DS_DIR, '.css')];
let forbiddenCount = 0;

for (const file of allDsFiles) {
  readLines(file).forEach((line, i) => {
    if (isCommentLine(line)) return;
    for (const { needle, label } of FORBIDDEN) {
      if (line.includes(needle)) {
        fail(file, i + 1, `Forbidden: "${needle}" (${label})`);
        forbiddenCount++;
      }
    }
  });
}
if (forbiddenCount === 0) pass('No forbidden strings found in ds/ files');

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log('');
if (violations === 0) {
  console.log('All checks passed.');
} else {
  console.log(`${violations} violation(s) found.`);
  process.exit(1);
}
