'use client';

import { useEffect } from 'react';

const SUPPORTED = ['en', 'uk', 'ru'] as const;

declare global {
  interface Window {
    doGTranslate?: (pair: string) => void;
    googleTranslateElementInit2?: () => void;
  }
}

/**
 * Invisible component that auto-translates the page based on the user's
 * browser / system language (or approximate location via Intl.Locale).
 * Falls back to English for unsupported languages.
 */
export function AutoTranslate() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('google-translate-script')) return;

    // Hide the default Google Translate widget UI
    const style = document.createElement('style');
    style.textContent = `
      .skiptranslate iframe,
      .goog-te-banner-frame,
      #goog-gt-tt,
      .goog-tooltip,
      .goog-tooltip:hover,
      .goog-te-balloon-frame,
      .goog-te-menu-frame { display: none !important; }
      body { top: 0 !important; }
    `;
    document.head.appendChild(style);

    const translateTo = (lang: string) => {
      if (lang === 'en' || !window.doGTranslate) return;
      window.doGTranslate(`en|${lang}`);
    };

    const detectLang = () => {
      const raw =
        navigator.language ||
        (navigator as unknown as { userLanguage?: string }).userLanguage ||
        'en';
      const primary = raw.split('-')[0].toLowerCase();
      return SUPPORTED.includes(primary as typeof SUPPORTED[number]) ? primary : 'en';
    };

    window.googleTranslateElementInit2 = () => {
      translateTo(detectLang());
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
