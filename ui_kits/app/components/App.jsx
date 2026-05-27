// App.jsx — Root composition for the Adventurer's Compendium
// Composes Navigation + section views into a product shell.

const SPELLS = [
  { id: 1, name: 'Fireball', school: 'Evocation', level: 3, castingTime: '1 action', range: '150 feet', components: 'V, S, M', duration: 'Instantaneous', flavor: 'A bright streak flashes to a point and blossoms into an explosion of flame.' },
  { id: 2, name: 'Detect Magic', school: 'Divination', level: 1, castingTime: '1 action', range: 'Self (30 ft)', components: 'V, S', duration: '10 minutes', flavor: 'You sense the presence of magic within 30 feet, perceiving its aura and school.' },
  { id: 3, name: 'Misty Step', school: 'Conjuration', level: 2, castingTime: 'Bonus action', range: 'Self', components: 'V', duration: 'Instantaneous', flavor: 'Surrounded by silver mist, you teleport up to 30 feet to an unoccupied space.' },
  { id: 4, name: 'Counterspell', school: 'Abjuration', level: 3, castingTime: '1 reaction', range: '60 feet', components: 'S', duration: 'Instantaneous', flavor: 'Interrupt a creature in the process of casting a spell.' },
  { id: 5, name: 'Animate Dead', school: 'Necromancy', level: 3, castingTime: '1 minute', range: '10 feet', components: 'V, S, M', duration: 'Instantaneous', flavor: 'This spell creates an undead servant.' },
  { id: 6, name: 'Minor Illusion', school: 'Illusion', level: 0, castingTime: '1 action', range: '30 feet', components: 'S, M', duration: '1 minute', flavor: 'You create a sound or an image of an object within range.' },
  { id: 7, name: 'Polymorph', school: 'Transmutation', level: 4, castingTime: '1 action', range: '60 feet', components: 'V, S, M', duration: '1 hour', flavor: 'This spell transforms a creature that you can see within range into a new form.' },
  { id: 8, name: 'Charm Person', school: 'Enchantment', level: 1, castingTime: '1 action', range: '30 feet', components: 'V, S', duration: '1 hour', flavor: 'You attempt to charm a humanoid you can see within range.' },
];

const DRAGON = {
  name: 'Young Red Dragon',
  type: 'Large Dragon, Chaotic Evil',
  ac: '18 (natural armor)',
  hp: '178 (17d10 + 85)',
  speed: '40 ft., climb 40 ft., fly 80 ft.',
  abilities: { STR: 23, DEX: 10, CON: 21, INT: 14, WIS: 11, CHA: 19 },
  savingThrows: 'Dex +4, Con +9, Wis +4, Cha +8',
  senses: 'blindsight 30 ft., darkvision 120 ft.',
  languages: 'Common, Draconic',
  challenge: '10 (5,900 XP)',
  traits: [],
  actions: [
    { name: 'Multiattack', desc: 'The dragon makes three attacks: one with its bite and two with its claws.' },
    { name: 'Fire Breath (Recharge 5–6)', desc: 'The dragon exhales fire in a 30-foot cone. DC 17 Dexterity save, 56 (16d6) fire damage on a failed save, or half on a success.' },
  ],
};

const EQUIPMENT = [
  { id: 1, name: 'Flame Tongue', type: 'Weapon (longsword)', rarity: 'Rare', attunement: true, weight: '3 lb.', value: '—', description: 'You can use a bonus action to speak this magic sword\'s command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius.', properties: ['Versatile (1d10)', '+2d6 fire damage while active', 'Bonus action to ignite/extinguish'] },
  { id: 2, name: 'Bag of Holding', type: 'Wondrous Item', rarity: 'Uncommon', attunement: false, weight: '15 lb.', value: '—', description: 'This bag has an interior space considerably larger than its outside dimensions. The bag can hold up to 500 pounds of material, not exceeding a volume of 64 cubic feet.', properties: ['500 lb. / 64 cu. ft. capacity', 'Breathing creature survives 10 minutes inside', 'Piercing destroys the bag'] },
  { id: 3, name: 'Sword of Life Stealing', type: 'Weapon (any sword)', rarity: 'Very Rare', attunement: true, weight: '3 lb.', value: '—', description: 'When you roll a 20 on the attack roll with this weapon, the target takes an extra 10 necrotic damage if it isn\'t a construct or undead. You also gain 10 temporary hit points.', properties: ['Critical hit: +10 necrotic damage', 'Gain 10 temp HP on critical kill'] },
  { id: 4, name: 'Staff of Power', type: 'Staff', rarity: 'Legendary', attunement: true, weight: '4 lb.', value: '—', description: 'A +2 magic quarterstaff. While holding it, gain a +2 bonus to Armor Class, saving throws, and spell attack rolls.', properties: ['Requires Attunement (sorcerer/warlock/wizard)', '+2 to AC, saves, spell attacks', '20 charges — regains 2d8+4 at dawn', 'Retributive Strike: expend all charges'] },
  { id: 5, name: 'Ring of Protection', type: 'Ring', rarity: 'Rare', attunement: true, weight: '—', value: '—', description: 'You gain a +1 bonus to AC and saving throws while wearing this ring.', properties: ['+1 to AC', '+1 to all saving throws'] },
  { id: 6, name: 'Potion of Healing', type: 'Potion', rarity: 'Common', attunement: false, weight: '½ lb.', value: '50 gp', description: 'You regain 2d4+2 hit points when you drink this potion. The potion\'s red liquid glimmers when agitated.', properties: ['Restores 2d4+2 HP', 'Drinking or administering takes 1 action'] },
];

