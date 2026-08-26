'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/TextReveal';
import { FloatingOrbs } from '@/components/animations/FloatingOrbs';
import { ServiceCard, type ServiceData } from './ServiceCard';
import { useLocale } from '@/components/layout/LocaleProvider';

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
};

// ─── Design service definitions ───────────────────────────────────────────────
const DESIGN_SERVICES: ServiceData[] = [
  {
    id:          'ui-ux',
    icon:        icons.palette,
    label:       'Full UI/UX',
    name:        'Turnkey Website Design',
    price:       '$80–$150 / page',
    priceNote:   'or from $500 for a full website',
    description:
      'Complete website design from structure to handoff. Ideal when you need a ' +
      'ready-to-build visual system instead of isolated screens.',
    features: [
      'UI/UX design',
      'Mobile and desktop versions',
      'Figma layout',
      'Interactive Figma prototype',
      'Developer-ready handoff',
    ],
    cta:         'Start your design',
    href:        '/#contact',
    featured:    true,
    badgeText:   'Most Requested',
    accentColor: 'bg-gradient-to-r from-brand-600 via-violet-500 to-rose-500',
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
  const { t } = useLocale();
  const designServices = DESIGN_SERVICES.map((service) => ({
    ...service,
    label: t('design.service.label'),
    name: t('design.service.name'),
    priceNote: t('design.service.priceNote'),
    description: t('design.service.description'),
    features: service.features?.map((_, index) => t(`design.feature${index + 1}`)),
    cta: t('service.designCta'),
    badgeText: t('design.service.badge'),
  }));
  const process = [
    { step: '01', title: t('process.discovery.title'), detail: t('process.discovery.detail') },
    { step: '02', title: t('process.wireframes.title'), detail: t('process.wireframes.detail') },
    { step: '03', title: t('process.design.title'), detail: t('process.design.detail') },
    { step: '04', title: t('process.handoff.title'), detail: t('process.handoff.detail') },
  ];

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

      {/* Floating orbs */}
      <FloatingOrbs
        orbs={[
          { cx: '15%', cy: '25%', size: 360, color: 'rgba(139,92,246,0.08)', duration: 20, delay: 1 },
          { cx: '85%', cy: '70%', size: 280, color: 'rgba(236,72,153,0.05)', duration: 18, delay: 4 },
        ]}
      />

      <div className="section-wrapper">

        {/* ── Section header ────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <TextReveal as="p" className="text-violet-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 font-mono">
            {t('design.eyebrow')}
          </TextReveal>
          <TextReveal as="h2" className="text-display-xl font-bold text-white mb-5">
            {t('design.titleA')}{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-300 via-pink-300 to-rose-400 bg-clip-text text-transparent">
              {t('design.titleB')}
            </span>
          </TextReveal>
          <TextReveal as="p" delay={0.1} className="text-white/55 text-lg leading-relaxed">
            {t('design.description')}
          </TextReveal>
        </div>

        {/* ── Cards grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 max-w-md mx-auto mb-16">
          {designServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* ── Process timeline strip ───────────────────────────────────── */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden">

            <div className="px-6 py-5 border-b border-surface-border flex items-center justify-between gap-4">
              <p className="text-white font-semibold text-sm">{t('design.processTitle')}</p>
              <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase hidden sm:block">
                {t('design.processNote')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-surface-border">
              {process.map(({ step, title, detail }) => (
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
            <span className="text-xs text-white/25 mr-1 tracking-widest uppercase font-mono">{t('design.tools')}</span>
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
