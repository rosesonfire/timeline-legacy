import { List, Record, RecordOf } from 'immutable';

import { api } from 'api/base';

import { Pagination } from 'api/_shared/types';

import { Entity, EntityPostFields } from './types';

let prevGetEntitiesController: AbortController | null = null;

export const getEntities = (pagination: Pagination) => {
  prevGetEntitiesController?.abort();

  const getEntitiesController = new AbortController();

  prevGetEntitiesController = getEntitiesController;

  return api
    .get<Entity[]>('/entity', {
      params: pagination,
      signal: getEntitiesController.signal,
    })
    .then(({ data: entities }) =>
      List<RecordOf<Entity>>(entities.map((entity) => Record(entity)())),
    );
};

export const createEntity = (entity: RecordOf<EntityPostFields>) =>
  api.post<Entity>('/entity', entity.toJSON()).then(({ data: entity }) => Record(entity)());

export const deleteAllEntities = () => api.delete<void>('/entity');
