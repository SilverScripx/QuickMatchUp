import React from 'react';
import { Sport } from '../types';

interface FieldVisualsProps {
    sport: Sport;
}

const FieldVisuals: React.FC<FieldVisualsProps> = ({ sport }) => {
    const isCricket = sport === 'cricket';

    return (
        <>
            {/* Ambient Backdrop Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Field Background & Textures (Applied to parent via absolute) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isCricket
                        ? 'radial-gradient(circle at center, #1a4d2e 0%, #0f2e1b 100%)' // Darker, moodier cricket green
                        : 'linear-gradient(to bottom, #14532d 0%, #064e3b 100%)' // Deep Football Green
                }}
            />

            {/* Grass/Surface Texture (Subtle Noise) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] mix-blend-overlay" />

            {/* Pitch Stripes (Football only) */}
            {!isCricket && (
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.2) 50%)', backgroundSize: '10% 100%' }}
                />
            )}

            {/* Dynamic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

            {/* Field Markings */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                {!isCricket ? (
                    // Football Markings
                    <div className="w-full h-full relative m-[2%] w-[96%] h-[96%] border border-white/40">

                        {/* Halfway Line */}
                        <div className="absolute left-1/2 top-0 h-full w-px bg-white/40 transform -translate-x-1/2" />

                        {/* Center Circle */}
                        <div className="absolute top-1/2 left-1/2 w-[15%] aspect-square border border-white/40 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/60 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

                        {/* Penalty Areas */}
                        <div className="absolute top-1/2 left-0 w-[16%] h-[40%] border-r border-y border-white/40 transform -translate-y-1/2 bg-white/[0.02]" />
                        <div className="absolute top-1/2 right-0 w-[16%] h-[40%] border-l border-y border-white/40 transform -translate-y-1/2 bg-white/[0.02]" />

                        {/* Goal Areas (Small) */}
                        <div className="absolute top-1/2 left-0 w-[6%] h-[20%] border-r border-y border-white/40 transform -translate-y-1/2" />
                        <div className="absolute top-1/2 right-0 w-[6%] h-[20%] border-l border-y border-white/40 transform -translate-y-1/2" />

                        {/* Corner Arcs */}
                        <div className="absolute top-0 left-0 w-[2%] aspect-square border-b border-r border-white/40 rounded-br-full" />
                        <div className="absolute top-0 right-0 w-[2%] aspect-square border-b border-l border-white/40 rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-[2%] aspect-square border-t border-r border-white/40 rounded-tr-full" />
                        <div className="absolute bottom-0 right-0 w-[2%] aspect-square border-t border-l border-white/40 rounded-tl-full" />
                    </div>
                ) : (
                    // Cricket Markings
                    <div className="w-full h-full relative flex items-center justify-center">
                        {/* 30 Yard Circle */}
                        <div className="w-[60%] h-[60%] border border-white/30 rounded-full absolute border-dashed" />

                        {/* Pitch */}
                        <div className="w-[12%] h-[32%] bg-[#e3dcd3] absolute rounded-[2px] shadow-lg flex flex-col justify-between py-4 opacity-90">
                            {/* Creases */}
                            <div className="w-full h-px bg-black/20" />
                            <div className="w-full h-px bg-black/20" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default React.memo(FieldVisuals);
