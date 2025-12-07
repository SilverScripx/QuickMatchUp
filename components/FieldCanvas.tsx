import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Sport, Player } from '../types';
import PlayerMarker from './PlayerMarker';
import FieldVisuals from './FieldVisuals';

interface FieldCanvasProps {
  sport: Sport;
  players: Player[];
  selectedPlayerId: string | null;
  onPlayerSelect: (id: string) => void;
  onPlayerMove: (id: string, x: number, y: number) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  snapToGrid: boolean;
  showNames: boolean;
}

const FieldCanvas: React.FC<FieldCanvasProps> = ({
  sport,
  players,
  selectedPlayerId,
  onPlayerSelect,
  onPlayerMove,
  canvasRef,
  snapToGrid,
  showNames
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: 'PLAYER',
    drop: (item: { id: string }, monitor) => {
      if (!containerRef.current) return;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const rect = containerRef.current.getBoundingClientRect();

      let x = ((clientOffset.x - rect.left) / rect.width) * 100;
      let y = ((clientOffset.y - rect.top) / rect.height) * 100;

      x = Math.max(0, Math.min(100, x));
      y = Math.max(0, Math.min(100, y));

      if (snapToGrid) {
        x = Math.round(x / 5) * 5;
        y = Math.round(y / 5) * 5;
      } else if (sport === 'football') {
        if (x > 49 && x < 51) x = 50;
      }

      onPlayerMove(item.id, x, y);
    },
  }), [snapToGrid, sport, onPlayerMove]);

  const setRefs = (element: HTMLDivElement) => {
    containerRef.current = element;
    drop(element);
  };

  const isCricket = sport === 'cricket';

  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden p-6 md:p-10 transition-colors duration-300">

      {/* Exportable Area Wrapper */}
      <div
        ref={canvasRef}
        className={`relative w-full shadow-2xl select-none overflow-hidden transition-all duration-500 ease-out custom-field-shadow ${isCricket
          ? 'aspect-square max-w-[650px] rounded-full border-4 border-white/5'
          : 'aspect-[16/9] max-w-[950px] rounded-xl border border-white/5'
          }`}
      >
        <FieldVisuals sport={sport} />

        {/* Interaction Layer */}
        <div
          ref={setRefs}
          className="absolute inset-0 z-10"
        >
          {/* Grid Toggle Visualization (Tech Style) */}
          {snapToGrid && (
            <div
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                backgroundSize: '4% 7%' // Dot grid
              }}
            />
          )}

          {players.map((player) => (
            <PlayerMarker
              key={player.id}
              player={player}
              isSelected={selectedPlayerId === player.id}
              onSelect={onPlayerSelect}
              showName={showNames}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FieldCanvas);