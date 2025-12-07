
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { StatsState } from '../../types';
import StatsElement from './StatsElement';

interface StatsCanvasProps {
    state: StatsState;
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    onMove: (id: string, x: number, y: number) => void;
    onUpdate: (id: string, updates: any) => void; // Added for resize
    canvasRef: React.RefObject<HTMLDivElement>;
    snapToGrid: boolean;
    scale: number;
    glowEffect?: 'none' | 'neon-blue' | 'neon-green' | 'gold' | 'purple';
}

const StatsCanvas: React.FC<StatsCanvasProps> = ({
    state,
    selectedId,
    onSelect,
    onMove,
    onUpdate,
    canvasRef,
    snapToGrid,
    scale,
    glowEffect = 'none'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Determine Dimensions based on size type
    let width = 1080;
    let height = 1350;
    if (state.size === 'landscape') {
        width = 1920;
        height = 1080;
    } else if (state.size === 'square') {
        width = 1080;
        height = 1080;
    }

    const [, drop] = useDrop(() => ({
        accept: 'STATS_ELEMENT',
        drop: (item: { id: string, type: string }, monitor) => {
            if (!containerRef.current) return;

            const delta = monitor.getDifferenceFromInitialOffset();
            if (!delta) return;

            const element = state.elements.find(e => e.id === item.id);
            if (!element) return;

            let newX = element.x + (delta.x / scale);
            let newY = element.y + (delta.y / scale);

            if (snapToGrid) {
                newX = Math.round(newX / 10) * 10;
                newY = Math.round(newY / 10) * 10;
            }

            onMove(item.id, newX, newY);
        }
    }), [state.elements, scale, snapToGrid, onMove]);

    const setRefs = (node: HTMLDivElement) => {
        containerRef.current = node;
        drop(node);
    };

    // Glow Styles
    const getGlowStyle = () => {
        switch (glowEffect) {
            case 'neon-blue': return '0 0 50px rgba(59, 130, 246, 0.5), 0 0 100px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(59, 130, 246, 0.2)';
            case 'neon-green': return '0 0 50px rgba(34, 197, 94, 0.5), 0 0 100px rgba(34, 197, 94, 0.2), inset 0 0 20px rgba(34, 197, 94, 0.2)';
            case 'gold': return '0 0 50px rgba(234, 179, 8, 0.5), 0 0 100px rgba(234, 179, 8, 0.2), inset 0 0 20px rgba(234, 179, 8, 0.2)';
            case 'purple': return '0 0 50px rgba(168, 85, 247, 0.5), 0 0 100px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.2)';
            default: return '0 20px 50px rgba(0,0,0,0.5)';
        }
    };

    const getBorderColor = () => {
        switch (glowEffect) {
            case 'neon-blue': return '#3b82f6';
            case 'neon-green': return '#22c55e';
            case 'gold': return '#eab308';
            case 'purple': return '#a855f7';
            default: return 'transparent';
        }
    };

    return (
        <div
            className="stats-canvas-wrapper"
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
                width: width,
                height: height,
                position: 'relative',
                transition: 'all 0.3s ease-out'
            }}
        >
            <div
                ref={canvasRef}
                className="relative overflow-hidden bg-black transition-all ease-linear"
                style={{
                    width: '100%',
                    height: '100%',
                    boxShadow: getGlowStyle(),
                    border: glowEffect !== 'none' ? `4px solid ${getBorderColor()}` : 'none',
                    borderRadius: '24px', // Modern rounded corners for the card itself
                    background: state.background.type === 'color'
                        ? state.background.value
                        : state.background.type === 'gradient'
                            ? state.background.value
                            : `url(${state.background.value}) center/cover no-repeat`
                }}
                onClick={() => onSelect(null)}
            >
                {/* Internal Safe Area / Frame Guides (Visual Only, Optional) */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-20" style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }}></div>

                {/* Grid */}
                {snapToGrid && (
                    <div className="absolute inset-0 pointer-events-none opacity-10 z-[1]" style={{
                        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}></div>
                )}

                {/* Elements */}
                <div ref={setRefs} className="w-full h-full absolute inset-0 z-[10]">
                    {state.elements.map(el => (
                        <StatsElement
                            key={el.id}
                            element={el}
                            isSelected={selectedId === el.id}
                            onSelect={onSelect}
                            onUpdate={onUpdate}
                            scale={scale}
                        />
                    ))}
                </div>

                {/* Shine/Reflection Overlay */}
                <div className="absolute inset-0 pointer-events-none z-[20] opacity-10 bg-gradient-to-tr from-white/20 via-transparent to-transparent"></div>
            </div>
        </div>
    );
};

export default React.memo(StatsCanvas);
