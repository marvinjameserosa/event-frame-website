"use client";

import { useRouter } from 'next/navigation';
import Header from '@/components/sections/landing/Navbar';
import LandingFooter from '@/components/sections/landing/LandingFooter';
import AboutSection from '@/components/sections/landing/AboutSection';
import FeaturesSection from '@/components/sections/landing/FeaturesSection';
import HeroSection from '@/components/sections/landing/HeroSection';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function LandingPage() {
  const router = useRouter();
  const primaryAmber = '#D4952B';
  const accentOrange = '#E87D3E';

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0806] relative">
      <AnimatedBackground />
      <Header />
      <HeroSection primaryBlue={primaryAmber} accentGreen={accentOrange} onGetStarted={handleGetStarted} />
      <AboutSection primaryBlue={primaryAmber} accentGreen={accentOrange} />
      <FeaturesSection primaryBlue={primaryAmber} accentGreen={accentOrange} />
      <LandingFooter />
    </div>
  );
}
