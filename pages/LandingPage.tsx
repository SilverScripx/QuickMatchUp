import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import FeatureStrip from '../components/landing/FeatureStrip';
import PreviewSection from '../components/landing/PreviewSection';
import TemplateTeaser from '../components/landing/TemplateTeaser';
import ValueSection from '../components/landing/ValueSection';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white selection:bg-neon selection:text-black font-sans flex flex-col overflow-x-hidden">
      <Hero onStart={handleStart} />
      <FeatureStrip />
      <PreviewSection onStart={handleStart} />
      <ValueSection />
      <Footer />
    </div>
  );
};

export default LandingPage;