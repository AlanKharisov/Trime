'use client';

import { useEffect, useState } from 'react';

const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'uk', label: 'Українська', short: 'UK' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'pt', label: 'Português', short: 'PT' },
] as const;

type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

const LANGUAGE_CODES = new Set<string>(SUPPORTED_LANGUAGES.map(({ code }) => code));
const COUNTRY_TO_LANGUAGE: Record<string, LanguageCode> = {
  ES: 'es', MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es',
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', TJ: 'ru',
  UA: 'uk',
  DE: 'de', AT: 'de', CH: 'de',
  FR: 'fr', BE: 'fr', LU: 'fr',
  PT: 'pt', BR: 'pt',
};

const GOOGLE_SCRIPT_ID = 'trime-google-translate-script';
const GOOGLE_WIDGET_ID = 'trime-google-translate-widget';
const LANGUAGE_STORAGE_KEY = 'trime-language';
const googleReadyCallbacks: Array<() => void> = [];

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (options: Record<string, unknown>, elementId: string) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function browserLanguage(): LanguageCode | null {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const match = languages
    .map((language) => language?.split('-')[0].toLowerCase())
    .find((language) => LANGUAGE_CODES.has(language));
  return (match as LanguageCode | undefined) ?? null;
}

function setGoogleCookie(language: LanguageCode) {
  document.cookie = `googtrans=/en/${language};path=/;max-age=31536000;SameSite=Lax`;
}

function translateWithGoogle(language: LanguageCode) {
  setGoogleCookie(language);
  document.documentElement.lang = language;

  if (language === 'en') {
    document.cookie = 'googtrans=;path=/;max-age=0;SameSite=Lax';
    window.location.reload();
    return;
  }

  const apply = (attempt = 0) => {
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = language;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }
    if (attempt < 20) window.setTimeout(() => apply(attempt + 1), 100);
  };
  apply();
}

function initializeGoogleTranslate() {
  const TranslateElement = window.google?.translate?.TranslateElement;
  const widget = document.getElementById(GOOGLE_WIDGET_ID);
  if (!TranslateElement || !widget) return false;
  if (!widget.querySelector('.goog-te-combo')) {
    new TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'es,ru,uk,de,fr,pt',
        autoDisplay: false,
      },
      GOOGLE_WIDGET_ID,
    );
  }
  return true;
}

function loadGoogleTranslate(onReady: () => void) {
  googleReadyCallbacks.push(onReady);

  if (!document.getElementById('trime-google-translate-style')) {
    const style = document.createElement('style');
    style.id = 'trime-google-translate-style';
    style.textContent = `
      .goog-te-banner-frame,
      .skiptranslate iframe,
      .goog-te-balloon-frame,
      #goog-gt-tt { display: none !important; }
      body { top: 0 !important; }
    `;
    document.head.appendChild(style);
  }

  window.googleTranslateElementInit = () => {
    if (initializeGoogleTranslate()) {
      const callbacks = googleReadyCallbacks.splice(0);
      callbacks.forEach((callback) => callback());
    }
  };

  if (initializeGoogleTranslate()) {
    const callbacks = googleReadyCallbacks.splice(0);
    callbacks.forEach((callback) => callback());
    return;
  }

  if (document.getElementById(GOOGLE_SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = GOOGLE_SCRIPT_ID;
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

async function detectCountry(): Promise<string | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2500);
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

function languageName(code: LanguageCode) {
  return SUPPORTED_LANGUAGES.find((language) => language.code === code)?.label ?? 'English';
}

/** A small visible control plus safe automatic country/browser detection. */
export function LanguageSwitcher() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const initial = stored && LANGUAGE_CODES.has(stored)
      ? (stored as LanguageCode)
      : browserLanguage() ?? 'en';

    setLanguage(initial);
    document.documentElement.lang = initial;

    loadGoogleTranslate(() => {
      if (!cancelled && initial !== 'en') {
        window.setTimeout(() => translateWithGoogle(initial), 100);
      }
    });

    if (!stored) {
      detectCountry().then((detectedCountry) => {
        if (cancelled || !detectedCountry) return;
        setCountry(detectedCountry);
        const detectedLanguage = COUNTRY_TO_LANGUAGE[detectedCountry];
        if (initial === 'en' && detectedLanguage && detectedLanguage !== 'en') {
          setLanguage(detectedLanguage);
          window.setTimeout(() => translateWithGoogle(detectedLanguage), 100);
        }
      });
    }

    return () => { cancelled = true; };
  }, []);

  function handleChange(next: LanguageCode) {
    setLanguage(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    translateWithGoogle(next);
  }

  return (
    <div className="language-control" aria-label="Language and location">
      <span className="language-location" title={country ? `Detected country: ${country}` : 'Language detected from your browser'}>
        {country ?? 'AUTO'}
      </span>
      <label className="sr-only" htmlFor="language-select">Choose language</label>
      <select
        id="language-select"
        className="language-select"
        value={language}
        onChange={(event) => handleChange(event.target.value as LanguageCode)}
        aria-label={`Language: ${languageName(language)}`}
      >
        {SUPPORTED_LANGUAGES.map(({ code, label, short }) => (
          <option key={code} value={code}>{short} · {label}</option>
        ))}
      </select>
      <div id={GOOGLE_WIDGET_ID} className="google-translate-widget" aria-hidden="true" />
    </div>
  );
}

/** Backwards-compatible mount point used by the marketing layout. */
export function AutoTranslate() {
  return <LanguageSwitcher />;
}
