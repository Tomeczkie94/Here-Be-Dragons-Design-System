/*
 * FileUpload — Here Be Dragons Design System
 *
 * Parchment-themed drag-and-drop file zone with scroll icon, file list,
 * size validation, and full keyboard accessibility.
 *
 * Props:
 *   accept      {string}              — default '*'  (e.g. 'image/*', '.pdf,.doc')
 *   multiple    {boolean}             — default false
 *   onChange    {(files: File[])=>void}
 *   disabled    {boolean}             — default false
 *   maxSizeMB   {number|null}         — max file size in MB; null = no limit
 *   placeholder {string|null}         — overrides default drop text
 *   label       {string|null}         — label above the drop zone
 *   hint        {string|null}         — italic flavor text below the drop zone
 *   id          {string|null}
 */

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── Small scroll icon (12×14) used in the file list ────────────────────────

const ScrollIconSmall = () => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    aria-hidden="true"
    focusable="false"
    style={{ flexShrink: 0 }}
  >
    <rect x="2" y="1.5" width="8" height="11" rx="1" fill="#d4bc88" stroke="#a88d5a" strokeWidth="1"/>
    <rect x="0.5" y="1.5" width="11" height="2" rx="0.5" fill="#ead9b3" stroke="#a88d5a" strokeWidth="0.75"/>
    <rect x="0.5" y="10.5" width="11" height="2" rx="0.5" fill="#ead9b3" stroke="#a88d5a" strokeWidth="0.75"/>
    <line x1="3.5" y1="5.5" x2="8.5" y2="5.5" stroke="#7a5a22" strokeWidth="0.75" opacity="0.6"/>
    <line x1="3.5" y1="7.5" x2="8.5" y2="7.5" stroke="#7a5a22" strokeWidth="0.75" opacity="0.6"/>
  </svg>
);

// ─── Main drop zone scroll icon (40×40) ─────────────────────────────────────

