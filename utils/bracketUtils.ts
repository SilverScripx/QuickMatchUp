
import { BracketTeam, BracketTournament, BracketRound, BracketMatch } from '../types';

export const generateTournament = (name: string, teams: BracketTeam[]): BracketTournament => {
  const teamCount = teams.length;
  // Ensure power of 2
  const power = Math.ceil(Math.log2(teamCount));
  const size = Math.pow(2, power);
  
  // Calculate rounds needed
  // e.g. 16 teams -> 4 rounds (16->8->4->2->1)
  const totalRounds = Math.log2(size);
  
  const rounds: BracketRound[] = [];

  // Generate Rounds
  for (let r = 0; r < totalRounds; r++) {
    const matchCount = size / Math.pow(2, r + 1);
    const roundName = getRoundName(matchCount);
    
    const matches: BracketMatch[] = [];
    for (let m = 0; m < matchCount; m++) {
      matches.push({
        id: `r${r}-m${m}`,
        roundIndex: r,
        matchIndex: m,
        teamAId: null,
        teamBId: null,
        scoreA: null,
        scoreB: null,
        winnerId: null,
        nextMatchId: r < totalRounds - 1 ? `r${r + 1}-m${Math.floor(m / 2)}` : null,
        nextMatchSlot: r < totalRounds - 1 ? (m % 2 === 0 ? 'A' : 'B') : null
      });
    }
    
    rounds.push({
      id: `round-${r}`,
      name: roundName,
      matches
    });
  }

  // Seed Teams into Round 1
  // Simple seeding logic: 1 vs 16, 2 vs 15, etc (Standard layout requires standard seeding order)
  // For simplicity, we fill in order: Match 0: T1 vs T2, Match 1: T3 vs T4
  // A proper seed algorithm (1 vs 8, 4 vs 5...) is better.
  
  // Standard Seeding Mapping for 4, 8, 16
  const seedOrder = getSeedOrder(size);
  
  const round1Matches = rounds[0].matches;
  
  seedOrder.forEach((seed, index) => {
    // seed is 1-based index of strength
    // We map this seed to the teams array (assuming teams are sorted by seed or just taken as is)
    // Actually, we should just take teams[seed-1] if it exists
    const team = teams.find(t => t.seed === seed);
    if (!team) return;

    // Which match?
    // Pair 0: Seed 1 vs Seed 16
    // Pair 1: Seed 8 vs Seed 9...
    // The seedOrder array is effectively [1, 16, 8, 9, 4, 13...] representing the slots top to bottom
    const matchIndex = Math.floor(index / 2);
    const slot = index % 2 === 0 ? 'A' : 'B';
    
    if (matchIndex < round1Matches.length) {
      if (slot === 'A') round1Matches[matchIndex].teamAId = team.id;
      else round1Matches[matchIndex].teamBId = team.id;
    }
  });

  return {
    id: `tourney-${Date.now()}`,
    name: name || 'My Tournament',
    teams,
    rounds
  };
};

// Helper for round naming
const getRoundName = (matches: number): string => {
  if (matches === 1) return 'Final';
  if (matches === 2) return 'Semi-Finals';
  if (matches === 4) return 'Quarter-Finals';
  if (matches === 8) return 'Round of 16';
  return `Round of ${matches * 2}`;
};

// Helper for snake seeding order
// Returns an array of Seed Numbers in vertical order
const getSeedOrder = (size: number): number[] => {
  if (size === 2) return [1, 2];
  
  const nextSize = size / 2;
  const nextOrder = getSeedOrder(nextSize);
  
  const order: number[] = [];
  // For each match in the previous size, we split it.
  // E.g. 1 vs 2 becomes (1 vs 4) and (2 vs 3) is wrong logic for recursion
  // Correct recursive logic:
  // If we have order for 4: [1, 4, 2, 3] (1v4, 2v3)
  // For 8: Replace x with x and (8-x+1)
  // [1, 8, 4, 5, 2, 7, 3, 6]
  
  for (let i = 0; i < nextOrder.length; i++) {
    order.push(nextOrder[i]);
    order.push(size + 1 - nextOrder[i]);
  }
  
  return order;
};

// Auto fill helper
export const generateTeams = (count: number): BracketTeam[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `t-${i + 1}`,
    name: `Team ${i + 1}`,
    seed: i + 1
  }));
};
