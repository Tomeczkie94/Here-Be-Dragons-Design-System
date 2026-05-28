import '../ui_kits/app/components/OTPInput.jsx'

const OTPInput = window.OTPInput

export default {
  title: 'Inputs & Forms/OTPInput',
  component: OTPInput,
  decorators: [(Story) => <div style={{ padding: 32 }}><Story /></div>],
  argTypes: {
    length: { control: { type: 'number', min: 3, max: 10, step: 1 } },
    mode: { control: 'radio', options: ['numeric', 'alphanumeric'] },
    variant: { control: 'select', options: ['standard', 'arcane', 'danger'] },
    mask: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    label: { control: 'text' }
  }
}

export const SixDigit = {
  args: {
    label: 'Sealed Sigil — six runes',
    length: 6,
    mode: 'numeric'
  }
}

export const FourDigit = {
  args: {
    label: 'Vault Cipher',
    length: 4,
    mode: 'numeric',
    variant: 'arcane'
  }
}

export const Alphanumeric = {
  args: {
    label: 'Rune Sequence',
    length: 5,
    mode: 'alphanumeric'
  }
}

export const Masked = {
  args: {
    label: 'Secret Word',
    length: 6,
    mode: 'alphanumeric',
    mask: true,
    variant: 'danger'
  }
}

export const Disabled = {
  args: {
    label: 'Locked Cipher',
    length: 6,
    defaultValue: '731912',
    disabled: true
  }
}

export const Controlled = {
  render: () => {
    const [code, setCode] = React.useState('')
    const [completed, setCompleted] = React.useState(null)
    return (
      <div>
        <OTPInput
          label="Live OTP"
          length={6}
          value={code}
          onChange={setCode}
          onComplete={setCompleted}
        />
        <p style={{ marginTop: 16, fontFamily: '"IM Fell English",serif', fontStyle: 'italic', color: '#3d2817' }}>
          Current: <strong>{code || '—'}</strong>
          {completed && <span> · Completed: <strong>{completed}</strong></span>}
        </p>
      </div>
    )
  }
}
