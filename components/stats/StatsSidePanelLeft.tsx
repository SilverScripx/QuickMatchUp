
import React, { useRef, useState } from 'react';
import { StatsState, StatsElement, StatsTemplate, StatsCanvasSize } from '../../types';
import { STATS_TEMPLATES } from '../../config/statsTemplates';
import ColorPicker from '../ColorPicker';
import {
    LayoutTemplate, Settings, Palette, Type, Image as ImageIcon,
    Download, Trash2, ArrowUp, ArrowDown, Lock, Unlock,
    Loader2, ChevronDown, ChevronRight, Copy
} from 'lucide-react';
import { exportToPNG } from '../../utils/exportUtils';

interface StatsSidePanelLeftProps {
    state: StatsState;
    selectedId: string | null;
    onUpdateElement: (id: string, updates: Partial<StatsElement>) => void;
    onAddElement: (type: 'text' | 'image') => void;
    onDeleteElement: (id: string) => void;
    onSetBackground: (val: string, type: 'color' | 'gradient') => void;
    onSetSize: (size: StatsCanvasSize) => void;
    onApplyTemplate: (t: StatsTemplate) => void;
    canvasRef: React.RefObject<HTMLDivElement>;
    glowEffect: 'none' | 'neon-blue' | 'neon-green' | 'gold' | 'purple';
    onSetGlowEffect: (effect: 'none' | 'neon-blue' | 'neon-green' | 'gold' | 'purple') => void;
}

