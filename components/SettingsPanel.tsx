import React from 'react';
import { Settings } from '../types';
import { Grid3X3, Type } from 'lucide-react';

interface SettingsPanelProps {
  settings: Settings;
  onToggle: (key: keyof Settings) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onToggle }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 transition-colors">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Settings</h3>
      
      <div className="space-y-2">
        {/* Snap to Grid */}
        <button
          onClick={() => onToggle('snapToGrid')}
          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
            settings.snapToGrid 
              ? 'bg-lime-50 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Grid3X3 size={16} />
            <span>Snap to Grid</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.snapToGrid ? 'bg-neon' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${settings.snapToGrid ? 'left-4.5' : 'left-0.5'}`} style={{ left: settings.snapToGrid ? '18px' : '2px' }}></div>
          </div>
        </button>

        {/* Show Names */}
        <button
          onClick={() => onToggle('showNames')}
          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
            settings.showNames 
              ? 'bg-lime-50 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Type size={16} />
            <span>Show Names</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${settings.showNames ? 'bg-neon' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform`} style={{ left: settings.showNames ? '18px' : '2px' }}></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;