import { IMoveCategory, IMoveTarget, IMoveEffectType, IMoveFlag, IItemCategory, IStat, IEggGroup,
  IEncounterMethod, ITime, ISeason, IRegion, IEvolutionMethod, IAbility, IType,
  ITypeEffectivenessLevel, ITypeEffectiveness, IMove, IItem, IMoveItem, IPokemonLevelUpMove,
  IPokemonMoves, IPokemonMovesInfo, IPokemonHeldItem, IPokemonStats, IPokemon, IPokemonEncounter, ILocation,
  IEvolutionComparison, IEvolution, IPaginationConfig, IConfig, IGameConfig, IById } from "./interfaces";
import { isUndefined, isDefined, isAllDefined, isString, isOptionalString, isNumber, isValidNumber,
  isOptionalValidNumber, isStringOrValidNumber, isOptionalStringOrValidNumber, isBoolean, isOptionalBoolean,
  isStringArray, isOptionalStringArray, isInt, isMapValueType, hasPrefix, noPrefix, normalizeName, isEmpty, isNotEmpty,
  validateNotNegative, validateNotGuaranteed, isEquals, uniqueByEquals } from "../utils/utils";

// From configs

export class MoveCategory {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color?: string,
    public readonly sprite?: string
  ) {}

  equals(other: MoveCategory): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    moveCategory: IMoveCategory,
    prefix?: string
  ): Readonly<MoveCategory> | undefined {
    if (!moveCategory || !isString(moveCategory.id) || !isOptionalString(moveCategory.name) ||
      !isOptionalString(moveCategory.color) || !isOptionalString(moveCategory.sprite)) {
      return undefined;
    }

    const name = normalizeName(moveCategory.name, moveCategory.id, prefix);
    return Object.freeze(new MoveCategory(moveCategory.id, name, moveCategory.color, moveCategory.sprite));
  }
}

export class MoveTarget {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  equals(other: MoveTarget): boolean {
    return this.id === other.id;
  }

  static fromId(
    id: string,
    prefix?: string
  ): Readonly<MoveTarget> {
    const name = normalizeName(undefined, id, prefix);
    return Object.freeze(new MoveTarget(id, name));
  }

  static fromInterface(
    moveTarget: IMoveTarget,
    prefix?: string
  ): Readonly<MoveTarget> | undefined {
    if (!moveTarget ||!isString(moveTarget.id) || !isOptionalString(moveTarget.name)) {
      return undefined;
    }

    const name = normalizeName(moveTarget.name, moveTarget.id, prefix);
    return Object.freeze(new MoveTarget(moveTarget.id, name));
  }
}

export class MoveEffectType {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly ignored: boolean
  ) {}

  equals(other: MoveEffectType): boolean {
    return this.id === other.id;
  }

  static fromId(
    id: string,
    isIgnoredMoveEffectType?: (id: string) => boolean,
    prefix?: string
  ): Readonly<MoveEffectType> {
    const name = normalizeName(undefined, id, prefix);
    return Object.freeze(new MoveEffectType(id, name, !!isIgnoredMoveEffectType?.(id)));
  }

  static fromInterface(
    moveEffectType: IMoveEffectType,
    isIgnoredMoveEffectType?: (id: string) => boolean,
    prefix?: string
  ): Readonly<MoveEffectType> | undefined {
    if (!moveEffectType || !isString(moveEffectType.id) || !isOptionalString(moveEffectType.name)) {
      return undefined;
    }

    const name = normalizeName(moveEffectType.name, moveEffectType.id, prefix);
    return Object.freeze(new MoveEffectType(moveEffectType.id, name, !!isIgnoredMoveEffectType?.(moveEffectType.id)));
  }
}

export class MoveFlag {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  equals(other: MoveFlag): boolean {
    return this.id === other.id;
  }

  static fromId(
    id: string,
    prefix?: string
  ): Readonly<MoveFlag> {
    const name = normalizeName(undefined, id, prefix);
    return Object.freeze(new MoveFlag(id, name));
  }

  static fromInterface(
    moveFlag: IMoveFlag,
    prefix?: string
  ): Readonly<MoveFlag> | undefined {
    if (!moveFlag || !isString(moveFlag.id) || !isOptionalString(moveFlag.name)) {
      return undefined;
    }

    const name = normalizeName(moveFlag.name, moveFlag.id, prefix);
    return Object.freeze(new MoveFlag(moveFlag.id, name));
  }
}

export class ItemCategory {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  equals(other: ItemCategory): boolean {
    return this.id === other.id;
  }

  static fromId(
    id: string,
    prefix?: string
  ): Readonly<MoveFlag> {
    const name = normalizeName(undefined, id, prefix);
    return Object.freeze(new ItemCategory(id, name));
  }

  static fromInterface(
    itemCategory: IItemCategory,
    prefix?: string
  ): Readonly<ItemCategory> | undefined {
    if (!itemCategory || !isString(itemCategory.id) || !isOptionalString(itemCategory.name)) {
      return undefined;
    }

    const name = normalizeName(itemCategory.name, itemCategory.id, prefix);
    return Object.freeze(new ItemCategory(itemCategory.id, name));
  }
}

export class Stat {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly abbreviation: string
  ) {}

  equals(other: Stat): boolean {
    return this.id === other.id;
  }

  private static getAbbreviation(
    abbreviation: string | undefined,
    name: string
  ): string {
    if (isString(abbreviation)) {
      return abbreviation;
    }

    const nameWords = name.split(' ');
    if (nameWords.length === 1) {
      return nameWords[0].slice(0, 3);
    }

    if (nameWords.length === 2) {
      return nameWords[0].slice(0, 2) + nameWords[1].slice(0, 1);
    }

    return nameWords.map(word => word[0]).join('');
  }

  static fromInterface(
    stat: IStat,
    prefix?: string
  ): Readonly<Stat> | undefined {
    if (!stat || !isString(stat.id) || !isOptionalString(stat.name) || !isOptionalString(stat.abbreviation)) {
      return undefined;
    }

    const name = normalizeName(stat.name, stat.id, prefix);
    const abbreviation = Stat.getAbbreviation(stat.abbreviation, name);
    return Object.freeze(new Stat(stat.id, name, abbreviation));
  }
}

export class EggGroup {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  equals(other: EggGroup): boolean {
    return this.id === other.id;
  }

  static fromId(
    id: string,
    prefix?: string
  ): Readonly<EggGroup> {
    const name = normalizeName(undefined, id, prefix);
    return Object.freeze(new EggGroup(id, name));
  }

  static fromInterface(
    eggGroup: IEggGroup,
    prefix?: string
  ): Readonly<EggGroup> | undefined {
    if (!eggGroup || !isString(eggGroup.id) || !isOptionalString(eggGroup.name)) {
      return undefined;
    }

    const name = normalizeName(eggGroup.name, eggGroup.id, prefix);
    return Object.freeze(new EggGroup(eggGroup.id, name));
  }
}

export class EncounterMethod {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color?: string,
    public readonly sprite?: string
  ) {}

  equals(other: EncounterMethod): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    encounterMethod: IEncounterMethod,
    prefix?: string
  ): Readonly<EncounterMethod> | undefined {
    if (!encounterMethod || !isString(encounterMethod.id) || !isOptionalString(encounterMethod.name) ||
      !isOptionalString(encounterMethod.color) || !isOptionalString(encounterMethod.sprite)) {
      return undefined;
    }

    const name = normalizeName(encounterMethod.name, encounterMethod.id, prefix);
    return Object.freeze(new EncounterMethod(encounterMethod.id, name, encounterMethod.color, encounterMethod.sprite));
  }
}

export class Time {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color?: string,
    public readonly sprite?: string
  ) {}

  equals(other: Time): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    time: ITime,
    prefix?: string
  ): Readonly<Time> | undefined {
    if (!time || !isString(time.id) || !isOptionalString(time.name) ||
      !isOptionalString(time.color) || !isOptionalString(time.sprite)) {
      return undefined;
    }

    const name = normalizeName(time.name, time.id, prefix);
    return Object.freeze(new Time(time.id, name, time.color, time.sprite));
  }
}

