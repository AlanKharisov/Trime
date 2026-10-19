'use client';

import { Footer } from './Footer';
import { Header } from './Header';
import { useLocale } from './LocaleProvider';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { c } = useLocale();
  return (
    <>
      <a href="#main" className="skip-link">{c.skip}</a>
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  );
}
