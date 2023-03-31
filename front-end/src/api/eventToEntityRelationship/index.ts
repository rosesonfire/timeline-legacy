import { Record, RecordOf } from 'immutable';

import { api } from 'api/base';

import { EventToEntityRelationship, EventToEntityRelationshipPostFields } from './types';

export const createEventToEntityRelationship = (
  eventToEntityRelationship: RecordOf<EventToEntityRelationshipPostFields>,
) =>
  api
    .post<EventToEntityRelationship>(
      '/eventToEntityRelationship',
      eventToEntityRelationship.toJSON(),
    )
    .then(({ data: entityToEntityRelationship }) => Record(entityToEntityRelationship)());

export const deleteAllEventToEntityRelationships = () =>
  api.delete<void>('/eventToEntityRelationship');
