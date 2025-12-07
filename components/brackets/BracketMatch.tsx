
import React, { memo } from 'react';
import { BracketMatch as BracketMatchType, BracketTeam, BracketSettings } from '../../types';

interface BracketMatchProps {
  match: BracketMatchType;
  teams: BracketTeam[];
  isSelected: boolean;
  onSelect: (id: string) => void;
  settings: BracketSettings;
}

const BracketMatch: React.FC<BracketMatchProps> = ({ match, teams, isSelected, onSelect, settings }) => {
  const teamA = teams.find(t => t.id === match.teamAId);
  const teamB = teams.find(t => t.id === match.teamBId);

  const getTeamClass = (teamId: string | null) => {
    if (!teamId) return 'text-gray-400 font-medium tracking-wide';
    if (match.winnerId === teamId) return 'text-neon font-bold drop-shadow-neon';
    if (match.winnerId && match.winnerId !== teamId) return 'text-gray-500 opacity-60';
    return isNeon ? 'text-white font-semibold' : 'text-gray-900 font-semibold';
  };

  const isNeon = settings.theme === 'neon';
  const isLight = settings.theme === 'light';

  // Helper for Team Logo Placeholder
  const TeamLogo = ({ name, seed }: { name: string, seed?: number }) => (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mr-2 overflow-hidden flex-shrink-0
      ${isLight ? 'bg-gray-200 text-gray-700' : 'bg-white/10 text-white'}
    `}>
      {/* 
         In a real app, we'd check for team.logoUrl here.
         For now, use first letter or seed.
      */}
      {name ? name.charAt(0).toUpperCase() : '?'}
    </div>
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(match.id);
      }}
      className={`
        relative w-72 flex flex-col justify-center rounded-2xl overflow-visible transition-all duration-300 cursor-pointer select-none group
        ${isSelected
          ? 'scale-[1.02] z-20'
          : 'hover:scale-[1.02] hover:-translate-y-0.5 z-10'
        }
      `}
    >
      {/* Card Background Container */}
      <div className={`
        absolute inset-0 rounded-2xl transition-all duration-300
        ${isSelected
          ? (isNeon ? 'bg-[#151515] ring-2 ring-neon shadow-[0_0_20px_rgba(10,255,108,0.3)]' : 'bg-white ring-2 ring-blue-500 shadow-xl')
          : (isNeon ? 'bg-[#1a1a1a] border border-white/5 hover:border-white/20 shadow-lg shadow-black/40' : 'bg-white border border-gray-200 shadow-md hover:shadow-lg')
        }
      `}></div>

      {/* Content */}
      <div className="relative z-10 py-1">
        {/* Team A Row */}
        <div className={`flex justify-between items-center px-4 py-2.5 relative`}>
          {/* Visual connector highlight on hover/select could go here */}
          <div className={`flex items-center flex-1 min-w-0 ${getTeamClass(match.teamAId)}`}>
            {/* Seed Badge */}
            {settings.showSeeds && teamA && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md mr-2 ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/10 text-gray-400'}`}>
                {teamA.seed}
              </span>
            )}
            {/* Logo Placeholder */}
            <TeamLogo name={teamA?.name || ''} />

            <span className="truncate text-sm">{teamA ? teamA.name : 'TBD'}</span>
          </div>

          {/* Score */}
          {match.scoreA !== null && (
            <div className={`
                ml-3 text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                ${match.winnerId === match.teamAId
                ? 'bg-neon/20 text-neon'
                : isLight ? 'bg-gray-100 text-gray-700' : 'bg-black/30 text-gray-500'
              }
              `}>
              {match.scoreA}
            </div>
          )}
        </div>

        <div className={`my-0 mx-4 h-px ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}></div>

        {/* Team B Row */}
        <div className="flex justify-between items-center px-4 py-2.5">
          <div className={`flex items-center flex-1 min-w-0 ${getTeamClass(match.teamBId)}`}>
            {settings.showSeeds && teamB && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md mr-2 ${isLight ? 'bg-gray-100 text-gray-500' : 'bg-white/10 text-gray-400'}`}>
                {teamB.seed}
              </span>
            )}
            <TeamLogo name={teamB?.name || ''} />
            <span className="truncate text-sm">{teamB ? teamB.name : 'TBD'}</span>
          </div>

          {match.scoreB !== null && (
            <div className={`
                ml-3 text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                ${match.winnerId === match.teamBId
                ? 'bg-neon/20 text-neon'
                : isLight ? 'bg-gray-100 text-gray-700' : 'bg-black/30 text-gray-500'
              }
              `}>
              {match.scoreB}
            </div>
          )}
        </div>
      </div>

      {/* Anchor Points for Connectors (Invisible but kept for reference logic if needed, 
          though visual connectors are drawn by parent canvas. 
          We might want glowing dots in Neon mode? Optional.) 
      */}
      {isNeon && (
        <>
          <div className="absolute left-0 top-1/2 -translate-x-1 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon/50 transition-colors"></div>
          <div className="absolute right-0 top-1/2 translate-x-1 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon/50 transition-colors"></div>
        </>
      )}
    </div>
  );
};

export default memo(BracketMatch);
