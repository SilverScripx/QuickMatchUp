import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-32 bg-[#0E0E0E] relative overflow-hidden flex flex-col items-center text-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 px-4">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Start Creating Now</h2>
                <p className="text-xl text-gray-400 mb-12">Pick a tool and begin — no setup required.</p>

                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => navigate('/editor')}
                        className="px-8 py-4 bg-neon text-black font-bold text-lg rounded-xl hover:bg-neon-hover transition-all hover:scale-105 flex items-center gap-2"
                    >
                        Open Lineup Builder
                        <ArrowRight size={20} />
                    </button>

                    <button
                        onClick={() => navigate('/tactics')}
                        className="px-8 py-4 bg-surface-elevated border border-white/10 text-white font-bold text-lg rounded-xl hover:bg-surface-hover hover:border-white/20 transition-all flex items-center gap-2"
                    >
                        Open Tactics Board
                    </button>

                    <button
                        onClick={() => navigate('/stats')}
                        className="px-8 py-4 bg-surface-elevated border border-white/10 text-white font-bold text-lg rounded-xl hover:bg-surface-hover hover:border-white/20 transition-all flex items-center gap-2"
                    >
                        Open Stats Cards
                    </button>

                    <button
                        onClick={() => navigate('/brackets')}
                        className="px-8 py-4 bg-surface-elevated border border-white/10 text-white font-bold text-lg rounded-xl hover:bg-surface-hover hover:border-white/20 transition-all flex items-center gap-2"
                    >
                        Open Brackets
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
