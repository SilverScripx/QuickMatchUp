import { Formation, Player, Sport } from '../types';

export const SPORTS_CONFIG = {
  football: {
    id: 'football',
    name: 'Football',
    aspectRatio: 16 / 9,
    defaultFormation: '4-4-2',
    playerCount: 11
  },
  cricket: {
    id: 'cricket',
    name: 'Cricket',
    aspectRatio: 1, // More square/oval for cricket
    defaultFormation: 'Standard',
    playerCount: 11
  }
};

export const FOOTBALL_FORMATIONS: Record<string, Formation> = {
  '4-4-2': {
    name: '4-4-2',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 20, y: 75 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 80, y: 75 }, // DEF
      { x: 20, y: 50 }, { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 80, y: 50 }, // MID
      { x: 35, y: 25 }, { x: 65, y: 25 }  // FWD
    ]
  },
  '4-3-3': {
    name: '4-3-3',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 30, y: 50 }, { x: 50, y: 55 }, { x: 70, y: 50 }, // MID
      { x: 20, y: 25 }, { x: 50, y: 20 }, { x: 80, y: 25 }  // FWD
    ]
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 35, y: 60 }, { x: 65, y: 60 }, // CDM
      { x: 20, y: 40 }, { x: 50, y: 45 }, { x: 80, y: 40 }, // AM
      { x: 50, y: 20 }  // ST
    ]
  },
  '4-1-2-1-2': {
    name: '4-1-2-1-2 (Diamond)',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 40, y: 78 }, { x: 60, y: 78 }, { x: 85, y: 75 }, // DEF
      { x: 50, y: 65 }, // CDM
      { x: 30, y: 50 }, { x: 70, y: 50 }, // CM
      { x: 50, y: 35 }, // CAM
      { x: 35, y: 20 }, { x: 65, y: 20 }  // ST
    ]
  },
  '3-5-2': {
    name: '3-5-2',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 25, y: 75 }, { x: 50, y: 78 }, { x: 75, y: 75 }, // DEF
      { x: 10, y: 50 }, { x: 30, y: 55 }, { x: 50, y: 50 }, { x: 70, y: 55 }, { x: 90, y: 50 }, // MID
      { x: 35, y: 25 }, { x: 65, y: 25 }  // FWD
    ]
  },
  '3-4-3': {
    name: '3-4-3',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 20, y: 75 }, { x: 50, y: 75 }, { x: 80, y: 75 }, // DEF (CBs)
      { x: 10, y: 50 }, { x: 35, y: 55 }, { x: 65, y: 55 }, { x: 90, y: 50 }, // MID
      { x: 20, y: 25 }, { x: 50, y: 20 }, { x: 80, y: 25 }  // FWD
    ]
  },
  '5-3-2': {
    name: '5-3-2',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 65 }, { x: 32, y: 75 }, { x: 50, y: 75 }, { x: 68, y: 75 }, { x: 85, y: 65 }, // DEF
      { x: 30, y: 50 }, { x: 50, y: 55 }, { x: 70, y: 50 }, // MID
      { x: 40, y: 25 }, { x: 60, y: 25 }  // FWD
    ]
  },
  '4-1-4-1': {
    name: '4-1-4-1',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 50, y: 65 }, // CDM
      { x: 15, y: 45 }, { x: 38, y: 45 }, { x: 62, y: 45 }, { x: 85, y: 45 }, // MID
      { x: 50, y: 20 }  // ST
    ]
  },
  '4-5-1': {
    name: '4-5-1',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 10, y: 50 }, { x: 30, y: 50 }, { x: 50, y: 55 }, { x: 70, y: 50 }, { x: 90, y: 50 }, // MID
      { x: 50, y: 20 }  // ST
    ]
  },
  '4-3-2-1': {
    name: '4-3-2-1 (Xmas Tree)',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 30, y: 55 }, { x: 50, y: 60 }, { x: 70, y: 55 }, // CM
      { x: 40, y: 40 }, { x: 60, y: 40 }, // CAM
      { x: 50, y: 20 }  // ST
    ]
  },
  '5-2-3': {
    name: '5-2-3',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 10, y: 60 }, { x: 25, y: 75 }, { x: 50, y: 75 }, { x: 75, y: 75 }, { x: 90, y: 60 }, // DEF (WB+CB)
      { x: 40, y: 50 }, { x: 60, y: 50 }, // CM
      { x: 20, y: 25 }, { x: 50, y: 20 }, { x: 80, y: 25 }  // FWD
    ]
  },
  '4-2-2-2': {
    name: '4-2-2-2',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 40, y: 60 }, { x: 60, y: 60 }, // CDM
      { x: 25, y: 40 }, { x: 75, y: 40 }, // wide AM
      { x: 40, y: 20 }, { x: 60, y: 20 }  // ST
    ]
  },
  '3-4-1-2': {
    name: '3-4-1-2',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 25, y: 75 }, { x: 50, y: 78 }, { x: 75, y: 75 }, // CB
      { x: 10, y: 50 }, { x: 40, y: 60 }, { x: 60, y: 60 }, { x: 90, y: 50 }, // LM/RM/CM
      { x: 50, y: 35 }, // CAM
      { x: 35, y: 20 }, { x: 65, y: 20 }  // ST
    ]
  },
  '3-4-2-1': {
    name: '3-4-2-1',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 25, y: 75 }, { x: 50, y: 78 }, { x: 75, y: 75 }, // CB
      { x: 10, y: 55 }, { x: 40, y: 60 }, { x: 60, y: 60 }, { x: 90, y: 55 }, // MID
      { x: 35, y: 35 }, { x: 65, y: 35 }, // LF/RF
      { x: 50, y: 18 }  // ST
    ]
  },
  '4-2-4': {
    name: '4-2-4',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 40, y: 55 }, { x: 60, y: 55 }, // MID
      { x: 15, y: 25 }, { x: 35, y: 20 }, { x: 65, y: 20 }, { x: 85, y: 25 } // FWD
    ]
  },
  '4-4-1-1': {
    name: '4-4-1-1',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 15, y: 50 }, { x: 40, y: 55 }, { x: 60, y: 55 }, { x: 85, y: 50 }, // MID
      { x: 50, y: 35 }, // CF/CAM
      { x: 50, y: 20 }  // ST
    ]
  },
  '5-4-1': {
    name: '5-4-1 (Flat)',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 65 }, { x: 32, y: 75 }, { x: 50, y: 75 }, { x: 68, y: 75 }, { x: 85, y: 65 }, // DEF
      { x: 15, y: 50 }, { x: 40, y: 52 }, { x: 60, y: 52 }, { x: 85, y: 50 }, // MID
      { x: 50, y: 25 }  // ST
    ]
  },
  '4-1-3-2': {
    name: '4-1-3-2',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 50, y: 65 }, // CDM
      { x: 30, y: 50 }, { x: 50, y: 45 }, { x: 70, y: 50 }, // RAM/CAM/LAM
      { x: 35, y: 25 }, { x: 65, y: 25 }  // ST
    ]
  },
  '3-3-1-3': {
    name: '3-3-1-3 (Bielsa)',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 25, y: 75 }, { x: 50, y: 78 }, { x: 75, y: 75 }, // CB
      { x: 25, y: 60 }, { x: 50, y: 65 }, { x: 75, y: 60 }, // DM/WB
      { x: 50, y: 45 }, // AM
      { x: 20, y: 25 }, { x: 50, y: 20 }, { x: 80, y: 25 }  // FWD
    ]
  },
  '2-3-5': {
    name: '2-3-5 (Pyramid)',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 35, y: 80 }, { x: 65, y: 80 }, // FB
      { x: 30, y: 60 }, { x: 50, y: 55 }, { x: 70, y: 60 }, // HB
      { x: 10, y: 25 }, { x: 30, y: 20 }, { x: 50, y: 15 }, { x: 70, y: 20 }, { x: 90, y: 25 } // FWD
    ]
  },
  '3-2-2-3': {
    name: '3-2-2-3 (WM)',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 25, y: 75 }, { x: 50, y: 75 }, { x: 75, y: 75 }, // Full backs + CB
      { x: 35, y: 55 }, { x: 65, y: 55 }, // Half backs
      { x: 35, y: 35 }, { x: 65, y: 35 }, // Inside Forwards
      { x: 20, y: 20 }, { x: 50, y: 15 }, { x: 80, y: 20 }  // Wingers + CF
    ]
  },
  '4-6-0': {
    name: '4-6-0 (False 9)',
    positions: [
      { x: 50, y: 90 }, // GK
      { x: 15, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 85, y: 75 }, // DEF
      { x: 35, y: 60 }, { x: 65, y: 60 }, // CDM
      { x: 20, y: 45 }, { x: 80, y: 45 }, // Winger
      { x: 40, y: 30 }, { x: 60, y: 30 } // AM/False 9
    ]
  }
};

