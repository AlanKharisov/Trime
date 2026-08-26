'use client';

import { LOCALE_LABELS, type Locale } from '@/lib/translations';
import { useLocale } from './LocaleProvider';

const LOCALES: Locale[] = ['en', 'es', 'ru', 'uk'];

/** Lightweight local language control. Country detection runs in the background. */
export function LanguageSwitcher() {
  const { locale, country, setLocale, t } = useLocale();

  return (
    <div className="language-control" aria-label={t('language.choose')}>
      <span
        className="language-location"
        title={country ? `${country} · ${t('language.auto')}` : t('language.auto')}
      >
        {country ?? 'AUTO'}
      </span>
      <label className="sr-only" htmlFor="language-select">{t('language.choose')}</label>
      <select
        id="language-select"
        className="language-select"
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={`${t('language.choose')}: ${LOCALE_LABELS[locale].label}`}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code].short} · {LOCALE_LABELS[code].label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function AutoTranslate() {
  return <LanguageSwitcher />;
}
