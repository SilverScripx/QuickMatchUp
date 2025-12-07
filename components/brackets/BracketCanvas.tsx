
import React from 'react';
import { BracketTournament, BracketSettings } from '../../types';
import BracketRound from './BracketRound';

interface BracketCanvasProps {
    tournament: BracketTournament;
    selectedMatchId: string | null;
    onMatchSelect: (id: string) => void;
    settings: BracketSettings;
    canvasRef: React.RefObject<HTMLDivElement>;
    zoom: number;
}

const BracketCanvas: React.FC<BracketCanvasProps> = ({
    tournament,
    selectedMatchId,
    onMatchSelect,
    settings,
    canvasRef,
    zoom
}) => {
    // Connector Logic
    // We can render SVG lines layered absolutely behind the rounds.
    // Assuming strict spacing:
    // Round N matches are spaced evenly. 
    // We can't easily calculate exact pixels without measuring refs, 
    // BUT we can use a flexbox/grid trick or just simple SVG paths if we know the height of items.
    // A simpler pure-CSS way for brackets is utilizing :before/:after on match containers.
    // However, for "canvas" export and clean code, let's use a pure React-rendered SVG overlay approach logic.
    // Since we don't have exact pixel positions without layout effects, we will use a "connector" component 
    // placed between columns that assumes flex alignment centers items.

    // Actually, the simplest visually pleasing way without complex math is:
    // Render Round Columns.
    // Between Round i and i+1, render a "Connector Column".
    // In this Connector Column, render SVG paths connecting the slots.

    // Implementation:
    // The layout is simply a flex row of Rounds.
    // But to draw lines, we need to know that Match A and Match B in Round 1 connect to Match C in Round 2.
    // Since flex 'justify-around' distributes space differently based on count, 
    // we need to ensure the parent container height is fixed or grows, and items distribute evenly.

    // Let's rely on `justify-around` in `BracketRound.tsx`.
    // If Round 1 has 8 items, and Round 2 has 4, they will naturally align such that
    // Item 0 and 1 in R1 roughly align with Item 0 in R2.

    // Let's add SVG connectors *absolutely positioned* within the round wrapper.
    // For each match in Round I, we draw a line to its next match target.
    // BUT: We don't know the Y position of the target easily.

    // Alternative: Fixed heights.
    // If every match slot is fixed height H (including margins), then math is easy.
    // Round 0: Items at H/2, 3H/2, 5H/2...  (Gap 0)
    // Round 1: Items at H, 3H, 5H... (Gap H)
    // This is rigid. 

    // Let's stick to the visual component structure: 
    // <Round> <Connectors> <Round> <Connectors> ...

    // ConnectorColumn component:
    // Takes the `matches` of the *previous* round.
    // Renders SVGs.
    // Heights must be passed or assumed.

    // For this version, let's keep it simple: Render rounds. Connectors are implied by layout or added as simple lines if possible.
    // A simple CSS border approach on "connector divs" works best for simple brackets.

    const MATCH_HEIGHT = 82; // Approx px height of card
    const GAP_BASE = 32;     // Base gap

    return (
        <div
            className="relative overflow-auto flex-1 bg-gray-100 dark:bg-[#0c0c0c] flex items-center justify-start p-10 select-none"
            onClick={() => onMatchSelect('')}
        >
            <div
                ref={canvasRef}
                className={`flex flex-row p-10 rounded-xl transition-transform origin-top-left ${settings.theme === 'light' ? 'bg-white' : ''}`}
                style={{
                    transform: `scale(${zoom})`,
                    backgroundColor: settings.theme === 'light' ? '#f3f4f6' : (settings.theme === 'neon' ? '#000' : '#111')
                }}
            >
                {/* Title watermark */}
                <div className="absolute top-4 left-6 text-2xl font-black text-gray-500/20 pointer-events-none uppercase">
                    {tournament.name}
                </div>

                {tournament.rounds.map((round, rIndex) => (
                    <React.Fragment key={round.id}>
                        <BracketRound
                            round={round}
                            teams={tournament.teams}
                            selectedMatchId={selectedMatchId}
                            onMatchSelect={onMatchSelect}
                            settings={settings}
                        />

                        {/* Render Connectors after this round (if not last) */}
                        {rIndex < tournament.rounds.length - 1 && (
                            <div className="w-16 flex flex-col relative" style={{ marginTop: '36px', marginBottom: '32px' }}>
                                {/* 
                                This is tricky without absolute positioning. 
                                We'll render an SVG that spans the full height of this column.
                             */}
                                <ConnectorLayer
                                    prevRoundMatches={round.matches}
                                    nextRoundMatches={tournament.rounds[rIndex + 1].matches}
                                    theme={settings.theme}
                                    style={settings.connectorStyle}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// Internal component to draw lines between two columns of matches
const ConnectorLayer: React.FC<{
    prevRoundMatches: any[],
    nextRoundMatches: any[],
    theme: string,
    style: 'straight' | 'curved'
}> = ({ prevRoundMatches, nextRoundMatches, theme, style }) => {
    // We assume uniform distribution.
    // SVG coordinate system 0 to 100%.

    const isNeon = theme === 'neon';
    const strokeColor = isNeon ? '#0AFF6C' : (theme === 'light' ? '#cbd5e1' : '#444');
    const strokeWidth = isNeon ? 2 : 2;

    return (
        <svg className="w-full h-full overflow-visible">
            {/* Defs for gradients or filters if needed, but simple multiple paths work best for React */}
            {nextRoundMatches.map((m, i) => {
                const nextY = ((2 * i + 1) / (2 * nextRoundMatches.length)) * 100;

                // Sources
                const srcIndexA = i * 2;
                const srcIndexB = i * 2 + 1;

                const srcYA = ((2 * srcIndexA + 1) / (2 * prevRoundMatches.length)) * 100;
                const srcYB = ((2 * srcIndexB + 1) / (2 * prevRoundMatches.length)) * 100;

                const drawPath = (srcY: number, destY: number) => {
                    if (style === 'curved') {
                        // Improved Bezier: Flatten the middle slightly for cleaner inputs
                        return `M 0 ${srcY}% C 50 ${srcY}%, 50 ${destY}%, 100 ${destY}%`;
                    }
                    return `M 0 ${srcY}% L 50 ${srcY}% L 50 ${destY}% L 100 ${destY}%`;
                };

                const pathA = drawPath(srcYA, nextY);
                const pathB = drawPath(srcYB, nextY);

                return (
                    <g key={i}>
                        {/* Glow Effect for Neon (Duplicate path behind with blur/opacity) */}
                        {isNeon && (
                            <>
                                <path d={pathA} fill="none" stroke="#0AFF6C" strokeWidth="6" strokeOpacity="0.2" className="blur-[2px]" />
                                <path d={pathB} fill="none" stroke="#0AFF6C" strokeWidth="6" strokeOpacity="0.2" className="blur-[2px]" />
                            </>
                        )}

                        {/* Main Lines */}
                        <path
                            d={pathA}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                        <path
                            d={pathB}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                    </g>
                )
            })}
        </svg>
    )
}

export default BracketCanvas;
