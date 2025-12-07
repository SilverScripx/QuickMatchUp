
import React, { useState } from 'react';
import { BracketTeam, BracketSettings } from '../../types';
import { Trophy, Plus, Trash2, RefreshCw, ChevronRight, Users, GitBranch, Shield } from 'lucide-react';

interface BracketsLeftPanelProps {
    name: string;
    setName: (n: string) => void;
    teams: BracketTeam[];
    onAddTeam: () => void;
    onRemoveTeam: (id: string) => void;
    onUpdateTeam: (id: string, name: string) => void;
    onGenerate: () => void;
    settings: BracketSettings;
}

const BracketsLeftPanel: React.FC<BracketsLeftPanelProps> = ({
    name, setName, teams, onAddTeam, onRemoveTeam, onUpdateTeam, onGenerate
}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="h-full bg-white dark:bg-[#151515] border-r border-gray-200 dark:border-white/10 flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-neon/10 border border-neon/20 p-2 rounded-lg text-neon">
                    <Trophy size={20} />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight text-gray-900 dark:text-white leading-none">Bracket Builder</h1>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Tournament Engine</span>
                </div>
            </div>

            <div className="space-y-8 flex-1">
                {/* Tournament Type Cards */}
                <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                        <GitBranch size={12} /> Tournament Format
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                        {/* Active Selection */}
                        <div className="relative p-3 rounded-xl bg-neon/5 border border-neon/50 flex items-center gap-3 cursor-pointer shadow-[0_0_15px_rgba(10,255,108,0.1)]">
                            <div className="w-4 h-4 rounded-full border-[4px] border-neon bg-transparent" />
                            <div className="flex-1">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">Single Elimination</div>
                                <div className="text-[10px] text-gray-500">Standard knockout bracket</div>
                            </div>
                        </div>
                        {/* Disabled Selection */}
                        <div className="relative p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent flex items-center gap-3 opacity-50 cursor-not-allowed grayscale">
                            <div className="w-4 h-4 rounded-full border border-gray-400 bg-transparent" />
                            <div className="flex-1">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">Double Elimination</div>
                                <div className="text-[10px] text-gray-500">Coming soon</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Name Input */}
                <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase mb-2 block">Tournament Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-sm text-gray-900 dark:text-white focus:border-neon focus:ring-1 focus:ring-neon outline-none transition-all placeholder:text-gray-500"
                        placeholder="e.g. Summer Championship..."
                    />
                </div>

                {/* Teams Management */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex justify-between items-end mb-3">
                        <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2">
                            <Users size={12} /> Teams ({teams.length})
                        </label>
                        <button
                            onClick={onAddTeam}
                            className="px-2 py-1 rounded-lg bg-neon/10 hover:bg-neon/20 text-neon text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                            <Plus size={12} /> Add Team
                        </button>
                    </div>

                    <div className="flex-1 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                        {teams.map((team, idx) => (
                            <div key={team.id} className="group bg-white dark:bg-[#1a1a1a] p-2 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-3 hover:border-neon/30 transition-colors">
                                <div className="w-6 h-6 rounded bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                    {idx + 1}
                                </div>
                                <Shield size={14} className="text-gray-300 dark:text-gray-600" />
                                <input
                                    type="text"
                                    value={team.name}
                                    onChange={(e) => onUpdateTeam(team.id, e.target.value)}
                                    className="flex-1 bg-transparent border-none p-0 text-sm font-medium text-gray-900 dark:text-gray-200 focus:ring-0 placeholder:text-gray-500"
                                    placeholder="Team Name"
                                />
                                <button
                                    onClick={() => onRemoveTeam(team.id)}
                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}

                        {teams.length === 0 && (
                            <div className="text-center py-8 text-gray-400 text-xs">
                                No teams added.
                            </div>
                        )}
                    </div>

                    <div className="mt-2 text-[10px] text-gray-400 text-center">
                        Bracket size scales automatically (4, 8, 16, 32)
                    </div>
                </div>

                {/* Generate Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                    <button
                        onClick={onGenerate}
                        className="w-full py-4 bg-neon hover:bg-[#09e661] text-black font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(10,255,108,0.4)] active:scale-[0.98]"
                    >
                        <RefreshCw size={18} strokeWidth={2.5} /> GENERATE BRACKET
                    </button>
                    <p className="text-[10px] text-gray-400 mt-3 text-center opacity-70">
                        Regenerating resets all scores & progress.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BracketsLeftPanel;
