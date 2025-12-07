
import React, { useRef, useState, useEffect } from 'react';
import { useStatsState } from '../hooks/useStatsState';
import StatsCanvas from '../components/stats/StatsCanvas';
import StatsSidePanelLeft from '../components/stats/StatsSidePanelLeft';
import StatsSidePanelRight from '../components/stats/StatsSidePanelRight';
import { ZoomIn, ZoomOut, Grid3X3, Undo2, Redo2, MonitorPlay } from 'lucide-react';

const StatsEditor: React.FC = () => {
    const {
        currentState,
        selectedId,
        setSelectedId,
        undo,
        redo,
        canUndo,
        canRedo,
        updateElement,
        moveElement,
        addElement,
        deleteElement,
        applyTemplate,
        setBackground,
        setSize,
        updateDataByKey
    } = useStatsState();

    const [scale, setScale] = useState(0.45);
    const [snapToGrid, setSnapToGrid] = useState(true);
    const [glowEffect, setGlowEffect] = useState<'none' | 'neon-blue' | 'neon-green' | 'gold' | 'purple'>('neon-blue');
    const canvasRef = useRef<HTMLDivElement>(null);

    // Auto-scale on load
    useEffect(() => {
        const h = window.innerHeight - 100;
        const w = window.innerWidth - 600; // Approx panels width
        const scaleH = h / (currentState.size === 'landscape' ? 1080 : 1350);
        const scaleW = w / (currentState.size === 'landscape' ? 1920 : 1080);
        setScale(Math.min(scaleH, scaleW, 0.8));
    }, [currentState.size]);

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-[#0a0a0a] text-white selection:bg-neon selection:text-black">

            {/* Main Workspace - Full Width with Floating Panels */}
            <div className="flex-1 relative flex overflow-hidden">

                {/* Floating Left Panel (Design & Assets) */}
                <div className="absolute top-4 left-4 z-40 flex flex-col gap-2 max-h-[90vh]">
                    <div className="bg-[#111]/90 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden w-[320px] transition-all duration-300 max-h-[calc(100vh-100px)] flex flex-col">
                        <StatsSidePanelLeft
                            state={currentState}
                            selectedId={selectedId}
                            onUpdateElement={updateElement}
                            onAddElement={addElement}
                            onDeleteElement={deleteElement}
                            onSetBackground={setBackground}
                            onSetSize={setSize}
                            onApplyTemplate={applyTemplate}
                            canvasRef={canvasRef}
                            glowEffect={glowEffect}
                            onSetGlowEffect={setGlowEffect}
                        />
                    </div>
                </div>

                {/* Canvas Area (Centered) */}
                <div className="flex-1 bg-[#050505] bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_100%)] relative flex items-center justify-center p-8">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                    <StatsCanvas
                        state={currentState}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        onMove={moveElement}
                        onUpdate={updateElement}
                        canvasRef={canvasRef}
                        snapToGrid={snapToGrid}
                        scale={scale}
                        glowEffect={glowEffect}
                    />

                    {/* Bottom Toolbar (Zoom/Undo) */}
                    <div className="absolute bottom-6 z-30 flex items-center gap-2 bg-[#151515]/80 backdrop-blur-md border border-white/10 p-2 rounded-full shadow-2xl">
                        <button onClick={undo} disabled={!canUndo} className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors hover:bg-white/10 rounded-full"><Undo2 size={18} /></button>
                        <button onClick={redo} disabled={!canRedo} className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors hover:bg-white/10 rounded-full"><Redo2 size={18} /></button>
                        <div className="w-px h-6 bg-white/10 mx-1"></div>
                        <button onClick={() => setScale(s => Math.max(0.1, s - 0.1))} className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full"><ZoomOut size={18} /></button>
                        <span className="text-xs font-mono text-white w-12 text-center select-none">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full"><ZoomIn size={18} /></button>
                        <div className="w-px h-6 bg-white/10 mx-1"></div>
                        <button onClick={() => setSnapToGrid(!snapToGrid)} className={`p-2 rounded-full transition-all ${snapToGrid ? 'text-neon bg-neon/10' : 'text-gray-400 hover:text-white'}`}>
                            <Grid3X3 size={18} />
                        </button>
                    </div>
                </div>

                {/* Floating Right Panel (Quick Data) */}
                <div className="absolute top-4 right-4 z-40 bg-[#111]/90 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden w-[280px]">
                    <StatsSidePanelRight
                        state={currentState}
                        selectedId={selectedId}
                        onUpdateData={updateDataByKey}
                        onSelect={setSelectedId}
                    />
                </div>

            </div>

            <style>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default StatsEditor;
