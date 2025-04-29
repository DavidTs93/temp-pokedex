import { IEquals } from '../types/interfaces';

export function isUndefined(
  x: any
): x is undefined {
  return x === undefined;
}

export function isDefined<T>(
  x: T | undefined
): x is T {
  return !isUndefined(x);
}

export function isNull(
  x: any
): x is null {
  return x === null;
}

export function isAllDefined<T>(
  arr: (T | undefined)[]
): arr is T[] {
  return !arr.some(isUndefined);
}

// Not null
export function isObject(
  x: any
): x is object {
  return !isNull(x) && typeof x === 'object';
}

export function isFunction(
  x: any
): x is Function {
  return typeof x === 'function';
}

export function isString(
  x: any
): x is string {
  return typeof x === 'string';
}

export function isOptionalString(
  x: any
): x is string | undefined {
  return isUndefined(x) || isString(x);
}

export function isNumber(
  x: any
): x is number {
  return typeof x === 'number';
}

export function isValidNumber(
  x: any
): x is number {
  return isNumber(x) && !isNaN(x) && isFinite(x);
}

export function isOptionalValidNumber(
  x: any
): x is number | undefined {
  return isUndefined(x) || isValidNumber(x);
}

export function isStringOrValidNumber(
  x: any
): x is string | number {
  return isString(x) || isValidNumber(x);
}

export function isOptionalStringOrValidNumber(
  x: any
): x is string | number | undefined {
  return isUndefined(x) || isStringOrValidNumber(x);
}

export function isBoolean(
  x: any
): x is boolean {
  return typeof x === 'boolean';
}

export function isOptionalBoolean(
  x: any
): x is boolean | undefined {
  return isUndefined(x) || isBoolean(x);
}

/**
 * True even if {@link arr} is undefined
 */
export function isEmpty<T>(
  arr: readonly T[] | undefined
): boolean {
  return isUndefined(arr) || arr.length === 0;
}

/**
 * False even if {@link x} is undefined
 */
export function isNotEmpty<T>(
  arr: readonly T[] | undefined
): arr is T[] {
  return !isEmpty(arr);
}

export function isArrayType<T>(
  x: any,
  isType: (val: any) => val is T
): x is T[] {
  return Array.isArray(x) && x.every(isType);
}

export function isStringArray(
  x: any
): x is string[] {
  return isArrayType(x, isString);
}

export function isOptionalStringArray(
  x: any
): x is string[] | undefined {
  return isUndefined(x) || isStringArray(x);
}

/**
 * Checks {@link isValidNumber} too
 */
export function isInt(
  x: number
): x is number {
  return isValidNumber(x) && Number.isInteger(x);
}

export function isMapValueType<T>(
  obj: any,
  isType: (val: any) => val is T
): obj is Record<any, T> {
  return (isObject(obj) && !isNull(obj) && !Array.isArray(obj) && Object.values(obj).every(isType));
}

export function hasPrefix(
  str: string,
  prefix?: string
): prefix is string {
  return prefix ? str.startsWith(prefix) : false;
}

export function noPrefix(
  str: string,
  prefix?: string
): string {
  if (hasPrefix(str, prefix)) {
    str = str.replace(prefix, '');
  }

  return str;
}

export function toName(
  str: string,
  prefix?: string
): string {
  return noPrefix(str, prefix).split('_').map(word => word.trim()).
    map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').trim();
}

export function normalizeName(
  name: string | undefined,
  replacement: string,
  prefix?: string
): string {
  return name ?? toName(replacement, prefix);
}

/**
 * Checks {@link isValidNumber} too
 */
export function validateNotGuaranteed(
  value: number | undefined
): number | undefined {
  return isValidNumber(value) && value > 0 && value <= 100 ? value : undefined;
}

/**
 * Checks {@link isValidNumber} too
 */
export function validateNotNegative(
  value: number | undefined
): number | undefined {
  return isValidNumber(value) && value >= 0 ? value : undefined;
}

export function isEquals<T extends IEquals<T>>(
  x: T | undefined,
  y: T | undefined
): boolean {
  return !x || !y ? !x && !y : x.equals(y);
}

export function uniqueByEquals<T extends IEquals<T>>(
  arr: readonly T[]
): T[] {
  const unique: T[] = [];
  arr.forEach(item => {
    if (!unique.some(existing => existing.equals(item))) {
      unique.push(item);
    }
  });

  return unique;
}

export function logError(
  type: string,
  data: any
): void {
  console.error(`Invalid ${type}: ${JSON.stringify(data)}`);
  console.error(`-------------------------------------------`);
}

