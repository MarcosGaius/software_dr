import { TransformFnParams } from 'class-transformer/types/interfaces';
import { MaybeType } from '../types/maybe.type';

export const upperCaseFirstTransformer = (
  params: TransformFnParams
): MaybeType<string> =>
  params.value?.charAt(0).toUpperCase() + params.value.slice(1);
