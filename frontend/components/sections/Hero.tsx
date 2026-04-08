'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Animation variants ───────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Tech stack pill data ─────────────────────────────────────────────────────
const STACK = ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Node.js', 'Figma'] as const;

// ─── Stat cards ───────────────────────────────────────────────────────────────
const STATS = [
  { value: '50+', label: 'Projects shipped' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '4×',  label: 'Avg. perf improvement' },
] as const;

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative isolate min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >

      {/* ── Background layers ────────────────────────────────────────────── */}
      {/* Radial gradient glow — top centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,88,255,0.18) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 40% at 80% 60%,  rgba(37,88,255,0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 35% at 10% 70%,  rgba(255,92,53,0.04) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Dot-grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
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

      {/* Animated orb — bottom left */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full -z-10"
        style={{ background: 'radial-gradient(circle, rgba(37,88,255,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="section-wrapper w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6"
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
              Full-Cycle Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-display-2xl font-bold tracking-tight"
          >
            We Build Products{' '}
            <span className="relative inline-block">
              <span className="text-gradient">People Love</span>
              {/* Underline accent */}
              <motion.svg
                viewBox="0 0 320 12"
                fill="none"
                className="absolute -bottom-2 left-0 w-full"
                aria-hidden
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            <br />
            <span className="text-white/90">From Concept to Code</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-lg text-white/55 max-w-2xl leading-relaxed"
          >
            A senior 4-person team covering the full stack — design systems, scalable
            back-ends, performance-tuned front-ends, and search rankings that actually
            move. One team, zero hand-off friction.
          </motion.p>


          {/* Social proof — avatars + star count */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 pt-1"
          >
            {/* Stacked avatar placeholders */}
            <div className="flex -space-x-2.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ zIndex: 5 - i }}
                  aria-hidden
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-white/50">
              <span className="text-white font-semibold">50+ clients</span>
              {' '}trust Trime with their product
            </div>
          </motion.div>
        </motion.div>

        {/* ── Stat cards ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-16 lg:mt-20 max-w-2xl mx-auto w-full rounded-2xl overflow-hidden border border-surface-border bg-surface-border"
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden:  { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="bg-surface-card px-6 py-6 flex flex-col items-center sm:items-start gap-1"
            >
              <span className="text-3xl font-bold text-gradient">{value}</span>
              <span className="text-sm text-white/45">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tech stack pills ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-10"
          aria-label="Technologies we use"
        >
          <span className="text-xs text-white/25 mr-1 tracking-widest uppercase">Built with</span>
          {STACK.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05, borderColor: 'rgba(37,88,255,0.5)' }}
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
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
        />
      </motion.div>
    </section>
  );
}
