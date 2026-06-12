'use client';

import { useEffect } from 'react';

const SUPPORTED = ['en', 'uk', 'ru'] as const;

// Map common country codes to target language.
const COUNTRY_TO_LANG: Record<string, string> = {
  UA: 'uk',
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
};

declare global {
  interface Window {
    doGTranslate?: (pair: string) => void;
    googleTranslateElementInit2?: () => void;
  }
}

async function detectLangByIP(): Promise<string | null> {
  try {
    const res = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      credentials: 'omit',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { country_code?: string };
    const country = data.country_code?.toUpperCase();
    return country && COUNTRY_TO_LANG[country] ? COUNTRY_TO_LANG[country] : null;
  } catch {
    return null;
  }
}

function detectLangByBrowser(): string {
  const raw =
    navigator.language ||
    (navigator as unknown as { userLanguage?: string }).userLanguage ||
    'en';
  const primary = raw.split('-')[0].toLowerCase();
  return SUPPORTED.includes(primary as typeof SUPPORTED[number]) ? primary : 'en';
}

/**
 * Invisible component that auto-translates the page based on the user's
 * language / location. Uses browser language first, then falls back to IP
 * geolocation. Defaults to English for unsupported regions.
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

    const runDetection = async () => {
      const browserLang = detectLangByBrowser();
      if (browserLang !== 'en') {
        translateTo(browserLang);
        return;
      }
      // Browser is English — try IP geolocation as a fallback.
      const ipLang = await detectLangByIP();
      if (ipLang) {
        translateTo(ipLang);
      }
    };

    window.googleTranslateElementInit2 = () => {
      runDetection();
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
