/**
 * Custom image loader for static export.
 * External URLs are returned as-is; local paths are served from the site root.
 */
export default function imageLoader({ src, width, quality }) {
  if (src.startsWith('http')) return src;
  return src;
}
