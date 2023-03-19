import Event from './Event';
import Entity from './Entity';
import Relationship, { IRelationshipRepository } from './Relationship';

interface EventToEntityRelationship extends Relationship<Event, Entity, string> {}

export interface IEventToEntityRelationshipRepository
  extends IRelationshipRepository<Event, Entity, string, EventToEntityRelationship> {}

export default EventToEntityRelationship;
