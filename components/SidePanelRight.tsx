import React from 'react';
import { Player } from '../types';
import PlayerEditor from './PlayerEditor';

interface SidePanelRightProps {
  players: Player[];
  selectedPlayerId: string | null;
  onUpdatePlayer: (id: string, field: keyof Player, value: any) => void;
  onAddPlayer: () => void;
  onDeletePlayer: (id: string) => void;
  onSelect: (id: string) => void;
}

const SidePanelRight: React.FC<SidePanelRightProps> = (props) => {
  return (
    <div className="h-full bg-[#080808]">
      <PlayerEditor {...props} />
    </div>
  );
};

export default SidePanelRight;
