'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Validation schema ────────────────────────────────────────────────────────
const schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name is too long.'),
  email: z
    .string()
    .email('Please enter a valid email address.'),
  service: z
    .string()
    .min(1, 'Please select a service.'),
  company: z.string().max(100).optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message is too long (max 2000 characters).'),
});

type FormData = z.infer<typeof schema>;
type FormState = 'idle' | 'loading' | 'success' | 'error';

// ─── Service dropdown options (mirrors both service sections) ─────────────────
const SERVICE_OPTIONS = [
  { value: '',                label: 'Select a service…'              },
  { value: 'business-site',   label: 'Business Site / Upgraded Site'  },
  { value: 'frontend',        label: 'Simple Site / Promo Page'       },
  { value: 'backend',         label: 'Full-Stack / E-commerce Build'  },
  { value: 'telegram-bot',    label: 'Telegram Bot Development'       },
  { value: 'ui-ux',           label: 'UI/UX Design — Full Product'    },
  { value: 'brand',           label: 'Brand Identity Package'         },
  { value: 'wireframes',      label: 'Wireframes & Prototyping'       },
  { value: 'design-system',   label: 'Design System / Style Guide'    },
  { value: 'other',           label: 'Other / Not sure yet'           },
] as const;

const BUDGET_OPTIONS = [
  { value: '',        label: 'Budget range (optional)' },
  { value: 'under-5k', label: 'Under $500'             },
  { value: '5k-15k',   label: '$500 – $1,500'          },
  { value: '15k-50k',  label: '$1,500 – $5,000'        },
  { value: '50k+',     label: '$5,000+'                },
] as const;

