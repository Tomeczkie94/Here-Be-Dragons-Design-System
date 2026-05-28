import '../ui_kits/app/components/SpellCard.jsx'
import '../ui_kits/app/components/SpellGrid.jsx'

const SpellGrid = window.SpellGrid

const SPELLS = [
  { id: 1, name: 'Fireball', school: 'Evocation', level: 3, castingTime: '1 action', range: '150 feet', components: 'V, S, M', duration: 'Instantaneous', flavor: 'A bright streak flashes to a point and blossoms into an explosion of flame.' },
  { id: 2, name: 'Detect Magic', school: 'Divination', level: 1, castingTime: '1 action', range: 'Self (30 ft)', components: 'V, S', duration: '10 minutes', flavor: 'You sense the presence of magic within 30 feet, perceiving its aura and school.' },
  { id: 3, name: 'Misty Step', school: 'Conjuration', level: 2, castingTime: 'Bonus action', range: 'Self', components: 'V', duration: 'Instantaneous', flavor: 'Surrounded by silver mist, you teleport up to 30 feet to an unoccupied space.' },
  { id: 4, name: 'Counterspell', school: 'Abjuration', level: 3, castingTime: '1 reaction', range: '60 feet', components: 'S', duration: 'Instantaneous', flavor: 'Interrupt a creature in the process of casting a spell.' },
  { id: 5, name: 'Animate Dead', school: 'Necromancy', level: 3, castingTime: '1 minute', range: '10 feet', components: 'V, S, M', duration: 'Instantaneous', flavor: 'This spell creates an undead servant.' },
  { id: 6, name: 'Minor Illusion', school: 'Illusion', level: 0, castingTime: '1 action', range: '30 feet', components: 'S, M', duration: '1 minute', flavor: 'You create a sound or an image of an object within range.' },
  { id: 7, name: 'Polymorph', school: 'Transmutation', level: 4, castingTime: '1 action', range: '60 feet', components: 'V, S, M', duration: '1 hour', flavor: 'This spell transforms a creature into a new form.' },
  { id: 8, name: 'Charm Person', school: 'Enchantment', level: 1, castingTime: '1 action', range: '30 feet', components: 'V, S', duration: '1 hour', flavor: 'You attempt to charm a humanoid you can see within range.' }
]

export default {
  title: 'Components/SpellGrid',
  component: SpellGrid,
  parameters: { layout: 'padded' },
  argTypes: { onSelectSpell: { action: 'selected' } }
}

export const FullCatalogue = { args: { spells: SPELLS, selectedSpell: null } }

export const EmptyState = { args: { spells: [], selectedSpell: null } }

export const SingleSpell = { args: { spells: [SPELLS[0]], selectedSpell: null } }
