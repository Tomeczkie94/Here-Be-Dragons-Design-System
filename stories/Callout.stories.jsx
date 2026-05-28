import '../ui_kits/app/components/Callout.jsx'

const Callout = window.Callout

export default {
  title: 'Components/Callout',
  component: Callout,
  decorators: [(Story) => <div style={{ maxWidth: 560, padding: 24 }}><Story /></div>],
  argTypes: {
    type: { control: 'select', options: ['standard', 'arcane', 'danger'] },
    label: { control: 'text' }
  }
}

export const Standard = {
  args: {
    type: 'standard',
    label: 'Sage Advice',
    children: 'When a spell description says half damage, the target takes half damage on a successful save and full damage on a failure.'
  }
}

export const Arcane = {
  args: {
    type: 'arcane',
    label: 'Arcane Lore',
    children: 'Schools of magic are not rigid disciplines but overlapping currents of the Weave, distinguished mostly by tradition.'
  }
}

export const Danger = {
  args: {
    type: 'danger',
    label: 'Beware',
    children: 'Stepping into the circle of standing stones without uttering the rite is said to invite the attention of older, hungrier things.'
  }
}
