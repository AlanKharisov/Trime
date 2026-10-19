'use client';

import { SECTIONS, SHOW_PLACEHOLDERS, sectionHref } from '@/lib/site';
import { Icon } from '../Icon';
import { useLocale } from '../LocaleProvider';
import { SectionHead } from '../SectionHead';

// Schematic previews drawn in CSS. They stand in for the 1600×1000
// screenshots of real projects, which have not been supplied yet.
function Preview({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <div className="pv pv--dash">
        <div className="pv__side"><i /><i /><i /><i /><i /></div>
        <div className="pv__main">
          <div className="pv__kpis"><i /><i /><i /></div>
          <svg className="pv__chart" viewBox="0 0 240 110" preserveAspectRatio="none">
            <path d="M0 90 L30 80 L58 86 L88 58 L118 66 L148 38 L176 44 L206 22 L240 28 L240 110 L0 110 Z" className="pv__area" />
            <path d="M0 90 L30 80 L58 86 L88 58 L118 66 L148 38 L176 44 L206 22 L240 28" className="pv__line" />
          </svg>
        </div>
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="pv pv--shop">
        <i className="pv__bar" />
        <div className="pv__products">{Array.from({ length: 6 }, (_, i) => <div key={i}><b /><i /></div>)}</div>
      </div>
    );
  }
  return (
    <div className="pv pv--phones">
      <div className="pv__phone"><i className="pv__bar" /><b /><i /><i /><i /></div>
      <div className="pv__phone pv__phone--mid">
        <i className="pv__bar" />
        <svg viewBox="0 0 80 40"><path d="M2 34 L18 22 L30 28 L46 12 L58 18 L78 4" className="pv__line" /></svg>
        <i /><i /><b className="pv__btn" />
      </div>
      <div className="pv__phone"><i className="pv__bar" /><b /><b /></div>
    </div>
  );
}

export function Work() {
  const { c } = useLocale();
  return (
    <section id={SECTIONS.work} className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" eyebrow={c.work.eyebrow} title={c.work.title} lead={c.work.lead} />

        {SHOW_PLACEHOLDERS ? (
          <ul className="work-grid">
            {c.work.items.map((item, i) => (
              <li key={item.title} className="card card--hover project">
                <div className="project__media">
                  <span className="demo-badge">{c.work.demo}</span>
                  <Preview variant={i} />
                </div>
                <div className="project__body">
                  <p className="eyebrow eyebrow--sm">{item.category}</p>
                  <h3 className="h3">{item.title}</h3>
                  <p className="body">{item.text}</p>
                  <ul className="chips" aria-label="Stack">
                    {item.stack.map((t) => <li key={t} className="chip">{t}</li>)}
                  </ul>
                  <span className="link link--disabled" aria-disabled="true">
                    {c.work.view} <Icon name="arrowRight" size={16} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card on-request">
            <div>
              <h3 className="h3">{c.work.onRequest.title}</h3>
              <p className="body">{c.work.onRequest.text}</p>
            </div>
            <a href={sectionHref('contact')} className="btn btn--ghost">
              {c.work.onRequest.cta} <Icon name="arrowRight" size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
