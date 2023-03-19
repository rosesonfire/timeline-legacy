import { Record } from 'immutable';

import EventToEntityRelationship, {
  IEventToEntityRelationshipRepository,
} from 'domainModels/EventToEntityRelationship';

import DomainModelService from './DomainModelService';

class EventToEntityRelationshipService extends DomainModelService<
  EventToEntityRelationship,
  IEventToEntityRelationshipRepository
> {
  async deleteAll(): Promise<void> {
    const allEventToEntityRelationships = await this.filter(Record({})());

    await Promise.all(
      allEventToEntityRelationships
        .map((eventToEntityRelationship) => this.delete(eventToEntityRelationship.id))
        .toArray(),
    );
  }
}

export default EventToEntityRelationshipService;
