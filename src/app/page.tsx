"use client";

import { useRouter } from 'next/navigation';
import Header from '@/components/sections/landing/Navbar';
import LandingFooter from '@/components/sections/landing/LandingFooter';
import AboutSection from '@/components/sections/landing/AboutSection';
import FeaturesSection from '@/components/sections/landing/FeaturesSection';
import HeroSection from '@/components/sections/landing/HeroSection';

export default function LandingPage() {
  const router = useRouter();
  const primaryBlue = '#1ED9C3';
  const accentGreen = '#FF8552';

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header />
      <HeroSection primaryBlue={primaryBlue} accentGreen={accentGreen} onGetStarted={handleGetStarted} />
      <AboutSection primaryBlue={primaryBlue} accentGreen={accentGreen} />
      <FeaturesSection primaryBlue={primaryBlue} accentGreen={accentGreen} />
      <LandingFooter />
    </div>
  );
}
