/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages serves the site at /Trime/ (repo name)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,

  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    // Static export requires unoptimized images (no server-side processing)
    unoptimized: true,
  },

  // Keep bundle lean — only import the icons you need
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
};

module.exports = nextConfig;
