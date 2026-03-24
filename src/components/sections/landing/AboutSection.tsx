import Image from 'next/image';
import React from 'react';

const AboutSection = () => (
  <section 
    id="about-us" 
    className="py-24 md:py-32 overflow-hidden scroll-mt-16 relative bg-black"
  >
    {/* Subtle gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
    
    <div className="max-w-6xl w-full mx-auto px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Image */}
        <div className="relative w-full max-w-md lg:w-1/2">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-white/5">
            <Image
              src="/duck.png"
              alt="FrameIt Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="inline-block text-sm font-medium text-white/50 tracking-wider uppercase mb-4">
            About FrameIt
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Turn moments into
            <br />
            <span className="text-white/40">masterpieces</span>
          </h2>
          
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            FrameIt transforms your everyday photos into stunning visual stories. 
            Choose a frame, customize it your way, and share your creativity with the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/70">Easy to use</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/70">Fully customizable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
