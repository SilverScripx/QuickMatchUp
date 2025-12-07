import React from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', 
  '#ffff00', '#ff00ff', '#0AFF6C', '#F97316', '#3B82F6'
];

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
              color === c ? 'border-gray-900 dark:border-white scale-110 shadow-md' : 'border-gray-200 dark:border-gray-700'
            }`}
            style={{ backgroundColor: c }}
            aria-label={`Select color ${c}`}
          />
        ))}
        <div className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
           <input 
              type="color" 
              value={color} 
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 m-0 cursor-pointer border-none opacity-0"
           />
           <div className="w-full h-full" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
