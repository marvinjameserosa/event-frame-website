'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import YellowButton from '../../ui/YellowButton';

const HERO_PHOTOS = [
  { src: '/hero/photo1.jpg', top: '2%',  left: '2%',  rotate: -14, w: 220, h: 260, caption: 'Friends forever', delay: 0 },
  { src: '/hero/photo2.jpg', top: '5%',  right: '3%', rotate: 10,  w: 200, h: 240, caption: 'Say cheese!', delay: 1.5 },
  { src: '/hero/photo3.jpg', top: '50%', left: '1%',  rotate: 7,   w: 200, h: 240, caption: 'Golden hour', delay: 3 },
  { src: '/hero/photo4.jpg', bottom: '3%', right: '2%', rotate: -8, w: 230, h: 270, caption: 'Memories', delay: 4.5 },
  { src: '/hero/photo5.jpg', top: '3%',  left: '32%', rotate: 5,   w: 180, h: 220, caption: 'Party time', delay: 2 },
  { src: '/hero/photo6.jpg', bottom: '8%', left: '15%', rotate: -10, w: 210, h: 250, caption: 'City vibes', delay: 5 },
  { src: '/hero/photo7.jpg', top: '35%', right: '1%', rotate: 12,  w: 190, h: 230, caption: 'Celebrate!', delay: 3.5 },
  { src: '/hero/photo8.jpg', bottom: '2%', left: '38%', rotate: -5, w: 200, h: 240, caption: 'Snapshot', delay: 6 },
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
      {/* Dark corkboard / mood-board texture */}
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

      {/* Scattered polaroid photos */}
      {HERO_PHOTOS.map((photo, i) => {
        const parallaxX = (mousePos.x - 0.5) * (6 + i * 2.5);
        const parallaxY = (mousePos.y - 0.5) * (6 + i * 2.5);
        return (
          <div
            key={i}
            className="absolute hidden md:block pointer-events-none select-none"
            style={{
              top: photo.top,
              left: photo.left,
              right: photo.right,
              bottom: photo.bottom,
              width: photo.w,
              transform: `rotate(${photo.rotate}deg) translate(${parallaxX}px, ${parallaxY}px)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: `floatRotateSoft 20s ease-in-out infinite ${photo.delay}s`,
              zIndex: 1,
            }}
          >
            {/* Polaroid frame */}
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: '#f5f0e8',
                padding: '10px 10px 36px 10px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
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
                  height: photo.h - 46,
                  display: 'block',
                  filter: 'saturate(0.85) contrast(1.05)',
                }}
              />
              {/* Caption area */}
              <p
                className="text-center mt-1.5 font-serif italic"
                style={{
                  fontSize: 11,
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

      {/* Floating dots for depth */}
      {[
        { top: '15%', left: '25%', size: 4, delay: '0s', dur: '12s' },
        { top: '70%', left: '18%', size: 3, delay: '2s', dur: '14s' },
        { top: '30%', right: '20%', size: 5, delay: '4s', dur: '16s' },
        { top: '80%', right: '25%', size: 3, delay: '1s', dur: '11s' },
      ].map((dot, i) => (
        <div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            right: (dot as { right?: string }).right,
            backgroundColor: i % 3 === 0 ? primaryBlue : i % 3 === 1 ? accentGreen : '#FFB84D',
            opacity: 0.25,
            animation: `floatDot ${dot.dur} ease-in-out infinite ${dot.delay}`,
          }}
        />
      ))}

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