export const CRICKET_POSITIONS: { x: number; y: number }[] = [
  { x: 50, y: 15 }, // WK
  { x: 50, y: 85 }, // Bowler
  { x: 20, y: 30 }, { x: 80, y: 30 },
  { x: 10, y: 50 }, { x: 90, y: 50 },
  { x: 20, y: 70 }, { x: 80, y: 70 },
  { x: 35, y: 40 }, { x: 65, y: 40 },
  { x: 50, y: 50 }
];

export const generateInitialPlayers = (sport: Sport): Player[] => {
  if (sport === 'football') {
    return Array.from({ length: 11 }).map((_, i) => ({
      id: `fb-${Date.now()}-${i}`,
      name: i === 0 ? 'GK' : `Player ${i + 1}`,
      number: i === 0 ? '1' : `${i + 1}`,
      x: 50,
      y: 50,
      color: '#ffffff',
      shape: 'circle'
    }));
  } else {
    return Array.from({ length: 11 }).map((_, i) => ({
      id: `ck-${Date.now()}-${i}`,
      name: `Fielder ${i + 1}`,
      number: `${i + 1}`,
      x: CRICKET_POSITIONS[i]?.x ?? 50,
      y: CRICKET_POSITIONS[i]?.y ?? 50,
      color: '#ffffff',
      shape: 'circle'
    }));
  }
};
