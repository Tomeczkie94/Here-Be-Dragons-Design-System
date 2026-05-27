// EquipmentCard.jsx — Equipment item card for the Compendium
// Displays D&D equipment with rarity badge, properties, and attunement indicator.

const RARITY_CONFIG = {
  Common:    { color: '#6b4f35', badge: '#d4bc88', badgeText: '#3d2817', label: 'Common' },
  Uncommon:  { color: '#2d5a3d', badge: '#2d5a3d', badgeText: '#f5ecd7', label: 'Uncommon' },
  Rare:      { color: '#1e3a5f', badge: '#1e3a5f', badgeText: '#f5ecd7', label: 'Rare' },
  'Very Rare': { color: '#7a1212', badge: '#7a1212', badgeText: '#f5ecd7', label: 'Very Rare' },
  Legendary: { color: '#7a5a22', badge: '#b8893b', badgeText: '#1a1410', label: 'Legendary' },
};

const EquipmentCard = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);
  const r = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.Common;

  const s = {
    card: {
      background: 'linear-gradient(135deg, #f5ecd7, #ead9b3)',
      border: '2px solid #3d2817',
      boxShadow: '4px 4px 0 #a88d5a',
      position: 'relative',
      overflow: 'hidden',
      transition: 'box-shadow 0.15s ease',
    },
    topBar: { height: '4px', background: r.color },
    body: { padding: '12px 14px 14px' },
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' },
    name: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '16px', fontWeight: 700, letterSpacing: '0.02em',
      color: '#1a1410', lineHeight: 1.1, flex: 1, paddingRight: '8px',
    },
    rarityBadge: {
      background: r.badge, color: r.badgeText,
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '8px', letterSpacing: '0.12em', padding: '3px 7px',
      textTransform: 'uppercase', borderRadius: '1px', flexShrink: 0,
    },
    typeRow: {
      display: 'flex', alignItems: 'center', gap: '8px',
      marginBottom: '8px',
    },
    typeText: {
      fontFamily: '"IM Fell English",serif', fontStyle: 'italic',
      fontSize: '12px', color: '#6b4f35',
    },
    attunement: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '8px', letterSpacing: '0.15em', textTransform: 'uppercase',
      color: '#7a5a22', padding: '2px 6px',
      border: '1px solid #7a5a22', borderRadius: '1px',
    },
    divider: { border: 'none', borderTop: '1px dashed #6b4f35', margin: '8px 0' },
    description: {
      fontFamily: '"IM Fell English",serif', fontStyle: 'italic',
      fontSize: '12px', lineHeight: 1.55, color: '#3d2817',
      marginBottom: '8px',
    },
    propList: { listStyle: 'none', margin: 0, padding: 0 },
    propItem: {
      fontFamily: '"Roboto",serif', fontSize: '11px', color: '#3d2817',
      lineHeight: 1.5, padding: '2px 0',
      borderBottom: '1px solid rgba(107,79,53,0.18)',
      display: 'flex', alignItems: 'baseline', gap: '6px',
    },
    propBullet: { color: '#7a1212', flexShrink: 0, fontSize: '9px' },
    footer: {
      display: 'flex', justifyContent: 'space-between',
      padding: '6px 14px 10px',
      background: 'rgba(212,188,136,0.35)',
      borderTop: '1px solid rgba(61,40,23,0.2)',
    },
    footerItem: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
      color: '#7a5a22',
    },
    footerValue: { color: '#1a1410', fontFamily: '"Roboto",serif', fontSize: '11px', letterSpacing: 0 },
    expandBtn: {
      background: 'transparent', border: 'none', cursor: 'pointer',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
      color: '#7a5a22', padding: '6px 0', display: 'block', width: '100%',
      textAlign: 'center', borderTop: '1px dashed rgba(122,90,34,0.3)',
    },
    corner: (pos) => {
      const base = { position: 'absolute', width: '16px', height: '16px', borderColor: '#b8893b', borderStyle: 'solid' };
      const positions = {
        tl: { top: '6px', left: '6px', borderWidth: '1.5px 0 0 1.5px' },
        tr: { top: '6px', right: '6px', borderWidth: '1.5px 1.5px 0 0' },
        bl: { bottom: '6px', left: '6px', borderWidth: '0 0 1.5px 1.5px' },
        br: { bottom: '6px', right: '6px', borderWidth: '0 1.5px 1.5px 0' },
      };
      return { ...base, ...positions[pos] };
    },
  };

  return (
    <article style={s.card} aria-label={`${item.name}, ${item.rarity} ${item.type}`}>
      <span style={s.corner('tl')} aria-hidden="true"></span>
      <span style={s.corner('tr')} aria-hidden="true"></span>
      <div style={s.topBar} aria-hidden="true"></div>
      <div style={s.body}>
        <div style={s.headerRow}>
          <h3 style={s.name}>{item.name}</h3>
          <span style={s.rarityBadge}>{item.rarity}</span>
        </div>
        <div style={s.typeRow}>
          <span style={s.typeText}>{item.type}</span>
          {item.attunement && <span style={s.attunement}>Attunement</span>}
        </div>
        <hr style={s.divider} aria-hidden="true"/>
        <p style={s.description}>{item.description}</p>
        {item.properties && item.properties.length > 0 && (
          <ul style={s.propList} aria-label="Item properties">
            {item.properties.map((p, i) => (
              <li key={i} style={s.propItem}>
                <span style={s.propBullet} aria-hidden="true">◆</span>
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={s.footer}>
        <span style={s.footerItem}>Weight <span style={s.footerValue}>{item.weight || '—'}</span></span>
        <span style={s.footerItem}>Value <span style={s.footerValue}>{item.value || '—'}</span></span>
      </div>
      <span aria-hidden="true" style={{ ...s.corner('bl') }}></span>
      <span aria-hidden="true" style={{ ...s.corner('br') }}></span>
    </article>
  );
};

const EquipmentGrid = ({ items }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
  };
  return (
    <div style={gridStyle}>
      {items.map(item => <EquipmentCard key={item.id} item={item} />)}
    </div>
  );
};

Object.assign(window, { EquipmentCard, EquipmentGrid });
