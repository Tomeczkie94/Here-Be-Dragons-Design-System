// StatBlock.jsx — Canonical D&D stat block component

const StatBlock = ({ creature }) => {
  const s = {
    block: {
      background: 'linear-gradient(135deg, #f5ecd7, #ead9b3)',
      borderTop: '6px solid #7a1212',
      borderBottom: '6px solid #7a1212',
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
    rule: {
      border: 'none',
      borderTop: '1px solid #7a1212',
      margin: '10px 0',
    },
    statLine: {
      fontFamily: '"Roboto",serif',
      fontSize: '13px',
      color: '#3d2817',
      lineHeight: 1.7,
    },
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
    featureName: {
      fontStyle: 'italic',
      fontWeight: 700,
      color: '#1a1410',
    },
    legendaryHeader: {
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
    <div style={s.block}>
      <div style={s.inner}>
        <div style={s.name}>{creature.name}</div>
        <div style={s.type}>{creature.type}</div>
        <hr style={s.rule} />
        <div style={s.statLine}><span style={s.statStrong}>Armor Class</span>{creature.ac}</div>
        <div style={s.statLine}><span style={s.statStrong}>Hit Points</span>{creature.hp}</div>
        <div style={s.statLine}><span style={s.statStrong}>Speed</span>{creature.speed}</div>

        <div style={s.abilityGrid}>
          {abilities.map(a => <div key={a} style={s.abilityHeader}>{a}</div>)}
          {abilities.map(a => <div key={a+'-s'} style={s.abilityScore}>{creature.abilities[a]}</div>)}
          {abilities.map(a => <div key={a+'-m'} style={s.abilityMod}>{getMod(creature.abilities[a])}</div>)}
        </div>

        <hr style={s.rule} />
        {creature.savingThrows && <div style={s.statLine}><span style={s.statStrong}>Saving Throws</span>{creature.savingThrows}</div>}
        {creature.senses && <div style={s.statLine}><span style={s.statStrong}>Senses</span>{creature.senses}</div>}
        {creature.languages && <div style={s.statLine}><span style={s.statStrong}>Languages</span>{creature.languages}</div>}
        {creature.challenge && <div style={s.statLine}><span style={s.statStrong}>Challenge</span>{creature.challenge}</div>}

        {creature.traits && creature.traits.length > 0 && (
          <>
            <hr style={s.rule} />
            {creature.traits.map((t, i) => (
              <div key={i} style={s.featureRow}>
                <span style={s.featureName}>{t.name}. </span>{t.desc}
              </div>
            ))}
          </>
        )}

        {creature.actions && creature.actions.length > 0 && (
          <>
            <div style={{ ...s.legendaryHeader, marginTop: '12px' }}>Actions</div>
            {creature.actions.map((a, i) => (
              <div key={i} style={s.featureRow}>
                <span style={s.featureName}>{a.name}. </span>{a.desc}
              </div>
            ))}
          </>
        )}

        {creature.legendary && creature.legendary.length > 0 && (
          <>
            <div style={{ ...s.legendaryHeader, marginTop: '12px' }}>Legendary Actions</div>
            <div style={{ ...s.featureRow, marginBottom: '6px' }}>{creature.legendaryDesc}</div>
            {creature.legendary.map((l, i) => (
              <div key={i} style={s.featureRow}>
                <span style={s.featureName}>{l.name}. </span>{l.desc}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { StatBlock });
