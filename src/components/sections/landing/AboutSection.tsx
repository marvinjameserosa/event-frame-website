'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface AboutSectionProps {
  primaryBlue?: string;
  accentGreen?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  primaryBlue = '#1ED9C3',
  accentGreen = '#FF8552',
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
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
      style={{ background: '#0a0a0a' }}
    >
      {/* Dotted grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)',
        }}
      />

      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Large background glow that shifts with scroll */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full opacity-[0.04] blur-[180px] pointer-events-none"
        style={{
          backgroundColor: primaryBlue,
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

      {/* Floating geometric accents */}
      <div
        className="absolute w-32 h-32 border border-white/[0.03] rounded-3xl pointer-events-none"
        style={{
          top: '10%',
          right: '5%',
          animation: 'floatRotate 24s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-20 h-20 border border-white/[0.02] rounded-full pointer-events-none"
        style={{
          bottom: '15%',
          left: '3%',
          animation: 'floatRotate 20s ease-in-out infinite reverse',
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
          {/* Glow behind image */}
          <div
            className="absolute inset-0 rounded-3xl blur-[60px] opacity-20"
            style={{ backgroundColor: primaryBlue }}
          />

          {/* Rotating ring */}
          <div
            className="absolute w-[340px] h-[340px] rounded-full border border-dashed pointer-events-none"
            style={{
              borderColor: `${primaryBlue}15`,
              animation: 'spinSlow 30s linear infinite',
            }}
          />

          <div
            className="relative w-80 h-80 rounded-2xl overflow-hidden border border-white/10 group"
            style={{
              boxShadow: `0 20px 60px rgba(30, 217, 195, 0.15)`,
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
            {/* Image overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${primaryBlue}20, transparent 60%)`,
              }}
            />
          </div>

          {/* Floating accent dots with trails */}
          <div
            className="absolute -top-4 -right-4 w-3 h-3 rounded-full"
            style={{
              backgroundColor: primaryBlue,
              animation: 'pulse 3s ease-in-out infinite',
              boxShadow: `0 0 12px ${primaryBlue}60`,
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
          <div
            className="absolute top-1/2 -right-6 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: '#FFB84D',
              animation: 'pulse 4s ease-in-out infinite 0.5s',
              boxShadow: '0 0 8px rgba(255,184,77,0.5)',
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <span className="text-xs font-medium text-white/50 tracking-wide uppercase">About us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Turn{' '}
            <span className="relative inline-block">
              <span style={{ color: primaryBlue }}>moments</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{
                  backgroundColor: primaryBlue,
                  opacity: isVisible ? 0.4 : 0,
                  transition: 'opacity 1s ease 0.8s',
                }}
              />
            </span>{' '}
            into
            <br />
            <span className="relative inline-block">
              <span style={{ color: accentGreen }}>masterpieces</span>
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{
                  backgroundColor: accentGreen,
                  opacity: isVisible ? 0.4 : 0,
                  transition: 'opacity 1s ease 1s',
                }}
              />
            </span>{' '}
            with
            <br />
            just one frame.
          </h2>

          <p className="text-white/40 text-lg leading-relaxed">
            FrameIt transforms your everyday photos into stunning visual stories.
            Choose a frame, customize it your way, and share your creativity with the world.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mt-8 justify-center md:justify-start">
            {[
              { value: 'Fast', label: 'Processing', color: primaryBlue },
              { value: 'Easy', label: 'To use', color: accentGreen },
              { value: 'Free', label: 'Forever', color: '#FFB84D' },
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
                  style={{
                    color: hoveredStat === i ? stat.color : 'white',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 mt-1 relative">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
