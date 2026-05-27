// DiceRoller.jsx — Interactive polyhedral dice roller for the Compendium
// Supports d4 / d6 / d8 / d10 / d12 / d20. Maintains roll history.

const DieSVG = ({ type, size = 44, light = false }) => {
  const fill = light ? '#2a1f17' : '#ead9b3';
  const stroke = light ? '#b8893b' : '#3d2817';
  const textFill = light ? '#d4a548' : '#7a1212';
  const innerStroke = light ? '#7a5a22' : '#a88d5a';
  const f = "'Tiamat Condensed SC','Cinzel',serif";

  const shapes = {
    d4: (
      <>
        <polygon points="40,6 76,72 4,72" fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="40" y1="6" x2="40" y2="72" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <line x1="4" y1="72" x2="58" y2="36" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <line x1="76" y1="72" x2="22" y2="36" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <text x="40" y="65" textAnchor="middle" fontFamily={f} fontSize="20" fontWeight="700" fill={textFill}>4</text>
      </>
    ),
    d6: (
      <>
        <rect x="6" y="6" width="68" height="68" rx="2" fill={fill} stroke={stroke} strokeWidth="2.5"/>
        <circle cx="25" cy="25" r="6" fill={textFill}/>
        <circle cx="55" cy="25" r="6" fill={textFill}/>
        <circle cx="25" cy="40" r="6" fill={textFill}/>
        <circle cx="55" cy="40" r="6" fill={textFill}/>
        <circle cx="25" cy="55" r="6" fill={textFill}/>
        <circle cx="55" cy="55" r="6" fill={textFill}/>
      </>
    ),
    d8: (
      <>
        <polygon points="40,5 74,40 40,75 6,40" fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="6" y1="40" x2="74" y2="40" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <line x1="40" y1="5" x2="40" y2="75" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <text x="40" y="48" textAnchor="middle" fontFamily={f} fontSize="22" fontWeight="700" fill={textFill}>8</text>
      </>
    ),
    d10: (
      <>
        <polygon points="40,6 72,36 40,80 8,36" fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="8" y1="36" x2="72" y2="36" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <line x1="40" y1="6" x2="40" y2="80" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <text x="40" y="56" textAnchor="middle" fontFamily={f} fontSize="18" fontWeight="700" fill={textFill}>10</text>
      </>
    ),
    d12: (
      <>
        <polygon points="40,5 74,28 62,70 18,70 6,28" fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="40" y1="5" x2="40" y2="70" stroke={innerStroke} strokeWidth="0.7" opacity="0.4"/>
        <line x1="74" y1="28" x2="18" y2="70" stroke={innerStroke} strokeWidth="0.7" opacity="0.4"/>
        <line x1="6" y1="28" x2="62" y2="70" stroke={innerStroke} strokeWidth="0.7" opacity="0.4"/>
        <text x="40" y="52" textAnchor="middle" fontFamily={f} fontSize="18" fontWeight="700" fill={textFill}>12</text>
      </>
    ),
    d20: (
      <>
        <polygon points="40,5 76,68 4,68" fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="40" y1="5" x2="40" y2="68" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <line x1="40" y1="5" x2="4" y2="42" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <line x1="40" y1="5" x2="76" y2="42" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <line x1="4" y1="42" x2="76" y2="42" stroke={innerStroke} strokeWidth="0.8" opacity="0.5"/>
        <text x="40" y="62" textAnchor="middle" fontFamily={f} fontSize="18" fontWeight="700" fill={textFill}>20</text>
      </>
    ),
  };
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden="true" focusable="false">
      {shapes[type] || null}
    </svg>
  );
};

const DICE_TYPES = [
  { type: 'd4',  sides: 4 },
  { type: 'd6',  sides: 6 },
  { type: 'd8',  sides: 8 },
  { type: 'd10', sides: 10 },
  { type: 'd12', sides: 12 },
  { type: 'd20', sides: 20 },
];

