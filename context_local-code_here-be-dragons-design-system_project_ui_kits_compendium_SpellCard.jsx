// SpellCard.jsx — Reusable spell card component
// Export to window at the bottom.

const SpellCard = ({ spell, onClick, selected }) => {
  const schoolColors = {
    Evocation:   { bar: 'linear-gradient(to right,#7a1212,#d4a548,#7a1212)', badge: '#7a1212', badgeText: '#f5ecd7' },
    Divination:  { bar: 'linear-gradient(to right,#1e3a5f,#4a7ab8,#1e3a5f)', badge: '#1e3a5f', badgeText: '#f5ecd7' },
    Conjuration: { bar: 'linear-gradient(to right,#2d5a3d,#5aab74,#2d5a3d)', badge: '#2d5a3d', badgeText: '#f5ecd7' },
    Abjuration:  { bar: 'linear-gradient(to right,#7a5a22,#d4a548,#7a5a22)', badge: '#7a5a22', badgeText: '#f5ecd7' },
    Illusion:    { bar: 'linear-gradient(to right,#4a2a5a,#9a5ab8,#4a2a5a)', badge: '#4a2a5a', badgeText: '#f5ecd7' },
    Necromancy:  { bar: 'linear-gradient(to right,#1a1410,#4a3828,#1a1410)', badge: '#1a1410', badgeText: '#d4a548' },
    Transmutation:{ bar: 'linear-gradient(to right,#2a4a2a,#4aaa4a,#2a4a2a)', badge: '#2a4a2a', badgeText: '#f5ecd7' },
    Enchantment: { bar: 'linear-gradient(to right,#5a1a3a,#c45a8a,#5a1a3a)', badge: '#5a1a3a', badgeText: '#f5ecd7' },
  };

  const colors = schoolColors[spell.school] || schoolColors.Evocation;

  const s = {
    card: {
      background: 'linear-gradient(135deg, #f5ecd7, #ead9b3)',
      border: selected ? '2px solid #b8893b' : '2px solid #3d2817',
      boxShadow: selected ? '4px 4px 0 #7a5a22' : '4px 4px 0 #a88d5a',
      position: 'relative',
      cursor: 'pointer',
      transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
      overflow: 'hidden',
    },
    bar: {
      height: '3px',
      background: colors.bar,
    },
    body: {
      padding: '12px 14px',
    },
    eyebrow: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '9px',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: '#7a5a22',
      display: 'block',
      marginBottom: '3px',
    },
    name: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '17px',
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: '#1a1410',
      lineHeight: 1.1,
      marginBottom: '8px',
    },
    divider: {
      border: 'none',
      borderTop: '1px dashed #6b4f35',
      margin: '8px 0',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4px 8px',
      marginBottom: '8px',
    },
    statLabel: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '8px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#7a1212',
      display: 'block',
    },
    statValue: {
      fontFamily: '"Roboto",serif',
      fontSize: '11px',
      color: '#3d2817',
    },
    flavor: {
      fontFamily: '"IM Fell English",serif',
      fontStyle: 'italic',
      fontSize: '11px',
      lineHeight: 1.5,
      color: '#3d2817',
    },
    corner: (pos) => {
      const base = { position: 'absolute', width: '18px', height: '18px', borderColor: '#b8893b', borderStyle: 'solid' };
      const positions = {
        tl: { top: '5px', left: '5px', borderWidth: '1.5px 0 0 1.5px' },
        tr: { top: '5px', right: '5px', borderWidth: '1.5px 1.5px 0 0' },
        bl: { bottom: '5px', left: '5px', borderWidth: '0 0 1.5px 1.5px' },
        br: { bottom: '5px', right: '5px', borderWidth: '0 1.5px 1.5px 0' },
      };
      return { ...base, ...positions[pos] };
    },
    levelBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: colors.badge,
      color: colors.badgeText,
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '9px',
      letterSpacing: '0.1em',
      padding: '2px 6px',
      textTransform: 'uppercase',
    },
  };

  return (
    <div style={s.card} onClick={() => onClick && onClick(spell)}>
      <span style={s.corner('tl')}></span>
      <span style={s.corner('tr')}></span>
      <span style={s.corner('bl')}></span>
      <span style={s.corner('br')}></span>
      <div style={s.bar}></div>
      <div style={s.body}>
        <div style={s.levelBadge}>{spell.level === 0 ? 'Cantrip' : `Lvl ${spell.level}`}</div>
        <span style={s.eyebrow}>{spell.school}</span>
        <div style={s.name}>{spell.name}</div>
        <hr style={s.divider} />
        <div style={s.statsGrid}>
          <div><span style={s.statLabel}>Casting Time</span><span style={s.statValue}>{spell.castingTime}</span></div>
          <div><span style={s.statLabel}>Range</span><span style={s.statValue}>{spell.range}</span></div>
          <div><span style={s.statLabel}>Components</span><span style={s.statValue}>{spell.components}</span></div>
          <div><span style={s.statLabel}>Duration</span><span style={s.statValue}>{spell.duration}</span></div>
        </div>
        <hr style={s.divider} />
        <div style={s.flavor}>{spell.flavor}</div>
      </div>
    </div>
  );
};

Object.assign(window, { SpellCard });
