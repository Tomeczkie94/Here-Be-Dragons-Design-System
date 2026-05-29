// ds/components/hbd-divider.js
// Here Be Dragons DS — <hbd-divider> custom element (CLAUDE.md §7).
//
// Light DOM: dividers are structural; authors style them from the page
// context and the token cascade must reach them without duplication.
// <slot> does not work in Light DOM, so for labelled/ornamental variants the
// host's existing content is read once and re-wrapped on render.

class HbdDivider extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'color', 'style-type'];
  }

  connectedCallback() {
    // Capture authored content once (label text or ornament markup).
    if (this._content === undefined) this._content = this.innerHTML.trim();
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal && this.isConnected) this._render();
  }

  _classList() {
    const variant = this.getAttribute('variant') || 'horizontal';
    const color = this.getAttribute('color') || 'default';
    const styleType = this.getAttribute('style-type') || 'solid';

    const classes = ['hbd-divider'];
    if (variant === 'vertical') classes.push('hbd-divider--vertical');
    if (variant === 'with-label') classes.push('hbd-divider--with-label');
    if (variant === 'ornamental') classes.push('hbd-divider--ornamental');
    if (color !== 'default') classes.push(`hbd-divider--${color}`);
    if (styleType === 'dashed') classes.push('hbd-divider--dashed');
    if (styleType === 'double') classes.push('hbd-divider--double');
    return classes.join(' ');
  }

  _render() {
    const variant = this.getAttribute('variant') || 'horizontal';
    this.className = this._classList();

    if (variant === 'with-label') {
      this.setAttribute('role', 'separator');
      this.setAttribute('aria-orientation', 'horizontal');
      // Expose the label text as the accessible name.
      const text = (this._content || '').replace(/<[^>]*>/g, '').trim();
      if (text) this.setAttribute('aria-label', text);
      this.innerHTML = `<span class="hbd-divider__label">${this._content}</span>`;
    } else if (variant === 'ornamental') {
      // Purely decorative — the surrounding content provides context.
      this.setAttribute('aria-hidden', 'true');
      this.removeAttribute('role');
      this.innerHTML = `<span class="hbd-divider__ornament">${this._content}</span>`;
    } else {
      // horizontal / vertical: a structural separator with no children.
      this.innerHTML = '';
      this.setAttribute('role', 'separator');
      this.setAttribute(
        'aria-orientation',
        variant === 'vertical' ? 'vertical' : 'horizontal'
      );
    }
  }
}

if (!customElements.get('hbd-divider')) {
  customElements.define('hbd-divider', HbdDivider);
}
