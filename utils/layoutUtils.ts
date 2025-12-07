import { Player, Sport } from '../types';
import { FOOTBALL_FORMATIONS, CRICKET_POSITIONS } from '../config/sportsConfig';

export const alignFormation = (players: Player[], formationName: string, sport: Sport): Player[] => {
  if (sport === 'football') {
    const formation = FOOTBALL_FORMATIONS[formationName];
    if (!formation) return players;

    return players.map((player, idx) => {
      // If we have a position for this index, move the player. Otherwise keep them where they are.
      if (idx < formation.positions.length) {
        return {
          ...player,
          x: formation.positions[idx].x,
          y: formation.positions[idx].y
        };
      }
      return player;
    });
  }
  return players;
};

export const distributePlayers = (players: Player[], sport: Sport): Player[] => {
    // For cricket or generic distribution
    if (sport === 'cricket') {
        return players.map((player, idx) => {
             if (idx < CRICKET_POSITIONS.length) {
                 return {
                     ...player,
                     x: CRICKET_POSITIONS[idx].x,
                     y: CRICKET_POSITIONS[idx].y
                 };
             }
             // Fallback grid for extras
             return { ...player, x: 50, y: 50 };
        });
    }

    // Generic grid distribution if needed for other sports later
    const cols = 4;
    return players.map((player, idx) => {
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        return {
            ...player,
            x: 15 + (col * 20),
            y: 15 + (row * 15)
        };
    });
};
