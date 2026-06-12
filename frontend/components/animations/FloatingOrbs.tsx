'use client';

import { motion } from 'framer-motion';

interface Orb {
  cx: string;
  cy: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const DEFAULT_ORBS: Orb[] = [
  { cx: '20%', cy: '30%', size: 320, color: 'rgba(37,88,255,0.12)', duration: 14, delay: 0 },
  { cx: '80%', cy: '20%', size: 260, color: 'rgba(37,88,255,0.08)', duration: 18, delay: 2 },
  { cx: '70%', cy: '80%', size: 360, color: 'rgba(255,92,53,0.06)', duration: 22, delay: 4 },
  { cx: '30%', cy: '75%', size: 240, color: 'rgba(139,92,246,0.08)', duration: 16, delay: 1 },
];

export function FloatingOrbs({ orbs = DEFAULT_ORBS, className = '' }: { orbs?: Orb[]; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: orb.cx,
            top: orb.cy,
            width: orb.size,
            height: orb.size,
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
