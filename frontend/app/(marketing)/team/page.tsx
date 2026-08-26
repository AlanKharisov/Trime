import type { Metadata } from 'next';
import { About } from '@/components/sections/About';

export const metadata: Metadata = { title: 'The Team' };

export default function TeamPage() {
  return <About />;
}
