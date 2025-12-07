import { useState, useCallback, useEffect } from 'react';
import { Player, Sport, Settings } from '../types';
import { generateInitialPlayers } from '../config/sportsConfig';
import { alignFormation, distributePlayers } from '../utils/layoutUtils';

export const useLineup = () => {
  const [sport, setSport] = useState<Sport>('football');
  const [players, setPlayers] = useState<Player[]>(() => generateInitialPlayers('football'));
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [formation, setFormation] = useState('4-4-2');
  
  const [settings, setSettings] = useState<Settings>({
    snapToGrid: false,
    showNames: true
  });

  // Initial formation effect for football
  useEffect(() => {
    if (sport === 'football') {
        setPlayers(prev => alignFormation(prev, formation, 'football'));
    }
  }, [formation, sport]);

  const handleSportChange = useCallback((newSport: Sport) => {
    setSport(prev => {
        if (prev === newSport) return prev;
        setPlayers(generateInitialPlayers(newSport));
        setSelectedPlayerId(null);
        if (newSport === 'football') {
            setFormation('4-4-2');
        }
        return newSport;
    });
  }, []);

  const handleAutoAlign = useCallback(() => {
    setPlayers(prev => {
        if (sport === 'football') {
            return alignFormation(prev, formation, 'football');
        } else {
            return distributePlayers(prev, 'cricket');
        }
    });
  }, [sport, formation]);

  const updatePlayer = useCallback((id: string, field: keyof Player, value: any) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }, []);

  const movePlayer = useCallback((id: string, x: number, y: number) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, x, y } : p));
  }, []);

  const addPlayer = useCallback(() => {
    setPlayers(prev => {
        const newId = `${sport}-${Date.now()}`;
        const newPlayer: Player = {
          id: newId,
          name: 'New Player',
          number: `${prev.length + 1}`,
          x: 50,
          y: 50,
          color: '#ffffff',
          shape: 'circle'
        };
        setSelectedPlayerId(newId);
        return [...prev, newPlayer];
    });
  }, [sport]);

  const deletePlayer = useCallback((id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    setSelectedPlayerId(prev => (prev === id ? null : prev));
  }, []);

  const toggleSetting = useCallback((key: keyof Settings) => {
      setSettings(prev => ({...prev, [key]: !prev[key]}));
  }, []);

  return {
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
  };
};