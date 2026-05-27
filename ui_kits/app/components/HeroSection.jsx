// HeroSection.jsx — Hero panel for the Compendium
// Adapted from context/local-code/.../ui_kits/compendium/HeroSection.jsx

const HeroSection = ({ title, subtitle, meta }) => {
  const s = {
    hero: {
      padding: '48px 48px 36px',
      borderBottom: '2px double #7a5a22',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #f5ecd7 60%, #ead9b3 100%)',
    },
    sigil: {
      position: 'absolute',
      right: '40px',
      top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0.07,
      pointerEvents: 'none',
    },
    eyebrow: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px',
      letterSpacing: '0.35em',
      textTransform: 'uppercase',
      color: '#7a5a22',
      marginBottom: '10px',
      display: 'block',
    },
    title: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: 'clamp(32px, 4vw, 52px)',
      fontWeight: 700,
      letterSpacing: '0.02em',
      lineHeight: 1.05,
      color: '#1a1410',
      marginBottom: '10px',
    },
    subtitle: {
      fontFamily: '"IM Fell English",serif',
      fontStyle: 'italic',
      fontSize: '16px',
      lineHeight: 1.6,
      color: '#3d2817',
      maxWidth: '560px',
      marginBottom: '20px',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '400px',
    },
    divLine: (dir) => ({
      flex: 1,
      height: '1px',
      background: `linear-gradient(to ${dir}, transparent, #7a5a22)`,
    }),
  };

  return (
    <div style={s.hero}>
      <svg style={s.sigil} width="340" height="340" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <polygon points="100,10 130,50 180,40 155,80 175,120 130,110 110,150 90,110 45,120 65,80 40,40 90,50" fill="#7a1212" opacity="0.6"/>
        <polygon points="100,30 120,58 158,50 140,76 155,106 124,98 110,126 96,98 65,106 80,76 62,50 100,58" fill="#b8893b" opacity="0.4"/>
        <polygon points="100,50 114,70 138,64 126,86 138,108 114,102 100,122 86,102 62,108 74,86 62,64 86,70" fill="#1a1410" opacity="0.3"/>
        <circle cx="100" cy="86" r="18" fill="none" stroke="#7a1212" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="100" cy="86" r="6" fill="#7a1212" opacity="0.6"/>
        <line x1="100" y1="10" x2="100" y2="162" stroke="#7a5a22" strokeWidth="0.5" opacity="0.3"/>
        <line x1="20" y1="86" x2="180" y2="86" stroke="#7a5a22" strokeWidth="0.5" opacity="0.3"/>
      </svg>

      <span style={s.eyebrow}>{meta}</span>
      <div style={s.title}>{title}</div>
      <p style={s.subtitle}>{subtitle}</p>

      <div style={s.divider}>
        <div style={s.divLine('right')}></div>
        <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <polygon points="10,1 12.4,7.4 19,7.6 14,12 16,18.5 10,14.5 4,18.5 6,12 1,7.6 7.6,7.4" fill="#7a5a22"/>
        </svg>
        <div style={s.divLine('left')}></div>
      </div>
    </div>
  );
};

Object.assign(window, { HeroSection });
