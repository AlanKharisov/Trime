'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FloatingOrbs } from '@/components/animations/FloatingOrbs';
import { CountUp } from '@/components/animations/CountUp';
import { HeroObject3D } from '@/components/animations/HeroObject3D';
import { useLocale } from '@/components/layout/LocaleProvider';

// ─── Animation variants ───────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordReveal = {
  hidden:  { opacity: 0, y: 40, rotateX: -40 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Tech stack pill data ─────────────────────────────────────────────────────
const STACK = ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Node.js', 'Figma'] as const;

export function Hero() {
  const { t } = useLocale();
  const stats = [
    { value: '50+', label: t('hero.statProjects') },
    { value: '98%', label: t('hero.statSatisfaction') },
    { value: '4×', label: t('hero.statPerformance') },
  ];

  return (
    <section
      aria-label="Hero"
      className="hero-section relative isolate min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >

      {/* ── Animated background orbs ─────────────────────────────────────── */}
      <FloatingOrbs
        orbs={[
          { cx: '50%', cy: '20%', size: 520, color: 'rgba(37,88,255,0.16)', duration: 18, delay: 0 },
          { cx: '85%', cy: '60%', size: 380, color: 'rgba(37,88,255,0.08)', duration: 22, delay: 2 },
          { cx: '15%', cy: '70%', size: 340, color: 'rgba(255,92,53,0.07)', duration: 20, delay: 4 },
        ]}
      />

      {/* Dot-grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 85% 70% at 50% 40%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 70% at 50% 40%, black 30%, transparent 100%)',
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="section-wrapper w-full">
        <div className="hero-layout">
          <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="hero-copy flex flex-col items-center text-center xl:items-start xl:text-left gap-6"
          >

          {/* Eyebrow badge */}
          <motion.div variants={item}>
            <span className={cn(
              'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full',
              'border border-brand-500/30 bg-brand-500/10',
              'text-brand-300 text-xs font-semibold tracking-widest uppercase',
            )}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              {t('hero.eyebrow')}
            </span>
          </motion.div>

          {/* Headline with per-word reveal */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-display-2xl font-bold tracking-tight"
          >
            <span className="block overflow-hidden">
              <motion.span variants={wordReveal} className="inline-block">{t('hero.h1a')}</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={wordReveal} className="inline-block">
                <span className="relative inline-block">
                  <span className="text-gradient">{t('hero.h1b')}</span>
                  <motion.svg
                    viewBox="0 0 320 12"
                    fill="none"
                    className="absolute -bottom-2 left-0 w-full"
                    aria-hidden
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.path
                      d="M4 8 C80 3, 160 10, 316 5"
                      stroke="url(#underline-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="underline-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#7aa0ff" />
                        <stop offset="100%" stopColor="#2558ff" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={wordReveal} className="inline-block text-white/90">{t('hero.h1c')}</motion.span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-lg text-white/55 max-w-2xl leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Social proof — avatars + star count */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 pt-1"
          >
            {/* Stacked avatar placeholders */}
            <div className="flex -space-x-2.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                  className="w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ zIndex: 5 - i }}
                  aria-hidden
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
            </div>
            <div className="text-sm text-white/50">
              <span className="text-white font-semibold">{t('hero.clients')}</span>
              {' '}{t('hero.clientsTail')}
            </div>
          </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-stage"
          >
            <HeroObject3D labels={{
              designCode: t('hero.designCode'),
              satisfaction: t('hero.satisfaction'),
              move: t('hero.move'),
            }} />
          </motion.div>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 1.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-12 lg:mt-16 max-w-3xl mx-auto w-full rounded-2xl overflow-hidden border border-surface-border bg-surface-border"
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden:  { opacity: 0, y: 24, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-surface-card px-6 py-6 flex flex-col items-center sm:items-start gap-1"
            >
              <span className="text-3xl font-bold text-gradient">
                <CountUp value={value} />
              </span>
              <span className="text-sm text-white/45">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tech stack pills ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-10"
          aria-label="Technologies we use"
        >
          <span className="text-xs text-white/25 mr-1 tracking-widest uppercase">{t('hero.builtWith')}</span>
          {STACK.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.08, borderColor: 'rgba(37,88,255,0.5)', y: -2 }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                'border border-surface-border bg-surface-card text-white/50',
                'transition-colors duration-150 cursor-default',
              )}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">{t('hero.scroll')}</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
        />
      </motion.div>
    </section>
  );
}
