'use client';
import { motion } from 'framer-motion';

const CEO_TELEGRAM = 'https://t.me/kostikov99';

// ─── Main component ───────────────────────────────────────────────────────────
export function Contact() {
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
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-10">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-brand-400 text-xs font-semibold tracking-[0.2em] uppercase font-mono">
              {'// get_in_touch'}
            </p>
            <h2 className="text-display-lg font-bold text-white">
              Want to start a project?{' '}
              <span className="text-gradient">Message our CEO.</span>
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-lg">
              Skip the forms. Reach out directly to Alexander — he'll get back to you
              personally and help scope your project from day one.
            </p>
          </motion.div>

          {/* Telegram CTA */}
          <motion.a
            href={CEO_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-semibold text-base shadow-glow hover:shadow-glow-lg transition-[background-color,box-shadow] duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
              <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Write to Alexander on Telegram
          </motion.a>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/25 text-xs"
          >
            We respond within 48 hours · No spam · Direct communication
          </motion.p>

        </div>
      </div>
    </section>
  );
}