export class Season {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color?: string,
    public readonly sprite?: string
  ) {}

  equals(other: Season): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    season: ISeason,
    prefix?: string
  ): Readonly<Season> | undefined {
    if (!season || !isString(season.id) || !isOptionalString(season.name) ||
      !isOptionalString(season.color) || !isOptionalString(season.sprite)) {
      return undefined;
    }

    const name = normalizeName(season.name, season.id, prefix);
    return Object.freeze(new Season(season.id, name, season.color, season.sprite));
  }
}

export class Region {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  equals(other: Region): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    region: IRegion,
    prefix?: string
  ): Readonly<Region> | undefined {
    if (!region || !isString(region.id) || !isOptionalString(region.name)) {
      return undefined;
    }

    const name = normalizeName(region.name, region.id, prefix);
    return Object.freeze(new Region(region.id, name));
  }
}

export class EvolutionMethod {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly valueTypes: readonly ((obj: any) => EvolutionComparison | undefined)[],
    public readonly sprite?: string
  ) {
    this.valueTypes = Object.freeze(valueTypes);
  }

  equals(other: EvolutionMethod): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    evolutionMethod: IEvolutionMethod,
    prefix?: string
  ): Readonly<EvolutionMethod> | undefined {
    if (!evolutionMethod || !isString(evolutionMethod.id) || !isOptionalString(evolutionMethod.name) ||
      !isString(evolutionMethod.valueType) || !isOptionalString(evolutionMethod.sprite)) {
      return undefined;
    }

    const valueTypes = [...new Set(evolutionMethod.valueType.split('|').map(v => v.trim().toLowerCase()).map(v => {
      switch (v) {
        case "compare":
        case "comparison":
          return EvolutionComparison.fromInterface;
        case "number":
          return EvolutionComparison.fromNumber;
        case "string":
          return EvolutionComparison.fromString;
        case "boolean":
          return EvolutionComparison.fromBoolean;
        default:
          return undefined;
      }
    }))];
    if (isEmpty(valueTypes) || !isAllDefined(valueTypes)) {
      return undefined;
    }

    const name = normalizeName(evolutionMethod.name, evolutionMethod.id, prefix);
    return Object.freeze(new EvolutionMethod(evolutionMethod.id, name, valueTypes, evolutionMethod.sprite));
  }
}

// Ability

export class Ability {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly ignored: boolean,
    public readonly description?: string
  ) {}

  equals(other: Ability): boolean {
    return this.id === other.id;
  }

  static fromId(
    id: string,
    isIgnoredAbility?: (id: string) => boolean,
    prefix?: string
  ): Readonly<Ability> | undefined {
    const name = normalizeName(undefined, id, prefix);
    return Object.freeze(new Ability(id, name, !!isIgnoredAbility?.(id)));
  }

  static fromInterface(
    ability: IAbility,
    isIgnoredAbility?: (id: string) => boolean,
    prefix?: string
  ): Readonly<Ability> | undefined {
    if (!ability || !isString(ability.id) || !isOptionalString(ability.name) ||
      !isOptionalString(ability.description)) {
      return undefined;
    }

    const name = normalizeName(ability.name, ability.id, prefix);
    const ignored = !!isIgnoredAbility?.(ability.id);
    return Object.freeze(new Ability(ability.id, name, ignored, ability.description));
  }
}

// Type

export class Type {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly color?: string,
    public readonly sprite?: string
  ) {}

  equals(other: Type): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    type: IType,
    prefix?: string
  ): Readonly<Type> | undefined {
    if (!type || !isString(type.id) || !isOptionalString(type.name) ||
      !isOptionalString(type.color) || !isOptionalString(type.sprite)) {
      return undefined;
    }

    const name = normalizeName(type.name, type.id, prefix);
    return Object.freeze(new Type(type.id, name, type.color, type.sprite));
  }
}

export class TypeEffectivenessLevel {
  private constructor(
    public readonly level: number,
    public readonly multiplier: string,
    public readonly immunity: boolean,
    public readonly color?: string
  ) {}

  equals(other: TypeEffectivenessLevel): boolean {
    return this.level === other.level;
  }

  private static getMultiplier(
    multiplier: string | number | undefined,
    isImmunity: boolean,
    level: number
  ): string {
    if (isString(multiplier)) {
      return multiplier;
    }

    if (isValidNumber(multiplier)) {
      return multiplier.toString();
    }

    if (isImmunity) {
      return "0";
    }

    return level === 0 ? "1" : level.toString();
  }

  static fromInterface(
    typeEffectivenessLevel: ITypeEffectivenessLevel
  ): Readonly<TypeEffectivenessLevel> | undefined {
    if (!typeEffectivenessLevel || !isInt(typeEffectivenessLevel.level) ||
      !isOptionalStringOrValidNumber(typeEffectivenessLevel.multiplier) ||
      !isOptionalBoolean(typeEffectivenessLevel.immunity) || !isOptionalString(typeEffectivenessLevel.color)) {
      return undefined;
    }

    const isImmunity = typeEffectivenessLevel.immunity === true;
    const multiplier = TypeEffectivenessLevel.getMultiplier(typeEffectivenessLevel.multiplier,
      isImmunity, typeEffectivenessLevel.level);
    return Object.freeze(new TypeEffectivenessLevel(typeEffectivenessLevel.level, multiplier,
      isImmunity, typeEffectivenessLevel.color));
  }
}

export class TypeEffectiveness {
  private constructor(
    public readonly attacker: Readonly<Type>,
    public readonly defender: Readonly<Type>,
    public readonly level: Readonly<TypeEffectivenessLevel>
  ) {
    this.attacker = Object.freeze(attacker);
    this.defender = Object.freeze(defender);
    this.level = Object.freeze(level);
  }

  equals(other: TypeEffectiveness): boolean {
    return this.attacker.equals(other.attacker) && this.defender.equals(other.defender);
  }

  static fromInterface(
    typeEffectiveness: ITypeEffectiveness,
    findType: (id: string) => Type | undefined,
    findTel: (level: number) => Readonly<TypeEffectivenessLevel> | undefined
  ): Readonly<TypeEffectiveness> | undefined {
    if (!typeEffectiveness || !findType || !findTel || !isString(typeEffectiveness.attacker) ||
      !isString(typeEffectiveness.defender) || !isValidNumber(typeEffectiveness.level)) {
      return undefined;
    }

    const attacker = findType(typeEffectiveness.attacker);
    const defender = findType(typeEffectiveness.defender);
    const tel = findTel(typeEffectiveness.level);
    if (!attacker || !defender || !tel) {
      return undefined;
    }

    return Object.freeze(new TypeEffectiveness(attacker, defender, tel));
  }

  calculateDefensiveEffectiveness(
    defender: readonly Type[],
    getTel: (attacker: Type, defender: Type) => TypeEffectivenessLevel | undefined,
    findTel: (level: number) => TypeEffectivenessLevel | undefined
  ): Readonly<TypeEffectivenessLevel> | undefined {
    return Object.freeze(TypeEffectiveness.calculateDefensiveEffectiveness([this.attacker], defender, getTel, findTel));
  }

  static calculateDefensiveEffectiveness(
    attacker: readonly Type[],
    defender: readonly Type[],
    getTel: (attacker: Type, defender: Type) => TypeEffectivenessLevel | undefined,
    findTel: (level: number) => TypeEffectivenessLevel | undefined
  ): Readonly<TypeEffectivenessLevel> | undefined {
    if (isEmpty(attacker) || isEmpty(defender)) {
      return undefined;
    }

    attacker = uniqueByEquals(attacker);
    defender = uniqueByEquals(defender);
    const effectivenesLevels: Readonly<TypeEffectivenessLevel>[] = [];
    attacker.forEach(att => {
      defender.forEach(def => {
        const tel = getTel(att, def);
        if (!tel) {
          return undefined;
        }

        if (tel.immunity) {
          return tel;
        }

        effectivenesLevels.push(tel);
      });
    });

    const finalLevel = effectivenesLevels.reduce((sum, effectiveness) => sum + effectiveness.level, 0);
    return Object.freeze(findTel(finalLevel));
  }
}

