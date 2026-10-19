import type { Metadata } from 'next';
import { Team } from '@/components/sections/Team';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the TRIME team: a small senior team covering strategy, architecture, delivery and UI/UX design.',
  alternates: { canonical: '/team/' },
};

// Kept for existing links and search results; the content lives on the home page.
export default function Page() {
  return <><h1 className="sr-only">Team — TRIME</h1><Team /></>;
}