const DiceRoller = () => {
  const [pool, setPool]       = React.useState([]);
  const [history, setHistory] = React.useState([]);

  const hasRolled = pool.length > 0 && pool.every(d => d.value !== null);
  const total = pool.reduce((s, d) => s + (d.value || 0), 0);

  const addDie = (die) => {
    setPool(prev => [...prev, { ...die, id: Date.now() + Math.random(), value: null }]);
  };

  const removeDie = (id) => setPool(prev => prev.filter(d => d.id !== id));
  const clearPool  = () => setPool([]);

  const rollAll = () => {
    if (!pool.length) return;
    const result = pool.map(d => ({ ...d, value: Math.floor(Math.random() * d.sides) + 1 }));
    setPool(result);
    const t = result.reduce((s, d) => s + d.value, 0);
    const groups = result.reduce((acc, d) => { acc[d.type] = (acc[d.type] || 0) + 1; return acc; }, {});
    const label = Object.entries(groups).map(([t, c]) => (c > 1 ? `${c}${t}` : t)).join(' + ');
    const breakdown = result.map(d => `${d.type}→${d.value}`).join(', ');
    setHistory(prev => [{
      label, breakdown, total: t,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }, ...prev.slice(0, 7)]);
  };

  const s = {
    container: { padding: '32px', maxWidth: '600px' },
    eyebrow: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
      color: '#7a5a22', marginBottom: '20px', display: 'block',
    },
    subHead: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
      color: '#6b4f35', marginBottom: '10px', marginTop: '20px', display: 'block',
    },
    picker: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' },
    dieBtn: {
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
      padding: '8px 12px', cursor: 'pointer',
      background: '#ead9b3', border: '1.5px solid #3d2817',
      boxShadow: '3px 3px 0 #1a1410', borderRadius: '1px',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
      color: '#1a1410', transition: 'background 0.1s',
    },
    poolArea: {
      minHeight: '52px', border: '1px dashed #6b4f35', padding: '8px 12px',
      marginBottom: '14px', background: 'rgba(212,188,136,0.25)',
      display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center',
    },
    emptyPool: {
      fontFamily: '"IM Fell English",serif', fontStyle: 'italic',
      color: '#6b4f35', fontSize: '13px',
    },
    dieChip: (d) => ({
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '3px 9px', cursor: 'pointer',
      background: d.value !== null ? '#7a1212' : '#d4bc88',
      border: `1px solid ${d.value !== null ? '#4a0808' : '#a88d5a'}`,
      color: d.value !== null ? '#f5ecd7' : '#1a1410',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '13px', letterSpacing: '0.05em', borderRadius: '1px',
    }),
    controls: { display: 'flex', gap: '10px', marginBottom: '20px' },
    totalBox: {
      padding: '16px 20px', background: 'linear-gradient(135deg, #f5ecd7, #ead9b3)',
      border: '2px solid #3d2817', boxShadow: '4px 4px 0 #a88d5a',
      marginBottom: '20px',
    },
    totalLabel: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
      color: '#7a5a22', marginBottom: '2px', display: 'block',
    },
    totalNum: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '60px', fontWeight: 700, color: '#7a1212',
      lineHeight: 1, marginBottom: '4px',
    },
    breakdown: { fontFamily: '"JetBrains Mono",monospace', fontSize: '11px', color: '#6b4f35' },
    historyPanel: { borderTop: '1px dashed #6b4f35', paddingTop: '16px' },
    historyRow: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '5px 0', borderBottom: '1px solid rgba(107,79,53,0.18)',
    },
    hLabel: { fontFamily: '"Tiamat Condensed SC","Cinzel",serif', fontSize: '12px', color: '#1a1410' },
    hBreak: { fontFamily: '"JetBrains Mono",monospace', fontSize: '10px', color: '#6b4f35', display: 'block' },
    hTotal: { fontFamily: '"Tiamat Condensed SC","Cinzel",serif', fontSize: '16px', fontWeight: 700, color: '#7a1212' },
    hTime:  { fontFamily: '"JetBrains Mono",monospace', fontSize: '10px', color: '#6b4f35', display: 'block', textAlign: 'right' },
  };

  return (
    <div style={s.container}>
      <span style={s.eyebrow}>Dice Roller</span>

      <span style={{ ...s.subHead, marginTop: 0 }}>Select Dice</span>
      <div style={s.picker} role="group" aria-label="Select dice to add to pool">
        {DICE_TYPES.map(d => (
          <button
            key={d.type}
            style={s.dieBtn}
            onClick={() => addDie(d)}
            aria-label={`Add ${d.type} to pool`}
            onMouseEnter={e => e.currentTarget.style.background = '#d4bc88'}
            onMouseLeave={e => e.currentTarget.style.background = '#ead9b3'}
          >
            <DieSVG type={d.type} size={36}/>
            {d.type}
          </button>
        ))}
      </div>

      <span style={s.subHead}>Dice Pool</span>
      <div style={s.poolArea} role="group" aria-label="Current dice pool">
        {pool.length === 0
          ? <span style={s.emptyPool}>Add dice above…</span>
          : pool.map(d => (
              <button
                key={d.id}
                style={s.dieChip(d)}
                onClick={() => removeDie(d.id)}
                aria-label={d.value !== null
                  ? `${d.type} rolled ${d.value} — click to remove`
                  : `${d.type} in pool — click to remove`}
              >
                {d.value !== null ? d.value : d.type}
                <span aria-hidden="true" style={{ opacity: 0.55, fontSize: '9px' }}>×</span>
              </button>
            ))
        }
      </div>

      <div style={s.controls}>
        <button
          className="btn btn--primary"
          onClick={rollAll}
          disabled={!pool.length}
          style={{ opacity: pool.length ? 1 : 0.45 }}
        >
          Roll {pool.length > 0 ? `(${pool.length})` : ''}
        </button>
        <button className="btn" onClick={clearPool} disabled={!pool.length}>Clear</button>
      </div>

      {hasRolled && (
        <div style={s.totalBox} aria-live="polite" aria-label={`Total roll result: ${total}`}>
          <span style={s.totalLabel}>Total</span>
          <div style={s.totalNum}>{total}</div>
          <div style={s.breakdown}>{pool.map(d => `${d.type}:${d.value}`).join(' + ')}</div>
        </div>
      )}

      {history.length > 0 && (
        <div style={s.historyPanel}>
          <span style={s.subHead}>Roll History</span>
          {history.map((h, i) => (
            <div key={i} style={s.historyRow}>
              <div>
                <span style={s.hLabel}>{h.label}</span>
                <span style={s.hBreak}>{h.breakdown}</span>
              </div>
              <div>
                <span style={s.hTotal}>{h.total}</span>
                <span style={s.hTime}>{h.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { DieSVG, DiceRoller });
