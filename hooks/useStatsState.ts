
import { useState, useCallback } from 'react';
import { StatsState, StatsElement, StatsTemplate, StatsCanvasSize } from '../types';
import { STATS_TEMPLATES } from '../config/statsTemplates';

const INITIAL_STATE: StatsState = {
    elements: STATS_TEMPLATES[0].elements,
    background: STATS_TEMPLATES[0].background,
    size: STATS_TEMPLATES[0].size
};

export const useStatsState = () => {
    // History Stack
    const [history, setHistory] = useState<StatsState[]>([INITIAL_STATE]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const currentState = history[currentIndex];

    // Helper to push state
    const pushState = useCallback((newState: StatsState) => {
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

    const updateElement = useCallback((id: string, updates: Partial<StatsElement>) => {
        const updatedElements = currentState.elements.map(el => 
            el.id === id ? { ...el, ...updates } : el
        );
        pushState({ ...currentState, elements: updatedElements });
    }, [currentState, pushState]);

    const moveElement = useCallback((id: string, x: number, y: number) => {
        const updatedElements = currentState.elements.map(el => 
            el.id === id ? { ...el, x, y } : el
        );
        // We don't want to push history for every pixel dragged, so typically we handle this differently
        // But for simplicity in this implementation, we will update the current state reference without pushing to history 
        // during drag, and only push on mouse up (not implemented here for simplicity, direct update)
        // Better: Just update directly for now.
        pushState({ ...currentState, elements: updatedElements });
    }, [currentState, pushState]);

    const addElement = useCallback((type: 'text' | 'image') => {
        const newElement: StatsElement = {
            id: `el-${Date.now()}`,
            type,
            content: type === 'text' ? 'New Text' : 'https://placehold.co/200x200',
            x: currentState.size === 'landscape' ? 960 : 540,
            y: currentState.size === 'landscape' ? 540 : 675,
            width: type === 'image' ? 200 : undefined,
            height: type === 'image' ? 200 : undefined,
            fontSize: 40,
            fontWeight: 'bold',
            color: '#fff',
            zIndex: 10,
            textAlign: 'center'
        };
        pushState({ ...currentState, elements: [...currentState.elements, newElement] });
        setSelectedId(newElement.id);
    }, [currentState, pushState]);

    const deleteElement = useCallback((id: string) => {
        pushState({ 
            ...currentState, 
            elements: currentState.elements.filter(e => e.id !== id) 
        });
        setSelectedId(null);
    }, [currentState, pushState]);

    const applyTemplate = useCallback((template: StatsTemplate) => {
        pushState({
            elements: template.elements.map(e => ({ ...e, id: e.id + '-' + Date.now() })), // Unique IDs
            background: template.background,
            size: template.size
        });
        setSelectedId(null);
    }, [pushState]);

    const setBackground = useCallback((value: string, type: 'color' | 'gradient') => {
        pushState({
            ...currentState,
            background: { type, value }
        });
    }, [currentState, pushState]);
    
    const setSize = useCallback((size: StatsCanvasSize) => {
        pushState({ ...currentState, size });
    }, [currentState, pushState]);

    const updateDataByKey = useCallback((key: string, value: string) => {
        // Find elements with this dataKey and update them
        const updatedElements = currentState.elements.map(el => {
            if (el.dataKey === key) {
                return { ...el, content: value };
            }
            return el;
        });
        pushState({ ...currentState, elements: updatedElements });
    }, [currentState, pushState]);

    return {
        currentState,
        selectedId,
        setSelectedId,
        undo,
        redo,
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1,
        updateElement,
        moveElement,
        addElement,
        deleteElement,
        applyTemplate,
        setBackground,
        setSize,
        updateDataByKey
    };
};
