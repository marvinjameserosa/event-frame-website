'use client';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#081210]">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">
        <p className="text-sm text-white/30">
          &copy; {currentYear} FrameIt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
