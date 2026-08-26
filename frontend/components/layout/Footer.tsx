'use client';

import Link from 'next/link';
import { useLocale } from './LocaleProvider';

const FOOTER_LINKS = {
  services: [
    { key: 'business', href: '/#dev-services' },
    { key: 'simple', href: '/#dev-services' },
    { key: 'store', href: '/#dev-services' },
    { key: 'bot', href: '/#dev-services' },
    { key: 'spec', href: '/#dev-services' },
  ],
  design: [
    { key: 'turnkey', href: '/#design-services' },
    { key: 'uiux', href: '/#design-services' },
    { key: 'mobileDesktop', href: '/#design-services' },
    { key: 'figma', href: '/#design-services' },
  ],
  company: [
    { key: 'about', href: '/#about' },
    { key: 'work', href: '/work/' },
    { key: 'contact', href: '/#contact' },
  ],
} as const;


export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer className="relative border-t border-surface-border" aria-label="Site footer">

      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"
      />

      <div className="section-wrapper">

        {/* ── Main footer grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 py-16">

          {/* Link columns */}
          {(Object.entries(FOOTER_LINKS) as [keyof typeof FOOTER_LINKS, readonly { key: string; href: string }[]][]).map(
            ([group, links]) => (
              <div key={group} className="flex flex-col gap-4">
                <p className="text-white/30 text-[10px] font-semibold tracking-[0.18em] uppercase">
                  {t(`footer.${group}`)}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ key, href }) => (
                    <li key={key}>
                      <Link
                        href={href}
                        className="text-white/50 hover:text-white/85 text-[13.5px] transition-colors duration-150"
                      >
                        {t(`footer.${key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-surface-border">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {year} Trime Agency. All rights reserved.
          </p>
          <span className="text-white/25 text-xs">{t('footer.direct')}</span>
        </div>

      </div>
    </footer>
  );
}
