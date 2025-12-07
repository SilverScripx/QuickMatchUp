
import { useState, useCallback } from 'react';
import { BracketTournament, BracketTeam, BracketSettings } from '../types';
import { generateTournament, generateTeams } from '../utils/bracketUtils';

export const useBrackets = () => {
  const [teams, setTeams] = useState<BracketTeam[]>(() => generateTeams(8));
  const [tournament, setTournament] = useState<BracketTournament>(() => generateTournament('New Tournament', generateTeams(8)));
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [settings, setSettings] = useState<BracketSettings>({
    theme: 'dark',
    connectorStyle: 'curved',
    showSeeds: true
  });

  const updateTeam = useCallback((id: string, name: string) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, name } : t));
  }, []);

  const addTeam = useCallback(() => {
    setTeams(prev => {
        const newSeed = prev.length + 1;
        return [...prev, { id: `t-${Date.now()}`, name: `Team ${newSeed}`, seed: newSeed }];
    });
  }, []);

  const removeTeam = useCallback((id: string) => {
    setTeams(prev => {
        const remaining = prev.filter(t => t.id !== id);
        // Re-seed
        return remaining.map((t, i) => ({ ...t, seed: i + 1 }));
    });
  }, []);

  const regenerateBracket = useCallback(() => {
    setTournament(generateTournament(tournament.name, teams));
    setSelectedMatchId(null);
  }, [teams, tournament.name]);

  const updateTournamentName = useCallback((name: string) => {
    setTournament(prev => ({ ...prev, name }));
  }, []);

  const updateMatch = useCallback((matchId: string, updates: { scoreA?: number, scoreB?: number, winnerId?: string | null }) => {
    setTournament(prev => {
      // Deep clone to safely mutate logic (or careful map)
      const newRounds = prev.rounds.map(r => ({ ...r, matches: [...r.matches] }));
      
      // Find match
      let currentMatch = null;
      let roundIdx = -1;
      
      for (let i = 0; i < newRounds.length; i++) {
        const m = newRounds[i].matches.find(m => m.id === matchId);
        if (m) {
          currentMatch = m;
          roundIdx = i;
          break;
        }
      }

      if (!currentMatch) return prev;

      // Apply updates
      if (updates.scoreA !== undefined) currentMatch.scoreA = updates.scoreA;
      if (updates.scoreB !== undefined) currentMatch.scoreB = updates.scoreB;
      
      // Determine winner
      let newWinnerId = updates.winnerId !== undefined ? updates.winnerId : currentMatch.winnerId;
      
      // Auto-detect winner if both scores present and not manually overridden to null
      if (updates.winnerId === undefined && currentMatch.scoreA !== null && currentMatch.scoreB !== null) {
          if (currentMatch.scoreA > currentMatch.scoreB) newWinnerId = currentMatch.teamAId;
          else if (currentMatch.scoreB > currentMatch.scoreA) newWinnerId = currentMatch.teamBId;
          else newWinnerId = null; // Draw logic? Brackets usually need winner.
      }
      
      // If manually clearing winner
      if (updates.winnerId === null) newWinnerId = null;

      currentMatch.winnerId = newWinnerId;

      // Propagate to next match
      if (currentMatch.nextMatchId) {
          // Find next match
          for (let i = roundIdx + 1; i < newRounds.length; i++) {
             const nextMatch = newRounds[i].matches.find(m => m.id === currentMatch?.nextMatchId);
             if (nextMatch) {
                 if (currentMatch.nextMatchSlot === 'A') nextMatch.teamAId = newWinnerId;
                 else if (currentMatch.nextMatchSlot === 'B') nextMatch.teamBId = newWinnerId;
                 
                 // If the next match now has a missing team (because we cleared winner), we might need to clear its winner too
                 if (!newWinnerId) {
                     // We don't necessarily clear scores, but we clear the winner of the next match if it depended on this one
                     // Simple recursion or just clear winner
                     // For simplicity: keep scores, but clear winner if team is gone
                     if (nextMatch.winnerId === currentMatch.teamAId || nextMatch.winnerId === currentMatch.teamBId) {
                         // This would require recursive clearing. 
                         // For MVP: Users manually update next match if needed, or simple clear:
                     }
                 }
                 break;
             }
          }
      }

      return { ...prev, rounds: newRounds };
    });
  }, []);

  return {
    teams,
    tournament,
    selectedMatchId,
    settings,
    setSettings,
    setSelectedMatchId,
    updateTeam,
    addTeam,
    removeTeam,
    regenerateBracket,
    updateTournamentName,
    updateMatch
  };
};
