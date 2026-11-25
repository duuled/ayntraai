/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const QuantumBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.3;
    let currentX = targetX;
    let currentY = targetY;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.setProperty('--qx', `${currentX}px`);
      el.style.setProperty('--qy', `${currentY}px`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#080510]"
      style={
        {
          '--qx': '50vw',
          '--qy': '30vh',
        } as React.CSSProperties
      }
    >
      {/* Faint, ghostly architectural grid in nostalgia purple-obsidian & Cherenkov ice */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(167, 139, 250, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(167, 139, 250, 0.04) 1px, transparent 1px),
            linear-gradient(to right, rgba(125, 211, 252, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(125, 211, 252, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px, 48px 48px, 192px 192px, 192px 192px',
        }}
      />

      {/* Slow-drifting Cherenkov radiation blue (#091E2C) fog */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[90vw] h-[90vh] rounded-full blur-[120px] opacity-90 animate-cherenkov-drift"
        style={{
          background:
            'radial-gradient(circle at center, rgba(9, 30, 44, 0.92) 0%, rgba(9, 30, 44, 0.42) 45%, transparent 72%)',
        }}
      />

      {/* Slow-drifting bruised twilight purple (#130D1E) fog */}
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[95vw] h-[95vh] rounded-full blur-[130px] opacity-95 animate-twilight-drift"
        style={{
          background:
            'radial-gradient(circle at center, rgba(19, 13, 30, 0.98) 0%, rgba(30, 18, 52, 0.55) 48%, transparent 75%)',
        }}
      />

      {/* Secondary cross-current Cherenkov / Twilight mist */}
      <div
        className="absolute top-1/3 left-1/3 w-[65vw] h-[65vh] rounded-full blur-[140px] opacity-80 animate-subzero-pulse"
        style={{
          background:
            'radial-gradient(circle at center, rgba(19, 13, 30, 0.72) 0%, rgba(9, 30, 44, 0.45) 50%, transparent 75%)',
        }}
      />

      {/* Interactive pointer-reactive Cherenkov & twilight grid shimmer */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(520px circle at var(--qx) var(--qy), rgba(167, 139, 250, 0.085), rgba(9, 30, 44, 0.18) 42%, transparent 74%)',
        }}
      />

      {/* Faint purple-obsidian vignette for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(6, 3, 13, 0.68) 100%)',
        }}
      />
    </div>
  );
};
