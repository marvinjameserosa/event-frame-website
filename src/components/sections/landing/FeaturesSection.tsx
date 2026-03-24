import React from 'react';
import { Wand2, Zap, Share2 } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'Design Your Posts',
    description: 'Pick from a collection of stylish, ready-made frames to enhance your photos. Your photos get a polished look instantly.',
  },
  {
    icon: Zap,
    title: 'Effortless Creation',
    description: 'Just select a frame, write a caption, upload your picture, and you\'re done. It\'s that simple.',
  },
  {
    icon: Share2,
    title: 'Share Your Work',
    description: 'Share your framed photos with friends, family, or online. Make sharing your memories quick, fun, and eye-catching.',
  },
];

const FeaturesSection = () => (
  <section 
    id="features" 
    className="py-24 md:py-32 scroll-mt-16 relative overflow-hidden bg-black"
  >
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
    
    <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-medium text-white/50 tracking-wider uppercase mb-4">
          Features
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Why choose <span className="text-white/40">FrameIt</span>
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Everything you need to create stunning framed photos, all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
              <feature.icon className="w-6 h-6 text-white/70" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-white/50 leading-relaxed">
              {feature.description}
            </p>

            {/* Hover indicator */}
            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
