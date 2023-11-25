import { TransformFnParams } from 'class-transformer/types/interfaces';
import { MaybeType } from '../types/maybe.type';

export const upperCaseFirstTransformer = (value: string): MaybeType<string> =>
  value.charAt(0).toUpperCase() + value.slice(1);
