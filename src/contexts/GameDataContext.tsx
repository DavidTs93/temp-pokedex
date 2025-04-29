import React, { createContext, useContext } from 'react';
import GameData from '../types/gameData';
import { isUndefined } from '../utils/utils';

interface GameDataContextType {
  gameData: GameData;
  referenceGameData: GameData | undefined;
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

interface GameDataProviderProps {
  children: React.ReactNode;
  gameData: GameData;
  referenceGameData?: GameData;
}

export const GameDataProvider: React.FC<GameDataProviderProps> = ({
  children,
  gameData,
  referenceGameData
}) => {
  return (
    <GameDataContext.Provider value={{ gameData, referenceGameData }}>
      {children}
    </GameDataContext.Provider>
  );
};

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (isUndefined(context)) {
    throw new Error('useGameData must be used within a GameDataProvider');
  }
  return context;
};