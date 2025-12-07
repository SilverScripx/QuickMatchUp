import React from 'react';
import { Player } from '../types';
import { UserPlus } from 'lucide-react';
import PlayerList from './PlayerList';
import PlayerForm from './PlayerForm';

interface PlayerEditorProps {
  players: Player[];
  selectedPlayerId: string | null;
  onUpdatePlayer: (id: string, field: keyof Player, value: any) => void;
  onAddPlayer: () => void;
  onDeletePlayer: (id: string) => void;
  onSelect: (id: string) => void;
}

const PlayerEditor: React.FC<PlayerEditorProps> = ({
  players,
  selectedPlayerId,
  onUpdatePlayer,
  onAddPlayer,
  onDeletePlayer,
  onSelect
}) => {
  const selectedPlayer = players.find(p => p.id === selectedPlayerId);

  return (
    <div className="flex flex-col h-full transition-colors bg-[#080808] border-l border-[#1a1a1a]">

      {/* Header */}
      <div className="p-5 border-b border-[#1a1a1a] flex justify-between items-center bg-[#0a0a0a]">
        <div>
          <h2 className="font-extrabold text-white text-base uppercase tracking-wider flex items-center gap-2">
            Roster
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Manage Team</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-gray-600 bg-[#151515] px-2 py-1 rounded">{players.length} / 11</span>
          <button
            onClick={onAddPlayer}
            disabled={players.length >= 22}
            className="w-8 h-8 flex items-center justify-center bg-neon hover:bg-neon-hover text-black rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale"
            title="Add Player"
          >
            <UserPlus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Selected Player Editor */}
      <PlayerForm
        selectedPlayer={selectedPlayer}
        onUpdatePlayer={onUpdatePlayer}
        onDeletePlayer={onDeletePlayer}
      />

      {/* Player List */}
      <PlayerList
        players={players}
        selectedPlayerId={selectedPlayerId}
        onSelect={onSelect}
      />

    </div>
  );
};

export default React.memo(PlayerEditor);