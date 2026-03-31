// Server Component — ServiceCard handles all client-side interactivity.
import { FadeIn } from '@/components/animations/FadeIn';
import { ServiceCard, type ServiceData } from './ServiceCard';

// ─── Inline SVG icons (avoids a client import for lucide-react) ───────────────
const icons = {
  globe: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2c0 0-4 3.5-4 8s4 8 4 8M10 2c0 0 4 3.5 4 8s-4 8-4 8M2 10h16"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <rect x="2" y="3" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <rect x="2" y="3"  width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="12" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15.5" cy="5.5"  r="1" fill="currentColor" />
      <circle cx="15.5" cy="14.5" r="1" fill="currentColor" />
    </svg>
  ),
  bot: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <rect x="3" y="7" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11h.01M13 11h.01M7 14h6" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 7V4M8 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// ─── Service definitions ──────────────────────────────────────────────────────
const SERVICES: ServiceData[] = [
  {
    id:          'business-site',
    icon:        icons.globe,
    label:       'Web Presence',
    name:        'Business Site / Upgraded Site',
    price:       '$400–$700',
    priceNote:   'fixed project price',
    description:
      'A polished, SEO-ready marketing site or a full redesign of an existing one. ' +
      'Includes responsive layout, performance audit, and on-page optimisation.',
    cta:         'Get a quote',
    href:        '/contact?service=business-site',
    accentColor: 'bg-gradient-to-r from-brand-700 to-brand-500',
  },
  {
    id:          'frontend',
    icon:        icons.monitor,
    label:       'Frontend',
    name:        'Simple Site / Promo Page',
    price:       '$250',
    priceNote:   'flat rate',
    description:
      'A fast, visually sharp promotional or landing page. Perfect for product launches, ' +
      'events, or micro-brands that need to look great without the full-site overhead.',
    cta:         'Get a quote',
    href:        '/contact?service=frontend',
    accentColor: 'bg-gradient-to-r from-sky-700 to-sky-500',
  },
  {
    id:          'backend',
    icon:        icons.server,
    label:       'Full-Stack / E-commerce',
    name:        'Backend — Full Site',
    price:       '$750',
    priceNote:   'starting from',
    description:
      'Complete full-stack build with a production-grade back-end. Covers ' +
      'everything needed to run a real transactional business online.',
    features: [
      'User Authentication (OAuth + email/password)',
      'Shopping Cart & Wishlist',
      'Online Payment (Stripe / PayPal integration)',
      'Admin Panel with order & inventory management',
    ],
    cta:         'Start your build',
    href:        '/contact?service=backend',
    featured:    true,
    badgeText:   'Full Solution',
    accentColor: 'bg-gradient-to-r from-brand-600 via-brand-500 to-sky-500',
  },
  {
    id:          'telegram-bot',
    icon:        icons.bot,
    label:       'Automation',
    name:        'Telegram Bot Development',
    price:       '$200–$400',
    priceNote:   'fixed project price',
    description:
      'Custom Telegram bots for notifications, onboarding flows, customer support ' +
      'automation, or internal tooling. Built with grammY / Telegraf and hosted for you.',
    cta:         'Get a quote',
    href:        '/contact?service=telegram-bot',
    accentColor: 'bg-gradient-to-r from-sky-600 to-cyan-500',
  },
];

// ─── Trust indicators ─────────────────────────────────────────────────────────
const TRUST = [
  { value: '7d',   label: 'Average delivery for simple projects' },
  { value: '100%', label: 'Source code ownership transferred' },
  { value: '30d',  label: 'Post-launch support included' },
] as const;

// ─── Section ──────────────────────────────────────────────────────────────────
export function DevServices() {
  return (
    <section
      id="dev-services"
      aria-label="Developer Services and Pricing"
      className="relative py-section overflow-hidden"
    >
      {/* ── Section background: circuit-board line grid ─────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: [
            'linear-gradient(to right,  rgba(255,255,255,1) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '64px 64px',
        }}
      />

      {/* Gradient fade edges so grid doesn't hard-clip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            'radial-gradient(ellipse 70% 40% at 50% 0%,   rgba(13,13,15,0.95) 0%, transparent 100%)',
            'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(13,13,15,0.95) 0%, transparent 100%)',
            'radial-gradient(ellipse 20% 100% at 0%   50%, rgba(13,13,15,0.8)  0%, transparent 100%)',
            'radial-gradient(ellipse 20% 100% at 100% 50%, rgba(13,13,15,0.8)  0%, transparent 100%)',
          ].join(', '),
        }}
      />

      {/* Accent glow — top-right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 w-[480px] h-[480px] -z-10"
        style={{ background: 'radial-gradient(circle, rgba(37,88,255,0.07) 0%, transparent 70%)' }}
      />

      <div className="section-wrapper">

        {/* ── Section header ────────────────────────────────────────────── */}
        <FadeIn className="max-w-2xl mb-14">
          <p className="text-brand-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 font-mono">
            {'// dev_services'}
          </p>
          <h2 className="text-display-xl font-bold text-white mb-5">
            Transparent pricing.{' '}
            <span className="text-gradient">No surprises.</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Fixed-price projects mean you know the cost before a single line is written.
            Every tier includes clean, documented code and a live deployment — ready to
            hand over or hand off.
          </p>
        </FadeIn>

        {/* ── Service cards grid ────────────────────────────────────────── */}
        {/*
          Desktop layout intent:
            [Business Site] [Frontend]   [Backend ★] [Telegram Bot]
          The Backend card is naturally taller thanks to the feature list,
          which gives it visual prominence without breaking the grid.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start mb-14">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* ── "What's always included" strip ───────────────────────────── */}
        <FadeIn delay={0.15}>
          <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden">

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-surface-border">
              <p className="text-white font-semibold text-sm">
                Every project includes
              </p>
              <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                no hidden extras
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
              {[
                { icon: '🔐', text: 'HTTPS / SSL' },
                { icon: '📱', text: 'Mobile-first' },
                { icon: '⚡', text: 'Core Web Vitals' },
                { icon: '🔎', text: 'Basic on-page SEO' },
                { icon: '🚀', text: 'Deployment' },
                { icon: '📄', text: 'Source code handover' },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 px-5 py-4 hover:bg-white/[0.02] transition-colors duration-150"
                >
                  <span className="text-base leading-none" aria-hidden>{icon}</span>
                  <span className="text-white/55 text-[12.5px] font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Trust stats row ───────────────────────────────────────────── */}
        <FadeIn delay={0.25}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-12 pt-12 border-t border-surface-border">
            {TRUST.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <span className="font-mono text-3xl font-bold text-gradient">{value}</span>
                <span className="text-white/40 text-sm max-w-[180px] leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
