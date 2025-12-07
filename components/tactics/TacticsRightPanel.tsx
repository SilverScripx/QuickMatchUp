import React from 'react';
import { useDrag } from 'react-dnd';
import { MarkerType, Sport } from '../../types';
import { User, Triangle, Circle, GripVertical } from 'lucide-react';

interface TacticsRightPanelProps {
    sport: Sport;
}

// Draggable Item Component
const DraggableLibraryItem: React.FC<{
    type: MarkerType;
    label: string;
    icon: React.ReactNode;
    data?: any;
    color?: string;
}> = ({ type, label, icon, data, color = 'white' }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TACTIC_ITEM',
        item: { type, ...data },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={(node) => { if (node) drag(node); }}
            className={`group flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 dark:bg-black/40 border border-gray-200 dark:border-white/5 cursor-move hover:border-neon/50 hover:bg-white dark:hover:bg-white/5 hover:shadow-lg hover:shadow-neon/5 transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}`}
        >
            {/* Drag Handle */}
            <GripVertical size={14} className="text-gray-300 dark:text-gray-700 group-hover:text-neon" />

            {/* Icon Box */}
            <div
                className="w-8 h-8 flex items-center justify-center rounded-full shadow-inner border border-white/10"
                style={{ backgroundColor: type === 'player' ? color : 'transparent', color: type === 'player' ? '#000' : color }}
            >
                {type === 'player' ? (
                    <span className="font-bold text-xs">{icon}</span>
                ) : (
                    <div style={{ color: color }}>{icon}</div>
                )}
            </div>

            <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-neon transition-colors">{label}</span>
                <span className="text-[10px] font-medium text-gray-400">Drag to pitch</span>
            </div>
        </div>
    );
};

const TacticsRightPanel: React.FC<TacticsRightPanelProps> = ({ sport }) => {
    return (
        <div className="h-full bg-white dark:bg-[#121212] border-l border-gray-200 dark:border-white/10 flex flex-col overflow-y-auto">

            {/* Header */}
            <div className="p-5 border-b border-gray-100 dark:border-white/5">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center justify-between">
                    <span>Library</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                        {sport}
                    </span>
                </h2>
            </div>

            <div className="p-5 space-y-6">

                {/* Markers Section */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 p-4 shadow-sm">
                    <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 block">Equipment</label>
                    <div className="space-y-3">
                        <DraggableLibraryItem
                            type="ball"
                            label="Ball"
                            icon={<Circle fill="currentColor" size={16} />}
                            color="#ffffff"
                        />
                        <DraggableLibraryItem
                            type="cone"
                            label="Training Cone"
                            icon={<Triangle fill="currentColor" size={16} />}
                            color="#F97316"
                        />
                    </div>
                </div>

                {/* Players Section */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 p-4 shadow-sm">
                    <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 block">Lineup Markers</label>

                    {sport === 'football' ? (
                        <div className="space-y-3">
                            <DraggableLibraryItem
                                type="player"
                                label="Goalkeeper"
                                icon="GK"
                                data={{ number: '1', label: 'GK' }}
                                color="#eab308" // Yellow
                            />
                            <DraggableLibraryItem
                                type="player"
                                label="Defender"
                                icon="DF"
                                data={{ number: '4', label: 'DF' }}
                                color="#3b82f6" // Blue
                            />
                            <DraggableLibraryItem
                                type="player"
                                label="Midfielder"
                                icon="MF"
                                data={{ number: '8', label: 'MF' }}
                                color="#22c55e" // Green
                            />
                            <DraggableLibraryItem
                                type="player"
                                label="Forward"
                                icon="FW"
                                data={{ number: '9', label: 'FW' }}
                                color="#ef4444" // Red
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <DraggableLibraryItem
                                type="player"
                                label="Batsman"
                                icon={<User size={16} />}
                                data={{ number: 'BAT', label: '' }}
                                color='#3b82f6'
                            />
                            <DraggableLibraryItem
                                type="player"
                                label="Bowler"
                                icon={<User size={16} />}
                                data={{ number: 'BWL', label: '' }}
                                color='#ef4444'
                            />
                            <DraggableLibraryItem
                                type="player"
                                label="Wicket Keeper"
                                icon={<User size={16} />}
                                data={{ number: 'WK', label: '' }}
                                color='#eab308'
                            />
                        </div>
                    )}
                </div>

                {/* Instructional Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-500/20">
                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                        <span className="block mb-1 font-bold text-blue-800 dark:text-blue-200">Pro Tip:</span>
                        Drag items directly onto the pitch. Uses standard tactical symbols for export.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default TacticsRightPanel;
