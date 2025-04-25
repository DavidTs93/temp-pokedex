import { isDefined } from "../utils/utils";
import { IAbility, ITypes, IMove, IItem, IMoveItem, IPokemon, ILocation,
  IEvolution, IConfig, IGameConfig } from "./interfaces";
import { MoveTarget, MoveEffectType, MoveFlag, EggGroup, Ability, Type,
  TypeEffectivenessLevel, TypeEffectiveness, Move, Item, Pokemon, Location,
  Evolution, CacheById, DependantCacheById, UpdatingCacheById,
  TypeEffectivenessLevelCache, TypeEffectivenessCache, MoveItemCache,
  PokemonCache, EvolutionCache, Config, GameConfig } from "./classes";

export class GameData {
  public readonly config: Readonly<Config>;
  public readonly gameConfig: Readonly<GameConfig>;
  public readonly abilities: Readonly<CacheById<Readonly<Ability>>>;
  public readonly types: Readonly<CacheById<Readonly<Type>>>;
  public readonly typeEffectivenessLevels: Readonly<TypeEffectivenessLevelCache>;
  public readonly defaultTypeEffectivenessLevel?: Readonly<TypeEffectivenessLevel>;
  public readonly typeEffectiveness: Readonly<TypeEffectivenessCache>;
  public readonly moveEffectTypes: Readonly<DependantCacheById<Readonly<MoveEffectType>>>;
  public readonly moveTargets: Readonly<DependantCacheById<Readonly<MoveTarget>>>;
  public readonly moveFlags: Readonly<DependantCacheById<Readonly<MoveFlag>>>;
  public readonly moves: Readonly<CacheById<Readonly<Move>>>;
  public readonly items: Readonly<CacheById<Readonly<Item>>>;
  public readonly moveItems: Readonly<MoveItemCache>;
  public readonly eggGroups: Readonly<DependantCacheById<Readonly<EggGroup>>>;
  public readonly pokemon: Readonly<PokemonCache>;
  public readonly locations: Readonly<CacheById<Readonly<Location>>>;
  public readonly evolutions: Readonly<EvolutionCache>;

  constructor(
    config?: IConfig,
    gameConfig?: IGameConfig,
    abilities?: IAbility[],
    typesInfo?: ITypes,
    moves?: IMove[],
    items?: IItem[],
    moveItems?: IMoveItem[],
    pokemon?: IPokemon[],
    locations?: ILocation[],
    evolutions?: IEvolution[]
  ) {
    this.config = Config.fromInterface(config);
    this.gameConfig = GameConfig.fromInterface(gameConfig);

    this.abilities = CacheById.fromArray(
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
    this.defaultTypeEffectivenessLevel = this.selectDefaultTypeEffectivenessLevel();
    this.typeEffectiveness = TypeEffectivenessCache.fromArray(
      typesInfo?.typeEffectiveness?.map(
        te => TypeEffectiveness.fromInterface(
          te,
          this.types.findById,
          this.typeEffectivenessLevels.findByLevel
        )
      ).filter(isDefined) ?? []
    );

    const moveEffectTypes = UpdatingCacheById.fromData(
      id => MoveEffectType.fromId(id, this.gameConfig.namePrefixes.findById("move_effect_type")),
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
    this.moves = CacheById.fromArray(
      moves?.map(
        m => Move.fromInterface(
          m,
          this.types.findById,
          this.gameConfig.moveCategories.findById,
          moveEffectTypes.findById,
          moveTargets.findById,
          moveFlags.findById,
          id => this.gameConfig.isIgnored("move", id),
          this.gameConfig.namePrefixes.findById("move")
        )
      ).filter(isDefined) ?? []
    );
    this.moveEffectTypes = moveEffectTypes.toDependantCacheById();
    this.moveTargets = moveTargets.toDependantCacheById();
    this.moveFlags = moveFlags.toDependantCacheById();

    this.items = CacheById.fromArray(
      items?.map(
        i => Item.fromInterface(
          i,
          this.gameConfig.itemCategories.findById,
          id => this.gameConfig.isIgnored("item", id),
          this.gameConfig.namePrefixes.findById("item"),
          this.gameConfig.namePrefixes.findByIdPrefix("item_move_")
        )
      ).filter(isDefined) ?? []
    );
    this.moveItems = MoveItemCache.fromArray(
      Object.values(this.items.byId),
      this.moves.findById,
      this.items.findById,
      moveItems
    );

    const allStats = Object.values(this.gameConfig.stats.byId);
    const eggGroups = UpdatingCacheById.fromData(
      id => EggGroup.fromId(id, this.gameConfig.namePrefixes.findById("egg_group")),
      this.gameConfig.eggGroups
    );
    this.pokemon = PokemonCache.fromArray(
      pokemon?.map(
        p => Pokemon.fromInterface(
          p,
          this.types.findById,
          this.abilities.findById,
          this.gameConfig.stats.findById,
          allStats,
          this.moves.findById,
          this.moveItems.findByMove,
          this.items.findById,
          eggGroups.findById,
          (id, species) => this.gameConfig.isIgnored("pokemon", id) || this.gameConfig.isIgnored("pokemon", species),
          this.gameConfig.namePrefixes.findById("pokemon")
        )
      ).filter(isDefined) ?? []
    );
    this.eggGroups = eggGroups.toDependantCacheById();

    this.locations = CacheById.fromArray(
      locations?.map(
        l => Location.fromInterface(
          l,
          this.pokemon.findByValue,
          this.gameConfig.encounterMethods.findById,
          this.gameConfig.times.findById,
          this.gameConfig.seasons.findById,
          this.gameConfig.regions.findById,
          this.items.findById,
          this.gameConfig.namePrefixes.findById("location")
        )
      ).filter(isDefined) ?? []
    );

    this.evolutions = EvolutionCache.fromArray(
      evolutions?.map(
        e => Evolution.fromInterface(e, this.pokemon.findByValue, this.gameConfig.evolutionMethods.findById)
      ).filter(isDefined) ?? []
    );
  }

  selectDefaultTypeEffectivenessLevel(): Readonly<TypeEffectivenessLevel> | undefined {
    const zero = this.typeEffectivenessLevels.findByLevel(0);
    if (isDefined(zero)) {
      return zero;
    }

    return Object.values(this.typeEffectivenessLevels.byLevel).find(tel => !tel.immunity);
  }

  findTypeEffectivenessLevelsByTypes(attacker: Type, defender: Type): Readonly<TypeEffectivenessLevel> | undefined {
    return this.typeEffectiveness.findByAD(attacker, defender)?.level ?? this.defaultTypeEffectivenessLevel;
  }
}