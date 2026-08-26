'use client';

import { useState, type PointerEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Tilt {
  x: number;
  y: number;
}

/**
 * A lightweight CSS 3D product stage. It gives the hero a tactile, Apple-like
 * presentation without WebGL, a canvas, or a large runtime dependency.
 */
export function HeroObject3D() {
  const reducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: y * -10, y: x * 14 });
  }

  return (
    <div
      className="hero-3d-shell"
      aria-label="Interactive 3D Trime prism"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="hero-3d-glow" aria-hidden="true" />
      <div className="hero-3d-grid" aria-hidden="true" />

      <motion.div
        className="hero-3d-float"
        animate={reducedMotion ? undefined : { y: [0, -12, 0], rotateZ: [0, 1, -1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="hero-3d-orbit hero-3d-orbit-one" aria-hidden="true" />
        <div className="hero-3d-orbit hero-3d-orbit-two" aria-hidden="true" />

        <div className="hero-3d-prism" aria-hidden="true">
          <div className="hero-3d-face hero-3d-face-front">
            <div className="hero-3d-face-shine" />
            <div className="hero-3d-face-content">
              <span className="hero-3d-mark">T</span>
              <span className="hero-3d-wordmark">TRIME</span>
              <span className="hero-3d-caption">DIGITAL SYSTEMS</span>
            </div>
          </div>
          <div className="hero-3d-face hero-3d-face-back" />
          <div className="hero-3d-face hero-3d-face-right" />
          <div className="hero-3d-face hero-3d-face-left" />
          <div className="hero-3d-face hero-3d-face-top" />
          <div className="hero-3d-face hero-3d-face-bottom" />
        </div>

        <div className="hero-3d-card hero-3d-card-top">
          <span className="hero-3d-card-dot" />
          <span>DESIGN / CODE</span>
        </div>
        <div className="hero-3d-card hero-3d-card-bottom">
          <span className="hero-3d-card-value">98%</span>
          <span className="hero-3d-card-label">client satisfaction</span>
        </div>
      </motion.div>

      <div className="hero-3d-note" aria-hidden="true">
        <span className="hero-3d-note-line" />
        <span>Move to explore</span>
      </div>
    </div>
  );
}
