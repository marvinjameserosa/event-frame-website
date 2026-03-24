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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (target: string) => {
    if (target === '/') {
      router.push('/');
      return;
    }
    if (pathname === '/') {
      const el = document.getElementById(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${target}`);
    }
  };

  return (
    <header
      className="w-full text-white fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(8, 14, 26, 0.8)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'background-color 0.6s ease, backdrop-filter 0.6s ease, border-bottom 0.6s ease, box-shadow 0.6s ease, opacity 0.5s ease, transform 0.5s ease',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div
          className="text-xl font-bold cursor-pointer transition-all duration-300 text-white flex items-center gap-2 hover:scale-105 group"
          onClick={() => handleNav('/')}
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
              style={{ backgroundColor: '#FFB84D' }}
            />
          </div>
          <span className="tracking-tight">FrameIt</span>
        </div>

        <nav className="flex items-center gap-1">
          {[
            { label: 'Home', target: '/' },
            { label: 'Story', target: 'about-us' },
            { label: 'Features', target: 'features' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.target)}
              className="relative px-4 py-2 text-sm font-medium cursor-pointer text-white/60 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/[0.04] group"
            >
              {item.label}
              <span
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-px transition-all duration-300 rounded-full"
                style={{ backgroundColor: '#FFB84D' }}
              />
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
