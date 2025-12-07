import React, { useState } from 'react';
import { Sport } from '../../types';
import { Undo2, Redo2, Download, Trash2, Loader2, Trophy, ChevronRight } from 'lucide-react';
import ColorPicker from '../ColorPicker';
import { exportToPNG } from '../../utils/exportUtils';

interface TacticsLeftPanelProps {
  sport: Sport;
  setSport: (s: Sport) => void;
  activeColor: string;
  setActiveColor: (c: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onClear: () => void;
  canvasRef: React.RefObject<HTMLDivElement>;
}

const TacticsLeftPanel: React.FC<TacticsLeftPanelProps> = ({
  sport,
  setSport,
  activeColor,
  setActiveColor,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onClear,
  canvasRef
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (transparent: boolean) => {
    if (!canvasRef.current || isExporting) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 200)); // Render wait
    const filename = `quickmatch-tactics-v1.3-${sport}-${Date.now()}.png`;
    await exportToPNG(canvasRef.current, filename, transparent);
    setIsExporting(false);
  };

  return (
    <div className="h-full bg-white dark:bg-[#121212] border-r border-gray-200 dark:border-white/10 flex flex-col p-5 gap-8 overflow-y-auto">

      {/* Brand Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-neon to-emerald-500 p-2 rounded-xl shadow-lg shadow-neon/20">
            <Trophy size={20} className="text-black fill-black/20" />
          </div>
          <div>
            <h1 className="font-[800] text-lg leading-tight tracking-tight text-gray-900 dark:text-white">Tactics<span className="text-neon">.</span></h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Pro Edition</p>
          </div>
        </div>
      </div>

      {/* Main Controls Group */}
      <div className="space-y-6">

        {/* Sport Selector - Segmented Control */}
        <div>
          <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
            {(['football', 'cricket'] as Sport[]).map((s) => (
              <button
                key={s}
                onClick={() => setSport(s)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all duration-300 ${sport === s
                    ? 'bg-white dark:bg-[#1A1A1A] text-black dark:text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color Tools */}
        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
          <ColorPicker
            label="Ink Color"
            color={activeColor}
            onChange={setActiveColor}
          />
        </div>

        {/* History Controls */}
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            History
            <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="group relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 hover:border-neon dark:hover:border-neon/50 text-gray-700 dark:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-neon/10"
            >
              <Undo2 size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold">Undo</span>
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="group relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 hover:border-neon dark:hover:border-neon/50 text-gray-700 dark:text-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-neon/10"
            >
              <span className="text-xs font-bold">Redo</span>
              <Redo2 size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10 space-y-3">

        <button
          onClick={() => handleExport(false)}
          disabled={isExporting}
          className="group w-full py-4 bg-neon hover:bg-[#0ae660] text-black font-[800] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_4px_20px_rgba(10,255,108,0.3)] hover:shadow-[0_4px_25px_rgba(10,255,108,0.5)] active:scale-95 disabled:opacity-50"
        >
          {isExporting ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
          <span className="tracking-tight">DOWNLOAD ANALYSIS</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleExport(true)}
            disabled={isExporting}
            className="py-2.5 px-4 bg-transparent border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-2 transition-colors"
            title="Save as transparent PNG"
          >
            Transparent
          </button>
          <button
            onClick={onClear}
            className="py-2.5 px-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>
      </div>

    </div>
  );
};

export default TacticsLeftPanel;
