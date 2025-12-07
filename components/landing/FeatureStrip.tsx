import React from 'react';
import { MousePointer2, Dribbble, Download, Zap } from 'lucide-react';

const FeatureStrip: React.FC = () => {
  const features = [
    {
      icon: <MousePointer2 className="text-neon" size={24} />,
      title: "Drag & Drop",
      desc: "Intuitive interface to position players exactly where you want them."
    },
    {
      icon: <Dribbble className="text-neon" size={24} />,
      title: "Multi-Sport",
      desc: "Dedicated modes for Football and Cricket with auto-formations."
    },
    {
      icon: <Download className="text-neon" size={24} />,
      title: "Instant Export",
      desc: "Generate high-quality PNGs ready for social media in one click."
    },
    {
      icon: <Zap className="text-neon" size={24} />,
      title: "Free Forever",
      desc: "Core features are free. No subscriptions, no hidden fees."
    }
  ];

  return (
    <section className="bg-[#111] py-16 border-y border-white/5 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-black/50 flex items-center justify-center mb-4 border border-white/5 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;