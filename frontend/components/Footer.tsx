'use client';

import { CONTACT, NAV_ORDER, SHOW_PLACEHOLDERS, SOCIAL, sectionHref } from '@/lib/site';
import { useLocale } from './LocaleProvider';

const FOOTER_NAV = NAV_ORDER.filter((k) => k !== 'solutions');

export function Footer() {
  const { c } = useLocale();
  const year = new Date().getFullYear();

  const follow = ([
    ['LinkedIn', SOCIAL.linkedin],
    ['GitHub', SOCIAL.github],
    ['Telegram', SOCIAL.telegram],
  ] as const).filter(([, href]) => href || SHOW_PLACEHOLDERS);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="/" className="logo" aria-label="TRIME — home">TRIME</a>
          <p className="footer__tagline">{c.footer.tagline}</p>
          {CONTACT.email ? (
            <p><a href={CONTACT.email.href}>{CONTACT.email.label}</a></p>
          ) : SHOW_PLACEHOLDERS ? (
            <p><span className="ph">[hello@trime.org]</span></p>
          ) : null}
          {CONTACT.telegram && (
            <p>{c.footer.telegram}: <a href={CONTACT.telegram.href} target="_blank" rel="noopener noreferrer">{CONTACT.telegram.label}</a></p>
          )}
        </div>

        <nav className="footer__col" aria-labelledby="footer-nav">
          <h2 id="footer-nav" className="footer__heading">{c.footer.navigation}</h2>
          <ul>{FOOTER_NAV.map((k) => <li key={k}><a href={sectionHref(k)}>{c.nav[k]}</a></li>)}</ul>
        </nav>

        <nav className="footer__col" aria-labelledby="footer-services">
          <h2 id="footer-services" className="footer__heading">{c.footer.services}</h2>
          <ul>{c.footer.serviceLinks.map((label) => <li key={label}><a href={sectionHref('services')}>{label}</a></li>)}</ul>
        </nav>

        {follow.length > 0 && (
          <div className="footer__col">
            <h2 className="footer__heading">{c.footer.follow}</h2>
            <ul>
              {follow.map(([label, href]) => (
                <li key={label}>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                    : <span>{label} <span className="ph">[verify link]</span></span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="container footer__bottom">
        <p>© {year} TRIME. {c.footer.rights}</p>
        <p>{c.footer.motto}</p>
      </div>
    </footer>
  );
}
