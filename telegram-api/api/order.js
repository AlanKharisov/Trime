// POST /api/order — validates a project request from trime.org and forwards it
// to the TRIME team's Telegram chat. Success is reported only after Telegram
// acknowledges the message; nothing is stored here.
//
// Field rules mirror frontend/lib/order.ts — keep both in sync.

const PROJECT_TYPES = {
  'business-website': 'Business Website', ecommerce: 'E-commerce', 'web-app': 'Web App', 'mvp-saas': 'MVP / SaaS',
  'mobile-app': 'Mobile App', 'telegram-bot': 'Telegram Bot', automation: 'Automation', 'backend-api': 'Backend / API', other: 'Other',
};
const BUDGETS = {
  '500-1500': '$500–1,500', '1500-5000': '$1,500–5,000', '5000-10000': '$5,000–10,000', '10000-plus': '$10,000+', 'not-sure': 'Not sure yet',
};
const TIMELINES = {
  asap: 'ASAP', '1-month': 'Within 1 month', '1-3-months': '1–3 months', '3-6-months': '3–6 months', flexible: 'Flexible',
};
// V1 form values (still posted by the live site until V2 is deployed).
const LEGACY_SERVICES = {
  frontend: 'business-website', business: 'business-website', backend: 'ecommerce',
  bot: 'telegram-bot', design: 'other', tech: 'other', other: 'other',
};
const LOCALES = new Set(['en', 'uk', 'ru', 'es']);

const LIMITS = { name: 100, contact: 200, description: 3000, website: 300 };
const MIN_DESCRIPTION = 20;
const MIN_FILL_MS = 3000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM = /^(?:@|(?:https?:\/\/)?t\.me\/)[A-Za-z][A-Za-z0-9_]{4,31}$/;

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const DEFAULT_ORIGINS = ['https://trime.org', 'https://www.trime.org'];

// Best-effort, per-instance limiter. Serverless instances do not share memory,
// so this is a second line of defence behind the Vercel Firewall rule (README).
const hits = new Map();

export function rateLimited(key, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (!times.some((t) => now - t < RATE_LIMIT.windowMs)) hits.delete(k);
  }
  return false;
}

export function resetRateLimit() {
  hits.clear();
}

function allowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean);
  return extra.length ? extra : DEFAULT_ORIGINS;
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  return (req.headers['x-real-ip'] || first || req.socket?.remoteAddress || 'unknown').trim();
}

function isWebsite(value) {
  if (/\s/.test(value)) return false;
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.hostname.includes('.');
  } catch {
    return false;
  }
}

const str = (v) => (typeof v === 'string' ? v.trim() : v === undefined || v === null ? '' : null);

/** Normalises V1/V2 payloads and returns `{ data }` or `{ fields }` (invalid field names). */
export function validate(body) {
  const legacy = body.projectType === undefined && typeof body.service === 'string';
  const input = {
    name: str(body.name),
    contact: str(body.contact),
    projectType: legacy ? LEGACY_SERVICES[body.service] ?? null : str(body.projectType),
    description: str(legacy ? body.details : body.description),
    budget: str(body.budget),
    timeline: str(body.timeline),
    website: legacy ? '' : str(body.website),
  };
  const fields = [];
  const bad = (f) => fields.push(f);

  if (!input.name || input.name.length > LIMITS.name) bad('name');
  if (!input.contact || input.contact.length > LIMITS.contact || !(EMAIL.test(input.contact) || TELEGRAM.test(input.contact))) bad('contact');
  if (!Object.hasOwn(PROJECT_TYPES, input.projectType ?? '')) bad('projectType');
  const minDescription = legacy ? 10 : MIN_DESCRIPTION;
  if (input.description === null || input.description.length < minDescription || input.description.length > LIMITS.description) bad('description');
  if (legacy) {
    // V1 sent free-text budget/timeline.
    if (input.budget === null || input.budget.length > 100) bad('budget');
    if (input.timeline === null || input.timeline.length > 100) bad('timeline');
  } else {
    if (input.budget === null || (input.budget && !Object.hasOwn(BUDGETS, input.budget))) bad('budget');
    if (input.timeline === null || (input.timeline && !Object.hasOwn(TIMELINES, input.timeline))) bad('timeline');
  }
  if (input.website === null || (input.website && (input.website.length > LIMITS.website || !isWebsite(input.website)))) bad('website');

  if (fields.length) return { fields };
  return {
    data: {
      ...input,
      budget: legacy ? input.budget : BUDGETS[input.budget] ?? '',
      timeline: legacy ? input.timeline : TIMELINES[input.timeline] ?? '',
      locale: LOCALES.has(body.locale) ? body.locale : '',
    },
  };
}

export function formatMessage(d) {
  return [
    'New project request — trime.org',
    '',
    `Name: ${d.name}`,
    `Contact: ${d.contact}`,
    `Project type: ${PROJECT_TYPES[d.projectType]}`,
    `Budget: ${d.budget || 'Not specified'}`,
    `Timeline: ${d.timeline || 'Not specified'}`,
    `Website: ${d.website || 'Not specified'}`,
    ...(d.locale ? [`Site language: ${d.locale.toUpperCase()}`] : []),
    '',
    'Project:',
    d.description,
  ].join('\n');
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');
  if (!allowedOrigins().includes(origin)) return res.status(403).json({ ok: false, error: 'forbidden' });
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '600');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ ok: false, error: 'content_type' });

  if (rateLimited(clientIp(req))) {
    res.setHeader('Retry-After', String(RATE_LIMIT.windowMs / 1000));
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); }
  catch { return res.status(400).json({ ok: false, error: 'invalid_json' }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ ok: false, error: 'invalid_body' });

  // Anti-spam: honeypot (V2 `fax`, V1 `website` sent together with `service`)
  // and a minimum time between rendering the form and submitting it.
  const honeypot = body.fax ?? (body.service !== undefined ? body.website : '');
  const tooFast = typeof body.startedAt === 'number' && Date.now() - body.startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) return res.status(400).json({ ok: false, error: 'rejected' });

  const { data, fields } = validate(body);
  if (fields) return res.status(400).json({ ok: false, error: 'validation', fields });

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('[order] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured; request not delivered');
    return res.status(503).json({ ok: false, error: 'not_configured' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: formatMessage(data), link_preview_options: { is_disabled: true } }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) {
      console.error('[order] Telegram rejected the message', response.status, result.description);
      return res.status(502).json({ ok: false, error: 'delivery_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[order] Telegram request failed', error?.name);
    return res.status(502).json({ ok: false, error: 'delivery_failed' });
  }
}
