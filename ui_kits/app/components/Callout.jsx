// Callout.jsx — Sage Advice / lore callout component
// Variants: 'standard' (gold), 'arcane' (emerald), 'danger' (blood)

const Callout = ({ type = 'standard', label, children }) => {
  const colors = {
    standard: { border: '#7a5a22', bg: 'rgba(184,137,59,0.08)', label: '#7a5a22' },
    arcane:   { border: '#2d5a3d', bg: 'rgba(45,90,61,0.07)',   label: '#2d5a3d' },
    danger:   { border: '#7a1212', bg: 'rgba(122,18,18,0.07)',  label: '#7a1212' },
  };
  const c = colors[type] || colors.standard;

  const icons = {
    standard: (
      <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true" focusable="false" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke={c.label} strokeWidth="1.5"/>
        <line x1="10" y1="9" x2="10" y2="14" stroke={c.label} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="6.5" r="0.9" fill={c.label}/>
      </svg>
    ),
    arcane: (
      <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <polygon points="10,1 12.9,7.6 20,8.2 14.5,13 16.2,20 10,16.3 3.8,20 5.5,13 0,8.2 7.1,7.6" fill={c.label}/>
      </svg>
    ),
    danger: (
      <svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M10 1L19 18H1L10 1zm0 4L4.2 16h11.6L10 5zm-0.8 4h1.6v3.5h-1.6V9zm0 4.5h1.6V15h-1.6v-1.5z" fill={c.label}/>
      </svg>
    ),
  };

  const s = {
    callout: {
      border: `2px dashed ${c.border}`,
      background: c.bg,
      padding: '16px 20px',
      position: 'relative',
      marginBottom: '16px',
    },
    labelRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: c.label,
      marginBottom: '8px',
    },
    body: {
      fontFamily: '"IM Fell English",serif',
      fontStyle: 'italic',
      fontSize: '14px',
      lineHeight: 1.65,
      color: '#3d2817',
    },
  };

  const role = type === 'danger' ? 'alert' : 'note';

  return (
    <div style={s.callout} role={role} aria-label={label}>
      {label && (
        <div style={s.labelRow}>
          {icons[type] || icons.standard}
          {label}
        </div>
      )}
      <div style={s.body}>{children}</div>
    </div>
  );
};

Object.assign(window, { Callout });
