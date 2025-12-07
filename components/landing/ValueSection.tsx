import React from 'react';
import { Zap, Palette, Unlock } from 'lucide-react';

const ValueSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0E0E0E] w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">Why QuickMatch?</h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* SPEED */}
          <div className="group p-8 rounded-3xl bg-surface-elevated border border-white/5 hover:bg-surface-elevated/80 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:border-neon/30">
              <Zap size={32} className="text-neon" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">SPEED</h3>
            <p className="text-gray-400 leading-relaxed">Create graphics in seconds with drag-drop simplicity.</p>
          </div>

          {/* CREATIVITY */}
          <div className="group p-8 rounded-3xl bg-surface-elevated border border-white/5 hover:bg-surface-elevated/80 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:border-neon/30">
              <Palette size={32} className="text-neon" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">CREATIVITY</h3>
            <p className="text-gray-400 leading-relaxed">Tools designed for creators, analysts, clubs, and content pages.</p>
          </div>

          {/* FREEDOM */}
          <div className="group p-8 rounded-3xl bg-surface-elevated border border-white/5 hover:bg-surface-elevated/80 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:border-neon/30">
              <Unlock size={32} className="text-neon" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">FREEDOM</h3>
            <p className="text-gray-400 leading-relaxed">No paywalls, no subscriptions, no clutter — just pure tools.</p>
          </div>
        </div>

        {/* Neon Dividers */}
        <div className="flex justify-center mt-12 gap-2 opacity-50">
          <div className="w-16 h-1 rounded-full bg-neon"></div>
          <div className="w-4 h-1 rounded-full bg-gray-700"></div>
          <div className="w-4 h-1 rounded-full bg-gray-700"></div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;