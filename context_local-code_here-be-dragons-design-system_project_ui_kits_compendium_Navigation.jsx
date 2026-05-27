// Navigation.jsx — Sidebar navigation for the D&D Compendium
// Export to window at the bottom so index.html can use it.

const Navigation = ({ activeSection, onNavigate }) => {
  const navStyles = {
    sidebar: {
      width: '220px',
      minWidth: '220px',
      background: 'linear-gradient(180deg, #1a1410 0%, #2a1f17 100%)',
      borderRight: '2px solid #7a5a22',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      zIndex: 10,
    },
    logo: {
      padding: '28px 20px 20px',
      borderBottom: '1px solid rgba(184,137,59,0.3)',
    },
    logoTitle: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '18px',
      fontWeight: 700,
      letterSpacing: '0.05em',
      color: '#d4a548',
      lineHeight: 1.1,
      marginBottom: '4px',
    },
    logoSub: {
      fontFamily: '"IM Fell English",Georgia,serif',
      fontStyle: 'italic',
      fontSize: '11px',
      color: '#6b4f35',
      lineHeight: 1.4,
    },
    navSection: {
      padding: '16px 0 8px',
    },
    navLabel: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '9px',
      letterSpacing: '0.35em',
      textTransform: 'uppercase',
      color: '#7a5a22',
      padding: '0 20px',
      marginBottom: '6px',
      display: 'block',
    },
    navItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 20px',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '13px',
      letterSpacing: '0.05em',
      color: isActive ? '#d4a548' : '#a88d5a',
      background: isActive ? 'rgba(184,137,59,0.12)' : 'transparent',
      borderLeft: isActive ? '2px solid #b8893b' : '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      textDecoration: 'none',
      userSelect: 'none',
    }),
    divider: {
      margin: '8px 20px',
      borderTop: '1px solid rgba(184,137,59,0.2)',
    },
    footer: {
      marginTop: 'auto',
      padding: '16px 20px',
      borderTop: '1px solid rgba(184,137,59,0.2)',
    },
    footerText: {
      fontFamily: '"IM Fell English",serif',
      fontStyle: 'italic',
      fontSize: '10px',
      color: '#4a3010',
      lineHeight: 1.5,
    },
  };

  const sections = [
    { id: 'spells', label: 'Spells', icon: '✦' },
    { id: 'monsters', label: 'Monsters', icon: '◆' },
    { id: 'equipment', label: 'Equipment', icon: '◈' },
    { id: 'classes', label: 'Classes', icon: '❧' },
  ];

  const tools = [
    { id: 'dice', label: 'Dice Roller', icon: '⬡' },
    { id: 'initiative', label: 'Initiative', icon: '⚔' },
  ];

  return (
    <nav style={navStyles.sidebar}>
      <div style={navStyles.logo}>
        <div style={navStyles.logoTitle}>Here Be Dragons!</div>
        <div style={navStyles.logoSub}>The Adventurer's Compendium</div>
      </div>

      <div style={navStyles.navSection}>
        <span style={navStyles.navLabel}>Compendium</span>
        {sections.map(s => (
          <div
            key={s.id}
            style={navStyles.navItem(activeSection === s.id)}
            onClick={() => onNavigate(s.id)}
          >
            <span style={{ fontSize: '10px', opacity: 0.7 }}>{s.icon}</span>
            {s.label}
          </div>
        ))}
      </div>

      <div style={navStyles.divider}></div>

      <div style={navStyles.navSection}>
        <span style={navStyles.navLabel}>Tools</span>
        {tools.map(t => (
          <div
            key={t.id}
            style={navStyles.navItem(activeSection === t.id)}
            onClick={() => onNavigate(t.id)}
          >
            <span style={{ fontSize: '10px', opacity: 0.7 }}>{t.icon}</span>
            {t.label}
          </div>
        ))}
      </div>

      <div style={navStyles.footer}>
        <div style={navStyles.footerText}>
          "Not all those who wander are lost — but most of them are."
        </div>
      </div>
    </nav>
  );
};

Object.assign(window, { Navigation });
