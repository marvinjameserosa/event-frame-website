'use client';

import { useRouter } from 'next/navigation';

export default function LandingFooter() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div 
            className="text-xl font-bold text-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >
            FrameIt
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <button 
              onClick={() => {
                const aboutSection = document.getElementById('about-us');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Get Started
            </button>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-white/30">
            {currentYear} FrameIt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
