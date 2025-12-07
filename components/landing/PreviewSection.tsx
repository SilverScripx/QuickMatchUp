import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PreviewSectionProps {
  onStart: () => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ onStart }) => {
  return (
    <section className="py-24 bg-[#0E0E0E] relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Professional tools, <br />
              <span className="text-neon">simplified workflow.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Stop struggling with complex design software. QuickMatch gives you the power of professional lineup graphics in a browser-based tool built for speed.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Smart snap-to-grid system for perfect alignment",
                "Pre-set tactical formations (4-4-2, 4-3-3, etc.)",
                "Customizable jersey numbers and names",
                "Fully responsive on mobile and tablet"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-neon shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onStart}
              className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              Launch Editor
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right: Graphic */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-neon/5 blur-2xl rounded-full"></div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#1A1A1A]">
              {/* Simulated Interface */}
              <div className="flex">
                {/* Simulated Sidebar */}
                <div className="w-16 bg-[#111] border-r border-white/5 flex flex-col items-center py-4 gap-4">
                  <div className="w-8 h-8 rounded bg-neon/20"></div>
                  <div className="w-8 h-8 rounded bg-white/10"></div>
                  <div className="w-8 h-8 rounded bg-white/10"></div>
                </div>
                {/* Simulated Canvas */}
                <div className="flex-1 bg-gray-900 aspect-square md:aspect-[4/3] relative p-4">
                  <div className="w-full h-full border-2 border-white/20 rounded opacity-20"></div>

                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-lg flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neon flex items-center justify-center font-bold text-black">10</div>
                    <div>
                      <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-white/10 rounded"></div>
                    </div>
                    <div className="ml-auto text-neon text-xs font-mono">EDITING</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PreviewSection;