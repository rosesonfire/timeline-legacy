import { List, Record, RecordOf } from 'immutable';

import { api } from 'api/base';

import { Pagination } from 'api/_shared/types';

import { Entity, EntityPostFields, ImmutableEntity } from './types';

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
    .then(({ data: entities }) => {
      return List<RecordOf<ImmutableEntity>>(
        entities.map((entity) =>
          Record({
            ...entity,
            relatedEntities1: List(
              entity.relatedEntities1?.map((relatedEntity) => Record(relatedEntity)()),
            ),
            relatedEntities2: List(
              entity.relatedEntities2?.map((relatedEntity) => Record(relatedEntity)()),
            ),
          })(),
        ),
      );
    });
};

export const createEntity = (entity: RecordOf<EntityPostFields>) =>
  api.post<Entity>('/entity', entity.toJSON()).then(({ data: entity }) => Record(entity)());

export const deleteAllEntities = () => api.delete<void>('/entity');
