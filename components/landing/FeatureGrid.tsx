import React from 'react';
import { Layers, Layout, BarChart2, GitMerge, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureGrid: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: "Lineup Builder",
            desc: "Design beautiful lineups, customize player colors, drag and drop positions, and export in HD.",
            icon: <Layers size={32} className="text-neon" />,
            path: "/editor",
            color: "border-neon/50"
        },
        {
            title: "Tactics Board",
            desc: "Draw arrows, highlight zones, move markers, and create professional match analysis boards.",
            icon: <Layout size={32} className="text-neon" />,
            path: "/tactics",
            color: "border-neon/50"
        },
        {
            title: "Stats Card Generator",
            desc: "Build player cards, match stats visuals, comparison sheets, and season summaries.",
            icon: <BarChart2 size={32} className="text-neon" />,
            path: "/stats",
            color: "border-neon/50"
        },
        {
            title: "Bracket Builder",
            desc: "Create tournament knockout brackets for 4–32 teams with automatic score progression.",
            icon: <GitMerge size={32} className="text-neon" />,
            path: "/brackets",
            color: "border-neon/50"
        }
    ];

    return (
        <section id="features" className="py-24 bg-[#0E0E0E] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful Tools for Creators</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to create professional sports graphics in one place.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group relative p-8 rounded-3xl bg-surface-elevated border border-white/5 hover:border-neon/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(10,255,108,0.1)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                {feature.icon}
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 group-hover:border-neon/30 transition-colors">
                                    {feature.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed h-12">{feature.desc}</p>

                                <button
                                    onClick={() => navigate(feature.path)}
                                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-neon transition-colors"
                                >
                                    Open Tool
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