// Move

export class MoveEffect {
  static readonly GUARANTEED_CHANCE: number = 101;

  private constructor(
    public readonly effectType: Readonly<MoveEffectType>,
    public readonly chance: number
  ) {
    this.effectType = Object.freeze(effectType);
  }

  isGuaranteed(): boolean {
    return this.chance === MoveEffect.GUARANTEED_CHANCE;
  }

  equals(other: MoveEffect): boolean {
    return this.effectType.equals(other.effectType) && this.chance === other.chance;
  }

  static fromInterface(
    moveEffectType: string,
    moveEffectChance: number | undefined,
    findMet: (id: string) => MoveEffectType | undefined
  ): Readonly<MoveEffect> | undefined {
    if (!isString(moveEffectType) || !isOptionalValidNumber(moveEffectChance) || !findMet) {
      return undefined;
    }

    const effectType = findMet(moveEffectType);
    if (!effectType) {
      return undefined;
    }

    const chance = validateNotGuaranteed(moveEffectChance) ?? MoveEffect.GUARANTEED_CHANCE;
    return Object.freeze(new MoveEffect(effectType, chance));
  }
}

export class Move {
  static readonly GUARANTEED_ACCURACY: number = 101;
  private static readonly DEFAULT_PRIORITY: number = 0;

  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly types: readonly Readonly<Type>[], // not empty, unique
    public readonly accuracy: number,
    public readonly priority: number,
    public readonly pp: number,
    public readonly target: Readonly<MoveTarget>,
    public readonly ignored: boolean,
    public readonly category?: Readonly<MoveCategory>,
    public readonly power?: number,
    public readonly effect?: Readonly<MoveEffect>,
    public readonly flags?: readonly Readonly<MoveFlag>[], // not empty, unique
    public readonly description?: string,
    public readonly sprite?: string
  ) {
    this.types = Object.freeze(types);
    this.category = Object.freeze(category);
    this.target = Object.freeze(target);
    this.effect = Object.freeze(effect);
    this.flags = Object.freeze(flags);
  }

  isGuaranteed(): boolean {
    return this.accuracy === Move.GUARANTEED_ACCURACY;
  }

  equals(other: Move): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    move: IMove,
    findType: (id: string) => Type | undefined,
    findMet: (id: string) => MoveEffectType | undefined,
    findMt: (id: string) => MoveTarget | undefined,
    findMf: (id: string) => MoveFlag | undefined,
    findMc?: (id: string) => MoveCategory | undefined,
    isIgnoredMove?: (id: string) => boolean,
    prefix?: string
  ): Readonly<Move> | undefined {
    if (!move || !findType || !findMet || !findMt || !findMf || !isString(move.id) ||
      !isOptionalString(move.name) || !isStringArray(move.types) || !isString(move.category) ||
      !isOptionalValidNumber(move.accuracy) || !isOptionalValidNumber(move.priority) ||
      !isInt(move.pp) || move.pp < 0 || !isString(move.target) || !isOptionalValidNumber(move.power) ||
      !isOptionalString(move.effectType) || !isOptionalValidNumber(move.effectChance) ||
      !isOptionalStringArray(move.flags) || !isOptionalString(move.description) || !isOptionalString(move.sprite)) {
      return undefined;
    }

    const types = move.types.map(findType);
    const category = findMc?.(move.category);
    const target = findMt(move.target);
    const effect = isString(move.effectType) ?
      MoveEffect.fromInterface(move.effectType, move.effectChance, findMet) : undefined;
    const flags = move.flags?.map(findMf);
    if (!isAllDefined(types) || isEmpty(types) || (findMc && !category) || !target || (flags && !isAllDefined(flags))) {
      return undefined;
    }

    const name = normalizeName(move.name, move.id, prefix);
    const ut = uniqueByEquals(types);
    const accuracy = validateNotGuaranteed(move.accuracy) ?? Move.GUARANTEED_ACCURACY;
    const priority = isNumber(move.priority) ? move.priority : Move.DEFAULT_PRIORITY;
    const ignored = !!isIgnoredMove?.(move.id);
    const power = validateNotNegative(move.power);
    const uf = isNotEmpty(flags) ? uniqueByEquals(flags) : undefined;
    return Object.freeze(new Move(move.id, name, ut, accuracy, priority, move.pp, target,
      ignored, category, power, effect, uf, move.description, move.sprite));
  }
}

// Item

export class Item {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly category: Readonly<ItemCategory>,
    public readonly ignored: boolean,
    public readonly possibleMove?: string,
    public readonly description?: string,
    public readonly sprite?: string
  ) {
    this.category = Object.freeze(category);
  }

  equals(other: Item): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    item: IItem,
    findIc: (id: string) => ItemCategory | undefined,
    isIgnoredItem?: (id: string) => boolean,
    prefix?: string,
    itemMovePrefixes?: readonly string[]
  ): Readonly<Item> | undefined {
    if (!item || !findIc || !isString(item.id) || !isOptionalString(item.name) || !isString(item.category) ||
      !isOptionalString(item.itemId) || !isOptionalString(item.move) ||
      !isOptionalString(item.description) || !isOptionalString(item.sprite)) {
      return undefined;
    }

    const category = findIc(item.category);
    if (!category) {
      return undefined;
    }

    const id = item.itemId ?? item.id;
    const name = normalizeName(item.name, id, prefix);
    const ignored = !!isIgnoredItem?.(id);
    const possibleMove = item.move ?? noPrefix(item.id, itemMovePrefixes?.find(prefix => hasPrefix(item.id, prefix)));
    return Object.freeze(new Item(id, name, category, ignored, possibleMove, item.description, item.sprite));
  }
}

// Pokemon

export class PokemonLevelUpMove {
  private constructor(
    public readonly move: Readonly<Move>,
    public readonly level: number
  ) {
    this.move = Object.freeze(move);
  }

  equals(other: PokemonLevelUpMove): boolean {
    return this.move.equals(other.move) && this.level === other.level;
  }

  static fromInterface(
    pokemonLevelUpMove: IPokemonLevelUpMove,
    findMove: (id: string) => Move | undefined
  ): Readonly<PokemonLevelUpMove> | undefined {
    if (!pokemonLevelUpMove || !findMove || !isString(pokemonLevelUpMove.move) || !isInt(pokemonLevelUpMove.level)) {
      return undefined;
    }

    const move = findMove(pokemonLevelUpMove.move);
    if (!move) {
      return undefined;
    }

    const level = validateNotNegative(pokemonLevelUpMove.level) ?? 0;
    return Object.freeze(new PokemonLevelUpMove(move, level));
  }
}

export class PokemonItemMove {
  private constructor(
    public readonly move: Readonly<Move>,
    public readonly item: Readonly<Item>
  ) {
    this.move = Object.freeze(move);
    this.item = Object.freeze(item);
  }

  equals(other: PokemonItemMove): boolean {
    return this.move.equals(other.move) || this.item.equals(other.item);
  }

  static fromInterface(
    pokemonItemMove: string,
    findMove: (id: string) => Move | undefined,
    findMoveItem: (id: Move) => Item | undefined
  ): Readonly<PokemonItemMove> | undefined {
    if (!pokemonItemMove || !findMove || !findMoveItem || !isString(pokemonItemMove)) {
      return undefined;
    }

    const move = findMove(pokemonItemMove);
    if (!move) {
      return undefined;
    }

    const item = findMoveItem(move);
    if (!item) {
      return undefined;
    }

    return Object.freeze(new PokemonItemMove(move, item));
  }
}

