// Server Component — no 'use client' needed here.
// Interactive hover effects are isolated inside TeamCard (client component).
import { FadeIn } from '@/components/animations/FadeIn';
import { TeamCard, type TeamMemberData } from './TeamCard';

// ─── Team data ────────────────────────────────────────────────────────────────
// Replace `image` URLs with actual team photos before launch.
// picsum.photos/seed/<slug>/<w>/<h> returns a deterministic placeholder.
const TEAM: TeamMemberData[] = [
  {
    name:      'Alan Kharisov',
    role:      'Full-Stack Developer',
    roleTag:   'Full-Stack Dev',
    roleColor: 'bg-brand-500/20 text-brand-300 border border-brand-500/30',
    bio:       'Specialist in scalable Node.js back-ends and React performance. Led architecture for SaaS platforms handling 500k+ MAU. Obsessed with load times and clean APIs.',
    image:     '/images/team/alan.jpg',
    imageAlt:  'Alan Kharisov, Full-Stack Developer, working at a dual-monitor desk setup',
    skills:    ['Next.js', 'React', 'Node.js', 'Go', 'Rust', 'TypeScript'],
    linkedin:  'https://www.linkedin.com/in/алан-харісов-704b0b374?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    github:    'https://github.com/AlanKharisov'
  },
  {
    name:      'Emil Torosyan',
    role:      'Full-Stack Developer',
    roleTag:   'Full-Stack Dev',
    roleColor: 'bg-brand-500/20 text-brand-300 border border-brand-500/30',
    bio:       '4 years of experience and a proven portfolio of projects. From idea to MVP — turning concepts into functional products. Combining development, design, and creativity to build modern digital solutions.',
    image:     '/images/team/emil.jpg',
    imageAlt:  'Emil Torosyan, Full-Stack Developer, reviewing code on a laptop in a modern office',
    skills:    ['Go', 'Rust', 'TypeScript', 'Node.js', 'Next.js'],
    linkedin:  'https://www.linkedin.com/in/%D0%B5%D0%BC%D1%96%D0%BB%D1%8C-%D1%82%D0%BE%D1%80%D0%BE%D1%81%D1%8F%D0%BD-898981335/',
    github:    'https://github.com/emil2008u',
  },
  {
    name:      'Viktoriia Behei',
    role:      'UI/UX Designer',
    roleTag:   'UI/UX Design',
    roleColor: 'bg-accent/20 text-accent border border-accent/30',
    bio:       'Crafts design systems and conversion-focused interfaces. Background in cognitive psychology — every layout decision is grounded in how users actually think and act.',
    image:     '/images/team/viktoriia.jpg',
    imageAlt:  'Viktoriia Behei, UI/UX Designer, sketching wireframes at a tablet in a bright studio',
    skills:    ['Figma', 'Design Systems', 'Prototyping', 'Motion', 'A/B Testing'],
    linkedin:  'https://www.linkedin.com/in/viktoria-behei-724743272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    telegram:  'https://web.telegram.org/a/#953733499'
  },
  {
    name:      'Alexander Kostikov',
    role:      'CEO Specialist',
    roleTag:   'CEO',
    roleColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    bio:       'CEO and digital growth strategist. 10+ years in marketing, 7+ years in traffic arbitrage, IT, and crypto. Founded a company at 19. Combines business vision with technical expertise to scale digital products.',
    image:     '/images/team/alexander.jpg',
    imageAlt:  'Alexander Kostikov, CEO Specialist',
    skills:    ['Technical CEO', 'Core Web Vitals', 'Schema', 'Link Building', 'Analytics'],
    telegram:  'https://web.telegram.org/a/#496711608'
  },
];

// ─── Values strip data ────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5M2 10l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title:  'No silos',
    detail: 'Design, dev, and SEO share one Slack channel. No hand-offs, no broken telephone.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title:  '48-hour response',
    detail: 'Every client gets a named contact. Emergencies don\'t queue behind a ticket system.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M9 12l2 2 4-4M5 10a5 5 0 1110 0 5 5 0 01-10 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title:  'Senior-only',
    detail: 'No juniors learning on your budget. All four of us have 6+ years of production experience.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden>
        <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title:  'Outcome-first',
    detail: 'We measure ourselves by your metrics — conversions, rankings, and load times — not billable hours.',
  },
];

// ─── Section component (Server Component) ────────────────────────────────────
export function About() {
  return (
    <section id="about" aria-label="About Trime Agency" className="py-section">
      <div className="section-wrapper">

        {/* ── Section header ──────────────────────────────────────────── */}
        <FadeIn className="max-w-2xl mb-16">
          <p className="text-brand-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            The Team
          </p>
          <h2 className="text-display-xl font-bold text-white mb-5">
            Four specialists.{' '}
            <span className="text-gradient">One seamless workflow.</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            We're a deliberately small agency — four senior professionals who have worked
            together long enough to finish each other's sentences. Design decisions are made
            with performance in mind. Code is written with SEO baked in from line one. That
            coherence shows in every product we ship.
          </p>
        </FadeIn>

        {/* ── Team grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* ── Values strip ────────────────────────────────────────────── */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden">

            {/* Strip header */}
            <div className="px-6 py-5 border-b border-surface-border">
              <p className="text-white/50 text-sm">
                Why clients choose a boutique team over a bloated agency
              </p>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
              {VALUES.map(({ icon, title, detail }) => (
                <div
                  key={title}
                  className="group px-6 py-6 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 group-hover:text-brand-300 transition-colors duration-200">
                    {icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{title}</p>
                    <p className="text-white/45 text-[13px] leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
