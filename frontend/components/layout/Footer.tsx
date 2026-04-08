import Link from 'next/link';

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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 py-16">

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
          <Link
            href="/privacy"
            className="text-white/25 hover:text-white/50 text-xs transition-colors duration-150"
          >
            Privacy Policy
          </Link>
        </div>

      </div>
    </footer>
  );
}