export class PokemonMoves {
  private constructor(
    // At least one of the following is defined
    public readonly levelUp?: readonly Readonly<PokemonLevelUpMove>[], // not empty, unique
    public readonly item?: readonly Readonly<PokemonItemMove>[], // not empty, unique
    public readonly tutor?: readonly Readonly<Move>[], // not empty, unique
    public readonly egg?: readonly Readonly<Move>[] // not empty, unique
  ) {
    this.levelUp = Object.freeze(levelUp);
    this.item = Object.freeze(item);
    this.tutor = Object.freeze(tutor);
    this.egg = Object.freeze(egg);
  }

  static fromInterface(
    pokemonMoves: IPokemonMoves,
    findMove: (id: string) => Move | undefined,
    findMoveItem: (id: Move) => Item | undefined
  ): Readonly<PokemonMoves> | undefined {
    if (!pokemonMoves || !findMove || !findMoveItem ||
      !isOptionalStringArray(pokemonMoves.item) || !isOptionalStringArray(pokemonMoves.tutor) ||
      !isOptionalStringArray(pokemonMoves.egg)) {
      return undefined;
    }

    const levelUp = pokemonMoves.levelUp?.map(move => PokemonLevelUpMove.fromInterface(move, findMove));
    const item = pokemonMoves.item?.map(move => PokemonItemMove.fromInterface(move, findMove, findMoveItem));
    const tutor = pokemonMoves.tutor?.map(findMove);
    const egg = pokemonMoves.egg?.map(findMove);
    if ((levelUp && !isAllDefined(levelUp)) || (item && !isAllDefined(item)) ||
      (tutor && !isAllDefined(tutor)) || (egg && !isAllDefined(egg))) {
      return undefined;
    }

    const ulu = isNotEmpty(levelUp) ? uniqueByEquals(levelUp) : undefined;
    const iu = isNotEmpty(item) ? uniqueByEquals(item) : undefined;
    const tu = isNotEmpty(tutor) ? uniqueByEquals(tutor) : undefined;
    const eu = isNotEmpty(egg) ? uniqueByEquals(egg) : undefined;
    if (!ulu && !iu && !tu && !eu) {
      return undefined;
    }

    return Object.freeze(new PokemonMoves(ulu, iu, tu, eu));
  }
}

export class PokemonMovesInfo {
  private constructor(
    // At least one of the following is defined
    public readonly pokemon: number | string,
    public readonly moves: Readonly<PokemonMoves>
  ) {
    this.pokemon = Object.freeze(pokemon);
    this.moves = Object.freeze(moves);
  }

  static fromInterface(
    pokemonMoves: IPokemonMovesInfo,
    findMove: (id: string) => Move | undefined,
    findMoveItem: (id: Move) => Item | undefined
  ): Readonly<PokemonMovesInfo> | undefined {
    if (!isStringOrValidNumber(pokemonMoves.pokemon) || !pokemonMoves.moves) {
      return undefined;
    }

    const pms = PokemonMoves.fromInterface(pokemonMoves.moves, findMove, findMoveItem);
    if (!pms) {
      return undefined;
    }

    return Object.freeze(new PokemonMovesInfo(pokemonMoves.pokemon, pms));
  }
}

export class PokemonHeldItem {
  static readonly DEFAULT_CHANCE: number = 100;

  private constructor(
    public readonly item: Readonly<Item>,
    public readonly chance: number
  ) {
    this.item = Object.freeze(item);
  }

  equals(other: PokemonHeldItem): boolean {
    return this.item.equals(other.item);
  }

  static fromInterface(
    pokemonHeldItem: IPokemonHeldItem,
    findItem: (id: string) => Item | undefined
  ): Readonly<PokemonHeldItem> | undefined {
    if (!pokemonHeldItem || !findItem || !isString(pokemonHeldItem.item) ||
      !isOptionalValidNumber(pokemonHeldItem.chance)) {
      return undefined;
    }

    const item = findItem(pokemonHeldItem.item);
    if (!item) {
      return undefined;
    }

    const chance = validateNotGuaranteed(pokemonHeldItem.chance) ?? PokemonHeldItem.DEFAULT_CHANCE;
    return Object.freeze(new PokemonHeldItem(item, chance));
  }
}

export class PokemonStat {
  private constructor(
    public readonly stat: Readonly<Stat>,
    public readonly value: number
  ) {
    this.stat = Object.freeze(stat);
  }

  equals(other: PokemonStat): boolean {
    return this.stat.equals(other.stat) && this.value === other.value;
  }

  static fromInterface(
    stat: string,
    value: number,
    findStat: (id: string) => Stat | undefined
  ): Readonly<PokemonStat> | undefined {
    if (!isString(stat) || !isValidNumber(value) || value < 0 || !findStat) {
      return undefined;
    }

    const s = findStat(stat);
    if (!s) {
      return undefined;
    }

    return Object.freeze(new PokemonStat(s, value));
  }
}

export class PokemonStats {
  private constructor(
    public readonly stats: Readonly<Cache<PokemonStat>>, // not empty
    public readonly total: number
  ) {
    this.stats = Object.freeze(stats);
  }

  static fromInterface(
    pokemonStats: IPokemonStats,
    findStat: (id: string) => Stat | undefined,
    allStats: readonly Stat[]
  ): Readonly<PokemonStats> | undefined {
    if (!pokemonStats || !findStat || !allStats || !isMapValueType(pokemonStats, isValidNumber)) {
      return undefined;
    }

    const ps: Record<string, Readonly<PokemonStat>> = {};
    Object.entries(pokemonStats).map(([stat, value]) => PokemonStat.fromInterface(stat, value, findStat)).
      filter(isDefined).forEach(s => ps[s.stat.id] = s);
    if (Object.keys(ps).length !== allStats.length) {
      return undefined;
    }

    const total = Object.values(ps).reduce((sum, s) => sum + s.value, 0);
    return Object.freeze(new PokemonStats(Cache.fromMap(ps), total));
  }
}

export class Pokemon {
  private constructor(
    public readonly id: number,
    public readonly species: string,
    public readonly name: string,
    public readonly types: readonly Readonly<Type>[], // not empty, unique
    public readonly abilities: readonly Readonly<Ability>[], // not empty, unique
    public readonly stats: Readonly<PokemonStats>,
    public readonly ignored: boolean,
    public readonly moves?: Readonly<PokemonMoves>,
    public readonly heldItems?: readonly Readonly<PokemonHeldItem>[], // not empty, unique
    public readonly eggGroups?: readonly Readonly<EggGroup>[], // not empty, unique
    public readonly sprite?: string
  ) {
    this.types = Object.freeze(types);
    this.abilities = Object.freeze(abilities);
    this.moves = Object.freeze(moves);
    this.stats = Object.freeze(stats);
    this.heldItems = Object.freeze(heldItems);
    this.eggGroups = Object.freeze(eggGroups);
  }

  equals(other: Pokemon): boolean {
    return this.id === other.id || this.species === other.species;
  }

  static fromInterface(
    pokemon: IPokemon,
    optionalId: number,
    findType: (id: string) => Type | undefined,
    findAbility: (id: string) => Ability | undefined,
    findMoves: (id: number, species: string) => PokemonMoves | undefined,
    findStat: (id: string) => Stat | undefined,
    allStats: readonly Stat[],
    findItem: (id: string) => Item | undefined,
    findEggGroup: (id: string) => EggGroup | undefined,
    isIgnoredPokemon?: (id: number, species: string) => boolean,
    prefix?: string
  ): Readonly<Pokemon> | undefined {
    if (!pokemon || !findType || !findAbility || !findStat || !allStats ||
      !findItem || !findEggGroup || !isString(pokemon.species) || !isOptionalString(pokemon.name) ||
      !isStringArray(pokemon.types) || !isStringArray(pokemon.abilities) ||
      !isOptionalStringArray(pokemon.eggGroups) || !isOptionalString(pokemon.sprite)) {
      return undefined;
    }

    const id = pokemon.id ?? optionalId;
    if (!isInt(id) || id <= 0) {
      return undefined;
    }

    // Number species not supported
    if (isValidNumber(Number(pokemon.species))) {
      return undefined;
    }

    const types = pokemon.types.map(findType);
    const abilities = pokemon.abilities.map(findAbility);
    const moves = findMoves(id, pokemon.species);
    const stats = PokemonStats.fromInterface(pokemon.stats, findStat, allStats);
    const heldItems = pokemon.heldItems?.map(item => PokemonHeldItem.fromInterface(item, findItem));
    const eggGroups = pokemon.eggGroups?.map(findEggGroup);
    if (isEmpty(types) || !isAllDefined(types) || isEmpty(abilities) || !isAllDefined(abilities) ||
      !stats || (heldItems && !isAllDefined(heldItems)) || (eggGroups && !isAllDefined(eggGroups))) {
      return undefined;
    }

    const name = normalizeName(pokemon.name, pokemon.species, prefix);
    const ut = uniqueByEquals(types);
    const ua = uniqueByEquals(abilities);
    const ignored = !!isIgnoredPokemon?.(id, pokemon.species);
    const uhi = heldItems && uniqueByEquals(heldItems);
    const ueg = eggGroups && uniqueByEquals(eggGroups);
    return Object.freeze(new Pokemon(id, pokemon.species, name, ut, ua, stats,
      ignored, moves, uhi, ueg, pokemon.sprite));
  }
}

