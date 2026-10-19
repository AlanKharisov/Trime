'use client';

import { SiteShell } from '@/components/SiteShell';
import { useLocale } from '@/components/LocaleProvider';

function NotFoundContent() {
  const { c } = useLocale();
  return (
    <section className="section not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="h2">{c.notFound.title}</h1>
        <p className="lead">{c.notFound.text}</p>
        <a href="/" className="btn btn--primary">{c.notFound.cta}</a>
      </div>
    </section>
  );
}

export default function NotFound() {
  return <SiteShell><NotFoundContent /></SiteShell>;
}
