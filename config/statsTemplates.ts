
import { StatsTemplate } from '../types';

export const STATS_TEMPLATES: StatsTemplate[] = [
  {
    id: 'modern-neon',
    name: 'Modern Neon',
    size: 'portrait',
    background: { type: 'color', value: '#111111' },
    elements: [
      {
        id: 'bg-accent',
        type: 'text',
        content: '',
        x: 540,
        y: 675,
        width: 900,
        height: 1100,
        backgroundColor: '#1a1a1a',
        borderRadius: 40,
        zIndex: 0,
        locked: true,
        fontSize: 0,
        fontWeight: 'normal',
        color: 'transparent'
      },
      {
        id: 'player-img',
        type: 'image',
        content: 'https://placehold.co/600x800/png?text=Player',
        x: 540,
        y: 450,
        width: 600,
        height: 600,
        zIndex: 1,
        dataKey: 'player_image'
      },
      {
        id: 'player-name',
        type: 'text',
        content: 'PLAYER NAME',
        x: 540,
        y: 800,
        fontSize: 90,
        fontWeight: '900',
        color: '#ffffff',
        textAlign: 'center',
        zIndex: 2,
        dataKey: 'player_name'
      },
      {
        id: 'team-name',
        type: 'text',
        content: 'TEAM FC',
        x: 540,
        y: 880,
        fontSize: 40,
        fontWeight: '600',
        color: '#0AFF6C',
        textAlign: 'center',
        zIndex: 2,
        dataKey: 'team_name'
      },
      // Stats Grid
      { id: 'stat-1-val', type: 'text', content: '92', x: 250, y: 1000, fontSize: 60, fontWeight: '800', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'stat_1_val' },
      { id: 'stat-1-lbl', type: 'text', content: 'PAC', x: 250, y: 1050, fontSize: 24, fontWeight: '500', color: '#aaa', textAlign: 'center', zIndex: 2, dataKey: 'stat_1_lbl' },
      
      { id: 'stat-2-val', type: 'text', content: '88', x: 540, y: 1000, fontSize: 60, fontWeight: '800', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'stat_2_val' },
      { id: 'stat-2-lbl', type: 'text', content: 'SHO', x: 540, y: 1050, fontSize: 24, fontWeight: '500', color: '#aaa', textAlign: 'center', zIndex: 2, dataKey: 'stat_2_lbl' },

      { id: 'stat-3-val', type: 'text', content: '85', x: 830, y: 1000, fontSize: 60, fontWeight: '800', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'stat_3_val' },
      { id: 'stat-3-lbl', type: 'text', content: 'PAS', x: 830, y: 1050, fontSize: 24, fontWeight: '500', color: '#aaa', textAlign: 'center', zIndex: 2, dataKey: 'stat_3_lbl' },
    ]
  },
  {
    id: 'card-classic',
    name: 'Card Classic',
    size: 'portrait',
    background: { type: 'color', value: 'transparent' }, // Intended to be exported as a transparent card
    elements: [
       // Card Shape
       {
         id: 'card-bg',
         type: 'text', // Hack using text box as shape
         content: '',
         x: 540,
         y: 675,
         width: 800,
         height: 1200,
         backgroundColor: '#e2be6e', // Gold color
         borderRadius: 20,
         zIndex: 0,
         locked: true,
         fontSize: 0,
         fontWeight: 'normal',
         color: 'transparent',
         shadow: true
       },
       {
         id: 'inner-border',
         type: 'text',
         content: '',
         x: 540,
         y: 675,
         width: 760,
         height: 1160,
         backgroundColor: '#000000', // Inner dark
         borderRadius: 15,
         zIndex: 1,
         locked: true,
         fontSize: 0,
         fontWeight: 'normal',
         color: 'transparent',
         opacity: 0.1
       },
       {
        id: 'rating',
        type: 'text',
        content: '99',
        x: 250,
        y: 250,
        fontSize: 100,
        fontWeight: '900',
        color: '#000000',
        textAlign: 'center',
        zIndex: 2,
        dataKey: 'rating'
      },
      {
        id: 'position',
        type: 'text',
        content: 'ST',
        x: 250,
        y: 350,
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        zIndex: 2,
        dataKey: 'position'
      },
      {
        id: 'player-pic',
        type: 'image',
        content: 'https://placehold.co/500x500/png?text=Face',
        x: 600,
        y: 400,
        width: 450,
        height: 450,
        zIndex: 2,
        dataKey: 'player_image'
      },
      {
        id: 'name',
        type: 'text',
        content: 'LEGEND',
        x: 540,
        y: 700,
        fontSize: 80,
        fontWeight: '900',
        color: '#000000',
        textAlign: 'center',
        zIndex: 3,
        dataKey: 'player_name'
      },
      // Stats
      { id: 's1', type: 'text', content: '99 PAC', x: 350, y: 850, fontSize: 40, fontWeight: 'bold', color: '#000', textAlign: 'left', zIndex: 3, dataKey: 'stat_1' },
      { id: 's2', type: 'text', content: '98 DRI', x: 730, y: 850, fontSize: 40, fontWeight: 'bold', color: '#000', textAlign: 'left', zIndex: 3, dataKey: 'stat_2' },
      { id: 's3', type: 'text', content: '97 SHO', x: 350, y: 950, fontSize: 40, fontWeight: 'bold', color: '#000', textAlign: 'left', zIndex: 3, dataKey: 'stat_3' },
      { id: 's4', type: 'text', content: '90 DEF', x: 730, y: 950, fontSize: 40, fontWeight: 'bold', color: '#000', textAlign: 'left', zIndex: 3, dataKey: 'stat_4' },
    ]
  },
  {
    id: 'split-focus',
    name: 'Split Focus',
    size: 'landscape',
    background: { type: 'color', value: '#ffffff' },
    elements: [
       {
           id: 'left-bg',
           type: 'text',
           content: '',
           x: 480,
           y: 540,
           width: 960,
           height: 1080,
           backgroundColor: '#000000',
           zIndex: 0,
           locked: true,
           fontSize: 0,
           fontWeight: 'normal',
           color: 'transparent'
       },
       {
           id: 'right-bg',
           type: 'text',
           content: '',
           x: 1440,
           y: 540,
           width: 960,
           height: 1080,
           backgroundColor: '#f5f5f5',
           zIndex: 0,
           locked: true,
           fontSize: 0,
           fontWeight: 'normal',
           color: 'transparent'
       },
       {
           id: 'main-img',
           type: 'image',
           content: 'https://placehold.co/800x1080/png?text=Action+Shot',
           x: 480,
           y: 540,
           width: 960,
           height: 1080,
           zIndex: 1,
           dataKey: 'action_image'
       },
       {
           id: 'match-score',
           type: 'text',
           content: '3 - 1',
           x: 1440,
           y: 300,
           fontSize: 180,
           fontWeight: '900',
           color: '#000',
           textAlign: 'center',
           zIndex: 2,
           dataKey: 'score'
       },
       {
           id: 'motm',
           type: 'text',
           content: 'MAN OF THE MATCH',
           x: 1440,
           y: 150,
           fontSize: 40,
           fontWeight: 'bold',
           color: '#888',
           textAlign: 'center',
           zIndex: 2
       },
       {
           id: 'player-name',
           type: 'text',
           content: 'DE BRUYNE',
           x: 1440,
           y: 500,
           fontSize: 100,
           fontWeight: '900',
           color: '#000',
           textAlign: 'center',
           zIndex: 2,
           dataKey: 'player_name'
       },
       {
           id: 'stats-row',
           type: 'text',
           content: '2 ASSISTS  •  4 KEY PASSES  •  92% ACCURACY',
           x: 1440,
           y: 650,
           fontSize: 32,
           fontWeight: '600',
           color: '#333',
           textAlign: 'center',
           zIndex: 2,
           dataKey: 'match_stats'
       }
    ]
  },
  {
      id: 'comparison-pro',
      name: 'Comparison Pro',
      size: 'square',
      background: { type: 'gradient', value: 'linear-gradient(to right, #0f172a 50%, #1e293b 50%)' },
      elements: [
          {
              id: 'vs-badge',
              type: 'text',
              content: 'VS',
              x: 540,
              y: 540,
              fontSize: 80,
              fontWeight: '900',
              color: '#0AFF6C',
              backgroundColor: '#000',
              borderRadius: 50,
              width: 120,
              height: 120,
              textAlign: 'center',
              zIndex: 10,
              shadow: true
          },
          { id: 'p1-name', type: 'text', content: 'MESSI', x: 270, y: 150, fontSize: 60, fontWeight: 'bold', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'p1_name' },
          { id: 'p2-name', type: 'text', content: 'RONALDO', x: 810, y: 150, fontSize: 60, fontWeight: 'bold', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'p2_name' },
          
          { id: 'p1-img', type: 'image', content: 'https://placehold.co/400x400/png?text=P1', x: 270, y: 400, width: 300, height: 300, zIndex: 1, dataKey: 'p1_image' },
          { id: 'p2-img', type: 'image', content: 'https://placehold.co/400x400/png?text=P2', x: 810, y: 400, width: 300, height: 300, zIndex: 1, dataKey: 'p2_image' },

          { id: 'stat-label-1', type: 'text', content: 'GOALS', x: 540, y: 700, fontSize: 24, fontWeight: 'bold', color: '#aaa', textAlign: 'center', backgroundColor:'#000', zIndex: 5 },
          { id: 'p1-s1', type: 'text', content: '24', x: 270, y: 700, fontSize: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'p1_s1' },
          { id: 'p2-s1', type: 'text', content: '21', x: 810, y: 700, fontSize: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'p2_s1' },

          { id: 'stat-label-2', type: 'text', content: 'ASSISTS', x: 540, y: 850, fontSize: 24, fontWeight: 'bold', color: '#aaa', textAlign: 'center', backgroundColor:'#000', zIndex: 5 },
          { id: 'p1-s2', type: 'text', content: '12', x: 270, y: 850, fontSize: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'p1_s2' },
          { id: 'p2-s2', type: 'text', content: '5', x: 810, y: 850, fontSize: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center', zIndex: 2, dataKey: 'p2_s2' },
      ]
  }
];
