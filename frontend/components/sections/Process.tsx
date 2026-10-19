'use client';

import { SECTIONS } from '@/lib/site';
import { useLocale } from '../LocaleProvider';
import { SectionHead } from '../SectionHead';

export function Process() {
  const { c } = useLocale();
  return (
    <section id={SECTIONS.process} className="section" aria-labelledby="process-title">
      <div className="container">
        <SectionHead id="process-title" eyebrow={c.process.eyebrow} title={c.process.title} />
        <ol className="timeline">
          {c.process.steps.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step__node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="h3">{step.title}</h3>
                <p className="body">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
