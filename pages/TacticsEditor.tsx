
import React, { useRef } from 'react';
import { useTactics } from '../hooks/useTactics';
import TacticsLeftPanel from '../components/tactics/TacticsLeftPanel';
import TacticsRightPanel from '../components/tactics/TacticsRightPanel';
import TacticsCanvas from '../components/tactics/TacticsCanvas';
import TacticsToolbar from '../components/tactics/TacticsToolbar';

const TacticsEditor: React.FC = () => {
  const {
    sport,
    setSport,
    activeTool,
    setActiveTool,
    activeColor,
    setActiveColor,
    currentState,
    undo,
    redo,
    canUndo,
    canRedo,
    addMarker,
    updateMarkerPosition,
    addDrawing,
    updateDrawing,
    removeElement,
    toggleLock,
    clearBoard
  } = useTactics();

  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row bg-gray-100 dark:bg-black overflow-hidden font-sans">
      
      {/* Left Panel */}
      <div className="w-full lg:w-[280px] h-auto lg:h-full shrink-0 z-20 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1A1A1A] shadow-xl lg:shadow-none order-2 lg:order-1">
        <TacticsLeftPanel 
            sport={sport}
            setSport={setSport}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
            onClear={clearBoard}
            canvasRef={canvasRef}
        />
      </div>

      {/* Main Area */}
      <div className="flex-1 h-full relative order-1 lg:order-2">
          <TacticsToolbar 
             activeTool={activeTool} 
             onSelectTool={setActiveTool} 
          />
          <TacticsCanvas 
             state={currentState}
             activeTool={activeTool}
             activeColor={activeColor}
             sport={sport}
             onAddMarker={addMarker}
             onMoveMarker={updateMarkerPosition}
             onAddDrawing={addDrawing}
             onUpdateDrawing={updateDrawing}
             onRemoveElement={removeElement}
             onToggleLock={toggleLock}
             canvasRef={canvasRef}
          />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[280px] h-[30vh] lg:h-full shrink-0 z-20 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1A1A1A] shadow-xl lg:shadow-none order-3">
        <TacticsRightPanel sport={sport} />
      </div>

    </div>
  );
};

export default TacticsEditor;