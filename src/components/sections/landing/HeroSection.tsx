'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import YellowButton from '../../ui/YellowButton';

/* ── Polaroid positions: intentional gallery wall ──
   Arranged as two "wings" flanking centre content.
   Left wing  = 3 photos in a slight fan arc.
   Right wing = 3 photos mirrored.
   Bottom     = 2 photos peeking up from the edge.
*/
const HERO_PHOTOS: {
  src: string;
  caption: string;
  w: number;
  h: number;
  rotate: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  z: number;
}[] = [
  // ── Left wing (fan arc, top → bottom) ──
  { src: '/hero/photo1.jpg', caption: 'Friends forever', w: 210, h: 260, rotate: -14, top: '4%',  left: '2%',  z: 3 },
  { src: '/hero/photo3.jpg', caption: 'Golden hour',     w: 190, h: 240, rotate: -6,  top: '32%', left: '0%',  z: 2 },
  { src: '/hero/photo6.jpg', caption: 'City vibes',      w: 200, h: 250, rotate: -18, top: '60%', left: '3%',  z: 1 },

  // ── Right wing (mirrored fan arc) ──
  { src: '/hero/photo2.jpg', caption: 'Say cheese!',     w: 210, h: 260, rotate: 12,  top: '3%',  right: '2%', z: 3 },
  { src: '/hero/photo5.jpg', caption: 'Party time',      w: 190, h: 240, rotate: 5,   top: '33%', right: '1%', z: 2 },
  { src: '/hero/photo7.jpg', caption: 'Celebrate!',      w: 200, h: 250, rotate: 16,  top: '61%', right: '3%', z: 1 },

  // ── Bottom centre peek ──
  { src: '/hero/photo4.jpg', caption: 'Memories',  w: 180, h: 230, rotate: -4,  bottom: '-4%', left: '26%', z: 1 },
  { src: '/hero/photo8.jpg', caption: 'Snapshot',  w: 180, h: 230, rotate: 5,   bottom: '-4%', right: '26%', z: 1 },
];

