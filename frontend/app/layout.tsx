import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope } from 'next/font/google';
import { LocaleProvider } from '@/components/LocaleProvider';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700', '800'], display: 'swap', variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], weight: ['400', '500'], display: 'swap', variable: '--font-mono' });

const TITLE = 'TRIME — Full-cycle digital product team';
const DESCRIPTION =
  'Web apps, mobile applications, backend systems and automation — designed, developed and launched by one small senior team. Starting prices from $100.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | TRIME' },
  description: DESCRIPTION,
  keywords: ['web development', 'mobile apps', 'MVP', 'Telegram bots', 'UI/UX design', 'e-commerce', 'digital product team'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'TRIME',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'TRIME — We build digital products from idea to production.' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.png'] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#07080D',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TRIME',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo.jpg`,
  description: DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
