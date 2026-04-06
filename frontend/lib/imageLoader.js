/**
 * Custom image loader for static export on GitHub Pages.
 * Prepends /Trime basePath to all local image paths.
 */
export default function imageLoader({ src, width, quality }) {
  if (src.startsWith('http')) return src;
  return `/Trime${src}`;
}
