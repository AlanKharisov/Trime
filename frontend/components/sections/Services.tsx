'use client';

import { SECTIONS } from '@/lib/site';
import { Icon, type IconName } from '../Icon';
import { useLocale } from '../LocaleProvider';
import { SectionHead } from '../SectionHead';

const ICONS: IconName[] = ['monitor', 'smartphone', 'database', 'bag', 'cog', 'rocket'];

export function Services() {
  const { c } = useLocale();
  return (
    <section id={SECTIONS.services} className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHead id="services-title" eyebrow={c.services.eyebrow} title={c.services.title} lead={c.services.lead} />
        <ul className="services-grid">
          {c.services.items.map((item, i) => (
            <li key={item.title} className="card card--hover service">
              <span className="icon-box"><Icon name={ICONS[i]} size={20} /></span>
              <div>
                <h3 className="h3">{item.title}</h3>
                <p className="body">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
