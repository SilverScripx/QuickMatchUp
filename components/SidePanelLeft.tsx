import React, { useState } from 'react';
import { Sport, Settings } from '../types';
import { FOOTBALL_FORMATIONS } from '../config/sportsConfig';
import { Grid3X3, Type, Download, RefreshCw, Trophy, Loader2 } from 'lucide-react';
import { exportToPNG } from '../utils/exportUtils';

interface SidePanelLeftProps {
   sport: Sport;
   onSportChange: (s: Sport) => void;
   formation: string;
   onFormationChange: (f: string) => void;
   settings: Settings;
   onToggleSetting: (key: keyof Settings) => void;
   onAutoAlign: () => void;
   canvasRef: React.RefObject<HTMLDivElement>;
}

const SidePanelLeft: React.FC<SidePanelLeftProps> = ({
   sport,
   onSportChange,
   formation,
   onFormationChange,
   settings,
   onToggleSetting,
   onAutoAlign,
   canvasRef
}) => {
   const [isExporting, setIsExporting] = useState(false);

   const handleExport = async (transparent: boolean) => {
      if (isExporting || !canvasRef.current) return;
      setIsExporting(true);

      await new Promise(r => setTimeout(r, 200));

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `quickmatch-v1.1-${sport}-${timestamp}.png`;

      await exportToPNG(canvasRef.current, filename, transparent);
      setIsExporting(false);
   };

   return (
      <div className="flex flex-col h-full bg-[var(--color-bg-deep)] border-r border-[var(--color-border)] overflow-hidden relative z-30">
         {/* Top Accent Line */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon via-cyan-400 to-neon opacity-80" />

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-5 space-y-7 custom-scrollbar">

            {/* Brand Header */}
            <div className="flex items-center gap-4 pb-2">
               <div className="relative group">
                  <div className="absolute inset-0 bg-neon blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                  <div className="relative bg-gradient-to-br from-gray-800 to-black p-2.5 rounded-xl border border-white/10 shadow-lg group-hover:border-neon/50 transition-colors">
                     <Trophy size={20} className="text-neon" strokeWidth={2} />
                  </div>
               </div>
               <div>
                  <h1 className="font-extrabold text-xl tracking-tight text-white uppercase italic">QuickMatch</h1>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Esports Engine</p>
               </div>
            </div>

            {/* Sport Selector */}
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 bg-neon rounded-full" />
                  Sport Mode
               </label>
               <div className="grid grid-cols-2 gap-2 bg-black p-1.5 rounded-xl border border-white/5 relative overflow-hidden">
                  <div className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-[#1a1a1a] border border-white/10 shadow-md rounded-lg transition-all duration-300 ease-out ${sport === 'football' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                     }`} />

                  {(['football', 'cricket'] as Sport[]).map((s) => (
                     <button
                        key={s}
                        onClick={() => onSportChange(s)}
                        className={`relative z-10 py-2.5 text-xs font-bold rounded-lg uppercase tracking-wide transition-colors duration-200 ${sport === s ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                           }`}
                     >
                        {s}
                     </button>
                  ))}
               </div>
            </div>

            {/* Formation (Football only) */}
            {sport === 'football' && (
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-1 h-3 bg-cyan-500 rounded-full" />
                     Formation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                     {Object.keys(FOOTBALL_FORMATIONS).map(fmt => (
                        <button
                           key={fmt}
                           onClick={() => onFormationChange(fmt)}
                           className={`text-xs px-2 py-3 rounded-lg font-bold transition-all duration-200 border relative group overflow-hidden ${formation === fmt
                              ? 'bg-neon/10 border-neon/50 text-neon shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                              : 'bg-[#0f0f0f] border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                              }`}
                        >
                           <span className="relative z-10">{fmt}</span>
                           {formation === fmt && <div className="absolute inset-0 bg-neon/5 animate-pulse" />}
                        </button>
                     ))}
                  </div>
               </div>
            )}

            {/* Smart Tools */}
            <div className="space-y-3">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-3 bg-purple-500 rounded-full" />
                  Smart Tools
               </label>

               <div className="space-y-2">
                  {/* Reset Button */}
                  <button
                     onClick={onAutoAlign}
                     className="w-full py-3 bg-[#111] hover:bg-[#161616] text-gray-200 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 border border-white/5 hover:border-white/10 transition-all group"
                  >
                     <RefreshCw size={14} className="text-gray-500 group-hover:text-neon transition-colors group-hover:rotate-180 duration-500" />
                     {sport === 'football' ? 'Reset Formation' : 'Reset Positions'}
                  </button>

                  {/* Toggles */}
                  {[
                     { key: 'snapToGrid', label: 'Snap to Grid', icon: Grid3X3 },
                     { key: 'showNames', label: 'Player Names', icon: Type }
                  ].map((item) => (
                     <button
                        key={item.key}
                        onClick={() => onToggleSetting(item.key as keyof Settings)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border ${settings[item.key as keyof Settings]
                           ? 'bg-[#151515] border-neon/30 text-white'
                           : 'bg-[#0f0f0f] border-white/5 text-gray-500 hover:bg-[#151515] hover:border-white/10'
                           }`}
                     >
                        <div className="flex items-center gap-3">
                           <item.icon size={14} className={settings[item.key as keyof Settings] ? 'text-neon' : 'text-gray-600'} />
                           <span>{item.label}</span>
                        </div>
                        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${settings[item.key as keyof Settings] ? 'bg-neon' : 'bg-gray-800'
                           }`}>
                           <div className={`w-3 h-3 rounded-full bg-black shadow-sm transform transition-transform ${settings[item.key as keyof Settings] ? 'translate-x-4' : 'translate-x-0'
                              }`} />
                        </div>
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Export Action */}
         <div className="p-5 border-t border-white/5 bg-[#0a0a0a]">
            <button
               onClick={() => handleExport(false)}
               disabled={isExporting}
               className="group relative w-full py-4 bg-neon hover:bg-[#b2ff00] text-black font-black text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] disabled:opacity-50 disabled:pointer-events-none"
            >
               {isExporting ? <Loader2 className="animate-spin" size={18} /> : (
                  <>
                     <Download size={18} className="translate-y-[-1px]" />
                     <span>Export Lineup</span>
                  </>
               )}
            </button>
            <div className="mt-3 text-center">
               <button
                  onClick={() => handleExport(true)}
                  className="text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors"
               >
                  Download Transparent PNG
               </button>
            </div>
         </div>
      </div>
   );
};

export default SidePanelLeft;