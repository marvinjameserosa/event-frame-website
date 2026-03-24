'use client';

import React from 'react';
import { Wand2, Zap, Share2 } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'Design Your Posts',
    description:
      'Pick from a collection of stylish, ready-made frames to enhance your photos. Your photos get a polished look instantly.',
    color: '#1ED9C3',
    bgColor: 'rgba(30, 217, 195, 0.12)',
  },
  {
    icon: Zap,
    title: 'Effortless Creation',
    description:
      "Just select a frame, write a caption, upload your picture, and you're done. It's that simple.",
    color: '#FFB84D',
    bgColor: 'rgba(255, 184, 77, 0.12)',
  },
  {
    icon: Share2,
    title: 'Share Your Work',
    description:
      'Share your framed photos with friends, family, or online. Make sharing your memories quick, fun, and eye-catching.',
    color: '#FF8552',
    bgColor: 'rgba(255, 133, 82, 0.12)',
  },
];

const FeaturesSection = () => (
  <section
    id="features"
    className="py-24 md:py-32 scroll-mt-16 relative overflow-hidden bg-background"
  >
    <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
      {/* Header */}
      <div className="text-center mb-16 animate-fadeIn">
        <span className="inline-block text-sm font-semibold text-primary tracking-wider uppercase mb-4">
          Features
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          Why choose{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #1ED9C3, #FF8552)',
            }}
          >
            FrameIt
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Everything you need to create stunning framed photos, all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 animate-fadeInUp"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: feature.bgColor }}
            >
              <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
