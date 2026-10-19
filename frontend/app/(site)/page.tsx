import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Pricing } from '@/components/sections/Pricing';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Solutions } from '@/components/sections/Solutions';
import { Team } from '@/components/sections/Team';
import { Work } from '@/components/sections/Work';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Solutions />
      <Work />
      <Pricing />
      <Process />
      <Team />
      <Contact />
    </>
  );
}
