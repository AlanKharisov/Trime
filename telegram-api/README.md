# Telegram order delivery

`POST /api/order` validates a project request from trime.org and forwards it to the TRIME team's Telegram chat. It reports success only after Telegram acknowledges the message and stores nothing.

Deployed as the separate Vercel project `trime-telegram-api` (framework: Other).

## Environment variables (Vercel → Settings → Environment Variables)

| Name | Required | Notes |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | yes | From @BotFather. Server-side only — never in the frontend or Git. |
| `TELEGRAM_CHAT_ID` | yes | Destination chat ID (not the bot's ID). |
| `ALLOWED_ORIGINS` | no | Comma-separated; **replaces** the default `https://trime.org,https://www.trime.org`. |

Without the two Telegram variables the endpoint answers `503 not_configured` and logs an error; the form then tells the visitor it is unavailable and offers the Telegram link.

## Telegram setup

1. Create a bot with @BotFather and copy the token.
2. Personal chat: the recipient must press **Start** in the bot. Group: add the bot to the group.
3. Send any message to the bot/group, then open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id` (groups have negative IDs).
4. Set both variables in Vercel and redeploy.

## Protection

- Origin allow-list and CORS for trime.org only.
- JSON body only; every field is length- and format-checked; budget, timeline and project type must be known values.
- Honeypot field `fax` and a minimum 3 s fill time (`startedAt`).
- In-memory rate limit: 5 requests per IP per 10 minutes per function instance.
- **Before launch**, add a Vercel Firewall rule (Project → Firewall → Configure → Rate limit) for `POST /api/order`, e.g. 10 requests per 10 minutes per IP. Serverless instances don't share memory, so the in-code limiter alone is not enough.
- Production deployments must be reachable without Vercel deployment protection.

## Responses

| Status | `error` | Meaning |
| --- | --- | --- |
| 200 | — | Delivered (`{ ok: true }`) |
| 400 | `validation` | `fields` lists invalid field names |
| 400 | `rejected` / `invalid_json` / `invalid_body` | Spam check or malformed body |
| 403 | `forbidden` | Origin not allowed |
| 429 | `rate_limited` | Too many requests (`Retry-After` set) |
| 502 | `delivery_failed` | Telegram did not accept the message |
| 503 | `not_configured` | Telegram variables missing |

The handler also accepts the V1 payload (`service`, `details`) so it can be deployed before the V2 site goes live.

## Local development and tests

```bash
npm test
ALLOWED_ORIGINS=http://localhost:3000 npm run dev -- --mock-telegram   # stubbed Telegram
ALLOWED_ORIGINS=http://localhost:3000 TELEGRAM_BOT_TOKEN=… TELEGRAM_CHAT_ID=… npm run dev   # real delivery
```

## Deploy

```bash
cd telegram-api
vercel --prod
```

Then make sure the GitHub Actions variable `ORDER_ENDPOINT` is `https://<api-domain>/api/order` and re-run the Pages workflow.
