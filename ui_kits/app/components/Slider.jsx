/*
 * Slider — Here Be Dragons Design System
 *
 * Custom div-based visual track over a native <input type="range">.
 * Full keyboard and mouse support via the native input; visual display
 * via positioned divs that respect all design-system constraints.
 *
 * Props:
 *   value        {number|undefined}    — controlled value
 *   defaultValue {number|undefined}    — uncontrolled initial value
 *   min          {number}              — default 0
 *   max          {number}              — default 100
 *   step         {number}              — default 1
 *   onChange     {(val: number)=>void}
 *   disabled     {boolean}             — default false
 *   label        {string|null}         — label text shown above track
 *   showValue    {boolean}             — default true — show current value badge
 *   valueSuffix  {string}              — default '' (e.g. "%", "px", "ms")
 *   marks        {boolean}             — default false — tick marks at 0%, 50%, 100%
 *   id           {string|null}
 */

const Slider = ({
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  label = null,
  showValue = true,
  valueSuffix = '',
  marks = false,
  id = null,
}) => {
  const isControlled = controlledValue !== undefined;

  const [internalValue, setInternalValue] = React.useState(
    defaultValue !== undefined ? defaultValue : min
  );
  const [focused, setFocused] = React.useState(false);

  const currentValue = isControlled ? controlledValue : internalValue;

  // Clamp to valid range
  const safeMin = min;
  const safeMax = max;
  const clampedValue = Math.min(safeMax, Math.max(safeMin, Number(currentValue)));
  const pct = safeMax === safeMin ? 0 : ((clampedValue - safeMin) / (safeMax - safeMin)) * 100;

  // Stable ID across renders
  const idRef = React.useRef(id || `hbd-slider-${Math.random().toString(36).slice(2, 9)}`);
  const inputId = idRef.current;

  const handleChange = (e) => {
    const newVal = Number(e.target.value);
    if (!isControlled) {
      setInternalValue(newVal);
    }
    if (onChange) onChange(newVal);
  };

  // ─── Styles ─────────────────────────────────────────────────────────────

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',
    opacity: disabled ? 0.6 : 1,
  };

  const labelRowStyle = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: label ? 'space-between' : 'flex-end',
    gap: '8px',
    marginBottom: '2px',
  };

  const labelTextStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#7a5a22',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    flex: 1,
  };

  const valueBadgeStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#3d2817',
    background: '#ead9b3',
    border: '1px solid #3d2817',
    boxShadow: '2px 2px 0 #d4bc88',
    borderRadius: '1px',
    padding: '1px 7px',
    letterSpacing: '0.05em',
    lineHeight: 1.5,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  // Track container — positions rail, fill, and thumb absolutely
  const trackContainerStyle = {
    position: 'relative',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const railStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '6px',
    background: '#ead9b3',
    border: '1px solid #a88d5a',
    borderRadius: '1px',
    overflow: 'hidden',
  };

  const fillStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${pct}%`,
    background: disabled ? '#a88d5a' : '#7a1212',
    // transition applied via injected <style> (reduced-motion aware)
  };

  const thumbStyle = {
    position: 'absolute',
    left: `${pct}%`,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '18px',
    height: '18px',
    background: disabled ? '#a88d5a' : '#7a1212',
    border: `1.5px solid ${disabled ? '#6b4f35' : '#7a5a22'}`,
    borderRadius: '1px',
    boxShadow: disabled ? 'none' : '2px 2px 0 #4a0808',
    pointerEvents: 'none',
    zIndex: 1,
    outline: focused && !disabled ? '2px solid #7a5a22' : 'none',
    outlineOffset: focused && !disabled ? '2px' : undefined,
  };

  const nativeInputStyle = {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    zIndex: 2,
    margin: 0,
    padding: 0,
  };

  const minMaxRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: marks ? '2px' : '4px',
  };

  const minMaxTextStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
    fontSize: '0.5625rem',
    fontWeight: 700,
    color: '#a88d5a',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
  };

  const showLabelRow = label || showValue;
  const tickPositions = [0, 50, 100];

  return (
    <React.Fragment>
      <style>{`
        .hbd-slider-fill {
          transition: width 0.08s ease;
        }
        .hbd-slider-thumb {
          transition: left 0.08s ease, background 0.12s ease, box-shadow 0.12s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .hbd-slider-fill,
          .hbd-slider-thumb {
            transition: none !important;
          }
        }
      `}</style>

      <div style={wrapperStyle} role="presentation">
        {/* Label row */}
        {showLabelRow && (
          <div style={labelRowStyle}>
            {label ? (
              <label htmlFor={inputId} style={labelTextStyle}>
                {label}
              </label>
            ) : null}
            {showValue && (
              <span style={valueBadgeStyle} aria-live="polite" aria-atomic="true">
                {clampedValue}{valueSuffix}
              </span>
            )}
          </div>
        )}

        {/* Track row */}
        <div style={trackContainerStyle} role="presentation">
          {/* Visual rail + fill */}
          <div style={railStyle} role="presentation" aria-hidden="true">
            <div
              className="hbd-slider-fill"
              style={fillStyle}
              role="presentation"
              aria-hidden="true"
            />
          </div>

          {/* Visual thumb */}
          <div
            className="hbd-slider-thumb"
            style={thumbStyle}
            role="presentation"
            aria-hidden="true"
          />

          {/* Native range input — all interaction */}
          <input
            type="range"
            id={inputId}
            min={safeMin}
            max={safeMax}
            step={step}
            value={clampedValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={nativeInputStyle}
            aria-label={label || 'Slider'}
            aria-valuemin={safeMin}
            aria-valuemax={safeMax}
            aria-valuenow={clampedValue}
            aria-disabled={disabled || undefined}
          />
        </div>

        {/* Tick marks row */}
        {marks && (
          <div
            role="presentation"
            aria-hidden="true"
            style={{ position: 'relative', height: '8px', marginTop: '2px' }}
          >
            {tickPositions.map((pos) => (
              <div
                key={pos}
                role="presentation"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: `${pos}%`,
                  transform: pos === 0
                    ? 'translateX(0)'
                    : pos === 100
                      ? 'translateX(-100%)'
                      : 'translateX(-50%)',
                  width: '4px',
                  height: '8px',
                  background: '#a88d5a',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        )}

        {/* Min / Max labels */}
        <div style={minMaxRowStyle} role="presentation" aria-hidden="true">
          <span style={minMaxTextStyle}>{safeMin}{valueSuffix}</span>
          <span style={minMaxTextStyle}>{safeMax}{valueSuffix}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

Object.assign(window, { Slider });
