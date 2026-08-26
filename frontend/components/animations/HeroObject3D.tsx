'use client';

import { useState, type PointerEvent } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Tilt {
  x: number;
  y: number;
}

/**
 * A lightweight CSS 3D product stage. It gives the hero a tactile, Apple-like
 * presentation without WebGL, a canvas, or a large runtime dependency.
 */
interface HeroObject3DLabels {
  designCode: string;
  satisfaction: string;
  move: string;
}

export function HeroObject3D({ labels }: { labels: HeroObject3DLabels }) {
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

      <div className="hero-3d-tilt" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
      <div className="hero-3d-float">
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
          <span>{labels.designCode}</span>
        </div>
        <div className="hero-3d-card hero-3d-card-bottom">
          <span className="hero-3d-card-value">98%</span>
          <span className="hero-3d-card-label">{labels.satisfaction}</span>
        </div>
      </div>
      </div>

      <div className="hero-3d-note" aria-hidden="true">
        <span className="hero-3d-note-line" />
        <span>{labels.move}</span>
      </div>
    </div>
  );
}
