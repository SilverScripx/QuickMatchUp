import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PreviewSectionProps {
  onStart: () => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ onStart }) => {
  return (
    <section className="py-24 bg-[#0E0E0E] relative w-full overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Graphic */}
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-neon/10 blur-3xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-dark-xl bg-[#1A1A1A] transform group-hover:scale-[1.02] transition-transform duration-500">
              {/* Simulated Interface */}
              <div className="flex flex-col h-full bg-[#121212]">
                {/* Header */}
                <div className="h-10 border-b border-white/5 bg-[#181818] flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>

                {/* Content */}
                <div className="p-1 min-h-[300px] flex">
                  {/* Tool Palette */}
                  <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-md bg-white/5 border border-white/5" />)}
                  </div>

                  {/* Canvas */}
                  <div className="flex-1 bg-[#0E0E0E] relative m-2 rounded border border-white/5 flex items-center justify-center overflow-hidden">
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-[0.1]" style={{
                      backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>

                    <div className="w-32 h-32 rounded-full border-2 border-neon opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Built for <span className="text-neon">Speed</span> <br />
              & Simplicity.
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              No more complex software or expensive subscriptions. QuickMatch is designed for social media managers, coaches, and content creators who need professional results, fast.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Free to use",
                "No account needed",
                "Exports HD graphics",
                "Works fast on any device",
                "Built for creators, coaches, and analysts"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-neon" size={14} />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onStart}
              className="px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 hover:translate-x-1"
            >
              Try the Lineup Builder
              <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PreviewSection;