// TimePicker.jsx — Apple-style scroll-wheel time picker.
// Features:
//  • Infinite scroll wheels: after 59 → 00 → 01 (minutes), 12 → 01 (12h), 23 → 00 (24h)
//  • Hour can also be typed manually into the input above the wheel
//  • Minutes step by 1 (so 21:37 is selectable)
//  • format prop: '12h' (1..12 + AM/PM) or '24h' (0..23)
//  • Controlled or uncontrolled. value/onChange shape: { hour, minute, period? }

const TIME_ITEM_HEIGHT = 36;
const TIME_VISIBLE_ROWS = 5;
const TIME_CENTER_OFFSET = Math.floor(TIME_VISIBLE_ROWS / 2);

const InfiniteWheel = ({ items, value, onChange, format, disabled, ariaLabel, width = 64 }) => {
  const scrollRef    = React.useRef(null);
  const programmatic = React.useRef(false);
  const snapTimer    = React.useRef(null);
  const lastEmitted  = React.useRef(value);

  // Repeat list three times so user can scroll either direction without immediately hitting a boundary.
  const tripled = React.useMemo(() => [...items, ...items, ...items], [items]);
  const len = items.length;

  const scrollToValue = React.useCallback((v, behavior = 'auto') => {
    const idx = items.indexOf(v);
    if (idx === -1 || !scrollRef.current) return;
    programmatic.current = true;
    scrollRef.current.scrollTo({ top: (len + idx) * TIME_ITEM_HEIGHT, behavior });
    // Release the lock once the scroll has had a chance to settle.
    window.setTimeout(() => { programmatic.current = false; }, behavior === 'smooth' ? 280 : 30);
  }, [items, len]);

  // Initial position + sync to external value changes.
  React.useEffect(() => {
    scrollToValue(value, 'auto');
  }, [value, scrollToValue]);

  const handleScroll = (e) => {
    if (programmatic.current) return;
    const top = e.currentTarget.scrollTop;
    const rawIdx = Math.round(top / TIME_ITEM_HEIGHT);

    // Re-anchor to the middle copy if we drift into the first or last third.
    if (rawIdx < len * 0.5) {
      programmatic.current = true;
      e.currentTarget.scrollTop = top + len * TIME_ITEM_HEIGHT;
      window.setTimeout(() => { programmatic.current = false; }, 30);
      return;
    }
    if (rawIdx >= len * 2.5) {
      programmatic.current = true;
      e.currentTarget.scrollTop = top - len * TIME_ITEM_HEIGHT;
      window.setTimeout(() => { programmatic.current = false; }, 30);
      return;
    }

    const realIdx = ((rawIdx % len) + len) % len;
    const next = items[realIdx];

    // Debounce emit while wheel is still settling; emit on rest.
    if (snapTimer.current) window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      if (next !== lastEmitted.current) {
        lastEmitted.current = next;
        onChange(next);
      }
    }, 60);
  };

  const handleItemClick = (item) => {
    if (disabled) return;
    lastEmitted.current = item;
    onChange(item);
    scrollToValue(item, 'smooth');
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    const idx = items.indexOf(value);
    if (idx === -1) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = items[(idx + 1) % len];
      onChange(n);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = items[(idx - 1 + len) % len];
      onChange(n);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(items[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(items[len - 1]);
    }
  };

  const styles = {
    wheel: {
      position: 'relative',
      height: TIME_ITEM_HEIGHT * TIME_VISIBLE_ROWS,
      width: `${width}px`,
      overflow: 'hidden',
      background: '#f5ecd7',
      border: '1.5px solid #a88d5a',
      borderRadius: '1px',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'grab',
    },
    scroller: {
      height: '100%',
      overflowY: disabled ? 'hidden' : 'scroll',
      scrollSnapType: 'y mandatory',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
    },
    spacer: { height: TIME_ITEM_HEIGHT * TIME_CENTER_OFFSET },
    item: (selected) => ({
      height: TIME_ITEM_HEIGHT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      scrollSnapAlign: 'center',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: selected ? '22px' : '18px',
      fontWeight: selected ? 700 : 400,
      letterSpacing: '0.05em',
      color: selected ? '#7a1212' : '#6b4f35',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      transition: 'color 0.12s ease, font-size 0.12s ease',
    }),
    highlight: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: TIME_ITEM_HEIGHT * TIME_CENTER_OFFSET,
      height: TIME_ITEM_HEIGHT,
      borderTop: '1px solid #7a5a22',
      borderBottom: '1px solid #7a5a22',
      pointerEvents: 'none',
      background: 'rgba(184,137,59,0.10)',
    },
    fadeTop: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: TIME_ITEM_HEIGHT * TIME_CENTER_OFFSET,
      background: 'linear-gradient(to bottom, #f5ecd7 0%, rgba(245,236,215,0.4) 70%, transparent 100%)',
      pointerEvents: 'none',
    },
    fadeBottom: {
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: TIME_ITEM_HEIGHT * TIME_CENTER_OFFSET,
      background: 'linear-gradient(to top, #f5ecd7 0%, rgba(245,236,215,0.4) 70%, transparent 100%)',
      pointerEvents: 'none',
    },
  };

  return (
    <div
      style={styles.wheel}
      role="listbox"
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={scrollRef}
        style={styles.scroller}
        onScroll={handleScroll}
        className="hbd-time-wheel-scroller"
      >
        <div style={styles.spacer} aria-hidden="true"/>
        {tripled.map((item, i) => {
          const copyIdx = Math.floor(i / len);
          const realIdx = i % len;
          const isSelected = copyIdx === 1 && items[realIdx] === value;
          return (
            <div
              key={i}
              style={styles.item(isSelected)}
              role="option"
              aria-selected={isSelected}
              aria-label={String(format(item))}
              onClick={() => handleItemClick(item)}
            >
              {format(item)}
            </div>
          );
        })}
        <div style={styles.spacer} aria-hidden="true"/>
      </div>
      <div style={styles.highlight}/>
      <div style={styles.fadeTop}/>
      <div style={styles.fadeBottom}/>
    </div>
  );
};

