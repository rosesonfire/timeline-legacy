import { Record, RecordOf } from 'immutable';

import { api } from 'api/base';

import { EntityToEntityRelationship, EntityToEntityRelationshipPostFields } from './types';

export const createEntityToEntityRelationship = (
  entity: RecordOf<EntityToEntityRelationshipPostFields>,
) =>
  api
    .post<EntityToEntityRelationship>('/entityToEntityRelationship', entity.toJSON())
    .then(({ data: entityToEntityRelationship }) => Record(entityToEntityRelationship)());

export const deleteAllEntityToEntityRelationship = () =>
  api.delete<void>('/entityToEntityRelationship');