const ScrollIconLarge = ({ dragging }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
    focusable="false"
    style={{ display: 'block', margin: '0 auto 10px' }}
  >
    {/* Scroll body */}
    <rect x="8" y="4" width="24" height="32" rx="1" fill="#d4bc88" stroke="#a88d5a" strokeWidth="1.5"/>
    {/* Top roller */}
    <rect x="4" y="4" width="32" height="5" rx="1" fill="#ead9b3" stroke="#a88d5a" strokeWidth="1"/>
    {/* Bottom roller */}
    <rect x="4" y="31" width="32" height="5" rx="1" fill="#ead9b3" stroke="#a88d5a" strokeWidth="1"/>
    {/* Text lines */}
    <line x1="14" y1="14" x2="26" y2="14" stroke="#7a5a22" strokeWidth="1" opacity="0.5"/>
    <line x1="14" y1="18" x2="26" y2="18" stroke="#7a5a22" strokeWidth="1" opacity="0.5"/>
    <line x1="14" y1="22" x2="22" y2="22" stroke="#7a5a22" strokeWidth="1" opacity="0.5"/>
    {/* Arrow: down when dragging, up otherwise */}
    {dragging ? (
      <path
        d="M20 18 L20 27 M17 24 L20 27 L23 24"
        stroke="#7a1212"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ) : (
      <path
        d="M20 27 L20 18 M17 21 L20 18 L23 21"
        stroke="#7a5a22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )}
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

const FileUpload = ({
  accept = '*',
  multiple = false,
  onChange,
  disabled = false,
  maxSizeMB = null,
  placeholder = null,
  label = null,
  hint = null,
  id = null,
}) => {
  const [files, setFiles] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [hovZone, setHovZone] = React.useState(false);
  const [error, setError] = React.useState(null);

  const inputRef = React.useRef(null);
  const idRef = React.useRef(id || `hbd-fu-${Math.random().toString(36).slice(2, 9)}`);
  const zoneId = idRef.current;

  // ─── File validation & update ─────────────────────────────────────────────

  const processFiles = (incoming) => {
    const list = Array.from(incoming);
    if (list.length === 0) return;

    let rejected = null;

    const valid = list.filter((f) => {
      if (maxSizeMB !== null && f.size > maxSizeMB * 1024 * 1024) {
        rejected = `"${f.name}" exceeds ${maxSizeMB} MB limit.`;
        return false;
      }
      return true;
    });

    setError(rejected);

    if (valid.length === 0) return;

    const next = multiple ? [...files, ...valid] : valid.slice(0, 1);
    setFiles(next);
    if (onChange) onChange(next);
  };

  const removeFile = (index) => {
    setError(null);
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    if (onChange) onChange(next);
  };

  // ─── Interaction handlers ─────────────────────────────────────────────────

  const openPicker = () => {
    if (disabled) return;
    inputRef.current && inputRef.current.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  };

  const handleDragLeave = (e) => {
    // Only reset if leaving the zone itself, not a child
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragging(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      openPicker();
    }
  };

  // ─── Computed zone state ──────────────────────────────────────────────────

  let zoneBg = '#f5ecd7';
  let zoneBorder = '#a88d5a';

  if (disabled) {
    zoneBg = '#f5ecd7';
    zoneBorder = '#a88d5a';
  } else if (dragging) {
    zoneBg = 'rgba(122,18,18,0.04)';
    zoneBorder = '#7a1212';
  } else if (hovZone) {
    zoneBg = '#ead9b3';
    zoneBorder = '#7a5a22';
  }

  const dropText = dragging
    ? 'Release to deposit your scroll'
    : (placeholder || 'Drop your scroll here');

  const dropTextColor = dragging ? '#7a1212' : '#3d2817';

  const subText = disabled
    ? 'Sealed by decree'
    : 'or click to consult the archives';

  const showAcceptHint = accept && accept !== '*';

  // ─── Styles ───────────────────────────────────────────────────────────────

  const outerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const fieldLabelStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#7a5a22',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    display: 'block',
    marginBottom: '2px',
  };

  const zoneStyle = {
    border: `2px dashed ${zoneBorder}`,
    borderRadius: '1px',
    minHeight: '140px',
    padding: '24px 20px 20px',
    background: zoneBg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
    // transition applied via injected <style> (reduced-motion aware)
  };

  const dropTextStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
    fontSize: '0.9375rem',
    fontWeight: 700,
    color: dropTextColor,
    letterSpacing: '0.06em',
    lineHeight: 1.3,
    display: 'block',
  };

  const subTextStyle = {
    fontFamily: '"IM Fell English",Georgia,serif',
    fontStyle: 'italic',
    fontSize: '0.8125rem',
    color: '#6b4f35',
    display: 'block',
    marginTop: '2px',
  };

  const acceptHintStyle = {
    fontFamily: '"JetBrains Mono","Courier New",monospace',
    fontSize: '0.6875rem',
    color: '#a88d5a',
    marginTop: '6px',
    display: 'block',
  };

  const hiddenInputStyle = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: 0,
  };

  const fileListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '4px',
  };

  const fileRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ead9b3',
    border: '1px solid #a88d5a',
    boxShadow: '2px 2px 0 #d4bc88',
    borderRadius: '1px',
    padding: '8px 12px',
  };

  const fileInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    minWidth: 0,
    flex: 1,
  };

  const fileNameStyle = {
    fontFamily: '"JetBrains Mono","Courier New",monospace',
    fontSize: '0.75rem',
    color: '#3d2817',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1.3,
  };

  const fileSizeStyle = {
    fontFamily: '"JetBrains Mono","Courier New",monospace',
    fontSize: '0.6875rem',
    color: '#a88d5a',
    lineHeight: 1.2,
  };

  const errorStyle = {
    fontFamily: '"Tiamat Condensed SC","Cinzel","IM Fell English SC",serif',
    fontSize: '0.75rem',
    color: '#7a1212',
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    lineHeight: 1.4,
  };

  const hintStyle = {
    fontFamily: '"IM Fell English",Georgia,serif',
    fontStyle: 'italic',
    fontSize: '0.8125rem',
    color: '#6b4f35',
    lineHeight: 1.5,
    marginTop: '2px',
  };

  return (
    <React.Fragment>
      <style>{`
        .hbd-fu-zone {
          transition: background 0.12s ease, border-color 0.12s ease;
        }
        .hbd-fu-zone:focus-visible {
          outline: 2px solid #7a5a22 !important;
          outline-offset: 2px;
        }
        .hbd-fu-remove {
          background: transparent;
          border: none;
          padding: 0 4px;
          cursor: pointer;
          font-family: "Tiamat Condensed SC","Cinzel","IM Fell English SC",serif;
          font-size: 0.75rem;
          color: #a88d5a;
          line-height: 1;
          border-radius: 1px;
          flex-shrink: 0;
          transition: color 0.12s ease;
        }
        .hbd-fu-remove:hover {
          color: #7a1212;
        }
        .hbd-fu-remove:focus-visible {
          outline: 2px solid #7a5a22;
          outline-offset: 1px;
          color: #7a1212;
        }
        @media (prefers-reduced-motion: reduce) {
          .hbd-fu-zone,
          .hbd-fu-remove {
            transition: none !important;
          }
        }
      `}</style>

      <div style={outerStyle}>
        {/* Field label */}
        {label && (
          <label
            htmlFor={zoneId}
            style={fieldLabelStyle}
            onClick={openPicker}
          >
            {label}
          </label>
        )}

        {/* Drop zone */}
        <div
          id={zoneId}
          className="hbd-fu-zone"
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-label={
            label
              ? `${label} — drop files or press Enter to browse`
              : 'File upload — drop files or press Enter to browse'
          }
          style={zoneStyle}
          onClick={openPicker}
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onMouseEnter={() => !disabled && setHovZone(true)}
          onMouseLeave={() => setHovZone(false)}
        >
          <ScrollIconLarge dragging={dragging} />

          <span style={dropTextStyle}>{dropText}</span>
          <span style={subTextStyle}>{subText}</span>

          {showAcceptHint && (
            <span style={acceptHintStyle} aria-label={`Accepted: ${accept}`}>
              {accept}
            </span>
          )}

          {/* Hidden native file input */}
          <input
            ref={inputRef}
            type="file"
            accept={accept !== '*' ? accept : undefined}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
            style={hiddenInputStyle}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        {/* Error message */}
        {error && (
          <div role="alert" style={errorStyle}>
            <span aria-hidden="true">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* File list */}
        {files.length > 0 && (
          <div
            role="list"
            aria-label="Selected files"
            style={fileListStyle}
          >
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                role="listitem"
                style={fileRowStyle}
              >
                <ScrollIconSmall />

                <div style={fileInfoStyle}>
                  <span style={fileNameStyle} title={file.name}>
                    {file.name}
                  </span>
                  <span style={fileSizeStyle}>
                    {formatSize(file.size)}
                  </span>
                </div>

                <button
                  type="button"
                  className="hbd-fu-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hint text */}
        {hint && (
          <p style={hintStyle}>{hint}</p>
        )}
      </div>
    </React.Fragment>
  );
};

Object.assign(window, { FileUpload });
