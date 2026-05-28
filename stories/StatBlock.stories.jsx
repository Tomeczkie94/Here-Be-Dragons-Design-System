import '../ui_kits/app/components/StatBlock.jsx'

const StatBlock = window.StatBlock

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
    { name: 'Fire Breath (Recharge 5–6)', desc: 'The dragon exhales fire in a 30-foot cone. DC 17 Dexterity save, 56 (16d6) fire damage on a failed save, or half on a success.' }
  ]
}

const GOBLIN = {
  name: 'Goblin',
  type: 'Small Humanoid (Goblinoid), Neutral Evil',
  ac: '15 (leather armor, shield)',
  hp: '7 (2d6)',
  speed: '30 ft.',
  abilities: { STR: 8, DEX: 14, CON: 10, INT: 10, WIS: 8, CHA: 8 },
  senses: 'darkvision 60 ft., passive Perception 9',
  languages: 'Common, Goblin',
  challenge: '1/4 (50 XP)',
  traits: [
    { name: 'Nimble Escape', desc: 'The goblin can take the Disengage or Hide action as a bonus action on each of its turns.' }
  ],
  actions: [
    { name: 'Scimitar', desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.' },
    { name: 'Shortbow', desc: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' }
  ]
}

export default {
  title: 'Components/StatBlock',
  component: StatBlock,
  decorators: [(Story) => <div style={{ maxWidth: 560, padding: 24 }}><Story /></div>]
}

export const Dragon = { args: { creature: DRAGON } }

export const Goblin = { args: { creature: GOBLIN } }
