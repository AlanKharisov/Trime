'use client';

import { useEffect } from 'react';

const SUPPORTED = ['en', 'uk', 'ru'] as const;

// Browser / system language detection is the most reliable signal.
// IP geolocation is only used as a fallback when the browser is in English.
const COUNTRY_TO_LANG: Record<string, string> = {
  // Russian-speaking
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', TJ: 'ru', TM: 'ru', UZ: 'ru',
  // Ukrainian
  UA: 'uk',
  // Western Europe
  ES: 'es', FR: 'fr', DE: 'de', IT: 'it', PT: 'pt', NL: 'nl', BE: 'fr',
  CH: 'de', AT: 'de', SE: 'sv', DK: 'da', NO: 'no', FI: 'fi', IE: 'en',
  GB: 'en', UK: 'en', US: 'en', CA: 'en', AU: 'en', NZ: 'en',
  // Central / Eastern Europe
  PL: 'pl', CZ: 'cs', SK: 'sk', HU: 'hu', RO: 'ro', BG: 'bg', HR: 'hr',
  SI: 'sl', LT: 'lt', LV: 'lv', EE: 'et', BA: 'bs', RS: 'sr', MK: 'mk',
  AL: 'sq', GR: 'el', MT: 'mt', CY: 'el',
  // Americas
  MX: 'es', AR: 'es', CL: 'es', CO: 'es', PE: 'es', VE: 'es', EC: 'es',
  BO: 'es', PY: 'es', UY: 'es', CR: 'es', PA: 'es', GT: 'es', HN: 'es',
  NI: 'es', SV: 'es', DO: 'es', PR: 'es', CU: 'es',
  BR: 'pt',
  // Asia
  JP: 'ja', KR: 'ko', CN: 'zh-CN', TW: 'zh-TW', HK: 'zh-TW', SG: 'en',
  MY: 'ms', ID: 'id', TH: 'th', VN: 'vi', PH: 'tl', IN: 'hi', BD: 'bn',
  PK: 'ur', IR: 'fa', IL: 'he', SA: 'ar', AE: 'ar', TR: 'tr',
  // Africa / Middle East
  ZA: 'af', NG: 'en', EG: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar', KE: 'sw',
  // Oceania
  ID_OCEANIA: 'en',
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
 * language / location.
 *
 * 1. Browser language first (ru/uk/en supported natively).
 * 2. If browser is English, fall back to IP geolocation country → language.
 * 3. Default to English for unsupported regions.
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
