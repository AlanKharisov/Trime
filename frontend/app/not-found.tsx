'use client';

import Link from 'next/link';
import { useLocale } from '@/components/layout/LocaleProvider';

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-brand-500 font-mono text-sm tracking-widest">404</p>
      <h1 className="text-display-xl font-bold">{t('notFound.title')}</h1>
      <p className="text-white/50 max-w-sm">
        {t('notFound.description')}
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl transition-colors text-sm font-medium"
      >
        {t('notFound.cta')}
      </Link>
    </div>
  );
}
