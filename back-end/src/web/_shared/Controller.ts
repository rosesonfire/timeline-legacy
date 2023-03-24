import { Record, RecordOf } from 'immutable';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { DM, Pagination, Sorting } from 'domainModels/types';

import { DEFAULT_ORDER, DEFAULT_PAGE_SIZE } from './constants';

export interface IController {
  registerRoutes(server: FastifyInstance): void;
}

abstract class Controller<T extends DM> implements IController {
  abstract registerRoutes(server: FastifyInstance): void;

  protected extractPaginationAndSortingFromQueryParams = (
    request: FastifyRequest,
  ): {
    data: RecordOf<Partial<T>>;
    pagination?: RecordOf<Pagination>;
    sorting?: RecordOf<Sorting<T>>;
  } => {
    const { sortBy, order, offset, pageSize, ...data } = request.query as Partial<T> &
      Partial<Pagination> &
      Partial<Sorting<T>>;

    return {
      data: Record(data as Partial<T>)(),
      pagination:
        offset === undefined && pageSize === undefined
          ? undefined
          : Record({ offset: offset ?? 0, pageSize: pageSize ?? DEFAULT_PAGE_SIZE })(),
      sorting:
        sortBy === undefined ? undefined : Record({ sortBy, order: order ?? DEFAULT_ORDER })(),
    };
  };
}

export default Controller;
