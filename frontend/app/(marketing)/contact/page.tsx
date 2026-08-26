import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return <Contact />;
}