// Location

export class PokemonEncounter {
  private constructor(
    public readonly pokemon: Readonly<Pokemon>,
    public readonly method: Readonly<EncounterMethod>,
    public readonly chance?: number,
    public readonly time?: Readonly<Time>,
    public readonly season?: Readonly<Season>
  ) {
    this.pokemon = Object.freeze(pokemon);
    this.method = Object.freeze(method);
    this.time = Object.freeze(time);
    this.season = Object.freeze(season);
  }

  equals(other: PokemonEncounter): boolean {
    return this.pokemon.equals(other.pokemon) && this.method.equals(other.method) &&
      isEquals(this.time, other.time) && isEquals(this.season, other.season);
  }

  static fromInterface(
    pokemonEncounter: IPokemonEncounter,
    findPokemon: (id: number | string) => Pokemon | undefined,
    findEncounterMethod: (id: string) => EncounterMethod | undefined,
    findTime: (id: string) => Time | undefined,
    findSeason: (id: string) => Season | undefined
  ): Readonly<PokemonEncounter> | undefined {
    if (!pokemonEncounter || !findPokemon || !findEncounterMethod || !findTime || !findSeason ||
      !isStringOrValidNumber(pokemonEncounter.pokemon) || !isString(pokemonEncounter.method) ||
      (isDefined(pokemonEncounter.chance) && !validateNotGuaranteed(pokemonEncounter.chance)) ||
      !isOptionalString(pokemonEncounter.time) || !isOptionalString(pokemonEncounter.season)) {
      return undefined;
    }

    const pokemon = findPokemon(pokemonEncounter.pokemon);
    const method = findEncounterMethod(pokemonEncounter.method);
    const time = isString(pokemonEncounter.time) ? findTime(pokemonEncounter.time) : undefined;
    const season = isString(pokemonEncounter.season) ? findSeason(pokemonEncounter.season) : undefined;
    if (!pokemon || !method || (isString(pokemonEncounter.time) && !time) ||
      (isString(pokemonEncounter.season) && !season)) {
      return undefined;
    }

    return Object.freeze(new PokemonEncounter(pokemon, method, pokemonEncounter.chance, time, season));
  }
}

export class Location {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly wilderness: boolean,
    public readonly region?: Readonly<Region>,
    public readonly pokemonEncounters?: readonly Readonly<PokemonEncounter>[], // not empty, unique
    public readonly specialEncounters?: readonly Readonly<Pokemon>[], // not empty, unique
    public readonly items?: readonly Readonly<Item>[], // not empty, unique
    public readonly description?: string
  ) {
    this.region = Object.freeze(region);
    this.pokemonEncounters = Object.freeze(pokemonEncounters);
    this.specialEncounters = Object.freeze(specialEncounters);
    this.items = Object.freeze(items);
  }

  equals(other: Location): boolean {
    return this.id === other.id;
  }

  static fromInterface(
    location: ILocation,
    findPokemon: (id: number | string) => Pokemon | undefined,
    findEncounterMethod: (id: string) => EncounterMethod | undefined,
    findTime: (id: string) => Time | undefined,
    findSeason: (id: string) => Season | undefined,
    findRegion: (id: string) => Region | undefined,
    findItem: (id: string) => Item | undefined,
    prefix?: string
  ): Readonly<Location> | undefined {
    if (!location || !findPokemon || !findEncounterMethod || !findTime || !findSeason || !findRegion || !findItem ||
      !isString(location.id) || !isOptionalString(location.name) ||
      !isOptionalBoolean(location.wilderness) || !isOptionalString(location.region) ||
      !isOptionalStringArray(location.items) || !isOptionalString(location.description)) {
      return undefined;
    }

    const name = normalizeName(location.name, location.id, prefix);
    const wilderness = location.wilderness === true;
    const region = isString(location.region) ? findRegion(location.region) : undefined;
    const pokemonEncounters = location.pokemonEncounters?.map(pe =>
      PokemonEncounter.fromInterface(pe, findPokemon, findEncounterMethod, findTime, findSeason));
    const specialEncounters = location.specialEncounters?.map(findPokemon);
    const items = location.items?.map(findItem);
    if ((isString(location.region) && !region) || (pokemonEncounters && !isAllDefined(pokemonEncounters)) ||
      (specialEncounters && !isAllDefined(specialEncounters)) || (items && !isAllDefined(items))) {
      return undefined;
    }

    const upe = isNotEmpty(pokemonEncounters) ? uniqueByEquals(pokemonEncounters) : undefined;
    const use = isNotEmpty(specialEncounters) ? uniqueByEquals(specialEncounters) : undefined;
    const uie = isNotEmpty(items) ? uniqueByEquals(items) : undefined;
    return Object.freeze(new Location(location.id, name, wilderness, region, upe, use, uie, location.description));
  }
}

// Evolution

export class EvolutionComparison {
  static readonly DEFAULT_OPERATOR = "=";

  private constructor(
    public readonly first: string | number | boolean,
    public readonly operator?: string,
    public readonly second?: string | number | boolean
  ) {}

  equals(other: EvolutionComparison): boolean {
    return this.first === other.first && this.operator === other.operator && this.second === other.second;
  }

  static fromNumber(
    num: number
  ): EvolutionComparison | undefined {
    return isValidNumber(num) ? EvolutionComparison.fromInterface({ first: num }) : undefined;
  }

  static fromString(
    str: string
  ): EvolutionComparison | undefined {
    return isString(str) ? EvolutionComparison.fromInterface({ first: str }) : undefined;
  }

  static fromBoolean(
    bool: boolean
  ): EvolutionComparison | undefined {
    return isBoolean(bool) ? EvolutionComparison.fromInterface({ first: bool }) : undefined;
  }

  static fromInterface(
    comparison: IEvolutionComparison
  ): Readonly<EvolutionComparison> | undefined {
    if (!comparison || (!isStringOrValidNumber(comparison.first) && !isBoolean(comparison.first)) ||
      (!isOptionalStringOrValidNumber(comparison.second) && !isOptionalBoolean(comparison.second))) {
      return undefined;
    }

    const operator = comparison.operator ??
      (isString(comparison.second) ? EvolutionComparison.DEFAULT_OPERATOR : undefined);
    return Object.freeze(new EvolutionComparison(comparison.first, operator, comparison.second));
  }
}

export class EvolutionRequirement {
  private constructor(
    public readonly method: Readonly<EvolutionMethod>,
    public readonly value: Readonly<EvolutionComparison>
  ) {
    this.method = Object.freeze(method);
    this.value = Object.freeze(value);
  }

  equals(other: EvolutionRequirement): boolean {
    return this.method.equals(other.method) && this.value.equals(other.value);
  }

