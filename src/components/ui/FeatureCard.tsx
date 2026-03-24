'use client';

import { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  borderColor: string;
  iconColor: string;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  borderColor,
  iconColor,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl p-8 transition-all duration-500 group cursor-default overflow-hidden"
      style={{
        background: 'rgba(240, 230, 212, 0.02)',
        border: '1px solid rgba(240,230,212,0.06)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Mouse-following radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${iconColor}12, transparent 50%)`,
        }}
      />

      {/* Mouse-following border highlight */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, ${borderColor}30, transparent 50%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          borderRadius: '1rem',
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
        }}
      />

      {/* Corner accent dot */}
      <div
        className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-all duration-500"
        style={{
          backgroundColor: iconColor,
          opacity: isHovered ? 0.6 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0)',
          boxShadow: `0 0 8px ${iconColor}80`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
            style={{
              backgroundColor: `${iconColor}10`,
              border: `1px solid ${iconColor}20`,
              boxShadow: isHovered ? `0 0 20px ${iconColor}15` : 'none',
            }}
          >
            <Icon size={24} style={{ color: iconColor }} strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 tracking-tight" style={{ color: '#f0e6d4' }}>{title}</h3>
        <p className="leading-relaxed text-sm transition-colors duration-500" style={{ color: 'rgba(240,230,212,0.35)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
