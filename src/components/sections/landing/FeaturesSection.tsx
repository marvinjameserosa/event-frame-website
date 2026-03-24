'use client';

import React, { useEffect, useRef, useState } from 'react';
import FeatureCard from '../../ui/FeatureCard';
import { Wand2, Zap, Share2 } from 'lucide-react';

const FEATURE_FIREFLIES = [
  { top: '10%', left: '20%', size: 7, drift: 1, dur: '11s', glow: '3s',   delay: '0s' },
  { top: '25%', left: '75%', size: 6, drift: 2, dur: '13s', glow: '2.6s', delay: '2s' },
  { top: '50%', left: '10%', size: 8, drift: 3, dur: '10s', glow: '3.2s', delay: '1s' },
  { top: '70%', left: '55%', size: 5, drift: 1, dur: '12s', glow: '2.8s', delay: '3.5s' },
  { top: '85%', left: '85%', size: 7, drift: 2, dur: '14s', glow: '2.4s', delay: '0.5s' },
  { top: '40%', left: '45%', size: 6, drift: 3, dur: '9s',  glow: '3.4s', delay: '4s' },
];

const FEATURE_STARS = Array.from({ length: 18 }, (_, i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 1.8 + 0.8,
  delay: `${Math.random() * 5}s`,
  dur: `${2.5 + Math.random() * 3.5}s`,
  key: i,
}));

interface FeaturesSectionProps {
  primaryBlue?: string;
  accentGreen?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  primaryBlue = '#D4952B',
  accentGreen = '#E87D3E',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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

  const features = [
    {
      title: 'No Watermarks',
      description:
        'The whole reason FrameIt exists. Upload your photo, pick a frame, and download it clean -- no branding, no catches, no strings attached.',
      icon: Wand2,
      color: primaryBlue,
    },
    {
      title: 'Dead Simple',
      description:
        'No sign-ups, no complicated editors. Just pick a frame, upload your photo, and you are done. It was built to be fast and frictionless from day one.',
      icon: Zap,
      color: accentGreen,
    },
    {
      title: 'Open for Everyone',
      description:
        'What started for Arduino Day PH and ICpEP events is now free for anyone. Use it for your org, your event, or just for fun.',
      icon: Share2,
      color: primaryBlue,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 md:py-32 scroll-mt-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0806 0%, #0f0b06 50%, #0a0806 100%)' }}
    >
      {/* Stars */}
      {FEATURE_STARS.map((s) => (
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
      {FEATURE_FIREFLIES.map((f, i) => (
        <div
          key={`feat-fly-${i}`}
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

      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: 'linear-gradient(to bottom, transparent, rgba(240,230,212,0.08), transparent)' }} />

      {/* Background glows */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04] blur-[150px] pointer-events-none"
        style={{
          backgroundColor: '#D4952B',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, calc(-50% + ${scrollY * 60}px))`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{
          backgroundColor: '#FFB84D',
          left: '10%',
          top: '20%',
          transform: `translate(0, ${scrollY * -40}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          className="text-center mb-20 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6" style={{ borderColor: 'rgba(240,230,212,0.1)', background: 'rgba(240,230,212,0.03)' }}>
            <span className="text-xs font-medium tracking-wide uppercase" style={{ color: 'rgba(240,230,212,0.5)' }}>
              Features
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: '#f0e6d4' }}>
            Why we{' '}
            <span style={{ color: primaryBlue }}>built</span> this
            <br />
            and why it{"'"}s <span style={{ color: accentGreen }}>free</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transitionDelay: `${300 + index * 150}ms`,
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                borderColor={feature.color}
                iconColor={feature.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
