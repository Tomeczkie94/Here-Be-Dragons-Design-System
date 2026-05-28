import '../ui_kits/app/components/TimePicker.jsx'

const TimePicker = window.TimePicker

export default {
  title: 'Inputs & Forms/TimePicker',
  component: TimePicker,
  decorators: [(Story) => <div style={{ padding: 32 }}><Story /></div>],
  argTypes: {
    format: { control: 'radio', options: ['12h', '24h'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' }
  }
}

export const TwentyFourHour = {
  args: {
    label: 'Departure',
    format: '24h',
    defaultValue: { hour: 21, minute: 37 }
  }
}

export const TwelveHour = {
  args: {
    label: 'Council Meeting',
    format: '12h',
    defaultValue: { hour: 7, minute: 15, period: 'PM' }
  }
}

export const Midnight = {
  args: {
    label: 'Midnight Watch',
    format: '24h',
    defaultValue: { hour: 0, minute: 0 }
  }
}

export const Disabled = {
  args: {
    label: 'Fixed Schedule',
    format: '24h',
    defaultValue: { hour: 12, minute: 0 },
    disabled: true
  }
}

export const Controlled = {
  render: () => {
    const [t, setT] = React.useState({ hour: 9, minute: 41 })
    return (
      <div>
        <TimePicker label="Pick a time" format="24h" value={t} onChange={setT} />
        <p style={{ marginTop: 16, fontFamily: '"IM Fell English",serif', fontStyle: 'italic', color: '#3d2817' }}>
          Selected: <strong>{String(t.hour).padStart(2,'0')}:{String(t.minute).padStart(2,'0')}</strong>
        </p>
      </div>
    )
  }
}
