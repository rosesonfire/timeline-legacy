import { Relationship, RelationshipPostFields } from 'api/_shared/types';

export interface EntityToEntityRelationship extends Relationship {}

export interface EntityToEntityRelationshipPostFields
  extends RelationshipPostFields<EntityToEntityRelationship> {}
