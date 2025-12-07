import React, { useRef, useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { TacticsState, ToolType, TacticMarker, TacticDrawing, Sport } from '../../types';
import { Lock } from 'lucide-react';

// --- Sub-components for rendered elements ---

const CanvasMarker: React.FC<{
    marker: TacticMarker;
    activeTool: ToolType;
    onMove: (id: string, x: number, y: number) => void;
    onClick: (e: React.MouseEvent) => void;
}> = ({ marker, activeTool, onMove, onClick }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CANVAS_MARKER',
        item: { id: marker.id, type: 'MARKER' },
        canDrag: activeTool === 'move' && !marker.locked,
        collect: (monitor) => ({ isDragging: monitor.isDragging() })
    }), [marker.id, activeTool, marker.locked]);

    return (
        <div
            ref={(node) => { if (node && activeTool === 'move' && !marker.locked) drag(node); }}
            onClick={onClick}
            className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto ${marker.locked
                ? 'cursor-not-allowed opacity-90'
                : activeTool === 'move'
                    ? 'cursor-move'
                    : activeTool === 'eraser' || activeTool === 'lock'
                        ? 'cursor-pointer hover:opacity-80'
                        : 'cursor-default'
                } ${isDragging ? 'opacity-50' : ''} transition-all duration-200 group`}
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
            <div className={`relative transition-transform ${activeTool === 'move' && !marker.locked ? 'group-hover:scale-110' : ''}`}>

                {/* 3D Player Marker */}
                {marker.type === 'player' && (
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_-4px_4px_rgba(0,0,0,0.2)] border border-white/20 relative overflow-hidden"
                        style={{ backgroundColor: marker.color, color: '#000' }}
                    >
                        {/* Gloss Highlight */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

                        {/* Content */}
                        <span className="relative z-10 font-[800] tracking-tight text-current drop-shadow-sm">
                            {marker.number || ''}
                        </span>
                    </div>
                )}

                {/* 3D Ball */}
                {marker.type === 'ball' && (
                    <div className="w-5 h-5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)] relative">
                        <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white blur-[1px]"></div>
                    </div>
                )}

                {/* 3D Cone */}
                {marker.type === 'cone' && (
                    <div className="drop-shadow-lg filter">
                        <div
                            className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] relative"
                            style={{ borderBottomColor: marker.color }}
                        >
                            <div className="absolute -left-[12px] top-[24px] w-[24px] h-[6px] rounded-full bg-black/30 blur-sm"></div>
                        </div>
                    </div>
                )}

                {/* Locked Indicator */}
                {marker.locked && (
                    <div className="absolute -top-2 -right-2 bg-black/90 text-white rounded-full p-0.5 border border-white/20 z-20 shadow-lg">
                        <Lock size={8} strokeWidth={3} />
                    </div>
                )}
            </div>

            {/* Label below */}
            {marker.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5">
                    <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-bold text-white shadow-lg whitespace-nowrap">
                        {marker.label}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Canvas ---

interface TacticsCanvasProps {
    state: TacticsState;
    activeTool: ToolType;
    activeColor: string;
    sport: Sport;
    onAddMarker: (type: any, x: number, y: number, meta?: any) => void;
    onMoveMarker: (id: string, x: number, y: number) => void;
    onAddDrawing: (d: TacticDrawing) => void;
    onUpdateDrawing: (id: string, updates: Partial<TacticDrawing>) => void;
    onRemoveElement: (id: string) => void;
    onToggleLock: (id: string) => void;
    canvasRef: React.RefObject<HTMLDivElement>;
}

const TacticsCanvas: React.FC<TacticsCanvasProps> = ({
    state,
    activeTool,
    activeColor,
    sport,
    onAddMarker,
    onMoveMarker,
    onAddDrawing,
    onUpdateDrawing,
    onRemoveElement,
    onToggleLock,
    canvasRef
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentDrawing, setCurrentDrawing] = useState<Partial<TacticDrawing> | null>(null);

    // Drop Logic
    const [, drop] = useDrop(() => ({
        accept: ['TACTIC_ITEM', 'CANVAS_MARKER'],
        drop: (item: any, monitor) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            const x = ((clientOffset.x - rect.left) / rect.width) * 100;
            const y = ((clientOffset.y - rect.top) / rect.height) * 100;

            if (item.type === 'CANVAS_MARKER') {
                onMoveMarker(item.id, x, y);
            } else {
                onAddMarker(item.type, x, y, { number: item.number, label: item.label });
            }
        },
        canDrop: () => activeTool === 'move'
    }), [activeTool, onAddMarker, onMoveMarker]);

    // Drawing Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        if (activeTool === 'move' || activeTool === 'eraser' || activeTool === 'lock') return;
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setIsDrawing(true);
        setCurrentDrawing({
            id: `temp-${Date.now()}`,
            type: activeTool as any,
            startX: x, startY: y,
            endX: x, endY: y,
            color: activeColor,
            locked: false
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing || !currentDrawing || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setCurrentDrawing(prev => ({ ...prev, endX: x, endY: y }));
    };

    const handleMouseUp = () => {
        if (isDrawing && currentDrawing) {
            onAddDrawing({
                id: `d-${Date.now()}`,
                type: currentDrawing.type as any,
                startX: currentDrawing.startX!,
                startY: currentDrawing.startY!,
                endX: currentDrawing.endX!,
                endY: currentDrawing.endY!,
                color: currentDrawing.color!,
                locked: false
            });
            setIsDrawing(false);
            setCurrentDrawing(null);
        }
    };

    const handleElementClick = (e: React.MouseEvent, id: string) => {
        if (activeTool === 'eraser') {
            e.stopPropagation();
            onRemoveElement(id);
        } else if (activeTool === 'lock') {
            e.stopPropagation();
            onToggleLock(id);
        }
    };

    const setRefs = (node: HTMLDivElement) => {
        containerRef.current = node;
        drop(node);
    };

    const getElementClass = (locked: boolean) => {
        const base = "pointer-events-auto transition-all duration-200";
        if (activeTool === 'eraser') return `${base} cursor-pointer hover:opacity-50`;
        if (activeTool === 'lock') return `${base} cursor-pointer hover:opacity-80`;
        if (locked) return `${base} cursor-not-allowed opacity-60 grayscale`;
        return `${base} hover:brightness-125`;
    };

    // Render Helpers
    const renderArrow = (d: TacticDrawing | Partial<TacticDrawing>, isPreview = false) => {
        if (d.startX === undefined || d.endX === undefined) return null;
        const locked = !isPreview && (d as TacticDrawing).locked;

        return (
            <g key={d.id} onClick={(e) => !isPreview && handleElementClick(e as any, d.id!)} className={!isPreview ? getElementClass(!!locked) : ''}>
                <defs>
                    <marker id={`arrowhead-${d.id}`} markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                        <path d="M0,0 L4,2 L0,4 L1,2 Z" fill={d.color} />
                    </marker>
                    {/* Neon Glo Filter */}
                    <filter id={`neon-${d.id}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Glow Layer */}
                <line
                    x1={`${d.startX}%`} y1={`${d.startY}%`}
                    x2={`${d.endX}%`} y2={`${d.endY}%`}
                    stroke={d.color}
                    strokeWidth={locked ? "1.5" : "1"}
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                    filter={`url(#neon-${d.id})`}
                    vectorEffect="non-scaling-stroke"
                />

                {/* Main Line */}
                <line
                    x1={`${d.startX}%`} y1={`${d.startY}%`}
                    x2={`${d.endX}%`} y2={`${d.endY}%`}
                    stroke={d.color}
                    strokeWidth={locked ? "1.5" : "1"}
                    strokeOpacity={locked ? 0.6 : 1}
                    markerEnd={`url(#arrowhead-${d.id})`}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </g>
        );
    };

    const renderLine = (d: TacticDrawing | Partial<TacticDrawing>, isPreview = false) => {
        const locked = !isPreview && (d as TacticDrawing).locked;
        return (
            <g key={d.id} onClick={(e) => !isPreview && handleElementClick(e as any, d.id!)} className={!isPreview ? getElementClass(!!locked) : ''}>
                <line
                    x1={`${d.startX}%`} y1={`${d.startY}%`}
                    x2={`${d.endX}%`} y2={`${d.endY}%`}
                    stroke={d.color}
                    strokeWidth={locked ? "1.5" : "1"}
                    strokeOpacity={locked ? 0.6 : 1}
                    strokeDasharray="3 2"
                    strokeLinecap="round"
                    filter={`drop-shadow(0 0 2px ${d.color})`}
                />
            </g>
        );
    };

    const renderZone = (d: TacticDrawing | Partial<TacticDrawing>, isPreview = false) => {
        if (d.startX === undefined || d.endX === undefined) return null;
        const cx = (d.startX + d.endX) / 2;
        const cy = (d.startY + d.endY) / 2;
        const rx = Math.abs(d.startX - d.endX) / 2;
        const ry = Math.abs(d.startY - d.endY) / 2;
        const locked = !isPreview && (d as TacticDrawing).locked;

        return (
            <g key={d.id}>
                <defs>
                    <radialGradient id={`zone-grad-${d.id}`}>
                        <stop offset="0%" stopColor={d.color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={d.color} stopOpacity="0.05" />
                    </radialGradient>
                </defs>
                <ellipse
                    onClick={(e) => !isPreview && handleElementClick(e as any, d.id!)}
                    cx={`${cx}%`} cy={`${cy}%`}
                    rx={`${rx}%`} ry={`${ry}%`}
                    fill={`url(#zone-grad-${d.id})`}
                    stroke={d.color}
                    strokeWidth={locked ? "1" : "0.5"}
                    strokeDasharray={locked ? "4 2" : "none"}
                    className={!isPreview ? getElementClass(!!locked) : ''}
                />

                {/* Resize Handle Visuals (Decorative) */}
                {!locked && (
                    <>
                        <circle cx={`${cx + rx}%`} cy={`${cy}%`} r="1.5" fill="white" fillOpacity="0.5" />
                        <circle cx={`${cx - rx}%`} cy={`${cy}%`} r="1.5" fill="white" fillOpacity="0.5" />
                        <circle cx={`${cx}%`} cy={`${cy + ry}%`} r="1.5" fill="white" fillOpacity="0.5" />
                        <circle cx={`${cx}%`} cy={`${cy - ry}%`} r="1.5" fill="white" fillOpacity="0.5" />
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="flex-1 h-full relative bg-[#0D0D0D] flex items-center justify-center p-8 overflow-hidden select-none">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black pointer-events-none" />

            <div
                ref={canvasRef}
                className={`relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${sport === 'cricket' ? 'aspect-square rounded-full w-[80vh]' : 'aspect-[16/9] rounded-xl w-full max-w-[1200px]'
                    }`}
            >
                {/* Pro Turf Texture & Color */}
                <div className="absolute inset-0 bg-[#1e2922] bg-gradient-to-br from-[#1e2922] to-[#141b16]" />

                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '5% 5%'
                    }}
                />

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

                {/* Field Lines (High Contrast) */}
                <div className="absolute inset-0 pointer-events-none opacity-80 mix-blend-overlay">
                    {sport === 'football' ? (
                        <div className="w-full h-full relative border-2 border-white/40">
                            {/* Center Line */}
                            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/40 -translate-x-1/2"></div>
                            {/* Center Circle */}
                            <div className="absolute top-1/2 left-1/2 w-[15%] aspect-square border-2 border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                            {/* Center Dot */}
                            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/60 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                            {/* Goal Areas */}
                            <div className="absolute top-1/2 left-0 w-[16%] h-[40%] border-r-2 border-y-2 border-white/40 -translate-y-1/2"></div>
                            <div className="absolute top-1/2 left-0 w-[6%] h-[20%] border-r-2 border-y-2 border-white/40 -translate-y-1/2 bg-white/5"></div>

                            <div className="absolute top-1/2 right-0 w-[16%] h-[40%] border-l-2 border-y-2 border-white/40 -translate-y-1/2"></div>
                            <div className="absolute top-1/2 right-0 w-[6%] h-[20%] border-l-2 border-y-2 border-white/40 -translate-y-1/2 bg-white/5"></div>

                            {/* Corner Arcs */}
                            <div className="absolute top-0 left-0 w-[2%] aspect-square border-b-2 border-r-2 border-white/40 rounded-br-full" />
                            <div className="absolute bottom-0 left-0 w-[2%] aspect-square border-t-2 border-r-2 border-white/40 rounded-tr-full" />
                            <div className="absolute top-0 right-0 w-[2%] aspect-square border-b-2 border-l-2 border-white/40 rounded-bl-full" />
                            <div className="absolute bottom-0 right-0 w-[2%] aspect-square border-t-2 border-l-2 border-white/40 rounded-tl-full" />
                        </div>
                    ) : (
                        <div className="w-full h-full relative">
                            {/* Inner 30-yard Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] border-2 border-white/30 rounded-full border-dashed"></div>

                            {/* Pitch */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12%] h-[32%] bg-[#e3d8c8] border border-[#d6c4b0] shadow-md flex flex-col justify-between py-[2%]">
                                {/* Wicket Area Top */}
                                <div className="w-full h-px bg-white/50 relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[20%] h-1 bg-black/20 -mt-0.5 rounded-full"></div>
                                </div>
                                {/* Wicket Area Bottom */}
                                <div className="w-full h-px bg-white/50 relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[20%] h-1 bg-black/20 -mt-0.5 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Interaction Layer */}
                <div
                    ref={setRefs}
                    className="absolute inset-0 z-10"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* SVG Layer for Drawings */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        {state.drawings.map(d => {
                            if (d.type === 'arrow') return renderArrow(d);
                            if (d.type === 'line') return renderLine(d);
                            if (d.type === 'zone') return renderZone(d);
                            return null;
                        })}
                        {isDrawing && currentDrawing && (
                            <>
                                {currentDrawing.type === 'arrow' && renderArrow(currentDrawing, true)}
                                {currentDrawing.type === 'line' && renderLine(currentDrawing, true)}
                                {currentDrawing.type === 'zone' && renderZone(currentDrawing, true)}
                            </>
                        )}
                    </svg>

                    {/* HTML Layer for Markers */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {state.markers.map(m => (
                            <CanvasMarker
                                key={m.id}
                                marker={m}
                                activeTool={activeTool}
                                onMove={onMoveMarker}
                                onClick={(e) => handleElementClick(e, m.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TacticsCanvas;
