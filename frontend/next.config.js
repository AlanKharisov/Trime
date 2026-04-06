/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Trime',
  trailingSlash: true,

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
};

module.exports = nextConfig;
