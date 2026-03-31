import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: '404 — Page Not Found' };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-brand-500 font-mono text-sm tracking-widest">404</p>
      <h1 className="text-display-xl font-bold">Page not found</h1>
      <p className="text-white/50 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl transition-colors text-sm font-medium"
      >
        Back home
      </Link>
    </div>
  );
}
