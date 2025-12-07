
import React from 'react';
import { StatsState } from '../../types';
import { Database, Zap, Type, ImageIcon } from 'lucide-react';

interface StatsSidePanelRightProps {
    state: StatsState;
    selectedId: string | null;
    onUpdateData: (key: string, value: string) => void;
    onSelect: (id: string) => void;
}

const StatsSidePanelRight: React.FC<StatsSidePanelRightProps> = ({
    state,
    selectedId,
    onUpdateData,
    onSelect
}) => {
    // Filter elements that have a dataKey
    const textElements = state.elements.filter(el => el.dataKey && el.type === 'text');
    const imageElements = state.elements.filter(el => el.dataKey && el.type === 'image');

    return (
        <div className="h-full bg-[#111] text-gray-300 flex flex-col">
            <div className="p-5 border-b border-[#222] bg-[#0a0a0a] flex items-center gap-3">
                <div className="bg-neon/10 p-2 rounded-lg text-neon shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    <Zap size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-white text-sm leading-tight tracking-wide uppercase">Quick Data</h2>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">Instant Value Edit</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">

                {/* Text Data Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                        <Type size={12} />
                        <span>Text Elements</span>
                    </div>

                    {textElements.length > 0 ? (
                        <div className="grid gap-3">
                            {textElements.map(el => (
                                <div key={el.id} className="group">
                                    <label className="text-[10px] text-gray-500 font-mono mb-1.5 block ml-1 flex justify-between">
                                        <span>{el.dataKey || 'Text Element'}</span>
                                        {el.dataKey && <span className="text-neon/70">Linked</span>}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={el.content}
                                            onChange={(e) => onUpdateData(el.dataKey || '', e.target.value)}
                                            onFocus={() => onSelect(el.id)}
                                            className="w-full bg-[#151515] border border-[#333] group-hover:border-gray-600 focus:border-neon rounded-lg py-2.5 px-3 text-sm text-white outline-none transition-all shadow-sm focus:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                                            placeholder="Enter text..."
                                        />
                                        {selectedId === el.id && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-neon rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 rounded-xl bg-[#151515]/50 border border-dashed border-[#333] text-center text-xs text-gray-600">
                            No text elements found.
                        </div>
                    )}
                </div>

                {/* Image Data Section */}
                {imageElements.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mt-6 border-t border-[#222] pt-6">
                            <ImageIcon size={12} />
                            <span>Linked Images</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {imageElements.map(el => (
                                <div key={el.id} className="bg-[#151515] p-2 rounded-xl border border-[#333] hover:border-gray-600 transition-colors group relative" onClick={() => onSelect(el.id)}>
                                    <div className="aspect-square bg-[#0a0a0a] rounded-lg overflow-hidden mb-2 relative">
                                        <img src={el.content} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <span className="text-[10px] uppercase font-bold text-white px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/20">Select</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[10px] font-mono text-gray-500 truncate max-w-[80%]">{el.dataKey || 'Image'}</span>
                                        {selectedId === el.id && <div className="w-1.5 h-1.5 bg-neon rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {textElements.length === 0 && imageElements.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-600 space-y-3 opacity-50">
                        <Database size={32} />
                        <div className="text-center text-xs">
                            <p className="font-bold">No Linked Data</p>
                            <p className="mt-1">Add "Data Key" to elements<br />to control them here.</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default StatsSidePanelRight;
