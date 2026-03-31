'use client';
import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

const buildVariants = (y: number, duration: number): Variants => ({
  hidden:  { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.16, 1, 0.3, 1] },
  },
});

/**
 * Wraps children in a motion.div that fades + slides up when it enters
 * the viewport. Viewport trigger fires once by default.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  once = true,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      variants={buildVariants(y, duration)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
