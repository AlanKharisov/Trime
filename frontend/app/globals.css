@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-geist-sans: '';
    --font-geist-mono: '';
  }

  * {
    @apply border-surface-border;
  }

  html {
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-surface text-white;
    background-image: theme('backgroundImage.noise');
  }

  ::selection {
    @apply bg-brand-500/30 text-white;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-surface;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-surface-border rounded-full;
  }
}

@layer components {
  /* Reusable section wrapper */
  .section-wrapper {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  /* Gradient text utility */
  .text-gradient {
    @apply bg-gradient-to-r from-white via-brand-300 to-brand-500 bg-clip-text text-transparent;
  }

  /* Card surface */
  .card {
    @apply bg-surface-card border border-surface-border rounded-xl2 shadow-card;
  }

  /* Focus ring */
  .focus-ring {
    @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
