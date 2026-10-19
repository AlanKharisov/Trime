import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell TRIME about your project. We reply within 48 hours — talk directly to the team.',
  alternates: { canonical: '/contact/' },
};

// Kept for existing links and search results; the content lives on the home page.
export default function Page() {
  return <><h1 className="sr-only">Contact — TRIME</h1><Contact /></>;
}
