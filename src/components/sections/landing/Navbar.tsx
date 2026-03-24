'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleAboutClick = () => {
    if (pathname === '/') {
      const aboutSection = document.getElementById('about-us');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#about-us');
    }
  };

  const handleFeaturesClick = () => {
    if (pathname === '/') {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#features');
    }
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-16">
        <div
          className="text-xl font-semibold tracking-tight cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
          onClick={handleHomeClick}
        >
          <span className="text-2xl font-bold" style={{ color: '#1ED9C3' }}>FrameIt</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={handleAboutClick}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
          <button
            onClick={handleFeaturesClick}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </button>
          <button
            onClick={handleHomeClick}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </button>
        </nav>

        <button
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: '#1ED9C3', color: '#0a0a0a' }}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
