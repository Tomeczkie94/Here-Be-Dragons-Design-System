// SpellGrid.jsx — Filterable spell grid with school tabs and search
// Adapted from context/local-code/.../ui_kits/compendium/SpellGrid.jsx

const SpellGrid = ({ spells, onSelectSpell, selectedSpell }) => {
  const [activeSchool, setActiveSchool] = React.useState('All');
  const [search, setSearch] = React.useState('');

  const schools = ['All', 'Evocation', 'Divination', 'Conjuration', 'Abjuration', 'Necromancy', 'Illusion', 'Transmutation', 'Enchantment'];

  const filtered = spells.filter(sp => {
    const schoolMatch = activeSchool === 'All' || sp.school === activeSchool;
    const searchMatch = sp.name.toLowerCase().includes(search.toLowerCase());
    return schoolMatch && searchMatch;
  });

  const s = {
    container: { display: 'flex', flexDirection: 'column', gap: '16px' },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: '2px double #7a5a22',
      paddingBottom: '14px',
    },
    searchInput: {
      flex: 1,
      background: 'rgba(212,188,136,0.25)',
      border: '1.5px solid #a88d5a',
      borderRight: 'none',
      padding: '8px 12px',
      fontFamily: '"Roboto",serif',
      fontSize: '14px',
      color: '#1a1410',
      outline: 'none',
      borderRadius: '1px 0 0 1px',
    },
    searchBtn: {
      background: '#ead9b3',
      border: '1.5px solid #a88d5a',
      borderLeft: 'none',
      padding: '8px 14px',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: '#3d2817',
      cursor: 'pointer',
      boxShadow: '2px 2px 0 #7a5a22',
      borderRadius: '0 1px 1px 0',
    },
    tabs: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
    tab: (active) => ({
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '10px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      padding: '5px 10px',
      border: '1px solid',
      borderColor: active ? '#7a1212' : '#a88d5a',
      background: active ? '#7a1212' : 'transparent',
      color: active ? '#f5ecd7' : '#6b4f35',
      cursor: 'pointer',
      transition: 'all 0.12s ease',
      borderRadius: '1px',
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '14px',
    },
    empty: {
      fontFamily: '"IM Fell English",serif',
      fontStyle: 'italic',
      color: '#6b4f35',
      fontSize: '15px',
      textAlign: 'center',
      padding: '32px 0',
      gridColumn: '1 / -1',
    },
    count: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '10px',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: '#7a5a22',
    },
  };

  return (
    <div style={s.container}>
      <div style={s.searchBar} role="search">
        <label htmlFor="spell-search" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Search spells</label>
        <input
          id="spell-search"
          style={s.searchInput}
          placeholder="Search spells by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="search"
        />
        <button style={s.searchBtn} type="button">Search</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={s.tabs} role="tablist" aria-label="Filter by school">
          {schools.map(sc => (
            <button
              key={sc}
              role="tab"
              aria-selected={activeSchool === sc}
              style={s.tab(activeSchool === sc)}
              onClick={() => setActiveSchool(sc)}
              type="button"
            >
              {sc}
            </button>
          ))}
        </div>
        <span style={s.count} aria-live="polite" aria-atomic="true">
          {filtered.length} spell{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={s.grid}>
        {filtered.length === 0 && (
          <p style={s.empty}>"No such enchantment exists in the known tomes."</p>
        )}
        {filtered.map(spell => (
          <SpellCard
            key={spell.id}
            spell={spell}
            onClick={onSelectSpell}
            selected={selectedSpell && selectedSpell.id === spell.id}
          />
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { SpellGrid });
