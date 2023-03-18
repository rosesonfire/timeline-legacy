import { Record } from 'immutable';

import Event, { IEventRepository } from 'domainModels/Event';

import DomainModelService from './DomainModelService';

class EventService extends DomainModelService<Event, IEventRepository> {
  async deleteAll(): Promise<void> {
    const allEvents = await this.filter(Record({})());

    await Promise.all(allEvents.map((event) => this.delete(event.id)).toArray());
  }
}

export default EventService;
