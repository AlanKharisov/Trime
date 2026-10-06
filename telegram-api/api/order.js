const services = {
  frontend: 'Simple website', business: 'Business website', backend: 'Full-stack / E-commerce',
  bot: 'Telegram bot', design: 'UI/UX design', tech: 'Technical specification', other: 'Other / consultation',
};

export default async function handler(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');
  if (!['https://trime.org', 'https://www.trime.org'].includes(origin)) return res.status(403).json({ ok: false });
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ ok: false });
  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); }
  catch { return res.status(400).json({ ok: false }); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ ok: false });
  const limits = { name: [1, 100], contact: [3, 200], details: [10, 2000], budget: [0, 100], timeline: [0, 100] };
  const data = {};
  for (const [key, [min, max]] of Object.entries(limits)) {
    const value = body[key] ?? '';
    if (typeof value !== 'string' || value.trim().length < min || value.length > max) return res.status(400).json({ ok: false });
    data[key] = value.trim();
  }
  if (typeof body.service !== 'string' || !Object.hasOwn(services, body.service) || body.website) return res.status(400).json({ ok: false });
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return res.status(503).json({ ok: false });
  const text = ['New project request — trime.org', '', `Name: ${data.name}`, `Contact: ${data.contact}`,
    `Service: ${services[body.service]}`, `Budget: ${data.budget || 'Not specified'}`,
    `Timeline: ${data.timeline || 'Not specified'}`, '', 'Project:', data.details].join('\n');
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, link_preview_options: { is_disabled: true } }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) return res.status(502).json({ ok: false });
    return res.status(200).json({ ok: true });
  } catch { return res.status(502).json({ ok: false }); }
}
