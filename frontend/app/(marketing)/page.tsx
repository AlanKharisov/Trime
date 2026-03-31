import type { Metadata } from 'next';
import { Hero }           from '@/components/sections/Hero';
import { About }          from '@/components/sections/About';
import { DevServices }    from '@/components/sections/DevServices';
import { DesignServices } from '@/components/sections/DesignServices';
import { Contact }        from '@/components/sections/Contact';
import { SectionDivider } from '@/components/layout/SectionDivider';

export const metadata: Metadata = {
  title: 'Trime Agency — Full-Stack Design & Development',
  description:
    'A senior 4-person digital agency. We build fast, beautiful, search-optimised ' +
    'products — from concept to launch. Fixed prices, no surprises.',
};

export default function HomePage() {
  return (
    <>
      {/* ① Hero ──────────────────────────────────────────────────────────── */}
      <Hero />

      <SectionDivider />

      {/* ② About the team ────────────────────────────────────────────────── */}
      <About />

      <SectionDivider />

      {/* ③ Developer Services & Pricing ──────────────────────────────────── */}
      <DevServices />

      <SectionDivider />

      {/* ④ Design Services & Pricing ─────────────────────────────────────── */}
      <DesignServices />

      <SectionDivider />

      {/* ⑤ Contact form ──────────────────────────────────────────────────── */}
      <Contact />
    </>
  );
}
