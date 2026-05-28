/*
 * ColorPicker — Here Be Dragons Design System
 *
 * Props:
 *   value        {string|null}   Controlled hex value (e.g. "#7a1212"), null = no selection
 *   defaultValue {string|null}   Uncontrolled initial value
 *   onChange     {(hex: string|null) => void}  Called on every selection change
 *   disabled     {boolean}       Default false
 *   presets      {Array<{name: string, hex: string}>|null}  null = use DS palette
 *   label        {string|null}   Label text rendered above the picker
 *   showHexInput {boolean}       Default true — show manual hex entry row
 *   showCopyBtn  {boolean}       Default true — show copy-to-clipboard button
 *   id           {string|null}   Applied to the hex input element
 */

const DS_PALETTE = [
  { name: 'Parchment 100', hex: '#f5ecd7' },
  { name: 'Parchment 200', hex: '#ead9b3' },
  { name: 'Parchment 300', hex: '#d4bc88' },
  { name: 'Parchment 400', hex: '#a88d5a' },
  { name: 'Ink Black',     hex: '#1a1410' },
  { name: 'Ink Brown',     hex: '#3d2817' },
  { name: 'Ink Faded',     hex: '#6b4f35' },
  { name: 'Gold',          hex: '#b8893b' },
  { name: 'Gold Bright',   hex: '#d4a548' },
  { name: 'Gold Deep',     hex: '#7a5a22' },
  { name: 'Blood',         hex: '#7a1212' },
  { name: 'Blood Deep',    hex: '#4a0808' },
  { name: 'Emerald',       hex: '#2d5a3d' },
  { name: 'Sapphire',      hex: '#1e3a5f' },
  { name: 'Shadow',        hex: '#2a1f17' },
];

const CP_HEX_RE = /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/;

function cpNormalizeHex(h) {
  if (!h) return null;
  const s = h.trim().toLowerCase();
  if (!s.startsWith('#')) return null;
  if (!CP_HEX_RE.test(s)) return null;
  // Expand 3-char shorthand
  if (s.length === 4) {
    return '#' + s[1] + s[1] + s[2] + s[2] + s[3] + s[3];
  }
  return s;
}

function cpHexesMatch(a, b) {
  if (!a || !b) return false;
  return cpNormalizeHex(a) === cpNormalizeHex(b);
}

const FONT_DISPLAY_CP = '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif';
const FONT_MONO_CP    = '"JetBrains Mono","Courier New",monospace';

