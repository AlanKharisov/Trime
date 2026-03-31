// Thin gradient line used between sections to give visual breathing room.
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="w-full h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"
    />
  );
}
