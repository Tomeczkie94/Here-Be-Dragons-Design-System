// Checkbox.jsx — Medieval manuscript-styled checkbox component
// Variants: 'standard' (ink), 'arcane' (emerald), 'danger' (blood)
// Supports: checked, indeterminate, disabled states; controlled + uncontrolled

const CheckboxCheck = ({ color }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12"
    aria-hidden="true" focusable="false"
    fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      points="1.5,6 4.5,9.5 10.5,2.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckboxMinus = ({ color }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12"
    aria-hidden="true" focusable="false"
    fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="2.5" y1="6" x2="9.5" y2="6"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const VARIANT_CONFIG = {
  standard: {
    boxBorder:      '#3d2817',
    boxBorderHover: '#1a1410',
    checkedBg:      '#3d2817',
    checkedBorder:  '#3d2817',
    checkColor:     '#f5ecd7',
    focusOutline:   '#7a5a22',
    labelColor:     '#1a1410',
  },
  arcane: {
    boxBorder:      '#2d5a3d',
    boxBorderHover: '#1a3d28',
    checkedBg:      '#2d5a3d',
    checkedBorder:  '#2d5a3d',
    checkColor:     '#f5ecd7',
    focusOutline:   '#2d5a3d',
    labelColor:     '#1a1410',
  },
  danger: {
    boxBorder:      '#7a1212',
    boxBorderHover: '#4a0808',
    checkedBg:      '#7a1212',
    checkedBorder:  '#7a1212',
    checkColor:     '#f5ecd7',
    focusOutline:   '#7a1212',
    labelColor:     '#1a1410',
  },
};

const Checkbox = ({
  label,
  description,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  variant = 'standard',
  onChange,
  id,
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const inputRef = React.useRef(null);
  const checkboxId = id || `checkbox-${React.useId ? React.useId() : Math.random().toString(36).slice(2)}`;

  const isChecked = isControlled ? checked : internalChecked;
  const c = VARIANT_CONFIG[variant] || VARIANT_CONFIG.standard;

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !isChecked;
    }
  }, [indeterminate, isChecked]);

  const handleChange = (e) => {
    if (disabled) return;
    if (!isControlled) setInternalChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  const boxStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    flexShrink: 0,
    border: `2px solid ${
      disabled ? '#a88d5a' :
      isChecked || indeterminate ? c.checkedBorder :
      hovered ? c.boxBorderHover : c.boxBorder
    }`,
    borderRadius: '1px',
    background: isChecked || indeterminate
      ? (disabled ? '#a88d5a' : c.checkedBg)
      : (hovered && !disabled ? 'rgba(212,188,136,0.35)' : '#f5ecd7'),
    transition: 'background 0.12s ease, border-color 0.12s ease',
    boxShadow: isChecked && !disabled
      ? `2px 2px 0 ${variant === 'danger' ? '#4a0808' : variant === 'arcane' ? '#1a3d28' : '#1a1410'}`
      : 'none',
    outline: focused ? `2px solid ${c.focusOutline}` : 'none',
    outlineOffset: focused ? '2px' : '0',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
  };

  const wrapperStyle = {
    display: 'inline-flex',
    alignItems: description ? 'flex-start' : 'center',
    gap: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.52 : 1,
    padding: '2px 0',
    userSelect: 'none',
  };

  const labelColStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const labelStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    color: disabled ? '#6b4f35' : c.labelColor,
  };

  const descStyle = {
    fontFamily: '"IM Fell English",serif',
    fontStyle: 'italic',
    fontSize: '12px',
    lineHeight: 1.55,
    color: disabled ? '#a88d5a' : '#6b4f35',
  };

  return (
    <label
      htmlFor={checkboxId}
      style={wrapperStyle}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hidden native input — fully accessible */}
      <input
        ref={inputRef}
        type="checkbox"
        id={checkboxId}
        checked={isControlled ? isChecked : undefined}
        defaultChecked={!isControlled ? internalChecked : undefined}
        disabled={disabled}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'absolute',
          width: '1px', height: '1px',
          padding: 0, margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
        aria-checked={indeterminate && !isChecked ? 'mixed' : isChecked}
      />
      {/* Custom visual checkbox */}
      <span style={boxStyle} aria-hidden="true">
        {(isChecked && !indeterminate) && <CheckboxCheck color={c.checkColor} />}
        {(indeterminate && !isChecked) && <CheckboxMinus color={c.checkColor} />}
      </span>
      {/* Label + optional description */}
      {(label || description) && (
        <span style={labelColStyle}>
          {label && <span style={labelStyle}>{label}</span>}
          {description && <span style={descStyle}>{description}</span>}
        </span>
      )}
    </label>
  );
};

// CheckboxGroup — labelled group of related checkboxes
const CheckboxGroup = ({ legend, children, style }) => {
  const groupStyle = {
    border: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    ...style,
  };
  const legendStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
    fontSize: '11px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#7a5a22',
    marginBottom: '8px',
    display: 'block',
    float: 'left',
    width: '100%',
    paddingBottom: '6px',
    borderBottom: '1px dashed #6b4f35',
  };
  return (
    <fieldset style={groupStyle}>
      {legend && <legend style={legendStyle}>{legend}</legend>}
      {children}
    </fieldset>
  );
};

Object.assign(window, { Checkbox, CheckboxGroup });
