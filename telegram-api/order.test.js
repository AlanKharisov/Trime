import test from 'node:test';
import assert from 'node:assert/strict';
import handler from './api/order.js';

const valid = { name: 'Test', contact: '@test', service: 'bot', details: 'Build a support bot', budget: '', timeline: '', website: '' };
function response() {
  return { code: 0, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; }, end() { return this; } };
}
function request(body = valid) { return { method: 'POST', headers: { origin: 'https://trime.org', 'content-type': 'application/json' }, body }; }

test('rejects malformed submissions and disallowed origins without contacting Telegram', async () => {
  for (const req of [request({ ...valid, details: 'short' }), request({ ...valid, service: 'toString' }), request({ ...valid, website: 'spam' }), { ...request(), headers: { origin: 'https://example.com' } }]) {
    const res = response();
    await handler(req, res);
    assert.ok([400, 403].includes(res.code));
    assert.equal(res.body.ok, false);
  }
});

test('preflight is allowed for the real site', async () => {
  const res = response();
  await handler({ ...request(), method: 'OPTIONS' }, res);
  assert.equal(res.code, 204);
  assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://trime.org');
});

test('does not claim success when server configuration is absent', async () => {
  const res = response();
  await handler(request(), res);
  assert.equal(res.code, 503);
});

test('reports success only after Telegram acknowledgement; sends plain text to fixed destination', async () => {
  const originalFetch = globalThis.fetch;
  process.env.TELEGRAM_BOT_TOKEN = 'test-token';
  process.env.TELEGRAM_CHAT_ID = '123';
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(url, 'https://api.telegram.org/bottest-token/sendMessage');
      const sent = JSON.parse(options.body);
      assert.equal(sent.chat_id, '123');
      assert.equal(sent.parse_mode, undefined);
      assert.ok(sent.text.includes(valid.details));
      return { ok: true, json: async () => ({ ok: true }) };
    };
    const success = response();
    await handler(request(), success);
    assert.equal(success.code, 200);
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: false }) });
    const failure = response();
    await handler(request(), failure);
    assert.equal(failure.code, 502);
    assert.equal(failure.body.ok, false);
  } finally {
    globalThis.fetch = originalFetch;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
  }
});
