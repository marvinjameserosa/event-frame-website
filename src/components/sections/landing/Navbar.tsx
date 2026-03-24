'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div
          className="text-xl font-bold cursor-pointer transition-all duration-300 text-white flex items-center gap-2 hover:scale-105"
          onClick={handleHomeClick}
        >
          <Image
            src="/logo1.png"
            alt="FrameIt Logo"
            width={35}
            height={35}
            className="object-contain"
          />
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
              className="relative px-4 py-2 text-sm font-medium cursor-pointer text-white/80 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
