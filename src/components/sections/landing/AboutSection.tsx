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

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="py-24 md:py-32 overflow-hidden scroll-mt-16 relative"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

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
          <div
            className="relative w-80 h-80 rounded-2xl overflow-hidden border border-white/10"
            style={{
              boxShadow: `0 20px 60px rgba(30, 217, 195, 0.15)`,
              animation: 'float 8s ease-in-out infinite',
            }}
          >
            <Image
              src="/duck.png"
              alt="FrameIt Preview"
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
          </div>

          {/* Floating accent dots */}
          <div
            className="absolute -top-4 -right-4 w-3 h-3 rounded-full"
            style={{
              backgroundColor: primaryBlue,
              animation: 'pulse 3s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full"
            style={{
              backgroundColor: accentGreen,
              animation: 'pulse 3s ease-in-out infinite 1.5s',
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
            <span style={{ color: primaryBlue }}>moments</span> into
            <br />
            <span style={{ color: accentGreen }}>masterpieces</span> with
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
              { value: 'Fast', label: 'Processing' },
              { value: 'Easy', label: 'To use' },
              { value: 'Free', label: 'Forever' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/30 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
