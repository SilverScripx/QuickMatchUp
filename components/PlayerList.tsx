import React from 'react';
import { Player } from '../types';

interface PlayerListProps {
    players: Player[];
    selectedPlayerId: string | null;
    onSelect: (id: string) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, selectedPlayerId, onSelect }) => {
    return (
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {players.map(player => (
                <div
                    key={player.id}
                    onClick={() => onSelect(player.id)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer border transition-all duration-200 group ${selectedPlayerId === player.id
                        ? 'bg-[#1a1a1a] border-neon/40 shadow-glow-sm translate-x-1'
                        : 'bg-transparent border-transparent hover:bg-[#111] hover:border-white/5'
                        }`}
                >
                    <div
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-black overflow-hidden shrink-0 transition-transform group-hover:scale-105 ${selectedPlayerId === player.id ? 'border-neon' : 'border-[#333]'}`}
                        style={{ backgroundColor: player.image ? 'black' : player.color || '#fff', color: (player.color === '#ffffff' || player.color === '#fff') ? '#000' : '#fff' }}
                    >
                        {player.image ? (
                            <img src={player.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                            player.number
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold truncate ${selectedPlayerId === player.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                            {player.name}
                        </div>
                        <div className="text-[10px] text-gray-600 font-mono">
                            #{player.number}
                        </div>
                    </div>
                    {selectedPlayerId === player.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-neon shadow-glow-sm" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default React.memo(PlayerList);
