# Trime

A fast, responsive agency website for TRIME — a full-cycle digital product team.

[Live website](https://trime.org)

## Overview

The site is a single landing page (with a few short inner routes kept for existing links) that presents services, business-stage solutions, selected work, starting prices, the delivery process, the team and a project request form. It is statically generated with Next.js and deployed to GitHub Pages. Project requests go through a small serverless API that forwards them to the team's Telegram chat.

```text
frontend/        Next.js 14 static site → GitHub Pages (trime.org)
telegram-api/    Vercel serverless function POST /api/order → Telegram
```

## Technology

- Next.js 14 (App Router, static export), React 18, TypeScript
- Plain CSS with design tokens (`frontend/app/globals.css`) — no UI framework
- Manrope + JetBrains Mono via `next/font` (self-hosted at build time)
- Vercel serverless function (Node 20) for form delivery
- GitHub Actions → GitHub Pages

## Structure

```text
frontend/
├── app/
│   ├── layout.tsx         # fonts, metadata, Open Graph, JSON-LD
│   ├── globals.css        # V2 tokens, components, responsive rules (≤1024 / ≤640)
│   ├── icon.png, apple-icon.png
│   └── (site)/            # home page + /services /work /team /about /contact
├── components/
│   ├── Header.tsx         # sticky header, burger menu, language select
│   ├── Footer.tsx
│   ├── LocaleProvider.tsx # EN / UK / RU / ES with browser + country detection
│   ├── Icon.tsx           # inline Lucide-compatible icons
│   └── sections/          # Hero, Services, Solutions, Work, Pricing, Process, Team, Contact
├── lib/
│   ├── site.ts            # verified contacts, team links, placeholder switch
│   ├── order.ts           # form field rules (mirrored in telegram-api)
│   └── content/           # all copy, one file per language
└── public/                # team photos (WebP), logo, og.png, sitemap, robots
telegram-api/
├── api/order.js           # validation, anti-spam, rate limit, Telegram delivery
├── order.test.js          # node --test
└── dev-server.js          # local runner (optionally with a mocked Telegram)
```

## Run locally

Prerequisites: Node.js 20 and npm.

```bash
npm ci --prefix frontend
cp frontend/.env.example frontend/.env.local
npm run dev --prefix frontend
```

Open <http://localhost:3000>.

To exercise the contact form locally, run the API in a second terminal:

```bash
cd telegram-api
ALLOWED_ORIGINS=http://localhost:3000 npm run dev -- --mock-telegram
```

`--mock-telegram` prints the message in the terminal instead of sending it; nothing reaches the team. `--fail-telegram` simulates a Telegram failure. To deliver for real, drop the flag and set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

## Checks

```bash
npm run type-check --prefix frontend
npm run lint --prefix frontend
npm test --prefix telegram-api
npm run build --prefix frontend      # static export → frontend/out
```

## Environment variables

| Where | Name | Purpose |
| --- | --- | --- |
| GitHub Actions variable | `ORDER_ENDPOINT` | Passed to the build as `NEXT_PUBLIC_ORDER_ENDPOINT`. Currently `https://trime-telegram-api.vercel.app/api/order`. |
| Frontend (optional) | `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata. Default `https://trime.org`. |
| Frontend (optional) | `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `true` shows unverified content (demo portfolio, email, social links) in a production build — for review deployments only. Always on in `next dev`. |
| Vercel `trime-telegram-api` | `TELEGRAM_BOT_TOKEN` | Bot token. **Server-side only.** |
| Vercel `trime-telegram-api` | `TELEGRAM_CHAT_ID` | Destination chat/group ID. |
| Vercel `trime-telegram-api` (optional) | `ALLOWED_ORIGINS` | Comma-separated list that replaces the default `https://trime.org,https://www.trime.org`. |

Everything prefixed `NEXT_PUBLIC_` ends up in the public bundle — never put secrets there.

## Contact form

Flow: form → `POST /api/order` (Vercel) → Telegram `sendMessage` → team chat.

- Required: full name, email or Telegram (`you@company.com`, `@username`, `t.me/username`), project type, description (≥20 characters).
- Optional: budget, timeline (fixed lists) and website URL.
- The browser validates first; the API validates again and returns the names of invalid fields.
- Anti-spam: hidden honeypot field, minimum 3 s between rendering and sending, strict origin allow-list, JSON-only.
- Rate limit: 5 requests per IP per 10 minutes inside each function instance. Instances don't share memory, so also add a Vercel Firewall rate-limit rule for `POST /api/order` (see `telegram-api/README.md`).
- The success panel appears only after Telegram confirms delivery. On any failure the text stays in the form and the visitor gets a Telegram link.
- Submissions are not stored; if Telegram is not configured the API answers `503` and logs it — nothing is reported as sent.
- The API still accepts the V1 payload, so it can be deployed before the new site.

Setup steps are in [`telegram-api/README.md`](telegram-api/README.md).

## Content rules

`frontend/lib/site.ts` holds only verified facts (team names, photos and profile links from the V1 site, the Telegram contact). Unconfirmed items are `null` and render as highlighted placeholders in development only; production builds hide them:

- Selected Work shows three clearly labelled demo cards in development and a "Case studies on request" panel in production until real projects are added.
- Company email and company LinkedIn/GitHub are hidden in production until set.

Starting prices are in `frontend/components/sections/Pricing.tsx`; all copy is in `frontend/lib/content/*.ts` (EN, UK, RU, ES).

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`: checks, static export, upload, deploy to [trime.org](https://trime.org). Deploy order for V2:

1. Deploy `telegram-api` to the existing Vercel project (`vercel --prod` from `telegram-api/`). It is backward compatible with the current site.
2. Confirm `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` and the firewall rule in Vercel.
3. Merge `feature/trime-v2` into `main` — GitHub Actions publishes the site.
4. Send one real request from trime.org and confirm it arrives in Telegram.

## License

Proprietary — © TRIME.
