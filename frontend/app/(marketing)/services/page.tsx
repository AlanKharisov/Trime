import type { Metadata } from 'next';
import { DevServices } from '@/components/sections/DevServices';
import { DesignServices } from '@/components/sections/DesignServices';
import { SectionDivider } from '@/components/layout/SectionDivider';

export const metadata: Metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <>
      <DevServices />
      <SectionDivider />
      <DesignServices />
    </>
  );
}
