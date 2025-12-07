import React, { useRef } from 'react';
import { SPORTS_CONFIG } from '../config/sportsConfig';
import { useLineup } from '../hooks/useLineup';

import FieldCanvas from '../components/FieldCanvas';
import SidePanelLeft from '../components/SidePanelLeft';
import SidePanelRight from '../components/SidePanelRight';

const Editor: React.FC = () => {
   const {
      sport,
      players,
      selectedPlayerId,
      formation,
      settings,
      setFormation,
      setSelectedPlayerId,
      handleSportChange,
      handleAutoAlign,
      updatePlayer,
      movePlayer,
      addPlayer,
      deletePlayer,
      toggleSetting
   } = useLineup();

   const canvasRef = useRef<HTMLDivElement>(null);

   return (
      <div className="h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row bg-[#050505] overflow-hidden font-sans text-white transition-colors duration-300">

         {/* Left Panel - Controls */}
         <div className="w-full lg:w-[300px] h-auto lg:h-full shrink-0 z-30 shadow-2xl order-2 lg:order-1 border-r border-[#1a1a1a]">
            <SidePanelLeft
               sport={sport}
               onSportChange={handleSportChange}
               formation={formation}
               onFormationChange={setFormation}
               settings={settings}
               onToggleSetting={toggleSetting}
               onAutoAlign={handleAutoAlign}
               canvasRef={canvasRef}
            />
         </div>

         {/* Center - Canvas Area */}
         <div className="flex-1 h-full relative flex flex-col items-center justify-center p-4 lg:p-12 bg-black order-1 lg:order-2 overflow-hidden">

            {/* Background Mesh/Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Context Label */}
            <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 hidden lg:block shadow-lg">
               <span className="text-[10px] font-bold text-neon uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                  {SPORTS_CONFIG[sport].name} Mode
               </span>
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
               <FieldCanvas
                  sport={sport}
                  players={players}
                  selectedPlayerId={selectedPlayerId}
                  onPlayerSelect={setSelectedPlayerId}
                  onPlayerMove={movePlayer}
                  canvasRef={canvasRef}
                  snapToGrid={settings.snapToGrid}
                  showNames={settings.showNames}
               />
            </div>

            <div className="absolute bottom-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest hidden lg:block opacity-50">
               Drag players to position • Click to Edit
            </div>
         </div>

         {/* Right Panel - Player Editor */}
         <div className="w-full lg:w-[320px] h-[40vh] lg:h-full shrink-0 z-30 shadow-2xl border-t lg:border-t-0 lg:border-l border-[#1a1a1a] order-3 overflow-hidden bg-[#080808]">
            <SidePanelRight
               players={players}
               selectedPlayerId={selectedPlayerId}
               onUpdatePlayer={updatePlayer}
               onAddPlayer={addPlayer}
               onDeletePlayer={deletePlayer}
               onSelect={setSelectedPlayerId}
            />
         </div>

      </div>
   );
};

export default Editor;