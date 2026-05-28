import '../ui_kits/app/components/Navigation.jsx'

const Navigation = window.Navigation

export default {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeSection: {
      control: 'select',
      options: ['spells', 'monsters', 'equipment', 'classes', 'character', 'dice', 'initiative']
    },
    onNavigate: { action: 'navigated' }
  }
}

export const Spells = { args: { activeSection: 'spells' } }
export const Monsters = { args: { activeSection: 'monsters' } }
export const DiceTool = { args: { activeSection: 'dice' } }
