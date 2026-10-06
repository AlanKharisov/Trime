'use client';
import { useState, type FormEvent } from 'react';
import { useLocale } from '@/components/layout/LocaleProvider';

const ENDPOINT = process.env.NEXT_PUBLIC_ORDER_ENDPOINT;
const SERVICES = ['frontend', 'business', 'backend', 'bot', 'design', 'tech', 'other'];
const fieldClass = 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-400';

export function OrderForm() {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  if (!ENDPOINT) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(ENDPOINT!, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }), signal: controller.signal, credentials: 'omit',
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Delivery failed');
      form.reset();
      setStatus('success');
    } catch { setStatus('error'); }
    finally { window.clearTimeout(timeout); }
  }

  return (
    <form onSubmit={submit} onChange={() => { if (status !== 'sending') setStatus('idle'); }} className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 text-left space-y-5" aria-label={t('order.title')}>
      <h3 className="text-2xl font-semibold">{t('order.title')}</h3>
      <p className="text-sm text-white/50">{t('order.intro')}</p>
      <fieldset disabled={status === 'sending'} className="space-y-5 disabled:opacity-60">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block space-y-2 text-sm"><span>{t('order.name')} *</span><input name="name" autoComplete="name" required maxLength={100} className={fieldClass} /></label>
          <label className="block space-y-2 text-sm"><span>{t('order.contact')} *</span><input name="contact" required maxLength={200} placeholder={t('order.contactHint')} className={fieldClass} /></label>
        </div>
        <label className="block space-y-2 text-sm"><span>{t('order.service')} *</span>
          <select name="service" required defaultValue="" className={fieldClass}>
            <option value="" disabled className="bg-neutral-950">{t('order.choose')}</option>
            {SERVICES.map(service => <option key={service} value={service} className="bg-neutral-950">{t(service === 'design' ? 'design.service.name' : service === 'other' ? 'order.other' : `service.${service}.name`)}</option>)}
          </select>
        </label>
        <label className="block space-y-2 text-sm"><span>{t('order.details')} *</span><textarea name="details" required minLength={10} maxLength={2000} rows={5} placeholder={t('order.detailsHint')} className={`${fieldClass} resize-y`} /></label>
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block space-y-2 text-sm"><span>{t('order.budget')}</span><input name="budget" maxLength={100} placeholder={t('order.optional')} className={fieldClass} /></label>
          <label className="block space-y-2 text-sm"><span>{t('order.timeline')}</span><input name="timeline" maxLength={100} placeholder={t('order.optional')} className={fieldClass} /></label>
        </div>
        <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="text-xs leading-relaxed text-white/40">{t('order.privacy')}</p>
        <button type="submit" className="w-full rounded-xl bg-brand-500 px-6 py-4 font-semibold hover:bg-brand-400 transition-colors disabled:cursor-wait">{t(status === 'sending' ? 'order.sending' : 'order.submit')}</button>
      </fieldset>
      <div role="status" aria-live="polite">
        {status === 'success' && <p className="text-green-300 text-sm">{t('order.success')}</p>}
        {status === 'error' && <p className="text-orange-300 text-sm">{t('order.error')}</p>}
      </div>
    </form>
  );
}
