// Server Component — ServiceCard handles all client-side interactivity.
import { FadeIn } from '@/components/animations/FadeIn';
import { ServiceCard, type ServiceData } from './ServiceCard';

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const icons = {
  palette: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7"  cy="9"  r="1.2" fill="currentColor" />
      <circle cx="13" cy="9"  r="1.2" fill="currentColor" />
      <circle cx="10" cy="13" r="1.2" fill="currentColor" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <path d="M10 2l1.5 4.5H16l-3.75 2.75L13.75 14 10 11.25 6.25 14l1.5-4.75L4 6.5h4.5L10 2z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  layout: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7h16M7 7v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
      <path d="M2 10l8-5 8 5-8 5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 14l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6l8-4 8 4"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ─── Design service definitions ───────────────────────────────────────────────
const DESIGN_SERVICES: ServiceData[] = [
  {
    id:          'wireframes',
    icon:        icons.layout,
    label:       'UX Research',
    name:        'Wireframes & Prototyping',
    price:       '$200–$400',
    priceNote:   'fixed project price',
    description:
      'Low- to high-fidelity wireframes and clickable Figma prototypes for testing ' +
      'concepts before writing a single line of code. Cuts revision cycles in half.',
    cta:         'Get a quote',
    href:        '/#contact',
    accentColor: 'bg-gradient-to-r from-violet-700 to-violet-500',
  },
  {
    id:          'brand',
    icon:        icons.sparkles,
    label:       'Brand Identity',
    name:        'Brand Identity Package',
    price:       '$300–$600',
    priceNote:   'fixed project price',
    description:
      'Logo, colour palette, typography system, and a concise brand guide — ' +
      'everything needed to show up consistently across web, print, and socials.',
    cta:         'Get a quote',
    href:        '/#contact',
    accentColor: 'bg-gradient-to-r from-rose-700 to-rose-500',
  },
  {
    id:          'ui-ux',
    icon:        icons.palette,
    label:       'Full UI/UX',
    name:        'UI/UX Design — Full Product',
    price:       '$500–$800',
    priceNote:   'starting from',
    description:
      'End-to-end product design: user flows, component library, responsive screen ' +
      'designs, and a developer-ready Figma handoff with named tokens.',
    features: [
      'User flow & journey mapping',
      'Full responsive screen designs',
      'Interactive Figma prototype',
      'Design token & component library',
    ],
    cta:         'Start your design',
    href:        '/#contact',
    featured:    true,
    badgeText:   'Most Requested',
    accentColor: 'bg-gradient-to-r from-brand-600 via-violet-500 to-rose-500',
  },
  {
    id:          'design-system',
    icon:        icons.layers,
    label:       'Systems',
    name:        'Design System / Style Guide',
    price:       '$400–$700',
    priceNote:   'fixed project price',
    description:
      'A scalable Figma design system with documented components, spacing rules, ' +
      'and accessibility guidelines — built to grow with your product.',
    cta:         'Get a quote',
    href:        '/#contact',
    accentColor: 'bg-gradient-to-r from-amber-700 to-amber-500',
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────
const PROCESS = [
  { step: '01', title: 'Discovery',  detail: 'Brand audit, competitor review, and user research to establish design direction.' },
  { step: '02', title: 'Wireframes', detail: 'Low-fi skeletons agreed before any visual polish begins. No wasted rounds.' },
  { step: '03', title: 'Design',     detail: 'High-fidelity screens built in Figma with a shared component library.' },
  { step: '04', title: 'Handoff',    detail: 'Dev-ready export with named tokens, specs, and a recorded walkthrough.' },
] as const;

// ─── Section ──────────────────────────────────────────────────────────────────
export function DesignServices() {
  return (
    <section
      id="design-services"
      aria-label="Design Services and Pricing"
      className="relative py-section overflow-hidden"
    >
      {/* ── Section background: diagonal stripe texture ──────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 40px)',
        }}
      />

      {/* Gradient fade edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            'radial-gradient(ellipse 70% 40% at 50% 0%,   rgba(13,13,15,0.97) 0%, transparent 100%)',
            'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(13,13,15,0.97) 0%, transparent 100%)',
          ].join(', '),
        }}
      />

      {/* Accent glow — violet, top-left, contrasts with DevServices blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-16 w-[520px] h-[520px] -z-10"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
      />

      <div className="section-wrapper">

        {/* ── Section header ────────────────────────────────────────────── */}
        <FadeIn className="max-w-2xl mb-14">
          <p className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 font-mono">
            {'// design_services'}
          </p>
          <h2 className="text-display-xl font-bold text-white mb-5">
            Design that converts,{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-300 via-pink-300 to-rose-400 bg-clip-text text-transparent">
              not just impresses.
            </span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Every pixel is a decision. Our designer brings a background in cognitive
            psychology to every project — so layouts guide users toward action, not
            just look good in a portfolio screenshot.
          </p>
        </FadeIn>

        {/* ── Cards grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start mb-16">
          {DESIGN_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* ── Process timeline strip ───────────────────────────────────── */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden">

            <div className="px-6 py-5 border-b border-surface-border flex items-center justify-between gap-4">
              <p className="text-white font-semibold text-sm">Our design process</p>
              <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase hidden sm:block">
                4-step workflow
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-surface-border">
              {PROCESS.map(({ step, title, detail }) => (
                <div
                  key={step}
                  className="group px-6 py-6 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors duration-200"
                >
                  <span className="font-mono text-[11px] font-bold text-violet-500 tracking-widest">
                    {step}
                  </span>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/40 text-[13px] leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Tool badges ──────────────────────────────────────────────── */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <span className="text-xs text-white/25 mr-1 tracking-widest uppercase font-mono">Tools</span>
            {['Figma', 'FigJam', 'Framer', 'Adobe Illustrator', 'Lottie', 'Zeroheight'].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-surface-border bg-surface-card text-white/45 hover:text-white/70 hover:border-violet-500/30 transition-colors duration-150 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
