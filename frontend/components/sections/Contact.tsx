'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import {
  BUDGETS, EMPTY_ORDER, LIMITS, PROJECT_TYPES, TIMELINES, validateOrder,
  type OrderErrors, type OrderField, type OrderValues,
} from '@/lib/order';
import { CONTACT, ORDER_ENDPOINT, SECTIONS } from '@/lib/site';
import { Icon } from '../Icon';
import { useLocale } from '../LocaleProvider';

type Failure = 'generic' | 'network' | 'rateLimited' | 'notConfigured';
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; failure: Failure | 'invalid' };

const FIELD_ORDER: OrderField[] = ['name', 'contact', 'projectType', 'description', 'budget', 'timeline', 'website'];
const REQUEST_TIMEOUT_MS = 15_000;

function Field({
  id, label, optional, error, children,
}: { id: OrderField; label: string; optional?: string; error?: string; children: ReactNode }) {
  return (
    <div className={`field field--${id}${error ? ' field--error' : ''}`}>
      <label htmlFor={`f-${id}`} className="field__label">
        {label}{optional ? <span className="field__opt"> · {optional}</span> : <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`f-${id}-error`} className="field__error">
          <Icon name="alert" size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const { c, locale } = useLocale();
  const t = c.contact;
  const [values, setValues] = useState<OrderValues>(EMPTY_ORDER);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => { startedAt.current = Date.now(); }, []);
  useEffect(() => { if (status.kind === 'success') successRef.current?.focus(); }, [status.kind]);

  const sending = status.kind === 'sending';

  const update = (field: OrderField) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    // Clear a field's error as soon as it is edited.
    if (errors[field]) setErrors(({ [field]: _removed, ...rest }) => rest);
    if (status.kind === 'error') setStatus({ kind: 'idle' });
  };

  const focusFirstInvalid = (found: OrderErrors) => {
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) document.getElementById(`f-${first}`)?.focus();
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const found = validateOrder(values);
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus({ kind: 'error', failure: 'invalid' });
      focusFirstInvalid(found);
      return;
    }
    if (!ORDER_ENDPOINT) {
      setStatus({ kind: 'error', failure: 'notConfigured' });
      alertRef.current?.focus();
      return;
    }

    setStatus({ kind: 'sending' });
    const honeypot = (formRef.current?.elements.namedItem('fax') as HTMLInputElement | null)?.value ?? '';
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let failure: Failure = 'generic';
    try {
      const response = await fetch(ORDER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale, startedAt: startedAt.current, fax: honeypot }),
        credentials: 'omit',
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; fields?: OrderField[] };

      if (response.ok && result.ok === true) {
        setStatus({ kind: 'success' });
        return;
      }
      if (response.status === 400 && Array.isArray(result.fields) && result.fields.length) {
        const serverErrors = Object.fromEntries(result.fields.map((f) => [f, true])) as OrderErrors;
        setErrors(serverErrors);
        setStatus({ kind: 'error', failure: 'invalid' });
        focusFirstInvalid(serverErrors);
        return;
      }
      if (response.status === 429) failure = 'rateLimited';
      else if (response.status === 503) failure = 'notConfigured';
    } catch {
      failure = 'network';
    } finally {
      window.clearTimeout(timer);
    }
    setStatus({ kind: 'error', failure });
    // Wait for the alert to render before moving focus to it.
    window.requestAnimationFrame(() => alertRef.current?.focus());
  }

  const reset = () => {
    setValues(EMPTY_ORDER);
    setErrors({});
    setStatus({ kind: 'idle' });
    startedAt.current = Date.now();
    window.requestAnimationFrame(() => document.getElementById('f-name')?.focus());
  };

  const err = (f: OrderField) => (errors[f] ? t.errors[f] : undefined);
  const aria = (f: OrderField) => ({
    id: `f-${f}`,
    name: f,
    value: values[f],
    onChange: update(f),
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? `f-${f}-error` : undefined,
  });

  const failure = status.kind === 'error' ? status.failure : null;
  const telegram = CONTACT.telegram;

  return (
    <section id={SECTIONS.contact} className="section section--contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact">
          <div className="contact__ring" aria-hidden="true" />
          <div className="contact__copy">
            <p className="eyebrow eyebrow--muted">{t.eyebrow}</p>
            <h2 id="contact-title" className="h2">{t.title}</h2>
            <p className="lead">{t.lead}</p>
            <ul className="checks">
              {t.points.map((p) => <li key={p}><Icon name="check" size={16} /> {p}</li>)}
            </ul>
          </div>

          <div className="contact__form">
            {status.kind === 'success' ? (
              <div className="success" role="status">
                <span className="success__icon"><Icon name="check" size={22} /></span>
                <h3 ref={successRef} tabIndex={-1} className="success__title">{t.success.title}</h3>
                <p className="body">{t.success.text}</p>
                <button type="button" className="btn btn--soft" onClick={reset}>{t.success.again}</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate aria-busy={sending} className="form">
                {!ORDER_ENDPOINT && process.env.NODE_ENV === 'development' && (
                  <p className="dev-note">{t.devNotConfigured}</p>
                )}
                <fieldset disabled={sending} className="form__grid">
                  <legend className="sr-only">{t.title}</legend>
                  <Field id="name" label={t.labels.name} error={err('name')}>
                    <input {...aria('name')} type="text" autoComplete="name" maxLength={LIMITS.name} placeholder={t.placeholders.name} required />
                  </Field>
                  <Field id="contact" label={t.labels.contact} error={err('contact')}>
                    <input {...aria('contact')} type="text" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} maxLength={LIMITS.contact} placeholder={t.placeholders.contact} required />
                  </Field>
                  <Field id="projectType" label={t.labels.projectType} error={err('projectType')}>
                    <div className="select">
                      <select {...aria('projectType')} required>
                        <option value="" disabled>{t.placeholders.projectType}</option>
                        {PROJECT_TYPES.map((p) => <option key={p} value={p}>{t.projectTypes[p]}</option>)}
                      </select>
                      <Icon name="chevronDown" size={16} />
                    </div>
                  </Field>
                  <Field id="description" label={t.labels.description} error={err('description')}>
                    <textarea {...aria('description')} rows={4} maxLength={LIMITS.description} placeholder={t.placeholders.description} required />
                  </Field>
                  <Field id="budget" label={t.labels.budget} optional={t.labels.optional} error={err('budget')}>
                    <div className="select">
                      <select {...aria('budget')}>
                        <option value="">{t.placeholders.select}</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{t.budgets[b]}</option>)}
                      </select>
                      <Icon name="chevronDown" size={16} />
                    </div>
                  </Field>
                  <Field id="timeline" label={t.labels.timeline} optional={t.labels.optional} error={err('timeline')}>
                    <div className="select">
                      <select {...aria('timeline')}>
                        <option value="">{t.placeholders.select}</option>
                        {TIMELINES.map((x) => <option key={x} value={x}>{t.timelines[x]}</option>)}
                      </select>
                      <Icon name="chevronDown" size={16} />
                    </div>
                  </Field>
                  <Field id="website" label={t.labels.website} optional={t.labels.optional} error={err('website')}>
                    <input {...aria('website')} type="text" inputMode="url" autoComplete="url" autoCapitalize="off" spellCheck={false} maxLength={LIMITS.website} placeholder={t.placeholders.website} />
                  </Field>

                  {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
                  <div className="hp" aria-hidden="true">
                    <label htmlFor="f-fax">Fax</label>
                    <input id="f-fax" name="fax" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                  </div>
                </fieldset>

                {failure && (
                  <div ref={alertRef} tabIndex={-1} className="form__alert" role="alert">
                    <Icon name="alert" size={16} />
                    <span>
                      {failure === 'invalid' ? t.errors.summary : t.failure[failure]}
                      {failure !== 'invalid' && telegram && (
                        <> <a href={telegram.href} target="_blank" rel="noopener noreferrer">{t.failure.telegram} ({telegram.label})</a></>
                      )}
                    </span>
                  </div>
                )}

                <button type="submit" className="btn btn--submit" disabled={sending}>
                  {sending ? (<><span className="spinner" aria-hidden="true" /> {t.sending}</>) : (<>{t.submit} <Icon name="arrowRight" size={18} /></>)}
                </button>
                <p className="form__note">{t.note}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