// ─── Small sub-components ─────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0,  height: 'auto' }}
          exit={{    opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="text-rose-400 text-xs mt-1.5 flex items-center gap-1.5"
          role="alert"
        >
          <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 shrink-0" aria-hidden>
            <path d="M6 1L1 10h10L6 1zm0 3v3m0 2v.01" stroke="currentColor"
                  strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </svg>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputBase = cn(
  'w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25',
  'bg-white/[0.04] border border-surface-border',
  'hover:border-white/20 focus:border-brand-500/60 focus:bg-white/[0.06]',
  'outline-none ring-0 transition-[border-color,background-color] duration-200',
  'disabled:opacity-50 disabled:cursor-not-allowed',
);

const errorBorder = 'border-rose-500/60 focus:border-rose-500/80';

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{    opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-16 px-8 gap-6"
    >
      {/* Animated checkmark */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-brand-500/15 border border-brand-500/40 flex items-center justify-center">
          <motion.svg
            viewBox="0 0 40 40" fill="none" className="w-10 h-10"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.path
              d="M10 21l7 7 13-14"
              stroke="#7aa0ff" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </motion.svg>
        </div>
      </div>

      <div>
        <h3 className="text-white text-xl font-bold mb-2">Message received!</h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
          We'll review your enquiry and get back to you within 1–2 business days.
          Check your inbox for a confirmation.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors duration-150 underline underline-offset-4"
      >
        Send another message
      </button>
    </motion.div>
  );
}

// ─── Info panel (right column) ────────────────────────────────────────────────
function InfoPanel() {
  return (
    <div className="flex flex-col gap-8 lg:pt-2">

      {/* Heading */}
      <div>
        <p className="text-brand-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3 font-mono">
          {'// get_in_touch'}
        </p>
        <h2 className="text-display-lg font-bold text-white mb-4">
          Let's build something{' '}
          <span className="text-gradient">great together.</span>
        </h2>
        <p className="text-white/50 text-[15px] leading-relaxed">
          Tell us what you're working on and we'll come back with a straight-talking
          scope, timeline, and price — no boilerplate proposals.
        </p>
      </div>

      {/* Contact details */}
      <div className="flex flex-col gap-4">
        {[
          {
            icon: (
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden>
                <path d="M2 5l7.5 5L17 5M2 5h15v11H2V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            ),
            label: 'Email us',
            value: 'hello@trime.agency',
            href:  'mailto:hello@trime.agency',
          },
          {
            icon: (
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden>
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ),
            label: 'Response time',
            value: 'Within 1–2 business days',
            href:  null,
          },
        ].map(({ icon, label, value, href }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-surface-border flex items-center justify-center text-white/40 shrink-0 mt-0.5">
              {icon}
            </div>
            <div>
              <p className="text-white/35 text-xs font-medium mb-0.5">{label}</p>
              {href ? (
                <a href={href} className="text-white/80 hover:text-white text-sm transition-colors duration-150">
                  {value}
                </a>
              ) : (
                <p className="text-white/80 text-sm">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust strip */}
      <div className="rounded-xl border border-surface-border bg-surface-card p-5 flex flex-col gap-3">
        <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase">
          What to expect
        </p>
        {[
          'A brief scope document within 48 hours',
          'Fixed price — no hourly billing surprises',
          'Direct Slack channel with your team',
          '30-day post-launch support included',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" aria-hidden>
              <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white/55 text-[13px] leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const isLoading = formState === 'loading' || isSubmitting;

  const onSubmit = async (data: FormData) => {
    setFormState('loading');
    setServerError(null);

    try {
      const res = await fetch('/api/backend/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });

      const json = await res.json() as { success: boolean; error?: string };

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? 'Something went wrong. Please try again.');
      }

      setFormState('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
      setFormState('error');
    }
  };

  const handleReset = () => {
    reset();
    setFormState('idle');
    setServerError(null);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Trime Agency"
      className="relative py-section overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(37,88,255,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">

          {/* ── Left: info panel ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <InfoPanel />
          </motion.div>

          {/* ── Right: form card ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-2xl border border-surface-border bg-surface-card shadow-card overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <SuccessScreen key="success" onReset={handleReset} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{    opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="p-6 sm:p-8 flex flex-col gap-5"
                  aria-label="Contact form"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-white/50 mb-1.5">
                        Name <span className="text-brand-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={isLoading}
                        {...register('name')}
                        className={cn(inputBase, errors.name && errorBorder)}
                      />
                      <FieldError message={errors.name?.message} />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-white/50 mb-1.5">
                        Email <span className="text-brand-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        aria-invalid={!!errors.email}
                        disabled={isLoading}
                        {...register('email')}
                        className={cn(inputBase, errors.email && errorBorder)}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>

                  {/* Service + Budget row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-xs font-medium text-white/50 mb-1.5">
                        Service needed <span className="text-brand-500">*</span>
                      </label>
                      <select
                        id="service"
                        aria-invalid={!!errors.service}
                        disabled={isLoading}
                        {...register('service')}
                        className={cn(
                          inputBase,
                          'appearance-none cursor-pointer',
                          errors.service && errorBorder,
                          // Invert native arrow to work on dark bg
                          '[&>option]:bg-[#141418]',
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                          backgroundSize: '16px',
                          paddingRight: '36px',
                        }}
                      >
                        {SERVICE_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value} disabled={value === ''}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.service?.message} />
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-medium text-white/50 mb-1.5">
                        Budget range
                        <span className="text-white/25 font-normal ml-1">(optional)</span>
                      </label>
                      <select
                        id="budget"
                        disabled={isLoading}
                        {...register('budget')}
                        className={cn(
                          inputBase,
                          'appearance-none cursor-pointer [&>option]:bg-[#141418]',
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                          backgroundSize: '16px',
                          paddingRight: '36px',
                        }}
                      >
                        {BUDGET_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Company (optional) */}
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-white/50 mb-1.5">
                      Company
                      <span className="text-white/25 font-normal ml-1">(optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      disabled={isLoading}
                      {...register('company')}
                      className={inputBase}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-white/50 mb-1.5">
                      Message <span className="text-brand-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project — goals, current pain points, timeline…"
                      aria-invalid={!!errors.message}
                      disabled={isLoading}
                      {...register('message')}
                      className={cn(inputBase, 'resize-y min-h-[120px]', errors.message && errorBorder)}
                    />
                    <FieldError message={errors.message?.message} />
                  </div>

                  {/* Server error banner */}
                  <AnimatePresence>
                    {formState === 'error' && serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{    opacity: 0, y: -8 }}
                        role="alert"
                        className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm"
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden>
                          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M10 7v4M10 13v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span>{serverError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={isLoading ? {} : { scale: 1.02, y: -1 }}
                    whileTap={isLoading  ? {} : { scale: 0.98  }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={cn(
                      'relative w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl',
                      'bg-brand-500 text-white font-semibold text-sm',
                      'shadow-glow hover:bg-brand-400 hover:shadow-glow-lg',
                      'transition-[background-color,box-shadow] duration-200',
                      'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-brand-500',
                      'focus-ring',
                    )}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isLoading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{    opacity: 0 }}
                          className="flex items-center gap-2.5"
                        >
                          {/* Spinner */}
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25"/>
                            <path d="M8 2a6 6 0 016 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Sending…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{    opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          Send message
                          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden>
                            <path d="M2 8l12 0M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <p className="text-center text-white/25 text-xs">
                    No spam. Your information is never shared with third parties.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
