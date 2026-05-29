// ds/components/hbd-breadcrumbs.js
// Here Be Dragons DS — <hbd-breadcrumbs> custom element (CLAUDE.md §7).
//
// Light DOM: breadcrumb items are authored directly inside the element as an
// <ol> of <li>, so the component enhances existing markup rather than
// rendering it from a Shadow DOM (which would require duplicating the trail).

class HbdBreadcrumbs extends HTMLElement {
  static get observedAttributes() {
    return ['truncate'];
  }

  constructor() {
    super();
    this._handleEllipsisClick = this._handleEllipsisClick.bind(this);
  }

  connectedCallback() {
    this.classList.add('hbd-breadcrumbs');
    this._upgradeAccessibility();
    this._applyTruncation();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal && this.isConnected) {
      this._applyTruncation();
    }
  }

  _applyTruncation() {
    const list = this.querySelector('ol');
    if (!list) return;

    // Remove any previously-injected ellipsis before recomputing.
    const existing = this.querySelector('.hbd-breadcrumbs__item--ellipsis');
    if (existing) existing.remove();
    this.classList.remove('hbd-breadcrumbs--expanded');

    const items = Array.from(list.children).filter(
      (li) => !li.classList.contains('hbd-breadcrumbs__item--ellipsis')
    );
    items.forEach((li) => li.classList.remove('hbd-breadcrumbs__item--hidden'));

    const threshold = parseInt(this.getAttribute('truncate'), 10) || 0;
    if (threshold <= 0 || items.length <= threshold) return;

    // Keep first and last visible; hide the middle items.
    const middle = items.slice(1, items.length - 1);
    middle.forEach((li) => li.classList.add('hbd-breadcrumbs__item--hidden'));

    // Inject an ellipsis button after the first item.
    const ellipsisLi = document.createElement('li');
    ellipsisLi.className = 'hbd-breadcrumbs__item hbd-breadcrumbs__item--ellipsis';
    const sep = document.createElement('span');
    sep.className = 'hbd-breadcrumbs__separator';
    sep.setAttribute('aria-hidden', 'true');
    sep.textContent = '›';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hbd-breadcrumbs__ellipsis';
    btn.setAttribute('aria-label', 'Show full path');
    btn.textContent = '…';
    btn.addEventListener('click', this._handleEllipsisClick);
    ellipsisLi.append(sep, btn);
    items[0].after(ellipsisLi);
  }

  _handleEllipsisClick() {
    this.classList.add('hbd-breadcrumbs--expanded');
    const ellipsis = this.querySelector('.hbd-breadcrumbs__item--ellipsis');
    if (ellipsis) ellipsis.remove();
    this.dispatchEvent(new CustomEvent('hbd:expand', {
      bubbles: true,
      composed: true,
    }));
  }

  _upgradeAccessibility() {
    const list = this.querySelector('ol');
    if (!list) {
      console.error('hbd-breadcrumbs: no <ol> found inside the component.', this);
      return;
    }

    const nav = this.querySelector('nav') || this;
    if (!nav.hasAttribute('aria-label') && !nav.hasAttribute('aria-labelledby')) {
      nav.setAttribute('aria-label', 'Breadcrumb');
      console.warn('hbd-breadcrumbs: no aria-label/aria-labelledby found; defaulted to "Breadcrumb". Set an explicit label for i18n.', this);
    }

    if (!this.querySelector('[aria-current="page"]')) {
      console.warn('hbd-breadcrumbs: no item has aria-current="page". The author should set it on the final item.', this);
    }
  }
}

if (!customElements.get('hbd-breadcrumbs')) {
  customElements.define('hbd-breadcrumbs', HbdBreadcrumbs);
}