const TimePicker = ({
  value,
  defaultValue,
  onChange,
  format = '24h',
  disabled = false,
  label,
  id,
}) => {
  const isControlled = value !== undefined;
  const init = defaultValue
    || value
    || (format === '12h' ? { hour: 12, minute: 0, period: 'AM' } : { hour: 0, minute: 0 });

  const [internal, setInternal] = React.useState(init);
  const [hourInput, setHourInput] = React.useState(null);
  const pickerId = id || `time-${React.useId ? React.useId() : Math.random().toString(36).slice(2)}`;

  const current = isControlled ? value : internal;

  const update = (patch) => {
    const next = { ...current, ...patch };
    if (!isControlled) setInternal(next);
    if (onChange) onChange(next);
  };

  const hours   = format === '12h'
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['AM', 'PM'];

  const pad = (n) => String(n).padStart(2, '0');

  const handleHourInputChange = (e) => {
    setHourInput(e.target.value);
  };

  const commitHourInput = () => {
    if (hourInput == null) return;
    const trimmed = hourInput.trim();
    if (trimmed === '') { setHourInput(null); return; }
    const n = parseInt(trimmed, 10);
    if (Number.isNaN(n)) { setHourInput(null); return; }
    const lo = format === '12h' ? 1 : 0;
    const hi = format === '12h' ? 12 : 23;
    const clamped = Math.max(lo, Math.min(hi, n));
    update({ hour: clamped });
    setHourInput(null);
  };

  const hourInputValue = hourInput !== null ? hourInput : pad(current.hour);

  const s = {
    wrap: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '14px 16px',
      background: 'linear-gradient(135deg, #f5ecd7, #ead9b3)',
      border: '2px solid #3d2817',
      boxShadow: '4px 4px 0 #a88d5a',
      borderRadius: '1px',
      opacity: disabled ? 0.55 : 1,
    },
    label: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '11px',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: '#7a5a22',
    },
    typedRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      paddingBottom: '4px',
      borderBottom: '1px dashed #6b4f35',
    },
    hourInput: {
      width: '56px',
      padding: '4px 6px',
      background: '#f5ecd7',
      border: '1.5px solid #a88d5a',
      borderRadius: '1px',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '20px',
      fontWeight: 700,
      color: '#1a1410',
      textAlign: 'center',
      outline: 'none',
    },
    typedValue: {
      width: '56px',
      padding: '4px 6px',
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '20px',
      fontWeight: 700,
      color: '#1a1410',
      textAlign: 'center',
    },
    colon: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '24px',
      fontWeight: 700,
      color: '#3d2817',
      lineHeight: 1,
      padding: '0 4px',
    },
    wheels: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    columnLabel: {
      fontFamily: '"Tiamat Condensed SC","Cinzel",serif',
      fontSize: '9px',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: '#7a5a22',
      textAlign: 'center',
      marginTop: '6px',
    },
    column: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  };

  const styleTagId = `hbd-time-wheel-style-${pickerId}`;
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(styleTagId)) return;
    const tag = document.createElement('style');
    tag.id = styleTagId;
    tag.textContent = `.hbd-time-wheel-scroller::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(tag);
    return () => { tag.remove(); };
  }, [styleTagId]);

  return (
    <div style={s.wrap} role="group" aria-label={label || 'Time picker'}>
      {label && <span style={s.label}>{label}</span>}

      <div style={s.typedRow}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          value={hourInputValue}
          onChange={handleHourInputChange}
          onBlur={commitHourInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); commitHourInput(); }
            if (e.key === 'Escape') { setHourInput(null); }
          }}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          style={s.hourInput}
          aria-label={`Hour (${format === '12h' ? '1 to 12' : '0 to 23'})`}
        />
        <span style={s.colon} aria-hidden="true">:</span>
        <span style={s.typedValue} aria-label={`Minute ${pad(current.minute)}`}>{pad(current.minute)}</span>
        {format === '12h' && (
          <>
            <span style={{ ...s.colon, fontSize: '16px' }} aria-hidden="true">·</span>
            <span style={s.typedValue} aria-label={`Period ${current.period}`}>{current.period}</span>
          </>
        )}
      </div>

      <div style={s.wheels}>
        <div style={s.column}>
          <InfiniteWheel
            items={hours}
            value={current.hour}
            onChange={(h) => update({ hour: h })}
            format={pad}
            disabled={disabled}
            ariaLabel="Hour wheel"
          />
          <span style={s.columnLabel}>Hour</span>
        </div>
        <div style={s.column}>
          <InfiniteWheel
            items={minutes}
            value={current.minute}
            onChange={(m) => update({ minute: m })}
            format={pad}
            disabled={disabled}
            ariaLabel="Minute wheel"
          />
          <span style={s.columnLabel}>Min</span>
        </div>
        {format === '12h' && (
          <div style={s.column}>
            <InfiniteWheel
              items={periods}
              value={current.period || 'AM'}
              onChange={(p) => update({ period: p })}
              format={String}
              disabled={disabled}
              ariaLabel="AM or PM"
              width={56}
            />
            <span style={s.columnLabel}>Period</span>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { InfiniteWheel, TimePicker });
