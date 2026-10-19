'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CONTACT, NAV_ORDER, SHOW_PLACEHOLDERS, sectionHref } from '@/lib/site';
import { LOCALES, type Locale } from '@/lib/content';
import { Icon } from './Icon';
import { useLocale } from './LocaleProvider';

function LanguageSelect({ id }: { id: string }) {
  const { locale, setLocale, c } = useLocale();
  return (
    <div className="lang">
      <label htmlFor={id} className="sr-only">{c.nav.language}</label>
      <select id={id} value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code} lang={l.code}>{l.short} · {l.label}</option>
        ))}
      </select>
      <span className="lang__value" aria-hidden="true">{LOCALES.find((l) => l.code === locale)?.short}</span>
      <Icon name="chevronDown" size={14} />
    </div>
  );
}

export function Header() {
  const { c } = useLocale();
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('menu-open');
    menuRef.current?.querySelector<HTMLElement>('a, button, select')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab' || !menuRef.current) return;
      // Keep focus inside the header + overlay while the menu is open.
      const scope = menuRef.current.closest('header');
      const items = scope ? Array.from(scope.querySelectorAll<HTMLElement>('a[href], button, select')).filter((el) => el.offsetParent !== null) : [];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 1024) close(false); };

    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, close]);

  return (
    <header className={`header${open ? ' header--open' : ''}`}>
      <div className="header__bar container">
        <a href="/" className="logo" aria-label="TRIME — home">TRIME</a>

        <nav className="header__nav" aria-label={c.nav.label}>
          <ul>
            {NAV_ORDER.map((key) => (
              <li key={key}><a href={sectionHref(key)}>{c.nav[key]}</a></li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <div className="header__lang"><LanguageSelect id="lang-header" /></div>
          <a href={sectionHref('contact')} className="btn btn--quote">{c.nav.quote}</a>
          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? c.nav.close : c.nav.open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="menu" hidden={!open}>
        <nav aria-label={c.nav.label} className="container">
          <ul className="menu__list">
            {NAV_ORDER.map((key) => (
              <li key={key}><a href={sectionHref(key)} onClick={() => close(false)}>{c.nav[key]}</a></li>
            ))}
          </ul>
          <a href={sectionHref('contact')} className="btn btn--primary btn--block" onClick={() => close(false)}>{c.nav.start}</a>
          <div className="menu__lang"><LanguageSelect id="lang-menu" /></div>
        </nav>
        <p className="menu__foot container">
          {c.nav.reply}
          {CONTACT.telegram ? (
            <> · Telegram <a href={CONTACT.telegram.href} target="_blank" rel="noopener noreferrer">{CONTACT.telegram.label}</a></>
          ) : SHOW_PLACEHOLDERS ? (
            <> · Telegram <span className="ph">[@username]</span></>
          ) : null}
        </p>
      </div>
    </header>
  );
}
