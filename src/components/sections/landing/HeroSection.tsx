'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import YellowButton from '../../ui/YellowButton';

/* ── Polaroid layout: balanced gallery-wall arrangement ── */
const HERO_PHOTOS = [
  // Left column - stacked vertically with offsets
  { src: '/hero/photo1.jpg', top: '4%',   left: '1%',   rotate: -12, w: 240, h: 290, caption: 'Friends forever' },
  { src: '/hero/photo3.jpg', top: '48%',  left: '3%',   rotate: 8,   w: 220, h: 270, caption: 'Golden hour' },

  // Right column - stacked vertically with offsets
  { src: '/hero/photo2.jpg', top: '2%',   right: '1%',  rotate: 10,  w: 230, h: 280, caption: 'Say cheese!' },
  { src: '/hero/photo7.jpg', top: '46%',  right: '2%',  rotate: -7,  w: 210, h: 260, caption: 'Celebrate!' },

  // Top center - peeking behind content
  { src: '/hero/photo5.jpg', top: '1%',   left: '34%',  rotate: 4,   w: 200, h: 250, caption: 'Party time' },

  // Bottom scattered
  { src: '/hero/photo4.jpg', bottom: '2%', right: '5%',  rotate: -6,  w: 240, h: 290, caption: 'Memories' },
  { src: '/hero/photo6.jpg', bottom: '3%', left: '6%',   rotate: 11,  w: 220, h: 270, caption: 'City vibes' },
  { src: '/hero/photo8.jpg', bottom: '1%', left: '36%',  rotate: -3,  w: 210, h: 260, caption: 'Snapshot' },
];

/* ── Fireflies: bigger, glowing, drifting ── */
const FIREFLIES = [
  { top: '12%', left: '22%',  size: 8,  color: '#0d7d72', driftDur: '8s',  glowDur: '2.4s', delay: '0s' },
  { top: '25%', left: '70%',  size: 10, color: '#FFB84D', driftDur: '10s', glowDur: '1.8s', delay: '1s' },
  { top: '60%', left: '28%',  size: 7,  color: '#FF8552', driftDur: '12s', glowDur: '2.2s', delay: '3s' },
  { top: '75%', left: '65%',  size: 9,  color: '#0d7d72', driftDur: '9s',  glowDur: '2.6s', delay: '2s' },
  { top: '40%', left: '50%',  size: 6,  color: '#FFB84D', driftDur: '11s', glowDur: '2s',   delay: '4s' },
  { top: '18%', left: '45%',  size: 8,  color: '#FF8552', driftDur: '14s', glowDur: '2.8s', delay: '0.5s' },
  { top: '85%', left: '40%',  size: 7,  color: '#0d7d72', driftDur: '13s', glowDur: '2.1s', delay: '5s' },
  { top: '55%', left: '80%',  size: 10, color: '#FFB84D', driftDur: '10s', glowDur: '1.9s', delay: '1.5s' },
  { top: '35%', left: '12%',  size: 6,  color: '#FF8552', driftDur: '15s', glowDur: '2.5s', delay: '3.5s' },
  { top: '68%', left: '55%',  size: 9,  color: '#0d7d72', driftDur: '11s', glowDur: '2.3s', delay: '2.5s' },
  { top: '8%',  left: '58%',  size: 7,  color: '#FFB84D', driftDur: '9s',  glowDur: '1.7s', delay: '6s' },
  { top: '90%', left: '18%',  size: 8,  color: '#FF8552', driftDur: '12s', glowDur: '2s',   delay: '4.5s' },
];

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
          'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 150 + i * 120);
    });
  }, []);

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
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Dark corkboard texture dots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Subtle warm vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Radial mouse-follow glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.05] blur-[100px] transition-transform duration-[2000ms] ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${primaryBlue}, transparent 70%)`,
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Ambient gradient orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          backgroundColor: primaryBlue,
          top: '-10%',
          left: '-5%',
          animation: 'heroFloat 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]"
        style={{
          backgroundColor: accentGreen,
          bottom: '-5%',
          right: '-5%',
          animation: 'heroFloat 22s ease-in-out infinite 4s',
        }}
      />

      {/* ── Fireflies ── */}
      {FIREFLIES.map((f, i) => (
        <div
          key={`firefly-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: f.size,
            height: f.size,
            top: f.top,
            left: f.left,
            backgroundColor: f.color,
            color: f.color,
            animation: `fireflyDrift ${f.driftDur} ease-in-out infinite ${f.delay}, fireflyGlow ${f.glowDur} ease-in-out infinite ${f.delay}`,
            zIndex: 5,
          }}
        />
      ))}

      {/* ── Scattered polaroid photos ── */}
      {HERO_PHOTOS.map((photo, i) => {
        const parallaxX = (mousePos.x - 0.5) * (8 + i * 3);
        const parallaxY = (mousePos.y - 0.5) * (8 + i * 3);
        return (
          <div
            key={i}
            className="absolute hidden md:block pointer-events-none select-none"
            style={{
              top: photo.top,
              left: (photo as { left?: string }).left,
              right: (photo as { right?: string }).right,
              bottom: (photo as { bottom?: string }).bottom,
              width: photo.w,
              transform: `rotate(${photo.rotate}deg) translate(${parallaxX}px, ${parallaxY}px)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: `floatRotateSoft ${18 + i * 2}s ease-in-out infinite ${i * 0.8}s`,
              zIndex: 1,
            }}
          >
            {/* Polaroid frame */}
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: '#f5f0e8',
                padding: '12px 12px 44px 12px',
                boxShadow: '0 10px 50px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35)',
              }}
            >
              <Image
                src={photo.src}
                alt=""
                width={photo.w}
                height={photo.h}
                className="object-cover"
                style={{
                  width: photo.w - 24,
                  height: photo.h - 56,
                  display: 'block',
                  filter: 'saturate(0.85) contrast(1.05)',
                }}
              />
              {/* Caption area */}
              <p
                className="text-center mt-2 font-serif italic"
                style={{
                  fontSize: 12,
                  color: '#8a7e6b',
                  letterSpacing: '0.02em',
                }}
              >
                {photo.caption}
              </p>
            </div>
          </div>
        );
      })}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          data-animate
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8"
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: primaryBlue, animation: 'pulse 2s ease-in-out infinite' }}
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
          <span className="relative inline-block group">
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
          className="text-lg sm:text-xl text-white/50 mb-10 max-w-lg mx-auto leading-relaxed font-normal"
        >
          Create, customize, and share stunning photo frames. Be post-ready in seconds.
        </p>

        {/* CTA */}
        <div data-animate className="relative inline-block group">
          <div
            className="absolute -inset-1 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
            style={{ backgroundColor: '#FFB84D' }}
          />
          <YellowButton size="lg" onClick={onGetStarted} className="relative text-black font-bold tracking-wide">
            Get Started
          </YellowButton>
        </div>

        {/* Scroll indicator */}
        <div data-animate className="mt-20 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
            Scroll
          </span>
          <div className="w-px h-8 scroll-line" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)',
        }}
      />
    </section>
  );
};

export default HeroSection;
