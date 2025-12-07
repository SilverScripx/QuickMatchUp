
import { useState, useCallback, useRef } from 'react';
import { TacticsState, TacticMarker, TacticDrawing, ToolType, Sport } from '../types';

const INITIAL_STATE: TacticsState = {
  markers: [],
  drawings: []
};

export const useTactics = () => {
  // Main State
  const [sport, setSport] = useState<Sport>('football');
  const [activeTool, setActiveTool] = useState<ToolType>('move');
  const [activeColor, setActiveColor] = useState<string>('#0AFF6C');
  
  // History Management
  const [history, setHistory] = useState<TacticsState[]>([INITIAL_STATE]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Derived current state
  const currentState = history[currentIndex];

  // Helper to push state
  const pushState = useCallback((newState: TacticsState) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, newState];
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const redo = useCallback(() => {
    setCurrentIndex(prev => Math.min(history.length - 1, prev + 1));
  }, [history.length]);

  // Actions
  const addMarker = useCallback((type: 'player' | 'cone' | 'ball', x: number, y: number, meta?: { number?: string, label?: string }) => {
    const newMarker: TacticMarker = {
      id: `m-${Date.now()}`,
      type,
      x,
      y,
      color: activeColor,
      number: meta?.number,
      label: meta?.label,
      locked: false
    };

    pushState({
      ...currentState,
      markers: [...currentState.markers, newMarker]
    });
  }, [currentState, activeColor, pushState]);

  const updateMarkerPosition = useCallback((id: string, x: number, y: number) => {
    // Check if locked in current state before moving
    const marker = currentState.markers.find(m => m.id === id);
    if (marker?.locked) return;

    const updatedMarkers = currentState.markers.map(m => 
      m.id === id ? { ...m, x, y } : m
    );
    pushState({ ...currentState, markers: updatedMarkers });
  }, [currentState, pushState]);

  const addDrawing = useCallback((drawing: TacticDrawing) => {
    pushState({
      ...currentState,
      drawings: [...currentState.drawings, { ...drawing, locked: false }]
    });
  }, [currentState, pushState]);

  const updateDrawing = useCallback((id: string, updates: Partial<TacticDrawing>) => {
    const drawing = currentState.drawings.find(d => d.id === id);
    if (drawing?.locked) return;

    const updatedDrawings = currentState.drawings.map(d => 
      d.id === id ? { ...d, ...updates } : d
    );
    pushState({ ...currentState, drawings: updatedDrawings });
  }, [currentState, pushState]);

  const removeElement = useCallback((id: string) => {
    const state = history[currentIndex];
    const marker = state.markers.find(m => m.id === id);
    const drawing = state.drawings.find(d => d.id === id);

    // Prevent deletion if locked
    if (marker?.locked || drawing?.locked) return;

    pushState({
      markers: state.markers.filter(m => m.id !== id),
      drawings: state.drawings.filter(d => d.id !== id)
    });
  }, [history, currentIndex, pushState]);

  const toggleLock = useCallback((id: string) => {
    const state = history[currentIndex];
    const markerExists = state.markers.find(m => m.id === id);
    
    if (markerExists) {
        const updatedMarkers = state.markers.map(m => 
            m.id === id ? { ...m, locked: !m.locked } : m
        );
        pushState({ ...state, markers: updatedMarkers });
        return;
    }

    const drawingExists = state.drawings.find(d => d.id === id);
    if (drawingExists) {
        const updatedDrawings = state.drawings.map(d => 
            d.id === id ? { ...d, locked: !d.locked } : d
        );
        pushState({ ...state, drawings: updatedDrawings });
    }
  }, [history, currentIndex, pushState]);

  const clearBoard = useCallback(() => {
    if (confirm('Clear entire tactics board?')) {
      pushState(INITIAL_STATE);
    }
  }, [pushState]);

  return {
    sport,
    setSport,
    activeTool,
    setActiveTool,
    activeColor,
    setActiveColor,
    currentState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    addMarker,
    updateMarkerPosition,
    addDrawing,
    updateDrawing,
    removeElement,
    toggleLock,
    clearBoard
  };
};