const AccordionItem: React.FC<{
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean
}> = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-[#222]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#1a1a1a] transition-colors"
            >
                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                    {icon}
                    {title}
                </div>
                {isOpen ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
            </button>
            {isOpen && (
                <div className="p-4 bg-[#111] animate-in fade-in slide-in-from-top-1 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const StatsSidePanelLeft: React.FC<StatsSidePanelLeftProps> = ({
    state,
    selectedId,
    onUpdateElement,
    onAddElement,
    onDeleteElement,
    onSetBackground,
    onSetSize,
    onApplyTemplate,
    canvasRef,
    glowEffect,
    onSetGlowEffect
}) => {
    const [activeTab, setActiveTab] = useState<'design' | 'templates' | 'settings'>('design');
    const [isExporting, setIsExporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const selectedElement = state.elements.find(e => e.id === selectedId);

    const handleExport = async (transparent: boolean) => {
        if (!canvasRef.current || isExporting) return;
        setIsExporting(true);
        await new Promise(r => setTimeout(r, 200));
        await exportToPNG(canvasRef.current, `quickmatch-stats-${Date.now()}.png`, transparent);
        setIsExporting(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && selectedElement?.type === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateElement(selectedElement.id, { content: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#111] text-gray-300">
            {/* Tabs */}
            <div className="flex border-b border-[#222] bg-[#0a0a0a]">
                <button
                    onClick={() => setActiveTab('design')}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'design' ? 'text-neon border-b-2 border-neon bg-[#151515]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#111]'}`}
                >
                    <div className="flex flex-col items-center gap-1">
                        <Palette size={18} />
                        Design
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'templates' ? 'text-neon border-b-2 border-neon bg-[#151515]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#111]'}`}
                >
                    <div className="flex flex-col items-center gap-1">
                        <LayoutTemplate size={18} />
                        Templates
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'settings' ? 'text-neon border-b-2 border-neon bg-[#151515]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#111]'}`}
                >
                    <div className="flex flex-col items-center gap-1">
                        <Settings size={18} />
                        Export
                    </div>
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">

                {activeTab === 'design' && (
                    <div className="pb-10">
                        {selectedElement ? (
                            <>
                                <div className="p-4 border-b border-[#222] flex items-center justify-between bg-[#151515]">
                                    <span className="text-xs font-bold text-neon uppercase flex items-center gap-2">
                                        {selectedElement.type === 'text' ? <Type size={14} /> : <ImageIcon size={14} />}
                                        {selectedElement.type} Properties
                                    </span>
                                    <div className="flex gap-1">
                                        <button onClick={() => onUpdateElement(selectedElement.id, { locked: !selectedElement.locked })} className={`p-2 rounded-md transition-colors ${selectedElement.locked ? 'bg-red-500/10 text-red-500' : 'hover:bg-[#222] text-gray-500'}`}>
                                            {selectedElement.locked ? <Lock size={14} /> : <Unlock size={14} />}
                                        </button>
                                        <button onClick={() => onDeleteElement(selectedElement.id)} className="p-2 rounded-md hover:bg-red-500/20 text-red-500 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <AccordionItem title="Content & Style" defaultOpen={true} icon={<Palette size={14} />}>
                                    {selectedElement.type === 'text' ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block">Text Content</label>
                                                <textarea
                                                    value={selectedElement.content}
                                                    onChange={e => onUpdateElement(selectedElement.id, { content: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg p-3 text-sm text-white focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none resize-none transition-all placeholder-gray-700"
                                                    rows={3}
                                                    placeholder="Enter text..."
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block">Size (px)</label>
                                                    <input type="number" value={selectedElement.fontSize} onChange={e => onUpdateElement(selectedElement.id, { fontSize: Number(e.target.value) })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg p-2.5 text-sm text-white focus:border-neon outline-none" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block">Weight</label>
                                                    <select value={selectedElement.fontWeight} onChange={e => onUpdateElement(selectedElement.id, { fontWeight: e.target.value })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg p-2.5 text-sm text-white focus:border-neon outline-none appearance-none cursor-pointer">
                                                        <option value="400">Regular</option>
                                                        <option value="600">Semibold</option>
                                                        <option value="800">Bold</option>
                                                        <option value="900">Black</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <ColorPicker label="Text Color" color={selectedElement.color || '#fff'} onChange={c => onUpdateElement(selectedElement.id, { color: c })} />
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-[#222] border border-dashed border-[#444] rounded-xl text-sm font-medium hover:bg-[#2a2a2a] hover:border-neon/50 hover:text-neon transition-all flex flex-col items-center justify-center gap-2 group">
                                                <div className="p-3 bg-neon/10 rounded-full text-neon group-hover:scale-110 transition-transform">
                                                    <ImageIcon size={20} />
                                                </div>
                                                <span>Click to Replace Image</span>
                                            </button>
                                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block">Width</label>
                                                    <div className="relative">
                                                        <input type="number" value={selectedElement.width} onChange={e => onUpdateElement(selectedElement.id, { width: Number(e.target.value) })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg p-2.5 text-sm text-white focus:border-neon outline-none" />
                                                        <span className="absolute right-3 top-2.5 text-gray-600 text-xs font-mono">px</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block">Corner Radius</label>
                                                    <div className="relative">
                                                        <input type="number" value={selectedElement.borderRadius || 0} onChange={e => onUpdateElement(selectedElement.id, { borderRadius: Number(e.target.value) })} className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg p-2.5 text-sm text-white focus:border-neon outline-none" />
                                                        <span className="absolute right-3 top-2.5 text-gray-600 text-xs font-mono">px</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </AccordionItem>

                                <AccordionItem title="Background & Layer" icon={<Settings size={14} />}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block">Fill Color</label>
                                            <div className="flex gap-3 items-center p-2 bg-[#0a0a0a] rounded-lg border border-[#333]">
                                                <input type="color" value={selectedElement.backgroundColor || '#000000'} onChange={e => onUpdateElement(selectedElement.id, { backgroundColor: e.target.value })} className="w-8 h-8 p-0 border-0 rounded-md overflow-hidden cursor-pointer" />
                                                <span className="text-xs font-mono text-gray-400">{selectedElement.backgroundColor || 'None'}</span>
                                                <button onClick={() => onUpdateElement(selectedElement.id, { backgroundColor: undefined })} className="ml-auto text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-500/10">Remove</button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1.5 block">Layer Position</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button onClick={() => onUpdateElement(selectedElement.id, { zIndex: selectedElement.zIndex + 1 })} className="py-2.5 bg-[#222] text-xs font-bold rounded-lg hover:bg-[#333] flex items-center justify-center gap-1 transition-colors"><ArrowUp size={12} /> Bring Forward</button>
                                                <button onClick={() => onUpdateElement(selectedElement.id, { zIndex: Math.max(0, selectedElement.zIndex - 1) })} className="py-2.5 bg-[#222] text-xs font-bold rounded-lg hover:bg-[#333] flex items-center justify-center gap-1 transition-colors"><ArrowDown size={12} /> Send Backward</button>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItem>
                            </>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-[#222] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                                    <Palette size={24} />
                                </div>
                                <h3 className="text-white font-bold text-sm mb-1">No Selection</h3>
                                <p className="text-xs text-gray-500 mb-6 max-w-[200px] mx-auto">Select an element on the canvas to edit styles, or add new items below.</p>

                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => onAddElement('text')} className="py-3 bg-[#222] hover:bg-[#333] border border-[#333] hover:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                                        <div className="p-2 bg-[#151515] rounded-full text-neon group-hover:scale-110 transition-transform">
                                            <Type size={18} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-300">Add Text</span>
                                    </button>
                                    <button onClick={() => onAddElement('image')} className="py-3 bg-[#222] hover:bg-[#333] border border-[#333] hover:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                                        <div className="p-2 bg-[#151515] rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                                            <ImageIcon size={18} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-300">Add Image</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className="p-4 space-y-4">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Available Templates</div>
                        <div className="grid grid-cols-1 gap-3">
                            {STATS_TEMPLATES.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => { if (confirm('Replace current design with template?')) onApplyTemplate(t); }}
                                    className="group relative w-full aspect-video rounded-xl bg-gray-800 overflow-hidden border border-gray-700 hover:border-neon transition-all"
                                >
                                    {/* Mock Preview - in real app would be an img */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black group-hover:scale-105 transition-transform duration-500">
                                        <div className="absolute inset-0 opacity-50" style={{ background: t.background.type === 'color' ? t.background.value : `url(${t.background.value}) center/cover` }}></div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                        <div className="text-sm font-bold text-white group-hover:text-neon transition-colors">{t.name}</div>
                                        <div className="text-[10px] text-gray-400 font-mono">{t.size}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="p-4 space-y-6">
                        {/* Canvas Size */}
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 mb-2.5 block uppercase tracking-widest">Canvas Format</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => onSetSize('portrait')} className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${state.size === 'portrait' ? 'bg-neon/10 text-neon border-neon' : 'bg-[#151515] text-gray-400 border-[#333] hover:border-gray-500'}`}>Portrait</button>
                                <button onClick={() => onSetSize('landscape')} className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${state.size === 'landscape' ? 'bg-neon/10 text-neon border-neon' : 'bg-[#151515] text-gray-400 border-[#333] hover:border-gray-500'}`}>Landscape</button>
                                <button onClick={() => onSetSize('square')} className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${state.size === 'square' ? 'bg-neon/10 text-neon border-neon' : 'bg-[#151515] text-gray-400 border-[#333] hover:border-gray-500'}`}>Square</button>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 mb-2.5 block uppercase tracking-widest">Border Glow</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['none', 'neon-blue', 'neon-green', 'gold', 'purple'] as const).map(effect => (
                                    <button
                                        key={effect}
                                        onClick={() => onSetGlowEffect(effect)}
                                        className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${glowEffect === effect ? 'bg-white text-black border-white' : 'bg-[#151515] text-gray-400 border-[#333] hover:border-gray-500'}`}
                                    >
                                        {effect.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Background */}
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 mb-2.5 block uppercase tracking-widest">Base Background</label>
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                                {['#111111', '#ffffff', '#0f172a', '#3f172a', '#173f2a', '#000000'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => onSetBackground(c, 'color')}
                                        className="w-10 h-10 rounded-full border border-gray-700 shadow-sm shrink-0 transition-transform active:scale-90"
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Export */}
                        <div className="pt-6 mt-6 border-t border-[#222]">
                            <label className="text-[10px] font-bold text-gray-500 mb-2.5 block uppercase tracking-widest">Export Options</label>
                            <button onClick={() => handleExport(false)} disabled={isExporting} className="w-full py-4 bg-neon hover:bg-[#09e661] text-black font-extrabold text-sm uppercase tracking-wide rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2 mb-3 disabled:opacity-50 transition-all">
                                {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                                Save High-Res PNG
                            </button>
                            <button onClick={() => handleExport(true)} disabled={isExporting} className="w-full py-3 bg-[#151515] hover:bg-[#222] border border-[#333] text-gray-400 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wide disabled:opacity-50 transition-colors">
                                Save with Transparent BG
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(StatsSidePanelLeft);
