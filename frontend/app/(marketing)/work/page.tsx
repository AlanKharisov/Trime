'use client';

import Link from 'next/link';
import { useLocale } from '@/components/layout/LocaleProvider';

export default function WorkPage() {
  const { t } = useLocale();
  return (
    <section className="relative min-h-[70vh] overflow-hidden py-40">
      <div className="section-wrapper flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="mb-4 font-mono text-xs font-semibold tracking-[0.2em] text-brand-400 uppercase">
          {t('work.eyebrow')}
        </p>
        <h1 className="text-display-xl max-w-3xl font-bold text-white">
          {t('work.titleA')} <span className="text-gradient">{t('work.titleB')}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
          {t('work.description')}
        </p>
        <Link
          href="/#contact"
          className="mt-10 inline-flex rounded-2xl bg-brand-500 px-7 py-4 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-400 focus-ring"
        >
          {t('work.cta')}
        </Link>
      </div>
    </section>
  );
}
