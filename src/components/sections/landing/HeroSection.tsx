'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import YellowButton from '../../ui/YellowButton';

const HERO_PHOTOS = [
  { src: '/hero/photo1.jpg', top: '4%', left: '3%', rotate: -12, size: 160, delay: 0 },
  { src: '/hero/photo2.jpg', top: '8%', right: '4%', rotate: 8, size: 150, delay: 1.5 },
  { src: '/hero/photo3.jpg', top: '52%', left: '2%', rotate: 6, size: 140, delay: 3 },
  { src: '/hero/photo4.jpg', bottom: '8%', right: '5%', rotate: -9, size: 155, delay: 4.5 },
  { src: '/hero/photo5.jpg', top: '5%', left: '35%', rotate: 5, size: 120, delay: 2 },
  { src: '/hero/photo6.jpg', bottom: '12%', left: '18%', rotate: -7, size: 145, delay: 5 },
  { src: '/hero/photo7.jpg', top: '38%', right: '3%', rotate: 11, size: 135, delay: 3.5 },
  { src: '/hero/photo8.jpg', bottom: '5%', left: '42%', rotate: -4, size: 125, delay: 6 },
];

interface HeroSectionProps {
  primaryBlue?: string;
  accentGreen?: string;
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  primaryBlue = '#0fa392',
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
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial mouse-follow glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[100px] transition-transform duration-[2000ms] ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${primaryBlue}, transparent 70%)`,
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Ambient gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px]"
        style={{
          backgroundColor: primaryBlue,
          top: '-15%',
          left: '-5%',
          animation: 'heroFloat 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
        style={{
          backgroundColor: accentGreen,
          bottom: '-10%',
          right: '-5%',
          animation: 'heroFloat 22s ease-in-out infinite 4s',
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.05] blur-[100px]"
        style={{
          backgroundColor: '#FFB84D',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'heroFloat 15s ease-in-out infinite 2s',
        }}
      />

      {/* Scattered floating photos */}
      {HERO_PHOTOS.map((photo, i) => {
        const parallaxX = (mousePos.x - 0.5) * (8 + i * 2);
        const parallaxY = (mousePos.y - 0.5) * (8 + i * 2);
        return (
          <div
            key={i}
            className="absolute hidden md:block pointer-events-none"
            style={{
              top: photo.top,
              left: photo.left,
              right: photo.right,
              bottom: photo.bottom,
              width: photo.size,
              transform: `rotate(${photo.rotate}deg) translate(${parallaxX}px, ${parallaxY}px)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: `floatRotateSoft 20s ease-in-out infinite ${photo.delay}s`,
              zIndex: 1,
            }}
          >
            <div
              className="rounded-lg overflow-hidden shadow-2xl"
              style={{
                padding: 5,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(2px)',
              }}
            >
              <Image
                src={photo.src}
                alt=""
                width={photo.size}
                height={photo.size}
                className="rounded-md object-cover"
                style={{
                  width: photo.size - 10,
                  height: photo.size - 10,
                  opacity: 0.55,
                  filter: 'saturate(0.8)',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Floating dots for texture */}
      {[
        { top: '15%', left: '25%', size: 4, delay: '0s', dur: '12s' },
        { top: '70%', left: '18%', size: 3, delay: '2s', dur: '14s' },
        { top: '30%', right: '20%', size: 5, delay: '4s', dur: '16s' },
        { top: '80%', right: '25%', size: 3, delay: '1s', dur: '11s' },
        { top: '50%', left: '5%', size: 4, delay: '3s', dur: '13s' },
        { top: '40%', right: '8%', size: 3, delay: '5s', dur: '15s' },
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
            opacity: 0.3,
            animation: `floatDot ${dot.dur} ease-in-out infinite ${dot.delay}`,
          }}
        />
      ))}

      {/* Horizontal light streaks */}
      <div
        className="absolute h-px opacity-[0.06]"
        style={{
          width: '40%',
          top: '30%',
          left: '-10%',
          background: `linear-gradient(90deg, transparent, ${primaryBlue}, transparent)`,
          animation: 'streakMove 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute h-px opacity-[0.04]"
        style={{
          width: '30%',
          top: '70%',
          right: '-10%',
          background: `linear-gradient(90deg, transparent, ${accentGreen}, transparent)`,
          animation: 'streakMove 10s ease-in-out infinite 3s',
        }}
      />

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
