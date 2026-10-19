'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { CONTENT, LOCALES, type Content, type Locale } from '@/lib/content';

// Same detection as V1: manual choice → cached auto choice → browser language,
// then a background country lookup that may switch es/ru/uk automatically.
const MANUAL_LOCALE_KEY = 'trime-manual-locale';
const AUTO_LOCALE_KEY = 'trime-auto-locale';

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  ES: 'es', MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es', VE: 'es', EC: 'es', BO: 'es',
  PY: 'es', UY: 'es', CR: 'es', PA: 'es', GT: 'es', HN: 'es', NI: 'es', SV: 'es', DO: 'es', PR: 'es', CU: 'es',
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', TJ: 'ru', TM: 'ru', UZ: 'ru',
  UA: 'uk',
};

const isLocale = (value: string | null | undefined): value is Locale =>
  LOCALES.some((l) => l.code === value);

function read(storage: () => Storage, key: string) {
  try { return storage().getItem(key); } catch { return null; }
}
function write(storage: () => Storage, key: string, value: string) {
  try { storage().setItem(key, value); } catch { /* storage blocked — keep in memory only */ }
}

function browserLocale(): Locale {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.map((l) => l?.split('-')[0].toLowerCase()).find(isLocale) ?? 'en';
}

async function detectCountry(): Promise<string | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 1800);
  try {
    const response = await fetch('https://ipapi.co/json/', { credentials: 'omit', signal: controller.signal });
    if (!response.ok) return null;
    const data = (await response.json()) as { country_code?: string };
    return data.country_code?.toUpperCase() ?? null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

interface LocaleContextValue {
  locale: Locale;
  c: Content;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    const manual = read(() => localStorage, MANUAL_LOCALE_KEY);
    if (isLocale(manual)) {
      setLocaleState(manual);
      return;
    }
    const cached = read(() => sessionStorage, AUTO_LOCALE_KEY);
    setLocaleState(isLocale(cached) ? cached : browserLocale());
    if (isLocale(cached)) return;

    detectCountry().then((country) => {
      const detected = country ? COUNTRY_TO_LOCALE[country] : undefined;
      if (cancelled || !detected) return;
      write(() => sessionStorage, AUTO_LOCALE_KEY, detected);
      setLocaleState(detected);
    });
    return () => { cancelled = true; };
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    write(() => localStorage, MANUAL_LOCALE_KEY, next);
  };

  return (
    <LocaleContext.Provider value={{ locale, c: CONTENT[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
