'use client';

import React, { useEffect, useRef, useState } from 'react';
import FeatureCard from '../../ui/FeatureCard';
import { Wand2, Zap, Share2 } from 'lucide-react';

interface FeaturesSectionProps {
  primaryBlue?: string;
  accentGreen?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  primaryBlue = '#1ED9C3',
  accentGreen = '#FF8552',
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

  const features = [
    {
      title: 'Design Your Posts',
      description:
        'Pick from a collection of stylish, ready-made frames to enhance your photos. Your pictures get a polished look instantly.',
      icon: Wand2,
      color: primaryBlue,
    },
    {
      title: 'Effortless',
      description:
        'FrameIt makes it super easy to turn any photo into something unique. Select a frame, write a caption, upload, and done.',
      icon: Zap,
      color: accentGreen,
    },
    {
      title: 'Share Your Work',
      description:
        'Show your framed photos with friends, family, or online. The ready-made frames make sharing your memories quick and fun.',
      icon: Share2,
      color: primaryBlue,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-24 md:py-32 scroll-mt-16 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Background glows with parallax */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04] blur-[150px] pointer-events-none"
        style={{
          backgroundColor: primaryBlue,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, calc(-50% + ${scrollY * 60}px))`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{
          backgroundColor: accentGreen,
          left: '10%',
          top: '20%',
          transform: `translate(0, ${scrollY * -40}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Floating shapes */}
      <div
        className="absolute w-28 h-28 border border-white/[0.03] rounded-3xl pointer-events-none"
        style={{
          bottom: '10%',
          left: '5%',
          animation: 'floatRotate 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-14 h-14 border border-white/[0.02] rounded-full pointer-events-none"
        style={{
          top: '15%',
          right: '8%',
          animation: 'floatRotate 18s ease-in-out infinite reverse',
        }}
      />

      {/* Animated horizontal line accents */}
      <div
        className="absolute h-px opacity-[0.04] pointer-events-none"
        style={{
          width: '25%',
          top: '20%',
          right: '-5%',
          background: `linear-gradient(90deg, transparent, ${primaryBlue}, transparent)`,
          animation: 'streakMove 12s ease-in-out infinite',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-20 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <span className="text-xs font-medium text-white/50 tracking-wide uppercase">
              Features
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why{' '}
            <span style={{ color: primaryBlue }}>FrameIt</span> is your
            <br />
            picture <span style={{ color: accentGreen }}>essential</span>.
          </h2>
        </div>

        {/* Feature cards */}
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
