import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Our Work' };

export default function WorkPage() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden py-40">
      <div className="section-wrapper flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="mb-4 font-mono text-xs font-semibold tracking-[0.2em] text-brand-400 uppercase">
          {'// selected_work'}
        </p>
        <h1 className="text-display-xl max-w-3xl font-bold text-white">
          Good work starts with a <span className="text-gradient">clear first step.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
          We are preparing a focused case-study collection. Until then, message us for recent examples relevant to your product.
        </p>
        <Link
          href="/#contact"
          className="mt-10 inline-flex rounded-2xl bg-brand-500 px-7 py-4 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-400 focus-ring"
        >
          Ask about a project
        </Link>
      </div>
    </section>
  );
}
