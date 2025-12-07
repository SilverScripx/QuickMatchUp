
import React, { useRef, useState } from 'react';
import { useBrackets } from '../hooks/useBrackets';
import BracketCanvas from '../components/brackets/BracketCanvas';
import BracketsLeftPanel from '../components/brackets/BracketsLeftPanel';
import BracketsRightPanel from '../components/brackets/BracketsRightPanel';
import { exportToPNG } from '../utils/exportUtils';
import { ZoomIn, ZoomOut } from 'lucide-react';

const BracketsEditor: React.FC = () => {
  const {
    teams,
    tournament,
    selectedMatchId,
    settings,
    setSettings,
    setSelectedMatchId,
    addTeam,
    removeTeam,
    updateTeam,
    regenerateBracket,
    updateTournamentName,
    updateMatch
  } = useBrackets();

  const [zoom, setZoom] = useState(0.8);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedMatch = tournament.rounds
    .flatMap(r => r.matches)
    .find(m => m.id === selectedMatchId);

  const handleExport = async (transparent: boolean) => {
    if (!canvasRef.current || isExporting) return;
    setIsExporting(true);
    // Short delay to let renders settle if any
    await new Promise(r => setTimeout(r, 200));
    const filename = `quickmatch-bracket-v1.5-${tournament.name.replace(/\s+/g, '-')}-${Date.now()}.png`;
    await exportToPNG(canvasRef.current, filename, transparent);
    setIsExporting(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-gray-50 dark:bg-[#0c0c0c]">

      {/* Left Panel - Tournament Settings */}
      <div className="w-full lg:w-[280px] h-auto lg:h-full z-20 shadow-xl shrink-0 order-2 lg:order-1 relative">
        <BracketsLeftPanel
          name={tournament.name}
          setName={updateTournamentName}
          teams={teams}
          onAddTeam={addTeam}
          onRemoveTeam={removeTeam}
          onUpdateTeam={updateTeam}
          onGenerate={regenerateBracket}
          settings={settings}
        />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative flex flex-col overflow-hidden order-1 lg:order-2">
        {/* Toolbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#1A1A1A] border border-white/10 p-1.5 rounded-lg shadow-xl">
          <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="p-2 text-white hover:bg-white/10 rounded"><ZoomOut size={18} /></button>
          <span className="text-xs font-mono text-gray-400 w-12 text-center select-none">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 text-white hover:bg-white/10 rounded"><ZoomIn size={18} /></button>
        </div>

        <BracketCanvas
          tournament={tournament}
          selectedMatchId={selectedMatchId}
          onMatchSelect={setSelectedMatchId}
          settings={settings}
          canvasRef={canvasRef}
          zoom={zoom}
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[300px] h-[30vh] lg:h-full z-20 shadow-xl shrink-0 order-3 border-l border-gray-200 dark:border-gray-800">
        <BracketsRightPanel
          selectedMatch={selectedMatch}
          teams={tournament.teams}
          onUpdateMatch={updateMatch}
          settings={settings}
          setSettings={setSettings}
          onExport={handleExport}
          isExporting={isExporting}
        />
      </div>

    </div>
  );
};

export default BracketsEditor;
