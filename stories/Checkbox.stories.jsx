import '../ui_kits/app/components/Checkbox.jsx'

const Checkbox = window.Checkbox
const CheckboxGroup = window.CheckboxGroup

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 420 }}><Story /></div>],
  argTypes: {
    variant: { control: 'select', options: ['standard', 'arcane', 'danger'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' }
  }
}

export const Standard = { args: { label: 'Longswords', defaultChecked: true, variant: 'standard' } }

export const Arcane = {
  args: {
    label: 'Verbal',
    description: 'Spoken incantation',
    defaultChecked: true,
    variant: 'arcane'
  }
}

export const Danger = { args: { label: 'Poisoned', variant: 'danger', defaultChecked: true } }

export const Unchecked = { args: { label: 'Heavy Armor', variant: 'standard' } }

export const Indeterminate = { args: { label: 'Mixed Selection', indeterminate: true, variant: 'standard' } }

export const Disabled = { args: { label: 'Unavailable', disabled: true, defaultChecked: true } }

export const Group = {
  render: () => (
    <CheckboxGroup legend="Weapon Proficiencies">
      <Checkbox label="Longswords" defaultChecked />
      <Checkbox label="Shortswords" defaultChecked />
      <Checkbox label="Crossbows" />
      <Checkbox label="Greataxes" />
      <Checkbox label="Handaxes" defaultChecked />
    </CheckboxGroup>
  )
}

export const ConditionsGroup = {
  render: () => (
    <CheckboxGroup legend="Active Conditions">
      <Checkbox variant="danger" label="Charmed" />
      <Checkbox variant="danger" label="Frightened" defaultChecked />
      <Checkbox variant="danger" label="Paralyzed" />
      <Checkbox variant="danger" label="Poisoned" defaultChecked />
    </CheckboxGroup>
  )
}
