import 'dotenv/config';

// ─── Startup guard ────────────────────────────────────────────────────────────
// Fail fast in production so a misconfigured deploy is immediately obvious.
function required(key: string): string {
  const val = process.env[key];
  if (!val && process.env.NODE_ENV === 'production') {
    throw new Error(`[config] Missing required environment variable: ${key}`);
  }
  return val ?? '';
}

export const config = {
  port:        parseInt(process.env.PORT ?? '4000', 10),
  nodeEnv:     process.env.NODE_ENV ?? 'development',
  isDev:       (process.env.NODE_ENV ?? 'development') !== 'production',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',

  email: {
    host:     process.env.SMTP_HOST     ?? 'smtp.gmail.com',
    port:     parseInt(process.env.SMTP_PORT ?? '587', 10),
    secure:   process.env.SMTP_SECURE   === 'true',   // true only for port 465
    user:     required('SMTP_USER'),
    pass:     required('SMTP_PASS'),
    fromName: process.env.EMAIL_FROM_NAME ?? 'Trime Agency',
    fromAddr: process.env.SMTP_USER      ?? 'hello@trime.agency',
    receiver: required('CONTACT_RECEIVER'),
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '900000', 10), // 15 min
    max:      parseInt(process.env.RATE_LIMIT_MAX        ?? '10',     10),
  },
} as const;
