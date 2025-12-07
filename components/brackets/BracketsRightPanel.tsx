import React, { useState } from 'react';
import { BracketMatch, BracketTeam, BracketSettings } from '../../types';
import { Settings, Download, Loader2, Moon, Sun, Zap, Spline, ArrowRightLeft, Trophy, Crown, CheckCircle2 } from 'lucide-react';

interface BracketsRightPanelProps {
    selectedMatch: BracketMatch | undefined;
    teams: BracketTeam[];
    onUpdateMatch: (id: string, data: any) => void;
    settings: BracketSettings;
    setSettings: (s: BracketSettings) => void;
    onExport: (transparent: boolean) => void;
    isExporting: boolean;
}

const BracketsRightPanel: React.FC<BracketsRightPanelProps> = ({
    selectedMatch, teams, onUpdateMatch, settings, setSettings, onExport, isExporting
}) => {

    const teamA = teams.find(t => t.id === selectedMatch?.teamAId);
    const teamB = teams.find(t => t.id === selectedMatch?.teamBId);

    const isNeon = settings.theme === 'neon';

    return (
        <div className="h-full bg-white dark:bg-[#151515] border-l border-gray-200 dark:border-white/10 flex flex-col">

            {/* Match Editor Section */}
            <div className="flex-1 p-5 border-b border-gray-200 dark:border-white/10 overflow-y-auto custom-scrollbar">
                <h2 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Trophy size={16} className="text-neon" /> Match Details
                </h2>

                {selectedMatch ? (
                    <div className="space-y-6">
                        {/* Score Input */}
                        <div className="bg-gray-50 dark:bg-black/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4 text-xs font-bold text-gray-500 uppercase">
                                <span>Team</span>
                                <span>Score</span>
                            </div>

                            {/* Team A */}
                            <div className="flex items-center justify-between gap-4 mb-3">
                                <span className={`flex - 1 truncate font - medium ${selectedMatch.winnerId === teamA?.id ? 'text-neon' : 'text-gray-700 dark:text-gray-300'} `}>
                                    {teamA ? teamA.name : 'TBD'}
                                </span>
                                <input
                                    type="number"
                                    value={selectedMatch.scoreA ?? ''}
                                    onChange={(e) => onUpdateMatch(selectedMatch.id, { scoreA: e.target.value === '' ? null : parseInt(e.target.value) })}
                                    className="w-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-center font-bold text-lg outline-none focus:border-neon"
                                    placeholder="-"
                                />
                            </div>

                            {/* Team B */}
                            <div className="flex items-center justify-between gap-4">
                                <span className={`flex - 1 truncate font - medium ${selectedMatch.winnerId === teamB?.id ? 'text-neon' : 'text-gray-700 dark:text-gray-300'} `}>
                                    {teamB ? teamB.name : 'TBD'}
                                </span>
                                <input
                                    type="number"
                                    value={selectedMatch.scoreB ?? ''}
                                    onChange={(e) => onUpdateMatch(selectedMatch.id, { scoreB: e.target.value === '' ? null : parseInt(e.target.value) })}
                                    className="w-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-center font-bold text-lg outline-none focus:border-neon"
                                    placeholder="-"
                                />
                            </div>
                        </div>

                        {/* Winner Override */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 block">Winner Override</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => onUpdateMatch(selectedMatch.id, { winnerId: teamA?.id })}
                                    disabled={!teamA}
                                    className={`p - 2 rounded border text - xs font - medium truncate ${selectedMatch.winnerId === teamA?.id ? 'bg-neon text-black border-neon' : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500'} `}
                                >
                                    {teamA ? teamA.name : 'TBD'}
                                </button>
                                <button
                                    onClick={() => onUpdateMatch(selectedMatch.id, { winnerId: teamB?.id })}
                                    disabled={!teamB}
                                    className={`p - 2 rounded border text - xs font - medium truncate ${selectedMatch.winnerId === teamB?.id ? 'bg-neon text-black border-neon' : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500'} `}
                                >
                                    {teamB ? teamB.name : 'TBD'}
                                </button>
                            </div>
                            <button
                                onClick={() => onUpdateMatch(selectedMatch.id, { winnerId: null })}
                                className="text-xs text-gray-500 underline mt-2 w-full text-center hover:text-gray-300"
                            >
                                Reset Winner
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 text-sm">
                        Select a match on the bracket to edit scores and results.
                    </div>
                )}
            </div>

            {/* Visual Settings */}
            <div className="p-4 bg-gray-50 dark:bg-black/20">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-4 flex items-center gap-2">
                    <Settings size={14} /> Style
                </h3>

                <div className="space-y-4">
                    <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
                        <button
                            onClick={() => setSettings({ ...settings, theme: 'light' })}
                            className={`flex - 1 py - 1.5 rounded flex items - center justify - center gap - 1 text - xs ${settings.theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-gray-500'} `}
                        >
                            <Sun size={12} /> Light
                        </button>
                        <button
                            onClick={() => setSettings({ ...settings, theme: 'dark' })}
                            className={`flex - 1 py - 1.5 rounded flex items - center justify - center gap - 1 text - xs ${settings.theme === 'dark' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500'} `}
                        >
                            <Moon size={12} /> Dark
                        </button>
                        <button
                            onClick={() => setSettings({ ...settings, theme: 'neon' })}
                            className={`flex - 1 py - 1.5 rounded flex items - center justify - center gap - 1 text - xs ${settings.theme === 'neon' ? 'bg-gray-900 text-neon shadow-sm' : 'text-gray-500'} `}
                        >
                            <Zap size={12} /> Neon
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-600 dark:text-gray-400">Curved Lines</label>
                        <button
                            onClick={() => setSettings({ ...settings, connectorStyle: settings.connectorStyle === 'curved' ? 'straight' : 'curved' })}
                            className={`w - 10 h - 6 rounded - full p - 1 transition - colors ${settings.connectorStyle === 'curved' ? 'bg-neon' : 'bg-gray-700'} `}
                        >
                            <div className={`w - 4 h - 4 rounded - full bg - white shadow transition - transform ${settings.connectorStyle === 'curved' ? 'translate-x-4' : ''} `}></div>
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-600 dark:text-gray-400">Show Seeds</label>
                        <button
                            onClick={() => setSettings({ ...settings, showSeeds: !settings.showSeeds })}
                            className={`w - 10 h - 6 rounded - full p - 1 transition - colors ${settings.showSeeds ? 'bg-neon' : 'bg-gray-700'} `}
                        >
                            <div className={`w - 4 h - 4 rounded - full bg - white shadow transition - transform ${settings.showSeeds ? 'translate-x-4' : ''} `}></div>
                        </button>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => onExport(false)}
                        disabled={isExporting}
                        className="w-full py-2 bg-neon hover:bg-[#09e661] text-black font-bold rounded-lg flex items-center justify-center gap-2 mb-2 disabled:opacity-50"
                    >
                        {isExporting ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />} Export PNG
                    </button>
                    <button
                        onClick={() => onExport(true)}
                        disabled={isExporting}
                        className="w-full py-2 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                    >
                        Transparent BG
                    </button>
                </div>
            </div>

        </div>
    );
};

export default BracketsRightPanel;
