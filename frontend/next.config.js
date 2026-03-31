/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for catching subtle React bugs early
  reactStrictMode: true,

  // Compress assets via gzip
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        // Deterministic placeholder photos used during development
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        // Picsum CDN delivery
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
    ],
    // Limit image sizes to those actually used
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Forward /api/* calls to Express backend in dev
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/api/:path*'
            : `${process.env.BACKEND_URL}/api/:path*`,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // Keep bundle lean — only import the icons you need
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
};

module.exports = nextConfig;
