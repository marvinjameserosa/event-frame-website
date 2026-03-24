"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFrames } from '@/hooks/useFrames';

/* Stars for this section */
const CAROUSEL_STARS = Array.from({ length: 14 }, (_, i) => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 1.6 + 0.8,
  delay: `${Math.random() * 5}s`,
  dur: `${2.5 + Math.random() * 3}s`,
  key: i,
}));

/* Fireflies */
const CAROUSEL_FIREFLIES = [
  { top: '15%', left: '12%', size: 6, drift: 1, dur: '10s', glow: '2.8s', delay: '0s' },
  { top: '50%', left: '80%', size: 7, drift: 2, dur: '12s', glow: '3s',   delay: '1.5s' },
  { top: '75%', left: '35%', size: 5, drift: 3, dur: '11s', glow: '2.6s', delay: '3s' },
  { top: '30%', left: '65%', size: 6, drift: 1, dur: '13s', glow: '3.2s', delay: '2s' },
];

export default function CarouselSection() {
  const router = useRouter();
  const { frames, loading } = useFrames();

  const handleFrameClick = (frameId: string) => {
    router.push(`/${frameId}`);
  };

  if (loading) {
    return (
      <section className="relative py-12 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #080e1a 0%, #0a1222 50%, #080e1a 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Frames from the Community</h2>
          <div className="w-8 h-8 border-4 border-white/20 border-t-[#FFB84D] rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  if (frames.length === 0) {
    return (
      <section className="relative py-12 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #080e1a 0%, #0a1222 50%, #080e1a 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Frames from the Community</h2>
          <p className="text-white/40">No frames available yet. Be the first to create one!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-10 px-6 mb-12 overflow-hidden" style={{ background: 'linear-gradient(180deg, #080e1a 0%, #0a1222 50%, #080e1a 100%)' }}>
      {/* Stars */}
      {CAROUSEL_STARS.map((s) => (
        <div
          key={s.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            backgroundColor: '#fff',
            animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Fireflies */}
      {CAROUSEL_FIREFLIES.map((f, i) => (
        <div
          key={`car-fly-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: f.size,
            height: f.size,
            top: f.top,
            left: f.left,
            backgroundColor: '#FFB84D',
            color: '#FFB84D',
            animation: `fireflyDrift${f.drift} ${f.dur} ease-in-out infinite ${f.delay}, fireflyGlow ${f.glow} ease-in-out infinite ${f.delay}`,
            zIndex: 2,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold text-white mb-8 transition-colors duration-300 cursor-default hover:text-[#FFB84D]">Frames from the Community</h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {frames.map((frame) => (
              <CarouselItem 
                key={frame.frameId} 
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5 cursor-pointer"
                onClick={() => handleFrameClick(frame.frameId)}
              >
                <div className="w-48 h-48 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white/5 border border-white/10 mx-auto relative">
                  <Image
                    src={frame.imageUrl}
                    alt={frame.caption || 'Frame'}
                    fill
                    className="object-cover hover:brightness-110 transition-all duration-300"
                    sizes="192px"
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-[#FFB84D] border-[#FFB84D]/30 hover:bg-[#FFB84D] hover:text-[#080e1a] hover:border-[#FFB84D]" />
          <CarouselNext className="text-[#FFB84D] border-[#FFB84D]/30 hover:bg-[#FFB84D] hover:text-[#080e1a] hover:border-[#FFB84D]" />
        </Carousel>
      </div>
    </section>
  );
}
