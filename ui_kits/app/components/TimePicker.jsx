// TimePicker.jsx — Time selection for the Adventurer's Compendium
//
// Props:
//   value       — "HH:MM" 24-hour string | null   initial committed value
//   onChange    — (val: "HH:MM" | null) => void   called on Confirm / Clear
//   format      — '12' | '24'                      default '12'
//   minuteStep  — 1 | 5 | 10 | 15 | 30            default 1
//   disabled    — boolean                           default false
//   placeholder — string                            default 'Select the hour…'
//   ariaLabel   — string                            default 'Time picker'
//   id          — string                            for <label> association

const TimePicker = ({
  value       = null,
  onChange    = null,
  format      = '12',
  minuteStep  = 1,
  disabled    = false,
  placeholder = 'Select the hour…',
  ariaLabel   = 'Time picker',
  id          = null,
}) => {

  // ── Parse initial value ────────────────────────────────────────────────────
  const parseVal = (v) => {
    if (!v || typeof v !== 'string') return [null, null];
    const m = v.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return [null, null];
    const h = parseInt(m[1], 10), mn = parseInt(m[2], 10);
    if (h > 23 || mn > 59) return [null, null];
    return [h, mn];
  };

  const [initH, initM] = parseVal(value);

  // ── State ──────────────────────────────────────────────────────────────────
  const [open,       setOpen]       = React.useState(false);
  const [h24,        setH24]        = React.useState(initH);
  const [minute,     setMinute]     = React.useState(initM);
  const [ampm,       setAmpm]       = React.useState(initH !== null && initH >= 12 ? 'PM' : 'AM');
  const [editingHr,  setEditingHr]  = React.useState(false);
  const [hrDraft,    setHrDraft]    = React.useState('');
  const [hrDraftErr, setHrDraftErr] = React.useState(false);

  // Hover states
  const [hovHr, setHovHr] = React.useState(null);
  const [hovMn, setHovMn] = React.useState(null);
  const [hovAm, setHovAm] = React.useState(null);
  const [hovCl, setHovCl] = React.useState(false);
  const [hovCo, setHovCo] = React.useState(false);
  const [hovTr, setHovTr] = React.useState(false);
  const [hovHH, setHovHH] = React.useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const panelRef    = React.useRef(null);
  const triggerRef  = React.useRef(null);
  const hrScrollRef = React.useRef(null);
  const mnScrollRef = React.useRef(null);

  // ── Derived ────────────────────────────────────────────────────────────────
  const is12     = format === '12';
  const toDisp12 = (h) => (h % 12) || 12;
  const toH24    = (disp, ap) =>
    ap === 'AM' ? (disp === 12 ? 0 : disp) : (disp === 12 ? 12 : disp + 12);

  const hours = is12
    ? [1,2,3,4,5,6,7,8,9,10,11,12]
    : Array.from({ length: 24 }, (_, i) => i);

  const minuteArr = React.useMemo(() => {
    const arr = [];
    for (let m = 0; m < 60; m += minuteStep) arr.push(m);
    return arr;
  }, [minuteStep]);

  // Infinite scroll — 5 copies, middle is copy 2 (MID_CPY)
  const COPIES  = 5;
  const MID_CPY = 2;

  const infiniteHours = React.useMemo(
    () => Array.from({ length: COPIES }, () => hours).flat(),
    [hours.join(',')]
  );
  const infiniteMinutes = React.useMemo(
    () => Array.from({ length: COPIES }, () => minuteArr).flat(),
    [minuteArr.join(',')]
  );

  const selDispHr   = h24 !== null ? (is12 ? toDisp12(h24) : h24) : null;
  const currentAmPm = h24 !== null ? (h24 >= 12 ? 'PM' : 'AM') : ampm;

  const headerH = h24 !== null
    ? (is12 ? String(toDisp12(h24)).padStart(2,'0') : String(h24).padStart(2,'0'))
    : '––';
  const headerM = minute !== null ? String(minute).padStart(2,'0') : '––';

  const displayStr = React.useMemo(() => {
    if (h24 === null || minute === null) return null;
    const mm = String(minute).padStart(2,'0');
    if (!is12) return `${String(h24).padStart(2,'0')}:${mm}`;
    return `${toDisp12(h24)}:${mm} ${h24 >= 12 ? 'PM' : 'AM'}`;
  }, [h24, minute, is12]);

  const ITEM_H = 36;
  const COL_H  = 180;

  // scrollTop that centers a given logical index in the middle copy
  const scrollTopFor = (logicalIdx, listLen) =>
    (MID_CPY * listLen + logicalIdx) * ITEM_H + ITEM_H / 2 - COL_H / 2;

  // ── Scroll to selected on open ─────────────────────────────────────────────
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (hrScrollRef.current) {
        const idx = selDispHr !== null ? Math.max(0, hours.indexOf(selDispHr)) : 0;
        hrScrollRef.current.scrollTop = scrollTopFor(idx, hours.length);
      }
      if (mnScrollRef.current) {
        const idx = minute !== null ? Math.max(0, minuteArr.indexOf(minute)) : 0;
        mnScrollRef.current.scrollTop = scrollTopFor(idx, minuteArr.length);
      }
    }, 30);
    return () => clearTimeout(t);
  }, [open]);

  // ── Infinite scroll loop ───────────────────────────────────────────────────
  React.useEffect(() => {
    if (!open) return;
    const hrEl = hrScrollRef.current;
    const mnEl = mnScrollRef.current;
    if (!hrEl || !mnEl) return;

    const makeLoop = (el, listLen) => {
      const oneSetH = listLen * ITEM_H;
      return () => {
        if (el.scrollTop < oneSetH) {
          el.scrollTop += 2 * oneSetH;
        } else if (el.scrollTop >= 4 * oneSetH) {
          el.scrollTop -= 2 * oneSetH;
        }
      };
    };

    const hrLoop = makeLoop(hrEl, hours.length);
    const mnLoop = makeLoop(mnEl, minuteArr.length);

    hrEl.addEventListener('scroll', hrLoop, { passive: true });
    mnEl.addEventListener('scroll', mnLoop, { passive: true });
    return () => {
      hrEl.removeEventListener('scroll', hrLoop);
      mnEl.removeEventListener('scroll', mnLoop);
    };
  }, [open, hours.length, minuteArr.length]);

  // ── Click-outside ──────────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        panelRef.current   && !panelRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // ── Escape key ─────────────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closePanel(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const openPanel = () => {
    if (!disabled) { setEditingHr(false); setHrDraft(''); setHrDraftErr(false); setOpen(true); }
  };
  const closePanel = () => {
    setOpen(false);
    setEditingHr(false);
    triggerRef.current && triggerRef.current.focus({ preventScroll: true });
  };

  const selectHour = (displayOrRaw) => {
    if (is12) setH24(toH24(displayOrRaw, ampm));
    else      setH24(displayOrRaw);
  };

  const selectAmPm = (ap) => {
    setAmpm(ap);
    if (h24 !== null) setH24(toH24(toDisp12(h24), ap));
  };

  const scrollHrTo = (dispHr) => {
    if (!hrScrollRef.current) return;
    const idx = hours.indexOf(dispHr);
    if (idx !== -1) hrScrollRef.current.scrollTop = scrollTopFor(idx, hours.length);
  };

  const commitHrDraft = (raw) => {
    const trimmed = (raw || '').trim();
    setEditingHr(false);
    if (!trimmed) return;
    const n = parseInt(trimmed, 10);
    if (isNaN(n)) { setHrDraftErr(true); return; }
    if (is12) {
      if (n < 1 || n > 12) { setHrDraftErr(true); return; }
      setH24(toH24(n, ampm));
      setTimeout(() => scrollHrTo(n), 30);
    } else {
      if (n < 0 || n > 23) { setHrDraftErr(true); return; }
      setH24(n);
      setTimeout(() => scrollHrTo(n), 30);
    }
    setHrDraftErr(false);
  };

  const confirm = () => {
    if (h24 !== null && minute !== null) {
      const val = `${String(h24).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
      onChange && onChange(val);
    }
    closePanel();
  };

  const clear = () => {
    setH24(null); setMinute(null); setAmpm('AM');
    onChange && onChange(null);
    closePanel();
  };

  // ── Styles ─────────────────────────────────────────────────────────────────
  const DF = '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif';

  const S = {
    wrapper: { position: 'relative', display: 'inline-block' },

    trigger: {
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '8px 12px', minWidth: '172px',
      background: disabled ? '#ead9b3' : (hovTr ? '#ead9b3' : '#f5ecd7'),
      border: `1.5px solid ${disabled ? '#a88d5a' : (hovTr ? '#7a5a22' : '#6b4f35')}`,
      cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: DF,
      fontSize: '0.875rem', letterSpacing: '0.08em',
      color: displayStr ? '#3d2817' : '#6b4f35',
      opacity: disabled ? 0.65 : 1, userSelect: 'none', outline: 'none',
      transition: 'background 0.12s ease, border-color 0.12s ease', whiteSpace: 'nowrap',
    },
    icon:  { flexShrink: 0, display: 'inline-flex', opacity: 0.75 },
    label: { flex: 1 },
    caret: { fontSize: '0.65rem', color: '#a88d5a', marginLeft: 'auto', flexShrink: 0 },

    panel: {
      position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 9999,
      background: '#ead9b3', border: '1.5px solid #3d2817',
      boxShadow: '4px 4px 0 #a88d5a', minWidth: '220px', fontFamily: DF,
    },

    header: {
      padding: '10px 16px 8px', borderBottom: '1px solid #a88d5a',
      background: '#d4bc88', display: 'flex', alignItems: 'baseline', gap: '2px',
    },
    displayNum: {
      fontSize: '1.75rem', letterSpacing: '0.04em', color: '#1a1410',
      lineHeight: 1, fontVariantNumeric: 'tabular-nums',
    },
    displaySep:  { fontSize: '1.5rem', color: '#7a5a22', padding: '0 2px', lineHeight: 1 },
    displayAmPm: {
      fontSize: '0.6875rem', letterSpacing: '0.2em', color: '#7a5a22',
      marginLeft: '6px', alignSelf: 'flex-end', paddingBottom: '2px',
    },
    headerHint: {
      marginLeft: 'auto', fontSize: '0.5rem', letterSpacing: '0.1em',
      color: '#a88d5a', textTransform: 'uppercase', alignSelf: 'flex-end',
      paddingBottom: '3px', whiteSpace: 'nowrap',
    },
    headerInput: {
      fontSize: '1.75rem', letterSpacing: '0.04em', color: '#3d2817',
      lineHeight: 1, fontVariantNumeric: 'tabular-nums', fontFamily: DF,
      background: 'transparent', border: 'none', borderBottom: '1.5px solid #7a5a22',
      outline: 'none', width: '2.4ch', padding: 0, textAlign: 'center',
    },

    colsWrapper: { display: 'flex' },
    col:         { display: 'flex', flexDirection: 'column', flex: 1 },
    colLabel: {
      fontFamily: DF, fontSize: '0.5625rem', letterSpacing: '0.25em',
      textTransform: 'uppercase', color: '#7a5a22', textAlign: 'center',
      padding: '6px 4px 4px', borderBottom: '1px solid #d4bc88', background: '#ead9b3',
    },
    colScroll: {
      height: `${COL_H}px`, overflowY: 'auto', overflowX: 'hidden',
      scrollbarWidth: 'thin', scrollbarColor: '#a88d5a #ead9b3',
    },
    item: (isSel, isHov) => ({
      height: `${ITEM_H}px`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: DF, fontSize: '0.9375rem', letterSpacing: '0.05em',
      color: isSel ? '#f5ecd7' : (isHov ? '#1a1410' : '#3d2817'),
      background: isSel ? '#7a1212' : (isHov ? '#d4bc88' : 'transparent'),
      cursor: 'pointer', transition: 'background 0.1s ease, color 0.1s ease',
      userSelect: 'none', outline: 'none',
    }),

    colDivider: { width: '1px', background: '#a88d5a', flexShrink: 0 },
    ampmCol:  { display: 'flex', flexDirection: 'column', width: '52px', flexShrink: 0 },
    ampmWrap: {
      height: `${COL_H}px`, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: '8px', padding: '8px',
    },
    ampmBtn: (isActive, isHov) => ({
      height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: DF, fontSize: '0.8125rem', letterSpacing: '0.12em',
      color: isActive ? '#f5ecd7' : (isHov ? '#1a1410' : '#6b4f35'),
      background: isActive ? '#7a1212' : (isHov ? '#d4bc88' : 'transparent'),
      border: `1px solid ${isActive ? '#4a0808' : '#a88d5a'}`,
      cursor: 'pointer', transition: 'all 0.1s ease', outline: 'none',
    }),

    footer: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 12px', borderTop: '1px solid #a88d5a',
    },
    clearBtn: (isHov) => ({
      background: 'none', border: 'none', fontFamily: DF,
      fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase',
      color: isHov ? '#7a1212' : '#6b4f35',
      cursor: 'pointer', padding: '4px 0', outline: 'none', transition: 'color 0.12s ease',
    }),
    confirmBtn: (isHov) => ({
      background: '#7a1212', border: 'none', fontFamily: DF,
      boxShadow: isHov ? '2px 2px 0 #1a1410' : '2px 2px 0 #4a0808',
      fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase',
      color: '#f5ecd7', cursor: 'pointer', padding: '6px 14px', outline: 'none',
      transform: isHov ? 'translate(-1px,-1px)' : 'none',
      transition: 'box-shadow 0.1s ease, transform 0.1s ease',
    }),
  };

  // ── Focus-visible + scrollbar injection ───────────────────────────────────
  const focusStyle = `
    .hbd-tp-trigger:focus-visible { outline: 2px solid #7a5a22 !important; outline-offset: 2px !important; }
    .hbd-tp-option:focus-visible  { outline: 2px solid #7a5a22 !important; outline-offset: -2px !important; }
    .hbd-tp-ampm:focus-visible    { outline: 2px solid #7a5a22 !important; outline-offset: 1px !important; }
    .hbd-tp-clear:focus-visible   { outline: 2px solid #7a5a22 !important; outline-offset: 2px !important; }
    .hbd-tp-confirm:focus-visible { outline: 2px solid #f5ecd7 !important; outline-offset: 2px !important; }
    .hbd-tp-col-scroll::-webkit-scrollbar { width: 4px; }
    .hbd-tp-col-scroll::-webkit-scrollbar-track { background: #ead9b3; }
    .hbd-tp-col-scroll::-webkit-scrollbar-thumb { background: #a88d5a; }
    @media (prefers-reduced-motion: reduce) {
      .hbd-tp-trigger, .hbd-tp-option, .hbd-tp-ampm,
      .hbd-tp-clear, .hbd-tp-confirm { transition: none !important; }
    }
  `;

  // ── Hourglass icon ─────────────────────────────────────────────────────────
  const HourglassIcon = () => (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M1.5 1h10M1.5 15h10" stroke="#6b4f35" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2.5 1.5L6.5 8L10.5 1.5Z" fill="#b8893b" stroke="#7a5a22" strokeWidth="0.75"/>
      <path d="M2.5 14.5L6.5 8L10.5 14.5Z" fill="#a88d5a" stroke="#7a5a22" strokeWidth="0.75"/>
      <line x1="1.5" y1="5.5" x2="11.5" y2="5.5" stroke="#7a5a22" strokeWidth="0.5" strokeOpacity="0.5"/>
    </svg>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={S.wrapper}>
      <style>{focusStyle}</style>

      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        id={id || undefined}
        type="button"
        className="hbd-tp-trigger"
        style={S.trigger}
        aria-label={`${ariaLabel}${displayStr ? `, current value ${displayStr}` : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        disabled={disabled}
        onClick={openPanel}
        onMouseEnter={() => setHovTr(true)}
        onMouseLeave={() => setHovTr(false)}
      >
        <span style={S.icon}><HourglassIcon /></span>
        <span style={S.label}>{displayStr || placeholder}</span>
        <span style={S.caret} aria-hidden="true">▾</span>
      </button>

      {/* ── Panel ── */}
      {open && (
        <div ref={panelRef} role="dialog" aria-label={ariaLabel} aria-modal="false" style={S.panel}>

          {/* Header — hour is click-to-edit */}
          <div style={S.header} aria-hidden="true">
            {editingHr ? (
              <input
                autoFocus
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={hrDraft}
                style={S.headerInput}
                aria-label={`Type hour, ${is12 ? '1 to 12' : '0 to 23'}`}
                onChange={(e) => { setHrDraft(e.target.value); setHrDraftErr(false); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter')  { e.stopPropagation(); commitHrDraft(hrDraft); }
                  if (e.key === 'Escape') { e.stopPropagation(); setEditingHr(false); }
                }}
                onBlur={() => commitHrDraft(hrDraft)}
              />
            ) : (
              <span
                title={`Click to type hour (${is12 ? '1–12' : '0–23'})`}
                style={{
                  ...S.displayNum,
                  cursor: 'pointer', userSelect: 'none',
                  color: hrDraftErr ? '#7a1212' : (hovHH ? '#7a5a22' : '#1a1410'),
                  borderBottom: hovHH ? '1.5px solid #7a5a22' : '1.5px solid transparent',
                  transition: 'color 0.1s, border-color 0.1s',
                }}
                onMouseEnter={() => { setHovHH(true); setHrDraftErr(false); }}
                onMouseLeave={() => setHovHH(false)}
                onClick={() => {
                  setHrDraft(selDispHr !== null ? String(selDispHr) : '');
                  setEditingHr(true);
                }}
              >
                {headerH}
              </span>
            )}
            <span style={S.displaySep}>:</span>
            <span style={S.displayNum}>{headerM}</span>
            {is12 && <span style={S.displayAmPm}>{currentAmPm}</span>}
            {!editingHr && (
              <span style={S.headerHint}>click hour to type</span>
            )}
          </div>

          {/* Columns */}
          <div style={S.colsWrapper}>

            {/* Hour column — infinite scroll */}
            <div style={S.col}>
              <div style={S.colLabel} aria-hidden="true">
                {is12 ? 'Hour' : 'Hour (24)'}
              </div>
              <div
                ref={hrScrollRef}
                className="hbd-tp-col-scroll"
                style={S.colScroll}
                role="listbox"
                aria-label="Select hour"
              >
                {infiniteHours.map((hr, idx) => {
                  const copyIdx   = Math.floor(idx / hours.length);
                  const isSel     = selDispHr === hr;
                  const isAriaSel = isSel && copyIdx === MID_CPY;
                  const isHov     = hovHr === hr;
                  return (
                    <div
                      key={idx}
                      role="option"
                      aria-selected={isAriaSel}
                      className="hbd-tp-option"
                      style={S.item(isSel, isHov)}
                      tabIndex={-1}
                      onMouseEnter={() => setHovHr(hr)}
                      onMouseLeave={() => setHovHr(null)}
                      onClick={() => selectHour(hr)}
                    >
                      {String(hr).padStart(2, '0')}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={S.colDivider} />

            {/* Minute column — infinite scroll */}
            <div style={S.col}>
              <div style={S.colLabel} aria-hidden="true">Min</div>
              <div
                ref={mnScrollRef}
                className="hbd-tp-col-scroll"
                style={S.colScroll}
                role="listbox"
                aria-label="Select minute"
              >
                {infiniteMinutes.map((mn, idx) => {
                  const copyIdx   = Math.floor(idx / minuteArr.length);
                  const isSel     = minute === mn;
                  const isAriaSel = isSel && copyIdx === MID_CPY;
                  const isHov     = hovMn === mn;
                  return (
                    <div
                      key={idx}
                      role="option"
                      aria-selected={isAriaSel}
                      className="hbd-tp-option"
                      style={S.item(isSel, isHov)}
                      tabIndex={-1}
                      onMouseEnter={() => setHovMn(mn)}
                      onMouseLeave={() => setHovMn(null)}
                      onClick={() => setMinute(mn)}
                    >
                      {String(mn).padStart(2, '0')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AM/PM column — 12h only */}
            {is12 && (
              <>
                <div style={S.colDivider} />
                <div style={S.ampmCol}>
                  <div style={S.colLabel} aria-hidden="true">AM·PM</div>
                  <div style={S.ampmWrap} role="listbox" aria-label="AM or PM">
                    {['AM', 'PM'].map((ap) => {
                      const isActive = currentAmPm === ap;
                      const isHov    = hovAm === ap;
                      return (
                        <button
                          key={ap}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          className="hbd-tp-ampm"
                          style={S.ampmBtn(isActive, isHov)}
                          onMouseEnter={() => setHovAm(ap)}
                          onMouseLeave={() => setHovAm(null)}
                          onClick={() => selectAmPm(ap)}
                        >
                          {ap}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div style={S.footer}>
            <button
              type="button"
              className="hbd-tp-clear"
              style={S.clearBtn(hovCl)}
              onMouseEnter={() => setHovCl(true)}
              onMouseLeave={() => setHovCl(false)}
              onClick={clear}
            >
              Clear
            </button>
            <button
              type="button"
              className="hbd-tp-confirm"
              style={S.confirmBtn(hovCo)}
              onMouseEnter={() => setHovCo(true)}
              onMouseLeave={() => setHovCo(false)}
              onClick={confirm}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { TimePicker });
