import '../ui_kits/app/components/ColorPicker.jsx'

const ColorPicker = window.ColorPicker

export default {
  title: 'Inputs & Forms/ColorPicker',
  component: ColorPicker,
  decorators: [(Story) => <div style={{ padding: 32 }}><Story /></div>],
  argTypes: {
    allowCustom: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' }
  }
}

export const TokenPalette = {
  args: {
    label: 'Sigil Pigment',
    defaultValue: '#7a1212',
    allowCustom: true
  }
}

export const PaletteOnly = {
  args: {
    label: 'Banner Colour',
    defaultValue: '#2d5a3d',
    allowCustom: false
  }
}

export const CustomPalette = {
  args: {
    label: 'House Heraldry',
    palette: [
      { name: 'Crimson', value: '#7a1212' },
      { name: 'Royal',   value: '#1e3a5f' },
      { name: 'Forest',  value: '#2d5a3d' },
      { name: 'Argent',  value: '#f5ecd7' },
      { name: 'Sable',   value: '#1a1410' },
      { name: 'Or',      value: '#b8893b' }
    ],
    defaultValue: '#1e3a5f'
  }
}

export const Disabled = {
  args: {
    label: 'Sealed Pigment',
    defaultValue: '#7a5a22',
    disabled: true
  }
}
