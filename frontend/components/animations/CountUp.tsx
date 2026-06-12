'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

export function CountUp({ value, className = '', duration = 1.5 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    const suffix = value.replace(/^-?\d+(\.\d+)?/, '');
    const numeric = parseFloat(value.replace(/[^0-9.-]/g, ''));
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const isFloat = value.includes('.');
    const startTime = performance.now();
    const decimals = isFloat ? 1 : 0;

    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      const current = numeric * eased;
      setDisplay(`${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
