'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

// ─── Mobile menu animation variants ─────────────────────────────────────────
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -12 },
  open:   (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Hamburger icon ───────────────────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between" aria-hidden>
      <motion.span
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="block h-px w-full bg-white origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-full bg-white"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="block h-px w-full bg-white origin-center"
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function Navbar() {
  const pathname          = usePathname();
  const [open, setOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef            = useRef<HTMLElement>(null);

  // Close menu when route changes
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Scroll-aware background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      ref={navRef}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-surface-border shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
          : 'bg-transparent',
      )}
    >
      <div className="section-wrapper">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <Link href="/" className="relative flex items-center gap-2.5 shrink-0 focus-ring rounded-lg" aria-label="Trime Agency home">
            <Image
              src="/logo-placeholder.png"
              alt="Trime Agency"
              width={32}
              height={32}
              className="rounded-md"
              priority
            />
            <span className="font-semibold text-white text-[15px] tracking-tight hidden sm:block">
              Trime<span className="text-brand-400">.</span>
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────────────── */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus-ring',
                    active
                      ? 'text-white'
                      : 'text-white/55 hover:text-white/90',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                'group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg',
                'bg-brand-500 hover:bg-brand-400 active:bg-brand-600',
                'text-white text-sm font-semibold',
                'shadow-glow hover:shadow-glow-lg',
                'transition-all duration-200 focus-ring',
              )}
            >
              Start a project
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 14 14" aria-hidden
              >
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/[0.06] transition-colors focus-ring"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden border-t border-surface-border bg-surface/95 backdrop-blur-xl"
          >
            <nav
              aria-label="Mobile"
              className="section-wrapper py-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map(({ label, href }, i) => {
                const active = pathname === href || pathname.startsWith(href + '/');
                return (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center px-4 py-3 rounded-xl text-[15px] font-medium transition-colors duration-150',
                        active
                          ? 'bg-white/[0.08] text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.05]',
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="pt-2 mt-1 border-t border-surface-border"
              >
                <Link
                  href="/contact"
                  className={cn(
                    'flex items-center justify-center gap-2 px-4 py-3 rounded-xl',
                    'bg-brand-500 hover:bg-brand-400',
                    'text-white text-[15px] font-semibold',
                    'transition-colors duration-150',
                  )}
                >
                  Start a project
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14" aria-hidden>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
