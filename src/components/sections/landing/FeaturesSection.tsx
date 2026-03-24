import React from 'react';
import { Wand2, Zap, Share2 } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'Design Your Posts',
    description:
      'Pick from a collection of stylish, ready-made frames to enhance your photos. Your photos get a polished look instantly.',
    color: '#1ED9C3',
  },
  {
    icon: Zap,
    title: 'Effortless Creation',
    description:
      "Just select a frame, write a caption, upload your picture, and you're done. It's that simple.",
    color: '#FF8552',
  },
  {
    icon: Share2,
    title: 'Share Your Work',
    description:
      'Share your framed photos with friends, family, or online. Make sharing your memories quick, fun, and eye-catching.',
    color: '#FFB84D',
  },
];

const FeaturesSection = () => (
  <section
    id="features"
    className="py-24 md:py-32 scroll-mt-16 relative overflow-hidden bg-background"
  >
    <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <span
          className="inline-block text-sm font-medium tracking-wider uppercase mb-4"
          style={{ color: '#1ED9C3' }}
        >
          Features
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          Why choose{' '}
          <span style={{ color: '#1ED9C3' }}>
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
            className="group relative p-8 rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              '--hover-border': feature.color,
            } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = feature.color)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${feature.color}15` }}
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

            {/* Hover indicator */}
            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" style={{ color: feature.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
