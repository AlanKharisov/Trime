import nodemailer, { type Transporter } from 'nodemailer';
import { config } from '../config';

// ─── Singleton transporter ────────────────────────────────────────────────────
let _transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (_transporter) return _transporter;

  _transporter = nodemailer.createTransport({
    host:   config.email.host,
    port:   config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
    // Gracefully handle transient SMTP errors
    pool:           true,
    maxConnections: 3,
    maxMessages:    100,
    rateDelta:      1000,
    rateLimit:      5,
  });

  return _transporter;
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ContactPayload {
  name:     string;
  email:    string;
  service:  string;
  message:  string;
  company?: string;
  budget?:  string;
}

const SERVICE_LABELS: Record<string, string> = {
  fullstack: 'Full-Stack Development',
  design:    'UI/UX Design',
  seo:       'SEO & Performance',
  brand:     'Branding & Identity',
  other:     'Other',
};

const BUDGET_LABELS: Record<string, string> = {
  'under-5k': 'Under $5,000',
  '5k-15k':   '$5,000 – $15,000',
  '15k-50k':  '$15,000 – $50,000',
  '50k+':     '$50,000+',
};

// ─── Internal notification email (to the agency) ──────────────────────────────
function buildInternalHtml(p: ContactPayload): string {
  const service = SERVICE_LABELS[p.service] ?? p.service;
  const budget  = p.budget ? (BUDGET_LABELS[p.budget] ?? p.budget) : 'Not specified';

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d0d0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#141418;border:1px solid #1e1e26;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a42e0,#2558ff);padding:32px 40px;">
            <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Trime Agency</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">New Lead Enquiry</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">

            <!-- Contact card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0f;border:1px solid #1e1e26;border-radius:8px;overflow:hidden;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #1e1e26;">
                  <p style="margin:0 0 4px;color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Contact</p>
                  <p style="margin:0;color:#ffffff;font-size:16px;font-weight:600;">${escHtml(p.name)}</p>
                  <a href="mailto:${escHtml(p.email)}" style="color:#4c7aff;font-size:14px;text-decoration:none;">${escHtml(p.email)}</a>
                </td>
              </tr>
              ${p.company ? `
              <tr>
                <td style="padding:16px 24px;border-bottom:1px solid #1e1e26;">
                  <p style="margin:0 0 4px;color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Company</p>
                  <p style="margin:0;color:#ffffff;font-size:14px;">${escHtml(p.company)}</p>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:16px 24px;${p.budget ? 'border-bottom:1px solid #1e1e26;' : ''}">
                  <p style="margin:0 0 4px;color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Service Needed</p>
                  <span style="display:inline-block;background:#1a42e0;color:#fff;font-size:12px;font-weight:600;padding:3px 10px;border-radius:20px;">${escHtml(service)}</span>
                </td>
              </tr>
              ${p.budget ? `
              <tr>
                <td style="padding:16px 24px;">
                  <p style="margin:0 0 4px;color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Budget Range</p>
                  <p style="margin:0;color:#ffffff;font-size:14px;">${escHtml(budget)}</p>
                </td>
              </tr>` : ''}
            </table>

            <!-- Message -->
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Message</p>
            <div style="background:#0d0d0f;border:1px solid #1e1e26;border-radius:8px;padding:20px 24px;">
              <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escHtml(p.message)}</p>
            </div>

            <!-- CTA -->
            <div style="margin-top:32px;text-align:center;">
              <a href="mailto:${escHtml(p.email)}?subject=Re%3A+Your+enquiry+to+Trime+Agency"
                 style="display:inline-block;background:#2558ff;color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
                Reply to ${escHtml(p.name)}
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #1e1e26;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.25);font-size:12px;">
              This notification was sent by the Trime Agency contact form.<br>
              Do not reply directly to this email — use the button above.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

// ─── Auto-reply email (to the lead) ──────────────────────────────────────────
function buildAutoReplyHtml(p: ContactPayload): string {
  const service = SERVICE_LABELS[p.service] ?? p.service;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a42e0,#2558ff);padding:40px;text-align:center;">
            <p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Trime Agency</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">We got your message!</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
              Hey <strong>${escHtml(p.name)}</strong>,
            </p>
            <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.7;">
              Thanks for reaching out — we've received your enquiry about
              <strong>${escHtml(service)}</strong> and will be in touch within
              <strong>1–2 business days</strong>.
            </p>
            <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.7;">
              In the meantime, feel free to browse our recent work or connect with us on LinkedIn.
            </p>

            <!-- Summary card -->
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin-bottom:32px;">
              <p style="margin:0 0 12px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Your submission summary</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:4px 0;color:#6b7280;font-size:13px;width:100px;">Name</td><td style="padding:4px 0;color:#111827;font-size:13px;font-weight:500;">${escHtml(p.name)}</td></tr>
                <tr><td style="padding:4px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:4px 0;color:#111827;font-size:13px;font-weight:500;">${escHtml(p.email)}</td></tr>
                <tr><td style="padding:4px 0;color:#6b7280;font-size:13px;">Service</td><td style="padding:4px 0;color:#111827;font-size:13px;font-weight:500;">${escHtml(service)}</td></tr>
              </table>
            </div>

            <div style="text-align:center;">
              <a href="https://trime.agency/work"
                 style="display:inline-block;background:#2558ff;color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
                View Our Work
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
              Trime Agency &bull; hello@trime.agency<br>
              You're receiving this because you submitted our contact form.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

// ─── Tiny HTML escape helper (no external dep needed) ─────────────────────────
function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Send the internal notification to the agency inbox. */
export async function sendInternalNotification(payload: ContactPayload): Promise<void> {
  const service = SERVICE_LABELS[payload.service] ?? payload.service;

  await getTransporter().sendMail({
    from:    `"${config.email.fromName}" <${config.email.fromAddr}>`,
    to:      config.email.receiver,
    replyTo: payload.email,
    subject: `[Lead] ${payload.name}${payload.company ? ` @ ${payload.company}` : ''} — ${service}`,
    text: buildPlainText(payload),
    html: buildInternalHtml(payload),
  });
}

/** Send the auto-reply confirmation to the person who submitted the form. */
export async function sendAutoReply(payload: ContactPayload): Promise<void> {
  await getTransporter().sendMail({
    from:    `"${config.email.fromName}" <${config.email.fromAddr}>`,
    to:      payload.email,
    subject: `We received your message, ${payload.name.split(' ')[0]}!`,
    text: `Hi ${payload.name},\n\nThanks for reaching out to Trime Agency. We'll be in touch within 1–2 business days.\n\nBest,\nThe Trime Team`,
    html: buildAutoReplyHtml(payload),
  });
}

/** Plain-text fallback for the internal email. */
function buildPlainText(p: ContactPayload): string {
  const service = SERVICE_LABELS[p.service] ?? p.service;
  const budget  = p.budget ? (BUDGET_LABELS[p.budget] ?? p.budget) : 'Not specified';

  return [
    'NEW LEAD ENQUIRY — TRIME AGENCY',
    '─'.repeat(40),
    `Name:    ${p.name}`,
    `Email:   ${p.email}`,
    p.company ? `Company: ${p.company}` : null,
    `Service: ${service}`,
    `Budget:  ${budget}`,
    '',
    'Message:',
    p.message,
  ].filter((l) => l !== null).join('\n');
}
