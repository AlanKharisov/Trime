import type { Budget, ProjectType, Timeline } from '@/lib/order';
import type { MemberKey, NavKey } from '@/lib/site';

export type Locale = 'en' | 'uk' | 'ru' | 'es';

export const LOCALES: { code: Locale; short: string; label: string }[] = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'uk', short: 'UA', label: 'Українська' },
  { code: 'ru', short: 'RU', label: 'Русский' },
  { code: 'es', short: 'ES', label: 'Español' },
];

interface Item { title: string; text: string }

export interface Content {
  skip: string;
  nav: Record<NavKey, string> & {
    label: string; quote: string; start: string; open: string; close: string;
    reply: string; language: string;
  };
  hero: {
    eyebrow: string;
    /** Words wrapped in *asterisks* are rendered in the accent colour. */
    title: string;
    lead: string; start: string; view: string;
    features: [string, string, string, string];
    editorLabel: string; editorComment: string; buildPassing: string;
  };
  services: { eyebrow: string; title: string; lead: string; items: Item[] };
  solutions: {
    eyebrow: string; title: string; lead: string; budget: string; note: string;
    items: { title: string; text: string; list: string[]; budget: string }[];
  };
  work: {
    eyebrow: string; title: string; lead: string; view: string; demo: string;
    items: { category: string; title: string; text: string; stack: string[] }[];
    onRequest: { title: string; text: string; cta: string };
  };
  pricing: {
    eyebrow: string; title: string; from: string; perMonth: string; note: string; cta: string;
    items: { title: string; text: string }[];
  };
  process: { eyebrow: string; title: string; steps: Item[] };
  team: {
    eyebrow: string; title: string; lead: string; benefits: Item[];
    members: Record<MemberKey, { role: string; focus: string; bio: string }>;
    photoOf: string; linkedin: string; github: string; telegram: string;
  };
  contact: {
    eyebrow: string; title: string; lead: string; points: [string, string, string];
    labels: {
      name: string; contact: string; projectType: string; description: string;
      budget: string; timeline: string; website: string; optional: string;
    };
    placeholders: { name: string; contact: string; description: string; select: string; projectType: string; website: string };
    projectTypes: Record<ProjectType, string>;
    budgets: Record<Budget, string>;
    timelines: Record<Timeline, string>;
    submit: string; sending: string; note: string;
    errors: {
      name: string; contact: string; projectType: string; description: string;
      budget: string; timeline: string; website: string; summary: string;
    };
    failure: {
      generic: string; network: string; rateLimited: string; notConfigured: string; telegram: string;
    };
    success: { title: string; text: string; again: string };
    devNotConfigured: string;
  };
  footer: {
    tagline: string; navigation: string; services: string; follow: string;
    serviceLinks: [string, string, string, string, string];
    rights: string; motto: string; telegram: string;
  };
  notFound: { title: string; text: string; cta: string };
}
