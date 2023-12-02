import { InfinityPaginationResultType } from './types/infinity-pagination-result.type';
import { IPaginationOptions } from './types/pagination-options.type';
import { Response } from 'express';

export const infinityPagination = <T>(
  data: T[],
  response: Response,
  options: IPaginationOptions
): InfinityPaginationResultType<T> => {
  response.set({
    'Content-Range': `${options.resource} ${
      options.page * options.limit - options.limit
    }-${options.page * options.limit}/${options.count}`,
  });

  return data;
};