function ColorPicker({
  value,
  defaultValue = null,
  onChange,
  disabled = false,
  presets = null,
  label = null,
  showHexInput = true,
  showCopyBtn = true,
  id = null,
}) {
  const isControlled = value !== undefined;
  const palette = presets || DS_PALETTE;

  const [internalColor, setInternalColor] = React.useState(() => {
    const init = isControlled ? value : defaultValue;
    return cpNormalizeHex(init);
  });

  const current = isControlled ? cpNormalizeHex(value) : internalColor;

  const [hexDraft, setHexDraft]   = React.useState(current || '');
  const [hexErr, setHexErr]       = React.useState(false);
  const [copied, setCopied]       = React.useState(false);
  const copiedTimer               = React.useRef(null);
  const [hovSwatch, setHovSwatch] = React.useState(null);
  const [hovCopy, setHovCopy]     = React.useState(false);
  const [hovApply, setHovApply]   = React.useState(false);

  // Sync hex draft when controlled value changes
  React.useEffect(() => {
    if (isControlled) {
      const n = cpNormalizeHex(value);
      setHexDraft(n || '');
      setHexErr(false);
    }
  }, [value, isControlled]);

  // Cleanup timer on unmount
  React.useEffect(() => () => clearTimeout(copiedTimer.current), []);

  function selectColor(hex) {
    if (disabled) return;
    const norm = cpNormalizeHex(hex);
    if (!isControlled) setInternalColor(norm);
    setHexDraft(norm || '');
    setHexErr(false);
    if (onChange) onChange(norm);
  }

  function applyHexDraft() {
    if (disabled) return;
    const norm = cpNormalizeHex(hexDraft);
    if (norm) {
      setHexErr(false);
      selectColor(norm);
    } else {
      setHexErr(true);
    }
  }

  function handleHexKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); applyHexDraft(); }
  }

  function handleCopy() {
    if (!current || disabled) return;
    navigator.clipboard.writeText(current).then(() => {
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      // Clipboard unavailable — silent fail
    });
  }

  // Find matching palette entry for token-name display
  const matchedEntry = current
    ? palette.find(p => cpHexesMatch(p.hex, current))
    : null;

  // Preview swatch shows current or parchment-200 fallback if nothing selected
  const swatchColor = current || '#ead9b3';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        opacity: disabled ? 0.65 : 1,
      }}
    >
      <style>{`
        .hbd-cp-swatch:focus-visible { outline: 2px solid #7a5a22 !important; outline-offset: 2px; }
        .hbd-cp-hex-input:focus { outline: 2px solid #7a5a22; outline-offset: 2px; }
        .hbd-cp-apply:focus-visible { outline: 2px solid #f5ecd7; outline-offset: 2px; }
        .hbd-cp-copy:focus-visible { outline: 2px solid #7a5a22; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .hbd-cp-swatch,
          .hbd-cp-copy,
          .hbd-cp-apply { transition: none !important; }
        }
      `}</style>

      {/* ── Label ── */}
      {label && (
        <span style={{
          fontFamily: FONT_DISPLAY_CP,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#7a5a22',
          userSelect: 'none',
        }}>
          {label}
        </span>
      )}

      {/* ── Preview row ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* Big colour swatch */}
        <div
          style={{
            width: '48px',
            height: '48px',
            flexShrink: 0,
            backgroundColor: swatchColor,
            border: '1.5px solid #3d2817',
            borderRadius: '1px',
            boxShadow: '3px 3px 0 #a88d5a',
          }}
          role="img"
          aria-label={current ? 'Selected colour: ' + current : 'No colour selected'}
        />

        {/* Hex value + token name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{
            fontFamily: FONT_DISPLAY_CP,
            fontSize: '0.9375rem',
            color: current ? '#1a1410' : '#6b4f35',
            letterSpacing: '0.05em',
          }}>
            {current || 'No colour'}
          </span>
          {matchedEntry && (
            <span style={{
              fontFamily: FONT_DISPLAY_CP,
              fontSize: '0.5625rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#7a5a22',
            }}>
              {matchedEntry.name}
            </span>
          )}
        </div>

        {/* Copy button */}
        {showCopyBtn && current && (
          <button
            type="button"
            className="hbd-cp-copy"
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              padding: '4px 8px',
              fontFamily: FONT_DISPLAY_CP,
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: hovCopy ? '#7a1212' : '#6b4f35',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'color 0.12s',
            }}
            onClick={handleCopy}
            onMouseEnter={() => setHovCopy(true)}
            onMouseLeave={() => setHovCopy(false)}
            disabled={disabled}
            aria-label={'Copy colour ' + current + ' to clipboard'}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* ── Swatch grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '6px',
        }}
        role="group"
        aria-label="Colour presets"
      >
        {palette.map((entry) => {
          const isSel = cpHexesMatch(entry.hex, current);
          const isHov = hovSwatch === entry.hex;

          let swBorder    = '1px solid rgba(0,0,0,0.25)';
          let swBoxShadow = 'none';
          let swTransform = 'none';

          if (isSel) {
            swBorder    = '2px solid #7a5a22';
            swBoxShadow = '2px 2px 0 #4a0808';
            swTransform = 'translate(-1px,-1px)';
          } else if (isHov && !disabled) {
            swBorder    = '2px solid #7a5a22';
            swBoxShadow = '2px 2px 0 #a88d5a';
          }

          return (
            <button
              key={entry.hex}
              type="button"
              className="hbd-cp-swatch"
              style={{
                aspectRatio: '1 / 1',
                backgroundColor: entry.hex,
                border: swBorder,
                borderRadius: '1px',
                boxShadow: swBoxShadow,
                transform: swTransform,
                outline: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'border 0.08s, box-shadow 0.08s, transform 0.08s',
                padding: 0,
              }}
              title={entry.name + ' · ' + entry.hex}
              aria-label={entry.name + ': ' + entry.hex}
              aria-pressed={isSel}
              disabled={disabled}
              onClick={() => selectColor(entry.hex)}
              onMouseEnter={() => { if (!disabled) setHovSwatch(entry.hex); }}
              onMouseLeave={() => setHovSwatch(null)}
            />
          );
        })}
      </div>

      {/* ── Hex input row ── */}
      {showHexInput && (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '6px',
          alignItems: 'stretch',
        }}>
          <input
            type="text"
            className="hbd-cp-hex-input"
            id={id || undefined}
            style={{
              fontFamily: FONT_MONO_CP,
              fontSize: '0.8125rem',
              padding: '6px 10px',
              border: hexErr ? '1.5px solid #7a1212' : '1.5px solid #a88d5a',
              borderRadius: '1px',
              backgroundColor: hexErr ? '#fff5f5' : '#f5ecd7',
              color: '#1a1410',
              outline: 'none',
              width: '130px',
              letterSpacing: '0.05em',
            }}
            value={hexDraft}
            placeholder="#7a1212"
            disabled={disabled}
            aria-label="Enter hex colour value"
            aria-invalid={hexErr}
            onChange={(e) => {
              setHexDraft(e.target.value);
              setHexErr(false);
            }}
            onKeyDown={handleHexKeyDown}
            onBlur={applyHexDraft}
            spellCheck={false}
            autoComplete="off"
          />
          <button
            type="button"
            className="hbd-cp-apply"
            style={{
              fontFamily: FONT_DISPLAY_CP,
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '6px 12px',
              background: hovApply ? '#4a0808' : '#7a1212',
              color: '#f5ecd7',
              border: 'none',
              borderRadius: '1px',
              boxShadow: '2px 2px 0 #4a0808',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'background 0.1s',
            }}
            disabled={disabled}
            onClick={applyHexDraft}
            onMouseEnter={() => setHovApply(true)}
            onMouseLeave={() => setHovApply(false)}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ColorPicker, DS_PALETTE });
