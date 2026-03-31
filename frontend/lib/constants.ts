// ─── Site-wide constants ──────────────────────────────────────────────────────

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trime.agency';
export const SITE_NAME = 'Trime Agency';

// ─── Navigation ───────────────────────────────────────────────────────────────

// Anchor-based nav — all sections live on the home page.
// /#section navigates from any inner page back to home + scrolls.
export const NAV_LINKS = [
  { label: 'About',           href: '/#about'           },
  { label: 'Dev Services',    href: '/#dev-services'    },
  { label: 'Design Services', href: '/#design-services' },
  { label: 'Contact',         href: '/#contact'         },
] as const;

// ─── Social links ─────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  twitter:  'https://twitter.com/trimeagency',
  linkedin: 'https://linkedin.com/company/trimeagency',
  github:   'https://github.com/trimeagency',
  dribbble: 'https://dribbble.com/trimeagency',
} as const;

// ─── Services offered ─────────────────────────────────────────────────────────

export const SERVICES = [
  { id: 'fullstack',  title: 'Full-Stack Development', icon: 'Code2'       },
  { id: 'design',     title: 'UI/UX Design',           icon: 'Palette'     },
  { id: 'seo',        title: 'SEO & Performance',      icon: 'TrendingUp'  },
  { id: 'brand',      title: 'Branding & Identity',    icon: 'Sparkles'    },
] as const;

// ─── Framer Motion shared variants ────────────────────────────────────────────

export const FADE_UP = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} as const;

export const FADE_IN = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
} as const;

export const STAGGER_CONTAINER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;
