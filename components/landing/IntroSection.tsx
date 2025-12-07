import React from 'react';
import { Layers, Layout, BarChart2, GitMerge } from 'lucide-react';

const IntroSection: React.FC = () => {
    return (
        <div className="py-20 bg-[#0E0E0E] border-b border-white/[0.05]">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">What is QuickMatch?</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                    QuickMatch is a free sports graphics toolkit for football, cricket, and esports creators.
                    No login. No subscription. Just fast tools that help creators produce high-quality visuals instantly.
                </p>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/10 flex items-center justify-center text-neon">
                            <Layers size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Lineup Builder</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/10 flex items-center justify-center text-neon">
                            <Layout size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Tactics Board</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/10 flex items-center justify-center text-neon">
                            <BarChart2 size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Stats Cards</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/10 flex items-center justify-center text-neon">
                            <GitMerge size={24} />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Bracket Builder</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
