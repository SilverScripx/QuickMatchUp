import React from 'react';
import { ToolType } from '../../types';
import { MousePointer2, MoveUpRight, Minus, Circle, Eraser, Lock } from 'lucide-react';

interface TacticsToolbarProps {
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
}

const TacticsToolbar: React.FC<TacticsToolbarProps> = ({ activeTool, onSelectTool }) => {
  const tools: { id: ToolType; icon: React.ReactNode; label: string }[] = [
    { id: 'move', icon: <MousePointer2 size={20} />, label: 'Move' },
    { id: 'arrow', icon: <MoveUpRight size={20} />, label: 'Arrow' },
    { id: 'line', icon: <Minus size={20} />, label: 'Line' },
    { id: 'zone', icon: <Circle size={20} />, label: 'Zone' },
    { id: 'lock', icon: <Lock size={20} />, label: 'Lock Items' },
    { id: 'eraser', icon: <Eraser size={20} />, label: 'Eraser' },
  ];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <div className="pointer-events-auto relative">

        {/* Ambient Glow */}
        <div className="absolute -inset-4 bg-neon/20 blur-2xl rounded-full opacity-50" />

        {/* Floating Pill Toolbar */}
        <div className="relative flex items-center gap-1.5 p-1.5 bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-full ring-1 ring-white/5">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className={`relative group p-3 rounded-full transition-all duration-300 ${activeTool === tool.id
                  ? 'bg-neon text-black shadow-[0_0_15px_rgba(10,255,108,0.4)] scale-100'
                  : 'text-gray-400 hover:text-white hover:bg-white/10 scale-95 hover:scale-100'
                }`}
            >
              {/* Icon */}
              <div className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-0">
                {tool.icon}
              </div>

              {/* Active Dot indicator (Optional, but using BG instead) */}
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 border border-white/10 text-white text-[11px] font-bold tracking-wide rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-xl pointer-events-none whitespace-nowrap z-50">
                {tool.label}
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-b border-r border-white/10 rotate-45"></div>
              </div>
            </button>
          ))}

          {/* Divider for separation */}
          <div className="w-px h-6 bg-white/10 mx-1"></div>

          <div className="px-3 text-[10px] font-bold text-white/30 uppercase tracking-widest select-none">
            Tools
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticsToolbar;