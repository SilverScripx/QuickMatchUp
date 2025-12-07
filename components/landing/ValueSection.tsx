import React from 'react';
import { Users, Share2, Gauge } from 'lucide-react';

const ValueSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0E0E0E] border-t border-white/5 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#0E0E0E]">
        <h2 className="text-3xl font-bold text-white mb-16">Why creators choose QuickMatch</h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 text-neon">
              <Users size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">For Everyone</h3>
            <p className="text-gray-400 text-sm">Perfect for coaches, fantasy players, content creators, and tactical analysts.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 text-neon">
              <Share2 size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Export Ready</h3>
            <p className="text-gray-400 text-sm">Download clean PNGs with transparent or colored backgrounds instantly.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 text-neon">
              <Gauge size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">No bloat. Built with React for instant feedback and smooth performance.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;