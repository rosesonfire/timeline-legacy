import Entity from './Entity';
import Relationship, { IRelationshipRepository } from './Relationship';

interface EntityToEntityRelationship extends Relationship<Entity, Entity, string> {}

export interface IEntityToEntityRelationshipRepository
  extends IRelationshipRepository<Entity, Entity, string, EntityToEntityRelationship> {}

export default EntityToEntityRelationship;
