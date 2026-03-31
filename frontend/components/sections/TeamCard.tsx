'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface TeamMemberData {
  name:       string;
  role:       string;
  roleTag:    string;          // short badge text
  roleColor:  string;          // Tailwind colour classes for the badge
  bio:        string;
  image:      string;
  imageAlt:   string;
  skills:     string[];
  linkedin?:  string;
  twitter?:   string;
  github?:    string;
  dribbble?:  string;
}

// ─── Social icon paths ────────────────────────────────────────────────────────
const SOCIAL_ICONS: Record<string, { label: string; path: string }> = {
  linkedin: {
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  twitter: {
    label: 'Twitter / X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.844l4.262 5.632L18.244 2.25z',
  },
  github: {
    label: 'GitHub',
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  dribbble: {
    label: 'Dribbble',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.814 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z',
  },
};

function SocialLink({
  href,
  type,
}: {
  href: string;
  type: keyof typeof SOCIAL_ICONS;
}) {
  const icon = SOCIAL_ICONS[type];
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={icon.label}
      whileHover={{ scale: 1.15, y: -1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] hover:bg-brand-500/20 border border-surface-border hover:border-brand-500/40 text-white/40 hover:text-brand-300 transition-colors duration-150"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
        <path d={icon.path} />
      </svg>
    </motion.a>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
export function TeamCard({ member, index }: { member: TeamMemberData; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover="hovered"
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-surface-border bg-surface-card shadow-card hover:border-brand-500/30 hover:shadow-glow transition-[border-color,box-shadow] duration-300"
    >

      {/* ── Photo ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[4/5] bg-surface">
        {/* Gradient overlay — always present, stronger on hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent" />

        {/* Hover colour tint */}
        <motion.div
          variants={{
            hovered: { opacity: 1 },
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-10 bg-brand-500/10"
          aria-hidden
        />

        <motion.div
          variants={{ hovered: { scale: 1.04 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src={member.image}
            alt={member.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Role badge — pinned bottom-left inside the image area */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className={cn(
            'inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide',
            member.roleColor,
          )}>
            {member.roleTag}
          </span>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-4">

        {/* Name + role */}
        <div>
          <h3 className="text-white font-semibold text-lg leading-snug">{member.name}</h3>
          <p className="text-white/45 text-sm mt-0.5">{member.role}</p>
        </div>

        {/* Bio */}
        <p className="text-white/55 text-[13.5px] leading-relaxed line-clamp-3 flex-1">
          {member.bio}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/45 text-[11px] font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Divider + socials */}
        <div className="pt-3 border-t border-surface-border flex items-center gap-2">
          {member.linkedin && <SocialLink href={member.linkedin} type="linkedin" />}
          {member.twitter  && <SocialLink href={member.twitter}  type="twitter"  />}
          {member.github   && <SocialLink href={member.github}   type="github"   />}
          {member.dribbble && <SocialLink href={member.dribbble} type="dribbble" />}
        </div>
      </div>

      {/* ── Hover glow edge ────────────────────────────────────────────── */}
      <motion.div
        variants={{ hovered: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
      />
    </motion.article>
  );
}
