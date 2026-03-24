'use client';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/[0.04] relative overflow-hidden" style={{ background: '#060b16' }}>
      {/* A couple of subtle fireflies */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 5,
          height: 5,
          top: '30%',
          left: '20%',
          backgroundColor: '#FFB84D',
          color: '#FFB84D',
          animation: 'fireflyDrift1 12s ease-in-out infinite 0s, fireflyGlow 3s ease-in-out infinite 0s',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 4,
          height: 4,
          top: '50%',
          left: '75%',
          backgroundColor: '#FFB84D',
          color: '#FFB84D',
          animation: 'fireflyDrift2 10s ease-in-out infinite 1.5s, fireflyGlow 2.6s ease-in-out infinite 1.5s',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-6 text-center relative z-10">
        <p className="text-sm text-white/30">
          &copy; {currentYear} FrameIt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
