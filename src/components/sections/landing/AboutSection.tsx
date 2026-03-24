import Image from 'next/image';
import React from 'react';

const AboutSection = () => (
  <section
    id="about-us"
    className="py-24 md:py-32 overflow-hidden scroll-mt-16 relative bg-secondary"
  >
    <div className="max-w-6xl w-full mx-auto px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Image */}
        <div className="relative w-full max-w-md lg:w-1/2">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted border border-border">
            <Image
              src="/duck.png"
              alt="FrameIt Preview"
              fill
              className="object-cover animate-bounce-slow"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <span
            className="inline-block text-sm font-medium tracking-wider uppercase mb-4"
            style={{ color: '#FF8552' }}
          >
            About FrameIt
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
            Turn moments into{' '}
            <span style={{ color: '#FF8552' }}>
              masterpieces
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
            FrameIt transforms your everyday photos into stunning visual stories.
            Choose a frame, customize it your way, and share your creativity with the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(30,217,195,0.15)' }}>
                <svg className="w-5 h-5" style={{ color: '#1ED9C3' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-muted-foreground">Easy to use</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,133,82,0.15)' }}>
                <svg className="w-5 h-5" style={{ color: '#FF8552' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-muted-foreground">Fully customizable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
