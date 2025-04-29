import { isDefined, isString, isValidNumber } from "../utils/utils";
import { IAbility, ITypes, IMove, IItem, IPokemonMovesInfo, IMoveItem, IPokemon, ILocation,
  IEvolution, IConfig, IGameConfig } from "./interfaces";
import { MoveTarget, MoveEffectType, MoveFlag, ItemCategory, EggGroup, Ability, Type,
  TypeEffectivenessLevel, TypeEffectiveness, Move, Item, Pokemon, PokemonMoves, PokemonMovesInfo,
  Location, Evolution, CacheById, DependantCacheById, UpdatingCacheById,
  TypeEffectivenessLevelCache, TypeEffectivenessCache, MoveItemCache,
  CacheByIdSpecies, EvolutionCache, Config, GameConfig } from "./classes";

class GameData {
  public readonly config: Readonly<Config>;
  public readonly gameConfig: Readonly<GameConfig>;
  public readonly abilities: Readonly<DependantCacheById<Readonly<Ability>>>;
  public readonly types: Readonly<CacheById<Readonly<Type>>>;
  public readonly typeEffectivenessLevels: Readonly<TypeEffectivenessLevelCache>;
  public readonly typeEffectiveness: Readonly<TypeEffectivenessCache>;
  public readonly moveEffectTypes: Readonly<DependantCacheById<Readonly<MoveEffectType>>>;
  public readonly moveTargets: Readonly<DependantCacheById<Readonly<MoveTarget>>>;
  public readonly moveFlags: Readonly<DependantCacheById<Readonly<MoveFlag>>>;
  public readonly moves: Readonly<CacheById<Readonly<Move>>>;
  public readonly itemCategories: Readonly<DependantCacheById<Readonly<ItemCategory>>>;
  public readonly items: Readonly<CacheById<Readonly<Item>>>;
  public readonly moveItems: Readonly<MoveItemCache>;
  public readonly eggGroups: Readonly<DependantCacheById<Readonly<EggGroup>>>;
  public readonly pokemon: Readonly<CacheByIdSpecies<Readonly<Pokemon>>>;
  public readonly singleHiddenAbility: boolean | undefined;
  public readonly locations: Readonly<CacheById<Readonly<Location>>>;
  public readonly evolutions: Readonly<EvolutionCache>;

  private readPokemon(
    abilitiesCache: Readonly<UpdatingCacheById<Readonly<Ability>>>,
    pokemonMovesCache: Readonly<CacheByIdSpecies<Readonly<PokemonMoves>>>,
    eggGroups: Readonly<UpdatingCacheById<Readonly<EggGroup>>>,
    pokemon?: IPokemon[]
  ): Readonly<Pokemon>[] | undefined {
    if (!pokemon) {
      return undefined;
    }

    const allStats = Object.freeze(Object.values(this.gameConfig.stats.byId));
    const ps = {
      byId: {} as Record<number, Readonly<Pokemon>>,
      bySpecies: {} as Record<string, Readonly<Pokemon>>
    };
    let optionalId = 1;
    for (let i = 0; i < pokemon.length; i++) {
      const pi = pokemon[i];
      const p = Pokemon.fromInterface(
        pi,
        optionalId,
        this.types.findById.bind(this.types),
        abilitiesCache.findById.bind(abilitiesCache),
        pokemonMovesCache.findByIdSpecies.bind(pokemonMovesCache),
        this.gameConfig.stats.findById.bind(this.gameConfig.stats),
        allStats,
        this.items.findById.bind(this.items),
        (id) => CacheByIdSpecies.findByValueMaps(ps, id),
        eggGroups.findById.bind(eggGroups),
        (id, species) => this.gameConfig.isIgnored("pokemon", id) || this.gameConfig.isIgnored("pokemon", species),
        this.gameConfig.namePrefixes.findById("pokemon")
      );
      if (p) {
        ps.byId[p.id] = p;
        ps.bySpecies[p.species] = p;
        optionalId++;
      }
    }
    return Object.values(ps.byId);
  }

