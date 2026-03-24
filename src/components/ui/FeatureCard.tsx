import { LucideIcon } from 'lucide-react';

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
  return (
    <div
      className="relative rounded-2xl p-8 transition-all duration-500 group cursor-default border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${iconColor}08, transparent 40%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
            style={{
              backgroundColor: `${iconColor}10`,
              border: `1px solid ${iconColor}20`,
            }}
          >
            <Icon
              size={24}
              style={{ color: iconColor }}
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-white/40 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
}
