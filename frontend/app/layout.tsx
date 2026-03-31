import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trime.agency'),
  title: {
    template: '%s | Trime Agency',
    default: 'Trime Agency — Full-Stack Design & Development',
  },
  description:
    'We design and build fast, beautiful digital products. A 4-person team of senior full-stack developers, UI/UX designers, and SEO specialists.',
  keywords: ['web design', 'web development', 'SEO', 'digital agency', 'Next.js', 'UI/UX'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Trime Agency',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="bg-surface text-white antialiased">{children}</body>
    </html>
  );
}
