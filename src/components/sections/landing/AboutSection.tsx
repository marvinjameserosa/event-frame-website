'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

/* Section-specific fireflies */
const ABOUT_FIREFLIES = [
  { top: '8%',  left: '15%', size: 6, drift: 1, dur: '10s', glow: '2.8s', delay: '0.5s' },
  { top: '20%', left: '78%', size: 8, drift: 2, dur: '12s', glow: '3.2s', delay: '1.8s' },
  { top: '45%', left: '90%', size: 5, drift: 3, dur: '11s', glow: '2.4s', delay: '0s' },
  { top: '65%', left: '8%',  size: 7, drift: 1, dur: '13s', glow: '3s',   delay: '3s' },
  { top: '80%', left: '60%', size: 6, drift: 2, dur: '10s', glow: '2.6s', delay: '2.2s' },
  { top: '35%', left: '42%', size: 5, drift: 3, dur: '14s', glow: '3.4s', delay: '4s' },
  { top: '55%', left: '68%', size: 7, drift: 1, dur: '9s',  glow: '2.8s', delay: '1s' },
  { top: '15%', left: '52%', size: 6, drift: 2, dur: '11s', glow: '3s',   delay: '3.5s' },
];

const ABOUT_STARS = Array.from({ length: 20 }, (_, i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 1.8 + 0.8,
  delay: `${Math.random() * 5}s`,
  dur: `${2.5 + Math.random() * 3.5}s`,
  key: i,
}));

interface AboutSectionProps {
  primaryBlue?: string;
  accentGreen?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  primaryBlue = '#D4952B',
  accentGreen = '#E87D3E',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = -rect.top / rect.height;
        setScrollY(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="py-24 md:py-32 overflow-hidden scroll-mt-16 relative"
      style={{ background: 'linear-gradient(180deg, #0a0806 0%, #110e0a 50%, #0a0806 100%)' }}
    >
      {/* Stars */}
      {ABOUT_STARS.map((s) => (
        <div
          key={s.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            backgroundColor: '#f0e6d4',
            animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Fireflies */}
      {ABOUT_FIREFLIES.map((f, i) => (
        <div
          key={`about-fly-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: f.size,
            height: f.size,
            top: f.top,
            left: f.left,
            backgroundColor: '#FFB84D',
            color: '#FFB84D',
            animation: `fireflyDrift${f.drift} ${f.dur} ease-in-out infinite ${f.delay}, fireflyGlow ${f.glow} ease-in-out infinite ${f.delay}`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Dotted grid pattern -- warm */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(240,230,212,0.03) 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)',
        }}
      />

      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: 'linear-gradient(to bottom, transparent, rgba(240,230,212,0.08), transparent)' }} />

      {/* Background glows */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full opacity-[0.05] blur-[180px] pointer-events-none"
        style={{
          backgroundColor: '#D4952B',
          left: '20%',
          top: '50%',
          transform: `translate(-50%, calc(-50% + ${scrollY * 80}px))`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[150px] pointer-events-none"
        style={{
          backgroundColor: accentGreen,
          right: '10%',
          top: '30%',
          transform: `translate(0, ${scrollY * -50}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      <div className="max-w-6xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-16 relative z-10">
        {/* Image side */}
        <div
          className="relative w-full max-w-sm h-80 md:h-96 shrink-0 flex items-center justify-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
          }}
        >
          <div
            className="absolute inset-0 rounded-3xl blur-[60px] opacity-20"
            style={{ backgroundColor: '#D4952B' }}
          />

          <div
            className="absolute w-[340px] h-[340px] rounded-full border border-dashed pointer-events-none"
            style={{
              borderColor: 'rgba(212,149,43,0.12)',
              animation: 'spinSlow 30s linear infinite',
            }}
          />

          <div
            className="relative w-80 h-80 rounded-2xl overflow-hidden group"
            style={{
              border: '1px solid rgba(240,230,212,0.1)',
              boxShadow: '0 20px 60px rgba(212, 149, 43, 0.15)',
              animation: 'float 8s ease-in-out infinite',
            }}
          >
            <Image
              src="/duck.png"
              alt="FrameIt Preview"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="320px"
              priority
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, rgba(212,149,43,0.15), transparent 60%)`,
              }}
            />
          </div>

          <div
            className="absolute -top-4 -right-4 w-3 h-3 rounded-full"
            style={{
              backgroundColor: '#FFB84D',
              animation: 'pulse 3s ease-in-out infinite',
              boxShadow: '0 0 12px rgba(255,184,77,0.6)',
            }}
          />
          <div
            className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full"
            style={{
              backgroundColor: accentGreen,
              animation: 'pulse 3s ease-in-out infinite 1.5s',
              boxShadow: `0 0 10px ${accentGreen}60`,
            }}
          />
        </div>

        {/* Text side */}
        <div
          className="text-center md:text-left md:max-w-lg shrink-0 transition-all duration-1000 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6" style={{ borderColor: 'rgba(240,230,212,0.1)', background: 'rgba(240,230,212,0.03)' }}>
            <span className="text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(240,230,212,0.5)' }}>The story</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight" style={{ color: '#f0e6d4' }}>
            A{' '}
            <span className="relative inline-block">
              <span style={{ color: primaryBlue }}>side project</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{
                  backgroundColor: primaryBlue,
                  opacity: isVisible ? 0.4 : 0,
                  transition: 'opacity 1s ease 0.8s',
                }}
              />
            </span>
            <br />
            that became{' '}
            <span className="relative inline-block">
              <span style={{ color: accentGreen }}>something</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{
                  backgroundColor: accentGreen,
                  opacity: isVisible ? 0.4 : 0,
                  transition: 'opacity 1s ease 1s',
                }}
              />
            </span>
            <br />
            bigger.
          </h2>

          <p className="text-lg leading-relaxed" style={{ color: 'rgba(240,230,212,0.35)' }}>
            FrameIt started as a fun workaround to avoid watermarks on DP Blast. What began as a quick hack turned into a collaborative effort, adopted by Arduino Day PH and ICpEP for their events. Now it{"'"}s open and free for everyone to use.
          </p>

          <div className="flex gap-8 mt-8 justify-center md:justify-start">
            {[
              { value: 'Arduino', label: 'Day PH', color: primaryBlue },
              { value: 'ICpEP', label: 'Events', color: accentGreen },
              { value: 'Free', label: 'For all', color: '#FFB84D' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center cursor-default group relative"
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div
                  className="absolute -inset-3 rounded-xl opacity-0 transition-opacity duration-300 blur-xl"
                  style={{
                    backgroundColor: stat.color,
                    opacity: hoveredStat === i ? 0.1 : 0,
                  }}
                />
                <div
                  className="text-xl font-bold transition-colors duration-300 relative"
                  style={{ color: hoveredStat === i ? stat.color : '#f0e6d4' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs mt-1 relative" style={{ color: 'rgba(240,230,212,0.25)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