  constructor(
    config?: IConfig,
    gameConfig?: IGameConfig,
    abilities?: IAbility[],
    typesInfo?: ITypes,
    moves?: IMove[],
    items?: IItem[],
    moveItems?: IMoveItem[],
    pokemon?: IPokemon[],
    pokemonMoves?: IPokemonMovesInfo[],
    locations?: ILocation[],
    evolutions?: IEvolution[]
  ) {
    this.config = Config.fromInterface(config);
    this.gameConfig = GameConfig.fromInterface(gameConfig);

    const loadedAbilities = CacheById.fromArray(
      abilities?.map(
        a => Ability.fromInterface(
          a,
          id => this.gameConfig.isIgnored("ability", id),
          this.gameConfig.namePrefixes.findById("ability")
        )
      ).filter(isDefined) ?? []
    );

    this.types = CacheById.fromArray(
      typesInfo?.types?.map(
        t => Type.fromInterface(
          t,
          this.gameConfig.namePrefixes.findById("type")
        )
      ).filter(isDefined) ?? []
    );
    this.typeEffectivenessLevels = TypeEffectivenessLevelCache.fromArray(
      typesInfo?.typeEffectivenessLevels?.map(TypeEffectivenessLevel.fromInterface).filter(isDefined) ?? []
    );
    const allTels = Object.freeze(Object.values(this.typeEffectivenessLevels.byLevel));
    this.typeEffectiveness = TypeEffectivenessCache.fromArray(
      typesInfo?.typeEffectiveness?.map(
        te => TypeEffectiveness.fromInterface(
          te,
          this.types.findById.bind(this.types),
          this.typeEffectivenessLevels.findByLevel.bind(this.typeEffectivenessLevels)
        )
      ).filter(isDefined) ?? [],
      this.typeEffectivenessLevels.findByLevel.bind(this.typeEffectivenessLevels),
      allTels
    );

    const moveEffectTypes = UpdatingCacheById.fromData(
      id => MoveEffectType.fromId(
        id,
        id => this.gameConfig.isIgnored("move_effect_type", id),
        this.gameConfig.namePrefixes.findById("move_effect_type")
      ),
      this.gameConfig.moveEffectTypes
    );
    const moveTargets = UpdatingCacheById.fromData(
      id => MoveTarget.fromId(id, this.gameConfig.namePrefixes.findById("move_target")),
      this.gameConfig.moveTargets
    );
    const moveFlags = UpdatingCacheById.fromData(
      id => MoveFlag.fromId(id, this.gameConfig.namePrefixes.findById("move_flag")),
      this.gameConfig.moveFlags
    );
    const useMoveCategories = Object.keys(this.gameConfig.moveCategories.byId).length > 0;
    this.moves = CacheById.fromArray(
      moves?.map(
        m => Move.fromInterface(
          m,
          this.types.findById.bind(this.types),
          moveEffectTypes.findById.bind(moveEffectTypes),
          moveTargets.findById.bind(moveTargets),
          moveFlags.findById.bind(moveFlags),
          useMoveCategories ? this.gameConfig.moveCategories.findById.bind(this.gameConfig.moveCategories) : undefined,
          id => this.gameConfig.isIgnored("move", id),
          this.gameConfig.namePrefixes.findById("move")
        )
      ).filter(isDefined) ?? []
    );
    this.moveEffectTypes = moveEffectTypes.toDependantCacheById();
    this.moveTargets = moveTargets.toDependantCacheById();
    this.moveFlags = moveFlags.toDependantCacheById();

    const itemCategories = UpdatingCacheById.fromData(
      id => ItemCategory.fromId(id, this.gameConfig.namePrefixes.findById("item_category")),
      this.gameConfig.itemCategories
    );
    this.items = CacheById.fromArray(
      items?.map(
        i => Item.fromInterface(
          i,
          itemCategories.findById.bind(itemCategories),
          id => this.gameConfig.isIgnored("item", id),
          this.gameConfig.namePrefixes.findById("item"),
          this.gameConfig.namePrefixes.findByIdPrefix("item_move_")
        )
      ).filter(isDefined) ?? []
    );
    this.itemCategories = itemCategories.toDependantCacheById();
    this.moveItems = MoveItemCache.fromArray(
      Object.values(this.items.byId),
      this.moves.findById.bind(this.moves),
      this.items.findById.bind(this.items),
      moveItems
    );

    const eggGroups = UpdatingCacheById.fromData(
      id => EggGroup.fromId(id, this.gameConfig.namePrefixes.findById("egg_group")),
      this.gameConfig.eggGroups
    );
    const pokemonMovesCache = CacheByIdSpecies.fromArray(
      pokemonMoves?.map(
        pm => PokemonMovesInfo.fromInterface(
          pm,
          this.moves.findById.bind(this.moves),
          this.moveItems.findByMove.bind(this.moveItems))
      ).filter(isDefined) ?? [],
      (pm: PokemonMovesInfo) => isValidNumber(pm.pokemon) ? pm.pokemon : undefined,
      (pm: PokemonMovesInfo) => isString(pm.pokemon) ? pm.pokemon : undefined,
      (pm: PokemonMovesInfo) => pm.moves
    );
    const abilitiesCache = UpdatingCacheById.fromData(
      (id, ignored) => Ability.fromId(
        id,
        ignored,
        this.gameConfig.namePrefixes.findById("ability")
      ),
      loadedAbilities,
      id => this.gameConfig.isIgnored("ability", id)
    );
    this.pokemon = CacheByIdSpecies.fromArray(
      this.readPokemon(abilitiesCache, pokemonMovesCache, eggGroups, pokemon) ?? [],
      (p: Pokemon) => p.id,
      (p: Pokemon) => p.species,
      (p: Pokemon) => p
    );
    this.abilities = abilitiesCache.toDependantCacheById();
    this.eggGroups = eggGroups.toDependantCacheById();
    const maxHiddenAbilities = this.pokemon.values.map(p => p.hiddenAbilities?.length ?? 0).
      reduce((acc, val) => Math.max(acc, val), 0);
    this.singleHiddenAbility = maxHiddenAbilities === 0 ? undefined : maxHiddenAbilities === 1;

    this.locations = CacheById.fromArray(
      locations?.map(
        l => Location.fromInterface(
          l,
          this.pokemon.findByValue.bind(this.pokemon),
          this.gameConfig.encounterMethods.findById.bind(this.gameConfig.encounterMethods),
          this.gameConfig.times.findById.bind(this.gameConfig.times),
          this.gameConfig.seasons.findById.bind(this.gameConfig.seasons),
          this.gameConfig.regions.findById.bind(this.gameConfig.regions),
          this.items.findById.bind(this.items),
          this.gameConfig.namePrefixes.findById("location")
        )
      ).filter(isDefined) ?? []
    );

    if (evolutions) {
      (window as any).evolutions = evolutions.map(
        e => Evolution.fromInterface(
          e,
          this.pokemon.findByValue.bind(this.pokemon),
          this.gameConfig.evolutionMethods.findById.bind(this.gameConfig.evolutionMethods))
      ).filter(isDefined)
    }

    this.evolutions = EvolutionCache.fromArray(
      evolutions?.map(
        e => Evolution.fromInterface(
          e,
          this.pokemon.findByValue.bind(this.pokemon),
          this.gameConfig.evolutionMethods.findById.bind(this.gameConfig.evolutionMethods))
      ).filter(isDefined) ?? []
    );
  }
};

export default GameData;