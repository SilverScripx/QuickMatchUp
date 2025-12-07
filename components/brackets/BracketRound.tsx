
import React from 'react';
import { BracketRound as BracketRoundType, BracketTeam, BracketSettings } from '../../types';
import BracketMatch from './BracketMatch';

interface BracketRoundProps {
  round: BracketRoundType;
  teams: BracketTeam[];
  selectedMatchId: string | null;
  onMatchSelect: (id: string) => void;
  settings: BracketSettings;
}

const BracketRound: React.FC<BracketRoundProps> = ({
  round,
  teams,
  selectedMatchId,
  onMatchSelect,
  settings
}) => {
  const isNeon = settings.theme === 'neon';
  const isLight = settings.theme === 'light';

  return (
    <div className="flex flex-col items-center flex-shrink-0 mx-8 relative h-full">
      {/* Round Header */}
      <div className="mb-10 text-center relative z-20">
        <span className={`
            inline-block px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all duration-300
            ${isLight
            ? 'bg-white border border-gray-200 text-gray-700 shadow-sm'
            : isNeon
              ? 'bg-black/40 border border-[#0AFF6C]/30 text-[#0AFF6C] shadow-[0_0_15px_rgba(10,255,108,0.15)]'
              : 'bg-white/5 border border-white/10 text-gray-300'
          }
        `}>
          {round.name}
        </span>
      </div>

      {/* Matches Column */}
      <div className="flex flex-col justify-around flex-grow py-4 gap-6 w-full">
        {round.matches.map(match => (
          <div key={match.id} className="relative z-10 my-2 flex justify-center">
            <BracketMatch
              match={match}
              teams={teams}
              isSelected={selectedMatchId === match.id}
              onSelect={onMatchSelect}
              settings={settings}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BracketRound;
