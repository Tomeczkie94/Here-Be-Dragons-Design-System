/*
 * OTPInput — Here Be Dragons Design System
 *
 * Props:
 *   length       {number}                    Default 6
 *   value        {string|undefined}          Controlled — full string e.g. "123456"
 *   defaultValue {string}                    Uncontrolled initial value, default ''
 *   onChange     {(val: string) => void}     Called on every character change
 *   onComplete   {(val: string) => void}     Called when all digits/chars are filled
 *   disabled     {boolean}                   Default false
 *   type         {'numeric'|'alphanumeric'}  Default 'numeric'
 *   label        {string|null}               Label rendered above inputs
 *   error        {string|null}               Error message shown below in blood colour
 *   hint         {string|null}               Hint text shown below in italic flavor
 *   id           {string|null}               Applied to the first input element
 */

const FONT_DISPLAY_OTP = '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif';
const FONT_FLAVOR_OTP  = '"IM Fell English",Georgia,serif';

function otpIsValid(ch, type) {
  if (!ch) return false;
  if (type === 'numeric') return /^[0-9]$/.test(ch);
  return /^[A-Za-z0-9]$/.test(ch);
}

function otpNormalizeChar(ch, type) {
  if (!ch) return '';
  if (type === 'alphanumeric') return ch.toUpperCase();
  return ch;
}

