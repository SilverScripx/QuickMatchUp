import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import IntroSection from '../components/landing/IntroSection';
import FeatureGrid from '../components/landing/FeatureGrid';
import PreviewSection from '../components/landing/PreviewSection';
import ValueSection from '../components/landing/ValueSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white selection:bg-neon selection:text-black font-sans flex flex-col overflow-x-hidden">
      <Hero onStart={handleStart} />
      <IntroSection />
      <FeatureGrid />
      <PreviewSection onStart={handleStart} />
      <ValueSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;