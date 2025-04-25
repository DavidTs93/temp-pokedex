// General

export interface IEquals<T extends IEquals<T>> {
  equals(other: T): boolean;
}

export interface IDataId {
  id: string;
}

export interface IDataName {
  name: string;
}

export interface IDataDescription {
  description: string;
}

export interface IDataLevel {
  level: number;
}

export interface IDataChance {
  chance: number;
}

export interface IDataColor {
  color: string;
}

export interface IDataSpriteUrl {
  spriteUrl: string;
}

// From configs

export interface IMoveCategory extends IDataId, Partial<IDataName> {}

export interface IMoveTarget extends IDataId, Partial<IDataName> {}

export interface IMoveEffectType extends IDataId, Partial<IDataName> {}

export interface IMoveFlag extends IDataId, Partial<IDataName> {}

export interface IItemCategory extends IDataId, Partial<IDataName> {}

export interface IStat extends IDataId, Partial<IDataName> {
  abbreviation?: string;
}

export interface IEggGroup extends IDataId, Partial<IDataName> {}

export interface IEncounterMethod extends IDataId, Partial<IDataName & IDataColor & IDataSpriteUrl> {}

export interface ITime extends IDataId, Partial<IDataName & IDataColor & IDataSpriteUrl> {}

export interface ISeason extends IDataId, Partial<IDataName & IDataColor & IDataSpriteUrl> {}

export interface IRegion extends IDataId, Partial<IDataName> {}

export interface IEvolutionMethod extends IDataId, Partial<IDataName & IDataSpriteUrl> {
  valueType: string;
}

// Ability

export interface IAbility extends IDataId, Partial<IDataName & IDataDescription> {}

// Type

export interface IType extends IDataId, Partial<IDataName & IDataDescription & IDataColor & IDataSpriteUrl> {}

export interface ITypeEffectivenessLevel extends IDataLevel, Partial<IDataColor> {
  multiplier?: string | number;
  immunity?: boolean;
}

// -1 = immune, 0 = 1x, 2 = 2x, 4 = 4x, -2 = ½x, -4 = ¼x, etc.; calculated by addition of levels
export interface ITypeEffectiveness extends IDataLevel {
  attacker: string;
  defender: string;
}

export interface ITypes {
  types: IType[];
  typeEffectivenessLevels: ITypeEffectivenessLevel[];
  typeEffectiveness: ITypeEffectiveness[];
}

// Move

export interface IMove extends IDataId, Partial<IDataName & IDataDescription & IDataSpriteUrl> {
  types: string[];
  category: string;
  pp: number;
  target: string;
  power?: number;
  accuracy?: number;
  priority?: number;
  effectType?: string;
  effectChance?: number;
  flags?: string[];
}

// Item

export interface IItem extends IDataId, Partial<IDataName & IDataDescription & IDataSpriteUrl> {
  category: string;
  itemId?: string;
  move?: string;
}

export interface IMoveItem {
  move: string;
  item: string;
}

// Pokemon

export interface IPokemonLevelUpMove extends IDataLevel {
  move: string;
}

export interface IPokemonMoves {
  levelUp?: IPokemonLevelUpMove[];
  item?: string[];
  tutor?: string[];
  egg?: string[];
}

export interface IPokemonHeldItem extends IDataChance {
  item: string;
}

export interface IPokemonStats {
  [key: string]: number;
}

export interface IPokemon extends Partial<IDataName & IDataSpriteUrl> {
  id: number;
  species: string;
  types: string[];
  abilities: string[];
  stats: IPokemonStats;
  moves?: IPokemonMoves;
  heldItems?: IPokemonHeldItem[];
  eggGroups?: string[];
}

// Location

export interface IPokemonEncounter extends IDataChance {
  pokemon: number | string;
  method: string;
  time?: string;
  season?: string;
}

export interface ILocation extends IDataId, Partial<IDataName & IDataDescription> {
  wilderness: boolean;
  region?: string;
  pokemonEncounters?: IPokemonEncounter[];
  specialEncounters?: (number | string)[];
  items?: string[];
}

// Evolution

export interface IEvolutionComparison {
  first: string | number | boolean;
  operator?: string;
  second?: string | number | boolean;
}

export interface IEvolution {
  pokemon: number | string;
  evolution: number | string;
  requirements: { [key: string]: number | string | boolean | IEvolutionComparison };
}

// Config

export interface IPaginationConfig {
  pokemon: number;
  moves: number;
  items: number;
  locations: number;
  abilities: number;
}

export interface IConfig {
  version: string;
  language: string;
  title: string;
  pageTitle: string;
  pagination: IPaginationConfig;
}

export interface IGameConfig {
  moveCategories: IMoveCategory[];
  itemCategories: IItemCategory[];
  stats: IStat[];
  encounterMethods: IEncounterMethod[];
  moveEffectTypes?: IMoveEffectType[];
  moveTargets?: IMoveTarget[];
  moveFlags?: IMoveFlag[];
  eggGroups?: IEggGroup[];
  times?: ITime[];
  seasons?: ISeason[];
  regions?: IRegion[];
  evolutionMethods?: IEvolutionMethod[];
  namePrefixes?: { [key: string]: string };
  ignore?: { [key: string]: (string | number)[] };
}

// Cache

export interface ICacheId<T extends ICacheId<T>> extends IDataId, IEquals<T> {}