function OTPInput({
  length = 6,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  disabled = false,
  type = 'numeric',
  label = null,
  error = null,
  hint = null,
  id = null,
}) {
  const isControlled = value !== undefined;

  // Build initial chars array from defaultValue / value
  function buildChars(raw) {
    const src = (raw || '').slice(0, length);
    return Array.from({ length }, (_, i) => src[i] || '');
  }

  const [chars, setChars] = React.useState(() => buildChars(isControlled ? value : defaultValue));

  // Sync from controlled value
  React.useEffect(() => {
    if (isControlled) {
      setChars(buildChars(value));
    }
  }, [value, isControlled, length]);

  // Refs — one per input
  const refs = React.useRef(Array.from({ length }, () => React.createRef()));

  // Ensure refs array length matches length prop
  React.useEffect(() => {
    refs.current = Array.from({ length }, (_, i) => refs.current[i] || React.createRef());
  }, [length]);

  function focusSlot(i) {
    const ref = refs.current[i];
    if (ref && ref.current) {
      ref.current.focus();
      ref.current.select && ref.current.select();
    }
  }

  function commitChars(nextChars) {
    const str = nextChars.join('');
    if (!isControlled) setChars(nextChars);
    if (onChange) onChange(str);
    if (str.length === length && nextChars.every(c => c !== '') && onComplete) {
      onComplete(str);
    }
  }

  function handleChange(i, e) {
    if (disabled) return;
    // Take the last character typed (handles browser inserting previous value + new char)
    const raw = e.target.value;
    const ch = raw.slice(-1);
    if (!otpIsValid(ch, type)) return;
    const normed = otpNormalizeChar(ch, type);
    const next = chars.slice();
    next[i] = normed;
    commitChars(next);
    if (i < length - 1) {
      // Advance after state update
      setTimeout(() => focusSlot(i + 1), 0);
    }
  }

  function handleKeyDown(i, e) {
    if (disabled) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = chars.slice();
      if (next[i] !== '') {
        // Current box is filled — clear it, stay
        next[i] = '';
        commitChars(next);
      } else if (i > 0) {
        // Current box is empty — clear previous and move back
        next[i - 1] = '';
        commitChars(next);
        focusSlot(i - 1);
      }
      return;
    }

    if (e.key === 'Delete') {
      e.preventDefault();
      const next = chars.slice();
      next[i] = '';
      commitChars(next);
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (i > 0) focusSlot(i - 1);
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (i < length - 1) focusSlot(i + 1);
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      focusSlot(0);
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      focusSlot(length - 1);
      return;
    }
  }

  function handlePaste(i, e) {
    if (disabled) return;
    e.preventDefault();
    const raw = e.clipboardData.getData('text') || '';
    const filtered = Array.from(raw).filter(ch => otpIsValid(ch, type)).map(ch => otpNormalizeChar(ch, type));
    if (filtered.length === 0) return;
    const next = chars.slice();
    let cursor = i;
    for (const ch of filtered) {
      if (cursor >= length) break;
      next[cursor] = ch;
      cursor++;
    }
    commitChars(next);
    // Focus end of pasted content (clamped to last index)
    const focusTarget = Math.min(cursor, length - 1);
    setTimeout(() => focusSlot(focusTarget), 0);
  }

  // ── Styles ──────────────────────────────────────────────────────────────

  const gap = length >= 7 ? '6px' : '8px';

  function inputBoxStyle(i) {
    const ch = chars[i];
    const isFilled = ch !== '';
    const hasError = !!error;

    let bg       = '#f5ecd7';
    let border   = '1.5px solid #a88d5a';
    let color    = '#6b4f35';
    let boxShadow = 'none';

    if (hasError) {
      border = '1.5px solid #7a1212';
      color  = '#7a1212';
      bg     = '#f5ecd7';
    } else if (isFilled) {
      bg        = '#ead9b3';
      border    = '1.5px solid #3d2817';
      color     = '#1a1410';
      boxShadow = '2px 2px 0 #d4bc88';
    }

    return {
      width: '48px',
      height: '56px',
      textAlign: 'center',
      fontFamily: FONT_DISPLAY_OTP,
      fontSize: '1.5rem',
      letterSpacing: '0.05em',
      background: bg,
      border,
      borderRadius: '1px',
      boxShadow,
      color,
      outline: 'none',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
      padding: 0,
      caretColor: '#7a5a22',
      transition: 'background 0.08s, border-color 0.08s, box-shadow 0.08s',
    };
  }

  const separatorStyle = {
    fontFamily: FONT_DISPLAY_OTP,
    fontSize: '1rem',
    color: '#a88d5a',
    userSelect: 'none',
    alignSelf: 'center',
    lineHeight: 1,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <style>{`
        .hbd-otp-box:focus { outline: 2px solid #7a5a22; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .hbd-otp-box { transition: none !important; }
        }
      `}</style>

      {/* Label */}
      {label && (
        <span style={{
          fontFamily: FONT_DISPLAY_OTP,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#7a5a22',
          userSelect: 'none',
        }}>
          {label}
        </span>
      )}

      {/* Input row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap,
        }}
        role="group"
        aria-label={label || 'One-time code'}
      >
        {chars.map((ch, i) => (
          <React.Fragment key={i}>
            <input
              ref={refs.current[i]}
              id={i === 0 && id ? id : undefined}
              type="text"
              className="hbd-otp-box"
              inputMode={type === 'numeric' ? 'numeric' : 'text'}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={2}
              value={ch}
              disabled={disabled}
              aria-label={'Position ' + (i + 1) + ' of ' + length}
              style={inputBoxStyle(i)}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={(e) => handlePaste(i, e)}
              onFocus={(e) => e.target.select && e.target.select()}
            />
            {/* Visual separator between positions 3 and 4 for 6-digit codes */}
            {length === 6 && i === 2 && (
              <span style={separatorStyle} aria-hidden="true">—</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Error */}
      {error && (
        <span style={{
          fontFamily: FONT_DISPLAY_OTP,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          color: '#7a1212',
        }}
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}

      {/* Hint */}
      {hint && (
        <span style={{
          fontFamily: FONT_FLAVOR_OTP,
          fontStyle: 'italic',
          fontSize: '0.8125rem',
          color: '#6b4f35',
        }}>
          {hint}
        </span>
      )}
    </div>
  );
}

Object.assign(window, { OTPInput });
