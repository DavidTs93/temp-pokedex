import React from 'react';
import { GameDataProvider } from '../contexts/GameDataContext';
import { GameData } from '../types/gameData';
import { IAbility, ITypes, IMove, IItem, IPokemon, ILocation, IEvolution,
  IConfig, IGameConfig } from '../types/interfaces';

// Import JSON files directly
import configJson from '../data/config.json';
import gameConfigJson from '../data/game.json';
import typesJson from '../data/types.json';
import pokemonJson from '../data/pokemon.json';
import movesJson from '../data/moves.json';
import abilitiesJson from '../data/abilities.json';
import itemsJson from '../data/items.json';
import evolutionsJson from '../data/evolutions.json';
import locationsJson from '../data/locations.json';

// Type the imported data
const configJsonData: IConfig = configJson;
const gameConfigJsonData: IGameConfig = gameConfigJson;
const abilitiesJsonData: IAbility[] = abilitiesJson;
const typesJsonData: ITypes = typesJson;
const movesJsonData: IMove[] = movesJson;
const itemsJsonData: IItem[] = itemsJson;
const pokemonJsonData: IPokemon[] = pokemonJson;
const locationsJsonData: ILocation[] = locationsJson;
const evolutionsJsonData: IEvolution[] = evolutionsJson;

export const DataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  try {
    const gameData = new GameData(
      configJsonData,
      gameConfigJsonData,
      abilitiesJsonData,
      typesJsonData,
      movesJsonData,
      itemsJsonData,
      undefined,
      pokemonJsonData,
      locationsJsonData,
      evolutionsJsonData
    );

    return (
      <GameDataProvider gameData={gameData} referenceGameData={undefined}>
        {children}
      </GameDataProvider>
    );
  } catch (err) {
    console.error('Error loading game data:', err);
    return <div className="error">Error: {err instanceof Error ? err.message : 'Failed to load game data'}</div>;
  }
}; 