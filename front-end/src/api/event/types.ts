import { SortOrder } from 'api/_shared/types';

export interface Event {
  id: number;
  name: string;
  startedAt: Date;
  endedAt?: Date;
}

export interface EventResponse {
  id: number;
  name: string;
  startedAt: string;
  endedAt?: string;
}

export interface ImmutableEvent extends Event {}

export type EventPostFields = Omit<Event, 'id'>;

export interface EventSorting {
  sortBy: 'startedAt';
  order: SortOrder;
}
