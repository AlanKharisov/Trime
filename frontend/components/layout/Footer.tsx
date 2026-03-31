import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/constants';

const FOOTER_LINKS = {
  'Dev Services': [
    { label: 'Business Site',      href: '/#dev-services' },
    { label: 'Simple / Promo',     href: '/#dev-services' },
    { label: 'Full-Stack Build',   href: '/#dev-services' },
    { label: 'Telegram Bots',      href: '/#dev-services' },
  ],
  'Design Services': [
    { label: 'UI/UX Design',       href: '/#design-services' },
    { label: 'Brand Identity',     href: '/#design-services' },
    { label: 'Wireframes',         href: '/#design-services' },
    { label: 'Design Systems',     href: '/#design-services' },
  ],
  'Company': [
    { label: 'About Us',           href: '/#about'   },
    { label: 'Our Work',           href: '/#work'    },
    { label: 'Contact',            href: '/#contact' },
  ],
} as const;

const SOCIAL_ICONS: Record<string, { label: string; path: string }> = {
  twitter: {
    label: 'Twitter / X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.844l4.262 5.632L18.244 2.25z',
  },
  linkedin: {
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  github: {
    label: 'GitHub',
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  dribbble: {
    label: 'Dribbble',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.814 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z',
  },
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-surface-border" aria-label="Site footer">

      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"
      />

      <div className="section-wrapper">

        {/* ── Main footer grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 py-16">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-2.5 w-fit" aria-label="Trime Agency home">
              <Image
                src="/logo-placeholder.png"
                alt="Trime Agency logo"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="font-semibold text-white text-[15px]">
                Trime<span className="text-brand-400">.</span>
              </span>
            </Link>

            <p className="text-white/40 text-[13.5px] leading-relaxed max-w-[260px]">
              A senior 4-person digital agency building fast, beautiful, and
              search-optimised products.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-1">
              {(Object.entries(SOCIAL_LINKS) as [keyof typeof SOCIAL_LINKS, string][]).map(
                ([key, href]) => {
                  const icon = SOCIAL_ICONS[key];
                  if (!icon) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={icon.label}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-surface-border bg-surface-card text-white/35 hover:text-white/70 hover:border-white/20 transition-all duration-150"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
                        <path d={icon.path} />
                      </svg>
                    </a>
                  );
                }
              )}
            </div>
          </div>

          {/* Link columns */}
          {(Object.entries(FOOTER_LINKS) as [string, readonly { label: string; href: string }[]][]).map(
            ([group, links]) => (
              <div key={group} className="flex flex-col gap-4">
                <p className="text-white/30 text-[10px] font-semibold tracking-[0.18em] uppercase">
                  {group}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-white/50 hover:text-white/85 text-[13.5px] transition-colors duration-150"
                      >
                        {label}
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
          <div className="flex items-center gap-4">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Use',   href: '/terms'   },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white/25 hover:text-white/50 text-xs transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
