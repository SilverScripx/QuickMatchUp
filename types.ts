

export type Sport = 'football' | 'cricket';
export type PlayerShape = 'circle' | 'square';

export interface Player {
  id: string;
  name: string;
  number: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  color?: string; // Hex code
  image?: string; // Data URL
  shape?: PlayerShape;
}

export interface Settings {
  snapToGrid: boolean;
  showNames: boolean;
}

export interface Formation {
  name: string;
  positions: { x: number; y: number }[];
}



// Tactics Board Types

export type ToolType = 'move' | 'arrow' | 'line' | 'zone' | 'eraser' | 'lock';
export type MarkerType = 'player' | 'cone' | 'ball';

export interface TacticMarker {
  id: string;
  type: MarkerType;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  color: string;
  number?: string;
  label?: string;
  locked?: boolean;
}

export interface TacticDrawing {
  id: string;
  type: 'arrow' | 'line' | 'zone';
  startX: number; // Percentage
  startY: number; // Percentage
  endX: number;   // Percentage
  endY: number;   // Percentage
  color: string;
  locked?: boolean;
}

export interface TacticsState {
  markers: TacticMarker[];
  drawings: TacticDrawing[];
}

// Stats Card Types

export type StatsCanvasSize = 'portrait' | 'landscape' | 'square';

export type StatsElementType = 'text' | 'image';

export interface StatsBackground {
  type: 'color' | 'gradient' | 'image';
  value: string;
}

export interface StatsElement {
  // Inherited from old PosterElement
  id: string;
  type: StatsElementType;
  content: string; // Text string or Image Data URL
  x: number; // Pixels relative to 1080x1350
  y: number; // Pixels
  width?: number;
  height?: number;

  // Style properties
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  shadow?: boolean;

  zIndex: number;
  locked?: boolean;

  // Stats specific
  dataKey?: string; // For binding to Quick Data panel
  opacity?: number;
  borderRadius?: number;
}

export interface StatsState {
  elements: StatsElement[];
  background: StatsBackground;
  size: StatsCanvasSize;
}

export interface StatsTemplate {
  id: string;
  name: string;
  size: StatsCanvasSize;
  background: StatsBackground;
  elements: StatsElement[];
}

// Bracket Builder Types

export interface BracketTeam {
  id: string;
  name: string;
  seed: number;
}

export interface BracketMatch {
  id: string;
  roundIndex: number;
  matchIndex: number; // Index within the round
  teamAId: string | null;
  teamBId: string | null;
  scoreA: number | null;
  scoreB: number | null;
  winnerId: string | null;
  nextMatchId: string | null; // ID of the match this feeds into
  nextMatchSlot: 'A' | 'B' | null;
}

export interface BracketRound {
  id: string;
  name: string;
  matches: BracketMatch[];
}

export interface BracketTournament {
  id: string;
  name: string;
  teams: BracketTeam[];
  rounds: BracketRound[];
}

export interface BracketSettings {
  theme: 'dark' | 'light' | 'neon';
  connectorStyle: 'straight' | 'curved';
  showSeeds: boolean;
}