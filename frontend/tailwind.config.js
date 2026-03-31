/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — update these to your final brand colors
        brand: {
          50:  '#f0f4ff',
          100: '#dce6ff',
          200: '#b3c8ff',
          300: '#7aa0ff',
          400: '#4c7aff',
          500: '#2558ff', // primary
          600: '#1a42e0',
          700: '#1330b8',
          800: '#0f238f',
          900: '#0b1a6e',
          950: '#070e45',
        },
        accent: {
          DEFAULT: '#ff5c35',
          hover:   '#e64a25',
        },
        surface: {
          DEFAULT: '#0d0d0f',
          card:    '#141418',
          border:  '#1e1e26',
        },
      },
      fontFamily: {
        sans:    ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // Fluid display sizes
        'display-2xl': ['clamp(3rem,   6vw, 5rem)',   { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.25rem,4vw, 3.75rem)',{ lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg':  ['clamp(1.875rem,3vw,3rem)',   { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.5rem,  2.5vw,2.25rem)',{ lineHeight: '1.25',letterSpacing: '-0.015em'}],
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        'xl2': '1rem',
        'xl3': '1.5rem',
      },
      boxShadow: {
        'glow':    '0 0 40px -10px rgba(37, 88, 255, 0.4)',
        'glow-lg': '0 0 80px -20px rgba(37, 88, 255, 0.5)',
        'card':    '0 1px 0 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':    'radial-gradient(at 40% 20%, hsla(228,100%,74%,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%,   hsla(189,100%,56%,0.05) 0px, transparent 50%), radial-gradient(at 0%  50%, hsla(355,100%,93%,0.04) 0px, transparent 50%)',
        'noise':             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease forwards',
        'slide-up':   'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee':    'marquee 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        marquee:   { from: { transform: 'translateX(0%)' }, to: { transform: 'translateX(-50%)' } },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