  static fromInterface(
    method: string,
    value: any,
    findEvolutionMethod: (id: string) => EvolutionMethod | undefined
  ): Readonly<EvolutionRequirement> | undefined {
    if (!isString(method) || isUndefined(value) || !findEvolutionMethod) {
      return undefined;
    }

    const m = findEvolutionMethod(method);
    if (!m) {
      return undefined;
    }

    const comparison = m.valueTypes.map(cmp => cmp(value)).find(isDefined);
    if (!comparison) {
      return undefined;
    }

    return Object.freeze(new EvolutionRequirement(m, comparison));
  }
}

export class Evolution {
  private constructor(
    public readonly pokemon: Readonly<Pokemon>,
    public readonly evolution: Readonly<Pokemon>,
    public readonly requirements: readonly Readonly<EvolutionRequirement>[]
  ) {
    this.requirements = Object.freeze(requirements);
  }

  equals(other: Evolution): boolean {
    return this.pokemon.equals(other.pokemon) && this.evolution.equals(other.evolution) &&
      this.requirements.every(r => other.requirements.some(r2 => r.equals(r2)));
  }

  static fromInterface(
    evolution: IEvolution,
    findPokemon: (id: number | string) => Pokemon | undefined,
    findEvolutionMethod: (id: string) => EvolutionMethod | undefined
  ): Readonly<Evolution> | undefined {
    if (!evolution || !findPokemon || !findEvolutionMethod || !isStringOrValidNumber(evolution.pokemon) ||
      !isStringOrValidNumber(evolution.evolution) || !isMapValueType(evolution.requirements, isDefined)) {
      return undefined;
    }

    const pokemon = findPokemon(evolution.pokemon);
    const evolutionPokemon = findPokemon(evolution.evolution);
    if (!pokemon || !evolutionPokemon) {
      return undefined;
    }

    const requirements = Object.entries(evolution.requirements).
      map(([key, value]) => EvolutionRequirement.fromInterface(key, value, findEvolutionMethod));
    if (!isAllDefined(requirements)) {
      return undefined;
    }

    return Object.freeze(new Evolution(pokemon, evolutionPokemon, requirements));
  }
}

// Cache

export class Cache<T> {
  private constructor(
    readonly byId: Readonly<Record<string, Readonly<T>>>
  ) {
    this.byId = Object.freeze(byId);
  }

  findById(
    id: string
  ): Readonly<T> | undefined {
    return isString(id) ? this.byId[id.toLowerCase()] : undefined;
  }

  findByIdPrefix(
    prefix: string
  ): Readonly<T>[] {
    if (!isString(prefix)) {
      return [];
    }

    prefix = prefix.toLowerCase();
    return Object.entries(this.byId).filter(([id]) => id.startsWith(prefix)).map(([_, v]) => v);
  }

  static fromMap<T>(
    data: Readonly<Record<string, Readonly<T>>>
  ): Readonly<Cache<T>> {
    const byId: Record<string, Readonly<T>> = {};
    Object.entries(data).filter(([id, d]) => isDefined(id) && isDefined(d)).forEach(([id, d]) => {
      byId[id.toLowerCase()] = Object.freeze(d);
    });

    return Object.freeze(new Cache(byId));
  }
}

export class CacheById<T extends IById<T>> {
  private constructor(
    readonly byId: Readonly<Record<string, Readonly<T>>>
  ) {
    this.byId = Object.freeze(byId);
  }

  findById(
    id: string
  ): Readonly<T> | undefined {
    return isString(id) ? this.byId[id.toLowerCase()] : undefined;
  }

  static fromArray<T extends IById<T>>(
    data: T[]
  ): Readonly<CacheById<T>> {
    const byId: Record<string, Readonly<T>> = {};
    data.forEach(d => {
      byId[d.id.toLowerCase()] = Object.freeze(d);
    });

    return Object.freeze(new CacheById(byId));
  }

  static fromMap<T extends IById<T>>(
    data: Readonly<Record<string, Readonly<T>>>
  ): Readonly<CacheById<T>> {
    const byId: Record<string, Readonly<T>> = {};
    Object.entries(data).forEach(([id, d]) => {
      byId[id.toLowerCase()] = Object.freeze(d);
    });

    return Object.freeze(new CacheById(byId));
  }
}

export class DependantCacheById<T extends IById<T>> {
  private constructor(
    readonly byId: Readonly<Record<string, Readonly<T>>>,
    readonly existingCache: Readonly<CacheById<T>>
  ) {
    this.byId = Object.freeze(byId);
    this.existingCache = Object.freeze(existingCache);
  }

  findById(
    id: string
  ): Readonly<T> | undefined {
    return isString(id) ? this.existingCache.findById(id) ?? this.byId[id.toLowerCase()] : undefined;
  }

  static fromArray<T extends IById<T>>(
    data: T[],
    existingCache: Readonly<CacheById<T>>
  ): Readonly<DependantCacheById<T>> {
    const byId: Record<string, Readonly<T>> = {};
    data.forEach(d => {
      byId[d.id.toLowerCase()] = Object.freeze(d);
    });

    return Object.freeze(new DependantCacheById(byId, existingCache));
  }
}

export class UpdatingCacheById<T extends IById<T>> {
  readonly byId: Record<string, Readonly<T>> = {};

  private constructor(
    readonly create: (id: string) => T | undefined,
    readonly existingCache: Readonly<CacheById<T>>,
    readonly isIgnored?: (id: string) => boolean
  ) {}

  findById(
    id: string
  ): Readonly<T> | undefined {
    if (!isString(id)) {
      return undefined;
    }

    const existing = this.existingCache.findById(id);
    if (isDefined(existing)) {
      return existing;
    }

    if (this.isIgnored?.(id)) {
      return undefined;
    }

    const local = this.byId[id.toLowerCase()];
    if (isDefined(local)) {
      return local;
    }

    const created = this.create(id);
    if (isUndefined(created) || id !== created.id) {
      return undefined;
    }

    this.byId[id.toLowerCase()] = created;
    return created;
  }

  toDependantCacheById(): Readonly<DependantCacheById<T>> {
    return DependantCacheById.fromArray(Object.values(this.byId), this.existingCache);
  }

  static fromData<T extends IById<T>>(
    create: (id: string) => T | undefined,
    existingCache: Readonly<CacheById<T>>,
    isIgnored?: (id: string) => boolean
  ): Readonly<UpdatingCacheById<T>> {
    return Object.freeze(new UpdatingCacheById(create, existingCache, isIgnored));
  }
}

export class TypeEffectivenessLevelCache {
  private constructor(
    readonly byLevel: Readonly<Record<number, Readonly<TypeEffectivenessLevel>>>
  ) {
    this.byLevel = Object.freeze(byLevel);
  }

  findByLevel(
    level: number
  ): Readonly<TypeEffectivenessLevel> | undefined {
    return this.byLevel[level];
  }

  static fromArray(
    typeEffectivenessLevels: readonly TypeEffectivenessLevel[]
  ): Readonly<TypeEffectivenessLevelCache> {
    const byLevel: Record<number, Readonly<TypeEffectivenessLevel>> = {};
    typeEffectivenessLevels.forEach(t => {
      byLevel[t.level] = Object.freeze(t);
    });

    return Object.freeze(new TypeEffectivenessLevelCache(byLevel));
  }
}

export class TypeEffectivenessCache {
  static readonly TYPE_DELIMITER = "|";

  private constructor(
    readonly byADId: Readonly<Record<string, Readonly<TypeEffectiveness>>>,
    readonly defaultTypeEffectivenessLevel: Readonly<TypeEffectivenessLevel> | undefined
  ) {
    this.byADId = Object.freeze(byADId);
  }

  private static getADId(
    attacker: Type,
    defender: Type
  ): string {
    return (attacker.id + TypeEffectivenessCache.TYPE_DELIMITER + defender.id).toLowerCase();
  }

  findByAD(
    attacker: Type,
    defender: Type
  ): Readonly<TypeEffectiveness> | undefined {
    return this.byADId[TypeEffectivenessCache.getADId(attacker, defender)];
  }

