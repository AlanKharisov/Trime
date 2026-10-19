// ─── Project request: shared field rules ─────────────────────────────────────
// Mirrors telegram-api/api/order.js. The server is the authority; these rules
// exist so people see mistakes before sending. Keep both files in sync.

export const PROJECT_TYPES = [
  'business-website', 'ecommerce', 'web-app', 'mvp-saas', 'mobile-app',
  'telegram-bot', 'automation', 'backend-api', 'other',
] as const;
export const BUDGETS = ['500-1500', '1500-5000', '5000-10000', '10000-plus', 'not-sure'] as const;
export const TIMELINES = ['asap', '1-month', '1-3-months', '3-6-months', 'flexible'] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type Budget = (typeof BUDGETS)[number];
export type Timeline = (typeof TIMELINES)[number];

export const LIMITS = { name: 100, contact: 200, description: 3000, website: 300 } as const;
export const MIN_DESCRIPTION = 20;

export interface OrderValues {
  name: string;
  contact: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
  website: string;
}

export type OrderField = keyof OrderValues;
export type OrderErrors = Partial<Record<OrderField, true>>;

export const EMPTY_ORDER: OrderValues = {
  name: '', contact: '', projectType: '', description: '', budget: '', timeline: '', website: '',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM = /^(?:@|(?:https?:\/\/)?t\.me\/)[A-Za-z][A-Za-z0-9_]{4,31}$/;

export function isContact(value: string) {
  return EMAIL.test(value) || TELEGRAM.test(value);
}

export function isWebsite(value: string) {
  if (/\s/.test(value)) return false;
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.hostname.includes('.');
  } catch {
    return false;
  }
}

/** Returns the set of invalid fields; empty object means the form can be sent. */
export function validateOrder(v: OrderValues): OrderErrors {
  const errors: OrderErrors = {};
  const name = v.name.trim();
  const contact = v.contact.trim();
  const description = v.description.trim();
  const website = v.website.trim();

  if (!name || name.length > LIMITS.name) errors.name = true;
  if (contact.length > LIMITS.contact || !isContact(contact)) errors.contact = true;
  if (!(PROJECT_TYPES as readonly string[]).includes(v.projectType)) errors.projectType = true;
  if (description.length < MIN_DESCRIPTION || description.length > LIMITS.description) errors.description = true;
  if (v.budget && !(BUDGETS as readonly string[]).includes(v.budget)) errors.budget = true;
  if (v.timeline && !(TIMELINES as readonly string[]).includes(v.timeline)) errors.timeline = true;
  if (website && (website.length > LIMITS.website || !isWebsite(website))) errors.website = true;
  return errors;
}
