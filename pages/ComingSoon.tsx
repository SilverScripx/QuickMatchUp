import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, Bell } from 'lucide-react';

const ComingSoon: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-neon/10 blur-[120px] rounded-full opacity-40" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full opacity-30" />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 p-8 max-w-2xl w-full text-center">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-0 left-8 md:left-0 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated/80 backdrop-blur-md border border-white/10 text-neon text-xs font-bold uppercase tracking-wider mb-8 shadow-lg animate-fade-in-up">
                    <Clock size={14} className="animate-pulse" />
                    <span>In Development</span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Templates <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-emerald-400 to-teal-400">
                        Coming Soon
                    </span>
                </h1>

                <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    We are crafting a library of premium, broadcast-quality templates for your lineups. Stay tuned for something distinctive.
                </p>

                {/* Notify Form */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                            <Bell size={18} />
                        </div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-surface-elevated/60 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <button className="px-6 py-3.5 bg-neon hover:bg-neon-hover text-black font-bold rounded-xl text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <Sparkles size={16} />
                        Notify Me
                    </button>
                </div>

                <p className="mt-6 text-xs text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    * No spam. Only updates about new features.
                </p>
            </div>
        </div>
    );
};

export default ComingSoon;