/* ── Fireflies: warm golden-green forest lights ── */
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
  { top: '8%',  left: '18%', size: 7,  color: '#FFB84D', drift: 1, driftDur: '9s',  glowDur: '3s',   delay: '0s' },
  { top: '16%', left: '72%', size: 9,  color: '#ffe5a0', drift: 2, driftDur: '11s', glowDur: '2.6s', delay: '1.2s' },
  { top: '28%', left: '30%', size: 6,  color: '#FFB84D', drift: 3, driftDur: '13s', glowDur: '3.4s', delay: '0.4s' },
  { top: '38%', left: '60%', size: 8,  color: '#ffe5a0', drift: 1, driftDur: '10s', glowDur: '2.8s', delay: '2s' },
  { top: '52%', left: '20%', size: 5,  color: '#FFB84D', drift: 2, driftDur: '14s', glowDur: '3.2s', delay: '3.5s' },
  { top: '60%', left: '78%', size: 7,  color: '#ffe5a0', drift: 3, driftDur: '12s', glowDur: '2.4s', delay: '0.8s' },
  { top: '72%', left: '42%', size: 9,  color: '#FFB84D', drift: 1, driftDur: '11s', glowDur: '3s',   delay: '4s' },
  { top: '80%', left: '65%', size: 6,  color: '#ffe5a0', drift: 2, driftDur: '13s', glowDur: '2.6s', delay: '1.6s' },
  { top: '14%', left: '50%', size: 8,  color: '#FFB84D', drift: 3, driftDur: '10s', glowDur: '3.4s', delay: '2.8s' },
  { top: '45%', left: '85%', size: 5,  color: '#ffe5a0', drift: 1, driftDur: '12s', glowDur: '2.2s', delay: '5s' },
  { top: '88%', left: '12%', size: 7,  color: '#FFB84D', drift: 2, driftDur: '14s', glowDur: '3s',   delay: '0.6s' },
  { top: '35%', left: '10%', size: 6,  color: '#ffe5a0', drift: 3, driftDur: '11s', glowDur: '2.8s', delay: '3s' },
  { top: '22%', left: '88%', size: 8,  color: '#FFB84D', drift: 1, driftDur: '9s',  glowDur: '3.2s', delay: '1s' },
  { top: '68%', left: '35%', size: 5,  color: '#ffe5a0', drift: 2, driftDur: '13s', glowDur: '2.4s', delay: '4.5s' },
  { top: '92%', left: '55%', size: 7,  color: '#FFB84D', drift: 3, driftDur: '10s', glowDur: '3s',   delay: '2.2s' },
  { top: '5%',  left: '38%', size: 6,  color: '#ffe5a0', drift: 1, driftDur: '12s', glowDur: '2.6s', delay: '3.8s' },
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
        background: 'linear-gradient(170deg, #0b1a14 0%, #0f241a 35%, #0a1610 70%, #081210 100%)',
      }}
    >
      {/* Forest floor mist */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '40%',
          background: 'linear-gradient(to top, rgba(15,36,26,0.5), transparent)',
        }}
      />

      {/* Radial ambient glows -- like distant moonlight through trees */}
      <div
        className="absolute rounded-full opacity-[0.07] blur-[160px] pointer-events-none"
        style={{
          width: 700,
          height: 700,
          backgroundColor: '#0d7d72',
          top: '-15%',
          left: '10%',
          animation: 'heroFloat 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.05] blur-[140px] pointer-events-none"
        style={{
          width: 500,
          height: 500,
          backgroundColor: '#FFB84D',
          bottom: '0%',
          right: '5%',
          animation: 'heroFloat 26s ease-in-out infinite 5s',
        }}
      />
      <div
        className="absolute rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{
          width: 400,
          height: 400,
          backgroundColor: '#FF8552',
          top: '40%',
          right: '20%',
          animation: 'heroFloat 20s ease-in-out infinite 3s',
        }}
      />

      {/* Mouse-follow glow */}
      <div
        className="absolute rounded-full opacity-[0.06] blur-[100px] pointer-events-none transition-all duration-[2500ms] ease-out"
        style={{
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${primaryBlue}, transparent 70%)`,
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

      {/* ── Polaroid photos ── */}
      {HERO_PHOTOS.map((photo, i) => {
        const parallaxX = (mousePos.x - 0.5) * (6 + i * 2);
        const parallaxY = (mousePos.y - 0.5) * (6 + i * 2);
        return (
          <div
            key={i}
            className="absolute hidden md:block pointer-events-none select-none"
            style={{
              top: photo.top,
              bottom: photo.bottom,
              left: photo.left,
              right: photo.right,
              width: photo.w,
              zIndex: photo.z,
              transform: `rotate(${photo.rotate}deg) translate(${parallaxX}px, ${parallaxY}px)`,
              transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
              animation: `polaroidFloat ${16 + i * 2}s ease-in-out infinite ${i * 0.6}s`,
            }}
          >
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: '#f5f0e8',
                padding: '10px 10px 40px 10px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              <Image
                src={photo.src}
                alt=""
                width={photo.w}
                height={photo.h}
                className="object-cover"
                style={{
                  width: photo.w - 20,
                  height: photo.h - 50,
                  display: 'block',
                  filter: 'saturate(0.8) contrast(1.08) brightness(0.95)',
                }}
              />
              <p
                className="text-center mt-1.5 font-serif italic"
                style={{ fontSize: 11, color: '#8a7e6b', letterSpacing: '0.02em' }}
              >
                {photo.caption}
              </p>
            </div>
          </div>
        );
      })}

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
          className="text-lg sm:text-xl text-white/50 mb-10 max-w-lg mx-auto leading-relaxed font-normal"
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
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
            Scroll
          </span>
          <div className="w-px h-8 scroll-line" />
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #0b1a14 100%)',
        }}
      />
    </section>
  );
};

export default HeroSection;
