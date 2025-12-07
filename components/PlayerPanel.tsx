import React from 'react';
import { Player } from '../types';
import { Trash2, UserPlus, GripVertical } from 'lucide-react';

interface PlayerPanelProps {
  players: Player[];
  selectedPlayerId: string | null;
  onUpdatePlayer: (id: string, field: 'name' | 'number', value: string) => void;
  onAddPlayer: () => void;
  onDeletePlayer: (id: string) => void;
  onSelect: (id: string) => void;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({
  players,
  selectedPlayerId,
  onUpdatePlayer,
  onAddPlayer,
  onDeletePlayer,
  onSelect
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col h-full overflow-hidden transition-colors duration-300">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center transition-colors">
        <h2 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          Players <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{players.length}</span>
        </h2>
        <button
          onClick={onAddPlayer}
          disabled={players.length >= 11}
          className="text-xs bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-1 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus size={14} /> Add
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            onClick={() => onSelect(player.id)}
            className={`group flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedPlayerId === player.id
                ? 'bg-lime-50 dark:bg-lime-900/20 border-neon dark:border-neon shadow-sm'
                : 'bg-white dark:bg-gray-900 border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {/* Swatch */}
            <div className="w-1.5 h-8 rounded-full bg-neon shrink-0"></div>
            
            <div className="flex-1 min-w-0 grid grid-cols-4 gap-2">
              <input
                type="text"
                value={player.number}
                onChange={(e) => onUpdatePlayer(player.id, 'number', e.target.value)}
                placeholder="#"
                className="col-span-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-center font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:border-neon transition-colors"
                maxLength={3}
              />
              <input
                type="text"
                value={player.name}
                onChange={(e) => onUpdatePlayer(player.id, 'name', e.target.value)}
                placeholder="Name"
                className="col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-neon transition-colors"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeletePlayer(player.id);
              }}
              className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Remove Player"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        
        {players.length === 0 && (
            <div className="text-center py-8 text-gray-400 dark:text-gray-600 text-sm">
                No players added yet.
            </div>
        )}
      </div>
      
      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 text-xs text-center text-gray-500 dark:text-gray-400 transition-colors">
        Drag players on field to reposition
      </div>
    </div>
  );
};

export default PlayerPanel;