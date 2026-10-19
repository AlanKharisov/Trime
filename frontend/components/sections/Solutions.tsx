'use client';

import { SECTIONS } from '@/lib/site';
import { Icon, type IconName } from '../Icon';
import { useLocale } from '../LocaleProvider';
import { SectionHead } from '../SectionHead';

const ICONS: IconName[] = ['building', 'chart', 'rocket', 'globe'];

export function Solutions() {
  const { c } = useLocale();
  return (
    <section id={SECTIONS.solutions} className="section" aria-labelledby="solutions-title">
      <div className="container">
        <SectionHead id="solutions-title" eyebrow={c.solutions.eyebrow} title={c.solutions.title} lead={c.solutions.lead} />
        <ul className="solutions-grid">
          {c.solutions.items.map((item, i) => (
            <li key={item.title} className="card solution">
              <div className="solution__top">
                <span className="icon-box"><Icon name={ICONS[i]} size={20} /></span>
                <span className="mono-label" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="h3">{item.title}</h3>
              <p className="body solution__text">{item.text}</p>
              <ul className="solution__list">
                {item.list.map((entry) => <li key={entry}>{entry}</li>)}
              </ul>
              <p className="budget">
                <span className="budget__label">{c.solutions.budget}</span>
                <span className="budget__value">{item.budget}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="footnote"><Icon name="info" size={16} /> {c.solutions.note}</p>
      </div>
    </section>
  );
}
