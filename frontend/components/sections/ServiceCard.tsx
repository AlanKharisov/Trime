'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ServiceData {
  id:          string;
  icon:        React.ReactNode;
  label:       string;          // eyebrow / category label
  name:        string;
  price:       string;          // display price string, e.g. "$400–$700"
  priceNote?:  string;          // sub-label under price, e.g. "starting from"
  description: string;
  features?:   string[];        // bullet list — shown only when provided
  cta:         string;
  href:        string;
  featured?:   boolean;         // drives special border + badge treatment
  accentColor: string;          // Tailwind bg class for the top stripe
  badgeText?:  string;          // e.g. "Most Popular"
}

// ─── Check-mark icon ─────────────────────────────────────────────────────────
function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn('w-4 h-4', className)} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
export function ServiceCard({ service }: { service: ServiceData }) {
  const { featured } = service;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hovered"
      className={cn(
        'relative flex flex-col rounded-2xl overflow-hidden transition-[box-shadow,border-color] duration-300',
        featured
          ? 'border border-brand-500/50 bg-gradient-to-b from-brand-950/80 to-surface-card shadow-glow hover:shadow-glow-lg'
          : 'border border-surface-border bg-surface-card hover:border-brand-500/25 hover:shadow-[0_0_30px_-8px_rgba(37,88,255,0.2)]',
      )}
    >
      {/* Popular badge */}
      {service.badgeText && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-bold tracking-wider uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            {service.badgeText}
          </span>
        </div>
      )}

      {/* Top colour stripe */}
      <div className={cn('h-1 w-full', service.accentColor)} />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6 gap-5">

        {/* Icon + label */}
        <div className="flex items-start justify-between">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            featured
              ? 'bg-brand-500/20 text-brand-300'
              : 'bg-white/[0.05] text-white/50',
          )}>
            {service.icon}
          </div>
          <span className={cn(
            'text-[10px] font-semibold tracking-[0.15em] uppercase pt-1',
            featured ? 'text-brand-400' : 'text-white/30',
          )}>
            {service.label}
          </span>
        </div>

        {/* Service name */}
        <div>
          <h3 className="text-white font-semibold text-[17px] leading-snug">
            {service.name}
          </h3>
        </div>

        {/* Price — monospace for the terminal/dev feel */}
        <div className="py-4 border-y border-surface-border">
          {service.priceNote && (
            <p className="text-white/35 text-[10px] font-medium tracking-widest uppercase mb-1 font-mono">
              {service.priceNote}
            </p>
          )}
          <motion.p
            variants={{ hovered: { color: featured ? '#7aa0ff' : '#ffffff' } }}
            transition={{ duration: 0.2 }}
            className={cn(
              'font-mono font-bold tracking-tight leading-none',
              featured ? 'text-brand-300 text-4xl' : 'text-white text-3xl',
            )}
          >
            {service.price}
          </motion.p>
        </div>

        {/* Description */}
        <p className="text-white/50 text-[13.5px] leading-relaxed flex-1">
          {service.description}
        </p>

        {/* Feature list — only on featured / full-spec cards */}
        {service.features && service.features.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {service.features.map((feat) => (
              <li
                key={feat}
                className={cn(
                  'flex items-start gap-2.5 text-sm',
                  featured ? 'text-brand-200' : 'text-white/65',
                )}
              >
                <span className={featured ? 'text-brand-400' : 'text-white/30'}>
                  <Check />
                </span>
                {feat}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <motion.div
          variants={{ hovered: { x: 2 } }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="mt-auto pt-1"
        >
          <Link
            href={service.href}
            className={cn(
              'group w-full inline-flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus-ring',
              featured
                ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-glow hover:shadow-glow-lg'
                : 'bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.07] hover:border-white/[0.15] text-white/70 hover:text-white',
            )}
          >
            {service.cta}
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Hover glow edge (non-featured cards) */}
      {!featured && (
        <motion.div
          variants={{ hovered: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
        />
      )}
    </motion.article>
  );
}
