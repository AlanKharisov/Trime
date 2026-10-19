// ─── Site configuration ───────────────────────────────────────────────────────
// Only verified facts live here. Anything still unconfirmed is `null` and is
// rendered as a highlighted placeholder in development builds only (see
// SHOW_PLACEHOLDERS) — production builds hide it instead of publishing it.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trime.org';
export const SITE_NAME = 'TRIME';

/** Backend endpoint that validates requests and forwards them to Telegram. */
export const ORDER_ENDPOINT = process.env.NEXT_PUBLIC_ORDER_ENDPOINT ?? '';

/**
 * Show unverified content (portfolio demos, email, social links) as visible
 * placeholders. On automatically in `next dev`; opt in for a production build
 * with NEXT_PUBLIC_SHOW_PLACEHOLDERS=true (e.g. a review deployment).
 */
export const SHOW_PLACEHOLDERS =
  process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === 'true';

export interface LinkTarget {
  label: string;
  href: string;
}

export const CONTACT: {
  /** Company email (href as `mailto:…`) — not verified yet. */
  email: LinkTarget | null;
  /** Telegram contact used as the main contact on the current trime.org. */
  telegram: LinkTarget | null;
} = {
  email: null,
  telegram: { label: '@kostikov99', href: 'https://t.me/kostikov99' },
};

/** Company profiles for the footer "Follow" column. Unverified → null. */
export const SOCIAL: { linkedin: string | null; github: string | null; telegram: string | null } = {
  linkedin: null,
  github: null,
  telegram: CONTACT.telegram?.href ?? null,
};

export type MemberKey = 'alexander' | 'alan' | 'emil' | 'viktoriia';

export interface Member {
  key: MemberKey;
  name: string;
  photo: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
}

// Names, photos and profile links come from the current trime.org.
export const TEAM: Member[] = [
  {
    key: 'alexander',
    name: 'Alexander Kostikov',
    photo: '/images/team/v2/alexander.webp',
    telegram: 'https://t.me/kostikov99',
  },
  {
    key: 'alan',
    name: 'Alan Kharisov',
    photo: '/images/team/v2/alan.webp',
    linkedin: 'https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B0%D0%BD-%D1%85%D0%B0%D1%80%D1%96%D1%81%D0%BE%D0%B2-704b0b374',
    github: 'https://github.com/AlanKharisov',
  },
  {
    key: 'emil',
    name: 'Emil Torosyan',
    photo: '/images/team/v2/emil.webp',
    linkedin: 'https://www.linkedin.com/in/%D0%B5%D0%BC%D1%96%D0%BB%D1%8C-%D1%82%D0%BE%D1%80%D0%BE%D1%81%D1%8F%D0%BD-898981335/',
    github: 'https://github.com/emil2008u',
  },
  {
    key: 'viktoriia',
    name: 'Viktoriia Behei',
    photo: '/images/team/v2/viktoriia.webp',
    linkedin: 'https://www.linkedin.com/in/viktoria-behei-724743272',
    telegram: 'https://web.telegram.org/a/#953733499',
  },
];

/** Section ids — the single source for in-page navigation. */
export const SECTIONS = {
  services: 'services',
  solutions: 'solutions',
  work: 'work',
  pricing: 'pricing',
  process: 'process',
  team: 'team',
  contact: 'contact',
} as const;

export type NavKey = Exclude<keyof typeof SECTIONS, 'contact'>;
export const NAV_ORDER: NavKey[] = ['services', 'solutions', 'work', 'pricing', 'process', 'team'];

/** `/#id` works from inner routes and is a same-document jump on the home page. */
export const sectionHref = (id: keyof typeof SECTIONS) => `/#${SECTIONS[id]}`;