const CLASS_FEATURES = [
  { title: 'Arcane Recovery', type: 'arcane', label: 'Wizard Feature (Level 1)', body: 'Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.' },
  { title: 'Second Wind', type: 'standard', label: 'Fighter Feature (Level 1)', body: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.' },
  { title: 'Sneak Attack', type: 'danger', label: 'Rogue Feature (Level 1)', body: 'Beginning at 1st level, you know how to strike subtly and exploit a foe\'s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The amount of extra damage increases as you gain levels in this class.' },
  { title: 'Channel Divinity', type: 'standard', label: 'Cleric Feature (Level 2)', body: 'At 2nd level, you gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain. Some domains grant you additional effects as you advance in levels.' },
];

const CharacterSheet = () => {
  const [profWeapons, setProfWeapons]   = React.useState({ longswords: true, shortswords: true, crossbows: false, greataxes: false, handaxes: true });
  const [profArmour, setProfArmour]     = React.useState({ light: true, medium: true, heavy: false, shields: true });
  const [conditions, setConditions]     = React.useState({ charmed: false, frightened: false, paralyzed: false, poisoned: false, stunned: false, exhausted: false });
  const [spellComps, setSpellComps]     = React.useState({ verbal: true, somatic: true, material: false });
  const [languages, setLanguages]       = React.useState({ common: true, elvish: true, dwarvish: false, draconic: false, thieves: true });

  const toggle = (setter, key) => setter(prev => ({ ...prev, [key]: !prev[key] }));

  const sectionStyle = {
    marginBottom: '32px',
    padding: '20px 24px',
    background: 'linear-gradient(135deg, #f5ecd7, #ead9b3)',
    border: '2px solid #3d2817',
    boxShadow: '4px 4px 0 #a88d5a',
  };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px 24px' };

  return (
    <div>
      {/* Weapon Proficiencies */}
      <div style={sectionStyle}>
        <CheckboxGroup legend="Weapon Proficiencies" style={{ gap: '10px' }}>
          <div style={gridStyle}>
            {Object.entries(profWeapons).map(([key, val]) => (
              <Checkbox
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                checked={val}
                onChange={() => toggle(setProfWeapons, key)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* Armour Proficiencies */}
      <div style={sectionStyle}>
        <CheckboxGroup legend="Armour Proficiencies" style={{ gap: '10px' }}>
          <div style={gridStyle}>
            {Object.entries(profArmour).map(([key, val]) => (
              <Checkbox
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                checked={val}
                onChange={() => toggle(setProfArmour, key)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* Active Conditions */}
      <div style={sectionStyle}>
        <CheckboxGroup legend="Active Conditions" style={{ gap: '10px' }}>
          <div style={gridStyle}>
            {Object.entries(conditions).map(([key, val]) => (
              <Checkbox
                key={key}
                variant="danger"
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                checked={val}
                onChange={() => toggle(setConditions, key)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* Spell Components */}
      <div style={sectionStyle}>
        <CheckboxGroup legend="Spell Components Available" style={{ gap: '10px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
            {Object.entries(spellComps).map(([key, val]) => (
              <Checkbox
                key={key}
                variant="arcane"
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                description={key === 'verbal' ? 'Spoken incantation' : key === 'somatic' ? 'Precise hand gesture' : 'Physical component'}
                checked={val}
                onChange={() => toggle(setSpellComps, key)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* Languages */}
      <div style={sectionStyle}>
        <CheckboxGroup legend="Languages Known" style={{ gap: '10px' }}>
          <div style={gridStyle}>
            {Object.entries(languages).map(([key, val]) => (
              <Checkbox
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                checked={val}
                onChange={() => toggle(setLanguages, key)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = React.useState('spells');
  const [selectedSpell, setSelectedSpell]   = React.useState(null);

  const shellStyles = {
    app: {
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: '#f5ecd7', fontFamily: '"Roboto",Georgia,serif',
    },
    main: {
      flex: 1, display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative', zIndex: 2,
    },
    content: { flex: 1, overflowY: 'auto' },
    inner: { padding: '32px', maxWidth: '900px' },
    placeholder: {
      padding: '48px 32px',
      fontFamily: '"IM Fell English",serif', fontStyle: 'italic',
      fontSize: '17px', color: '#6b4f35', lineHeight: 1.7,
    },
    detailPanel: {
      padding: '20px 32px', borderTop: '2px double #7a5a22',
      background: '#ead9b3', maxHeight: '240px', overflowY: 'auto',
    },
    detailTitle: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '22px', fontWeight: 700, letterSpacing: '0.02em',
      color: '#1a1410', marginBottom: '6px',
    },
    detailMeta: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
      color: '#7a5a22', marginBottom: '10px', display: 'block',
    },
    detailFlavor: {
      fontFamily: '"IM Fell English",serif', fontStyle: 'italic',
      fontSize: '15px', lineHeight: 1.7, color: '#3d2817',
    },
    closeBtn: {
      background: 'transparent', border: 'none', cursor: 'pointer',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px', letterSpacing: '0.2em', color: '#7a5a22',
      textTransform: 'uppercase', padding: '0 0 10px 0', display: 'block',
    },
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'spells':
        return (
          <main style={shellStyles.content}>
            <HeroSection
              meta="Arcane Knowledge"
              title="Spell Compendium"
              subtitle="A complete index of arcane and divine formulae, catalogued by school and level for the discerning adventurer."
            />
            <div style={shellStyles.inner}>
              <SpellGrid spells={SPELLS} onSelectSpell={setSelectedSpell} selectedSpell={selectedSpell}/>
            </div>
            {selectedSpell && (
              <div style={shellStyles.detailPanel}>
                <button style={shellStyles.closeBtn} onClick={() => setSelectedSpell(null)}>← Close</button>
                <span style={shellStyles.detailMeta}>{selectedSpell.school} · {selectedSpell.level === 0 ? 'Cantrip' : `Level ${selectedSpell.level}`} · {selectedSpell.components}</span>
                <div style={shellStyles.detailTitle}>{selectedSpell.name}</div>
                <p style={shellStyles.detailFlavor}>{selectedSpell.flavor}</p>
              </div>
            )}
          </main>
        );

      case 'monsters':
        return (
          <main style={shellStyles.content}>
            <HeroSection
              meta="Bestiary"
              title="Monster Compendium"
              subtitle="Stat blocks for every creature that haunts the realms — from the humblest goblin to the eldest wyrm."
            />
            <div style={shellStyles.inner}>
              <StatBlock creature={DRAGON}/>
            </div>
          </main>
        );

      case 'equipment':
        return (
          <main style={shellStyles.content}>
            <HeroSection
              meta="Treasure & Arms"
              title="Equipment"
              subtitle="Mundane arms, magic items, and legendary relics catalogued for the well-prepared adventurer."
            />
            <div style={shellStyles.inner}>
              <EquipmentGrid items={EQUIPMENT}/>
            </div>
          </main>
        );

      case 'classes':
        return (
          <main style={shellStyles.content}>
            <HeroSection
              meta="Heroic Paths"
              title="Class Features"
              subtitle="The defining abilities of every heroic archetype — powers granted by training, blessing, and arcane study."
            />
            <div style={shellStyles.inner}>
              {CLASS_FEATURES.map((f, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <Callout type={f.type} label={f.label}>
                    <strong style={{ fontFamily: '"Tiamat Condensed SC","Cinzel",serif', fontStyle: 'normal', fontSize: '14px', letterSpacing: '0.05em', color: '#1a1410', display: 'block', marginBottom: '4px' }}>{f.title}</strong>
                    {f.body}
                  </Callout>
                </div>
              ))}
            </div>
          </main>
        );

      case 'dice':
        return (
          <main style={shellStyles.content}>
            <HeroSection
              meta="Fortune's Hand"
              title="Dice Roller"
              subtitle="Build your dice pool, cast the bones, and let fate decide. Supports d4 through d20 with full roll history."
            />
            <DiceRoller/>
          </main>
        );

      case 'character':
        return (
          <main style={shellStyles.content}>
            <HeroSection
              meta="Adventurer's Record"
              title="Character Sheet"
              subtitle="Proficiencies, traits, conditions, and spell components — the full accounting of an adventurer's capabilities."
            />
            <div style={shellStyles.inner}>
              <CharacterSheet />
            </div>
          </main>
        );

      case 'initiative':
        return (
          <main style={shellStyles.content}>
            <HeroSection
              meta="Battle Order"
              title="Initiative Tracker"
              subtitle="Coming soon — track combat order, conditions, and hit points for every combatant in the encounter."
            />
            <div style={shellStyles.placeholder}>
              <em>"The scribes are still preparing this section of the compendium. Return when the ink has dried."</em>
            </div>
          </main>
        );

      default:
        return (
          <main style={shellStyles.content}>
            <div style={shellStyles.placeholder}>
              <em>"This section of the compendium remains unwritten. Return when the scribes have finished their work."</em>
            </div>
          </main>
        );
    }
  };

  return (
    <div style={shellStyles.app}>
      <Navigation activeSection={activeSection} onNavigate={setActiveSection}/>
      <div style={shellStyles.main}>{renderContent()}</div>
    </div>
  );
};

Object.assign(window, { App });
