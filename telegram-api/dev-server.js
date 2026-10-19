// Local development server for api/order.js (not deployed).
//
//   ALLOWED_ORIGINS=http://localhost:3000 TELEGRAM_BOT_TOKEN=… TELEGRAM_CHAT_ID=… npm run dev
//     → real delivery to Telegram.
//
//   ALLOWED_ORIGINS=http://localhost:3000 npm run dev -- --mock-telegram
//     → Telegram is replaced by a stub that prints the message here. Use this to
//       exercise the form's success path; nothing reaches the team.
//
// Add --fail-telegram to simulate Telegram rejecting the message (502 path).
import { createServer } from 'node:http';
import handler from './api/order.js';

const PORT = Number(process.env.PORT ?? 8787);
const mock = process.argv.includes('--mock-telegram');
const fail = process.argv.includes('--fail-telegram');

if (mock || fail) {
  process.env.TELEGRAM_BOT_TOKEN ||= 'dev-mock-token';
  process.env.TELEGRAM_CHAT_ID ||= 'dev-mock-chat';
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    if (!String(url).startsWith('https://api.telegram.org/')) return realFetch(url, options);
    await new Promise((r) => setTimeout(r, 800));
    if (fail) return { ok: false, status: 400, json: async () => ({ ok: false, description: 'mock failure' }) };
    console.log('\n──── MOCK TELEGRAM (not delivered) ────\n' + JSON.parse(options.body).text + '\n───────────────────────────────────────');
    return { ok: true, json: async () => ({ ok: true }) };
  };
  console.warn(`Telegram is ${fail ? 'forced to FAIL' : 'MOCKED'} — requests are not delivered to the team.`);
}

createServer((req, res) => {
  let raw = '';
  req.on('data', (chunk) => { raw += chunk; if (raw.length > 1e5) req.destroy(); });
  req.on('end', async () => {
    if (!req.url.startsWith('/api/order')) { res.writeHead(404).end(); return; }
    const vres = {
      status(code) { res.statusCode = code; return this; },
      setHeader: (k, v) => res.setHeader(k, v),
      json(body) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); return this; },
      end() { res.end(); return this; },
    };
    req.body = raw;
    await handler(req, vres);
    console.log(`${req.method} ${req.url} → ${res.statusCode}`);
  });
}).listen(PORT, () => console.log(`Order API on http://localhost:${PORT}/api/order (origins: ${process.env.ALLOWED_ORIGINS ?? 'trime.org only'})`));
