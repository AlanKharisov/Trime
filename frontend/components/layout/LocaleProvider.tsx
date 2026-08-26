'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { TRANSLATIONS, type Locale } from '@/lib/translations';

const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'ru', 'uk'];
const MANUAL_LOCALE_KEY = 'trime-manual-locale';
const AUTO_LOCALE_KEY = 'trime-auto-locale';
const COUNTRY_KEY = 'trime-country-code';

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  ES: 'es', MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es', VE: 'es', EC: 'es', BO: 'es',
  PY: 'es', UY: 'es', CR: 'es', PA: 'es', GT: 'es', HN: 'es', NI: 'es', SV: 'es', DO: 'es', PR: 'es', CU: 'es',
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', TJ: 'ru', TM: 'ru', UZ: 'ru',
  UA: 'uk',
};

interface LocaleContextValue {
  locale: Locale;
  country: string | null;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && SUPPORTED_LOCALES.includes(value as Locale);
}

function detectBrowserLocale(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const match = languages
    .map((language) => language?.split('-')[0].toLowerCase())
    .find((language) => isLocale(language));
  return match ?? 'en';
}

async function detectCountry(): Promise<string | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 1800);

  try {
    const response = await fetch('https://ipapi.co/json/', {
      credentials: 'omit',
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { country_code?: string };
    return data.country_code?.toUpperCase() ?? null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const manualLocale = window.localStorage.getItem(MANUAL_LOCALE_KEY);
    const cachedAutoLocale = window.sessionStorage.getItem(AUTO_LOCALE_KEY);
    const initialLocale = isLocale(manualLocale)
      ? manualLocale
      : isLocale(cachedAutoLocale)
        ? cachedAutoLocale
        : detectBrowserLocale();
    const cachedCountry = window.sessionStorage.getItem(COUNTRY_KEY);

    setLocaleState(initialLocale);
    document.documentElement.lang = initialLocale;
    if (cachedCountry) setCountry(cachedCountry);

    if (manualLocale) return () => { cancelled = true; };

    detectCountry().then((detectedCountry) => {
      if (cancelled || !detectedCountry) return;
      setCountry(detectedCountry);
      window.sessionStorage.setItem(COUNTRY_KEY, detectedCountry);

      const detectedLocale = COUNTRY_TO_LOCALE[detectedCountry];
      if (detectedLocale) {
        window.sessionStorage.setItem(AUTO_LOCALE_KEY, detectedLocale);
        setLocaleState(detectedLocale);
        document.documentElement.lang = detectedLocale;
      }
    });

    return () => { cancelled = true; };
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(MANUAL_LOCALE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const t = useMemo(
    () => (key: string) => TRANSLATIONS[locale][key] ?? TRANSLATIONS.en[key] ?? key,
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, country, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
