'use client';

import React, { useEffect, useRef, useState } from 'react';
import YellowButton from '../../ui/YellowButton';

/* ── Fireflies: warm golden lanterns in a night sky ── */
const FIREFLIES: {
  top: string;
  left: string;
  size: number;
  color: string;
  drift: 1 | 2 | 3;
  driftDur: string;
  glowDur: string;
  delay: string;
}[] = [
  { top: '6%',  left: '22%', size: 7,  color: '#FFB84D', drift: 1, driftDur: '9s',  glowDur: '3s',   delay: '0s' },
  { top: '12%', left: '68%', size: 9,  color: '#ffe5a0', drift: 2, driftDur: '11s', glowDur: '2.6s', delay: '1.2s' },
  { top: '25%', left: '35%', size: 6,  color: '#FFB84D', drift: 3, driftDur: '13s', glowDur: '3.4s', delay: '0.4s' },
  { top: '34%', left: '58%', size: 8,  color: '#ffe5a0', drift: 1, driftDur: '10s', glowDur: '2.8s', delay: '2s' },
  { top: '48%', left: '25%', size: 5,  color: '#FFB84D', drift: 2, driftDur: '14s', glowDur: '3.2s', delay: '3.5s' },
  { top: '55%', left: '74%', size: 7,  color: '#ffe5a0', drift: 3, driftDur: '12s', glowDur: '2.4s', delay: '0.8s' },
  { top: '68%', left: '44%', size: 9,  color: '#FFB84D', drift: 1, driftDur: '11s', glowDur: '3s',   delay: '4s' },
  { top: '76%', left: '62%', size: 6,  color: '#ffe5a0', drift: 2, driftDur: '13s', glowDur: '2.6s', delay: '1.6s' },
  { top: '10%', left: '48%', size: 8,  color: '#FFB84D', drift: 3, driftDur: '10s', glowDur: '3.4s', delay: '2.8s' },
  { top: '42%', left: '82%', size: 5,  color: '#ffe5a0', drift: 1, driftDur: '12s', glowDur: '2.2s', delay: '5s' },
  { top: '85%', left: '15%', size: 7,  color: '#FFB84D', drift: 2, driftDur: '14s', glowDur: '3s',   delay: '0.6s' },
  { top: '30%', left: '14%', size: 6,  color: '#ffe5a0', drift: 3, driftDur: '11s', glowDur: '2.8s', delay: '3s' },
  { top: '18%', left: '85%', size: 8,  color: '#FFB84D', drift: 1, driftDur: '9s',  glowDur: '3.2s', delay: '1s' },
  { top: '62%', left: '32%', size: 5,  color: '#ffe5a0', drift: 2, driftDur: '13s', glowDur: '2.4s', delay: '4.5s' },
  { top: '90%', left: '52%', size: 7,  color: '#FFB84D', drift: 3, driftDur: '10s', glowDur: '3s',   delay: '2.2s' },
  { top: '4%',  left: '42%', size: 6,  color: '#ffe5a0', drift: 1, driftDur: '12s', glowDur: '2.6s', delay: '3.8s' },
];

/* ── Tiny twinkling stars ── */
const STARS = Array.from({ length: 30 }, (_, i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: `${Math.random() * 6}s`,
  dur: `${2 + Math.random() * 4}s`,
  key: i,
}));

interface HeroSectionProps {
  primaryBlue?: string;
  accentGreen?: string;
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  primaryBlue = '#0d7d72',
  accentGreen = '#FF8552',
  onGetStarted,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  /* Staggered entrance */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const children = section.querySelectorAll('[data-animate]');
    children.forEach((child, i) => {
      const el = child as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition =
          'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150 + i * 120);
    });
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #0a1228 0%, #080e1a 30%, #0c1526 65%, #080e1a 100%)',
      }}
    >
      {/* Twinkling stars layer */}
      {STARS.map((s) => (
        <div
          key={s.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            backgroundColor: '#fff',
            animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Deep sky ambient glows */}
      <div
        className="absolute rounded-full opacity-[0.06] blur-[180px] pointer-events-none"
        style={{
          width: 800,
          height: 800,
          backgroundColor: '#1a3a6e',
          top: '-20%',
          left: '5%',
          animation: 'heroFloat 24s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.05] blur-[160px] pointer-events-none"
        style={{
          width: 600,
          height: 600,
          backgroundColor: '#0d7d72',
          bottom: '-5%',
          right: '10%',
          animation: 'heroFloat 28s ease-in-out infinite 4s',
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.04] blur-[140px] pointer-events-none"
        style={{
          width: 500,
          height: 500,
          backgroundColor: '#FFB84D',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'heroFloat 22s ease-in-out infinite 2s',
        }}
      />

      {/* Mouse-follow glow */}
      <div
        className="absolute rounded-full opacity-[0.05] blur-[120px] pointer-events-none transition-all duration-[2500ms] ease-out"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, #1a3a6e, transparent 70%)',
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ── Fireflies ── */}
      {FIREFLIES.map((f, i) => (
        <div
          key={`fly-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: f.size,
            height: f.size,
            top: f.top,
            left: f.left,
            backgroundColor: f.color,
            color: f.color,
            animation: `fireflyDrift${f.drift} ${f.driftDur} ease-in-out infinite ${f.delay}, fireflyGlow ${f.glowDur} ease-in-out infinite ${f.delay}`,
            zIndex: 15,
          }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div
          data-animate
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8"
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#FFB84D', animation: 'pulse 2s ease-in-out infinite' }}
          />
          <span className="text-xs font-medium text-white/60 tracking-wide uppercase">
            Frame your moments
          </span>
        </div>

        <h1
          data-animate
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight"
        >
          Make it{' '}
          <span className="relative inline-block">
            <span className="relative z-10 hero-text-glow" style={{ color: primaryBlue }}>
              stand out.
            </span>
            <span
              className="absolute bottom-1 left-0 right-0 h-3 opacity-20 rounded-full blur-sm"
              style={{ backgroundColor: primaryBlue }}
            />
          </span>
          <br />
          <span className="text-white/90">
            <span style={{ color: accentGreen }} className="font-black">
              FrameIt
            </span>{' '}
            now.
          </span>
        </h1>

        <p
          data-animate
          className="text-lg sm:text-xl text-white/45 mb-10 max-w-lg mx-auto leading-relaxed font-normal"
        >
          Create, customize, and share stunning photo frames. Be post-ready in seconds.
        </p>

        <div data-animate className="relative inline-block group">
          <div
            className="absolute -inset-1 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={{ backgroundColor: '#FFB84D' }}
          />
          <YellowButton size="lg" onClick={onGetStarted} className="relative text-black font-bold tracking-wide">
            Get Started
          </YellowButton>
        </div>

        <div data-animate className="mt-20 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">
            Scroll
          </span>
          <div className="w-px h-8 scroll-line" />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #080e1a 100%)',
        }}
      />
    </section>
  );
};

export default HeroSection;
