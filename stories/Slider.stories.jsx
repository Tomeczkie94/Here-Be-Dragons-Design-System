import '../ui_kits/app/components/Slider.jsx'

const Slider = window.Slider

export default {
  title: 'Inputs & Forms/Slider',
  component: Slider,
  decorators: [(Story) => <div style={{ padding: 32, maxWidth: 420 }}><Story /></div>],
  argTypes: {
    variant: { control: 'select', options: ['standard', 'arcane', 'danger', 'gold'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    showTicks: { control: 'boolean' },
    suffix: { control: 'text' },
    label: { control: 'text' }
  }
}

export const HitPoints = {
  args: {
    label: 'Hit Points',
    variant: 'danger',
    min: 0, max: 178, step: 1,
    defaultValue: 132,
    suffix: ' / 178',
    showTicks: false
  }
}

export const ManaReserve = {
  args: {
    label: 'Mana Reserve',
    variant: 'arcane',
    min: 0, max: 100, step: 1,
    defaultValue: 65,
    suffix: '%',
    showTicks: true
  }
}

export const ExperienceLevel = {
  args: {
    label: 'XP to Next Level',
    variant: 'gold',
    min: 0, max: 1000, step: 50,
    defaultValue: 450,
    suffix: ' xp'
  }
}

export const Standard = {
  args: {
    label: 'Encounter Difficulty',
    variant: 'standard',
    min: 1, max: 20, step: 1,
    defaultValue: 10,
    showTicks: true
  }
}

export const Disabled = {
  args: {
    label: 'Locked Stat',
    variant: 'standard',
    min: 0, max: 100,
    defaultValue: 50,
    disabled: true
  }
}