  private static selectDefaultTypeEffectivenessLevel(
    findTel: (level: number) => Readonly<TypeEffectivenessLevel> | undefined,
    allTels: readonly TypeEffectivenessLevel[]
  ): Readonly<TypeEffectivenessLevel> | undefined {
    const zero = findTel(0);
    if (isDefined(zero)) {
      return zero;
    }

    return allTels.find(tel => !tel.immunity);
  }

  static fromArray(
    typeEffectiveness: readonly TypeEffectiveness[],
    findTel: (level: number) => Readonly<TypeEffectivenessLevel> | undefined,
    allTels: readonly TypeEffectivenessLevel[]
  ): Readonly<TypeEffectivenessCache> {
    const byADId: Record<string, Readonly<TypeEffectiveness>> = {};
    typeEffectiveness.forEach(t => {
      byADId[TypeEffectivenessCache.getADId(t.attacker, t.defender)] = Object.freeze(t);
    });
    const defaultTel = TypeEffectivenessCache.selectDefaultTypeEffectivenessLevel(findTel, allTels);
    return Object.freeze(new TypeEffectivenessCache(byADId, defaultTel));
  }
}

export class MoveItemCache {
  private constructor(
    readonly byMoveId: Readonly<Record<string, Readonly<Item>>>,
    readonly byItemId: Readonly<Record<string, Readonly<Move>>>
  ) {
    this.byMoveId = Object.freeze(byMoveId);
    this.byItemId = Object.freeze(byItemId);
  }

  findByMove(
    move: Move
  ): Readonly<Item> | undefined {
    return this.byMoveId[move.id.toLowerCase()];
  }

  findByItem(
    item: Item
  ): Readonly<Move> | undefined {
    return this.byItemId[item.id.toLowerCase()];
  }

  static fromArray(
    items: readonly Item[],
    findMove: (id: string) => Move | undefined,
    findItem: (id: string) => Item | undefined,
    moveItems?: readonly IMoveItem[]
  ): Readonly<MoveItemCache> {
    const byMoveId: Record<string, Readonly<Item>> = {};
    const byItemId: Record<string, Readonly<Move>> = {};
    const moveCount: Record<string, number> = {};
    const itemCount: Record<string, number> = {};
    const dmis = moveItems?.filter(mi => mi && isString(mi.move) && isString(mi.item)).
      filter(dmi => findMove(dmi.move) && findItem(dmi.item)).
      map(dmi => ({
        move: dmi.move.toLowerCase(),
        item: dmi.item.toLowerCase()
      }));
    dmis?.forEach(dmi => {
      moveCount[dmi.move] = (moveCount[dmi.move] ?? 0) + 1;
      itemCount[dmi.item] = (itemCount[dmi.item] ?? 0) + 1;
    });

    dmis?.filter(dmi => moveCount[dmi.move] === 1 && itemCount[dmi.item] === 1).forEach(dmi => {
      const move = findMove(dmi.move);
      const item = findItem(dmi.item);
      if (move && item) {
        byMoveId[move.id.toLowerCase()] = item;
        byItemId[item.id.toLowerCase()] = move;
      }
    });

    const pmis = items.filter(item => isString(item.possibleMove)).map(item => {
      const move = findMove(item.possibleMove!);
      return move ? {
        move: move.id.toLowerCase(),
        item: item.id.toLowerCase()
      } : undefined;
    }).filter(isDefined).filter(pmi => !byMoveId[pmi.move] && !byItemId[pmi.item]);
    pmis.forEach(pmi => {
      moveCount[pmi.move] = (moveCount[pmi.move] ?? 0) + 1;
      itemCount[pmi.item] = (itemCount[pmi.item] ?? 0) + 1;
    });

    pmis.filter(pmi => moveCount[pmi.move] === 1 && itemCount[pmi.item] === 1).forEach(pmi => {
      const move = findMove(pmi.move);
      const item = findItem(pmi.item);
      if (move && item) {
        byMoveId[move.id.toLowerCase()] = item;
        byItemId[item.id.toLowerCase()] = move;
      }
    });

    return Object.freeze(new MoveItemCache(byMoveId, byItemId));
  }
}

export class PokemonCache {
  private constructor(
    readonly byId: Readonly<Record<number, Readonly<Pokemon>>>,
    readonly bySpecies: Readonly<Record<string, Readonly<Pokemon>>>
  ) {
    this.byId = Object.freeze(byId);
    this.bySpecies = Object.freeze(bySpecies);
  }

  findByValue(
    value: number | string
  ): Readonly<Pokemon> | undefined {
    if (isValidNumber(value)) {
      return this.findByIdOrSpecies(value);
    }

    if (isString(value)) {
      return this.findByIdOrSpecies(undefined, value);
    }

    return undefined;
  }

  findByIdOrSpecies(
    id?: number,
    species?: string
  ): Readonly<Pokemon> | undefined {
    if (isValidNumber(id)) {
      const pokemon = this.byId[id];
      if (pokemon) {
        return pokemon;
      }
    }

    if (isString(species)) {
      return this.bySpecies[species.toLowerCase()];
    }

    return undefined;
  }

  static fromArray(
    pokemon: Pokemon[]
  ): Readonly<PokemonCache> {
    const byId: Record<number, Readonly<Pokemon>> = {};
    const bySpecies: Record<string, Readonly<Pokemon>> = {};
    pokemon.filter(isDefined).forEach(p => {
      p = Object.freeze(p);
      byId[p.id] = p;
      bySpecies[p.species.toLowerCase()] = p;
    });

    return Object.freeze(new PokemonCache(byId, bySpecies));
  }
}

export class PokemonMovesCache {
  private constructor(
    readonly byId: Readonly<Record<number, Readonly<PokemonMoves>>>,
    readonly bySpecies: Readonly<Record<string, Readonly<PokemonMoves>>>
  ) {
    this.byId = Object.freeze(byId);
    this.bySpecies = Object.freeze(bySpecies);
  }

  findByIdOrSpecies(
    id?: number,
    species?: string
  ): Readonly<PokemonMoves> | undefined {
    if (isValidNumber(id)) {
      const pokemonMoves = this.byId[id];
      if (pokemonMoves) {
        return pokemonMoves;
      }
    }

    if (isString(species)) {
      return this.bySpecies[species.toLowerCase()];
    }

    return undefined;
  }

  static fromArray(
    pokemonMovesInfo: PokemonMovesInfo[]
  ): Readonly<PokemonMovesCache> {
    const byId: Record<number, Readonly<PokemonMoves>> = {};
    const bySpecies: Record<string, Readonly<PokemonMoves>> = {};
    pokemonMovesInfo.filter(isDefined).forEach(pmi => {
      if (isString(pmi.pokemon)) {
        bySpecies[pmi.pokemon.toLowerCase()] = pmi.moves;
      } else {
        byId[pmi.pokemon] = pmi.moves;
      }
    });

    return Object.freeze(new PokemonMovesCache(byId, bySpecies));
  }
}

interface IEvolutionStep {
  pokemon: Pokemon;
  steps: {
    pokemon: Pokemon;
    requirements: readonly EvolutionRequirement[];
  }[];
}

export class EvolutionStep {
  public readonly first: Readonly<EvolutionStep>;

  constructor(
    public readonly pokemon: Readonly<Pokemon>,
    public readonly next: readonly Readonly<EvolutionStep>[], // empty = no more steps
    first: Readonly<EvolutionStep> | undefined
  ) {
    this.first = first ?? this;
  }
}

export class EvolutionCache {
  private constructor(
    public readonly byPokemon: Readonly<Record<number, EvolutionStep>>
  ) {
    this.byPokemon = Object.freeze(byPokemon);
  }

  findByPokemon(
    pokemon: Pokemon
  ): Readonly<EvolutionStep> | undefined {
    return this.byPokemon[pokemon.id];
  }

