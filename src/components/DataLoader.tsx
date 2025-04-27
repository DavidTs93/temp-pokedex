import React from 'react';
import { GameDataProvider } from '../contexts/GameDataContext';
import { GameData } from '../types/gameData';
import { IAbility, ITypes, IMove, IItem, IPokemonMoves, IPokemonMovesInfo, IPokemon,
  ILocation, IEvolution, IConfig, IGameConfig } from '../types/interfaces';

// Import JSON files directly
import configJson from '../data/config.json';
import gameConfigJson from '../data/game.json';
import abilitiesJson from '../data/abilities.json';
import typesJson from '../data/types.json';
import movesJson from '../data/moves.json';
import itemsJson from '../data/items.json';
import pokemonJson from '../data/pokemon.json';
import pokemonMovesJson from '../data/pokemonMoves.json';
import locationsJson from '../data/locations.json';
import pokemonEvolutionsJson from '../data/pokemonEvolutions.json';

// Type the imported data
const configJsonData: IConfig = configJson;
const gameConfigJsonData: IGameConfig = gameConfigJson;
const abilitiesJsonData: IAbility[] = abilitiesJson;
const typesJsonData: ITypes = typesJson;
const movesJsonData: IMove[] = movesJson;
const itemsJsonData: IItem[] = itemsJson;
const pokemonJsonData: IPokemon[] = pokemonJson;
const pokemonMovesInfoJsonData: IPokemonMovesInfo[] = pokemonMovesJson;
const locationsJsonData: ILocation[] = locationsJson;
const pokemonEvolutionsJsonData: IEvolution[] = pokemonEvolutionsJson;

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
      pokemonMovesInfoJsonData,
      locationsJsonData,
      pokemonEvolutionsJsonData
    );

    // Set gameData on window for testing
    (window as any).gameData = gameData;

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