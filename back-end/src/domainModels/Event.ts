import { DM, IRepository } from './types';

interface Event extends DM {
  startedAt: Date;
  endedAt: Date;
}

export interface IEventRepository<T extends Event = Event> extends IRepository<T> {}

export default Event;
