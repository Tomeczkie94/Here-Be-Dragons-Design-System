// StatBlock.jsx — D&D stat block component with ability score grid
// Adapted from context/local-code/.../ui_kits/compendium/StatBlock.jsx

const StatBlock = ({ creature }) => {
  const s = {
    block: {
      background: 'linear-gradient(135deg, #f5ecd7, #ead9b3)',
      borderTop: '6px solid #7a1212',
      borderBottom: '6px solid #7a1212',
      marginBottom: '16px',
    },
    inner: {
      borderTop: '1px solid #7a1212',
      borderBottom: '1px solid #7a1212',
      margin: '4px 0',
      padding: '16px 20px',
    },
    name: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '24px',
      fontWeight: 700,
      letterSpacing: '0.02em',
      color: '#7a1212',
      lineHeight: 1.1,
      marginBottom: '2px',
    },
    type: {
      fontFamily: '"IM Fell English",serif',
      fontStyle: 'italic',
      fontSize: '13px',
      color: '#3d2817',
      marginBottom: '12px',
    },
    rule: { border: 'none', borderTop: '1px solid #7a1212', margin: '10px 0' },
    statLine: { fontFamily: '"Roboto",serif', fontSize: '13px', color: '#3d2817', lineHeight: 1.7 },
    statStrong: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      color: '#4a0808',
      fontWeight: 700,
      letterSpacing: '0.05em',
      marginRight: '4px',
    },
    abilityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      textAlign: 'center',
      background: 'rgba(122,18,18,0.06)',
      border: '1px solid rgba(122,18,18,0.2)',
      margin: '10px 0',
    },
    abilityHeader: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '10px',
      letterSpacing: '0.1em',
      color: '#7a1212',
      padding: '5px 0',
      borderBottom: '1px solid rgba(122,18,18,0.2)',
      textTransform: 'uppercase',
    },
    abilityScore: {
      fontFamily: '"Roboto",serif',
      fontSize: '15px',
      fontWeight: 700,
      color: '#1a1410',
      padding: '5px 0 2px',
    },
    abilityMod: {
      fontFamily: '"Roboto",serif',
      fontSize: '11px',
      color: '#7a1212',
      paddingBottom: '5px',
    },
    featureRow: {
      marginTop: '6px',
      fontFamily: '"Roboto",serif',
      fontSize: '13px',
      color: '#3d2817',
      lineHeight: 1.55,
    },
    featureName: { fontStyle: 'italic', fontWeight: 700, color: '#1a1410' },
    actionHead: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '16px',
      fontWeight: 700,
      color: '#7a1212',
      letterSpacing: '0.02em',
      borderBottom: '1px solid #7a1212',
      paddingBottom: '4px',
      marginBottom: '8px',
      marginTop: '4px',
    },
  };

  const getMod = (score) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

  return (
    <article style={s.block} aria-labelledby={`stat-${creature.name.replace(/\s+/g, '-').toLowerCase()}`}>
      <div style={s.inner}>
        <h3 style={s.name} id={`stat-${creature.name.replace(/\s+/g, '-').toLowerCase()}`}>{creature.name}</h3>
        <p style={s.type}>{creature.type}</p>
        <hr style={s.rule} aria-hidden="true"/>
        <dl>
          <div style={s.statLine}><dt style={{ display: 'inline', ...s.statStrong }}>Armor Class</dt><dd style={{ display: 'inline' }}>{creature.ac}</dd></div>
          <div style={s.statLine}><dt style={{ display: 'inline', ...s.statStrong }}>Hit Points</dt><dd style={{ display: 'inline' }}>{creature.hp}</dd></div>
          <div style={s.statLine}><dt style={{ display: 'inline', ...s.statStrong }}>Speed</dt><dd style={{ display: 'inline' }}>{creature.speed}</dd></div>
        </dl>

        <div style={s.abilityGrid} role="table" aria-label="Ability scores">
          <div role="row" style={{ display: 'contents' }}>
            {abilities.map(a => <div key={a} style={s.abilityHeader} role="columnheader">{a}</div>)}
          </div>
          <div role="row" style={{ display: 'contents' }}>
            {abilities.map(a => <div key={a+'-s'} style={s.abilityScore} role="cell">{creature.abilities[a]}</div>)}
          </div>
          <div role="row" style={{ display: 'contents' }}>
            {abilities.map(a => <div key={a+'-m'} style={s.abilityMod} role="cell">{getMod(creature.abilities[a])}</div>)}
          </div>
        </div>

        <hr style={s.rule} aria-hidden="true"/>
        <dl>
          {creature.savingThrows && <div style={s.statLine}><dt style={{ display: 'inline', ...s.statStrong }}>Saving Throws</dt><dd style={{ display: 'inline' }}>{creature.savingThrows}</dd></div>}
          {creature.senses && <div style={s.statLine}><dt style={{ display: 'inline', ...s.statStrong }}>Senses</dt><dd style={{ display: 'inline' }}>{creature.senses}</dd></div>}
          {creature.languages && <div style={s.statLine}><dt style={{ display: 'inline', ...s.statStrong }}>Languages</dt><dd style={{ display: 'inline' }}>{creature.languages}</dd></div>}
          {creature.challenge && <div style={s.statLine}><dt style={{ display: 'inline', ...s.statStrong }}>Challenge</dt><dd style={{ display: 'inline' }}>{creature.challenge}</dd></div>}
        </dl>

        {creature.traits && creature.traits.length > 0 && (
          <section aria-label="Traits">
            <hr style={s.rule} aria-hidden="true"/>
            {creature.traits.map((t, i) => (
              <div key={i} style={s.featureRow}>
                <span style={s.featureName}>{t.name}. </span>{t.desc}
              </div>
            ))}
          </section>
        )}

        {creature.actions && creature.actions.length > 0 && (
          <section aria-label="Actions">
            <h4 style={{ ...s.actionHead, marginTop: '12px' }}>Actions</h4>
            {creature.actions.map((a, i) => (
              <div key={i} style={s.featureRow}>
                <span style={s.featureName}>{a.name}. </span>{a.desc}
              </div>
            ))}
          </section>
        )}

        {creature.legendary && creature.legendary.length > 0 && (
          <section aria-label="Legendary Actions">
            <h4 style={{ ...s.actionHead, marginTop: '12px' }}>Legendary Actions</h4>
            <div style={{ ...s.featureRow, marginBottom: '6px' }}>{creature.legendaryDesc}</div>
            {creature.legendary.map((l, i) => (
              <div key={i} style={s.featureRow}>
                <span style={s.featureName}>{l.name}. </span>{l.desc}
              </div>
            ))}
          </section>
        )}
      </div>
    </article>
  );
};

Object.assign(window, { StatBlock });
