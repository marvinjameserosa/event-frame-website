'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
    {/* Teal / Orange / Yellow gradient blobs */}
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #1ED9C3 0%, transparent 70%)',
          top: '-15%',
          right: '-8%',
          opacity: 0.35,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #FF8552 0%, transparent 70%)',
          bottom: '-10%',
          left: '-5%',
          opacity: 0.3,
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, #FFB84D 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          opacity: 0.2,
          animationDelay: '4s',
        }}
      />
    </div>

    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fadeIn">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-sm text-foreground/70">Create stunning frames in seconds</span>
      </div>

      {/* Main heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight text-balance animate-fadeInUp">
        Make your photos
        <br />
        <span
          className="bg-clip-text text-transparent animate-gradient"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1ED9C3, #FFB84D, #FF8552, #1ED9C3)',
            backgroundSize: '200% 200%',
          }}
        >
          stand out
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty animate-fadeIn"
        style={{ animationDelay: '0.2s' }}
      >
        Transform your photos with beautiful frames. Create, customize, and share your visual stories effortlessly.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={onGetStarted}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-base font-semibold rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
              featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-8 py-4 text-muted-foreground text-base font-medium hover:text-foreground transition-colors cursor-pointer"
        >
          Learn more
        </button>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-primary">10k+</div>
          <div className="text-sm text-muted-foreground mt-1">Frames Created</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-accent">50+</div>
          <div className="text-sm text-muted-foreground mt-1">Templates</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#FFB84D' }}>Free</div>
          <div className="text-sm text-muted-foreground mt-1">To Use</div>
        </div>
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
