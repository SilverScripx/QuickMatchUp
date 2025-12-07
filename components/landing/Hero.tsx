import React from 'react';
import { ArrowRight, Layers, Layout, BarChart2, GitMerge } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-neon/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.1] animate-fade-in-up">
          QuickMatch: Your All-In-One <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">
            Sports Graphics Studio
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Create lineups, tactics boards, stats cards, and tournament brackets in minutes — fast, free, and built for creators.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onStart}
            className="group px-8 py-4 bg-neon hover:bg-neon-hover text-black font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow flex items-center justify-center gap-2 min-w-[180px]"
          >
            Start Creating
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={scrollToFeatures}
            className="group px-8 py-4 bg-surface-elevated/60 backdrop-blur-md border border-white/10 text-white font-semibold text-lg rounded-2xl hover:bg-surface-hover hover:border-white/20 transition-all duration-300 min-w-[180px]"
          >
            Explore Tools
          </button>
        </div>

        {/* Visual Preview */}
        <div className="mt-20 relative mx-auto max-w-5xl transform hover:scale-[1.01] transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -inset-1 bg-gradient-to-b from-neon/20 to-transparent rounded-3xl blur-xl opacity-40" />

          <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl bg-[#121212] aspect-[16/9] flex flex-col">
            {/* Mock Editor UI */}
            <div className="h-10 border-b border-white/[0.06] flex items-center px-4 gap-3 bg-[#1A1A1A]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="ml-4 h-5 w-48 bg-white/[0.04] rounded-md" />
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Mock */}
              <div className="w-64 border-r border-white/[0.06] bg-[#151515] p-4 hidden md:flex flex-col gap-3">
                <div className="h-8 bg-white/[0.04] rounded w-full" />
                <div className="h-8 bg-white/[0.04] rounded w-3/4" />
                <div className="mt-4 flex gap-2">
                  <div className="h-12 w-12 bg-white/[0.04] rounded-full" />
                  <div className="h-12 w-12 bg-white/[0.04] rounded-full" />
                  <div className="h-12 w-12 bg-white/[0.04] rounded-full" />
                </div>
              </div>

              {/* Canvas Mock */}
              <div className="flex-1 bg-[#0E0E0E] relative p-8 flex items-center justify-center">
                <div className="w-[80%] aspect-[4/3] bg-emerald-900/20 border border-white/10 rounded-lg relative overflow-hidden">
                  {/* Pitch markings */}
                  <div className="absolute inset-4 border border-white/20 rounded opacity-30" />
                  <div className="absolute top-1/2 w-full h-px bg-white/20 opacity-30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/20 rounded-full opacity-30" />

                  {/* Player dots */}
                  <div className="absolute top-[80%] left-[50%] -translate-x-1/2 w-8 h-8 bg-neon rounded-full border-2 border-black shadow-lg" />
                  <div className="absolute top-[60%] left-[20%] w-8 h-8 bg-white rounded-full border-2 border-black shadow-lg" />
                  <div className="absolute top-[60%] right-[20%] w-8 h-8 bg-white rounded-full border-2 border-black shadow-lg" />
                  <div className="absolute top-[40%] left-[35%] w-8 h-8 bg-white rounded-full border-2 border-black shadow-lg" />
                  <div className="absolute top-[40%] right-[35%] w-8 h-8 bg-white rounded-full border-2 border-black shadow-lg" />
                </div>
              </div>

              {/* Right Panel Mock */}
              <div className="w-64 border-l border-white/[0.06] bg-[#151515] p-4 hidden lg:flex flex-col gap-3">
                <div className="h-32 bg-white/[0.04] rounded w-full" />
                <div className="h-10 bg-neon rounded w-full mt-auto opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;