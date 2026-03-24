import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
    {/* Subtle gradient orbs */}
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
          top: '-20%',
          right: '-10%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
          bottom: '-10%',
          left: '-5%',
        }}
      />
    </div>

    {/* Grid pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.15) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />

    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border mb-8 animate-fadeIn">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-sm text-muted-foreground">Create stunning frames in seconds</span>
      </div>

      {/* Main heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight text-balance animate-fadeInUp">
        Make your photos
        <br />
        <span className="text-muted-foreground">stand out</span>
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
          className="flex items-center gap-2 px-8 py-4 bg-foreground text-background text-base font-semibold rounded-full hover:opacity-90 transition-all hover:scale-105"
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
          className="px-8 py-4 text-muted-foreground text-base font-medium hover:text-foreground transition-colors"
        >
          Learn more
        </button>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-foreground">10k+</div>
          <div className="text-sm text-muted-foreground mt-1">Frames Created</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-foreground">50+</div>
          <div className="text-sm text-muted-foreground mt-1">Templates</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-bold text-foreground">Free</div>
          <div className="text-sm text-muted-foreground mt-1">To Use</div>
        </div>
      </div>
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroSection;
