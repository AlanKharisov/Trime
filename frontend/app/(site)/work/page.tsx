import type { Metadata } from 'next';
import { Work } from '@/components/sections/Work';

export const metadata: Metadata = {
  title: 'Selected work',
  description: 'Products TRIME designs and builds: web apps, e-commerce and mobile MVPs. Case studies are available on request.',
  alternates: { canonical: '/work/' },
};

// Kept for existing links and search results; the content lives on the home page.
export default function Page() {
  return <><h1 className="sr-only">Selected work — TRIME</h1><Work /></>;
}
