'use client';

import { SECTIONS, TEAM } from '@/lib/site';
import { Icon, type IconName } from '../Icon';
import { useLocale } from '../LocaleProvider';

const BENEFIT_ICONS: IconName[] = ['message', 'checkSquare', 'lock', 'repeat'];
const SOCIALS = ['linkedin', 'github', 'telegram'] as const;
const SOCIAL_ICONS: Record<(typeof SOCIALS)[number], IconName> = { linkedin: 'linkedin', github: 'github', telegram: 'send' };

export function Team() {
  const { c } = useLocale();
  return (
    <section id={SECTIONS.team} className="section" aria-labelledby="team-title">
      <div className="container">
        <div className="team-intro">
          <div>
            <p className="eyebrow">{c.team.eyebrow}</p>
            <h2 id="team-title" className="h2">{c.team.title}</h2>
            <p className="lead">{c.team.lead}</p>
          </div>
          <ul className="benefits">
            {c.team.benefits.map((b, i) => (
              <li key={b.title} className="benefit">
                <span className="icon-box icon-box--sm"><Icon name={BENEFIT_ICONS[i]} size={16} /></span>
                <div>
                  <h3 className="benefit__title">{b.title}</h3>
                  <p className="benefit__text">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="team-grid">
          {TEAM.map((m) => {
            const copy = c.team.members[m.key];
            return (
              <li key={m.key} className="card member">
                <div className="member__photo">
                  {/* Pre-sized WebP from /public; next/image optimisation is unavailable in static export. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.photo} alt={`${c.team.photoOf} ${m.name}`} width={800} height={880} loading="lazy" decoding="async" />
                </div>
                <div className="member__body">
                  <h3 className="h3">{m.name}</h3>
                  <p className="member__role">{copy.role} · {copy.focus}</p>
                  <p className="body">{copy.bio}</p>
                  <ul className="member__links">
                    {SOCIALS.filter((s) => m[s]).map((s) => (
                      <li key={s}>
                        <a
                          href={m[s]}
                          className="icon-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} — ${c.team[s]}`}
                        >
                          <Icon name={SOCIAL_ICONS[s]} size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
