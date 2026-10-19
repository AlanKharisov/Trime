import type { Metadata } from 'next';
import { Pricing } from '@/components/sections/Pricing';
import { Services } from '@/components/sections/Services';
import { Solutions } from '@/components/sections/Solutions';

export const metadata: Metadata = {
  title: 'Services and starting prices',
  description: 'Web apps, mobile apps, backend & APIs, e-commerce, automation and MVPs — with transparent starting prices.',
  alternates: { canonical: '/services/' },
};

// Kept for existing links and search results; the content lives on the home page.
export default function Page() {
  return <><h1 className="sr-only">Services and starting prices — TRIME</h1><Services /><Solutions /><Pricing /></>;
}
