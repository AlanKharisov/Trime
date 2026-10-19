'use client';

import { Fragment, useState, type ReactNode } from 'react';
import { sectionHref } from '@/lib/site';
import { Icon, type IconName } from '../Icon';
import { useLocale } from '../LocaleProvider';

const FEATURE_ICONS: IconName[] = ['code', 'message', 'layers', 'clock'];
const FILES = ['frontend', 'backend', 'product.ts', 'database', 'infrastructure', 'deployment'];

// Tiny token helpers for the decorative editor.
const k = (s: string) => <span className="tk-k">{s}</span>;
const f = (s: string) => <span className="tk-f">{s}</span>;
const s = (v: string) => <span className="tk-s">{v}</span>;
const b = (v: string) => <span className="tk-b">{v}</span>;

const TABS: { name: string; lines: ReactNode[] }[] = [
  {
    name: 'product.ts',
    lines: [
      <>{k('import')} {'{ '}{f('ship')}{' }'} {k('from')} {s("'@trime/core'")};</>,
      '',
      <>{k('export const')} {f('createProduct')} = {k('async')} () ⇒ {'{'}</>,
      <>  {k('const')} plan = {k('await')} {f('discover')}(idea);</>,
      <>  {k('return')} {f('ship')}({'{'}</>,
      <>    design: plan.ui,</>,
      <>    stack: [{s("'next'")}, {s("'node'")}, {s("'go'")}],</>,
      <>    tests: {b('true')},</>,
      <>    launch: {b('true')},</>,
      <>  {'});'}</>,
      <>{'};'}</>,
      null,
    ],
  },
  {
    name: 'api.ts',
    lines: [
      <>{k('import')} {'{ '}{f('router')}{' }'} {k('from')} {s("'./server'")};</>,
      '',
      <>{f('router')}.{f('post')}({s("'/orders'")}, {k('async')} (req) ⇒ {'{'}</>,
      <>  {k('const')} order = {k('await')} {f('validate')}(req.body);</>,
      <>  {k('await')} db.orders.{f('create')}(order);</>,
      <>  {k('await')} {f('notify')}(order);</>,
      <>  {k('return')} {'{ '}ok: {b('true')}{' }'};</>,
      <>{'});'}</>,
      null,
    ],
  },
  {
    name: 'schema.prisma',
    lines: [
      <>{k('model')} {f('Product')} {'{'}</>,
      <>  id        {f('String')}   @id</>,
      <>  name      {f('String')}</>,
      <>  launched  {f('Boolean')}  @default({b('true')})</>,
      <>  createdAt {f('DateTime')} @default({f('now')}())</>,
      <>{'}'}</>,
      null,
    ],
  },
];

/** Renders "*word*" segments in the accent colour. */
function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

export function Hero() {
  const { c } = useLocale();
  const [tab, setTab] = useState(0);
  const lines = TABS[tab].lines;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--muted">{c.hero.eyebrow}</p>
          <h1 id="hero-title" className="h1"><Accent text={c.hero.title} /></h1>
          <p className="lead">{c.hero.lead}</p>
          <div className="hero__ctas">
            <a href={sectionHref('contact')} className="btn btn--primary btn--lg">
              {c.hero.start} <Icon name="arrowRight" size={18} />
            </a>
            <a href={sectionHref('work')} className="btn btn--ghost btn--lg">{c.hero.view}</a>
          </div>
          <ul className="hero__features">
            {c.hero.features.map((label, i) => (
              <li key={label} className="feature">
                <span className="icon-box icon-box--sm"><Icon name={FEATURE_ICONS[i]} size={16} /></span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <div className="ring" aria-hidden="true" />
          <figure className="editor" aria-label={c.hero.editorLabel}>
            <div className="editor__top">
              <span className="editor__dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="editor__path">trime / product</span>
            </div>
            <div className="editor__tabs" role="tablist" aria-label="Files">
              {TABS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  tabIndex={tab === i ? 0 : -1}
                  className="editor__tab"
                  onClick={() => setTab(i)}
                  onKeyDown={(e) => {
                    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                    const next = (i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
                    setTab(next);
                    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
                  }}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <div className="editor__body">
              <ul className="editor__tree" aria-hidden="true">
                {FILES.map((name) => (
                  <li key={name} className={name === 'product.ts' ? 'is-active' : undefined}>
                    <Icon name={name.includes('.') ? 'file' : 'folder'} size={14} /> {name}
                  </li>
                ))}
              </ul>
              <pre className="editor__code" role="tabpanel" aria-label={TABS[tab].name}>
                <code>
                  {lines.map((line, i) => (
                    <span key={`${tab}-${i}`} className="editor__line">
                      <span className="editor__ln" aria-hidden="true">{i + 1}</span>
                      {line === null ? <span className="tk-c">{c.hero.editorComment}</span> : line}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
            <div className="editor__status">
              <span>main · TypeScript</span>
              <span className="editor__ok"><i aria-hidden="true" /> {c.hero.buildPassing}</span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
