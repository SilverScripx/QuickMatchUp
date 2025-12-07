import React, { useRef, useCallback } from 'react';
import { Player } from '../types';
import { Trash2, Upload, Circle, Square, ChevronRight } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface PlayerFormProps {
    selectedPlayer: Player | undefined;
    onUpdatePlayer: (id: string, field: keyof Player, value: any) => void;
    onDeletePlayer: (id: string) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({
    selectedPlayer,
    onUpdatePlayer,
    onDeletePlayer
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && selectedPlayer) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdatePlayer(selectedPlayer.id, 'image', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [selectedPlayer, onUpdatePlayer]);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedPlayer) onUpdatePlayer(selectedPlayer.id, 'number', e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedPlayer) onUpdatePlayer(selectedPlayer.id, 'name', e.target.value);
    };

    if (!selectedPlayer) {
        return (
            <div className="p-8 border-b border-[#1a1a1a] bg-[#0c0c0c] text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#151515] text-gray-600 mb-3 border border-white/5">
                    <ChevronRight size={20} />
                </div>
                <p className="text-gray-400 text-xs font-medium">Select a player to edit details</p>
            </div>
        );
    }

    return (
        <div className="p-5 border-b border-[#1a1a1a] bg-[#0c0c0c]">
            <div className="flex justify-between items-start mb-5">
                <div className="bg-neon/10 border border-neon/20 px-2 py-1 rounded text-[10px] font-bold text-neon uppercase tracking-wider animate-pulse-glow">
                    Editing #{selectedPlayer.number}
                </div>
                <button
                    onClick={() => onDeletePlayer(selectedPlayer.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                    title="Delete Player"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            <div className="space-y-5">
                {/* Name & Number */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-1 space-y-2">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">No.</label>
                        <input
                            type="text"
                            value={selectedPlayer.number}
                            onChange={handleNumberChange}
                            className="w-full bg-[#151515] border border-white/10 rounded-lg p-2.5 text-center font-bold text-white focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition-all placeholder-gray-700"
                            maxLength={3}
                            placeholder="#"
                        />
                    </div>
                    <div className="col-span-3 space-y-2">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Player Name</label>
                        <input
                            type="text"
                            value={selectedPlayer.name}
                            onChange={handleNameChange}
                            className="w-full bg-[#151515] border border-white/10 rounded-lg p-2.5 font-bold text-white focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition-all placeholder-gray-700"
                            placeholder="Enter Name"
                        />
                    </div>
                </div>

                {/* Style Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <ColorPicker
                        label="Jersey"
                        color={selectedPlayer.color || '#ffffff'}
                        onChange={(c) => onUpdatePlayer(selectedPlayer.id, 'color', c)}
                    />

                    <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Shape</label>
                        <div className="flex bg-[#151515] rounded-lg p-1 border border-white/5">
                            <button
                                onClick={() => onUpdatePlayer(selectedPlayer.id, 'shape', 'circle')}
                                className={`flex-1 flex items-center justify-center py-1.5 rounded-md transition-all ${!selectedPlayer.shape || selectedPlayer.shape === 'circle' ? 'bg-[#222] text-neon shadow-sm' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                <Circle size={14} fill={(!selectedPlayer.shape || selectedPlayer.shape === 'circle') ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={() => onUpdatePlayer(selectedPlayer.id, 'shape', 'square')}
                                className={`flex-1 flex items-center justify-center py-1.5 rounded-md transition-all ${selectedPlayer.shape === 'square' ? 'bg-[#222] text-neon shadow-sm' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                <Square size={14} fill={selectedPlayer.shape === 'square' ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Photo</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 bg-[#151515] border border-dashed border-white/10 rounded-lg p-3 text-xs font-bold text-gray-400 hover:border-neon/50 hover:text-neon hover:bg-neon/5 transition-all flex items-center justify-center gap-2 group"
                        >
                            <Upload size={14} className="group-hover:scale-110 transition-transform" />
                            {selectedPlayer.image ? 'Change Photo' : 'Upload Image'}
                        </button>
                        {selectedPlayer.image && (
                            <button
                                onClick={() => onUpdatePlayer(selectedPlayer.id, 'image', undefined)}
                                className="px-3 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(PlayerForm);
