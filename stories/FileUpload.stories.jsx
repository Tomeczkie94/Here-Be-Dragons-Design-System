import '../ui_kits/app/components/FileUpload.jsx'

const FileUpload = window.FileUpload

export default {
  title: 'Inputs & Forms/FileUpload',
  component: FileUpload,
  decorators: [(Story) => <div style={{ padding: 32, maxWidth: 480 }}><Story /></div>],
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    accept: { control: 'text' },
    maxSize: { control: 'number' }
  }
}

export const Single = {
  args: {
    label: 'Upload Map',
    hint: 'PNG, JPG or PDF. One file at a time.',
    accept: 'image/*,application/pdf',
    multiple: false
  }
}

export const Multiple = {
  args: {
    label: 'Upload Spell Scrolls',
    hint: 'Drag multiple scrolls or click to browse.',
    multiple: true
  }
}

export const ImagesOnly = {
  args: {
    label: 'Character Portrait',
    hint: 'JPG or PNG, max 2 MB.',
    accept: 'image/png,image/jpeg',
    maxSize: 2 * 1024 * 1024
  }
}

export const Disabled = {
  args: {
    label: 'Locked Archive',
    hint: 'Uploads disabled by the dungeon master.',
    disabled: true
  }
}
