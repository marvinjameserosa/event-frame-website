'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
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
      className="w-full text-white sticky top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div
          className="text-xl font-bold cursor-pointer transition-all duration-300 text-white flex items-center gap-2 hover:scale-105 group"
          onClick={handleHomeClick}
        >
          <div className="relative">
            <Image
              src="/logo1.png"
              alt="FrameIt Logo"
              width={35}
              height={35}
              className="object-contain transition-transform duration-500 group-hover:rotate-12"
            />
            <div
              className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
              style={{ backgroundColor: '#1ED9C3' }}
            />
          </div>
          <span className="tracking-tight">FrameIt</span>
        </div>

        <nav className="flex items-center gap-1">
          {[
            { label: 'Home', onClick: handleHomeClick },
            { label: 'About', onClick: handleAboutClick },
            { label: 'Features', onClick: handleFeaturesClick },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="relative px-4 py-2 text-sm font-medium cursor-pointer text-white/70 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 group"
            >
              {item.label}
              <span
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-px transition-all duration-300 rounded-full"
                style={{ backgroundColor: '#1ED9C3' }}
              />
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
