'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
  { code: 'ru', label: 'RU' },
];

declare global {
  interface Window {
    doGTranslate?: (pair: string) => void;
    googleTranslateElementInit2?: () => void;
  }
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const [current, setCurrent] = useState('en');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('google-translate-script')) {
      setLoaded(true);
      return;
    }

    // Hide the default Google Translate widget via CSS
    const style = document.createElement('style');
    style.textContent = `
      .skiptranslate iframe,
      .goog-te-banner-frame,
      #goog-gt-tt,
      .goog-tooltip,
      .goog-tooltip:hover,
      .goog-te-balloon-frame,
      #goog-gt-tt,
      .goog-te-menu-frame { display: none !important; }
      body { top: 0 !important; }
    `;
    document.head.appendChild(style);

    window.googleTranslateElementInit2 = () => {
      setLoaded(true);
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (code: string) => {
    setCurrent(code);
    if (code === 'en') {
      // Restore original language
      const frame = document.querySelector('.goog-te-banner-frame');
      if (frame) {
        (frame as HTMLIFrameElement).contentDocument
          ?.querySelector('button[id*=":0.restore"]')
          ?.dispatchEvent(new MouseEvent('click'));
      }
      return;
    }
    if (window.doGTranslate) {
      window.doGTranslate(`en|${code}`);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleChange(code)}
          disabled={!loaded && code !== 'en'}
          className={cn(
            'px-2 py-1 rounded-md text-[11px] font-semibold tracking-wider transition-colors duration-200',
            current === code
              ? 'bg-white/10 text-white'
              : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]',
          )}
          aria-label={`Translate to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
