import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import handler, { formatMessage, rateLimited, resetRateLimit, validate } from './api/order.js';

const valid = {
  name: 'Test Client', contact: '@test_client', projectType: 'telegram-bot',
  description: 'Build a support bot for our online store', budget: '1500-5000', timeline: 'asap',
  website: 'shop.example.com', locale: 'uk', startedAt: Date.now() - 60_000, fax: '',
};
const legacy = { name: 'Test', contact: '@test_user', service: 'bot', details: 'Build a support bot', budget: '', timeline: '', website: '' };

function response() {
  return { code: 0, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; }, end() { return this; } };
}
let ip = 0;
function request(body = valid, extra = {}) {
  ip += 1; // a fresh client address per request keeps tests independent of the rate limiter
  return { method: 'POST', headers: { origin: 'https://trime.org', 'content-type': 'application/json', 'x-forwarded-for': `10.0.0.${ip}`, ...extra }, body };
}

beforeEach(() => {
  resetRateLimit();
  delete process.env.ALLOWED_ORIGINS;
});

async function withTelegram(fetchImpl, run) {
  const originalFetch = globalThis.fetch;
  process.env.TELEGRAM_BOT_TOKEN = 'test-token';
  process.env.TELEGRAM_CHAT_ID = '123';
  globalThis.fetch = fetchImpl;
  try { await run(); } finally {
    globalThis.fetch = originalFetch;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  }
}

test('reports invalid fields by name', async () => {
  const res = response();
  await handler(request({ ...valid, name: ' ', contact: 'alex@company', projectType: 'toString', description: 'A shop', budget: '1m', website: 'not a url' }), res);
  assert.equal(res.code, 400);
  assert.deepEqual(res.body.fields.sort(), ['budget', 'contact', 'description', 'name', 'projectType', 'website']);
});

test('accepts email or Telegram handles as contact', () => {
  for (const contact of ['you@company.com', '@user_name', 't.me/username', 'https://t.me/username']) {
    assert.ok(validate({ ...valid, contact }).data, contact);
  }
  for (const contact of ['alex@company', '@abc', 'username', '@1abcde']) {
    assert.deepEqual(validate({ ...valid, contact }).fields, ['contact'], contact);
  }
});

test('optional fields may be empty', () => {
  const { data } = validate({ ...valid, budget: '', timeline: '', website: '' });
  assert.equal(data.budget, '');
  assert.equal(data.website, '');
});

test('rejects honeypot, instant submissions and disallowed origins without contacting Telegram', async () => {
  let called = false;
  await withTelegram(async () => { called = true; return { ok: true, json: async () => ({ ok: true }) }; }, async () => {
    for (const req of [
      request({ ...valid, fax: 'spam' }),
      request({ ...valid, startedAt: Date.now() }),
      request({ ...legacy, website: 'spam' }),
      { ...request(), headers: { origin: 'https://example.com', 'content-type': 'application/json' } },
    ]) {
      const res = response();
      await handler(req, res);
      assert.ok([400, 403].includes(res.code));
      assert.equal(res.body.ok, false);
    }
  });
  assert.equal(called, false);
});

test('preflight is allowed for the real site and configured origins only', async () => {
  const res = response();
  await handler({ ...request(), method: 'OPTIONS' }, res);
  assert.equal(res.code, 204);
  assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://trime.org');

  process.env.ALLOWED_ORIGINS = 'http://localhost:3000';
  const local = response();
  await handler({ ...request(valid, { origin: 'http://localhost:3000' }), method: 'OPTIONS' }, local);
  assert.equal(local.code, 204);
});

test('does not claim success when server configuration is absent', async () => {
  const res = response();
  await handler(request(), res);
  assert.equal(res.code, 503);
  assert.equal(res.body.error, 'not_configured');
});

test('rate limits repeated requests from one client', async () => {
  const now = Date.now();
  for (let i = 0; i < 5; i++) assert.equal(rateLimited('1.2.3.4', now), false);
  assert.equal(rateLimited('1.2.3.4', now), true);
  assert.equal(rateLimited('1.2.3.4', now + 11 * 60 * 1000), false);

  const res = response();
  for (let i = 0; i < 6; i++) await handler(request(valid, { 'x-forwarded-for': '9.9.9.9' }), res);
  assert.equal(res.code, 429);
});

test('reports success only after Telegram acknowledgement; sends plain text to fixed destination', async () => {
  await withTelegram(async (url, options) => {
    assert.equal(url, 'https://api.telegram.org/bottest-token/sendMessage');
    const sent = JSON.parse(options.body);
    assert.equal(sent.chat_id, '123');
    assert.equal(sent.parse_mode, undefined);
    assert.ok(sent.text.includes(valid.description));
    assert.ok(sent.text.includes('Project type: Telegram Bot'));
    assert.ok(sent.text.includes('Budget: $1,500–5,000'));
    assert.ok(sent.text.includes('Website: shop.example.com'));
    return { ok: true, json: async () => ({ ok: true }) };
  }, async () => {
    const success = response();
    await handler(request(), success);
    assert.equal(success.code, 200);
    assert.equal(success.body.ok, true);
  });

  await withTelegram(async () => ({ ok: true, json: async () => ({ ok: false }) }), async () => {
    const failure = response();
    await handler(request(), failure);
    assert.equal(failure.code, 502);
    assert.equal(failure.body.ok, false);
  });

  await withTelegram(async () => { throw new Error('network'); }, async () => {
    const failure = response();
    await handler(request(), failure);
    assert.equal(failure.code, 502);
  });
});

test('still accepts the V1 payload from the currently deployed site', async () => {
  await withTelegram(async (_url, options) => {
    const { text } = JSON.parse(options.body);
    assert.ok(text.includes('Project type: Telegram Bot'));
    assert.ok(text.includes(legacy.details));
    return { ok: true, json: async () => ({ ok: true }) };
  }, async () => {
    const res = response();
    await handler(request(legacy), res);
    assert.equal(res.code, 200);
  });
});

test('message is plain text with every field', () => {
  const text = formatMessage(validate(valid).data);
  assert.match(text, /^New project request — trime\.org/);
  assert.match(text, /Site language: UK/);
});
