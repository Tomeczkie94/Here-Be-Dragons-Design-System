import '../ui_kits/app/components/SpellCard.jsx'

const SpellCard = window.SpellCard

const baseSpell = {
  id: 1,
  name: 'Fireball',
  school: 'Evocation',
  level: 3,
  castingTime: '1 action',
  range: '150 feet',
  components: 'V, S, M',
  duration: 'Instantaneous',
  flavor: 'A bright streak flashes to a point and blossoms into an explosion of flame.'
}

export default {
  title: 'Components/SpellCard',
  component: SpellCard,
  decorators: [(Story) => <div style={{ maxWidth: 280, padding: 24 }}><Story /></div>],
  argTypes: {
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' }
  }
}

export const Evocation = { args: { spell: baseSpell, selected: false } }

export const Selected = { args: { spell: baseSpell, selected: true } }

export const Cantrip = {
  args: {
    spell: {
      id: 2,
      name: 'Minor Illusion',
      school: 'Illusion',
      level: 0,
      castingTime: '1 action',
      range: '30 feet',
      components: 'S, M',
      duration: '1 minute',
      flavor: 'You create a sound or an image of an object within range.'
    },
    selected: false
  }
}

export const Necromancy = {
  args: {
    spell: {
      id: 3,
      name: 'Animate Dead',
      school: 'Necromancy',
      level: 3,
      castingTime: '1 minute',
      range: '10 feet',
      components: 'V, S, M',
      duration: 'Instantaneous',
      flavor: 'This spell creates an undead servant.'
    },
    selected: false
  }
}
