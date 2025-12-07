import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

const TemplateTeaser: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-neon mb-2 text-sm font-bold tracking-wider uppercase">
              <Sparkles size={16} />
              <span>Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Premium Template Packs</h2>
            <p className="text-gray-400 mt-2">Unlock broadcast-quality designs. One-time purchase.</p>
          </div>
          <button
            onClick={() => window.location.hash = '#/templates'}
            className="text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-colors text-sm font-medium"
          >
            View All Templates
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-[#151515] border border-white/5 hover:border-neon/50 transition-colors">
              {/* Mock Content */}
              <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-purple-900/20 to-blue-900/20' :
                  i === 2 ? 'from-orange-900/20 to-red-900/20' :
                    'from-emerald-900/20 to-teal-900/20'
                }`}></div>

              {/* Patterns */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}></div>

              {/* Blurred Overlay */}
              <div className="absolute inset-0 backdrop-blur-[6px] bg-black/40 flex flex-col items-center justify-center p-6 text-center transition-all group-hover:backdrop-blur-[4px]">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4 border border-white/20 shadow-xl">
                  <Lock className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {i === 1 ? 'Premier Style' : i === 2 ? 'Broadcast Pro' : 'Neon Dark'}
                </h3>
                <p className="text-gray-400 text-sm mb-4">Starting at $9</p>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/5">
                  Join Waitlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateTeaser;