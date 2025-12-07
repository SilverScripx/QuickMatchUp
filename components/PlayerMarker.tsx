import React, { memo } from 'react';
import { useDrag } from 'react-dnd';
import { Player } from '../types';

interface PlayerMarkerProps {
  player: Player;
  isSelected: boolean;
  onSelect: (id: string) => void;
  showName: boolean;
}

const PlayerMarker: React.FC<PlayerMarkerProps> = ({ player, isSelected, onSelect, showName }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PLAYER',
    item: { id: player.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [player.id]);

  // Determine shape classes - defaulting to slightly rounded square/circle hybrid for "Modern" feel
  // or full circle. Let's go with a sleek Circle for consistency with the request.
  const shapeClass = 'rounded-full';

  // Dynamic Styles
  const markerStyle = React.useMemo(() => {
    const isWhite = player.color?.toLowerCase() === '#ffffff' || player.color?.toLowerCase() === '#fff';
    // If image exists, background is less relevant but used for border
    return {
      backgroundColor: player.image ? '#000' : player.color || '#1a1a1a',
      color: isWhite ? '#000' : '#fff',
      borderColor: player.color || '#fff'
    };
  }, [player.image, player.color]);

  return (
    <div
      ref={(node) => {
        if (node) drag(node);
        return;
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(player.id);
      }}
      className={`absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 touch-none select-none ${isDragging ? 'z-50 cursor-grabbing scale-110 opacity-90' : 'z-10 cursor-grab hover:z-20'
        } transition-all duration-200 ease-out will-change-transform`}
      style={{
        left: `${player.x}%`,
        top: `${player.y}%`,
      }}
    >
      {/* 1. Selection Glow Ring (Animated) */}
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-neon/80 blur-md rounded-full scale-125 animate-pulse-glow" />
          <div className="absolute inset-0 border-2 border-neon rounded-full scale-110 opacity-80" />
        </>
      )}

      {/* 2. Main Marker Body */}
      <div
        className={`relative w-12 h-12 md:w-16 md:h-16 ${shapeClass} flex items-center justify-center overflow-hidden transition-transform duration-200 ${isSelected ? 'scale-110' : 'hover:scale-110'
          } shadow-lg group`}
        style={player.image ? {} : { backgroundColor: markerStyle.backgroundColor }}
      >

        {/* A. Player Image */}
        {player.image ? (
          <div className={`w-full h-full relative ${shapeClass} overflow-hidden border-2`} style={{ borderColor: markerStyle.borderColor }}>
            <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
            {/* Inner gradient for readability if number overlay needed later */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
          </div>
        ) : (
          /* B. Number Only (Jersey Style) */
          <div className={`w-full h-full flex items-center justify-center border-2 border-white/20 ${shapeClass} relative`}>
            {/* Glossy Reflection */}
            <div className="absolute top-0 w-full h-[40%] bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />

            <span className={`text-lg md:text-2xl font-black tracking-tighter z-10`} style={{ color: markerStyle.color }}>
              {player.number}
            </span>
          </div>
        )}

        {/* Hover Highlight (Web only) */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
      </div>

      {/* 3. Name Label (Floating Pill) */}
      {showName && (
        <div
          className={`mt-2 px-2.5 py-0.5 rounded-sm backdrop-blur-md border text-[10px] md:text-xs font-bold tracking-wide shadow-black/50 shadow-md uppercase transition-colors duration-200 max-w-[120px] truncate ${isSelected
              ? 'bg-neon text-black border-neon'
              : 'bg-black/80 text-white border-white/20 group-hover:bg-black/90 group-hover:border-neon/50 group-hover:text-neon'
            }`}
        >
          {player.name}
        </div>
      )}

      {/* 4. Jersey Color Indicator (Small Badge if image exists) */}
      {player.image && (
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full border border-black/50 shadow-sm z-20"
          style={{ backgroundColor: player.color || '#fff' }}
        />
      )}

    </div>
  );
};

export default memo(PlayerMarker);