import { Player } from './types';

export const INITIAL_FOOTBALL_PLAYERS: Player[] = Array.from({ length: 11 }).map((_, i) => ({
  id: `fb-${i}`,
  name: i === 0 ? 'GK' : `Player ${i + 1}`,
  number: i === 0 ? '1' : `${i + 1}`,
  x: 50,
  y: 50
}));

export const INITIAL_CRICKET_PLAYERS: Player[] = Array.from({ length: 11 }).map((_, i) => ({
  id: `ck-${i}`,
  name: `Fielder ${i + 1}`,
  number: `${i + 1}`,
  x: 50,
  y: 50
}));
