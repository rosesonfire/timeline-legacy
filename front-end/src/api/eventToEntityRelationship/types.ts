import { Relationship } from 'api/_shared/types';

export interface EventToEntityRelationship extends Relationship {}

export type EventToEntityRelationshipPostFields = Omit<EventToEntityRelationship, 'id'>;
