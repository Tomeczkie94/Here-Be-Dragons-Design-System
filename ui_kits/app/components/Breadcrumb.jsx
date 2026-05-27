// Breadcrumb.jsx — Wayfinding navigation for the Adventurer's Compendium
//
// Follows WAI-ARIA 1.2 breadcrumb pattern.
// Each item is { label: string, href?: string }.
// The final item with no href becomes aria-current="page".
//
// Props:
//   items      — array of { label, href? }.  Last item w/o href = current page.
//   dark       — boolean. Use on --ink-black / --shadow panel backgrounds.
//   ariaLabel  — string (default "Breadcrumb"). Names the <nav> landmark.
//   maxVisible — number|null. If set and items.length > maxVisible,
//                the middle levels collapse to an ellipsis.
//                Always shows: root + ellipsis + last (maxVisible-2) ancestors + current.
//   eyebrow    — string|null. If set, renders an "EYEBROW" label above the trail.
//
// Usage:
//   <Breadcrumb
//     eyebrow="Location"
//     items={[
//       { label: 'Compendium', href: '#' },
//       { label: 'Spells',     href: '#spells' },
//       { label: 'Fireball' }   ← no href → current page
//     ]}
//   />

const Breadcrumb = ({
  items = [],
  dark = false,
  ariaLabel = 'Breadcrumb',
  maxVisible = null,
  eyebrow = null,
}) => {
  const [hovered, setHovered] = React.useState(null);

  // ── Collapse deep hierarchies ──────────────────────────────────────────
  let visibleItems = items;
  if (maxVisible && items.length > maxVisible) {
    const head = items.slice(0, 1);
    // Keep the last (maxVisible - 2) items before the current, plus the current
    const tail = items.slice(-(maxVisible - 1));
    visibleItems = [...head, null, ...tail]; // null sentinel → ellipsis
  }

  // ── Styles ───────────────────────────────────────────────────────────────
  // Inline styles only; no external stylesheet dependency beyond the host page.
  // Hex values are the exact token values from colors_and_type.css.

  const S = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px', // --space-1
    },

    eyebrowEl: {
      fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
      fontSize: '0.8125rem',          // --text-label
      letterSpacing: '0.3em',         // --ls-label
      textTransform: 'uppercase',
      color: '#7a5a22',               // --gold-deep
      display: 'block',
      marginBottom: '2px',
    },

    list: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },

    item: {
      display: 'flex',
      alignItems: 'center',
    },

    sep: {
      display: 'inline-block',
      color: dark ? '#7a5a22' : '#b8893b',   // dark: --gold-deep / light: --gold
      fontSize: '0.75rem',
      margin: '0 0.5rem',                      // 0 --space-2
      lineHeight: 1,
      userSelect: 'none',
    },

    link: (idx) => ({
      fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
      fontSize: '0.8125rem',           // --text-label
      letterSpacing: '0.05em',
      color: dark
        ? (hovered === idx ? '#d4a548' : 'rgba(168,141,90,0.65)')  // dark: hover --gold-bright
        : (hovered === idx ? '#7a5a22' : '#6b4f35'),               // light: hover --gold-deep / --ink-faded
      textDecoration: 'none',
      borderBottom: hovered === idx
        ? `1px solid ${dark ? '#d4a548' : '#7a5a22'}`
        : '1px solid transparent',
      paddingBottom: '1px',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      transition: 'color 0.12s ease, border-bottom-color 0.12s ease',
      // :focus-visible handled by global focus ring in app shell CSS
      outline: 'none',
    }),

    current: {
      fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
      fontSize: '0.8125rem',           // --text-label
      letterSpacing: '0.05em',
      color: dark ? '#f5ecd7' : '#1a1410',   // dark: --parchment-100 / light: --ink-black
      whiteSpace: 'nowrap',
    },

    ellipsis: {
      fontFamily: '"Roboto",Georgia,serif',   // --font-body; ellipsis is UI chrome, not content
      fontSize: '0.9375rem',
      color: dark ? '#7a5a22' : '#6b4f35',   // dark: --gold-deep / light: --ink-faded
      letterSpacing: 0,
      padding: '0 0.25rem',
      cursor: 'default',
      userSelect: 'none',
      lineHeight: 1,
    },
  };

  // ── Focus ring injection for links ────────────────────────────────────
  // Because inline styles cannot express :focus-visible, inject a minimal
  // scoped <style> so keyboard users see the correct gold ring on light
  // surfaces and the parchment ring on dark surfaces.
  const focusRingColor = dark ? '#f5ecd7' : '#7a5a22';
  const focusStyle = `
    .hbd-breadcrumb__link:focus-visible {
      outline: 2px solid ${focusRingColor} !important;
      outline-offset: 2px !important;
      border-bottom-color: transparent !important;
    }
  `;

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div style={eyebrow ? S.wrapper : undefined}>
      {/* Focus ring style injection */}
      <style>{focusStyle}</style>

      {/* Optional eyebrow label */}
      {eyebrow && (
        <span style={S.eyebrowEl} aria-hidden="true">{eyebrow}</span>
      )}

      <nav aria-label={ariaLabel}>
        <ol style={S.list}>
          {visibleItems.map((item, i) => {
            const isFirst = i === 0;
            const isEllipsis = item === null;
            const isCurrent = item && !item.href;

            if (isEllipsis) {
              return (
                <li key="__ellipsis__" style={S.item}>
                  <span style={S.sep} aria-hidden="true">›</span>
                  <span style={S.ellipsis} aria-label="more pages">…</span>
                </li>
              );
            }

            return (
              <li key={`${item.label}-${i}`} style={S.item}>
                {/* Separator — hidden from AT */}
                {!isFirst && (
                  <span style={S.sep} aria-hidden="true">›</span>
                )}

                {/* Current page — not a link */}
                {isCurrent ? (
                  <span style={S.current} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  /* Ancestor link */
                  <a
                    href={item.href}
                    className="hbd-breadcrumb__link"
                    style={S.link(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

Object.assign(window, { Breadcrumb });
