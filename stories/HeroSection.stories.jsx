import '../ui_kits/app/components/HeroSection.jsx'

const HeroSection = window.HeroSection

export default {
  title: 'Components/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    meta: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' }
  }
}

export const Spells = {
  args: {
    meta: 'Arcane Knowledge',
    title: 'Spell Compendium',
    subtitle: 'A complete index of arcane and divine formulae, catalogued by school and level for the discerning adventurer.'
  }
}

export const Bestiary = {
  args: {
    meta: 'Bestiary',
    title: 'Monster Compendium',
    subtitle: 'Stat blocks for every creature that haunts the realms — from the humblest goblin to the eldest wyrm.'
  }
}

export const Equipment = {
  args: {
    meta: 'Treasure & Arms',
    title: 'Equipment',
    subtitle: 'Mundane arms, magic items, and legendary relics catalogued for the well-prepared adventurer.'
  }
}
