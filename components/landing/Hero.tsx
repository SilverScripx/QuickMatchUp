import React from 'react';
import { ArrowRight, Play, Trophy, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-neon/15 blur-[120px] rounded-full opacity-60" />
        {/* Secondary Accent */}
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-emerald-400/10 blur-[120px] rounded-full" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-elevated/60 backdrop-blur-md border border-white/[0.08] text-neon text-xs font-bold tracking-wider mb-8 uppercase animate-fade-in-up shadow-lg">
          <Sparkles size={14} className="animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          v1.0 Now Live
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Create Stunning <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-emerald-400 to-teal-400">
            Lineups in Seconds
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          The fastest drag-and-drop lineup builder for football and cricket creators.
          Professional visuals, zero friction.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={onStart}
            className="group w-full sm:w-auto px-8 py-4 bg-neon hover:bg-neon-hover text-black font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-glow flex items-center justify-center gap-3"
          >
            Start Building
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => window.location.hash = '#/templates'}
            className="group w-full sm:w-auto px-8 py-4 bg-surface-elevated/60 backdrop-blur-md border border-white/10 text-white font-semibold text-lg rounded-2xl hover:bg-surface-hover hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Play size={20} className="text-neon group-hover:scale-110 transition-transform" />
            View Templates
          </button>
        </div>

        {/* Mock Preview Card */}
        <div className="mt-20 relative mx-auto max-w-4xl transform hover:scale-[1.01] transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-b from-neon/20 via-neon/5 to-transparent rounded-3xl blur-xl opacity-60" />

          {/* Card */}
          <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden shadow-dark-xl bg-surface-elevated aspect-[16/9] flex flex-col">
            {/* Mock Header */}
            <div className="h-12 border-b border-white/[0.06] flex items-center px-4 gap-3 bg-surface-deep">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="ml-4 h-6 w-64 bg-white/[0.04] rounded-full" />
            </div>

            {/* Mock Content */}
            <div className="flex-1 p-6 relative flex items-center justify-center bg-surface">
              <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-emerald-950/30 rounded-xl border border-white/[0.05] relative overflow-hidden">
                {/* Mini Field Lines */}
                <div className="absolute inset-4 border-2 border-white/10 rounded opacity-40" />
                <div className="absolute top-1/2 left-4 right-4 h-px bg-white/10 opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white/10 rounded-full opacity-40" />

                {/* Player Nodes */}
                <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-neon border-[3px] border-surface flex items-center justify-center font-bold text-sm shadow-glow">1</div>
                </div>
                <div className="absolute top-[60%] left-[25%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-surface flex items-center justify-center font-bold text-sm shadow-lg">4</div>
                </div>
                <div className="absolute top-[60%] right-[20%] translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-white border-[3px] border-surface flex items-center justify-center font-bold text-sm shadow-lg">3</div>
                </div>

                {/* Floating UI Elements */}
                <div className="absolute top-4 right-4 bg-surface-deep/80 backdrop-blur-md border border-white/[0.08] p-2.5 rounded-xl flex gap-2 shadow-lg">
                  <div className="w-7 h-7 rounded-lg bg-neon/20 border border-neon/30" />
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;