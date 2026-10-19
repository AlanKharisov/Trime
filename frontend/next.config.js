/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (frontend/out).
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Images are pre-optimised WebP in /public and rendered with <img>.
  images: { unoptimized: true },
};

module.exports = nextConfig;
