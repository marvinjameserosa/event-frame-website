"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/sections/landing/Navbar';
import LandingFooter from '@/components/sections/landing/LandingFooter';
import AboutSection from '@/components/sections/landing/AboutSection';
import FeaturesSection from '@/components/sections/landing/FeaturesSection';
import HeroSection from '@/components/sections/landing/HeroSection';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <HeroSection onGetStarted={handleGetStarted} />
      <AboutSection />
      <FeaturesSection />
      <LandingFooter />
    </div>
  );
}
