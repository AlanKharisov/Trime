'use client';

import { SECTIONS, sectionHref } from '@/lib/site';
import { Icon } from '../Icon';
import { useLocale } from '../LocaleProvider';
import { SectionHead } from '../SectionHead';

// Approved V2 starting prices (USD), in display order. Not fixed quotes.
const PRICES: { amount: string; monthly?: boolean }[] = [
  { amount: '$500' }, { amount: '$1,500' }, { amount: '$2,500' },
  { amount: '$3,500' }, { amount: '$3,000' }, { amount: '$400' },
  { amount: '$400' }, { amount: '$100' }, { amount: '$150', monthly: true },
];

export function Pricing() {
  const { c } = useLocale();
  return (
    <section id={SECTIONS.pricing} className="section" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHead id="pricing-title" eyebrow={c.pricing.eyebrow} title={c.pricing.title} />
        <ul className="price-table">
          {c.pricing.items.map((item, i) => (
            <li key={item.title} className="price">
              <div>
                <h3 className="price__title">{item.title}</h3>
                <p className="price__text">{item.text}</p>
              </div>
              <p className="price__value">
                <span className="price__from">{c.pricing.from}</span>
                <span className="price__amount">
                  {PRICES[i].amount}
                  {PRICES[i].monthly && <small>{c.pricing.perMonth}</small>}
                </span>
              </p>
            </li>
          ))}
        </ul>
        <div className="pricing__foot">
          <p className="footnote"><Icon name="info" size={16} /> {c.pricing.note}</p>
          <a href={sectionHref('contact')} className="btn btn--primary">
            {c.pricing.cta} <Icon name="arrowRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