  private static buildChain(
    byId: Readonly<Record<number, IEvolutionStep>>,
    pokemon: Readonly<Pokemon>,
    first: Readonly<EvolutionStep> | undefined,
    chainIds: readonly number[]
  ): Readonly<EvolutionStep> | undefined {
    if (chainIds.includes(pokemon.id)) {
      return undefined;
    }

    const next: EvolutionStep[] = [];
    const es = new EvolutionStep(pokemon, next, first);
    const info = byId[pokemon.id];
    if (info) {
      info.steps.forEach(s => {
        const step = EvolutionCache.buildChain(byId, s.pokemon, es.first, [...chainIds, pokemon.id]);
        if (!step) {
          return undefined;
        }

        next.push(step);
      });
    }

    Object.freeze(next);
    return Object.freeze(es);
  }

  private static registerEvolutions(
    byPokemon: Record<number, EvolutionStep>,
    step: Readonly<EvolutionStep>
  ) {
    byPokemon[step.pokemon.id] = step;
    step.next?.forEach(n => EvolutionCache.registerEvolutions(byPokemon, n));
  }

  static fromArray(
    evolutions: Evolution[]
  ): Readonly<EvolutionCache> {
    const byId: Record<number, IEvolutionStep> = {};
    const references = new Set<number>();
    for (const evo of evolutions) {
      ((byId[evo.pokemon.id] ??= {
        pokemon: evo.pokemon,
        steps: []
      }).steps ??= []).push({
        pokemon: evo.evolution,
        requirements: evo.requirements
      });
      if (evo.pokemon.id !== evo.evolution.id) {
        references.add(evo.evolution.id);
      }
    }

    const byPokemon: Record<number, EvolutionStep> = {};
    const firsts = [...new Set<number>(Object.keys(byId).map(Number).filter(id => !references.has(id)))];
    firsts.map(id => byId[id].pokemon).map(p => EvolutionCache.buildChain(byId, p, undefined, [])).forEach(e => {
      if (e) {
        EvolutionCache.registerEvolutions(byPokemon, e);
      }
    });
    return Object.freeze(new EvolutionCache(byPokemon));
  }
}

// Config

export class PaginationConfig {
  private constructor(
    public readonly pokemon: number,
    public readonly moves: number,
    public readonly items: number,
    public readonly locations: number,
    public readonly abilities: number
  ) {}

  static fromInterface(
    pc?: IPaginationConfig
  ): Readonly<PaginationConfig> {
    const pokemon = pc?.pokemon ?? 100;
    const moves = pc?.moves ?? 100;
    const items = pc?.items ?? 100;
    const locations = pc?.locations ?? 100;
    const abilities = pc?.abilities ?? 100;
    return Object.freeze(new PaginationConfig(pokemon, moves, items, locations, abilities));
  }
}

export class Config {
  private constructor(
    public readonly version: string,
    public readonly language: string,
    public readonly title: string,
    public readonly pageTitle: string,
    public readonly pagination: Readonly<PaginationConfig>,
    public readonly logo?: string
  ) {}

  static fromInterface(
    c?: IConfig
  ): Readonly<Config> {
    const version = c?.version ?? "1.0.0";
    const language = c?.language ?? "en";
    const title = c?.title ?? "Pokédex";
    const pageTitle = c?.pageTitle ?? "Custom Pokédex";
    const pagination = PaginationConfig.fromInterface(c?.pagination);
    const logo = c?.logo;
    return Object.freeze(new Config(version, language, title, pageTitle, pagination, logo));
  }
}

export class GameConfig {
  private constructor(
    public readonly moveCategories: Readonly<CacheById<MoveCategory>>,
    public readonly moveTargets: Readonly<CacheById<MoveTarget>>,
    public readonly moveEffectTypes: Readonly<CacheById<MoveEffectType>>,
    public readonly moveFlags: Readonly<CacheById<MoveFlag>>,
    public readonly itemCategories: Readonly<CacheById<ItemCategory>>,
    public readonly stats: Readonly<CacheById<Stat>>,
    public readonly eggGroups: Readonly<CacheById<EggGroup>>,
    public readonly encounterMethods: Readonly<CacheById<EncounterMethod>>,
    public readonly times: Readonly<CacheById<Time>>,
    public readonly seasons: Readonly<CacheById<Season>>,
    public readonly regions: Readonly<CacheById<Region>>,
    public readonly evolutionMethods: Readonly<CacheById<EvolutionMethod>>,
    public readonly namePrefixes: Readonly<Cache<string>>,
    public readonly ignore: Readonly<Cache<readonly (string | number)[]>>
  ) {
    this.moveCategories = Object.freeze(moveCategories);
    this.moveTargets = Object.freeze(moveTargets);
    this.moveEffectTypes = Object.freeze(moveEffectTypes);
    this.moveFlags = Object.freeze(moveFlags);
    this.itemCategories = Object.freeze(itemCategories);
    this.stats = Object.freeze(stats);
    this.eggGroups = Object.freeze(eggGroups);
    this.encounterMethods = Object.freeze(encounterMethods);
    this.times = Object.freeze(times);
    this.seasons = Object.freeze(seasons);
    this.regions = Object.freeze(regions);
    this.evolutionMethods = Object.freeze(evolutionMethods);
    this.namePrefixes = Object.freeze(namePrefixes);
    this.ignore = Object.freeze(ignore);
  }

  private static isIgnoredCache(
    ignore: Readonly<Cache<readonly (string | number)[]>>,
    key: string,
    id: string | number
  ): boolean {
    if (!isString(key)) {
      return false;
    }

    if (isValidNumber(id)) {
      return ignore.findById(key)?.includes(id) ?? false;
    }

    if (isString(id)) {
      return ignore.findById(key)?.filter(isString).map(i => i.toLowerCase()).includes(id.toLowerCase()) ?? false;
    }

    return false;
  }

  isIgnored(
    key: string,
    id: string | number
  ): boolean {
    return GameConfig.isIgnoredCache(this.ignore, key, id);
  }

  private static mapFilter<T, V extends IById<V>>(
    map: (t: T, s?: string) => V | undefined,
    data: T[] | undefined,
    namePrefixes: Readonly<Cache<string>>,
    prefixId: string
  ): Readonly<CacheById<V>> {
    return CacheById.fromArray(data?.map(t => map(t, namePrefixes.findById(prefixId))).filter(isDefined) ?? []);
  }

  static fromInterface(
    gc?: IGameConfig
  ): Readonly<GameConfig> {
    const ig = Cache.fromMap(gc?.ignore ?? {});
    const np = Cache.fromMap<string>(gc?.namePrefixes ?? {});
    const mcs = GameConfig.mapFilter(MoveCategory.fromInterface, gc?.moveCategories, np, "move_category");
    const mts = GameConfig.mapFilter(MoveTarget.fromInterface, gc?.moveTargets, np, "move_target");
    const mets = CacheById.fromArray(
      gc?.moveEffectTypes?.map(
        t =>
          MoveEffectType.fromInterface(
            t,
            id => GameConfig.isIgnoredCache(ig, "move_effect_type", id),
            np.findById("move_effect_type")
          )
        ).filter(isDefined) ?? []
    );
    const mfs = GameConfig.mapFilter(MoveFlag.fromInterface, gc?.moveFlags, np, "move_flag");
    const ics = GameConfig.mapFilter(ItemCategory.fromInterface, gc?.itemCategories, np, "item_category");
    const stats = GameConfig.mapFilter(Stat.fromInterface, gc?.stats, np, "stat");
    const egs = GameConfig.mapFilter(EggGroup.fromInterface, gc?.eggGroups, np, "egg_group");
    const enms = GameConfig.mapFilter(EncounterMethod.fromInterface, gc?.encounterMethods, np, "encounter_method");
    const ts = GameConfig.mapFilter(Time.fromInterface, gc?.times, np, "time");
    const seasons = GameConfig.mapFilter(Season.fromInterface, gc?.seasons, np, "season");
    const rs = GameConfig.mapFilter(Region.fromInterface, gc?.regions, np, "region");
    const evms = GameConfig.mapFilter(EvolutionMethod.fromInterface, gc?.evolutionMethods, np, "evolution_method");

    return Object.freeze(new GameConfig(mcs, mts, mets, mfs, ics, stats, egs, enms, ts, seasons, rs, evms, np, ig));
  }
}